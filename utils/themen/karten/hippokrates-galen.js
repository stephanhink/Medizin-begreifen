// Karte zu „Hippokrates und Galen" — das östliche Mittelmeer.
//
// Wie in den Kapiteln 1 bis 3 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-hippokrates-galen.mjs nach.
//
// Was die Karte zeigen soll: dass die europäische Medizin nicht an einem Ort
// entstand, sondern auf einem Seeweg. Sie beginnt auf einer kleinen Insel vor
// der Küste Kleinasiens (Kos), wird in der größten Bibliothek der Antike
// gesammelt (Alexandria) und bekommt ihre endgültige Gestalt in der
// Hauptstadt eines Weltreichs (Rom) — von einem Mann aus Pergamon, der den
// Mann von Kos nie getroffen hat, weil zwischen ihnen fünfeinhalb
// Jahrhunderte liegen. Die vierte Phase zeigt, wohin die Bücher danach
// wanderten: nach Konstantinopel und in die syrischen Übersetzerschulen —
// das ist die Brücke zum Kapitel über Avicenna.
//
// Aufbau der Landmassen: drei große Ringe. „Europa" (Italien, die Balkanküste,
// Griechenland, Thrakien) läuft im Norden bewusst über den Bildrand hinaus.
// „Asien" (Kleinasien, die Levante, Sinai, die Westküste Arabiens) und
// „Afrika" teilen sich die Linie über den Isthmus von Suez — dadurch bleibt
// das Rote Meer eine Lücke zwischen den Flächen und braucht keine eigene
// Fläche. Ägäis, Marmarameer, Bosporus und Schwarzes Meer sind ebenso
// Lücken: zwischen dem europäischen und dem asiatischen Ring. Die Inseln —
// Kreta, Euböa, Lesbos, Chios, Samos, Kos, Rhodos, die Kykladen, Zypern,
// Sizilien und die Ionischen Inseln — sind eigene Ringe, sonst wäre die
// Ägäis zugewachsen, und genau sie macht diesen Raum aus.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von Rom bis an den Euphrat, von Oberägypten und dem
 * Roten Meer bis an das Schwarze Meer.
 */
const RAHMEN = {
  minLon: 10,
  maxLon: 38,
  minLat: 24,
  maxLat: 43,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 3, damit alle Karten des
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

/** Eine Wüstenfläche — eine Spur tiefer als das Land, ohne Rand. */
function wueste(orte) {
  return {
    art: 'wueste',
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

/** Ligurien → Latium → Kampanien → Kalabrien: die Tyrrhenische Seite. */
const ITALIEN_WEST = [
  [7.3, 43.7], [8.4, 44.2], [8.95, 44.4], [9.85, 44.07], [10.3, 43.55],
  [10.7, 42.95], [11.1, 42.4], [11.8, 42.1], [12.25, 41.75], [12.63, 41.45],
  [13.1, 41.25], [13.55, 41.22], [14.05, 40.83], [14.4, 40.6], [14.75, 40.68],
  [15.05, 40.05], [15.28, 40.02], [15.75, 39.95], [16.05, 39.36],
  [15.9, 38.9], [15.85, 38.67], [15.65, 38.25], [15.63, 38.1],
];

/** Stiefelspitze → Golf von Tarent → Absatz → Gargano → Po-Delta → Triest. */
const ITALIEN_OST = [
  [15.63, 38.1], [16.0, 37.93], [16.57, 38.3], [17.13, 38.9], [17.13, 39.08],
  [16.5, 39.72], [16.9, 40.15], [17.23, 40.47], [17.98, 40.05], [18.35, 39.79],
  [18.5, 40.15], [17.94, 40.63], [17.3, 40.95], [16.87, 41.13], [16.28, 41.32],
  [15.9, 41.63], [16.18, 41.9], [15.5, 41.92], [14.99, 42.0], [14.71, 42.11],
  [14.4, 42.35], [14.22, 42.46], [13.95, 42.75], [13.88, 42.95], [13.51, 43.62],
  [12.57, 44.06], [12.2, 44.42], [12.5, 44.85], [12.33, 45.44], [13.77, 45.65],
];

/** Istrien → Dalmatien → Albanien → Epirus. Die Inseln davor sind fortgelassen. */
const OSTADRIA = [
  [13.77, 45.65], [13.63, 45.1], [13.85, 44.87], [14.5, 45.2], [15.23, 44.12],
  [15.9, 43.73], [16.44, 43.51], [17.43, 43.05], [18.09, 42.65], [18.77, 42.43],
  [19.09, 42.09], [19.45, 41.32], [19.49, 40.47], [20.0, 39.87], [20.27, 39.5],
];

/** Epirus → Golf von Patras → Nordufer des Golfs von Korinth → Isthmus. */
const GRIECHENLAND_WEST = [
  [20.27, 39.5], [20.75, 38.95], [21.15, 38.35], [21.43, 38.35],
  [21.83, 38.39], [22.42, 38.43], [22.63, 38.36], [22.98, 38.0],
];

/** Der Peloponnes: Südufer des Golfs von Korinth → Messenien → Mani →
 *  Kap Malea → Argolis → zurück an den Isthmus. */
const PELOPONNES = [
  [22.98, 38.0], [22.93, 37.94], [22.63, 38.08], [22.08, 38.25], [21.73, 38.25],
  [21.4, 38.16], [21.13, 37.93], [21.32, 37.65], [21.67, 37.25], [21.7, 36.95],
  [21.7, 36.8], [21.95, 36.79], [22.11, 37.03], [22.23, 36.89], [22.48, 36.39],
  [22.57, 36.76], [22.75, 36.8], [22.95, 36.5], [23.2, 36.43], [23.05, 36.69],
  [22.88, 37.17], [22.73, 37.4], [22.8, 37.57], [23.05, 37.3], [23.25, 37.38],
  [23.45, 37.5], [23.15, 37.63], [23.02, 37.9],
];

/** Attika → Euböischer Golf → Thessalien → Thermaischer Golf. */
const ATTIKA_THESSALIEN = [
  [23.02, 37.9], [23.34, 37.99], [23.54, 38.02], [23.9, 37.85], [24.03, 37.65],
  [24.02, 38.02], [24.0, 38.17], [23.85, 38.31], [23.6, 38.46], [23.05, 38.7],
  [22.78, 38.78], [22.55, 38.85], [22.45, 38.92], [22.95, 39.05], [22.94, 39.36],
  [23.1, 39.15], [23.4, 39.15], [23.65, 39.25], [23.2, 39.6], [22.85, 39.9],
  [22.6, 40.05], [22.7, 40.35], [22.85, 40.48], [22.94, 40.63],
];

/** Chalkidiki mit ihren drei Fingern → Thrakien → Gallipoli → Marmarameer →
 *  Bosporus → Schwarzmeerküste, die im Norden aus dem Rahmen läuft. */
const CHALKIDIKI_THRAKIEN = [
  [22.94, 40.63], [23.3, 40.4], [23.4, 39.96], [23.65, 40.3], [23.9, 39.96],
  [24.05, 40.35], [24.33, 40.16], [23.98, 40.4], [24.4, 40.94], [24.75, 40.85],
  [25.1, 40.98], [25.87, 40.85], [26.05, 40.73], [26.55, 40.6], [26.4, 40.35],
  [26.18, 40.04], [26.38, 40.14], [26.67, 40.41], [27.11, 40.61], [27.51, 40.98],
  [28.25, 41.07], [28.98, 41.02], [29.05, 41.2], [28.6, 41.35], [28.1, 41.63],
  [27.97, 41.88], [27.7, 42.4], [27.3, 43.2],
];

/** Der Nordrand liegt bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const EUROPA_NORDRAND = [
  [26.0, 43.8], [22.0, 44.6], [18.0, 45.6], [14.0, 46.2], [11.0, 46.3],
  [8.5, 45.6], [7.0, 44.6],
];

/** Der europäische Ring: Italien, die Balkanküste, Griechenland, Thrakien. */
const EUROPA = verbinde(
  ITALIEN_WEST,
  ITALIEN_OST,
  OSTADRIA,
  GRIECHENLAND_WEST,
  PELOPONNES,
  ATTIKA_THESSALIEN,
  CHALKIDIKI_THRAKIEN,
  EUROPA_NORDRAND,
);

/** Dardanellen (asiatische Seite) → Marmarameer → Bosporus → Schwarzes Meer. */
const ANATOLIEN_NORD = [
  [26.19, 40.03], [26.4, 40.15], [26.68, 40.35], [27.4, 40.4], [27.97, 40.35],
  [28.88, 40.37], [29.1, 40.43], [29.92, 40.76], [29.02, 41.02], [29.15, 41.2],
  [29.6, 41.17], [31.12, 41.08], [31.79, 41.45], [32.38, 41.75], [33.76, 41.98],
  [35.15, 42.03], [36.33, 41.29], [38.39, 40.92], [39.72, 41.0],
];

/** Der Ostrand: außerhalb des Rahmens um Arabien herum bis an das Rote Meer. */
const ASIEN_OSTRAND = [
  [41.5, 41.5], [43.5, 41.0], [44.0, 38.0], [45.0, 32.0], [44.0, 26.0],
  [42.0, 20.0], [39.5, 19.0],
];

/** Die Westküste Arabiens → Golf von Akaba → Sinai → Golf von Suez. */
const ARABIEN_SINAI = [
  [38.06, 24.09], [37.3, 25.1], [36.45, 26.24], [35.7, 27.35], [34.95, 29.35],
  [34.67, 29.03], [34.5, 28.5], [34.3, 27.85], [33.2, 28.7], [32.9, 29.4],
  [32.55, 29.97], [32.32, 31.25],
];

/** Sinai-Nordküste → Levante → Golf von Iskenderun. */
const LEVANTE = [
  [32.32, 31.25], [33.8, 31.13], [34.25, 31.28], [34.45, 31.5], [34.55, 31.66],
  [34.77, 32.08], [34.99, 32.82], [35.07, 32.93], [35.2, 33.27], [35.37, 33.56],
  [35.5, 33.9], [35.65, 34.12], [35.84, 34.44], [35.87, 34.9], [35.78, 35.53],
  [35.93, 36.09], [36.17, 36.58],
];

/** Kilikien → Pamphylien → Lykien: die Südküste Kleinasiens. */
const ANATOLIEN_SUED = [
  [36.17, 36.58], [35.79, 36.77], [35.38, 36.56], [34.64, 36.8], [33.93, 36.38],
  [32.83, 36.02], [32.0, 36.54], [31.39, 36.77], [30.7, 36.88], [30.42, 36.19],
  [29.98, 36.2], [29.64, 36.2], [29.31, 36.26], [29.1, 36.62], [28.6, 36.7],
  [28.27, 36.8], [28.1, 36.62], [27.7, 36.7], [27.37, 36.68], [27.8, 36.75],
  [28.2, 37.1], [27.7, 37.0], [27.43, 37.03], [27.4, 37.2], [27.28, 37.5],
  [27.26, 37.86],
];

/** Ionien: Kuşadası → Çeşme → Golf von Izmir → Golf von Edremit → Troas. */
const ANATOLIEN_WEST = [
  [27.26, 37.86], [26.79, 38.19], [26.3, 38.32], [26.77, 38.32], [27.14, 38.42],
  [26.75, 38.67], [26.93, 38.93], [26.88, 39.07], [26.7, 39.31], [27.0, 39.58],
  [26.6, 39.55], [26.34, 39.49], [26.06, 39.47], [26.15, 39.85], [26.19, 40.03],
];

/** Der asiatische Ring: Kleinasien, die Levante, Sinai, Westarabien. */
const ASIEN = verbinde(
  ANATOLIEN_NORD,
  ASIEN_OSTRAND,
  ARABIEN_SINAI,
  LEVANTE,
  ANATOLIEN_SUED,
  ANATOLIEN_WEST,
);

/** Isthmus von Suez → Westufer des Golfs von Suez → aus dem Rahmen nach Süden. */
const AEGYPTEN_ROTES_MEER = [
  [32.32, 31.25], [32.55, 29.97], [33.1, 28.35], [33.8, 27.24], [34.28, 26.1],
  [34.9, 25.07], [35.48, 23.9], [36.5, 22.0], [37.5, 18.0],
];

/** Der Südwestrand Afrikas — außerhalb des Rahmens, damit die Fläche ausläuft. */
const AFRIKA_SUEDRAND = [
  [30.0, 14.0], [20.0, 14.0], [10.0, 16.0], [8.0, 24.0], [9.0, 30.0],
  [9.6, 33.2],
];

/** Die nordafrikanische Küste: Tunesien → Tripolitanien → Große Syrte →
 *  Kyrenaika → Marmarica → Nildelta → Isthmus von Suez. */
const NORDAFRIKA = [
  [9.8, 37.2], [10.3, 37.05], [10.64, 35.83], [10.76, 34.72], [10.1, 33.88],
  [11.1, 33.5], [11.5, 33.2], [12.1, 32.9], [13.2, 32.9], [15.09, 32.38],
  [16.6, 31.2], [18.5, 30.4], [19.2, 30.75], [20.07, 32.12], [20.95, 32.72],
  [21.97, 32.9], [22.63, 32.76], [23.95, 32.08], [25.1, 31.76], [25.15, 31.55],
  [27.24, 31.35], [28.95, 30.83], [29.9, 31.2], [30.4, 31.48], [30.9, 31.58],
  [31.5, 31.5], [31.85, 31.52], [32.32, 31.25],
];

/** Der afrikanische Ring — er teilt sich mit Asien die Linie über Suez. */
const AFRIKA = verbinde(
  AEGYPTEN_ROTES_MEER,
  AFRIKA_SUEDRAND,
  NORDAFRIKA,
);

// ---------------------------------------------------------------------------
// Die Inseln. Ohne sie wäre die Ägäis eine Fläche statt eines Meeres — und
// gerade sie ist die Bühne dieses Kapitels.
// ---------------------------------------------------------------------------

/** Kreta. */
const KRETA = [
  [23.52, 35.53], [24.15, 35.62], [24.8, 35.43], [25.16, 35.35], [25.75, 35.35],
  [26.32, 35.32], [26.28, 35.17], [25.74, 35.01], [25.1, 34.93], [24.75, 34.98],
  [24.1, 35.15], [23.65, 35.22], [23.55, 35.35],
];

/** Euböa — die lange Insel vor der attisch-boiotischen Küste. */
const EUBOEA = [
  [23.2, 38.95], [23.55, 39.03], [24.12, 38.65], [24.6, 38.15], [24.42, 38.0],
  [23.9, 38.28], [23.55, 38.45], [23.2, 38.7],
];

/** Lesbos. */
const LESBOS = [
  [25.9, 39.15], [26.2, 39.4], [26.6, 39.35], [26.4, 39.05], [26.1, 38.9],
  [25.87, 39.05],
];

/** Chios. */
const CHIOS = [
  [25.95, 38.35], [26.0, 38.6], [26.2, 38.5], [26.15, 38.2], [25.98, 38.15],
];

/** Samos. */
const SAMOS = [
  [26.55, 37.75], [26.8, 37.8], [27.05, 37.7], [26.75, 37.68],
];

/** Kos — die Insel des Hippokrates. */
const KOS = [
  [26.92, 36.75], [27.05, 36.85], [27.3, 36.9], [27.42, 36.83], [27.2, 36.73],
  [27.0, 36.7],
];

/** Rhodos. */
const RHODOS = [
  [28.22, 36.45], [28.25, 36.2], [27.95, 35.9], [27.75, 36.05], [27.75, 36.35],
  [28.0, 36.45],
];

/** Karpathos — der Trittstein zwischen Rhodos und Kreta. */
const KARPATHOS = [
  [27.1, 35.75], [27.25, 35.55], [27.15, 35.4], [27.0, 35.6],
];

/** Naxos. */
const NAXOS = [
  [25.35, 37.0], [25.6, 37.1], [25.6, 36.85], [25.4, 36.8],
];

/** Paros. */
const PAROS = [
  [25.1, 37.05], [25.28, 37.1], [25.28, 36.9], [25.1, 36.95],
];

/** Andros. */
const ANDROS = [
  [24.7, 37.8], [24.95, 37.95], [25.0, 37.75], [24.75, 37.65],
];

/** Limnos. */
const LIMNOS = [
  [25.0, 39.85], [25.3, 39.95], [25.35, 39.8], [25.05, 39.75],
];

/** Thasos. */
const THASOS = [
  [24.6, 40.8], [24.8, 40.75], [24.75, 40.6], [24.6, 40.65],
];

/** Zypern. */
const ZYPERN = [
  [32.27, 35.09], [33.32, 35.34], [34.0, 35.42], [34.6, 35.69], [34.4, 35.5],
  [33.94, 35.12], [33.63, 34.92], [33.04, 34.67], [32.42, 34.75], [32.3, 34.95],
];

/** Sizilien. */
const SIZILIEN = [
  [15.55, 38.3], [15.29, 37.85], [15.09, 37.5], [15.29, 37.07], [15.14, 36.69],
  [14.5, 36.79], [14.25, 37.02], [13.58, 37.26], [12.9, 37.57], [12.43, 37.8],
  [12.51, 38.02], [13.36, 38.18], [14.02, 38.02], [15.0, 38.02],
];

/** Korfu. */
const KORFU = [
  [19.65, 39.8], [19.92, 39.75], [20.1, 39.45], [19.85, 39.4], [19.7, 39.6],
];

/** Kefalonia. */
const KEFALONIA = [
  [20.4, 38.28], [20.65, 38.35], [20.6, 38.05], [20.4, 38.05],
];

/** Zakynthos. */
const ZAKYNTHOS = [
  [20.6, 37.88], [20.9, 37.85], [20.85, 37.7], [20.65, 37.72],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  europa: EUROPA,
  asien: ASIEN,
  afrika: AFRIKA,
  kreta: KRETA,
  euboea: EUBOEA,
  lesbos: LESBOS,
  chios: CHIOS,
  samos: SAMOS,
  kos: KOS,
  rhodos: RHODOS,
  zypern: ZYPERN,
  sizilien: SIZILIEN,
  italienWest: ITALIEN_WEST,
  peloponnes: PELOPONNES,
  anatolienWest: ANATOLIEN_WEST,
  levante: LEVANTE,
  nordafrika: NORDAFRIKA,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [
  EUROPA,
  ASIEN,
  AFRIKA,
  KRETA,
  EUBOEA,
  LESBOS,
  CHIOS,
  SAMOS,
  KOS,
  RHODOS,
  KARPATHOS,
  NAXOS,
  PAROS,
  ANDROS,
  LIMNOS,
  THASOS,
  ZYPERN,
  SIZILIEN,
  KORFU,
  KEFALONIA,
  ZAKYNTHOS,
];

// ---------------------------------------------------------------------------
// Wüste und Fluss — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Die Libysche Wüste westlich des Nils — nur Farbe, keine Aussage über Grenzen. */
const LIBYSCHE_WUESTE = [
  [24.0, 30.0], [27.0, 29.5], [30.0, 28.5], [30.5, 26.0], [29.0, 23.5],
  [25.0, 23.5], [22.0, 25.5], [21.5, 28.0],
];

/** Der Nil: vom ersten Katarakt bei Assuan durch das Tal bis in das Delta. */
const NIL = [
  [32.9, 24.09], [32.64, 25.7], [32.72, 26.17], [32.1, 26.3], [31.7, 26.6],
  [31.18, 27.18], [30.75, 28.1], [31.1, 29.07], [31.24, 30.05], [30.85, 30.9],
  [30.4, 31.45],
];

// ---------------------------------------------------------------------------
// Die Phasen: viermal derselbe Seeraum, siebenhundert Jahre auseinander —
// und einmal noch weiter, denn die Bücher wanderten länger als ihre Verfasser.
// ---------------------------------------------------------------------------

/** Phase 1 — die Insel des Hippokrates und ihre Rivalin. */
const HALBINSEL_KNIDOS = [
  [27.35, 36.7], [27.8, 36.78], [28.2, 36.95], [28.15, 36.75], [27.7, 36.65],
  [27.35, 36.63],
];
const IONIEN_UND_INSELN = [
  [26.0, 39.4], [27.15, 39.0], [27.6, 38.4], [27.5, 37.6], [27.5, 36.9],
  [26.9, 37.1], [26.5, 38.0], [26.2, 38.8],
];
const GRIECHISCHE_STAEDTE = [
  [20.9, 39.4], [22.6, 40.2], [24.0, 40.0], [23.9, 38.5], [23.9, 37.6],
  [22.9, 36.7], [21.6, 37.2], [21.1, 38.4],
];

/** Phase 2 — Alexandria und das Land der Ptolemäer. */
const ALEXANDRIA_DELTA = [
  [29.5, 31.4], [30.6, 31.6], [31.9, 31.6], [32.3, 31.2], [31.5, 30.2],
  [30.4, 30.3], [29.7, 30.9],
];
const NILTAL_PTOLEMAEER = [
  [30.9, 30.2], [31.5, 30.1], [32.9, 24.2], [32.4, 24.1], [30.9, 27.5],
  [30.3, 29.5],
];

/** Phase 3 — Pergamon, wo Galen aufwuchs, und Rom, wo er blieb. */
const PERGAMON_UMLAND = [
  [26.9, 39.4], [27.6, 39.35], [27.7, 38.9], [27.0, 38.85],
];
const LATIUM = [
  [11.5, 42.6], [13.0, 42.8], [14.0, 41.8], [13.2, 41.2], [12.1, 41.6],
  [11.4, 42.1],
];

/** Phase 4 — wohin die Bücher wanderten, als das Weströmische Reich endete. */
const KONSTANTINOPEL = [
  [28.4, 41.4], [29.5, 41.3], [29.6, 40.7], [28.5, 40.8],
];
const SYRISCHE_SCHULEN = [
  [35.8, 36.9], [37.4, 36.9], [37.6, 35.8], [36.0, 35.8],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(EUROPA),
    land(ASIEN),
    land(AFRIKA),
    land(KRETA),
    land(EUBOEA),
    land(LESBOS),
    land(CHIOS),
    land(SAMOS),
    land(KOS),
    land(RHODOS),
    land(KARPATHOS),
    land(NAXOS),
    land(PAROS),
    land(ANDROS),
    land(LIMNOS),
    land(THASOS),
    land(ZYPERN),
    land(SIZILIEN),
    land(KORFU),
    land(KEFALONIA),
    land(ZAKYNTHOS),
    wueste(LIBYSCHE_WUESTE),
    fluss(NIL),
  ],

  phasen: [
    {
      id: 'kos-und-knidos',
      label: '~460–370 v. Chr.: Kos und Knidos',
      hinweis:
        'Auf einer kleinen Insel vor der Küste Kleinasiens lehrt eine ' +
        'Ärztefamilie, was später „hippokratische Medizin" heißen wird: genau ' +
        'hinsehen, den Verlauf einer Krankheit aufschreiben, die Natur ' +
        'arbeiten lassen. Zwei Stunden Seeweg entfernt, auf der Halbinsel von ' +
        'Knidos, lehrt eine zweite Schule das Gegenteil: möglichst viele ' +
        'Krankheiten unterscheiden und benennen. Beide streiten — und beide ' +
        'Schriften landen später in derselben Sammlung.',
      flaechen: [
        { titel: 'Die Insel Kos — die Schule des Hippokrates', d: P.pfad(KOS) },
        { titel: 'Die Halbinsel von Knidos — die Rivalin', d: P.pfad(HALBINSEL_KNIDOS) },
        { titel: 'Ionien und die Inseln: die Städte der Wanderärzte', d: P.pfad(IONIEN_UND_INSELN) },
        { titel: 'Griechenland: wohin die Ärzte reisten', d: P.pfad(GRIECHISCHE_STAEDTE) },
      ],
    },
    {
      id: 'alexandria',
      label: '~330–150 v. Chr.: Alexandria sammelt das Wissen',
      hinweis:
        'In der neuen Stadt am Nildelta legen die Ptolemäer die größte ' +
        'Bibliothek der Antike an — zeitgenössische Angaben sprechen von ' +
        'Hunderttausenden Buchrollen. Hier werden die medizinischen Schriften ' +
        'zusammengetragen, geordnet und einem Namen zugeschrieben: ' +
        'Hippokrates. Hier wird auch zum ersten und für lange Zeit letzten Mal ' +
        'in Europa der menschliche Körper systematisch zergliedert.',
      flaechen: [
        { titel: 'Alexandria und das Nildelta', d: P.pfad(ALEXANDRIA_DELTA) },
        { titel: 'Das Niltal der Ptolemäer', d: P.pfad(NILTAL_PTOLEMAEER) },
      ],
    },
    {
      id: 'galen-in-rom',
      label: '~162–216 n. Chr.: Galen in Rom',
      hinweis:
        'Ein Arzt aus Pergamon, geboren 129 n. Chr., zieht nach Rom und wird ' +
        'Leibarzt des Kaisers. Er verehrt die Bücher von Kos, kommentiert sie ' +
        'und fügt sie zu einem geschlossenen System zusammen. Seine ' +
        'Anatomie stammt aus der Zergliederung von Tieren — Menschen durfte er ' +
        'nicht öffnen. Was er schreibt, gilt danach rund 1300 Jahre.',
      flaechen: [
        { titel: 'Pergamon — wo Galen aufwuchs', d: P.pfad(PERGAMON_UMLAND) },
        { titel: 'Rom und Latium — wo er das letzte Wort bekam', d: P.pfad(LATIUM) },
      ],
    },
    {
      id: 'das-erbe-wandert',
      label: '6.–11. Jh.: das Erbe wandert nach Osten',
      hinweis:
        'Im lateinischen Westen gehen die griechischen Bücher weitgehend ' +
        'verloren. Erhalten bleiben sie in Konstantinopel — und in den ' +
        'syrischen Klosterschulen, die sie ins Syrische und später ins ' +
        'Arabische übersetzen. Über Bagdad kommen sie im Mittelalter nach ' +
        'Europa zurück. Wie das geschah, erzählt das Kapitel über Avicenna.',
      flaechen: [
        { titel: 'Konstantinopel — wo die Handschriften überlebten', d: P.pfad(KONSTANTINOPEL) },
        { titel: 'Antiochia und die syrischen Übersetzerschulen', d: P.pfad(SYRISCHE_SCHULEN) },
        { titel: 'Alexandria, das weitergab', d: P.pfad(ALEXANDRIA_DELTA) },
      ],
    },
  ],

  punkte: [
    {
      id: 'kos',
      name: 'Kos',
      typ: 'stadt',
      ...ort(27.29, 36.89),
      text:
        'Die Insel, auf der Hippokrates um 460 v. Chr. geboren wurde. Hier ' +
        'lehrte eine Familie von Ärzten, die sich Asklepiaden nannte — ' +
        '„Nachkommen des Asklepios" —, und hier entstand ein Teil der ' +
        'Schriften, die später seinen Namen tragen. Bemerkenswert ist, was ' +
        'daneben stand: Auf derselben Insel gab es ein großes ' +
        'Asklepios-Heiligtum, in dem Kranke schliefen und auf einen ' +
        'heilenden Traum warteten. Nüchterne Beobachtung und Tempelheilung ' +
        'lagen keine Stunde auseinander. Zwei Stunden mit dem Boot entfernt ' +
        'lag Knidos, die rivalisierende Ärzteschule.',
    },
    {
      id: 'larissa',
      name: 'Larissa',
      typ: 'ereignis',
      ...ort(22.42, 39.64),
      text:
        'In dieser thessalischen Stadt soll Hippokrates hochbetagt gestorben ' +
        'sein; sein Grab wurde dort noch Jahrhunderte später gezeigt. Über ' +
        'den Mann selbst weiß man erstaunlich wenig. Sicher ist nur, dass ' +
        'Platon ihn erwähnt, als er noch lebte — als berühmten Arzt von Kos, ' +
        'der gegen Bezahlung unterrichtete. Alles Weitere, auch die ' +
        'Lebensbeschreibungen und die angeblichen Briefe, wurde ' +
        'Jahrhunderte später geschrieben. „Hippokrates" ist deshalb eher ' +
        'der Name einer Schule als das Bild eines einzelnen Mannes.',
    },
    {
      id: 'athen',
      name: 'Athen',
      typ: 'stadt',
      ...ort(23.73, 37.98),
      text:
        'Die Stadt, in der die Philosophie das Fragen lernte — Sokrates, ' +
        'Platon, später Aristoteles, der Tiere zergliederte und ordnete. ' +
        'Ohne dieses Denken gäbe es keine Medizin, die nach natürlichen ' +
        'Ursachen sucht. Athen lieferte aber auch die erste nüchterne ' +
        'Seuchenbeschreibung der Weltliteratur: 430 v. Chr. wütete in der ' +
        'belagerten Stadt eine Epidemie, an der etwa ein Viertel der ' +
        'Bevölkerung starb. Der Historiker Thukydides überlebte sie und ' +
        'schrieb die Krankheitszeichen so genau auf, dass Forscher bis heute ' +
        'über den Erreger streiten.',
    },
    {
      id: 'alexandria',
      name: 'Alexandria',
      typ: 'stadt',
      ...ort(29.9, 31.2),
      text:
        'Die Bibliothek der Ptolemäer sammelte, was in griechischer Sprache ' +
        'geschrieben war — und mit ihr wurden die medizinischen Schriften ' +
        'geordnet und einem Namen zugeordnet. Hier zergliederten Herophilos ' +
        'und Erasistratos um 300 v. Chr. als Erste in Europa planmäßig ' +
        'menschliche Leichen; sie beschrieben Nerven, Hirnhäute und ' +
        'Herzklappen. Antike Berichte werfen ihnen vor, auch lebende ' +
        'verurteilte Gefangene geöffnet zu haben — ob es stimmt, ist bis ' +
        'heute umstritten. Danach wurde in Europa 1500 Jahre lang kein ' +
        'Mensch mehr planmäßig seziert.',
    },
    {
      id: 'pergamon',
      name: 'Pergamon',
      typ: 'stadt',
      ...ort(27.18, 39.12),
      text:
        'Geburtsort Galens (129 n. Chr.), Bibliotheksstadt und Standort ' +
        'eines der berühmtesten Asklepios-Heiligtümer der römischen Welt. ' +
        'Galen begann hier als Arzt der Gladiatorenschule — eine harte ' +
        'Lehrzeit: Wunden, gebrochene Knochen, durchtrennte Sehnen. Er ' +
        'nannte die Wunden später „Fenster in den Körper". Was er dabei ' +
        'lernte, konnte er an Menschen nicht überprüfen: Sezieren war ' +
        'verboten. Also öffnete er Affen, Schweine und Rinder — und übertrug ' +
        'ihren Bau auf den Menschen.',
    },
    {
      id: 'rom',
      name: 'Rom',
      typ: 'stadt',
      ...ort(12.48, 41.9),
      text:
        'Hierher zog Galen 162 n. Chr., und hier wurde er, was kein Arzt vor ' +
        'ihm gewesen war: die Autorität. Er behandelte Kaiser Marcus ' +
        'Aurelius, hielt öffentliche Vorführungen ab, bei denen er lebenden ' +
        'Tieren Nerven durchtrennte, und schrieb so viel, dass seine Werke ' +
        'etwa ein Zehntel aller erhaltenen griechischen Literatur der Antike ' +
        'ausmachen. Von 165 an erlebte er in Rom eine große Seuche, die ' +
        'Millionen Menschen tötete. Sie trägt seinen Namen: die Antoninische ' +
        'Pest, oft „Galenische Pest" genannt.',
    },
  ],

  bewegungen: [
    {
      id: 'schriften-nach-alexandria',
      name: 'Die Schriften nach Alexandria',
      von: station(27.29, 36.89),
      ueber: [station(28.1, 36.3), station(27.5, 34.0)],
      nach: station(29.9, 31.2),
      text:
        'Was auf Kos, in Knidos und anderswo geschrieben wurde, kam über die ' +
        'Seewege in die Bibliothek von Alexandria. Dort wurden die Rollen ' +
        'gesammelt, verglichen und kommentiert — und dort entstand die ' +
        'Sammlung von rund sechzig Schriften, die wir heute das Corpus ' +
        'Hippocraticum nennen. Ihre Verfasser sind unbekannt; sie ' +
        'widersprechen einander an vielen Stellen. Der Name über der ' +
        'Sammlung machte aus vielen Stimmen eine Lehre.',
    },
    {
      id: 'galens-weg',
      name: 'Der Weg Galens: Pergamon — Alexandria — Rom',
      von: station(27.18, 39.12),
      ueber: [station(27.14, 38.42), station(29.9, 31.2)],
      nach: station(12.48, 41.9),
      text:
        'Galen studierte in Pergamon und Smyrna und ging dann für mehrere ' +
        'Jahre nach Alexandria — dorthin, wo man menschliche Skelette ' +
        'studieren konnte. 162 n. Chr. zog er nach Rom. Er machte den Umweg ' +
        'über die Bibliothek, bevor er an den Kaiserhof ging: Erst das alte ' +
        'Wissen, dann die Macht. Beides zusammen ergab die Autorität, die ' +
        'dreizehn Jahrhunderte hielt.',
    },
    {
      id: 'nach-osten',
      name: 'Die Bücher wandern nach Osten',
      von: station(29.9, 31.2),
      ueber: [station(33.5, 34.5), station(36.17, 36.58)],
      nach: station(37.6, 36.9),
      text:
        'Als der lateinische Westen das Griechische verlernte, überlebten die ' +
        'Schriften anderswo: in Konstantinopel, in den syrischen ' +
        'Klosterschulen und schließlich in Bagdad, wo sie ins Arabische ' +
        'übersetzt wurden. Der Weg führte weiter, als diese Karte reicht — ' +
        'und kam Jahrhunderte später als Rückübersetzung nach Europa zurück. ' +
        'Davon handelt das Kapitel über Avicenna und die arabische Medizin.',
    },
  ],

  beschriftungen: [
    schrift('Ägäisches Meer', 'meer', 25.3, 38.45),
    schrift('Mittelmeer', 'meer', 24.5, 33.6),
    schrift('Ionisches Meer', 'meer', 18.7, 37.4),
    schrift('Adria', 'meer', 16.6, 42.0, -40),
    schrift('Schwarzes Meer', 'meer', 32.5, 42.4),
    schrift('Rotes Meer', 'meer', 35.6, 26.3, -62),
    schrift('Nil', 'meer', 31.9, 27.6, -80),
    schrift('Griechenland', 'land', 21.6, 39.7),
    schrift('Kleinasien', 'land', 32.5, 38.9),
    schrift('Ägypten', 'land', 30.2, 26.6),
    schrift('Kreta', 'land', 24.9, 35.15),
    schrift('Zypern', 'land', 33.3, 35.02),
    schrift('Italien', 'land', 14.2, 41.7),
    schrift('Sizilien', 'land', 14.0, 37.5),
    schrift('Syrien', 'land', 37.0, 34.6),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
