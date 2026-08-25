// Karte zu „Die Klostermedizin" — Mitteleuropa zwischen Montecassino und
// der Nordsee.
//
// Wie in den Kapiteln 1 bis 5 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-klostermedizin.mjs nach.
//
// Was die Karte zeigen soll: die Kette der Klöster, die sich vom Süden nach
// Norden legt. Sie beginnt 529 auf einem Berg zwischen Rom und Neapel und
// erreicht dreihundert Jahre später den Bodensee, den Rhein und die Fulda.
// Deshalb ist dieser Ausschnitt hochkant: Montecassino und Salerno müssen
// ebenso zu sehen sein wie Fulda und die Nordseeküste, und dazwischen
// liegen die Alpen, über die die Regel des Benedikt gegangen ist.
//
// Aufbau der Landmassen: ein großer Ring („Festland") von der spanischen
// Mittelmeerküste über Südfrankreich, Italien, die Adria und den Balkan,
// dann außerhalb des Rahmens herum bis zur Nordseeküste und über den
// Ärmelkanal zurück. Norden, Osten und Westen laufen bewusst über den
// Bildrand hinaus — die SVG-Fläche schneidet den Überstand ab. Südostengland
// ist ein eigener Ring, ebenso die Inseln (Mallorca, Menorca, Ibiza,
// Korsika, Sardinien, Sizilien). Sizilien wird vollständig notiert, obwohl
// der Rahmen es unten abschneidet: So bleibt die Datei im Atlas nachprüfbar.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von der spanischen Ostküste bis nach Ungarn, von
 * Kalabrien bis an die Nordsee.
 */
const RAHMEN = {
  minLon: 0,
  maxLon: 20,
  minLat: 38,
  maxLat: 54,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 5, damit alle Karten des
// Buches gleich aussehen und gleich zu lesen sind.
// ---------------------------------------------------------------------------

/** Eine Landmasse: Sandbeige mit dünnem Küstenstrich. */
function land(orte) {
  return {
    art: 'land',
    d: P.pfad(orte),
    fill: KARTENFARBEN.land,
    stroke: KARTENFARBEN.landRand,
    strokeWidth: 1,
  };
}

/**
 * Ein Gebirgszug — eine Spur tiefer als das Land, ohne Rand.
 *
 * Die gemeinsame Palette in utils/karte-geo.js kennt keinen eigenen
 * Gebirgston; der Wüstenton passt hier und wird deshalb mitbenutzt, statt
 * die Palette der anderen Kapitel zu verändern.
 */
function gebirge(orte) {
  return {
    art: 'gebirge',
    d: P.pfad(orte),
    fill: KARTENFARBEN.wueste,
    stroke: 'none',
    strokeWidth: 0,
  };
}

/** Ein Fluss: offene Linie, kein Ring. */
function fluss(orte) {
  return {
    art: 'fluss',
    d: P.pfad(orte, { geschlossen: false }),
    fill: 'none',
    stroke: KARTENFARBEN.fluss,
    strokeWidth: 1.6,
  };
}

/** Ein Info-Punkt aus geografischen Koordinaten. */
function ort(lon, lat) {
  const [x, y] = P.punkt(lon, lat);
  return { x, y };
}

/** Dasselbe als Paar [x, y] — so notieren die Bewegungen ihre Stationen. */
function station(lon, lat) {
  return P.punkt(lon, lat);
}

/** Eine Beschriftung aus geografischen Koordinaten. */
function schrift(text, art, lon, lat, drehung = 0) {
  const [x, y] = P.punkt(lon, lat);
  return { text, art, x, y, drehung };
}

// ---------------------------------------------------------------------------
// Die Küsten in Abschnitten — so bleiben sie lesbar, einzeln prüfbar und
// mehrfach verwendbar.
// ---------------------------------------------------------------------------

/** Cabo de Palos → Denia → Ebromündung → Cap de Creus (Spanien). */
const SPANIEN_MITTELMEER = [
  [-0.72, 37.63], [-0.48, 38.35], [0.16, 38.79], [-0.33, 39.45], [0.03, 39.98],
  [0.86, 40.72], [1.25, 41.11], [1.81, 41.24], [2.62, 41.65], [3.19, 41.89],
  [3.28, 42.32],
];

/** Roussillon → Golfe du Lion → Provence → Côte d’Azur. */
const FRANKREICH_MITTELMEER = [
  [3.03, 42.7], [3.05, 42.99], [3.7, 43.4], [4.14, 43.47], [4.85, 43.35],
  [5.35, 43.29], [5.93, 43.08], [6.63, 43.26], [7.02, 43.55], [7.5, 43.78],
];

/** Ligurien → Toskana → Latium → Kampanien → Kalabrien (Westküste). */
const ITALIEN_WEST = [
  [8.03, 43.88], [8.49, 44.31], [8.93, 44.41], [9.4, 44.27], [9.83, 44.07],
  [10.24, 43.87], [10.31, 43.54], [10.76, 42.92], [11.2, 42.44], [11.79, 42.09],
  [12.23, 41.75], [12.62, 41.44], [13.57, 41.21], [14.05, 40.79], [14.25, 40.84],
  [14.33, 40.57], [14.72, 40.6], [14.99, 40.35], [15.28, 40.02], [15.63, 40.07],
  [15.94, 39.52], [16.03, 39.36], [15.85, 38.68], [15.85, 38.36], [15.65, 38.11],
];

/** Die Stiefelspitze → Ionisches Meer → Golf von Tarent → Absatz. */
const ITALIEN_IONISCH = [
  [15.76, 37.92], [16.06, 37.93], [16.26, 38.23], [16.58, 38.44], [16.6, 38.8],
  [17.13, 39.08], [16.95, 39.5], [16.5, 39.72], [17.23, 40.47], [17.98, 40.06],
  [18.35, 39.79],
];

/** Otranto → Apulien → Gargano → Abruzzen → Marken → Po-Delta → Triest. */
const ITALIEN_ADRIA = [
  [18.5, 40.15], [17.94, 40.63], [16.87, 41.13], [16.28, 41.32], [15.9, 41.63],
  [16.18, 41.9], [14.99, 42.0], [14.22, 42.46], [13.51, 43.62], [12.57, 44.06],
  [12.28, 44.42], [12.5, 44.85], [12.34, 45.44], [13.77, 45.65],
];

/** Istrien → Dalmatien → Montenegro → Albanien, dann aus dem Rahmen. */
const BALKAN_ADRIA = [
  [13.6, 45.23], [13.85, 44.87], [14.45, 45.33], [15.23, 44.12], [16.44, 43.51],
  [17.3, 42.95], [18.09, 42.65], [19.09, 42.09], [19.45, 41.32], [19.49, 40.47],
  [20.0, 39.87], [20.4, 39.42],
];

/** Ost- und Nordrand: bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const OST_UND_NORDRAND = [
  [20.9, 39.6], [21.2, 45.0], [21.2, 55.2], [9.5, 55.6],
];

/** Jütland → Deutsche Bucht → Watt → Holland → Flandern → Normandie. */
const NORDSEE_KANAL = [
  [8.5, 54.9], [8.6, 54.4], [8.9, 53.88], [8.5, 53.6], [8.15, 53.55],
  [7.0, 53.4], [6.2, 53.45], [5.4, 53.3], [4.75, 52.96], [4.55, 52.46],
  [4.12, 51.98], [3.7, 51.55], [3.4, 51.42], [2.92, 51.23], [2.37, 51.03],
  [1.85, 50.96], [1.6, 50.72], [1.55, 50.22], [1.08, 49.93], [0.11, 49.49],
];

/** Der Westrand liegt außerhalb des Rahmens und schließt den Ring. */
const WESTRAND = [
  [-0.6, 49.35], [-1.6, 49.7], [-3.5, 48.6], [-4.5, 45.5], [-3.0, 42.5],
  [-1.6, 39.0],
];

/** Der große Ring: Spanien, Frankreich, Italien, der Balkan, Germanien. */
const FESTLAND = verbinde(
  SPANIEN_MITTELMEER,
  FRANKREICH_MITTELMEER,
  ITALIEN_WEST,
  ITALIEN_IONISCH,
  ITALIEN_ADRIA,
  BALKAN_ADRIA,
  OST_UND_NORDRAND,
  NORDSEE_KANAL,
  WESTRAND,
);

/** Südostengland — nur der Teil, der in den Rahmen ragt. */
const ENGLAND = [
  [-1.9, 50.72], [-0.8, 50.78], [0.28, 50.73], [0.58, 50.85], [0.97, 50.91],
  [1.35, 51.13], [1.38, 51.39], [0.95, 51.5], [0.7, 51.53], [1.29, 51.95],
  [1.6, 52.15], [1.75, 52.48], [1.73, 52.62], [1.3, 52.93], [0.4, 52.9],
  [0.05, 52.98], [0.34, 53.15], [0.1, 53.63], [-0.2, 54.08], [-1.5, 54.3],
  [-2.2, 52.0], [-2.0, 50.8],
];

// ---------------------------------------------------------------------------
// Die Inseln. Sie gehören zum Bild, auch wenn in diesem Kapitel niemand auf
// ihnen wohnt — ohne sie erkennt man das westliche Mittelmeer nicht wieder.
// ---------------------------------------------------------------------------

/** Mallorca. */
const MALLORCA = [
  [2.4, 39.6], [2.75, 39.85], [3.15, 39.95], [3.45, 39.75], [3.2, 39.3],
  [2.75, 39.35],
];

/** Menorca. */
const MENORCA = [
  [3.83, 40.0], [4.32, 40.05], [4.27, 39.83], [3.85, 39.85],
];

/** Ibiza. */
const IBIZA = [
  [1.22, 38.9], [1.6, 39.1], [1.58, 38.9], [1.4, 38.66],
];

/** Korsika. */
const KORSIKA = [
  [9.4, 43.0], [9.5, 42.1], [9.2, 41.4], [8.6, 42.0], [8.7, 42.6],
];

/** Sardinien. */
const SARDINIEN = [
  [8.2, 41.1], [9.2, 41.2], [9.7, 40.5], [9.6, 39.3], [9.1, 39.2],
  [8.4, 38.9], [8.4, 39.9], [8.2, 40.6],
];

/** Sizilien — der Rahmen schneidet sie unten ab, notiert ist sie ganz. */
const SIZILIEN = [
  [15.55, 38.3], [15.29, 37.85], [15.09, 37.5], [15.29, 37.07], [15.14, 36.69],
  [14.5, 36.79], [14.25, 37.02], [13.58, 37.26], [12.9, 37.57], [12.43, 37.8],
  [12.51, 38.02], [13.36, 38.18], [14.02, 38.02], [15.0, 38.02],
];

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt. Die
// Alpen sind hier keine Zierde: Sie sind die Schwelle, über die die Regel
// des Benedikt nach Norden gegangen ist.
// ---------------------------------------------------------------------------

/** Der Alpenbogen — grobe Fläche, keine Aussage über Gipfel oder Grenzen. */
const ALPEN = [
  [5.8, 46.3], [7.0, 45.6], [8.6, 45.6], [10.5, 46.0], [12.4, 46.3],
  [13.8, 46.6], [15.2, 47.4], [13.6, 47.7], [11.5, 47.6], [9.4, 47.4],
  [7.4, 46.9], [6.2, 46.6],
];

/** Die Pyrenäen. */
const PYRENAEEN = [
  [-1.6, 43.2], [0.4, 42.8], [2.0, 42.5], [3.1, 42.4], [2.4, 42.2],
  [0.6, 42.3], [-1.5, 42.8],
];

/** Der Apennin. */
const APENNIN = [
  [9.9, 44.2], [11.6, 43.5], [13.2, 42.6], [14.4, 41.6], [16.0, 39.9],
  [15.9, 39.6], [14.0, 41.2], [12.4, 42.4], [10.8, 43.4], [9.6, 44.0],
];

/** Der Rhein — Bodensee, Basel, Mainz, Köln, Rheinmündung. */
const RHEIN = [
  [9.6, 47.5], [8.6, 47.6], [7.6, 47.55], [7.62, 48.58], [8.0, 49.0],
  [8.27, 50.0], [7.6, 50.36], [7.1, 50.73], [6.9, 51.2], [6.1, 51.85],
  [5.0, 51.95], [4.15, 51.99],
];

/** Die Donau — Donaueschingen, Regensburg, Passau, Wien, Ungarn. */
const DONAU = [
  [8.5, 47.95], [10.0, 48.72], [12.1, 49.02], [13.44, 48.57], [15.6, 48.38],
  [16.37, 48.2], [17.11, 47.87], [18.94, 47.8], [19.05, 46.6], [19.9, 45.3],
];

/** Die Rhône — Genfersee, Lyon, Avignon, Camargue. */
const RHONE = [
  [6.15, 46.2], [4.84, 45.76], [4.8, 44.3], [4.65, 43.85], [4.85, 43.35],
];

/** Der Po. */
const PO = [
  [7.7, 45.07], [9.7, 45.05], [10.03, 45.13], [11.6, 44.9], [12.5, 44.95],
];

/** Die Elbe — Böhmen, Dresden, Magdeburg, Hamburg, Cuxhaven. */
const ELBE = [
  [14.2, 50.78], [13.74, 51.05], [11.63, 52.13], [9.98, 53.55], [8.7, 53.87],
];

/** Die Seine — Burgund, Paris, Rouen, Le Havre. */
const SEINE = [
  [4.7, 47.8], [3.3, 48.4], [2.35, 48.85], [1.1, 49.44], [0.15, 49.45],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  england: ENGLAND,
  mallorca: MALLORCA,
  menorca: MENORCA,
  ibiza: IBIZA,
  korsika: KORSIKA,
  sardinien: SARDINIEN,
  sizilien: SIZILIEN,
  spanienMittelmeer: SPANIEN_MITTELMEER,
  frankreichMittelmeer: FRANKREICH_MITTELMEER,
  italienWest: ITALIEN_WEST,
  italienAdria: ITALIEN_ADRIA,
  balkanAdria: BALKAN_ADRIA,
  nordseeKanal: NORDSEE_KANAL,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [
  FESTLAND,
  ENGLAND,
  MALLORCA,
  MENORCA,
  IBIZA,
  KORSIKA,
  SARDINIEN,
  SIZILIEN,
];

// ---------------------------------------------------------------------------
// Die Phasen: sechshundert Jahre, in denen aus einem Berg südlich von Rom
// ein Netz von Gärten, Schreibstuben und Krankensälen wird.
// ---------------------------------------------------------------------------

/** Phase 1 — Montecassino und Vivarium: der Anfang in Italien. */
const MONTECASSINO_UMLAND = [
  [13.1, 41.9], [14.3, 41.9], [14.6, 41.2], [13.4, 41.0],
];
const VIVARIUM_KALABRIEN = [
  [16.2, 39.1], [16.9, 38.9], [16.7, 38.5], [16.1, 38.6],
];
const ITALIEN_DER_REGEL = [
  [11.5, 44.0], [13.5, 43.0], [15.5, 41.5], [16.5, 40.0], [15.5, 38.6],
  [13.5, 40.5], [11.8, 42.2], [10.5, 43.3],
];

/** Phase 2 — die Klöster im Frankenreich. */
const FRANKENREICH = [
  [1.0, 43.5], [1.5, 48.0], [3.5, 51.0], [7.0, 53.2], [9.5, 53.0],
  [12.0, 50.5], [13.5, 48.5], [13.0, 46.5], [12.4, 44.6], [10.0, 44.0],
  [6.0, 43.3], [3.0, 42.8],
];
const BODENSEE_KLOESTER = [
  [8.6, 47.9], [9.8, 47.9], [9.9, 47.2], [8.7, 47.2],
];
const FULDA_LORSCH = [
  [8.3, 51.0], [10.2, 51.0], [10.0, 49.4], [8.2, 49.4],
];
const ST_DENIS_CORBIE = [
  [1.8, 50.3], [3.4, 50.2], [3.2, 48.5], [1.9, 48.6],
];

/** Phase 3 — Cluny reformiert, Salerno lehrt. */
const CLUNY_BURGUND = [
  [3.6, 47.4], [5.6, 47.3], [5.9, 45.6], [4.0, 45.6],
];
const CLUNIAZENSISCHES_NETZ = [
  [1.0, 48.5], [6.5, 48.2], [8.5, 45.5], [6.0, 43.6], [2.0, 43.5],
  [0.5, 45.8],
];
const SALERNO_UMLAND = [
  [14.2, 41.0], [15.4, 40.9], [15.3, 40.2], [14.4, 40.3],
];

/** Phase 4 — der Rhein und der Rupertsberg: Hildegard schreibt. */
const RHEIN_KLOESTER = [
  [7.2, 50.4], [8.6, 50.3], [8.5, 49.4], [7.2, 49.5],
];
const RUPERTSBERG_NAHE = [
  [7.6, 50.1], [8.15, 50.1], [8.15, 49.83], [7.6, 49.83],
];
const ZISTERZIENSER_NORDEN = [
  [4.5, 52.0], [10.0, 52.5], [13.0, 51.5], [12.5, 49.5], [9.0, 49.0],
  [5.5, 49.5],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(FESTLAND),
    land(ENGLAND),
    land(MALLORCA),
    land(MENORCA),
    land(IBIZA),
    land(KORSIKA),
    land(SARDINIEN),
    land(SIZILIEN),
    gebirge(ALPEN),
    gebirge(PYRENAEEN),
    gebirge(APENNIN),
    fluss(RHEIN),
    fluss(DONAU),
    fluss(RHONE),
    fluss(PO),
    fluss(ELBE),
    fluss(SEINE),
  ],

  phasen: [
    {
      id: 'montecassino',
      label: '~529: Montecassino — die Regel entsteht',
      hinweis:
        'Benedikt von Nursia gründet auf einem Berg zwischen Rom und Neapel ' +
        'ein Kloster und schreibt eine Ordnung für das Zusammenleben. Zwei ' +
        'ihrer Sätze werden für die Medizin wichtig: Gäste sind aufzunehmen ' +
        'wie Christus, und für die Kranken ist vor allem und über allem zu ' +
        'sorgen. Im selben Jahrhundert lässt Cassiodorus in Vivarium ' +
        'medizinische Schriften abschreiben — mit der Anweisung, sie auch ' +
        'dann zu bewahren, wenn niemand sie mehr versteht.',
      flaechen: [
        { titel: 'Montecassino, gegründet um 529', d: P.pfad(MONTECASSINO_UMLAND) },
        { titel: 'Vivarium in Kalabrien — die Schreibstube des Cassiodorus', d: P.pfad(VIVARIUM_KALABRIEN) },
        { titel: 'Italien, wo die Regel zuerst gilt', d: P.pfad(ITALIEN_DER_REGEL) },
      ],
    },
    {
      id: 'frankenreich',
      label: '~800: St. Gallen, Reichenau und Fulda',
      hinweis:
        'Im Frankenreich Karls des Großen entstehen die großen Klöster ' +
        'nördlich der Alpen. Eine Verordnung für die königlichen Güter, das ' +
        'Capitulare de villis, zählt um 795 auf, welche Kräuter überall ' +
        'gepflanzt werden sollen. Der St. Galler Klosterplan zeichnet um 820 ' +
        'einen Kräutergarten mit sechzehn Beeten neben dem Haus des Arztes, ' +
        'und auf der Reichenau schreibt Abt Walahfrid Strabo sein Gedicht ' +
        'über zwei Dutzend Heilpflanzen.',
      flaechen: [
        { titel: 'Das Frankenreich um 800', d: P.pfad(FRANKENREICH) },
        { titel: 'Reichenau und St. Gallen am Bodensee', d: P.pfad(BODENSEE_KLOESTER) },
        { titel: 'Fulda und Lorsch', d: P.pfad(FULDA_LORSCH) },
        { titel: 'Die Klöster im Westen: Corbie und St-Denis', d: P.pfad(ST_DENIS_CORBIE) },
      ],
    },
    {
      id: 'cluny-salerno',
      label: '~1080–1130: Cluny reformiert, Salerno lehrt',
      hinweis:
        'Cluny in Burgund wird zum Mittelpunkt eines Netzes von Hunderten ' +
        'Klöstern und baut die größte Kirche des Abendlandes. Zur selben ' +
        'Zeit entsteht in der Hafenstadt Salerno die erste medizinische ' +
        'Schule Europas — nicht hinter einer Mauer, sondern im Gemenge von ' +
        'Kloster, Markt und arabischen Büchern. Constantinus Africanus ' +
        'bringt sie aus Nordafrika mit und übersetzt sie als Mönch von ' +
        'Montecassino ins Lateinische.',
      flaechen: [
        { titel: 'Cluny in Burgund', d: P.pfad(CLUNY_BURGUND) },
        { titel: 'Das cluniazensische Netz', d: P.pfad(CLUNIAZENSISCHES_NETZ) },
        { titel: 'Salerno und sein Umland', d: P.pfad(SALERNO_UMLAND) },
      ],
    },
    {
      id: 'rupertsberg',
      label: '~1150: Rupertsberg — Hildegard schreibt',
      hinweis:
        'Hildegard von Bingen verlässt mit ihren Schwestern den ' +
        'Disibodenberg und gründet gegen den Willen ihres Abtes ein eigenes ' +
        'Kloster auf dem Rupertsberg, dort wo die Nahe in den Rhein mündet. ' +
        'Hier entstehen die „Physica" und „Causae et curae" — eine ' +
        'Naturkunde und ein Heilbuch. Zur selben Zeit legen die Zisterzienser ' +
        'im Norden neue Klöster an und roden das Land.',
      flaechen: [
        { titel: 'Die Klöster am Mittelrhein', d: P.pfad(RHEIN_KLOESTER) },
        { titel: 'Rupertsberg an der Nahemündung', d: P.pfad(RUPERTSBERG_NAHE) },
        { titel: 'Die Zisterzienser im Norden', d: P.pfad(ZISTERZIENSER_NORDEN) },
      ],
    },
  ],

  punkte: [
    {
      id: 'montecassino',
      name: 'Montecassino',
      typ: 'ereignis',
      ...ort(13.81, 41.49),
      text:
        'Auf diesem Berg gründete Benedikt von Nursia um 529 das Kloster, ' +
        'für das er seine Regel schrieb. Kapitel 36 stellt die Krankenpflege ' +
        'über alles andere: Man soll den Kranken dienen, als wäre es Christus ' +
        'selbst. Das ist die Begründung, aus der in Europa das erste ' +
        'geordnete Krankenwesen wurde — ein eigener Raum, ein zuständiger ' +
        'Bruder, eine eigene Küche. Fünfhundert Jahre später übersetzte hier ' +
        'Constantinus Africanus arabische Medizin ins Lateinische.',
    },
    {
      id: 'st-gallen',
      name: 'St. Gallen',
      typ: 'stadt',
      ...ort(9.377, 47.425),
      text:
        'In der Bibliothek von St. Gallen liegt der berühmteste Bauplan des ' +
        'Mittelalters: ein um 820 gezeichneter Entwurf für ein ganzes ' +
        'Kloster. Er zeigt neben Kirche und Schlafsaal ein Haus für die ' +
        'Kranken, eines für den Aderlass, ein Bad — und einen Kräutergarten ' +
        'mit sechzehn beschrifteten Beeten: Salbei, Raute, Bohnenkraut, ' +
        'Minze, Rosmarin, Kümmel, Liebstöckel und andere. Gebaut wurde der ' +
        'Plan nie; abgeschrieben und benutzt wurde er überall.',
    },
    {
      id: 'reichenau',
      name: 'Reichenau',
      typ: 'stadt',
      ...ort(9.062, 47.698),
      text:
        'Auf der Insel im Bodensee schrieb Abt Walahfrid Strabo um 840 den ' +
        '„Hortulus", ein Gedicht über seinen eigenen Klostergarten: ' +
        'vierundzwanzig Pflanzen, von der Salbei bis zum Schlafmohn, jede mit ' +
        'ihrem Aussehen, ihrer Pflege und ihrem Gebrauch. Es beginnt mit dem ' +
        'Unkrautjäten und den Brennnesseln, die ihm in die Hände stachen — ' +
        'die erste Gartenbeschreibung des deutschen Mittelalters stammt von ' +
        'einem, der selbst gegraben hat.',
    },
    {
      id: 'fulda',
      name: 'Fulda',
      typ: 'stadt',
      ...ort(9.681, 50.556),
      text:
        '744 von einem Schüler des Bonifatius gegründet und rasch eines der ' +
        'reichsten Klöster des Reiches. Seine Schreibstube und seine ' +
        'Bibliothek retteten Texte, die es sonst nirgends mehr gab. Aus dem ' +
        'benachbarten Lorsch stammt das älteste erhaltene Arzneibuch ' +
        'Deutschlands (um 795): Es beginnt mit einer langen Verteidigung der ' +
        'Heilkunst gegen den Vorwurf, ein Christ dürfe allein auf Gott ' +
        'vertrauen — Gott habe die Arzneien schließlich selbst geschaffen.',
    },
    {
      id: 'cluny',
      name: 'Cluny',
      typ: 'stadt',
      ...ort(4.659, 46.434),
      text:
        '910 in Burgund gegründet, wurde Cluny zum Mittelpunkt eines Netzes ' +
        'von Hunderten Klöstern und baute die größte Kirche des Abendlandes. ' +
        'Die Bräuche von Cluny regelten auch den Krankensaal bis ins ' +
        'Einzelne: wer wann gewaschen, gefüttert, besucht wird, wann Fleisch ' +
        'erlaubt ist, wie ein Sterbender begleitet wird. Pflege war hier ' +
        'nicht Stimmung, sondern Vorschrift — und genau deshalb verlässlich.',
    },
    {
      id: 'rupertsberg',
      name: 'Rupertsberg bei Bingen',
      typ: 'ereignis',
      ...ort(7.892, 49.969),
      text:
        'Hier, wo die Nahe in den Rhein mündet, gründete Hildegard von ' +
        'Bingen um 1150 ihr eigenes Kloster — gegen den Widerstand des ' +
        'Abtes, den sie mit einer Krankheit und mit Beharrlichkeit brach. ' +
        'Auf dem Rupertsberg entstanden die „Physica", eine Naturkunde der ' +
        'Pflanzen, Bäume, Steine und Tiere, und „Causae et curae" über ' +
        'Ursachen und Behandlung der Krankheiten. Eine Frau durfte nicht ' +
        'lehren — aber sie durfte aufschreiben, was ihr im Licht gezeigt ' +
        'wurde.',
    },
    {
      id: 'salerno',
      name: 'Salerno',
      typ: 'stadt',
      ...ort(14.768, 40.682),
      text:
        'In der Hafenstadt südlich von Neapel entstand ab dem 10. ' +
        'Jahrhundert die erste medizinische Schule Europas — keine ' +
        'Klosterschule, sondern eine Mischung aus Kloster-, Markt- und ' +
        'arabischem Wissen. Der Legende nach lehrten dort vier Meister: ein ' +
        'Lateiner, ein Grieche, ein Araber und ein Jude. Aus Salerno stammen ' +
        'Schriften über Frauenheilkunde, die einer Ärztin namens Trota ' +
        'zugeschrieben werden, und die gereimten Gesundheitsregeln, die ganz ' +
        'Europa auswendig lernte.',
    },
  ],

  bewegungen: [
    {
      id: 'regel-nach-norden',
      name: 'Die Regel des Benedikt geht über die Alpen',
      von: station(13.81, 41.49),
      ueber: [station(11.3, 44.5), station(10.0, 46.5)],
      nach: station(9.2, 47.6),
      text:
        'Von Montecassino aus verbreitete sich die Regel Benedikts über ' +
        'Italien nach Norden. Karl der Große machte sie um 800 zur ' +
        'verbindlichen Ordnung der Klöster in seinem Reich. Mit ihr wanderten ' +
        'die beiden Sätze, auf denen die Klostermedizin steht: Gäste ' +
        'aufnehmen wie Christus, und für die Kranken sorgen vor allem und ' +
        'über allem.',
    },
    {
      id: 'bonifatius-nach-fulda',
      name: 'Die angelsächsische Mission bringt die Bücher',
      von: station(1.29, 51.95),
      ueber: [station(5.12, 52.09), station(7.6, 51.0)],
      nach: station(9.681, 50.556),
      text:
        'Aus England kamen im 8. Jahrhundert Mönche auf das Festland, unter ' +
        'ihnen Bonifatius. Sie brachten Bücher und die Gewohnheit mit, sie ' +
        'abzuschreiben. 744 wurde Fulda gegründet; seine Bibliothek und seine ' +
        'Schreibstube wurden zu den wichtigsten des Reiches. Was in diesen ' +
        'Jahrzehnten nicht kopiert wurde, ist verloren.',
    },
    {
      id: 'salerno-nach-norden',
      name: 'Aus Salerno wandern die Bücher nach Norden',
      von: station(14.768, 40.682),
      ueber: [station(12.3, 43.0), station(8.0, 44.3)],
      nach: station(3.88, 43.61),
      text:
        'Was Constantinus Africanus in Montecassino aus dem Arabischen ' +
        'übersetzte und was in Salerno gelehrt wurde, ging über die Alpen ' +
        'nach Montpellier, Paris und später an die jungen Universitäten. Die ' +
        'gereimten Gesundheitsregeln von Salerno wurden über Jahrhunderte ' +
        'abgeschrieben und übersetzt. Der Weg des Wissens aus Kapitel 5 ' +
        'findet hier seine Fortsetzung.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 3.4, 53.6),
    schrift('Ärmelkanal', 'meer', 0.55, 50.35, -12),
    schrift('Mittelmeer', 'meer', 12.6, 39.4),
    schrift('Adria', 'meer', 14.9, 43.3, -50),
    schrift('Alpen', 'land', 10.6, 46.5),
    schrift('Pyrenäen', 'land', 0.9, 42.6),
    schrift('Apennin', 'land', 13.1, 42.3, -55),
    schrift('Rhein', 'meer', 7.35, 50.55, -70),
    schrift('Donau', 'meer', 14.6, 48.5, 15),
    schrift('Rhône', 'meer', 4.6, 44.6, -80),
    schrift('Po', 'meer', 10.5, 45.05),
    schrift('Elbe', 'meer', 11.0, 52.4, -55),
    schrift('Seine', 'meer', 2.6, 48.9, -20),
    schrift('Rom', 'land', 12.5, 41.9),
    schrift('Gallien', 'land', 2.4, 46.6),
    schrift('Germanien', 'land', 11.0, 50.3),
    schrift('Italien', 'land', 15.2, 42.0, -60),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
