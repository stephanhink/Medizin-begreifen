// Karte zu „Die Verstaatlichung des Gesundheitswesens" — das Deutsche Reich
// und seine Nachbarn, 1871 bis 1914.
//
// Wie in den Kapiteln 1 bis 12 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-verstaatlichung.mjs nach.
//
// Was die Karte zeigen soll: den Raum, in dem der Staat zur dritten Macht am
// Krankenbett wurde. Im Westen das Ruhrgebiet — die Zechen und Hütten, in
// denen die Arbeiter standen, um die es ging. In der Mitte Berlin, wo die
// drei Gesetze beschlossen wurden. Im Norden Hamburg, wo die Cholera von
// 1892 zeigte, was ein Staat versäumt, wenn er die Hygiene nicht zu seiner
// Sache macht. Im Osten Dresden, wo 1911 die Volksgesundheit zur Ausstellung
// wurde. Und im Süden die zwei Kurorte — Bad Kissingen, in dem der Kanzler
// selbst Wasser trank, und Bad Wörishofen, wo ein Pfarrer ohne Approbation
// Zehntausende behandelte, während in Berlin über die „Kurpfuscherei"
// gestritten wurde.
//
// Deshalb dieser Ausschnitt: von der Zeeländischen Küste bis an die Weichsel,
// vom Alpenrand bis an die Ostsee. Er reicht im Osten weit genug für Wien und
// Breslau und im Norden weit genug für die deutsche Nordsee- und
// Ostseeküste.
//
// Aufbau der Landmassen: das Festland als ein Ring (die Niederlande, die
// deutsche Nordseeküste, Jütland, die Ostseeküste bis Hinterpommern; im
// Norden, Osten, Süden und Westen außerhalb des Rahmens geschlossen, damit
// die Fläche ausläuft statt am Bildrand abzuknicken) und Lolland-Falster als
// einzige Insel, die groß genug für dieses Blatt ist. Fehmarn, Rügen und
// Usedom sind mit der Küstenlinie gezeichnet: Die Bodden und Sunde dazwischen
// sind in diesem Maßstab Haarstriche.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: von Zeeland bis an die Weichsel, vom Alpenrand bis
 * an die Ostsee.
 */
const RAHMEN = {
  minLon: 3,
  maxLon: 17,
  minLat: 46.8,
  maxLat: 55,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 12, damit alle Karten
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
// mehrfach verwendbar. Die deutschen Abschnitte tragen später auch die
// Grenze des Reiches, deshalb stehen sie für sich.
// ---------------------------------------------------------------------------

/**
 * Zeeland → Hoek van Holland → Den Helder → Wattenmeer → Dollart.
 *
 * Der westliche Beginn liegt bewusst außerhalb des Rahmens, damit die Küste
 * am Bildrand nicht abknickt.
 */
const NIEDERLANDE_KUESTE = [
  [2.55, 51.09], [3.19, 51.34], [3.45, 51.52], [3.72, 51.6], [4.12, 51.98],
  [4.55, 52.46], [4.76, 52.96], [5.35, 53.25], [6.18, 53.42],
];

/**
 * Dollart → Jadebusen → Wesermündung → Elbmündung → Nordfriesland.
 *
 * Diese Küste ist zugleich die Nordgrenze des Reiches am Wasser; sie wird
 * unten für das Reichsgebiet noch einmal gebraucht.
 */
const DEUTSCHE_NORDSEEKUESTE = [
  [7.0, 53.4], [7.6, 53.5], [8.15, 53.52], [8.5, 53.6], [8.9, 53.9],
  [8.86, 54.13], [8.62, 54.32], [8.95, 54.47], [8.83, 54.65], [8.72, 54.9],
];

/**
 * Der Riegel quer über Jütland — bewusst oberhalb des Rahmens.
 *
 * Die deutsch-dänische Grenze lief von 1864 bis 1920 an der Königsau, gut
 * einen halben Breitengrad über dem oberen Bildrand. Auf diesem Blatt ist
 * also alles Sichtbare der Halbinsel deutsch.
 */
const JUETLAND_RAND = [
  [8.6, 55.45], [10.35, 55.45], [10.05, 55.1],
];

/**
 * Flensburger Förde → Kieler Förde → Lübecker Bucht → Rügen → Usedom.
 *
 * Fehmarn und Rügen sind mit der Küstenlinie gezeichnet: Der Fehmarnsund ist
 * gut einen Kilometer breit, der Strelasund keine drei — in diesem Maßstab
 * sind das Haarstriche.
 */
const DEUTSCHE_OSTSEEKUESTE = [
  [9.55, 54.85], [9.95, 54.7], [9.78, 54.5], [10.25, 54.42], [10.72, 54.3],
  [11.1, 54.45], [11.02, 54.02], [10.9, 53.94], [11.3, 53.92], [11.55, 54.07],
  [11.95, 54.16], [12.35, 54.32], [12.45, 54.46], [13.1, 54.42],
  [13.45, 54.68], [13.72, 54.35], [14.05, 54.05], [14.5, 54.02],
];

/**
 * Hinterpommern → Danziger Bucht.
 *
 * Der Osten des Blattes: Kolberg, Rügenwalde, Stolpmünde, Leba. Der letzte
 * Punkt liegt außerhalb des Rahmens.
 */
const POMMERSCHE_KUESTE = [
  [15.0, 54.12], [15.75, 54.25], [16.35, 54.42], [17.0, 54.62],
  [17.75, 54.8], [18.5, 54.9],
];

/** Der Ost-, Süd- und Westrand: bewusst außerhalb des Rahmens. */
const FESTLAND_RAND = [
  [18.6, 54.4], [18.6, 46.0], [2.0, 46.0], [2.0, 50.9],
];

/** Der große Ring: die Niederlande, Deutschland, Jütland, Hinterpommern. */
const FESTLAND = verbinde(
  NIEDERLANDE_KUESTE,
  DEUTSCHE_NORDSEEKUESTE,
  JUETLAND_RAND,
  DEUTSCHE_OSTSEEKUESTE,
  POMMERSCHE_KUESTE,
  FESTLAND_RAND,
);

/**
 * Lolland und Falster — die einzige Insel, die auf diesem Blatt Platz hat.
 *
 * Fünen und Seeland liegen oberhalb des Rahmens; die kleinen dänischen
 * Inseln dazwischen wären in diesem Maßstab Punkte.
 */
const LOLLAND_FALSTER = [
  [11.0, 54.77], [11.35, 54.65], [11.9, 54.58], [12.15, 54.72],
  [12.0, 54.9], [11.5, 54.92], [11.1, 54.87],
];

// ---------------------------------------------------------------------------
// Die Grenzen des Deutschen Reiches von 1871 — der Rahmen, in dem die drei
// Gesetze galten. Sie werden unten als Phasenfläche gebraucht.
// ---------------------------------------------------------------------------

/**
 * Die Südgrenze, von Osten nach Westen gelesen.
 *
 * Von Oberschlesien am Dreikaisereck über den Böhmerwald und Passau an den
 * Alpenrand und weiter zum Bodensee und nach Basel. Böhmen und Österreich
 * lagen außerhalb — deshalb hatte Wien 1888 seine eigene Krankenversicherung.
 */
const REICH_SUEDGRENZE = [
  [18.6, 49.9], [18.0, 49.95], [17.3, 50.15], [16.6, 50.3], [16.0, 50.65],
  [15.35, 50.8], [14.8, 50.87], [14.35, 50.9], [13.9, 50.75], [13.3, 50.6],
  [12.7, 50.4], [12.2, 50.25], [12.5, 49.9], [12.6, 49.5], [13.0, 49.3],
  [13.4, 48.95], [13.8, 48.55], [13.0, 47.7], [12.8, 47.6], [12.2, 47.7],
  [11.4, 47.45], [10.9, 47.4], [10.45, 47.55], [10.1, 47.38], [9.2, 47.65],
  [8.6, 47.65], [8.4, 47.57], [8.0, 47.6], [7.6, 47.59],
];

/**
 * Die Westgrenze, von Basel nach Norden gelesen.
 *
 * Elsass und Lothringen gehörten seit 1871 zum Reich, deshalb läuft die
 * Linie westlich der Vogesen. Weiter über Luxemburg, Belgien und die
 * niederländische Grenze zurück an die Nordsee.
 */
const REICH_WESTGRENZE = [
  [7.0, 47.5], [6.9, 47.9], [6.8, 48.3], [6.6, 48.6], [6.3, 49.0],
  [5.9, 49.5], [6.15, 49.7], [6.5, 49.8], [6.4, 50.3], [6.2, 50.5],
  [5.95, 50.75], [6.0, 51.2], [6.2, 51.5], [6.8, 51.8], [6.7, 52.4],
  [7.05, 52.65], [6.7, 53.0],
];

/** Das Reichsgebiet als geschlossener Ring — Küste, Ostgrenze, Süd-, Westgrenze. */
const REICH_1871 = verbinde(
  DEUTSCHE_NORDSEEKUESTE,
  JUETLAND_RAND,
  DEUTSCHE_OSTSEEKUESTE,
  POMMERSCHE_KUESTE,
  [[18.6, 54.4], [18.6, 49.9]],
  REICH_SUEDGRENZE,
  REICH_WESTGRENZE,
);

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Der Alpenbogen — grobe Fläche, keine Aussage über einzelne Gipfel. */
const ALPEN = [
  [6.4, 46.3], [8.5, 46.5], [11.0, 46.9], [13.0, 47.2], [15.0, 47.4],
  [15.8, 47.2], [14.0, 46.9], [12.0, 46.6], [9.5, 46.4], [7.0, 46.0],
];

/** Der Schwarzwald. */
const SCHWARZWALD = [
  [7.7, 47.7], [8.3, 47.8], [8.4, 48.6], [8.0, 48.8], [7.7, 48.3],
];

/** Die Schwäbische Alb. */
const SCHWAEBISCHE_ALB = [
  [8.8, 48.3], [10.3, 48.75], [10.4, 48.6], [9.0, 48.1],
];

/** Die Vogesen — seit 1871 auf deutscher Seite. */
const VOGESEN = [
  [6.75, 47.9], [7.25, 48.35], [7.15, 48.85], [6.8, 48.6], [6.6, 48.2],
];

/** Die Eifel und die Ardennen. */
const EIFEL_UND_ARDENNEN = [
  [4.9, 50.0], [6.2, 50.4], [6.6, 50.55], [5.8, 50.5], [4.9, 50.2],
];

/**
 * Das Sauerland — die Höhen südlich des Ruhrgebiets.
 *
 * Sie erklären die Lage des Reviers: Die Kohle liegt am Nordrand dieses
 * Berglands, und die Ruhr hat sie ans Wasser gebracht.
 */
const SAUERLAND = [
  [7.6, 51.0], [8.5, 51.2], [8.7, 51.0], [7.9, 50.8],
];

/** Spessart und Rhön — die Höhen um Bad Kissingen. */
const SPESSART_UND_RHOEN = [
  [9.2, 49.9], [9.6, 50.3], [10.1, 50.5], [10.3, 50.2], [9.9, 49.85],
  [9.5, 49.7],
];

/** Der Thüringer Wald. */
const THUERINGER_WALD = [
  [10.4, 50.4], [11.2, 50.75], [11.0, 50.5], [10.5, 50.25],
];

/** Der Harz. */
const HARZ = [
  [10.3, 51.6], [10.9, 51.75], [11.1, 51.6], [10.6, 51.5], [10.3, 51.5],
];

/** Das Erzgebirge — hinter ihm liegt Böhmen. */
const ERZGEBIRGE = [
  [12.5, 50.4], [13.5, 50.6], [14.0, 50.8], [13.4, 50.5], [12.7, 50.2],
];

/** Das Riesengebirge und die Sudeten. */
const SUDETEN = [
  [15.4, 50.8], [16.5, 50.6], [17.0, 50.2], [16.3, 50.3], [15.4, 50.65],
];

/** Der Böhmerwald. */
const BOEHMERWALD = [
  [12.5, 49.0], [13.4, 49.4], [14.0, 49.0], [13.2, 48.7], [12.6, 48.8],
];

/** Der Rhein — Basel, Straßburg, Mainz, Köln, Ruhrmündung, Rheinmündung. */
const RHEIN = [
  [7.6, 47.55], [7.62, 48.58], [8.0, 49.0], [8.27, 50.0], [7.6, 50.36],
  [7.1, 50.73], [6.96, 50.94], [6.7, 51.4], [6.1, 51.85], [5.0, 51.95],
  [4.15, 51.99],
];

/**
 * Die Ruhr — der Fluss, der dem Revier den Namen gab.
 *
 * Von den Höhen des Sauerlands bis zur Mündung in den Rhein bei Duisburg.
 * An ihrem Unterlauf lagen die Zechen, an denen die soziale Frage zuerst
 * gestellt wurde.
 */
const RUHR = [
  [8.45, 51.2], [8.0, 51.4], [7.4, 51.44], [6.75, 51.45],
];

/** Der Main — Bamberg, Würzburg, Frankfurt, Mündung in den Rhein. */
const MAIN = [
  [11.4, 50.05], [10.9, 49.9], [10.22, 50.04], [9.93, 49.79], [9.5, 49.75],
  [9.15, 49.97], [8.6, 50.05], [8.3, 50.0],
];

/** Die Weser — Hann. Münden, Minden, Bremen, Bremerhaven. */
const WESER = [
  [9.65, 51.42], [9.5, 52.0], [9.2, 52.55], [8.8, 53.08], [8.5, 53.6],
];

/** Die Elbe — Böhmen, Dresden, Magdeburg, Hamburg, Cuxhaven. */
const ELBE = [
  [14.2, 50.6], [13.74, 51.05], [12.4, 51.85], [11.63, 52.13], [11.0, 52.9],
  [10.0, 53.55], [9.2, 53.83], [8.9, 53.9],
];

/** Die Spree — Lausitz, Berlin, Mündung in die Havel bei Spandau. */
const SPREE = [
  [14.3, 51.8], [13.9, 52.15], [13.55, 52.4], [13.4, 52.52], [13.2, 52.53],
];

/** Die Oder — Oberschlesien, Breslau, Frankfurt an der Oder, Stettiner Haff. */
const ODER = [
  [18.1, 50.1], [17.9, 50.65], [17.03, 51.11], [16.1, 51.65], [15.0, 52.1],
  [14.55, 52.35], [14.3, 53.05], [14.55, 53.43], [14.35, 53.8], [14.27, 53.92],
];

/** Die Donau — Ulm, Regensburg, Passau, Linz, Wien. */
const DONAU = [
  [8.5, 47.95], [9.99, 48.4], [11.0, 48.75], [12.1, 49.02], [12.95, 48.77],
  [13.45, 48.57], [14.3, 48.28], [15.6, 48.25], [16.4, 48.15], [17.2, 47.85],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  lollandFalster: LOLLAND_FALSTER,
  niederlandeKueste: NIEDERLANDE_KUESTE,
  deutscheNordseekueste: DEUTSCHE_NORDSEEKUESTE,
  deutscheOstseekueste: DEUTSCHE_OSTSEEKUESTE,
  pommerscheKueste: POMMERSCHE_KUESTE,
  reich1871: REICH_1871,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [FESTLAND, LOLLAND_FALSTER];

// ---------------------------------------------------------------------------
// Die Phasen: vierzig Jahre vom Elend der Industriestädte bis zur
// Reichsversicherungsordnung.
// ---------------------------------------------------------------------------

/** Das Ruhrrevier — Essen, Bochum, Dortmund, Gelsenkirchen. */
const RUHRGEBIET = [
  [6.6, 51.6], [7.6, 51.6], [7.6, 51.3], [6.6, 51.3],
];

/** Oberschlesien — das zweite große Kohlerevier des Reiches. */
const OBERSCHLESIEN = [
  [18.0, 50.5], [19.0, 50.5], [19.0, 50.0], [18.0, 50.0],
];

/** Das sächsische Industriegebiet — Chemnitz, Zwickau, Dresden. */
const SACHSEN_INDUSTRIE = [
  [12.3, 51.4], [13.9, 51.4], [13.9, 50.6], [12.3, 50.6],
];

/** Berlin — Reichstag, Reichskanzleramt, Reichsversicherungsamt. */
const BERLIN_STADT = [
  [13.2, 52.65], [13.65, 52.65], [13.65, 52.4], [13.2, 52.4],
];

/** Hamburg mit Altona — die zwei Wasserwerke von 1892. */
const HAMBURG_STADT = [
  [9.8, 53.66], [10.2, 53.66], [10.2, 53.44], [9.8, 53.44],
];

/** Dresden — die Hygiene-Ausstellung von 1911. */
const DRESDEN_STADT = [
  [13.6, 51.13], [13.92, 51.13], [13.92, 50.97], [13.6, 50.97],
];

/** Bad Kissingen — der Kurort des Kanzlers. */
const BAD_KISSINGEN_ORT = [
  [9.95, 50.28], [10.22, 50.28], [10.22, 50.12], [9.95, 50.12],
];

/** Bad Wörishofen — der Kurort des Pfarrers. */
const WOERISHOFEN_ORT = [
  [10.44, 48.09], [10.76, 48.09], [10.76, 47.92], [10.44, 47.92],
];

/** München — Pettenkofer und die Hygiene als Lehrfach. */
const MUENCHEN_STADT = [
  [11.4, 48.25], [11.75, 48.25], [11.75, 48.0], [11.4, 48.0],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(FESTLAND),
    land(LOLLAND_FALSTER),
    gebirge(ALPEN),
    gebirge(SCHWARZWALD),
    gebirge(SCHWAEBISCHE_ALB),
    gebirge(VOGESEN),
    gebirge(EIFEL_UND_ARDENNEN),
    gebirge(SAUERLAND),
    gebirge(SPESSART_UND_RHOEN),
    gebirge(THUERINGER_WALD),
    gebirge(HARZ),
    gebirge(ERZGEBIRGE),
    gebirge(SUDETEN),
    gebirge(BOEHMERWALD),
    fluss(RHEIN),
    fluss(RUHR),
    fluss(MAIN),
    fluss(WESER),
    fluss(ELBE),
    fluss(SPREE),
    fluss(ODER),
    fluss(DONAU),
  ],

  phasen: [
    {
      id: 'soziale-frage-1871-1878',
      label: '1871–1878: das Kaiserreich, die Industrie und die soziale Frage',
      hinweis:
        'Nach der Reichsgründung 1871 wachsen die Industriestädte schneller, ' +
        'als jemand sie bauen kann. Im Ruhrrevier, in Oberschlesien und in ' +
        'Sachsen ziehen Hunderttausende vom Land an die Zechen und Webstühle. ' +
        'In Berlin entstehen die Mietskasernen mit ihren Hinterhöfen; ' +
        'sogenannte Schlafgänger mieten sich stundenweise ein Bett. Wer ' +
        'krank wird, verliert den Lohn: Es gibt keinen Anspruch auf Hilfe, ' +
        'nur die Armenpflege der Gemeinde — und die kostete in Preußen das ' +
        'Wahlrecht. Nach zwei Attentaten auf Kaiser Wilhelm I. verbietet das ' +
        'Sozialistengesetz vom 21. Oktober 1878 die Organisationen, ' +
        'Versammlungen und Zeitungen der Sozialdemokratie.',
      flaechen: [
        { titel: 'Das Ruhrrevier — Zechen, Hütten und Zuwanderung', d: P.pfad(RUHRGEBIET) },
        { titel: 'Oberschlesien — das zweite große Kohlerevier', d: P.pfad(OBERSCHLESIEN) },
        { titel: 'Sachsen — Textil, Maschinenbau und die frühen Hilfskassen', d: P.pfad(SACHSEN_INDUSTRIE) },
        { titel: 'Berlin — die Mietskasernen und das Sozialistengesetz von 1878', d: P.pfad(BERLIN_STADT) },
      ],
    },
    {
      id: 'drei-gesetze-1883-1889',
      label: '1881–1889: die drei Sozialgesetze — Berlin',
      hinweis:
        'Am 17. November 1881 verliest Bismarck im Reichstag die Kaiserliche ' +
        'Botschaft: Die Heilung der sozialen Schäden sei nicht allein durch ' +
        'die Unterdrückung sozialdemokratischer Ausschreitungen zu suchen, ' +
        'sondern ebenso durch die Förderung des Wohles der Arbeiter. Es ' +
        'folgen drei Gesetze: das Krankenversicherungsgesetz vom 15. Juni ' +
        '1883 (in Kraft am 1. Dezember 1884; Arbeiter tragen zwei Drittel ' +
        'des Beitrags, die Arbeitgeber ein Drittel), das ' +
        'Unfallversicherungsgesetz vom 6. Juli 1884 (allein von den ' +
        'Arbeitgebern getragen) und das Gesetz über die Invaliditäts- und ' +
        'Altersversicherung vom 22. Juni 1889 (Altersrente ab siebzig, in ' +
        'Kraft ab 1891). Das Deutsche Reich ist damit das erste Land der ' +
        'Welt mit einer gesetzlichen Pflichtversicherung.',
      flaechen: [
        { titel: 'Berlin — Reichstag und Reichsversicherungsamt', d: P.pfad(BERLIN_STADT) },
        { titel: 'Das Deutsche Reich 1871 — der Geltungsbereich der drei Gesetze', d: P.pfad(REICH_1871) },
      ],
    },
    {
      id: 'hygiene-1892-1900',
      label: '1892–1900: die Seuche als Staatsaufgabe — Hamburg und die Cholera',
      hinweis:
        'Im August 1892 bricht in Hamburg die Cholera aus; rund 8.600 ' +
        'Menschen sterben. Die Stadt entnimmt ihr Trinkwasser ungefiltert der ' +
        'Elbe. Das unmittelbar benachbarte Altona, das sein Wasser durch ' +
        'Sandfilter leitet, bleibt fast verschont — dieselben Straßenzüge, ' +
        'zwei Wasserwerke, zwei Ergebnisse. Robert Koch untersucht vor Ort ' +
        'und drängt auf Filtration und staatliche Aufsicht. München hatte ' +
        'unter Max von Pettenkofer schon in den 1860er Jahren Kanalisation ' +
        'und Wasserleitung gebaut, Berlin ab 1873. 1900 regelt ein ' +
        'Reichsgesetz die Bekämpfung gemeingefährlicher Krankheiten. Hygiene ' +
        'ist nun eine Sache der Behörden, nicht des guten Willens.',
      flaechen: [
        { titel: 'Hamburg und Altona — die Cholera von 1892', d: P.pfad(HAMBURG_STADT) },
        { titel: 'Berlin — Kanalisation und Rieselfelder ab 1873', d: P.pfad(BERLIN_STADT) },
        { titel: 'München — Pettenkofer und die Hygiene als Lehrfach', d: P.pfad(MUENCHEN_STADT) },
      ],
    },
    {
      id: 'kurierfreiheit-1900-1910',
      label: '1900–1910: der Streit um die „Kurpfuscherei" und die Kurorte',
      hinweis:
        'Die Gewerbeordnung von 1869 hatte die Kurierfreiheit gebracht: Wer ' +
        'heilen wollte, durfte heilen; geschützt war nur der Titel Arzt. Nach ' +
        '1883 zahlen die Kassen jedoch allein für zugelassene Ärzte — wer ' +
        'anders behandelt, wird nicht verboten, aber nicht bezahlt. Ab 1900 ' +
        'fordern die ärztlichen Verbände in mehreren Anläufen ein ' +
        'Kurpfuschereigesetz. Die Entwürfe scheitern im Reichstag, auch weil ' +
        'die Naturheilbewegung mit Hunderten von Vereinen und über ' +
        'hunderttausend Mitgliedern dagegen antritt. In Bad Wörishofen ' +
        'behandelt Pfarrer Sebastian Kneipp bis zu seinem Tod 1897 ' +
        'Zehntausende Kurgäste im Jahr; in Bad Kissingen kurt der Kanzler ' +
        'selbst.',
      flaechen: [
        { titel: 'Bad Wörishofen — Sebastian Kneipp und die Wasserkur', d: P.pfad(WOERISHOFEN_ORT) },
        { titel: 'Bad Kissingen — der Kurort des Reichskanzlers', d: P.pfad(BAD_KISSINGEN_ORT) },
        { titel: 'Berlin — die gescheiterten Kurpfuschereigesetze', d: P.pfad(BERLIN_STADT) },
      ],
    },
    {
      id: 'rvo-1911',
      label: '1911–1914: die Reichsversicherungsordnung vereinheitlicht das System',
      hinweis:
        'Am 19. Juli 1911 fasst die Reichsversicherungsordnung die drei ' +
        'Zweige in einem einzigen Gesetzbuch zusammen; im selben Jahr kommt ' +
        'die Angestelltenversicherung hinzu, und die Landarbeiter und ' +
        'Dienstboten werden einbezogen. Aus 4,3 Millionen Versicherten von ' +
        '1885 sind bis 1914 rund 16 Millionen geworden. 1911 zeigt die ' +
        'Internationale Hygiene-Ausstellung in Dresden der Bevölkerung den ' +
        'eigenen Körper als Sache der Volksgesundheit; daraus wird 1912 das ' +
        'Deutsche Hygiene-Museum. Im selben Jahrzehnt streiten die ' +
        'Kassenärzte um Honorare und Zulassung — das Berliner Abkommen von ' +
        '1913 wendet einen reichsweiten Ärztestreik ab.',
      flaechen: [
        { titel: 'Berlin — die Reichsversicherungsordnung vom 19. Juli 1911', d: P.pfad(BERLIN_STADT) },
        { titel: 'Dresden — die Internationale Hygiene-Ausstellung 1911', d: P.pfad(DRESDEN_STADT) },
        { titel: 'Das Deutsche Reich — rund 16 Millionen Versicherte bis 1914', d: P.pfad(REICH_1871) },
      ],
    },
  ],

  punkte: [
    {
      id: 'berlin',
      name: 'Berlin',
      typ: 'ereignis',
      ...ort(13.405, 52.52),
      text:
        'Der Ort, an dem der Staat an das Krankenbett tritt. Am 17. November ' +
        '1881 verliest Bismarck im Reichstag die Kaiserliche Botschaft, die ' +
        'die Sozialgesetze ankündigt. Am 15. Juni 1883 wird das ' +
        'Krankenversicherungsgesetz beschlossen, 1884 die Unfall-, 1889 die ' +
        'Alters- und Invaliditätsversicherung; 1911 fasst die ' +
        'Reichsversicherungsordnung alles zusammen. In derselben Stadt wächst ' +
        'die Kehrseite: die Mietskasernen mit ihren Hinterhöfen, in denen ' +
        'die Tuberkulose umgeht. Seit 1873 baut Berlin nach den Plänen James ' +
        'Hobrechts eine Kanalisation mit Rieselfeldern; Rudolf Virchow ' +
        'setzt sie als Stadtverordneter durch. 1891 erhält Robert Koch sein ' +
        'Institut.',
    },
    {
      id: 'essen',
      name: 'Essen und das Ruhrrevier',
      typ: 'stadt',
      ...ort(7.013, 51.455),
      text:
        'Der Anlass. Hier stehen die Menschen, um die es geht: Bergleute, ' +
        'Hüttenarbeiter, zugewandert aus Ostpreußen, Masuren und Schlesien — ' +
        'bis 1914 mehrere Hunderttausend. Wer unter Tage verunglückt, hatte ' +
        'vor 1884 nur eine Möglichkeit: den Arbeitgeber verklagen und ihm ' +
        'ein Verschulden nachweisen. Das Revier kannte allerdings schon ein ' +
        'Vorbild für die Pflichtkasse — die Knappschaften, die ' +
        'jahrhundertealten Bruderladen der Bergleute, in die jeder Kumpel ' +
        'einzahlte. Bei Krupp bestand seit 1836 eine Kranken- und ' +
        'Sterbekasse, dazu kamen Werkswohnungen und ein Werkskrankenhaus. ' +
        'Beides zusammen war die Blaupause: Pflicht, gemeinsame Kasse, ' +
        'fester Anspruch.',
    },
    {
      id: 'hamburg',
      name: 'Hamburg',
      typ: 'ereignis',
      ...ort(9.994, 53.551),
      text:
        'Der Beweis, was ein Staat versäumt, wenn er die Hygiene nicht zu ' +
        'seiner Sache macht. Im August 1892 bricht in der Hafenstadt die ' +
        'Cholera aus; rund 8.600 Menschen sterben in wenigen Wochen. Hamburg ' +
        'entnimmt sein Trinkwasser ungefiltert der Elbe, während das ' +
        'unmittelbar angrenzende Altona seines durch Sandfilter leitet — ' +
        'Altona bleibt fast verschont. An manchen Straßen verlief die ' +
        'Stadtgrenze mitten durch die Häuserzeile: dieselben Menschen, ' +
        'dieselbe Luft, zwei Wasserwerke, zwei Ergebnisse. Robert Koch kam ' +
        'und drängte auf Filtration. Danach baute Hamburg das Filterwerk, ' +
        'und 1900 regelte ein Reichsgesetz die Seuchenbekämpfung.',
    },
    {
      id: 'dresden',
      name: 'Dresden',
      typ: 'ereignis',
      ...ort(13.738, 51.05),
      text:
        'Die Stadt, in der die Volksgesundheit zur Ausstellung wurde. 1911 ' +
        'zeigt hier die Internationale Hygiene-Ausstellung Millionen ' +
        'Besuchern Zähne, Lunge, Abwasser und Säuglingspflege; daraus ' +
        'entsteht 1912 das Deutsche Hygiene-Museum. Der Gedanke dahinter: ' +
        'Gesundheit ist nicht nur Sache des Kranken, sondern ein Gut, über ' +
        'das die Allgemeinheit belehrt werden darf. In derselben Stadt ' +
        'stritt 1903 der Parteitag der Sozialdemokratie über den Weg zur ' +
        'Macht — jener Partei, die Bismarcks Gesetze eigentlich hatten ' +
        'schwächen sollen und die 1912 zur stärksten Fraktion des ' +
        'Reichstags wurde.',
    },
    {
      id: 'bad-kissingen',
      name: 'Bad Kissingen',
      typ: 'stadt',
      ...ort(10.078, 50.202),
      text:
        'Der Kurort des Kanzlers. Bismarck reiste über Jahrzehnte immer ' +
        'wieder hierher: Heilquellen, Trinkkur, Bäder, Spaziergänge, ' +
        'geregelter Tag. Am 13. Juli 1874 überlebte er hier ein Attentat. ' +
        'Ab 1883 behandelte ihn Ernst Schweninger, ein Arzt, den die ' +
        'Berliner Fakultät für einen Außenseiter hielt; er verordnete kaum ' +
        'Arznei, sondern Maß beim Essen und Trinken, Schlaf, Bewegung und ' +
        'Wickel — und der schwer übergewichtige Kanzler nahm stark ab. ' +
        'Während in Berlin die Kassenmedizin entstand, half dem Urheber der ' +
        'Gesetze ein Verfahren, das die Kassen nie bezahlt hätten.',
    },
    {
      id: 'bad-woerishofen',
      name: 'Bad Wörishofen',
      typ: 'stadt',
      ...ort(10.599, 48.005),
      text:
        'Das Dorf im schwäbischen Bayern, in dem ein Pfarrer ohne ' +
        'Approbation zum berühmtesten Heiler Europas wurde. Sebastian ' +
        'Kneipp (1821–1897) behandelte mit kaltem Wasser, Kräutern, ' +
        'Bewegung, Ernährung und geregelter Lebensweise. Sein Buch „Meine ' +
        'Wasserkur" von 1886 wurde in viele Sprachen übersetzt; in den ' +
        '1890er Jahren kamen Zehntausende Kurgäste im Jahr, 1894 empfing ihn ' +
        'Papst Leo XIII. Ärztliche Verbände warfen ihm Kurpfuscherei vor. ' +
        'Die Gewerbeordnung von 1869 erlaubte ihm die Behandlung — die ' +
        'Krankenkassen bezahlten sie nicht. Kapitel 17 erzählt seine ' +
        'Geschichte ausführlich.',
    },
  ],

  bewegungen: [
    {
      id: 'landflucht-ins-revier',
      name: 'Die Landflucht ins Revier',
      von: station(16.93, 52.41),
      ueber: [station(13.4, 52.3), station(9.8, 51.7)],
      nach: station(7.013, 51.455),
      text:
        'Die Bewegung, aus der die soziale Frage entstand. Zwischen 1870 und ' +
        '1914 zogen Millionen Menschen aus Ostpreußen, Masuren, Posen und ' +
        'Schlesien in die Industriereviere; allein ins Ruhrgebiet kamen ' +
        'mehrere Hunderttausend. Am Herkunftsort hatte eine kranke Familie ' +
        'Verwandte, ein Stück Land, eine Gemeinde, die sie kannte. In der ' +
        'Zechenkolonie hatte sie den Lohn — und sonst nichts. Genau diese ' +
        'Lücke sollte die Pflichtversicherung schließen.',
    },
    {
      id: 'cholera-nach-hamburg',
      name: 'Der Weg der Cholera 1892',
      von: station(16.9, 53.4),
      ueber: [station(13.4, 52.52)],
      nach: station(9.994, 53.551),
      text:
        'Die Cholera von 1892 kam über die Handels- und Auswandererwege aus ' +
        'dem Osten nach Hamburg, wo Tausende Durchreisende auf die ' +
        'Überfahrt nach Amerika warteten. In der Stadt fand sie ungefiltertes ' +
        'Elbwasser vor. Rund 8.600 Menschen starben. Das benachbarte Altona ' +
        'mit seinen Sandfiltern blieb fast verschont. Danach war die Frage ' +
        'entschieden, ob Wasser, Abwasser und Seuchenabwehr Sache des ' +
        'Einzelnen oder des Staates sind.',
    },
    {
      id: 'kurgaeste-nach-woerishofen',
      name: 'Die Kurgäste fahren zum Pfarrer',
      von: station(13.405, 52.52),
      ueber: [station(11.9, 50.6)],
      nach: station(10.599, 48.005),
      text:
        'Während in Berlin die Kassenmedizin gebaut wurde, fuhren aus ganz ' +
        'Europa Zehntausende in ein schwäbisches Dorf, um sich von einem ' +
        'Pfarrer mit kaltem Wasser behandeln zu lassen. Bad Wörishofen wuchs ' +
        'in wenigen Jahren vom Bauerndorf zum Kurort mit Bahnanschluss. Die ' +
        'Bewegung zeigt, was die Gesetze nicht erfassten: Ein großer Teil ' +
        'der Bevölkerung suchte weiter dort Hilfe, wo keine Kasse zahlte.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 5.0, 54.3),
    schrift('Ostsee', 'meer', 13.6, 54.9),
    schrift('Rhein', 'meer', 7.9, 50.2, -60),
    schrift('Ruhr', 'meer', 7.7, 51.28, -4),
    schrift('Elbe', 'meer', 11.6, 52.55, -50),
    schrift('Oder', 'meer', 15.2, 52.35, -70),
    schrift('Donau', 'meer', 12.6, 48.85, 14),
    schrift('Main', 'meer', 9.0, 50.06, -8),
    schrift('Deutsches Reich', 'land', 11.2, 51.9),
    schrift('Ruhrgebiet', 'land', 7.1, 51.72),
    schrift('Berlin', 'land', 12.75, 52.66),
    schrift('Hamburg', 'land', 9.3, 53.7),
    schrift('Dresden', 'land', 14.15, 51.02),
    schrift('München', 'land', 12.1, 48.03),
    schrift('Wien', 'land', 16.4, 48.35),
    schrift('Niederlande', 'land', 5.7, 52.35),
    schrift('Böhmen', 'land', 14.6, 49.7),
    schrift('Schlesien', 'land', 16.5, 51.0),
    schrift('Alpen', 'land', 11.5, 47.1),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
