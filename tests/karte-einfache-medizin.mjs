// Prüfungen für Kapitel 18 — „Die einfache Medizin" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine UI-Importe:
// läuft mit blankem `node`.
//
// Zwei Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien der Karte liegen als echte
//      Längen-/Breitengrade im Modul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Hafenstädte müssen auf der gezeichneten Küste liegen,
//      Binnenorte innerhalb der Landflächen, offene See außerhalb. Die
//      Toleranz ist hier größer als in den übrigen Kapiteln, weil dies die
//      weiteste Karte des Buches ist (285 Längengrade auf 700 Bildpunkte,
//      also rund 2,5 Bildpunkte je Grad). Sie liegt trotzdem deutlich unter
//      dem, was die Rohdaten tatsächlich brauchen — beim Schreiben lagen
//      alle dreißig geprüften Küstenorte unter 0,8 Grad.
//
//   2. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen), Attribution der ersten Stimme, die drei Säulen der
//      Betreiber-These, die Belege mit Namen und Jahr (KEINE-GERÜCHTE-Regel),
//      die TONE-Regel (beide Seiten fair, kein Stigmatisieren), der
//      Innovations-Zyklus in seiner Umkehrung, Quiz-Umfang, offene
//      Urteilsfrage, Längenregel.
//
// Zustandstolerant gebaut: Die zweite Perspektive („Die Stimme der
// Verhältnisse") und die endgültige Synthese kommen erst mit dem
// Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten, hängen
// deshalb an ihrer id („alltag"); die Prüfungen zum Erzähl-Muster laufen
// über ALLE Perspektiven zusammen und bleiben damit auch gültig, wenn
// weitere Stimmen dazukommen. Die Synthese wird je nach Ausbaustand
// unterschiedlich geprüft (siehe unten).
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
} = require('../utils/themen/karten/einfache-medizin.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * 1,2 Grad sind auf dieser Weltkarte rund drei Bildpunkte. In den engeren
 * Kapiteln steht hier 0,8 — dort ist ein Grad aber auch fünfundzwanzigmal
 * so breit.
 */
const KUESTEN_TOLERANZ = 1.2;

/**
 * Obergrenze für die Länge des Kapitels in Zeilen.
 *
 * Ab der Neuzeit gilt die Umkehrung der Längenregel (CLAUDE.md): vollständig
 * und ausführlich. Die Grenze steht wie bei Kneipp bei 2.200 Zeilen und
 * soll nur das Ausufern verhindern, nicht die Ausführlichkeit.
 */
const MAX_ZEILEN_KAPITEL = 2200;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting"): Ein Strahl nach Osten schneidet
 * den Rand eines geschlossenen Rings ungerade oft, wenn der Punkt drinnen
 * liegt. Gerechnet wird in Längen-/Breitengraden — dieselben Rohdaten, die
 * das Kartenmodul in SVG-Koordinaten umrechnet.
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
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge im Norden genauso „lang"
 * wie am Äquator; die Toleranz würde dort schleichend großzügiger.
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

/** Alle Texte eines Themas an einem Stück — für Schlagwort-Prüfungen. */
function alleTexte(thema) {
  const stuecke = [thema.aufhaenger.frage, thema.aufhaenger.text, thema.synthese];
  stuecke.push(thema.urteil.frage, thema.urteil.hinweis || '');
  for (const perspektive of thema.perspektiven) stuecke.push(perspektive.text);
  for (const frage of thema.quiz) {
    stuecke.push(frage.frage, frage.erklaerung, ...frage.antworten);
  }
  if (thema.karte) {
    for (const phase of thema.karte.phasen) stuecke.push(phase.label, phase.hinweis || '');
    for (const punkt of thema.karte.punkte) stuecke.push(punkt.text);
    for (const bewegung of thema.karte.bewegungen || []) stuecke.push(bewegung.text);
  }
  return stuecke.join('\n');
}

/**
 * @param {(name: string, ok: boolean) => void} pruefe Prüf-Funktion des Rahmens
 */
export function laufe(pruefe) {
  const thema = themaNachId('einfache-medizin');
  pruefe('Einfache Medizin: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Einfache Medizin/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Einfache Medizin/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss alle fünf „blauen Zonen" enthalten: Loma Linda (−117,3),
  // Nicoya (−85,4), Sardinien (9,5), Ikaria (26,0) und Okinawa (127,9) —
  // dazu Framingham und Nordkarelien im Norden.
  pruefe(
    'Einfache Medizin/Karte: der Ausschnitt reicht von Kalifornien bis Japan',
    RAHMEN.minLon <= -118 && RAHMEN.maxLon >= 129,
  );
  pruefe(
    'Einfache Medizin/Karte: der Ausschnitt reicht von der Südhalbkugel bis Finnland',
    RAHMEN.minLat <= -30 && RAHMEN.maxLat >= 63,
  );
  pruefe('Einfache Medizin/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Einfache Medizin/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Ausgewählt sind Orte, die im Schulatlas eindeutig am Wasser stehen —
  // über alle fünf gezeichneten Erdteile verteilt.
  const kuestenorte = [
    ['San Francisco', -122.42, 37.77, kuesten.amerika],
    ['Los Angeles', -118.24, 34.05, kuesten.amerika],
    ['Panama-Stadt', -79.5, 8.97, kuesten.amerika],
    ['Valparaíso', -71.6, -33.05, kuesten.amerika],
    ['Rio de Janeiro', -43.2, -22.9, kuesten.amerika],
    ['Recife', -34.88, -8.05, kuesten.amerika],
    ['New York', -74.0, 40.7, kuesten.amerika],
    ['Veracruz', -96.13, 19.19, kuesten.amerika],
    ['Lissabon', -9.14, 38.72, kuesten.eurasien],
    ['Marseille', 5.37, 43.3, kuesten.eurasien],
    ['Neapel', 14.27, 40.84, kuesten.eurasien],
    ['Piräus (Athen)', 23.6, 37.94, kuesten.eurasien],
    ['Helsinki', 24.94, 60.17, kuesten.eurasien],
    ['Stockholm', 18.07, 59.33, kuesten.eurasien],
    ['Mumbai', 72.87, 19.08, kuesten.eurasien],
    ['Schanghai', 121.47, 31.23, kuesten.eurasien],
    ['Hongkong', 114.17, 22.32, kuesten.eurasien],
    ['Wladiwostok', 131.9, 43.1, kuesten.eurasien],
    ['Aden', 45.03, 12.79, kuesten.eurasien],
    ['Alexandria', 29.9, 31.2, kuesten.afrika],
    ['Kapstadt', 18.42, -33.93, kuesten.afrika],
    ['Dakar', -17.45, 14.72, kuesten.afrika],
    ['Mombasa', 39.66, -4.05, kuesten.afrika],
    ['Perth', 115.86, -31.95, kuesten.australien],
    ['Sydney', 151.21, -33.87, kuesten.australien],
    ['Darwin', 130.84, -12.46, kuesten.australien],
    ['Tokio', 139.77, 35.68, kuesten.japanHonschu],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Einfache Medizin/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb der Landflächen liegen -----------------
  const binnenorte = [
    ['Chicago', -87.6, 41.9],
    ['São Paulo', -46.6, -23.5],
    ['Berlin', 13.4, 52.5],
    ['Moskau', 37.6, 55.75],
    ['Kairo', 31.24, 30.05],
    ['Nairobi', 36.8, -1.3],
    ['Delhi', 77.2, 28.6],
    ['Peking', 116.4, 39.9],
    ['Alice Springs', 133.9, -23.7],
    ['Kreta', 24.9, 35.2],
    ['Sizilien', 14.0, 37.5],
    ['Kiuschu (Japan)', 130.8, 32.8],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Einfache Medizin/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['der Nordatlantik', -30.0, 20.0],
    ['der Südatlantik', -10.0, -30.0],
    ['der Ostpazifik', -120.0, -20.0],
    ['der Nordpazifik', -140.0, 40.0],
    ['der Indische Ozean', 85.0, -20.0],
    ['das Mittelmeer bei Malta', 17.0, 34.5],
    ['die Nordsee', 4.0, 55.7],
    ['die Ostsee', 19.0, 57.5],
    ['die Karibik', -75.0, 15.0],
    ['der Golf von Guinea', 0.0, 0.0],
    ['der Golf von Bengalen', 87.0, 15.0],
    ['das Arabische Meer', 63.0, 15.0],
    ['das Ostchinesische Meer', 124.0, 30.0],
    ['die Korallensee', 154.0, -20.0],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Einfache Medizin/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // Die beiden Binnenmeere liegen als eigene Wasserflächen über dem Land —
  // ihre Mitte muss innerhalb der jeweiligen Fläche liegen.
  pruefe(
    'Einfache Medizin/Atlas: das Schwarze Meer ist als Wasserfläche gezeichnet',
    liegtIn([34.0, 43.0], kuesten.schwarzesMeer),
  );
  pruefe(
    'Einfache Medizin/Atlas: das Kaspische Meer ist als Wasserfläche gezeichnet',
    liegtIn([51.0, 41.0], kuesten.kaspischesMeer),
  );
  pruefe(
    'Einfache Medizin/Atlas: die beiden Binnenmeere überschneiden sich nicht',
    !liegtIn([34.0, 43.0], kuesten.kaspischesMeer),
  );

  // --- Die fünf „blauen Zonen" liegen wirklich dort ------------------------
  // Jede muss auf einer Landfläche liegen — sonst schwämme ein Info-Punkt
  // im offenen Meer. Sardinien, Okinawa, Ikaria und Kreta sind eigens
  // gezeichnet, weil sie sonst kleiner wären als ein Bildpunkt.
  const blaueZonen = [
    ['Ogliastra (Sardinien)', 9.45, 40.0, kuesten.sardinien],
    ['Okinawa', 127.9, 26.4, kuesten.okinawa],
    ['Ikaria', 26.03, 37.63, kuesten.ikaria],
  ];
  for (const [name, lon, lat, ring] of blaueZonen) {
    pruefe(`Einfache Medizin/Atlas: ${name} ist als Insel gezeichnet`, liegtIn([lon, lat], ring));
  }
  pruefe('Einfache Medizin/Atlas: Nicoya liegt auf Land', aufLand([-85.4, 10.1]));
  pruefe('Einfache Medizin/Atlas: Loma Linda liegt auf Land', aufLand([-117.26, 34.05]));
  pruefe('Einfache Medizin/Atlas: Kreta ist eigens gezeichnet', liegtIn([24.9, 35.2], kuesten.kreta));

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Einfache Medizin/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Einfache Medizin/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\d{4}/.test(phase.label),
    );
    pruefe(
      `Einfache Medizin/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Einfache Medizin/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen laufen von der ersten Langzeitstudie zur heutigen
  // Lebensstil-Medizin — die Reihenfolge trägt die Aussage des Kapitels.
  pruefe(
    'Einfache Medizin/Karte: die Phasen laufen von Framingham bis in die Gegenwart',
    karte.phasen[0].id === 'framingham-1948' &&
      /^lebensstil-medizin/.test(karte.phasen[karte.phasen.length - 1].id),
  );
  // Die Karte bewertet nicht, sondern zeigt Zustände — und sie sagt selbst,
  // wo die Zahlen wackeln (Zusatzregel für sensible Themen).
  const phasenText = karte.phasen.map((p) => `${p.label}\n${p.hinweis || ''}`).join('\n');
  pruefe(
    'Einfache Medizin/Karte: die Phasen benennen die Kritik an den Befunden selbst',
    /Kritik|umstritten|keine Kontrollgruppe|Geburtsregister/.test(phasenText),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['framingham', -71.42, 42.28],
    ['nordkarelien', 29.8, 62.8],
    ['sardinien', 9.45, 40.0],
    ['okinawa', 127.9, 26.4],
    ['ikaria', 26.03, 37.63],
    ['nicoya', -85.4, 10.1],
    ['loma-linda', -117.26, 34.05],
  ];
  pruefe(
    'Einfache Medizin/Karte: sechs bis acht Info-Punkte',
    karte.punkte.length >= 6 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Einfache Medizin/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Einfache Medizin/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Einfache Medizin/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Einfache Medizin/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Einfache Medizin/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Einfache Medizin/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Einfache Medizin/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
  }

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of ['Europa', 'Asien', 'Afrika', 'Nordamerika', 'Atlantik', 'Mittelmeer']) {
    pruefe(`Einfache Medizin/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }
  for (const name of ['Sardinien', 'Okinawa', 'Ikaria', 'Nicoya', 'Loma Linda']) {
    pruefe(`Einfache Medizin/Karte: die blaue Zone „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Einfache Medizin: Titel und Epoche stehen',
    thema.titel === 'Die einfache Medizin' && thema.epoche === 'heute',
  );
  pruefe('Einfache Medizin: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe('Einfache Medizin: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe('Einfache Medizin: das Quiz hat 3 bis 5 Fragen', thema.quiz.length >= 3 && thema.quiz.length <= 5);

  // Der Aufhänger bleibt neutral: Er stellt die These vor, ohne sie zu
  // beschließen (TONE-Regel).
  pruefe(
    'Einfache Medizin/TONE: der Aufhänger schreibt die These dem Betreiber zu',
    /Betreiber|These/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Einfache Medizin/TONE: der Aufhänger kündigt beide Seiten an',
    /(dagegen|gegen sie|fair|prüft)/.test(thema.aufhaenger.text),
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Einfache Medizin/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Einfache Medizin/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die Längenregel -----------------------------------------------------
  // Ab Kapitel 9 gilt: ausführlich. Die Obergrenze verhindert nur das
  // Ausufern.
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
    thema.urteil.hinweis || '',
  ]
    .join('\n')
    .split('\n').length;
  pruefe(
    `Einfache Medizin/Länge: das Kapitel bleibt unter ${MAX_ZEILEN_KAPITEL} Zeilen (${zeilenKapitel})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // --- Die erste Stimme ----------------------------------------------------
  const alltag = thema.perspektiven.find((p) => p.id === 'alltag');
  pruefe('Einfache Medizin: die Stimme des Alltags ist die erste Perspektive', thema.perspektiven[0] === alltag);
  if (alltag) {
    pruefe('Einfache Medizin: die erste Perspektive ist Opus zugeschrieben', alltag.stimme === 'Opus');
    pruefe('Einfache Medizin: die erste Perspektive heißt nach ihrer Sicht', /Alltags/.test(alltag.name));
    pruefe(
      'Einfache Medizin: die erste Perspektive ist ausgeführt (über 15000 Zeichen)',
      alltag.text.length > 15000,
    );
    const ueberschriften = alltag.text.split('\n').filter((z) => z.startsWith('## '));
    pruefe(
      'Einfache Medizin: die erste Perspektive ist in Abschnitte gegliedert',
      ueberschriften.length >= 8,
    );

    // Sie sagt selbst, dass sie eine Erzählung ist und keine Wahrheit.
    pruefe(
      'Einfache Medizin: die erste Perspektive kennzeichnet sich als Denkart',
      /Denkart, keine Wahrheit|keine Wahrheit/.test(alltag.text),
    );

    // Die Dramaturgie dieses Kapitels: die Stunden.
    pruefe(
      'Einfache Medizin: die Dramaturgie der Stunden trägt das Kapitel',
      /8\.758/.test(alltag.text) && /8\.760/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin: die kurze Sprechzeit ist belegt genannt',
      /7,6 Minuten/.test(alltag.text) && /BMJ Open|2017/.test(alltag.text),
    );

    // --- Die drei Säulen der Betreiber-These ------------------------------
    pruefe(
      'Einfache Medizin/These: Säule 1 — Bewegung, und der Körper ist dafür gebaut',
      /## Die erste Säule/.test(alltag.text) &&
        /(Bewegung will|benutzt wird, wird erhalten|abgebaut)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/These: Säule 2 — Ernährung, wenig verarbeitet',
      /## Die zweite Säule/.test(alltag.text) &&
        /(ultraverarbeitet|verarbeitet)/.test(alltag.text) &&
        /täglich hineingeht/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/These: Säule 3 — soziales Umfeld und Stress',
      /## Die dritte Säule/.test(alltag.text) &&
        /(Einsamkeit|Verbundenheit)/.test(alltag.text) &&
        /(Dauerstress|Stress)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/These: „keine Raketenwissenschaft" wird aufgegriffen',
      /Raketenwissenschaft/.test(alleTexte(thema)),
    );

    // --- Die Belege mit Namen und Jahr (KEINE-GERÜCHTE-Regel) -------------
    const belege = [
      ['die WHO-Zahlen zu den nichtübertragbaren Krankheiten', /74 Prozent/],
      ['die Busschaffner-Studie von Jeremy Morris (1953)', /Jeremy Morris/],
      ['die Sieben-Länder-Studie von Ancel Keys (ab 1958)', /Ancel Keys/],
      ['Roseto in Pennsylvania (ab 1961)', /Roseto/],
      ['Nordkarelien (ab 1972)', /Nordkarelien/],
      ['Whitehall II und Michael Marmot (ab 1985)', /Marmot/],
      ['das Diabetes Prevention Program (2002)', /Diabetes Prevention Program/],
      ['INTERHEART (2004)', /INTERHEART/],
      ['die blauen Zonen (Pes und Poulain, 2004)', /Pes/],
      ['EPIC-Potsdam (2009)', /EPIC-Potsdam/],
      ['Holt-Lunstad zur Einsamkeit (2010)', /Holt-Lunstad/],
      ['Look AHEAD (2013)', /Look AHEAD/],
      ['DiRECT (2018)', /DiRECT/],
      ['der Versuch von Kevin Hall (2019)', /Kevin Hall/],
    ];
    for (const [name, muster] of belege) {
      pruefe(`Einfache Medizin/Belege: ${name} steht mit Namen im Text`, muster.test(alltag.text));
    }
    pruefe(
      'Einfache Medizin/Belege: die Kernzahl 78 Prozent aus Potsdam steht da',
      /78 Prozent/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/Belege: die Remissionszahlen der DiRECT-Studie stehen da',
      /46 Prozent/.test(alltag.text) && /36 Prozent/.test(alltag.text),
    );

    // --- TONE-Regel: die eigenen Schwachstellen selbst benennen -----------
    pruefe(
      'Einfache Medizin/TONE: die Stimme nennt die Studie, die gegen sie spricht',
      /gegen mich spricht/.test(alltag.text) && /Look AHEAD/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/TONE: die blauen Zonen werden selbst in Zweifel gezogen',
      /Newman/.test(alltag.text) && /(Geburtsregister|Register)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/TONE: die Schwäche der Ernährungsforschung wird zugegeben',
      /(schwächste Forschung|Fragebögen)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/TONE: die zurückgezogene PREDIMED-Studie wird genannt',
      /PREDIMED/.test(alltag.text) && /zurückgezogen/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/TONE: Bewegung wird nicht als Abnehmmittel verkauft',
      /schlechtes Abnehmmittel/.test(alltag.text),
    );

    // --- TONE-Regel: die Akutmedizin wird nicht abgewertet ----------------
    pruefe(
      'Einfache Medizin/TONE: die Erfolge der Akutmedizin werden ausdrücklich anerkannt',
      /(Katheterlabor|großartig|Antibiotikum)/.test(alltag.text) &&
        /## Was ich nicht bin/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/TONE: die Stimme erklärt sich nicht zur Alternative',
      /keine Alternative/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/TONE: sie klagt nicht die Ärzte an, sondern die Konstruktion',
      /keine Anklage gegen Ärzte/.test(alltag.text) && /Konstruktionsfrage/.test(alltag.text),
    );

    // --- TONE-Regel: der Lebensstil-Vorwurf darf nicht stigmatisieren -----
    pruefe(
      'Einfache Medizin/TONE: nicht jede chronische Krankheit ist eine Lebensstil-Krankheit',
      /Typ-1-Diabetes/.test(alltag.text) &&
        /(Multiple Sklerose|Rheuma|Autoimmun)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/TONE: die Grenzen der freien Wahl werden benannt',
      /Schicht/.test(alltag.text) &&
        /(Armut|zwei Arbeitsstellen|Geld|Zeit)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/TONE: das Wort Verantwortung wird ausdrücklich eingegrenzt',
      /Verantwortung/.test(alltag.text) && /(selbst schuld|Vorwurf)/.test(alltag.text),
    );

    // --- Der Innovations-Zyklus in seiner Umkehrung -----------------------
    pruefe(
      'Einfache Medizin/Zyklus: das Muster wird benannt und umgedreht',
      /## Wenn das Einfache zur Ware wird/.test(alltag.text) &&
        /(zuerst geschadet|steht dieses Muster auf dem Kopf)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/Zyklus: der neue Schaden entsteht, wo das Einfache zur Ware wird',
      /(Wellness|Diätmarkt|Nahrungsergänzung)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/Zyklus: die Branchenzahl wird als Branchenzahl gekennzeichnet',
      /(Vorbehalt|stammt von der Branche)/.test(alltag.text),
    );

    // --- Die Tür zur zweiten Stimme --------------------------------------
    pruefe(
      'Einfache Medizin: die erste Perspektive öffnet die Tür zur zweiten Stimme',
      /zweite Stimme/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin: die Tür führt zu den Verhältnissen',
      /Stimme der Verhältnisse/.test(alltag.text) &&
        /(Industrie|Werbung|Arbeitswelt|Gebührenordnung)/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin: die beiden Stimmen werden als gleichwertig bezeichnet',
      /gleichwertig/.test(alltag.text),
    );

    // --- Die Brücke zu Kapitel 19 ----------------------------------------
    pruefe(
      'Einfache Medizin/Brücke: das nächste Kapitel und die Schere sind angekündigt',
      /Kapitel\s*19/.test(alltag.text) && /Schere/.test(alltag.text),
    );
    pruefe(
      'Einfache Medizin/Brücke: die Frage bleibt offen gestellt',
      /Medizin für alle/.test(alltag.text) && /keine Antwort/.test(alltag.text),
    );
  }

  // --- Das Erzähl-Muster (Entwicklung / Annahmen / Wirkungen) --------------
  // Über ALLE Perspektiven zusammen geprüft: So bleibt die Zusage auch dann
  // erfüllt, wenn Hermes weitere Stimmen ergänzt.
  const perspektivenText = thema.perspektiven.map((p) => p.text).join('\n');
  pruefe(
    'Einfache Medizin/Erzähl-Muster: (a) wie das Wissen entstand',
    /Wie das Wissen entstand/.test(perspektivenText) ||
      /(Morris|Keys|Framingham)/.test(perspektivenText),
  );
  pruefe(
    'Einfache Medizin/Erzähl-Muster: (b) welche Annahmen dahinterstehen',
    /(Meine Annahme|Annahme lautet|Welche Annahme)/.test(perspektivenText),
  );
  pruefe(
    'Einfache Medizin/Erzähl-Muster: (c1) welche Wirkungen — die Erfolge',
    /(Remission|58 Prozent|78 Prozent|80 Prozent)/.test(perspektivenText),
  );
  pruefe(
    'Einfache Medizin/Erzähl-Muster: (c2) und die Grenzen',
    /(Grenze|Einschränkung|nicht bewiesen|unbewiesen)/.test(perspektivenText),
  );

  // --- Die Leitfrage des Kapitels -----------------------------------------
  // „Warum verschreibt die Medizin Pillen statt Lebensstil?" (Betreiber)
  const texte = alleTexte(thema);
  pruefe(
    'Einfache Medizin/Leitfrage: die Frage nach Pille und Rat wird gestellt',
    /(Pille|Rezept)/.test(texte) && /(Rat|Lebensänderung|Lebensstil)/.test(texte),
  );
  pruefe(
    'Einfache Medizin/Leitfrage: das Urteil greift sie auf, ohne sie zu beantworten',
    /\?/.test(thema.urteil.frage) && !/Antwort lautet/.test(thema.urteil.frage),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Einfache Medizin/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Einfache Medizin/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Einfache Medizin/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|Schuld)/i.test(frage.frage),
    );
  }

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Stimme ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Einfache Medizin/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 19)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig|als Nächstes|Als Nächstes)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Einfache Medizin/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Einfache Medizin/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Einfache Medizin/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
