// Prüfungen für Kapitel 3 — „Indien und der Ayurveda" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Drei Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien der Karte liegen als echte
//      Längen-/Breitengrade im Modul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Hafenstädte auf der gezeichneten Küste, Binnenorte
//      innerhalb der Landflächen, offene See außerhalb. Geprüft werden
//      bewusst Orte, die NICHT selbst Stützpunkte der Linie sind — sonst
//      prüfte der Test nur, ob eine Zahl mit sich selbst übereinstimmt.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück dieses
//      Kapitels: Im Text der ersten Stimme müssen die fünf Elemente und
//      die drei Doshas Vata, Pitta und Kapha vorkommen — und die
//      Begründungslogik muss die „Warum"-Fragen tatsächlich beantworten
//      (Ernährung/Agni, Panchakarma, Kräuter, Diagnose, Tages- und
//      Jahresordnung).
//
//   3. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, ehrliche
//      Wirkungsbilanz in beide Richtungen, Quiz-Umfang, offene
//      Urteilsfrage.
//
// Zustandstolerant gebaut wie bei den Kapiteln 1 und 2: Die zweite
// Perspektive (der Blick von außen — koloniale Verdrängung und
// Wiederentdeckung) und die endgültige Synthese kommen erst mit dem
// Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten, hängen
// deshalb an ihrer id („ayurveda-innen"); die Prüfungen zum Erzähl-Muster
// laufen über ALLE Perspektiven zusammen. Die Synthese wird je nach
// Ausbaustand verzweigt gemessen (siehe unten).
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { erstelleProjektion } = require('../utils/karte-geo.js');
const { pruefeKarte } = require('../utils/themen/schema.js');
const { abschnitteFuer } = require('../utils/lernformat.js');
const { themaNachId } = require('../utils/themen/index.js');
const {
  RAHMEN,
  karte,
  kuesten,
  landflaechen,
} = require('../utils/themen/karten/indien-ayurveda.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Der Ausschnitt des Subkontinents ist 38° breit — etwas weniger als bei
 * Kapitel 2 (52°). Eine halbgradige Toleranz entspricht hier also
 * derselben Strenge auf dem Bildschirm.
 */
const KUESTEN_TOLERANZ = 0.5;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 und 2: Ein
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

/** Liegt der Punkt auf irgendeiner Landmasse der Karte? */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge am Himalaya genauso „lang"
 * wie auf Sri Lanka; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('indien-ayurveda');
  pruefe('Indien: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Indien steht
  // hinter China und der TCM (Themenlandkarte in CLAUDE.md).
  const { alleThemen } = require('../utils/themen/index.js');
  pruefe(
    'Indien: steht in der App hinter „China und die TCM"',
    alleThemen.findIndex((t) => t.id === 'indien-ayurveda') ===
      alleThemen.findIndex((t) => t.id === 'china-tcm') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Indien/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Indien/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss die ganze Halbinsel mit ihrer Südspitze, den Ganges, den
  // Himalaya-Rand und Sri Lanka enthalten.
  pruefe(
    'Indien/Karte: der Ausschnitt reicht von der Makran-Küste bis nach Hinterindien',
    RAHMEN.minLon <= 62 && RAHMEN.maxLon >= 94,
  );
  pruefe(
    'Indien/Karte: der Ausschnitt reicht von Sri Lanka bis über den Himalaya',
    RAHMEN.minLat <= 6 && RAHMEN.maxLat >= 35,
  );
  pruefe('Indien/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Indien/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Ausgewählt sind Häfen, die im Schulatlas eindeutig am Wasser stehen und
  // die NICHT als Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Dwarka (Kathiawar)', 68.97, 22.24, kuesten.festland],
    ['Alibag (bei Mumbai)', 72.87, 18.64, kuesten.festland],
    ['Udupi (Karnataka)', 74.75, 13.34, kuesten.festland],
    ['Alappuzha (Kerala)', 76.34, 9.5, kuesten.festland],
    ['Cuddalore (Coromandel)', 79.77, 11.75, kuesten.festland],
    ['Kakinada (Andhra)', 82.24, 16.94, kuesten.festland],
    ['Chandipur (Odisha)', 87.05, 21.45, kuesten.festland],
    ['Cox’s Bazar (Bengalen)', 91.98, 21.43, kuesten.festland],
    ['Colombo (Sri Lanka)', 79.85, 6.93, kuesten.sriLanka],
    ['Trincomalee (Sri Lanka)', 81.23, 8.58, kuesten.sriLanka],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Indien/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb der Landflächen liegen -----------------
  const binnenorte = [
    ['Delhi', 77.21, 28.61],
    ['Varanasi', 83.0, 25.32],
    ['Patna', 85.14, 25.6],
    ['Taxila', 72.83, 33.74],
    ['Mohenjo-Daro', 68.14, 27.33],
    ['Nagpur (Zentralindien)', 79.09, 21.15],
    ['Bengaluru (Dekkan)', 77.59, 12.97],
    ['Pune', 73.86, 18.52],
    ['Dhaka', 90.4, 23.81],
    ['Kandy (Sri Lanka)', 80.63, 7.29],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Indien/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['das Arabische Meer', 65.0, 18.0],
    ['die See vor Mumbai', 70.5, 18.9],
    ['die Lakkadivensee', 73.0, 9.0],
    ['der Golf von Khambhat', 72.0, 20.9],
    ['der offene Indische Ozean', 77.0, 5.5],
    ['die Palkstraße', 79.6, 9.6],
    ['die See vor Chennai', 82.0, 13.0],
    ['der Golf von Bengalen', 88.0, 18.0],
    ['die Andamanensee', 94.0, 12.0],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Indien/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // Sri Lanka ist eine eigene Insel — sonst wäre die Palkstraße zugewachsen.
  pruefe(
    'Indien/Atlas: Sri Lanka ist eine eigene Landmasse, nicht mit dem Festland verwachsen',
    liegtIn([80.63, 7.29], kuesten.sriLanka) && !liegtIn([80.63, 7.29], kuesten.festland),
  );

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Indien/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(`Indien/Karte: Phase „${phase.id}" nennt eine Jahreszahl`, /\d/.test(phase.label));
    pruefe(
      `Indien/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Indien/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: von den Bäderstädten am Indus
  // über die Lehrschriften bis zur Wiederentdeckung von heute.
  pruefe(
    'Indien/Karte: die Phasen laufen von der Indus-Kultur bis zur Gegenwart',
    karte.phasen[0].id === 'indus-kultur' &&
      karte.phasen[karte.phasen.length - 1].id === 'kolonialzeit-und-ayush',
  );
  pruefe(
    'Indien/Karte: eine Phase nennt die klassischen Lehrschriften',
    karte.phasen.some((p) => /Charaka/.test(p.hinweis || '') && /Sushruta/.test(p.hinweis || '')),
  );
  pruefe(
    'Indien/Karte: die letzte Phase nennt die Wiederentdeckung (AYUSH)',
    karte.phasen.some((p) => /AYUSH/.test(p.label + (p.hinweis || ''))),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['mohenjo-daro', 68.14, 27.33],
    ['takshashila', 72.83, 33.74],
    ['varanasi', 83.0, 25.32],
    ['pataliputra', 85.14, 25.6],
    ['jamnagar', 70.07, 22.47],
    ['kottakkal', 76.0, 10.99],
  ];
  pruefe(
    'Indien/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Indien/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Indien/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Indien/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(`Indien/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`, punkt.text.length > 150);
  }
  // Alle Punkte — auch die hier nicht namentlich erwarteten — bleiben im Bild.
  pruefe(
    'Indien/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Indien/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Indien/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Indien/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // Auch hier gilt: Es wandern nicht nur Menschen, sondern Wissen.
    pruefe(
      `Indien/Karte: Bewegung „${bewegung.id}" spricht vom Wissen, nicht nur vom Weg`,
      /Wissen|Bücher|Arznei|Bericht|Verfahren|übersetz|Kunde/.test(bewegung.text),
    );
  }

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Arabisches Meer',
    'Golf von Bengalen',
    'Indischer Ozean',
    'Ganges',
    'Indus',
    'Himalaya',
    'Dekkan',
    'Thar-Wüste',
    'Sri Lanka',
  ]) {
    pruefe(`Indien/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Indien: Titel und Epoche stehen',
    thema.titel === 'Indien und der Ayurveda' && thema.epoche === 'Von den Veden bis heute',
  );
  pruefe('Indien: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Indien: der Aufhänger erklärt den Namen („Wissen vom Leben")',
    /Wissen vom Leben/.test(thema.aufhaenger.text),
  );
  pruefe('Indien: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Indien: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn)/i.test(thema.urteil.frage),
  );
  pruefe('Indien: das Quiz hat 3 bis 5 Fragen', thema.quiz.length >= 3 && thema.quiz.length <= 5);

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Indien/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Indien/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const vaidya = thema.perspektiven.find((p) => p.id === 'ayurveda-innen');
  pruefe(
    'Indien: die Stimme des Ayurveda ist die erste Perspektive',
    thema.perspektiven[0] === vaidya,
  );
  if (!vaidya) return;

  pruefe('Indien: die erste Perspektive ist Opus zugeschrieben', vaidya.stimme === 'Opus');
  pruefe(
    'Indien: die erste Perspektive heißt nach ihrer Sicht',
    /Vaidya/.test(vaidya.name),
  );
  pruefe(
    'Indien: die erste Perspektive ist ausgeführt (über 8000 Zeichen)',
    vaidya.text.length > 8000,
  );

  const ueberschriften = vaidya.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe('Indien: die erste Perspektive ist in Abschnitte gegliedert', ueberschriften.length >= 8);

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 3 darf
  // weder die Abschnittsstruktur von Kapitel 1 noch die von Kapitel 2 als
  // Schablone übernehmen. Kapitel 1 gliedert nach „Wer hier spricht …",
  // Kapitel 2 führt seine Begründungslogik an „## Warum …?"-Überschriften
  // entlang. Dieses Kapitel erzählt stattdessen einen Tageslauf.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Indien: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Indien: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Indien: die Dramaturgie folgt einem Tageslauf',
    /^## Vor Sonnenaufgang/m.test(vaidya.text) &&
      /^## Der Abend/m.test(vaidya.text),
  );

  // Sie sagt selbst, dass sie eine Erzählung von innen ist, keine Wahrheit.
  pruefe(
    'Indien: die erste Perspektive kennzeichnet sich als Sicht von innen',
    /von innen/.test(vaidya.text) &&
      /(behaupte nicht|Denkart|eigenen Worten)/.test(vaidya.text),
  );

  // =========================================================================
  // 3. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Das Weltbild: fünf Elemente, drei Doshas, Agni und Ama.
  pruefe(
    'Indien/Denkart: die fünf Elemente kommen mit allen fünf Namen vor',
    /fünf Elemente/i.test(vaidya.text) &&
      ['Erde', 'Wasser', 'Feuer', 'Luft', 'Äther'].every((e) => vaidya.text.includes(e)),
  );
  pruefe(
    'Indien/Denkart: Vata wird als Bewegung erklärt',
    /\*\*Vata\*\*/.test(vaidya.text) && /Bewegung/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: Pitta wird als Verwandlung erklärt',
    /\*\*Pitta\*\*/.test(vaidya.text) && /Verwandlung/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: Kapha wird als Struktur erklärt',
    /\*\*Kapha\*\*/.test(vaidya.text) && /Struktur/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: Gesundheit gilt als Gleichgewicht, Krankheit als Störung',
    /Gleichgewicht/.test(vaidya.text) && /Krankheit ist ihre Störung/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: die eigene Grundnatur (Prakriti) wird erklärt',
    /Prakriti/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: Agni und Ama werden erklärt',
    /Agni/.test(vaidya.text) && /Ama/.test(vaidya.text) && /Verdauungsfeuer/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: der Satz „was du verdauen kannst" steht im Text',
    /verdauen kannst/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: die Ganzheit von Körper, Geist und Lebensstil wird benannt',
    /(Sattva|Rajas|Tamas)/.test(vaidya.text) && /Schlaf/.test(vaidya.text),
  );

  // (b) Die Begründungslogik: Die „Warum"-Fragen müssen beantwortet werden —
  //     hier nicht als Überschriften, sondern im Text (andere Dramaturgie).
  pruefe(
    'Indien/Denkart: Warum beginnt alles mit der Ernährung? — Agni, Ama, die sechs Geschmäcker',
    /sechs Geschmacksrichtungen/.test(vaidya.text) &&
      /Wurzel/.test(vaidya.text) &&
      /(Nahrung und Arznei|zwei Enden derselben Skala)/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: Warum Panchakarma? — alle fünf Handlungen mit Begründung',
    /Panchakarma/.test(vaidya.text) &&
      ['Vamana', 'Virechana', 'Basti', 'Nasya', 'Raktamokshana'].every((k) =>
        vaidya.text.includes(k),
      ) &&
      /muss aus dem Körper heraus/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: Warum diese Kräuter? — Kurkuma, Ashwagandha, Triphala mit Wirklogik',
    /Kurkuma/.test(vaidya.text) &&
      /Ashwagandha/.test(vaidya.text) &&
      /Triphala/.test(vaidya.text) &&
      /(rasa|virya|vipaka|prabhava)/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: Warum Puls-, Zungen- und Urindiagnose? — die achtfache Untersuchung',
    /achtfache Untersuchung/.test(vaidya.text) &&
      /Puls/.test(vaidya.text) &&
      /Zunge/.test(vaidya.text) &&
      /Urin/.test(vaidya.text),
  );
  pruefe(
    'Indien/Denkart: Warum Tagesablauf, Jahreszeiten, Yoga und Meditation?',
    /Ritucharya/.test(vaidya.text) &&
      /Yoga/.test(vaidya.text) &&
      /(Pranayama|Meditation)/.test(vaidya.text),
  );
  // Der Schlüsselsatz der Miteinander-Frage: zwei Denkarten von Gesundheit.
  pruefe(
    'Indien/Denkart: der Unterschied der Fragestellung wird benannt (Leben statt Krankheit)',
    /Wissen von der Krankheit/.test(vaidya.text) && /Gleichgewicht/.test(vaidya.text),
  );

  // =========================================================================
  // 4. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme ergänzt.
  const perspektivenText = thema.perspektiven.map((p) => p.text).join('\n');
  pruefe(
    'Indien/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /Atharvaveda/.test(perspektivenText) &&
      /Charaka Samhita/.test(perspektivenText) &&
      /Sushruta Samhita/.test(perspektivenText),
  );
  pruefe(
    'Indien/Erzähl-Muster: (a2) bis in die Gegenwart (AYUSH, Hochschulen)',
    /AYUSH/.test(perspektivenText) && /(Hochschulen|Studium)/.test(perspektivenText),
  );
  pruefe(
    'Indien/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Weltbild|Denkart|Annahme|Lehre|Logik)/.test(perspektivenText),
  );
  pruefe(
    'Indien/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /indische Methode/.test(perspektivenText) && /Curcumin/.test(perspektivenText),
  );
  pruefe(
    'Indien/Erzähl-Muster: (c2) und die Grenzen',
    /(Grenzen|dünn wird|nicht messbar|schadet|Gefahr)/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Tradition selbst.
  pruefe(
    'Indien/Bilanz: was die Forschung stützt (Curcumin, Ashwagandha, Yoga)',
    /Curcumin/.test(vaidya.text) &&
      /Ashwagandha/.test(vaidya.text) &&
      /Yoga/.test(vaidya.text) &&
      /(Studien|Übersichtsarbeiten|kontrollierte)/.test(vaidya.text),
  );
  pruefe(
    'Indien/Bilanz: der chirurgische Beleg ist nachprüfbar datiert',
    /1794/.test(vaidya.text) && /Carpue/.test(vaidya.text),
  );
  pruefe(
    'Indien/Bilanz: auch ein negatives Prüfergebnis wird genannt (Guggulu)',
    /Guggulu/.test(vaidya.text) && /2003/.test(vaidya.text),
  );
  pruefe(
    'Indien/Bilanz: die junge Gestalt des heutigen Ayurveda wird nicht verschwiegen',
    /(Wiederaufbau|Ihre heutige Gestalt ist jung)/.test(vaidya.text),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst.
  pruefe(
    'Indien/TONE: die eigene Stimme benennt, dass die Doshas nicht messbar sind',
    /nicht messbar/.test(vaidya.text),
  );
  pruefe(
    'Indien/TONE: die eigene Stimme benennt die schwache Studienlage',
    /Studienlage ist schwach/.test(vaidya.text),
  );
  pruefe(
    'Indien/TONE: die eigene Stimme benennt die Schwermetalle der Rasa Shastra',
    /Rasa Shastra/.test(vaidya.text) &&
      /Blei/.test(vaidya.text) &&
      /Quecksilber/.test(vaidya.text) &&
      /Arsen/.test(vaidya.text),
  );
  pruefe(
    'Indien/TONE: die eigene Stimme benennt die Kommerzialisierung',
    /(Vermarktung|Wirtschaftszweig)/.test(vaidya.text),
  );
  pruefe(
    'Indien/TONE: die eigene Stimme benennt die Übernutzung der Heilpflanzen',
    /(Übernutzung|wild gesammelt)/.test(vaidya.text),
  );
  pruefe(
    'Indien/TONE: die eigene Stimme benennt die Gefahr verlorener Zeit',
    /(verstreicht Zeit|nicht die erste Wahl)/.test(vaidya.text),
  );
  pruefe(
    'Indien/TONE: Panchakarma wird nicht als Wellness beschönigt',
    /kein Verwöhnprogramm/.test(vaidya.text),
  );
  // Kein Missionieren: Die Stimme spricht keine Heilversprechen aus.
  pruefe(
    'Indien/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert|Wundermittel|immer wirksam)/i.test(vaidya.text),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Indien: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(vaidya.text),
  );
  pruefe(
    'Indien: die Tür führt zum Blick von außen (Verdrängung und Wiederentdeckung)',
    /(Kolonialverwaltung|kolonial)/i.test(vaidya.text) &&
      /Wiederentdeckung/.test(vaidya.text),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Indien/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Indien/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Indien/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|Hokuspokus|esoterisch)/i.test(frage.frage),
    );
  }

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes den Blick von außen ergänzt hat, wird sie
  // an ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND
  // Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Indien/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 4)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Indien/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Indien/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Indien/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
