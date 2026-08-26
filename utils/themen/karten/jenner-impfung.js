// Karte zu „Jenner und die Impfung" — die britischen Inseln zwischen 1721
// und 1980.
//
// Wie in den Kapiteln 1 bis 9 stehen die Küstenlinien als echte Längen- und
// Breitengrade `[lon, lat]`; utils/karte-geo.js rechnet sie in
// SVG-Koordinaten um (Architektur-Regel: Fachlogik in utils/, ohne
// UI-Importe, mit blankem `node` prüfbar). Wer einen Punkt anzweifelt,
// schlägt ihn im Atlas nach — genau dafür sind die Rohdaten unten
// exportiert, und genau das prüft tests/karte-jenner-impfung.mjs nach.
//
// Was die Karte zeigen soll: die Orte der Kette. Berkeley in
// Gloucestershire, wo am 14. Mai 1796 die erste Impfung mit Kuhpocken
// gesetzt wurde. London, wo 1721 sechs Verurteilte im Newgate-Gefängnis
// variolisiert wurden und wo später die Impfgesetze beschlossen wurden.
// Yetminster in Dorset, wo der Bauer Benjamin Jesty zweiundzwanzig Jahre
// vor Jenner dasselbe getan hatte. Leicester, wo 1885 zehntausende
// Menschen gegen die Impfpflicht durch die Stadt zogen. Gloucester, wo
// 1895/96 eine Pockenepidemie ausbrach. Und Bristol, der Hafen im Westen,
// über den die Lymphe die Insel verließ.
//
// Deshalb dieser Ausschnitt: vom Atlantik westlich Irlands bis an die
// flandrische Küste, von der Kanalküste bis an die Grampians. Er muss
// Berkeley und London auf dasselbe Blatt bringen, dazu Dorset im Süden,
// Leicester in den Midlands — und den Seeweg nach Westen, auf dem die
// Vakzination 1800 nach Amerika und 1803 mit der Balmis-Expedition um die
// halbe Welt ging.
//
// Aufbau der Landmassen: Großbritannien als ein Ring (im Norden außerhalb
// des Rahmens geschlossen, damit die Küste nicht am Bildrand abknickt),
// Irland ganz, und ein Stück Festland in der Südostecke — die Küste der
// Normandie, Flanderns und Hollands, über die 1717 die Nachricht aus
// Konstantinopel kam.

const {
  KARTENFARBEN,
  erstelleProjektion,
  verbinde,
} = require('../../karte-geo');

/**
 * Der Kartenausschnitt: vom Atlantik bis nach Flandern, vom Ärmelkanal bis
 * nach Nordostschottland.
 */
const RAHMEN = {
  minLon: -11,
  maxLon: 3,
  minLat: 49.5,
  maxLat: 57,
  breite: 700,
};

const P = erstelleProjektion(RAHMEN);

// ---------------------------------------------------------------------------
// Kleine Helfer — dieselben wie in den Kapiteln 1 bis 9, damit alle Karten des
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

/** Land’s End → Lizard → Plymouth → Portland → Selsey → North Foreland. */
const ENGLAND_SUEDKUESTE = [
  [-5.71, 50.07], [-5.2, 49.96], [-4.8, 50.22], [-4.15, 50.33], [-3.64, 50.22],
  [-3.48, 50.4], [-3.24, 50.68], [-2.94, 50.72], [-2.46, 50.51],
  [-2.06, 50.58], [-1.87, 50.72], [-1.4, 50.78], [-0.79, 50.72], [0.25, 50.73],
  [0.58, 50.85], [0.97, 50.91], [1.34, 51.13], [1.44, 51.38],
];

/** Themsemündung → Ostanglien → der Wash → Humber → Northumberland. */
const ENGLAND_OSTKUESTE = [
  [1.4, 51.36], [0.95, 51.35], [0.55, 51.44], [0.75, 51.51], [0.95, 51.62],
  [1.29, 51.95], [1.58, 52.08], [1.75, 52.48], [1.73, 52.6], [1.3, 52.93],
  [0.49, 52.94], [0.05, 52.98], [0.34, 53.15], [0.11, 53.58], [-0.17, 53.91],
  [-0.08, 54.11], [-0.39, 54.28], [-0.61, 54.49], [-1.07, 54.62],
  [-1.18, 54.69], [-1.38, 54.9], [-1.5, 55.13], [-1.71, 55.6],
];

/**
 * Berwick → Firth of Forth → Firth of Tay → Aberdeen → aus dem Rahmen.
 *
 * Der Firth of Forth gehört hierher, weil Edinburgh an seinem Südufer liegt:
 * Dort und in London hatte die Impfgegner-Bewegung des 19. Jahrhunderts ihre
 * Zeitschriften und Vereine.
 */
const SCHOTTLAND_OSTKUESTE = [
  [-2.0, 55.77], [-2.52, 56.0], [-2.72, 56.06], [-2.98, 55.96],
  [-3.17, 55.98], [-3.6, 56.01], [-3.71, 56.03], [-3.72, 56.08],
  [-3.44, 56.02], [-3.23, 56.06], [-3.15, 56.11], [-3.0, 56.19],
  [-2.83, 56.19], [-2.6, 56.28], [-2.79, 56.34], [-2.9, 56.45],
  [-2.58, 56.56], [-2.47, 56.71], [-2.21, 56.96], [-2.08, 57.14],
  [-1.79, 57.5], [-2.6, 57.85],
];

/** Nordwestschottland → Kintyre → Firth of Clyde → Solway Firth. */
const SCHOTTLAND_WESTKUESTE = [
  [-5.2, 57.85], [-5.65, 57.35], [-5.83, 57.0], [-6.15, 56.72],
  [-5.47, 56.41], [-5.35, 56.05], [-5.6, 55.6], [-5.8, 55.31], [-5.35, 55.6],
  [-5.2, 55.9], [-4.85, 55.95], [-4.87, 55.7], [-4.63, 55.46], [-4.86, 55.24],
  [-5.03, 54.9], [-4.86, 54.63], [-4.4, 54.68], [-3.6, 54.87], [-3.06, 54.98],
];

/** Cumbria → Mersey → Wales → Bristolkanal → Cornwall. */
const ENGLAND_WESTKUESTE = [
  [-3.35, 54.9], [-3.6, 54.5], [-3.2, 54.1], [-3.05, 53.85], [-3.1, 53.45],
  [-3.4, 53.35], [-3.83, 53.33], [-4.6, 53.4], [-4.75, 52.9], [-4.06, 52.72],
  [-4.08, 52.41], [-4.66, 52.1], [-5.3, 51.88], [-5.05, 51.71], [-4.3, 51.62],
  [-3.2, 51.46], [-2.7, 51.52], [-3.0, 51.2], [-3.5, 51.21], [-4.1, 51.2],
  [-4.5, 50.9], [-4.55, 50.55], [-5.08, 50.42], [-5.48, 50.21],
];

/** Die Insel, auf der die Kette begann. */
const GROSSBRITANNIEN = verbinde(
  ENGLAND_SUEDKUESTE,
  ENGLAND_OSTKUESTE,
  SCHOTTLAND_OSTKUESTE,
  SCHOTTLAND_WESTKUESTE,
  ENGLAND_WESTKUESTE,
);

/**
 * Irland.
 *
 * Es gehört auf diese Karte, weil die Impfpflicht des 19. Jahrhunderts auch
 * hier galt und weil die irischen Häfen am Seeweg nach Westen lagen.
 */
const IRLAND = [
  [-6.15, 53.35], [-6.0, 52.96], [-6.35, 52.18], [-7.6, 51.95],
  [-8.25, 51.79], [-9.8, 51.45], [-10.4, 51.9], [-9.93, 52.56],
  [-9.6, 53.15], [-10.2, 53.4], [-10.1, 53.97], [-10.0, 54.3], [-8.6, 54.3],
  [-8.75, 54.65], [-8.3, 55.15], [-7.37, 55.38], [-7.0, 55.05],
  [-6.65, 55.2], [-6.25, 55.2], [-5.8, 54.85], [-5.7, 54.6], [-5.5, 54.4],
  [-5.85, 54.2], [-6.2, 54.05], [-6.3, 53.9], [-6.2, 53.7],
];

/**
 * Das Festland in der Südostecke: Normandie, Picardie, Flandern, Holland.
 *
 * Der Süden und der Osten liegen außerhalb des Rahmens — die Fläche läuft
 * dort aus, statt am Bildrand abzuknicken.
 */
const FESTLAND_KUESTE = [
  [-1.6, 48.84], [-1.94, 49.72], [-1.26, 49.68], [-1.1, 49.4], [-0.4, 49.35],
  [0.11, 49.49], [1.08, 49.93], [1.55, 50.22], [1.6, 50.72], [1.85, 50.96],
  [2.37, 51.03], [2.92, 51.23], [3.4, 51.42],
];

/** Der Süd- und Ostrand: bewusst außerhalb des Rahmens. */
const FESTLAND_RAND = [
  [3.9, 51.5], [3.9, 48.4], [-1.8, 48.4],
];

/** Das Stück Festland, über das 1717 die Nachricht aus dem Osten kam. */
const FESTLAND = verbinde(FESTLAND_KUESTE, FESTLAND_RAND);

// ---------------------------------------------------------------------------
// Gebirge und Flüsse — der Untergrund, auf dem die Geschichte spielt.
// ---------------------------------------------------------------------------

/** Die Penninen — der Rücken Nordenglands. */
const PENNINEN = [
  [-2.5, 54.9], [-2.0, 54.6], [-1.9, 53.9], [-2.2, 53.3], [-2.6, 53.6],
  [-2.7, 54.3],
];

/** Das walisische Bergland. */
const WALES_BERGLAND = [
  [-4.1, 53.1], [-3.4, 52.9], [-3.2, 52.3], [-3.6, 51.9], [-4.2, 52.1],
  [-4.3, 52.7],
];

/** Das schottische Hochland — der Nordwesten des Blattes. */
const HOCHLAND = [
  [-5.2, 57.4], [-3.9, 57.4], [-3.4, 56.7], [-4.6, 56.2], [-5.4, 56.6],
];

/** Die Themse — Oxford, Reading, London, Gravesend, Mündung. */
const THEMSE = [
  [-1.8, 51.6], [-1.26, 51.75], [-0.97, 51.45], [-0.34, 51.42], [-0.1, 51.5],
  [0.37, 51.44], [0.7, 51.5],
];

/**
 * Der Severn — Shrewsbury, Worcester, Gloucester, Berkeley, Mündung.
 *
 * Der Fluss ist hier keine Zierde: Jenners Berkeley liegt in seiner Aue, und
 * die Weiden dieser Aue trugen das Milchvieh, von dem die Kuhpocken kamen.
 */
const SEVERN = [
  [-3.15, 52.55], [-2.75, 52.71], [-2.22, 52.19], [-2.25, 51.86],
  [-2.48, 51.68], [-2.7, 51.55], [-3.0, 51.35],
];

/** Der Trent — die Wasserstraße der Midlands, an Leicester vorbei. */
const TRENT = [
  [-2.05, 53.02], [-1.55, 52.85], [-1.15, 52.92], [-0.79, 53.1],
  [-0.7, 53.42], [-0.3, 53.62],
];

/** Alle geografischen Rohdaten — die Prüfung schlägt sie hier nach. */
const kuesten = {
  grossbritannien: GROSSBRITANNIEN,
  irland: IRLAND,
  festland: FESTLAND,
  englandSuedkueste: ENGLAND_SUEDKUESTE,
  englandOstkueste: ENGLAND_OSTKUESTE,
  schottlandOstkueste: SCHOTTLAND_OSTKUESTE,
  schottlandWestkueste: SCHOTTLAND_WESTKUESTE,
  englandWestkueste: ENGLAND_WESTKUESTE,
  festlandKueste: FESTLAND_KUESTE,
};

/** Die Landflächen — für die Kontrollpunkte der Prüfung („liegt auf See"). */
const landflaechen = [GROSSBRITANNIEN, IRLAND, FESTLAND];

// ---------------------------------------------------------------------------
// Die Phasen: zweihundertsechzig Jahre von der ersten Prüfung an Gefangenen
// bis zur letzten Pockenerkrankung der Welt.
// ---------------------------------------------------------------------------

/** Phase 1 — die Variolation kommt nach England. */
const LONDON_STADT = [
  [-0.35, 51.62], [0.1, 51.62], [0.1, 51.4], [-0.35, 51.4],
];
const KANAL_ZUGANG = [
  [0.5, 51.2], [2.9, 51.15], [2.9, 50.2], [0.5, 50.4],
];

/** Phase 2 — die Kuhpocken im Westen. */
const VALE_OF_BERKELEY = [
  [-2.75, 51.85], [-2.25, 51.85], [-2.2, 51.55], [-2.7, 51.55],
];
const DORSET = [
  [-2.85, 51.1], [-2.3, 51.1], [-2.3, 50.8], [-2.85, 50.8],
];

/** Phase 3 — die Impfgesetze. */
const ENGLAND_UND_WALES = [
  [-5.2, 54.9], [-0.5, 54.9], [1.7, 52.2], [1.0, 50.7], [-5.8, 50.5],
  [-4.4, 53.4],
];

/** Phase 4 — der Widerstand und die Gewissensklausel. */
const LEICESTER_STADT = [
  [-1.3, 52.72], [-1.0, 52.72], [-1.0, 52.55], [-1.3, 52.55],
];
const GLOUCESTER_STADT = [
  [-2.4, 51.95], [-2.1, 51.95], [-2.1, 51.78], [-2.4, 51.78],
];

/** Phase 5 — der Weg in die Welt und das Ende der Krankheit. */
const SEEWEG_ATLANTIK = [
  [-10.5, 51.6], [-6.6, 50.9], [-7.0, 49.8], [-10.5, 50.2],
];

// ---------------------------------------------------------------------------
// Die fertige Karte für das Themen-Modul.
// ---------------------------------------------------------------------------

const karte = {
  breite: P.breite,
  hoehe: P.hoehe,

  basis: [
    land(GROSSBRITANNIEN),
    land(IRLAND),
    land(FESTLAND),
    gebirge(PENNINEN),
    gebirge(WALES_BERGLAND),
    gebirge(HOCHLAND),
    fluss(THEMSE),
    fluss(SEVERN),
    fluss(TRENT),
  ],

  phasen: [
    {
      id: 'variolation-1721',
      label: '1721: die Variolation erreicht England — die Prüfung in Newgate',
      hinweis:
        'Lady Mary Wortley Montagu hatte das Verfahren 1717 in ' +
        'Konstantinopel gesehen: Man setzt einem Gesunden absichtlich echte ' +
        'Menschenpocken, damit er sie milde durchmacht. Wie gefährlich das ' +
        'ist, prüft man am 9. August 1721 in London an sechs zum Tode ' +
        'Verurteilten des Newgate-Gefängnisses; die Gegenleistung ist die ' +
        'Begnadigung. Im Jahr darauf wird die Probe an Waisenkindern der ' +
        'Gemeinde St James wiederholt. Erst danach lässt die Prinzessin von ' +
        'Wales ihre eigenen Töchter impfen.',
      flaechen: [
        { titel: 'London — Newgate und die Waisenkinder von St James', d: P.pfad(LONDON_STADT) },
        { titel: 'Der Weg der Nachricht aus dem Osten', d: P.pfad(KANAL_ZUGANG) },
      ],
    },
    {
      id: 'kuhpocken-1796',
      label: '1774–1796: die Kuhpocken — Yetminster und Berkeley',
      hinweis:
        'Unter den Bauern im Westen läuft die Beobachtung um, dass die ' +
        'Melkerinnen mit Kuhpocken an den Händen keine Menschenpocken ' +
        'bekommen. 1774 impft der Bauer Benjamin Jesty in Yetminster (Dorset) ' +
        'seine Frau und seine Söhne mit einer Stricknadel und ' +
        'Kuhpockenmaterial. Am 14. Mai 1796 setzt der Landarzt Edward Jenner ' +
        'in Berkeley dem achtjährigen James Phipps Flüssigkeit aus den ' +
        'Kuhpocken der Magd Sarah Nelmes in den Arm — und prüft den Schutz am ' +
        '1. Juli mit echten Menschenpocken.',
      flaechen: [
        { titel: 'Das Vale of Berkeley — Jenners Landpraxis', d: P.pfad(VALE_OF_BERKELEY) },
        { titel: 'Dorset — Benjamin Jesty, 1774', d: P.pfad(DORSET) },
      ],
    },
    {
      id: 'impfgesetze-1853',
      label: '1840–1867: die Impfpflicht in England und Wales',
      hinweis:
        '1840 wird die Impfung für die Armen kostenlos und die alte ' +
        'Variolation verboten. 1853 folgt die Pflicht für jedes Kind in den ' +
        'ersten drei Lebensmonaten, 1867 die Ausweitung mit Strafen, die sich ' +
        'wiederholen, solange das Kind ungeimpft bleibt; ab 1871 führen ' +
        'eigene Impfbeamte die Register. Wer zahlen kann, zahlt die Strafe; ' +
        'wer nicht zahlen kann, kommt ins Gefängnis oder verliert sein ' +
        'Werkzeug an den Gerichtsvollzieher.',
      flaechen: [
        { titel: 'England und Wales unter der Impfpflicht', d: P.pfad(ENGLAND_UND_WALES) },
        { titel: 'London — Parlament, Register und Impfbeamte', d: P.pfad(LONDON_STADT) },
      ],
    },
    {
      id: 'widerstand-1898',
      label: '1885–1898: Leicester, Gloucester und die Gewissensklausel',
      hinweis:
        'Am 23. März 1885 ziehen in Leicester zehntausende Menschen gegen die ' +
        'Impfpflicht durch die Stadt. Leicester impft danach kaum noch und ' +
        'setzt stattdessen auf sofortige Meldung, Absonderung der Kranken und ' +
        'Quarantäne der Haushalte. In Gloucester bricht 1895/96 bei niedriger ' +
        'Impfquote eine Pockenepidemie aus, überwiegend unter Kindern. Eine ' +
        'königliche Kommission hört von 1889 bis 1896 beide Seiten an; das ' +
        'Gesetz von 1898 erlaubt die Verweigerung aus Gewissensgründen und ' +
        'untersagt die Übertragung von Arm zu Arm.',
      flaechen: [
        { titel: 'Leicester — der Umzug von 1885 und die eigene Methode', d: P.pfad(LEICESTER_STADT) },
        { titel: 'Gloucester — die Epidemie von 1895/96', d: P.pfad(GLOUCESTER_STADT) },
      ],
    },
    {
      id: 'ausrottung-1980',
      label: '1967–1980: der Weg in die Welt und das Ende der Pocken',
      hinweis:
        'Der Impfstoff kannte weder Kühlung noch Fläschchen: Er reiste als ' +
        'Kette von Arm zu Arm, über die westlichen Häfen nach Amerika (1800) ' +
        'und mit der spanischen Balmis-Expedition ab 1803 bis auf die ' +
        'Philippinen. 1967 zählt die Welt noch zehn bis fünfzehn Millionen ' +
        'Pockenfälle im Jahr; die Weltgesundheitsorganisation beginnt ihr ' +
        'Programm der Ringimpfung. Großbritannien stellt die allgemeine ' +
        'Pockenimpfung 1971 ein. Der letzte Mensch, der sich auf natürlichem ' +
        'Weg ansteckte, erkrankte am 26. Oktober 1977 in Somalia; am 8. Mai ' +
        '1980 erklärt die Weltgesundheitsversammlung die Pocken für ' +
        'ausgerottet.',
      flaechen: [
        { titel: 'Großbritannien — 1971 endet die allgemeine Pockenimpfung', d: P.pfad(ENGLAND_UND_WALES) },
        { titel: 'Der Seeweg nach Westen', d: P.pfad(SEEWEG_ATLANTIK) },
      ],
    },
  ],

  punkte: [
    {
      id: 'berkeley',
      name: 'Berkeley',
      typ: 'ereignis',
      ...ort(-2.457, 51.691),
      text:
        'Der Ort, an dem die Kette beginnt. Edward Jenner (1749–1823) wurde ' +
        'hier geboren, führte hier seine Landpraxis und starb hier. Am ' +
        '14. Mai 1796 setzte er dem achtjährigen James Phipps, dem Sohn ' +
        'seines Gärtners, Flüssigkeit aus den Kuhpocken der Magd Sarah ' +
        'Nelmes in zwei kleine Schnitte am Arm; am 1. Juli prüfte er den ' +
        'Schutz mit echten Menschenpocken. 1798 druckte er den Bericht über ' +
        'dreiundzwanzig Fälle auf eigene Kosten. In einer Hütte in seinem ' +
        'Garten, die er den Tempel der Vakzine nannte, impfte er die Armen ' +
        'der Umgebung kostenlos.',
    },
    {
      id: 'london',
      name: 'London',
      typ: 'ereignis',
      ...ort(-0.128, 51.508),
      text:
        'Hier wurde 1721 im Newgate-Gefängnis an sechs zum Tode Verurteilten ' +
        'geprüft, wie gefährlich die Variolation ist — und im Jahr darauf an ' +
        'Waisenkindern der Gemeinde St James. Hier wurde ab 1803 in der ' +
        'Royal Jennerian Society und später im staatlichen National Vaccine ' +
        'Establishment die Lymphe verteilt, mit der halb Europa geimpft ' +
        'wurde. Und hier beschloss das Parlament die Impfgesetze von 1840, ' +
        '1853, 1867 und 1898 — vom kostenlosen Angebot über die Pflicht mit ' +
        'wiederholter Strafe bis zur Gewissensklausel.',
    },
    {
      id: 'yetminster',
      name: 'Yetminster',
      typ: 'ereignis',
      ...ort(-2.573, 50.94),
      text:
        'Ein Dorf in Dorset, zweiundzwanzig Jahre vor Berkeley. 1774 nahm ' +
        'der Bauer Benjamin Jesty Material aus den Kuhpocken eines Euters ' +
        'und impfte damit — mit einer Stricknadel — seine Frau Elizabeth und ' +
        'seine beiden Söhne, um sie durch eine Pockenwelle zu bringen. Alle ' +
        'drei blieben ihr Leben lang verschont. Jesty erntete Spott und ' +
        'schrieb nichts auf. Was Jenner tat und Jesty nicht tat, war die ' +
        'Sache zu prüfen und zu veröffentlichen.',
    },
    {
      id: 'leicester',
      name: 'Leicester',
      typ: 'ereignis',
      ...ort(-1.133, 52.636),
      text:
        'Das Zentrum des Widerstands. Am 23. März 1885 zogen zehntausende ' +
        'Menschen durch die Stadt und verlangten die Abschaffung der ' +
        'Impfpflicht; die Bewegung war vor allem eine der Arbeiter, weil die ' +
        'wiederholten Geldstrafen sie am härtesten trafen. Leicester impfte ' +
        'danach fast nicht mehr, sondern meldete jeden Fall sofort, sonderte ' +
        'die Kranken ab, stellte die Haushalte unter Quarantäne und ' +
        'desinfizierte die Wohnungen — und kam mit dieser Methode gut durch ' +
        'die Pockenjahre.',
    },
    {
      id: 'gloucester',
      name: 'Gloucester',
      typ: 'ereignis',
      ...ort(-2.244, 51.864),
      text:
        'Die Nachbarstadt Berkeleys, gut zwanzig Kilometer flussaufwärts. ' +
        'Hier brach 1895/96 bei sehr niedriger Impfquote eine ' +
        'Pockenepidemie aus: knapp zweitausend Erkrankte und etwa ' +
        'vierhundertdreißig Tote, überwiegend Kinder. Die Stadt richtete ' +
        'Isolierhäuser ein und ließ am Ende in großem Umfang impfen. Der ' +
        'Ausbruch wurde in beiden Lagern zitiert — von den Impfärzten als ' +
        'Beweis, von den Impfgegnern als Frage nach den Wohnverhältnissen in ' +
        'den betroffenen Vierteln.',
    },
    {
      id: 'bristol',
      name: 'Bristol',
      typ: 'stadt',
      ...ort(-2.594, 51.454),
      text:
        'Der große Hafen im Westen, gut eine Tagesreise von Berkeley. Über ' +
        'die Häfen dieser Küste und über das benachbarte Bath verließ die ' +
        'Lymphe die Insel: 1800 schickte man einen Faden mit getrockneter ' +
        'Kuhpockenlymphe nach Boston, wo Benjamin Waterhouse damit seinen ' +
        'eigenen Sohn impfte. Weil der Impfstoff eine Seereise selten ' +
        'überstand, nahm die spanische Balmis-Expedition 1803 stattdessen ' +
        'zweiundzwanzig Waisenjungen als lebende Kette mit über den ' +
        'Atlantik.',
    },
  ],

  bewegungen: [
    {
      id: 'nachricht-aus-konstantinopel',
      name: 'Die Nachricht aus dem Osten',
      von: station(2.85, 50.9),
      ueber: [station(1.5, 51.05)],
      nach: station(-0.128, 51.508),
      text:
        'Das Verfahren war keine europäische Erfindung: Es kam aus China, ' +
        'Indien, Westafrika und dem Osmanischen Reich. 1717 schrieb Lady ' +
        'Mary Wortley Montagu aus Konstantinopel nach Hause, dort gingen ' +
        'alte Frauen im September mit einer Nussschale voll Pockenmaterial ' +
        'von Haus zu Haus. 1721 ließ sie ihre Tochter in London so ' +
        'behandeln — und damit begann die englische Geschichte der ' +
        'Vorbeugung.',
    },
    {
      id: 'lymphe-nach-london',
      name: 'Die Lymphe geht in die Hauptstadt',
      von: station(-2.457, 51.691),
      ueber: [station(-1.5, 51.6)],
      nach: station(-0.128, 51.508),
      text:
        'Nach der Veröffentlichung von 1798 wurde aus dem Fund eines ' +
        'Landarztes eine Sache der Hauptstadt: Ärzte holten sich Lymphe aus ' +
        'Berkeley, ab 1803 verteilte die Royal Jennerian Society sie in ' +
        'London weiter, später das staatliche National Vaccine ' +
        'Establishment. Das Parlament sprach Jenner 1802 zehntausend und ' +
        '1807 zwanzigtausend Pfund zu.',
    },
    {
      id: 'vakzination-in-die-welt',
      name: 'Die Kette verlässt die Insel',
      von: station(-2.594, 51.454),
      ueber: [station(-5.5, 50.6), station(-8.0, 50.4)],
      nach: station(-10.4, 50.3),
      text:
        'Von den westlichen Häfen aus lief die Vakzination über den Ozean: ' +
        '1799 nach Wien und Genf, 1800 nach Boston, ab 1803 mit der ' +
        'spanischen Expedition unter Francisco Javier de Balmis in die ' +
        'Kolonien und bis auf die Philippinen. Weil kein Gefäß den Impfstoff ' +
        'am Leben hielt, reiste er in Menschen: alle neun bis zehn Tage ' +
        'wurden zwei der mitgenommenen Waisenjungen frisch geimpft.',
    },
  ],

  beschriftungen: [
    schrift('Nordsee', 'meer', 1.55, 54.6),
    schrift('Ärmelkanal', 'meer', -0.7, 50.15, -12),
    schrift('Irische See', 'meer', -5.35, 53.75),
    schrift('Atlantik', 'meer', -9.6, 51.4),
    schrift('Bristolkanal', 'meer', -4.45, 51.3),
    schrift('Themse', 'meer', 0.55, 51.6),
    schrift('Severn', 'meer', -2.05, 52.05, -70),
    schrift('England', 'land', -1.4, 52.95),
    schrift('Wales', 'land', -3.65, 52.4),
    schrift('Schottland', 'land', -4.15, 56.6),
    schrift('Irland', 'land', -8.0, 53.4),
    schrift('London', 'land', 0.3, 51.28),
    schrift('Bristol', 'land', -2.25, 51.34),
    schrift('Flandern', 'land', 2.5, 50.7),
  ],
};

module.exports = {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
};
