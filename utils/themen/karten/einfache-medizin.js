// Karte zu „Die einfache Medizin" — die Welt der Lebensstil-Forschung.
//
// Wie in den Kapiteln 1 bis 17 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-einfache-medizin.mjs nach.
//
// Was die Karte zeigen soll: Die Orte, an denen erforscht wurde, wie die
// Lebensweise auf die Gesundheit wirkt, liegen über den ganzen Erdball
// verstreut — und sie haben nichts gemeinsam außer dem Ergebnis. Ein
// Vorort in Massachusetts (Framingham, ab 1948), sieben Länder von
// Finnland bis Japan (die Sieben-Länder-Studie, ab 1958), eine
// finnische Provinz mit der damals höchsten Herzinfarkt-Sterblichkeit der
// Welt (Nordkarelien, ab 1972) und fünf Landstriche, in denen auffällig
// viele Menschen sehr alt werden (die „blauen Zonen", ab 2004): Sardinien,
// Okinawa, Ikaria, Nicoya, Loma Linda.
//
// Deshalb dieser Ausschnitt: von der amerikanischen Pazifikküste bis nach
// Japan und Australien. Er ist der weiteste des ganzen Buches — und das
// hat einen Preis, der hier offen genannt wird: Bei rund zweieinhalb
// Bildpunkten je Längengrad ist diese Karte eine GROBE Übersicht, keine
// Seekarte. Buchten unter hundert Kilometern verschwinden, kleine Inseln
// sind nur angedeutet, Dänemarks Inseln, Sizilien und die Antillen sind
// zusammengefasst oder weggelassen. Die Prüfung arbeitet deshalb mit einer
// Toleranz von zwei Grad statt der sonst üblichen 0,8 Grad. Was die Karte
// leisten soll, ist nicht die genaue Küste, sondern die Aussage: Diese
// Orte liegen weit auseinander — und kamen trotzdem zum selben Ergebnis.
//
// Aufbau der Landmassen: Amerika als ein Ring (Nord- und Südamerika hängen
// über Mittelamerika zusammen), Eurasien als ein zweiter, Afrika als
// dritter (die Landbrücke bei Suez ist in diesem Maßstab schmaler als ein
// Bildpunkt und deshalb offen gelassen), dazu Australien, Neuguinea und
// die größeren Inseln. Schwarzes Meer und Kaspisches Meer liegen als
// Wasserflächen über der eurasischen Landmasse.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von der amerikanischen Pazifikküste (Loma Linda)
 * bis nach Japan (Okinawa) und Australien.
 */
const RAHMEN = {
  minLon: -130,
  maxLon: 155,
  minLat: -45,
  maxLat: 65,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 17, damit alle Karten
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
 * Ein Rechteck um einen Ort — die Phasen zeigen damit, wo geforscht wurde.
 *
 * In diesem Maßstab wäre ein Landstrich von der Größe Sardiniens sonst
 * kaum zu sehen; das Rechteck macht ihn anklickbar groß, ohne eine
 * Grenze zu behaupten, die es nicht gibt.
 */
function feld(lon, lat, breiteGrad, hoeheGrad) {
  const halbB = breiteGrad / 2;
  const halbH = hoeheGrad / 2;
  return [
    [lon - halbB, lat + halbH],
    [lon + halbB, lat + halbH],
    [lon + halbB, lat - halbH],
    [lon - halbB, lat - halbH],
  ];
}

// ---------------------------------------------------------------------------
// Amerika — ein Ring von der Beringstraße bis Feuerland und zurück.
// ---------------------------------------------------------------------------

/**
 * Die Pazifikküste von Nordamerika: Alaska (außerhalb des Rahmens) über
 * Britisch-Kolumbien, Kalifornien und die Halbinsel Niederkalifornien bis
 * an die mexikanische Westküste.
 */
const NORDAMERIKA_PAZIFIK = [
  [-133, 66], [-130.5, 56.5], [-128.0, 53.5], [-125.5, 50.5], [-124.7, 48.4],
  [-124.1, 46.2], [-124.4, 43.3], [-124.2, 40.4], [-122.5, 37.8],
  [-120.6, 34.6], [-118.2, 33.7], [-117.1, 32.5], [-116.6, 31.8],
  [-115.1, 27.9], [-112.1, 24.6], [-109.9, 22.9], [-110.3, 24.2],
  [-111.4, 26.0], [-112.3, 27.3], [-113.5, 29.0], [-114.7, 31.6],
  [-113.5, 31.3], [-110.9, 27.9], [-109.0, 25.6], [-106.4, 23.2],
  [-105.2, 20.6], [-104.3, 19.1], [-101.5, 17.5], [-99.9, 16.8],
  [-95.2, 16.2], [-92.3, 14.7], [-89.0, 13.2], [-87.7, 13.0],
  [-85.9, 11.2], [-85.8, 10.5], [-85.66, 9.9], [-85.2, 9.6],
  [-84.7, 9.55], [-84.16, 9.4], [-83.2, 8.6], [-82.4, 8.2],
  [-79.5, 8.9], [-78.2, 8.3], [-77.4, 6.2], [-77.1, 3.9], [-78.8, 1.8],
  [-80.05, 0.8], [-80.7, -1.0], [-80.9, -2.2], [-80.3, -3.4],
  [-81.3, -4.7], [-79.9, -6.8], [-79.1, -8.1], [-77.15, -12.05],
  [-76.2, -13.8], [-75.2, -15.4], [-72.7, -16.6], [-70.3, -18.5],
  [-70.15, -20.2], [-70.4, -23.6], [-70.8, -27.1], [-71.3, -29.95],
  [-71.6, -33.05], [-72.5, -35.3], [-73.05, -36.8], [-73.5, -39.8],
  [-72.9, -41.5], [-74.0, -43.5], [-74.7, -45.5], [-75.6, -48.0],
  [-75.0, -50.5], [-74.0, -52.5], [-71.5, -54.0], [-70.0, -54.9],
  [-68.5, -55.2], [-67.3, -55.9],
];

/**
 * Die Atlantikküste von Feuerland bis Labrador.
 *
 * Feuerland ist mit dem Festland verbunden gezeichnet: Die Magellanstraße
 * ist in diesem Maßstab schmaler als ein Bildpunkt.
 */
const AMERIKA_ATLANTIK = [
  [-65.2, -54.8], [-68.0, -52.5], [-68.5, -50.5], [-67.6, -46.0],
  [-65.7, -45.0], [-65.2, -42.8], [-64.0, -40.8], [-62.3, -38.8],
  [-57.5, -38.1], [-56.7, -36.4], [-58.4, -34.5], [-56.2, -34.9],
  [-53.4, -33.7], [-52.1, -32.0], [-49.7, -29.3], [-48.5, -27.6],
  [-48.5, -25.5], [-46.3, -24.0], [-43.2, -23.0], [-42.0, -22.9],
  [-40.3, -20.3], [-39.2, -17.7], [-39.0, -14.8], [-38.5, -13.0],
  [-37.0, -11.0], [-35.7, -9.7], [-34.9, -8.05], [-34.8, -7.1],
  [-35.2, -5.8], [-38.5, -3.7], [-41.8, -2.9], [-44.3, -2.5],
  [-48.5, -1.0], [-50.0, 0.0], [-51.6, 3.8], [-52.3, 4.9], [-55.2, 5.9],
  [-58.2, 6.8], [-60.8, 8.6], [-62.5, 10.6], [-64.2, 10.5], [-66.9, 10.6],
  [-68.0, 10.5], [-70.2, 11.9], [-71.6, 11.5], [-71.3, 12.4], [-72.9, 11.6],
  [-74.8, 11.0], [-75.6, 10.4], [-76.9, 8.7], [-77.4, 8.6], [-78.9, 9.3],
  [-80.5, 8.9], [-82.0, 9.3], [-83.0, 9.9], [-83.7, 12.0], [-83.2, 15.0],
  [-86.8, 15.8], [-87.9, 15.8], [-88.2, 17.5], [-87.8, 18.5], [-87.5, 20.2],
  [-86.8, 21.2], [-88.0, 21.6], [-90.3, 21.1], [-91.0, 19.8], [-92.0, 18.6],
  [-94.4, 18.15], [-96.1, 19.2], [-97.8, 22.3], [-97.5, 25.9], [-97.4, 27.8],
  [-94.8, 29.3], [-91.5, 29.2], [-89.2, 29.1], [-88.0, 30.3], [-87.2, 30.4],
  [-84.3, 29.9], [-82.7, 27.8], [-81.8, 25.9], [-80.2, 25.8], [-80.5, 28.5],
  [-81.4, 30.4], [-80.8, 32.0], [-79.9, 32.8], [-78.0, 33.9], [-75.5, 35.2],
  [-76.0, 36.9], [-75.0, 38.8], [-73.9, 40.6], [-70.0, 41.7], [-70.7, 42.7],
  [-70.2, 43.7], [-67.0, 44.7], [-65.9, 44.5], [-63.5, 44.7], [-60.0, 45.6],
  [-60.0, 47.0], [-61.0, 50.0], [-57.0, 52.5], [-55.7, 54.5], [-60.0, 57.5],
  [-64.0, 60.3], [-70.0, 62.0],
];

/** Der Nordrand: bewusst außerhalb des Rahmens geschlossen. */
const AMERIKA_NORDRAND = [
  [-78.0, 67.0], [-95.0, 68.0], [-115.0, 68.0], [-133.0, 67.0],
];

/** Der große Ring: Nord- und Südamerika. */
const AMERIKA = verbinde(
  NORDAMERIKA_PAZIFIK,
  AMERIKA_ATLANTIK,
  AMERIKA_NORDRAND,
);

// ---------------------------------------------------------------------------
// Eurasien — ein Ring von Gibraltar über Skandinavien, Ostasien, Indien,
// Arabien und das Mittelmeer zurück nach Gibraltar.
// ---------------------------------------------------------------------------

/** Iberien, Frankreich, die Nordsee — die europäische Atlantikküste. */
const EUROPA_ATLANTIK = [
  [-5.6, 36.0], [-6.9, 37.2], [-8.9, 37.0], [-9.4, 38.7], [-8.9, 41.9],
  [-8.9, 43.4], [-5.0, 43.6], [-1.8, 43.4], [-1.2, 45.0], [-1.1, 46.2],
  [-2.2, 47.3], [-4.7, 48.1], [-1.5, 48.6], [0.1, 49.5], [1.6, 50.9],
  [2.9, 51.2], [4.3, 51.9], [4.8, 53.0], [6.5, 53.4], [8.5, 53.6],
];

/**
 * Jütland und die westliche Ostsee.
 *
 * Die dänischen Inseln (Fünen, Seeland) sind weggelassen: Sie wären hier
 * kleiner als ein Bildpunkt. Die Ostsee bleibt dadurch offener, als sie
 * ist — das ist eine bewusste Vereinfachung, keine Behauptung.
 */
const JUETLAND_UND_OSTSEE = [
  [8.5, 54.5], [8.1, 55.5], [8.2, 57.5], [10.6, 57.6], [9.9, 54.9],
  [12.5, 54.4], [14.3, 54.0], [18.6, 54.4], [21.0, 55.3], [21.1, 56.1],
  [23.5, 57.0], [24.5, 59.5], [28.0, 59.4], [30.2, 59.9],
];

/** Finnland, der Bottnische Meerbusen und Schweden. */
const SKANDINAVIEN = [
  [27.0, 60.4], [25.0, 60.2], [22.2, 60.4], [21.5, 63.0], [24.5, 65.5],
  [21.5, 64.0], [17.5, 62.5], [18.1, 59.3], [16.4, 56.7], [13.8, 55.4],
  [11.9, 57.7], [10.7, 59.9], [7.0, 58.0], [5.3, 59.5], [5.3, 60.4],
  [6.0, 62.5], [10.0, 63.5], [13.0, 66.0],
];

/** Der Nordrand über Sibirien: bewusst außerhalb des Rahmens. */
const SIBIRIEN_NORDRAND = [
  [16.0, 69.0], [30.0, 72.0], [70.0, 75.0], [110.0, 76.0], [150.0, 72.0],
  [160.0, 68.0], [158.0, 60.0],
];

/** Das Ochotskische Meer, der Amur und die Küste bis Wladiwostok. */
const OSTASIEN_NORDKUESTE = [
  [153.0, 59.0], [150.8, 59.6], [145.0, 59.0], [142.0, 57.5], [138.5, 55.0],
  [141.2, 53.0], [140.5, 51.0], [140.4, 49.0], [139.5, 47.5], [138.5, 46.5],
  [137.0, 45.0], [132.5, 42.9],
];

/** Korea, das Gelbe Meer und die chinesische Küste bis Hongkong. */
const KOREA_UND_CHINA = [
  [129.5, 38.5], [129.4, 35.1], [126.5, 34.3], [126.4, 37.5], [124.4, 40.0],
  [121.5, 40.8], [117.7, 39.0], [119.0, 37.8], [120.4, 36.1], [119.0, 34.5],
  [121.8, 31.4], [121.5, 29.9], [120.7, 28.0], [119.3, 26.1], [118.0, 24.5],
  [114.2, 22.5], [110.5, 21.2], [108.5, 21.6],
];

/** Vietnam, der Golf von Thailand und die Halbinsel Malakka. */
const SUEDOSTASIEN = [
  [107.0, 20.9], [105.7, 18.7], [109.2, 13.8], [109.5, 11.5], [106.7, 10.3],
  [104.8, 8.6], [103.5, 10.4], [100.9, 13.5], [100.5, 12.0], [102.0, 6.5],
  [103.8, 1.4], [100.4, 5.4], [98.4, 8.0], [98.5, 11.0], [97.0, 16.0],
  [94.0, 18.0], [91.8, 22.3],
];

/** Indien: der Golf von Bengalen, Kap Komorin, die Malabarküste, Gujarat. */
const INDIEN = [
  [88.0, 21.6], [86.9, 20.9], [85.0, 19.5], [83.3, 18.0], [80.3, 13.1],
  [79.9, 10.3], [79.8, 9.3], [77.5, 8.1], [76.0, 9.9], [74.8, 13.0],
  [73.8, 15.5], [72.9, 19.1], [72.6, 21.5], [70.0, 20.9], [69.0, 22.4],
  [68.4, 23.8], [67.0, 24.9],
];

/** Die Makran-Küste, die Straße von Hormus und der Persische Golf. */
const PERSISCHER_GOLF = [
  [64.0, 25.3], [61.0, 25.2], [57.8, 25.3], [56.4, 26.6], [54.0, 26.7],
  [50.8, 28.9], [48.5, 30.1], [48.0, 29.4], [50.6, 25.3], [54.5, 24.5],
  [56.3, 25.6], [58.5, 23.6], [59.8, 22.5], [58.5, 20.0], [55.0, 17.5],
];

/** Die arabische Südküste, das Rote Meer und der Sinai. */
const ARABIEN = [
  [52.5, 15.5], [49.0, 14.5], [45.0, 12.8], [43.3, 12.6], [43.0, 13.5],
  [42.5, 16.0], [39.2, 21.5], [37.2, 24.5], [35.0, 28.0], [35.0, 29.5],
  [34.3, 27.8], [32.6, 29.9],
];

/** Die Levante, die türkische Südküste und die Ägäis. */
const LEVANTE_UND_AEGAEIS = [
  [34.2, 31.3], [35.5, 33.9], [35.8, 35.5], [36.0, 36.5], [34.0, 36.3],
  [30.6, 36.9], [27.3, 37.0], [26.7, 38.4], [26.2, 40.1], [24.5, 40.8],
  [23.7, 40.6], [22.9, 39.4], [24.0, 38.0], [23.6, 37.9], [23.1, 36.4],
  [22.0, 36.7], [21.3, 37.6], [21.1, 38.3], [20.0, 39.6], [19.4, 40.4],
];

/** Die Adria, Italien und die Mittelmeerküste bis Gibraltar. */
const ITALIEN_UND_WESTMITTELMEER = [
  [19.3, 42.3], [16.4, 43.5], [15.2, 44.1], [13.8, 45.6], [12.3, 45.4],
  [13.5, 43.6], [14.2, 42.5], [16.9, 41.1], [18.5, 40.1], [17.2, 40.5],
  [16.6, 38.9], [15.9, 38.2], [16.0, 38.9], [15.6, 40.0], [14.25, 40.85],
  [13.6, 41.2], [12.3, 41.7], [10.3, 43.5], [8.9, 44.4], [7.3, 43.7],
  [5.4, 43.3], [3.9, 43.5], [2.2, 41.4], [-0.3, 39.5], [-1.0, 37.6],
  [-2.5, 36.8], [-4.4, 36.7],
];

/** Der eurasische Ring — von Gibraltar einmal um den Erdteil und zurück. */
const EURASIEN = verbinde(
  EUROPA_ATLANTIK,
  JUETLAND_UND_OSTSEE,
  SKANDINAVIEN,
  SIBIRIEN_NORDRAND,
  OSTASIEN_NORDKUESTE,
  KOREA_UND_CHINA,
  SUEDOSTASIEN,
  INDIEN,
  PERSISCHER_GOLF,
  ARABIEN,
  LEVANTE_UND_AEGAEIS,
  ITALIEN_UND_WESTMITTELMEER,
);

// ---------------------------------------------------------------------------
// Afrika — ein eigener Ring. Die Landbrücke bei Suez ist in diesem Maßstab
// schmaler als ein Bildpunkt und deshalb offen gelassen.
// ---------------------------------------------------------------------------

/** Die Mittelmeerküste von Tanger bis Port Said. */
const AFRIKA_NORDKUESTE = [
  [-5.9, 35.8], [-0.6, 35.7], [3.05, 36.8], [10.2, 37.0], [10.5, 34.0],
  [13.2, 32.9], [18.5, 30.5], [20.0, 32.1], [23.9, 32.1], [29.9, 31.2],
  [32.3, 31.25],
];

/** Das Rote Meer, das Horn von Afrika und die Ostküste bis zum Kap. */
const AFRIKA_OSTKUESTE = [
  [32.55, 29.97], [34.0, 27.5], [35.5, 24.0], [37.0, 21.0], [38.5, 18.0],
  [39.5, 15.6], [42.7, 13.0], [43.1, 11.6], [45.0, 10.8], [48.0, 11.3],
  [51.4, 11.8], [50.0, 8.5], [45.3, 2.05], [42.5, -0.4], [39.7, -4.05],
  [39.3, -6.8], [40.5, -14.5], [34.9, -19.8], [32.6, -25.9], [31.0, -29.9],
  [25.6, -34.0], [18.5, -34.3],
];

/** Die Westküste vom Kap bis Tanger. */
const AFRIKA_WESTKUESTE = [
  [14.5, -22.9], [13.2, -8.8], [12.2, -6.0], [9.3, -0.6], [9.7, 4.0],
  [6.0, 4.3], [3.4, 6.4], [0.0, 5.5], [-4.0, 5.2], [-9.0, 5.0],
  [-13.0, 8.5], [-17.5, 14.7], [-16.0, 18.0], [-17.0, 21.0], [-16.0, 24.0],
  [-9.8, 30.4], [-7.6, 33.6], [-5.9, 35.8],
];

/** Der afrikanische Ring. */
const AFRIKA = verbinde(
  AFRIKA_NORDKUESTE,
  AFRIKA_OSTKUESTE,
  AFRIKA_WESTKUESTE,
);

// ---------------------------------------------------------------------------
// Australien, Neuguinea und die größeren Inseln.
// ---------------------------------------------------------------------------

/** Australien — von Perth im Uhrzeigersinn einmal herum. */
const AUSTRALIEN = [
  [115.8, -32.0], [115.0, -34.4], [118.0, -35.1], [123.0, -33.9],
  [129.0, -31.6], [132.0, -31.9], [135.0, -34.8], [137.5, -35.5],
  [138.5, -35.6], [140.0, -38.0], [143.0, -38.9], [145.0, -38.4],
  [147.5, -38.0], [150.0, -37.5], [151.2, -33.9], [153.4, -28.2],
  [153.0, -25.5], [152.0, -24.8], [149.5, -22.5], [147.0, -19.3],
  [145.8, -17.0], [143.5, -14.5], [142.5, -10.7], [141.5, -12.5],
  [140.0, -17.5], [137.0, -16.5], [136.5, -12.2], [133.0, -12.0],
  [130.8, -12.4], [129.0, -15.0], [127.0, -14.0], [125.0, -14.5],
  [123.0, -16.5], [121.5, -19.5], [119.0, -20.0], [116.0, -20.7],
  [114.5, -21.8], [113.5, -24.0], [114.0, -26.0], [115.0, -29.0],
];

/** Neuguinea. */
const NEUGUINEA = [
  [130.9, -1.4], [134.0, -1.0], [137.0, -2.5], [140.5, -2.6], [144.0, -3.8],
  [146.0, -5.5], [148.0, -8.0], [150.8, -10.4], [147.0, -8.5], [144.0, -8.0],
  [140.5, -8.5], [137.0, -8.0], [133.0, -4.5], [131.3, -3.5],
];

/** Sumatra. */
const SUMATRA = [
  [95.3, 5.6], [98.0, 3.5], [100.3, 0.5], [102.5, -1.5], [104.0, -2.0],
  [105.9, -5.9], [103.5, -5.5], [102.0, -4.0], [100.0, -2.0], [97.5, 1.0],
];

/** Java. */
const JAVA = [
  [105.2, -5.9], [110.4, -6.4], [112.7, -6.9], [114.5, -8.4], [113.0, -8.3],
  [109.0, -7.7], [106.0, -7.4],
];

/** Borneo. */
const BORNEO = [
  [109.0, 1.5], [110.0, -1.0], [112.0, -3.2], [116.0, -4.0], [118.5, -3.5],
  [117.5, 0.9], [119.0, 3.0], [117.0, 4.3], [115.0, 5.1], [112.0, 3.0],
  [109.5, 2.0],
];

/** Sulawesi. */
const SULAWESI = [
  [119.4, -5.6], [120.7, -5.5], [120.5, -3.5], [121.6, -4.7], [123.2, -4.6],
  [122.3, -3.2], [121.2, -2.5], [123.0, -0.8], [125.2, 1.5], [124.9, 1.7],
  [123.0, 0.2], [121.0, -1.0], [120.0, -0.5], [119.8, -2.5], [119.2, -4.0],
];

/** Luzon (Philippinen). */
const LUZON = [
  [120.5, 18.5], [122.2, 18.5], [122.5, 17.0], [121.6, 16.0], [122.0, 14.5],
  [121.3, 13.5], [120.6, 14.2], [119.9, 16.4], [120.3, 17.5],
];

/** Mindanao (Philippinen). */
const MINDANAO = [
  [123.5, 8.2], [125.5, 9.8], [126.3, 9.5], [126.5, 7.3], [125.5, 6.0],
  [124.0, 6.5], [123.2, 7.5],
];

/** Japan: Honschu mit Schikoku und Kiuschu (in diesem Maßstab eine Form). */
const JAPAN_HONSCHU = [
  [141.5, 41.4], [141.0, 38.3], [140.0, 35.7], [137.0, 34.7], [135.2, 33.6],
  [133.0, 33.3], [131.7, 32.8], [130.6, 31.2], [129.9, 32.8], [130.9, 33.9],
  [132.2, 34.4], [132.0, 35.5], [135.5, 35.6], [137.0, 37.2], [139.0, 38.0],
  [140.0, 39.8],
];

/** Hokkaido. */
const JAPAN_HOKKAIDO = [
  [140.0, 41.8], [141.5, 45.4], [144.5, 44.3], [145.5, 43.4], [143.5, 42.3],
  [141.5, 42.3],
];

/**
 * Okinawa — die südlichste der fünf „blauen Zonen".
 *
 * Die Insel ist rund hundert Kilometer lang und an der schmalsten Stelle
 * keine fünf: In diesem Maßstab ist sie ein Strich. Sie steht trotzdem
 * hier, weil ohne sie einer der fünf Info-Punkte im offenen Meer läge.
 */
const OKINAWA = [
  [127.6, 26.05], [128.35, 26.7], [128.25, 26.85], [127.45, 26.15],
];

/** Sardinien. */
const SARDINIEN = [
  [8.4, 41.15], [9.6, 41.2], [9.8, 40.6], [9.7, 39.5], [9.55, 39.15],
  [8.85, 38.9], [8.4, 39.2], [8.45, 40.55], [8.15, 41.0],
];

/** Sizilien. */
const SIZILIEN = [
  [12.4, 38.1], [15.1, 38.3], [15.6, 38.2], [15.1, 36.7], [12.6, 37.6],
];

/** Kreta — die Kohorte der Sieben-Länder-Studie mit der niedrigsten Rate. */
const KRETA = [
  [23.5, 35.3], [26.3, 35.4], [26.2, 35.0], [24.0, 34.9],
];

/** Ikaria — die vierte „blaue Zone", eine griechische Insel in der Ostägäis. */
const IKARIA = [
  [25.83, 37.53], [26.37, 37.66], [26.32, 37.78], [25.80, 37.65],
];

/** Großbritannien. */
const GROSSBRITANNIEN = [
  [-5.7, 50.0], [-3.0, 50.7], [0.7, 50.8], [1.7, 52.6], [-0.2, 54.0],
  [-1.4, 55.6], [-2.1, 57.5], [-3.0, 58.6], [-5.0, 58.5], [-5.6, 56.5],
  [-4.8, 55.0], [-3.1, 53.5], [-4.7, 53.3], [-4.1, 52.4], [-5.2, 51.7],
  [-3.5, 51.4], [-4.5, 50.8],
];

/** Irland. */
const IRLAND = [
  [-10.4, 51.8], [-8.3, 51.5], [-6.2, 52.2], [-6.0, 54.0], [-7.3, 55.4],
  [-9.9, 54.3], [-9.8, 53.1],
];

/** Island — nur zum kleineren Teil im Bild (der Rahmen endet bei 65 Grad). */
const ISLAND = [
  [-24.5, 64.5], [-22.0, 63.9], [-18.0, 63.4], [-14.0, 64.3], [-14.0, 66.5],
  [-24.0, 66.5],
];

/** Grönlands Südspitze — der Rest liegt oberhalb des Rahmens. */
const GROENLAND = [
  [-45.0, 59.8], [-50.0, 62.0], [-53.0, 67.0], [-33.0, 67.0], [-40.0, 62.5],
];

/** Neufundland. */
const NEUFUNDLAND = [
  [-59.0, 47.6], [-56.0, 51.4], [-55.5, 49.5], [-52.7, 47.6], [-53.5, 46.7],
  [-55.5, 46.9],
];

/** Sachalin. */
const SACHALIN = [
  [142.1, 54.3], [143.0, 53.0], [143.4, 49.3], [142.5, 46.1], [141.9, 46.5],
  [141.7, 50.0], [142.0, 53.5],
];

/** Sri Lanka. */
const SRI_LANKA = [
  [79.8, 9.5], [81.2, 8.5], [81.9, 7.0], [81.0, 6.1], [80.0, 6.0],
  [79.7, 8.2],
];

/** Madagaskar. */
const MADAGASKAR = [
  [49.5, -15.5], [50.5, -15.7], [50.2, -18.0], [47.5, -25.0], [45.2, -25.5],
  [43.3, -22.0], [44.5, -16.0], [48.0, -13.5],
];

/** Kuba. */
const KUBA = [
  [-84.9, 21.9], [-81.0, 23.2], [-78.5, 22.6], [-74.2, 20.3], [-77.5, 19.9],
  [-82.0, 22.4],
];

/** Neuseelands Nordinsel liegt östlich des Rahmens und fehlt deshalb. */

// ---------------------------------------------------------------------------
// Binnenmeere und Wüsten — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Das Schwarze Meer (mit dem Asowschen Meer zusammengefasst). */
const SCHWARZES_MEER = [
  [27.9, 43.0], [29.2, 41.2], [33.0, 42.0], [36.0, 41.0], [38.0, 41.5],
  [41.5, 41.5], [41.7, 43.0], [39.0, 43.4], [37.5, 45.0], [34.0, 45.9],
  [31.5, 46.6], [30.5, 46.5], [28.5, 45.2],
];

/** Das Kaspische Meer. */
const KASPISCHES_MEER = [
  [47.0, 44.5], [50.0, 44.5], [51.3, 45.2], [52.5, 42.0], [54.0, 41.0],
  [53.5, 38.0], [52.0, 36.8], [50.0, 36.9], [49.0, 38.5], [48.0, 39.5],
  [47.5, 41.5],
];

/** Die Sahara — grobe Fläche, keine Aussage über einzelne Dünenfelder. */
const SAHARA = [
  [-12.0, 26.0], [10.0, 30.0], [25.0, 29.0], [33.0, 24.0], [30.0, 17.0],
  [15.0, 15.0], [0.0, 16.0], [-10.0, 20.0],
];

/** Die arabische Wüste. */
const ARABISCHE_WUESTE = [
  [36.0, 30.0], [44.0, 30.0], [50.0, 24.0], [52.0, 19.0], [45.0, 16.0],
  [40.0, 20.0], [36.5, 27.0],
];

/** Die australische Trockenzone. */
const AUSTRALISCHE_WUESTE = [
  [119.0, -22.0], [133.0, -20.0], [141.0, -24.0], [138.0, -30.0],
  [128.0, -31.0], [120.0, -29.0],
];

// ---------------------------------------------------------------------------
// Die Orte der Phasen — Rechtecke um die Landstriche, die untersucht wurden.
// ---------------------------------------------------------------------------

/** Framingham, Massachusetts — die Studie, die 1948 begann. */
const FRAMINGHAM_FELD = feld(-71.42, 42.28, 3.0, 2.0);

/** Nordkarelien, Finnland — die Provinz mit der höchsten Rate der Welt. */
const NORDKARELIEN_FELD = feld(29.8, 62.8, 4.0, 2.5);

/** Die niederländische Kohorte der Sieben-Länder-Studie (Zutphen). */
const ZUTPHEN_FELD = feld(6.2, 52.1, 3.0, 2.0);

/** Die italienischen Kohorten (Crevalcore in der Po-Ebene, Nicotera im Süden). */
const ITALIEN_FELD = feld(13.5, 42.0, 5.0, 4.0);

/** Die dalmatinische Kohorte (Velika Krsna und Dalmatien, damals Jugoslawien). */
const DALMATIEN_FELD = feld(18.0, 43.5, 4.0, 2.5);

/** Die griechischen Kohorten: Kreta und Korfu. */
const KRETA_FELD = feld(24.9, 35.2, 4.0, 2.0);

/** Die japanischen Kohorten: Tanushimaru und Ushibuka auf Kiuschu. */
const KIUSCHU_FELD = feld(130.8, 32.8, 3.5, 2.5);

/** Die fünf „blauen Zonen". */
const SARDINIEN_FELD = feld(9.45, 40.0, 2.0, 2.0);
const OKINAWA_FELD = feld(127.9, 26.4, 2.5, 2.0);
const IKARIA_FELD = feld(26.03, 37.63, 2.5, 1.6);
const NICOYA_FELD = feld(-85.4, 10.1, 2.5, 2.0);
const LOMA_LINDA_FELD = feld(-117.26, 34.05, 3.0, 2.0);

/** Newcastle und Glasgow — die Zentren der DiRECT-Studie ab 2017. */
const SCHOTTLAND_FELD = feld(-3.5, 55.5, 4.5, 2.5);

// ---------------------------------------------------------------------------
// Rohdaten für die Prüfung.
// ---------------------------------------------------------------------------

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  amerika: AMERIKA,
  eurasien: EURASIEN,
  afrika: AFRIKA,
  australien: AUSTRALIEN,
  japanHonschu: JAPAN_HONSCHU,
  nordamerikaPazifik: NORDAMERIKA_PAZIFIK,
  amerikaAtlantik: AMERIKA_ATLANTIK,
  europaAtlantik: EUROPA_ATLANTIK,
  koreaUndChina: KOREA_UND_CHINA,
  indien: INDIEN,
  afrikaNordkueste: AFRIKA_NORDKUESTE,
  afrikaWestkueste: AFRIKA_WESTKUESTE,
  schwarzesMeer: SCHWARZES_MEER,
  kaspischesMeer: KASPISCHES_MEER,
  sardinien: SARDINIEN,
  okinawa: OKINAWA,
  ikaria: IKARIA,
  kreta: KRETA,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [
  AMERIKA,
  EURASIEN,
  AFRIKA,
  AUSTRALIEN,
  NEUGUINEA,
  SUMATRA,
  JAVA,
  BORNEO,
  SULAWESI,
  LUZON,
  MINDANAO,
  JAPAN_HONSCHU,
  JAPAN_HOKKAIDO,
  OKINAWA,
  SARDINIEN,
  SIZILIEN,
  KRETA,
  IKARIA,
  GROSSBRITANNIEN,
  IRLAND,
  ISLAND,
  GROENLAND,
  NEUFUNDLAND,
  SACHALIN,
  SRI_LANKA,
  MADAGASKAR,
  KUBA,
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(AMERIKA),
    land(EURASIEN),
    land(AFRIKA),
    land(AUSTRALIEN),
    land(NEUGUINEA),
    land(SUMATRA),
    land(JAVA),
    land(BORNEO),
    land(SULAWESI),
    land(LUZON),
    land(MINDANAO),
    land(JAPAN_HONSCHU),
    land(JAPAN_HOKKAIDO),
    land(OKINAWA),
    land(SARDINIEN),
    land(SIZILIEN),
    land(KRETA),
    land(IKARIA),
    land(GROSSBRITANNIEN),
    land(IRLAND),
    land(ISLAND),
    land(GROENLAND),
    land(NEUFUNDLAND),
    land(SACHALIN),
    land(SRI_LANKA),
    land(MADAGASKAR),
    land(KUBA),
    wueste(SAHARA),
    wueste(ARABISCHE_WUESTE),
    wueste(AUSTRALISCHE_WUESTE),
    wasser(SCHWARZES_MEER),
    wasser(KASPISCHES_MEER),
  ],

  phasen: [
    {
      id: 'framingham-1948',
      label: '1948: Framingham — die Geburt des Wortes „Risikofaktor"',
      hinweis:
        'In dem Städtchen Framingham westlich von Boston beginnt 1948 eine ' +
        'Untersuchung, die es so noch nicht gegeben hat: 5.209 gesunde ' +
        'Erwachsene werden aufgenommen und alle zwei Jahre wieder ' +
        'untersucht — Blutdruck, Gewicht, Rauchgewohnheiten, Blutwerte —, ' +
        'und dann wartet man ab, wer krank wird. Nicht die Kranken werden ' +
        'befragt, sondern die Gesunden werden begleitet. Aus dieser Studie ' +
        'stammt der Begriff „Risikofaktor" (1961), und aus ihr stammt die ' +
        'Erkenntnis, dass Bluthochdruck, Rauchen und hohe Blutfette dem ' +
        'Herzinfarkt vorausgehen. Die Studie läuft bis heute, inzwischen ' +
        'in der dritten Generation.',
      flaechen: [
        { titel: 'Framingham, Massachusetts — ab 1948', d: P.pfad(FRAMINGHAM_FELD) },
      ],
    },
    {
      id: 'sieben-laender-1958',
      label: '1958: die Sieben-Länder-Studie — 12.763 Männer in 16 Orten',
      hinweis:
        'Der amerikanische Physiologe Ancel Keys hatte in Neapel beobachtet, ' +
        'dass Herzinfarkte dort selten waren, wo die Menschen arm waren und ' +
        'einfach aßen. Ab 1958 prüft er das systematisch: 12.763 Männer ' +
        'zwischen 40 und 59 Jahren, in 16 Kohorten in sieben Ländern — ' +
        'Finnland, Griechenland, Italien, Japan, Niederlande, USA und ' +
        'Jugoslawien. Ergebnis nach Jahrzehnten: Die Sterblichkeit an ' +
        'Herzkrankheit unterscheidet sich zwischen den Orten um ein ' +
        'Vielfaches, am niedrigsten auf Kreta und in Japan, am höchsten in ' +
        'Ostfinnland. Kritik daran gehört dazu: Die Studie verglich Orte, ' +
        'nicht Personen, und Keys wurde später vorgeworfen, den Zucker zu ' +
        'wenig beachtet zu haben.',
      flaechen: [
        { titel: 'Ostfinnland — die höchste Rate der Studie', d: P.pfad(NORDKARELIEN_FELD) },
        { titel: 'Zutphen, Niederlande', d: P.pfad(ZUTPHEN_FELD) },
        { titel: 'Crevalcore und Nicotera, Italien', d: P.pfad(ITALIEN_FELD) },
        { titel: 'Dalmatien und Serbien (damals Jugoslawien)', d: P.pfad(DALMATIEN_FELD) },
        { titel: 'Kreta und Korfu — die niedrigste Rate der Studie', d: P.pfad(KRETA_FELD) },
        { titel: 'Tanushimaru und Ushibuka, Japan', d: P.pfad(KIUSCHU_FELD) },
        { titel: 'Die amerikanische Kohorte (Eisenbahner)', d: P.pfad(FRAMINGHAM_FELD) },
      ],
    },
    {
      id: 'nordkarelien-1972',
      label: '1972: Nordkarelien — die erste Provinz, die ihre Lebensweise ändert',
      hinweis:
        'Nordkarelien im Osten Finnlands hatte Anfang der 1970er Jahre die ' +
        'höchste Herzinfarkt-Sterblichkeit der Welt. 1972 beginnt dort ein ' +
        'Vorhaben, das nicht einzelne Menschen behandelt, sondern eine ganze ' +
        'Provinz: Der Arzt Pekka Puska und sein Team arbeiten mit Dörfern, ' +
        'Hausfrauenvereinen, Molkereien und Wursterzeugern zusammen — ' +
        'weniger Salz, weniger tierisches Fett, mehr Gemüse, weniger ' +
        'Rauchen. 1977 wird das Vorhaben auf ganz Finnland ausgeweitet. ' +
        'Zwischen 1972 und 2012 sinkt die Herzinfarkt-Sterblichkeit der ' +
        'Männer im arbeitsfähigen Alter in Nordkarelien um rund 80 Prozent. ' +
        'Es war kein Versuch mit Kontrollgruppe — der Rückgang ging in ganz ' +
        'Europa vor sich, in Nordkarelien nur früher und steiler.',
      flaechen: [
        { titel: 'Nordkarelien, Finnland — ab 1972', d: P.pfad(NORDKARELIEN_FELD) },
      ],
    },
    {
      id: 'blaue-zonen-2004',
      label: '2004: die „blauen Zonen" — fünf Landstriche voller alter Menschen',
      hinweis:
        'Der Begriff stammt von den Bevölkerungsforschern Gianni Pes und ' +
        'Michel Poulain, die 2004 auf einer Karte Sardiniens die Gemeinden ' +
        'mit besonders vielen Hundertjährigen blau umkreisten. Der ' +
        'Journalist Dan Buettner machte daraus ab 2005 für National ' +
        'Geographic fünf Gebiete: Ogliastra auf Sardinien, Okinawa, Ikaria, ' +
        'die Halbinsel Nicoya und die Adventisten-Gemeinde Loma Linda in ' +
        'Kalifornien. Gemeinsam ist ihnen keine Diät und kein Sport, ' +
        'sondern ein Muster: Bewegung im Tagesablauf, überwiegend ' +
        'pflanzliche Kost, feste soziale Bindungen, Aufgabe im Alter. Die ' +
        'Kritik gehört auf dieselbe Karte: Der Demograf Saul Justin Newman ' +
        'zeigte, dass hohe Hundertjährigen-Quoten oft mit schlechten ' +
        'Geburtsregistern zusammenfallen.',
      flaechen: [
        { titel: 'Ogliastra, Sardinien', d: P.pfad(SARDINIEN_FELD) },
        { titel: 'Okinawa, Japan', d: P.pfad(OKINAWA_FELD) },
        { titel: 'Ikaria, Griechenland', d: P.pfad(IKARIA_FELD) },
        { titel: 'Nicoya, Costa Rica', d: P.pfad(NICOYA_FELD) },
        { titel: 'Loma Linda, Kalifornien', d: P.pfad(LOMA_LINDA_FELD) },
      ],
    },
    {
      id: 'lebensstil-medizin-2017',
      label: 'Ab 2017: die Lebensstil-Medizin wird ein Fach — und ein Markt',
      hinweis:
        'Aus der Beobachtung wird eine Behandlung. 2017 und 2018 zeigt die ' +
        'britische DiRECT-Studie in Hausarztpraxen in Schottland und ' +
        'Nordengland, dass ein Typ-2-Diabetes durch Gewichtsabnahme ' +
        'zurückgehen kann: nach zwölf Monaten bei 46 Prozent der ' +
        'Teilnehmenden, nach 24 Monaten bei 36 Prozent — gegenüber 4 und ' +
        '3 Prozent in der üblichen Versorgung. Zugleich entsteht aus der ' +
        'einfachen Idee ein Geschäft: Ernährungsberatung, Fastenkuren, ' +
        'Nahrungsergänzung, Fitness-Abonnements, Selbstvermessung. Die ' +
        'billigste Medizin der Welt bekommt einen Preis.',
      flaechen: [
        { titel: 'Schottland und Nordengland — die DiRECT-Studie ab 2017', d: P.pfad(SCHOTTLAND_FELD) },
        { titel: 'Loma Linda — die Adventisten-Studien laufen weiter', d: P.pfad(LOMA_LINDA_FELD) },
      ],
    },
  ],

  punkte: [
    {
      id: 'framingham',
      name: 'Framingham',
      typ: 'ereignis',
      ...ort(-71.42, 42.28),
      text:
        'Ein Vorort mit damals rund 28.000 Einwohnern, gewählt, weil er ' +
        'unauffällig war: nicht zu arm, nicht zu reich, die Leute blieben ' +
        'wohnen. 1948 begann hier die Framingham Heart Study mit 5.209 ' +
        'gesunden Erwachsenen. Sie hat der Medizin ein Wort geschenkt, das ' +
        'heute jeder benutzt: „Risikofaktor" — 1961 zum ersten Mal in ' +
        'einer Veröffentlichung dieser Studie. Vorher hatte man den ' +
        'Herzinfarkt für Schicksal gehalten oder für Alter. Danach war er ' +
        'ein Ereignis mit Vorgeschichte: Blutdruck, Rauchen, Blutfette, ' +
        'Bewegungsmangel, Zucker. Das ist der Punkt, an dem die einfache ' +
        'Medizin messbar wurde — nicht bei den Heilkundigen, sondern bei ' +
        'den Statistikern.',
    },
    {
      id: 'nordkarelien',
      name: 'Nordkarelien',
      typ: 'ereignis',
      ...ort(29.8, 62.8),
      text:
        'Anfang der 1970er Jahre starben nirgendwo auf der Welt so viele ' +
        'Männer mittleren Alters am Herzinfarkt wie in dieser finnischen ' +
        'Provinz an der russischen Grenze. Die Menschen aßen viel Butter, ' +
        'salzten stark, rauchten viel, aßen wenig Gemüse. 1972 begann das ' +
        'Nordkarelien-Projekt unter Pekka Puska — und es behandelte keine ' +
        'Patienten, sondern eine Landschaft: Es überredete Molkereien, ' +
        'fettärmere Produkte anzubieten, Wursthersteller, Salz durch ' +
        'Kräuter zu ersetzen, Dorfvereine, Wettbewerbe im Rauchstopp zu ' +
        'veranstalten. Bis 2012 sank die Herzinfarkt-Sterblichkeit der ' +
        'Männer im arbeitsfähigen Alter um rund 80 Prozent. Es fehlte eine ' +
        'Kontrollgruppe — auch anderswo sank die Sterblichkeit. In ' +
        'Nordkarelien sank sie früher und stärker.',
    },
    {
      id: 'sardinien',
      name: 'Ogliastra (Sardinien)',
      typ: 'ereignis',
      ...ort(9.45, 40.0),
      text:
        'In den Bergdörfern der Ogliastra im Osten Sardiniens werden ' +
        'auffällig viele Menschen sehr alt — und anders als sonst fast ' +
        'überall auf der Welt werden Männer dort fast ebenso oft ' +
        'hundertjährig wie Frauen. Gianni Pes und Michel Poulain ' +
        'beschrieben das 2004; auf ihrer Karte bekamen diese Gemeinden ' +
        'blaue Kreise, daher der Name. Die Erklärungsversuche reichen von ' +
        'der Lebensweise (steiles Gelände, lebenslanges Gehen als Hirte, ' +
        'einfache Kost, enge Familien) bis zur Abgeschiedenheit der Dörfer ' +
        'und damit zur Vererbung. Sicher ist keiner davon. Sicher ist nur ' +
        'die Beobachtung.',
    },
    {
      id: 'okinawa',
      name: 'Okinawa',
      typ: 'ereignis',
      ...ort(127.9, 26.4),
      text:
        'Die japanische Inselgruppe galt jahrzehntelang als der Ort mit den ' +
        'meisten gesunden Hochbetagten. Die ältere Generation aß wenig — ' +
        'süße Kartoffeln, Gemüse, wenig Fleisch —, bewegte sich im Garten, ' +
        'lebte in festen Gruppen, die dort „Moai" heißen: Freundeskreise, ' +
        'die ein Leben lang zusammenbleiben und füreinander einstehen. ' +
        'Okinawa ist zugleich die ehrlichste der fünf Zonen, weil sie ' +
        'zeigt, dass so etwas verschwinden kann: Nach 1945 kam mit den ' +
        'amerikanischen Stützpunkten die verarbeitete Kost, und die ' +
        'jüngeren Jahrgänge Okinawas gehören heute zu den ' +
        'gewichtsreichsten Japans. Der Vorteil hing nicht an den Genen. Er ' +
        'hing an der Lebensweise — und mit ihr ist er gegangen.',
    },
    {
      id: 'ikaria',
      name: 'Ikaria',
      typ: 'ereignis',
      ...ort(26.03, 37.63),
      text:
        'Eine bergige Insel in der Ostägäis, rund 250 Quadratkilometer, ' +
        'wenige Tausend Einwohner. Auffällig ist dort nicht nur, wie alt ' +
        'die Menschen werden, sondern wie spät sie krank werden: Die ' +
        'Ikaria-Untersuchung von 2009 fand vergleichsweise wenig Demenz ' +
        'und Depression im hohen Alter. Was die Bewohner beschreiben, ' +
        'klingt unspektakulär: bergiges Gelände, Gartenarbeit bis ins ' +
        'hohe Alter, Wildkräuter, Bohnen, Olivenöl, ein Mittagsschlaf, ' +
        'späte Abende mit Nachbarn, wenig Eile. Auch hier gilt: Das sind ' +
        'Beobachtungen an einer kleinen Bevölkerung, keine Versuche mit ' +
        'Kontrollgruppe.',
    },
    {
      id: 'nicoya',
      name: 'Nicoya',
      typ: 'ereignis',
      ...ort(-85.4, 10.1),
      text:
        'Die Halbinsel im Nordwesten Costa Ricas ist die ärmste der fünf ' +
        'Zonen — und das macht sie interessant. Die Menschen dort haben im ' +
        'Durchschnitt weniger Geld, weniger Schulbildung und weniger ' +
        'Ärzte als ihre Landsleute in der Hauptstadt, werden aber älter. ' +
        'Beschrieben werden: körperliche Arbeit bis ins Alter, eine ' +
        'einfache Kost aus Mais, Bohnen und Kürbis, sehr kalkhaltiges ' +
        'Wasser, starke Familienbindungen, ein Grund zum Aufstehen. Nicoya ' +
        'ist damit das Gegenbeispiel zu dem Satz, Gesundheit sei eine ' +
        'Frage des Geldes — und zugleich eine Warnung: Auch dort ' +
        'schrumpft der Vorsprung, seit die jüngeren Jahrgänge anders leben.',
    },
    {
      id: 'loma-linda',
      name: 'Loma Linda',
      typ: 'ereignis',
      ...ort(-117.26, 34.05),
      text:
        'Eine Kleinstadt östlich von Los Angeles, in der viele ' +
        'Siebenten-Tags-Adventisten leben — eine Glaubensgemeinschaft, zu ' +
        'deren Lehre ein gesunder Umgang mit dem Körper gehört: kein ' +
        'Tabak, kein Alkohol, viele leben vegetarisch, der siebte Tag ist ' +
        'Ruhetag mit der Gemeinde. Weil sie mitten in Kalifornien leben, ' +
        'lassen sie sich gut vergleichen: In einer Auswertung von 2001 ' +
        'lebten adventistische Männer im Schnitt 7,3 Jahre und Frauen ' +
        '4,4 Jahre länger als andere Kalifornier. Loma Linda ist die ' +
        'einzige der fünf Zonen, in der die Lebensweise nicht aus ' +
        'Armut oder Abgeschiedenheit folgt, sondern aus einer ' +
        'Entscheidung. Das ist ihr eigentlicher Wert für dieses Kapitel.',
    },
  ],

  bewegungen: [
    {
      id: 'nordkarelien-nach-finnland',
      name: 'Von der Provinz auf das ganze Land',
      von: station(29.8, 62.8),
      nach: station(24.9, 60.2),
      text:
        'Fünf Jahre nach dem Beginn in Nordkarelien wurde das Vorhaben 1977 ' +
        'auf ganz Finnland ausgeweitet — bis hin zu Gesetzen über die ' +
        'Kennzeichnung von Salz in Lebensmitteln. Das ist der Punkt, an ' +
        'dem aus einem Rat eine Verhältnis-Änderung wurde: Nicht der ' +
        'Einzelne sollte sich anders entscheiden, sondern das Angebot im ' +
        'Laden wurde ein anderes. Genau darum geht die Auseinandersetzung ' +
        'in diesem Kapitel — ob die einfache Medizin Sache des Einzelnen ' +
        'ist oder Sache der Verhältnisse.',
    },
    {
      id: 'neapel-nach-kreta',
      name: 'Die Spur, der Ancel Keys folgte',
      von: station(14.25, 40.85),
      ueber: [station(18.5, 38.5)],
      nach: station(24.9, 35.2),
      text:
        'Ancel Keys kam Anfang der 1950er Jahre nach Neapel und wunderte ' +
        'sich: In den Krankenhäusern der armen Viertel sah er kaum ' +
        'Herzinfarkte, in den Vereinen der wohlhabenden Kaufleute schon. ' +
        'Aus dieser Beobachtung wurde die Sieben-Länder-Studie ab 1958 — ' +
        'und ihr auffälligster Befund lag am Ende dieser Linie: Auf Kreta ' +
        'starben in den ersten fünfzehn Jahren der Studie weniger Männer ' +
        'an Herzkrankheit als in jeder anderen Kohorte. Das Wort ' +
        '„Mittelmeerkost" stammt aus dieser Zeit. Was Keys dort sah, war ' +
        'allerdings die Kost armer Bauern in den Jahren nach dem Krieg — ' +
        'nicht das, was heute in Restaurants unter diesem Namen serviert ' +
        'wird.',
    },
  ],

  beschriftungen: [
    schrift('Nordamerika', 'land', -100.0, 45.0),
    schrift('Südamerika', 'land', -58.0, -12.0),
    schrift('Europa', 'land', 20.0, 50.5),
    schrift('Afrika', 'land', 20.0, 5.0),
    schrift('Asien', 'land', 90.0, 45.0),
    schrift('Australien', 'land', 133.0, -25.0),
    schrift('Atlantik', 'meer', -35.0, 20.0),
    schrift('Pazifik', 'meer', -115.0, 5.0),
    schrift('Indischer Ozean', 'meer', 78.0, -22.0),
    schrift('Mittelmeer', 'meer', 17.5, 35.0),
    schrift('Framingham', 'land', -68.0, 44.5),
    schrift('Nordkarelien', 'land', 36.0, 64.0),
    schrift('Sardinien', 'land', 6.0, 40.5),
    schrift('Ikaria', 'land', 29.5, 38.5),
    schrift('Okinawa', 'land', 131.5, 24.5),
    schrift('Nicoya', 'land', -89.0, 7.0),
    schrift('Loma Linda', 'land', -119.0, 30.5),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
