// Prüfungen für Kapitel 9 — „Die grausamen Anfänge der modernen Chirurgie"
// und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Fünf Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen auf der gezeichneten Küste, Binnenorte
//      innerhalb der Landflächen, offene See außerhalb. Geprüft werden
//      bewusst Orte, die NICHT selbst Stützpunkte der Linien sind — sonst
//      prüfte der Test nur, ob eine Zahl mit sich selbst übereinstimmt.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen die Schnelligkeit stehen (Liston und die
//      achtundzwanzig Sekunden), die Anatomie und die Herkunft der Leichen
//      — und die Begründungslogik muss ausgeführt sein: warum so schnell,
//      warum die Anatomie, warum vor Publikum, warum gekauft ohne zu
//      fragen. Dazu die ehrlichen Grenzen: das Wundfieber, die
//      Sterblichkeit und die Ratlosigkeit über die Ursache (Miasmen).
//
//   3. **Die Längenregel, umgekehrt (Betreiber-Vorgabe 24.08.2026).** Ab
//      Kapitel 9 gilt: vollständig und ausführlich. Die erste Perspektive
//      muss deutlich umfangreicher sein als in den frühen Kapiteln — hier
//      als weiche Untergrenze geprüft. Nach oben bleibt eine großzügige
//      Grenze stehen, damit „ausführlich" nicht in „aufgebläht" kippt.
//
//   4. **Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026).** Die
//      berühmte Geschichte von der „Operation mit dreihundert Prozent
//      Sterblichkeit" darf erzählt werden — aber nur mit ausdrücklicher
//      Kennzeichnung als unbelegte Anekdote.
//
//   5. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, ehrliche
//      Wirkungsbilanz in beide Richtungen, Quiz-Umfang, offene
//      Urteilsfrage, Lernformat.
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 8: Die zweite
// Perspektive (die Patienten und die Toten — der Friedhof bei Nacht,
// Semmelweis als ihr Anwalt, der Körper als Ware) und die endgültige
// Synthese kommen erst mit dem Hermes-Pass dazu. Prüfungen, die nur für die
// erste Stimme gelten, hängen deshalb an ihrer id („chirurgen"); die
// Prüfungen zum Erzähl-Muster laufen über ALLE Perspektiven zusammen. Die
// Synthese wird je nach Ausbaustand verzweigt gemessen.
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
} = require('../utils/themen/karten/chirurgie-anfaenge.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt umfasst 30° Länge — der breiteste des Buches bisher
 * (Kapitel 8: 20°). 0,5° sind hier rund zwölf Bildpunkte auf der Karte.
 */
const KUESTEN_TOLERANZ = 0.5;

/**
 * Mindestumfang der ersten Perspektive (Neuzeit-Regel, Kapitel 9 ff.).
 *
 * Die frühen Kapitel durften höchstens ~250 Zeilen je Stimme haben. Ab hier
 * gilt die Umkehrung: Dieses Kapitel soll ausführlich sein. Die Untergrenze
 * ist bewusst weich — sie prüft nur, dass die Umkehrung überhaupt greift.
 */
const MIN_ZEILEN_ERSTE_STIMME = 300;

/** Obergrenze fürs ganze Kapitel — ausführlich ja, aufgebläht nein. */
const MAX_ZEILEN_KAPITEL = 1400;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 8: Ein
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
 * Dieser Ausschnitt hat sechs Landflächen: das Festland, Großbritannien,
 * Irland, Südschweden und die beiden großen dänischen Inseln.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge an der Nordsee genauso
 * „lang" wie an der Loire; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('chirurgie-anfaenge');
  pruefe(
    'Chirurgie: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 9 steht
  // hinter Harvey (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Chirurgie: steht in der App hinter „Harvey und der Blutkreislauf"',
    alleThemen.findIndex((t) => t.id === 'chirurgie-anfaenge') ===
      alleThemen.findIndex((t) => t.id === 'harvey') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Chirurgie/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Chirurgie/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss London, Edinburgh und Wien auf dasselbe Blatt bringen, dazu
  // Irland, Paris und Glasgow.
  pruefe(
    'Chirurgie/Karte: der Ausschnitt reicht von Irland bis Wien',
    RAHMEN.minLon <= -10 && RAHMEN.maxLon >= 17,
  );
  pruefe(
    'Chirurgie/Karte: der Ausschnitt reicht von den Alpen bis Nordschottland',
    RAHMEN.minLat <= 47 && RAHMEN.maxLat >= 57,
  );
  pruefe('Chirurgie/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Chirurgie/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Brighton (Ärmelkanal)', -0.14, 50.82, kuesten.grossbritannien],
    ['Falmouth (Cornwall)', -5.07, 50.15, kuesten.grossbritannien],
    ['Grimsby (Humber)', -0.08, 53.57, kuesten.grossbritannien],
    ['Bridlington (Yorkshire)', -0.19, 54.08, kuesten.grossbritannien],
    ['Dundee (Firth of Tay)', -2.97, 56.46, kuesten.grossbritannien],
    ['Buckie (Moray Firth)', -2.96, 57.68, kuesten.grossbritannien],
    ['Troon (Firth of Clyde)', -4.67, 55.55, kuesten.grossbritannien],
    ['Swansea (Wales)', -3.94, 51.62, kuesten.grossbritannien],
    ['Étretat (Normandie)', 0.2, 49.71, kuesten.festland],
    ['Dünkirchen (Flandern)', 2.2, 51.03, kuesten.festland],
    ['Brest (Bretagne)', -4.49, 48.39, kuesten.festland],
    ['Bremerhaven (Weser)', 8.58, 53.55, kuesten.festland],
    ['Esbjerg (Jütland)', 8.45, 55.47, kuesten.festland],
    ['Kolding (Kleiner Belt)', 9.49, 55.49, kuesten.festland],
    ['Stralsund (Ostsee)', 13.1, 54.31, kuesten.festland],
    ['Danzig (Weichselmündung)', 18.65, 54.35, kuesten.festland],
    ['Kinsale (Südirland)', -8.52, 51.7, kuesten.irland],
    ['Rosslare (Südostirland)', -6.34, 52.25, kuesten.irland],
    ['Belfast (Nordirland)', -5.93, 54.6, kuesten.irland],
    ['Göteborg (Kattegat)', 11.97, 57.7, kuesten.suedschweden],
    ['Landskrona (Öresund)', 12.83, 55.87, kuesten.suedschweden],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Chirurgie/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb einer Landfläche liegen ----------------
  const binnenorte = [
    ['London', -0.128, 51.508],
    ['Edinburgh', -3.19, 55.95],
    ['Glasgow', -4.25, 55.86],
    ['Liverpool', -2.99, 53.41],
    ['Manchester', -2.24, 53.48],
    ['Bristol', -2.59, 51.45],
    ['York', -1.08, 53.96],
    ['Dublin', -6.26, 53.35],
    ['Cork', -8.47, 51.9],
    ['Paris', 2.352, 48.857],
    ['Brüssel', 4.35, 50.85],
    ['Amsterdam', 4.9, 52.37],
    ['Hamburg', 9.99, 53.55],
    ['Berlin', 13.4, 52.52],
    ['Prag', 14.42, 50.09],
    ['München', 11.58, 48.14],
    ['Zürich', 8.54, 47.37],
    ['Wien', 16.373, 48.208],
    ['Kopenhagen', 12.57, 55.68],
    ['Malmö', 13.1, 55.58],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Chirurgie/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['der Ärmelkanal', 0.5, 50.3],
    ['die Nordsee', 3.0, 55.0],
    ['die Nordsee vor der Themsemündung', 2.0, 52.5],
    ['die Deutsche Bucht', 7.5, 54.2],
    ['die Irische See', -5.3, 53.6],
    ['der Nordkanal', -5.6, 55.1],
    ['der Firth of Clyde', -5.0, 55.5],
    ['der Atlantik westlich Irlands', -10.8, 53.5],
    ['der Golf von Biskaya', -4.0, 46.5],
    ['die See vor Nordwestschottland', -7.5, 57.5],
    ['das Skagerrak', 9.5, 57.9],
    ['das Kattegat', 11.3, 57.2],
    ['der Öresund', 12.75, 55.9],
    ['die Ostsee', 15.0, 55.5],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Chirurgie/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Chirurgie/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Chirurgie/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /1[78]\d\d/.test(phase.label),
    );
    pruefe(
      `Chirurgie/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Chirurgie/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: die Theater, der Handel mit
  // den Toten, das Gesetz, die Narkose, Wien, die Antiseptik.
  pruefe(
    'Chirurgie/Karte: eine Phase zeigt die OP-Theater vor Publikum',
    karte.phasen.some(
      (p) => /Theater/.test(p.label) && /(Betäubung|Narkose|Schnelligkeit)/.test(p.hinweis),
    ),
  );
  pruefe(
    'Chirurgie/Karte: eine Phase zeigt Burke und Hare 1828 in Edinburgh',
    karte.phasen.some(
      (p) =>
        /1828/.test(p.label) &&
        /Edinburgh/.test(p.label) &&
        /Burke/.test(p.hinweis) &&
        /Hare/.test(p.hinweis),
    ),
  );
  pruefe(
    'Chirurgie/Karte: eine Phase zeigt das Anatomy Act von 1832',
    karte.phasen.some(
      (p) => /1832/.test(p.label) && /Anatomy Act/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Chirurgie/Karte: eine Phase zeigt die Äther-Narkose von 1846',
    karte.phasen.some(
      (p) => /1846/.test(p.label) && /Äther/.test(p.hinweis) && /Liston/.test(p.hinweis),
    ),
  );
  pruefe(
    'Chirurgie/Karte: eine Phase zeigt Semmelweis 1847 in Wien',
    karte.phasen.some(
      (p) =>
        /1847/.test(p.label) &&
        /Wien/.test(p.label) &&
        /Semmelweis/.test(p.hinweis),
    ),
  );
  pruefe(
    'Chirurgie/Karte: eine Phase zeigt Lister 1867 in Glasgow als Ausblick',
    karte.phasen.some(
      (p) =>
        /1867/.test(p.label) &&
        /Glasgow/.test(p.label) &&
        /Lister/.test(p.hinweis),
    ),
  );
  pruefe(
    'Chirurgie/Karte: die Phasen laufen von den Theatern bis zur Antiseptik',
    karte.phasen[0].id === 'op-theater' &&
      karte.phasen[karte.phasen.length - 1].id === 'glasgow-1867',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Chirurgie/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch)/i.test(phasenText),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['london', -0.128, 51.508],
    ['edinburgh', -3.19, 55.95],
    ['wien', 16.373, 48.208],
    ['paris', 2.352, 48.857],
    ['glasgow', -4.25, 55.86],
    ['liverpool', -2.99, 53.41],
  ];
  pruefe(
    'Chirurgie/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Chirurgie/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Chirurgie/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Chirurgie/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Chirurgie/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Chirurgie/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die drei Pole des Kapitels: das Theater, der Handel mit den Toten und
  // das Händewaschen.
  const londonPunkt = karte.punkte.find((p) => p.id === 'london');
  pruefe(
    'Chirurgie/Karte: der Punkt London nennt die OP-Theater und den Äther von 1846',
    Boolean(
      londonPunkt &&
        /(Theater|St. Thomas)/.test(londonPunkt.text) &&
        /1846/.test(londonPunkt.text) &&
        /Äther/.test(londonPunkt.text),
    ),
  );
  const edinburghPunkt = karte.punkte.find((p) => p.id === 'edinburgh');
  pruefe(
    'Chirurgie/Karte: der Punkt Edinburgh nennt Burke, Hare und Knox',
    Boolean(
      edinburghPunkt &&
        /Burke/.test(edinburghPunkt.text) &&
        /Hare/.test(edinburghPunkt.text) &&
        /Knox/.test(edinburghPunkt.text),
    ),
  );
  const wienPunkt = karte.punkte.find((p) => p.id === 'wien');
  pruefe(
    'Chirurgie/Karte: der Punkt Wien nennt Semmelweis und das Jahr 1847',
    Boolean(
      wienPunkt && /Semmelweis/.test(wienPunkt.text) && /1847/.test(wienPunkt.text),
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
    `Chirurgie/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Chirurgie/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Chirurgie/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Chirurgie/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern Fässer, Studenten und
    // eine Nachricht.
    pruefe(
      `Chirurgie/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /Fässer|Ware|sezieren|Studenten|Nachricht|Äther|Hospitäler/.test(bewegung.text),
    );
  }
  const wegDerToten = (karte.bewegungen || []).find((b) => b.id === 'leichen-nach-edinburgh');
  pruefe('Chirurgie/Karte: der Weg der Toten ist eingezeichnet', Boolean(wegDerToten));
  if (wegDerToten) {
    pruefe(
      'Chirurgie/Karte: der Weg der Toten endet in Edinburgh',
      wegDerToten.nach[0] === P.punkt(-3.19, 55.95)[0] &&
        wegDerToten.nach[1] === P.punkt(-3.19, 55.95)[1],
    );
  }
  const wegDerNarkose = (karte.bewegungen || []).find(
    (b) => b.id === 'narkose-ueber-den-atlantik',
  );
  pruefe(
    'Chirurgie/Karte: der Weg der Narkose führt über den Atlantik nach London',
    Boolean(wegDerNarkose) &&
      wegDerNarkose.nach[0] === P.punkt(-0.128, 51.508)[0] &&
      /1846/.test(wegDerNarkose.text),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'England',
    'Schottland',
    'Irland',
    'Nordsee',
    'Ärmelkanal',
    'Frankreich',
    'Alpen',
    'Wien',
  ]) {
    pruefe(`Chirurgie/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Chirurgie: Titel und Epoche stehen',
    thema.titel === 'Die grausamen Anfänge der modernen Chirurgie' &&
      thema.epoche === '18./19. Jahrhundert',
  );
  pruefe('Chirurgie: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Chirurgie: der Aufhänger nennt die Schnelligkeit und den wachen Patienten',
    /(Bewusstsein|wach)/.test(thema.aufhaenger.frage + thema.aufhaenger.text) &&
      /achtundzwanzig Sekunden/.test(thema.aufhaenger.text) &&
      /Liston/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Chirurgie: der Aufhänger nennt das Wundfieber und die Herkunft der Leichen',
    /Wundfieber/.test(thema.aufhaenger.text) &&
      /Gräber/.test(thema.aufhaenger.text) &&
      /1828/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Chirurgie: der Aufhänger ist neutral formuliert (keine Vorverurteilung)',
    !/(rückständig|barbarisch|Metzger|Schlächter|Unmenschen)/i.test(thema.aufhaenger.text),
  );
  pruefe('Chirurgie: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Chirurgie: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Chirurgie: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Chirurgie/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Chirurgie/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const chirurgenStimme = thema.perspektiven.find((p) => p.id === 'chirurgen');
  pruefe(
    'Chirurgie: die Stimme der Chirurgen ist die erste Perspektive',
    thema.perspektiven[0] === chirurgenStimme,
  );
  if (!chirurgenStimme) return;

  pruefe(
    'Chirurgie: die erste Perspektive ist Opus zugeschrieben',
    chirurgenStimme.stimme === 'Opus',
  );
  pruefe(
    'Chirurgie: die erste Perspektive heißt nach ihrer Sicht',
    /Chirurg/.test(chirurgenStimme.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt
  // =========================================================================

  const zeilenErsteStimme = chirurgenStimme.text.split('\n').length;
  pruefe(
    `Chirurgie/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'Chirurgie/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 15000 Zeichen)',
    chirurgenStimme.text.length > 15000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Chirurgie/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = chirurgenStimme.text.replace(/\s+/g, ' ');

  const ueberschriften = chirurgenStimme.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Chirurgie: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 8,
  );
  pruefe(
    'Chirurgie: die Abschnitte bleiben überschaubar (höchstens vierzehn)',
    ueberschriften.length <= 14,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 9 darf
  // keine der acht bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf,
  // Kapitel 4 schreibt Briefe, Kapitel 5 folgt einem Buch von Station zu
  // Station, Kapitel 6 geht als Rundgang durch ein Haus, Kapitel 7
  // verhandelt vor Gericht, Kapitel 8 rechnet. Dieses Kapitel liest die UHR:
  // Die Abschnitte sind Zeitmarken um einen einzigen Schnitt herum.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Chirurgie: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Chirurgie: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Chirurgie: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'Chirurgie: die Abschnittsstruktur ist eine andere als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Chirurgie: die Abschnittsstruktur ist eine andere als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Chirurgie: die Abschnittsstruktur ist eine andere als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Chirurgie: die Abschnittsstruktur ist eine andere als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Chirurgie: die Abschnittsstruktur ist eine andere als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'Chirurgie: die Dramaturgie ist eine Uhr (Zeitmarken um einen Schnitt herum)',
    /^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /vorher/.test(h)).length >= 2 &&
      ueberschriften.some((h) => /^## Sekunde /.test(h)) &&
      ueberschriften.some((h) => /danach/.test(h)) &&
      ueberschriften.some((h) => /Tag/.test(h)),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Chirurgie: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Die Schnelligkeit: der Kern der Denkart, mit Zahl und Namen.
  pruefe(
    'Chirurgie/Denkart: die Schnelligkeit steht mit Zahl und Namen da',
    /Robert/.test(fliessend) &&
      /Liston/.test(fliessend) &&
      /achtundzwanzig Sekunden/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Denkart: der Schnitt wird Sekunde für Sekunde erzählt',
    /Sekunde null bis fünf/.test(fliessend) &&
      /Die Säge/.test(fliessend) &&
      /Sägemehl/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Denkart: der Grund für die Eile ist der fehlende Schlaf des Patienten',
    /Der Mensch, den wir aufschneiden, ist wach/.test(fliessend),
  );

  // (b) Die Anatomie und die Leichen: das Fundament und sein Preis.
  pruefe(
    'Chirurgie/Denkart: die Anatomie wird als Fundament erklärt',
    /Deshalb ist der tote Körper unsere einzige Schule/.test(fliessend) &&
      /Vesal/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Denkart: die Lücke zwischen Bedarf und legaler Quelle steht da',
    /hingerichteter Mörder/.test(fliessend) &&
      /Diese Quelle liefert ein paar Dutzend Körper im Jahr/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Denkart: der Markt für Leichen wird konkret (Grabräuber und Preis)',
    /Auferstehungsmänner/.test(fliessend) &&
      /acht bis zehn Guineen/.test(fliessend) &&
      /Sargdeckel/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Denkart: Burke und Hare und das Anatomy Act stehen im Text',
    /Burke/.test(fliessend) &&
      /Hare/.test(fliessend) &&
      /sechzehn/i.test(fliessend) &&
      /Anatomy Act/.test(fliessend) &&
      /1832/.test(fliessend),
  );

  // (c) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum die Anatomie? (unter dem Messer ist keine Zeit nachzusehen)',
      /Warum die Anatomie\?/.test(fliessend) &&
        /Weil unter dem Messer keine Zeit ist nachzusehen/.test(fliessend),
    ],
    [
      'Warum so schnell? (Schock, Blutverlust, die einzige Gnade)',
      /Warum so schnell\?/.test(fliessend) &&
        /Der Schmerz selbst tötet/.test(fliessend) &&
        /Jede Sekunde kostet Blut/.test(fliessend) &&
        /Schnelligkeit war unsere einzige Gnade/.test(fliessend),
    ],
    [
      'Warum vor Publikum? (es gibt keinen anderen Weg zu lernen — und der Ruhm)',
      /Warum vor Publikum\?/.test(fliessend) &&
        /Es gibt keinen anderen Weg zu lernen/.test(fliessend) &&
        /Es war eine Bühne, und wir haben uns gerne bewundern lassen/.test(fliessend),
    ],
    [
      'Warum gekauft, ohne zu fragen? (weil die geöffneten Gräber nicht die eigenen waren)',
      /Warum haben wir gekauft, ohne zu fragen\?/.test(fliessend) &&
        /weil die Gräber, die geöffnet wurden, nicht unsere waren/.test(fliessend),
    ],
    [
      'Warum die Miasmen? (die Lehre erklärte auffallend viel)',
      /Warum haben wir das geglaubt\?/.test(fliessend) &&
        /Nicht aus Trägheit/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Chirurgie/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Chirurgie/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );

  // (d) Die Grenzen der eigenen Denkart — von der Stimme selbst benannt.
  pruefe(
    'Chirurgie/Grenzen: das Wundfieber und seine vier Namen stehen da',
    /Wundrose/.test(fliessend) &&
      /Krankenhausbrand/.test(fliessend) &&
      /Blutvergiftung/.test(fliessend) &&
      /Wundstarrkrampf/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Grenzen: die Sterblichkeit wird mit Zahlen benannt',
    /jeder Dritte bis jeder Zweite/.test(fliessend) &&
      /vierzig von hundert Amputierten/.test(fliessend) &&
      /elf von hundert/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Grenzen: die Ratlosigkeit über die Ursache wird eingeräumt (Miasmen)',
    /Miasmen/.test(fliessend) &&
      /wir hatten kein Bild davon, \*\*woher\*\* es kam/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Grenzen: die eigene Hand als Überträger wird selbst benannt',
    /Weil die Antwort auf uns selbst gezeigt hätte/.test(fliessend) &&
      /das Sterben mit der eigenen Hand von Bett zu Bett trägt/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Grenzen: die verschlossenen Höhlen des Körpers werden benannt',
    /Erichsen/.test(fliessend) && /1873/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Grenzen: der ungewaschene Rock wird nicht verschwiegen',
    /alten schwarzen Gehrock/.test(fliessend) && /nicht gewaschen/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Grenzen: die Herkunft des Wissens wird als Schuld benannt',
    /Der letzte Wille eines Menschen war unserer Neugier nicht gewachsen/.test(fliessend) &&
      /Das Gesetz nahm den Reichen die Angst und gab sie den Armen/.test(fliessend),
  );

  // (e) Semmelweis fair — und die eigene Zunft nicht geschont.
  pruefe(
    'Chirurgie/Semmelweis: sein Fund wird richtig erzählt (Chlorkalk, zwei Abteilungen)',
    /Ignaz Semmelweis/.test(fliessend) &&
      /Chlorkalk/.test(fliessend) &&
      /Hebammen/.test(fliessend) &&
      /1847/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Semmelweis: die Gründe der Gegenseite werden fair genannt',
    /Er konnte nicht sagen, \*\*was\*\* die Hände übertrugen/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Semmelweis: die eigene Schuld wird nicht weggeredet',
    /Er hatte recht, wir hatten unrecht/.test(fliessend) &&
      /Es entschuldigt es nicht/.test(fliessend),
  );

  // =========================================================================
  // 5. Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026)
  // =========================================================================

  // Die Geschichte von den „dreihundert Prozent" wird erzählt — aber
  // ausdrücklich als unbelegte Anekdote gekennzeichnet.
  pruefe(
    'Chirurgie/Belege: die 300-Prozent-Geschichte wird als unbelegte Anekdote gekennzeichnet',
    /dreihundert Prozent/.test(fliessend) &&
      /lässt sich in den Berichten der Zeit nicht nachweisen/.test(fliessend) &&
      /eine Anekdote, kein Beleg/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Belege: auch andere Erzählungen werden als solche markiert',
    /soll \*\*Robert Liston\*\* in London gesagt haben|wird erzählt, er habe/.test(fliessend),
  );

  // =========================================================================
  // 6. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Patienten und die Toten) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Chirurgie/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1752/.test(perspektivenText) &&
      /1828/.test(perspektivenText) &&
      /1832/.test(perspektivenText) &&
      /1846/.test(perspektivenText) &&
      /1847/.test(perspektivenText) &&
      /1867/.test(perspektivenText),
  );
  pruefe(
    'Chirurgie/Erzähl-Muster: (a2) die Orte werden genannt',
    /London/.test(perspektivenText) &&
      /Edinburgh/.test(perspektivenText) &&
      /Paris/.test(perspektivenText) &&
      /Wien/.test(perspektivenText),
  );
  pruefe(
    'Chirurgie/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Miasmen|löblichen Eiter|Denkart)/.test(perspektivenText),
  );
  pruefe(
    'Chirurgie/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /Was Bestand hat/.test(perspektivenText) &&
      /Aderpresse/.test(perspektivenText) &&
      /überlebbar/.test(perspektivenText),
  );
  pruefe(
    'Chirurgie/Erzähl-Muster: (c2) und die Grenzen',
    /Was uns nicht gelungen ist/.test(perspektivenText) &&
      /(Wundfieber|Infektion)/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Stimme selbst.
  pruefe(
    'Chirurgie/Bilanz: die Stimme nennt, was von ihrer Arbeit geblieben ist',
    /Die Anatomie als Fundament/.test(fliessend) &&
      /an Zahlen messen lassen muss/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Bilanz: die Stimme nennt, was die Narkose nicht gelöst hat',
    /Die Narkose nahm den Schmerz, nicht das Sterben/.test(fliessend),
  );
  pruefe(
    'Chirurgie/Bilanz: der Ausblick auf Lister und das nächste Kapitel steht da',
    /Lister/.test(fliessend) && /1867/.test(fliessend) && /Karbolsäure/.test(fliessend),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst, und die
  // andere Seite wird nicht abgewertet.
  pruefe(
    'Chirurgie/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert|Wundermittel für|immer wirksam)/i.test(fliessend),
  );
  pruefe(
    'Chirurgie/TONE: die erste Perspektive wertet niemanden pauschal ab',
    !/(rückständig|primitiv|barbarisch|lächerlich|verlogen|Hokuspokus)/i.test(fliessend),
  );
  pruefe(
    'Chirurgie/TONE: die Stimme stellt sich nicht ins Recht',
    /Am Ende hatten andere recht, nicht wir/.test(fliessend),
  );
  pruefe(
    'Chirurgie/TONE: eine falsche Lehre wird nicht als Dummheit abgetan',
    /Eine falsche Erklärung kann richtige Handlungen hervorbringen/.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Chirurgie: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Chirurgie: die Tür führt zu den Patienten und den Toten',
    /gehört den Patienten und den Toten/.test(fliessend) &&
      /Friedhof/.test(fliessend),
  );
  pruefe(
    'Chirurgie: die Tür stellt die Frage, die die zweite Stimme weitertragen soll',
    /Was ist ein menschlicher Körper wert, wenn ein anderer ihn braucht\?/.test(fliessend) &&
      /Handel mit Körpern/.test(fliessend) &&
      /mit Belegen/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Chirurgie/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Chirurgie/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Chirurgie/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus|finster)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Chirurgie/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Chirurgie/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 10)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Chirurgie/Synthese: sagt, welche Stimme noch kommt',
      /Patienten und den Toten/.test(thema.synthese) &&
        /(Friedhof|Grab|Semmelweis)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Chirurgie/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Chirurgie/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Chirurgie/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
