// Prüfungen für Kapitel 13 — „Pasteur und Lister" und seine Karte.
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
//      Der Ausschnitt umfasst 19° Länge, deshalb die Toleranz von 0,4°.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen die Keime und die Keimtheorie stehen, die
//      Gärung und der Streit um die Urzeugung — und die Begründungslogik
//      muss ausgeführt sein: warum die Gärung, warum der Staub in der Luft,
//      warum die Urzeugung fallen musste, warum die Ursache vor der Heilung
//      kommt, warum abgeschwächt statt abgetötet wird.
//
//   3. **Die ehrlichen Grenzen (TONE-Regel und Zusatzregel für sensible
//      Themen).** Die Stimme des Labors muss die unbequemen Stellen SELBST
//      benennen: die Inszenierung von Pouilly-le-Fort und den Impfstoff,
//      über den anders gesprochen wurde, als er war (Geison 1995); die
//      Tollwut-Impfung an einem Kind ohne jede Vorprüfung am Menschen; die
//      zwei verschwiegenen Behandlungen davor; „Chemiker, kein Arzt"; den
//      rhetorisch gewonnenen Streit mit Pouchet; und die Blindstelle der
//      eigenen Denkart (der Keim erklärt nicht den Menschen).
//
//   4. **Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026).** Zwei
//      bekannte Erzählungen um Pasteur sind nicht belegt — der angebliche
//      Satz auf dem Sterbebett und die verbreitete Deutung von Joseph
//      Meisters Tod 1940. Beide müssen im Text ausdrücklich als
//      unbestätigt gekennzeichnet sein.
//
//   5. **Die Längenregel, umgekehrt (Betreiber-Vorgabe 24.08.2026).** Ab
//      Kapitel 9 gilt: vollständig und ausführlich. Nach oben bleibt eine
//      großzügige Grenze stehen, damit „ausführlich" nicht in „aufgebläht"
//      kippt.
//
//   6. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, Quiz-Umfang,
//      offene Urteilsfrage, Lernformat, die Brücke zu Semmelweis aus
//      Kapitel 9 und die offene Tür zur zweiten Stimme (Lister).
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 10: Die zweite
// Perspektive (die Klinik) und die endgültige Synthese kommen erst mit dem
// Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten, hängen
// deshalb an ihrer id („pasteur"); die Prüfungen zum Erzähl-Muster laufen
// über ALLE Perspektiven zusammen. Die Synthese wird je nach Ausbaustand
// verzweigt gemessen.
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
} = require('../utils/themen/karten/pasteur-lister.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt umfasst 19° Länge — zwischen dem engen Blatt von
 * Kapitel 10 (14°, Toleranz 0,3°) und dem weiten von Kapitel 9 (30°,
 * Toleranz 0,5°). 0,4° sind hier rund fünfzehn Bildpunkte in der
 * Waagerechten.
 */
const KUESTEN_TOLERANZ = 0.4;

/**
 * Mindestumfang der ersten Perspektive (Neuzeit-Regel, Kapitel 9 ff.).
 *
 * Die frühen Kapitel durften höchstens ~250 Zeilen je Stimme haben; ab
 * Kapitel 9 gilt die Umkehrung — vollständig und ausführlich.
 */
const MIN_ZEILEN_ERSTE_STIMME = 350;

/** Obergrenze fürs ganze Kapitel — ausführlich ja, aufgebläht nein. */
const MAX_ZEILEN_KAPITEL = 1500;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 10: Ein
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
 * Dieser Ausschnitt hat drei Landflächen: das Festland (Frankreich, die
 * Niederlande, die Nordseeküste), Großbritannien und Irland.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge in Schottland genauso
 * „lang" wie in der Gascogne; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('pasteur-lister');
  pruefe(
    'Pasteur: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 11
  // steht hinter Jenner (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Pasteur: steht in der App hinter „Jenner und die Impfung"',
    alleThemen.findIndex((t) => t.id === 'pasteur-lister') ===
      alleThemen.findIndex((t) => t.id === 'jenner-impfung') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Pasteur/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Pasteur/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss Paris, Arbois im Jura, Lille, Glasgow, Edinburgh und London auf
  // dasselbe Blatt bringen — sonst wird die Reise der Idee nicht sichtbar.
  pruefe(
    'Pasteur/Karte: der Ausschnitt reicht vom Atlantik bis an den Rhein',
    RAHMEN.minLon <= -8 && RAHMEN.maxLon >= 6,
  );
  pruefe(
    'Pasteur/Karte: der Ausschnitt reicht vom Jura bis nach Nordschottland',
    RAHMEN.minLat <= 46.5 && RAHMEN.maxLat >= 56.5,
  );
  pruefe('Pasteur/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Pasteur/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Brighton (Ärmelkanal)', -0.14, 50.82, kuesten.grossbritannien],
    ['Falmouth (Cornwall)', -5.07, 50.15, kuesten.grossbritannien],
    ['Weymouth (Dorset)', -2.45, 50.61, kuesten.grossbritannien],
    ['Portsmouth (Solent)', -1.09, 50.8, kuesten.grossbritannien],
    ['Grimsby (Humber)', -0.08, 53.57, kuesten.grossbritannien],
    ['Swansea (Wales)', -3.94, 51.62, kuesten.grossbritannien],
    ['Blackpool (Irische See)', -3.05, 53.82, kuesten.grossbritannien],
    ['Greenock (Firth of Clyde)', -4.75, 55.95, kuesten.grossbritannien],
    ['Aberdeen (Nordostschottland)', -2.09, 57.15, kuesten.grossbritannien],
    ['Kinsale (Südirland)', -8.52, 51.7, kuesten.irland],
    ['Rosslare (Südostirland)', -6.34, 52.25, kuesten.irland],
    ['Belfast (Nordirland)', -5.93, 54.6, kuesten.irland],
    ['Arcachon (Biskaya)', -1.17, 44.66, kuesten.festland],
    ['Rochefort (Charente)', -0.96, 45.94, kuesten.festland],
    ['Le Croisic (Loiremündung)', -2.51, 47.29, kuesten.festland],
    ['Brest (Bretagne)', -4.49, 48.39, kuesten.festland],
    ['Saint-Malo (Bretagne)', -2.02, 48.65, kuesten.festland],
    ['Cherbourg (Normandie)', -1.62, 49.64, kuesten.festland],
    ['Dünkirchen (Flandern)', 2.2, 51.03, kuesten.festland],
    ['Zeebrügge (Belgien)', 3.2, 51.33, kuesten.festland],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Pasteur/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb einer Landfläche liegen ----------------
  const binnenorte = [
    ['Paris', 2.349, 48.857],
    ['Dole', 5.5, 47.09],
    ['Arbois', 5.775, 46.903],
    ['Besançon', 6.02, 47.24],
    ['Lille', 3.063, 50.633],
    ['Melun (Pouilly-le-Fort)', 2.66, 48.54],
    ['Meissengott (Elsass)', 7.35, 48.42],
    ['Straßburg', 7.75, 48.58],
    ['Lyon', 4.84, 45.76],
    ['Bordeaux', -0.58, 44.84],
    ['Köln', 6.96, 50.94],
    ['Glasgow', -4.252, 55.861],
    ['Edinburgh', -3.188, 55.953],
    ['London', -0.128, 51.508],
    ['Dublin', -6.26, 53.35],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Pasteur/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['der Ärmelkanal', 0.5, 50.3],
    ['der westliche Ärmelkanal', -3.0, 49.9],
    ['der Golf von Biskaya', -4.0, 45.5],
    ['die Nordsee', 2.5, 54.0],
    ['die nördliche Nordsee', 3.5, 56.5],
    ['die Irische See', -5.3, 53.6],
    ['die Keltische See', -7.5, 50.5],
    ['der Firth of Clyde', -5.0, 55.5],
    ['der Atlantik westlich Irlands', -9.8, 53.0],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Pasteur/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Pasteur/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Pasteur/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\b(1[6-9]\d\d|20\d\d)\b/.test(phase.label),
    );
    pruefe(
      `Pasteur/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Pasteur/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: die Gärung und die Urzeugung,
  // die Karbolsäure, die Impfstoffe, die Tollwut, das Institut.
  pruefe(
    'Pasteur/Karte: eine Phase zeigt die Gärung und die Urzeugung (1864)',
    karte.phasen.some(
      (p) =>
        /1864/.test(p.label) &&
        /Gärung/.test(p.label + p.hinweis) &&
        /Urzeugung/.test(p.label + p.hinweis) &&
        /Schwanenhals/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pasteur/Karte: eine Phase zeigt Lister und die Karbolsäure in Glasgow',
    karte.phasen.some(
      (p) =>
        /186[5-7]/.test(p.label) &&
        /Karbolsäure/.test(p.label + p.hinweis) &&
        /Glasgow/.test(p.label + p.hinweis) &&
        /Lister/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pasteur/Karte: die Glasgow-Phase nennt die Zahlen (45 auf 15 Prozent)',
    karte.phasen.some((p) => /45/.test(p.hinweis) && /15 Prozent/.test(p.hinweis)),
  );
  pruefe(
    'Pasteur/Karte: eine Phase zeigt Pouilly-le-Fort 1881',
    karte.phasen.some(
      (p) =>
        /1881/.test(p.label) &&
        /Pouilly-le-Fort/.test(p.label + p.hinweis) &&
        /Milzbrand/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pasteur/Karte: die Pouilly-Phase sagt auch, was die Notizbücher zeigen',
    karte.phasen.some(
      (p) => /1881/.test(p.label) && /Notizbücher/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pasteur/Karte: eine Phase zeigt die Tollwut-Impfung von 1885',
    karte.phasen.some(
      (p) =>
        /1885/.test(p.label) &&
        /Joseph Meister/.test(p.label + p.hinweis) &&
        /nie aber an einem Menschen|nie zuvor an einem Menschen/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pasteur/Karte: eine Phase zeigt das Institut von 1888',
    karte.phasen.some(
      (p) => /1888/.test(p.label + p.hinweis) && /Institut/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Pasteur/Karte: die Phasen laufen von der Gärung bis zum Institut',
    karte.phasen[0].id === 'gaerung-1864' &&
      karte.phasen[karte.phasen.length - 1].id === 'institut-1888',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Pasteur/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch|Betrüger)/i.test(
      phasenText,
    ),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['paris', 2.349, 48.857],
    ['arbois', 5.775, 46.903],
    ['lille', 3.063, 50.633],
    ['pouilly-le-fort', 2.677, 48.51],
    ['glasgow', -4.252, 55.861],
    ['edinburgh', -3.188, 55.953],
    ['london', -0.128, 51.508],
  ];
  pruefe(
    'Pasteur/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Pasteur/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Pasteur/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Pasteur/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Pasteur/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Pasteur/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die vier Pole des Kapitels: das Labor, die Heimat, der öffentliche
  // Versuch und die Klinik.
  const parisPunkt = karte.punkte.find((p) => p.id === 'paris');
  pruefe(
    'Pasteur/Karte: der Punkt Paris nennt die Urzeugung, 1885 und das Institut 1888',
    Boolean(
      parisPunkt &&
        /Urzeugung/.test(parisPunkt.text) &&
        /1885/.test(parisPunkt.text) &&
        /1888/.test(parisPunkt.text),
    ),
  );
  const arboisPunkt = karte.punkte.find((p) => p.id === 'arbois');
  pruefe(
    'Pasteur/Karte: der Punkt Arbois nennt Dole, 1822 und das Pasteurisieren',
    Boolean(
      arboisPunkt &&
        /Dole/.test(arboisPunkt.text) &&
        /1822/.test(arboisPunkt.text) &&
        /Pasteurisieren/.test(arboisPunkt.text),
    ),
  );
  const pouillyPunkt = karte.punkte.find((p) => p.id === 'pouilly-le-fort');
  pruefe(
    'Pasteur/Karte: der Punkt Pouilly-le-Fort nennt Rossignol und die Inszenierung',
    Boolean(
      pouillyPunkt &&
        /Rossignol/.test(pouillyPunkt.text) &&
        /inszeniert/.test(pouillyPunkt.text),
    ),
  );
  const glasgowPunkt = karte.punkte.find((p) => p.id === 'glasgow');
  pruefe(
    'Pasteur/Karte: der Punkt Glasgow nennt Lister, 1865 und die Karbolsäure',
    Boolean(
      glasgowPunkt &&
        /Lister/.test(glasgowPunkt.text) &&
        /1865/.test(glasgowPunkt.text) &&
        /Karbolsäure/.test(glasgowPunkt.text),
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
    `Pasteur/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Pasteur/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Pasteur/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Pasteur/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern eine Idee, ein
    // Verfahren und ein gebissenes Kind.
    pruefe(
      `Pasteur/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /Keimtheorie|Antiseptik|Gärung|tollwütig|Behandlung/.test(bewegung.text),
    );
  }
  const wegDerIdee = (karte.bewegungen || []).find((b) => b.id === 'aufsatz-nach-glasgow');
  pruefe(
    'Pasteur/Karte: der Weg der Idee führt von Paris nach Glasgow',
    Boolean(wegDerIdee) &&
      wegDerIdee.von[0] === P.punkt(2.349, 48.857)[0] &&
      wegDerIdee.von[1] === P.punkt(2.349, 48.857)[1] &&
      wegDerIdee.nach[0] === P.punkt(-4.252, 55.861)[0] &&
      wegDerIdee.nach[1] === P.punkt(-4.252, 55.861)[1],
  );
  pruefe(
    'Pasteur/Karte: der Weg der Idee sagt, dass es eine Lektüre war',
    Boolean(wegDerIdee) && /liest|Lektüre/.test(wegDerIdee.text),
  );
  const wegDerAntiseptik = (karte.bewegungen || []).find(
    (b) => b.id === 'antiseptik-nach-london',
  );
  pruefe(
    'Pasteur/Karte: der Weg der Antiseptik führt über Edinburgh nach London',
    Boolean(wegDerAntiseptik) &&
      wegDerAntiseptik.nach[0] === P.punkt(-0.128, 51.508)[0] &&
      wegDerAntiseptik.nach[1] === P.punkt(-0.128, 51.508)[1] &&
      /Edinburgh/.test(wegDerAntiseptik.text),
  );
  const wegDesJungen = (karte.bewegungen || []).find((b) => b.id === 'meister-nach-paris');
  pruefe(
    'Pasteur/Karte: der Weg Joseph Meisters endet in Paris',
    Boolean(wegDesJungen) &&
      wegDesJungen.nach[0] === P.punkt(2.349, 48.857)[0] &&
      wegDesJungen.nach[1] === P.punkt(2.349, 48.857)[1] &&
      /1885/.test(wegDesJungen.text),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Frankreich',
    'England',
    'Schottland',
    'Irland',
    'Ärmelkanal',
    'Nordsee',
    'Alpen',
    'Jura',
    'Paris',
  ]) {
    pruefe(`Pasteur/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Pasteur: Titel und Epoche stehen',
    thema.titel === 'Pasteur und Lister' && thema.epoche === '~1860–1880',
  );
  pruefe('Pasteur: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Pasteur: der Aufhänger nennt die drei Rätsel des Chemikers',
    /Wein/.test(thema.aufhaenger.frage) &&
      /Seidenraupen/.test(thema.aufhaenger.frage) &&
      /Gärung/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Pasteur: der Aufhänger nennt Glasgow, die Karbolsäure und die Zahlen',
    /Glasgow/.test(thema.aufhaenger.text) &&
      /Karbolsäure/.test(thema.aufhaenger.text) &&
      /(Hälfte|Sechstel)/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Pasteur: der Aufhänger schlägt die Brücke zu Semmelweis (Kapitel 9)',
    /Semmelweis/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Pasteur: der Aufhänger kündigt beide Seiten an (Triumph UND Preis)',
    /inszeniert/.test(thema.aufhaenger.text) &&
      /nie zuvor an einem Menschen geprüft/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Pasteur: der Aufhänger ist neutral formuliert (keine Vorverurteilung)',
    !/(Betrüger|Scharlatan|Lüge|Wahnsinn|Verbrecher)/i.test(thema.aufhaenger.text),
  );
  pruefe('Pasteur: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Pasteur: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn|verantwortungslos)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Pasteur: der Hinweis zum Urteil lässt beide Richtungen offen',
    /kein Richtig und kein Falsch/.test(thema.urteil.hinweis) &&
      /Risiko/.test(thema.urteil.hinweis),
  );
  pruefe(
    'Pasteur: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Pasteur/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Pasteur/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const laborStimme = thema.perspektiven.find((p) => p.id === 'pasteur');
  pruefe(
    'Pasteur: die Stimme des Labors ist die erste Perspektive',
    thema.perspektiven[0] === laborStimme,
  );
  if (!laborStimme) return;

  pruefe(
    'Pasteur: die erste Perspektive ist Opus zugeschrieben',
    laborStimme.stimme === 'Opus',
  );
  pruefe(
    'Pasteur: die erste Perspektive heißt nach ihrer Sicht',
    /Labor/.test(laborStimme.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt
  // =========================================================================

  const zeilenErsteStimme = laborStimme.text.split('\n').length;
  pruefe(
    `Pasteur/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'Pasteur/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 20000 Zeichen)',
    laborStimme.text.length > 20000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Pasteur/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = laborStimme.text.replace(/\s+/g, ' ');

  const ueberschriften = laborStimme.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Pasteur: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 10,
  );
  pruefe(
    'Pasteur: die Abschnitte bleiben überschaubar (höchstens sechzehn)',
    ueberschriften.length <= 16,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 11 darf
  // keine der elf bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf,
  // Kapitel 4 schreibt Briefe, Kapitel 5 folgt einem Buch von Station zu
  // Station, Kapitel 6 geht als Rundgang durch ein Haus, Kapitel 7
  // verhandelt vor Gericht, Kapitel 8 rechnet, Kapitel 9 liest die Uhr,
  // Kapitel 10 geht eine Kette ab. Dieses Kapitel legt PRÄPARATE unter ein
  // MIKROSKOP: ein Tropfen kranker Rübensaft, der Staub der Luft, der Hals
  // einer Flasche, eine Seidenraupe, Blut, Rückenmark.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 9 (keine Uhr)',
    !/^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/^## Sekunde /.test(h)),
  );
  pruefe(
    'Pasteur: die Abschnittsstruktur ist eine andere als in Kapitel 10 (keine Kette)',
    !/^## Die Kette/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Glied/.test(h)),
  );
  pruefe(
    'Pasteur: die Dramaturgie ist ein Mikroskop (Präparate unter der Linse)',
    /^## Die Linse/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /Präparat/.test(h)).length >= 5 &&
      /## Das erste Präparat/.test(laborStimme.text) &&
      /Auf dem Tisch steht ein Mikroskop/.test(fliessend),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Pasteur: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Die Keime: das, was unter der Linse liegt.
  pruefe(
    'Pasteur/Denkart: die Keimtheorie steht mit ihrem Gegenstand da',
    /Keimtheorie/.test(fliessend) &&
      /(Keime|Erreger|Lebewesen)/.test(fliessend) &&
      /Die Luft ist nicht leer/.test(fliessend),
  );
  pruefe(
    'Pasteur/Denkart: die Miasmen-Lehre wird als abgelöste Erklärung benannt',
    /Miasmen/.test(fliessend) &&
      /Nicht der Geruch macht krank/.test(fliessend),
  );

  // (b) Die Gärung: der Ausgangspunkt.
  pruefe(
    'Pasteur/Denkart: die Gärung steht am Anfang (Lille, Bigo, Hefe und Stäbchen)',
    /Gärung/.test(fliessend) &&
      /Lille/.test(fliessend) &&
      /Bigo/.test(fliessend) &&
      /Hefe/.test(fliessend),
  );
  pruefe(
    'Pasteur/Denkart: der Kernsatz der Übertragung steht wörtlich da',
    /Was die Gärung für den Wein ist, ist die Krankheit für den Menschen/.test(
      fliessend,
    ),
  );
  pruefe(
    'Pasteur/Denkart: der Streit um die Urzeugung wird erklärt (Pouchet, Schwanenhals, 1864)',
    /Urzeugung/.test(fliessend) &&
      /Pouchet/.test(fliessend) &&
      /Schwanenhals/.test(fliessend) &&
      /7. April 1864/.test(fliessend),
  );

  // (c) Die große Ablösung der Denkart: Gleichgewicht → Ursache.
  pruefe(
    'Pasteur/Denkart: die alte Denkart des Gleichgewichts wird benannt (Säfte, Qi, Doshas)',
    /Gleichgewicht/.test(fliessend) &&
      /vier Säfte/.test(fliessend) &&
      /Qi/.test(fliessend) &&
      /Doshas/.test(fliessend),
  );
  pruefe(
    'Pasteur/Denkart: der Bruch steht wörtlich da (Krankheit als Eindringling)',
    /Die Krankheit ist ein Eindringling, kein Gleichgewicht/.test(fliessend),
  );
  pruefe(
    'Pasteur/Denkart: das Experiment ist der Richter (der vorbereitete Geist)',
    /Der Versuch ist der Richter/.test(fliessend) &&
      /Der Zufall begünstigt nur den vorbereiteten Geist/.test(fliessend),
  );

  // (d) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum ausgerechnet die Gärung? (eine große Wirkung aus einem winzigen Lebewesen)',
      /Warum ausgerechnet die Gärung\?/.test(fliessend) &&
        /eine große, folgenreiche Veränderung, die von einem winzigen Lebewesen ausgeht/.test(
          fliessend,
        ),
    ],
    [
      'Warum ist der Staub in der Luft die entscheidende Beobachtung? (die Miasmen fallen)',
      /Warum ist das die entscheidende Beobachtung\?/.test(fliessend) &&
        /Die Luft ist nicht leer/.test(fliessend),
    ],
    [
      'Warum musste die Urzeugung fallen? (sonst wären Keime Folge statt Ursache)',
      /Warum mussten wir die Urzeugung widerlegen\?/.test(fliessend) &&
        /nicht die Ursache der Fäulnis, sondern ihre Folge/.test(fliessend) &&
        /ob es sich lohnt, ein Messer auszukochen/.test(fliessend),
    ],
    [
      'Warum die Ursache suchen, bevor man heilt? (wer nur lindert, muss ewig lindern)',
      /Die Ursache findet man, bevor man heilt/.test(fliessend) &&
        /wer nur Beschwerden lindert, muss ewig lindern/.test(fliessend),
    ],
    [
      'Warum abschwächen statt abtöten? (der Körper lernt an einem Gegner, der ihn nicht umbringt)',
      /Warum abschwächen statt abtöten\?/.test(fliessend) &&
        /Der Körper lernt an einem Gegner, der ihn nicht umbringt/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Pasteur/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Pasteur/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );

  // =========================================================================
  // 5. Die ehrlichen Grenzen — von der eigenen Seite benannt
  //    (TONE-Regel und Zusatzregel für sensible Themen)
  // =========================================================================

  const unbequemeStellen = [
    [
      'Pouilly-le-Fort war inszeniert (und der Impfstoff ein anderer)',
      /Der Versuch war inszeniert/.test(fliessend) &&
        /Kaliumdichromat/.test(fliessend) &&
        /Gerald Geison/.test(fliessend),
    ],
    [
      'die Unwahrheit über den Impfstoff wird beim Namen genannt',
      /über einen wesentlichen Punkt nicht die Wahrheit gesagt/.test(fliessend),
    ],
    [
      'die Tollwut-Impfung ohne jede Vorprüfung am Menschen',
      /Es gab keine Prüfung am Menschen vor diesem Menschen/.test(fliessend) &&
        /Joseph Meister/.test(fliessend) &&
        /Grancher/.test(fliessend),
    ],
    [
      'die Einwilligung war keine im heutigen Sinn',
      /Die Einwilligung war keine im heutigen Sinn/.test(fliessend),
    ],
    [
      'zwei Behandlungen vor Meister, von denen nicht gesprochen wurde',
      /In den Heften war er es nicht/.test(fliessend),
    ],
    [
      'der Einzelfall beweist weniger, als er scheint',
      /Der Erfolg beweist weniger, als er scheint/.test(fliessend),
    ],
    [
      'Chemiker, kein Arzt',
      /Ich bin Chemiker, kein Arzt/.test(fliessend),
    ],
    [
      'der Streit mit Pouchet wurde auch rhetorisch gewonnen',
      /Wir haben den Streit auch mit den Mitteln des besseren Redners gewonnen/.test(
        fliessend,
      ) && /Pouchets Versuche waren nicht gefälscht/.test(fliessend),
    ],
    [
      'der Nationalstreit mit Robert Koch',
      /Robert Koch/.test(fliessend) &&
        /Der Streit zweier Nationen um die Ehre einer Entdeckung/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of unbequemeStellen) {
    pruefe(`Pasteur/Grenzen: ${name} steht im Text`, erfuellt);
  }
  pruefe(
    'Pasteur/Grenzen: die Stimme benennt mindestens drei unbequeme Stellen selbst',
    unbequemeStellen.filter(([, erfuellt]) => erfuellt).length >= 3,
  );
  pruefe(
    'Pasteur/Grenzen: das gute Ergebnis wird nicht als Rechtfertigung genommen',
    /Das macht es nicht zu einem zulässigen Versuch/.test(fliessend),
  );
  // TONE-Regel: auch was für Pasteur spricht, steht da.
  pruefe(
    'Pasteur/TONE: was für das Labor spricht, steht ebenfalls da',
    /Die Alternative war ein Kind mit vierzehn tiefen Bissen/.test(fliessend) &&
      /Wir haben zwei Ärzte hinzugezogen/.test(fliessend),
  );
  pruefe(
    'Pasteur/TONE: die Größe der Leistung wird nicht kleingeredet',
    /Die Keimtheorie ist die folgenreichste einzelne Einsicht der Medizingeschichte/.test(
      fliessend,
    ),
  );
  pruefe(
    'Pasteur/TONE: der Eigennutz wird nicht gegen die Leistung aufgerechnet',
    /Ein Mann, der recht hat, kann trotzdem eitel sein/.test(fliessend),
  );
  pruefe(
    'Pasteur/TONE: die andere Denkart wird nicht abgewertet',
    !/(rückständig|primitiv|barbarisch|lächerlich|Hokuspokus|Spinner|Schwurbl)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'Pasteur/TONE: kein Heilversprechen',
    !/(heilt alles|garantiert sicher|völlig risikolos|immer wirksam)/i.test(fliessend),
  );

  // =========================================================================
  // 6. KEINE GERÜCHTE (Betreiber-Entscheid 25.08.2026)
  // =========================================================================

  pruefe(
    'Pasteur/Belege: der angebliche Satz vom Sterbebett ist als unbelegt gekennzeichnet',
    /Dieser Satz ist nicht belegt/.test(fliessend) &&
      /unbestätigt/.test(fliessend),
  );
  pruefe(
    'Pasteur/Belege: die Deutung von Meisters Tod 1940 wird nicht wiedergegeben',
    /24. Juni 1940/.test(fliessend) &&
      /nicht bestätigt/.test(fliessend) &&
      /wir geben sie deshalb nicht wieder/.test(fliessend),
  );
  pruefe(
    'Pasteur/Belege: die Quelle für die Laborhefte wird genannt (Geison 1995)',
    /Geison/.test(fliessend) && /1995/.test(fliessend),
  );

  // =========================================================================
  // 7. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Klinik) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Pasteur/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1856/.test(perspektivenText) &&
      /1864/.test(perspektivenText) &&
      /1881/.test(perspektivenText) &&
      /1885/.test(perspektivenText) &&
      /1888/.test(perspektivenText),
  );
  pruefe(
    'Pasteur/Erzähl-Muster: (a2) die Orte werden genannt',
    /Lille/.test(perspektivenText) &&
      /Paris/.test(perspektivenText) &&
      /Pouilly-le-Fort/.test(perspektivenText) &&
      /Glasgow/.test(perspektivenText),
  );
  pruefe(
    'Pasteur/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Denkart|Begründung|Grundfigur)/.test(perspektivenText) &&
      /Eindringling/.test(perspektivenText),
  );
  pruefe(
    'Pasteur/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /Was Bestand hat/.test(perspektivenText) &&
      /(Antiseptik|Asepsis)/.test(perspektivenText) &&
      /Antibiotika/.test(perspektivenText) &&
      /Pasteurisieren/.test(perspektivenText),
  );
  pruefe(
    'Pasteur/Erzähl-Muster: (c2) und die Grenzen',
    /Wo unsere Grenzen liegen/.test(perspektivenText) &&
      /Was offen bleibt/.test(perspektivenText),
  );
  pruefe(
    'Pasteur/Bilanz: die Blindstelle der eigenen Denkart wird benannt',
    /Wir erklären den Erreger. Wir erklären nicht, warum von zehn Menschen/.test(
      fliessend,
    ) && /Claude Bernard/.test(fliessend) && /Béchamp/.test(fliessend),
  );
  pruefe(
    'Pasteur/Bilanz: die Grenze bei den chronischen Krankheiten steht da',
    /Krebs, Diabetes/.test(fliessend),
  );
  pruefe(
    'Pasteur/Bilanz: die Immunologie kam später (das Warum blieb offen)',
    /(Metschnikow|Fresszellen)/.test(fliessend) &&
      /warum\*\* eine Impfung überhaupt|warum eine Impfung überhaupt/.test(fliessend),
  );

  // --- Die Brücke zu Kapitel 9 (Semmelweis) --------------------------------
  pruefe(
    'Pasteur: die Frage des Semmelweis wird ausdrücklich beantwortet',
    /Semmelweis/.test(fliessend) &&
      /zersetzte organische Teilchen/.test(fliessend) &&
      /Semmelweis hatte die Maßnahme ohne die Erklärung/.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Pasteur: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Pasteur: die Tür führt zum Chirurgen Joseph Lister in Glasgow',
    /Sie gehört dem Chirurgen Joseph Lister in Glasgow/.test(fliessend),
  );
  pruefe(
    'Pasteur: die Tür nennt, was die zweite Stimme mitbringt (Karbolsäure, Zahlen, Spott, Asepsis)',
    /Karbolsäure/.test(fliessend) &&
      /fünfundvierzig auf rund fünfzehn/.test(fliessend) &&
      /Spott/.test(fliessend) &&
      /Asepsis/.test(fliessend),
  );
  pruefe(
    'Pasteur: das eigentliche Ereignis wird als Verbindung benannt',
    /Das eigentliche Ereignis dieses Kapitels ist deshalb keine Entdeckung, sondern eine Verbindung/.test(
      fliessend,
    ),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Pasteur/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Pasteur/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Pasteur/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Pasteur/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Pasteur/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 12)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Pasteur/Synthese: sagt, welche Stimme noch kommt',
      /Lister/.test(thema.synthese) &&
        /(Klinik|Karbolsäure|Antiseptik)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Pasteur/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Pasteur/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Pasteur/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
