// Karte zu „Harvey und der Blutkreislauf" — Westeuropa im 17. Jahrhundert.
//
// Wie in den Kapiteln 1 bis 7 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-harvey.mjs nach.
//
// Was die Karte zeigen soll: den Weg einer einzigen Einsicht. Sie beginnt in
// einem hölzernen Anatomietheater in Padua, wo ein englischer Student einem
// alten Professor beim Sezieren zusieht und die Klappen in den Venen zu
// Gesicht bekommt. Sie wird zwanzig Jahre später in einem Londoner Hörsaal
// zum ersten Mal ausgesprochen, 1628 in Frankfurt gedruckt — und erst 1661
// in Bologna vollendet, vier Jahre nach dem Tod des Mannes, der sie
// aufgeschrieben hatte.
//
// Deshalb dieser Ausschnitt: von der irischen See bis an die Adria, von
// Rom bis nach Jütland. Er muss London und Padua auf dasselbe Blatt bringen,
// dazwischen Cambridge, Paris, Frankfurt und Bologna — und die Alpen, über
// die der Student zweimal gegangen ist.
//
// Aufbau der Landmassen: ein einziger großer Ring („Festland"), der an der
// spanischen Mittelmeerküste beginnt, über Südfrankreich und Italien läuft,
// unterhalb des Rahmens quer über die Apenninhalbinsel schneidet, an der
// Adria wieder nach Norden zieht, über Istrien aus dem Bild läuft, außerhalb
// des Rahmens nach Norden herumführt und über Jütland, die Nordsee, den
// Ärmelkanal, die Bretagne, die Biskaya und Iberien zurückkommt. Norden,
// Osten, Westen und Süden laufen bewusst über den Bildrand hinaus — die
// SVG-Fläche schneidet den Überstand ab. Großbritannien ist ein eigener
// Ring (im Norden außerhalb des Rahmens geschlossen), dazu Korsika und
// Sardinien, ohne die das westliche Mittelmeer nicht wiederzuerkennen wäre.
// Irland liegt vollständig westlich des Ausschnitts und fehlt deshalb.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von der Irischen See bis an die Adria, von Rom bis
 * an die dänische Nordseeküste.
 */
const RAHMEN = {
  minLon: -6,
  maxLon: 14,
  minLat: 41,
  maxLat: 54,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 7, damit alle Karten des
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

/** Valencia → Ebro-Delta → Barcelona → Cap de Creus. */
const SPANIEN_MITTELMEER = [
  [-0.33, 39.45], [0.03, 39.98], [0.86, 40.72], [1.25, 41.11], [1.81, 41.24],
  [2.19, 41.4], [2.79, 41.67], [3.19, 41.89], [3.28, 42.32],
];

/** Roussillon → Golfe du Lion → Provence → Côte d’Azur. */
const FRANKREICH_MITTELMEER = [
  [3.03, 42.7], [3.05, 42.99], [3.7, 43.4], [4.14, 43.47], [4.85, 43.35],
  [5.35, 43.29], [5.93, 43.08], [6.63, 43.26], [7.02, 43.55], [7.5, 43.78],
];

/** Ligurien → Toskana → Latium → Golf von Neapel. */
const ITALIEN_WEST = [
  [8.03, 43.88], [8.49, 44.31], [8.93, 44.41], [9.4, 44.27], [9.83, 44.07],
  [10.24, 43.87], [10.31, 43.54], [10.76, 42.92], [11.2, 42.44], [11.79, 42.09],
  [12.23, 41.75], [12.62, 41.44], [13.57, 41.21], [14.05, 40.79],
];

/**
 * Der Schnitt unterhalb des Rahmens.
 *
 * Süditalien läuft weit unter den Bildrand hinaus. Statt Kalabrien und
 * Sizilien mitzuschleppen, wird die Halbinsel unterhalb des Rahmens (bei
 * ~40,5° N) quer geschlossen — sichtbar wird davon nichts, und die
 * Landfläche bleibt für die Prüfung ein sauberer Ring.
 */
const SCHNITT_UNTERHALB = [
  [15.0, 40.5], [16.9, 40.5],
];

/** Apulien → Gargano → Abruzzen → Marken → Po-Delta → Lagune → Triest. */
const ITALIEN_ADRIA = [
  [16.87, 41.13], [16.28, 41.32], [15.9, 41.63], [16.18, 41.92], [14.99, 42.0],
  [14.22, 42.46], [13.51, 43.62], [12.57, 44.06], [12.28, 44.42], [12.5, 44.85],
  [12.34, 45.44], [13.06, 45.66], [13.77, 45.65],
];

/** Istrien → Kvarner → Dalmatien, dann aus dem Rahmen nach Südosten. */
const ISTRIEN_DALMATIEN = [
  [13.6, 45.23], [13.85, 44.87], [14.45, 45.33], [15.23, 44.12],
  [16.44, 43.51], [17.3, 43.1],
];

/** Ost- und Nordrand: bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const OST_UND_NORDRAND = [
  [17.6, 43.0], [17.6, 56.5], [9.5, 56.8], [8.3, 55.8],
];

/** Jütland → Deutsche Bucht → Watt → Holland → Flandern → Seinemündung. */
const NORDSEE_KANAL = [
  [8.2, 55.2], [8.5, 54.9], [8.6, 54.4], [8.9, 53.88], [8.5, 53.6],
  [8.15, 53.55], [7.0, 53.4], [6.2, 53.45], [5.4, 53.3], [4.75, 52.96],
  [4.55, 52.46], [4.12, 51.98], [3.7, 51.55], [3.4, 51.42], [2.92, 51.23],
  [2.37, 51.03], [1.85, 50.96], [1.6, 50.72], [1.55, 50.22], [1.08, 49.93],
  [0.11, 49.49],
];

/** Normandie → Cotentin → Bretagne → Loiremündung → Biskaya. */
const FRANKREICH_ATLANTIK = [
  [-0.4, 49.35], [-1.1, 49.4], [-1.26, 49.68], [-1.94, 49.72], [-1.6, 48.84],
  [-1.5, 48.65], [-2.46, 48.63], [-3.44, 48.82], [-4.56, 48.6], [-4.77, 48.36],
  [-4.73, 48.04], [-3.92, 47.87], [-3.12, 47.48], [-2.55, 47.5], [-2.2, 47.28],
  [-1.78, 46.5], [-1.15, 46.16], [-1.05, 45.6], [-1.16, 44.65], [-1.56, 43.48],
];

/** Die spanische Biskayaküste von Osten nach Westen bis Galicien. */
const SPANIEN_NORD = [
  [-1.79, 43.36], [-3.0, 43.35], [-3.8, 43.46], [-4.4, 43.4], [-5.66, 43.54],
  [-7.04, 43.54], [-7.69, 43.79], [-8.4, 43.37],
];

/** Galicien → Portugal nach Süden, aus dem Rahmen hinaus. */
const IBERIEN_ATLANTIK = [
  [-9.28, 42.9], [-8.87, 41.87], [-8.68, 41.15], [-8.87, 40.15],
  [-9.4, 38.7], [-8.99, 37.02],
];

/** Der Südrand liegt außerhalb des Rahmens und schließt den Ring. */
const SUEDRAND = [
  [-6.9, 37.2], [-6.29, 36.53], [-5.35, 36.14], [-4.42, 36.72], [-2.46, 36.83],
  [-1.58, 37.4], [-0.72, 37.63], [-0.48, 38.35], [0.16, 38.79],
];

/** Der große Ring: Iberien, Frankreich, Italien, die Niederlande, Jütland. */
const FESTLAND = verbinde(
  SPANIEN_MITTELMEER,
  FRANKREICH_MITTELMEER,
  ITALIEN_WEST,
  SCHNITT_UNTERHALB,
  ITALIEN_ADRIA,
  ISTRIEN_DALMATIEN,
  OST_UND_NORDRAND,
  NORDSEE_KANAL,
  FRANKREICH_ATLANTIK,
  SPANIEN_NORD,
  IBERIEN_ATLANTIK,
  SUEDRAND,
);

/**
 * Großbritannien — die Insel, auf der gerechnet wurde.
 *
 * Notiert von Land’s End im Uhrzeigersinn: Südküste, Themsemündung,
 * Ostküste, dann oberhalb des Rahmens geschlossen (Schottland liegt
 * nördlich von 54° N und damit außerhalb des Bildes), zurück über die
 * Irische See, Wales, den Bristolkanal und die Nordküste Cornwalls.
 */
const GROSSBRITANNIEN = [
  [-5.71, 50.07], [-5.2, 49.96], [-4.15, 50.33], [-3.65, 50.22], [-3.4, 50.6],
  [-2.45, 50.52], [-1.5, 50.72], [-0.79, 50.73], [0.25, 50.73], [0.58, 50.85],
  [0.97, 50.91], [1.35, 51.13], [1.44, 51.38], [1.0, 51.37], [0.55, 51.45],
  [0.7, 51.53], [0.95, 51.62], [1.29, 51.95], [1.6, 52.15], [1.75, 52.48],
  [1.73, 52.62], [1.3, 52.93], [0.4, 52.9], [0.05, 52.98], [0.34, 53.15],
  [0.1, 53.63], [-0.2, 54.08], [-1.3, 54.6], [-1.6, 55.6], [-3.0, 55.9],
  [-3.6, 54.6], [-3.0, 54.1], [-3.05, 53.85], [-3.1, 53.45], [-3.4, 53.35],
  [-3.83, 53.33], [-4.6, 53.4], [-4.75, 52.9], [-4.06, 52.72], [-4.08, 52.41],
  [-4.66, 52.1], [-5.3, 51.88], [-5.05, 51.71], [-4.3, 51.62], [-3.2, 51.45],
  [-2.7, 51.5], [-3.0, 51.2], [-3.5, 51.21], [-4.1, 51.2], [-4.5, 50.9],
  [-4.55, 50.55], [-5.08, 50.42], [-5.48, 50.21],
];

/** Korsika. */
const KORSIKA = [
  [9.4, 43.0], [9.5, 42.1], [9.2, 41.4], [8.6, 42.0], [8.7, 42.6],
];

/** Sardinien — der Rahmen schneidet sie unten ab, notiert ist sie ganz. */
const SARDINIEN = [
  [8.2, 41.1], [9.2, 41.2], [9.7, 40.5], [9.6, 39.3], [9.1, 39.2],
  [8.4, 38.9], [8.4, 39.9], [8.2, 40.6],
];

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt. Die
// Alpen sind hier keine Zierde: Der Student aus Kent ist zweimal über sie
// gegangen, hin nach Padua und zurück nach London.
// ---------------------------------------------------------------------------

/** Der Alpenbogen — grobe Fläche, keine Aussage über Gipfel oder Grenzen. */
const ALPEN = [
  [5.9, 46.2], [7.0, 45.7], [8.6, 45.7], [10.5, 46.1], [12.4, 46.4],
  [13.8, 46.6], [13.6, 47.5], [11.5, 47.6], [9.4, 47.4], [7.4, 46.9],
  [6.2, 46.5],
];

/** Die Pyrenäen. */
const PYRENAEEN = [
  [-1.6, 43.2], [0.4, 42.8], [2.0, 42.5], [3.1, 42.4], [2.4, 42.2],
  [0.6, 42.3], [-1.5, 42.8],
];

/** Der nördliche und mittlere Apennin — mehr zeigt der Rahmen nicht. */
const APENNIN = [
  [9.9, 44.2], [11.6, 43.5], [13.2, 42.6], [14.0, 41.7], [13.6, 41.5],
  [12.4, 42.4], [10.8, 43.4], [9.6, 44.0],
];

/** Die Themse — Oxford, Reading, London, Gravesend, Mündung. */
const THEMSE = [
  [-1.8, 51.6], [-1.26, 51.75], [-0.97, 51.45], [-0.34, 51.42], [-0.1, 51.5],
  [0.37, 51.44], [0.7, 51.5],
];

/** Die Seine — Burgund, Paris, Rouen, Le Havre. */
const SEINE = [
  [4.7, 47.8], [3.3, 48.4], [2.35, 48.85], [1.1, 49.44], [0.15, 49.45],
];

/** Die Loire — Massif Central, Nevers, Orléans, Tours, Nantes. */
const LOIRE = [
  [4.05, 45.0], [3.16, 46.99], [1.9, 47.9], [0.69, 47.39], [-1.55, 47.22],
  [-2.2, 47.28],
];

/** Der Rhein — Bodensee, Basel, Straßburg, Mainz, Köln, Rheinmündung. */
const RHEIN = [
  [9.6, 47.5], [8.6, 47.6], [7.6, 47.55], [7.62, 48.58], [8.0, 49.0],
  [8.27, 50.0], [7.6, 50.36], [7.1, 50.73], [6.9, 51.2], [6.1, 51.85],
  [5.0, 51.95], [4.15, 51.99],
];

/** Der Main — Oberfranken, Würzburg, Frankfurt, Mündung bei Mainz. */
const MAIN = [
  [11.3, 49.95], [10.9, 50.0], [9.93, 49.79], [9.1, 49.9], [8.68, 50.11],
  [8.27, 50.0],
];

/** Die Rhône — Genfersee, Lyon, Avignon, Camargue. */
const RHONE = [
  [6.15, 46.2], [4.84, 45.76], [4.8, 44.3], [4.65, 43.85], [4.85, 43.35],
];

/** Der Po — Turin, Piacenza, Ferrara, Delta. */
const PO = [
  [7.7, 45.07], [9.7, 45.05], [10.03, 45.13], [11.6, 44.9], [12.5, 44.95],
];

/** Die Donau — Donaueschingen, Ulm, Regensburg, Passau. */
const DONAU = [
  [8.5, 47.95], [10.0, 48.72], [12.1, 49.02], [13.44, 48.57],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  grossbritannien: GROSSBRITANNIEN,
  korsika: KORSIKA,
  sardinien: SARDINIEN,
  spanienMittelmeer: SPANIEN_MITTELMEER,
  frankreichMittelmeer: FRANKREICH_MITTELMEER,
  italienWest: ITALIEN_WEST,
  italienAdria: ITALIEN_ADRIA,
  nordseeKanal: NORDSEE_KANAL,
  frankreichAtlantik: FRANKREICH_ATLANTIK,
  spanienNord: SPANIEN_NORD,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [FESTLAND, GROSSBRITANNIEN, KORSIKA, SARDINIEN];

// ---------------------------------------------------------------------------
// Die Phasen: sechzig Jahre, in denen aus einer Beobachtung eine Rechnung,
// aus der Rechnung ein Buch und aus dem Buch eine Selbstverständlichkeit
// wird — die letzte Lücke schließt sich erst nach dem Tod des Rechners.
// ---------------------------------------------------------------------------

/** Phase 1 — Padua: das Studium bei Fabricius. */
const PADUA_STADT = [
  [11.6, 45.6], [12.2, 45.6], [12.2, 45.2], [11.6, 45.2],
];
const VENEDIG_TERRAFERMA = [
  [10.5, 46.3], [12.9, 46.0], [12.6, 45.0], [10.6, 45.1],
];
const WEG_UEBER_DIE_ALPEN = [
  [0.5, 51.5], [3.0, 50.0], [7.5, 47.5], [11.6, 45.6], [10.6, 45.1],
  [6.5, 46.8], [2.0, 49.0], [-0.3, 51.0],
];

/** Phase 2 — London: Hospital, College, Hörsaal. */
const LONDON_STADT = [
  [-0.35, 51.62], [0.1, 51.62], [0.1, 51.4], [-0.35, 51.4],
];
const ENGLAND_SUEDOST = [
  [-1.6, 52.4], [0.9, 52.3], [1.0, 50.9], [-1.8, 50.9],
];
const CAMBRIDGE_UMLAND = [
  [-0.15, 52.4], [0.4, 52.4], [0.4, 52.05], [-0.15, 52.05],
];

/** Phase 3 — Frankfurt: der Druck von 1628. */
const FRANKFURT_MAIN = [
  [8.4, 50.25], [9.0, 50.25], [9.0, 49.95], [8.4, 49.95],
];
const RHEIN_MAIN_LAND = [
  [7.6, 50.5], [9.4, 50.4], [9.3, 49.6], [7.7, 49.7],
];
const WEG_DER_BUECHER = [
  [-1.0, 51.6], [8.7, 50.1], [12.5, 47.5], [12.0, 44.5], [3.0, 46.0],
  [0.5, 48.8],
];

/** Phase 4 — der Widerstand in Paris, die Vollendung in Bologna. */
const PARIS_UMLAND = [
  [2.0, 49.1], [2.7, 49.1], [2.7, 48.6], [2.0, 48.6],
];
const BOLOGNA_UMLAND = [
  [11.0, 44.7], [11.7, 44.7], [11.7, 44.3], [11.0, 44.3],
];
const OBERITALIEN = [
  [7.5, 45.8], [12.5, 46.0], [12.3, 43.8], [8.0, 44.0],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(FESTLAND),
    land(GROSSBRITANNIEN),
    land(KORSIKA),
    land(SARDINIEN),
    gebirge(ALPEN),
    gebirge(PYRENAEEN),
    gebirge(APENNIN),
    fluss(THEMSE),
    fluss(SEINE),
    fluss(LOIRE),
    fluss(RHEIN),
    fluss(MAIN),
    fluss(RHONE),
    fluss(PO),
    fluss(DONAU),
  ],

  phasen: [
    {
      id: 'padua-1600',
      label: '1599–1602: Padua — Harvey studiert bei Fabricius',
      hinweis:
        'Der Engländer William Harvey schreibt sich an der Universität von ' +
        'Padua ein, der berühmtesten medizinischen Fakultät Europas. Sein ' +
        'Lehrer Hieronymus Fabricius ab Aquapendente hat dort 1594 das ' +
        'feste Anatomietheater bauen lassen und zeigt seinen Studenten die ' +
        'kleinen Klappen in den Venen. Fabricius hält sie für Bremsen, die ' +
        'verhindern, dass sich das Blut in Armen und Beinen staut. Harvey ' +
        'sieht dasselbe und denkt es später anders zu Ende. 1602 ' +
        'promoviert er und kehrt nach England zurück.',
      flaechen: [
        { titel: 'Padua und sein Anatomietheater', d: P.pfad(PADUA_STADT) },
        { titel: 'Das Festland Venedigs', d: P.pfad(VENEDIG_TERRAFERMA) },
        { titel: 'Der Weg über die Alpen und zurück', d: P.pfad(WEG_UEBER_DIE_ALPEN) },
      ],
    },
    {
      id: 'london-1616',
      label: '1616: London — die Lumleian Lectures',
      hinweis:
        'Harvey ist Arzt am St.-Bartholomäus-Hospital und Mitglied des ' +
        'College of Physicians, das ihn 1615 zum Lumleian-Dozenten wählt: ' +
        'Er hat jahrelang öffentlich zu sezieren und zu lehren. In den ' +
        'Notizen zu seinen Vorlesungen vom April 1616 steht zum ersten Mal ' +
        'der Satz, dass das Blut im Kreis geführt wird. Gedruckt wird davon ' +
        'zunächst nichts — Harvey rechnet, seziert und wartet zwölf weitere ' +
        'Jahre.',
      flaechen: [
        { titel: 'London — Hospital, College und Hörsaal', d: P.pfad(LONDON_STADT) },
        { titel: 'Cambridge, wo er zuerst studierte', d: P.pfad(CAMBRIDGE_UMLAND) },
        { titel: 'Der englische Südosten', d: P.pfad(ENGLAND_SUEDOST) },
      ],
    },
    {
      id: 'frankfurt-1628',
      label: '1628: Frankfurt — „De motu cordis" wird gedruckt',
      hinweis:
        'Das Buch über die Bewegung des Herzens und des Blutes erscheint ' +
        'nicht in London, sondern bei Wilhelm Fitzer in Frankfurt am Main — ' +
        'dort ist die Buchmesse, von dort geht ein Werk in ganz Europa auf ' +
        'Reisen. Es sind zweiundsiebzig Seiten auf schlechtem Papier, voller ' +
        'Druckfehler, gewidmet dem König von England. Kein Buch der ' +
        'Medizingeschichte hat auf so wenigen Seiten so viel umgeworfen.',
      flaechen: [
        { titel: 'Frankfurt am Main — die Druckerei und die Messe', d: P.pfad(FRANKFURT_MAIN) },
        { titel: 'Das Rhein-Main-Land', d: P.pfad(RHEIN_MAIN_LAND) },
        { titel: 'Der Weg der Bücher durch Europa', d: P.pfad(WEG_DER_BUECHER) },
      ],
    },
    {
      id: 'paris-bologna',
      label: '1649–1661: Widerspruch in Paris, Kapillaren in Bologna',
      hinweis:
        'Der Pariser Anatom Jean Riolan der Jüngere, der angesehenste ' +
        'Vertreter der alten Lehre, gesteht dem Kreislauf 1648 nur einen ' +
        'kleinen Teil des Blutes zu; Harvey antwortet ihm 1649 mit zwei ' +
        'Streitschriften. Die Lücke, die er selbst offengelassen hatte, ' +
        'schließt erst Marcello Malpighi: 1661 sieht er in Bologna unter ' +
        'dem Mikroskop die feinen Gefäße in der Lunge eines Frosches — die ' +
        'Verbindung zwischen Arterien und Venen. Harvey ist vier Jahre tot.',
      flaechen: [
        { titel: 'Paris — die Fakultät, die widersprach', d: P.pfad(PARIS_UMLAND) },
        { titel: 'Bologna, wo Malpighi die Kapillaren sah', d: P.pfad(BOLOGNA_UMLAND) },
        { titel: 'Oberitalien, wo weiter seziert wurde', d: P.pfad(OBERITALIEN) },
      ],
    },
  ],

  punkte: [
    {
      id: 'london',
      name: 'London',
      typ: 'ereignis',
      ...ort(-0.1, 51.517),
      text:
        'Hier geschieht fast alles: Harvey wird 1607 in das College of ' +
        'Physicians aufgenommen, 1609 Arzt am St.-Bartholomäus-Hospital und ' +
        '1615 Lumleian-Dozent. Im April 1616 spricht er in seiner Vorlesung ' +
        'zum ersten Mal aus, dass das Blut im Kreis läuft. Seine Notizen ' +
        'dazu sind erhalten — eine enge, lateinische Handschrift mit ' +
        'englischen Brocken dazwischen. Später wird er Leibarzt zweier ' +
        'Könige; im Bürgerkrieg gehen seine Aufzeichnungen verloren.',
    },
    {
      id: 'cambridge',
      name: 'Cambridge',
      typ: 'stadt',
      ...ort(0.119, 52.205),
      text:
        'Am Gonville and Caius College studierte Harvey ab 1593 — sechs ' +
        'Jahre, in denen ein Student vor allem Aristoteles las und lernte, ' +
        'streng zu argumentieren. Das College hatte als eines der wenigen ' +
        'in England das Recht, jährlich zwei hingerichtete Verbrecher zu ' +
        'sezieren. Wer verstehen will, warum Harvey später mit Zahlen und ' +
        'Schlussfolgerungen kämpfte statt mit Zitaten, findet hier den ' +
        'Anfang.',
    },
    {
      id: 'padua',
      name: 'Padua',
      typ: 'stadt',
      ...ort(11.877, 45.407),
      text:
        'Die freieste Universität Europas — und seit 1594 mit einem festen ' +
        'Anatomietheater, in dem Hunderte Zuschauer steil übereinander ' +
        'standen. Harvey studierte hier von 1599 bis 1602 bei Hieronymus ' +
        'Fabricius, der die Klappen in den Venen beschrieb und für Bremsen ' +
        'gegen das Stauen des Blutes hielt. Dieselben Klappen wurden ' +
        'fünfundzwanzig Jahre später Harveys stärkstes Argument — sie ' +
        'lassen das Blut nur in eine Richtung durch: zum Herzen hin.',
    },
    {
      id: 'frankfurt',
      name: 'Frankfurt am Main',
      typ: 'ereignis',
      ...ort(8.682, 50.111),
      text:
        '1628 druckt hier Wilhelm Fitzer „Exercitatio anatomica de motu ' +
        'cordis et sanguinis in animalibus" — zweiundsiebzig Seiten, ' +
        'schlechtes Papier, viele Setzfehler. Warum nicht in London? Weil ' +
        'in Frankfurt die Buchmesse stattfand: Von hier ging ein Buch in ' +
        'wenigen Monaten nach Paris, Leiden, Venedig und Basel. Harvey ' +
        'wollte gelesen werden — auch von denen, die ihm widersprechen ' +
        'würden.',
    },
    {
      id: 'paris',
      name: 'Paris',
      typ: 'stadt',
      ...ort(2.352, 48.857),
      text:
        'Die medizinische Fakultät von Paris war die Hochburg der alten ' +
        'Lehre. Ihr berühmtester Anatom, Jean Riolan der Jüngere, ließ 1648 ' +
        'nur einen kleinen Kreislauf gelten und behielt den Rest bei Galen. ' +
        'Harvey antwortete ihm höflich und hartnäckig mit zwei ' +
        'Streitschriften. Noch 1670 wurde in Paris gegen den Kreislauf ' +
        'gelehrt — nicht aus Dummheit, sondern weil ein ganzes Lehrgebäude ' +
        'daran hing.',
    },
    {
      id: 'bologna',
      name: 'Bologna',
      typ: 'ereignis',
      ...ort(11.343, 44.494),
      text:
        'Die Lücke in Harveys Beweis: Wie kommt das Blut von den Arterien ' +
        'in die Venen? Er hat sie nie sehen können, weil ihm das Mikroskop ' +
        'fehlte. 1661 richtet Marcello Malpighi in Bologna eine Linse auf ' +
        'die Lunge eines Frosches und sieht das Netz feinster Gefäße, das ' +
        'beide verbindet — die Kapillaren. Er veröffentlicht es in zwei ' +
        'Briefen an seinen Freund Borelli in Pisa. Harvey war vier Jahre ' +
        'zuvor gestorben.',
    },
  ],

  bewegungen: [
    {
      id: 'nach-padua',
      name: 'Der Student geht nach Padua',
      von: station(0.119, 52.205),
      ueber: [station(2.352, 48.857), station(7.588, 47.56)],
      nach: station(11.877, 45.407),
      text:
        'Nach sechs Jahren in Cambridge zog Harvey 1599 quer durch ' +
        'Frankreich und über die Alpen nach Padua — den Weg, den englische ' +
        'Medizinstudenten damals nahmen, wenn sie das Beste wollten. Dort ' +
        'lernte er bei Fabricius, was ein Anatomietheater ist, und sah zum ' +
        'ersten Mal die Klappen in den Venen. 1602 verließ er Padua als ' +
        'Doktor der Medizin.',
    },
    {
      id: 'zurueck-nach-london',
      name: 'Die Beobachtung reist mit nach London',
      von: station(11.877, 45.407),
      ueber: [station(9.53, 46.85), station(4.352, 50.847)],
      nach: station(-0.1, 51.517),
      text:
        'Was Harvey aus Padua mitbrachte, war kein Buch, sondern eine ' +
        'Gewohnheit: selbst nachzusehen. In London sezierte er zwanzig ' +
        'Jahre lang, was er bekommen konnte — Fische, Aale, Schnecken, ' +
        'Hunde, das Wild aus den königlichen Parks. Aus diesen Jahren ' +
        'stammen die Zahlen, mit denen er 1616 zum ersten Mal öffentlich ' +
        'rechnete.',
    },
    {
      id: 'buch-nach-frankfurt',
      name: 'Das Manuskript geht zur Buchmesse',
      von: station(-0.1, 51.517),
      ueber: [station(4.352, 50.847)],
      nach: station(8.682, 50.111),
      text:
        'Zwölf Jahre nach der ersten Vorlesung schickte Harvey seine ' +
        'zweiundsiebzig Seiten nach Frankfurt, wo Wilhelm Fitzer sie 1628 ' +
        'druckte. Der Umweg war Absicht: Über die Frankfurter Messe ' +
        'erreichte ein Buch ganz Europa. Der Widerspruch kam prompt — und ' +
        'genau das hatte Harvey gewollt.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 2.8, 53.3),
    schrift('Ärmelkanal', 'meer', -0.5, 50.1, -12),
    schrift('Irische See', 'meer', -5.0, 53.4),
    schrift('Atlantik', 'meer', -4.5, 46.5),
    schrift('Mittelmeer', 'meer', 6.0, 42.0),
    schrift('Adria', 'meer', 13.3, 44.4, -55),
    schrift('Alpen', 'land', 10.6, 46.6),
    schrift('Pyrenäen', 'land', 0.5, 42.7),
    schrift('Apennin', 'land', 11.9, 43.6, -55),
    schrift('Themse', 'meer', 0.45, 51.55),
    schrift('Rhein', 'meer', 7.35, 50.55, -70),
    schrift('Po', 'meer', 10.6, 45.05),
    schrift('England', 'land', -1.5, 52.3),
    schrift('Frankreich', 'land', 2.5, 46.5),
    schrift('Italien', 'land', 11.5, 43.5, -35),
    schrift('Deutsche Lande', 'land', 9.6, 50.3),
    schrift('Spanien', 'land', -3.5, 42.0),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
