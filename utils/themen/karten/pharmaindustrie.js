// Karte zu „Die moderne Pharmaindustrie" — die Werkbank Europas, 1668 bis
// heute.
//
// Wie in den Kapiteln 1 bis 13 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-pharmaindustrie.mjs nach.
//
// Was die Karte zeigen soll: Die Pharmaindustrie hat einen Geburtsort, und
// er liegt zwischen Rhein, Main und Wupper. In Darmstadt steht die Apotheke,
// aus der 1827 ein Handel mit reinen Wirkstoffen wurde. In Elberfeld an der
// Wupper — heute ein Stadtteil von Wuppertal — entstanden 1897 im Abstand
// von elf Tagen zwei Stoffe im selben Labor: die Acetylsalicylsäure und das
// Diacetylmorphin, das ab 1898 als „Heroin" verkauft wurde. In Höchst am
// Main wurde 1910 das Salvarsan hergestellt, das erste gezielt entworfene
// Arzneimittel gegen einen Erreger. In Berlin wuchs aus der Grünen Apotheke
// ein Hormonkonzern. In Basel wurde aus Farbenfabriken die dichteste
// Pharmalandschaft der Welt. Und in Stolberg bei Aachen kam 1957 ein
// Schlafmittel auf den Markt, dessen Name bis heute für alles steht, was
// geschieht, wenn geprüft wird, nachdem verkauft wurde.
//
// Deshalb dieser Ausschnitt: vom Ärmelkanal bis an die Oder, vom Alpenrand
// bis an die Ostsee. Er hält die sechs Orte auf einem Blatt zusammen und
// lässt im Westen genug Wasser, damit die Wege über den Atlantik — nach
// Indianapolis, nach New York — das Bild verlassen können.
//
// Aufbau der Landmassen: das Festland als ein Ring (Nordfrankreich, Belgien,
// die Niederlande, die deutsche Nordseeküste, Jütland, die Ostseeküste; im
// Westen, Süden und Osten außerhalb des Rahmens geschlossen, damit die
// Fläche ausläuft statt am Bildrand abzuknicken) und der Südosten Englands
// als zweiter Ring — Kent, Ostanglien und die Themsemündung ragen in dieses
// Blatt hinein, und ohne sie stünde dort Wasser, wo Land ist.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: vom Ärmelkanal bis an die Oder, vom Alpenrand bis an
 * die Ostsee.
 */
const RAHMEN = {
  minLon: 1,
  maxLon: 15,
  minLat: 46.5,
  maxLat: 55,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 13, damit alle Karten
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
 * Seinemündung → Dieppe → Boulogne → Calais → Dünkirchen → Ostende.
 *
 * Der westliche Beginn liegt bewusst außerhalb des Rahmens, damit die Küste
 * am Bildrand nicht abknickt.
 */
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
];

/**
 * Der Riegel quer über Jütland — bewusst oberhalb des Rahmens.
 *
 * Was auf diesem Blatt von der Halbinsel zu sehen ist, liegt südlich der
 * Königsau; der Norden Jütlands beginnt erst über dem oberen Bildrand.
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

/** Der Ost-, Süd- und Westrand: bewusst außerhalb des Rahmens. */
const FESTLAND_RAND = [
  [15.6, 54.1], [15.6, 45.5], [0.2, 45.5], [0.2, 49.5],
];

/** Der große Ring: Nordfrankreich, Benelux, Deutschland, Jütland. */
const FESTLAND = verbinde(
  KANALKUESTE,
  NIEDERLANDE_KUESTE,
  DEUTSCHE_NORDSEEKUESTE,
  JUETLAND_RAND,
  DEUTSCHE_OSTSEEKUESTE,
  FESTLAND_RAND,
);

/**
 * Der Südosten Englands — Kent, die Themsemündung und Ostanglien.
 *
 * Nur dieser Zipfel der Insel liegt im Ausschnitt; im Westen und Norden ist
 * der Ring außerhalb des Rahmens geschlossen.
 */
const SUEDOSTENGLAND = [
  [0.25, 50.73], [0.58, 50.85], [0.97, 50.91], [1.35, 51.13], [1.44, 51.38],
  [1.0, 51.37], [0.55, 51.45], [0.7, 51.53], [0.95, 51.62], [1.29, 51.95],
  [1.6, 52.15], [1.75, 52.48], [1.73, 52.62], [1.3, 52.93], [0.4, 52.9],
  [0.05, 52.98], [0.34, 53.15], [0.1, 53.63], [-0.08, 54.11],
  [-1.2, 54.6], [-1.2, 50.3], [0.1, 50.5],
];

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Der Alpenbogen — grobe Fläche, keine Aussage über einzelne Gipfel. */
const ALPEN = [
  [6.4, 46.3], [8.5, 46.5], [11.0, 46.9], [13.0, 47.2], [15.0, 47.4],
  [15.8, 47.2], [14.0, 46.9], [12.0, 46.6], [9.5, 46.4], [7.0, 46.0],
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

/** Die Schwäbische Alb. */
const SCHWAEBISCHE_ALB = [
  [8.8, 48.3], [10.3, 48.75], [10.4, 48.6], [9.0, 48.1],
];

/** Die Vogesen. */
const VOGESEN = [
  [6.75, 47.9], [7.25, 48.35], [7.15, 48.85], [6.8, 48.6], [6.6, 48.2],
];

/**
 * Die Eifel und die Ardennen — das Bergland um Stolberg und Aachen.
 *
 * Es steht hier, weil es die Lage der Stadt erklärt: Stolberg liegt am
 * Nordrand dieser Höhen, wo Erz, Wasser und Kohle zusammenkamen.
 */
const EIFEL_UND_ARDENNEN = [
  [4.9, 50.0], [6.2, 50.4], [6.6, 50.55], [5.8, 50.5], [4.9, 50.2],
];

/**
 * Das Bergische Land und das Sauerland — die Höhen über der Wupper.
 *
 * Sie erklären, warum die Farbenfabriken hier standen: enge Täler, weiches
 * Wasser und eine alte Färbertradition an der Wupper.
 */
const BERGISCHES_LAND = [
  [7.1, 51.1], [7.6, 51.0], [8.5, 51.2], [8.7, 51.0], [7.9, 50.8],
  [7.2, 50.9],
];

/** Der Taunus — der Riegel zwischen Rhein und Main. */
const TAUNUS = [
  [7.9, 50.2], [8.6, 50.3], [8.9, 50.15], [8.3, 50.05], [7.9, 50.05],
];

/** Der Odenwald — die Höhen hinter Darmstadt. */
const ODENWALD = [
  [8.7, 49.75], [9.3, 49.7], [9.2, 49.5], [8.7, 49.5],
];

/** Spessart und Rhön. */
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

/** Das Erzgebirge. */
const ERZGEBIRGE = [
  [12.5, 50.4], [13.5, 50.6], [14.0, 50.8], [13.4, 50.5], [12.7, 50.2],
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
 * Die Wupper — der Fluss dieses Kapitels.
 *
 * Aus dem Bergischen Land durch Elberfeld und Barmen, an Solingen vorbei,
 * Mündung in den Rhein bei Leverkusen. An ihr standen die Färbereien, aus
 * denen die Farbenfabriken wurden, und aus den Farbenfabriken die
 * Arzneimittelwerke.
 */
const WUPPER = [
  [7.6, 51.08], [7.35, 51.24], [7.15, 51.26], [7.05, 51.14], [6.98, 51.08],
];

/** Die Ruhr. */
const RUHR = [
  [8.45, 51.2], [8.0, 51.4], [7.4, 51.44], [6.75, 51.45],
];

/** Die Mosel — Trier, Koblenz. */
const MOSEL = [
  [6.15, 49.5], [6.64, 49.75], [7.1, 49.98], [7.4, 50.15], [7.6, 50.36],
];

/** Der Main — Bamberg, Würzburg, Frankfurt, Höchst, Mündung in den Rhein. */
const MAIN = [
  [11.4, 50.05], [10.9, 49.9], [10.22, 50.04], [9.93, 49.79], [9.5, 49.75],
  [9.15, 49.97], [8.68, 50.11], [8.45, 50.09], [8.3, 50.0],
];

/** Die Weser. */
const WESER = [
  [9.65, 51.42], [9.5, 52.0], [9.2, 52.55], [8.8, 53.08], [8.5, 53.6],
];

/** Die Elbe — Böhmen, Dresden, Magdeburg, Hamburg, Cuxhaven. */
const ELBE = [
  [14.2, 50.6], [13.74, 51.05], [12.4, 51.85], [11.63, 52.13], [11.0, 52.9],
  [10.0, 53.55], [9.2, 53.83], [8.9, 53.9],
];

/** Die Spree — Lausitz, Berlin, Mündung in die Havel. */
const SPREE = [
  [14.3, 51.8], [13.9, 52.15], [13.55, 52.4], [13.4, 52.52], [13.2, 52.53],
];

/** Die Donau — Ulm, Regensburg, Passau. */
const DONAU = [
  [8.5, 47.95], [9.99, 48.4], [11.0, 48.75], [12.1, 49.02], [12.95, 48.77],
  [13.45, 48.57], [14.3, 48.28],
];

/** Die Seine — Burgund, Paris, Rouen, Le Havre. */
const SEINE = [
  [4.7, 47.8], [3.3, 48.4], [2.35, 48.85], [1.1, 49.44], [0.5, 49.45],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  festland: FESTLAND,
  suedostengland: SUEDOSTENGLAND,
  kanalkueste: KANALKUESTE,
  niederlandeKueste: NIEDERLANDE_KUESTE,
  deutscheNordseekueste: DEUTSCHE_NORDSEEKUESTE,
  deutscheOstseekueste: DEUTSCHE_OSTSEEKUESTE,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [FESTLAND, SUEDOSTENGLAND];

// ---------------------------------------------------------------------------
// Die Orte der Phasen — kleine Rechtecke um die Städte, damit der Umschalter
// zeigen kann, wo die jeweilige Zeit spielte.
// ---------------------------------------------------------------------------

/** Wuppertal-Elberfeld — die Farbenfabrik, aus der Bayer wurde. */
const ELBERFELD_ORT = [
  [7.0, 51.35], [7.32, 51.35], [7.32, 51.17], [7.0, 51.17],
];

/** Frankfurt-Höchst — die Farbwerke am Main. */
const HOECHST_ORT = [
  [8.4, 50.18], [8.75, 50.18], [8.75, 50.03], [8.4, 50.03],
];

/** Darmstadt — die Engel-Apotheke und der Konzern, der aus ihr wurde. */
const DARMSTADT_ORT = [
  [8.52, 49.95], [8.79, 49.95], [8.79, 49.8], [8.52, 49.8],
];

/** Stolberg bei Aachen — der Ort des Contergan-Herstellers. */
const STOLBERG_ORT = [
  [6.08, 50.85], [6.37, 50.85], [6.37, 50.7], [6.08, 50.7],
];

/** Basel — der Dreiländerwinkel der Schweizer Pharmawelt. */
const BASEL_ORT = [
  [7.45, 47.64], [7.74, 47.64], [7.74, 47.48], [7.45, 47.48],
];

/** Berlin — die Grüne Apotheke, Schering und die Behörden. */
const BERLIN_ORT = [
  [13.2, 52.65], [13.65, 52.65], [13.65, 52.4], [13.2, 52.4],
];

/** Hamburg — der Kinderarzt, dessen Verdacht Contergan stoppte. */
const HAMBURG_ORT = [
  [9.8, 53.66], [10.2, 53.66], [10.2, 53.44], [9.8, 53.44],
];

/** Leverkusen — der Konzernsitz, an den Bayer 1912 aus Elberfeld zog. */
const LEVERKUSEN_ORT = [
  [6.9, 51.08], [7.12, 51.08], [7.12, 50.96], [6.9, 50.96],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(FESTLAND),
    land(SUEDOSTENGLAND),
    gebirge(ALPEN),
    gebirge(JURA),
    gebirge(SCHWARZWALD),
    gebirge(SCHWAEBISCHE_ALB),
    gebirge(VOGESEN),
    gebirge(EIFEL_UND_ARDENNEN),
    gebirge(BERGISCHES_LAND),
    gebirge(TAUNUS),
    gebirge(ODENWALD),
    gebirge(SPESSART_UND_RHOEN),
    gebirge(THUERINGER_WALD),
    gebirge(HARZ),
    gebirge(ERZGEBIRGE),
    gebirge(BOEHMERWALD),
    fluss(RHEIN),
    fluss(WUPPER),
    fluss(RUHR),
    fluss(MOSEL),
    fluss(MAIN),
    fluss(WESER),
    fluss(ELBE),
    fluss(SPREE),
    fluss(DONAU),
    fluss(SEINE),
  ],

  phasen: [
    {
      id: 'apotheke-und-farbe-1668-1896',
      label: '1668–1896: aus der Apotheke und der Farbenfabrik wird eine Industrie',
      hinweis:
        'Am Anfang steht kein Konzern, sondern eine Offizin. 1668 übernimmt ' +
        'Friedrich Jacob Merck die Engel-Apotheke in Darmstadt; 1827 beginnt ' +
        'Emanuel Merck, reine Alkaloide — Morphin, Codein, später Cocain — ' +
        'nicht mehr nur für den eigenen Ladentisch herzustellen, sondern für ' +
        'den Handel. Das ist die Geburtsstunde des Wirkstoffs als Ware. Die ' +
        'zweite Wurzel ist die Farbe: 1851 gründet Ernst Schering in Berlin ' +
        'die Grüne Apotheke, 1863 entstehen im selben Jahr die Farbenfabrik ' +
        'Friedr. Bayer et comp. in Barmen-Elberfeld an der Wupper und die ' +
        'Farbwerke Meister Lucius & Brüning in Frankfurt-Höchst. In Basel ' +
        'wachsen aus Seidenfärbereien Ciba, Geigy und Sandoz. Wer Farbstoffe ' +
        'kochen kann, kann auch Arzneistoffe kochen — das ist die Einsicht, ' +
        'aus der eine Weltindustrie wurde.',
      flaechen: [
        { titel: 'Darmstadt — die Engel-Apotheke seit 1668, Alkaloide ab 1827', d: P.pfad(DARMSTADT_ORT) },
        { titel: 'Elberfeld an der Wupper — die Farbenfabrik von 1863', d: P.pfad(ELBERFELD_ORT) },
        { titel: 'Frankfurt-Höchst — die Farbwerke am Main, 1863', d: P.pfad(HOECHST_ORT) },
        { titel: 'Berlin — die Grüne Apotheke Ernst Scherings, 1851', d: P.pfad(BERLIN_ORT) },
        { titel: 'Basel — aus Färbereien wird die dichteste Pharmalandschaft der Welt', d: P.pfad(BASEL_ORT) },
      ],
    },
    {
      id: 'ohne-pruefung-1897-1937',
      label: '1897–1937: die Zeit ohne Prüfung — Aspirin, Heroin, Wundermittel',
      hinweis:
        'Im Labor in Elberfeld stellt Felix Hoffmann am 10. August 1897 ' +
        'Acetylsalicylsäure her und elf Tage später, am 21. August 1897, ' +
        'Diacetylmorphin. Beide Stoffe werden geprüft, beide für gut ' +
        'befunden, beide vermarktet: der eine ab 1899 als Aspirin, der ' +
        'andere ab 1898 als „Heroin" — ein Hustenmittel, das ausdrücklich ' +
        'als nicht gewöhnungsbildend beworben und in mehr als zwanzig Länder ' +
        'ausgeführt wird. Zur selben Zeit ist Cocain ein gefeiertes ' +
        'Wundermittel, und Beruhigungssäfte mit Morphin werden Säuglingen ' +
        'gegeben. Niemand muss beweisen, dass ein Mittel wirkt oder ' +
        'unschädlich ist. Erst Katastrophen erzwingen Regeln: 1906 verlangen ' +
        'die Vereinigten Staaten die Angabe der Inhaltsstoffe, 1938 nach ' +
        'einem Sirup mit Frostschutzmittel und 105 Toten den Nachweis der ' +
        'Unbedenklichkeit.',
      flaechen: [
        { titel: 'Elberfeld — Aspirin und Heroin aus demselben Labor, 1897', d: P.pfad(ELBERFELD_ORT) },
        { titel: 'Darmstadt — Alkaloide für den Weltmarkt', d: P.pfad(DARMSTADT_ORT) },
      ],
    },
    {
      id: 'wende-1909-1945',
      label: '1909–1945: die Wende — Salvarsan, Insulin, Sulfonamide, Penicillin',
      hinweis:
        'Paul Ehrlich und Sahachiro Hata finden 1909 in der Substanz mit der ' +
        'Nummer 606 ein Mittel gegen die Syphilis; die Farbwerke Höchst ' +
        'bringen es 1910 als Salvarsan heraus — das erste Arzneimittel, das ' +
        'gezielt gegen einen Erreger entworfen wurde. 1921/22 gewinnen ' +
        'Forscher in Toronto das Insulin und verkaufen das Patent für einen ' +
        'symbolischen Dollar; ab 1923 stellen es Eli Lilly in Indianapolis ' +
        'und in Lizenz die Höchster Farbwerke her. 1932 findet Gerhard ' +
        'Domagk in Elberfeld mit dem Prontosil das erste Sulfonamid; 1939 ' +
        'erhält er den Nobelpreis, den er auf Druck des Regimes ablehnen ' +
        'muss. 1941 bis 1945 machen amerikanische Werke aus dem Penicillin ' +
        'ein Massenprodukt. Aus dem Handel mit Stoffen ist eine Industrie ' +
        'geworden, die forscht.',
      flaechen: [
        { titel: 'Frankfurt-Höchst — Salvarsan 1910, Insulin in Lizenz ab 1923', d: P.pfad(HOECHST_ORT) },
        { titel: 'Elberfeld — Prontosil, das erste Sulfonamid, 1932', d: P.pfad(ELBERFELD_ORT) },
        { titel: 'Basel — Vitamine und Wirkstoffe für den Weltmarkt', d: P.pfad(BASEL_ORT) },
      ],
    },
    {
      id: 'contergan-1957-1961',
      label: '1957–1961: Contergan — die Katastrophe, die die Zulassung erzwang',
      hinweis:
        'Am 1. Oktober 1957 bringt die Chemie Grünenthal in Stolberg bei ' +
        'Aachen das Schlaf- und Beruhigungsmittel Contergan mit dem ' +
        'Wirkstoff Thalidomid rezeptfrei auf den Markt, beworben als ' +
        'besonders verträglich, auch für Schwangere. Ab 1959 häufen sich ' +
        'Geburten mit schweren Fehlbildungen der Gliedmaßen. Der Hamburger ' +
        'Kinderarzt Widukind Lenz teilt dem Hersteller am 15. November 1961 ' +
        'seinen Verdacht mit; der Australier William McBride kommt ' +
        'unabhängig zum selben Ergebnis. Am 26. November 1961 wird das ' +
        'Mittel vom Markt genommen. Schätzungen gehen von 5.000 bis 10.000 ' +
        'geschädigten Kindern weltweit aus. In den Vereinigten Staaten hatte ' +
        'die Prüferin Frances Oldham Kelsey die Zulassung verweigert. Die ' +
        'Folge sind die Arzneimittelgesetze, die heute gelten.',
      flaechen: [
        { titel: 'Stolberg bei Aachen — Chemie Grünenthal, Contergan ab 1957', d: P.pfad(STOLBERG_ORT) },
        { titel: 'Hamburg — Widukind Lenz und die Warnung vom November 1961', d: P.pfad(HAMBURG_ORT) },
      ],
    },
    {
      id: 'blockbuster-heute',
      label: '1990 bis heute: Weltkonzerne, Blockbuster und Dauermedikamente',
      hinweis:
        'Aus den Werken am Rhein werden Teile weltweiter Konzerne: 1996 ' +
        'schließen sich in Basel Ciba-Geigy und Sandoz zu Novartis zusammen, ' +
        'die Höchster Arzneimittelsparte geht über Hoechst Marion Roussel ' +
        'und Aventis in Sanofi auf, Schering wird 2006 von Bayer übernommen. ' +
        'Der Weltmarkt für Arzneimittel liegt heute bei rund anderthalb ' +
        'Billionen Dollar im Jahr. Das Geschäft verschiebt sich zu Mitteln, ' +
        'die dauerhaft genommen werden: gegen Bluthochdruck, hohe ' +
        'Cholesterinwerte, Diabetes, Rheuma. Das umsatzstärkste Medikament ' +
        'der Geschichte, ein Rheumamittel, hat seit 2003 über 200 Milliarden ' +
        'Dollar eingebracht. Gleichzeitig ziehen sich große Hersteller aus ' +
        'der Antibiotikaforschung zurück, weil kurze Behandlungen sich nicht ' +
        'rechnen.',
      flaechen: [
        { titel: 'Basel — Novartis und Roche, zwei der größten Konzerne der Welt', d: P.pfad(BASEL_ORT) },
        { titel: 'Frankfurt-Höchst — aus den Farbwerken wird ein Teil von Sanofi', d: P.pfad(HOECHST_ORT) },
        { titel: 'Berlin — Schering, seit 2006 bei Bayer', d: P.pfad(BERLIN_ORT) },
        { titel: 'Leverkusen — der Konzernsitz, an den Bayer 1912 zog', d: P.pfad(LEVERKUSEN_ORT) },
      ],
    },
  ],

  punkte: [
    {
      id: 'elberfeld',
      name: 'Wuppertal-Elberfeld',
      typ: 'ereignis',
      ...ort(7.147, 51.264),
      text:
        'Der Ort, an dem beide Seiten dieses Kapitels an einem einzigen ' +
        'Labortisch entstanden. 1863 wird an der Wupper eine Farbenfabrik ' +
        'gegründet; aus ihrer chemischen Abteilung wird die Arzneiforschung. ' +
        'Am 10. August 1897 stellt Felix Hoffmann hier Acetylsalicylsäure ' +
        'her — ab 1899 als Aspirin verkauft, bis heute eines der ' +
        'meistgebrauchten Mittel der Welt. Elf Tage später, am 21. August ' +
        '1897, stellt er Diacetylmorphin her: ab 1898 als „Heroin" ' +
        'vermarktet, als Hustenmittel, ausdrücklich als nicht ' +
        'gewöhnungsbildend beworben und in über zwanzig Länder ausgeführt. ' +
        '1932 findet Gerhard Domagk hier das Prontosil, das erste ' +
        'Sulfonamid. Segen und Schaden aus demselben Haus.',
    },
    {
      id: 'hoechst',
      name: 'Frankfurt-Höchst',
      typ: 'ereignis',
      ...ort(8.545, 50.101),
      text:
        'Die Farbwerke am Main, 1863 gegründet — hier wird aus der Idee der ' +
        '„Zauberkugel" ein Produkt. Paul Ehrlich hatte beobachtet, dass ' +
        'Farbstoffe nur bestimmte Gewebe anfärben, und daraus geschlossen, ' +
        'dass sich ein Stoff bauen lässt, der nur den Erreger trifft. 1909 ' +
        'findet sein Mitarbeiter Sahachiro Hata unter Hunderten von ' +
        'Arsenverbindungen die Nummer 606; 1910 kommt sie als Salvarsan ' +
        'gegen die Syphilis auf den Markt — das erste gezielt entworfene ' +
        'Arzneimittel gegen einen Erreger, wirksam und nicht ohne schwere ' +
        'Nebenwirkungen. Hier wurde 1894 auch Emil von Behrings ' +
        'Diphtherie-Serum hergestellt und ab 1923 Insulin in Lizenz. Heute ' +
        'gehört das Arzneigeschäft zu Sanofi.',
    },
    {
      id: 'darmstadt',
      name: 'Darmstadt',
      typ: 'stadt',
      ...ort(8.651, 49.872),
      text:
        'Der älteste Ort dieser Geschichte. 1668 übernimmt Friedrich Jacob ' +
        'Merck die Engel-Apotheke; das Unternehmen, das daraus wurde, gilt ' +
        'als das älteste Chemie- und Pharmaunternehmen der Welt. Der ' +
        'entscheidende Schritt kommt 1827: Emanuel Merck stellt reine ' +
        'Alkaloide nicht mehr nur für die eigene Offizin her, sondern für ' +
        'den Handel — Morphin, Codein, Chinin, später Cocain, in ' +
        'gleichbleibender Qualität und in Mengen. Von hier an ist der ' +
        'Wirkstoff ein Erzeugnis mit Etikett, Preis und Marke. Das ist die ' +
        'stille Wende: Nicht der Apotheker mischt für den einzelnen Kranken, ' +
        'sondern eine Fabrik stellt für einen Markt her.',
    },
    {
      id: 'stolberg',
      name: 'Stolberg bei Aachen',
      typ: 'ereignis',
      ...ort(6.223, 50.774),
      text:
        'Der Ort der Katastrophe, an der die heutige Arzneimittelprüfung ' +
        'geschrieben wurde. Am 1. Oktober 1957 bringt die Chemie Grünenthal ' +
        'hier Contergan heraus, ein rezeptfreies Schlaf- und ' +
        'Beruhigungsmittel mit dem Wirkstoff Thalidomid, beworben als ' +
        'besonders verträglich und auch für Schwangere geeignet. Ab 1959 ' +
        'werden Kinder mit schweren Fehlbildungen der Arme und Beine ' +
        'geboren. Der Hamburger Kinderarzt Widukind Lenz meldet am ' +
        '15. November 1961 seinen Verdacht; am 26. November 1961 wird das ' +
        'Mittel zurückgezogen. Schätzungen sprechen von 5.000 bis 10.000 ' +
        'geschädigten Kindern weltweit, davon rund 2.800 überlebende in ' +
        'Deutschland. Das Verfahren gegen die Verantwortlichen wurde 1970 ' +
        'gegen eine Vergleichszahlung eingestellt.',
    },
    {
      id: 'basel',
      name: 'Basel',
      typ: 'stadt',
      ...ort(7.589, 47.558),
      text:
        'Der Ort mit der höchsten Dichte an Arzneimittelforschung der Welt — ' +
        'und auch er beginnt mit Farbe. Aus Seidenfärbereien am Rheinknie ' +
        'werden Ciba, Geigy und Sandoz; 1896 gründet Fritz Hoffmann-La ' +
        'Roche sein Unternehmen, das früh auf standardisierte Fertigarznei ' +
        'setzt. 1996 schließen sich Ciba-Geigy und Sandoz zu Novartis ' +
        'zusammen. Von hier kommen Vitamine, Psychopharmaka, ' +
        'Immunhemmer — und 2001 mit dem Imatinib eines der eindrucksvollsten ' +
        'Krebsmittel überhaupt: Bei einer bestimmten Leukämie stieg das ' +
        'Fünfjahresüberleben von etwa dreißig auf rund neunzig Prozent. ' +
        'Dasselbe Mittel steht auch für die andere Seite: Sein Preis stieg ' +
        'binnen fünfzehn Jahren auf ein Vielfaches.',
    },
    {
      id: 'berlin',
      name: 'Berlin',
      typ: 'stadt',
      ...ort(13.405, 52.52),
      text:
        'Die dritte Wurzel: die Hormone. 1851 eröffnet Ernst Schering die ' +
        'Grüne Apotheke in der Chausseestraße; 1871 wird daraus eine ' +
        'Aktiengesellschaft, die später zum Hormonhersteller wird — 1961 ' +
        'kommt hier mit Anovlar die erste in Europa entwickelte ' +
        'Antibabypille auf den Markt, ein Mittel, das gesunde Frauen ' +
        'jahrelang einnehmen. 2006 wird Schering von Bayer übernommen. In ' +
        'derselben Stadt sitzen die Gegenspieler: das Robert Koch-Institut, ' +
        'der Gemeinsame Bundesausschuss, der über die Erstattung ' +
        'entscheidet, und die Verbände, die über Preise verhandeln. Wo ' +
        'Arznei gemacht wird, wird auch über sie gestritten.',
    },
  ],

  bewegungen: [
    {
      id: 'heroin-in-die-welt',
      name: 'Der Weg des Heroins in die Welt',
      von: station(7.147, 51.264),
      ueber: [station(4.6, 51.4), station(2.6, 51.1)],
      nach: station(1.3, 50.4),
      text:
        'Von 1898 an wird Diacetylmorphin unter dem Handelsnamen „Heroin" ' +
        'aus Elberfeld in mehr als zwanzig Länder ausgeführt — als ' +
        'Hustenmittel, als Ersatz für das Morphin und ausdrücklich als ' +
        'nicht gewöhnungsbildend beworben. Über Rotterdam und Antwerpen ' +
        'geht es in die Häfen der Welt. Erst als die Abhängigkeit nicht mehr ' +
        'zu übersehen ist, kippt die Bewertung: 1913 endet die Herstellung, ' +
        '1924 verbieten die Vereinigten Staaten das Mittel, 1931 wird es in ' +
        'Deutschland stark beschränkt. Das Neue schadete, bevor es geprüft ' +
        'war — dreiundzwanzig Jahre lang.',
    },
    {
      id: 'insulin-ueber-den-atlantik',
      name: 'Das Insulin kommt über den Atlantik',
      von: station(1.15, 50.3),
      ueber: [station(3.9, 50.4), station(6.5, 49.9)],
      nach: station(8.545, 50.101),
      text:
        'Im Sommer 1921 gewinnen Frederick Banting und Charles Best in ' +
        'Toronto einen Auszug aus der Bauchspeicheldrüse; im Januar 1922 ' +
        'überlebt der dreizehnjährige Leonard Thompson. Die Entdecker ' +
        'überlassen das Patent der Universität für einen symbolischen Dollar ' +
        '— niemand solle an einem lebensrettenden Stoff verdienen. Für die ' +
        'Herstellung braucht es dennoch eine Fabrik: Eli Lilly in ' +
        'Indianapolis liefert ab 1923 in großen Mengen, in Europa nehmen die ' +
        'Höchster Farbwerke die Lizenzproduktion auf. Aus einem Todesurteil ' +
        'wird eine Behandlung — die man ein Leben lang braucht.',
    },
    {
      id: 'warnung-nach-stolberg',
      name: 'Die Warnung des Kinderarztes',
      von: station(9.994, 53.551),
      ueber: [station(8.2, 52.4)],
      nach: station(6.223, 50.774),
      text:
        'Im Herbst 1961 zählt der Hamburger Kinderarzt Widukind Lenz die ' +
        'Fälle von Fehlbildungen in seiner Sprechstunde, fragt die Mütter ' +
        'nach den eingenommenen Mitteln und findet ein Muster. Am ' +
        '15. November 1961 teilt er dem Hersteller in Stolberg seinen ' +
        'Verdacht mit; am 18. November trägt er ihn öffentlich vor. Am ' +
        '26. November 1961 wird Contergan vom Markt genommen. Die Warnung ' +
        'lief nicht von der Forschung zum Kranken, sondern vom Krankenbett ' +
        'zurück in die Fabrik — so ist die Arzneimittelsicherheit entstanden.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 5.0, 54.3),
    schrift('Ostsee', 'meer', 12.6, 54.9),
    schrift('Ärmelkanal', 'meer', 1.6, 50.2, -20),
    schrift('Rhein', 'meer', 7.9, 50.2, -60),
    schrift('Wupper', 'meer', 7.3, 51.35, -10),
    schrift('Main', 'meer', 9.2, 50.02, -8),
    schrift('Elbe', 'meer', 11.6, 52.55, -50),
    schrift('Donau', 'meer', 12.6, 48.85, 14),
    schrift('Seine', 'meer', 3.2, 48.6, -20),
    schrift('Deutschland', 'land', 10.8, 51.6),
    schrift('Frankreich', 'land', 3.2, 47.6),
    schrift('Niederlande', 'land', 5.7, 52.35),
    schrift('Belgien', 'land', 4.5, 50.7),
    schrift('Schweiz', 'land', 7.2, 46.9),
    schrift('Böhmen', 'land', 14.2, 49.7),
    schrift('Alpen', 'land', 11.5, 47.05),
    schrift('Berlin', 'land', 12.75, 52.66),
    schrift('Basel', 'land', 8.05, 47.5),
    schrift('Wuppertal', 'land', 7.5, 51.14),
    schrift('Frankfurt', 'land', 8.95, 50.19),
    schrift('Darmstadt', 'land', 9.05, 49.83),
    schrift('Stolberg', 'land', 5.7, 50.64),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
