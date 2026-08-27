// Karte zu „mRNA und COVID" — Nordwesteuropa in den Jahren 2020 bis 2023.
//
// Wie in den Kapiteln 1 bis 14 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-mrna-covid.mjs nach.
//
// Was die Karte zeigen soll: Die Schauplätze der schnellsten
// Impfstoffentwicklung der Medizingeschichte liegen erstaunlich nah
// beieinander. In Mainz sitzt BioNTech, das Unternehmen von Uğur Şahin und
// Özlem Türeci; in Tübingen sitzt CureVac, wo die mRNA-Idee im Jahr 2000
// zum ersten Mal eine Firma bekam; in Marburg steht das Werk, das ab 2021
// die Dosen für Europa herstellte. In Oxford entstand der Vektor-Impfstoff,
// in London erteilte am 2. Dezember 2020 die britische Behörde die erste
// Zulassung der Welt, und in Coventry bekam am 8. Dezember 2020 die
// neunzigjährige Margaret Keenan die erste Spritze außerhalb einer Studie.
//
// Deshalb dieser Ausschnitt: von den englischen Midlands bis an die
// Ostsee, vom Alpenrand bis nach Jütland. Er hält die sechs Orte auf einem
// Blatt zusammen — und lässt im Osten Platz, damit die Bewegung, die alles
// auslöste, ins Bild laufen kann: die Erbgutfolge des Virus, die am
// 10. Januar 2020 aus China ins offene Netz gestellt wurde, achttausend
// Kilometer östlich dieses Blattes.
//
// Aufbau der Landmassen: das Festland als ein Ring (die französische
// Atlantikküste, die Bretagne, der Ärmelkanal, Belgien, die Niederlande,
// die deutsche Nordseeküste, Jütland, die westliche Ostsee; im Süden,
// Osten und Westen außerhalb des Rahmens geschlossen, damit die Fläche
// ausläuft statt am Bildrand abzuknicken) und Großbritannien als zweiter
// Ring, im Norden ebenfalls außerhalb des Rahmens geschlossen.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von den englischen Midlands bis an die Ostsee, vom
 * Alpenrand bis nach Jütland.
 */
const RAHMEN = {
  minLon: -3,
  maxLon: 11,
  minLat: 47,
  maxLat: 55.5,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 14, damit alle Karten
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
 * Gironde → Loire → Bretagne → Normandie → Seinemündung.
 *
 * Der Beginn im Süden und die Spitze der Bretagne liegen außerhalb des
 * Rahmens; das ist Absicht, damit die Küste am Bildrand nicht abknickt.
 */
const FRANKREICH_ATLANTIK = [
  [-1.2, 45.0], [-1.06, 45.57], [-1.15, 46.16], [-1.78, 46.5], [-2.2, 47.28],
  [-2.55, 47.5], [-3.12, 47.48], [-3.92, 47.87], [-4.73, 48.04],
  [-4.77, 48.36], [-4.56, 48.6], [-3.44, 48.82], [-2.46, 48.63],
  [-1.5, 48.65], [-1.6, 48.84], [-1.94, 49.72], [-1.26, 49.68], [-1.1, 49.4],
  [-0.4, 49.35], [0.11, 49.49],
];

/** Fécamp → Dieppe → Boulogne → Calais → Dünkirchen → Ostende. */
const KANALKUESTE = [
  [0.4, 49.6], [0.8, 49.85], [1.08, 49.93], [1.55, 50.22], [1.6, 50.72],
  [1.85, 50.96], [2.37, 51.03], [2.92, 51.23],
];

/** Zeeland → Hoek van Holland → Den Helder → Wattenmeer → Dollart. */
const NIEDERLANDE_KUESTE = [
  [3.19, 51.34], [3.45, 51.52], [3.72, 51.6], [4.12, 51.98], [4.55, 52.46],
  [4.76, 52.96], [5.35, 53.25], [6.18, 53.42],
];

/** Dollart → Jadebusen → Wesermündung → Elbmündung → Nordfriesland. */
const DEUTSCHE_NORDSEEKUESTE = [
  [7.0, 53.4], [7.6, 53.5], [8.15, 53.52], [8.5, 53.6], [8.9, 53.9],
  [8.86, 54.13], [8.62, 54.32], [8.95, 54.47], [8.83, 54.65], [8.72, 54.9],
  [8.2, 55.2], [8.08, 55.56],
];

/**
 * Der Riegel quer über Jütland — bewusst oberhalb des Rahmens.
 *
 * Was auf diesem Blatt von der Halbinsel zu sehen ist, liegt südlich der
 * Königsau; der Norden Jütlands beginnt erst über dem oberen Bildrand.
 */
const JUETLAND_RAND = [
  [8.12, 56.1], [10.5, 56.1], [10.05, 55.1],
];

/**
 * Flensburger Förde → Kieler Förde → Fehmarn → Lübecker Bucht → Wismar.
 *
 * Fehmarn ist mit der Küstenlinie gezeichnet: Der Fehmarnsund ist gut einen
 * Kilometer breit — in diesem Maßstab ein Haarstrich.
 */
const DEUTSCHE_OSTSEEKUESTE = [
  [9.55, 54.85], [9.95, 54.7], [9.78, 54.5], [10.25, 54.42], [10.72, 54.3],
  [11.1, 54.45], [11.02, 54.02], [10.9, 53.94], [11.3, 53.92], [11.6, 54.07],
];

/** Der Ost-, Süd- und Westrand: bewusst außerhalb des Rahmens. */
const FESTLAND_RAND = [
  [11.9, 54.15], [11.9, 44.6], [-1.2, 44.6],
];

/** Der große Ring: Frankreich, Benelux, Deutschland, Jütland. */
const FESTLAND = verbinde(
  FRANKREICH_ATLANTIK,
  KANALKUESTE,
  NIEDERLANDE_KUESTE,
  DEUTSCHE_NORDSEEKUESTE,
  JUETLAND_RAND,
  DEUTSCHE_OSTSEEKUESTE,
  FESTLAND_RAND,
);

/** Land’s End → Ärmelkanal → North Foreland → Themsemündung. */
const ENGLAND_SUEDKUESTE = [
  [-5.71, 50.07], [-5.2, 49.96], [-4.8, 50.22], [-4.15, 50.33],
  [-3.64, 50.22], [-3.48, 50.4], [-3.24, 50.68], [-2.94, 50.72],
  [-2.46, 50.51], [-2.06, 50.58], [-1.87, 50.72], [-1.4, 50.78],
  [-0.79, 50.72], [0.25, 50.73], [0.58, 50.85], [0.97, 50.91], [1.34, 51.13],
  [1.44, 51.38],
];

/** Themsemündung → Ostanglien → der Wash → Humber → Northumberland. */
const ENGLAND_OSTKUESTE = [
  [1.4, 51.36], [0.95, 51.35], [0.55, 51.44], [0.75, 51.51], [0.95, 51.62],
  [1.29, 51.95], [1.58, 52.08], [1.75, 52.48], [1.73, 52.6], [1.3, 52.93],
  [0.49, 52.94], [0.05, 52.98], [0.34, 53.15], [0.11, 53.58], [-0.17, 53.91],
  [-0.08, 54.11], [-0.39, 54.28], [-0.61, 54.49], [-1.07, 54.62],
  [-1.18, 54.69], [-1.38, 54.9], [-1.5, 55.13], [-1.71, 55.6],
];

/** Der Nordrand: außerhalb des Rahmens geschlossen (Südschottland). */
const SCHOTTLAND_RAND = [
  [-2.1, 56.2], [-3.5, 56.4], [-5.0, 56.0],
];

/** Cumbria → Mersey → Wales → Bristolkanal → Cornwall. */
const ENGLAND_WESTKUESTE = [
  [-3.35, 54.9], [-3.6, 54.5], [-3.2, 54.1], [-3.05, 53.85], [-3.1, 53.45],
  [-3.4, 53.35], [-3.83, 53.33], [-4.6, 53.4], [-4.75, 52.9], [-4.06, 52.72],
  [-4.08, 52.41], [-4.66, 52.1], [-5.3, 51.88], [-5.05, 51.71], [-4.3, 51.62],
  [-3.2, 51.46], [-2.7, 51.52], [-3.0, 51.2], [-3.5, 51.21], [-4.1, 51.2],
  [-4.5, 50.9], [-4.55, 50.55], [-5.08, 50.42], [-5.48, 50.21],
];

/** Die Insel, auf der die erste Zulassung und die erste Impfung geschahen. */
const GROSSBRITANNIEN = verbinde(
  ENGLAND_SUEDKUESTE,
  ENGLAND_OSTKUESTE,
  SCHOTTLAND_RAND,
  ENGLAND_WESTKUESTE,
);

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Der Alpenbogen — grobe Fläche, keine Aussage über einzelne Gipfel. */
const ALPEN = [
  [6.0, 46.2], [7.0, 45.9], [8.6, 45.9], [10.5, 46.2], [11.5, 46.5],
  [11.4, 47.4], [9.4, 47.4], [7.4, 46.9], [6.2, 46.5],
];

/** Der Jura — die Höhen im Rücken von Basel. */
const JURA = [
  [5.75, 46.7], [6.4, 46.4], [6.95, 47.0], [7.6, 47.4], [7.2, 47.5],
  [6.6, 47.45], [6.0, 47.2], [5.7, 46.95],
];

/** Der Schwarzwald. */
const SCHWARZWALD = [
  [7.7, 47.7], [8.3, 47.8], [8.4, 48.6], [8.0, 48.8], [7.7, 48.3],
];

/** Die Schwäbische Alb — der Höhenzug südöstlich von Tübingen. */
const SCHWAEBISCHE_ALB = [
  [8.8, 48.3], [10.3, 48.75], [10.4, 48.6], [9.0, 48.1],
];

/** Die Vogesen. */
const VOGESEN = [
  [6.75, 47.9], [7.25, 48.35], [7.15, 48.85], [6.8, 48.6], [6.6, 48.2],
];

/** Die Eifel und die Ardennen. */
const EIFEL_UND_ARDENNEN = [
  [4.9, 50.0], [6.2, 50.4], [6.6, 50.55], [5.8, 50.5], [4.9, 50.2],
];

/** Der Taunus — der Riegel zwischen Rhein und Main. */
const TAUNUS = [
  [7.9, 50.2], [8.6, 50.3], [8.9, 50.15], [8.3, 50.05], [7.9, 50.05],
];

/**
 * Der Westerwald und das Rothaargebirge — die Höhen um Marburg.
 *
 * Sie stehen hier, weil sie die Lage der Stadt erklären: Marburg liegt im
 * Lahntal zwischen ihnen, an einer alten Nord-Süd-Straße.
 */
const WESTERWALD_UND_ROTHAAR = [
  [7.6, 50.6], [8.3, 50.9], [8.8, 51.1], [8.9, 50.85], [8.2, 50.6],
  [7.7, 50.5],
];

/** Der Odenwald — die Höhen östlich des Rheins bei Darmstadt. */
const ODENWALD = [
  [8.7, 49.75], [9.3, 49.7], [9.2, 49.5], [8.7, 49.5],
];

/** Spessart und Rhön. */
const SPESSART_UND_RHOEN = [
  [9.2, 49.9], [9.6, 50.3], [10.1, 50.5], [10.3, 50.2], [9.9, 49.85],
  [9.5, 49.7],
];

/** Der Harz. */
const HARZ = [
  [10.3, 51.6], [10.9, 51.75], [11.1, 51.6], [10.6, 51.5], [10.3, 51.5],
];

/** Die Penninen — der Rücken Nordenglands. */
const PENNINEN = [
  [-2.5, 54.9], [-2.0, 54.6], [-1.9, 53.9], [-2.2, 53.3], [-2.6, 53.6],
  [-2.7, 54.3],
];

/** Die Cotswolds — die Hügel westlich von Oxford. */
const COTSWOLDS = [
  [-2.25, 52.0], [-1.7, 51.85], [-1.9, 51.55], [-2.35, 51.7],
];

/** Der Rhein — Basel, Straßburg, Mainz, Köln, Rheinmündung. */
const RHEIN = [
  [7.6, 47.55], [7.62, 48.58], [8.0, 49.0], [8.27, 50.0], [7.6, 50.36],
  [7.1, 50.73], [6.96, 50.94], [6.7, 51.4], [6.1, 51.85], [5.0, 51.95],
  [4.15, 51.99],
];

/**
 * Der Neckar — der Fluss von Tübingen.
 *
 * Rottweil, Tübingen, Stuttgart, Heilbronn, Mündung in den Rhein bei
 * Mannheim. An seinem Ufer steht die Universität, an der die mRNA-Idee im
 * Jahr 2000 zum ersten Mal eine Firma bekam.
 */
const NECKAR = [
  [8.63, 48.17], [8.85, 48.42], [9.06, 48.52], [9.18, 48.79], [9.22, 49.14],
  [8.9, 49.3], [8.47, 49.49],
];

/**
 * Die Lahn — der Fluss von Marburg.
 *
 * Aus dem Rothaargebirge über Marburg, Gießen und Wetzlar zum Rhein bei
 * Lahnstein.
 */
const LAHN = [
  [8.3, 50.93], [8.77, 50.81], [8.68, 50.58], [8.5, 50.55], [8.06, 50.39],
  [7.6, 50.31],
];

/** Der Main — Würzburg, Aschaffenburg, Frankfurt, Mündung bei Mainz. */
const MAIN = [
  [10.9, 49.9], [10.22, 50.04], [9.93, 49.79], [9.5, 49.75], [9.15, 49.97],
  [8.68, 50.11], [8.45, 50.09], [8.3, 50.0],
];

/** Die Mosel — Trier, Koblenz. */
const MOSEL = [
  [6.15, 49.5], [6.64, 49.75], [7.1, 49.98], [7.4, 50.15], [7.6, 50.36],
];

/** Die Weser. */
const WESER = [
  [9.65, 51.42], [9.5, 52.0], [9.2, 52.55], [8.8, 53.08], [8.5, 53.6],
];

/** Die Donau — Donaueschingen, Ulm, Ingolstadt. */
const DONAU = [
  [8.5, 47.95], [9.99, 48.4], [10.9, 48.75],
];

/** Die Seine — Burgund, Paris, Rouen, Le Havre. */
const SEINE = [
  [4.7, 47.8], [3.3, 48.4], [2.35, 48.85], [1.1, 49.44], [0.5, 49.45],
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
  kanalkueste: KANALKUESTE,
  niederlandeKueste: NIEDERLANDE_KUESTE,
  deutscheNordseekueste: DEUTSCHE_NORDSEEKUESTE,
  deutscheOstseekueste: DEUTSCHE_OSTSEEKUESTE,
  englandSuedkueste: ENGLAND_SUEDKUESTE,
  englandOstkueste: ENGLAND_OSTKUESTE,
  englandWestkueste: ENGLAND_WESTKUESTE,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [FESTLAND, GROSSBRITANNIEN];

// ---------------------------------------------------------------------------
// Die Orte der Phasen — kleine Rechtecke um die Städte, damit der Umschalter
// zeigen kann, wo die jeweilige Zeit spielte.
// ---------------------------------------------------------------------------

/** Mainz — BioNTech, das Unternehmen von Uğur Şahin und Özlem Türeci. */
const MAINZ_ORT = [
  [8.15, 50.08], [8.42, 50.08], [8.42, 49.9], [8.15, 49.9],
];

/** Tübingen — CureVac, gegründet im Jahr 2000. */
const TUEBINGEN_ORT = [
  [8.92, 48.6], [9.19, 48.6], [9.19, 48.44], [8.92, 48.44],
];

/** Marburg — das Werk, das ab 2021 die Dosen für Europa herstellte. */
const MARBURG_ORT = [
  [8.64, 50.88], [8.9, 50.88], [8.9, 50.73], [8.64, 50.73],
];

/** Oxford — der Vektor-Impfstoff von Sarah Gilbert und ihrer Gruppe. */
const OXFORD_ORT = [
  [-1.4, 51.83], [-1.11, 51.83], [-1.11, 51.67], [-1.4, 51.67],
];

/** Coventry — die erste Impfung außerhalb einer Studie, 8. Dezember 2020. */
const COVENTRY_ORT = [
  [-1.65, 52.49], [-1.37, 52.49], [-1.37, 52.33], [-1.65, 52.33],
];

/** London — die britische Arzneimittelbehörde MHRA. */
const LONDON_ORT = [
  [-0.35, 51.62], [0.1, 51.62], [0.1, 51.4], [-0.35, 51.4],
];

/** Amsterdam — die Europäische Arzneimittel-Agentur EMA seit 2019. */
const AMSTERDAM_ORT = [
  [4.78, 52.45], [5.02, 52.45], [5.02, 52.3], [4.78, 52.3],
];

/** Puurs in Belgien — das Werk, aus dem die europäischen Dosen kamen. */
const PUURS_ORT = [
  [4.16, 51.14], [4.4, 51.14], [4.4, 51.0], [4.16, 51.0],
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
    gebirge(SCHWARZWALD),
    gebirge(SCHWAEBISCHE_ALB),
    gebirge(VOGESEN),
    gebirge(EIFEL_UND_ARDENNEN),
    gebirge(TAUNUS),
    gebirge(WESTERWALD_UND_ROTHAAR),
    gebirge(ODENWALD),
    gebirge(SPESSART_UND_RHOEN),
    gebirge(HARZ),
    gebirge(PENNINEN),
    gebirge(COTSWOLDS),
    fluss(RHEIN),
    fluss(NECKAR),
    fluss(LAHN),
    fluss(MAIN),
    fluss(MOSEL),
    fluss(WESER),
    fluss(DONAU),
    fluss(SEINE),
    fluss(THEMSE),
  ],

  phasen: [
    {
      id: 'vorarbeit-1990-2019',
      label: '1990–2019: dreißig Jahre Vorarbeit — die mRNA lernt laufen',
      hinweis:
        'Lange vor der Pandemie steht die Idee fest: Man könnte dem Körper ' +
        'statt eines Erregers nur die Bauanleitung für ein einzelnes Eiweiß ' +
        'geben und ihn den Rest selbst machen lassen. 1990 zeigt eine ' +
        'Arbeitsgruppe in Wisconsin, dass in einen Mäusemuskel gespritzte ' +
        'mRNA dort tatsächlich Eiweiß herstellen lässt. Der Haken: Fremde ' +
        'mRNA löst im Körper einen Entzündungsalarm aus und wird zerstört. ' +
        '2005 veröffentlichen Katalin Karikó und Drew Weissman in ' +
        'Philadelphia die Lösung — ein leicht verändertes Nukleosid, das ' +
        'den Alarm nicht auslöst. Aus dieser Arbeit entstehen die Firmen: ' +
        'CureVac 2000 in Tübingen, Moderna 2010 in Cambridge bei Boston, ' +
        'BioNTech 2008 in Mainz, zunächst für Krebstherapien.',
      flaechen: [
        { titel: 'Tübingen — CureVac, gegründet im Jahr 2000', d: P.pfad(TUEBINGEN_ORT) },
        { titel: 'Mainz — BioNTech, gegründet 2008 für Krebstherapien', d: P.pfad(MAINZ_ORT) },
      ],
    },
    {
      id: 'sequenz-januar-2020',
      label: '10. Januar 2020: die Erbgutfolge — der Entwurf steht in Tagen',
      hinweis:
        'Ein Team um Zhang Yongzhen stellt die vollständige Erbgutfolge des ' +
        'neuen Coronavirus ins offene Netz. Damit braucht niemand mehr das ' +
        'Virus selbst: Die Buchstabenfolge genügt. Bei Moderna steht der ' +
        'Entwurf des Impfstoffs binnen zweier Tage; in Mainz beginnt am ' +
        '27. Januar 2020 das „Projekt Lichtgeschwindigkeit" mit zwanzig ' +
        'Kandidaten; in Oxford entwirft die Gruppe um Sarah Gilbert ihren ' +
        'Vektor-Impfstoff. Am 16. März 2020 bekommt in Seattle die erste ' +
        'Freiwillige eine mRNA-Spritze — 66 Tage nach der Veröffentlichung ' +
        'der Sequenz.',
      flaechen: [
        { titel: 'Mainz — „Projekt Lichtgeschwindigkeit" ab 27. Januar 2020', d: P.pfad(MAINZ_ORT) },
        { titel: 'Tübingen — CureVac entwirft seinen eigenen Kandidaten', d: P.pfad(TUEBINGEN_ORT) },
        { titel: 'Oxford — der Vektor-Impfstoff der Gruppe um Sarah Gilbert', d: P.pfad(OXFORD_ORT) },
      ],
    },
    {
      id: 'pruefung-2020',
      label: 'April bis November 2020: die Prüfung am Menschen — 43.548 Freiwillige',
      hinweis:
        'Am 23. April 2020 wird in Deutschland der erste mRNA-Kandidat am ' +
        'Menschen geprüft; die entscheidende Studie beginnt am 27. Juli 2020 ' +
        'und schließt 43.548 Freiwillige ein, zufällig zugeteilt, ' +
        'verblindet, gegen Scheinimpfung. Am 9. November 2020 wird das ' +
        'Zwischenergebnis bekanntgegeben: Von 170 später bestätigten ' +
        'Erkrankungen entfielen 162 auf die Scheinimpfung und 8 auf den ' +
        'Impfstoff. Die drei Prüfstufen wurden durchlaufen — was fehlte, war ' +
        'die Zeit danach: Die Nachbeobachtung reichte im Mittel etwa zwei ' +
        'Monate über die zweite Dosis hinaus.',
      flaechen: [
        { titel: 'Mainz — die Studie mit 43.548 Freiwilligen ab 27. Juli 2020', d: P.pfad(MAINZ_ORT) },
        { titel: 'Oxford — die parallele Prüfung des Vektor-Impfstoffs', d: P.pfad(OXFORD_ORT) },
      ],
    },
    {
      id: 'zulassung-dezember-2020',
      label: '2. bis 21. Dezember 2020: die Notfallzulassung und die erste Impfung',
      hinweis:
        'Am 2. Dezember 2020 lässt die britische Behörde MHRA den ' +
        'mRNA-Impfstoff als erste Behörde der Welt zu — als befristete ' +
        'Notfallzulassung. Am 8. Dezember 2020 bekommt in Coventry die ' +
        'neunzigjährige Margaret Keenan die erste Spritze außerhalb einer ' +
        'Studie. Am 11. Dezember folgt die amerikanische FDA, am ' +
        '21. Dezember die europäische EMA in Amsterdam mit einer bedingten ' +
        'Zulassung unter Auflagen; am 27. Dezember beginnen die Impfungen in ' +
        'der Europäischen Union. Nie zuvor war eine völlig neue ' +
        'Arzneimittel-Technologie so schnell zugelassen worden.',
      flaechen: [
        { titel: 'London — die MHRA lässt am 2. Dezember 2020 als erste zu', d: P.pfad(LONDON_ORT) },
        { titel: 'Coventry — die erste Impfung der Welt am 8. Dezember 2020', d: P.pfad(COVENTRY_ORT) },
        { titel: 'Amsterdam — die bedingte Zulassung der EMA, 21. Dezember 2020', d: P.pfad(AMSTERDAM_ORT) },
      ],
    },
    {
      id: 'massenimpfung-2021-2022',
      label: '2021–2022: die Produktion, die Massenimpfung und die Nebenwirkungen',
      hinweis:
        'Aus dem Entwurf wird eine Warenmenge: Im Februar 2021 nimmt das ' +
        'Werk in Marburg die Herstellung auf, ausgelegt auf bis zu eine ' +
        'Milliarde Dosen im Jahr; die europäischen Lieferungen laufen über ' +
        'Puurs in Belgien. Weltweit werden über dreizehn Milliarden Dosen ' +
        'verabreicht. Im selben Zeitraum werden die seltenen Nebenwirkungen ' +
        'sichtbar: ab Frühjahr 2021 Herzmuskelentzündungen vor allem bei ' +
        'jungen Männern nach der zweiten Dosis, bei den Vektor-Impfstoffen ' +
        'sehr seltene Thrombosen mit Blutplättchenmangel. Und CureVac ' +
        'scheitert: Der Tübinger Kandidat erreicht im Juni 2021 nur 47 ' +
        'Prozent Schutzwirkung.',
      flaechen: [
        { titel: 'Marburg — das Werk für bis zu eine Milliarde Dosen im Jahr', d: P.pfad(MARBURG_ORT) },
        { titel: 'Puurs (Belgien) — die Abfüllung für Europa und Großbritannien', d: P.pfad(PUURS_ORT) },
        { titel: 'Tübingen — der gescheiterte Kandidat, Juni 2021', d: P.pfad(TUEBINGEN_ORT) },
      ],
    },
    {
      id: 'nobelpreis-2023',
      label: '2023: der Nobelpreis — und die Fragen, die offen bleiben',
      hinweis:
        'Am 2. Oktober 2023 erhalten Katalin Karikó und Drew Weissman den ' +
        'Nobelpreis für Physiologie oder Medizin — für die Entdeckung von ' +
        '2005, die dreißig Jahre lang kaum jemanden interessierte und ohne ' +
        'die es keinen mRNA-Impfstoff gäbe. Karikó hatte für diese Arbeit ' +
        'Fördergeld-Absagen gesammelt und 1995 an ihrer Universität eine ' +
        'Herabstufung hinnehmen müssen. Offen bleiben in denselben Jahren ' +
        'die Fragen, die nicht der Nobelpreis beantwortet: nach den ' +
        'Langzeitdaten, nach der Nutzen-Risiko-Abwägung für junge Menschen ' +
        'und nach dem Umgang mit Zweifeln.',
      flaechen: [
        { titel: 'Mainz — Katalin Karikó arbeitete hier seit 2013', d: P.pfad(MAINZ_ORT) },
        { titel: 'Tübingen — die Erinnerung daran, dass die Plattform nichts garantiert', d: P.pfad(TUEBINGEN_ORT) },
      ],
    },
  ],

  punkte: [
    {
      id: 'mainz',
      name: 'Mainz',
      typ: 'ereignis',
      ...ort(8.271, 49.993),
      text:
        'Hier sitzt seit 2008 BioNTech, gegründet von Uğur Şahin, Özlem ' +
        'Türeci und Christoph Huber — ursprünglich nicht für Impfstoffe, ' +
        'sondern für maßgeschneiderte Krebstherapien. Am 24. Januar 2020 ' +
        'liest Şahin einen Bericht über das neue Virus in Wuhan, am ' +
        '27. Januar beginnt das „Projekt Lichtgeschwindigkeit": zwanzig ' +
        'Impfstoff-Kandidaten, entworfen am Bildschirm aus der ' +
        'veröffentlichten Erbgutfolge. Im März 2020 kommt Pfizer als Partner ' +
        'dazu, im Juni die Entscheidung für den Kandidaten BNT162b2. Seit ' +
        '2013 arbeitet hier auch Katalin Karikó, die 2023 den Nobelpreis ' +
        'bekommt. Der deutsche Staat fördert die Entwicklung mit 375 ' +
        'Millionen Euro.',
    },
    {
      id: 'tuebingen',
      name: 'Tübingen',
      typ: 'ereignis',
      ...ort(9.057, 48.52),
      text:
        'Der älteste Ort dieser Geschichte in Europa. Hier wies Ingmar Hoerr ' +
        'in seiner Doktorarbeit nach, dass gespritzte mRNA im Körper eine ' +
        'Immunantwort auslösen kann; im Jahr 2000 gründete er mit anderen ' +
        'CureVac — die erste Firma der Welt, die auf mRNA als Arzneimittel ' +
        'setzte. Zwanzig Jahre lang galt das als Außenseiter-Idee. In der ' +
        'Pandemie entwickelte CureVac einen eigenen Impfstoff mit ' +
        'unveränderter mRNA und erreichte im Juni 2021 nur 47 Prozent ' +
        'Schutzwirkung; die Entwicklung wurde im Oktober 2021 eingestellt. ' +
        'Tübingen ist deshalb beides: die Wiege der Idee und der Beweis, ' +
        'dass die Plattform allein noch nichts garantiert.',
    },
    {
      id: 'marburg',
      name: 'Marburg',
      typ: 'ereignis',
      ...ort(8.766, 50.809),
      text:
        'Ein Impfstoff, den man nicht herstellen kann, hilft niemandem. Im ' +
        'September 2020 — Monate vor jeder Zulassung und auf eigenes Risiko ' +
        '— kaufte BioNTech hier ein Werk von Novartis und baute es um. Ab ' +
        'Februar 2021 lief die Herstellung: ausgelegt auf bis zu eine ' +
        'Milliarde Dosen im Jahr, damit eines der größten mRNA-Werke der ' +
        'Welt. Die Stadt hat eine lange Impfstoff-Geschichte: Schon Emil von ' +
        'Behring, der erste Medizin-Nobelpreisträger, ließ hier ab 1904 ' +
        'Seren herstellen. Die Abfüllung für Europa lief zusätzlich über ' +
        'Puurs in Belgien.',
    },
    {
      id: 'oxford',
      name: 'Oxford',
      typ: 'ereignis',
      ...ort(-1.257, 51.752),
      text:
        'Nicht jeder Impfstoff dieser Jahre war ein mRNA-Impfstoff. In ' +
        'Oxford entwickelte die Gruppe um Sarah Gilbert einen ' +
        'Vektor-Impfstoff: Ein harmloses Schimpansen-Erkältungsvirus trägt ' +
        'die Bauanleitung in die Zelle. Die Plattform war aus der ' +
        'MERS-Forschung vorbereitet, der Entwurf stand im Januar 2020. Am ' +
        '30. Dezember 2020 wurde er in Großbritannien zugelassen und in ' +
        'Zusammenarbeit mit AstraZeneca während der Pandemie zum ' +
        'Selbstkostenpreis abgegeben — er wurde damit zum meistverwendeten ' +
        'Impfstoff in ärmeren Ländern. Im März 2021 zeigten sich sehr ' +
        'seltene Thrombosen mit Blutplättchenmangel; mehrere Länder ' +
        'schränkten den Einsatz auf ältere Menschen ein.',
    },
    {
      id: 'coventry',
      name: 'Coventry',
      typ: 'ereignis',
      ...ort(-1.512, 52.408),
      text:
        'Am 8. Dezember 2020 um kurz nach halb sieben Uhr morgens bekam im ' +
        'Universitätskrankenhaus die neunzigjährige Margaret Keenan die ' +
        'erste Dosis eines zugelassenen mRNA-Impfstoffs außerhalb einer ' +
        'Studie — der erste Mensch der Welt. Der zweite Geimpfte des Tages ' +
        'hieß William Shakespeare und war 81 Jahre alt. Zwischen der ' +
        'Veröffentlichung der Erbgutfolge und diesem Morgen lagen 333 Tage. ' +
        'Zum Vergleich: Für den Mumps-Impfstoff, den bis dahin schnellsten ' +
        'der Geschichte, hatte man in den 1960er Jahren vier Jahre ' +
        'gebraucht.',
    },
    {
      id: 'london',
      name: 'London',
      typ: 'ereignis',
      ...ort(-0.128, 51.508),
      text:
        'Sitz der britischen Arzneimittelbehörde MHRA, die am 2. Dezember ' +
        '2020 als erste Behörde der Welt einen mRNA-Impfstoff zuließ — ' +
        'befristet, im Notfallverfahren, sechs Tage nach dem Eingang der ' +
        'letzten Studiendaten. Möglich war das durch das rollende Verfahren: ' +
        'Die Unterlagen wurden geprüft, sobald sie entstanden, statt am Ende ' +
        'als Stapel. Genau an diesem Punkt scheiden sich die Geister — die ' +
        'einen sehen eine Bürokratie, die endlich Tempo machte, die anderen ' +
        'eine Prüfung unter politischem Druck. Beide Sichtweisen stehen in ' +
        'diesem Kapitel nebeneinander.',
    },
  ],

  bewegungen: [
    {
      id: 'sequenz-aus-china',
      name: 'Die Erbgutfolge erreicht die Labore',
      von: station(10.85, 49.35),
      ueber: [station(9.8, 49.6)],
      nach: station(8.271, 49.993),
      text:
        'Diese Linie beginnt weit außerhalb des Blattes: Am 10. Januar 2020 ' +
        'stellte ein Team um Zhang Yongzhen die vollständige Erbgutfolge des ' +
        'neuen Coronavirus ins offene Netz — die Probe stammte aus Wuhan, ' +
        'rund achttausend Kilometer östlich von hier. Was reiste, war kein ' +
        'Virus und kein Stoff, sondern eine Datei mit rund 30.000 ' +
        'Buchstaben. Wenige Stunden später arbeiteten Labore in Mainz, ' +
        'Tübingen, Oxford und Cambridge bei Boston damit. Zum ersten Mal in ' +
        'der Geschichte der Medizin begann eine Impfstoff-Entwicklung nicht ' +
        'mit einem Erreger, sondern mit einer Information.',
    },
    {
      id: 'dosen-nach-coventry',
      name: 'Der Weg der ersten Dosen',
      von: station(8.271, 49.993),
      ueber: [station(4.28, 51.07)],
      nach: station(-1.512, 52.408),
      text:
        'Der Impfstoff wurde in Mainz entworfen, in Belgien abgefüllt und ' +
        'nach Großbritannien gefahren: Die ersten Dosen kamen aus dem Werk ' +
        'in Puurs, gekühlt auf etwa minus 70 Grad, in Spezialbehältern mit ' +
        'Trockeneis. Am 8. Dezember 2020 wurde daraus in Coventry die erste ' +
        'Impfung der Welt außerhalb einer Studie. Die Kühlkette war eine der ' +
        'unterschätzten Schwierigkeiten dieser Technologie — sie machte die ' +
        'ersten Monate zu einer Frage der Logistik und benachteiligte Länder ' +
        'ohne solche Ausrüstung.',
    },
    {
      id: 'unterlagen-nach-amsterdam',
      name: 'Die Unterlagen gehen zur Prüfung',
      von: station(8.271, 49.993),
      ueber: [station(6.5, 51.3)],
      nach: station(4.902, 52.373),
      text:
        'Nach Amsterdam, wo die Europäische Arzneimittel-Agentur seit 2019 ' +
        'sitzt, gingen die Studienunterlagen im rollenden Verfahren: ' +
        'kapitelweise, sobald ein Teil fertig war. Am 21. Dezember 2020 ' +
        'sprach die EMA eine bedingte Zulassung aus — bedingt heißt: mit ' +
        'Auflagen, die weiterlaufen. Die Hersteller mussten die ' +
        'Studienteilnehmer weiter beobachten und regelmäßig ' +
        'Sicherheitsberichte vorlegen. Sechs Tage später begannen in der ' +
        'Europäischen Union die Impfungen.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 4.0, 54.6),
    schrift('Ostsee', 'meer', 10.5, 54.95),
    schrift('Ärmelkanal', 'meer', 0.0, 50.1, -14),
    schrift('Atlantik', 'meer', -2.6, 47.7),
    schrift('Rhein', 'meer', 7.5, 50.45, -60),
    schrift('Neckar', 'meer', 9.4, 48.95, -55),
    schrift('Main', 'meer', 9.4, 50.03, -8),
    schrift('Lahn', 'meer', 8.35, 50.68, -25),
    schrift('Themse', 'meer', 0.35, 51.58),
    schrift('Donau', 'meer', 10.2, 48.62, 12),
    schrift('Deutschland', 'land', 10.2, 51.5),
    schrift('England', 'land', -1.9, 53.2),
    schrift('Frankreich', 'land', 2.5, 48.3),
    schrift('Niederlande', 'land', 5.8, 52.4),
    schrift('Belgien', 'land', 4.6, 50.55),
    schrift('Schweiz', 'land', 7.9, 47.15),
    schrift('Alpen', 'land', 9.6, 47.2),
    schrift('Mainz', 'land', 8.72, 49.93),
    schrift('Tübingen', 'land', 9.45, 48.45),
    schrift('Marburg', 'land', 9.2, 50.83),
    schrift('Oxford', 'land', -2.0, 51.85),
    schrift('Coventry', 'land', -2.45, 52.44),
    schrift('London', 'land', 0.3, 51.42),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
