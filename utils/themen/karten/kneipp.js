// Karte zu „Kneipp und die Naturheilkunde" — Bayerisch-Schwaben zwischen
// Iller, Lech und Donau, 1821 bis 1897.
//
// Wie in den Kapiteln 1 bis 16 stehen alle Linien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-kneipp.mjs nach.
//
// Was die Karte zeigen soll: Ein Leben, das sich fast vollständig zwischen
// vier Flüssen abspielt — und eine Kur, die von einem Dorf aus um die Welt
// ging. Stefansried im Allgäu, wo Sebastian Kneipp 1821 als Weberssohn
// geboren wird. Grönenbach, wo ihm ein Kaplan Latein beibringt und damit
// den Weg in die Schule öffnet. Dillingen an der Donau, wo der kranke
// Student im Winter 1849 in den eiskalten Fluss steigt. München und
// Augsburg, wo er studiert und 1852 zum Priester geweiht wird. Boos im
// Illertal, wo er 1854 Cholerakranke pflegt. Und Wörishofen, das kleine
// Dorf zwischen Wertach und Mindel, aus dem in vierzig Jahren ein Kurort
// von Weltruf wird.
//
// Deshalb dieser kleine Ausschnitt: 2,5 Grad Länge und 1,2 Grad Breite,
// vom oberschwäbischen Hügelland bis an die Isar, vom Alpenrand bis an die
// Donau. Rom, wo Kneipp 1894 von Papst Leo XIII. empfangen wurde, liegt
// weit außerhalb — es bleibt eine Bewegung, die das Blatt verlässt.
//
// Zwei Besonderheiten, die dieses Blatt mit der Karte zu Kapitel 16 teilt:
//   1. Der Ausschnitt hat kein Meer. Der Atlas-Test prüft deshalb nicht
//      Küstenlinien, sondern FLUSSLÄUFE: Orte, die im Atlas am Wasser
//      liegen, müssen auf der gezeichneten Linie liegen — und Orte im
//      Trockenen müssen Abstand dazu halten. Für ein Wasser-Kapitel ist
//      das die passende Prüfung.
//   2. Statt eines Reichsgebiets trägt eine Landschaft die Prüfung: der
//      bayerische Regierungsbezirk SCHWABEN, dessen östliche Grenze grob
//      dem Lech folgt. Kneipps ganzes Leben spielt in diesem Bezirk —
//      nur zum Studium ging er über den Lech nach München. Die Linie ist
//      eine grobe Umrisslinie im Maßstab dieses Blattes; die vielen
//      kleinen Ausbuchtungen der heutigen Bezirksgrenze (etwa um
//      Landsberg am Lech) sind nicht dargestellt.

const {
  KARTENFARBEN,
  erstelleProjektion,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von Oberschwaben bis an die Isar, vom Alpenrand
 * bis an die Donau.
 */
const RAHMEN = {
  minLon: 9.7,
  maxLon: 12.2,
  minLat: 47.6,
  maxLat: 48.8,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 16, damit alle Karten
// des Buches gleich aussehen und gleich zu lesen sind.
// ---------------------------------------------------------------------------

/** Eine Landmasse: Sandbeige mit dünnem Rand. */
function land(orte) {
  return {
    art: 'land',
    d: P.pfad(orte),
    fill: KARTENFARBEN.land,
    stroke: KARTENFARBEN.landRand,
    strokeWidth: 1,
  };
}

/** Ein Gebirgszug — eine Spur tiefer als das Land, ohne Rand. */
function gebirge(orte) {
  return {
    art: 'gebirge',
    d: P.pfad(orte),
    fill: KARTENFARBEN.wueste,
    stroke: 'none',
    strokeWidth: 0,
  };
}

/** Ein See: die Wasserfarbe der Karte, geschlossene Fläche. */
function see(orte) {
  return {
    art: 'see',
    d: P.pfad(orte),
    fill: KARTENFARBEN.meer,
    stroke: KARTENFARBEN.fluss,
    strokeWidth: 1,
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

/**
 * Ein kleines Rechteck um einen Ort — so tragen die Phasen ihre Flächen.
 *
 * @param {number} lon Mittelpunkt
 * @param {number} lat Mittelpunkt
 * @param {number} [halbeBreite] in Grad Länge
 * @param {number} [halbeHoehe] in Grad Breite
 */
function ortsflaeche(lon, lat, halbeBreite = 0.07, halbeHoehe = 0.045) {
  return [
    [lon - halbeBreite, lat + halbeHoehe],
    [lon + halbeBreite, lat + halbeHoehe],
    [lon + halbeBreite, lat - halbeHoehe],
    [lon - halbeBreite, lat - halbeHoehe],
  ];
}

// ---------------------------------------------------------------------------
// Der Untergrund
// ---------------------------------------------------------------------------

/**
 * Die Landfläche.
 *
 * Auf diesem Blatt gibt es kein Meer: Der Ausschnitt liegt vollständig im
 * Binnenland. Der Ring wird deshalb bewusst außerhalb des Rahmens
 * geschlossen, damit die Fläche am Bildrand ausläuft, statt abzuknicken.
 */
const LAND = [
  [9.3, 47.2], [12.6, 47.2], [12.6, 49.2], [9.3, 49.2],
];

/**
 * Der Alpenrand im Süden des Blattes.
 *
 * Die Alpen selbst liegen größtenteils unterhalb des Ausschnitts; sichtbar
 * ist der Nordrand, der von Füssen (rund 47,57° Nord) über Murnau nach
 * Osten zum Tegernsee ansteigt.
 */
const ALPENRAND = [
  [9.7, 47.62], [10.1, 47.6], [10.35, 47.62], [10.7, 47.6],
  [11.1, 47.68], [11.4, 47.7], [11.75, 47.68], [12.2, 47.72],
  [12.2, 47.3], [9.7, 47.3],
];

/** Die Schwäbische Alb — nur ihr Südostzipfel liegt auf dem Blatt. */
const SCHWAEBISCHE_ALB = [
  [9.7, 48.5], [10.05, 48.58], [10.2, 48.72], [10.1, 48.8],
  [9.7, 48.78],
];

/** Der Hügelzug des Ries-Randes nördlich der Donau. */
const RIESRAND = [
  [10.55, 48.78], [10.9, 48.78], [11.05, 48.8], [10.6, 48.8],
];

// ---------------------------------------------------------------------------
// Die Flüsse — der Atlas-Test schlägt sie Ort für Ort nach.
// ---------------------------------------------------------------------------

/**
 * Die Donau: von Ehingen über Ulm, Günzburg, Dillingen und Donauwörth
 * nach Ingolstadt.
 *
 * An ihr liegt die Wende dieses Kapitels: In Dillingen stieg der kranke
 * Student Kneipp im Winter 1849 in das eiskalte Wasser.
 */
const DONAU = [
  [9.7, 48.27], [9.8, 48.29], [9.89, 48.33], [9.96, 48.38],
  [10.05, 48.41], [10.16, 48.44], [10.28, 48.455], [10.38, 48.5],
  [10.45, 48.565], [10.56, 48.59], [10.66, 48.65], [10.78, 48.715],
  [10.92, 48.73], [11.06, 48.72], [11.19, 48.735], [11.33, 48.755],
  [11.45, 48.77], [11.58, 48.79],
];

/**
 * Die Iller: aus dem Allgäu über Kempten und Illertissen zur Donau bei Ulm.
 *
 * Sie ist der Fluss von Kneipps Kindheit: Stefansried, Ottobeuren,
 * Grönenbach und Boos liegen in ihrem Einzugsgebiet.
 */
const ILLER = [
  [10.3, 47.6], [10.315, 47.68], [10.3, 47.76], [10.24, 47.82],
  [10.17, 47.88], [10.13, 47.95], [10.12, 48.03], [10.11, 48.12],
  [10.1, 48.21], [10.08, 48.3], [10.03, 48.36], [9.99, 48.4],
];

/**
 * Der Lech: aus Tirol über Füssen, Landsberg und Augsburg zur Donau.
 *
 * Er ist die alte Ostgrenze Schwabens — jenseits des Lech beginnt
 * Oberbayern. Kneipp überschritt sie nur für das Studium in München.
 */
const LECH = [
  [10.7, 47.57], [10.76, 47.66], [10.85, 47.76], [10.9, 47.88],
  [10.89, 47.98], [10.88, 48.06], [10.85, 48.15], [10.86, 48.24],
  [10.9, 48.31], [10.925, 48.38], [10.91, 48.46], [10.9, 48.55],
  [10.91, 48.63], [10.92, 48.71],
];

/**
 * Die Wertach: aus dem Allgäu über Kaufbeuren und Türkheim nach Augsburg,
 * wo sie in den Lech mündet.
 *
 * Der Fluss, an dessen Talrand Wörishofen liegt.
 */
const WERTACH = [
  [10.41, 47.6], [10.48, 47.7], [10.57, 47.8], [10.62, 47.88],
  [10.63, 47.97], [10.65, 48.06], [10.71, 48.14], [10.78, 48.21],
  [10.83, 48.28], [10.86, 48.34], [10.89, 48.39],
];

/**
 * Die Mindel: der kleine Fluss zwischen Iller und Wertach, der dem
 * Mindeltal und dem Landkreis den Namen gab.
 */
const MINDEL = [
  [10.46, 47.87], [10.48, 47.97], [10.49, 48.05], [10.47, 48.15],
  [10.47, 48.25], [10.45, 48.34], [10.43, 48.42], [10.4, 48.51],
];

/** Die Isar: aus dem Karwendel über München und Freising nach Nordosten. */
const ISAR = [
  [11.5, 47.6], [11.56, 47.7], [11.55, 47.79], [11.47, 47.88],
  [11.42, 47.96], [11.47, 48.04], [11.53, 48.1], [11.585, 48.15],
  [11.62, 48.23], [11.68, 48.32], [11.75, 48.4], [11.85, 48.44],
  [11.95, 48.47], [12.1, 48.5],
];

/** Der Ammersee — der westliche der beiden großen Voralpenseen. */
const AMMERSEE = [
  [11.1, 48.09], [11.16, 48.06], [11.19, 48.0], [11.16, 47.96],
  [11.11, 47.95], [11.07, 47.99], [11.06, 48.04],
];

/** Der Starnberger See — der östliche der beiden. */
const STARNBERGER_SEE = [
  [11.34, 48.0], [11.36, 47.94], [11.34, 47.89], [11.3, 47.85],
  [11.26, 47.88], [11.27, 47.94], [11.31, 47.99],
];

// ---------------------------------------------------------------------------
// Die Landschaft, an der dieses Kapitel hängt.
// ---------------------------------------------------------------------------

/**
 * Der Regierungsbezirk Schwaben — grobe Umrisslinie.
 *
 * Bayerisch-Schwaben reicht vom Alpenrand bis über die Donau und wird im
 * Osten grob vom Lech begrenzt; im Westen liegt die alte Grenze zu
 * Württemberg, die im Illertal verläuft. In diesem Bezirk spielt Kneipps
 * ganzes Leben: Stefansried, Grönenbach, Ottobeuren, Memmingen, Boos,
 * Dillingen, Augsburg und Wörishofen liegen alle darin. Nur zum Studium
 * ging er über den Lech nach München — nach Oberbayern.
 *
 * Die Linie ist eine Vereinfachung im Maßstab dieses Blattes. Die
 * tatsächliche Bezirksgrenze macht mehrere Bögen, unter anderem westlich
 * des Lech bei Landsberg; solche Feinheiten sind hier nicht dargestellt.
 */
const SCHWABEN = [
  [9.72, 47.6], [9.72, 47.68], [9.8, 47.72], [9.9, 47.68],
  [10.0, 47.72], [10.06, 47.8], [10.05, 47.95], [10.08, 48.1],
  [10.06, 48.25], [10.0, 48.36], [9.97, 48.42], [10.06, 48.52],
  [10.18, 48.6], [10.28, 48.7], [10.32, 48.8], [11.0, 48.8],
  [10.98, 48.72], [10.94, 48.68], [10.93, 48.55], [10.94, 48.36],
  [10.88, 48.2], [10.9, 48.05], [10.93, 47.9], [10.86, 47.75],
  [10.72, 47.6],
];

// ---------------------------------------------------------------------------
// Die Orte als kleine Flächen — sie tragen die Phasen.
// ---------------------------------------------------------------------------

/** Stefansried bei Ottobeuren — Geburtsort 1821. */
const STEFANSRIED_ORT = ortsflaeche(10.344, 47.958);

/** Grönenbach — der Lateinunterricht bei Kaplan Merkle. */
const GROENENBACH_ORT = ortsflaeche(10.214, 47.878);

/** Ottobeuren — die Benediktinerabtei, zu der Stefansried gehört. */
const OTTOBEUREN_ORT = ortsflaeche(10.299, 47.94);

/** Dillingen an der Donau — Gymnasium, Lyzeum und das kalte Wasser. */
const DILLINGEN_ORT = ortsflaeche(10.496, 48.579);

/** München — das Studienjahr im Georgianum. */
const MUENCHEN_STADT = ortsflaeche(11.576, 48.137, 0.09, 0.055);

/** Augsburg — die Priesterweihe von 1852. */
const AUGSBURG_STADT = ortsflaeche(10.898, 48.371, 0.08, 0.05);

/** Boos im Illertal — die Kaplansjahre und die Cholera von 1854. */
const BOOS_ORT = ortsflaeche(10.125, 48.003, 0.05, 0.035);

/** Wörishofen — die Pfarrei, die Kur, der Kurort. */
const WOERISHOFEN_ORT = ortsflaeche(10.599, 48.005);

/**
 * Der Weg nach Rom — ein schmaler Keil, der das Blatt nach Süden verlässt.
 *
 * Rom liegt bei 12,5 Grad östlicher Länge und 41,9 Grad nördlicher Breite,
 * rund achthundert Kilometer von Wörishofen entfernt und weit außerhalb
 * dieses Ausschnitts.
 */
const WEG_NACH_ROM = [
  [10.62, 47.95], [10.66, 47.98], [11.45, 47.62], [11.4, 47.6],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  land: LAND,
  donau: DONAU,
  iller: ILLER,
  lech: LECH,
  wertach: WERTACH,
  mindel: MINDEL,
  isar: ISAR,
  ammersee: AMMERSEE,
  starnbergerSee: STARNBERGER_SEE,
  schwaben: SCHWABEN,
};

/**
 * Die Landflächen — hier nur eine, denn der Ausschnitt hat kein Meer.
 * Die Prüfung schlägt damit nach, dass die Fläche den ganzen Rahmen deckt.
 */
const landflaechen = [LAND];

/** Alle Flussläufe zusammen — der Atlas-Test misst gegen sie. */
const fluesse = {
  donau: DONAU,
  iller: ILLER,
  lech: LECH,
  wertach: WERTACH,
  mindel: MINDEL,
  isar: ISAR,
};

/** Die beiden Seen — auch sie werden gegen den Atlas geprüft. */
const seen = {
  ammersee: AMMERSEE,
  starnbergerSee: STARNBERGER_SEE,
};

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(LAND),
    gebirge(ALPENRAND),
    gebirge(SCHWAEBISCHE_ALB),
    gebirge(RIESRAND),
    fluss(DONAU),
    fluss(ILLER),
    fluss(LECH),
    fluss(WERTACH),
    fluss(MINDEL),
    fluss(ISAR),
    see(AMMERSEE),
    see(STARNBERGER_SEE),
  ],

  phasen: [
    {
      id: 'allgaeu-1821-1844',
      label: '1821–1844: Stefansried und das Allgäu — der Weberssohn',
      hinweis:
        'Am 17. Mai 1821 wird Sebastian Kneipp in Stefansried geboren, ' +
        'einem Weiler bei Ottobeuren im bayerischen Allgäu. Der Vater ist ' +
        'Weber, das Haus ist klein, das Geld reicht nicht. Der Junge hütet ' +
        'Vieh und sitzt früh selbst am Webstuhl. Sein Wunsch, Priester zu ' +
        'werden, scheint aussichtslos: Für die Lateinschule fehlen Geld ' +
        'und Vorbildung. In Grönenbach gibt ihm der Kaplan Matthias Merkle ' +
        'Unterricht im Lateinischen und öffnet ihm damit die Tür — 1844 ' +
        'wird der Dreiundzwanzigjährige in das Gymnasium in Dillingen ' +
        'aufgenommen.',
      flaechen: [
        { titel: 'Stefansried — der Geburtsort, 17. Mai 1821', d: P.pfad(STEFANSRIED_ORT) },
        { titel: 'Ottobeuren — die Abtei, zu deren Pfarrei der Weiler gehört', d: P.pfad(OTTOBEUREN_ORT) },
        { titel: 'Grönenbach — der Lateinunterricht bei Kaplan Merkle', d: P.pfad(GROENENBACH_ORT) },
      ],
    },
    {
      id: 'dillingen-1844-1849',
      label: '1844–1849: Dillingen an der Donau — die Krankheit und das kalte Wasser',
      hinweis:
        'In Dillingen holt der späte Schüler das Gymnasium nach und ' +
        'studiert danach am dortigen Lyzeum. In diesen Jahren wird er ' +
        'schwer krank; überliefert ist ein zehrendes Lungenleiden, die ' +
        'genaue Diagnose ist historisch nicht gesichert. 1849 stößt er auf ' +
        'eine alte Schrift des Schlesischen Arztes Johann Siegmund Hahn ' +
        'über die Kraft und Wirkung des frischen Wassers, 1738 gedruckt. ' +
        'Er beginnt, sich im Winter mehrmals wöchentlich für wenige ' +
        'Augenblicke in die eiskalte Donau zu tauchen und danach zu Fuß ' +
        'zurückzulaufen, bis ihm warm wird. Nach eigener Darstellung ' +
        'kräftigt ihn das; er kann sein Studium fortsetzen.',
      flaechen: [
        { titel: 'Dillingen an der Donau — Gymnasium, Lyzeum und die Bäder im Winter 1849', d: P.pfad(DILLINGEN_ORT) },
      ],
    },
    {
      id: 'priester-1850-1855',
      label: '1850–1855: München, Augsburg, Boos — der Weg ins Pfarramt',
      hinweis:
        '1850 geht Kneipp zum Abschluss des Theologiestudiums nach ' +
        'München; am 6. August 1852 wird er in Augsburg zum Priester ' +
        'geweiht. Es folgen Kaplansjahre in Biberbach und in Boos im ' +
        'Illertal sowie eine kurze Zeit in Augsburg. In Boos pflegt er ' +
        '1854 während einer Cholerawelle Kranke und wendet dabei auch ' +
        'Wasseranwendungen an — der Spitzname „Cholera-Kaplan" stammt aus ' +
        'dieser Zeit. Im Mai 1855 wird er als Beichtvater der ' +
        'Dominikanerinnen in das Dorf Wörishofen versetzt.',
      flaechen: [
        { titel: 'München — das Studium im Georgianum ab 1850', d: P.pfad(MUENCHEN_STADT) },
        { titel: 'Augsburg — die Priesterweihe am 6. August 1852', d: P.pfad(AUGSBURG_STADT) },
        { titel: 'Boos im Illertal — die Cholerakranken von 1854', d: P.pfad(BOOS_ORT) },
      ],
    },
    {
      id: 'woerishofen-1855-1886',
      label: '1855–1886: Wörishofen — der Pfarrer und die Wasserkur',
      hinweis:
        'In Wörishofen bleibt Kneipp bis zu seinem Tod. Er betreut die ' +
        'Klosterfrauen, verwaltet das Klostergut, unterrichtet Landwirte ' +
        'und behandelt nebenbei Kranke, die ihn darum bitten — zuerst ' +
        'Nachbarn, dann Menschen aus der Umgebung, schließlich Fremde aus ' +
        'ganz Bayern. 1881 wird er Pfarrer des Ortes. Die Anwendungen, die ' +
        'er entwickelt, sind milder als die harten Wasserkuren seiner ' +
        'Vorgänger: kurze Güsse, Wickel, Waschungen, Wassertreten, immer ' +
        'gefolgt von Bewegung und Wiedererwärmung. 1886 erscheint bei ' +
        'Kösel in Kempten sein Buch „Meine Wasserkur".',
      flaechen: [
        { titel: 'Wörishofen — die Pfarrei ab 1855 und die Wasserkur', d: P.pfad(WOERISHOFEN_ORT) },
      ],
    },
    {
      id: 'kurort-1886-1897',
      label: '1886–1897: der Zulauf — aus einem Dorf wird ein Kurort',
      hinweis:
        '„Meine Wasserkur" wird zum Bestseller und in zahlreiche Sprachen ' +
        'übersetzt; 1889 folgt „So sollt ihr leben". Danach kommen die ' +
        'Kranken in Scharen: In den Spitzenjahren der 1890er zählt ' +
        'Wörishofen Zehntausende Gäste im Jahr — die genauen Zahlen gehen ' +
        'in den Quellen auseinander. Ab 1890 arbeitet mit Dr. Alfred ' +
        'Baumgarten ein approbierter Badearzt im Ort. 1893 ernennt Papst ' +
        'Leo XIII. den Pfarrer zum päpstlichen Geheimkämmerer; 1894 wird ' +
        'Kneipp in Rom empfangen. 1896 entsteht das Kneippianum. Am ' +
        '17. Juni 1897 stirbt Kneipp in Wörishofen; 1920 darf sich der Ort ' +
        '„Bad Wörishofen" nennen.',
      flaechen: [
        { titel: 'Bad Wörishofen — der Kurort, der aus dem Dorf wurde', d: P.pfad(WOERISHOFEN_ORT) },
        { titel: 'Der Weg nach Rom — die Audienz bei Leo XIII. 1894', d: P.pfad(WEG_NACH_ROM) },
      ],
    },
  ],

  punkte: [
    {
      id: 'stefansried',
      name: 'Stefansried',
      typ: 'stadt',
      ...ort(10.344, 47.958),
      text:
        'Ein Weiler bei Ottobeuren im bayerischen Allgäu, ein paar Höfe an ' +
        'einem Hang. Hier wird am 17. Mai 1821 Sebastian Kneipp geboren, ' +
        'das Kind eines Webers. Die Familie ist arm; der Junge hütet Vieh, ' +
        'arbeitet im Sommer als Taglöhner und sitzt im Winter selbst am ' +
        'Webstuhl. Lesen und Schreiben lernt er in der Dorfschule, Latein ' +
        'lernt er später und heimlich. Sein Wunsch, Priester zu werden, ' +
        'gilt in seiner Lage als aussichtslos — bis ihn ein Kaplan aus dem ' +
        'Nachbarort unterrichtet. Aus dieser Herkunft erklärt sich vieles ' +
        'an seiner späteren Heilkunde: Sie kostet fast nichts, sie braucht ' +
        'keine Apotheke, und sie ist für Leute gedacht, die kein Geld für ' +
        'einen Arzt haben.',
    },
    {
      id: 'groenenbach',
      name: 'Grönenbach',
      typ: 'ereignis',
      ...ort(10.214, 47.878),
      text:
        'Der Marktflecken im Allgäu, in dem sich das Leben des Weberssohns ' +
        'entscheidet. Hier gibt ihm Kaplan Matthias Merkle Unterricht im ' +
        'Lateinischen und setzt sich dafür ein, dass der junge Mann eine ' +
        'Schule besuchen kann. Ohne diesen Kaplan wäre Kneipp Weber ' +
        'geblieben, und dieses Kapitel gäbe es nicht. 1844 wird er, ' +
        'dreiundzwanzigjährig und damit weit älter als seine Mitschüler, ' +
        'in das Gymnasium in Dillingen aufgenommen. Es ist die erste von ' +
        'zwei Wenden seines Lebens; die zweite wartet fünf Jahre später ' +
        'in der Donau.',
    },
    {
      id: 'dillingen',
      name: 'Dillingen an der Donau',
      typ: 'ereignis',
      ...ort(10.496, 48.579),
      text:
        'Die alte Universitätsstadt an der Donau, in der Kneipp ab 1844 ' +
        'das Gymnasium nachholt und danach am Lyzeum studiert. Hier wird ' +
        'er schwer krank — überliefert ist ein zehrendes Lungenleiden, oft ' +
        'als Tuberkulose gedeutet; sicher belegt ist die Diagnose nicht. ' +
        '1849 stößt er auf die Schrift des Arztes Johann Siegmund Hahn ' +
        'über „die Kraft und Wirkung des frischen Wassers", 1738 gedruckt. ' +
        'Er probiert es an sich selbst: im Winter mehrmals in der Woche ' +
        'für wenige Augenblicke in die eiskalte Donau, dann im Laufschritt ' +
        'zurück, bis der Körper wieder warm ist. Nach seiner eigenen ' +
        'Darstellung wird er dadurch kräftiger und kann weiterstudieren. ' +
        'Ein Beweis im heutigen Sinne ist das nicht — aber es ist der ' +
        'Anfang von allem.',
    },
    {
      id: 'muenchen',
      name: 'München',
      typ: 'stadt',
      ...ort(11.576, 48.137),
      text:
        'Die Hauptstadt des Königreichs Bayern und die einzige Station ' +
        'dieses Lebens jenseits des Lech. 1850 kommt Kneipp hierher, um ' +
        'sein Theologiestudium abzuschließen; er wohnt im Georgianum, dem ' +
        'Priesterseminar der Universität. München ist zugleich die Stadt ' +
        'der medizinischen Fakultät, von der später der Spott über den ' +
        '„Wasserpfarrer" ausgeht — und die Stadt, in der 1893 mit dem ' +
        'Bayerischen Ärztetag die organisierte Ärzteschaft dem ' +
        'Naturheilverfahren gegenübertritt. Zwischen Wörishofen und ' +
        'München liegen kaum hundert Kilometer und zwei Welten.',
    },
    {
      id: 'augsburg',
      name: 'Augsburg',
      typ: 'stadt',
      ...ort(10.898, 48.371),
      text:
        'Die Bischofsstadt an Lech und Wertach. Hier wird Sebastian Kneipp ' +
        'am 6. August 1852 zum Priester geweiht; hier ist er kurze Zeit ' +
        'als Kaplan tätig, bevor er nach Wörishofen kommt. Augsburg ist ' +
        'auch der Sitz des Bistums, dem er sein Leben lang untersteht — ' +
        'was in den späteren Jahren zählt: Ein Pfarrer, der Kranke ' +
        'behandelt und dafür angezeigt wird, braucht einen Bischof, der ' +
        'ihn gewähren lässt. Von Augsburg aus führt der Lech nach Norden ' +
        'zur Donau und nach Süden ins Allgäu; an dieser Straße liegt ' +
        'alles, was Kneipps Leben ausmacht.',
    },
    {
      id: 'boos',
      name: 'Boos im Illertal',
      typ: 'ereignis',
      ...ort(10.125, 48.003),
      text:
        'Das Dorf an der Iller, in dem der junge Kaplan zum ersten Mal ' +
        'vor einer Katastrophe steht. 1854 geht eine Cholerawelle durch ' +
        'die Gegend. Kneipp pflegt die Kranken, versorgt sie und wendet ' +
        'dabei auch Wasseranwendungen an; die Leute nennen ihn danach den ' +
        '„Cholera-Kaplan". Was diese Anwendungen medizinisch bewirkten, ' +
        'lässt sich heute nicht mehr feststellen — die Cholera tötet durch ' +
        'Flüssigkeitsverlust, und dagegen hilft vor allem Trinken. Belegt ' +
        'ist etwas anderes: Ein Geistlicher, der zu den Kranken ging, ' +
        'statt sie zu meiden, hinterließ Eindruck. Der Ruf, der Kneipp ' +
        'später nach Wörishofen vorauseilte, beginnt hier.',
    },
    {
      id: 'woerishofen',
      name: 'Wörishofen',
      typ: 'ereignis',
      ...ort(10.599, 48.005),
      text:
        'Der wichtigste Ort dieses Kapitels: ein Dorf mit wenigen hundert ' +
        'Einwohnern zwischen Wertach und Mindel, in das Kneipp im Mai 1855 ' +
        'als Beichtvater der Dominikanerinnen versetzt wird. Er bleibt ' +
        'zweiundvierzig Jahre. Er verwaltet das Klostergut, hält ' +
        'Landwirtschaftskurse, züchtet Bienen — und behandelt Kranke, die ' +
        'ihn darum bitten. 1881 wird er Pfarrer. Nach dem Erscheinen von ' +
        '„Meine Wasserkur" 1886 kommen die Menschen in Scharen; das Dorf ' +
        'baut Gasthäuser, Badehäuser und einen Bahnanschluss. 1890 ' +
        'arbeitet mit Dr. Alfred Baumgarten ein approbierter Arzt im Ort. ' +
        'Am 17. Juni 1897 stirbt Kneipp hier; 1920 heißt das Dorf Bad ' +
        'Wörishofen.',
    },
  ],

  bewegungen: [
    {
      id: 'weg-nach-dillingen',
      name: 'Der Weg aus der Weberstube in die Schule, 1844',
      von: station(10.344, 47.958),
      ueber: [station(10.214, 47.878), station(10.35, 48.25)],
      nach: station(10.496, 48.579),
      text:
        'Von Stefansried über Grönenbach nach Dillingen: der Weg, den ein ' +
        'dreiundzwanzigjähriger Weber zurücklegt, um Schüler zu werden. ' +
        'Kaplan Matthias Merkle gab ihm in Grönenbach den Lateinunterricht, ' +
        'ohne den keine Aufnahme möglich gewesen wäre. In Dillingen holt ' +
        'Kneipp das Gymnasium nach — und wird dort so krank, dass er 1849 ' +
        'in die eiskalte Donau steigt.',
    },
    {
      id: 'weg-nach-woerishofen',
      name: 'Vom Weihealtar in die Pfarrei, 1852 bis 1855',
      von: station(10.898, 48.371),
      ueber: [station(10.125, 48.003)],
      nach: station(10.599, 48.005),
      text:
        'Nach der Priesterweihe in Augsburg am 6. August 1852 folgen ' +
        'Kaplansjahre in Biberbach und in Boos im Illertal, wo Kneipp 1854 ' +
        'Cholerakranke pflegt. Im Mai 1855 wird er als Beichtvater der ' +
        'Dominikanerinnen nach Wörishofen versetzt — in ein Dorf, das ' +
        'damals niemand kannte und das er nicht mehr verlassen wird.',
    },
    {
      id: 'die-kur-geht-in-die-welt',
      name: 'Die Kur verlässt das Dorf, ab 1886',
      von: station(10.599, 48.005),
      ueber: [station(11.2, 48.3)],
      nach: station(12.1, 48.6),
      text:
        'Mit „Meine Wasserkur" von 1886 verlässt die Kneipp-Kur das ' +
        'Allgäu. Das Buch wird in zahlreiche Sprachen übersetzt, Kneipp- ' +
        'Vereine entstehen in Deutschland, Österreich und Nordamerika, ' +
        'Kurhäuser übernehmen die Anwendungen. Die Linie zeigt nur die ' +
        'Richtung; ihre Ziele liegen alle außerhalb dieses Blattes. 2021 ' +
        'nahm die UNESCO das Kneippen in die Repräsentative Liste des ' +
        'immateriellen Kulturerbes der Menschheit auf.',
    },
  ],

  beschriftungen: [
    schrift('Bayern', 'land', 11.55, 48.62),
    schrift('Schwaben', 'land', 10.42, 48.35),
    schrift('Allgäu', 'land', 10.25, 47.7),
    schrift('Oberbayern', 'land', 11.7, 47.85),
    schrift('Württemberg', 'land', 9.85, 48.1),
    schrift('Alpen', 'land', 11.0, 47.64),
    schrift('Schwäbische Alb', 'land', 9.9, 48.66, -18),
    schrift('Wörishofen', 'land', 10.6, 47.95),
    schrift('Augsburg', 'land', 10.9, 48.31),
    schrift('München', 'land', 11.58, 48.08),
    schrift('Dillingen', 'land', 10.5, 48.63),
    schrift('Ottobeuren', 'land', 10.29, 47.9),
    schrift('Memmingen', 'land', 10.18, 48.03),
    schrift('Kempten', 'land', 10.32, 47.77),
    schrift('Ulm', 'land', 9.98, 48.45),
    schrift('Donauwörth', 'land', 10.78, 48.67),
    schrift('Landsberg', 'land', 10.88, 48.0),
    schrift('Donau', 'meer', 10.62, 48.6, 22),
    schrift('Iller', 'meer', 10.06, 48.16, -78),
    schrift('Lech', 'meer', 10.83, 48.47, -80),
    schrift('Wertach', 'meer', 10.72, 48.1, -50),
    schrift('Mindel', 'meer', 10.4, 48.28, -80),
    schrift('Isar', 'meer', 11.71, 48.28, -50),
    schrift('Ammersee', 'meer', 11.02, 48.02),
    schrift('Starnberger See', 'meer', 11.42, 47.93),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
  fluesse,
  seen,
};
