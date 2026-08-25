// Prüfungen für Kapitel 8 — „Harvey und der Blutkreislauf" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Vier Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen auf der gezeichneten Küste, Binnenorte
//      innerhalb der Landflächen, offene See außerhalb. Geprüft werden
//      bewusst Orte, die NICHT selbst Stützpunkte der Linien sind — sonst
//      prüfte der Test nur, ob eine Zahl mit sich selbst übereinstimmt.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen die Rechnung und ihre Größen vorkommen (was
//      ein Schlag auswirft, wie oft das Herz schlägt, wie viel dabei
//      herauskommt), der Kreislauf als einzige übrigbleibende Erklärung —
//      und die Begründungslogik muss ausgeführt sein: warum gerechnet
//      wurde, warum am Lebenden nachgesehen wurde, warum das Herz eine
//      Pumpe sein muss. Dazu die ehrlichen Grenzen: die Kapillaren, die er
//      nicht zeigen konnte, die Lunge, die er falsch verstand, und die
//      Einsicht, die zunächst keinem Kranken half.
//
//   3. **Die Längenregel (Betreiber-Feedback 24.08.2026).** Kapitel 1 bis 8
//      bleiben kurz und dicht: höchstens ~250 Zeilen je Perspektive,
//      höchstens ~600 Zeilen für das ganze Kapitel. Dies ist das letzte
//      Kapitel, für das die Regel gilt.
//
//   4. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, ehrliche
//      Wirkungsbilanz in beide Richtungen, Quiz-Umfang, offene
//      Urteilsfrage, Lernformat.
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 7: Die zweite
// Perspektive (die Tradition — die galenische Lehre, die widersprach) und
// die endgültige Synthese kommen erst mit dem Hermes-Pass dazu. Prüfungen,
// die nur für die erste Stimme gelten, hängen deshalb an ihrer id
// („harvey"); die Prüfungen zum Erzähl-Muster laufen über ALLE Perspektiven
// zusammen. Die Synthese wird je nach Ausbaustand verzweigt gemessen.
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
} = require('../utils/themen/karten/harvey.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt umfasst 20° Länge (Kapitel 7: 14°, Kapitel 6: 20°) —
 * 0,4° sind hier rund vierzehn Bildpunkte auf der Karte.
 */
const KUESTEN_TOLERANZ = 0.4;

/** Höchstzahl an Zeilen je Perspektive (Längenregel, Kapitel 1–8). */
const MAX_ZEILEN_PERSPEKTIVE = 250;

/** Höchstzahl an Zeilen für das ganze Kapitel (Längenregel, Kapitel 1–8). */
const MAX_ZEILEN_KAPITEL = 600;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 7: Ein
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
 * Dieser Ausschnitt hat vier Landflächen: das Festland, Großbritannien,
 * Korsika und Sardinien. Binnenmeere gibt es keine.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge an der Nordsee genauso
 * „lang" wie am Mittelmeer; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('harvey');
  pruefe('Harvey: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Harvey steht
  // hinter Paracelsus und Vesal (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Harvey: steht in der App hinter „Paracelsus und Vesal"',
    alleThemen.findIndex((t) => t.id === 'harvey') ===
      alleThemen.findIndex((t) => t.id === 'paracelsus-vesal') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Harvey/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe('Harvey/Karte: die Karte des Moduls ist die aus karten/', thema.karte === karte);

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss London und Padua auf dasselbe Blatt bringen, dazwischen
  // Cambridge, Paris, Frankfurt und Bologna.
  pruefe(
    'Harvey/Karte: der Ausschnitt reicht von Britannien bis an die Adria',
    RAHMEN.minLon <= -5 && RAHMEN.maxLon >= 12,
  );
  pruefe(
    'Harvey/Karte: der Ausschnitt reicht von Mittelitalien bis zur Nordsee',
    RAHMEN.minLat <= 42 && RAHMEN.maxLat >= 53,
  );
  pruefe('Harvey/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Harvey/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Brighton (Ärmelkanal)', -0.14, 50.82, kuesten.grossbritannien],
    ['Portsmouth', -1.09, 50.79, kuesten.grossbritannien],
    ['Falmouth (Cornwall)', -5.07, 50.15, kuesten.grossbritannien],
    ['Grimsby (Humber)', -0.08, 53.57, kuesten.grossbritannien],
    ['Liverpool (Irische See)', -3.0, 53.41, kuesten.grossbritannien],
    ['Swansea (Wales)', -3.94, 51.62, kuesten.grossbritannien],
    ['Honfleur (Seinemündung)', 0.23, 49.42, kuesten.festland],
    ['Dünkirchen (Flandern)', 2.2, 51.03, kuesten.festland],
    ['Brest (Bretagne)', -4.49, 48.39, kuesten.festland],
    ['San Sebastián (Biskaya)', -1.98, 43.32, kuesten.festland],
    ['Cuxhaven (Deutsche Bucht)', 8.7, 53.87, kuesten.festland],
    ['Livorno (Toskana)', 10.3, 43.55, kuesten.festland],
    ['Rovinj (Istrien)', 13.63, 45.08, kuesten.festland],
    ['Marseille', 5.36, 43.3, kuesten.festland],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Harvey/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb einer Landfläche liegen ----------------
  const binnenorte = [
    ['London', -0.1, 51.517],
    ['Cambridge', 0.119, 52.205],
    ['Folkestone (Harveys Geburtsort)', 1.176, 51.081],
    ['Oxford', -1.26, 51.75],
    ['Bristol', -2.59, 51.45],
    ['York', -1.08, 53.96],
    ['Padua', 11.877, 45.407],
    ['Bologna', 11.343, 44.494],
    ['Frankfurt am Main', 8.682, 50.111],
    ['Paris', 2.352, 48.857],
    ['Brüssel', 4.352, 50.847],
    ['Leiden', 4.49, 52.16],
    ['Basel', 7.588, 47.56],
    ['Chur', 9.53, 46.85],
    ['Nürnberg', 11.08, 49.45],
    ['Venedig', 12.2, 45.5],
    ['Rom', 12.5, 41.9],
    ['Mailand', 9.19, 45.46],
    ['Lyon', 4.84, 45.76],
    ['Bordeaux', -0.58, 44.84],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Harvey/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['der Ärmelkanal', 0.5, 50.3],
    ['der westliche Ärmelkanal', -2.5, 49.8],
    ['die Nordsee vor der Themsemündung', 2.0, 52.5],
    ['die Deutsche Bucht', 7.5, 54.2],
    ['die Irische See', -5.2, 53.5],
    ['der Golf von Biskaya', -4.0, 45.5],
    ['das Ligurische Meer', 8.8, 43.6],
    ['die nördliche Adria', 12.9, 44.5],
    ['der Golf von Venedig', 12.8, 45.2],
    ['das Tyrrhenische Meer', 11.5, 41.5],
    ['der Bristolkanal', -4.0, 51.4],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Harvey/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Harvey/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Harvey/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /1[56]\d\d/.test(phase.label),
    );
    pruefe(
      `Harvey/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Harvey/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: Studium, Vorlesung, Druck,
  // Widerspruch und Vollendung.
  pruefe(
    'Harvey/Karte: eine Phase zeigt das Studium in Padua bei Fabricius',
    karte.phasen.some(
      (p) => /Padua/.test(p.label) && /Fabricius/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Harvey/Karte: eine Phase zeigt die Lumleian Lectures von 1616 in London',
    karte.phasen.some(
      (p) => /1616/.test(p.label) && /London/.test(p.label) && /Lumleian/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Harvey/Karte: eine Phase zeigt den Druck von 1628 in Frankfurt',
    karte.phasen.some(
      (p) =>
        /1628/.test(p.label) &&
        /Frankfurt/.test(p.label) &&
        /motu cordis/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Harvey/Karte: eine Phase zeigt die Kapillaren von 1661',
    karte.phasen.some(
      (p) => /1661/.test(p.label) && /Kapillar/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Harvey/Karte: die Phasen laufen von Padua bis Bologna',
    karte.phasen[0].id === 'padua-1600' &&
      karte.phasen[karte.phasen.length - 1].id === 'paris-bologna',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Harvey/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan)/i.test(phasenText),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['london', -0.1, 51.517],
    ['cambridge', 0.119, 52.205],
    ['padua', 11.877, 45.407],
    ['frankfurt', 8.682, 50.111],
    ['paris', 2.352, 48.857],
    ['bologna', 11.343, 44.494],
  ];
  pruefe(
    'Harvey/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Harvey/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Harvey/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Harvey/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Harvey/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Harvey/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die beiden Pole des Kapitels: wo gelehrt und wo gedruckt wurde.
  const londonPunkt = karte.punkte.find((p) => p.id === 'london');
  pruefe(
    'Harvey/Karte: der Punkt London nennt 1616 und das Hospital',
    Boolean(
      londonPunkt &&
        /1616/.test(londonPunkt.text) &&
        /(Bartholomäus|Hospital)/.test(londonPunkt.text),
    ),
  );
  const bolognaPunkt = karte.punkte.find((p) => p.id === 'bologna');
  pruefe(
    'Harvey/Karte: der Punkt Bologna nennt Malpighi und die Kapillaren 1661',
    Boolean(
      bolognaPunkt &&
        /Malpighi/.test(bolognaPunkt.text) &&
        /Kapillar/.test(bolognaPunkt.text) &&
        /1661/.test(bolognaPunkt.text),
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
    `Harvey/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Harvey/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Harvey/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Harvey/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern ein Student, eine
    // Gewohnheit und ein Manuskript.
    pruefe(
      `Harvey/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /lernte|studier|sezierte|rechnete|Buch|druckte|Messe|Klappen/.test(bewegung.text),
    );
  }
  // Der Weg nach Padua und der Weg des Manuskripts sind der Bogen des Kapitels.
  const nachPadua = (karte.bewegungen || []).find((b) => b.id === 'nach-padua');
  pruefe('Harvey/Karte: der Weg nach Padua ist eingezeichnet', Boolean(nachPadua));
  if (nachPadua) {
    pruefe(
      'Harvey/Karte: der Weg nach Padua beginnt in Cambridge',
      nachPadua.von[0] === P.punkt(0.119, 52.205)[0] &&
        nachPadua.von[1] === P.punkt(0.119, 52.205)[1],
    );
    pruefe(
      'Harvey/Karte: der Weg nach Padua endet in Padua',
      nachPadua.nach[0] === P.punkt(11.877, 45.407)[0] &&
        nachPadua.nach[1] === P.punkt(11.877, 45.407)[1],
    );
  }
  const buchWeg = (karte.bewegungen || []).find((b) => b.id === 'buch-nach-frankfurt');
  pruefe(
    'Harvey/Karte: der Weg des Manuskripts von London nach Frankfurt ist eingezeichnet',
    Boolean(buchWeg) &&
      buchWeg.von[0] === P.punkt(-0.1, 51.517)[0] &&
      buchWeg.nach[0] === P.punkt(8.682, 50.111)[0],
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'England',
    'Frankreich',
    'Italien',
    'Alpen',
    'Ärmelkanal',
    'Mittelmeer',
    'Nordsee',
    'Themse',
    'Rhein',
  ]) {
    pruefe(`Harvey/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Harvey: Titel und Epoche stehen',
    thema.titel === 'Harvey und der Blutkreislauf' && thema.epoche === '1578–1657',
  );
  pruefe('Harvey: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Harvey: der Aufhänger stellt die alte Lehre und die Rechnung gegenüber',
    /Leber/.test(thema.aufhaenger.text) &&
      /(hunderttausend|Schlag)/.test(thema.aufhaenger.text) &&
      /(kreist|Kreis)/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Harvey: der Aufhänger nennt Harvey, 1628 und die offene Stelle',
    /Harvey/.test(thema.aufhaenger.text) &&
      /1628/.test(thema.aufhaenger.text) &&
      /nie zeigen/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Harvey: der Aufhänger wertet die alte Lehre nicht ab',
    !/(rückständig|lächerlich|Unsinn|dumm|primitiv|finster)/i.test(thema.aufhaenger.text),
  );
  pruefe('Harvey: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Harvey: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Harvey: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Harvey/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Harvey/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const harveyStimme = thema.perspektiven.find((p) => p.id === 'harvey');
  pruefe(
    'Harvey: die Stimme des Harvey ist die erste Perspektive',
    thema.perspektiven[0] === harveyStimme,
  );
  if (!harveyStimme) return;

  pruefe('Harvey: die erste Perspektive ist Opus zugeschrieben', harveyStimme.stimme === 'Opus');
  pruefe(
    'Harvey: die erste Perspektive heißt nach ihrer Sicht',
    /Harvey/.test(harveyStimme.name),
  );

  // =========================================================================
  // 3. Die Längenregel (Betreiber-Feedback vom 24.08.2026)
  // =========================================================================

  const zeilenErsteStimme = harveyStimme.text.split('\n').length;
  pruefe(
    `Harvey/Länge: die erste Perspektive bleibt unter ${MAX_ZEILEN_PERSPEKTIVE} Zeilen (${zeilenErsteStimme})`,
    zeilenErsteStimme <= MAX_ZEILEN_PERSPEKTIVE,
  );
  for (const p of thema.perspektiven) {
    const zeilen = p.text.split('\n').length;
    pruefe(
      `Harvey/Länge: Perspektive „${p.id}" bleibt unter ${MAX_ZEILEN_PERSPEKTIVE} Zeilen (${zeilen})`,
      zeilen <= MAX_ZEILEN_PERSPEKTIVE,
    );
  }
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Harvey/Länge: das ganze Kapitel bleibt unter ${MAX_ZEILEN_KAPITEL} Zeilen (${zeilenKapitel})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );
  // Kurz heißt nicht dünn: Die Denkart-Analyse muss trotzdem ausgeführt sein.
  pruefe(
    'Harvey/Länge: die erste Perspektive ist trotzdem ausgeführt (über 6000 Zeichen)',
    harveyStimme.text.length > 6000,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = harveyStimme.text.replace(/\s+/g, ' ');

  const ueberschriften = harveyStimme.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Harvey: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 5,
  );
  // Wenige, starke Abschnitte — die Längenregel verlangt Dichte, nicht Breite.
  pruefe(
    'Harvey: die Abschnitte bleiben wenige (höchstens acht)',
    ueberschriften.length <= 8,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 8 darf
  // keine der sieben bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf,
  // Kapitel 4 schreibt Briefe, Kapitel 5 folgt einem Buch von Station zu
  // Station, Kapitel 6 geht als Rundgang durch ein Haus, Kapitel 7
  // verhandelt vor Gericht. Dieses Kapitel rechnet: Aufgabe, Größen, Summe,
  // Probe, Gegenrechnung.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Harvey: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Harvey: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Harvey: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every((h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h)),
  );
  pruefe(
    'Harvey: die Abschnittsstruktur ist eine andere als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Harvey: die Abschnittsstruktur ist eine andere als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Harvey: die Abschnittsstruktur ist eine andere als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Harvey: die Abschnittsstruktur ist eine andere als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Harvey: die Dramaturgie ist eine Rechnung (Aufgabe, Größen, Summe, Probe, Gegenrechnung)',
    /^## Die Aufgabe/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /^## Die (erste|zweite) Größe/.test(h)).length >= 2 &&
      ueberschriften.some((h) => /^## Die Summe/.test(h)) &&
      ueberschriften.some((h) => /^## Die Probe/.test(h)) &&
      ueberschriften.some((h) => /^## Die Gegenrechnung/.test(h)),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Harvey: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Das Weltbild, das umgeworfen wird — fair wiedergegeben.
  pruefe(
    'Harvey/Denkart: die alte Lehre wird erklärt (Leber, Verbrauch, Poren)',
    /Galen/.test(fliessend) &&
      /In der Leber Blut/i.test(fliessend) &&
      /aufgebraucht/.test(fliessend) &&
      /Poren in der Scheidewand/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die alte Lehre wird nicht verächtlich gemacht',
    /Diese Lehre war nicht dumm/.test(fliessend) &&
      /Sie hatte auf jede Frage eine Antwort/.test(fliessend),
  );

  // (b) Die neue Denkart: die Messung. Beide Größen und die Summe.
  pruefe(
    'Harvey/Denkart: die neue Frage ist eine Mengenfrage',
    /Ich habe gefragt: wie viel/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die erste Größe steht da (was ein Schlag auswirft)',
    /siebzig Milliliter/.test(fliessend) && /linke Herzkammer/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die zweite Größe steht da (wie oft das Herz schlägt)',
    /hunderttausend/.test(fliessend) && /siebzig Schläge in der Minute/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die Summe steht da (hunderte Liter in der Stunde)',
    /zweihundertfünfzig bis dreihundert Liter/.test(fliessend) &&
      /fünf bis sechs Liter/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die Schlussfolgerung ist der Kreislauf',
    /Es ist immer dasselbe Blut/.test(fliessend) && /läuft im Kreis/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die Methode wird als redlich offengelegt (bewusst zu niedrig gerechnet)',
    /Wer etwas beweisen will, nimmt die Zahl, die der Gegenseite am liebsten ist/.test(fliessend),
  );

  // (c) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum rechnen und nicht streiten? (eine Zahl lässt sich nicht überreden)',
      /Warum rechnen und nicht streiten/.test(fliessend) &&
        /Weil eine Zahl sich nicht überreden lässt/.test(fliessend),
    ],
    [
      'Warum am Lebenden nachsehen? (der tote Leib zeigt die Bewegung nicht)',
      /Warum am Lebenden nachsehen und nicht am Toten/.test(fliessend) &&
        /ein toter Leib das Wichtigste nicht zeigt: die Bewegung/.test(fliessend),
    ],
    [
      'Warum das Herz als Pumpe? (Klappen, Richtung, Druck)',
      /Warum dann das Herz als Pumpe/.test(fliessend) &&
        /Klappen, die nur in eine Richtung öffnen/.test(fliessend),
    ],
    [
      'Warum der Widerstand? (ein Lehrgebäude, das alles erklärte)',
      /Warum haben sie sich so lange gewehrt/.test(fliessend) &&
        /Nicht aus Dummheit/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Harvey/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Harvey/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );
  // Das Herz als Muskel, der presst — der Bruch mit dem saugenden Herzen.
  pruefe(
    'Harvey/Denkart: die Tat des Herzens ist das Zusammenziehen',
    /Die Tat ist das/.test(fliessend) &&
      /Zusammenziehen/.test(fliessend) &&
      /sauge/.test(fliessend),
  );
  // Die Probe am Arm — die Demonstration, die jeder wiederholen kann.
  pruefe(
    'Harvey/Denkart: die Probe am abgebundenen Arm wird erklärt',
    /Binde einen Arm ab/.test(fliessend) &&
      /Klappen/.test(fliessend) &&
      /nur in eine Richtung — zum Herzen hin/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die Venenklappen kommen von Fabricius aus Padua',
    /Fabricius/.test(fliessend) &&
      /Padua/.test(fliessend) &&
      /Er hat sie gesehen; ich habe sie gelesen/.test(fliessend),
  );

  // (d) Die Grenzen der eigenen Denkart — von der Stimme selbst benannt.
  pruefe(
    'Harvey/Denkart: die fehlenden Kapillaren werden selbst eingeräumt',
    /Wie das Blut von den Schlagadern in die Adern kommt, konnte ich nicht zeigen/.test(fliessend) &&
      /Kapillaren/.test(fliessend) &&
      /Malpighi/.test(fliessend) &&
      /1661/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: der eigene Irrtum über die Lunge wird benannt',
    /die Lunge kühle das erhitzte Blut/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die Folgenlosigkeit für die Kranken wird eingeräumt',
    /Mein Kreislauf hat keinen einzigen Kranken geheilt/.test(fliessend) &&
      /zweihundert Jahre/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: die Vivisektionen werden selbst benannt, nicht verschwiegen',
    /Ich habe Tiere bei lebendigem Leibe geöffnet/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: der eigene Rückzug wird nicht beschönigt',
    /Ich habe nicht gekämpft/.test(fliessend),
  );
  pruefe(
    'Harvey/Denkart: das Herz als Maschine wird als spätere Deutung gekennzeichnet',
    /Diesen Vergleich haben erst meine Nachfolger daraus gemacht/.test(fliessend) &&
      /Fürsten des Leibes/.test(fliessend),
  );

  // =========================================================================
  // 5. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Tradition) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Harvey/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1578/.test(perspektivenText) &&
      /1599/.test(perspektivenText) &&
      /1616/.test(perspektivenText) &&
      /1628/.test(perspektivenText) &&
      /1661/.test(perspektivenText),
  );
  pruefe(
    'Harvey/Erzähl-Muster: (a2) die Orte des Weges werden genannt',
    /Padua/.test(perspektivenText) &&
      /London/.test(perspektivenText) &&
      /Frankfurt/.test(perspektivenText),
  );
  pruefe(
    'Harvey/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Galen|Lebensgeist|Poren|Denkart)/.test(perspektivenText),
  );
  pruefe(
    'Harvey/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /(Kreis|kreis)/.test(perspektivenText) &&
      /Klappen/.test(perspektivenText) &&
      /(Rechnung|gerechnet)/.test(perspektivenText),
  );
  pruefe(
    'Harvey/Erzähl-Muster: (c2) und die Grenzen',
    /(nicht zeigen|geirrt|Irrtum|Grenze|nicht gekämpft|wusste ich nicht)/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Stimme selbst.
  pruefe(
    'Harvey/Bilanz: die Stimme nennt, was ihre Rechnung leistet',
    /Es bleibt nur eine Erklärung/.test(fliessend),
  );
  pruefe(
    'Harvey/Bilanz: die Stimme nennt, was sie gekostet hat',
    /verlor ich einen Teil meiner Kranken/.test(fliessend),
  );
  pruefe(
    'Harvey/Bilanz: die späteren Schäden werden nicht verschwiegen',
    /Menschen starben daran/.test(fliessend) && /verboten/.test(fliessend),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst, und die
  // Gegenseite wird nicht abgewertet.
  pruefe(
    'Harvey/TONE: die Beweggründe der Gegenseite werden fair wiedergegeben',
    /An ihrer Stelle wäre ich auch vorsichtig gewesen/.test(fliessend),
  );
  pruefe(
    'Harvey/TONE: die Stimme erkennt an, dass die alte Lehre brauchbar war',
    /Sie war falsch und trotzdem brauchbar/.test(fliessend),
  );
  // Kein Missionieren: Die Stimme spricht keine Heilversprechen aus.
  pruefe(
    'Harvey/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert|Wundermittel für|immer wirksam)/i.test(fliessend),
  );
  pruefe(
    'Harvey/TONE: die erste Perspektive wertet die alte Schule nicht pauschal ab',
    !/(rückständig|primitiv|barbarisch|lächerlich|verlogen|Hokuspokus)/i.test(fliessend),
  );
  // Wo das Wort „dumm" fällt, wird es ausdrücklich verneint.
  pruefe(
    'Harvey/TONE: der Vorwurf der Dummheit wird ausdrücklich zurückgewiesen',
    /Diese Lehre war nicht dumm/.test(fliessend) && /Nicht aus Dummheit/.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Harvey: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Harvey: die Tür führt zur Tradition (die galenische Lehre, die widersprach)',
    /Tradition/.test(fliessend) && /galenischen Lehre/.test(fliessend),
  );
  pruefe(
    'Harvey: die Tür stellt die Frage, die die zweite Stimme beantworten soll',
    /Warum hält sich eine falsche Lehre so lange/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Harvey/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Harvey/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Harvey/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus|finster)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Harvey/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die Tradition ergänzt hat, wird sie an ihrer
  // eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Harvey/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 9)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Harvey/Synthese: sagt, welche Stimme noch kommt',
      /Tradition/.test(thema.synthese) && /(galenisch|Galen|widersprach)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Harvey/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Harvey/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Harvey/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
