// Karte zu „Indien und der Ayurveda" — der Subkontinent vom Indus bis Burma.
//
// Wie in den Kapiteln 1 und 2 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-indien-ayurveda.mjs nach.
//
// Was die Karte zeigen soll: dass der Ayurveda einen Raum hat, keinen Ort.
// Die Phasen wandern von den Bäderstädten am Indus über die vedischen
// Siedlungsgebiete am oberen Ganges zu den Schulen der klassischen Zeit —
// und enden bei dem Land, das seine alte Medizin heute staatlich
// unterrichtet. Der Himalaya im Norden ist dabei keine Kulisse, sondern
// Rohstofflager: Von dort kamen und kommen viele Arzneipflanzen.
//
// Aufbau der Landmassen: Der Subkontinent hängt an Asien, deshalb ist das
// Festland ein einziger Ring, der im Westen, Norden und Osten bewusst über
// den Bildrand hinausläuft (die SVG-Fläche schneidet ihn ab). Arabisches
// Meer, Golf von Bengalen und der offene Indische Ozean sind dadurch das,
// was außerhalb dieses Rings liegt, und brauchen keine eigene Fläche.
// Sri Lanka ist ein eigener Ring — sonst wäre die Palkstraße zugewachsen.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von der Makran-Küste bis nach Hinterindien, von der
 * Südspitze Sri Lankas bis über den Himalaya-Hauptkamm.
 */
const RAHMEN = {
  minLon: 60,
  maxLon: 98,
  minLat: 5,
  maxLat: 37,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 und 2, damit alle Karten
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

/** Ein Hochgebirgsband — dunkler als das Land, damit der Himalaya trägt. */
function gebirge(orte) {
  return {
    art: 'gebirge',
    d: P.pfad(orte),
    fill: KARTENFARBEN.landRand,
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
// mehrfach verwendbar: Dieselben Abschnitte tragen die Landmasse UND die
// Fläche der letzten Phase (der Subkontinent von heute).
// ---------------------------------------------------------------------------

/** Makran: Straße von Hormus → Belutschistan → Karatschi → Indusmündung.
 *  Der Anfang liegt bewusst westlich des Rahmens. */
const MAKRAN = [
  [56.0, 27.0], [57.8, 25.6], [60.6, 25.3], [62.3, 25.1], [64.5, 25.2],
  [66.0, 25.2], [66.7, 25.0], [67.0, 24.85], [67.4, 24.1],
];

/** Gujarat: Rann von Kachchh → Golf von Kachchh → Kathiawar → Golf von
 *  Khambhat → Daman. Zwei tiefe Buchten, beide nach Westen offen. */
const GUJARAT = [
  [67.4, 24.1], [68.3, 23.9], [68.7, 23.7], [69.8, 22.9], [70.3, 22.8],
  [69.7, 22.5], [69.07, 22.47], [69.6, 21.63], [70.37, 20.9], [70.98, 20.71],
  [71.5, 20.9], [72.15, 21.77], [72.6, 22.3], [72.9, 21.6], [72.8, 21.2],
  [72.83, 20.42],
];

/** Die Westküste: Daman → Mumbai → Goa → Malabar → Kap Komorin. */
const WESTKUESTE = [
  [72.83, 20.42], [72.87, 19.6], [72.87, 18.94], [73.1, 17.9], [73.3, 16.99],
  [73.8, 15.5], [74.13, 14.8], [74.5, 13.8], [74.85, 12.87], [75.4, 11.9],
  [75.78, 11.25], [76.27, 9.97], [76.6, 8.88], [77.1, 8.3], [77.54, 8.08],
];

/** Die Ostküste: Kap Komorin → Palkbucht → Chennai → Vizag → Odisha →
 *  Hugli-Mündung. */
const OSTKUESTE = [
  [77.54, 8.08], [78.13, 8.8], [79.0, 9.2], [79.3, 9.28], [79.12, 9.4],
  [78.95, 9.7], [79.2, 10.05], [79.5, 10.2], [79.86, 10.29], [79.84, 10.92],
  [79.83, 11.93], [80.1, 12.6], [80.29, 13.08], [80.15, 14.0], [80.13, 15.0],
  [80.6, 15.7], [81.14, 16.17], [82.28, 16.94], [82.9, 17.3], [83.3, 17.7],
  [84.13, 18.33], [84.9, 19.27], [85.83, 19.8], [86.6, 20.32], [86.9, 20.8],
  [87.5, 21.6],
];

/** Das große Delta: Hugli → Sundarbans → Meghna-Mündung → Chittagong. */
const DELTA = [
  [87.5, 21.6], [88.05, 21.65], [88.6, 21.55], [89.2, 21.75], [90.0, 21.9],
  [90.6, 22.1], [90.8, 22.3], [91.3, 22.5], [91.83, 22.33], [92.0, 21.6],
];

/** Arakan und Tenasserim: Cox’s Bazar → Sittwe → Irawadi-Delta → Süden. */
const ARAKAN_TENASSERIM = [
  [92.0, 21.6], [92.0, 21.0], [92.6, 20.6], [92.9, 20.15], [93.5, 19.3],
  [94.0, 18.3], [94.4, 17.5], [94.7, 16.1], [95.3, 15.8], [96.0, 16.3],
  [96.5, 16.4], [97.2, 16.5], [97.6, 16.2], [98.0, 14.8], [98.3, 13.5],
];

/** Ost-, Nord- und Westrand: bewusst außerhalb des Rahmens. */
const OSTRAND = [
  [99.5, 13.0], [100.0, 20.0], [100.0, 28.0], [99.5, 34.0], [99.0, 39.0],
];
const NORDRAND = [
  [90.0, 40.0], [80.0, 40.5], [70.0, 40.5], [62.0, 39.5],
];
const WESTRAND = [
  [55.5, 36.0], [55.0, 31.0], [55.5, 28.0],
];

/** Das Festland — ein einziger Ring: der Subkontinent hängt an Asien. */
const FESTLAND = verbinde(
  MAKRAN,
  GUJARAT,
  WESTKUESTE,
  OSTKUESTE,
  DELTA,
  ARAKAN_TENASSERIM,
  OSTRAND,
  NORDRAND,
  WESTRAND,
);

/** Sri Lanka — eigener Ring, sonst wäre die Palkstraße zugewachsen. */
const SRI_LANKA = [
  [80.05, 9.55], [80.8, 9.3], [81.25, 8.55], [81.85, 7.35], [81.6, 6.6],
  [80.9, 6.0], [80.2, 6.0], [79.85, 6.85], [79.7, 7.9], [79.85, 8.9],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  sriLanka: SRI_LANKA,
  makran: MAKRAN,
  gujarat: GUJARAT,
  westkueste: WESTKUESTE,
  ostkueste: OSTKUESTE,
  delta: DELTA,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [
  FESTLAND,
  SRI_LANKA,
];

// ---------------------------------------------------------------------------
// Gebirge, Wüste und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Der Himalaya-Bogen: von Kaschmir bis Assam. Quelle vieler Arzneipflanzen. */
const HIMALAYA = [
  [73.5, 34.6], [76.5, 33.2], [79.0, 31.6], [81.5, 30.4], [84.0, 29.4],
  [87.0, 28.4], [89.5, 28.2], [92.0, 28.4], [95.0, 28.6], [95.2, 27.9],
  [92.0, 27.4], [89.5, 27.2], [87.0, 27.4], [84.0, 28.3], [81.0, 29.3],
  [78.5, 30.5], [76.0, 32.2], [73.5, 33.7],
];

/** Die Thar — die Wüste zwischen Indus und Aravalli. */
const THAR = [
  [68.8, 24.6], [70.0, 26.8], [71.5, 28.8], [73.5, 29.6], [75.0, 28.4],
  [74.5, 26.4], [73.0, 24.8], [71.0, 23.9], [69.6, 23.8],
];

/** Der Indus: aus Westtibet über Ladakh und den Pandschab zum Meer. */
const INDUS = [
  [80.5, 32.5], [78.5, 33.6], [77.6, 34.15], [75.0, 34.9], [72.8, 34.2],
  [72.2, 33.9], [71.5, 32.9], [70.9, 30.9], [70.4, 29.5], [68.9, 27.7],
  [68.4, 25.4], [67.6, 24.2],
];

/** Der Ganges: von Gangotri über Varanasi und Patna in das große Delta. */
const GANGES = [
  [78.9, 30.9], [78.16, 29.95], [79.4, 28.4], [80.35, 26.47], [81.85, 25.45],
  [83.0, 25.32], [84.5, 25.5], [85.14, 25.6], [86.5, 25.2], [87.9, 24.8],
  [88.5, 24.2], [89.3, 23.8], [90.2, 23.4], [90.6, 22.6],
];

/** Der Brahmaputra: aus Tibet um das Ostende des Himalaya nach Bengalen. */
const BRAHMAPUTRA = [
  [95.4, 28.1], [94.2, 27.7], [92.5, 26.8], [90.5, 26.1], [89.7, 25.4],
  [89.9, 24.4], [90.3, 23.6],
];

/** Die Narmada — der Fluss, der den Norden vom Dekkan trennt. */
const NARMADA = [
  [81.7, 22.7], [79.5, 22.9], [77.5, 22.6], [75.5, 22.2], [73.8, 21.9],
  [72.8, 21.7],
];

/** Die Godavari — die Lebensader des Dekkan. */
const GODAVARI = [
  [73.55, 19.93], [75.5, 19.5], [77.5, 19.0], [79.5, 18.9], [81.0, 17.9],
  [82.28, 16.94],
];

// ---------------------------------------------------------------------------
// Die Phasen: viermal derselbe Raum, viereinhalbtausend Jahre auseinander.
// ---------------------------------------------------------------------------

/** Phase 1 — die Städte am Indus (Harappa, Mohenjo-Daro). */
const INDUSTAL = [
  [67.3, 24.5], [68.5, 25.6], [69.3, 27.0], [70.5, 28.5], [71.8, 30.0],
  [73.2, 31.4], [74.3, 31.8], [74.0, 30.4], [72.5, 29.0], [71.0, 27.4],
  [69.8, 26.0], [68.4, 24.4],
];
const GUJARAT_HAFENSTAEDTE = [
  [70.0, 23.6], [71.6, 23.6], [72.6, 22.6], [71.6, 21.8], [70.2, 22.3],
  [69.3, 22.9],
];

/** Phase 2 — die vedische Zeit: der Pandschab und das Ganges-Doab. */
const SAPTA_SINDHU = [
  [71.5, 30.5], [73.5, 32.0], [76.0, 32.0], [77.5, 30.5], [76.5, 29.0],
  [74.0, 28.5], [72.0, 29.0],
];
const KURU_PANCHALA = [
  [77.0, 29.5], [79.5, 28.5], [82.0, 26.6], [81.5, 25.3], [79.0, 26.5],
  [77.0, 28.0],
];

/** Phase 3 — die klassische Zeit: Gandhara, Magadha/Kashi, der Süden. */
const GANDHARA = [
  [70.5, 33.0], [72.0, 34.5], [74.0, 34.5], [74.5, 33.0], [73.0, 32.0],
  [71.0, 32.0],
];
const MAGADHA_KASHI = [
  [81.8, 26.4], [85.0, 26.5], [87.0, 25.5], [86.0, 24.0], [83.5, 24.0],
  [81.6, 25.0],
];
const SUEDLICHE_SCHULEN = [
  [75.0, 12.2], [78.0, 12.6], [79.6, 11.0], [78.5, 9.0], [76.5, 9.0],
  [75.2, 10.6],
];

/** Phase 4 — der Subkontinent von heute: dieselben Küsten, dazu eine grobe
 *  Linie am Fuß des Himalaya. */
const HIMALAYA_FUSS = [
  [92.0, 21.8], [92.5, 23.5], [92.3, 25.2], [90.0, 26.3], [88.0, 26.7],
  [85.0, 27.3], [82.0, 28.3], [80.0, 28.9], [77.5, 30.6], [75.5, 32.4],
  [74.2, 34.4], [73.0, 34.6], [71.5, 33.0], [70.4, 30.2], [70.0, 28.0],
  [69.0, 26.0], [68.0, 24.6],
];
const SUBKONTINENT = verbinde(
  GUJARAT,
  WESTKUESTE,
  OSTKUESTE,
  DELTA,
  HIMALAYA_FUSS,
);

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(FESTLAND),
    land(SRI_LANKA),
    gebirge(HIMALAYA),
    wueste(THAR),
    fluss(INDUS),
    fluss(GANGES),
    fluss(BRAHMAPUTRA),
    fluss(NARMADA),
    fluss(GODAVARI),
  ],

  phasen: [
    {
      id: 'indus-kultur',
      label: '~2500 v. Chr.: die Städte am Indus',
      hinweis:
        'Harappa und Mohenjo-Daro haben gemauerte Bäder, Brunnen in fast ' +
        'jedem Haus und Abwasserkanäle unter den Straßen — Hygiene als ' +
        'Stadtplanung, zweitausend Jahre vor Rom. Wie diese Menschen ihre ' +
        'Kranken behandelten, weiß niemand: Ihre Schrift ist bis heute nicht ' +
        'entziffert.',
      flaechen: [
        { titel: 'Die Städte im Industal', d: P.pfad(INDUSTAL) },
        { titel: 'Die Hafenstädte in Gujarat (Lothal, Dholavira)', d: P.pfad(GUJARAT_HAFENSTAEDTE) },
      ],
    },
    {
      id: 'vedische-zeit',
      label: '~1500–800 v. Chr.: die vedische Zeit',
      hinweis:
        'Im Pandschab und am oberen Ganges entstehen die Veden. Im ' +
        'Atharvaveda stehen Beschwörungen gegen Fieber und Würmer neben ' +
        'Rezepten aus Heilpflanzen — beides nebeneinander, ohne Widerspruch. ' +
        'Aus dieser Schicht wächst der Ayurveda heraus.',
      flaechen: [
        { titel: 'Sapta Sindhu — das Land der sieben Ströme', d: P.pfad(SAPTA_SINDHU) },
        { titel: 'Das Doab von Kuru und Panchala', d: P.pfad(KURU_PANCHALA) },
      ],
    },
    {
      id: 'klassische-lehrschriften',
      label: '~400 v. Chr. – 600 n. Chr.: Charaka und Sushruta',
      hinweis:
        'Die großen Lehrbücher entstehen: die Charaka Samhita über die innere ' +
        'Medizin, die Sushruta Samhita über die Chirurgie mit über 300 ' +
        'Eingriffen. Gelehrt wird in Takshashila im Nordwesten, in Kashi am ' +
        'Ganges und später in Nalanda — und der Süden entwickelt eigene ' +
        'Schulen.',
      flaechen: [
        { titel: 'Gandhara mit Takshashila', d: P.pfad(GANDHARA) },
        { titel: 'Magadha und Kashi am Ganges', d: P.pfad(MAGADHA_KASHI) },
        { titel: 'Die Schulen des Südens', d: P.pfad(SUEDLICHE_SCHULEN) },
      ],
    },
    {
      id: 'kolonialzeit-und-ayush',
      label: '19./20. Jh.: Kolonialzeit und Wiederentdeckung (AYUSH)',
      hinweis:
        'Ab 1835 fördert die britische Verwaltung nur noch die europäische ' +
        'Medizin; der Ayurveda verliert Schulen, Geld und Ansehen. Nach der ' +
        'Unabhängigkeit wird er wieder aufgebaut: eigene Hochschulen, ein ' +
        'fünfeinhalbjähriges Studium, seit 2014 ein eigenes Ministerium ' +
        '(AYUSH) — und seit 2022 ein WHO-Zentrum für traditionelle Medizin ' +
        'in Jamnagar.',
      flaechen: [
        { titel: 'Der Subkontinent heute', d: P.pfad(SUBKONTINENT) },
        { titel: 'Sri Lanka', d: P.pfad(SRI_LANKA) },
      ],
    },
  ],

  punkte: [
    {
      id: 'mohenjo-daro',
      name: 'Mohenjo-Daro',
      typ: 'ereignis',
      ...ort(68.14, 27.33),
      text:
        'Um 2500 v. Chr. stand hier eine Stadt aus gebrannten Ziegeln, mit ' +
        'einem großen gemauerten Bad, Brunnen in fast jedem Haus und ' +
        'Abwasserkanälen unter den Straßen. Reinheit war offenbar wichtig — ' +
        'ob als Hygiene, als Ritual oder als beides zugleich, lässt sich ' +
        'nicht sagen: Die Schrift der Indus-Kultur ist bis heute nicht ' +
        'entziffert. Die Steine reden, die Bücher fehlen.',
    },
    {
      id: 'takshashila',
      name: 'Takshashila (Taxila)',
      typ: 'stadt',
      ...ort(72.83, 33.74),
      text:
        'Eine der ältesten Lehrstätten der Welt, im Nordwesten am Rand der ' +
        'Handelswege nach Persien. Wer hier Medizin studierte, blieb der ' +
        'Überlieferung nach sieben Jahre. Von Jivaka, dem berühmtesten ' +
        'Schüler, erzählen die buddhistischen Texte: Er soll den Buddha ' +
        'behandelt haben. Auch Charaka wird mit dieser Gegend verbunden — ' +
        'hier trafen indisches, persisches und griechisches Wissen aufeinander.',
    },
    {
      id: 'varanasi',
      name: 'Varanasi (Kashi, Benares)',
      typ: 'stadt',
      ...ort(83.0, 25.32),
      text:
        'Die heilige Stadt am Ganges gilt der Überlieferung nach als Heimat ' +
        'der Chirurgie: Sushruta soll hier bei Divodasa Dhanvantari, dem ' +
        'König von Kashi, gelernt haben. In der Sushruta Samhita stehen über ' +
        '300 Eingriffe und mehr als 100 Instrumente — Star-Operationen am ' +
        'Auge, Steinschnitte, Bruchbehandlung und die Wiederherstellung ' +
        'abgeschnittener Nasen aus einem Stück Stirnhaut.',
    },
    {
      id: 'pataliputra',
      name: 'Pataliputra (Patna)',
      typ: 'ereignis',
      ...ort(85.14, 25.6),
      text:
        'Die Hauptstadt des Maurya-Reiches. Kaiser Ashoka ließ um 250 v. Chr. ' +
        'in Stein meißeln, er habe überall Heilkräuter anpflanzen und ' +
        'Behandlung einrichten lassen — „für Menschen und für Tiere". Das ' +
        'gilt als einer der ältesten Belege für ein öffentlich gestütztes ' +
        'Gesundheitswesen. Nicht weit entfernt lag Nalanda, wo später auch ' +
        'Medizin gelehrt wurde.',
    },
    {
      id: 'himalaya-kraeuter',
      name: 'Der Himalaya-Rand',
      typ: 'grenze',
      ...ort(79.0, 30.3),
      text:
        'Aus den Tälern des Himalaya kommt ein großer Teil der ' +
        'ayurvedischen Arzneipflanzen — die Sammler steigen dafür bis über ' +
        'die Baumgrenze. Im Ramayana fliegt Hanuman in diese Berge, um ein ' +
        'lebensrettendes Kraut zu holen, und trägt am Ende den ganzen Gipfel ' +
        'davon. Heute ist der Nachschub ein Problem: Mehrere begehrte ' +
        'Wildpflanzen sind durch Übernutzung selten geworden.',
    },
    {
      id: 'jamnagar',
      name: 'Jamnagar',
      typ: 'stadt',
      ...ort(70.07, 22.47),
      text:
        'In dieser Stadt in Gujarat steht seit 1967 die erste Universität, ' +
        'die ausschließlich Ayurveda lehrt. Wer dort das reguläre Studium ' +
        'abschließt, hat fünfeinhalb Jahre studiert — mit Anatomie, ' +
        'Pharmakologie und klinischer Ausbildung neben den klassischen ' +
        'Texten. 2022 eröffnete hier außerdem das Globale Zentrum der ' +
        'Weltgesundheitsorganisation für traditionelle Medizin.',
    },
    {
      id: 'kottakkal',
      name: 'Kottakkal (Kerala)',
      typ: 'stadt',
      ...ort(76.0, 10.99),
      text:
        'Kerala ist heute das Schaufenster des Ayurveda: In Kottakkal ' +
        'arbeitet seit 1902 eine der bekanntesten Arzneimanufakturen und ' +
        'Kliniken des Landes, ringsum liegen Häuser für Panchakarma-Kuren. ' +
        'Beides gehört zusammen und ist doch nicht dasselbe — die Klinik ' +
        'behandelt Kranke, der Kurbetrieb bedient auch Gäste, die vor allem ' +
        'Erholung suchen. Ayurveda ist hier Medizin und Wirtschaftszweig.',
    },
  ],

  bewegungen: [
    {
      id: 'nach-westen',
      name: 'Nach Westen: Übersetzungen ins Persische und Arabische',
      von: station(83.0, 25.32),
      ueber: [station(77.0, 29.5), station(72.83, 33.74)],
      nach: station(62.0, 34.5),
      text:
        'Über Gandhara zogen indische Bücher nach Westen. Im 8. und 9. ' +
        'Jahrhundert ließen die Kalifen von Bagdad indische Ärzte kommen und ' +
        'medizinische Werke übersetzen; Rezepte und Arzneipflanzen aus ' +
        'Indien tauchen danach in der arabischen Medizin auf. Das Wissen ' +
        'reiste weiter, als die Karte reicht — bis in die Bücher, aus denen ' +
        'später Europa lernte.',
    },
    {
      id: 'mit-dem-buddhismus-nach-sueden',
      name: 'Mit dem Buddhismus nach Süden',
      von: station(85.14, 25.6),
      ueber: [station(82.0, 16.0)],
      nach: station(80.4, 8.35),
      text:
        'Buddhistische Mönche brachten von Pataliputra aus nicht nur eine ' +
        'Lehre, sondern auch Krankenpflege und Arzneikunde nach Sri Lanka. ' +
        'Aus den Ruinen von Mihintale kennt man Reste eines Klosterspitals ' +
        'samt steinerner Wanne für Ölbehandlungen. Auf der Insel wird ' +
        'Ayurveda bis heute praktiziert und staatlich unterrichtet.',
    },
    {
      id: 'die-nase-nach-europa',
      name: 'Die indische Nasenoperation nach Europa',
      von: station(73.86, 18.52),
      ueber: [station(72.87, 18.94)],
      nach: station(60.5, 26.0),
      text:
        '1794 berichtete eine britische Zeitschrift von einem Mann bei Pune, ' +
        'dem indische Wundärzte die abgeschnittene Nase aus einem Stirnlappen ' +
        'neu gebildet hatten — ein Verfahren, das schon in der Sushruta ' +
        'Samhita beschrieben ist. Zwanzig Jahre später führte ein Londoner ' +
        'Chirurg die Operation nach diesem Bericht aus. Sie heißt in der ' +
        'Fachsprache bis heute „indische Methode".',
    },
  ],

  beschriftungen: [
    schrift('Arabisches Meer', 'meer', 65.5, 17.0),
    schrift('Golf von Bengalen', 'meer', 88.5, 15.0),
    schrift('Indischer Ozean', 'meer', 74.0, 6.5),
    schrift('Ganges', 'meer', 80.6, 27.0, -22),
    schrift('Indus', 'meer', 69.6, 27.6, -70),
    schrift('Himalaya', 'land', 82.0, 31.4, -12),
    schrift('Dekkan', 'land', 77.5, 17.5),
    schrift('Thar-Wüste', 'land', 71.6, 26.5),
    schrift('Sri Lanka', 'land', 80.9, 7.4),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
