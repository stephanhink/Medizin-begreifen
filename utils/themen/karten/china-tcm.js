// Karte zu „China und die TCM" — Ostasien vom Tibetischen Hochland bis Japan.
//
// Wie bei Kapitel 1 stehen die Küstenlinien als echte Längen-/Breitengrade
// `[lon, lat]`; utils/karte-geo.js rechnet sie in SVG-Koordinaten um
// (Architektur-Regel: Fachlogik in utils/, ohne UI-Importe, mit blankem
// `node` prüfbar). Wer einen Punkt anzweifelt, schlägt ihn im Atlas nach —
// genau dafür sind die Rohdaten unten exportiert, und genau das prüft
// tests/karte-china-tcm.mjs nach.
//
// Was die Karte zeigen soll: dass die chinesische Medizin nicht an einem Ort
// entstand, sondern an einem Fluss — und dass ihr Wissen von dort in alle
// Richtungen wanderte: über die Seidenstraße nach Westen, über Korea nach
// Japan, und viel später über die Häfen des Südens nach Europa. Die Phasen
// spannen sich von den frühen Kulturen am Gelben Fluss über das Han-Reich
// (in dem der „Klassiker des Gelben Kaisers" zusammengestellt wurde) bis in
// die Ming-Zeit, in der die ersten europäischen Berichte entstanden.
//
// Aufbau der Landmassen: China und Korea hängen zusammen und bilden einen
// einzigen Ring, der im Westen und Norden bewusst über den Bildrand
// hinausläuft (die SVG-Fläche schneidet ihn ab) — sonst würde das Festland
// am Rand abknicken. Gelbes Meer, Bohai-Meer und das Ostchinesische Meer
// sind dadurch Lücken zwischen den Landflächen und brauchen keine eigene
// Fläche. Japan, Taiwan und Hainan sind eigene Ringe.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: vom Osttibet und der Gobi bis zur Pazifikküste
 * Japans, vom Golf von Tonkin bis an den Amur.
 */
const RAHMEN = {
  minLon: 95,
  maxLon: 147,
  minLat: 17,
  maxLat: 47,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in Kapitel 1, damit beide Karten gleich
// aussehen und gleich zu lesen sind.
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
// Die Küsten in Abschnitten — so bleiben sie lesbar und einzeln prüfbar.
// ---------------------------------------------------------------------------

/** Der Nordrand liegt bewusst außerhalb des Rahmens — die Fläche läuft aus. */
const NORDRAND = [
  [93.0, 50.5], [105.0, 52.0], [118.0, 52.0], [128.0, 51.0], [136.0, 50.5],
  [141.5, 49.5],
];

/** Die Küste am Japanischen Meer: Sichote-Alin → Wladiwostok → Tumen. */
const PRIMORJE = [
  [140.3, 48.9], [139.4, 47.8], [138.6, 46.9], [137.8, 46.1], [136.9, 45.4],
  [135.6, 44.5], [134.6, 43.9], [133.9, 43.45], [133.0, 42.85], [132.4, 43.05],
  [131.9, 43.1], [131.2, 42.7], [130.65, 42.3],
];

/** Die Ostküste Koreas: Tumen → Hamhung → Wonsan → Gangneung → Busan. */
const KOREA_OST = [
  [130.2, 42.1], [129.8, 41.75], [129.6, 41.2], [129.35, 40.66], [128.5, 40.2],
  [127.6, 39.83], [127.5, 39.5], [127.45, 39.15], [128.3, 38.6], [128.6, 38.2],
  [128.9, 37.75], [129.2, 37.45], [129.4, 36.62], [129.4, 36.05], [129.42, 35.52],
  [129.25, 35.22],
];

/** Die Süd- und Westküste Koreas: Busan → Mokpo → Incheon → Yalu. */
const KOREA_SUED_WEST = [
  [129.1, 35.15], [128.4, 34.85], [127.7, 34.75], [127.0, 34.55], [126.5, 34.32],
  [126.3, 34.62], [126.42, 34.83], [126.6, 35.22], [126.5, 35.62], [126.7, 35.98],
  [126.5, 36.42], [126.4, 36.92], [126.62, 37.4], [126.2, 37.62], [125.7, 38.03],
  [125.2, 38.7], [125.0, 39.3], [124.7, 39.85], [124.35, 40.05],
];

/** Liaodong und das Bohai-Meer: Dandong → Dalian → Tianjin → Shandong. */
const LIAODONG_BOHAI = [
  [124.0, 39.97], [123.5, 39.8], [122.9, 39.6], [122.3, 39.4], [121.6, 38.85],
  [121.15, 38.75], [121.35, 39.3], [121.85, 39.95], [122.2, 40.65], [121.9, 40.95],
  [121.1, 40.8], [120.3, 40.3], [119.6, 39.93], [118.6, 39.2], [117.75, 38.95],
  [117.55, 38.4], [118.4, 38.15], [119.05, 37.85], [119.25, 37.15], [120.3, 37.65],
  [120.75, 37.83], [121.4, 37.55], [122.1, 37.48], [122.7, 37.4], [122.5, 36.9],
  [121.5, 36.75], [120.9, 36.4], [120.42, 36.05], [119.9, 35.6], [119.55, 35.38],
  [119.2, 34.75],
];

/** Die Ostküste Chinas: Jiangsu → Jangtse-Mündung → Fujian → Perlfluss →
 *  Leizhou-Halbinsel → Golf von Tonkin. */
const OSTKUESTE_CHINA = [
  [119.8, 34.3], [120.3, 33.7], [120.6, 33.0], [120.9, 32.4], [121.4, 32.02],
  [121.85, 31.55], [121.5, 31.0], [120.9, 30.55], [120.2, 30.3], [121.2, 30.05],
  [121.62, 29.88], [121.7, 29.5], [121.4, 28.9], [121.2, 28.3], [120.9, 28.0],
  [120.5, 27.4], [120.0, 26.7], [119.6, 26.05], [119.8, 25.4], [119.0, 25.0],
  [118.6, 24.85], [118.1, 24.52], [117.6, 23.9], [117.2, 23.6], [116.7, 23.35],
  [116.0, 22.9], [115.4, 22.75], [114.7, 22.62], [114.2, 22.32], [113.8, 22.42],
  [113.55, 22.2], [113.1, 21.9], [112.5, 21.75], [111.5, 21.5], [110.9, 21.15],
  [110.5, 20.5], [110.2, 20.25], [109.9, 20.55], [109.8, 21.05], [109.4, 21.35],
  [109.1, 21.5], [108.7, 21.6], [108.1, 21.55],
];

/** Die Küste Vietnams — der Südrand läuft aus dem Bild. */
const VIETNAM = [
  [107.4, 21.0], [106.8, 20.85], [106.5, 20.25], [106.3, 19.6], [105.9, 18.9],
  [106.5, 17.8], [107.2, 16.9],
];

/** Süd- und Westrand: bewusst außerhalb des Rahmens. */
const SUEDRAND = [
  [108.5, 14.5], [104.0, 13.5], [98.0, 14.5], [93.5, 18.0],
];
const WESTRAND = [
  [93.0, 26.0], [93.0, 34.0], [93.0, 42.0],
];

/** Das Festland: China, die Mongolei, Korea und der russische Ferne Osten —
 *  ein einziger Ring, der im Westen und Norden aus dem Bild läuft. */
const FESTLAND = verbinde(
  NORDRAND,
  PRIMORJE,
  KOREA_OST,
  KOREA_SUED_WEST,
  LIAODONG_BOHAI,
  OSTKUESTE_CHINA,
  VIETNAM,
  SUEDRAND,
  WESTRAND,
);

/** Honshu — die Hauptinsel Japans, mit Tokio-Bucht und Kii-Halbinsel. */
const HONSHU = [
  [131.0, 34.0], [131.4, 34.42], [132.1, 34.9], [132.7, 35.42], [134.2, 35.53],
  [135.3, 35.5], [136.1, 35.68], [136.6, 36.6], [137.3, 37.5], [137.2, 36.85],
  [138.2, 37.2], [139.0, 37.9], [139.8, 38.9], [140.1, 39.7], [140.0, 40.2],
  [140.2, 40.8], [140.3, 41.25], [141.0, 41.2], [141.2, 41.45], [140.9, 41.55],
  [141.45, 41.4], [141.5, 40.5], [141.98, 39.6], [141.9, 39.3], [141.6, 38.9],
  [141.3, 38.4], [141.0, 38.25], [140.9, 37.8], [141.0, 37.0], [140.7, 36.6],
  [140.85, 35.7], [140.3, 35.0], [139.9, 34.92], [139.8, 35.3], [139.85, 35.62],
  [139.7, 35.3], [139.6, 35.2], [139.2, 35.18], [138.8, 34.62], [138.9, 35.02],
  [138.4, 34.65], [138.2, 34.6], [137.7, 34.63], [136.85, 34.75], [136.8, 34.5],
  [136.9, 34.3], [136.2, 34.1], [136.0, 33.7], [135.8, 33.45], [135.4, 33.7],
  [135.2, 34.2], [135.4, 34.65], [135.2, 34.72], [134.7, 34.78], [133.9, 34.6],
  [132.5, 34.35], [132.2, 34.15], [131.8, 33.95],
];

/** Hokkaido — die Nordinsel. */
const HOKKAIDO = [
  [140.7, 41.77], [140.2, 41.5], [139.9, 42.1], [140.3, 42.8], [141.0, 43.19],
  [141.3, 43.6], [141.7, 43.9], [141.7, 45.4], [141.9, 45.5], [142.6, 45.3],
  [143.5, 44.5], [144.3, 44.0], [145.3, 44.3], [145.1, 43.9], [145.6, 43.3],
  [144.4, 42.98], [143.2, 41.92], [142.0, 42.3], [141.6, 42.6], [140.97, 42.3],
  [140.6, 42.6], [140.5, 42.3],
];

/** Kyushu — die Südinsel, mit Nagasaki und Kagoshima. */
const KYUSHU = [
  [130.9, 33.9], [130.4, 33.6], [130.0, 33.5], [129.9, 33.3], [129.7, 33.2],
  [129.87, 32.75], [130.2, 32.6], [130.2, 32.2], [130.4, 32.15], [130.3, 31.8],
  [130.55, 31.6], [130.7, 31.02], [131.1, 31.5], [131.4, 31.9], [131.7, 32.6],
  [131.65, 33.2], [131.5, 33.3], [131.2, 33.6],
];

/** Shikoku. */
const SHIKOKU = [
  [134.6, 34.2], [134.6, 34.05], [134.2, 33.25], [133.5, 33.5], [133.0, 32.72],
  [132.5, 33.2], [132.7, 33.85], [133.0, 34.05], [134.05, 34.35],
];

/** Taiwan. */
const TAIWAN = [
  [121.74, 25.13], [121.9, 25.0], [121.8, 24.5], [121.6, 24.0], [121.5, 23.5],
  [121.4, 23.1], [120.85, 21.92], [120.3, 22.6], [120.1, 23.1], [120.2, 23.7],
  [120.6, 24.3], [121.0, 25.0],
];

/** Hainan. */
const HAINAN = [
  [110.32, 20.03], [110.8, 19.9], [111.0, 19.6], [110.6, 19.0], [110.0, 18.4],
  [109.5, 18.25], [108.9, 18.6], [108.6, 19.3], [109.2, 19.8],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  honshu: HONSHU,
  hokkaido: HOKKAIDO,
  kyushu: KYUSHU,
  shikoku: SHIKOKU,
  taiwan: TAIWAN,
  hainan: HAINAN,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [
  FESTLAND,
  HONSHU,
  HOKKAIDO,
  KYUSHU,
  SHIKOKU,
  TAIWAN,
  HAINAN,
];

// ---------------------------------------------------------------------------
// Wüste und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Die Gobi — nur Farbe, keine Aussage über Grenzen. */
const GOBI = [
  [96.0, 43.5], [103.0, 44.5], [110.0, 44.5], [115.0, 43.5], [113.0, 41.5],
  [106.0, 41.0], [100.0, 41.5], [96.0, 42.5],
];

/** Der Gelbe Fluss (Huang He) — die „Wiege der chinesischen Kultur",
 *  mit der großen Nordschleife um das Ordos-Plateau. */
const HUANG_HE = [
  [96.5, 34.8], [99.0, 34.6], [101.5, 35.5], [103.8, 36.05], [105.8, 37.5],
  [106.8, 38.9], [107.4, 40.3], [110.0, 40.6], [111.2, 40.4], [110.9, 38.0],
  [110.4, 35.5], [110.5, 34.8], [112.5, 34.8], [113.6, 34.75], [114.9, 35.3],
  [116.3, 36.0], [117.5, 36.8], [118.5, 37.4], [119.05, 37.85],
];

/** Der Jangtse (Chang Jiang) — der längste Fluss Asiens. */
const JANGTSE = [
  [96.0, 33.5], [97.5, 31.5], [99.0, 28.5], [100.2, 26.9], [101.5, 26.5],
  [104.0, 28.5], [105.5, 28.8], [106.6, 29.6], [109.5, 30.8], [111.3, 30.7],
  [114.3, 30.6], [116.0, 29.7], [117.0, 30.5], [118.4, 31.3], [118.8, 32.05],
  [119.4, 32.2], [120.9, 32.0], [121.85, 31.5],
];

/** Der Perlfluss (Xi Jiang) — die Schlagader des Südens. */
const PERLFLUSS = [
  [104.5, 23.6], [107.0, 23.5], [109.5, 23.3], [111.3, 23.4], [112.5, 23.3],
  [113.3, 23.1], [113.55, 22.5],
];

// ---------------------------------------------------------------------------
// Die Phasen: dreimal derselbe Raum, viertausend Jahre auseinander.
// ---------------------------------------------------------------------------

/** Phase 1 — die frühen Kulturen an den großen Flüssen. */
const ZENTRALE_EBENE = [
  [107.5, 35.2], [109.5, 36.8], [112.0, 37.2], [114.5, 36.4], [116.0, 35.4],
  [115.0, 34.0], [112.5, 33.6], [110.0, 33.8], [108.0, 34.2],
];
const SHANDONG_KULTUREN = [
  [117.2, 37.0], [119.2, 37.3], [120.8, 36.6], [120.0, 35.4], [118.2, 35.2],
  [116.9, 36.2],
];
const JANGTSE_KULTUREN = [
  [119.0, 31.5], [121.0, 31.2], [121.3, 30.2], [120.0, 29.6], [118.6, 30.4],
];

/** Phase 2 — das Han-Reich, in dem die Klassiker entstanden. */
const HAN_REICH = [
  [95.2, 40.1], [99.0, 40.5], [103.0, 41.0], [107.5, 41.3], [111.5, 41.4],
  [115.5, 41.5], [119.0, 41.3], [122.5, 41.5], [124.5, 40.3], [123.0, 39.2],
  [121.8, 37.5], [120.5, 36.0], [119.5, 34.5], [121.0, 32.2], [121.6, 30.8],
  [120.8, 28.5], [119.5, 26.2], [117.5, 23.8], [114.0, 22.4], [111.0, 21.4],
  [108.5, 21.6], [106.8, 20.6], [106.3, 18.5], [105.0, 20.5], [103.5, 22.5],
  [101.5, 24.0], [100.0, 25.5], [99.0, 27.5], [100.5, 29.5], [102.0, 31.5],
  [103.0, 33.5], [102.0, 35.5], [100.0, 37.0], [97.5, 38.5],
];
const HAN_KOMMANDANTUREN = [
  [125.0, 39.8], [126.5, 39.5], [127.5, 39.0], [126.8, 38.2], [125.5, 38.4],
  [124.8, 39.0],
];

/** Phase 3 — das Reich der Ming, als die ersten Berichte nach Europa gingen. */
const MING_REICH = [
  [98.5, 39.8], [103.0, 39.5], [107.0, 39.0], [110.0, 40.3], [114.0, 40.5],
  [117.0, 40.8], [120.0, 40.3], [123.0, 41.3], [125.0, 40.2], [123.5, 39.3],
  [122.0, 37.5], [120.5, 36.0], [119.0, 34.5], [121.5, 31.5], [121.0, 28.5],
  [119.0, 26.0], [117.0, 23.5], [113.5, 22.2], [110.5, 21.2], [108.2, 21.5],
  [106.0, 22.5], [104.0, 23.0], [102.0, 23.5], [100.0, 24.0], [98.5, 25.5],
  [98.0, 28.0], [99.5, 30.0], [101.0, 32.0], [103.5, 33.5], [104.0, 36.0],
  [102.0, 37.5], [100.0, 38.5],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(FESTLAND),
    land(HONSHU),
    land(HOKKAIDO),
    land(KYUSHU),
    land(SHIKOKU),
    land(TAIWAN),
    land(HAINAN),
    wueste(GOBI),
    fluss(HUANG_HE),
    fluss(JANGTSE),
    fluss(PERLFLUSS),
  ],

  phasen: [
    {
      id: 'fruehe-kulturen',
      label: '~2000 v. Chr.: die frühen Kulturen am Gelben Fluss',
      hinweis:
        'Am Gelben Fluss und am Jangtse entstehen Dörfer, Städte und die ' +
        'erste Schrift. Aus dieser Zeit stammen die ältesten Nachrichten ' +
        'über Krankheit in China: Fragen an die Ahnen, in Knochen geritzt.',
      flaechen: [
        { titel: 'Die Zentrale Ebene am Gelben Fluss', d: P.pfad(ZENTRALE_EBENE) },
        { titel: 'Die Kulturen der Halbinsel Shandong', d: P.pfad(SHANDONG_KULTUREN) },
        { titel: 'Die Reisbauern am unteren Jangtse', d: P.pfad(JANGTSE_KULTUREN) },
      ],
    },
    {
      id: 'han-reich',
      label: '~2. Jh. v. Chr.: das Han-Reich',
      hinweis:
        'Im Han-Reich wird gesammelt und geordnet: Der „Klassiker des Gelben ' +
        'Kaisers" und das Arzneibuch des Shennong entstehen. Nach Westen ' +
        'öffnet sich die Seidenstraße — sie führt weit über den Bildrand hinaus.',
      flaechen: [
        { titel: 'Das Han-Reich um 100 v. Chr.', d: P.pfad(HAN_REICH) },
        { titel: 'Die Han-Kommandanturen in Korea', d: P.pfad(HAN_KOMMANDANTUREN) },
      ],
    },
    {
      id: 'ming-zeit',
      label: '~16. Jh.: die Ming-Zeit',
      hinweis:
        'Li Shizhen stellt 1578 sein großes Arzneibuch fertig. Zur selben ' +
        'Zeit legen europäische Schiffe in Kanton und Macau an — von dort ' +
        'gehen die ersten Berichte über Nadeln und Pulsfühlen nach Europa.',
      flaechen: [
        { titel: 'Das Reich der Ming', d: P.pfad(MING_REICH) },
      ],
    },
  ],

  punkte: [
    {
      id: 'anyang',
      name: 'Anyang',
      typ: 'ereignis',
      ...ort(114.35, 36.1),
      text:
        'Hier stand die letzte Hauptstadt der Shang-Zeit (um 1200 v. Chr.). ' +
        'In den Ruinen fand man Zehntausende beschriftete Schulterblätter und ' +
        'Schildkrötenpanzer: Orakelknochen. Auf ihnen stehen die ältesten ' +
        'bekannten Sätze über Krankheit in China — „Zahnschmerz", ' +
        '„Kopfschmerz", „Wird die Krankheit vergehen?". Gefragt wurden die ' +
        'Ahnen, nicht der Arzt. Die Heilkunde beginnt in China als Gespräch ' +
        'mit den Toten.',
    },
    {
      id: 'xian',
      name: 'Xi’an (Chang’an)',
      typ: 'stadt',
      ...ort(108.94, 34.27),
      text:
        'Als Chang’an war die Stadt Hauptstadt der Han und der Tang — und der ' +
        'östliche Ausgangspunkt der Seidenstraße. In der Han-Zeit wurde hier ' +
        'zusammengestellt, was bis heute die Grundlage der chinesischen ' +
        'Medizin ist: der „Klassiker des Gelben Kaisers zum Inneren". In ' +
        'einem Grab bei Changsha fand man Schriftrollen, die noch älter sind ' +
        'und die Leitbahnen bereits kennen — allerdings ohne Nadeln.',
    },
    {
      id: 'luoyang',
      name: 'Luoyang',
      typ: 'stadt',
      ...ort(112.45, 34.62),
      text:
        'Die zweite große Hauptstadt der Han-Zeit. In diesen Jahrhunderten ' +
        'schreibt Zhang Zhongjing seine „Abhandlung über Kälte-Schäden" — ' +
        'ein Buch, das nicht mehr nur Rezepte aufzählt, sondern Krankheiten ' +
        'nach Stadien ordnet und für jedes Stadium eine Rezeptur nennt. Von ' +
        'hier aus ging das Wissen über Korea weiter nach Japan, wo daraus ' +
        'die Kampō-Medizin wurde.',
    },
    {
      id: 'qichun',
      name: 'Qichun',
      typ: 'ereignis',
      ...ort(115.43, 30.24),
      text:
        'Der Heimatort von Li Shizhen (1518–1593). Siebenundzwanzig Jahre ' +
        'lang sammelte er, prüfte nach, verwarf und ordnete — heraus kam das ' +
        '„Bencao Gangmu", 1578 fertig: 1892 Arzneien, über 11 000 Rezepte, ' +
        'mit Zeichnungen. Er strich auch: Unsinniges, Abergläubisches und ' +
        'Gefährliches aus älteren Büchern. Das Werk gilt bis heute als das ' +
        'größte Arzneibuch der alten Welt.',
    },
    {
      id: 'guangzhou',
      name: 'Guangzhou (Kanton)',
      typ: 'stadt',
      ...ort(113.26, 23.13),
      text:
        'Der große Hafen des Südens, jahrhundertelang das einzige Tor für ' +
        'europäische Schiffe. Über Kanton und das nahe Macau kamen die ersten ' +
        'Nachrichten über chinesische Heilkunst nach Europa: Jesuiten ' +
        'übersetzten Texte über das Pulsfühlen, Kaufleute berichteten von ' +
        'Nadeln und brennenden Kräuterkegeln. Verstanden wurde davon zunächst ' +
        'wenig — bestaunt dafür umso mehr.',
    },
    {
      id: 'peking',
      name: 'Peking',
      typ: 'stadt',
      ...ort(116.4, 39.9),
      text:
        'Heute das Zentrum der chinesischen Medizin: Hier stehen große ' +
        'TCM-Universitäten und Kliniken, in denen Kräuterrezepturen und ' +
        'Akupunktur neben Röntgengeräten und Laborwerten stehen. In China ' +
        'sind beide Medizinen staatlich anerkannt; viele Kranke bekommen ' +
        'beides. Die heutige, geordnete Gestalt der „TCM" ist allerdings ' +
        'jung — sie entstand in den 1950er Jahren.',
    },
  ],

  bewegungen: [
    {
      id: 'seidenstrasse',
      name: 'Die Seidenstraße nach Westen',
      von: station(108.94, 34.27),
      ueber: [station(103.8, 36.05), station(99.0, 38.6)],
      nach: station(95.4, 40.2),
      text:
        'Von Chang’an zogen die Karawanen nach Westen — und mit den Waren ' +
        'reiste Wissen. Aus Persien und Indien kamen Arzneipflanzen nach ' +
        'China, aus China gingen Zimt, Rhabarber und Ingwer in die andere ' +
        'Richtung; Rhabarberwurzel war jahrhundertelang eine der ' +
        'begehrtesten Arzneien Europas. Der Weg führt weit über den Bildrand ' +
        'hinaus: bis nach Samarkand, Bagdad und ans Mittelmeer.',
    },
    {
      id: 'nach-korea-und-japan',
      name: 'Über Korea nach Japan',
      von: station(112.45, 34.62),
      ueber: [station(122.0, 36.6), station(127.5, 36.5)],
      nach: station(135.8, 34.68),
      text:
        'Im 6. und 7. Jahrhundert brachten Mönche und Gesandte die ' +
        'chinesischen Arzneibücher über Korea nach Japan. Dort wuchs daraus ' +
        'eine eigene Tradition: die Kampō-Medizin, die bis heute praktiziert ' +
        'wird — mit denselben Rezepturen, aber schlanker dosiert und anders ' +
        'begründet. Wissen bleibt selten so, wie es ankommt.',
    },
    {
      id: 'berichte-nach-europa',
      name: 'Die ersten Berichte nach Europa',
      von: station(113.26, 23.13),
      ueber: [station(111.0, 20.0)],
      nach: station(107.0, 17.6),
      text:
        'Vom 16. Jahrhundert an nahmen portugiesische, niederländische und ' +
        'jesuitische Reisende mit, was sie in China gesehen hatten. Das Wort ' +
        '„Akupunktur" selbst ist europäisch: Der niederländische Arzt Willem ' +
        'ten Rhijne prägte es 1683 aus dem Lateinischen — er hatte die ' +
        'Nadeln allerdings in Japan gesehen, nicht in China. So kam die ' +
        'Kunde nach Westen: aus zweiter Hand und in fremden Worten.',
    },
  ],

  beschriftungen: [
    schrift('China', 'land', 106.5, 33.0),
    schrift('Tibet', 'land', 97.0, 31.5),
    schrift('Wüste Gobi', 'land', 105.0, 43.0),
    schrift('Korea', 'land', 127.6, 37.2, -60),
    schrift('Japan', 'land', 138.5, 36.4, -40),
    schrift('Gelber Fluss', 'meer', 112.0, 37.4, -18),
    schrift('Jangtse', 'meer', 112.5, 30.2),
    schrift('Gelbes Meer', 'meer', 123.0, 35.2),
    schrift('Ostchinesisches Meer', 'meer', 125.5, 29.5),
    schrift('Südchinesisches Meer', 'meer', 114.5, 18.5),
    schrift('Japanisches Meer', 'meer', 134.5, 39.8),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
