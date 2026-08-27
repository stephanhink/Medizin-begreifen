// Prüfungen für Kapitel 15 — „mRNA und COVID" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Die Aufgaben dieser Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen an Nordsee, Kanal und Ostsee auf der
//      gezeichneten Küste, Binnenorte innerhalb der Landflächen, offene
//      See außerhalb. Der Ausschnitt umfasst 14° Länge, deshalb die
//      Toleranz von 0,4°.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe, das Herzstück).** Im Text
//      der ersten Stimme müssen die neue Denkart (die Bauanleitung statt
//      des Erregers, der Körper als Produktionsstätte) und die
//      Begründungslogik ausgeführt sein: Warum mRNA? Warum so schnell?
//      Warum die Massenimpfung? — mindestens zwei dieser Warum-Fragen
//      müssen mit Begründung beantwortet werden.
//
//   3. **Die ehrlichen Grenzen (TONE-Regel doppelt).** Die Stimme vom
//      Podium benennt ihre unbequemen Stellen SELBST: die fehlenden
//      Langzeitdaten, die Herzmuskelentzündungen, die überhebliche
//      Kommunikation, den gescheiterten Kandidaten in Tübingen.
//
//   4. **Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026).** Die
//      dokumentierten Fakten des Kapitels stehen da (Karikó/Weissman, die
//      Sequenz vom 10. Januar 2020, die erste Impfung am 8. Dezember
//      2020), und geschätzte Zahlen (die geretteten Leben) sind als
//      Modellrechnung gekennzeichnet.
//
//   5. **Der Innovations-Zyklus (Betreiber-Beobachtung 26.08.2026).** Der
//      rote Faden des Buches: Die Frage ist nicht gut oder böse, sondern
//      in welcher Phase der Reife die Technologie steht — und wer über
//      die Dauer der Prüfzeit entscheidet.
//
//   6. **Die Längenregel, umgekehrt (Betreiber-Vorgabe 24.08.2026).** Ab
//      Kapitel 9 gilt: vollständig und ausführlich. Nach oben bleibt eine
//      großzügige Grenze, damit „ausführlich" nicht in „aufgebläht"
//      kippt.
//
//   7. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, Quiz-Umfang,
//      offene Urteilsfrage, Lernformat und die offene Tür zur zweiten
//      Stimme (die Skeptiker).
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 14: Die zweite
// Perspektive (die Skeptiker) und die endgültige Synthese kommen erst mit
// dem Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten,
// hängen deshalb an ihrer id („befuerworter"); die Prüfungen zum
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
} = require('../utils/themen/karten/mrna-covid.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt umfasst 14° Länge — dasselbe Maß wie die Blätter der
 * Kapitel 13 und 14. 0,4° sind hier rund zwanzig Bildpunkte in der
 * Waagerechten; das deckt die Vereinfachung der Wattenmeer- und
 * Fördenküsten ab, ohne einen falsch gesetzten Punkt durchzulassen.
 */
const KUESTEN_TOLERANZ = 0.4;

/**
 * Mindestumfang der ersten Perspektive (Neuzeit-Regel, Kapitel 9 ff.).
 *
 * Die frühen Kapitel durften höchstens ~250 Zeilen je Stimme haben; ab
 * Kapitel 9 gilt die Umkehrung — vollständig und ausführlich. Für dieses
 * Kapitel gilt die Längenregel ausdrücklich (Betreiber-Vorgabe).
 */
const MIN_ZEILEN_ERSTE_STIMME = 300;

/**
 * Obergrenze fürs ganze Kapitel — ausführlich ja, aufgebläht nein.
 *
 * Die zweite Stimme (die Skeptiker) kommt im Hermes-Pass noch dazu; die
 * Grenze lässt dafür Raum, ohne dass das Kapitel ausufert.
 */
const MAX_ZEILEN_KAPITEL = 2000;

/**
 * Wie weit ein Info-Punkt von der Projektion seiner Stadtkoordinaten
 * abweichen darf (in Bildpunkten).
 *
 * Die Stadtkoordinaten unten sind gerundete Atlaswerte; Opus hat mit
 * leicht anderen Nachkommastellen projiziert. 6 px sind rund 0,12° in der
 * Länge — genug für Rundungsunterschiede, zu wenig für einen falsch
 * gesetzten Punkt.
 */
const PUNKT_TOLERANZ_PX = 6;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 14: Ein
 * Strahl nach Osten schneidet den Rand eines geschlossenen Rings ungerade
 * oft, wenn der Punkt drinnen liegt. Gerechnet wird in Längen-/Breitengraden.
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
 * Dieser Ausschnitt hat zwei Landflächen: das Festland (Frankreich,
 * Benelux, Deutschland, die Schweiz, Böhmen — in diesem Rahmen hängt alles
 * zusammen) und Großbritannien, das ins Blatt hineinragt.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge an der Nordsee genauso
 * „lang" wie am Alpenrand; die Toleranz würde im Norden großzügiger.
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

/** Kürzester Abstand eines Punktes zu einem Küstenzug. */
function abstandZuKueste(punkt, ring) {
  let kleinster = Infinity;
  for (let i = 0; i < ring.length; i += 1) {
    const abstand = abstandZuStrecke(punkt, ring[i], ring[(i + 1) % ring.length]);
    if (abstand < kleinster) kleinster = abstand;
  }
  return kleinster;
}

/** Kürzester Abstand eines Punktes zu irgendeiner gezeichneten Küste. */
function abstandZuAllenKuesten(punkt) {
  let kleinster = Infinity;
  for (const ring of Object.values(kuesten)) {
    const abstand = abstandZuKueste(punkt, ring);
    if (abstand < kleinster) kleinster = abstand;
  }
  return kleinster;
}

/**
 * @param {(name: string, ok: boolean) => void} pruefe Prüf-Funktion des Rahmens
 */
export function laufe(pruefe) {
  const thema = themaNachId('mrna-covid');
  pruefe(
    'mRNA/COVID: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 15
  // steht hinter der Pharmaindustrie (Themenlandkarte in CLAUDE.md).
  pruefe(
    'mRNA/COVID: steht in der App hinter „Die moderne Pharmaindustrie"',
    alleThemen.findIndex((t) => t.id === 'mrna-covid') ===
      alleThemen.findIndex((t) => t.id === 'pharmaindustrie') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('mRNA/COVID/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'mRNA/COVID/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss die sechs Orte des Kapitels auf ein Blatt bringen: London,
  // Oxford, Coventry, Mainz, Tübingen und Marburg — und im Westen genug
  // Wasser lassen, damit die Linie aus Wuhan das Bild erreichen kann.
  pruefe(
    'mRNA/COVID/Karte: der Ausschnitt reicht vom Ärmelkanal bis über den Rhein',
    RAHMEN.minLon <= -2.5 && RAHMEN.maxLon >= 10.5,
  );
  pruefe(
    'mRNA/COVID/Karte: der Ausschnitt reicht von der Schweiz bis an die Nordsee',
    RAHMEN.minLat <= 47.5 && RAHMEN.maxLat >= 55,
  );
  pruefe('mRNA/COVID/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('mRNA/COVID/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Calais (Pas-de-Calais)', 1.86, 50.96],
    ['Dünkirchen', 2.38, 51.03],
    ['Ostende (Flandern)', 2.92, 51.22],
    ['Rotterdam (Maasmündung)', 4.48, 51.92],
    ['Scheveningen (Holland)', 4.28, 52.11],
    ['Den Helder (Spitze von Holland)', 4.76, 52.96],
    ['Harlingen (Friesland)', 5.42, 53.17],
    ['Borkum (Ostfriesische Inseln)', 6.75, 53.59],
    ['Emden (Ostfriesland)', 7.19, 53.36],
    ['Wilhelmshaven (Jadebusen)', 8.11, 53.52],
    ['Bremerhaven (Wesermündung)', 8.58, 53.55],
    ['Cuxhaven (Elbmündung)', 8.71, 53.87],
    ['Husum (Nordfriesland)', 9.05, 54.48],
    ['Flensburg (Förde)', 9.43, 54.79],
    ['Kiel (Kieler Förde)', 10.14, 54.32],
    ['Travemünde (Lübecker Bucht)', 10.87, 53.96],
    ['Dover (Straße von Dover)', 1.32, 51.13],
    ['Folkestone (Kent)', 1.18, 51.08],
    ['Brighton (Sussex)', -0.14, 50.82],
    ['Portsmouth (Hampshire)', -1.09, 50.8],
    ['Southampton (Solent)', -1.4, 50.9],
  ];
  for (const [name, lon, lat] of kuestenorte) {
    const abstand = abstandZuAllenKuesten([lon, lat]);
    pruefe(
      `mRNA/COVID/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb einer Landfläche liegen ----------------
  const binnenorte = [
    ['Mainz', 8.27, 49.99],
    ['Tübingen', 9.06, 48.52],
    ['Marburg', 8.77, 50.81],
    ['Frankfurt am Main', 8.68, 50.11],
    ['Köln', 6.96, 50.94],
    ['Münster', 7.63, 51.96],
    ['Hannover', 9.73, 52.37],
    ['Hamburg', 9.99, 53.55],
    ['Bremen', 8.8, 53.08],
    ['Stuttgart', 9.18, 48.78],
    ['Freiburg', 7.85, 47.99],
    ['Basel', 7.59, 47.56],
    ['Straßburg', 7.75, 48.58],
    ['Paris', 2.35, 48.86],
    ['Brüssel', 4.35, 50.85],
    ['Amsterdam', 4.9, 52.37],
    ['Luxemburg', 6.13, 49.61],
    ['Gießen', 8.67, 50.58],
    ['Ulm', 9.99, 48.4],
    ['Augsburg', 10.9, 48.37],
    ['London', -0.13, 51.51],
    ['Oxford', -1.26, 51.75],
    ['Coventry', -1.51, 52.41],
    ['Birmingham', -1.9, 52.48],
    ['Cambridge', 0.12, 52.2],
    ['Norwich (Ostanglien)', 1.29, 52.63],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`mRNA/COVID/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['die mittlere Nordsee', 4.0, 55.2],
    ['die Deutsche Bucht', 7.5, 54.3],
    ['die südliche Nordsee', 3.6, 52.8],
    ['der Ärmelkanal', 0.5, 50.3],
    ['der Kanal vor Dover', 1.5, 51.0],
    ['die Nordsee vor Sylt', 7.9, 54.9],
    ['die Kieler Bucht', 10.5, 54.7],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`mRNA/COVID/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('mRNA/COVID/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `mRNA/COVID/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\b(19\d\d|20\d\d)\b/.test(phase.label),
    );
    pruefe(
      `mRNA/COVID/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `mRNA/COVID/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: die dreißig Jahre Vorarbeit,
  // die Sequenz, die Prüfung, die Zulassung, die Massenimpfung, der
  // Nobelpreis — und die offenen Fragen.
  pruefe(
    'mRNA/COVID/Karte: eine Phase zeigt die Vorarbeit (Karikó und Weissman, 2005)',
    karte.phasen.some(
      (p) =>
        /1990/.test(p.label + p.hinweis) &&
        /Karikó/.test(p.hinweis) &&
        /Weissman/.test(p.hinweis) &&
        /2005/.test(p.hinweis) &&
        /Bauanleitung/.test(p.hinweis),
    ),
  );
  pruefe(
    'mRNA/COVID/Karte: eine Phase zeigt die Erbgutfolge vom 10. Januar 2020',
    karte.phasen.some(
      (p) =>
        /10\. Januar 2020/.test(p.label) &&
        /Zhang Yongzhen/.test(p.hinweis) &&
        /66 Tage/.test(p.hinweis) &&
        /Seattle/.test(p.hinweis),
    ),
  );
  pruefe(
    'mRNA/COVID/Karte: eine Phase zeigt die Prüfung (43.548 Freiwillige, verblindet)',
    karte.phasen.some(
      (p) =>
        /43\.548/.test(p.hinweis) &&
        /27\. Juli 2020/.test(p.hinweis) &&
        /verblindet/.test(p.hinweis) &&
        /zwei Monate/.test(p.hinweis),
    ),
  );
  pruefe(
    'mRNA/COVID/Karte: eine Phase zeigt die erste Impfung (Margaret Keenan, 8. Dezember 2020)',
    karte.phasen.some(
      (p) =>
        /2\. Dezember 2020/.test(p.hinweis) &&
        /MHRA/.test(p.hinweis) &&
        /Margaret Keenan/.test(p.hinweis) &&
        /8\. Dezember 2020/.test(p.hinweis),
    ),
  );
  pruefe(
    'mRNA/COVID/Karte: eine Phase zeigt Massenimpfung und Nebenwirkungen (Marburg, Myokarditis, CureVac)',
    karte.phasen.some(
      (p) =>
        /2021/.test(p.label) &&
        /Marburg/.test(p.hinweis) &&
        /Herzmuskelentzündungen/.test(p.hinweis) &&
        /47 Prozent/.test(p.hinweis),
    ),
  );
  pruefe(
    'mRNA/COVID/Karte: eine Phase zeigt den Nobelpreis und die offenen Fragen',
    karte.phasen.some(
      (p) =>
        /2\. Oktober 2023/.test(p.hinweis) &&
        /Nobelpreis/.test(p.hinweis) &&
        /Langzeitdaten/.test(p.hinweis),
    ),
  );
  pruefe(
    'mRNA/COVID/Karte: die Phasen laufen von der Vorarbeit bis zum Nobelpreis',
    karte.phasen[0].id === 'vorarbeit-1990-2019' &&
      karte.phasen[karte.phasen.length - 1].id === 'nobelpreis-2023',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'mRNA/COVID/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch|Betrüger|Gier|Verschwörung)/i.test(
      phasenText,
    ),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier (gerundete Atlaswerte), die Projektion rechnet
  // sie nach; eine kleine Toleranz deckt Rundungsunterschiede ab.
  const erwartetePunkte = [
    ['mainz', 8.27, 49.99, 'Mainz'],
    ['tuebingen', 9.06, 48.52, 'Tübingen'],
    ['marburg', 8.77, 50.81, 'Marburg'],
    ['oxford', -1.26, 51.75, 'Oxford'],
    ['coventry', -1.51, 52.41, 'Coventry'],
    ['london', -0.13, 51.51, 'London'],
  ];
  pruefe(
    'mRNA/COVID/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat, name] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`mRNA/COVID/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    const abstand = Math.sqrt((punkt.x - x) ** 2 + (punkt.y - y) ** 2);
    pruefe(
      `mRNA/COVID/Atlas: „${id}" sitzt bei ${name} (${abstand.toFixed(1)} px Abweichung)`,
      abstand <= PUNKT_TOLERANZ_PX,
    );
    pruefe(`mRNA/COVID/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `mRNA/COVID/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'mRNA/COVID/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die Pole des Kapitels: die Firma, die Außenseiter-Stadt, das Werk, der
  // Vektor-Impfstoff, die erste Impfung, die Zulassung.
  const mainzPunkt = karte.punkte.find((p) => p.id === 'mainz');
  pruefe(
    'mRNA/COVID/Karte: der Punkt Mainz nennt BioNTech, Şahin und Türeci',
    Boolean(
      mainzPunkt &&
        /BioNTech/.test(mainzPunkt.text) &&
        /Şahin/.test(mainzPunkt.text) &&
        /Türeci/.test(mainzPunkt.text) &&
        /2008/.test(mainzPunkt.text),
    ),
  );
  const tuebingenPunkt = karte.punkte.find((p) => p.id === 'tuebingen');
  pruefe(
    'mRNA/COVID/Karte: der Punkt Tübingen nennt CureVac und das Jahr 2000',
    Boolean(
      tuebingenPunkt &&
        /CureVac/.test(tuebingenPunkt.text) &&
        /2000/.test(tuebingenPunkt.text) &&
        /Außenseiter/.test(tuebingenPunkt.text),
    ),
  );
  const marburgPunkt = karte.punkte.find((p) => p.id === 'marburg');
  pruefe(
    'mRNA/COVID/Karte: der Punkt Marburg nennt das Werk und die Milliarde Dosen',
    Boolean(
      marburgPunkt &&
        /Werk/.test(marburgPunkt.text) &&
        /Milliarde Dosen/.test(marburgPunkt.text) &&
        /2020/.test(marburgPunkt.text),
    ),
  );
  const oxfordPunkt = karte.punkte.find((p) => p.id === 'oxford');
  pruefe(
    'mRNA/COVID/Karte: der Punkt Oxford nennt Sarah Gilbert und den Vektor-Impfstoff',
    Boolean(
      oxfordPunkt &&
        /Sarah Gilbert/.test(oxfordPunkt.text) &&
        /Vektor-Impfstoff/.test(oxfordPunkt.text),
    ),
  );
  const coventryPunkt = karte.punkte.find((p) => p.id === 'coventry');
  pruefe(
    'mRNA/COVID/Karte: der Punkt Coventry nennt Margaret Keenan und den 8. Dezember 2020',
    Boolean(
      coventryPunkt &&
        /Margaret Keenan/.test(coventryPunkt.text) &&
        /8\. Dezember 2020/.test(coventryPunkt.text),
    ),
  );
  const londonPunkt = karte.punkte.find((p) => p.id === 'london');
  pruefe(
    'mRNA/COVID/Karte: der Punkt London nennt die MHRA und den 2. Dezember 2020',
    Boolean(
      londonPunkt &&
        /MHRA/.test(londonPunkt.text) &&
        /2\. Dezember 2020/.test(londonPunkt.text) &&
        /rollend/.test(londonPunkt.text),
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
    `mRNA/COVID/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'mRNA/COVID/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `mRNA/COVID/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `mRNA/COVID/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern eine Datei, eine
    // Kühlkette und ein Stapel Unterlagen.
    pruefe(
      `mRNA/COVID/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /(Wuhan|Puurs|Amsterdam|Kühlkette|Unterlagen)/.test(bewegung.text),
    );
  }
  const sequenz = (karte.bewegungen || []).find((b) => b.id === 'sequenz-aus-china');
  pruefe(
    'mRNA/COVID/Karte: die Erbgutfolge endet in Mainz',
    Boolean(sequenz) &&
      sequenz.nach[0] === mainzPunkt.x &&
      sequenz.nach[1] === mainzPunkt.y,
  );
  pruefe(
    'mRNA/COVID/Karte: die Erbgutfolge nennt Zhang Yongzhen, Wuhan und den 10. Januar 2020',
    Boolean(sequenz) &&
      /Zhang Yongzhen/.test(sequenz.text) &&
      /Wuhan/.test(sequenz.text) &&
      /10\. Januar 2020/.test(sequenz.text),
  );
  const dosen = (karte.bewegungen || []).find((b) => b.id === 'dosen-nach-coventry');
  pruefe(
    'mRNA/COVID/Karte: die Dosen enden in Coventry',
    Boolean(dosen) &&
      dosen.nach[0] === coventryPunkt.x &&
      dosen.nach[1] === coventryPunkt.y,
  );
  pruefe(
    'mRNA/COVID/Karte: der Dosen-Weg nennt Puurs und die Kühlkette',
    Boolean(dosen) && /Puurs/.test(dosen.text) && /Kühlkette/.test(dosen.text),
  );
  const unterlagen = (karte.bewegungen || []).find((b) => b.id === 'unterlagen-nach-amsterdam');
  pruefe(
    'mRNA/COVID/Karte: die Unterlagen enden in Amsterdam (EMA)',
    Boolean(unterlagen) &&
      /Amsterdam/.test(unterlagen.text) &&
      /EMA/.test(unterlagen.text) &&
      /21\. Dezember 2020/.test(unterlagen.text),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Deutschland',
    'England',
    'Frankreich',
    'Niederlande',
    'Belgien',
    'Nordsee',
    'Ostsee',
    'Ärmelkanal',
    'Rhein',
    'Themse',
    'Alpen',
    'Mainz',
    'Tübingen',
    'Marburg',
    'Oxford',
    'Coventry',
    'London',
  ]) {
    pruefe(`mRNA/COVID/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'mRNA/COVID: Titel und Epoche stehen',
    thema.titel === 'mRNA und COVID' && thema.epoche === 'Die 2020er Jahre',
  );
  pruefe(
    'mRNA/COVID: der Aufhänger ist eine Frage',
    thema.aufhaenger.frage.includes('?'),
  );
  pruefe(
    'mRNA/COVID: der Aufhänger stellt die Frage der Prüfzeit neutral',
    /schnellste Entwicklung/.test(thema.aufhaenger.frage) &&
      /kürzeste Prüfzeit/.test(thema.aufhaenger.frage),
  );
  pruefe(
    'mRNA/COVID: der Aufhänger kündigt beide Seiten an (Rettung UND Sorgfaltspflicht)',
    /Rettung/.test(thema.aufhaenger.text) &&
      /Sorgfaltspflicht/.test(thema.aufhaenger.text) &&
      /beide Seiten/.test(thema.aufhaenger.text),
  );
  pruefe(
    'mRNA/COVID: der Aufhänger nennt die neue Denkart und die offenen Fragen',
    /Bauanleitung/.test(thema.aufhaenger.text) &&
      /Langzeitdaten/.test(thema.aufhaenger.text) &&
      /Reife/.test(thema.aufhaenger.text),
  );
  pruefe(
    'mRNA/COVID: der Aufhänger ist neutral formuliert (keine Vorverurteilung)',
    !/(Betrüger|Scharlatan|Lüge|Verbrecher|Willkür|Abzocke|Verschwörung|Impfschaden)/i.test(
      thema.aufhaenger.text,
    ),
  );
  pruefe('mRNA/COVID: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'mRNA/COVID: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn|verantwortungslos)/i.test(thema.urteil.frage),
  );
  pruefe(
    'mRNA/COVID: der Hinweis zum Urteil lässt beide Richtungen offen',
    /kein Richtig und kein Falsch/.test(thema.urteil.hinweis) &&
      /Ungewissheit/.test(thema.urteil.hinweis),
  );
  pruefe(
    'mRNA/COVID: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'mRNA/COVID/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'mRNA/COVID/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const podiumStimme = thema.perspektiven.find((p) => p.id === 'befuerworter');
  pruefe(
    'mRNA/COVID: die Stimme vom Podium ist die erste Perspektive',
    thema.perspektiven[0] === podiumStimme,
  );
  if (!podiumStimme) return;

  pruefe(
    'mRNA/COVID: die erste Perspektive ist Opus zugeschrieben',
    podiumStimme.stimme === 'Opus',
  );
  pruefe(
    'mRNA/COVID: die erste Perspektive heißt nach ihrer Form',
    /Podium|Pressekonferenz/.test(podiumStimme.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt
  // =========================================================================

  const zeilenErsteStimme = podiumStimme.text.split('\n').length;
  pruefe(
    `mRNA/COVID/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'mRNA/COVID/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 20000 Zeichen)',
    podiumStimme.text.length > 20000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `mRNA/COVID/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = podiumStimme.text.replace(/\s+/g, ' ');

  const ueberschriften = podiumStimme.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'mRNA/COVID: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 10,
  );
  pruefe(
    'mRNA/COVID: die Abschnitte bleiben überschaubar (höchstens achtzehn)',
    ueberschriften.length <= 18,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 15 darf
  // keine der vierzehn bisherigen Dramaturgien übernehmen. Kapitel 1
  // gliedert nach „Wer hier spricht …", Kapitel 2 nach „Warum"-Fragen,
  // Kapitel 3 erzählt einen Tageslauf, Kapitel 4 schreibt Briefe, Kapitel 5
  // folgt einem Buch von Station zu Station, Kapitel 6 geht als Rundgang
  // durch ein Haus, Kapitel 7 verhandelt vor Gericht, Kapitel 8 rechnet,
  // Kapitel 9 liest die Uhr, Kapitel 10 geht eine Kette ab, Kapitel 11 legt
  // Präparate unter die Linse, Kapitel 12 stellt die Fragen eines Reporters,
  // Kapitel 13 schlägt eine Akte auf, Kapitel 14 ist der Beipackzettel.
  // Dieses Kapitel ist DIE PRESSEKONFERENZ: ein Saal, ein Podium, Termine
  // zwischen 2020 und 2023, Fragen aus dem Saal, Antworten vom Podium.
  pruefe(
    'mRNA/COVID: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    !ueberschriften.includes('## Wer hier spricht') &&
      !ueberschriften.includes('## Wie das Wissen wuchs'),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 9 (keine Uhr)',
    !/^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/^## Sekunde /.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 10 (keine Kette)',
    !/^## Die Kette/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Glied/.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 11 (keine Präparate)',
    !/^## Die Linse/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Präparat/.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 12 (keine Reporterfragen)',
    ueberschriften.filter((h) => /^## „/.test(h)).length === 0,
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 13 (keine Aktenblätter)',
    ueberschriften.every((h) => !/^## Blatt \d+/.test(h)),
  );
  pruefe(
    'mRNA/COVID: andere Struktur als in Kapitel 14 (kein Beipackzettel)',
    !/^## Die Packung/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /^## \d+\. /.test(h)).length === 0,
  );
  pruefe(
    'mRNA/COVID: die Dramaturgie ist die Pressekonferenz (Podium, Termine, Saal)',
    /^## Der Saal, das Podium und die Regeln/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /Pressekonferenz/.test(h)).length >= 5 &&
      ueberschriften.some((h) => /Zwischenruf/.test(h)) &&
      /^## Die letzte Frage aus dem Saal/.test(ueberschriften[ueberschriften.length - 1]),
  );
  pruefe(
    'mRNA/COVID: die Pressekonferenzen tragen Ort und Datum',
    ueberschriften
      .filter((h) => /Pressekonferenz/.test(h))
      .every((h) => /(2020|2021|2023)/.test(h) && /—/.test(h)),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'mRNA/COVID: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Der Gegenstand: die neue Denkart — die Bauanleitung statt des
  //     Erregers, der Körper als Produktionsstätte.
  pruefe(
    'mRNA/COVID/Denkart: die Bauanleitung statt des Erregers ist erklärt',
    /Bauanleitung für ein einziges Stück von ihm/.test(fliessend) &&
      /Wir schicken nicht den Erreger/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Denkart: der Körper als Produktionsstätte ist benannt',
    /Der Körper wird damit zur Produktionsstätte/.test(fliessend) &&
      /verschiebt die Fabrik vom Werk in die Muskelzelle/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Denkart: die Medizin verschickt Information statt Substanz',
    /Die Medizin verschickt keine Substanz mehr, sondern Information/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Denkart: die alte Denkart steht als Gegenbild da (fünf bis fünfzehn Jahre)',
    /fünf bis fünfzehn Jahre/.test(fliessend) &&
      /Hühnereiern/.test(fliessend) &&
      /Für jeden Erreger braucht es ein eigenes Verfahren/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Denkart: die dreißig Jahre Vorarbeit sind erzählt (Karikó, Weissman, 2005)',
    /Katalin Karikó/.test(fliessend) &&
      /Drew Weissman/.test(fliessend) &&
      /1995 wurde sie herabgestuft/.test(fliessend) &&
      /2005/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Denkart: die Schnelligkeit ist begründet (die Sequenz genügte)',
    /Die Sequenz genügte/.test(fliessend) &&
      /66 Tage/.test(fliessend) &&
      /Er wurde am Bildschirm gemacht/.test(fliessend),
  );

  // (b) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum mRNA? (die Bauanleitung, die Schreibarbeit, der Körper als Produktionsstätte)',
      /\*\*Warum mRNA\?\*\*/.test(fliessend) &&
        /Bauanleitung/.test(fliessend) &&
        /Schreibarbeit/.test(fliessend),
    ],
    [
      'Warum ging es so schnell? (die Sequenz, die Plattform, das Geld)',
      /\*\*Warum ging es so schnell\?\*\*/.test(fliessend) &&
        /Die Sequenz genügte/.test(fliessend) &&
        /Die Plattform war vorbereitet/.test(fliessend) &&
        /Es wurde parallel gearbeitet/.test(fliessend),
    ],
    [
      'Warum die Massenimpfung? (die Risikogruppen, die Krankenhäuser, der Gemeinschaftsschutz)',
      /\*\*Warum die Massenimpfung\?\*\*/.test(fliessend) &&
        /Risikogruppen/.test(fliessend) &&
        /Krankenhäuser/.test(fliessend) &&
        /Gemeinschaftsschutz/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`mRNA/COVID/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'mRNA/COVID/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );

  // =========================================================================
  // 5. Die ehrlichen Grenzen — von der eigenen Seite benannt
  //    (TONE-Regel doppelt und Zusatzregel für sensible Themen)
  // =========================================================================

  const unbequemeStellen = [
    [
      'die fehlenden Langzeitdaten werden von der ersten Stimme selbst benannt',
      /Wir haben keine Langzeitdaten\. Wir können sie nicht haben/.test(fliessend) &&
        /zwei Monate/.test(fliessend),
    ],
    [
      'die Notfallzulassung war ein Wagnis (die Entscheidung, keine Notwendigkeit)',
      /Das war eine Entscheidung, keine Notwendigkeit, und man kann sie bestreiten/.test(
        fliessend,
      ),
    ],
    [
      'die Herzmuskelentzündungen bei jungen Männern (selten, aber real)',
      /junge Männer, meist zwischen 16 und 24/.test(fliessend) &&
        /fünf bis zwanzig zusätzlichen Fällen je 100\.000/.test(fliessend),
    ],
    [
      'die Thrombosen beim Vektor-Impfstoff (Greinacher)',
      /Andreas Greinacher/.test(fliessend) && /Blutplättchen/.test(fliessend),
    ],
    [
      'die überzogene Aussage, Geimpfte steckten niemanden mehr an',
      /Das war zu weit gegriffen, und wir müssen es klar sagen/.test(fliessend),
    ],
    [
      'die überhebliche Kommunikation („Pandemie der Ungeimpften")',
      /Pandemie der Ungeimpften/.test(fliessend) &&
        /Das war unser Fehler, nicht ihrer/.test(fliessend),
    ],
    [
      'die verlorene Unterscheidung zwischen alt und jung',
      /Zwischen dem Achtzigjährigen mit Vorerkrankungen und dem gesunden Sechzehnjährigen/.test(
        fliessend,
      ) && /Es war nie dieselbe Rechnung/.test(fliessend),
    ],
    [
      'der gescheiterte Kandidat der eigenen Plattform (CureVac)',
      /In Tübingen ist der Impfstoff gescheitert/.test(fliessend) &&
        /47 Prozent/.test(fliessend),
    ],
    [
      'die ungerechte Verteilung zwischen reich und arm',
      /Die Verteilung war ungerecht/.test(fliessend) && /Afrikas/.test(fliessend),
    ],
    [
      'der schlechte Umgang mit den Meldenden',
      /Wir haben mit den Meldenden oft schlecht umgehen/.test(fliessend) ||
        /ohne ernst genommen zu werden/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of unbequemeStellen) {
    pruefe(`mRNA/COVID/Grenzen: ${name} steht im Text`, erfuellt);
  }
  pruefe(
    'mRNA/COVID/Grenzen: die Stimme benennt mindestens fünf unbequeme Stellen selbst',
    unbequemeStellen.filter(([, erfuellt]) => erfuellt).length >= 5,
  );

  // TONE-Regel doppelt: die Erfolge werden nicht kleingeredet, aber auch
  // nicht übertrieben.
  pruefe(
    'mRNA/COVID/TONE: die Erfolge stehen da (gerettete Leben als Modellrechnung)',
    /14 und 20 Millionen/.test(fliessend) &&
      /Modellrechnungen/.test(fliessend) &&
      /Imperial College London/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/TONE: die zweite Stimme wird nicht vorab entkräftet',
    !/Verschwörungstheorie/.test(podiumStimme.text) ||
      /Nichts davon ist eine Verschwörungserzählung/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/TONE: die andere Seite wird nicht abgewertet',
    !/(Schwurbler|Spinner|Impfgegner|dumm|hysterisch|Querdenker|Verschwörungstheoretiker)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'mRNA/COVID/TONE: kein Heilversprechen',
    !/(heilt alles|garantiert sicher|völlig risikolos|immer wirksam|völlig ungefährlich)/i.test(
      fliessend,
    ),
  );

  // =========================================================================
  // 6. KEINE GERÜCHTE (Betreiber-Entscheid 25.08.2026)
  // =========================================================================

  pruefe(
    'mRNA/COVID/Belege: der Umgang mit Zahlen wird vorab angekündigt',
    /Jede Zahl hier ist nachprüfbar/.test(fliessend) &&
      /Wo wir etwas nicht wissen, sage ich, dass wir es nicht wissen/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Belege: die geretteten Leben sind als Modellrechnung gekennzeichnet',
    /Es ist ein Rechenmodell, keine Zählung/.test(fliessend) &&
      /solche Annahmen kann man bestreiten/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Belege: die dokumentierten Fakten stehen da (Karikó/Weissman, Sequenz, erste Impfung)',
    /Karikó/.test(fliessend) &&
      /Weissman/.test(fliessend) &&
      /10\. Januar 2020/.test(fliessend) &&
      /8\. Dezember 2020/.test(fliessend) &&
      /Margaret Keenan/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Belege: die Zulassungsdaten sind genannt (2. Dezember, 11. Dezember, 21. Dezember)',
    /2\. Dezember 2020/.test(fliessend) &&
      /11\. Dezember/.test(fliessend) &&
      /21\. Dezember/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Belege: Meldesysteme werden erklärt (Verdacht ist kein Beweis)',
    /Eine Meldung ist ein Verdacht, kein Beweis/.test(fliessend) &&
      /Untererfassung/.test(fliessend),
  );

  // =========================================================================
  // 7. Der Innovations-Zyklus (roter Faden, CLAUDE.md 26.08.2026)
  // =========================================================================

  pruefe(
    'mRNA/COVID/Zyklus: das Muster des Buches wird benannt',
    /Dieses Buch erzählt seit Kapitel 9 immer dasselbe Muster/.test(fliessend) &&
      /Die Chirurgie tötete durch Wundfieber, bevor sie rettete/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Zyklus: die Frage der Reifephase wird selbst gestellt',
    /In welcher Phase dieses Zyklus steht die mRNA/.test(fliessend) &&
      /Wir wissen es nicht/.test(fliessend) &&
      /ob sie ausgereift ist/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Zyklus: die Prüfzeit-Frage wird zugespitzt',
    /Wer entscheidet eigentlich, wie lange geprüft wird\?/.test(fliessend) &&
      /In einer Pandemie entscheidet am Ende die Politik/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID/Zyklus: die Frage wurde diesmal von Anfang an laut gestellt',
    /Diesmal wurde die Frage von Anfang an laut gestellt/.test(fliessend) &&
      /verdienen dafür keine Verachtung/.test(fliessend),
  );

  // =========================================================================
  // 8. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Skeptiker) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'mRNA/COVID/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1990/.test(perspektivenText) &&
      /2005/.test(perspektivenText) &&
      /10\. Januar 2020/.test(perspektivenText) &&
      /16\. März 2020/.test(perspektivenText) &&
      /8\. Dezember 2020/.test(perspektivenText) &&
      /2023/.test(perspektivenText),
  );
  pruefe(
    'mRNA/COVID/Erzähl-Muster: (a2) die Orte und Namen werden genannt',
    /Karikó/.test(perspektivenText) &&
      /Weissman/.test(perspektivenText) &&
      /Mainz/.test(perspektivenText) &&
      /Tübingen/.test(perspektivenText) &&
      /Coventry/.test(perspektivenText) &&
      /Zhang Yongzhen/.test(perspektivenText),
  );
  pruefe(
    'mRNA/COVID/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /Denkart/.test(perspektivenText) &&
      /Bauanleitung/.test(perspektivenText) &&
      /Produktionsstätte/.test(perspektivenText),
  );
  pruefe(
    'mRNA/COVID/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /Was auf diesem Podium Bestand hat/.test(perspektivenText) &&
      /333 Tage/.test(perspektivenText) &&
      /dreizehn Milliarden Dosen/.test(perspektivenText),
  );
  pruefe(
    'mRNA/COVID/Erzähl-Muster: (c2) und die Grenzen',
    /Wo die Grenzen liegen/.test(perspektivenText) &&
      /was offen bleibt/.test(perspektivenText),
  );

  // --- Die Brücken in die anderen Kapitel ----------------------------------
  // (Die Brücke zu Kapitel 16 legt der Hermes-Pass mit der zweiten Stimme.)
  const bueckentext = (perspektivenText + ' ' + thema.synthese).replace(/\s+/g, ' ');
  pruefe(
    'mRNA/COVID: die Brücke zur Pharmaindustrie (Kapitel 14) ist gelegt',
    /Kapitel 14/.test(bueckentext),
  );
  pruefe(
    'mRNA/COVID: die Brücke zu Jenner und der Impfung (Kapitel 10) ist gelegt',
    /Jenner/.test(bueckentext),
  );
  // Die Brücke zu Hahnemann und der Homöopathie legt der Hermes-Pass mit der
  // zweiten Stimme — vorher kann sie nicht da sein (Kapitel 16 folgt erst).
  if (thema.perspektiven.length >= 2) {
    pruefe(
      'mRNA/COVID: die Brücke zur Homöopathie (Kapitel 16) ist gelegt',
      /Kapitel 16/.test(bueckentext) && /Hahnemann/.test(bueckentext),
    );
  }

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'mRNA/COVID: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID: die Tür führt zu den Skeptikern',
    /\*\*Die zweite Stimme dieses Kapitels gehört den Skeptikern\.\*\*/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID: die Tür nennt, was die zweite Stimme mitbringt',
    /Sorgfaltspflicht/.test(fliessend) &&
      /Ioannidis/.test(fliessend) &&
      /Konformitätsdruck/.test(fliessend) &&
      /großer privater Geldgeber/.test(fliessend),
  );
  pruefe(
    'mRNA/COVID: die zweite Stimme kann in dieselbe Dramaturgie treten (derselbe Saal)',
    /Sie wird in denselben Saal treten und dieselben Termine noch einmal aufrufen/.test(
      fliessend,
    ),
  );
  pruefe(
    'mRNA/COVID: die offene Frage des Kapitels steht am Ende',
    /Wer entscheidet eigentlich, wie lange geprüft wird\?/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `mRNA/COVID/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `mRNA/COVID/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `mRNA/COVID/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(Abzocke|Betrug|Lüge|skandalös|rückständig|primitiv|Hokuspokus|Impfschaden)/i.test(
        frage.frage,
      ),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'mRNA/COVID/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );
  // Die Quizfragen decken die Pole des Kapitels ab.
  const quizText = thema.quiz
    .map((f) => f.frage + ' ' + f.antworten.join(' ') + ' ' + f.erklaerung)
    .join(' | ');
  for (const [name, muster] of [
    ['die Bauanleitung', /Bauanleitung/],
    ['Karikó und Weissman', /Karikó/],
    ['die Sequenz vom 10. Januar und die erste Impfung', /10\. Januar 2020/],
    ['die Notfallzulassung', /Notfallzulassung/],
    ['die Myokarditis', /Herzmuskelentzündung/],
  ]) {
    pruefe(`mRNA/COVID/Quiz: ${name} kommt vor`, muster.test(quizText));
  }

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'mRNA/COVID/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 16)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'mRNA/COVID/Synthese: sagt, welche Stimme noch kommt',
      /zweite Stimme/.test(thema.synthese) &&
        /Sorgfaltspflicht/.test(thema.synthese) &&
        /Ioannidis/.test(thema.synthese),
    );
  } else {
    pruefe(
      'mRNA/COVID/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'mRNA/COVID/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'mRNA/COVID/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
