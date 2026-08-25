// Karte zu „Paracelsus und Vesal" — Mitteleuropa im 16. Jahrhundert.
//
// Wie in den Kapiteln 1 bis 6 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-paracelsus-vesal.mjs nach.
//
// Was die Karte zeigen soll: den Raum, in dem sich zwei Lebenswege abspielen,
// die einander nie kreuzten. Der eine läuft quer hindurch — Einsiedeln,
// Villach, Ferrara, Basel, Nürnberg, Salzburg: die Wanderjahre des
// Paracelsus. Der andere führt von Brüssel nach Padua und endet 1543 in
// einer Basler Druckerei, in der Vesals „Fabrica" gesetzt wird. Beide Wege
// berühren dieselbe Stadt am Rheinknie, ohne dass sich die Männer je
// begegnet wären.
//
// Deshalb dieser Ausschnitt: von der flandrischen Küste bis nach Wien, von
// der Nordsee bis an die Adria. Er ist der engste des Buches — 14 Grad
// Länge —, und er zeigt genau die Landschaft, in der der Bruch mit der
// Autorität stattfand: die Alpen in der Mitte, die Universitätsstädte
// ringsherum.
//
// Aufbau der Landmassen: ein einziger großer Ring („Festland"), der von der
// spanischen Grenze über die französische Mittelmeerküste, Ligurien und die
// Toskana läuft, unterhalb des Rahmens quer über die Apenninhalbinsel
// schneidet, an der Adria wieder nach Norden zieht, über Istrien und
// Dalmatien nach Südosten ausläuft und dann außerhalb des Bildes herum bis
// zur Nordseeküste und über den Kanal zurückführt. Norden, Osten, Westen und
// Süden laufen bewusst über den Bildrand hinaus — die SVG-Fläche schneidet
// den Überstand ab. Inseln braucht dieser Ausschnitt keine: Korsika und
// Sardinien liegen unterhalb, England westlich davon.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von Flandern bis Wien, von der Nordsee bis zur Adria.
 */
const RAHMEN = {
  minLon: 2,
  maxLon: 16,
  minLat: 43.5,
  maxLat: 52.5,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 6, damit alle Karten des
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

/** Katalonien → Roussillon → Golfe du Lion → Provence → Côte d’Azur. */
const MITTELMEER_FRANKREICH = [
  [1.5, 42.2], [2.6, 42.3], [3.28, 42.32], [3.05, 42.99], [3.7, 43.4],
  [4.14, 43.47], [4.85, 43.35], [5.35, 43.29], [5.93, 43.08], [6.63, 43.26],
  [7.02, 43.55], [7.5, 43.78],
];

/** Ligurien → Toskana; danach verlässt die Küste den Rahmen nach Süden. */
const ITALIEN_WEST = [
  [8.03, 43.88], [8.49, 44.31], [8.93, 44.41], [9.4, 44.27], [9.83, 44.07],
  [10.24, 43.87], [10.31, 43.54], [10.5, 43.0],
];

/**
 * Der Schnitt unterhalb des Rahmens.
 *
 * Mittelitalien läuft weit nach Süden aus dem Bild. Statt den ganzen Stiefel
 * mitzuschleppen, wird die Halbinsel unterhalb des Rahmens (bei ~43° N)
 * quer geschlossen — sichtbar wird davon nichts, und die Landfläche bleibt
 * für die Prüfung ein sauberer Ring.
 */
const SCHNITT_UNTERHALB = [
  [11.5, 42.8], [13.3, 43.0],
];

/** Marken → Romagna → Po-Delta → Lagune von Venedig → Triest. */
const ITALIEN_ADRIA = [
  [13.51, 43.62], [12.57, 44.06], [12.28, 44.42], [12.5, 44.85],
  [12.34, 45.44], [13.06, 45.66], [13.77, 45.65],
];

/** Istrien → Kvarner → Dalmatien, dann aus dem Rahmen nach Südosten. */
const ISTRIEN_DALMATIEN = [
  [13.6, 45.23], [13.85, 44.87], [14.45, 45.33], [15.23, 44.12],
  [16.44, 43.51], [17.3, 43.1],
];

/** Ost- und Nordrand: bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const OST_UND_NORDRAND = [
  [17.6, 43.0], [17.6, 53.3], [12.0, 53.4], [9.0, 53.3],
];

/** Watt → Holland → Zeeland → Flandern → Kanalküste der Normandie. */
const NORDSEE_KANAL = [
  [6.2, 53.45], [5.4, 53.3], [4.75, 52.96], [4.55, 52.46], [4.12, 51.98],
  [3.7, 51.55], [3.4, 51.42], [2.92, 51.23], [2.37, 51.03], [1.85, 50.96],
  [1.6, 50.72], [1.55, 50.22], [1.08, 49.93], [0.11, 49.49],
];

/** Der Westrand liegt außerhalb des Rahmens und schließt den Ring. */
const WESTRAND = [
  [-0.6, 49.35], [-1.5, 47.0], [-1.0, 44.0], [0.5, 42.6],
];

/** Der große Ring: Frankreich, Italien, der Balkan, das Reich, die Niederlande. */
const FESTLAND = verbinde(
  MITTELMEER_FRANKREICH,
  ITALIEN_WEST,
  SCHNITT_UNTERHALB,
  ITALIEN_ADRIA,
  ISTRIEN_DALMATIEN,
  OST_UND_NORDRAND,
  NORDSEE_KANAL,
  WESTRAND,
);

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt. Die
// Alpen sind hier keine Zierde: Sie liegen zwischen Padua und Basel, und über
// sie mussten die Druckstöcke der „Fabrica" getragen werden.
// ---------------------------------------------------------------------------

/** Der Alpenbogen — grobe Fläche, keine Aussage über Gipfel oder Grenzen. */
const ALPEN = [
  [5.9, 46.2], [7.0, 45.7], [8.6, 45.7], [10.5, 46.1], [12.4, 46.4],
  [13.8, 46.6], [15.2, 47.3], [13.6, 47.7], [11.5, 47.6], [9.4, 47.4],
  [7.4, 46.9], [6.2, 46.5],
];

/** Der nördliche Apennin — mehr zeigt der Rahmen nicht. */
const APENNIN = [
  [9.9, 44.2], [11.6, 43.5], [12.6, 43.2], [12.3, 43.0], [11.4, 43.4],
  [9.6, 44.0],
];

/** Der Rhein — Bodensee, Basel, Straßburg, Mainz, Köln, Rheinmündung. */
const RHEIN = [
  [9.6, 47.5], [8.6, 47.6], [7.6, 47.55], [7.62, 48.58], [8.0, 49.0],
  [8.27, 50.0], [7.6, 50.36], [7.1, 50.73], [6.9, 51.2], [6.1, 51.85],
  [5.0, 51.95], [4.15, 51.99],
];

/** Die Donau — Donaueschingen, Ulm, Regensburg, Passau, Wien. */
const DONAU = [
  [8.5, 47.95], [10.0, 48.72], [12.1, 49.02], [13.44, 48.57], [15.6, 48.38],
  [16.37, 48.2],
];

/** Die Rhône — Genfersee, Lyon, Avignon, Camargue. */
const RHONE = [
  [6.15, 46.2], [4.84, 45.76], [4.8, 44.3], [4.65, 43.85], [4.85, 43.35],
];

/** Der Po — Turin, Piacenza, Ferrara, Delta. */
const PO = [
  [7.7, 45.07], [9.7, 45.05], [10.03, 45.13], [11.6, 44.9], [12.5, 44.95],
];

/** Die Elbe — Böhmen, Dresden, Magdeburg, Hamburg. */
const ELBE = [
  [14.2, 50.78], [13.74, 51.05], [11.63, 52.13], [9.98, 53.55],
];

/** Die Seine — Burgund, Paris, Rouen, Le Havre. */
const SEINE = [
  [4.7, 47.8], [3.3, 48.4], [2.35, 48.85], [1.1, 49.44], [0.15, 49.45],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  mittelmeerFrankreich: MITTELMEER_FRANKREICH,
  italienWest: ITALIEN_WEST,
  italienAdria: ITALIEN_ADRIA,
  istrienDalmatien: ISTRIEN_DALMATIEN,
  nordseeKanal: NORDSEE_KANAL,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [FESTLAND];

// ---------------------------------------------------------------------------
// Die Phasen: fünfzig Jahre, in denen zwei Männer unabhängig voneinander
// dieselbe Autorität angreifen — der eine laut, der andere leise.
// ---------------------------------------------------------------------------

/** Phase 1 — Geburt, Bergwerk, Wanderjahre. */
const EINSIEDELN_UMLAND = [
  [8.5, 47.3], [9.1, 47.3], [9.1, 46.95], [8.5, 46.95],
];
const VILLACH_KAERNTEN = [
  [13.3, 46.9], [14.6, 46.9], [14.6, 46.4], [13.3, 46.4],
];
const WANDERJAHRE = [
  [3.0, 50.5], [8.0, 51.5], [13.0, 50.5], [16.0, 48.0], [13.5, 44.5],
  [10.5, 44.0], [6.0, 45.5], [3.5, 47.5],
];

/** Phase 2 — Basel 1527. */
const BASEL_STADT = [
  [7.35, 47.72], [7.85, 47.72], [7.85, 47.4], [7.35, 47.4],
];
const OBERRHEIN = [
  [7.2, 49.2], [8.6, 49.2], [8.4, 47.4], [7.3, 47.4],
];
const GELEHRTE_STAEDTE = [
  [2.4, 48.9], [12.4, 51.3], [16.4, 48.2], [11.9, 45.4], [7.6, 47.6],
];

/** Phase 3 — die Jahre nach der Flucht bis Salzburg. */
const NUERNBERG_UMLAND = [
  [10.7, 49.7], [11.5, 49.7], [11.5, 49.2], [10.7, 49.2],
];
const SALZBURG_UMLAND = [
  [12.7, 48.0], [13.4, 48.0], [13.4, 47.6], [12.7, 47.6],
];
const SPAETE_WANDERUNG = [
  [7.4, 47.6], [11.1, 49.5], [13.0, 47.8], [13.9, 46.6], [10.0, 46.5],
];

/** Phase 4 — Padua und Basel 1543. */
const PADUA_VENETO = [
  [11.5, 45.7], [12.5, 45.7], [12.5, 45.1], [11.5, 45.1],
];
const VENEDIG_TERRAFERMA = [
  [10.5, 46.3], [12.9, 46.0], [12.6, 45.0], [10.6, 45.1],
];
const BRABANT = [
  [3.9, 51.2], [5.2, 51.2], [5.2, 50.6], [3.9, 50.6],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(FESTLAND),
    gebirge(ALPEN),
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
      id: 'einsiedeln',
      label: '1493–1524: Einsiedeln, Villach und die Wanderjahre',
      hinweis:
        'Bei Einsiedeln in der Schweiz wird um 1493 Theophrastus Bombastus ' +
        'von Hohenheim geboren, der Sohn eines Wundarztes. 1502 zieht die ' +
        'Familie nach Villach in Kärnten, wo der Vater an der Bergschule ' +
        'unterrichtet — dort lernt der Junge die Metalle, die Öfen und die ' +
        'Krankheiten der Bergleute kennen. Danach zieht er jahrelang durch ' +
        'Europa und lernt bei Badern, Hebammen, Wundärzten und Bergleuten ' +
        'statt an den Fakultäten.',
      flaechen: [
        { titel: 'Einsiedeln und die Innerschweiz', d: P.pfad(EINSIEDELN_UMLAND) },
        { titel: 'Villach in Kärnten — die Bergwerksstadt', d: P.pfad(VILLACH_KAERNTEN) },
        { titel: 'Der Raum der Wanderjahre', d: P.pfad(WANDERJAHRE) },
      ],
    },
    {
      id: 'basel-1527',
      label: '1527: Basel — der Bücherverbrand',
      hinweis:
        'Nachdem er das Bein des Druckers Johannes Froben behandelt hat, ' +
        'wird Paracelsus 1527 Stadtarzt von Basel und liest an der ' +
        'Universität — auf Deutsch statt auf Latein, und für jeden, der ' +
        'kommen will. Am Johannistag wirft er die Bücher der alten ' +
        'Autoritäten ins Feuer der Studenten. Ein Streit um ein Honorar ' +
        'bringt ihn vor Gericht; Anfang 1528 muss er die Stadt fluchtartig ' +
        'verlassen.',
      flaechen: [
        { titel: 'Basel am Rheinknie', d: P.pfad(BASEL_STADT) },
        { titel: 'Der Oberrhein', d: P.pfad(OBERRHEIN) },
        { titel: 'Die gelehrten Städte, die ihn ablehnten', d: P.pfad(GELEHRTE_STAEDTE) },
      ],
    },
    {
      id: 'salzburg-1541',
      label: '1528–1541: die späten Jahre bis Salzburg',
      hinweis:
        'Nach der Flucht aus Basel bleibt Paracelsus ohne Amt. In Nürnberg ' +
        'wird 1530 sein Buch über die Franzosenkrankheit auf Betreiben der ' +
        'Leipziger Fakultät gestoppt. 1534 schreibt er in Kärnten über die ' +
        'Bergsucht — die erste Schrift über eine Berufskrankheit. Am 24. ' +
        'September 1541 stirbt er in Salzburg, etwa achtundvierzig Jahre ' +
        'alt. Der größte Teil seiner Werke erscheint erst Jahrzehnte nach ' +
        'seinem Tod.',
      flaechen: [
        { titel: 'Nürnberg — die gestoppte Schrift von 1530', d: P.pfad(NUERNBERG_UMLAND) },
        { titel: 'Salzburg, wo er 1541 stirbt', d: P.pfad(SALZBURG_UMLAND) },
        { titel: 'Die späten Wege zwischen Rhein, Donau und Alpen', d: P.pfad(SPAETE_WANDERUNG) },
      ],
    },
    {
      id: 'fabrica-1543',
      label: '1543: Padua und Basel — die „Fabrica" erscheint',
      hinweis:
        'Andreas Vesal, 1514 in Brüssel geboren, lehrt seit 1537 in Padua ' +
        'und seziert dort selbst, statt vorlesen zu lassen. 1543 erscheint ' +
        'sein Anatomiewerk „De humani corporis fabrica" — gedruckt in Basel ' +
        'von Johannes Oporinus, der sechzehn Jahre zuvor der Gehilfe des ' +
        'Paracelsus gewesen war. Die beiden Männer sind einander nie ' +
        'begegnet; ihre Wege treffen sich nur in dieser Druckerei.',
      flaechen: [
        { titel: 'Brabant — Vesals Herkunft', d: P.pfad(BRABANT) },
        { titel: 'Padua und das Gebiet Venedigs', d: P.pfad(VENEDIG_TERRAFERMA) },
        { titel: 'Padua, wo seziert wird', d: P.pfad(PADUA_VENETO) },
        { titel: 'Basel, wo die „Fabrica" gedruckt wird', d: P.pfad(BASEL_STADT) },
      ],
    },
  ],

  punkte: [
    {
      id: 'einsiedeln',
      name: 'Einsiedeln',
      typ: 'ereignis',
      ...ort(8.752, 47.127),
      text:
        'Am Ortsrand von Einsiedeln, an der Teufelsbrücke über die Sihl, ' +
        'wurde um 1493 Theophrastus Bombastus von Hohenheim geboren — der ' +
        'Mann, der sich später Paracelsus nannte. Sein Vater war Arzt und ' +
        'sein erster Lehrer. Was er nie hatte, war eine gesicherte ' +
        'akademische Laufbahn: Wo genau er studierte und ob er den ' +
        'Doktorgrad wirklich erwarb, ist bis heute umstritten — ein Punkt, ' +
        'an dem ihn seine Gegner ihr Leben lang packten.',
    },
    {
      id: 'villach',
      name: 'Villach in Kärnten',
      typ: 'stadt',
      ...ort(13.855, 46.615),
      text:
        'Hierher zog die Familie 1502. Der Vater unterrichtete an der ' +
        'Bergschule, und der Junge wuchs zwischen Schmelzöfen, Stollen und ' +
        'Bergleuten auf. Das prägte alles Weitere: Wer gesehen hat, wie aus ' +
        'Erz Metall wird, denkt über den Körper anders nach als jemand, der ' +
        'nur Bücher kennt. In Kärnten schrieb Paracelsus 1534 auch „Von der ' +
        'Bergsucht" — die erste Schrift über eine Krankheit, die aus der ' +
        'Arbeit kommt.',
    },
    {
      id: 'basel',
      name: 'Basel',
      typ: 'ereignis',
      ...ort(7.588, 47.56),
      text:
        'Die Stadt, in der beide Fäden dieses Kapitels zusammenlaufen. 1527 ' +
        'wird Paracelsus hier Stadtarzt, liest auf Deutsch statt auf Latein ' +
        'und wirft am Johannistag die Bücher der alten Autoritäten ins ' +
        'Feuer; ein Jahr später flieht er. 1543 druckt in derselben Stadt ' +
        'Johannes Oporinus — einst der Gehilfe des Paracelsus — Vesals ' +
        '„Fabrica", das genaueste Anatomiewerk, das es bis dahin gab.',
    },
    {
      id: 'salzburg',
      name: 'Salzburg',
      typ: 'ereignis',
      ...ort(13.046, 47.803),
      text:
        'Am 24. September 1541 starb Paracelsus in einem Gasthaus in ' +
        'Salzburg, etwa achtundvierzig Jahre alt, ohne Amt und ohne Schule. ' +
        'Zu Lebzeiten war fast nichts von ihm gedruckt worden außer der ' +
        '„Grossen Wundartzney". Erst Jahrzehnte später sammelten Anhänger ' +
        'seine Handschriften und brachten sie heraus — und lösten damit ' +
        'einen Streit aus, der über hundert Jahre dauerte.',
    },
    {
      id: 'padua',
      name: 'Padua',
      typ: 'stadt',
      ...ort(11.877, 45.407),
      text:
        'Die Universität im Gebiet Venedigs war die freieste Europas — und ' +
        'sie gab dem dreiundzwanzigjährigen Andreas Vesal 1537 einen ' +
        'Lehrstuhl. Vesal machte etwas Unerhörtes: Er stieg selbst zur ' +
        'Leiche hinunter, statt von der Kanzel aus vorlesen zu lassen, ' +
        'während ein Bader schnitt. Was er dabei fand, stimmte an vielen ' +
        'Stellen nicht mit Galen überein. Hier entstand die „Fabrica".',
    },
    {
      id: 'bruessel',
      name: 'Brüssel',
      typ: 'stadt',
      ...ort(4.352, 50.847),
      text:
        'Hier wurde Andreas Vesal 1514 geboren, in eine Familie von ' +
        'Hofärzten und Apothekern — das genaue Gegenteil der Herkunft des ' +
        'Paracelsus. Er studierte in Löwen und Paris, wo Sezieren noch ' +
        'Nebensache war, und ging dann nach Italien. Später wurde er ' +
        'Leibarzt Kaiser Karls V. und Philipps II. — der Anatom, der die ' +
        'Autorität widerlegte, machte selbst die glänzendere Karriere.',
    },
  ],

  bewegungen: [
    {
      id: 'wanderjahre',
      name: 'Die Wanderjahre des Paracelsus',
      von: station(8.752, 47.127),
      ueber: [station(13.855, 46.615), station(11.62, 44.84)],
      nach: station(7.588, 47.56),
      text:
        'Von Einsiedeln nach Villach, von dort vermutlich zum Studium nach ' +
        'Ferrara und dann quer durch Europa: als Feldscher in Kriegen, bei ' +
        'Bergleuten, Badern und Hebammen. Paracelsus lernte unterwegs und ' +
        'nannte diese Jahre selbst seine Universität — die Erfahrung sei ' +
        'der Lehrmeister, nicht das Buch. 1527 endete der Weg vorerst in ' +
        'Basel.',
    },
    {
      id: 'flucht-nach-salzburg',
      name: 'Nach der Flucht aus Basel',
      von: station(7.588, 47.56),
      ueber: [station(11.08, 49.45)],
      nach: station(13.046, 47.803),
      text:
        'Anfang 1528 verließ Paracelsus Basel bei Nacht, nachdem ein ' +
        'Honorarstreit vor Gericht gegen ihn ausgegangen war. Danach blieb ' +
        'er heimatlos. In Nürnberg wurde 1530 sein Buch über die ' +
        'Franzosenkrankheit gestoppt, in Kärnten schrieb er über die ' +
        'Bergsucht, und 1541 starb er in Salzburg.',
    },
    {
      id: 'fabrica-nach-basel',
      name: 'Die Druckstöcke der „Fabrica" gehen über die Alpen',
      von: station(11.877, 45.407),
      ueber: [station(9.53, 46.85)],
      nach: station(7.588, 47.56),
      text:
        'Vesal ließ die Holzstöcke für die Abbildungen seines Werks in ' +
        'Venedig schneiden und über die Alpen nach Basel bringen, zu ' +
        'Johannes Oporinus — dem besten Drucker für ein solches Buch. 1543 ' +
        'erschien die „Fabrica". Derselbe Oporinus hatte 1527 als junger ' +
        'Mann dem Paracelsus die Kohlen im Ofen nachgelegt.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 3.2, 52.0),
    schrift('Mittelmeer', 'meer', 8.7, 43.7),
    schrift('Adria', 'meer', 13.4, 44.3, -55),
    schrift('Alpen', 'land', 10.6, 46.6),
    schrift('Rhein', 'meer', 7.35, 50.55, -70),
    schrift('Donau', 'meer', 12.6, 48.85, 10),
    schrift('Po', 'meer', 10.6, 45.05),
    schrift('Elbe', 'meer', 12.3, 51.6, -55),
    schrift('Venedig', 'land', 12.15, 45.55),
    schrift('Schweiz', 'land', 8.0, 46.85),
    schrift('Kärnten', 'land', 14.2, 46.75),
    schrift('Italien', 'land', 11.3, 44.2, -35),
    schrift('Flandern', 'land', 3.6, 51.0),
    schrift('Deutsche Lande', 'land', 9.6, 50.3),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
