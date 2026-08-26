// Karte zu „Pasteur und Lister" — Westeuropa zwischen 1854 und 1900.
//
// Wie in den Kapiteln 1 bis 10 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-pasteur-lister.mjs nach.
//
// Was die Karte zeigen soll: den Weg einer Idee vom Labor in die Klinik.
// Sie muss deshalb zwei Länder auf dasselbe Blatt bringen. Im Süden das
// Frankreich Louis Pasteurs: Dole und Arbois im Jura, wo er aufwuchs und wo
// der Weinbau ihm die Hefe zeigte; Lille, wo ein Branntweinbrenner ihn 1856
// um Hilfe bat; Paris, wo er 1864 die Urzeugung widerlegte und 1885 einem
// neunjährigen Jungen aus dem Elsass die erste Tollwut-Impfung gab;
// Pouilly-le-Fort bei Melun, wo er 1881 vor Publikum Schafe impfte. Im
// Norden das Britannien Joseph Listers: Glasgow, wo er ab 1865 die
// Karbolsäure einführte, Edinburgh, wo er lehrte, und London, wo die
// Antiseptik am längsten bestritten wurde.
//
// Deshalb dieser Ausschnitt: vom Atlantik westlich Irlands bis an den
// Rhein, von der Biskaya und dem Jura bis an die Nordspitze Schottlands.
// Er reicht im Süden weit genug, dass Arbois auf dem Blatt liegt, und im
// Norden weit genug für den Firth of Clyde.
//
// Aufbau der Landmassen: das Festland als ein Ring (Frankreich, die
// Niederlande, die deutsche Nordseeküste bis nach Jütland; im Süden und
// Osten außerhalb des Rahmens geschlossen, damit die Fläche ausläuft statt
// am Bildrand abzuknicken), Großbritannien als zweiter Ring (im Norden
// oberhalb des Rahmens geschlossen) und Irland.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: vom Atlantik bis an den Rhein, von der Biskaya bis
 * nach Nordschottland.
 */
const RAHMEN = {
  minLon: -10,
  maxLon: 9,
  minLat: 44.5,
  maxLat: 58,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 10, damit alle Karten
// des Buches gleich aussehen und gleich zu lesen sind.
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

/**
 * Biskaya → Loiremündung → Bretagne → Normandie → Seinemündung.
 *
 * Die Bretagne gehört hierher, weil Pasteur seine Versuche zur Urzeugung
 * auch mit Meerluft anstellte — und weil die Küste den Umriss Frankreichs
 * erst erkennbar macht.
 */
const FRANKREICH_ATLANTIK = [
  [-1.25, 44.1], [-1.2, 45.0], [-1.06, 45.57], [-1.15, 46.16], [-1.78, 46.5],
  [-2.2, 47.28], [-2.55, 47.5], [-3.12, 47.48], [-3.92, 47.87],
  [-4.73, 48.04], [-4.77, 48.36], [-4.56, 48.6], [-3.44, 48.82],
  [-2.46, 48.63], [-1.5, 48.65], [-1.6, 48.84], [-1.94, 49.72],
  [-1.26, 49.68], [-1.1, 49.4], [-0.4, 49.35], [0.11, 49.49],
];

/**
 * Dieppe → Calais → Flandern → Holland → Deutsche Bucht → Jütland.
 *
 * Über diese Küste lief der Streit: Von hier aus wurde Pasteurs Aufsatz
 * über die Gärung nach Britannien gelesen — und von hier aus kam die
 * Antiseptik zurück aufs Festland.
 */
const KANAL_UND_NORDSEE = [
  [1.08, 49.93], [1.55, 50.22], [1.6, 50.72], [1.85, 50.96], [2.37, 51.03],
  [2.92, 51.23], [3.4, 51.42], [3.7, 51.55], [4.12, 51.98], [4.55, 52.46],
  [4.75, 52.96], [5.4, 53.3], [6.2, 53.45], [7.0, 53.4], [8.15, 53.55],
  [8.5, 53.6], [8.9, 53.88], [8.6, 54.4], [8.5, 54.9], [8.2, 55.2],
  [8.08, 55.56], [8.12, 56.0], [8.22, 56.7], [8.6, 57.12],
];

/** Der Ost- und Südrand: bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const FESTLAND_RAND = [
  [9.8, 57.4], [9.8, 44.0], [-1.4, 44.0],
];

/** Der große Ring: Frankreich, die Niederlande, die Nordseeküste. */
const FESTLAND = verbinde(
  FRANKREICH_ATLANTIK,
  KANAL_UND_NORDSEE,
  FESTLAND_RAND,
);

// --- Großbritannien in fünf Abschnitten -------------------------------------

/** Land’s End → Ärmelkanal → North Foreland → Themsemündung. */
const ENGLAND_SUEDKUESTE = [
  [-5.71, 50.07], [-5.2, 49.96], [-4.15, 50.33], [-3.65, 50.22], [-3.4, 50.6],
  [-2.45, 50.52], [-1.5, 50.72], [-0.79, 50.73], [0.25, 50.73], [0.58, 50.85],
  [0.97, 50.91], [1.35, 51.13], [1.44, 51.38],
];

/** Themse → Ostanglien → Humber → Northumberland. */
const ENGLAND_OSTKUESTE = [
  [1.0, 51.37], [0.55, 51.45], [0.7, 51.53], [0.95, 51.62], [1.29, 51.95],
  [1.6, 52.15], [1.75, 52.48], [1.73, 52.62], [1.3, 52.93], [0.4, 52.9],
  [0.05, 52.98], [0.34, 53.15], [0.1, 53.63], [-0.08, 54.11], [-0.4, 54.28],
  [-0.61, 54.49], [-1.14, 54.63], [-1.35, 54.9], [-1.51, 55.17],
  [-1.71, 55.6],
];

/**
 * Berwick → Firth of Forth → Aberdeen → Moray Firth → aus dem Rahmen.
 *
 * Der Firth of Forth ist hier keine Zierde: Edinburgh liegt an seinem
 * Südufer, und Lister lehrte dort von 1869 bis 1877 als Professor der
 * Chirurgie.
 */
const SCHOTTLAND_OSTKUESTE = [
  [-2.14, 55.77], [-2.52, 56.0], [-2.72, 56.06], [-2.98, 55.96],
  [-3.17, 55.98], [-3.6, 56.01], [-3.71, 56.03], [-3.72, 56.08],
  [-3.44, 56.02], [-3.23, 56.06], [-3.15, 56.11], [-3.0, 56.19],
  [-2.83, 56.19], [-2.6, 56.28], [-2.79, 56.34], [-2.9, 56.45],
  [-2.58, 56.56], [-2.47, 56.71], [-2.21, 56.96], [-2.08, 57.14],
  [-1.79, 57.5], [-1.99, 57.7], [-2.52, 57.67], [-3.2, 57.7], [-3.87, 57.59],
  [-4.22, 57.48], [-4.1, 57.7], [-3.95, 57.87], [-3.65, 58.12],
];

/**
 * Nordwestschottland → Kintyre → Firth of Clyde → Solway Firth.
 *
 * Der Firth of Clyde ist der Grund, warum Glasgow auf dieser Karte steht:
 * An seinen Werften wuchs die Stadt so schnell, dass ihr Krankenhaus die
 * Verletzten kaum fassen konnte — und Listers Zahlen kamen aus diesen
 * Betten.
 */
const SCHOTTLAND_WESTKUESTE = [
  [-5.0, 58.2], [-5.15, 58.25], [-5.4, 57.9], [-5.7, 57.72], [-5.65, 57.35],
  [-5.83, 57.0], [-6.15, 56.72], [-5.47, 56.41], [-5.35, 56.05],
  [-5.6, 55.6], [-5.8, 55.31], [-5.35, 55.6], [-5.2, 55.9], [-4.85, 55.95],
  [-4.87, 55.7], [-4.63, 55.46], [-4.86, 55.24], [-5.03, 54.9],
  [-4.86, 54.63], [-4.4, 54.68], [-3.6, 54.87], [-3.06, 54.98],
];

/** Cumbria → Mersey → Wales → Bristolkanal → Cornwall. */
const ENGLAND_WESTKUESTE = [
  [-3.35, 54.9], [-3.6, 54.5], [-3.2, 54.1], [-3.05, 53.85], [-3.1, 53.45],
  [-3.4, 53.35], [-3.83, 53.33], [-4.6, 53.4], [-4.75, 52.9], [-4.06, 52.72],
  [-4.08, 52.41], [-4.66, 52.1], [-5.3, 51.88], [-5.05, 51.71], [-4.3, 51.62],
  [-3.2, 51.45], [-2.7, 51.5], [-3.0, 51.2], [-3.5, 51.21], [-4.1, 51.2],
  [-4.5, 50.9], [-4.55, 50.55], [-5.08, 50.42], [-5.48, 50.21],
];

/** Die Insel, auf der aus der Keimtheorie ein Verfahren wurde. */
const GROSSBRITANNIEN = verbinde(
  ENGLAND_SUEDKUESTE,
  ENGLAND_OSTKUESTE,
  SCHOTTLAND_OSTKUESTE,
  SCHOTTLAND_WESTKUESTE,
  ENGLAND_WESTKUESTE,
);

/**
 * Irland.
 *
 * Es gehört auf diese Karte, weil ein großer Teil der Arbeiter, die in
 * Glasgow verunglückten und in Listers Betten lagen, aus Irland gekommen
 * war.
 */
const IRLAND = [
  [-6.15, 53.35], [-6.0, 52.96], [-6.35, 52.18], [-7.6, 51.95],
  [-8.25, 51.79], [-9.8, 51.45], [-10.4, 51.9], [-9.93, 52.56],
  [-9.6, 53.15], [-10.2, 53.4], [-10.1, 53.97], [-10.0, 54.3], [-8.6, 54.3],
  [-8.75, 54.65], [-8.3, 55.15], [-7.37, 55.38], [-7.0, 55.05],
  [-6.65, 55.2], [-6.25, 55.2], [-5.8, 54.85], [-5.7, 54.6], [-5.5, 54.4],
  [-5.85, 54.2], [-6.2, 54.05], [-6.3, 53.9], [-6.2, 53.7],
];

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Der Jura — die Landschaft, in der Pasteur aufwuchs, mit ihren Rebhängen. */
const JURA = [
  [5.75, 46.7], [6.4, 46.4], [6.95, 47.0], [6.6, 47.45], [6.0, 47.2],
  [5.7, 46.95],
];

/** Der westliche Alpenbogen — grobe Fläche, keine Aussage über Gipfel. */
const ALPEN = [
  [5.9, 46.0], [7.0, 45.7], [8.6, 45.9], [9.2, 46.4], [8.4, 47.0],
  [7.2, 46.7], [6.2, 46.35],
];

/** Die Vogesen — zwischen Elsass und Lothringen. */
const VOGESEN = [
  [6.75, 47.9], [7.25, 48.35], [7.15, 48.85], [6.8, 48.6], [6.6, 48.2],
];

/** Das Zentralmassiv — der Süden des Blattes. */
const MASSIF_CENTRAL = [
  [2.3, 44.6], [3.6, 44.7], [4.2, 45.6], [3.4, 46.3], [2.3, 45.9],
  [1.9, 45.2],
];

/** Die Penninen — der Rücken Nordenglands. */
const PENNINEN = [
  [-2.5, 54.9], [-2.0, 54.6], [-1.9, 53.9], [-2.2, 53.3], [-2.6, 53.6],
  [-2.7, 54.3],
];

/** Das schottische Hochland — die Landschaft hinter Glasgow und Edinburgh. */
const HOCHLAND = [
  [-5.2, 58.0], [-3.9, 57.7], [-3.2, 57.3], [-3.4, 56.7], [-4.6, 56.2],
  [-5.5, 56.5], [-5.6, 57.4],
];

/** Die Seine — Burgund, Paris, Rouen, Le Havre. */
const SEINE = [
  [4.7, 47.8], [3.3, 48.4], [2.35, 48.85], [1.1, 49.44], [0.15, 49.45],
];

/**
 * Der Doubs — Jura, Besançon, Dole, Mündung in die Saône.
 *
 * An diesem Fluss steht das Haus, in dem Pasteur 1822 geboren wurde: Sein
 * Vater war Gerber in Dole, und die Gerberei lag am Wasser.
 */
const DOUBS = [
  [6.8, 46.85], [6.35, 47.1], [6.02, 47.24], [5.5, 47.09], [5.02, 46.9],
];

/** Die Loire — Zentralmassiv, Orléans, Tours, Nantes. */
const LOIRE = [
  [4.1, 44.9], [3.9, 45.9], [2.8, 46.9], [2.0, 47.3], [1.9, 47.9],
  [0.7, 47.4], [-0.55, 47.4], [-1.55, 47.2], [-2.2, 47.28],
];

/** Die Rhône — Genfer See, Lyon, Tal nach Süden. */
const RHONE = [
  [6.15, 46.25], [5.8, 45.9], [4.85, 45.75], [4.75, 45.0],
];

/** Der Rhein — Basel, Straßburg, Mainz, Köln, Rheinmündung. */
const RHEIN = [
  [7.6, 47.55], [7.62, 48.58], [8.0, 49.0], [8.27, 50.0], [7.6, 50.36],
  [7.1, 50.73], [6.9, 51.2], [6.1, 51.85], [5.0, 51.95], [4.15, 51.99],
];

/** Die Themse — Oxford, Reading, London, Gravesend, Mündung. */
const THEMSE = [
  [-1.8, 51.6], [-1.26, 51.75], [-0.97, 51.45], [-0.34, 51.42], [-0.1, 51.5],
  [0.37, 51.44], [0.7, 51.5],
];

/** Der Clyde — Glasgow und die Werften, an denen Listers Klinik lag. */
const CLYDE = [
  [-3.75, 55.75], [-4.25, 55.86], [-4.6, 55.93], [-4.85, 55.95],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  grossbritannien: GROSSBRITANNIEN,
  irland: IRLAND,
  frankreichAtlantik: FRANKREICH_ATLANTIK,
  kanalUndNordsee: KANAL_UND_NORDSEE,
  englandSuedkueste: ENGLAND_SUEDKUESTE,
  englandOstkueste: ENGLAND_OSTKUESTE,
  schottlandOstkueste: SCHOTTLAND_OSTKUESTE,
  schottlandWestkueste: SCHOTTLAND_WESTKUESTE,
  englandWestkueste: ENGLAND_WESTKUESTE,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [FESTLAND, GROSSBRITANNIEN, IRLAND];

// ---------------------------------------------------------------------------
// Die Phasen: fünfundvierzig Jahre vom kranken Wein bis zum Institut.
// ---------------------------------------------------------------------------

/** Phase 1 — die Gärung und der Streit um die Urzeugung. */
const LILLE_UMLAND = [
  [2.8, 50.78], [3.4, 50.78], [3.4, 50.48], [2.8, 50.48],
];
const PARIS_STADT = [
  [2.15, 48.95], [2.55, 48.95], [2.55, 48.78], [2.15, 48.78],
];
const JURA_HEIMAT = [
  [5.3, 47.25], [6.0, 47.25], [6.0, 46.78], [5.3, 46.78],
];

/** Phase 2 — die Karbolsäure in Glasgow. */
const GLASGOW_STADT = [
  [-4.45, 55.95], [-4.05, 55.95], [-4.05, 55.78], [-4.45, 55.78],
];
const SCHOTTLAND_GUERTEL = [
  [-4.6, 56.05], [-2.95, 56.05], [-2.95, 55.72], [-4.6, 55.72],
];

/** Phase 3 — die Impfstoffe und der öffentliche Versuch. */
const POUILLY_UMLAND = [
  [2.48, 48.63], [2.92, 48.63], [2.92, 48.4], [2.48, 48.4],
];

/** Phase 4 — die Tollwut und der Junge aus dem Elsass. */
const ELSASS = [
  [7.15, 48.6], [7.65, 48.6], [7.65, 48.25], [7.15, 48.25],
];

/** Phase 5 — das Institut und die Ausbreitung der Antiseptik. */
const LONDON_STADT = [
  [-0.35, 51.62], [0.1, 51.62], [0.1, 51.4], [-0.35, 51.4],
];
const EDINBURGH_STADT = [
  [-3.35, 56.02], [-3.02, 56.02], [-3.02, 55.86], [-3.35, 55.86],
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
    land(IRLAND),
    gebirge(JURA),
    gebirge(ALPEN),
    gebirge(VOGESEN),
    gebirge(MASSIF_CENTRAL),
    gebirge(PENNINEN),
    gebirge(HOCHLAND),
    fluss(SEINE),
    fluss(DOUBS),
    fluss(LOIRE),
    fluss(RHONE),
    fluss(RHEIN),
    fluss(THEMSE),
    fluss(CLYDE),
  ],

  phasen: [
    {
      id: 'gaerung-1864',
      label: '1854–1864: die Gärung und die Widerlegung der Urzeugung',
      hinweis:
        'Louis Pasteur, Chemiker, wird 1854 Dekan in Lille — einer Stadt der ' +
        'Brennereien. 1856 bittet ihn der Fabrikant Bigo um Hilfe: Sein ' +
        'Rübenalkohol wird sauer. Unter dem Mikroskop findet Pasteur in den ' +
        'guten Bottichen runde Hefekügelchen, in den verdorbenen kleine ' +
        'Stäbchen. Die Gärung ist demnach kein Zerfall, sondern die Arbeit ' +
        'winziger Lebewesen. Daraus wird die Keimtheorie — und dafür muss ' +
        'die Lehre von der Urzeugung fallen: In seinem Vortrag an der ' +
        'Sorbonne am 7. April 1864 zeigt Pasteur die Schwanenhalsflaschen, ' +
        'die Luft einlassen und Staub zurückhalten. Sie bleiben klar.',
      flaechen: [
        { titel: 'Lille — die Brennereien und der kranke Rübenalkohol', d: P.pfad(LILLE_UMLAND) },
        { titel: 'Paris — die Sorbonne und die Schwanenhalsflaschen', d: P.pfad(PARIS_STADT) },
        { titel: 'Der Jura — Dole und Arbois, die Heimat und der Wein', d: P.pfad(JURA_HEIMAT) },
      ],
    },
    {
      id: 'karbolsaeure-1867',
      label: '1865–1867: die Karbolsäure in Glasgow',
      hinweis:
        'Joseph Lister, Professor der Chirurgie an der Glasgow Royal ' +
        'Infirmary, liest Pasteurs Arbeiten über die Gärung und zieht den ' +
        'Schluss, den ein Chirurg ziehen kann: Wenn Wunden nicht von sich ' +
        'aus faulen, sondern von etwas, das hineinfällt, dann muss man dieses ' +
        'Etwas töten. Ab August 1865 behandelt er offene Brüche mit ' +
        'Karbolsäure. 1867 veröffentlicht er die Ergebnisse: Die ' +
        'Sterblichkeit nach Amputationen sinkt in seinen Abteilungen von rund ' +
        '45 auf rund 15 Prozent. Die Zahlen stammen aus den Betten der ' +
        'Hafen- und Werftarbeiter am Clyde.',
      flaechen: [
        { titel: 'Glasgow — die Royal Infirmary und die Werften am Clyde', d: P.pfad(GLASGOW_STADT) },
        { titel: 'Der schottische Mittelgürtel — Glasgow und Edinburgh', d: P.pfad(SCHOTTLAND_GUERTEL) },
      ],
    },
    {
      id: 'pouilly-le-fort-1881',
      label: '1877–1881: die Impfstoffe und der Versuch von Pouilly-le-Fort',
      hinweis:
        '1879 bleibt im Labor über den Sommer eine Kultur der Hühnercholera ' +
        'stehen; sie macht die Hühner nicht mehr krank — und schützt sie. ' +
        'Aus diesem Zufall wird ein Verfahren: den Erreger abschwächen, ihn ' +
        'dann verabreichen. Vom 5. Mai bis zum 2. Juni 1881 prüft Pasteur es ' +
        'auf dem Gut Pouilly-le-Fort bei Melun öffentlich an Schafen, Ziegen ' +
        'und Rindern; Presse und Landwirte sehen zu. Die geimpften Tiere ' +
        'überleben den Milzbrand, die ungeimpften sterben. Später zeigten ' +
        'seine Notizbücher, dass nicht der öffentlich beschriebene Impfstoff ' +
        'verwendet wurde, sondern ein anders hergestellter aus dem Labor.',
      flaechen: [
        { titel: 'Pouilly-le-Fort bei Melun — der öffentliche Versuch von 1881', d: P.pfad(POUILLY_UMLAND) },
        { titel: 'Paris — das Labor in der Rue d’Ulm', d: P.pfad(PARIS_STADT) },
      ],
    },
    {
      id: 'tollwut-1885',
      label: '1885: die Tollwut-Impfung — Joseph Meister aus dem Elsass',
      hinweis:
        'Am 6. Juli 1885 bringt eine Mutter aus Meissengott im Elsass ihren ' +
        'neunjährigen Sohn Joseph Meister nach Paris; ein tollwütiger Hund ' +
        'hatte ihn zwei Tage zuvor vielfach gebissen. Pasteur verfügt über ' +
        'ein Verfahren mit getrocknetem Rückenmark infizierter Kaninchen, das ' +
        'an Hunden erprobt ist, nie aber an einem Menschen. Weil er kein Arzt ' +
        'ist, setzen die Ärzte Vulpian und Grancher die Spritzen — dreizehn ' +
        'in zehn Tagen. Der Junge bleibt gesund. Im Oktober folgt der ' +
        'Schäferjunge Jean-Baptiste Jupille.',
      flaechen: [
        { titel: 'Paris — die erste Tollwut-Impfung am Menschen', d: P.pfad(PARIS_STADT) },
        { titel: 'Das Elsass — die Heimat Joseph Meisters', d: P.pfad(ELSASS) },
      ],
    },
    {
      id: 'institut-1888',
      label: '1888–1900: das Pasteur-Institut und die Antiseptik in Europa',
      hinweis:
        'Aus Spenden aus aller Welt entsteht in Paris das Institut Pasteur; ' +
        'am 14. November 1888 wird es eröffnet. Lister geht 1877 als ' +
        'Professor nach London an das King’s College Hospital, wo seine ' +
        'Methode am längsten bestritten wurde; 1897 wird er als erster Arzt ' +
        'Großbritanniens in den Adelsstand erhoben. Auf dem Festland ' +
        'entwickelt die Schule Robert Kochs aus der Antiseptik die Asepsis: ' +
        'Statt Keime in der Wunde zu töten, hält man sie mit Dampf, Hitze und ' +
        'gekochten Instrumenten von ihr fern.',
      flaechen: [
        { titel: 'Paris — das Institut Pasteur, eröffnet 1888', d: P.pfad(PARIS_STADT) },
        { titel: 'London — King’s College Hospital, Lister ab 1877', d: P.pfad(LONDON_STADT) },
        { titel: 'Edinburgh — Listers Lehrstuhl 1869 bis 1877', d: P.pfad(EDINBURGH_STADT) },
      ],
    },
  ],

  punkte: [
    {
      id: 'paris',
      name: 'Paris',
      typ: 'ereignis',
      ...ort(2.349, 48.857),
      text:
        'Der Ort, an dem sich alles bündelt. An der Sorbonne widerlegte ' +
        'Pasteur am 7. April 1864 vor großem Publikum die Lehre von der ' +
        'Urzeugung: Seine Schwanenhalsflaschen ließen die Luft herein und ' +
        'hielten den Staub zurück — die Brühe blieb klar, jahrelang. In ' +
        'seinem Labor in der Rue d’Ulm entstanden die Impfstoffe gegen ' +
        'Hühnercholera, Milzbrand und Tollwut. Am 6. Juli 1885 wurde hier ' +
        'der neunjährige Joseph Meister behandelt. Aus Spenden aus aller ' +
        'Welt wurde 1888 das Institut Pasteur eröffnet; Pasteur liegt in ' +
        'seiner Gruft.',
    },
    {
      id: 'arbois',
      name: 'Arbois und Dole',
      typ: 'stadt',
      ...ort(5.775, 46.903),
      text:
        'Die Heimat im Jura. In Dole am Doubs wurde Louis Pasteur am ' +
        '27. Dezember 1822 als Sohn eines Gerbers geboren; in Arbois, einer ' +
        'Weinstadt, wuchs er auf, und hier behielt er zeitlebens ein kleines ' +
        'Laboratorium. Der Weinbau der Gegend brachte ihm die Frage ein, aus ' +
        'der alles Weitere wurde: Warum verdirbt der eine Wein und der ' +
        'andere nicht? Seine Antwort — es sind winzige Lebewesen, und man ' +
        'kann sie durch kurzes Erhitzen abtöten — trägt bis heute seinen ' +
        'Namen: Pasteurisieren.',
    },
    {
      id: 'lille',
      name: 'Lille',
      typ: 'ereignis',
      ...ort(3.063, 50.633),
      text:
        'Die Industriestadt im Norden, in der Pasteur 1854 Dekan der neuen ' +
        'naturwissenschaftlichen Fakultät wurde — mit dem ausdrücklichen ' +
        'Auftrag, den Fabriken zu nützen. 1856 bat ihn der Brennereibesitzer ' +
        'Bigo um Hilfe: Aus Rübensaft wurde statt Alkohol Milchsäure. Unter ' +
        'dem Mikroskop sah Pasteur in den guten Bottichen runde Hefezellen, ' +
        'in den verdorbenen kleine Stäbchen. Hier fiel der Satz, den er 1854 ' +
        'in seiner Antrittsrede sprach: Im Feld der Beobachtung begünstigt ' +
        'der Zufall nur den vorbereiteten Geist.',
    },
    {
      id: 'pouilly-le-fort',
      name: 'Pouilly-le-Fort',
      typ: 'ereignis',
      ...ort(2.677, 48.51),
      text:
        'Ein Gut bei Melun, südöstlich von Paris. Hier fand vom 5. Mai bis ' +
        'zum 2. Juni 1881 der Versuch statt, der die Impfung berühmt machte: ' +
        'Der Tierarzt Hippolyte Rossignol, ein Zweifler, stellte die Tiere; ' +
        'die eine Hälfte wurde geimpft, die andere nicht, dann bekamen alle ' +
        'den Milzbranderreger. Am 2. Juni standen die geimpften Tiere, die ' +
        'ungeimpften waren tot oder starben. Die Zeitungen machten daraus ' +
        'ein Wunder. Die Notizbücher zeigen, dass der Ablauf sorgfältig ' +
        'inszeniert war und ein anderer Impfstoff verwendet wurde als der ' +
        'öffentlich beschriebene.',
    },
    {
      id: 'glasgow',
      name: 'Glasgow',
      typ: 'ereignis',
      ...ort(-4.252, 55.861),
      text:
        'Die Werftstadt am Clyde, in der aus Pasteurs Aufsätzen ein Verfahren ' +
        'wurde. Joseph Lister, seit 1860 Professor der Chirurgie, behandelte ' +
        'ab August 1865 offene Brüche mit Karbolsäure — beginnend bei dem ' +
        'elfjährigen James Greenlees, dem ein Wagenrad das Bein gebrochen ' +
        'hatte. 1867 legte er die Zahlen vor: Die Sterblichkeit nach ' +
        'Amputationen in seinen Abteilungen fiel von rund 45 auf rund 15 ' +
        'Prozent. Die Methode war umständlich, die Säure reizte Haut und ' +
        'Wunden, und viele Kollegen spotteten jahrelang darüber.',
    },
    {
      id: 'edinburgh',
      name: 'Edinburgh',
      typ: 'stadt',
      ...ort(-3.188, 55.953),
      text:
        'Die Stadt der berühmtesten Medizinschule Britanniens — und die ' +
        'Station zwischen Glasgow und London. Lister hatte hier bei James ' +
        'Syme gelernt, dessen Tochter Agnes er heiratete und die ihm ihr ' +
        'Leben lang als Mitarbeiterin die Versuchsprotokolle führte. Von 1869 ' +
        'bis 1877 hatte er hier den Lehrstuhl für Chirurgie; seine Vorlesungen ' +
        'waren überfüllt, und von hier aus verbreiteten seine Schüler die ' +
        'Antiseptik über Europa. In derselben Stadt hatten vierzig Jahre ' +
        'zuvor Burke und Hare für die Anatomie gemordet.',
    },
    {
      id: 'london',
      name: 'London',
      typ: 'ereignis',
      ...ort(-0.128, 51.508),
      text:
        'Die Hauptstadt der englischen Chirurgie — und ihr größter ' +
        'Widerstand. In den großen Londoner Krankenhäusern galt Listers ' +
        'Karbolsäure lange als schottische Marotte; noch 1877, als er an das ' +
        'King’s College Hospital kam, musste er seine Vorlesungen vor halb ' +
        'leeren Bänken halten. Erst als er dort eine Kniescheibe offen ' +
        'verdrahtete — ein Eingriff, der ohne Antiseptik den sicheren Tod ' +
        'bedeutet hätte — kippte die Stimmung. 1897 wurde er zum Lord ' +
        'ernannt, als erster Arzt Großbritanniens.',
    },
  ],

  bewegungen: [
    {
      id: 'aufsatz-nach-glasgow',
      name: 'Die Keimtheorie reist ins Krankenhaus',
      von: station(2.349, 48.857),
      ueber: [station(-1.5, 50.6), station(-3.6, 53.5)],
      nach: station(-4.252, 55.861),
      text:
        'Der eigentliche Vorgang dieses Kapitels ist eine Lektüre. Der ' +
        'Chemiker in Paris veröffentlicht, was er über die Gärung gefunden ' +
        'hat; der Chirurg in Glasgow liest es 1864 auf Anraten des Chemikers ' +
        'Thomas Anderson und überträgt es auf die Wunde. Aus einer ' +
        'Beobachtung über verdorbenen Wein wird ein Verfahren am ' +
        'Operationstisch — ohne dass die beiden Männer sich je begegnet ' +
        'wären; sie schrieben einander erst später.',
    },
    {
      id: 'antiseptik-nach-london',
      name: 'Die Antiseptik geht nach Süden',
      von: station(-4.252, 55.861),
      ueber: [station(-3.188, 55.953)],
      nach: station(-0.128, 51.508),
      text:
        'Von Glasgow über Edinburgh (1869 bis 1877) nach London (ab 1877): ' +
        'Der Weg der Antiseptik führte durch drei Krankenhäuser und dreißig ' +
        'Jahre Streit. In Deutschland wurde sie schneller angenommen als in ' +
        'England — die Feldlazarette des Krieges von 1870/71 hatten den ' +
        'Bedarf schmerzhaft vor Augen geführt.',
    },
    {
      id: 'meister-nach-paris',
      name: 'Der Weg des Joseph Meister',
      von: station(7.35, 48.42),
      ueber: [station(5.2, 48.7)],
      nach: station(2.349, 48.857),
      text:
        'Am 4. Juli 1885 wird der neunjährige Joseph Meister in Meissengott ' +
        'im Elsass von einem tollwütigen Hund gebissen. Seine Mutter bringt ' +
        'ihn über vierhundert Kilometer nach Paris, weil ein Arzt ihr von ' +
        'Pasteurs Versuchen an Hunden erzählt hat. Am 6. Juli beginnt die ' +
        'Behandlung — mit einem Mittel, das nie zuvor an einem Menschen ' +
        'geprüft worden war.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 2.6, 54.6),
    schrift('Ärmelkanal', 'meer', -1.2, 50.05, -12),
    schrift('Irische See', 'meer', -5.35, 53.75),
    schrift('Atlantik', 'meer', -8.6, 48.6),
    schrift('Golf von Biskaya', 'meer', -4.2, 45.6),
    schrift('Themse', 'meer', 0.6, 51.62),
    schrift('Seine', 'meer', 3.2, 48.6, -20),
    schrift('Doubs', 'meer', 6.15, 47.4, -25),
    schrift('England', 'land', -1.4, 52.9),
    schrift('Wales', 'land', -3.65, 52.4),
    schrift('Schottland', 'land', -4.3, 56.8),
    schrift('Irland', 'land', -8.0, 53.4),
    schrift('Frankreich', 'land', 1.9, 46.6),
    schrift('Deutschland', 'land', 8.2, 50.6),
    schrift('Alpen', 'land', 7.4, 46.1),
    schrift('Jura', 'land', 6.35, 46.85),
    schrift('Paris', 'land', 2.9, 48.98),
    schrift('Glasgow', 'land', -4.55, 55.66),
    schrift('London', 'land', 0.35, 51.3),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
