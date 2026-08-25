// Prüfungen für Kapitel 6 — „Die Klostermedizin" und seine Karte.
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
//      der ersten Stimme müssen der Klostergarten, das Skriptorium und die
//      Begründungslogik vorkommen — warum überhaupt geheilt wurde (caritas,
//      die Regel Benedikts), warum der Garten die Apotheke war (die
//      Schöpfung als Apotheke Gottes), warum abgeschrieben wurde und warum
//      Gebet und Pflanze zusammengehörten. Dazu die ehrlichen Grenzen: der
//      Glaube, der die Diagnose ersetzte, die Krankheit als Strafe oder
//      Prüfung und die Autorität der Kirche über dem Zweifel.
//
//   3. **Die Längenregel (Betreiber-Feedback 24.08.2026).** Kapitel 1 bis 8
//      bleiben kurz und dicht: höchstens ~250 Zeilen je Perspektive,
//      höchstens ~600 Zeilen für das ganze Kapitel. Gemessen wird die
//      Zeilenzahl der Texte — sie ist im Repo das, was der Betreiber sieht.
//
//   4. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, ehrliche
//      Wirkungsbilanz in beide Richtungen, Quiz-Umfang, offene
//      Urteilsfrage, Lernformat.
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 5: Die zweite
// Perspektive (der Marktplatz — Bader, Wundärzte, Hebammen, Kräuterfrauen)
// und die endgültige Synthese kommen erst mit dem Hermes-Pass dazu.
// Prüfungen, die nur für die erste Stimme gelten, hängen deshalb an ihrer id
// („kloster"); die Prüfungen zum Erzähl-Muster laufen über ALLE
// Perspektiven zusammen. Die Synthese wird je nach Ausbaustand verzweigt
// gemessen (siehe unten).
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
} = require('../utils/themen/karten/klostermedizin.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt ist mit 20° Länge der engste des Buches (Kapitel 4:
 * 28°, Kapitel 5: 78°) — entsprechend genauer wird gemessen: 0,3° sind hier
 * rund elf Bildpunkte auf der Karte.
 */
const KUESTEN_TOLERANZ = 0.3;

/** Höchstzahl an Zeilen je Perspektive (Längenregel, Kapitel 1–8). */
const MAX_ZEILEN_PERSPEKTIVE = 250;

/** Höchstzahl an Zeilen für das ganze Kapitel (Längenregel, Kapitel 1–8). */
const MAX_ZEILEN_KAPITEL = 600;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 5: Ein
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
 * Diese Karte hat keine Binnenmeere über der Landmasse (der Bodensee ist zu
 * klein für diesen Maßstab), deshalb genügt die Frage nach den Landflächen.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge an der Nordsee genauso
 * „lang" wie in Kalabrien; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('klostermedizin');
  pruefe('Kloster: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: die
  // Klostermedizin steht hinter Avicenna (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Kloster: steht in der App hinter „Avicenna und die arabische Medizin"',
    alleThemen.findIndex((t) => t.id === 'klostermedizin') ===
      alleThemen.findIndex((t) => t.id === 'avicenna-arabische-medizin') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Kloster/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Kloster/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss die Kette der Klöster zeigen: Montecassino und Salerno im Süden,
  // Fulda und die Nordsee im Norden, Cluny im Westen.
  pruefe(
    'Kloster/Karte: der Ausschnitt reicht von Burgund bis über die Alpen hinaus',
    RAHMEN.minLon <= 4 && RAHMEN.maxLon >= 16,
  );
  pruefe(
    'Kloster/Karte: der Ausschnitt reicht von Salerno bis an die Nordsee',
    RAHMEN.minLat <= 40 && RAHMEN.maxLat >= 53,
  );
  pruefe('Kloster/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Kloster/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Barcelona', 2.17, 41.38, kuesten.festland],
    ['Agde (Golfe du Lion)', 3.47, 43.29, kuesten.festland],
    ['La Ciotat', 5.61, 43.17, kuesten.festland],
    ['Rapallo (Ligurien)', 9.23, 44.35, kuesten.festland],
    ['Terracina (Latium)', 13.24, 41.28, kuesten.festland],
    ['Cesenatico (Adria)', 12.4, 44.2, kuesten.festland],
    ['Trani (Apulien)', 16.42, 41.28, kuesten.festland],
    ['Grado (Golf von Venedig)', 13.4, 45.68, kuesten.festland],
    ['Šibenik (Dalmatien)', 15.9, 43.73, kuesten.festland],
    ['Ulcinj (Montenegro)', 19.2, 41.93, kuesten.festland],
    ['Zeebrügge (Flandern)', 3.2, 51.33, kuesten.festland],
    ['Le Tréport (Normandie)', 1.37, 50.06, kuesten.festland],
    ['Scheveningen (Holland)', 4.27, 52.1, kuesten.festland],
    ['Cuxhaven (Elbmündung)', 8.7, 53.87, kuesten.festland],
    ['Great Yarmouth (England)', 1.73, 52.6, kuesten.england],
    ['Palma (Mallorca)', 2.65, 39.57, kuesten.mallorca],
    ['Maó (Menorca)', 4.27, 39.89, kuesten.menorca],
    ['Ibiza-Stadt', 1.43, 38.91, kuesten.ibiza],
    ['Bastia (Korsika)', 9.45, 42.7, kuesten.korsika],
    ['Cagliari (Sardinien)', 9.11, 39.22, kuesten.sardinien],
    ['Milazzo (Sizilien)', 15.24, 38.22, kuesten.sizilien],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Kloster/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb der Landflächen liegen -----------------
  const binnenorte = [
    ['Rom', 12.5, 41.9],
    ['Montecassino', 13.81, 41.49],
    ['Salerno', 14.768, 40.682],
    ['Florenz', 11.25, 43.77],
    ['Mailand', 9.19, 45.46],
    ['Zürich', 8.54, 47.37],
    ['St. Gallen', 9.377, 47.425],
    ['Reichenau', 9.062, 47.698],
    ['München', 11.58, 48.14],
    ['Wien', 16.37, 48.21],
    ['Prag', 14.42, 50.09],
    ['Fulda', 9.681, 50.556],
    ['Bingen am Rhein', 7.892, 49.969],
    ['Köln', 6.96, 50.94],
    ['Paris', 2.35, 48.85],
    ['Cluny', 4.659, 46.434],
    ['Lyon', 4.84, 45.76],
    ['Montpellier', 3.88, 43.61],
    ['Toulouse', 1.44, 43.6],
    ['Utrecht', 5.12, 52.09],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Kloster/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['die Nordsee', 3.8, 53.8],
    ['die Nordsee vor Jütland', 7.5, 54.0],
    ['der Ärmelkanal', 1.0, 50.4],
    ['der Golfe du Lion', 4.0, 42.8],
    ['das Balearische Meer', 1.6, 40.2],
    ['das Ligurische Meer', 8.6, 43.3],
    ['das Tyrrhenische Meer', 11.5, 40.0],
    ['die Adria', 14.5, 43.4],
    ['der Golf von Venedig', 13.2, 45.1],
    ['das Ionische Meer', 17.6, 38.6],
    ['die Straße von Otranto', 19.0, 40.2],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Kloster/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Kloster/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(`Kloster/Karte: Phase „${phase.id}" nennt eine Jahreszahl`, /\d/.test(phase.label));
    pruefe(
      `Kloster/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Kloster/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: gründen, ausbreiten, schreiben.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Kloster/Karte: eine Phase zeigt Montecassino und die Regel Benedikts',
    karte.phasen.some((p) => /Montecassino/.test(p.label) && /Benedikt/.test(p.hinweis || '')),
  );
  pruefe(
    'Kloster/Karte: eine Phase zeigt die Klöster im Frankenreich',
    karte.phasen.some(
      (p) => /St\. Gallen/.test(p.label) && /Reichenau/.test(p.label) && /Fulda/.test(p.label),
    ),
  );
  pruefe(
    'Kloster/Karte: eine Phase zeigt Cluny und Salerno',
    karte.phasen.some((p) => /Cluny/.test(p.label) && /Salerno/.test(p.label)),
  );
  pruefe(
    'Kloster/Karte: eine Phase zeigt den Rupertsberg und Hildegard',
    karte.phasen.some((p) => /Rupertsberg/.test(p.label) && /Hildegard/.test(p.hinweis || '')),
  );
  pruefe(
    'Kloster/Karte: der Klostergarten kommt auf der Karte vor',
    /(Kräuter|Garten)/.test(phasenText),
  );
  pruefe(
    'Kloster/Karte: die Phasen laufen von Montecassino bis zum Rupertsberg',
    karte.phasen[0].id === 'montecassino' &&
      karte.phasen[karte.phasen.length - 1].id === 'rupertsberg',
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['montecassino', 13.81, 41.49],
    ['st-gallen', 9.377, 47.425],
    ['reichenau', 9.062, 47.698],
    ['fulda', 9.681, 50.556],
    ['cluny', 4.659, 46.434],
    ['rupertsberg', 7.892, 49.969],
    ['salerno', 14.768, 40.682],
  ];
  pruefe(
    'Kloster/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Kloster/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Kloster/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Kloster/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Kloster/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Kloster/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
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
    `Kloster/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Kloster/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Kloster/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Kloster/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern eine Regel und Bücher.
    pruefe(
      `Kloster/Karte: Bewegung „${bewegung.id}" spricht vom Wissen, nicht nur vom Weg`,
      /Regel|Bücher|Buch|Schrift|abzuschreiben|übersetz|Bibliothek|gelehrt/.test(bewegung.text),
    );
  }
  // Der Weg der Regel über die Alpen ist der Bogen des Kapitels.
  const regelWeg = (karte.bewegungen || []).find((b) => b.id === 'regel-nach-norden');
  pruefe('Kloster/Karte: der Weg der Regel nach Norden ist eingezeichnet', Boolean(regelWeg));
  if (regelWeg) {
    pruefe(
      'Kloster/Karte: der Weg der Regel beginnt in Montecassino',
      regelWeg.von[0] === P.punkt(13.81, 41.49)[0] &&
        regelWeg.von[1] === P.punkt(13.81, 41.49)[1],
    );
    pruefe(
      'Kloster/Karte: der Weg der Regel endet nördlich der Alpen',
      regelWeg.nach[1] < P.punkt(0, 47.0)[1],
    );
  }

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Alpen',
    'Rhein',
    'Donau',
    'Mittelmeer',
    'Nordsee',
    'Rom',
    'Adria',
    'Pyrenäen',
  ]) {
    pruefe(`Kloster/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Kloster: Titel und Epoche stehen',
    thema.titel === 'Die Klostermedizin' && thema.epoche === '~500–1200',
  );
  pruefe('Kloster: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Kloster: der Aufhänger nennt Garten, Schreibstube und Pflege',
    /(Gärten|Garten|Heilkräuter)/.test(thema.aufhaenger.text) &&
      /(Schreibstube|abschrieben|abschreiben)/.test(thema.aufhaenger.text) &&
      /(pflegten|Kranken)/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Kloster: der Aufhänger nennt Hildegard von Bingen',
    /Hildegard von Bingen/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Kloster: der Aufhänger wertet keine der beiden Seiten ab',
    !/(rückständig|lächerlich|Unsinn|dumm|primitiv|finster)/i.test(thema.aufhaenger.text),
  );
  pruefe('Kloster: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Kloster: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Kloster: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Kloster/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Kloster/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const kloster = thema.perspektiven.find((p) => p.id === 'kloster');
  pruefe(
    'Kloster: die Stimme des Klosters ist die erste Perspektive',
    thema.perspektiven[0] === kloster,
  );
  if (!kloster) return;

  pruefe('Kloster: die erste Perspektive ist Opus zugeschrieben', kloster.stimme === 'Opus');
  pruefe(
    'Kloster: die erste Perspektive heißt nach ihrer Sicht',
    /Kloster/.test(kloster.name),
  );

  // =========================================================================
  // 3. Die Längenregel (Betreiber-Feedback vom 24.08.2026)
  // =========================================================================

  // Kapitel 1 bis 8 bleiben kurz und dicht. Gemessen wird in Zeilen — das
  // ist das, was der Betreiber im Repo sieht.
  const zeilenErsteStimme = kloster.text.split('\n').length;
  pruefe(
    `Kloster/Länge: die erste Perspektive bleibt unter ${MAX_ZEILEN_PERSPEKTIVE} Zeilen (${zeilenErsteStimme})`,
    zeilenErsteStimme <= MAX_ZEILEN_PERSPEKTIVE,
  );
  for (const p of thema.perspektiven) {
    const zeilen = p.text.split('\n').length;
    pruefe(
      `Kloster/Länge: Perspektive „${p.id}" bleibt unter ${MAX_ZEILEN_PERSPEKTIVE} Zeilen (${zeilen})`,
      zeilen <= MAX_ZEILEN_PERSPEKTIVE,
    );
  }
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Kloster/Länge: das ganze Kapitel bleibt unter ${MAX_ZEILEN_KAPITEL} Zeilen (${zeilenKapitel})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );
  // Kurz heißt nicht dünn: Die Denkart-Analyse muss trotzdem ausgeführt sein.
  pruefe(
    'Kloster/Länge: die erste Perspektive ist trotzdem ausgeführt (über 6000 Zeichen)',
    kloster.text.length > 6000,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = kloster.text.replace(/\s+/g, ' ');

  const ueberschriften = kloster.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Kloster: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 5,
  );
  // Wenige, starke Abschnitte — die Längenregel verlangt Dichte, nicht Breite.
  pruefe(
    'Kloster: die Abschnitte bleiben wenige (höchstens acht)',
    ueberschriften.length <= 8,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 6 darf
  // keine der fünf bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf,
  // Kapitel 4 schreibt Briefe, Kapitel 5 folgt einem Buch von Station zu
  // Station. Dieses Kapitel geht durch ein Haus: Jeder Abschnitt ist ein
  // Ort hinter der Mauer — und der letzte führt an die Mauer selbst.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Kloster: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Kloster: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Kloster: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every((h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h)),
  );
  pruefe(
    'Kloster: die Abschnittsstruktur ist eine andere als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Kloster: die Abschnittsstruktur ist eine andere als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Kloster: die Dramaturgie ist ein Rundgang (jeder Abschnitt ein Ort)',
    ueberschriften.filter((h) => /^## (An der|Im|Auf dem) /.test(h)).length >= 5 &&
      /Pforte/.test(ueberschriften[0]) &&
      /Mauer/.test(ueberschriften[ueberschriften.length - 1]),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Kloster: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Die drei Orte, an denen diese Medizin stattfand.
  pruefe(
    'Kloster/Denkart: der Klostergarten und seine Kräuter kommen vor',
    /(Klostergarten|Kräutergarten|Beete)/.test(fliessend) &&
      /(Salbei|Fenchel|Beifuß)/.test(fliessend) &&
      /Walahfrid Strabo/.test(fliessend),
  );
  pruefe(
    'Kloster/Denkart: das Skriptorium und das Abschreiben kommen vor',
    /(Skriptorium|Schreibstube)/.test(fliessend) &&
      /(abschreib|abgeschrieben|kopiert)/.test(fliessend) &&
      /Cassiodorus/.test(fliessend),
  );
  pruefe(
    'Kloster/Denkart: die Krankenpflege wird als Einrichtung gezeigt',
    /(Krankensaal|Pflege)/.test(fliessend) && /Cluny/.test(fliessend),
  );
  pruefe(
    'Kloster/Denkart: Hildegard von Bingen mit ihren beiden Büchern',
    /Hildegard von Bingen/.test(fliessend) &&
      /Physica/.test(fliessend) &&
      /Causae et curae/.test(fliessend) &&
      /(viriditas|Grünkraft)/.test(fliessend),
  );

  // (b) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum heilen? (caritas, die Regel Benedikts)',
      /(caritas|Nächstenliebe)/.test(fliessend) &&
        /Benedikt/.test(fliessend) &&
        /Vor allem und über allem ist für die Kranken zu sorgen/.test(fliessend) &&
        /begegnet Dir Dein Herr/.test(fliessend),
    ],
    [
      'Warum ein Garten? (die Schöpfung als Apotheke)',
      /Warum ein Garten/.test(fliessend) &&
        /Schöpfung/.test(fliessend) &&
        /Apotheke/.test(fliessend) &&
        /Kein Kraut ist zufällig da/.test(fliessend),
    ],
    [
      'Warum abschreiben? (Bewahren ist eine Tätigkeit)',
      /Warum tun wir das/.test(fliessend) &&
        /Bewahren ist eine Tätigkeit/.test(fliessend) &&
        /(Pergament|Buch, das niemand abschreibt)/.test(fliessend),
    ],
    [
      'Warum Gebet und Pflanze zusammen? (Leib und Seele)',
      /Leib und Seele/.test(fliessend) &&
        /Wer nur den Leib behandelt, lässt die Hälfte aus/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Kloster/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Kloster/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );
  // Die Begründung der Heilkunst gegen den frommen Einwand — das Lorscher
  // Arzneibuch ist der Schlüsseltext dieser Denkart.
  pruefe(
    'Kloster/Denkart: die theologische Erlaubnis der Heilkunst wird gezeigt (Lorsch)',
    /Lorsch/.test(fliessend) &&
      /misstraut der Vorsehung Gottes/.test(fliessend) &&
      /Gabe Gottes/.test(fliessend),
  );
  // Die Regel, nach der ein Kraut gewählt wurde — geerbt aus der Säftelehre.
  pruefe(
    'Kloster/Denkart: die Begründungslogik der Kräuterwahl wird erklärt',
    /vier Säften/.test(fliessend) && /warm, kalt, feucht, trocken/.test(fliessend),
  );

  // (c) Die Grenzen der eigenen Denkart — von der Stimme selbst benannt.
  pruefe(
    'Kloster/Denkart: der Glaube, der die Diagnose ersetzte, wird selbst benannt',
    /Der Glaube hat bei uns oft die Diagnose ersetzt/.test(fliessend),
  );
  pruefe(
    'Kloster/Denkart: die Krankheit als Prüfung oder Strafe Gottes wird eingeräumt',
    /(Prüfung oder Strafe Gottes|Strafe)/.test(fliessend) && /Schuld/.test(fliessend),
  );
  pruefe(
    'Kloster/Denkart: die Autorität der Kirche über dem Zweifel wird benannt',
    /Autorität/.test(fliessend) &&
      /Zweifel/.test(fliessend) &&
      /(1130|1215)/.test(fliessend),
  );
  pruefe(
    'Kloster/Denkart: die unprüfbare Erklärung wird als Grenze erkannt',
    /Eine Antwort, die in beiden Fällen stimmt/.test(fliessend) &&
      /(nicht gezählt|nicht verglichen)/.test(fliessend),
  );

  // =========================================================================
  // 5. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (den Marktplatz) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Kloster/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /529/.test(perspektivenText) &&
      /Montecassino/.test(perspektivenText) &&
      /(St\. Gallen|Reichenau)/.test(perspektivenText) &&
      /Salerno/.test(perspektivenText),
  );
  pruefe(
    'Kloster/Erzähl-Muster: (a2) die antike Herkunft der Bücher wird genannt',
    /(Galen|Hippokrates|Dioskurides)/.test(perspektivenText),
  );
  pruefe(
    'Kloster/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Denkart|caritas|Schöpfung|Lebenskraft|Grünkraft)/.test(perspektivenText),
  );
  pruefe(
    'Kloster/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /(Pflege|Krankensaal)/.test(perspektivenText) &&
      /(Garten|Kräuter)/.test(perspektivenText) &&
      /(bewahrt|Bewahren|abgeschrieben)/.test(perspektivenText),
  );
  pruefe(
    'Kloster/Erzähl-Muster: (c2) und die Grenzen',
    /(Grenze|vorwerfen|geschadet|verachtet)/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Tradition selbst.
  pruefe(
    'Kloster/Bilanz: die Stimme nennt, was von ihr bleibt',
    /Was bleibt/.test(fliessend),
  );
  pruefe(
    'Kloster/Bilanz: die Stimme nennt, was sie sich vorwerfen muss',
    /Was wir uns vorwerfen müssen/.test(fliessend),
  );
  pruefe(
    'Kloster/Bilanz: das Klosterhospiz wird als Anfang der Spitäler benannt',
    /(Klosterhospiz|Spitäler)/.test(fliessend),
  );
  pruefe(
    'Kloster/Bilanz: auch die Schäden werden genannt (Aderlass)',
    /Aderlass/.test(fliessend) && /geschadet/.test(fliessend),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst.
  pruefe(
    'Kloster/TONE: die Stimme räumt ein, dass sie nicht geprüft hat',
    /Wir haben nicht geprüft/.test(fliessend),
  );
  pruefe(
    'Kloster/TONE: die Stimme räumt ein, dass sie das Wissen draußen verachtet hat',
    /Wir haben die draußen verachtet/.test(fliessend) &&
      /entscheiden, was nicht bewahrt wird/.test(fliessend),
  );
  pruefe(
    'Kloster/TONE: die Stimme benennt, dass Hildegard eine Ausnahme war, keine Öffnung',
    /Sie hat eine Tür gefunden, keine geöffnet/.test(fliessend),
  );
  pruefe(
    'Kloster/TONE: die heutige „Hildegard-Medizin" wird ehrlich eingeordnet',
    /Hildegard-Medizin/.test(fliessend) &&
      /20\. Jahrhunderts/.test(fliessend) &&
      /nicht deshalb wirksam, weil es alt ist/.test(fliessend),
  );
  // Kein Missionieren: Die Stimme spricht keine Heilversprechen aus.
  pruefe(
    'Kloster/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert|Wundermittel|immer wirksam)/i.test(fliessend),
  );
  // Und sie wertet die andere Seite nicht ab — auch nicht die von draußen.
  pruefe(
    'Kloster/TONE: die erste Perspektive wertet die Welt vor der Mauer nicht ab',
    !/(rückständig|primitiv|barbarisch|dumm|Pfuscher)/i.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Kloster: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Kloster: die Tür führt auf den Marktplatz (Bader, Wundarzt, Hebamme, Kräuterfrau)',
    /Marktplatz/.test(fliessend) &&
      /Bader/.test(fliessend) &&
      /Wundarzt/.test(fliessend) &&
      /Hebamme/.test(fliessend) &&
      /Kräuter kennt/.test(fliessend),
  );
  pruefe(
    'Kloster: die Tür benennt, dass draußen mehr Menschen behandelt wurden',
    /mehr Menschen behandelt als wir alle zusammen/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Kloster/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Kloster/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Kloster/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus|finster)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Kloster/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes den Marktplatz ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Kloster/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 7)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Kloster/Synthese: sagt, welche Stimme noch kommt',
      /Marktplatz/.test(thema.synthese) &&
        /(Bader|Hebammen|Kräuterfrauen)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Kloster/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Kloster/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Kloster/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
