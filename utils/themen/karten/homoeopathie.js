// Karte zu „Hahnemann und die Homöopathie" — Mitteldeutschland zwischen
// Elbe, Saale und Mulde, 1755 bis 1843.
//
// Wie in den Kapiteln 1 bis 15 stehen alle Linien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-homoeopathie.mjs nach.
//
// Was die Karte zeigen soll: Ein einziges Leben, das sich auf einem sehr
// kleinen Stück Erde abspielt — und eine Lehre, die von dort aus um die
// Welt ging. Meißen, wo er 1755 geboren wurde. Leipzig, wo er studierte,
// 1790 den Chinarinden-Versuch machte und 1821 vertrieben wurde. Dresden,
// wo er als junger Arzt arbeitete. Dessau, wo er in einer Apotheke lernte,
// mit Stoffen umzugehen. Torgau, wo das Organon entstand. Und Köthen, das
// nur deshalb zur Zuflucht wurde, weil dort eine andere Landesgrenze
// galt: Im Königreich Sachsen durfte ein Arzt seine Arzneien nicht selbst
// abgeben, im Herzogtum Anhalt-Köthen erlaubte es ihm der Herzog. Auf
// dieser Karte liegen die beiden Gebiete nebeneinander — man sieht dem
// Blatt an, warum er sechzig Kilometer weit ziehen musste.
//
// Deshalb dieser sehr kleine Ausschnitt: rund 3,8 Grad Länge und 1,8 Grad
// Breite, von der Werra-Seite des Thüringer Waldes bis in die Lausitz, vom
// Erzgebirgskamm bis in den Fläming. Paris, wo er 1843 starb, liegt weit
// außerhalb — es bleibt eine Bewegung, die das Blatt nach Südwesten
// verlässt.
//
// Zwei Besonderheiten gegenüber den bisherigen Karten:
//   1. Dieser Ausschnitt hat kein Meer. Der Atlas-Test prüft deshalb nicht
//      Küstenlinien, sondern Flussläufe: Orte, die im Atlas am Wasser
//      liegen, müssen auf der gezeichneten Linie liegen — und Orte, die
//      nicht am Wasser liegen, müssen einen Abstand dazu halten.
//   2. Statt eines Reichsgebiets tragen zwei kleine Herrschaften die
//      Prüfung: das Königreich Sachsen nach 1815 und das Herzogtum
//      Anhalt-Köthen. Beide sind grobe Umrisslinien im Maßstab dieses
//      Blattes; die zahlreichen Exklaven der anhaltischen Fürstentümer
//      sind nicht dargestellt.

const {
  KARTENFARBEN,
  erstelleProjektion,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: vom Thüringer Wald bis in die Lausitz, vom
 * Erzgebirgskamm bis in den Fläming.
 */
const RAHMEN = {
  minLon: 11,
  maxLon: 14.8,
  minLat: 50.5,
  maxLat: 52.3,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 15, damit alle Karten
// des Buches gleich aussehen und gleich zu lesen sind.
// ---------------------------------------------------------------------------

/** Eine Landmasse: Sandbeige mit dünnem Rand. */
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
// Der Untergrund
// ---------------------------------------------------------------------------

/**
 * Die Landfläche.
 *
 * Auf diesem Blatt gibt es kein Meer: Der Ausschnitt liegt vollständig im
 * Binnenland. Der Ring wird deshalb bewusst außerhalb des Rahmens
 * geschlossen, damit die Fläche am Bildrand ausläuft, statt abzuknicken.
 */
const LAND = [
  [10.4, 50.0], [15.4, 50.0], [15.4, 52.8], [10.4, 52.8],
];

/** Der Kamm des Erzgebirges — dahinter beginnt Böhmen. */
const ERZGEBIRGE = [
  [12.2, 50.45], [12.8, 50.42], [13.3, 50.55], [13.9, 50.75], [14.2, 50.82],
  [13.9, 50.9], [13.4, 50.75], [12.8, 50.65], [12.25, 50.62],
];

/** Das Elbsandsteingebirge — die Sächsische Schweiz beiderseits der Elbe. */
const ELBSANDSTEIN = [
  [13.95, 50.85], [14.3, 50.83], [14.4, 50.95], [14.05, 51.0], [13.9, 50.94],
];

/** Das Lausitzer Bergland im Osten des Blattes. */
const LAUSITZER_BERGLAND = [
  [14.3, 51.02], [14.85, 50.95], [15.0, 51.1], [14.45, 51.16],
];

/** Der Thüringer Wald — nur seine östliche Spitze liegt auf dem Blatt. */
const THUERINGER_WALD = [
  [10.4, 50.95], [10.95, 50.68], [11.25, 50.48], [11.05, 50.45],
  [10.75, 50.62], [10.35, 50.88],
];

/** Der Harz — sein östlicher Rand ragt in den Ausschnitt herein. */
const HARZ = [
  [10.5, 51.6], [11.15, 51.55], [11.35, 51.72], [10.95, 51.85], [10.55, 51.75],
];

/** Der Fläming — die Höhen nördlich der Elbe. */
const FLAEMING = [
  [12.0, 52.0], [12.9, 52.06], [13.35, 51.96], [12.6, 51.88], [12.1, 51.9],
];

// ---------------------------------------------------------------------------
// Die Flüsse — der Atlas-Test schlägt sie Ort für Ort nach.
// ---------------------------------------------------------------------------

/**
 * Die Elbe: aus Böhmen über Dresden, Meißen, Torgau und Wittenberg nach
 * Magdeburg.
 *
 * Sie ist die Achse dieses Kapitels: An ihr liegen Meißen (die Geburt),
 * Dresden (die ersten Praxisjahre) und Torgau (das Organon).
 */
const ELBE = [
  [14.25, 50.75], [14.15, 50.92], [13.94, 50.96], [13.74, 51.05],
  [13.47, 51.16], [13.29, 51.31], [13.22, 51.44], [13.0, 51.56],
  [12.85, 51.75], [12.64, 51.87], [12.45, 51.89], [12.25, 51.86],
  [11.95, 51.85], [11.88, 51.97], [11.73, 52.02], [11.63, 52.13],
  [11.75, 52.3],
];

/** Die Saale: aus Thüringen über Jena, Naumburg, Halle und Bernburg zur Elbe. */
const SAALE = [
  [11.36, 50.65], [11.34, 50.72], [11.59, 50.93], [11.71, 51.06],
  [11.81, 51.15], [11.97, 51.2], [12.07, 51.3], [11.99, 51.36],
  [11.96, 51.48], [11.8, 51.58], [11.71, 51.65], [11.74, 51.79],
  [11.77, 51.85], [11.78, 51.91], [11.88, 51.97],
];

/**
 * Die Vereinigte Mulde: von Sermuth über Grimma, Wurzen und Eilenburg zur
 * Mündung bei Dessau.
 */
const MULDE = [
  [12.78, 51.16], [12.73, 51.23], [12.74, 51.37], [12.63, 51.46],
  [12.59, 51.59], [12.33, 51.62], [12.32, 51.71], [12.26, 51.84],
  [12.26, 51.87],
];

/** Die Freiberger Mulde: von Freiberg über Nossen und Döbeln nach Sermuth. */
const FREIBERGER_MULDE = [
  [13.34, 50.92], [13.3, 51.06], [13.12, 51.12], [12.93, 51.16],
  [12.78, 51.16],
];

/** Die Zwickauer Mulde: von Zwickau über Rochlitz und Colditz nach Sermuth. */
const ZWICKAUER_MULDE = [
  [12.5, 50.72], [12.53, 50.83], [12.66, 50.92], [12.8, 51.04],
  [12.8, 51.13], [12.78, 51.16],
];

/**
 * Die Weiße Elster: aus dem Vogtland über Gera, Zeitz und Leipzig zur
 * Saale bei Halle.
 */
const WEISSE_ELSTER = [
  [12.14, 50.52], [12.2, 50.66], [12.08, 50.88], [12.14, 51.05],
  [12.25, 51.16], [12.32, 51.28], [12.37, 51.33], [12.2, 51.38],
  [12.05, 51.42], [11.96, 51.44],
];

/** Die Pleiße: von Altenburg über Borna nach Leipzig. */
const PLEISSE = [
  [12.43, 50.99], [12.5, 51.12], [12.42, 51.24], [12.38, 51.33],
];

/** Die Schwarze Elster: aus der Lausitz zur Elbe bei Elster. */
const SCHWARZE_ELSTER = [
  [14.35, 51.4], [14.24, 51.44], [14.0, 51.52], [13.7, 51.48],
  [13.4, 51.52], [13.23, 51.68], [13.0, 51.72], [12.85, 51.75],
];

/** Die Spree: von Bautzen nach Norden aus dem Blatt heraus. */
const SPREE = [
  [14.42, 51.18], [14.4, 51.38], [14.37, 51.57], [14.3, 51.8],
];

// ---------------------------------------------------------------------------
// Die zwei Herrschaften, an denen dieses Kapitel hängt.
// ---------------------------------------------------------------------------

/**
 * Das Königreich Sachsen nach dem Wiener Kongress von 1815 — grobe
 * Umrisslinie.
 *
 * Sachsen hatte 1815 seine nördliche Hälfte an Preußen verloren: Torgau,
 * Wittenberg, Eilenburg, Merseburg und Naumburg lagen von da an außerhalb.
 * Leipzig, Dresden, Meißen, Freiberg, Chemnitz, Zwickau und die Oberlausitz
 * um Bautzen blieben sächsisch. Genau in diesem Gebiet galt das Privileg
 * der Apotheker, an dem Hahnemann 1820 vor Gericht scheiterte.
 */
const KOENIGREICH_SACHSEN_1815 = [
  [12.1, 51.44], [12.55, 51.42], [12.95, 51.38], [13.35, 51.38],
  [13.75, 51.35], [14.15, 51.3], [14.55, 51.3], [14.95, 51.15],
  [15.03, 50.98], [14.55, 50.85], [14.1, 50.82], [13.6, 50.72],
  [13.2, 50.58], [12.8, 50.45], [12.3, 50.35], [12.1, 50.3],
  [11.9, 50.45], [12.1, 50.7], [12.3, 50.9], [12.55, 51.02],
  [12.35, 51.2], [12.2, 51.32],
];

/**
 * Das Herzogtum Anhalt-Köthen — grobe Umrisslinie des Kernlandes.
 *
 * Ein Ländchen von wenigen Quadratmeilen zwischen Saale, Elbe und Mulde,
 * eigenständig bis 1847. Dessau gehörte zum Nachbarherzogtum Anhalt-Dessau,
 * Bernburg zu Anhalt-Bernburg — drei Fürstentümer auf engstem Raum. Herzog
 * Ferdinand gab Hahnemann hier 1821 die Erlaubnis, seine Arzneien selbst
 * herzustellen und abzugeben. Die anhaltischen Exklaven sind in diesem
 * Maßstab nicht dargestellt.
 */
const ANHALT_KOETHEN = [
  [11.85, 51.68], [12.05, 51.63], [12.22, 51.68], [12.26, 51.8],
  [12.12, 51.88], [11.92, 51.86], [11.82, 51.79],
];

// ---------------------------------------------------------------------------
// Die Orte als kleine Flächen — sie tragen die Phasen.
// ---------------------------------------------------------------------------

/** Meißen — Geburtsort 1755. */
const MEISSEN_ORT = [
  [13.4, 51.2], [13.55, 51.2], [13.55, 51.12], [13.4, 51.12],
];

/** Leipzig — Studium, Übersetzung, Vorlesungen, Prozess. */
const LEIPZIG_STADT = [
  [12.28, 51.39], [12.47, 51.39], [12.47, 51.28], [12.28, 51.28],
];

/** Dresden — die ersten Praxisjahre. */
const DRESDEN_STADT = [
  [13.64, 51.1], [13.84, 51.1], [13.84, 50.99], [13.64, 50.99],
];

/** Torgau — die Prüfungsjahre und das Organon. */
const TORGAU_ORT = [
  [12.93, 51.6], [13.08, 51.6], [13.08, 51.52], [12.93, 51.52],
];

/** Köthen — die Zuflucht und die Potenzierung. */
const KOETHEN_ORT = [
  [11.9, 51.79], [12.05, 51.79], [12.05, 51.71], [11.9, 51.71],
];

/** Dessau — die Apotheke, die Chemie, die Ehe. */
const DESSAU_ORT = [
  [12.17, 51.87], [12.32, 51.87], [12.32, 51.79], [12.17, 51.79],
];

/**
 * Der Weg nach Paris — ein schmaler Keil, der das Blatt nach Südwesten
 * verlässt.
 *
 * Paris liegt bei 2,35 Grad östlicher Länge und 48,86 Grad nördlicher
 * Breite, rund achthundert Kilometer von Köthen entfernt und weit
 * außerhalb dieses Ausschnitts.
 */
const WEG_NACH_PARIS = [
  [11.97, 51.7], [11.99, 51.78], [10.5, 50.9], [10.45, 50.82],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  land: LAND,
  elbe: ELBE,
  saale: SAALE,
  mulde: MULDE,
  freibergerMulde: FREIBERGER_MULDE,
  zwickauerMulde: ZWICKAUER_MULDE,
  weisseElster: WEISSE_ELSTER,
  pleisse: PLEISSE,
  schwarzeElster: SCHWARZE_ELSTER,
  spree: SPREE,
  koenigreichSachsen1815: KOENIGREICH_SACHSEN_1815,
  anhaltKoethen: ANHALT_KOETHEN,
};

/**
 * Die Landflächen — hier nur eine, denn der Ausschnitt hat kein Meer.
 * Die Prüfung schlägt damit nach, dass die Fläche den ganzen Rahmen deckt.
 */
const landflaechen = [LAND];

/** Alle Flussläufe zusammen — der Atlas-Test misst gegen sie. */
const fluesse = {
  elbe: ELBE,
  saale: SAALE,
  mulde: MULDE,
  freibergerMulde: FREIBERGER_MULDE,
  zwickauerMulde: ZWICKAUER_MULDE,
  weisseElster: WEISSE_ELSTER,
  pleisse: PLEISSE,
  schwarzeElster: SCHWARZE_ELSTER,
  spree: SPREE,
};

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(LAND),
    gebirge(ERZGEBIRGE),
    gebirge(ELBSANDSTEIN),
    gebirge(LAUSITZER_BERGLAND),
    gebirge(THUERINGER_WALD),
    gebirge(HARZ),
    gebirge(FLAEMING),
    fluss(ELBE),
    fluss(SAALE),
    fluss(MULDE),
    fluss(FREIBERGER_MULDE),
    fluss(ZWICKAUER_MULDE),
    fluss(WEISSE_ELSTER),
    fluss(PLEISSE),
    fluss(SCHWARZE_ELSTER),
    fluss(SPREE),
  ],

  phasen: [
    {
      id: 'herkunft-1755-1789',
      label: '1755–1789: Meißen, Leipzig, Wien — die Ausbildung eines Zweiflers',
      hinweis:
        'Am 10. April 1755 wird Samuel Hahnemann in Meißen geboren, Sohn ' +
        'eines Porzellanmalers der kurfürstlichen Manufaktur. Er besucht ' +
        'die Fürstenschule St. Afra, studiert ab 1775 in Leipzig, geht ' +
        '1777 nach Wien und danach als Arzt und Bibliothekar nach ' +
        'Hermannstadt in Siebenbürgen. 1779 wird er in Erlangen zum Doktor ' +
        'der Medizin promoviert. Danach zieht er von Ort zu Ort: Hettstedt, ' +
        'Dessau, Gommern, Dresden, Leipzig. In Dessau arbeitet er im ' +
        'Laboratorium einer Apotheke und heiratet 1782 Johanna Henriette ' +
        'Küchler; in Dresden vertritt er Ende der 1780er Jahre den ' +
        'Stadtphysikus. Weil die Praxis wenig einbringt, lebt er vor allem ' +
        'von Übersetzungen und chemischen Arbeiten.',
      flaechen: [
        { titel: 'Meißen — der Geburtsort, 10. April 1755', d: P.pfad(MEISSEN_ORT) },
        { titel: 'Leipzig — das Studium ab 1775', d: P.pfad(LEIPZIG_STADT) },
        { titel: 'Dessau — die Apotheke und die Heirat 1782', d: P.pfad(DESSAU_ORT) },
        { titel: 'Dresden — die ersten Praxisjahre', d: P.pfad(DRESDEN_STADT) },
      ],
    },
    {
      id: 'chinarinde-1790',
      label: '1790: der Chinarinden-Versuch bei Leipzig',
      hinweis:
        'Beim Übersetzen der Arzneimittellehre des Edinburgher Professors ' +
        'William Cullen stößt Hahnemann auf dessen Erklärung, die ' +
        'Chinarinde helfe gegen das Wechselfieber, weil sie den Magen ' +
        'stärke. Er hält das für unzureichend, nimmt die Rinde selbst — ' +
        'zweimal täglich vier Quentchen — und beschreibt in einer Fußnote ' +
        'seiner Übersetzung, wie sich an ihm Beschwerden einstellen, die er ' +
        'mit denen des Wechselfiebers vergleicht. Aus dieser einen Fußnote ' +
        'entsteht der Gedanke, der 1796 in Hufelands Journal als neues ' +
        'Prinzip erscheint: Was in großer Gabe ähnliche Beschwerden ' +
        'erzeugt, könne sie in kleiner Gabe heilen.',
      flaechen: [
        { titel: 'Leipzig und Umgebung — die Übersetzung und der Selbstversuch 1790', d: P.pfad(LEIPZIG_STADT) },
      ],
    },
    {
      id: 'organon-1805-1810',
      label: '1805–1810: Torgau — die Prüfungen und das Organon',
      hinweis:
        'In Torgau an der Elbe lebt Hahnemann von 1805 bis 1811. Hier ' +
        'entstehen die großen Arzneimittelprüfungen an Gesunden, hier ' +
        'schreibt er sein Hauptwerk. 1810 erscheint das „Organon der ' +
        'rationellen Heilkunde"; ab der zweiten Auflage von 1819 heißt es ' +
        '„Organon der Heilkunst". Es folgen sechs Bände „Reine ' +
        'Arzneimittellehre" (1811–1821). Der Name der neuen Lehre steht ' +
        'seit 1807 fest: Homöopathie, aus den griechischen Wörtern für ' +
        'ähnlich und Leiden.',
      flaechen: [
        { titel: 'Torgau — die Arzneimittelprüfungen und das Organon von 1810', d: P.pfad(TORGAU_ORT) },
        { titel: 'Leipzig — die Vorlesungen ab 1812', d: P.pfad(LEIPZIG_STADT) },
      ],
    },
    {
      id: 'vertreibung-1821',
      label: '1821: der Prozess in Leipzig — Köthen wird zur Zuflucht',
      hinweis:
        'Hahnemann gibt seine Arzneien selbst ab, weil er den Apothekern ' +
        'die Herstellung seiner Verdünnungen nicht zutraut. Im Königreich ' +
        'Sachsen verletzt das jedoch das Privileg der Apotheker; sie ' +
        'klagen, und 1820 entscheidet das Gericht gegen ihn. 1821 verlässt ' +
        'er Leipzig. Sechzig Kilometer nordwestlich, im Herzogtum ' +
        'Anhalt-Köthen, gilt anderes Recht: Herzog Ferdinand ernennt ihn ' +
        'zum Hofrat und erlaubt ihm ausdrücklich, seine Mittel selbst zu ' +
        'bereiten und abzugeben. In Köthen bleibt er vierzehn Jahre; hier ' +
        'entstehen 1828 „Die chronischen Krankheiten" und 1831 seine ' +
        'Anweisungen zur Cholera.',
      flaechen: [
        { titel: 'Königreich Sachsen nach 1815 — hier galt das Apotheker-Privileg', d: P.pfad(KOENIGREICH_SACHSEN_1815) },
        { titel: 'Herzogtum Anhalt-Köthen — hier erlaubte der Herzog die eigene Abgabe', d: P.pfad(ANHALT_KOETHEN) },
        { titel: 'Leipzig — das Urteil von 1820', d: P.pfad(LEIPZIG_STADT) },
        { titel: 'Köthen — die Zuflucht ab 1821', d: P.pfad(KOETHEN_ORT) },
      ],
    },
    {
      id: 'paris-1835-1843',
      label: '1835–1843: Paris — der alte Hahnemann und der Weltruhm',
      hinweis:
        'Seine erste Frau stirbt 1830. 1834 kommt die Pariser Malerin ' +
        'Mélanie d’Hervilly nach Köthen; im Januar 1835 heiraten die ' +
        'beiden, im Juni ziehen sie nach Paris. Dort führt der ' +
        'Achtzigjährige eine große, gut bezahlte Praxis. Am 2. Juli 1843 ' +
        'stirbt er im Alter von 88 Jahren; 1898 wird er auf den Friedhof ' +
        'Père Lachaise umgebettet. Zu dieser Zeit ist die Homöopathie ' +
        'längst über Europa hinaus: 1819 wird sie in Österreich verboten ' +
        'und erst 1837 wieder erlaubt, 1825 kommt sie nach New York, in ' +
        'den 1830er Jahren nach Britannien und Indien.',
      flaechen: [
        { titel: 'Köthen — der Aufbruch im Juni 1835', d: P.pfad(KOETHEN_ORT) },
        { titel: 'Der Weg nach Paris — er verlässt das Blatt nach Südwesten', d: P.pfad(WEG_NACH_PARIS) },
      ],
    },
  ],

  punkte: [
    {
      id: 'meissen',
      name: 'Meißen',
      typ: 'stadt',
      ...ort(13.475, 51.163),
      text:
        'Die Stadt an der Elbe, in der am 10. April 1755 Christian ' +
        'Friedrich Samuel Hahnemann geboren wird. Sein Vater bemalt ' +
        'Porzellan in der kurfürstlichen Manufaktur — ein Handwerk, in dem ' +
        'winzige Mengen Farbe über das Ergebnis entscheiden und in dem man ' +
        'lernt, genau hinzusehen. Der Junge kommt auf die Fürstenschule ' +
        'St. Afra, eine Lateinschule mit hartem Pensum; weil das Geld ' +
        'knapp ist, erlässt man ihm das Schulgeld. Sein Abschlussaufsatz ' +
        '1775 handelt vom „wunderbaren Bau der menschlichen Hand". Danach ' +
        'geht er mit sehr wenig Geld nach Leipzig, um Medizin zu ' +
        'studieren.',
    },
    {
      id: 'dresden',
      name: 'Dresden',
      typ: 'stadt',
      ...ort(13.738, 51.049),
      text:
        'Die Residenzstadt, in der der junge Arzt Ende der 1780er Jahre ' +
        'arbeitet: Er vertritt zeitweise den Stadtphysikus, betreut ' +
        'Kranke im Krankenhaus und nutzt die kurfürstliche Bibliothek für ' +
        'seine chemischen und pharmazeutischen Studien. Hier sieht er ' +
        'täglich, was die Medizin seiner Zeit tut — Aderlass, ' +
        'Brechmittel, Klistiere, Quecksilberpräparate — und wie oft die ' +
        'Behandlung den Kranken mehr schwächt als die Krankheit. Aus ' +
        'diesem Zweifel wird wenige Jahre später eine Gegenlehre. 1810 ' +
        'erscheint in Dresden das „Organon".',
    },
    {
      id: 'leipzig',
      name: 'Leipzig',
      typ: 'ereignis',
      ...ort(12.373, 51.339),
      text:
        'Der wichtigste Ort dieses Kapitels — und der schmerzhafteste. ' +
        'Hier beginnt Hahnemann 1775 sein Studium. Hier übersetzt er 1790 ' +
        'die Arzneimittellehre des Schotten William Cullen und macht ' +
        'jenen Selbstversuch mit der Chinarinde, aus dem das ' +
        'Ähnlichkeitsprinzip hervorgeht. Hier hält er ab 1812 Vorlesungen ' +
        'an der Universität und sammelt seine ersten Schüler. Und hier ' +
        'verliert er 1820 den Prozess gegen die Apotheker, die ihm ' +
        'verbieten lassen, seine Arzneien selbst abzugeben. 1821 verlässt ' +
        'er die Stadt. Leipzig bleibt trotzdem eine Hauptstadt der ' +
        'Homöopathie: 1833 entsteht hier das erste homöopathische ' +
        'Krankenhaus.',
    },
    {
      id: 'torgau',
      name: 'Torgau',
      typ: 'ereignis',
      ...ort(13.004, 51.56),
      text:
        'Die kleine Elbstadt, in der von 1805 bis 1811 das Fundament ' +
        'gelegt wird. Hahnemann prüft Arzneien an Gesunden — an sich ' +
        'selbst, an seiner Frau, an seinen Kindern, an Schülern: kleine ' +
        'Gaben, dann tagelang notieren, was der Körper meldet. Aus diesen ' +
        'Protokollen entstehen die Arzneimittelbilder. Hier schreibt er ' +
        'auch das Buch, das die Lehre zusammenfasst und 1810 erscheint: ' +
        'das „Organon". Sein erster Satz lautet, des Arztes höchster und ' +
        'einziger Beruf sei es, kranke Menschen gesund zu machen — was ' +
        'man Heilen nenne.',
    },
    {
      id: 'koethen',
      name: 'Köthen',
      typ: 'ereignis',
      ...ort(11.97, 51.752),
      text:
        'Die Residenz des kleinen Herzogtums Anhalt-Köthen und Hahnemanns ' +
        'Zuflucht von 1821 bis 1835. Hier darf er, was ihm in Sachsen ' +
        'verboten war: seine Arzneien selbst herstellen und abgeben — ' +
        'Herzog Ferdinand erlaubt es ausdrücklich und macht ihn zum ' +
        'Hofrat. In diesen vierzehn Jahren erscheint 1828 „Die ' +
        'chronischen Krankheiten" mit der umstrittenen Lehre von den ' +
        'Miasmen, hier gibt er 1831 seine Anweisungen zur Cholera heraus, ' +
        'und hier verfeinert er die Potenzierung zu dem Verfahren, über ' +
        'das bis heute gestritten wird. 1830 stirbt seine Frau Johanna ' +
        'Henriette.',
    },
    {
      id: 'dessau',
      name: 'Dessau',
      typ: 'stadt',
      ...ort(12.243, 51.836),
      text:
        'Die anhaltische Residenzstadt an der Mündung der Mulde in die ' +
        'Elbe — und die Werkbank des jungen Hahnemann. Anfang der 1780er ' +
        'Jahre arbeitet er hier im Laboratorium einer Apotheke und lernt ' +
        'das Handwerk, das später die Grundlage seiner Methode wird: ' +
        'wiegen, lösen, verreiben, umfüllen, beschriften. 1782 heiratet ' +
        'er Johanna Henriette Küchler aus dem Haus des Apothekers; aus ' +
        'der Ehe gehen elf Kinder hervor. Dass ausgerechnet ein Mann, der ' +
        'in der Apotheke gelernt hatte, später mit den Apothekern vor ' +
        'Gericht landete, gehört zu den Merkwürdigkeiten dieser ' +
        'Geschichte.',
    },
  ],

  bewegungen: [
    {
      id: 'weg-nach-koethen',
      name: 'Die Vertreibung: Leipzig nach Köthen, 1821',
      von: station(12.373, 51.339),
      ueber: [station(11.96, 51.48)],
      nach: station(11.97, 51.752),
      text:
        'Sechzig Kilometer, die alles entschieden. Nach dem Urteil von ' +
        '1820 durfte Hahnemann in Sachsen seine Arzneien nicht mehr selbst ' +
        'abgeben; im Herzogtum Anhalt-Köthen erlaubte es ihm der Herzog. ' +
        'Nicht ein wissenschaftlicher Streit hat ihn aus Leipzig getrieben, ' +
        'sondern das Gewerberecht der Apotheker — und nicht ein Argument ' +
        'hat ihn gerettet, sondern eine Landesgrenze.',
    },
    {
      id: 'weg-nach-paris',
      name: 'Der Aufbruch nach Paris, Juni 1835',
      von: station(11.97, 51.752),
      ueber: [station(11.4, 51.2)],
      nach: station(11.05, 50.55),
      text:
        'Im Juni 1835 verlässt der Achtzigjährige mit seiner zweiten Frau ' +
        'Mélanie das anhaltische Ländchen und zieht nach Paris. Die Linie ' +
        'verlässt dieses Blatt nach Südwesten: Paris liegt rund ' +
        'achthundert Kilometer entfernt, bei 2,35 Grad östlicher Länge. ' +
        'Dort führt Hahnemann acht Jahre lang eine große Praxis und ' +
        'stirbt am 2. Juli 1843 im Alter von 88 Jahren.',
    },
    {
      id: 'die-lehre-geht-in-die-welt',
      name: 'Die Lehre geht in die Welt',
      von: station(12.373, 51.339),
      ueber: [station(13.6, 51.0)],
      nach: station(14.7, 50.6),
      text:
        'Von Leipzig und Köthen aus verbreitet sich die Homöopathie in ' +
        'wenigen Jahrzehnten über die Welt — zuerst nach Süden und Osten: ' +
        'Wien, wo sie 1819 verboten und erst 1837 wieder erlaubt wird; ' +
        'dann Neapel, Paris, London und 1825 New York. In den 1830er ' +
        'Jahren erreicht sie Indien, wo sie bis heute eines der ' +
        'staatlich anerkannten Medizinsysteme ist. Die Linie zeigt nur ' +
        'die Richtung; ihre Ziele liegen alle außerhalb dieses Blattes.',
    },
  ],

  beschriftungen: [
    schrift('Deutschland', 'land', 11.35, 52.25),
    schrift('Sachsen', 'land', 13.2, 50.95),
    schrift('Anhalt', 'land', 11.83, 51.9),
    schrift('Preußen', 'land', 12.95, 51.95),
    schrift('Böhmen', 'land', 14.15, 50.6),
    schrift('Lausitz', 'land', 14.55, 51.32),
    schrift('Erzgebirge', 'land', 13.1, 50.63, -12),
    schrift('Thüringer Wald', 'land', 11.05, 50.62, -30),
    schrift('Harz', 'land', 11.12, 51.66),
    schrift('Fläming', 'land', 12.75, 52.02),
    schrift('Leipzig', 'land', 12.29, 51.28),
    schrift('Dresden', 'land', 13.85, 51.02),
    schrift('Meißen', 'land', 13.56, 51.19),
    schrift('Köthen', 'land', 11.86, 51.78),
    schrift('Torgau', 'land', 12.9, 51.62),
    schrift('Dessau', 'land', 12.35, 51.86),
    schrift('Eilenburg', 'land', 12.7, 51.44),
    schrift('Halle', 'land', 11.86, 51.5),
    schrift('Elbe', 'meer', 13.35, 51.26, -55),
    schrift('Saale', 'meer', 11.84, 51.31, -70),
    schrift('Mulde', 'meer', 12.68, 51.31, -80),
    schrift('Weiße Elster', 'meer', 12.16, 51.1, -65),
    schrift('Schwarze Elster', 'meer', 13.62, 51.53, 12),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
  fluesse,
};
