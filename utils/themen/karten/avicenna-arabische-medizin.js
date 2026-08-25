// Karte zu „Avicenna und die arabische Medizin" — von Toledo bis Buchara.
//
// Wie in den Kapiteln 1 bis 4 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-avicenna-arabische-medizin.mjs
// nach.
//
// Was die Karte zeigen soll: einen Weg, keinen Ort. Dieses Kapitel handelt
// von Büchern, die wandern — aus Alexandria und den syrischen Klöstern nach
// Bagdad, wo sie ins Arabische übersetzt werden; von dort nach Osten in die
// Städte Persiens und Chorasans, wo aus dem übersetzten Wissen ein geordnetes
// System wird; und schließlich nach Westen über Kairouan, Cordoba und Toledo
// zurück nach Europa. Deshalb ist der Ausschnitt breiter als bei den
// bisherigen Karten des Buches: Spanien und Buchara müssen beide zu sehen
// sein, sonst zeigt die Karte den Bogen nicht.
//
// Aufbau der Landmassen: zwei große Ringe. „Eurasien" (Iberien, das nördliche
// Mittelmeer, Anatolien, die Levante, Arabien, Persien bis an den Indus)
// läuft im Norden und im Osten bewusst über den Bildrand hinaus — die
// SVG-Fläche schneidet den Überstand ab. „Afrika" reicht vom Atlantik vor
// Marokko über die Sahara bis an das Rote Meer und teilt sich mit Eurasien
// keine Linie: Zwischen beiden bleibt das Mittelmeer eine Lücke. Schwarzes
// Meer und Kaspisches Meer liegen als eigene Wasserflächen über der
// Landmasse. Die Inseln — Sizilien, Sardinien, Korsika, Mallorca, Kreta und
// Zypern — sind eigene Ringe.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von der portugiesischen Atlantikküste bis über
 * Buchara hinaus, vom Sudan und dem südlichen Arabien bis an die Alpen und
 * das Nordufer des Schwarzen Meeres.
 */
const RAHMEN = {
  minLon: -10,
  maxLon: 68,
  minLat: 15,
  maxLat: 45,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 4, damit alle Karten des
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

/** Ein Binnenmeer, das über der Landmasse liegt (Schwarzes, Kaspisches Meer). */
function wasser(orte) {
  return {
    art: 'wasser',
    d: P.pfad(orte),
    fill: KARTENFARBEN.meer,
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

/** Gibraltar → Algarve → Lissabon → Galicien → Biskaya → aus dem Rahmen. */
const IBERIEN_ATLANTIK = [
  [-5.6, 36.0], [-6.3, 36.6], [-6.9, 37.2], [-7.9, 37.1], [-8.9, 37.0],
  [-8.8, 38.0], [-9.5, 38.7], [-9.4, 39.4], [-8.9, 40.2], [-8.7, 41.1],
  [-8.9, 41.9], [-9.3, 42.6], [-9.3, 43.1], [-8.4, 43.4], [-7.0, 43.6],
  [-5.6, 43.6], [-4.0, 43.5], [-2.9, 43.5], [-1.8, 43.4], [-1.4, 44.2],
  [-1.2, 45.3], [-1.1, 46.2],
];

/** Der Nordrand liegt bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const NORDRAND = [
  [-1.5, 47.5], [4.0, 48.5], [12.0, 49.0], [22.0, 48.5], [32.0, 48.0],
  [42.0, 47.5], [52.0, 47.0], [62.0, 47.0], [71.0, 46.5],
];

/** Der Ostrand ebenso: senkrecht hinunter bis an die Küste Belutschistans. */
const OSTRAND = [
  [71.5, 44.0], [71.5, 36.0], [71.0, 29.0], [70.0, 25.8],
];

/** Indusmündung → Makran → Straße von Hormus. */
const MAKRAN = [
  [67.5, 24.0], [66.7, 25.0], [64.5, 25.2], [62.3, 25.1], [60.6, 25.3],
  [57.8, 25.6], [57.0, 26.6], [56.3, 27.1],
];

/** Der Persische Golf als tiefe Bucht: Iran → Schatt al-Arab → Arabien. */
const PERSISCHER_GOLF = [
  [54.9, 26.6], [53.0, 27.3], [51.5, 28.2], [50.8, 28.9], [49.6, 29.7],
  [48.6, 30.2], [48.2, 29.9], [48.0, 29.4], [49.0, 28.3], [50.1, 26.7],
  [50.5, 26.2], [51.0, 26.1], [51.6, 26.2], [51.5, 25.0], [52.6, 24.3],
  [54.4, 24.4], [55.5, 25.6], [56.4, 26.2],
];

/** Oman → Hadramaut → Aden → Bab al-Mandab (der Süden liegt außerhalb). */
const ARABIEN_SUED = [
  [56.6, 25.0], [58.0, 23.6], [59.8, 22.5], [59.3, 21.5], [58.0, 20.2],
  [57.0, 18.9], [55.0, 17.5], [53.0, 16.9], [52.2, 15.7], [50.0, 14.6],
  [48.0, 14.0], [45.6, 13.1], [45.0, 12.8], [44.0, 12.7], [43.4, 12.6],
];

/** Rotes Meer, Ostufer → Golf von Akaba → Sinai → Golf von Suez. */
const ROTES_MEER_OST = [
  [43.0, 13.5], [42.6, 16.9], [41.1, 19.1], [39.2, 21.5], [38.06, 24.09],
  [37.3, 25.1], [36.45, 26.24], [35.7, 27.35], [34.95, 29.35], [34.5, 28.5],
  [34.3, 27.85], [33.2, 28.7], [32.9, 29.4], [32.55, 29.97],
];

/** Isthmus von Suez → Gaza → Levante → Golf von Iskenderun. */
const LEVANTE = [
  [32.32, 31.25], [33.8, 31.13], [34.25, 31.28], [34.45, 31.5], [34.99, 32.82],
  [35.2, 33.27], [35.5, 33.9], [35.84, 34.44], [35.87, 34.9], [35.78, 35.53],
  [35.93, 36.09], [36.17, 36.58],
];

/** Kilikien → Pamphylien → Lykien → Ionien → Dardanellen. */
const ANATOLIEN_SUED_WEST = [
  [35.79, 36.77], [35.38, 36.56], [34.64, 36.8], [33.93, 36.38], [32.83, 36.02],
  [32.0, 36.54], [31.39, 36.77], [30.7, 36.88], [30.42, 36.19], [29.64, 36.2],
  [29.1, 36.62], [28.27, 36.8], [27.43, 37.03], [27.26, 37.86], [26.79, 38.19],
  [27.14, 38.42], [26.75, 38.67], [26.7, 39.31], [26.34, 39.49], [26.19, 40.03],
  [26.4, 40.35],
];

/** Thrakien → Ägäisküste → Peloponnes → Albanien → Dalmatien → Triest. */
const GRIECHENLAND_ADRIA = [
  [26.0, 40.7], [25.1, 40.98], [24.4, 40.94], [23.65, 40.3], [23.4, 39.96],
  [22.85, 40.48], [22.6, 40.05], [23.2, 39.6], [22.94, 39.36], [22.55, 38.85],
  [23.6, 38.46], [24.0, 38.17], [23.9, 37.85], [23.54, 38.02], [23.02, 37.9],
  [22.8, 37.57], [22.48, 36.39], [22.11, 37.03], [21.7, 36.8], [21.67, 37.25],
  [21.13, 37.93], [21.83, 38.39], [21.15, 38.35], [20.75, 38.95], [20.27, 39.5],
  [19.45, 41.32], [19.09, 42.09], [18.09, 42.65], [16.44, 43.51], [15.23, 44.12],
  [14.5, 45.2], [13.63, 45.1], [13.77, 45.65],
];

/** Der Stiefel: Po-Delta → Gargano → Absatz → Spitze → Golf von Neapel → Genua. */
const ITALIEN = [
  [12.33, 45.44], [12.5, 44.85], [12.2, 44.42], [13.51, 43.62], [13.95, 42.75],
  [14.4, 42.35], [14.99, 42.0], [15.9, 41.63], [16.18, 41.9], [16.87, 41.13],
  [17.94, 40.63], [18.5, 40.15], [18.35, 39.79], [17.23, 40.47], [16.5, 39.72],
  [17.13, 39.08], [16.57, 38.3], [15.63, 38.1], [15.85, 38.67], [16.05, 39.36],
  [15.28, 40.02], [14.75, 40.68], [14.05, 40.83], [13.55, 41.22], [12.63, 41.45],
  [11.8, 42.1], [10.7, 42.95], [9.85, 44.07], [8.4, 44.2], [7.3, 43.7],
];

/** Golfe du Lion → Katalonien → Levante → Andalusien, zurück nach Gibraltar. */
const MITTELMEER_NORDWEST = [
  [6.1, 43.1], [5.3, 43.3], [4.8, 43.4], [3.7, 43.4], [3.0, 42.6],
  [2.2, 41.4], [1.2, 41.1], [0.9, 40.7], [0.2, 39.9], [-0.3, 39.5],
  [-0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.4, 37.4], [-2.5, 36.8],
  [-3.5, 36.7], [-4.4, 36.7], [-5.3, 36.2],
];

/** Der eurasische Ring: Iberien, Italien, der Balkan, Anatolien, die Levante,
 *  Arabien, Persien — ein einziger Zug. */
const EURASIEN = verbinde(
  IBERIEN_ATLANTIK,
  NORDRAND,
  OSTRAND,
  MAKRAN,
  PERSISCHER_GOLF,
  ARABIEN_SUED,
  ROTES_MEER_OST,
  LEVANTE,
  ANATOLIEN_SUED_WEST,
  GRIECHENLAND_ADRIA,
  ITALIEN,
  MITTELMEER_NORDWEST,
);

/** Tanger → marokkanische Atlantikküste → Westsahara → aus dem Rahmen. */
const AFRIKA_ATLANTIK = [
  [-5.8, 35.8], [-6.2, 35.2], [-6.9, 34.0], [-7.6, 33.6], [-9.2, 32.3],
  [-9.8, 31.5], [-9.6, 30.4], [-11.1, 28.4], [-12.9, 27.9], [-15.9, 23.7],
  [-17.0, 21.0], [-16.0, 18.1], [-17.5, 14.7], [-16.0, 12.0],
];

/** Der Südrand liegt außerhalb des Rahmens — die Fläche läuft aus. */
const AFRIKA_SUEDRAND = [
  [-5.0, 9.0], [10.0, 8.0], [25.0, 8.0], [35.0, 10.0], [39.0, 13.0],
];

/** Rotes Meer, Westufer: Eritrea → Sudan → Oberägypten → Golf von Suez. */
const ROTES_MEER_WEST = [
  [39.5, 15.6], [38.5, 17.5], [37.2, 19.6], [37.0, 21.0], [36.5, 22.0],
  [35.48, 23.9], [34.9, 25.07], [34.28, 26.1], [33.8, 27.24], [33.1, 28.35],
  [32.55, 29.97], [32.32, 31.25],
];

/** Nildelta → Kyrenaika → Große Syrte → Tripolitanien → Tunesien → Tanger. */
const AFRIKA_MITTELMEER = [
  [31.85, 31.52], [31.5, 31.5], [30.9, 31.58], [30.4, 31.48], [29.9, 31.2],
  [28.95, 30.83], [27.24, 31.35], [25.15, 31.55], [25.1, 31.76], [23.95, 32.08],
  [22.63, 32.76], [21.97, 32.9], [20.95, 32.72], [20.07, 32.12], [19.2, 30.75],
  [18.5, 30.4], [16.6, 31.2], [15.09, 32.38], [13.2, 32.9], [12.1, 32.9],
  [11.5, 33.2], [11.1, 33.5], [10.1, 33.88], [10.76, 34.72], [10.64, 35.83],
  [10.3, 37.05], [9.8, 37.2], [7.8, 36.9], [5.1, 36.8], [3.1, 36.8],
  [-0.6, 35.7], [-3.0, 35.3], [-5.3, 35.9],
];

/** Der afrikanische Ring: Maghreb, Sahara, Ägypten, Rotes Meer. */
const AFRIKA = verbinde(
  AFRIKA_ATLANTIK,
  AFRIKA_SUEDRAND,
  ROTES_MEER_WEST,
  AFRIKA_MITTELMEER,
);

// ---------------------------------------------------------------------------
// Die Inseln. Sizilien und Kreta liegen auf dem Weg der Bücher nach Westen —
// über Sizilien kam ein Teil des Wissens nach Salerno.
// ---------------------------------------------------------------------------

/** Sizilien. */
const SIZILIEN = [
  [15.55, 38.3], [15.29, 37.85], [15.09, 37.5], [15.29, 37.07], [15.14, 36.69],
  [14.5, 36.79], [14.25, 37.02], [13.58, 37.26], [12.9, 37.57], [12.43, 37.8],
  [12.51, 38.02], [13.36, 38.18], [14.02, 38.02], [15.0, 38.02],
];

/** Sardinien. */
const SARDINIEN = [
  [8.2, 41.1], [9.2, 41.2], [9.7, 40.5], [9.6, 39.3], [9.1, 39.2],
  [8.4, 38.9], [8.4, 39.9], [8.2, 40.6],
];

/** Korsika. */
const KORSIKA = [
  [9.4, 43.0], [9.5, 42.1], [9.2, 41.4], [8.6, 42.0], [8.7, 42.6],
];

/** Mallorca — die größte der Balearen. */
const MALLORCA = [
  [2.4, 39.6], [2.75, 39.85], [3.15, 39.95], [3.45, 39.75], [3.2, 39.3],
  [2.75, 39.35],
];

/** Kreta. */
const KRETA = [
  [23.52, 35.53], [24.15, 35.62], [24.8, 35.43], [25.75, 35.35], [26.32, 35.32],
  [26.28, 35.17], [25.74, 35.01], [25.1, 34.93], [24.75, 34.98], [24.1, 35.15],
  [23.55, 35.35],
];

/** Zypern. */
const ZYPERN = [
  [32.27, 35.09], [33.32, 35.34], [34.0, 35.42], [34.6, 35.69], [34.4, 35.5],
  [33.94, 35.12], [33.63, 34.92], [33.04, 34.67], [32.42, 34.75], [32.3, 34.95],
];

// ---------------------------------------------------------------------------
// Die Binnenmeere — sie liegen über der Landmasse und schneiden sie aus.
// ---------------------------------------------------------------------------

/** Das Schwarze Meer — ringsum von Land umschlossen. */
const SCHWARZES_MEER = [
  [29.0, 41.2], [31.0, 41.2], [33.5, 42.0], [35.2, 42.0], [36.3, 41.3],
  [38.4, 41.0], [39.7, 41.0], [41.7, 41.6], [41.0, 43.0], [39.7, 43.6],
  [37.8, 44.7], [36.6, 45.3], [35.4, 45.0], [34.2, 44.4], [33.4, 44.4],
  [32.5, 45.4], [31.6, 46.5], [30.7, 46.5], [29.7, 45.3], [28.7, 44.2],
  [27.9, 43.2], [27.5, 42.5], [28.0, 41.9],
];

/** Das Kaspische Meer — der größte Binnensee der Erde. */
const KASPISCHES_MEER = [
  [47.5, 45.8], [49.3, 44.6], [51.2, 44.6], [50.3, 43.5], [51.5, 42.7],
  [53.0, 41.5], [53.9, 40.0], [53.5, 38.5], [53.8, 37.4], [52.0, 36.8],
  [50.0, 37.0], [49.0, 37.6], [48.9, 38.5], [49.5, 39.5], [49.9, 40.4],
  [48.9, 41.3], [48.3, 41.8], [47.6, 42.9], [47.4, 43.8], [47.9, 44.9],
];

// ---------------------------------------------------------------------------
// Wüsten und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Sahara und arabische Wüste — nur Farbe, keine Aussage über Grenzen. */
const SAHARA = [
  [-9.0, 29.0], [0.0, 30.0], [10.0, 30.0], [20.0, 29.0], [29.0, 27.5],
  [32.0, 24.0], [30.0, 20.0], [22.0, 18.0], [10.0, 17.0], [0.0, 18.0],
  [-8.0, 22.0],
];
const ARABISCHE_WUESTE = [
  [37.0, 30.0], [43.0, 31.0], [48.0, 27.5], [55.0, 23.0], [52.0, 18.0],
  [45.0, 17.5], [40.0, 21.0], [37.5, 26.0],
];

/** Der Nil — vom Delta bis über den ersten Katarakt hinaus. */
const NIL = [
  [30.4, 31.45], [31.24, 30.05], [31.18, 27.18], [32.1, 26.3], [32.64, 25.7],
  [32.9, 24.09], [31.3, 21.9], [31.0, 19.8], [32.5, 18.5], [33.9, 17.9],
];

/** Der Euphrat — an ihm liegt das Bagdad der Kalifen. */
const EUPHRAT = [
  [38.0, 38.5], [37.9, 37.0], [39.0, 35.9], [40.1, 35.3], [42.8, 33.6],
  [44.4, 32.5], [46.5, 31.3], [47.6, 30.5], [48.5, 30.0],
];

/** Der Tigris — Bagdad steht an seinem Ufer. */
const TIGRIS = [
  [40.2, 37.9], [43.1, 36.3], [44.4, 33.3], [45.8, 32.5], [47.2, 31.8],
  [47.6, 31.0], [48.5, 30.0],
];

/** Der Oxus (Amu Darja) — der Fluss der Heimat Avicennas. */
const AMU_DARJA = [
  [68.3, 37.2], [66.5, 37.2], [64.5, 38.9], [62.2, 40.1], [61.4, 41.3],
  [60.2, 42.5], [59.3, 44.5],
];

/** Der Tejo — er fließt an Toledo vorbei bis zum Atlantik. */
const TEJO = [
  [-9.2, 38.7], [-8.0, 39.0], [-6.5, 39.6], [-5.0, 39.8], [-4.03, 39.86],
  [-3.0, 40.1], [-1.9, 40.5],
];

/** Der Guadalquivir — an ihm liegt Cordoba. */
const GUADALQUIVIR = [
  [-6.35, 36.8], [-6.05, 37.35], [-5.5, 37.5], [-4.78, 37.89], [-3.8, 38.05],
  [-3.0, 38.2],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  eurasien: EURASIEN,
  afrika: AFRIKA,
  sizilien: SIZILIEN,
  sardinien: SARDINIEN,
  korsika: KORSIKA,
  mallorca: MALLORCA,
  kreta: KRETA,
  zypern: ZYPERN,
  schwarzesMeer: SCHWARZES_MEER,
  kaspischesMeer: KASPISCHES_MEER,
  iberienAtlantik: IBERIEN_ATLANTIK,
  levante: LEVANTE,
  persischerGolf: PERSISCHER_GOLF,
  afrikaMittelmeer: AFRIKA_MITTELMEER,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [
  EURASIEN,
  AFRIKA,
  SIZILIEN,
  SARDINIEN,
  KORSIKA,
  MALLORCA,
  KRETA,
  ZYPERN,
];

// ---------------------------------------------------------------------------
// Die Phasen: vierhundert Jahre, in denen ein Buch von Bagdad bis Toledo
// wandert — und dabei die Sprache wechselt.
// ---------------------------------------------------------------------------

/** Phase 1 — die Übersetzungsbewegung: das Reich der Abbasiden um 830. */
const KALIFAT_ABBASIDEN = [
  [-2.0, 37.0], [10.0, 34.0], [25.0, 31.0], [33.0, 36.0], [40.0, 38.0],
  [48.0, 39.0], [58.0, 38.0], [66.0, 40.0], [67.0, 36.0], [60.0, 30.0],
  [55.0, 25.0], [48.0, 20.0], [42.0, 16.0], [35.0, 22.0], [28.0, 26.0],
  [15.0, 30.0], [2.0, 33.0],
];
const BAGDAD_ZWEISTROMLAND = [
  [40.5, 36.5], [43.5, 36.8], [46.5, 35.0], [48.5, 30.2], [47.5, 30.0],
  [44.5, 32.5], [41.5, 34.5], [39.5, 36.2],
];
const GUNDISCHAPUR = [
  [47.5, 33.0], [50.5, 33.0], [51.0, 30.5], [48.0, 30.3],
];
const SYRISCHE_SCHULEN = [
  [35.8, 36.9], [37.4, 36.9], [37.6, 35.5], [35.8, 35.5],
];

/** Phase 2 — Persien und Chorasan: wo der Kanon entsteht. */
const CHORASAN = [
  [57.0, 41.0], [62.0, 41.5], [66.5, 40.5], [66.0, 36.5], [60.5, 35.5],
  [56.5, 37.5],
];
const PERSIEN_KERN = [
  [46.0, 38.0], [52.0, 37.0], [56.0, 35.0], [55.0, 30.0], [50.0, 29.0],
  [46.5, 33.0],
];

/** Phase 3 — die Blüte im Westen und in Ägypten. */
const AL_ANDALUS = [
  [-9.0, 38.5], [-5.0, 39.5], [-1.0, 39.0], [-0.5, 37.0], [-4.0, 36.2],
  [-7.5, 37.0],
];
const IFRIQIYA = [
  [8.0, 36.8], [11.0, 36.5], [11.0, 34.0], [8.5, 34.5],
];
const AEGYPTEN_KAIRO = [
  [29.8, 31.3], [31.9, 31.4], [32.4, 30.2], [31.5, 27.5], [30.8, 27.8],
  [30.2, 30.3],
];

/** Phase 4 — Toledo und die Wege nach Europa. */
const TOLEDO_UMLAND = [
  [-5.5, 40.5], [-3.0, 40.6], [-2.5, 39.3], [-5.0, 39.2],
];
const SIZILIEN_SALERNO = [
  [13.0, 41.2], [15.5, 41.0], [15.5, 37.0], [12.5, 37.5],
];
const WEG_NACH_NORDEN = [
  [0.0, 43.0], [5.0, 44.0], [9.0, 44.5], [9.0, 43.0], [3.0, 42.0],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(EURASIEN),
    land(AFRIKA),
    land(SIZILIEN),
    land(SARDINIEN),
    land(KORSIKA),
    land(MALLORCA),
    land(KRETA),
    land(ZYPERN),
    wueste(SAHARA),
    wueste(ARABISCHE_WUESTE),
    wasser(SCHWARZES_MEER),
    wasser(KASPISCHES_MEER),
    fluss(NIL),
    fluss(EUPHRAT),
    fluss(TIGRIS),
    fluss(AMU_DARJA),
    fluss(TEJO),
    fluss(GUADALQUIVIR),
  ],

  phasen: [
    {
      id: 'haus-der-weisheit',
      label: '~830: das Haus der Weisheit in Bagdad',
      hinweis:
        'Die Kalifen von Bagdad lassen zusammentragen, was die Griechen, die ' +
        'Perser und die Inder über Heilkunde, Sternkunde und Rechnen ' +
        'geschrieben haben. Übersetzer wie Hunain ibn Ishaq holen die ' +
        'Handschriften aus Byzanz und aus den syrischen Klöstern, vergleichen ' +
        'mehrere Fassungen und übertragen sie ins Arabische — und erfinden ' +
        'dabei die arabischen Fachwörter gleich mit. Papier, aus China ' +
        'übernommen, macht Bücher erstmals bezahlbar.',
      flaechen: [
        { titel: 'Das Reich der Abbasiden um 830', d: P.pfad(KALIFAT_ABBASIDEN) },
        { titel: 'Bagdad und das Zweistromland', d: P.pfad(BAGDAD_ZWEISTROMLAND) },
        { titel: 'Gundischapur — die alte Ärzteschule Persiens', d: P.pfad(GUNDISCHAPUR) },
        { titel: 'Antiochia und die syrischen Klosterschulen', d: P.pfad(SYRISCHE_SCHULEN) },
      ],
    },
    {
      id: 'der-kanon',
      label: '~1020: Avicennas Kanon entsteht in Persien',
      hinweis:
        'Ibn Sina, in Europa Avicenna genannt, wird 980 bei Buchara geboren ' +
        'und zieht als Arzt und Minister von Hof zu Hof: Buchara, Gurgandsch, ' +
        'Rey, Hamadan, Isfahan. Unterwegs schreibt er den „Kanon der Medizin" ' +
        '— fünf Bücher, die das ganze bekannte Wissen ordnen, von den ' +
        'Grundlagen über rund 800 Einzelmittel bis zu den Krankheiten vom Kopf ' +
        'bis zum Fuß. 1037 stirbt er in Hamadan.',
      flaechen: [
        { titel: 'Chorasan und Transoxanien — die Heimat Ibn Sinas', d: P.pfad(CHORASAN) },
        { titel: 'Persien: Rey, Hamadan, Isfahan', d: P.pfad(PERSIEN_KERN) },
      ],
    },
    {
      id: 'bluete-im-westen',
      label: '~1000–1100: Cordoba, Kairouan und Kairo',
      hinweis:
        'Das Wissen wandert weiter nach Westen. In Cordoba schreibt az-Zahrawi ' +
        'ein chirurgisches Lehrbuch mit gezeichneten Instrumenten, das in ' +
        'Europa Jahrhunderte lang benutzt wird. In Kairouan sammelt Constantinus ' +
        'Africanus später die Bücher, die er nach Salerno mitnimmt. In Kairo ' +
        'und Damaskus stehen Krankenhäuser mit Abteilungen, Apotheke und ' +
        'Unterricht — für jeden, der kommt.',
      flaechen: [
        { titel: 'Al-Andalus mit Cordoba und Toledo', d: P.pfad(AL_ANDALUS) },
        { titel: 'Ifriqiya mit Kairouan', d: P.pfad(IFRIQIYA) },
        { titel: 'Ägypten mit Kairo', d: P.pfad(AEGYPTEN_KAIRO) },
      ],
    },
    {
      id: 'toledo-uebersetzt',
      label: '~1150–1187: Toledo übersetzt für Europa',
      hinweis:
        'In Toledo, 1085 christlich geworden, arbeiten arabische, jüdische und ' +
        'christliche Gelehrte nebeneinander an denselben Handschriften. Gerhard ' +
        'von Cremona überträgt hier den Kanon ins Lateinische; er stirbt 1187 ' +
        'in Toledo. Von dort geht das Buch nach Montpellier, Paris, Bologna und ' +
        'Padua — und bleibt rund 600 Jahre das Lehrbuch der europäischen ' +
        'Universitäten.',
      flaechen: [
        { titel: 'Toledo und die Übersetzerschule', d: P.pfad(TOLEDO_UMLAND) },
        { titel: 'Über Sizilien nach Salerno', d: P.pfad(SIZILIEN_SALERNO) },
        { titel: 'Der Weg in die Hörsäle Europas', d: P.pfad(WEG_NACH_NORDEN) },
      ],
    },
  ],

  punkte: [
    {
      id: 'bagdad',
      name: 'Bagdad',
      typ: 'stadt',
      ...ort(44.36, 33.31),
      text:
        '762 als Rundstadt am Tigris gegründet, um 800 vermutlich die größte ' +
        'Stadt der Welt. Hier stand das „Haus der Weisheit", eine Mischung aus ' +
        'Bibliothek, Übersetzerwerkstatt und Akademie. Der berühmteste ' +
        'Übersetzer, der christliche Arzt Hunain ibn Ishaq (809–873), reiste ' +
        'für Handschriften bis nach Byzanz, verglich mehrere Fassungen ' +
        'miteinander und übersetzte sinngemäß statt Wort für Wort. Er und sein ' +
        'Kreis übertrugen fast das gesamte Werk Galens ins Arabische. Was in ' +
        'Bagdad nicht übersetzt wurde, ist an vielen Stellen für immer verloren.',
    },
    {
      id: 'buchara',
      name: 'Buchara',
      typ: 'stadt',
      ...ort(64.42, 39.77),
      text:
        'In Afschana bei Buchara wurde Ibn Sina um 980 geboren. Die Stadt war ' +
        'Hauptstadt der Samaniden und besaß eine Bibliothek, die er als ' +
        'Siebzehnjähriger benutzen durfte, nachdem er den Fürsten geheilt ' +
        'hatte. Er beschrieb später, wie er Aristoteles vierzigmal las, ohne ' +
        'ihn zu verstehen — bis ihm ein gekaufter Kommentar die Tür öffnete. ' +
        'Mit achtzehn galt er als fertiger Arzt. Als die Bibliothek abbrannte, ' +
        'sagten Neider, er habe sie selbst angezündet, um der Einzige zu sein, ' +
        'der ihren Inhalt kannte.',
    },
    {
      id: 'hamadan',
      name: 'Hamadan',
      typ: 'ereignis',
      ...ort(48.51, 34.8),
      text:
        'Hier war Ibn Sina Leibarzt und zeitweise Wesir eines Fürsten — und ' +
        'hier saß er im Gefängnis, als die Politik sich gegen ihn wandte. ' +
        'Teile seines Werkes schrieb er nachts, zwischen Staatsgeschäften und ' +
        'Flucht. 1037 starb er in Hamadan, wohl an einer Darmkrankheit, die er ' +
        'selbst zu behandeln versuchte. Sein Grab ist bis heute dort zu sehen. ' +
        'Sein Nachruf auf sich selbst war nüchtern: Er habe die Wissenschaft ' +
        'nicht vollendet, sondern geordnet.',
    },
    {
      id: 'damaskus',
      name: 'Damaskus',
      typ: 'stadt',
      ...ort(36.29, 33.51),
      text:
        'In Damaskus stand mit dem Bimaristan an-Nuri (1154) eines der ' +
        'berühmtesten Krankenhäuser der islamischen Welt: getrennte ' +
        'Abteilungen, eine Apotheke, Ärzte im Dienst, Unterricht am ' +
        'Krankenbett und Aufnahme ohne Ansehen von Glauben oder Vermögen, ' +
        'bezahlt aus frommen Stiftungen. Hier arbeitete auch Ibn an-Nafis, ' +
        'bevor er nach Kairo ging. Krankenhäuser dieser Art gab es in Bagdad, ' +
        'Kairo, Cordoba und Marrakesch — Europa kannte damals vor allem ' +
        'Klosterhospize.',
    },
    {
      id: 'kairo',
      name: 'Kairo',
      typ: 'stadt',
      ...ort(31.24, 30.05),
      text:
        'Im Krankenhaus von Kairo arbeitete Ibn an-Nafis (um 1213–1288). Er ' +
        'las bei Galen, das Blut sickere durch unsichtbare Poren in der ' +
        'Scheidewand des Herzens von der rechten in die linke Kammer — und ' +
        'schrieb dagegen: Diese Scheidewand ist dicht. Das Blut muss den Weg ' +
        'über die Lunge nehmen. Das ist der kleine Kreislauf, rund 400 Jahre ' +
        'vor William Harvey. Seine Schrift blieb unbeachtet und wurde erst ' +
        '1924 in Berlin wiederentdeckt.',
    },
    {
      id: 'cordoba',
      name: 'Cordoba',
      typ: 'stadt',
      ...ort(-4.78, 37.89),
      text:
        'Die Hauptstadt von al-Andalus, im 10. Jahrhundert eine der größten ' +
        'Städte Europas, mit Bibliotheken, Straßenbeleuchtung und einer ' +
        'Ärzteschaft von Rang. Hier wirkte az-Zahrawi (um 936–1013), den ' +
        'Europa Abulcasis nannte: Sein dreißigbändiges Werk „at-Tasrif" endet ' +
        'mit einem chirurgischen Teil, in dem er rund 200 Instrumente ' +
        'zeichnete und beschrieb — Skalpelle, Zangen, Haken, das Ausbrennen ' +
        'von Wunden, Naht mit Katgut. In Europa wurde dieser Teil bis ins ' +
        '18. Jahrhundert nachgedruckt.',
    },
    {
      id: 'toledo',
      name: 'Toledo',
      typ: 'stadt',
      ...ort(-4.03, 39.86),
      text:
        'Die Stadt am Tejo fiel 1085 an Kastilien — mitsamt ihren arabischen ' +
        'Bibliotheken. Hier entstand im 12. Jahrhundert die berühmteste ' +
        'Übersetzerwerkstatt des Mittelalters: Arabisch sprechende Christen, ' +
        'jüdische Gelehrte und zugereiste Lateiner arbeiteten oft zu zweit, ' +
        'einer las laut in der Volkssprache vor, der andere schrieb Latein. ' +
        'Gerhard von Cremona übersetzte hier über siebzig Werke, darunter ' +
        'Avicennas Kanon. Über Toledo kam die Antike nach Europa zurück — auf ' +
        'dem Umweg über zwei fremde Sprachen.',
    },
  ],

  bewegungen: [
    {
      id: 'buecher-nach-bagdad',
      name: 'Die Bücher kommen nach Bagdad',
      von: station(29.9, 31.2),
      ueber: [station(36.17, 36.58), station(40.5, 35.0)],
      nach: station(44.36, 33.31),
      text:
        'Was in Alexandria gesammelt und in den syrischen Klöstern ins ' +
        'Syrische übersetzt worden war, wanderte im 8. und 9. Jahrhundert ' +
        'nach Bagdad. Übersetzer reisten den Handschriften hinterher — Hunain ' +
        'ibn Ishaq suchte für eine einzige Schrift Galens in ganz ' +
        'Mesopotamien, Syrien, Palästina und Ägypten nach Abschriften und fand ' +
        'schließlich in Damaskus die Hälfte davon.',
    },
    {
      id: 'wissen-nach-osten',
      name: 'Nach Osten: aus dem übersetzten Wissen wird ein System',
      von: station(44.36, 33.31),
      ueber: [station(51.4, 35.7), station(60.0, 38.5)],
      nach: station(64.42, 39.77),
      text:
        'Die arabischen Übersetzungen erreichten die Städte Persiens und ' +
        'Chorasans, wo eigene Bibliotheken, Krankenhäuser und Ärzteschulen ' +
        'entstanden. In Rey wirkte ar-Razi, in Buchara wuchs Ibn Sina auf. ' +
        'Hier wurde aus gesammeltem Wissen ein geordnetes Lehrgebäude — der ' +
        'Kanon der Medizin.',
    },
    {
      id: 'kanon-nach-toledo',
      name: 'Der Kanon wandert nach Westen',
      von: station(64.42, 39.77),
      ueber: [station(44.36, 33.31), station(10.1, 35.68), station(-4.78, 37.89)],
      nach: station(-4.03, 39.86),
      text:
        'Vom Osten Persiens über Bagdad, Kairouan und Cordoba kam der Kanon ' +
        'nach Toledo. Dort übersetzte ihn Gerhard von Cremona ins Lateinische. ' +
        'Von Toledo aus ging das Buch in die Hörsäle von Montpellier, Bologna ' +
        'und Padua — und blieb dort rund 600 Jahre lang das Lehrbuch. Der Weg ' +
        'des Wissens beschreibt damit einen Kreis: von Griechenland nach ' +
        'Bagdad, von Bagdad zurück nach Europa.',
    },
  ],

  beschriftungen: [
    schrift('Mittelmeer', 'meer', 17.0, 34.5),
    schrift('Atlantik', 'meer', -8.5, 34.0),
    schrift('Schwarzes Meer', 'meer', 34.5, 43.3),
    schrift('Kaspisches Meer', 'meer', 51.0, 41.5, -70),
    schrift('Rotes Meer', 'meer', 37.5, 21.5, -55),
    schrift('Persischer Golf', 'meer', 51.5, 27.4, -40),
    schrift('Spanien', 'land', -4.0, 41.2),
    schrift('Nordafrika', 'land', 5.0, 31.5),
    schrift('Ägypten', 'land', 29.5, 26.5),
    schrift('Anatolien', 'land', 33.0, 39.0),
    schrift('Arabische Halbinsel', 'land', 45.0, 22.0),
    schrift('Persien', 'land', 55.0, 32.0),
    schrift('Chorasan', 'land', 61.5, 38.0),
    schrift('Nil', 'meer', 31.6, 28.0, -80),
    schrift('Euphrat', 'meer', 41.0, 34.6, -30),
    schrift('Tigris', 'meer', 43.6, 35.2, -40),
    schrift('Oxus', 'meer', 62.5, 40.5, -25),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
