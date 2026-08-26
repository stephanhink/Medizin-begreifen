// Karte zu „Röntgen und Penicillin" — Mitteleuropa und England, 1895–1945.
//
// Wie in den Kapiteln 1 bis 11 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-roentgen-penicillin.mjs nach.
//
// Was die Karte zeigen soll: zwei Zufälle, dreiunddreißig Jahre und rund
// tausend Kilometer voneinander entfernt. Im Osten des Blattes Würzburg am
// Main, wo am 8. November 1895 ein verhüllter Glaskolben einen Schirm zum
// Leuchten brachte; von dort führt die Nachricht binnen Wochen nach Berlin
// und um die Welt. Im Westen London, wo Ende September 1928 eine vergessene
// Petrischale verschimmelte, und Oxford, wo aus diesem Schimmel elf Jahre
// später ein Arzneimittel wurde. Dazwischen liegt Hamburg mit dem Ehrenmal
// der Radiologie — der Stein, auf dem die Namen derer stehen, die den Preis
// der Strahlen bezahlt haben.
//
// Deshalb dieser Ausschnitt: von der Keltischen See westlich Cornwalls bis
// nach Böhmen, von der französischen Atlantikküste und dem Alpenbogen bis an
// die Elbmündung. Er reicht im Osten weit genug für Berlin und im Westen
// weit genug, dass der Weg des Penicillins über den Atlantik das Blatt
// verlassen kann.
//
// Aufbau der Landmassen: das Festland als ein Ring (Frankreich, die
// Niederlande, die deutsche Nordseeküste; im Norden, Osten und Süden
// außerhalb des Rahmens geschlossen, damit die Fläche ausläuft statt am
// Bildrand abzuknicken) und Großbritannien als zweiter Ring (im Norden
// oberhalb des Rahmens geschlossen). Irland liegt vollständig westlich des
// Ausschnitts und fehlt deshalb.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von Cornwall bis Böhmen, von den Alpen bis an die
 * Elbmündung.
 */
const RAHMEN = {
  minLon: -5.5,
  maxLon: 14.5,
  minLat: 45.8,
  maxLat: 53.8,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 11, damit alle Karten
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
 * Die Normandie gehört auf dieses Blatt, weil am 6. Juni 1944 an ihren
 * Stränden zum ersten Mal ein Heer landete, das Penicillin im Gepäck hatte.
 */
const FRANKREICH_ATLANTIK = [
  [-1.1, 45.0], [-1.06, 45.57], [-1.15, 46.16], [-1.78, 46.5], [-2.2, 47.28],
  [-2.55, 47.5], [-3.12, 47.48], [-3.92, 47.87], [-4.73, 48.04],
  [-4.77, 48.36], [-4.56, 48.6], [-3.44, 48.82], [-2.46, 48.63],
  [-1.5, 48.65], [-1.6, 48.84], [-1.94, 49.72], [-1.26, 49.68],
  [-1.1, 49.4], [-0.4, 49.35], [0.11, 49.49],
];

/** Dieppe → Calais → Flandern → Holland → Deutsche Bucht → Elbmündung. */
const KANAL_UND_NORDSEE = [
  [1.08, 49.93], [1.55, 50.22], [1.6, 50.72], [1.85, 50.96], [2.37, 51.03],
  [2.92, 51.23], [3.4, 51.42], [3.7, 51.55], [4.12, 51.98], [4.55, 52.46],
  [4.75, 52.96], [5.4, 53.3], [6.2, 53.45], [7.0, 53.4], [8.15, 53.55],
  [8.5, 53.6], [8.9, 53.88],
];

/** Der Nord-, Ost- und Südrand: bewusst außerhalb des Rahmens. */
const FESTLAND_RAND = [
  [9.6, 54.3], [15.5, 54.3], [15.5, 45.0], [-1.2, 45.0],
];

/** Der große Ring: Frankreich, die Niederlande, die deutsche Nordseeküste. */
const FESTLAND = verbinde(
  FRANKREICH_ATLANTIK,
  KANAL_UND_NORDSEE,
  FESTLAND_RAND,
);

// --- Großbritannien in vier Abschnitten -------------------------------------

/** Land’s End → Ärmelkanal → North Foreland → Themsemündung. */
const ENGLAND_SUEDKUESTE = [
  [-5.71, 50.07], [-5.2, 49.96], [-4.15, 50.33], [-3.65, 50.22], [-3.4, 50.6],
  [-2.45, 50.52], [-1.5, 50.72], [-0.79, 50.73], [0.25, 50.73], [0.58, 50.85],
  [0.97, 50.91], [1.35, 51.13], [1.44, 51.38],
];

/**
 * Themse → Ostanglien → The Wash → Humber → Yorkshire.
 *
 * Die Themsemündung ist hier keine Zierde: An diesem Fluss liegen beide
 * englischen Orte dieses Kapitels — Oxford an seinem Oberlauf, London an
 * seinem Gezeitenabschnitt.
 */
const ENGLAND_OSTKUESTE = [
  [1.0, 51.37], [0.55, 51.45], [0.7, 51.53], [0.95, 51.62], [1.29, 51.95],
  [1.6, 52.15], [1.75, 52.48], [1.73, 52.62], [1.3, 52.93], [0.4, 52.9],
  [0.05, 52.98], [0.34, 53.15], [0.1, 53.63], [-0.08, 54.11],
];

/** Der Nordrand: oberhalb des Rahmens geschlossen. */
const ENGLAND_NORDRAND = [
  [-0.9, 54.6], [-3.3, 54.62],
];

/** Cumbria → Mersey → Wales → Bristolkanal → Cornwall. */
const ENGLAND_WESTKUESTE = [
  [-3.6, 54.45], [-3.15, 54.1], [-3.05, 53.85], [-3.1, 53.45], [-3.4, 53.35],
  [-3.83, 53.33], [-4.6, 53.4], [-4.75, 52.9], [-4.06, 52.72],
  [-4.08, 52.41], [-4.66, 52.1], [-5.3, 51.88], [-5.05, 51.71],
  [-4.3, 51.62], [-3.2, 51.45], [-2.7, 51.5], [-3.0, 51.2], [-3.5, 51.21],
  [-4.1, 51.2], [-4.5, 50.9], [-4.55, 50.55], [-5.08, 50.42], [-5.48, 50.21],
];

/** Die Insel, auf der aus dem Schimmel ein Arzneimittel wurde. */
const GROSSBRITANNIEN = verbinde(
  ENGLAND_SUEDKUESTE,
  ENGLAND_OSTKUESTE,
  ENGLAND_NORDRAND,
  ENGLAND_WESTKUESTE,
);

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Der Alpenbogen — grobe Fläche, keine Aussage über einzelne Gipfel. */
const ALPEN = [
  [5.9, 46.0], [7.0, 45.9], [8.6, 45.9], [10.5, 46.2], [12.2, 46.5],
  [13.5, 46.9], [12.5, 47.4], [10.8, 47.4], [9.0, 47.2], [7.2, 46.7],
  [6.2, 46.35],
];

/** Der Jura. */
const JURA = [
  [5.75, 46.7], [6.4, 46.4], [6.95, 47.0], [6.6, 47.45], [6.0, 47.2],
  [5.7, 46.95],
];

/** Die Vogesen — zwischen Lothringen und dem Elsass. */
const VOGESEN = [
  [6.75, 47.9], [7.25, 48.35], [7.15, 48.85], [6.8, 48.6], [6.6, 48.2],
];

/** Der Schwarzwald — auf der anderen Rheinseite. */
const SCHWARZWALD = [
  [7.7, 47.7], [8.3, 47.75], [8.4, 48.6], [8.0, 48.8], [7.7, 48.3],
];

/**
 * Spessart und Rhön — die bewaldeten Höhen um Würzburg.
 *
 * Sie stehen hier, weil sie die Lage der Stadt erklären: Würzburg liegt in
 * einem Talkessel des Mains, zwischen den Weinbergen und den Wäldern.
 */
const SPESSART_UND_RHOEN = [
  [9.2, 49.9], [9.6, 50.3], [10.1, 50.5], [10.3, 50.2], [9.9, 49.85],
  [9.5, 49.7],
];

/** Der Harz. */
const HARZ = [
  [10.3, 51.6], [10.9, 51.75], [11.1, 51.6], [10.6, 51.5], [10.3, 51.5],
];

/** Das Erzgebirge. */
const ERZGEBIRGE = [
  [12.5, 50.4], [13.5, 50.6], [14.0, 50.8], [13.4, 50.5], [12.7, 50.2],
];

/** Der Böhmerwald. */
const BOEHMERWALD = [
  [12.5, 49.0], [13.4, 49.4], [14.0, 49.0], [13.2, 48.7], [12.6, 48.8],
];

/** Die Ardennen. */
const ARDENNEN = [
  [4.8, 49.8], [5.8, 50.2], [6.2, 50.4], [5.6, 50.5], [4.9, 50.2],
];

/** Die Penninen — der Rücken Nordenglands. */
const PENNINEN = [
  [-2.5, 54.0], [-2.0, 53.9], [-1.9, 53.5], [-2.2, 53.3], [-2.6, 53.6],
];

/** Das walisische Bergland. */
const WALISISCHES_BERGLAND = [
  [-3.9, 52.9], [-3.5, 52.6], [-3.4, 52.2], [-3.9, 52.0], [-4.2, 52.4],
];

/** Das Zentralmassiv — der Südwesten des Blattes. */
const MASSIF_CENTRAL = [
  [2.3, 45.0], [3.6, 45.0], [4.2, 45.6], [3.4, 46.3], [2.3, 45.9],
  [1.9, 45.2],
];

/** Der Rhein — Basel, Straßburg, Mainz, Köln, Rheinmündung. */
const RHEIN = [
  [7.6, 47.55], [7.62, 48.58], [8.0, 49.0], [8.27, 50.0], [7.6, 50.36],
  [7.1, 50.73], [6.9, 51.2], [6.1, 51.85], [5.0, 51.95], [4.15, 51.99],
];

/**
 * Der Main — Bamberg, Schweinfurt, Würzburg, Aschaffenburg, Mündung.
 *
 * Der Fluss des Kapitels: Würzburg liegt an seiner großen Schleife, und das
 * Physikalische Institut stand keine zehn Minuten vom Ufer entfernt.
 */
const MAIN = [
  [11.4, 50.05], [10.9, 49.9], [10.22, 50.04], [9.93, 49.79], [9.5, 49.75],
  [9.15, 49.97], [8.6, 50.05], [8.3, 50.0],
];

/** Die Elbe — Böhmen, Dresden, Magdeburg, Hamburg, Mündung. */
const ELBE = [
  [14.2, 50.6], [13.74, 51.05], [12.4, 51.85], [11.63, 52.13], [11.0, 52.9],
  [10.0, 53.55], [9.2, 53.83], [8.9, 53.88],
];

/** Die Donau — Ulm, Regensburg, Passau, weiter nach Osten. */
const DONAU = [
  [9.99, 48.4], [11.0, 48.75], [12.1, 49.02], [12.95, 48.77], [13.45, 48.57],
  [14.5, 48.3],
];

/** Die Seine — Burgund, Paris, Rouen, Le Havre. */
const SEINE = [
  [4.7, 47.8], [3.3, 48.4], [2.35, 48.85], [1.1, 49.44], [0.15, 49.45],
];

/** Die Loire — Orléans, Tours, Nantes. */
const LOIRE = [
  [2.8, 46.9], [2.0, 47.3], [1.9, 47.9], [0.7, 47.4], [-0.55, 47.4],
  [-1.55, 47.2], [-2.2, 47.28],
];

/** Die Themse — Oxford, Reading, London, Gravesend, Mündung. */
const THEMSE = [
  [-1.8, 51.6], [-1.26, 51.75], [-0.97, 51.45], [-0.34, 51.42], [-0.1, 51.5],
  [0.37, 51.44], [0.7, 51.5],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  grossbritannien: GROSSBRITANNIEN,
  frankreichAtlantik: FRANKREICH_ATLANTIK,
  kanalUndNordsee: KANAL_UND_NORDSEE,
  englandSuedkueste: ENGLAND_SUEDKUESTE,
  englandOstkueste: ENGLAND_OSTKUESTE,
  englandWestkueste: ENGLAND_WESTKUESTE,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [FESTLAND, GROSSBRITANNIEN];

// ---------------------------------------------------------------------------
// Die Phasen: fünfzig Jahre von einem leuchtenden Schirm bis zur Landung in
// der Normandie.
// ---------------------------------------------------------------------------

/** Phase 1 — die Entdeckung und ihre Ausbreitung. */
const WUERZBURG_UMLAND = [
  [9.7, 50.0], [10.2, 50.0], [10.2, 49.6], [9.7, 49.6],
];
const BERLIN_STADT = [
  [13.2, 52.65], [13.65, 52.65], [13.65, 52.4], [13.2, 52.4],
];

/** Phase 2 — die Euphorie und die ersten Schäden. */
const HAMBURG_STADT = [
  [9.8, 53.65], [10.2, 53.65], [10.2, 53.45], [9.8, 53.45],
];
const MUENCHEN_STADT = [
  [11.4, 48.25], [11.75, 48.25], [11.75, 48.0], [11.4, 48.0],
];

/** Phase 3 und 4 — die Schale und ihre Reinigung. */
const LONDON_STADT = [
  [-0.35, 51.62], [0.1, 51.62], [0.1, 51.4], [-0.35, 51.4],
];
const OXFORD_UMLAND = [
  [-1.42, 51.85], [-1.08, 51.85], [-1.08, 51.65], [-1.42, 51.65],
];

/** Phase 5 — wofür das Penicillin zuerst gebraucht wurde. */
const NORMANDIE = [
  [-1.2, 49.5], [0.4, 49.5], [0.4, 48.9], [-1.2, 48.9],
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
    gebirge(ALPEN),
    gebirge(JURA),
    gebirge(VOGESEN),
    gebirge(SCHWARZWALD),
    gebirge(SPESSART_UND_RHOEN),
    gebirge(HARZ),
    gebirge(ERZGEBIRGE),
    gebirge(BOEHMERWALD),
    gebirge(ARDENNEN),
    gebirge(PENNINEN),
    gebirge(WALISISCHES_BERGLAND),
    gebirge(MASSIF_CENTRAL),
    fluss(RHEIN),
    fluss(MAIN),
    fluss(ELBE),
    fluss(DONAU),
    fluss(SEINE),
    fluss(LOIRE),
    fluss(THEMSE),
  ],

  phasen: [
    {
      id: 'x-strahlen-1895',
      label: '1895/96: die X-Strahlen — Würzburg und die Welt',
      hinweis:
        'Am Abend des 8. November 1895 arbeitet Wilhelm Conrad Röntgen im ' +
        'Physikalischen Institut der Universität Würzburg mit einer ' +
        'Entladungsröhre, die er in schwarzen Karton gehüllt hat. Ein ' +
        'Schirm, der ein paar Schritte entfernt liegt, beginnt zu leuchten. ' +
        'Sieben Wochen lang prüft er, was da hindurchgeht; am 22. Dezember ' +
        'entsteht das Bild einer Hand mit einem Ring. Am 28. Dezember 1895 ' +
        'reicht er seine „Vorläufige Mittheilung" ein, am 1. Januar 1896 ' +
        'verschickt er Sonderdrucke an Fachkollegen. Am 5. Januar bringt ' +
        'eine Wiener Zeitung die Nachricht, am 13. Januar führt Röntgen die ' +
        'Strahlen in Berlin bei Hofe vor. Binnen weniger Wochen wird in ' +
        'Europa und Amerika nachgebaut und durchleuchtet.',
      flaechen: [
        { titel: 'Würzburg — das Physikalische Institut, 8. November 1895', d: P.pfad(WUERZBURG_UMLAND) },
        { titel: 'Berlin — die Vorführung vom 13. Januar 1896', d: P.pfad(BERLIN_STADT) },
      ],
    },
    {
      id: 'euphorie-1896-1930',
      label: '1896–1930: die Euphorie und die ersten Strahlenschäden',
      hinweis:
        'Die neuen Strahlen werden zur Sensation: Jahrmarktsbuden ' +
        'durchleuchten Hände gegen Eintritt, Schuhgeschäfte stellen ' +
        'Durchleuchtungsgeräte auf, Kosmetikinstitute entfernen damit Haare. ' +
        'Weil man nichts spürt, hält man die Strahlen für harmlos — die ' +
        'Schäden kommen mit Verzögerung. Ärzte, Techniker und Vorführer ' +
        'bekommen Verbrennungen, die nicht heilen; Finger, Hände und Arme ' +
        'werden amputiert; auffällig viele der frühen Radiologen sterben an ' +
        'Blutkrebs. 1936 wird in Hamburg das Ehrenmal der Radiologie ' +
        'eingeweiht, zunächst mit 169 Namen aus fünfzehn Ländern. Röntgen ' +
        'erhält 1901 den ersten Nobelpreis für Physik, geht 1900 nach ' +
        'München und stirbt dort 1923.',
      flaechen: [
        { titel: 'Hamburg — das Ehrenmal der Radiologie, 1936', d: P.pfad(HAMBURG_STADT) },
        { titel: 'München — Röntgens letzte Jahre bis 1923', d: P.pfad(MUENCHEN_STADT) },
        { titel: 'London — Durchleuchtung als Schaustellung und Schuhkauf', d: P.pfad(LONDON_STADT) },
      ],
    },
    {
      id: 'schale-1928',
      label: '1928: die verschimmelte Schale — London, St Mary’s Hospital',
      hinweis:
        'Alexander Fleming untersucht in seinem Labor am St Mary’s Hospital ' +
        'in Paddington Staphylokokken. Vor dem Sommerurlaub bleiben ' +
        'Kulturschalen auf der Bank stehen. Nach der Rückkehr Ende September ' +
        '1928 — der 28. September gilt als Tag der Entdeckung — ist eine ' +
        'Schale verschimmelt, und rings um den Schimmel sind die Bakterien ' +
        'aufgelöst. Fleming bestimmt den Pilz als Penicillium, nennt den ' +
        'Saft daraus „Penicillin" und veröffentlicht 1929. Die Fachwelt ' +
        'nimmt kaum Notiz: Der Stoff ist unbeständig, lässt sich nicht ' +
        'reinigen und gilt als Laborkuriosität.',
      flaechen: [
        { titel: 'London — St Mary’s Hospital, Praed Street', d: P.pfad(LONDON_STADT) },
      ],
    },
    {
      id: 'oxford-1939-1941',
      label: '1939–1941: Oxford reinigt das Penicillin',
      hinweis:
        'An der Sir William Dunn School of Pathology in Oxford nehmen Howard ' +
        'Florey, Ernst Boris Chain und Norman Heatley Flemings Aufsatz ' +
        'wieder auf. Heatley baut aus Milchkannen, Bettpfannen und ' +
        'Keksdosen eine Anlage zur Gewinnung. Am 25. Mai 1940 überleben ' +
        'behandelte Mäuse eine tödliche Infektion, die unbehandelten ' +
        'sterben. Am 12. Februar 1941 wird der Polizist Albert Alexander ' +
        'behandelt; sein Zustand bessert sich deutlich, doch der Vorrat ' +
        'reicht nicht — er stirbt am 15. März 1941. Das Mittel wirkt. Es ' +
        'gibt nur viel zu wenig davon.',
      flaechen: [
        { titel: 'Oxford — die Sir William Dunn School of Pathology', d: P.pfad(OXFORD_UMLAND) },
        { titel: 'London — Flemings Aufsatz von 1929 als Ausgangspunkt', d: P.pfad(LONDON_STADT) },
      ],
    },
    {
      id: 'massenproduktion-1941-1945',
      label: '1941–1945: Massenproduktion und die Landung in der Normandie',
      hinweis:
        'Im Juli 1941 reisen Florey und Heatley in die Vereinigten Staaten, ' +
        'weil die britische Industrie im Krieg keine Kapazität hat. Im ' +
        'Forschungslabor in Peoria, Illinois, steigert Maisquellwasser die ' +
        'Ausbeute; 1943 liefert ein Schimmelpilz von einer Melone vom ' +
        'Markt den ergiebigsten Stamm. Amerikanische Firmen bauen ' +
        'Tanklager. Im März 1942 wird in New Haven die erste Patientin in ' +
        'den USA gerettet. Zur Landung in der Normandie am 6. Juni 1944 ' +
        'stehen rund 2,3 Millionen Dosen bereit. 1945 erhalten Fleming, ' +
        'Florey und Chain den Nobelpreis — und Fleming warnt in seiner Rede ' +
        'vor Erregern, die widerstandsfähig werden.',
      flaechen: [
        { titel: 'Oxford — Ausgangspunkt der Reise nach Amerika, Juli 1941', d: P.pfad(OXFORD_UMLAND) },
        { titel: 'Die Normandie — Landung am 6. Juni 1944 mit Penicillin im Gepäck', d: P.pfad(NORMANDIE) },
      ],
    },
  ],

  punkte: [
    {
      id: 'wuerzburg',
      name: 'Würzburg',
      typ: 'ereignis',
      ...ort(9.932, 49.791),
      text:
        'Der Ort des ersten Zufalls. Am Abend des 8. November 1895 ' +
        'untersucht Wilhelm Conrad Röntgen im Physikalischen Institut ' +
        'Kathodenstrahlen. Die Röhre steckt in schwarzem Karton, das Zimmer ' +
        'ist verdunkelt — und ein Schirm mit Bariumplatincyanür leuchtet ' +
        'trotzdem auf. Sieben Wochen arbeitet er allein weiter und lässt ' +
        'sich Essen ins Labor bringen. Am 22. Dezember entsteht die ' +
        'Aufnahme der Hand seiner Frau Bertha mit dem Ehering, am ' +
        '28. Dezember die „Vorläufige Mittheilung". Am 23. Januar 1896 ' +
        'zeigt er die Strahlen hier zum einzigen Mal öffentlich und ' +
        'durchleuchtet die Hand des Anatomen Albert von Kölliker.',
    },
    {
      id: 'berlin',
      name: 'Berlin',
      typ: 'ereignis',
      ...ort(13.405, 52.52),
      text:
        'Die Station, an der aus einer Fachmitteilung ein Weltereignis wird. ' +
        'Am 1. Januar 1896 verschickt Röntgen Sonderdrucke mit ' +
        'beigelegten Bildern an Kollegen in ganz Europa; am 5. Januar ' +
        'bringt eine Wiener Zeitung die Nachricht, und die Telegrafen ' +
        'tragen sie binnen Tagen um die Welt. Am 13. Januar 1896 führt ' +
        'Röntgen die Strahlen in Berlin bei Kaiser Wilhelm II. vor. Schon ' +
        'im Frühjahr 1896 bauen Werkstätten in Europa und Amerika ' +
        'Durchleuchtungsapparate nach — kein Patent hinderte sie daran.',
    },
    {
      id: 'hamburg',
      name: 'Hamburg',
      typ: 'ereignis',
      ...ort(9.994, 53.551),
      text:
        'Hier steht der Preis in Stein. Am 4. April 1936 wird im Garten des ' +
        'Krankenhauses St. Georg das Ehrenmal der Radiologie eingeweiht: ' +
        'eine Tafel mit den Namen von Ärztinnen, Ärzten, Technikern und ' +
        'Pflegenden aus fünfzehn Ländern, die an den Folgen der Strahlen ' +
        'gestorben sind — zunächst 169 Namen, später rund 360. Die frühen ' +
        'Röntgenpioniere prüften die Härte der Strahlen an der eigenen ' +
        'Hand. Verbrennungen, die nicht heilten, Amputationen und Blutkrebs ' +
        'waren die Folge. Erst daraus entstanden Dosisgrenzen, Bleischürze ' +
        'und Abstand.',
    },
    {
      id: 'muenchen',
      name: 'München',
      typ: 'stadt',
      ...ort(11.576, 48.137),
      text:
        'Die letzte Station des Entdeckers. 1900 folgt Röntgen einem Ruf ' +
        'nach München. 1901 erhält er den allerersten Nobelpreis für ' +
        'Physik; das Preisgeld überschreibt er der Universität Würzburg. ' +
        'Ein Patent auf die Strahlen hat er nie angemeldet — sie sollten ' +
        'allen gehören. Den angebotenen Adelstitel lehnte er ab. Nach dem ' +
        'Ersten Weltkrieg verliert er sein Vermögen in der Inflation. Er ' +
        'stirbt am 10. Februar 1923 in München an Darmkrebs; ein ' +
        'Zusammenhang mit den Strahlen gilt als unwahrscheinlich, weil er ' +
        'früh mit Bleiblenden und einem Zinkkasten arbeitete.',
    },
    {
      id: 'london',
      name: 'London',
      typ: 'ereignis',
      ...ort(-0.174, 51.517),
      text:
        'Der Ort des zweiten Zufalls, dreiunddreißig Jahre später. Im Labor ' +
        'des St Mary’s Hospital an der Praed Street in Paddington bleiben ' +
        'im Sommer 1928 Kulturschalen mit Staphylokokken auf der Bank ' +
        'stehen, während Alexander Fleming im Urlaub ist. Auf einer Schale ' +
        'wächst ein Schimmelpilz, und rings um ihn sind die Bakterienrasen ' +
        'aufgelöst. Fleming nennt den Wirkstoff Penicillin und ' +
        'veröffentlicht 1929. Reinigen kann er ihn nicht — der Stoff ' +
        'zerfällt. Elf Jahre lang bleibt die Entdeckung eine Fußnote in ' +
        'einer Fachzeitschrift.',
    },
    {
      id: 'oxford',
      name: 'Oxford',
      typ: 'ereignis',
      ...ort(-1.257, 51.752),
      text:
        'Hier wird aus einer Beobachtung ein Medikament. An der Sir William ' +
        'Dunn School of Pathology greifen Howard Florey, Ernst Boris Chain ' +
        'und Norman Heatley 1938/39 Flemings Aufsatz wieder auf. Heatley ' +
        'baut die Gewinnung aus Milchkannen und Bettpfannen. Am 25. Mai ' +
        '1940 überleben behandelte Mäuse eine tödliche Infektion. Am ' +
        '12. Februar 1941 beginnt die Behandlung des Polizisten Albert ' +
        'Alexander: Das Fieber fällt, die Wunden reinigen sich — dann geht ' +
        'der Vorrat zu Ende, und er stirbt am 15. März 1941. Im Juli 1941 ' +
        'fahren Florey und Heatley nach Amerika, um Fabriken zu finden.',
    },
  ],

  bewegungen: [
    {
      id: 'strahlen-nach-berlin',
      name: 'Die Nachricht von den Strahlen',
      von: station(9.932, 49.791),
      ueber: [station(11.4, 50.9)],
      nach: station(13.405, 52.52),
      text:
        'Von Würzburg nach Berlin in sechs Wochen — und von dort in wenigen ' +
        'Tagen um die Welt. Am 1. Januar 1896 gehen Sonderdrucke mit ' +
        'Bildern an Fachkollegen hinaus, am 5. Januar meldet eine Wiener ' +
        'Zeitung die Entdeckung, am 13. Januar führt Röntgen sie in Berlin ' +
        'bei Hofe vor. Weil kein Patent den Nachbau verbietet, stehen ' +
        'binnen weniger Monate in vielen Krankenhäusern Europas und ' +
        'Amerikas eigene Durchleuchtungsapparate.',
    },
    {
      id: 'schimmel-nach-oxford',
      name: 'Der Weg des Schimmels: London → Oxford',
      von: station(-0.174, 51.517),
      ueber: [station(-0.75, 51.6)],
      nach: station(-1.257, 51.752),
      text:
        'Neunzig Kilometer und elf Jahre. Flemings Aufsatz über das ' +
        'Penicillin von 1929 liegt in den Bibliotheken, als Ernst Boris ' +
        'Chain ihn 1938 in Oxford wieder in die Hand nimmt. Der ' +
        'Schimmelpilz wandert mit: Was in London eine ' +
        'Merkwürdigkeit blieb, wird in Oxford gereinigt, gewogen, an Mäusen ' +
        'geprüft und schließlich einem Menschen gegeben. Der Entdecker ' +
        'selbst hatte das nicht gekonnt — die Reinigung war eine Aufgabe ' +
        'für Chemiker, nicht für Bakteriologen.',
    },
    {
      id: 'penicillin-ueber-den-atlantik',
      name: 'Das Penicillin geht über den Atlantik',
      von: station(-1.257, 51.752),
      ueber: [station(-2.6, 50.6)],
      nach: station(-5.0, 49.6),
      text:
        'Im Juli 1941 verlassen Howard Florey und Norman Heatley England ' +
        'in Richtung Vereinigte Staaten; die britische Industrie ist im ' +
        'Krieg ausgelastet. Im Forschungslabor in Peoria, Illinois, macht ' +
        'Maisquellwasser den Pilz ergiebiger, und 1943 liefert ein ' +
        'Schimmel von einer Melone vom Markt den besten Stamm. Aus ' +
        'Bettpfannen werden Gärtanks: Zur Landung in der Normandie im ' +
        'Juni 1944 stehen rund 2,3 Millionen Dosen bereit.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 3.2, 53.3),
    schrift('Ärmelkanal', 'meer', -1.0, 50.0, -12),
    schrift('Atlantik', 'meer', -4.6, 47.6),
    schrift('Golf von Biskaya', 'meer', -3.4, 46.2),
    schrift('Themse', 'meer', 0.55, 51.56),
    schrift('Rhein', 'meer', 7.85, 50.45, -60),
    schrift('Main', 'meer', 9.0, 50.06, -8),
    schrift('Elbe', 'meer', 11.6, 52.55, -50),
    schrift('Donau', 'meer', 12.6, 48.85, 14),
    schrift('Seine', 'meer', 3.2, 48.6, -20),
    schrift('England', 'land', -1.7, 52.6),
    schrift('Wales', 'land', -3.7, 52.35),
    schrift('Frankreich', 'land', 1.9, 47.4),
    schrift('Deutschland', 'land', 10.6, 51.6),
    schrift('Niederlande', 'land', 5.75, 52.3),
    schrift('Alpen', 'land', 10.5, 46.7),
    schrift('Würzburg', 'land', 10.5, 49.72),
    schrift('Berlin', 'land', 12.75, 52.66),
    schrift('Hamburg', 'land', 9.35, 53.66),
    schrift('München', 'land', 12.1, 48.03),
    schrift('London', 'land', 0.35, 51.35),
    schrift('Oxford', 'land', -2.2, 51.87),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
