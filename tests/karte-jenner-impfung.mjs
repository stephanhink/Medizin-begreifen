// Prüfungen für Kapitel 10 — „Jenner und die Impfung" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Sechs Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen auf der gezeichneten Küste, Binnenorte
//      innerhalb der Landflächen, offene See außerhalb. Geprüft werden
//      bewusst Orte, die NICHT selbst Stützpunkte der Linien sind — sonst
//      prüfte der Test nur, ob eine Zahl mit sich selbst übereinstimmt.
//      Der Ausschnitt ist enger als in Kapitel 9 (14° statt 30° Länge),
//      deshalb ist auch die Toleranz enger: 0,3°.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen die Variolation mit echten Menschenpocken
//      stehen, die Beobachtung der Bauern über die Kuhpocken — und die
//      Begründungslogik muss ausgeführt sein: warum vorbeugen statt heilen,
//      warum einen Gesunden absichtlich krank machen, warum die Kuhpocken,
//      warum von Arm zu Arm, warum der Zwang, warum ausgerechnet diese
//      Krankheit ausrottbar war.
//
//   3. **Die dunkle Frühgeschichte (Betreiber-Vorgabe: prominent, nicht als
//      Randnotiz).** Newgate und Boston 1721, die Waisenkinder, James
//      Phipps, die Syphilis von Rivalta, das Geschäft mit der Lymphe, der
//      Zwang der Impfgesetze, die Gewalt in der Schlussphase. Die Stimme
//      der Impfärzte muss diese Stellen SELBST benennen (Zusatzregel für
//      sensible Themen).
//
//   4. **Die impfkritische Statistik (Betreiber-Vorgabe: prominent).** Die
//      Kurven, die vor der Impfung fielen, müssen im Text vorkommen, fair
//      wiedergegeben und nicht abgetan werden — dazu die Allergien und die
//      Hygiene-Hypothese als offene Frage.
//
//   5. **Die Längenregel, umgekehrt (Betreiber-Vorgabe 24.08.2026).** Ab
//      Kapitel 9 gilt: vollständig und ausführlich. Für dieses Kapitel gilt
//      sie doppelt. Nach oben bleibt eine großzügige Grenze stehen, damit
//      „ausführlich" nicht in „aufgebläht" kippt.
//
//   6. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, Quiz-Umfang,
//      offene Urteilsfrage, Lernformat, TONE-Regel.
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 9: Die zweite
// Perspektive (die Impfkritik) und die endgültige Synthese kommen erst mit
// dem Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten,
// hängen deshalb an ihrer id („impfbefuerworter"); die Prüfungen zum
// Erzähl-Muster laufen über ALLE Perspektiven zusammen. Die Synthese wird
// je nach Ausbaustand verzweigt gemessen.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { erstelleProjektion } = require('../utils/karte-geo.js');
const { pruefeKarte } = require('../utils/themen/schema.js');
const { abschnitteFuer } = require('../utils/lernformat.js');
const { themaNachId, alleThemen } = require('../utils/themen/index.js');
const {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
} = require('../utils/themen/karten/jenner-impfung.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt umfasst 14° Länge — halb so breit wie der von Kapitel 9.
 * 0,3° sind hier rund fünfzehn Bildpunkte in der Waagerechten.
 */
const KUESTEN_TOLERANZ = 0.3;

/**
 * Mindestumfang der ersten Perspektive (Neuzeit-Regel, Kapitel 9 ff.).
 *
 * Die frühen Kapitel durften höchstens ~250 Zeilen je Stimme haben. Ab
 * Kapitel 9 gilt die Umkehrung, und für dieses Kapitel doppelt: die dunkle
 * Frühgeschichte UND die impfkritische Statistik sollen prominent stehen,
 * nicht als Randnotiz.
 */
const MIN_ZEILEN_ERSTE_STIMME = 400;

/** Obergrenze fürs ganze Kapitel — ausführlich ja, aufgebläht nein. */
const MAX_ZEILEN_KAPITEL = 1600;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 9: Ein
 * Strahl nach Osten schneidet den Rand eines geschlossenen Rings ungerade
 * oft, wenn der Punkt drinnen liegt. Gerechnet wird in Längen-/Breitengraden.
 *
 * @param {Array<number>} punkt [lon, lat]
 * @param {Array<Array<number>>} ring
 * @returns {boolean}
 */
function liegtIn(punkt, ring) {
  const [x, y] = punkt;
  let drin = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const schneidet =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (schneidet) drin = !drin;
  }
  return drin;
}

/**
 * Liegt der Punkt auf Land?
 *
 * Dieser Ausschnitt hat drei Landflächen: Großbritannien, Irland und das
 * Stück Festland in der Südostecke.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge in Schottland genauso
 * „lang" wie in der Normandie; die Toleranz würde im Norden großzügiger.
 */
function abstandZuStrecke(punkt, a, b) {
  const streckung = Math.cos(((RAHMEN.minLat + RAHMEN.maxLat) / 2) * (Math.PI / 180));
  const px = (punkt[0] - a[0]) * streckung;
  const py = punkt[1] - a[1];
  const bx = (b[0] - a[0]) * streckung;
  const by = b[1] - a[1];
  const laenge = bx * bx + by * by;
  const anteil = laenge === 0 ? 0 : Math.min(Math.max((px * bx + py * by) / laenge, 0), 1);
  const dx = px - bx * anteil;
  const dy = py - by * anteil;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Kürzester Abstand eines Punktes zu einem geschlossenen Küstenzug. */
function abstandZurKueste(punkt, ring) {
  let kleinster = Infinity;
  for (let i = 0; i < ring.length; i += 1) {
    const abstand = abstandZuStrecke(punkt, ring[i], ring[(i + 1) % ring.length]);
    if (abstand < kleinster) kleinster = abstand;
  }
  return kleinster;
}

/**
 * @param {(name: string, ok: boolean) => void} pruefe Prüf-Funktion des Rahmens
 */
export function laufe(pruefe) {
  const thema = themaNachId('jenner-impfung');
  pruefe(
    'Jenner: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 10 steht
  // hinter der Chirurgie (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Jenner: steht in der App hinter den „Anfängen der modernen Chirurgie"',
    alleThemen.findIndex((t) => t.id === 'jenner-impfung') ===
      alleThemen.findIndex((t) => t.id === 'chirurgie-anfaenge') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Jenner/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Jenner/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss Berkeley, London, Dorset und Leicester auf dasselbe Blatt
  // bringen — dazu den Ärmelkanal im Süden und den Seeweg nach Westen.
  pruefe(
    'Jenner/Karte: der Ausschnitt reicht vom Atlantik bis nach Flandern',
    RAHMEN.minLon <= -10 && RAHMEN.maxLon >= 2,
  );
  pruefe(
    'Jenner/Karte: der Ausschnitt reicht vom Ärmelkanal bis nach Schottland',
    RAHMEN.minLat <= 50 && RAHMEN.maxLat >= 55,
  );
  pruefe('Jenner/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Jenner/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Brighton (Ärmelkanal)', -0.14, 50.82, kuesten.grossbritannien],
    ['Falmouth (Cornwall)', -5.07, 50.15, kuesten.grossbritannien],
    ['Weymouth (Dorset)', -2.45, 50.61, kuesten.grossbritannien],
    ['Portsmouth (Solent)', -1.09, 50.8, kuesten.grossbritannien],
    ['Dover (Kanalenge)', 1.31, 51.13, kuesten.grossbritannien],
    ['Grimsby (Humber)', -0.08, 53.57, kuesten.grossbritannien],
    ['Bridlington (Yorkshire)', -0.19, 54.08, kuesten.grossbritannien],
    ['Great Yarmouth (Ostanglien)', 1.73, 52.61, kuesten.grossbritannien],
    ['Swansea (Wales)', -3.94, 51.62, kuesten.grossbritannien],
    ['Ilfracombe (Bristolkanal)', -4.12, 51.21, kuesten.grossbritannien],
    ['Blackpool (Irische See)', -3.05, 53.82, kuesten.grossbritannien],
    ['Whitehaven (Cumbria)', -3.59, 54.55, kuesten.grossbritannien],
    ['Ayr (Firth of Clyde)', -4.63, 55.46, kuesten.grossbritannien],
    ['Aberdeen (Nordostschottland)', -2.09, 57.15, kuesten.grossbritannien],
    ['Kinsale (Südirland)', -8.52, 51.7, kuesten.irland],
    ['Rosslare (Südostirland)', -6.34, 52.25, kuesten.irland],
    ['Belfast (Nordirland)', -5.93, 54.6, kuesten.irland],
    ['Cherbourg (Normandie)', -1.62, 49.64, kuesten.festland],
    ['Dieppe (Picardie)', 1.08, 49.93, kuesten.festland],
    ['Dünkirchen (Flandern)', 2.2, 51.03, kuesten.festland],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Jenner/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb einer Landfläche liegen ----------------
  const binnenorte = [
    ['Berkeley', -2.457, 51.691],
    ['London', -0.128, 51.508],
    ['Gloucester', -2.244, 51.864],
    ['Leicester', -1.133, 52.636],
    ['Yetminster', -2.573, 50.94],
    ['Bristol', -2.594, 51.454],
    ['Bath', -2.36, 51.38],
    ['Oxford', -1.26, 51.75],
    ['Birmingham', -1.9, 52.48],
    ['Manchester', -2.24, 53.48],
    ['York', -1.08, 53.96],
    ['Cardiff', -3.18, 51.48],
    ['Exeter', -3.53, 50.72],
    ['Edinburgh', -3.19, 55.95],
    ['Glasgow', -4.25, 55.86],
    ['Dublin', -6.26, 53.35],
    ['Cork', -8.47, 51.9],
    ['Rouen', 1.1, 49.44],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Jenner/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['der Ärmelkanal', 0.5, 50.3],
    ['der westliche Ärmelkanal', -3.0, 49.9],
    ['die Nordsee', 1.5, 54.5],
    ['die Nordsee vor der Themsemündung', 1.8, 52.0],
    ['die Irische See', -5.3, 53.6],
    ['der Bristolkanal', -3.7, 51.35],
    ['der Nordkanal', -5.6, 55.1],
    ['der Firth of Clyde', -5.0, 55.5],
    ['die Keltische See', -7.5, 50.5],
    ['der Atlantik westlich Irlands', -10.6, 53.0],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Jenner/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Jenner/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Jenner/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\b(1[6-9]\d\d|20\d\d)\b/.test(phase.label),
    );
    pruefe(
      `Jenner/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Jenner/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: die Variolation, die
  // Kuhpocken, die Impfgesetze, der Widerstand, die Ausrottung.
  pruefe(
    'Jenner/Karte: eine Phase zeigt die Variolation und die Prüfung in Newgate 1721',
    karte.phasen.some(
      (p) =>
        /1721/.test(p.label) &&
        /Variolation/.test(p.label + p.hinweis) &&
        /Newgate/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Jenner/Karte: die Newgate-Phase nennt auch die Waisenkinder',
    karte.phasen.some((p) => /1721/.test(p.label) && /Waisenkinder/.test(p.hinweis)),
  );
  pruefe(
    'Jenner/Karte: eine Phase zeigt die Impfung von 1796 in Berkeley',
    karte.phasen.some(
      (p) =>
        /1796/.test(p.label) &&
        /Berkeley/.test(p.label + p.hinweis) &&
        /James Phipps/.test(p.hinweis) &&
        /Sarah Nelmes/.test(p.hinweis),
    ),
  );
  pruefe(
    'Jenner/Karte: die Kuhpocken-Phase nennt auch Benjamin Jesty 1774',
    karte.phasen.some((p) => /1774/.test(p.label + p.hinweis) && /Jesty/.test(p.hinweis)),
  );
  pruefe(
    'Jenner/Karte: eine Phase zeigt die Impfpflicht von 1853',
    karte.phasen.some(
      (p) => /1853/.test(p.label + p.hinweis) && /Impfpflicht/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Jenner/Karte: eine Phase zeigt den Widerstand und die Gewissensklausel von 1898',
    karte.phasen.some(
      (p) =>
        /1885/.test(p.label + p.hinweis) &&
        /Leicester/.test(p.label + p.hinweis) &&
        /1898/.test(p.hinweis) &&
        /Gewissensgründen|Gewissensklausel/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Jenner/Karte: eine Phase zeigt die Ausrottung von 1980',
    karte.phasen.some(
      (p) =>
        /1980/.test(p.label + p.hinweis) &&
        /(ausgerottet|Ausrottung)/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Jenner/Karte: die Phasen laufen von der Variolation bis zur Ausrottung',
    karte.phasen[0].id === 'variolation-1721' &&
      karte.phasen[karte.phasen.length - 1].id === 'ausrottung-1980',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Jenner/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch|Impfgegner sind)/i.test(
      phasenText,
    ),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['berkeley', -2.457, 51.691],
    ['london', -0.128, 51.508],
    ['yetminster', -2.573, 50.94],
    ['leicester', -1.133, 52.636],
    ['gloucester', -2.244, 51.864],
    ['bristol', -2.594, 51.454],
  ];
  pruefe(
    'Jenner/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Jenner/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Jenner/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Jenner/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Jenner/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Jenner/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die drei Pole des Kapitels: die erste Impfung, der Ort der Gesetze und
  // der Ort des Widerstands.
  const berkeleyPunkt = karte.punkte.find((p) => p.id === 'berkeley');
  pruefe(
    'Jenner/Karte: der Punkt Berkeley nennt Jenner, Phipps, Nelmes und den 14. Mai 1796',
    Boolean(
      berkeleyPunkt &&
        /Jenner/.test(berkeleyPunkt.text) &&
        /James Phipps/.test(berkeleyPunkt.text) &&
        /Sarah Nelmes/.test(berkeleyPunkt.text) &&
        /14. Mai 1796/.test(berkeleyPunkt.text),
    ),
  );
  const londonPunkt = karte.punkte.find((p) => p.id === 'london');
  pruefe(
    'Jenner/Karte: der Punkt London nennt Newgate 1721 und die Impfgesetze',
    Boolean(
      londonPunkt &&
        /Newgate/.test(londonPunkt.text) &&
        /1721/.test(londonPunkt.text) &&
        /1853/.test(londonPunkt.text) &&
        /1898/.test(londonPunkt.text),
    ),
  );
  const leicesterPunkt = karte.punkte.find((p) => p.id === 'leicester');
  pruefe(
    'Jenner/Karte: der Punkt Leicester nennt den Umzug von 1885 und die eigene Methode',
    Boolean(
      leicesterPunkt &&
        /1885/.test(leicesterPunkt.text) &&
        /(Absonderung|sonderte)/.test(leicesterPunkt.text),
    ),
  );
  const yetminsterPunkt = karte.punkte.find((p) => p.id === 'yetminster');
  pruefe(
    'Jenner/Karte: der Punkt Yetminster nennt Benjamin Jesty und 1774',
    Boolean(
      yetminsterPunkt &&
        /Benjamin Jesty/.test(yetminsterPunkt.text) &&
        /1774/.test(yetminsterPunkt.text),
    ),
  );
  // Zwei Punkte, die aufeinanderliegen, kann niemand antippen.
  let engste = Infinity;
  for (let i = 0; i < karte.punkte.length; i += 1) {
    for (let j = i + 1; j < karte.punkte.length; j += 1) {
      const dx = karte.punkte[i].x - karte.punkte[j].x;
      const dy = karte.punkte[i].y - karte.punkte[j].y;
      const abstand = Math.sqrt(dx * dx + dy * dy);
      if (abstand < engste) engste = abstand;
    }
  }
  pruefe(
    `Jenner/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Jenner/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Jenner/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Jenner/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern eine Nachricht und ein
    // Impfstoff, der nur in Menschen reisen konnte.
    pruefe(
      `Jenner/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /Lymphe|Impfstoff|Nachricht|Vakzination|Pockenmaterial/.test(bewegung.text),
    );
  }
  const wegDerNachricht = (karte.bewegungen || []).find(
    (b) => b.id === 'nachricht-aus-konstantinopel',
  );
  pruefe(
    'Jenner/Karte: der Weg der Nachricht aus Konstantinopel endet in London',
    Boolean(wegDerNachricht) &&
      wegDerNachricht.nach[0] === P.punkt(-0.128, 51.508)[0] &&
      wegDerNachricht.nach[1] === P.punkt(-0.128, 51.508)[1] &&
      /Montagu/.test(wegDerNachricht.text),
  );
  const wegDerLymphe = (karte.bewegungen || []).find((b) => b.id === 'lymphe-nach-london');
  pruefe(
    'Jenner/Karte: der Weg der Lymphe beginnt in Berkeley',
    Boolean(wegDerLymphe) &&
      wegDerLymphe.von[0] === P.punkt(-2.457, 51.691)[0] &&
      wegDerLymphe.von[1] === P.punkt(-2.457, 51.691)[1],
  );
  const wegInDieWelt = (karte.bewegungen || []).find(
    (b) => b.id === 'vakzination-in-die-welt',
  );
  pruefe(
    'Jenner/Karte: der Weg in die Welt führt über den Atlantik hinaus (Balmis 1803)',
    Boolean(wegInDieWelt) &&
      wegInDieWelt.nach[0] < wegInDieWelt.von[0] &&
      /Balmis/.test(wegInDieWelt.text) &&
      /1803/.test(wegInDieWelt.text),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'England',
    'Wales',
    'Schottland',
    'Irland',
    'London',
    'Bristol',
    'Ärmelkanal',
    'Nordsee',
    'Irische See',
  ]) {
    pruefe(`Jenner/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Jenner: Titel und Epoche stehen',
    thema.titel === 'Jenner und die Impfung' && thema.epoche === '1796 – heute',
  );
  pruefe('Jenner: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Jenner: der Aufhänger nennt die Kuhmagd und die Streitfrage',
    /Kuhmagd/.test(thema.aufhaenger.frage) &&
      /(Streitfrage|Debatte|Auseinandersetzung)/.test(
        thema.aufhaenger.frage + thema.aufhaenger.text,
      ),
  );
  pruefe(
    'Jenner: der Aufhänger nennt 1796 und die Ausrottung 1980',
    /14. Mai 1796/.test(thema.aufhaenger.text) && /1980/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Jenner: der Aufhänger kündigt beide Seiten an (Triumph UND dunkle Frühgeschichte)',
    /(Triumph|ausgerottet)/.test(thema.aufhaenger.text) &&
      /Gefangenen/.test(thema.aufhaenger.text) &&
      /Waisenkindern/.test(thema.aufhaenger.text) &&
      /Rückgang schon weit gediehen|vor.{0,40}Impfung/i.test(thema.aufhaenger.text),
  );
  pruefe(
    'Jenner: der Aufhänger ist neutral formuliert (keine Vorverurteilung)',
    !/(Impflüge|Giftspritze|Wahnsinn|Verbrecher|Sekte)/i.test(thema.aufhaenger.text),
  );
  pruefe('Jenner: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Jenner: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn|gefährlich)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Jenner: der Hinweis zum Urteil lässt beide Richtungen offen',
    /kein Richtig und kein Falsch/.test(thema.urteil.hinweis) &&
      /Gegenseite/.test(thema.urteil.hinweis),
  );
  pruefe(
    'Jenner: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Jenner/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Jenner/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const impfStimme = thema.perspektiven.find((p) => p.id === 'impfbefuerworter');
  pruefe(
    'Jenner: die Stimme der Impfärzte ist die erste Perspektive',
    thema.perspektiven[0] === impfStimme,
  );
  if (!impfStimme) return;

  pruefe(
    'Jenner: die erste Perspektive ist Opus zugeschrieben',
    impfStimme.stimme === 'Opus',
  );
  pruefe(
    'Jenner: die erste Perspektive heißt nach ihrer Sicht',
    /Impf/.test(impfStimme.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt, hier doppelt
  // =========================================================================

  const zeilenErsteStimme = impfStimme.text.split('\n').length;
  pruefe(
    `Jenner/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'Jenner/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 25000 Zeichen)',
    impfStimme.text.length > 25000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Jenner/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = impfStimme.text.replace(/\s+/g, ' ');

  const ueberschriften = impfStimme.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Jenner: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 10,
  );
  pruefe(
    'Jenner: die Abschnitte bleiben überschaubar (höchstens sechzehn)',
    ueberschriften.length <= 16,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 10 darf
  // keine der neun bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf,
  // Kapitel 4 schreibt Briefe, Kapitel 5 folgt einem Buch von Station zu
  // Station, Kapitel 6 geht als Rundgang durch ein Haus, Kapitel 7
  // verhandelt vor Gericht, Kapitel 8 rechnet, Kapitel 9 liest die Uhr.
  // Dieses Kapitel geht eine KETTE ab: Der Impfstoff hatte kein Fläschchen,
  // er wanderte von Arm zu Arm — die Abschnitte sind ihre Glieder.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'Jenner: die Abschnittsstruktur ist eine andere als in Kapitel 9 (keine Uhr)',
    !/^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/^## Sekunde /.test(h)),
  );
  pruefe(
    'Jenner: die Dramaturgie ist eine Kette (Glieder von Arm zu Arm)',
    /^## Die Kette/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /Glied/.test(h)).length >= 3 &&
      ueberschriften.some((h) => /^## Das letzte Glied/.test(h)) &&
      /von Arm zu Arm, von Kind zu Kind/.test(fliessend),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Jenner: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Die Variolation: die alte Methode mit ECHTEN Pocken.
  pruefe(
    'Jenner/Denkart: die Variolation steht mit echten Menschenpocken da',
    /Variolation/.test(fliessend) && /echten Menschenpocken/.test(fliessend),
  );
  pruefe(
    'Jenner/Denkart: ihre Herkunft wird genannt (nicht europäisch)',
    /China, Indien, Westafrika/.test(fliessend) && /Osmanischen Reich/.test(fliessend),
  );
  pruefe(
    'Jenner/Denkart: die Rechnung der Variolation steht mit Zahlen da',
    /ein bis zwei/.test(fliessend) && /zwanzig bis dreißig/.test(fliessend),
  );
  pruefe(
    'Jenner/Denkart: Lady Mary Wortley Montagu wird genannt',
    /Lady Mary Wortley/.test(fliessend) && /Montagu/.test(fliessend),
  );

  // (b) Die Kuhpocken: die Beobachtung der Bauern.
  pruefe(
    'Jenner/Denkart: die Beobachtung der Bauern steht wörtlich da',
    /Wer die Kuhpocken gehabt hat, bekommt die Menschenpocken nicht/.test(fliessend),
  );
  pruefe(
    'Jenner/Denkart: der entscheidende Schritt war, das Wissen der Melkerinnen ernst zu nehmen',
    /Er hielt das Wissen der Melkerinnen für eine Beobachtung und nicht für Aberglauben/.test(
      fliessend,
    ),
  );

  // (c) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum vorbeugen statt heilen? (weil es nichts zu heilen gab)',
      /Warum vorbeugen statt heilen\?/.test(fliessend) &&
        /Sondern weil es nichts zu heilen gab/.test(fliessend),
    ],
    [
      'Warum einen Gesunden absichtlich krank machen? (der Körper lernt und vergisst nicht)',
      /Warum sollte man einen Gesunden absichtlich krank machen\?/.test(fliessend) &&
        /Der Körper lernt und vergisst nicht/.test(fliessend),
    ],
    [
      'Warum die Kuhpocken? (die harmlose Verwandte erteilt dieselbe Lehre)',
      /Warum die Kuhpocken\?/.test(fliessend) &&
        /erteilt die harmlose dem Körper dieselbe Lehre wie die tödliche/.test(fliessend) &&
        /Der Lehrer muss nicht gefährlich sein/.test(fliessend),
    ],
    [
      'Warum von Arm zu Arm? (der einzige Behälter war ein lebender Mensch)',
      /Warum von Arm zu Arm\?/.test(fliessend) &&
        /Der einzige verlässliche Behälter für den Impfstoff war ein lebender Mensch/.test(
          fliessend,
        ),
    ],
    [
      'Warum der Zwang? (Schutz aller — und die neue Macht des Staates)',
      /Warum der Zwang\?/.test(fliessend) &&
        /Der Schutz des Einzelnen wird erst zum Schutz aller, wenn genug mitmachen/.test(
          fliessend,
        ),
    ],
    [
      'Warum ließ sich ausgerechnet diese Krankheit ausrotten? (sechs Eigenschaften)',
      /Warum ließ sich ausgerechnet diese Krankheit ausrotten/.test(fliessend) &&
        /Es lag an sechs Eigenschaften dieser einen Krankheit/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Jenner/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Jenner/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );

  // =========================================================================
  // 5. Die dunkle Frühgeschichte — von der eigenen Seite benannt
  //    (Betreiber-Vorgabe: prominent, nicht als Randnotiz)
  // =========================================================================

  const unbequemeStellen = [
    [
      'Newgate 1721 (sechs zum Tode Verurteilte)',
      /Newgate/.test(fliessend) &&
        /9. August 1721/.test(fliessend) &&
        /zum Tode verurteilte Häftlinge variolisiert/.test(fliessend),
    ],
    [
      'die Waisenkinder der Gemeinde St James',
      /Waisenkindern der Gemeinde St James/.test(fliessend),
    ],
    [
      'Boston 1721: Onesimus, Boylston und die Versklavten',
      /Onesimus/.test(fliessend) &&
        /Boylston/.test(fliessend) &&
        /versklavten/i.test(fliessend),
    ],
    [
      'James Phipps — nach heutigen Maßstäben kein zulässiger Versuch',
      /James Phipps/.test(fliessend) &&
        /Nach heutigen Maßstäben ist das kein zulässiger Versuch/.test(fliessend),
    ],
    [
      'die Arm-zu-Arm-Syphilis (Rivalta 1861)',
      /Rivalta/.test(fliessend) && /Syphilis/.test(fliessend) && /1861/.test(fliessend),
    ],
    [
      'das Geschäft: Wanderimpfer und Bezahlung pro Kopf',
      /Wanderimpfer/.test(fliessend) && /geimpftem Kopf/.test(fliessend),
    ],
    [
      'der Zwang und seine ungleiche Wirkung',
      /Wer Geld hatte, konnte die Strafe zahlen/.test(fliessend),
    ],
    [
      'die Gewalt in der Schlussphase (Indien 1973–1975)',
      /Greenough/.test(fliessend) && /1973 und 1975/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of unbequemeStellen) {
    pruefe(`Jenner/Frühgeschichte: ${name} steht im Text`, erfuellt);
  }
  pruefe(
    'Jenner/Frühgeschichte: die Stimme benennt mindestens eine unbequeme Stelle selbst',
    unbequemeStellen.filter(([, erfuellt]) => erfuellt).length >= 1,
  );
  // Die Zusatzregel für sensible Themen: nicht der Gegenstimme überlassen.
  pruefe(
    'Jenner/Frühgeschichte: der Menschenversuch wird beim Namen genannt',
    /Das war ein Menschenversuch an Gefangenen und an Kindern ohne Eltern/.test(fliessend),
  );
  pruefe(
    'Jenner/Frühgeschichte: das gute Ergebnis wird nicht als Rechtfertigung genommen',
    /Ein Ergebnis macht einen Versuch nicht nachträglich zulässig/.test(fliessend),
  );
  pruefe(
    'Jenner/Frühgeschichte: die Syphilis wird als eigene Aktenlage eingeräumt',
    /Das ist kein Gerücht der Impfgegner. Das ist unsere eigene Aktenlage/.test(fliessend),
  );
  pruefe(
    'Jenner/Frühgeschichte: das Geld wird nicht kleingeredet',
    /Wo geimpft wird, wird auch verdient/.test(fliessend),
  );
  pruefe(
    'Jenner/Frühgeschichte: die neue Macht des Staates über den Körper wird benannt',
    /entdeckte der Staat eine neue Macht über den Körper seiner Bürger/.test(fliessend),
  );
  // Auch die Fairness in die andere Richtung: Jenner wird nicht nur
  // angeklagt, seine Beweggründe stehen daneben (TONE-Regel).
  pruefe(
    'Jenner/TONE: was für Jenner spricht, steht ebenfalls da',
    /Tempel der Vakzine/.test(fliessend) && /kostenlos/.test(fliessend),
  );
  pruefe(
    'Jenner/TONE: Benjamin Jesty wird als Erster genannt',
    /Benjamin Jesty/.test(fliessend) && /1774/.test(fliessend),
  );

  // =========================================================================
  // 6. Die impfkritische Statistik (Betreiber-Vorgabe: prominent)
  // =========================================================================

  pruefe(
    'Jenner/Statistik: die Kurven fielen vor der Impfung — das steht im Text',
    /fallen, lange bevor es eine Impfung gab/.test(fliessend),
  );
  pruefe(
    'Jenner/Statistik: die Beispiele sind nachprüfbar (Scharlach, Tuberkulose, Masern)',
    /Scharlach/.test(fliessend) &&
      /Tuberkulose/.test(fliessend) &&
      /Masern/.test(fliessend) &&
      /1968/.test(fliessend),
  );
  pruefe(
    'Jenner/Statistik: McKeown wird namentlich genannt',
    /McKeown/.test(fliessend),
  );
  pruefe(
    'Jenner/Statistik: die Kurven werden nicht als Fälschung abgetan',
    /Diese Kurven sind echt/.test(fliessend) &&
      /wer sie zeigt, ist kein Wirrkopf/.test(fliessend),
  );
  pruefe(
    'Jenner/Statistik: die Unterscheidung Sterblichkeit / Häufigkeit wird erklärt',
    /Diese Kurven messen fast immer die Sterblichkeit, nicht die Häufigkeit/.test(
      fliessend,
    ) &&
      /Der Wohlstand hat die Krankheiten weniger tödlich gemacht. Die Impfung hat sie seltener gemacht/.test(
        fliessend,
      ),
  );
  pruefe(
    'Jenner/Statistik: die Frage bleibt für jede Krankheit einzeln offen',
    /Sie ist für jede Krankheit einzeln zu beantworten/.test(fliessend),
  );
  pruefe(
    'Jenner/Statistik: auch die Gegenbeispiele stehen mit Zahlen da (Niederlande, Diphtherie)',
    /Niederlanden/.test(fliessend) &&
      /Kinderlähmung/.test(fliessend) &&
      /Diphtherie/.test(fliessend),
  );
  pruefe(
    'Jenner/Statistik: die Hygiene-Hypothese und die Allergien stehen als offene Frage',
    /Hygiene-Hypothese/.test(fliessend) &&
      /Strachan/.test(fliessend) &&
      /Allergien, Asthma und Autoimmunerkrankungen/.test(fliessend) &&
      /kein Rezept/.test(fliessend),
  );
  pruefe(
    'Jenner/Statistik: die kritische Frage wird ausdrücklich als gute Frage gewürdigt',
    /Wer diese Frage stellt, stellt eine gute Frage/.test(fliessend),
  );

  // =========================================================================
  // 7. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Impfkritik) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Jenner/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1721/.test(perspektivenText) &&
      /1774/.test(perspektivenText) &&
      /1796/.test(perspektivenText) &&
      /1853/.test(perspektivenText) &&
      /1898/.test(perspektivenText) &&
      /1980/.test(perspektivenText),
  );
  pruefe(
    'Jenner/Erzähl-Muster: (a2) die Orte werden genannt',
    /Berkeley/.test(perspektivenText) &&
      /London/.test(perspektivenText) &&
      /Boston/.test(perspektivenText) &&
      /Leicester/.test(perspektivenText),
  );
  pruefe(
    'Jenner/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Der Körper lernt|Denkart|Begründung)/.test(perspektivenText),
  );
  pruefe(
    'Jenner/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /Was Bestand hat/.test(perspektivenText) &&
      /ausgerottet/.test(perspektivenText) &&
      /Kinderlähmung/.test(perspektivenText),
  );
  pruefe(
    'Jenner/Erzähl-Muster: (c2) und die Grenzen',
    /Was uns nicht gelungen ist/.test(perspektivenText) &&
      /Was offen bleibt/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Stimme selbst.
  pruefe(
    'Jenner/Bilanz: das Ende der Pocken steht mit Datum und Namen da',
    /Ali Maow Maalin/.test(fliessend) &&
      /26. Oktober 1977/.test(fliessend) &&
      /8. Mai 1980/.test(fliessend),
  );
  pruefe(
    'Jenner/Bilanz: die Ausrottung wird nicht zum Beweis für alles erklärt',
    /Sie war der Beweis dafür, dass es einmal gepasst hat/.test(fliessend),
  );
  pruefe(
    'Jenner/Bilanz: die Nebenwirkungen werden eingeräumt',
    /Nebenwirkungen sind selten, aber sie sind nicht null/.test(fliessend) &&
      /Gehirnentzündungen/.test(fliessend),
  );
  pruefe(
    'Jenner/Bilanz: die Nutzen-Risiko-Rechnung wird als fortlaufende Aufgabe benannt',
    /war das Risiko der Impfung größer als ihr Nutzen/.test(fliessend),
  );
  pruefe(
    'Jenner/Bilanz: Schätzzahlen werden als Schätzungen gekennzeichnet',
    /eine Schätzung, kein Zählwerk/.test(fliessend),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst, und die
  // andere Seite wird nicht abgewertet.
  pruefe(
    'Jenner/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert sicher|völlig risikolos|immer wirksam)/i.test(fliessend),
  );
  pruefe(
    'Jenner/TONE: die Impfgegner werden nicht pauschal abgewertet',
    !/(rückständig|primitiv|barbarisch|lächerlich|Hokuspokus|Spinner|Schwurbl)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'Jenner/TONE: die eigene Seite wird nicht geschont',
    /Wir haben das zweite lange getan/.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Jenner: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Jenner: die Tür führt zur Impfkritik',
    /Die zweite Stimme dieses Kapitels gehört der Impfkritik/.test(fliessend),
  );
  pruefe(
    'Jenner: die Tür nennt, was die zweite Stimme mitbringt (Kurven, Allergien, Geld)',
    /die Kurven zeigen, die vor der Impfung fielen/.test(fliessend) &&
      /Allergien/.test(fliessend) &&
      /wer die Studien bezahlt/.test(fliessend),
  );
  pruefe(
    'Jenner: die Tür stellt die Frage, die dieses Buch offen lässt',
    /Warum erträgt eine Wissenschaft, die vom Zweifel lebt, ausgerechnet bei dieser Frage den Zweifel so schlecht\?/.test(
      fliessend,
    ) &&
      /Wer eine gute Sache nur mit der halben Wahrheit verteidigt, verteidigt sie schlecht/.test(
        fliessend,
      ),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Jenner/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Jenner/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Jenner/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|gefährlich|Hokuspokus)/i.test(
        frage.frage,
      ),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Jenner/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Jenner/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 11)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Jenner/Synthese: sagt, welche Stimme noch kommt',
      /Impfkritik/.test(thema.synthese) &&
        /(Hygiene|Statistik|Allergien)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Jenner/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Jenner/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Jenner/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
