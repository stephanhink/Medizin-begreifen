// Karte zu „Die grausamen Anfänge der modernen Chirurgie" — Nordwesteuropa
// zwischen 1750 und 1870.
//
// Wie in den Kapiteln 1 bis 8 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-chirurgie-anfaenge.mjs nach.
//
// Was die Karte zeigen soll: die drei Orte, an denen die moderne Chirurgie
// entstanden ist, und die Wege dazwischen. London mit seinen OP-Theatern und
// seinen Anatomieschulen. Edinburgh, wo der Handel mit den Toten 1828 in
// Mord umschlug. Wien, wo ein Arzt 1847 das Händewaschen verlangte. Dazu
// Paris, wohin die britischen Studenten fuhren, weil es dort Leichen legal
// gab, und Glasgow, wo 1867 der Ausweg aus dem Wundfieber gefunden wurde.
//
// Deshalb dieser Ausschnitt: vom Atlantik westlich Irlands bis an die
// Weichselmündung, von den Alpen bis an die Nordspitze Schottlands. Er muss
// London, Edinburgh und Wien auf dasselbe Blatt bringen — und den Seeweg
// zeigen, auf dem die Nachricht von der Äther-Narkose 1846 aus Boston kam.
//
// Aufbau der Landmassen: ein großer Ring („Festland"), der unterhalb des
// Rahmens an der französischen Atlantikküste beginnt, über die Bretagne,
// den Ärmelkanal, die Niederlande und Jütland bis nach Skagen läuft, an der
// Ostsee entlang bis zur Danziger Bucht zieht und außerhalb des Rahmens im
// Osten und Süden geschlossen wird. Dazu Großbritannien (im Norden
// außerhalb des Rahmens geschlossen), Irland ganz, Südschweden (oben
// außerhalb geschlossen) und die beiden großen dänischen Inseln Fünen und
// Seeland — ohne sie wäre die dänische Küste nicht wiederzuerkennen.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: vom Atlantik bis an die Weichsel, von den Alpen bis
 * an die Nordspitze Schottlands.
 */
const RAHMEN = {
  minLon: -11,
  maxLon: 19,
  minLat: 46,
  maxLat: 58,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 8, damit alle Karten des
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

/** Biskaya → Loire → Bretagne → Normandie → Seinemündung. */
const FRANKREICH_ATLANTIK = [
  [-1.2, 45.0], [-1.06, 45.57], [-1.15, 46.16], [-1.78, 46.5], [-2.2, 47.28],
  [-2.55, 47.5], [-3.12, 47.48], [-3.92, 47.87], [-4.73, 48.04],
  [-4.77, 48.36], [-4.56, 48.6], [-3.44, 48.82], [-2.46, 48.63],
  [-1.5, 48.65], [-1.6, 48.84], [-1.94, 49.72], [-1.26, 49.68], [-1.1, 49.4],
  [-0.4, 49.35], [0.11, 49.49],
];

/** Dieppe → Calais → Flandern → Holland → Deutsche Bucht → Jütland. */
const KANAL_UND_NORDSEE = [
  [1.08, 49.93], [1.55, 50.22], [1.6, 50.72], [1.85, 50.96], [2.37, 51.03],
  [2.92, 51.23], [3.4, 51.42], [3.7, 51.55], [4.12, 51.98], [4.55, 52.46],
  [4.75, 52.96], [5.4, 53.3], [6.2, 53.45], [7.0, 53.4], [8.15, 53.55],
  [8.5, 53.6], [8.9, 53.88], [8.6, 54.4], [8.5, 54.9], [8.2, 55.2],
  [8.08, 55.56], [8.12, 56.0], [8.22, 56.7],
];

/** Hanstholm → Skagen → Kattegat → Kleiner Belt → Flensburg. */
const JUETLAND = [
  [8.6, 57.12], [9.72, 57.37], [9.96, 57.59], [10.58, 57.74], [10.55, 57.44],
  [10.3, 56.9], [10.87, 56.42], [10.2, 56.15], [9.9, 55.85], [9.75, 55.55],
  [9.6, 55.25], [9.9, 54.9], [9.43, 54.79],
];

/** Kiel → Lübeck → Rügen → Pommern → Danziger Bucht. */
const OSTSEE_KUESTE = [
  [10.15, 54.35], [11.1, 54.4], [10.87, 53.96], [11.45, 53.9], [12.08, 54.18],
  [12.5, 54.45], [13.4, 54.5], [14.25, 53.92], [15.58, 54.18], [16.85, 54.58],
  [18.55, 54.6],
];

/** Der Ost- und Südrand: bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const OST_UND_SUEDRAND = [
  [19.6, 54.6], [19.6, 45.0], [-2.0, 45.0],
];

/** Der große Ring: Frankreich, die Niederlande, Jütland, die Ostseeküste. */
const FESTLAND = verbinde(
  FRANKREICH_ATLANTIK,
  KANAL_UND_NORDSEE,
  JUETLAND,
  OSTSEE_KUESTE,
  OST_UND_SUEDRAND,
);

// --- Großbritannien in vier Abschnitten -------------------------------------

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
 * Südufer, und die Anatomieschule, in die Burke und Hare ihre Toten
 * brachten, lag eine Viertelstunde vom Wasser entfernt.
 */
const SCHOTTLAND_OSTKUESTE = [
  [-2.14, 55.77], [-2.52, 56.0], [-2.72, 56.06], [-2.98, 55.96],
  [-3.17, 55.98], [-3.6, 56.01], [-3.71, 56.03], [-3.72, 56.08],
  [-3.44, 56.02], [-3.23, 56.06], [-3.15, 56.11], [-3.0, 56.19],
  [-2.83, 56.19], [-2.6, 56.28], [-2.79, 56.34], [-2.9, 56.45],
  [-2.58, 56.56], [-2.47, 56.71], [-2.21, 56.96], [-2.08, 57.14],
  [-1.79, 57.5], [-1.99, 57.7], [-2.52, 57.67], [-3.2, 57.7], [-3.87, 57.59],
  [-4.22, 57.48], [-4.1, 57.7], [-3.95, 57.87], [-3.65, 58.12], [-3.2, 58.6],
];

/** Nordwestschottland → Kintyre → Firth of Clyde → Solway Firth. */
const SCHOTTLAND_WESTKUESTE = [
  [-5.0, 58.65], [-5.15, 58.25], [-5.4, 57.9], [-5.7, 57.72], [-5.65, 57.35],
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

/** Die Insel, auf der das meiste davon geschah. */
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
 * Es gehört auf diese Karte, weil aus den irischen Häfen Fässer nach
 * Britannien gingen, deren Inhalt als Ware deklariert war.
 */
const IRLAND = [
  [-6.15, 53.35], [-6.0, 52.96], [-6.35, 52.18], [-7.6, 51.95],
  [-8.25, 51.79], [-9.8, 51.45], [-10.4, 51.9], [-9.93, 52.56],
  [-9.6, 53.15], [-10.2, 53.4], [-10.1, 53.97], [-10.0, 54.3], [-8.6, 54.3],
  [-8.75, 54.65], [-8.3, 55.15], [-7.37, 55.38], [-7.0, 55.05],
  [-6.65, 55.2], [-6.25, 55.2], [-5.8, 54.85], [-5.7, 54.6], [-5.5, 54.4],
  [-5.85, 54.2], [-6.2, 54.05], [-6.3, 53.9], [-6.2, 53.7],
];

/** Südschweden — oberhalb des Rahmens geschlossen. */
const SUEDSCHWEDEN = [
  [11.4, 58.6], [11.9, 58.35], [11.9, 57.7], [12.25, 57.1], [12.85, 56.67],
  [12.86, 56.25], [12.7, 56.05], [12.99, 55.6], [12.85, 55.39],
  [13.83, 55.42], [14.35, 55.55], [14.3, 55.92], [14.87, 56.17],
  [15.59, 56.16], [16.36, 56.66], [16.45, 57.26], [16.64, 57.75],
  [17.3, 58.6],
];

/** Fünen. */
const FUENEN = [
  [10.0, 55.62], [10.75, 55.35], [10.6, 55.05], [9.9, 55.0], [9.7, 55.3],
];

/** Seeland — mit Kopenhagen am Sund. */
const SEELAND = [
  [12.31, 56.12], [12.61, 56.04], [12.6, 55.68], [12.18, 55.46],
  [12.09, 55.0], [11.14, 55.33], [11.09, 55.68], [11.37, 55.97],
];

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Der Alpenbogen — grobe Fläche, keine Aussage über Gipfel oder Grenzen. */
const ALPEN = [
  [6.0, 46.2], [7.0, 45.9], [8.6, 45.9], [10.5, 46.2], [12.4, 46.4],
  [13.8, 46.6], [15.2, 47.0], [15.0, 47.6], [13.6, 47.6], [11.5, 47.6],
  [9.4, 47.4], [7.4, 46.9], [6.2, 46.5],
];

/** Das schottische Hochland — die Landschaft hinter Edinburgh und Glasgow. */
const HOCHLAND = [
  [-5.2, 58.2], [-3.9, 57.7], [-3.2, 57.3], [-3.4, 56.7], [-4.6, 56.2],
  [-5.5, 56.5], [-5.6, 57.4],
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

/** Der Rhein — Bodensee, Basel, Mainz, Köln, Rheinmündung. */
const RHEIN = [
  [9.6, 47.5], [8.6, 47.6], [7.6, 47.55], [7.62, 48.58], [8.0, 49.0],
  [8.27, 50.0], [7.6, 50.36], [7.1, 50.73], [6.9, 51.2], [6.1, 51.85],
  [5.0, 51.95], [4.15, 51.99],
];

/** Die Elbe — Böhmen, Dresden, Magdeburg, Hamburg, Mündung. */
const ELBE = [
  [14.4, 50.1], [13.74, 51.05], [12.4, 51.85], [11.63, 52.13], [10.6, 53.0],
  [9.99, 53.55], [8.9, 53.88],
];

/** Die Donau — Donaueschingen, Regensburg, Passau, Linz, Wien. */
const DONAU = [
  [8.5, 47.95], [10.0, 48.5], [11.43, 48.76], [12.1, 49.02], [13.44, 48.57],
  [14.29, 48.3], [15.4, 48.25], [16.37, 48.21], [17.11, 48.14], [18.9, 47.8],
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
  suedschweden: SUEDSCHWEDEN,
  fuenen: FUENEN,
  seeland: SEELAND,
  frankreichAtlantik: FRANKREICH_ATLANTIK,
  kanalUndNordsee: KANAL_UND_NORDSEE,
  juetland: JUETLAND,
  ostseeKueste: OSTSEE_KUESTE,
  englandSuedkueste: ENGLAND_SUEDKUESTE,
  englandOstkueste: ENGLAND_OSTKUESTE,
  schottlandOstkueste: SCHOTTLAND_OSTKUESTE,
  schottlandWestkueste: SCHOTTLAND_WESTKUESTE,
  englandWestkueste: ENGLAND_WESTKUESTE,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [
  FESTLAND,
  GROSSBRITANNIEN,
  IRLAND,
  SUEDSCHWEDEN,
  FUENEN,
  SEELAND,
];

// ---------------------------------------------------------------------------
// Die Phasen: hundertzwanzig Jahre, in denen aus einem Handwerk eine
// Wissenschaft wird — und in denen der Preis dafür sichtbar wird.
// ---------------------------------------------------------------------------

/** Phase 1 — die OP-Theater und die Anatomieschulen. */
const LONDON_STADT = [
  [-0.35, 51.62], [0.1, 51.62], [0.1, 51.4], [-0.35, 51.4],
];
const EDINBURGH_STADT = [
  [-3.4, 56.0], [-3.0, 56.0], [-3.0, 55.87], [-3.4, 55.87],
];
const PARIS_UMLAND = [
  [2.0, 49.1], [2.7, 49.1], [2.7, 48.6], [2.0, 48.6],
];

/** Phase 2 — der Handel mit den Toten. */
const SCHOTTISCHER_GUERTEL = [
  [-4.9, 56.15], [-2.8, 56.1], [-2.7, 55.7], [-4.9, 55.75],
];
const MERSEY_HAFEN = [
  [-3.4, 53.6], [-2.7, 53.6], [-2.7, 53.2], [-3.4, 53.2],
];
const IRISCHE_HAEFEN = [
  [-6.5, 53.6], [-5.9, 53.6], [-5.9, 53.1], [-6.5, 53.1],
];

/** Phase 3 — das Anatomy Act von 1832. */
const ENGLAND_UND_WALES = [
  [-5.2, 54.9], [-0.5, 54.9], [1.7, 52.2], [1.0, 50.7], [-5.8, 50.5],
  [-4.4, 53.4],
];

/** Phase 4 — die Narkose. */
const ATLANTIK_ZUGANG = [
  [-10.6, 52.0], [-6.0, 51.0], [-6.5, 49.8], [-10.6, 50.5],
];

/** Phase 5 — Wien und das Händewaschen. */
const WIEN_STADT = [
  [16.2, 48.32], [16.55, 48.32], [16.55, 48.12], [16.2, 48.12],
];
const DONAURAUM = [
  [13.5, 48.9], [17.2, 48.6], [17.0, 47.9], [13.6, 48.2],
];

/** Phase 6 — Glasgow und die Antiseptik. */
const GLASGOW_STADT = [
  [-4.4, 55.95], [-4.1, 55.95], [-4.1, 55.8], [-4.4, 55.8],
];
const CLYDE_TAL = [
  [-5.0, 56.0], [-3.9, 56.05], [-3.8, 55.6], [-4.9, 55.6],
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
    land(SUEDSCHWEDEN),
    land(FUENEN),
    land(SEELAND),
    gebirge(ALPEN),
    gebirge(HOCHLAND),
    fluss(THEMSE),
    fluss(SEINE),
    fluss(RHEIN),
    fluss(ELBE),
    fluss(DONAU),
    fluss(CLYDE),
  ],

  phasen: [
    {
      id: 'op-theater',
      label: '~1750–1830: die OP-Theater — Chirurgie vor Publikum',
      hinweis:
        'In London, Edinburgh und Paris wird operiert wie auf einer Bühne: ' +
        'steile Ränge, Studenten in mehreren Reihen, unten ein Holztisch und ' +
        'eine Kiste mit Sägemehl darunter. Eine Betäubung gibt es nicht — ' +
        'deshalb zählt vor allem Schnelligkeit. Wer schneiden lernen will, ' +
        'muss zuvor sezieren; die privaten Anatomieschulen wachsen mit den ' +
        'Hospitälern mit.',
      flaechen: [
        { titel: 'London — St. Thomas’, Guy’s, das University College', d: P.pfad(LONDON_STADT) },
        { titel: 'Edinburgh — die größte Anatomieschule Britanniens', d: P.pfad(EDINBURGH_STADT) },
        { titel: 'Paris — die Hospitäler mit legalem Nachschub', d: P.pfad(PARIS_UMLAND) },
      ],
    },
    {
      id: 'leichenhandel',
      label: '1828: Edinburgh — der Handel mit den Toten schlägt in Mord um',
      hinweis:
        'Die Anatomieschulen brauchen mehr Tote, als der Galgen liefert. Was ' +
        'die Lücke füllt, ist ein Gewerbe: Männer, die nachts frische Gräber ' +
        'öffnen. 1828 gehen William Burke und William Hare den Schritt ' +
        'weiter und töten sechzehn Menschen, um die Körper zu verkaufen. ' +
        'Auch über See wird geliefert — 1826 finden Hafenarbeiter in ' +
        'Liverpool Fässer, die als Ware deklariert waren und Leichen ' +
        'enthielten.',
      flaechen: [
        { titel: 'Edinburgh und der schottische Gürtel', d: P.pfad(SCHOTTISCHER_GUERTEL) },
        { titel: 'Liverpool — der Hafen, über den Fässer gingen', d: P.pfad(MERSEY_HAFEN) },
        { titel: 'Die irischen Häfen', d: P.pfad(IRISCHE_HAEFEN) },
      ],
    },
    {
      id: 'anatomy-act',
      label: '1832: das Anatomy Act — die Armenhäuser liefern',
      hinweis:
        'Nach Burke und Hare und nach ähnlichen Morden in London greift das ' +
        'Parlament ein. Das Anatomy Act erlaubt den Anatomen die Körper von ' +
        'Menschen, die niemand abholt — also vor allem die Toten aus den ' +
        'Armenhäusern. Der Schwarzmarkt trocknet aus. Wer arm stirbt, kann ' +
        'nun ohne Zustimmung auf dem Seziertisch enden; wer Geld hat, nicht.',
      flaechen: [
        { titel: 'England und Wales unter dem Anatomy Act', d: P.pfad(ENGLAND_UND_WALES) },
        { titel: 'London — die Schulen der Great Windmill Street', d: P.pfad(LONDON_STADT) },
      ],
    },
    {
      id: 'aether-1846',
      label: '1846: die Narkose kommt über den Atlantik nach London',
      hinweis:
        'Am 16. Oktober 1846 operiert in Boston ein Zahnarzt namens William ' +
        'Morton einen Patienten unter Äther. Die Nachricht braucht neun ' +
        'Wochen über den Ozean. Am 21. Dezember 1846 amputiert Robert Liston ' +
        'am University College Hospital in London ein Bein unter Äther — der ' +
        'Patient schläft. Damit endet der Zwang zur Eile, und die Chirurgie ' +
        'darf zum ersten Mal langsam sein.',
      flaechen: [
        { titel: 'Der Seeweg aus Boston', d: P.pfad(ATLANTIK_ZUGANG) },
        { titel: 'London — das University College Hospital', d: P.pfad(LONDON_STADT) },
      ],
    },
    {
      id: 'wien-1847',
      label: '1847: Wien — ein Arzt verlangt das Händewaschen',
      hinweis:
        'An der Ersten Geburtshilflichen Klinik des Wiener Allgemeinen ' +
        'Krankenhauses sterben deutlich mehr Frauen im Kindbett als an der ' +
        'Klinik der Hebammen. Ignaz Semmelweis findet den Unterschied: In ' +
        'der einen Abteilung kommen die Ärzte vom Seziertisch. Er ordnet ' +
        'das Waschen der Hände in Chlorkalk an, die Sterblichkeit fällt — ' +
        'und die Fachwelt widerspricht ihm jahrzehntelang.',
      flaechen: [
        { titel: 'Wien — das Allgemeine Krankenhaus', d: P.pfad(WIEN_STADT) },
        { titel: 'Der Donauraum', d: P.pfad(DONAURAUM) },
      ],
    },
    {
      id: 'glasgow-1867',
      label: '1867: Glasgow — Karbolsäure gegen das Wundfieber',
      hinweis:
        'Joseph Lister liest Pasteur und zieht den Schluss, dass die ' +
        'Eiterung von etwas Lebendigem stammt, das von außen in die Wunde ' +
        'kommt. Ab 1865 tränkt er Verbände in Karbolsäure; 1867 ' +
        'veröffentlicht er die Ergebnisse. Die Sterblichkeit nach ' +
        'Amputationen in seiner Abteilung sinkt drastisch. Damit beginnt das ' +
        'nächste Kapitel dieses Buches.',
      flaechen: [
        { titel: 'Glasgow — die Royal Infirmary', d: P.pfad(GLASGOW_STADT) },
        { titel: 'Das Clyde-Tal', d: P.pfad(CLYDE_TAL) },
      ],
    },
  ],

  punkte: [
    {
      id: 'london',
      name: 'London',
      typ: 'ereignis',
      ...ort(-0.128, 51.508),
      text:
        'Die Bühne dieses Kapitels. In den OP-Theatern von St. Thomas’, ' +
        'Guy’s und dem University College Hospital wird vor vollen Rängen ' +
        'operiert; der alte Hörsaal von St. Thomas’ aus dem Jahr 1822 steht ' +
        'bis heute im Dachstuhl einer Kirche in Southwark. Nebenan, in der ' +
        'Great Windmill Street, unterrichten die privaten Anatomieschulen — ' +
        'sie brauchen jedes Jahr Hunderte von Toten. Hier amputiert Robert ' +
        'Liston in unter dreißig Sekunden, und hier wird am 21. Dezember ' +
        '1846 zum ersten Mal in Europa unter Äther operiert.',
    },
    {
      id: 'edinburgh',
      name: 'Edinburgh',
      typ: 'ereignis',
      ...ort(-3.19, 55.95),
      text:
        'Die berühmteste medizinische Schule Britanniens — und der Ort, an ' +
        'dem der Handel mit den Toten kippte. 1828 verkauften William Burke ' +
        'und William Hare dem Anatomen Robert Knox die Körper von sechzehn ' +
        'Menschen, die sie ermordet hatten. Hare sagte gegen Burke aus und ' +
        'kam frei; Burke wurde am 28. Januar 1829 gehängt und danach ' +
        'öffentlich seziert. Sein Skelett steht bis heute in der ' +
        'Anatomiesammlung der Universität.',
    },
    {
      id: 'wien',
      name: 'Wien',
      typ: 'ereignis',
      ...ort(16.373, 48.208),
      text:
        'Am Allgemeinen Krankenhaus erkennt Ignaz Semmelweis 1847, warum in ' +
        'der Ärzteabteilung so viel mehr Wöchnerinnen sterben als bei den ' +
        'Hebammen: Die Ärzte kommen mit ungewaschenen Händen vom ' +
        'Seziertisch. Den Anstoß gibt der Tod eines Kollegen, der sich bei ' +
        'einer Obduktion geschnitten hatte und an denselben Zeichen starb ' +
        'wie die Frauen. Semmelweis ordnet Chlorkalk an, die Zahlen fallen — ' +
        'und er wird trotzdem nicht gehört.',
    },
    {
      id: 'paris',
      name: 'Paris',
      typ: 'stadt',
      ...ort(2.352, 48.857),
      text:
        'Die Stadt, in die britische Studenten fuhren, weil es dort legal ' +
        'Leichen gab: Die großen Hospitäler stellten die Toten, die niemand ' +
        'abholte, dem Unterricht zur Verfügung. Aus Paris kam auch die ' +
        'Kriegschirurgie — Dominique-Jean Larrey, der Chirurg Napoleons, ' +
        'ließ Verwundete mit leichten Wagen aus der Schlacht holen und ' +
        'operierte sofort. Er hatte erkannt, dass eine frühe Amputation mehr ' +
        'Menschen rettete als eine späte.',
    },
    {
      id: 'glasgow',
      name: 'Glasgow',
      typ: 'ereignis',
      ...ort(-4.25, 55.86),
      text:
        'An der Royal Infirmary sucht Joseph Lister ab 1865 nach dem Grund ' +
        'für das Wundfieber. Louis Pasteurs Arbeiten über die Gärung bringen ' +
        'ihn auf den Gedanken, dass Lebendiges aus der Luft in die Wunde ' +
        'gerät. Er tränkt Verbände in Karbolsäure, reinigt Hände und ' +
        'Instrumente und veröffentlicht 1867 seine Ergebnisse. Was die ' +
        'Chirurgen dieses Kapitels nicht erklären konnten, ist damit ' +
        'erklärbar — und das nächste Kapitel erzählt es.',
    },
    {
      id: 'liverpool',
      name: 'Liverpool',
      typ: 'stadt',
      ...ort(-2.99, 53.41),
      text:
        'Ein Hafen, in dem 1826 auffiel, was sonst unbemerkt blieb: In ' +
        'Fässern, die als gewöhnliche Ware angemeldet waren, fanden ' +
        'Arbeiter menschliche Leichen, die nach Schottland verschifft werden ' +
        'sollten. Der Fall zeigte, dass der Nachschub für die ' +
        'Anatomieschulen längst ein Gewerbe mit Handelswegen war — über die ' +
        'Irische See, mit Frachtbriefen und Zwischenhändlern.',
    },
  ],

  bewegungen: [
    {
      id: 'leichen-nach-edinburgh',
      name: 'Der Weg der Toten',
      von: station(-2.99, 53.41),
      ueber: [station(-3.6, 54.9)],
      nach: station(-3.19, 55.95),
      text:
        'Wo der Bedarf einer Stadt größer war als ihre Friedhöfe hergaben, ' +
        'kam Nachschub von auswärts: über die Irische See in die Häfen, von ' +
        'dort mit dem Fuhrwerk weiter. Die Fässer waren als Ware deklariert, ' +
        'die Frachtpapiere in Ordnung. Auffällig wurde eine Sendung nur, ' +
        'wenn sie zu lange liegen blieb.',
    },
    {
      id: 'studenten-nach-paris',
      name: 'Die Studenten fahren nach Paris',
      von: station(-0.128, 51.508),
      ueber: [station(1.4, 50.95)],
      nach: station(2.352, 48.857),
      text:
        'Wer in Britannien sezieren wollte, musste kaufen, was nachts ' +
        'ausgegraben worden war. In Paris stellten die Hospitäler die Toten, ' +
        'die niemand abholte, dem Unterricht zur Verfügung. Also gingen ' +
        'britische Studenten über den Kanal — nicht wegen der besseren ' +
        'Lehrer, sondern wegen der Körper, an denen sie lernen durften.',
    },
    {
      id: 'narkose-ueber-den-atlantik',
      name: 'Die Narkose kommt über den Atlantik',
      von: station(-10.6, 50.5),
      ueber: [station(-6.0, 50.2), station(-1.5, 50.4)],
      nach: station(-0.128, 51.508),
      text:
        'Am 16. Oktober 1846 wird in Boston unter Äther operiert. Die ' +
        'Nachricht reist mit dem Postdampfer über den Ozean und erreicht ' +
        'Britannien im Dezember. Am 21. Dezember 1846 amputiert Robert ' +
        'Liston in London unter Äther und sagt seinen Zuschauern, dieser ' +
        'amerikanische Trick schlage alles Bisherige.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 3.2, 55.4),
    schrift('Ärmelkanal', 'meer', -0.6, 50.05, -12),
    schrift('Irische See', 'meer', -5.3, 53.7),
    schrift('Atlantik', 'meer', -9.6, 48.6),
    schrift('Ostsee', 'meer', 15.2, 55.4),
    schrift('Kattegat', 'meer', 11.3, 57.1),
    schrift('Themse', 'meer', 0.5, 51.55),
    schrift('Donau', 'meer', 13.2, 48.75, -12),
    schrift('Rhein', 'meer', 7.35, 50.55, -70),
    schrift('England', 'land', -1.4, 52.6),
    schrift('Schottland', 'land', -4.3, 57.0),
    schrift('Irland', 'land', -8.0, 53.4),
    schrift('Wales', 'land', -3.7, 52.3),
    schrift('Frankreich', 'land', 2.3, 47.4),
    schrift('Deutsche Lande', 'land', 10.2, 51.4),
    schrift('Dänemark', 'land', 9.2, 56.3),
    schrift('Alpen', 'land', 10.6, 46.9),
    schrift('Wien', 'land', 15.4, 48.7),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
