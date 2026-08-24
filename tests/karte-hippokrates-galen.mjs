// Prüfungen für Kapitel 4 — „Hippokrates und Galen" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Drei Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien der Karte liegen als echte
//      Längen-/Breitengrade im Modul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: antike und heutige Häfen auf der gezeichneten Küste,
//      Binnenorte innerhalb der Landflächen, offene See außerhalb. Geprüft
//      werden bewusst Orte, die NICHT selbst Stützpunkte der Linie sind —
//      sonst prüfte der Test nur, ob eine Zahl mit sich selbst
//      übereinstimmt. Zusätzlich muss die Ägäis ein Meer bleiben: Kos,
//      Lesbos, Chios, Kreta und Zypern sind eigene Landmassen, nicht mit
//      dem Festland verwachsen.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück dieses
//      Kapitels: Im Text der ersten Stimme müssen die vier Säfte mit allen
//      vier Namen vorkommen (Blut, Schleim, gelbe und schwarze Galle),
//      dazu Eukrasie/Dyskrasie als Gleichgewichtsbegriffe, die Natur als
//      Heilerin, die Beobachtung samt Prognose und der Eid mit
//      Nichtschaden und Verschwiegenheit. Und die Begründungslogik muss
//      die „Warum"-Fragen tatsächlich beantworten: Warum beobachten statt
//      eingreifen? Warum Lebensweise statt Dauerarznei? Warum ein Eid?
//
//   3. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, ehrliche
//      Wirkungsbilanz in beide Richtungen, Quiz-Umfang, offene
//      Urteilsfrage.
//
// Zustandstolerant gebaut wie bei den Kapiteln 1 bis 3: Die zweite
// Perspektive (Galen — das System, die Anatomie, die Autorität) und die
// endgültige Synthese kommen erst mit dem Hermes-Pass dazu. Prüfungen, die
// nur für die erste Stimme gelten, hängen deshalb an ihrer id
// („hippokrates"); die Prüfungen zum Erzähl-Muster laufen über ALLE
// Perspektiven zusammen. Die Synthese wird je nach Ausbaustand verzweigt
// gemessen (siehe unten).
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
} = require('../utils/themen/karten/hippokrates-galen.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt ist 28° breit und damit der kleinste des Buches
 * (Kapitel 3: 38°, Kapitel 2: 52°). Entsprechend strenger wird gemessen:
 * 0,3° sind hier auf dem Bildschirm ungefähr so viel wie 0,5° beim
 * Subkontinent.
 */
const KUESTEN_TOLERANZ = 0.3;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 3: Ein
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
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge am Schwarzen Meer genauso
 * „lang" wie in Oberägypten; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('hippokrates-galen');
  pruefe('Hippokrates: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Hippokrates und
  // Galen stehen hinter Indien und dem Ayurveda (Themenlandkarte in CLAUDE.md).
  const { alleThemen } = require('../utils/themen/index.js');
  pruefe(
    'Hippokrates: steht in der App hinter „Indien und der Ayurveda"',
    alleThemen.findIndex((t) => t.id === 'hippokrates-galen') ===
      alleThemen.findIndex((t) => t.id === 'indien-ayurveda') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Hippokrates/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Hippokrates/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss Rom, Griechenland mit der Ägäis, die Küste Kleinasiens und
  // Alexandria enthalten — die vier Stationen des Kapitels.
  pruefe(
    'Hippokrates/Karte: der Ausschnitt reicht von Rom bis an die Levante',
    RAHMEN.minLon <= 12.5 && RAHMEN.maxLon >= 36,
  );
  pruefe(
    'Hippokrates/Karte: der Ausschnitt reicht von Ägypten bis an das Schwarze Meer',
    RAHMEN.minLat <= 26 && RAHMEN.maxLat >= 42,
  );
  pruefe('Hippokrates/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Hippokrates/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Ausgewählt sind Häfen, die im Schulatlas eindeutig am Wasser stehen und
  // die NICHT als Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Piräus (Athen)', 23.65, 37.94, kuesten.europa],
    ['Neapel', 14.25, 40.84, kuesten.europa],
    ['Ephesos', 27.34, 37.94, kuesten.asien],
    ['Caesarea Maritima', 34.89, 32.5, kuesten.asien],
    ['Abukir (bei Alexandria)', 30.06, 31.32, kuesten.afrika],
    ['Leptis Magna', 14.29, 32.64, kuesten.afrika],
    ['Kydonia (Chania, Kreta)', 24.02, 35.51, kuesten.kreta],
    ['Mytilene (Lesbos)', 26.55, 39.11, kuesten.lesbos],
    ['Chios-Stadt', 26.14, 38.37, kuesten.chios],
    ['Lindos (Rhodos)', 28.09, 36.09, kuesten.rhodos],
    ['Salamis (Zypern)', 33.9, 35.18, kuesten.zypern],
    ['Panormos (Palermo)', 13.36, 38.11, kuesten.sizilien],
    ['Eretria (Euböa)', 23.79, 38.4, kuesten.euboea],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Hippokrates/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb der Landflächen liegen -----------------
  const binnenorte = [
    ['Rom', 12.48, 41.9],
    ['Athen', 23.73, 37.98],
    ['Sparta', 22.43, 37.07],
    ['Larissa', 22.42, 39.64],
    ['Pergamon', 27.18, 39.12],
    ['Ankyra (Ankara)', 32.85, 39.93],
    ['Ikonion (Konya)', 32.48, 37.87],
    ['Antiochia am Orontes', 36.16, 36.2],
    ['Damaskus', 36.3, 33.51],
    ['Memphis (bei Kairo)', 31.24, 30.04],
    ['Theben (Luxor)', 32.64, 25.7],
    ['die Sinai-Halbinsel', 33.8, 29.5],
    ['die Insel Kos', 27.2, 36.8],
    ['Kreta (Landesinneres)', 24.9, 35.2],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Hippokrates/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['die offene Ägäis', 25.2, 38.5],
    ['das Kykladenmeer', 24.5, 36.5],
    ['die See vor Kos', 27.1, 36.3],
    ['der Golf von Korinth', 22.3, 38.34],
    ['das Ionische Meer', 18.5, 37.5],
    ['die Adria', 17.0, 42.0],
    ['das Tyrrhenische Meer', 12.0, 39.8],
    ['das östliche Mittelmeer', 30.0, 33.5],
    ['die See vor Alexandria', 29.5, 32.3],
    ['das Marmarameer', 28.0, 40.75],
    ['das Schwarze Meer', 32.0, 42.5],
    ['das Rote Meer', 34.8, 27.5],
    ['der Golf von Akaba', 34.7, 28.7],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Hippokrates/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // Ohne eigene Inselringe wäre die Ägäis eine Fläche statt eines Meeres —
  // und gerade sie ist die Bühne dieses Kapitels.
  const inseln = [
    ['Kos', 27.2, 36.8, kuesten.kos],
    ['Lesbos', 26.2, 39.15, kuesten.lesbos],
    ['Chios', 26.05, 38.35, kuesten.chios],
    ['Kreta', 24.9, 35.2, kuesten.kreta],
    ['Zypern', 33.2, 35.1, kuesten.zypern],
  ];
  for (const [name, lon, lat, ring] of inseln) {
    pruefe(
      `Hippokrates/Atlas: ${name} ist eine eigene Insel, nicht mit dem Festland verwachsen`,
      liegtIn([lon, lat], ring) &&
        !liegtIn([lon, lat], kuesten.europa) &&
        !liegtIn([lon, lat], kuesten.asien),
    );
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Hippokrates/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(`Hippokrates/Karte: Phase „${phase.id}" nennt eine Jahreszahl`, /\d/.test(phase.label));
    pruefe(
      `Hippokrates/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Hippokrates/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: von der Insel über die
  // Bibliothek und die Hauptstadt bis zu den Übersetzern des Ostens.
  pruefe(
    'Hippokrates/Karte: die Phasen laufen von Kos bis zum Weg nach Osten',
    karte.phasen[0].id === 'kos-und-knidos' &&
      karte.phasen[karte.phasen.length - 1].id === 'das-erbe-wandert',
  );
  pruefe(
    'Hippokrates/Karte: eine Phase nennt Knidos als rivalisierende Schule',
    karte.phasen.some((p) =>
      /Knidos/.test(p.label + (p.hinweis || '') + p.flaechen.map((f) => f.titel).join(' ')),
    ),
  );
  pruefe(
    'Hippokrates/Karte: eine Phase zeigt Alexandria und die Sammlung des Wissens',
    karte.phasen.some((p) => /Alexandria/.test(p.label) && /Bibliothek/.test(p.hinweis || '')),
  );
  pruefe(
    'Hippokrates/Karte: eine Phase zeigt Galen in Rom',
    karte.phasen.some((p) => /Galen/.test(p.label) && /Rom/.test(p.label)),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['kos', 27.29, 36.89],
    ['larissa', 22.42, 39.64],
    ['athen', 23.73, 37.98],
    ['alexandria', 29.9, 31.2],
    ['pergamon', 27.18, 39.12],
    ['rom', 12.48, 41.9],
  ];
  pruefe(
    'Hippokrates/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Hippokrates/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Hippokrates/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Hippokrates/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Hippokrates/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  // Alle Punkte — auch die hier nicht namentlich erwarteten — bleiben im Bild.
  pruefe(
    'Hippokrates/Karte: alle Info-Punkte liegen innerhalb der Karte',
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
    `Hippokrates/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Hippokrates/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Hippokrates/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Hippokrates/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // Auch hier gilt: Es wandern nicht nur Menschen, sondern Wissen.
    pruefe(
      `Hippokrates/Karte: Bewegung „${bewegung.id}" spricht vom Wissen, nicht nur vom Weg`,
      /Wissen|Bücher|Schriften|Rollen|Bibliothek|übersetz|studier/.test(bewegung.text),
    );
  }
  // Der Weg Galens ist der Bogen des Kapitels: Pergamon → Alexandria → Rom.
  const galensWeg = (karte.bewegungen || []).find((b) => b.id === 'galens-weg');
  pruefe('Hippokrates/Karte: der Weg Galens ist eingezeichnet', Boolean(galensWeg));
  if (galensWeg) {
    pruefe(
      'Hippokrates/Karte: der Weg Galens beginnt in Pergamon und endet in Rom',
      galensWeg.von[0] === P.punkt(27.18, 39.12)[0] &&
        galensWeg.von[1] === P.punkt(27.18, 39.12)[1] &&
        galensWeg.nach[0] === P.punkt(12.48, 41.9)[0] &&
        galensWeg.nach[1] === P.punkt(12.48, 41.9)[1],
    );
    pruefe(
      'Hippokrates/Karte: der Weg Galens führt über Alexandria',
      (galensWeg.ueber || []).some(
        ([x, y]) => x === P.punkt(29.9, 31.2)[0] && y === P.punkt(29.9, 31.2)[1],
      ),
    );
  }

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Ägäisches Meer',
    'Mittelmeer',
    'Schwarzes Meer',
    'Rotes Meer',
    'Nil',
    'Griechenland',
    'Kleinasien',
    'Ägypten',
    'Kreta',
    'Italien',
  ]) {
    pruefe(`Hippokrates/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Hippokrates: Titel und Epoche stehen',
    thema.titel === 'Hippokrates und Galen' &&
      thema.epoche === '~460 v. Chr. – 216 n. Chr.',
  );
  pruefe('Hippokrates: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Hippokrates: der Aufhänger stellt Beobachtung und Autorität nebeneinander',
    /Beobacht/i.test(thema.aufhaenger.frage + thema.aufhaenger.text) &&
      /Autorität|System/i.test(thema.aufhaenger.frage + thema.aufhaenger.text),
  );
  pruefe(
    'Hippokrates: der Aufhänger sagt, dass beide sich nie begegnet sind',
    /nie begegnet|nie getroffen/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Hippokrates: der Aufhänger wertet keine der beiden Seiten ab',
    !/(rückständig|lächerlich|Unsinn|dumm)/i.test(thema.aufhaenger.text),
  );
  pruefe('Hippokrates: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Hippokrates: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Hippokrates: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Hippokrates/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Hippokrates/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const kos = thema.perspektiven.find((p) => p.id === 'hippokrates');
  pruefe(
    'Hippokrates: die Stimme des Hippokrates ist die erste Perspektive',
    thema.perspektiven[0] === kos,
  );
  if (!kos) return;

  pruefe('Hippokrates: die erste Perspektive ist Opus zugeschrieben', kos.stimme === 'Opus');
  pruefe(
    'Hippokrates: die erste Perspektive heißt nach ihrer Sicht',
    /Hippokrates/.test(kos.name),
  );
  pruefe(
    'Hippokrates: die erste Perspektive ist ausgeführt (über 8000 Zeichen)',
    kos.text.length > 8000,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie hier gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App. Auf `kos.text` wird weiter dort geprüft, wo die Zeilenstruktur
  // selbst zählt (Überschriften).
  const fliessend = kos.text.replace(/\s+/g, ' ');

  const ueberschriften = kos.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Hippokrates: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 8,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 4 darf
  // keine der drei bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf.
  // Dieses Kapitel schreibt Briefe an einen Arzt, den es nicht kennt.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Hippokrates: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Hippokrates: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Hippokrates: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every((h) => !/^## (Vor Sonnenaufgang|Der Abend|Der Nachmittag)/.test(h)),
  );
  pruefe(
    'Hippokrates: die Dramaturgie ist ein Briefwechsel',
    /^## Der erste Brief/m.test(kos.text) &&
      /^## Der neunte Brief/m.test(kos.text) &&
      /^## Nachschrift/m.test(kos.text),
  );
  // Die zeitliche Verschiebung wird ehrlich eingebaut: Sie haben sich nie
  // getroffen — Galen antwortet einem längst Toten.
  pruefe(
    'Hippokrates: die 550 Jahre zwischen beiden werden offengelegt',
    /(fünfeinhalb Jahrhunderte|550 Jahre)/.test(fliessend) &&
      /nie gesehen/.test(fliessend),
  );

  // Sie sagt selbst, dass sie eine Erzählung ist, keine Wahrheit — und dass
  // „Hippokrates" eine Schule war und kein einzelner Mann.
  pruefe(
    'Hippokrates: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /keine Wahrheit, sondern eine Denkart/.test(fliessend),
  );
  pruefe(
    'Hippokrates/TONE: die Stimme sagt selbst, dass „Hippokrates" eine Schule war',
    /Es waren viele/.test(fliessend) && /als eine Schule/.test(fliessend),
  );

  // =========================================================================
  // 3. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Das Weltbild: die vier Säfte als Ordnungssystem.
  pruefe(
    'Hippokrates/Denkart: alle vier Säfte werden mit Namen erklärt',
    /\*\*Blut\*\*/.test(fliessend) &&
      /\*\*Schleim\*\*/.test(fliessend) &&
      /\*\*Gelbe Galle\*\*/.test(fliessend) &&
      /\*\*Schwarze Galle\*\*/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: die vier Eigenschaften warm/kalt/feucht/trocken kommen vor',
    ['warm', 'kalt', 'feucht', 'trocken'].every((e) => kos.text.includes(e)),
  );
  pruefe(
    'Hippokrates/Denkart: Gesundheit ist Eukrasie, Krankheit ist Dyskrasie',
    /Eukrasie/.test(fliessend) && /Dyskrasie/.test(fliessend) && /Mischung/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: die Säftelehre wird als Ordnungssystem begründet (Jahreszeiten, Wesensarten)',
    /Jahreszeiten/.test(fliessend) && /Wesensarten/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: die Natur als Heilerin wird erklärt',
    /Die Natur ist der Arzt der Krankheiten/.test(fliessend) &&
      /(vis medicatrix naturae|Heilkraft der Natur)/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: Kochung und Krisis erklären den Krankheitsverlauf',
    /Kochung/.test(fliessend) && /Krisis/.test(fliessend) && /Verlauf/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: die Abgrenzung von den Göttern wird an der „heiligen Krankheit" gezeigt',
    /heilige Krankheit/.test(fliessend) &&
      /um nichts göttlicher/.test(fliessend),
  );
  // …und ehrlich eingeordnet: Die Tempelheilung lief nebenher weiter.
  pruefe(
    'Hippokrates/TONE: die Stimme räumt ein, dass die Tempelheilung weiterging',
    /(Asklepios|Heiligtum)/.test(fliessend) && /heilenden Traum/.test(fliessend),
  );
  // Der Brückenschlag zu den Kapiteln 1 bis 3: dieselbe Grundidee.
  pruefe(
    'Hippokrates/Denkart: das Gleichgewicht wird mit Kanälen, Qi und den drei Kräften verglichen',
    /Gesundheit ist Gleichgewicht/.test(fliessend) &&
      /Kanälen/.test(fliessend) &&
      /(drei Kräften|zwei Kräften)/.test(fliessend),
  );

  // (b) Die Begründungslogik: Die „Warum"-Fragen müssen beantwortet werden —
  //     hier nicht als Überschriften, sondern im Text (andere Dramaturgie).
  pruefe(
    'Hippokrates/Denkart: Warum beobachten statt eingreifen? — mit Begründung',
    /Warum beobachten statt eingreifen/.test(fliessend) &&
      /(Nieswurz|gefährlich)/.test(fliessend) &&
      /von selbst besser/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: Warum Lebensweise statt Dauerarznei? — mit Begründung',
    /Warum die Lebensweise und nicht das Mittel/.test(fliessend) &&
      /Diaita/.test(fliessend) &&
      /(Bäder|Gerstenschleim|Bewegung|Gehen)/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: Warum ein Eid? — mit Begründung',
    /Warum überhaupt ein Eid/.test(fliessend) &&
      /(keine Prüfung|keinen anderen Schutz)/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: der Eid wird inhaltlich erklärt (Nichtschaden, Verschwiegenheit, Grenzen)',
    /nicht schaden/.test(fliessend) &&
      /Verschwiegenheit/.test(fliessend) &&
      /(tödliches Mittel|Blasenstein)/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: Prognose statt Diagnose wird begründet',
    /Prognose/.test(fliessend) && /Vorhersage/.test(fliessend) && /Knidos/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Denkart: die Beobachtung wird an den Fallbüchern gezeigt',
    /Epidemien/.test(fliessend) && /(Philiskos|Tag für Tag)/.test(fliessend),
  );

  // =========================================================================
  // 4. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (Galen) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Hippokrates/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /Kos/.test(perspektivenText) &&
      /Knidos/.test(perspektivenText) &&
      /Corpus Hippocraticum/.test(perspektivenText) &&
      /Alexandria/.test(perspektivenText),
  );
  pruefe(
    'Hippokrates/Erzähl-Muster: (a2) die Herkunft aus Ägypten wird nicht verschwiegen',
    /Ägypter|Nil/.test(perspektivenText),
  );
  pruefe(
    'Hippokrates/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Weltbild|Denkart|Annahme|Lehre|Logik)/.test(perspektivenText),
  );
  pruefe(
    'Hippokrates/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /(Schulter|Klumpfuß|Fallbücher|Krankenakten)/.test(perspektivenText) &&
      /nicht schaden/.test(perspektivenText),
  );
  pruefe(
    'Hippokrates/Erzähl-Muster: (c2) und die Grenzen',
    /(Grenzen|angerichtet|geschadet|falsch)/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Tradition selbst.
  pruefe(
    'Hippokrates/Bilanz: die Stimme nennt, was von ihr bleibt',
    /Was ich glaube, dass es bleibt/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Bilanz: die Stimme nennt, was sie angerichtet hat',
    /Was ich fürchte, dass es anrichtet/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Bilanz: der Aderlass wird als Folge der eigenen Theorie benannt',
    /Aderlass/.test(fliessend) && /Abführmittel/.test(fliessend) && /1799/.test(fliessend),
  );
  pruefe(
    'Hippokrates/Bilanz: die eigenen Misserfolge stehen in den Fallbüchern',
    /(Misserfolge aufgeschrieben|mehr als die Hälfte)/.test(fliessend),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst.
  pruefe(
    'Hippokrates/TONE: die eigene Stimme nennt die vier Säfte falsch',
    /Die vier Säfte sind falsch/.test(fliessend),
  );
  pruefe(
    'Hippokrates/TONE: die eigene Stimme benennt die fehlende Anatomie',
    /(keine Anatomie|nie von innen gesehen)/.test(fliessend),
  );
  pruefe(
    'Hippokrates/TONE: die eigene Stimme benennt den Eid als weniger, als man glaubt',
    /Der Eid ist nicht das, wofür er gehalten wird/.test(fliessend),
  );
  pruefe(
    'Hippokrates/TONE: die eigene Stimme benennt das Meiden der Sterbenden als Schande',
    /(unsere Schande|abweisen)/.test(fliessend),
  );
  pruefe(
    'Hippokrates/TONE: die eigene Stimme benennt die Autorität als eigenen Fehler',
    /aufgehört hat, nachzusehen/.test(fliessend),
  );
  pruefe(
    'Hippokrates/TONE: die Sektionen in Alexandria werden nicht beschönigt',
    /Herophilos/.test(fliessend) && /(Verbrechen|lebendigem Leibe)/.test(fliessend),
  );
  // Kein Missionieren: Die Stimme spricht keine Heilversprechen aus.
  pruefe(
    'Hippokrates/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert|Wundermittel|immer wirksam)/i.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Hippokrates: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Hippokrates: die Tür führt zu Galen (System, Anatomie, Autorität)',
    /Galen/.test(fliessend) &&
      /Pergamon/.test(fliessend) &&
      /System/.test(fliessend) &&
      /Autorität/.test(fliessend),
  );
  pruefe(
    'Hippokrates: die Tür nennt auch Galens Tiersektionen',
    /(Affen|Tieren)/.test(fliessend) && /nicht öffnen darf/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Hippokrates/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Hippokrates/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Hippokrates/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|Hokuspokus|esoterisch)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Hippokrates/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die Stimme Galens ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Hippokrates/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 5)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/.test(thema.synthese),
    );
    pruefe(
      'Hippokrates/Synthese: sagt, welche Stimme noch kommt',
      /Galen/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Hippokrates/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Hippokrates/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Hippokrates/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
