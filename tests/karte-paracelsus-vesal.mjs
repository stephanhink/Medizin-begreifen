// Prüfungen für Kapitel 7 — „Paracelsus und Vesal" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Vier Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen auf der gezeichneten Küste, Binnenorte
//      innerhalb der Landfläche, offene See außerhalb. Geprüft werden
//      bewusst Orte, die NICHT selbst Stützpunkte der Linien sind — sonst
//      prüfte der Test nur, ob eine Zahl mit sich selbst übereinstimmt.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen das Weltbild (Sal, Sulfur, Merkur), die
//      Signaturenlehre, die Dosis-Maxime und die Empirie vorkommen — und die
//      Begründungslogik muss ausgeführt sein: warum die alten Bücher
//      brannten, warum der Arzt an den Ofen gehört, warum die Natur in
//      Zeichen sprechen sollte. Dazu die ehrlichen Grenzen: die
//      Signaturenlehre als Irrtum, die widersprüchlichen Schriften, das
//      Temperament, das schadende Quecksilber und der Bruch, der mehr
//      einriss als aufbaute.
//
//   3. **Die Längenregel (Betreiber-Feedback 24.08.2026).** Kapitel 1 bis 8
//      bleiben kurz und dicht: höchstens ~250 Zeilen je Perspektive,
//      höchstens ~600 Zeilen für das ganze Kapitel.
//
//   4. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, ehrliche
//      Wirkungsbilanz in beide Richtungen, Quiz-Umfang, offene
//      Urteilsfrage, Lernformat.
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 6: Die zweite
// Perspektive (Vesal, der Anatom aus Padua) und die endgültige Synthese
// kommen erst mit dem Hermes-Pass dazu. Prüfungen, die nur für die erste
// Stimme gelten, hängen deshalb an ihrer id („paracelsus"); die Prüfungen
// zum Erzähl-Muster laufen über ALLE Perspektiven zusammen. Die Synthese
// wird je nach Ausbaustand verzweigt gemessen (siehe unten).
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
} = require('../utils/themen/karten/paracelsus-vesal.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt ist mit 14° Länge der engste des Buches (Kapitel 6: 20°,
 * Kapitel 5: 78°) — entsprechend genau wird gemessen: 0,3° sind hier rund
 * fünfzehn Bildpunkte auf der Karte.
 */
const KUESTEN_TOLERANZ = 0.3;

/** Höchstzahl an Zeilen je Perspektive (Längenregel, Kapitel 1–8). */
const MAX_ZEILEN_PERSPEKTIVE = 250;

/** Höchstzahl an Zeilen für das ganze Kapitel (Längenregel, Kapitel 1–8). */
const MAX_ZEILEN_KAPITEL = 600;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 6: Ein
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
 * Dieser Ausschnitt hat nur eine einzige Landfläche und keine Binnenmeere
 * (Bodensee und Genfersee sind für diesen Maßstab zu klein), deshalb genügt
 * die Frage nach dem großen Ring.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge an der Nordsee genauso
 * „lang" wie an der Adria; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('paracelsus-vesal');
  pruefe('Paracelsus: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Paracelsus und
  // Vesal stehen hinter der Klostermedizin (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Paracelsus: steht in der App hinter „Die Klostermedizin"',
    alleThemen.findIndex((t) => t.id === 'paracelsus-vesal') ===
      alleThemen.findIndex((t) => t.id === 'klostermedizin') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Paracelsus/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Paracelsus/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss die Orte beider Männer zeigen: Brüssel im Nordwesten, Padua im
  // Südosten, dazwischen Basel, Einsiedeln, Villach und Salzburg.
  pruefe(
    'Paracelsus/Karte: der Ausschnitt reicht von Flandern bis Wien',
    RAHMEN.minLon <= 4.4 && RAHMEN.maxLon >= 14,
  );
  pruefe(
    'Paracelsus/Karte: der Ausschnitt reicht von der Adria bis zur Nordsee',
    RAHMEN.minLat <= 45 && RAHMEN.maxLat >= 51,
  );
  pruefe('Paracelsus/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Paracelsus/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Agde (Golfe du Lion)', 3.47, 43.29, kuesten.festland],
    ['Nizza', 7.27, 43.7, kuesten.festland],
    ['Rapallo (Ligurien)', 9.23, 44.35, kuesten.festland],
    ['Pesaro (Adria)', 12.91, 43.91, kuesten.festland],
    ['Cesenatico (Adria)', 12.4, 44.2, kuesten.festland],
    ['Grado (Golf von Venedig)', 13.4, 45.68, kuesten.festland],
    ['Rovinj (Istrien)', 13.63, 45.08, kuesten.festland],
    ['Šibenik (Dalmatien)', 15.9, 43.73, kuesten.festland],
    ['Zeebrügge (Flandern)', 3.2, 51.33, kuesten.festland],
    ['Scheveningen (Holland)', 4.27, 52.1, kuesten.festland],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Paracelsus/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb der Landfläche liegen ------------------
  const binnenorte = [
    ['Einsiedeln', 8.752, 47.127],
    ['Villach', 13.855, 46.615],
    ['Basel', 7.588, 47.56],
    ['Padua', 11.877, 45.407],
    ['Brüssel', 4.352, 50.847],
    ['Salzburg', 13.046, 47.803],
    ['Straßburg', 7.75, 48.583],
    ['Ferrara', 11.62, 44.84],
    ['Nürnberg', 11.08, 49.45],
    ['Zürich', 8.54, 47.37],
    ['München', 11.58, 48.14],
    ['Mailand', 9.19, 45.46],
    ['Bologna', 11.34, 44.49],
    ['Köln', 6.96, 50.94],
    ['Paris', 2.35, 48.85],
    ['Lyon', 4.84, 45.76],
    ['Prag', 14.42, 50.09],
    ['Innsbruck', 11.4, 47.27],
    ['Löwen', 4.7, 50.88],
    ['Chur', 9.53, 46.85],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Paracelsus/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf nicht auf der Landfläche liegen --------------------
  const seepunkte = [
    ['die Nordsee vor Holland', 3.5, 52.2],
    ['die Nordsee vor Flandern', 2.2, 51.2],
    ['die nördliche Adria', 13.5, 44.6],
    ['der Golf von Venedig', 12.8, 45.2],
    ['das Ligurische Meer', 8.8, 43.7],
    ['das Meer vor Nizza', 7.5, 43.6],
    ['die Adria vor Dalmatien', 15.5, 43.6],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Paracelsus/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Paracelsus/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Paracelsus/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /1[45]\d\d/.test(phase.label),
    );
    pruefe(
      `Paracelsus/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Paracelsus/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: Herkunft, Bruch, Ende, Fabrica.
  pruefe(
    'Paracelsus/Karte: eine Phase zeigt Einsiedeln und Villach',
    karte.phasen.some((p) => /Einsiedeln/.test(p.label) && /Villach/.test(p.label)),
  );
  pruefe(
    'Paracelsus/Karte: eine Phase zeigt den Bücherverbrand von 1527 in Basel',
    karte.phasen.some(
      (p) => /1527/.test(p.label) && /Basel/.test(p.label) && /Feuer|verbrand|Bücher/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Paracelsus/Karte: eine Phase zeigt die „Fabrica" von 1543',
    karte.phasen.some((p) => /1543/.test(p.label) && /Fabrica/.test(p.label)),
  );
  pruefe(
    'Paracelsus/Karte: die Phasen laufen von Einsiedeln bis zur Fabrica',
    karte.phasen[0].id === 'einsiedeln' &&
      karte.phasen[karte.phasen.length - 1].id === 'fabrica-1543',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Paracelsus/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan)/i.test(phasenText),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['einsiedeln', 8.752, 47.127],
    ['villach', 13.855, 46.615],
    ['basel', 7.588, 47.56],
    ['salzburg', 13.046, 47.803],
    ['padua', 11.877, 45.407],
    ['bruessel', 4.352, 50.847],
  ];
  pruefe(
    'Paracelsus/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Paracelsus/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Paracelsus/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Paracelsus/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Paracelsus/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Paracelsus/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Basel trägt beide Fäden des Kapitels: das Feuer 1527 und den Druck 1543.
  const baselPunkt = karte.punkte.find((p) => p.id === 'basel');
  pruefe(
    'Paracelsus/Karte: der Punkt Basel nennt 1527 und 1543',
    Boolean(baselPunkt && /1527/.test(baselPunkt.text) && /1543/.test(baselPunkt.text)),
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
    `Paracelsus/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Paracelsus/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Paracelsus/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Paracelsus/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern Menschen und Bücher.
    pruefe(
      `Paracelsus/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /Erfahrung|lernte|Buch|Werk|gedruckt|Druck|schrieb|Fabrica|floh|verließ/.test(bewegung.text),
    );
  }
  // Die Wanderjahre und der Weg der Druckstöcke sind der Bogen des Kapitels.
  const wanderjahre = (karte.bewegungen || []).find((b) => b.id === 'wanderjahre');
  pruefe('Paracelsus/Karte: die Wanderjahre sind eingezeichnet', Boolean(wanderjahre));
  if (wanderjahre) {
    pruefe(
      'Paracelsus/Karte: die Wanderjahre beginnen in Einsiedeln',
      wanderjahre.von[0] === P.punkt(8.752, 47.127)[0] &&
        wanderjahre.von[1] === P.punkt(8.752, 47.127)[1],
    );
    pruefe(
      'Paracelsus/Karte: die Wanderjahre enden in Basel',
      wanderjahre.nach[0] === P.punkt(7.588, 47.56)[0] &&
        wanderjahre.nach[1] === P.punkt(7.588, 47.56)[1],
    );
  }
  const fabricaWeg = (karte.bewegungen || []).find((b) => b.id === 'fabrica-nach-basel');
  pruefe(
    'Paracelsus/Karte: der Weg der „Fabrica" von Padua nach Basel ist eingezeichnet',
    Boolean(fabricaWeg) &&
      fabricaWeg.von[0] === P.punkt(11.877, 45.407)[0] &&
      fabricaWeg.nach[0] === P.punkt(7.588, 47.56)[0],
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Alpen',
    'Rhein',
    'Donau',
    'Mittelmeer',
    'Adria',
    'Nordsee',
    'Venedig',
    'Schweiz',
    'Italien',
  ]) {
    pruefe(`Paracelsus/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Paracelsus: Titel und Epoche stehen',
    thema.titel === 'Paracelsus und Vesal' && thema.epoche === '16. Jahrhundert',
  );
  pruefe('Paracelsus: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Paracelsus: der Aufhänger nennt beide Männer und beide Taten',
    /Paracelsus/.test(thema.aufhaenger.text) &&
      /Vesal/.test(thema.aufhaenger.text) &&
      /(Feuer|verbrannt|wirft)/.test(thema.aufhaenger.text) &&
      /1543/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Paracelsus: der Aufhänger nennt die Autorität, die zerbrach',
    /(Galen|Autorität)/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Paracelsus: der Aufhänger wertet keine der beiden Seiten ab',
    !/(rückständig|lächerlich|Unsinn|dumm|primitiv|finster)/i.test(thema.aufhaenger.text),
  );
  pruefe('Paracelsus: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Paracelsus: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Paracelsus: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Paracelsus/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Paracelsus/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const paracelsus = thema.perspektiven.find((p) => p.id === 'paracelsus');
  pruefe(
    'Paracelsus: die Stimme des Paracelsus ist die erste Perspektive',
    thema.perspektiven[0] === paracelsus,
  );
  if (!paracelsus) return;

  pruefe('Paracelsus: die erste Perspektive ist Opus zugeschrieben', paracelsus.stimme === 'Opus');
  pruefe(
    'Paracelsus: die erste Perspektive heißt nach ihrer Sicht',
    /Paracelsus/.test(paracelsus.name),
  );

  // =========================================================================
  // 3. Die Längenregel (Betreiber-Feedback vom 24.08.2026)
  // =========================================================================

  const zeilenErsteStimme = paracelsus.text.split('\n').length;
  pruefe(
    `Paracelsus/Länge: die erste Perspektive bleibt unter ${MAX_ZEILEN_PERSPEKTIVE} Zeilen (${zeilenErsteStimme})`,
    zeilenErsteStimme <= MAX_ZEILEN_PERSPEKTIVE,
  );
  for (const p of thema.perspektiven) {
    const zeilen = p.text.split('\n').length;
    pruefe(
      `Paracelsus/Länge: Perspektive „${p.id}" bleibt unter ${MAX_ZEILEN_PERSPEKTIVE} Zeilen (${zeilen})`,
      zeilen <= MAX_ZEILEN_PERSPEKTIVE,
    );
  }
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Paracelsus/Länge: das ganze Kapitel bleibt unter ${MAX_ZEILEN_KAPITEL} Zeilen (${zeilenKapitel})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );
  // Kurz heißt nicht dünn: Die Denkart-Analyse muss trotzdem ausgeführt sein.
  pruefe(
    'Paracelsus/Länge: die erste Perspektive ist trotzdem ausgeführt (über 6000 Zeichen)',
    paracelsus.text.length > 6000,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = paracelsus.text.replace(/\s+/g, ' ');

  const ueberschriften = paracelsus.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Paracelsus: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 5,
  );
  // Wenige, starke Abschnitte — die Längenregel verlangt Dichte, nicht Breite.
  pruefe(
    'Paracelsus: die Abschnitte bleiben wenige (höchstens acht)',
    ueberschriften.length <= 8,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 7 darf
  // keine der sechs bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf,
  // Kapitel 4 schreibt Briefe, Kapitel 5 folgt einem Buch von Station zu
  // Station, Kapitel 6 geht als Rundgang durch ein Haus. Dieses Kapitel
  // verhandelt: Anklage, Beweisstücke, Kreuzverhör, ausstehendes Urteil.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Paracelsus: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Paracelsus: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Paracelsus: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every((h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h)),
  );
  pruefe(
    'Paracelsus: die Abschnittsstruktur ist eine andere als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Paracelsus: die Abschnittsstruktur ist eine andere als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Paracelsus: die Abschnittsstruktur ist eine andere als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Paracelsus: die Dramaturgie ist ein Prozess (Anklage, Beweisstücke, Kreuzverhör, Urteil)',
    /^## Die Anklage/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /^## Beweisstück /.test(h)).length >= 3 &&
      ueberschriften.some((h) => /Kreuzverhör/.test(h)) &&
      /Urteil/.test(ueberschriften[ueberschriften.length - 1]),
  );
  // Der Gerichtssaal ist erfunden — und das steht ausdrücklich im Text.
  pruefe(
    'Paracelsus: die erfundene Begegnung ist als Erfindung gekennzeichnet',
    /Diesen Gerichtssaal hat es nie gegeben/.test(fliessend) &&
      /sind einander nie begegnet/.test(fliessend),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Paracelsus: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Das Weltbild: die drei Prinzipien, die an die Stelle der Säfte treten.
  pruefe(
    'Paracelsus/Denkart: die drei Prinzipien Sal, Sulfur und Merkur kommen vor',
    /Sal/.test(fliessend) &&
      /Sulfur/.test(fliessend) &&
      /Merkur/.test(fliessend) &&
      /Salz, Schwefel und Quecksilber/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Denkart: die Abgrenzung zur Säftelehre wird ausgeführt',
    /vier Säften/.test(fliessend) && /Ungleichgewicht/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Denkart: die Signaturenlehre wird erklärt',
    /Signatur/.test(fliessend) &&
      /Schöllkraut/.test(fliessend) &&
      /Lungenkraut/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Denkart: die Dosis-Maxime steht im Wortlaut da',
    /Alle Dinge sind Gift, und nichts ist ohne Gift/.test(fliessend) &&
      /allein die Dosis/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Denkart: die Empirie wird als Gegenprinzip zur Autorität benannt',
    /Die Erfahrung ist der Lehrmeister/.test(fliessend) &&
      /Autorität/.test(fliessend),
  );

  // (b) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum die alten Bücher verbrennen? (aus ihnen wurde ein Gesetz)',
      /Man hat aus ihren Büchern ein Gesetz gemacht/.test(fliessend) &&
        /Johannistag 1527/.test(fliessend) &&
        /Freudenfeuer/.test(fliessend),
    ],
    [
      'Warum bei Badern und Hebammen lernen? (dort lagen die Kranken)',
      /Warum bei denen und nicht an den Fakultäten/.test(fliessend) &&
        /Weil dort die Kranken lagen/.test(fliessend),
    ],
    [
      'Warum drei Prinzipien statt vier Säfte? (der Ofen ist ein Versuch)',
      /Warum diese drei und nicht die vier Säfte/.test(fliessend) &&
        /der Ofen ist ein Versuch/.test(fliessend),
    ],
    [
      'Warum der Ofen und nicht der Kräutergarten? (der Arzt ist ein Chemiker)',
      /Warum dann der Ofen und nicht der Kräutergarten/.test(fliessend) &&
        /Der Arzt ist ein Chemiker/.test(fliessend),
    ],
    [
      'Warum die Zeichen der Natur? (die Schöpfung spricht in Zeichen)',
      /Warum sollte überhaupt irgendein Kraut irgendetwas heilen/.test(fliessend) &&
        /Die Schöpfung spricht in Zeichen/.test(fliessend),
    ],
    [
      'Warum die Dosis messen? (Quecksilber wirkt und tötet)',
      /Warum musste ich das schreiben/.test(fliessend) &&
        /Franzosenkrankheit/.test(fliessend) &&
        /Wie viel davon/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Paracelsus/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Paracelsus/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );
  // Der eigentliche Bruch: die Krankheit als eigenes Ding mit eigener Arznei.
  pruefe(
    'Paracelsus/Denkart: die Krankheit als eigenes Ding mit eigener Arznei',
    /ihre eigene Arznei/.test(fliessend) && /von außen/.test(fliessend),
  );

  // (c) Die Grenzen der eigenen Denkart — von der Stimme selbst benannt.
  pruefe(
    'Paracelsus/Denkart: die Signaturenlehre wird selbst als Irrtum benannt',
    /Und es war falsch/.test(fliessend) &&
      /Die Farbe eines Saftes sagt nichts über seine Wirkung/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Denkart: der Bruch riss mehr ein, als er aufbaute',
    /Ich habe mehr eingerissen als aufgebaut/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Denkart: die widersprüchlichen Schriften werden eingeräumt',
    /Meine Schriften sind ein Dickicht/.test(fliessend) &&
      /(Zauberspruch|Gestirne|Archeus)/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Denkart: das Temperament wird als eigener Schaden benannt',
    /Mein Ton hat mir mehr geschadet als meinen Gegnern/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Denkart: die eigene Autorität an Galens Stelle wird erkannt',
    /an ihre Stelle eine andere gesetzt: mich/.test(fliessend),
  );

  // =========================================================================
  // 5. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (Vesal) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Paracelsus/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1493/.test(perspektivenText) &&
      /Einsiedeln/.test(perspektivenText) &&
      /Villach/.test(perspektivenText) &&
      /1527/.test(perspektivenText) &&
      /1541/.test(perspektivenText),
  );
  pruefe(
    'Paracelsus/Erzähl-Muster: (a2) die Autorität, gegen die es ging, wird genannt',
    /Galen/.test(perspektivenText) && /Avicenna/.test(perspektivenText),
  );
  pruefe(
    'Paracelsus/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Denkart|Prinzipien|Signatur|Erfahrung)/.test(perspektivenText),
  );
  pruefe(
    'Paracelsus/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /(Arzneimittellehre|Arzneimittelkunde|Apotheke)/.test(perspektivenText) &&
      /Bergsucht/.test(perspektivenText) &&
      /Dosis/.test(perspektivenText),
  );
  pruefe(
    'Paracelsus/Erzähl-Muster: (c2) und die Grenzen',
    /(geschadet|getötet|falsch|geirrt|Grenze)/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Stimme selbst.
  pruefe(
    'Paracelsus/Bilanz: die Stimme nennt, was von ihr Bestand hatte',
    /der Bestand hatte/.test(fliessend) &&
      /Wer heute einen Wirkstoff aus einer Pflanze/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Bilanz: die Berufskrankheit der Bergleute wird als Verdienst benannt',
    /erste Schrift über eine Berufskrankheit/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Bilanz: auch die Schäden werden genannt (Quecksilber, Antimon)',
    /Quecksilber tötet auch in kleinen Gaben/.test(fliessend) &&
      /Antimon/.test(fliessend),
  );
  pruefe(
    'Paracelsus/Bilanz: das Scheitern des eigenen Lebens wird nicht beschönigt',
    /ohne Amt/.test(fliessend) && /keine Schule/.test(fliessend),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst, und die
  // Gegenseite wird nicht abgewertet.
  pruefe(
    'Paracelsus/TONE: die Stimme räumt ein, dass Verbrennen kein Widerlegen ist',
    /Man verbrennt keine Irrtümer, man widerlegt sie/.test(fliessend),
  );
  pruefe(
    'Paracelsus/TONE: die Stimme erkennt an, dass der Leise die Autorität stürzte',
    /Sie zerbrach daran, dass jemand nachsah/.test(fliessend),
  );
  pruefe(
    'Paracelsus/TONE: die Beweggründe der Gegenseite werden nicht verzerrt',
    /Irren ist kein Verbrechen/.test(fliessend),
  );
  // Kein Missionieren: Die Stimme spricht keine Heilversprechen aus.
  pruefe(
    'Paracelsus/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert|Wundermittel für|immer wirksam)/i.test(fliessend),
  );
  pruefe(
    'Paracelsus/TONE: die erste Perspektive wertet die Universitätsmedizin nicht pauschal ab',
    !/(rückständig|primitiv|barbarisch|dumm|verlogen)/i.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Paracelsus: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Paracelsus: die Tür führt zu Vesal in Padua (Sektion, Fabrica 1543)',
    /Andreas Vesal/.test(fliessend) &&
      /Padua/.test(fliessend) &&
      /De humani corporis fabrica/.test(fliessend) &&
      /1543/.test(fliessend),
  );
  pruefe(
    'Paracelsus: die Tür benennt den Unterschied der beiden Brüche',
    /sah nach/.test(fliessend) && /Er hielt keine Rede gegen Galen/.test(fliessend),
  );
  pruefe(
    'Paracelsus: die einzige echte Verbindung (Oporinus) wird genannt',
    /Oporinus/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Paracelsus/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Paracelsus/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Paracelsus/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus|finster)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Paracelsus/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes Vesal ergänzt hat, wird sie an ihrer
  // eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Paracelsus/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 8)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Paracelsus/Synthese: sagt, welche Stimme noch kommt',
      /Vesal/.test(thema.synthese) && /(Anatom|Padua|Sektion)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Paracelsus/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Paracelsus/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Paracelsus/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
