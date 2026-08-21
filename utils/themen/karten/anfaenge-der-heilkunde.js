// Karte zu „Die Anfänge der Heilkunde" — die Alte Welt von Europa bis Indien.
//
// Die Küstenlinien stehen hier als echte Längen-/Breitengrade `[lon, lat]`;
// utils/karte-geo.js rechnet sie in SVG-Koordinaten um (Architektur-Regel:
// Fachlogik in utils/, ohne UI-Importe, mit blankem `node` prüfbar). Wer
// einen Punkt anzweifelt, schlägt ihn im Atlas nach — genau dafür sind die
// Rohdaten unten exportiert, und genau das prüft
// tests/karte-anfaenge-der-heilkunde.mjs nach.
//
// Was die Karte zeigen soll: dass die Heilkunde keinen Anfangsort hat. Die
// Phasen wandern von den Jägern und Sammlern über die ersten Dörfer zu den
// frühen Hochkulturen — und in jeder Phase liegt Gebiet auf drei Kontinenten.
// Der Ausschnitt ist trotzdem nur ein Ausschnitt: China, Amerika, Afrika
// südlich der Sahara und Australien fehlen. Der Hinweis der ersten Phase sagt
// das offen, damit die Karte nicht behauptet, hier habe die Medizin begonnen.
//
// Aufbau der Landmassen: Afrika und Eurasien hängen am Isthmus von Suez
// zusammen — beide Ringe teilen sich diese Linie. Mittelmeer, Rotes Meer und
// Persischer Golf sind dadurch Lücken zwischen den Landflächen und brauchen
// keine eigene Fläche; Schwarzes Meer und Kaspisches Meer liegen im Inneren
// und werden als Wasser darübergelegt.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: vom Atlantik (Marokko/Portugal) bis an den Ganges,
 * von Südskandinavien bis in die Sahelzone.
 */
const RAHMEN = {
  minLon: -12,
  maxLon: 92,
  minLat: 5,
  maxLat: 59,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — sie machen aus geografischen Punktlisten Untergrund-Teile.
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
// Die Küsten in Abschnitten — so bleiben sie lesbar und einzeln prüfbar.
// ---------------------------------------------------------------------------

/** Gibraltar → Iberien → Biskaya → Ärmelkanal → Nordsee → Skagen. */
const ATLANTIK_EUROPA = [
  [-5.6, 36.0], [-6.3, 36.6], [-6.9, 37.2], [-7.9, 37.1], [-8.9, 37.0],
  [-8.8, 38.0], [-9.5, 38.7], [-9.4, 39.4], [-8.9, 40.2], [-8.7, 41.1],
  [-8.9, 41.9], [-9.3, 42.6], [-9.3, 43.1], [-8.4, 43.4], [-7.0, 43.6],
  [-5.6, 43.6], [-4.0, 43.5], [-2.9, 43.5], [-1.8, 43.4], [-1.4, 44.2],
  [-1.2, 45.3], [-1.1, 46.2], [-1.9, 46.6], [-2.2, 47.2], [-3.1, 47.6],
  [-4.4, 47.8], [-4.7, 48.1], [-4.5, 48.7], [-3.0, 48.8], [-1.6, 48.6],
  [-1.2, 49.4], [-0.2, 49.3], [0.7, 49.7], [1.6, 50.7], [2.5, 51.1],
  [3.4, 51.4], [4.2, 51.9], [4.7, 52.9], [5.6, 53.4], [6.8, 53.5],
  [8.1, 53.6], [8.7, 53.9], [8.5, 54.5], [8.4, 55.3], [8.1, 56.0],
  [8.1, 56.7], [8.6, 57.1], [9.6, 57.6], [10.6, 57.7],
];

/** Skagen → Ostseeküsten → Finnischer Meerbusen → aus dem Rahmen nach Norden. */
const OSTSEE = [
  [10.5, 57.2], [10.2, 56.6], [10.7, 56.1], [10.3, 55.4], [9.9, 55.0],
  [9.4, 54.8], [10.1, 54.4], [11.0, 54.4], [12.1, 54.2], [13.4, 54.4],
  [14.3, 54.0], [15.6, 54.2], [17.0, 54.5], [18.6, 54.4], [19.6, 54.4],
  [21.0, 55.3], [21.1, 56.2], [21.0, 57.0], [21.7, 57.6], [23.0, 57.1],
  [24.1, 57.0], [24.4, 58.4], [23.5, 58.6], [24.8, 59.5], [27.5, 59.5],
  [29.8, 60.0], [30.3, 61.5],
];

/** Der Nordrand liegt bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const NORDRAND = [
  [32.0, 62.0], [45.0, 63.0], [60.0, 63.0], [75.0, 63.0], [95.0, 62.0],
];

/** Der Ostrand ebenso: senkrecht hinunter bis nach Hinterindien. */
const OSTRAND = [
  [95.0, 45.0], [95.0, 30.0], [95.0, 21.5],
];

/** Golf von Bengalen → Indien → Indusmündung → Makran → Straße von Hormus. */
const SUEDASIEN = [
  [93.2, 19.8], [92.9, 20.6], [92.2, 21.4], [91.0, 22.2], [90.2, 21.8],
  [89.2, 21.7], [88.2, 21.6], [87.0, 21.5], [86.9, 20.7], [86.0, 19.9],
  [85.1, 19.7], [84.0, 19.0], [83.3, 18.3], [82.3, 16.9], [81.2, 16.3],
  [80.3, 15.8], [80.2, 13.1], [79.8, 11.4], [79.9, 10.3], [78.2, 9.2],
  [77.5, 8.1], [76.5, 8.9], [75.8, 11.2], [74.7, 13.0], [74.1, 14.8],
  [73.5, 16.0], [72.8, 18.9], [72.9, 20.4], [72.6, 21.5], [71.5, 20.9],
  [70.0, 21.0], [69.1, 22.2], [70.2, 22.7], [68.7, 23.6], [67.5, 24.0],
  [66.7, 25.0], [64.5, 25.2], [62.3, 25.1], [60.6, 25.3], [57.8, 25.6],
  [57.0, 26.6], [56.3, 27.1],
];

/** Der Persische Golf als tiefe Bucht: Iran → Schatt al-Arab → Arabien. */
const PERSISCHER_GOLF = [
  [54.9, 26.6], [53.0, 27.3], [51.5, 28.2], [50.8, 28.9], [49.6, 29.7],
  [48.6, 30.2], [48.2, 29.9], [48.0, 29.4], [49.0, 28.3], [50.1, 26.7],
  [50.5, 26.2], [51.0, 26.1], [51.6, 26.2], [51.5, 25.0], [52.6, 24.3],
  [54.4, 24.4], [55.5, 25.6], [56.4, 26.2],
];

/** Oman → Hadramaut → Aden → Bab al-Mandab. */
const ARABIEN_SUED = [
  [56.6, 25.0], [58.0, 23.6], [59.8, 22.5], [59.3, 21.5], [58.0, 20.2],
  [57.0, 18.9], [55.0, 17.5], [53.0, 16.9], [52.2, 15.7], [50.0, 14.6],
  [48.0, 14.0], [45.6, 13.1], [45.0, 12.8], [44.0, 12.7], [43.4, 12.6],
];

/** Rotes Meer, Ostufer → Golf von Akaba → Sinai → Golf von Suez. */
const ROTES_MEER_OST = [
  [43.0, 13.5], [42.6, 16.9], [41.1, 19.1], [39.2, 21.5], [38.1, 24.1],
  [37.2, 25.1], [35.7, 27.3], [35.0, 29.4], [34.4, 28.2], [34.3, 27.8],
  [33.4, 28.5], [32.9, 29.5], [32.6, 29.9],
];

/** Isthmus von Suez → Levanteküste → Golf von Iskenderun. */
const LEVANTE = [
  [32.4, 31.2], [33.8, 31.1], [34.4, 31.5], [34.8, 32.1], [35.0, 32.8],
  [35.5, 33.9], [35.8, 34.4], [35.8, 35.5], [36.1, 36.3], [36.3, 36.6],
];

/** Südküste Anatoliens → Ägäis → Dardanellen. */
const ANATOLIEN_SUED = [
  [35.8, 36.6], [34.6, 36.8], [34.0, 36.3], [32.8, 36.1], [32.0, 36.5],
  [30.7, 36.9], [30.5, 36.3], [29.6, 36.2], [29.1, 36.6], [28.2, 36.6],
  [27.4, 37.0], [27.2, 37.7], [26.8, 38.4], [26.7, 38.7], [26.2, 39.5],
  [26.2, 40.1], [26.4, 40.5],
];

/** Thrakien → Griechenland → Albanien → Dalmatien → Triest. */
const GRIECHENLAND_ADRIA = [
  [26.0, 40.7], [24.6, 40.9], [23.6, 40.6], [23.9, 39.9], [23.0, 39.2],
  [23.6, 38.3], [23.8, 37.9], [23.2, 37.4], [22.6, 36.8], [21.7, 37.4],
  [21.3, 38.5], [20.8, 39.3], [19.9, 39.8], [19.4, 40.4], [19.5, 41.3],
  [18.9, 42.0], [18.5, 42.4], [17.6, 42.9], [16.5, 43.5], [15.2, 44.3],
  [14.5, 45.0], [13.6, 45.4], [13.6, 45.8],
];

/** Der Stiefel: Adria → Absatz → Ionisches Meer → Tyrrhenisches Meer → Nizza. */
const ITALIEN = [
  [12.5, 45.5], [12.3, 44.8], [12.6, 44.1], [13.6, 43.6], [14.2, 42.4],
  [15.2, 42.0], [16.2, 41.9], [15.9, 41.6], [16.6, 41.2], [17.3, 40.9],
  [18.0, 40.6], [18.5, 40.1], [18.4, 39.8], [17.2, 40.4], [16.5, 39.9],
  [17.1, 38.9], [16.6, 38.8], [15.7, 38.1], [15.9, 38.9], [16.1, 39.5],
  [15.6, 40.1], [14.9, 40.6], [14.1, 40.8], [13.6, 41.2], [12.6, 41.4],
  [12.2, 41.8], [11.5, 42.4], [10.5, 42.9], [10.3, 43.6], [9.8, 44.1],
  [8.9, 44.4], [8.1, 43.9], [7.3, 43.7],
];

/** Golfe du Lion → Katalonien → Levante → Andalusien, zurück nach Gibraltar. */
const MITTELMEER_NORDWEST = [
  [6.1, 43.1], [5.3, 43.3], [4.8, 43.4], [3.7, 43.4], [3.0, 42.6],
  [2.2, 41.4], [1.2, 41.1], [0.9, 40.7], [0.2, 39.9], [-0.3, 39.5],
  [-0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.4, 37.4], [-2.5, 36.8],
  [-3.5, 36.7], [-4.4, 36.7], [-5.3, 36.2],
];

/** Die Landmasse von Europa, Asien und Arabien — ein einziger Ring. */
const EURASIEN = verbinde(
  ATLANTIK_EUROPA,
  OSTSEE,
  NORDRAND,
  OSTRAND,
  SUEDASIEN,
  PERSISCHER_GOLF,
  ARABIEN_SUED,
  ROTES_MEER_OST,
  LEVANTE,
  ANATOLIEN_SUED,
  GRIECHENLAND_ADRIA,
  ITALIEN,
  MITTELMEER_NORDWEST,
);

/** Afrika: Atlantik → Guineaküste (unter dem Rahmen) → Horn → Rotes Meer →
 *  Isthmus von Suez → Mittelmeerküste zurück nach Tanger. */
const AFRIKA = [
  [-5.8, 35.8], [-6.2, 35.2], [-6.9, 34.0], [-7.6, 33.6], [-9.2, 32.3],
  [-9.8, 31.5], [-9.6, 30.4], [-11.1, 28.4], [-12.9, 27.9], [-15.9, 23.7],
  [-17.0, 21.0], [-16.0, 18.1], [-17.5, 14.7], [-16.6, 13.5], [-15.6, 11.9],
  [-13.7, 9.5], [-13.2, 8.5], [-10.8, 6.3], [-7.7, 4.4], [-4.0, 5.3],
  [-0.2, 5.6], [1.2, 6.1], [3.4, 6.4], [5.6, 4.3], [9.5, 4.0],
  [11.0, 0.0], [25.0, -3.0], [38.0, -3.0], [42.5, -0.4], [45.3, 2.0],
  [48.5, 5.4], [49.8, 8.0], [50.8, 10.4], [51.4, 11.8], [49.0, 11.5],
  [46.5, 10.7], [44.5, 10.5], [43.4, 11.5], [42.7, 13.0], [40.5, 14.5],
  [39.5, 15.6], [38.5, 17.5], [37.2, 19.6], [37.0, 21.0], [36.6, 22.2],
  [35.5, 23.9], [34.9, 25.1], [33.8, 27.2], [33.1, 28.4], [32.6, 29.9],
  [32.4, 31.2], [31.5, 31.4], [30.4, 31.4], [29.9, 31.2], [28.9, 30.8],
  [27.2, 31.3], [25.2, 31.5], [23.9, 32.1], [22.6, 32.8], [20.1, 32.1],
  [19.9, 30.5], [18.5, 30.3], [16.6, 31.2], [15.1, 32.4], [13.2, 32.9],
  [12.1, 32.9], [10.1, 33.9], [10.8, 34.7], [10.6, 35.8], [11.0, 37.1],
  [9.9, 37.3], [7.8, 36.9], [5.1, 36.8], [3.1, 36.8], [-0.6, 35.7],
  [-3.0, 35.3], [-5.3, 35.9],
];

/** Großbritannien. */
const GROSSBRITANNIEN = [
  [-5.7, 50.1], [-4.2, 51.2], [-3.2, 51.5], [-5.3, 51.9], [-4.1, 52.9],
  [-4.6, 53.3], [-3.0, 53.4], [-3.0, 54.1], [-3.5, 54.9], [-5.0, 54.8],
  [-5.6, 55.5], [-4.8, 55.9], [-5.5, 56.4], [-5.8, 57.5], [-5.0, 58.6],
  [-3.0, 58.6], [-3.5, 57.7], [-2.1, 57.1], [-2.8, 56.1], [-2.0, 55.8],
  [-1.4, 55.0], [0.1, 53.6], [0.3, 52.9], [1.7, 52.5], [1.4, 51.4],
  [-0.2, 50.8], [-1.1, 50.6], [-3.0, 50.6], [-4.1, 50.3],
];

/** Irland. */
const IRLAND = [
  [-6.1, 53.4], [-6.4, 52.3], [-8.3, 51.8], [-10.2, 51.9], [-9.9, 52.6],
  [-9.9, 53.3], [-10.0, 54.2], [-8.5, 54.9], [-7.4, 55.4], [-5.6, 54.6],
  [-6.2, 54.0],
];

/** Sizilien. */
const SIZILIEN = [
  [15.6, 38.2], [15.1, 37.5], [15.3, 37.1], [15.1, 36.7], [14.2, 37.0],
  [13.6, 37.3], [12.4, 37.8], [12.5, 38.0], [13.4, 38.2], [15.2, 38.2],
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

/** Kreta. */
const KRETA = [
  [23.6, 35.5], [24.8, 35.4], [26.3, 35.3], [25.7, 35.0], [24.7, 34.9],
  [23.6, 35.2],
];

/** Zypern. */
const ZYPERN = [
  [32.3, 35.1], [33.4, 35.4], [34.5, 35.7], [33.9, 35.1], [33.9, 34.6],
  [32.9, 34.6], [32.4, 34.7],
];

/** Sri Lanka. */
const SRI_LANKA = [
  [80.0, 9.8], [81.2, 8.6], [81.8, 7.3], [81.4, 6.4], [80.4, 6.0],
  [79.9, 7.5], [79.8, 8.9],
];

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

/** Nil, Euphrat, Tigris, Indus, Ganges — die Flüsse der frühen Hochkulturen. */
const NIL = [
  [30.5, 31.4], [31.2, 30.1], [31.2, 29.0], [32.0, 27.2], [32.6, 25.7],
  [32.9, 24.1], [31.3, 21.9], [31.0, 19.8], [32.5, 18.5], [33.9, 17.9],
  [32.5, 15.6], [31.7, 13.5], [30.5, 10.0],
];
const EUPHRAT = [
  [38.0, 38.5], [37.9, 37.0], [39.0, 35.9], [40.1, 35.3], [42.8, 33.6],
  [44.4, 32.5], [46.5, 31.3], [47.6, 30.5], [48.5, 30.0],
];
const TIGRIS = [
  [40.2, 37.9], [43.1, 36.3], [44.4, 33.3], [45.8, 32.5], [47.2, 31.8],
  [47.6, 31.0], [48.5, 30.0],
];
const INDUS = [
  [72.2, 33.9], [71.5, 32.9], [70.9, 30.9], [68.9, 27.7], [68.4, 25.4],
  [67.5, 24.0],
];
const GANGES = [
  [78.2, 29.9], [80.3, 26.5], [81.9, 25.4], [85.1, 25.6], [87.9, 24.5],
  [89.0, 23.5], [89.5, 22.2],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  eurasien: EURASIEN,
  afrika: AFRIKA,
  grossbritannien: GROSSBRITANNIEN,
  irland: IRLAND,
  sizilien: SIZILIEN,
  sardinien: SARDINIEN,
  korsika: KORSIKA,
  kreta: KRETA,
  zypern: ZYPERN,
  sriLanka: SRI_LANKA,
  schwarzesMeer: SCHWARZES_MEER,
  kaspischesMeer: KASPISCHES_MEER,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [
  EURASIEN,
  AFRIKA,
  GROSSBRITANNIEN,
  IRLAND,
  SIZILIEN,
  SARDINIEN,
  KORSIKA,
  KRETA,
  ZYPERN,
  SRI_LANKA,
];

// ---------------------------------------------------------------------------
// Die Phasen: drei Blicke auf dieselbe Welt, 12 000 Jahre auseinander.
// ---------------------------------------------------------------------------

/** Phase 1 — überall dort, wo Menschen als Jäger und Sammler lebten. */
const JAEGER_EUROPA = [
  [-6.0, 42.0], [0.0, 46.0], [8.0, 49.0], [18.0, 50.0], [26.0, 48.0],
  [28.0, 42.0], [20.0, 42.0], [12.0, 45.0], [4.0, 43.0], [-4.0, 40.0],
  [-8.0, 40.0],
];
const JAEGER_NORDAFRIKA = [
  [-6.0, 33.0], [4.0, 34.0], [14.0, 30.0], [24.0, 28.0], [32.0, 26.0],
  [34.0, 22.0], [28.0, 20.0], [16.0, 22.0], [4.0, 26.0], [-6.0, 28.0],
];
const JAEGER_VORDERASIEN = [
  [31.0, 39.0], [40.0, 41.0], [48.0, 38.0], [56.0, 33.0], [59.0, 28.0],
  [54.0, 24.5], [48.0, 29.5], [42.0, 31.0], [37.0, 34.0], [32.0, 37.0],
];
const JAEGER_SUEDASIEN = [
  [62.0, 30.0], [70.0, 32.0], [78.0, 30.0], [85.0, 26.0], [88.0, 23.0],
  [82.0, 18.0], [77.0, 14.0], [74.0, 17.0], [70.0, 23.0], [66.0, 27.0],
];

/** Phase 2 — der Fruchtbare Halbmond und die Dörfer Anatoliens. */
const FRUCHTBARER_HALBMOND = [
  [33.8, 30.8], [35.0, 33.0], [36.5, 36.0], [39.5, 37.5], [43.0, 37.0],
  [46.5, 35.0], [48.8, 31.5], [48.2, 30.0], [46.5, 30.8], [45.0, 33.0],
  [42.5, 34.5], [39.5, 35.0], [37.5, 34.5], [36.3, 32.5], [35.2, 30.5],
];
const ANATOLISCHE_DOERFER = [
  [30.5, 37.5], [33.5, 38.8], [36.0, 37.8], [34.5, 36.8], [31.5, 37.0],
];

/** Phase 3 — die Stromtäler, in denen aus Heilkunde ein Beruf wurde. */
const NILTAL = [
  [29.9, 31.2], [31.5, 31.3], [32.3, 30.2], [32.5, 27.0], [33.4, 24.6],
  [33.2, 22.2], [32.2, 22.2], [32.0, 24.6], [31.2, 27.0], [30.5, 30.0],
  [29.4, 30.8],
];
const ZWEISTROMLAND = [
  [40.5, 36.5], [43.5, 36.8], [46.5, 35.0], [48.5, 30.2], [47.5, 30.0],
  [44.5, 32.5], [41.5, 34.5], [39.5, 36.2],
];
const INDUSTAL = [
  [71.5, 34.0], [73.0, 33.0], [70.5, 29.0], [69.0, 26.5], [67.8, 24.2],
  [66.8, 24.5], [68.0, 27.0], [69.0, 30.0], [70.0, 33.5],
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
    land(GROSSBRITANNIEN),
    land(IRLAND),
    land(SIZILIEN),
    land(SARDINIEN),
    land(KORSIKA),
    land(KRETA),
    land(ZYPERN),
    land(SRI_LANKA),
    wueste(SAHARA),
    wueste(ARABISCHE_WUESTE),
    wasser(SCHWARZES_MEER),
    wasser(KASPISCHES_MEER),
    fluss(NIL),
    fluss(EUPHRAT),
    fluss(TIGRIS),
    fluss(INDUS),
    fluss(GANGES),
  ],

  phasen: [
    {
      id: 'jaeger-und-sammler',
      label: 'Vor etwa 12 000 Jahren',
      hinweis:
        'Jäger und Sammler — und überall Menschen, die Kranke versorgten. ' +
        'Die Karte zeigt nur einen Ausschnitt der Welt: China, Amerika, ' +
        'Australien und Afrika südlich der Sahara fehlen. Geheilt wurde auch dort.',
      flaechen: [
        { titel: 'Europa: Sammlerinnen, Jäger, Heilkundige', d: P.pfad(JAEGER_EUROPA) },
        { titel: 'Nordafrika: Sahara, damals grüner als heute', d: P.pfad(JAEGER_NORDAFRIKA) },
        { titel: 'Vorderasien: Höhlen, Lager, Gräber', d: P.pfad(JAEGER_VORDERASIEN) },
        { titel: 'Südasien: Wälder, Küsten, Flusstäler', d: P.pfad(JAEGER_SUEDASIEN) },
      ],
    },
    {
      id: 'erste-doerfer',
      label: 'Um 10 000 v. Chr.: die ersten Dörfer',
      hinweis:
        'Sesshaft werden heißt: mehr Nahrung, mehr Menschen auf engem Raum — ' +
        'und neue Krankheiten. Die Heilkunde bekommt mehr zu tun.',
      flaechen: [
        { titel: 'Der Fruchtbare Halbmond', d: P.pfad(FRUCHTBARER_HALBMOND) },
        { titel: 'Die Dörfer Anatoliens', d: P.pfad(ANATOLISCHE_DOERFER) },
      ],
    },
    {
      id: 'fruehe-hochkulturen',
      label: 'Um 3500–1500 v. Chr.: die frühen Hochkulturen',
      hinweis:
        'An Nil, Euphrat, Tigris und Indus entstehen Städte — und mit ihnen ' +
        'Menschen, die nur noch heilen: die ersten Ärztinnen und Ärzte mit Titel.',
      flaechen: [
        { titel: 'Das Niltal', d: P.pfad(NILTAL) },
        { titel: 'Das Zweistromland', d: P.pfad(ZWEISTROMLAND) },
        { titel: 'Das Industal', d: P.pfad(INDUSTAL) },
      ],
    },
  ],

  punkte: [
    {
      id: 'shanidar',
      name: 'Shanidar',
      typ: 'ereignis',
      ...ort(44.22, 36.83),
      text:
        'In dieser Höhle im Zagros-Gebirge lagen Neandertaler-Gräber. Einer ' +
        'der Toten, „Shanidar 1", hatte einen verkümmerten Arm, einen ' +
        'zerschmetterten Gesichtsknochen und war wohl auf einem Auge blind — ' +
        'und lebte damit noch Jahre. Allein hätte er das kaum geschafft: ' +
        'Jemand hat ihn versorgt. Das berühmte „Blumengrab" mit Pollen von ' +
        'Heilpflanzen ist dagegen umstritten — die Pollen könnten auch von ' +
        'Nagetieren eingetragen worden sein.',
    },
    {
      id: 'ensisheim',
      name: 'Ensisheim',
      typ: 'ereignis',
      ...ort(7.35, 47.87),
      text:
        'Im Elsass fand man den bisher ältesten Schädel Europas mit zwei ' +
        'Trepanationen — Öffnungen im Knochen, um 5100 v. Chr. Die Ränder ' +
        'sind glatt verheilt: Der Mann hat beide Eingriffe überlebt und ' +
        'danach noch lange gelebt. Warum geöffnet wurde, weiß niemand ' +
        'sicher: gegen Kopfschmerz, nach einem Schlag auf den Kopf — oder ' +
        'um etwas herauszulassen, das man dort vermutete.',
    },
    {
      id: 'oetzi',
      name: 'Ötzi',
      typ: 'ereignis',
      ...ort(10.84, 46.78),
      text:
        'Der Mann aus dem Eis starb um 3300 v. Chr. am Tisenjoch. Bei seiner ' +
        'Ausrüstung hingen zwei Stücke Birkenporling, ein Baumpilz, an ' +
        'Lederriemen. In seinem Darm steckten Eier des Peitschenwurms, seine ' +
        'Gelenke waren abgenutzt, und 61 Tätowierungen liegen auffällig oft ' +
        'genau dort. Ob der Pilz eine Arznei war und die Striche eine ' +
        'Behandlung, ist eine gut begründete Vermutung — bewiesen ist es nicht.',
    },
    {
      id: 'jericho',
      name: 'Jericho',
      typ: 'stadt',
      ...ort(35.44, 31.87),
      text:
        'Eine der ältesten Siedlungen der Welt: Schon um 9000 v. Chr. wohnten ' +
        'hier Menschen dauerhaft beieinander, später hinter einer Mauer. Wo ' +
        'viele eng zusammenleben, verbreiten sich Krankheiten leichter — und ' +
        'wo jemand bleibt, kann er Kranke über Wochen pflegen. Beides beginnt ' +
        'hier: die neuen Leiden und die dauerhafte Fürsorge.',
    },
    {
      id: 'niltal',
      name: 'Am Nil',
      typ: 'stadt',
      ...ort(32.63, 25.7),
      text:
        'Lange bevor Ägypten seine berühmten Papyri beschrieb, versorgten ' +
        'Menschen am Nil Wunden, Brüche und Fieber. Die Skelette zeigen ' +
        'geschiente Arme und ausgeheilte Brüche. Aus dem Erfahrungswissen der ' +
        'Dörfer wurde später ein Beruf mit Namen, Rang und Schrift — die ' +
        'Geschichte davon erzählt das Kapitel über Ägypten.',
    },
    {
      id: 'mohenjo-daro',
      name: 'Mohenjo-Daro',
      typ: 'stadt',
      ...ort(68.14, 27.33),
      text:
        'Am Indus stand um 2500 v. Chr. eine Stadt mit gemauerten Bädern, ' +
        'Brunnen und Abwasserkanälen in fast jedem Haus. Niemand kannte ' +
        'Bakterien — trotzdem hielten die Menschen Schmutz und Trinkwasser ' +
        'auseinander. Sauberkeit war hier Ordnung und Reinheit, nicht ' +
        'Hygiene im heutigen Sinn. Gewirkt hat sie vermutlich trotzdem.',
    },
  ],

  bewegungen: [
    {
      id: 'ackerbau-westwaerts',
      name: 'Dörfer und Feldbau nach Westen',
      von: station(36.5, 34.5),
      ueber: [station(32.0, 38.5), station(22.0, 41.5)],
      nach: station(11.0, 49.5),
      text:
        'Vom Fruchtbaren Halbmond aus verbreiteten sich Ackerbau und feste ' +
        'Dörfer über Anatolien und den Balkan bis nach Mitteleuropa. Mit den ' +
        'Feldern reisten die Nutzpflanzen — und mit ihnen die Kenntnis, ' +
        'welche Pflanze am Wegrand wogegen hilft. Mitgereist sind allerdings ' +
        'auch neue Krankheiten: enge Dörfer, Vorratsschädlinge und Tiere im ' +
        'Haus brachten Leiden, die Jäger und Sammler kaum kannten.',
    },
    {
      id: 'ackerbau-ostwaerts',
      name: 'Dörfer und Feldbau nach Osten',
      von: station(45.0, 34.5),
      ueber: [station(56.0, 31.0)],
      nach: station(68.5, 27.5),
      text:
        'Dieselbe Bewegung lief nach Osten: über das Zagros-Gebirge und die ' +
        'iranischen Hochebenen bis in das Tal des Indus. Heilpflanzen, ' +
        'Handgriffe und Vorstellungen über Krankheit wanderten mit den ' +
        'Menschen — Wissen ist nie an einem Ort geblieben. Was in Indien ' +
        'daraus wurde, erzählt später das Kapitel über den Ayurveda.',
    },
  ],

  beschriftungen: [
    schrift('Europa', 'land', 12, 50),
    schrift('Sahara', 'land', 14, 23),
    schrift('Ägypten', 'land', 28.5, 25.5),
    schrift('Anatolien', 'land', 33, 39.2),
    schrift('Mesopotamien', 'land', 43, 34.5),
    schrift('Arabien', 'land', 45, 21),
    schrift('Indien', 'land', 78, 21),
    schrift('Nordsee', 'meer', 3.5, 56),
    schrift('Mittelmeer', 'meer', 17, 34.6),
    schrift('Schwarzes Meer', 'meer', 34, 43.4),
    schrift('Kaspisches Meer', 'meer', 51, 42.2, -70),
    schrift('Rotes Meer', 'meer', 38.4, 20.5, -55),
    schrift('Persischer Golf', 'meer', 52.5, 27.2, -30),
    schrift('Arabisches Meer', 'meer', 63, 14),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
