// Prüfungen für Kapitel 10 — „Kneipp und die Naturheilkunde" und seine
// Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Acht Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test — wie in Kapitel 16 ohne Meer.** Der Ausschnitt
//      liegt vollständig im Binnenland; es gibt keine Küste, gegen die
//      geprüft werden könnte. An ihre Stelle treten drei andere
//      Nachschlagewerke: (a) die FLÜSSE — Orte, die im Atlas am Wasser
//      liegen, müssen auf der gezeichneten Linie liegen, Orte im
//      Trockenen müssen Abstand halten; (b) die beiden SEEN (Ammersee
//      und Starnberger See); (c) die LANDSCHAFT, in der dieses Leben
//      spielt — der bayerische Regierungsbezirk Schwaben, dessen
//      Ostgrenze grob dem Lech folgt. Geprüft werden bewusst Orte, die
//      NICHT selbst Stützpunkte der Linien sind. Der Ausschnitt umfasst
//      nur 2,5° Länge, deshalb die enge Toleranz von 0,1°.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im
//      Text der ersten Stimme müssen die Selbstheilungskraft (vis
//      medicatrix naturae), alle fünf Säulen (Wasser, Bewegung,
//      Ernährung, Heilpflanzen, Ordnung), die Krankheit des Studenten
//      und die Begründungslogik stehen — mindestens zwei „Weshalb"-
//      Fragen müssen wirklich beantwortet werden.
//
//   3. **Die Brücke zur Betreiber-These (Kapitel 18).** Bewegung,
//      Ernährung, soziales Umfeld, wenig Stress — „keine
//      Raketenwissenschaft" —, dazu die ehrliche Gegenseite (die
//      Strukturen, die das Einfache schwer machen).
//
//   4. **Die ehrlichen Grenzen (TONE-Regel und Zusatzregel für sensible
//      Themen).** Die Stimme der Naturheilkunde muss die unbequemen
//      Stellen SELBST benennen: die fehlende Evidenz für die einzelnen
//      Anwendungen, die Wundermittel-Versprecher, die Scharlatanerie am
//      Rand, die Gefahr des zu späten Arztbesuchs, die harten
//      Wasserkuren des frühen 19. Jahrhunderts und die Verwandlung der
//      billigen Idee in ein Geschäft.
//
//   5. **Die Anfeindung fair erzählt.** Der Spott über den
//      „Wasserpfarrer" gehört ins Kapitel — aber auch, dass die Ärzte
//      Gründe hatten. Die Beweggründe der anderen Seite werden fair
//      wiedergegeben (Zusatzregel für sensible Themen).
//
//   6. **Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026).** Die
//      belegten Eckdaten stehen da (Stefansried 17. Mai 1821, Hahns
//      Wasserbuch von 1738, Wörishofen ab 1855, „Meine Wasserkur" 1886,
//      Tod am 17. Juni 1897); die Diagnose der Studentenkrankheit ist
//      ausdrücklich als ungesichert gekennzeichnet, und die Selbstheilung
//      wird nicht als Nachweis ausgegeben.
//
//   7. **Der Innovations-Zyklus (Betreiber-Beobachtung 26.08.2026).** Der
//      rote Faden des Buches — hier in seiner eigenen Form: Die
//      Naturheilkunde war von Anfang an sanft; ihr Schaden kam von der
//      Härte der frühen Wasserdoktoren und davon, dass aus der billigen
//      Idee ein Geschäft wurde.
//
//   8. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), die Längenregel in ihrer Umkehrung ab
//      Kapitel 9, die Dramaturgie (KEINE WIEDERHOLUNGEN — dieses Kapitel
//      ist DAS WASSER), Attribution der ersten Stimme, Quiz-Umfang,
//      offene Urteilsfrage, Lernformat und die offene Tür zur zweiten
//      Stimme (die Schulmedizin).
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 16: Die zweite
// Perspektive und die endgültige Synthese kommen erst mit dem
// Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten,
// hängen deshalb an ihrer id („naturheilkunde"); die Prüfungen zum
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
  fluesse,
  seen,
} = require('../utils/themen/karten/kneipp.js');

/**
 * Wie weit ein Ort von „seinem" Fluss abweichen darf (in Grad).
 *
 * Dieses Blatt ist noch kleiner als das von Kapitel 16 — 2,5° Länge. 0,1°
 * sind hier rund elf Kilometer. Das deckt die Vereinfachung eines
 * Flusslaufs ab, lässt aber keinen falsch gesetzten Ort durch.
 */
const FLUSS_TOLERANZ = 0.1;

/**
 * Wie weit ein Ort im Trockenen mindestens von jedem Fluss entfernt sein
 * muss, damit die Gegenprobe etwas wert ist.
 *
 * Bayerisch-Schwaben und das Alpenvorland sind dicht von Flüssen
 * durchzogen; wirklich „trockene" Orte liegen deshalb in den
 * Wasserscheiden zwischen den Tälern.
 */
const TROCKEN_ABSTAND = 0.15;

/**
 * Mindestumfang der ersten Perspektive (Neuzeit-Regel, Kapitel 9 ff.).
 *
 * Die frühen Kapitel durften höchstens ~250 Zeilen je Stimme haben; ab
 * Kapitel 9 gilt die Umkehrung — vollständig und ausführlich.
 */
const MIN_ZEILEN_ERSTE_STIMME = 300;

/**
 * Obergrenze fürs ganze Kapitel — ausführlich ja, aufgebläht nein.
 *
 * Großzügig gewählt, damit die zweite Stimme aus dem Hermes-Pass Platz
 * hat, ohne dass die Grenze nachträglich verschoben werden muss.
 */
const MAX_ZEILEN_KAPITEL = 2200;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 16.
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

/** Liegt der Punkt auf der gezeichneten Landfläche? */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge am Alpenrand genauso
 * „lang" wie an der Donau; die Toleranz würde im Norden großzügiger.
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

/**
 * Kürzester Abstand eines Punktes zu einem OFFENEN Linienzug.
 *
 * Ein Fluss ist keine geschlossene Linie; eine erfundene Schlussstrecke
 * von der Mündung zurück zur Quelle würde die Prüfung verfälschen.
 */
function abstandZurLinie(punkt, linie) {
  let kleinster = Infinity;
  for (let i = 0; i < linie.length - 1; i += 1) {
    const abstand = abstandZuStrecke(punkt, linie[i], linie[i + 1]);
    if (abstand < kleinster) kleinster = abstand;
  }
  return kleinster;
}

/** Kürzester Abstand zu irgendeinem der gezeichneten Flüsse. */
function abstandZumNaechstenFluss(punkt) {
  let kleinster = Infinity;
  for (const linie of Object.values(fluesse)) {
    const abstand = abstandZurLinie(punkt, linie);
    if (abstand < kleinster) kleinster = abstand;
  }
  return kleinster;
}

/**
 * @param {(name: string, ok: boolean) => void} pruefe Prüf-Funktion des Rahmens
 */
export function laufe(pruefe) {
  const thema = themaNachId('kneipp');
  pruefe(
    'Kneipp: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 17
  // steht hinter „Hahnemann und die Homöopathie" (Themenlandkarte in
  // CLAUDE.md).
  pruefe(
    'Kneipp: steht in der App hinter „Hahnemann und die Homöopathie"',
    alleThemen.findIndex((t) => t.id === 'kneipp') ===
      alleThemen.findIndex((t) => t.id === 'homoeopathie') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Kneipp/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Kneipp/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss alle Stationen dieses Lebens auf ein Blatt bringen:
  // Stefansried, Grönenbach, Dillingen, München, Augsburg, Boos,
  // Wörishofen.
  pruefe(
    'Kneipp/Karte: der Ausschnitt reicht von Oberschwaben bis über München hinaus',
    RAHMEN.minLon <= 10.1 && RAHMEN.maxLon >= 11.7,
  );
  pruefe(
    'Kneipp/Karte: der Ausschnitt reicht vom Alpenrand bis an die Donau',
    RAHMEN.minLat <= 47.7 && RAHMEN.maxLat >= 48.65,
  );
  pruefe('Kneipp/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Kneipp/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Orte am Wasser: müssen auf der gezeichneten Linie liegen ------------
  // Städte, die im Schulatlas eindeutig an ihrem Fluss liegen und die NICHT
  // als Stützpunkte in den Flusslisten stehen.
  const orteAmFluss = [
    ['Ulm an der Donau', 9.99, 48.398, 'donau'],
    ['Leipheim an der Donau', 10.2214, 48.4506, 'donau'],
    ['Lauingen an der Donau', 10.4297, 48.5678, 'donau'],
    ['Höchstädt an der Donau', 10.5672, 48.6133, 'donau'],
    ['Neuburg an der Donau', 11.1875, 48.7358, 'donau'],
    ['Ingolstadt an der Donau', 11.4258, 48.7665, 'donau'],
    ['Kempten an der Iller', 10.3167, 47.7267, 'iller'],
    ['Illertissen an der Iller', 10.1042, 48.2233, 'iller'],
    ['Vöhringen an der Iller', 10.0839, 48.2792, 'iller'],
    ['Senden an der Iller', 10.0631, 48.3231, 'iller'],
    ['Schongau am Lech', 10.8967, 47.8125, 'lech'],
    ['Landsberg am Lech', 10.8756, 48.0478, 'lech'],
    ['Gersthofen am Lech', 10.8756, 48.4244, 'lech'],
    ['Rain am Lech', 10.9167, 48.6889, 'lech'],
    ['Kaufbeuren an der Wertach', 10.6217, 47.88, 'wertach'],
    ['Türkheim an der Wertach', 10.6376, 48.0578, 'wertach'],
    ['Bobingen an der Wertach', 10.8281, 48.2683, 'wertach'],
    ['Mindelheim an der Mindel', 10.4906, 48.0447, 'mindel'],
    ['Thannhausen an der Mindel', 10.4711, 48.2864, 'mindel'],
    ['Burgau an der Mindel', 10.4103, 48.4319, 'mindel'],
    ['Bad Tölz an der Isar', 11.5561, 47.7606, 'isar'],
    ['Wolfratshausen an der Isar', 11.4247, 47.9139, 'isar'],
    ['Freising an der Isar', 11.7489, 48.4028, 'isar'],
    ['Moosburg an der Isar', 11.9361, 48.4686, 'isar'],
  ];
  for (const [name, lon, lat, flussName] of orteAmFluss) {
    const abstand = abstandZurLinie([lon, lat], fluesse[flussName]);
    pruefe(
      `Kneipp/Atlas: ${name} liegt auf der gezeichneten Linie (${abstand.toFixed(3)}°)`,
      abstand <= FLUSS_TOLERANZ,
    );
  }

  // --- Die Orte des Kapitels selbst ----------------------------------------
  // Dillingen liegt an der Donau, Augsburg an der Wertach kurz vor deren
  // Mündung in den Lech, München an der Isar, Boos im Illertal. Das ist der
  // eigentliche Atlas-Beweis: Die Info-Punkte sitzen dort, wo auch der Fluss
  // gezeichnet ist.
  for (const [name, lon, lat, flussName] of [
    ['Dillingen', 10.496, 48.579, 'donau'],
    ['Augsburg', 10.898, 48.371, 'wertach'],
    ['München', 11.576, 48.137, 'isar'],
    ['Boos', 10.125, 48.003, 'iller'],
  ]) {
    const abstand = abstandZurLinie([lon, lat], fluesse[flussName]);
    pruefe(
      `Kneipp/Atlas: ${name} liegt an seinem Fluss (${abstand.toFixed(3)}°)`,
      abstand <= FLUSS_TOLERANZ,
    );
  }

  // --- Orte im Trockenen: dürfen an keinem Fluss liegen --------------------
  // Die Gegenprobe. Ohne sie wäre die Prüfung oben wertlos: Eine Karte, auf
  // der überall Wasser ist, hätte jeden Ort am Fluss. Gewählt sind Orte auf
  // den Wasserscheiden zwischen den Tälern.
  const orteImTrockenen = [
    ['Fürstenfeldbruck zwischen Lech und Isar', 11.2553, 48.1772],
    ['Weilheim in Oberbayern', 11.1417, 47.8419],
    ['Schrobenhausen im Donaumoos', 11.2586, 48.5606],
    ['Pfaffenhofen an der Ilm', 11.5061, 48.5314],
    ['Bad Waldsee in Oberschwaben', 9.7519, 47.9214],
    ['Biberach an der Riß', 9.7908, 48.0989],
  ];
  for (const [name, lon, lat] of orteImTrockenen) {
    const abstand = abstandZumNaechstenFluss([lon, lat]);
    pruefe(
      `Kneipp/Atlas: ${name} liegt an keinem gezeichneten Fluss (${abstand.toFixed(3)}°)`,
      abstand > TROCKEN_ABSTAND,
    );
  }

  // --- Die beiden Seen -----------------------------------------------------
  // Ammersee und Starnberger See sind die auffälligsten Wasserflächen des
  // Blattes; wer sie falsch setzt, verschiebt das halbe Alpenvorland.
  pruefe(
    'Kneipp/Atlas: die Mitte des Ammersees liegt in der gezeichneten Fläche',
    liegtIn([11.12, 48.01], seen.ammersee),
  );
  pruefe(
    'Kneipp/Atlas: Herrsching liegt am Ammersee',
    liegtIn([11.175, 48.0], seen.ammersee),
  );
  pruefe(
    'Kneipp/Atlas: die Mitte des Starnberger Sees liegt in der gezeichneten Fläche',
    liegtIn([11.31, 47.93], seen.starnbergerSee),
  );
  for (const [name, lon, lat] of [
    ['München', 11.5755, 48.1372],
    ['Weilheim in Oberbayern', 11.1417, 47.8419],
    ['Landsberg am Lech', 10.8756, 48.0478],
  ]) {
    pruefe(
      `Kneipp/Atlas: ${name} liegt in keinem der beiden Seen`,
      !liegtIn([lon, lat], seen.ammersee) &&
        !liegtIn([lon, lat], seen.starnbergerSee),
    );
  }

  // --- Die Landfläche ------------------------------------------------------
  // Dieser Ausschnitt hat kein Meer; geprüft wird deshalb nur, dass die
  // gezeichnete Fläche den ganzen Rahmen deckt — auch die vier Ecken.
  for (const [name, lon, lat] of [
    ['Wörishofen', 10.599, 48.005],
    ['Dillingen', 10.496, 48.579],
    ['München', 11.576, 48.137],
    ['die Nordwestecke des Blattes', 9.75, 48.75],
    ['die Südostecke des Blattes', 12.15, 47.65],
  ]) {
    pruefe(`Kneipp/Atlas: ${name} liegt auf der Landfläche`, aufLand([lon, lat]));
  }

  // --- Die Landschaft: Bayerisch-Schwaben ----------------------------------
  // Kneipps ganzes Leben spielt im Regierungsbezirk Schwaben; nur zum
  // Studium ging er über den Lech nach München, also nach Oberbayern.
  for (const [name, lon, lat] of [
    ['Stefansried', 10.344, 47.958],
    ['Ottobeuren', 10.2993, 47.9403],
    ['Grönenbach', 10.214, 47.878],
    ['Boos im Illertal', 10.125, 48.003],
    ['Memmingen', 10.1811, 47.9878],
    ['Kempten', 10.3167, 47.7267],
    ['Wörishofen', 10.599, 48.005],
    ['Augsburg', 10.898, 48.371],
    ['Dillingen an der Donau', 10.4956, 48.5786],
    ['Donauwörth', 10.7794, 48.7175],
  ]) {
    pruefe(
      `Kneipp/Atlas: ${name} liegt in Bayerisch-Schwaben`,
      liegtIn([lon, lat], kuesten.schwaben),
    );
  }
  // Jenseits des Lech beginnt Oberbayern, jenseits der Iller lag
  // Württemberg.
  for (const [name, lon, lat] of [
    ['München', 11.5755, 48.1372],
    ['Freising', 11.7489, 48.4028],
    ['Ingolstadt', 11.4258, 48.7665],
    ['Wolfratshausen', 11.4247, 47.9139],
    ['Schongau am Lech', 10.8967, 47.8125],
    ['Weilheim in Oberbayern', 11.1417, 47.8419],
    ['Biberach an der Riß', 9.7908, 48.0989],
    ['Laupheim', 9.8781, 48.2264],
  ]) {
    pruefe(
      `Kneipp/Atlas: ${name} liegt außerhalb von Bayerisch-Schwaben`,
      !liegtIn([lon, lat], kuesten.schwaben),
    );
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Kneipp/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Kneipp/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\b(1[6-9]\d\d|20\d\d)\b/.test(phase.label),
    );
    pruefe(
      `Kneipp/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Kneipp/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  pruefe(
    'Kneipp/Karte: eine Phase zeigt Herkunft und Allgäu ab 1821',
    karte.phasen.some(
      (p) =>
        /1821/.test(p.label) &&
        /17\. Mai 1821/.test(p.hinweis) &&
        /Stefansried/.test(p.hinweis) &&
        /Merkle/.test(p.hinweis),
    ),
  );
  pruefe(
    'Kneipp/Karte: eine Phase zeigt Dillingen, die Krankheit und das Wasserbuch',
    karte.phasen.some(
      (p) =>
        /1849/.test(p.label) &&
        /Dillingen/.test(p.label + p.hinweis) &&
        /Hahn/.test(p.hinweis) &&
        /1738/.test(p.hinweis) &&
        /nicht gesichert/.test(p.hinweis),
    ),
  );
  pruefe(
    'Kneipp/Karte: eine Phase zeigt Priesterweihe und Cholera',
    karte.phasen.some(
      (p) =>
        /1852/.test(p.hinweis) &&
        /Augsburg/.test(p.hinweis) &&
        /Cholera/.test(p.hinweis),
    ),
  );
  pruefe(
    'Kneipp/Karte: eine Phase zeigt Wörishofen ab 1855 und die Wasserkur von 1886',
    karte.phasen.some(
      (p) =>
        /1855/.test(p.label) &&
        /Wörishofen/.test(p.label + p.hinweis) &&
        /Meine Wasserkur/.test(p.hinweis),
    ),
  );
  pruefe(
    'Kneipp/Karte: eine Phase zeigt den Kurort und den Tod 1897',
    karte.phasen.some(
      (p) =>
        /1897/.test(p.label) &&
        /17\. Juni 1897/.test(p.hinweis) &&
        /Bad Wörishofen/.test(p.hinweis),
    ),
  );
  pruefe(
    'Kneipp/Karte: die Phasen laufen vom Allgäu bis zum Kurort',
    karte.phasen[0].id === 'allgaeu-1821-1844' &&
      karte.phasen[karte.phasen.length - 1].id === 'kurort-1886-1897',
  );
  // Die Karte zeigt Zustände mit Jahreszahl und bewertet nicht (Zusatzregel
  // für sensible Themen) — bei diesem Streitthema besonders wichtig.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Kneipp/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch|Betrüger|Hokuspokus|Aberglaube)/i.test(
      phasenText,
    ),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  const erwartetePunkte = [
    ['stefansried', 10.344, 47.958],
    ['groenenbach', 10.214, 47.878],
    ['dillingen', 10.496, 48.579],
    ['muenchen', 11.576, 48.137],
    ['augsburg', 10.898, 48.371],
    ['boos', 10.125, 48.003],
    ['woerishofen', 10.599, 48.005],
  ];
  pruefe(
    'Kneipp/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Kneipp/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(
      `Kneipp/Atlas: „${id}" sitzt auf ${lon}/${lat}`,
      punkt.x === x && punkt.y === y,
    );
    pruefe(`Kneipp/Atlas: „${id}" liegt auf der Landfläche`, aufLand([lon, lat]));
    pruefe(
      `Kneipp/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Kneipp/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die Pole des Kapitels: die Herkunft, der Lateinunterricht, das kalte
  // Wasser, die Weihe, die Pfarrei.
  const stefansriedPunkt = karte.punkte.find((p) => p.id === 'stefansried');
  pruefe(
    'Kneipp/Karte: der Punkt Stefansried nennt Geburtstag und Weberhandwerk',
    Boolean(
      stefansriedPunkt &&
        /17\. Mai 1821/.test(stefansriedPunkt.text) &&
        /Weber/.test(stefansriedPunkt.text) &&
        /Allgäu/.test(stefansriedPunkt.text),
    ),
  );
  const groenenbachPunkt = karte.punkte.find((p) => p.id === 'groenenbach');
  pruefe(
    'Kneipp/Karte: der Punkt Grönenbach nennt Kaplan Merkle und den Weg nach Dillingen',
    Boolean(
      groenenbachPunkt &&
        /Merkle/.test(groenenbachPunkt.text) &&
        /1844/.test(groenenbachPunkt.text) &&
        /Dillingen/.test(groenenbachPunkt.text),
    ),
  );
  const dillingenPunkt = karte.punkte.find((p) => p.id === 'dillingen');
  pruefe(
    'Kneipp/Karte: der Punkt Dillingen nennt Hahns Wasserbuch und die Donaubäder',
    Boolean(
      dillingenPunkt &&
        /Johann Siegmund Hahn/.test(dillingenPunkt.text) &&
        /1738/.test(dillingenPunkt.text) &&
        /Donau/.test(dillingenPunkt.text),
    ),
  );
  pruefe(
    'Kneipp/Karte: der Punkt Dillingen kennzeichnet die Diagnose als unsicher',
    Boolean(
      dillingenPunkt &&
        /(nicht|nicht sicher|nicht gesichert)/.test(dillingenPunkt.text) &&
        /sicher belegt ist die Diagnose nicht/.test(dillingenPunkt.text),
    ),
  );
  const augsburgPunkt = karte.punkte.find((p) => p.id === 'augsburg');
  pruefe(
    'Kneipp/Karte: der Punkt Augsburg nennt die Priesterweihe von 1852',
    Boolean(
      augsburgPunkt &&
        /6\. August 1852/.test(augsburgPunkt.text) &&
        /Priester/.test(augsburgPunkt.text),
    ),
  );
  const woerishofenPunkt = karte.punkte.find((p) => p.id === 'woerishofen');
  pruefe(
    'Kneipp/Karte: der Punkt Wörishofen nennt 1855, „Meine Wasserkur" und den Badearzt',
    Boolean(
      woerishofenPunkt &&
        /1855/.test(woerishofenPunkt.text) &&
        /Meine Wasserkur/.test(woerishofenPunkt.text) &&
        /Baumgarten/.test(woerishofenPunkt.text) &&
        /17\. Juni 1897/.test(woerishofenPunkt.text),
    ),
  );
  const boosPunkt = karte.punkte.find((p) => p.id === 'boos');
  pruefe(
    'Kneipp/Karte: der Punkt Boos erzählt die Cholera von 1854 ohne Heilungsbehauptung',
    Boolean(
      boosPunkt &&
        /1854/.test(boosPunkt.text) &&
        /Cholera/.test(boosPunkt.text) &&
        /lässt sich heute nicht mehr feststellen/.test(boosPunkt.text),
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
    `Kneipp/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Kneipp/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Kneipp/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Kneipp/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern ein Pfarrer und eine Kur.
    pruefe(
      `Kneipp/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /Merkle|Cholera|Wasserkur|Dominikanerinnen|Kneipp/.test(bewegung.text),
    );
  }
  const nachDillingen = (karte.bewegungen || []).find((b) => b.id === 'weg-nach-dillingen');
  pruefe(
    'Kneipp/Karte: der Weg in die Schule beginnt in Stefansried und endet in Dillingen',
    Boolean(nachDillingen) &&
      nachDillingen.von[0] === P.punkt(10.344, 47.958)[0] &&
      nachDillingen.von[1] === P.punkt(10.344, 47.958)[1] &&
      nachDillingen.nach[0] === P.punkt(10.496, 48.579)[0] &&
      nachDillingen.nach[1] === P.punkt(10.496, 48.579)[1],
  );
  pruefe(
    'Kneipp/Karte: der Weg in die Schule nennt den Lateinunterricht',
    Boolean(nachDillingen) &&
      /Merkle/.test(nachDillingen.text) &&
      /Latein/.test(nachDillingen.text),
  );
  const nachWoerishofen = (karte.bewegungen || []).find(
    (b) => b.id === 'weg-nach-woerishofen',
  );
  pruefe(
    'Kneipp/Karte: der Weg ins Pfarramt endet in Wörishofen',
    Boolean(nachWoerishofen) &&
      nachWoerishofen.nach[0] === P.punkt(10.599, 48.005)[0] &&
      nachWoerishofen.nach[1] === P.punkt(10.599, 48.005)[1],
  );
  pruefe(
    'Kneipp/Karte: der Weg ins Pfarramt nennt Weihe, Boos und das Jahr 1855',
    Boolean(nachWoerishofen) &&
      /6\. August 1852/.test(nachWoerishofen.text) &&
      /Boos/.test(nachWoerishofen.text) &&
      /1855/.test(nachWoerishofen.text),
  );
  const inDieWelt = (karte.bewegungen || []).find(
    (b) => b.id === 'die-kur-geht-in-die-welt',
  );
  pruefe(
    'Kneipp/Karte: die Verbreitung nennt das Buch von 1886 und die UNESCO-Aufnahme',
    Boolean(inDieWelt) &&
      /1886/.test(inDieWelt.text) &&
      /UNESCO/.test(inDieWelt.text) &&
      /2021/.test(inDieWelt.text),
  );
  pruefe(
    'Kneipp/Karte: die Verbreitung sagt, dass die Ziele außerhalb des Blattes liegen',
    Boolean(inDieWelt) && /außerhalb dieses Blattes/.test(inDieWelt.text),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Bayern',
    'Schwaben',
    'Allgäu',
    'Alpen',
    'Donau',
    'Lech',
    'Iller',
    'Wertach',
    'Wörishofen',
    'Augsburg',
    'München',
    'Dillingen',
  ]) {
    pruefe(`Kneipp/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Kneipp: Titel und Epoche stehen',
    thema.titel === 'Kneipp und die Naturheilkunde' &&
      thema.epoche === 'Das 19. Jahrhundert',
  );
  pruefe('Kneipp: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Kneipp: der Aufhänger stellt die Kernfrage des Kapitels neutral',
    /kaltem Wasser/.test(thema.aufhaenger.frage) &&
      /Lebensweise/.test(thema.aufhaenger.frage),
  );
  pruefe(
    'Kneipp: der Aufhänger nennt den kranken Studenten und das Jahr 1849',
    /1849/.test(thema.aufhaenger.text) &&
      /Donau/.test(thema.aufhaenger.text) &&
      /Johann Siegmund Hahn/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Kneipp: der Aufhänger nennt die fünf Säulen und „Meine Wasserkur" 1886',
    /Wasser, Bewegung, Ernährung, Heilpflanzen, Ordnung/.test(thema.aufhaenger.text) &&
      /Meine Wasserkur/.test(thema.aufhaenger.text) &&
      /1886/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Kneipp: der Aufhänger nennt den Spott und die späte Anerkennung',
    /Wasserpfarrer/.test(thema.aufhaenger.text) &&
      /Leitlinien/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Kneipp: der Aufhänger ist neutral formuliert (keine Vorverurteilung, kein Heilsversprechen)',
    !/(Unsinn|Betrug|Quatsch|lächerlich|Hokuspokus|Aberglaube|Wunderheilung)/i.test(
      thema.aufhaenger.text,
    ),
  );
  pruefe('Kneipp: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Kneipp: die Urteilsfrage stellt Pille und Lebensstil nebeneinander',
    /Pille/.test(thema.urteil.frage) && /Lebensstil/.test(thema.urteil.frage),
  );
  pruefe(
    'Kneipp: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|Unsinn|verantwortungslos|Aberglaube)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Kneipp: der Hinweis zum Urteil lässt beide Richtungen offen',
    /kein Richtig und kein Falsch/.test(thema.urteil.hinweis) &&
      /verliert Zeit/.test(thema.urteil.hinweis) &&
      /fünf Säulen/.test(thema.urteil.hinweis),
  );
  pruefe(
    'Kneipp: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Kneipp/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Kneipp/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const stimmeDerNaturheilkunde = thema.perspektiven.find(
    (p) => p.id === 'naturheilkunde',
  );
  pruefe(
    'Kneipp: die Stimme der Naturheilkunde ist die erste Perspektive',
    thema.perspektiven[0] === stimmeDerNaturheilkunde,
  );
  if (!stimmeDerNaturheilkunde) return;

  pruefe(
    'Kneipp: die erste Perspektive ist Opus zugeschrieben',
    stimmeDerNaturheilkunde.stimme === 'Opus',
  );
  pruefe(
    'Kneipp: die erste Perspektive heißt nach ihrer Form',
    /Wasser|Stimme/.test(stimmeDerNaturheilkunde.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt
  // =========================================================================

  const zeilenErsteStimme = stimmeDerNaturheilkunde.text.split('\n').length;
  pruefe(
    `Kneipp/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'Kneipp/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 25000 Zeichen)',
    stimmeDerNaturheilkunde.text.length > 25000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Kneipp/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = stimmeDerNaturheilkunde.text.replace(/\s+/g, ' ');

  const ueberschriften = stimmeDerNaturheilkunde.text
    .split('\n')
    .filter((z) => z.startsWith('## '));
  pruefe(
    'Kneipp: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 12,
  );
  pruefe(
    'Kneipp: die Abschnitte bleiben überschaubar (höchstens zwanzig)',
    ueberschriften.length <= 20,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 17 darf
  // keine der sechzehn bisherigen Dramaturgien übernehmen. Kapitel 1
  // gliedert nach „Wer hier spricht …", Kapitel 2 führt seine
  // Begründungslogik an „## Warum …?"-Überschriften entlang, Kapitel 3
  // erzählt einen Tageslauf, Kapitel 4 schreibt Briefe, Kapitel 5 folgt
  // einem Buch von Station zu Station, Kapitel 6 geht als Rundgang durch
  // ein Haus, Kapitel 7 verhandelt vor Gericht, Kapitel 8 rechnet, Kapitel
  // 9 liest die Uhr, Kapitel 10 geht eine Kette ab, Kapitel 11 legt
  // Präparate unter die Linse, Kapitel 12 stellt die Fragen eines
  // Reporters, Kapitel 13 schlägt eine Akte auf, Kapitel 14 liest einen
  // Beipackzettel, Kapitel 15 hält Pressekonferenzen, Kapitel 16 nimmt den
  // Telefonhörer ab. Dieses Kapitel ist DAS WASSER SELBST: der Regen über
  // dem Allgäu, die Donau bei Dillingen, der Trog in Wörishofen.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Kneipp: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 9 (keine Uhr)',
    !/^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/^## Sekunde /.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 10 (keine Kette)',
    !/^## Die Kette/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Glied/.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 11 (keine Präparate)',
    !/^## Die Linse/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Präparat/.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 12 (keine Reporterfragen)',
    ueberschriften.filter((h) => /^## „/.test(h)).length === 0,
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 13 (keine Akten-Blätter)',
    ueberschriften.every((h) => !/^## Blatt \d+/.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 14 (kein Beipackzettel)',
    ueberschriften.every((h) => !/^## \d+\./.test(h)) &&
      ueberschriften.every((h) => !/Gebrauchsinformation|Gegenanzeigen/.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 15 (keine Pressekonferenz)',
    ueberschriften.every((h) => !/Pressekonferenz|Zwischenruf/.test(h)),
  );
  pruefe(
    'Kneipp: andere Struktur als in Kapitel 16 (kein Telefon)',
    ueberschriften.every(
      (h) => !/Telefon|Leitung|Anschluss|Apparat|Klingeln|Vermittlungsstelle/.test(h),
    ),
  );
  pruefe(
    'Kneipp: die Dramaturgie ist das Wasser (es trägt die Abschnitte)',
    /^## Der Regen über dem Allgäu$/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) =>
        /Regen|Wasser|Strom|Donau|Ufer|Guss|Güsse|münde|schöpfte|stiegen/.test(h),
      ).length >= 6 &&
      /münde/.test(ueberschriften[ueberschriften.length - 1]),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Kneipp: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Der Gegenstand: die Grundannahme und die fünf Säulen.
  pruefe(
    'Kneipp/Denkart: die Selbstheilungskraft steht mit Namen da',
    /Selbstheilungskraft/.test(fliessend) &&
      /vis medicatrix naturae/i.test(fliessend) &&
      /Der Körper heilt sich selbst/.test(fliessend),
  );
  pruefe(
    'Kneipp/Denkart: die Krankheit gilt als Störung des Gleichgewichts',
    /Gleichgewicht/.test(fliessend) &&
      /Der kranke Mensch ist nicht befallen, er ist aus dem Lot/.test(fliessend),
  );
  const saeulen = ['Wasser', 'Bewegung', 'Ernährung', 'Heilpflanzen', 'Ordnung'];
  for (const saeule of saeulen) {
    pruefe(
      `Kneipp/Denkart: die Säule „${saeule}" kommt im Text vor`,
      new RegExp(saeule).test(fliessend),
    );
  }
  pruefe(
    'Kneipp/Denkart: mindestens zwei der fünf Säulen stehen im Text',
    saeulen.filter((s) => new RegExp(s).test(fliessend)).length >= 2,
  );
  pruefe(
    'Kneipp/Denkart: die fünf Säulen werden als spätere Ordnung gekennzeichnet',
    /Die Einteilung in „fünf Säulen" hat Kneipp so nicht aufgeschrieben/.test(
      fliessend,
    ),
  );
  pruefe(
    'Kneipp/Denkart: die Krankheit des Studenten wird erzählt',
    /Lungenleiden/.test(fliessend) &&
      /1849/.test(fliessend) &&
      /Donau/.test(fliessend),
  );
  pruefe(
    'Kneipp/Denkart: die Anwendungen sind konkret beschrieben',
    /Knieguss/.test(fliessend) &&
      /Wassertreten/.test(fliessend) &&
      /Wickel/.test(fliessend) &&
      /Taulaufen/.test(fliessend),
  );
  pruefe(
    'Kneipp/Denkart: die Regeln der milden Anwendung stehen da',
    /Kalt nur auf den warmen Körper/.test(fliessend) &&
      /Kurz, nicht lang/.test(fliessend),
  );

  // (b) Die Begründungslogik: mindestens zwei „Weshalb"-Fragen müssen im
  //     Text wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Weshalb kaltes Wasser? (der Reiz und die Gegenbewegung des Körpers)',
      /Weshalb kaltes Wasser\?/.test(fliessend) &&
        /Reiz/.test(fliessend) &&
        /Der Körper antwortet mit einer \*\*Gegenbewegung\*\*/.test(fliessend) &&
        /Nicht die Anwendung wirkt, sondern die Reaktion auf die Anwendung/.test(
          fliessend,
        ),
    ],
    [
      'Weshalb Bewegung? (der Körper ist für Bewegung gebaut)',
      /Weshalb Bewegung\?/.test(fliessend) &&
        /Weil der Körper für Bewegung gebaut ist/.test(fliessend),
    ],
    [
      'Weshalb Ernährung? (was täglich hineingeht, wirkt am stärksten)',
      /Weshalb Ernährung\?/.test(fliessend) &&
        /Was täglich hineingeht, wirkt stärker/.test(fliessend),
    ],
    [
      'Weshalb Heilpflanzen? (stützen statt erzwingen)',
      /Weshalb Heilpflanzen\?/.test(fliessend) &&
        /stützen, statt zu erzwingen/.test(fliessend),
    ],
    [
      'Weshalb Ordnung? (die Lebensweise ist die Ursache)',
      /Weshalb Ordnung\?/.test(fliessend) &&
        /die Lebensweise die Ursache ist/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Kneipp/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Kneipp/Denkart: mindestens zwei Weshalb-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );

  // (c) Die ehrliche Wirkungsbilanz — belegt, schwach belegt, unbelegt.
  pruefe(
    'Kneipp/Denkart: die Wirkungsbilanz trennt Belegtes von Unbelegtem',
    /Was gut belegt ist/.test(fliessend) &&
      /Was schwach belegt ist/.test(fliessend) &&
      /Was gar nicht belegt ist/.test(fliessend),
  );
  pruefe(
    'Kneipp/Denkart: die heutigen Entsprechungen der Säulen sind genannt',
    /Weltgesundheitsorganisation/.test(fliessend) &&
      /hundertfünfzig Minuten/.test(fliessend) &&
      /PREDIMED/.test(fliessend) &&
      /Chronobiologie/.test(fliessend),
  );

  // =========================================================================
  // 5. Die Brücke zur Betreiber-These (Kapitel 18)
  // =========================================================================

  pruefe(
    'Kneipp/Brücke: Bewegung, Ernährung und Lebensordnung stehen zusammen',
    /Bewegung\. Ernährung\. Ordnung/.test(fliessend) &&
      /Schlaf, Maß, wenig Sorge und Menschen um sich/.test(fliessend),
  );
  pruefe(
    'Kneipp/Brücke: „keine Raketenwissenschaft" steht im Text',
    /keine Raketenwissenschaft/i.test(fliessend),
  );
  pruefe(
    'Kneipp/Brücke: die Forschung zum Lebensstil ist mit Belegen benannt',
    /siebzig bis achtzig Prozent/.test(fliessend) &&
      /DiRECT/.test(fliessend) &&
      /Typ-2-Diabetes/.test(fliessend),
  );
  pruefe(
    'Kneipp/Brücke: die Gegenseite (die Strukturen) wird fair benannt',
    /Es ist leicht gesagt/.test(fliessend) &&
      /Schichtdienst/.test(fliessend) &&
      /Lebensmittelindustrie/.test(fliessend),
  );
  pruefe(
    'Kneipp/Brücke: die Selbstverantwortung wird nicht zur Schuldzuweisung',
    /Werkzeug, um Kranken die Schuld an ihrer Krankheit zu geben/.test(fliessend),
  );
  pruefe(
    'Kneipp/Brücke: das nächste Kapitel wird angekündigt',
    /Kapitel 18 dieses Buches, „Die einfache Medizin"/.test(fliessend),
  );

  // =========================================================================
  // 6. Die ehrlichen Grenzen — von der eigenen Seite benannt
  //    (TONE-Regel und Zusatzregel für sensible Themen)
  // =========================================================================

  const unbequemeStellen = [
    [
      'die fehlende Evidenz für die einzelnen Anwendungen',
      /die fehlende Evidenz/.test(fliessend) &&
        /Einen belastbaren Wirksamkeitsnachweis im heutigen Sinne gibt es für die meisten Anwendungen nicht/.test(
          fliessend,
        ),
    ],
    [
      'die Wundermittel-Versprecher am Rand der eigenen Seite',
      /Wundermittel-Versprecher/.test(fliessend) &&
        /Heilung versprechen/.test(fliessend),
    ],
    [
      'die Scharlatanerie in den eigenen Reihen',
      /Es gibt Scharlatanerie in der Naturheilkunde, und sie ist gefährlich/.test(
        fliessend,
      ),
    ],
    [
      'die Gefahr des zu späten Arztbesuchs',
      /die verlorene Zeit/.test(fliessend) &&
        /gehört sofort zum Arzt/.test(fliessend) &&
        /Wo die Zeit über Leben entscheidet, hört meine Zuständigkeit auf/.test(
          fliessend,
        ),
    ],
    [
      'die harten Wasserkuren des frühen 19. Jahrhunderts',
      /Die Wasserkuren dieser Jahrzehnte waren oft brutal/.test(fliessend) &&
        /Prießnitz/.test(fliessend),
    ],
    [
      '„pflanzlich" heißt nicht „harmlos"',
      /„Pflanzlich" heißt nicht „harmlos"/.test(fliessend) &&
        /Johanniskraut schwächt die Wirkung/.test(fliessend),
    ],
    [
      'aus der billigen Idee wurde ein Geschäft',
      /aus der Idee wurde ein Geschäft/i.test(fliessend) &&
        /Wellness/.test(fliessend) &&
        /Kneipps Heilkunde war für Arme gedacht/.test(fliessend),
    ],
    [
      'die Bequemlichkeit des Ganzheitlichen',
      /Wer alles erklären kann, erklärt nichts/.test(fliessend),
    ],
    [
      'die Selbstheilung von 1849 ist ein Bericht, kein Nachweis',
      /Das ist keine belegte Heilung\. Das ist ein Bericht/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of unbequemeStellen) {
    pruefe(`Kneipp/Grenzen: ${name} steht im Text`, erfuellt);
  }
  pruefe(
    'Kneipp/Grenzen: die Stimme benennt mindestens fünf unbequeme Stellen selbst',
    unbequemeStellen.filter(([, erfuellt]) => erfuellt).length >= 5,
  );

  // TONE-Regel: Die Naturheilkunde wird nicht belächelt — und sie belächelt
  // die andere Seite auch nicht.
  pruefe(
    'Kneipp/TONE: die andere Denkart wird nicht abgewertet',
    !/(rückständig|primitiv|barbarisch|lächerlich|Hokuspokus|Spinner|Schwurbl|Pharmamafia)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'Kneipp/TONE: kein Heilversprechen',
    !/(heilt alles|garantiert sicher|völlig risikolos|immer wirksam|Wunderheilung)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'Kneipp/TONE: die Stimme gibt zu, was sie nicht weiß',
    /Ich kann das nicht ausschließen, und ich tue nicht so, als könnte ich es/.test(
      fliessend,
    ),
  );

  // =========================================================================
  // 7. Die Anfeindung — und die Beweggründe der anderen Seite
  // =========================================================================

  pruefe(
    'Kneipp/Anfeindung: der Spott über den „Wasserpfarrer" steht da',
    /„Wasserpfarrer" war kein Ehrentitel/.test(fliessend) &&
      /Kurpfuscherei/.test(fliessend),
  );
  pruefe(
    'Kneipp/Anfeindung: die Kurierfreiheit von 1869/1871 erklärt die Rechtslage',
    /Kurierfreiheit/.test(fliessend) &&
      /Gewerbeordnung/.test(fliessend) &&
      /1869/.test(fliessend),
  );
  pruefe(
    'Kneipp/Anfeindung: das Heilpraktikergesetz von 1939 wird nicht verschwiegen',
    /Heilpraktikergesetz/.test(fliessend) &&
      /1939/.test(fliessend) &&
      /unbequeme Tatsache/.test(fliessend),
  );
  pruefe(
    'Kneipp/Anfeindung: die Beweggründe der Ärzte werden fair wiedergegeben',
    /Die Ärzte hatten Gründe/.test(fliessend) &&
      /Dieser Einwand war nicht Standesdünkel, er war berechtigt/.test(fliessend),
  );
  pruefe(
    'Kneipp/Anfeindung: Kneipp wird nicht als Gegner der Ärzte dargestellt',
    /Er war kein Feind der Schulmedizin/.test(fliessend) &&
      /Baumgarten/.test(fliessend) &&
      /bei ernsten Krankheiten an Ärzte verwiesen/i.test(fliessend),
  );
  pruefe(
    'Kneipp/Anfeindung: er wird auch nicht zum Wunderheiler verklärt',
    /Er war kein Wunderheiler/.test(fliessend) &&
      /Und er hat nie behauptet, es bewiesen zu haben/.test(fliessend),
  );

  // =========================================================================
  // 8. KEINE GERÜCHTE (Betreiber-Entscheid 25.08.2026)
  // =========================================================================

  const belegteEckdaten = [
    ['Stefansried, 17. Mai 1821', /Am 17\. Mai 1821 wird in Stefansried Sebastian Kneipp geboren/],
    ['Kaplan Merkle und Grönenbach', /Kaplan Matthias Merkle/],
    ['Dillingen ab 1844', /1844 wird Kneipp in das Gymnasium in Dillingen an der Donau aufgenommen/],
    ['Hahns Wasserbuch von 1738', /Johann Siegmund Hahn \(1696–1773\)/],
    ['die Priesterweihe am 6. August 1852', /am 6\. August 1852 wird er in Augsburg zum Priester geweiht/],
    ['Wörishofen ab Mai 1855', /Im Mai 1855 wird Kneipp als Beichtvater der Dominikanerinnen nach Wörishofen versetzt/],
    ['„Meine Wasserkur" 1886', /1886 erscheint bei Kösel in Kempten „Meine Wasserkur"/],
    ['der Tod am 17. Juni 1897', /Am 17\. Juni 1897 stirbt Sebastian Kneipp in Wörishofen/],
  ];
  for (const [name, muster] of belegteEckdaten) {
    pruefe(`Kneipp/Belege: ${name} steht im Text`, muster.test(fliessend));
  }
  pruefe(
    'Kneipp/Belege: die Diagnose der Studentenkrankheit ist als ungesichert gekennzeichnet',
    /Diese Diagnose ist historisch nicht gesichert/.test(fliessend),
  );
  pruefe(
    'Kneipp/Belege: Überliefertes ist als Überlieferung gekennzeichnet',
    /Nach der Überlieferung brennt 1841 das Elternhaus ab/.test(fliessend),
  );
  pruefe(
    'Kneipp/Belege: auch die Cholera-Wirkung bleibt offen',
    /Was diese Anwendungen medizinisch bewirkt haben, weiß ich nicht, und ich behaupte es auch nicht/.test(
      fliessend,
    ),
  );
  pruefe(
    'Kneipp/Belege: schwankende Besucherzahlen werden nicht als feste Zahl behauptet',
    /die genauen Zahlen gehen in den Quellen auseinander/.test(fliessend),
  );

  // =========================================================================
  // 9. Der Innovations-Zyklus (roter Faden, CLAUDE.md 26.08.2026)
  // =========================================================================

  pruefe(
    'Kneipp/Zyklus: das Muster des Buches wird benannt',
    /Das Neue schadet oft erst, bevor es segensreich wird/.test(fliessend) &&
      /die Chirurgie tötete durch Wundfieber, ehe sie rettete/i.test(fliessend),
  );
  pruefe(
    'Kneipp/Zyklus: bei der Naturheilkunde verläuft er anders',
    /Bei der Naturheilkunde verläuft der Zyklus anders/.test(fliessend) &&
      /sie war von Anfang an sanft/i.test(fliessend),
  );
  pruefe(
    'Kneipp/Zyklus: die zwei eigenen Schadensquellen werden benannt',
    /Härte der frühen Wasserdoktoren/.test(fliessend) &&
      /sobald sich Geld damit verdienen lässt/.test(fliessend),
  );

  // =========================================================================
  // 10. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Schulmedizin) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Kneipp/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1821/.test(perspektivenText) &&
      /1844/.test(perspektivenText) &&
      /1849/.test(perspektivenText) &&
      /1852/.test(perspektivenText) &&
      /1855/.test(perspektivenText) &&
      /1886/.test(perspektivenText) &&
      /1897/.test(perspektivenText),
  );
  pruefe(
    'Kneipp/Erzähl-Muster: (a2) die Orte werden genannt',
    /Stefansried/.test(perspektivenText) &&
      /Grönenbach/.test(perspektivenText) &&
      /Dillingen/.test(perspektivenText) &&
      /Augsburg/.test(perspektivenText) &&
      /Boos/.test(perspektivenText) &&
      /Wörishofen/.test(perspektivenText),
  );
  pruefe(
    'Kneipp/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /Denkart/.test(perspektivenText) &&
      /Selbstheilungskraft/.test(perspektivenText) &&
      /Reiz/.test(perspektivenText) &&
      /Abhärtung/.test(perspektivenText),
  );
  pruefe(
    'Kneipp/Erzähl-Muster: (c1) welche Wirkungen es hatte — was blieb',
    /Kurort/.test(perspektivenText) &&
      /UNESCO/.test(perspektivenText) &&
      /Leitlinien/.test(perspektivenText),
  );
  pruefe(
    'Kneipp/Erzähl-Muster: (c2) und die Grenzen',
    /Evidenz/.test(perspektivenText) &&
      /Scharlatanerie/.test(perspektivenText) &&
      /verlorene Zeit/.test(perspektivenText),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Kneipp: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Kneipp: die Tür führt zur Schulmedizin',
    /Die zweite Stimme dieses Kapitels gehört der Schulmedizin/.test(fliessend),
  );
  pruefe(
    'Kneipp: die Tür nennt, was die zweite Stimme mitbringt',
    /Zeig mir die Studie/.test(fliessend) &&
      /Studienlage/.test(fliessend) &&
      /Diagnose kein Gefühl mehr sein darf/.test(fliessend),
  );
  pruefe(
    'Kneipp: die zweite Stimme darf auch ihre eigenen dunklen Stellen aufmachen',
    /auch ihre eigenen dunklen Stellen aufmachen/.test(fliessend) &&
      /verspottet hat, statt ihn zu prüfen/.test(fliessend) &&
      /ohne den Namen dessen zu nennen/.test(fliessend),
  );
  pruefe(
    'Kneipp: die offene Frage des Kapitels steht am Ende',
    /Was heilt mehr — die Pille oder die Lebensweise\?/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Kneipp/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Kneipp/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Kneipp/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus|Unsinn|wirkungslos)/i.test(
        frage.frage,
      ),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Kneipp/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Kneipp/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 18)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Kneipp/Synthese: sagt, welche Stimme noch kommt',
      /Schulmedizin/.test(thema.synthese) &&
        /(Studienlage|Evidenz)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Kneipp/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Kneipp/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Kneipp/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
