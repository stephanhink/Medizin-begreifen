// Prüfungen für Kapitel 16 — „Die moderne Pharmaindustrie" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Sieben Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen an Kanal, Nordsee und Ostsee auf der
//      gezeichneten Küste, Binnenorte innerhalb der Landfläche, offene See
//      außerhalb. Geprüft werden bewusst Orte, die NICHT selbst Stützpunkte
//      der Linien sind — sonst prüfte der Test nur, ob eine Zahl mit sich
//      selbst übereinstimmt. Der Ausschnitt umfasst 14° Länge, deshalb die
//      Toleranz von 0,4°.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen die Entwicklung eines Medikaments (zehn bis
//      fünfzehn Jahre, die drei Studienstufen, die Kosten) und das
//      Geschäftsmodell (die Pille, die Dauermedikamente, der Blockbuster)
//      stehen — und die Begründungslogik muss ausgeführt sein: warum so
//      teuer, warum eine Tablette und kein Rat, warum Dauermedikamente,
//      warum überhaupt eine Prüfung.
//
//   3. **Die ehrlichen Grenzen (TONE-Regel und Zusatzregel für sensible
//      Themen).** Die Stimme der Industrie muss die unbequemen Stellen
//      SELBST benennen: die Frühzeit ohne Prüfung (Cocain, Heroin, die
//      Beruhigungssäfte), die Contergan-Katastrophe, das Marketing, das die
//      Grenze überschritten hat, die Dauermedikamente als Geschäftsmodell,
//      die Antibiotika, die sich nicht rechnen, den Markt statt der Not —
//      und die Bilanz des Betreibers: stark in der Diagnose, schwach bei
//      den chronischen Krankheiten.
//
//   4. **Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026).** Die
//      umstrittenen Zahlen dieses Kapitels — die Zahl der geschädigten
//      Contergan-Kinder und die Entwicklungskosten eines Medikaments —
//      müssen als Schätzung gekennzeichnet und mit der Gegenrechnung
//      versehen sein.
//
//   5. **Der Innovations-Zyklus (Betreiber-Beobachtung 26.08.2026).** Der
//      rote Faden des Buches muss auch hier sichtbar sein — und zwar
//      zweifach: das Heroin, das dreiundzwanzig Jahre lang ein Hustenmittel
//      war, und das Thalidomid, das heute wieder ein zugelassenes
//      Arzneimittel ist.
//
//   6. **Die Längenregel, umgekehrt (Betreiber-Vorgabe 24.08.2026).** Ab
//      Kapitel 9 gilt: vollständig und ausführlich, für dieses Kapitel
//      ausdrücklich. Nach oben bleibt eine großzügige Grenze stehen, damit
//      „ausführlich" nicht in „aufgebläht" kippt.
//
//   7. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, Quiz-Umfang,
//      offene Urteilsfrage, Lernformat und die offene Tür zur zweiten
//      Stimme (die Kritik).
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 13: Die zweite
// Perspektive und die endgültige Synthese kommen erst mit dem Hermes-Pass
// dazu. Prüfungen, die nur für die erste Stimme gelten, hängen deshalb an
// ihrer id („industrie"); die Prüfungen zum Erzähl-Muster laufen über ALLE
// Perspektiven zusammen. Die Synthese wird je nach Ausbaustand verzweigt
// gemessen.
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
} = require('../utils/themen/karten/pharmaindustrie.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt umfasst 14° Länge — dasselbe Maß wie das Blatt von
 * Kapitel 13. 0,4° sind hier rund zwanzig Bildpunkte in der Waagerechten;
 * das deckt die Vereinfachung der Wattenmeer- und Boddenküsten ab, ohne
 * einen falsch gesetzten Punkt durchzulassen.
 */
const KUESTEN_TOLERANZ = 0.4;

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
 * Höher angesetzt als in Kapitel 13, weil die Längenregel dieses Kapitel
 * ausdrücklich nennt (die finanzielle Abhängigkeit der Forschung) und weil
 * die zweite Stimme im Hermes-Pass noch dazukommt.
 */
const MAX_ZEILEN_KAPITEL = 2000;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 13: Ein
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
 * Dieser Ausschnitt hat zwei Landflächen: das Festland (Nordfrankreich,
 * Benelux, Deutschland, Jütland, Böhmen — in diesem Rahmen hängt alles
 * zusammen) und den Südosten Englands, der ins Blatt hineinragt.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge an der Ostsee genauso
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
  const thema = themaNachId('pharmaindustrie');
  pruefe(
    'Pharmaindustrie: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 14
  // steht hinter der Verstaatlichung (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Pharmaindustrie: steht in der App hinter „Die Verstaatlichung des Gesundheitswesens"',
    alleThemen.findIndex((t) => t.id === 'pharmaindustrie') ===
      alleThemen.findIndex((t) => t.id === 'verstaatlichung') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Pharmaindustrie/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Pharmaindustrie/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss die sechs Orte des Kapitels auf ein Blatt bringen: Elberfeld,
  // Höchst, Darmstadt, Stolberg, Basel und Berlin — und im Westen genug
  // Wasser lassen, damit die Wege über den Atlantik das Bild verlassen können.
  pruefe(
    'Pharmaindustrie/Karte: der Ausschnitt reicht vom Ärmelkanal bis nach Berlin',
    RAHMEN.minLon <= 1.5 && RAHMEN.maxLon >= 14,
  );
  pruefe(
    'Pharmaindustrie/Karte: der Ausschnitt reicht von Basel bis an die Ostsee',
    RAHMEN.minLat <= 47.5 && RAHMEN.maxLat >= 54.5,
  );
  pruefe('Pharmaindustrie/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Pharmaindustrie/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Le Tréport (Normandie)', 1.37, 50.06],
    ['Calais (Pas-de-Calais)', 1.86, 50.96],
    ['Blankenberge (Flandern)', 3.13, 51.32],
    ['Scheveningen (Holland)', 4.28, 52.11],
    ['Harlingen (Friesland)', 5.42, 53.17],
    ['Emden (Ostfriesland)', 7.19, 53.36],
    ['Wilhelmshaven (Jadebusen)', 8.11, 53.52],
    ['Bremerhaven (Wesermündung)', 8.58, 53.55],
    ['Cuxhaven (Elbmündung)', 8.71, 53.87],
    ['Husum (Nordfriesland)', 9.05, 54.48],
    ['Flensburg (Förde)', 9.43, 54.79],
    ['Kiel (Kieler Förde)', 10.14, 54.32],
    ['Travemünde (Lübecker Bucht)', 10.87, 53.96],
    ['Wismar (Ostsee)', 11.46, 53.89],
    ['Warnemünde (Ostsee)', 12.09, 54.18],
    ['Stralsund (Strelasund)', 13.09, 54.31],
    ['Swinemünde (Usedom)', 14.25, 53.92],
  ];
  for (const [name, lon, lat] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], kuesten.festland);
    pruefe(
      `Pharmaindustrie/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb einer Landfläche liegen ----------------
  const binnenorte = [
    ['Wuppertal-Elberfeld', 7.147, 51.264],
    ['Frankfurt am Main', 8.68, 50.11],
    ['Darmstadt', 8.651, 49.872],
    ['Stolberg bei Aachen', 6.223, 50.774],
    ['Aachen', 6.083, 50.776],
    ['Basel', 7.589, 47.558],
    ['Berlin', 13.405, 52.52],
    ['Leverkusen', 6.99, 51.03],
    ['Köln', 6.96, 50.94],
    ['Ludwigshafen', 8.44, 49.48],
    ['Hamburg', 9.994, 53.551],
    ['München', 11.576, 48.137],
    ['Straßburg', 7.75, 48.58],
    ['Zürich', 8.54, 47.37],
    ['Paris', 2.35, 48.86],
    ['Brüssel', 4.35, 50.85],
    ['Amsterdam', 4.9, 52.37],
    ['Prag', 14.42, 50.08],
    ['Rostock', 12.14, 54.09],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Pharmaindustrie/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['die mittlere Nordsee', 5.0, 54.2],
    ['die Deutsche Bucht', 7.5, 54.2],
    ['die südliche Nordsee', 3.6, 52.6],
    ['der Ärmelkanal vor Calais', 1.2, 50.4],
    ['die Nordsee vor Sylt', 7.9, 54.9],
    ['die Kieler Bucht', 10.5, 54.7],
    ['die Mecklenburger Bucht', 11.8, 54.4],
    ['die Ostsee vor Rügen', 13.9, 54.85],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Pharmaindustrie/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Der englische Zipfel ------------------------------------------------
  // Kent, die Themsemündung und Ostanglien ragen ins Blatt; ohne sie stünde
  // dort Wasser, wo Land ist.
  for (const [name, lon, lat] of [
    ['Canterbury (Kent)', 1.08, 51.28],
    ['Norwich (Ostanglien)', 1.29, 52.63],
  ]) {
    pruefe(
      `Pharmaindustrie/Atlas: ${name} liegt auf der englischen Landfläche`,
      liegtIn([lon, lat], kuesten.suedostengland),
    );
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Pharmaindustrie/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Pharmaindustrie/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\b(1[6-9]\d\d|20\d\d)\b/.test(phase.label),
    );
    pruefe(
      `Pharmaindustrie/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Pharmaindustrie/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: die Herkunft, die Zeit ohne
  // Prüfung, die Wende, die Katastrophe, das heutige Geschäft.
  pruefe(
    'Pharmaindustrie/Karte: eine Phase zeigt die Herkunft aus Apotheke und Farbenfabrik',
    karte.phasen.some(
      (p) =>
        /1668/.test(p.label + p.hinweis) &&
        /Engel-Apotheke/.test(p.hinweis) &&
        /1827/.test(p.hinweis) &&
        /Farbenfabrik/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pharmaindustrie/Karte: eine Phase zeigt die Zeit ohne Prüfung (Aspirin und Heroin 1897/98)',
    karte.phasen.some(
      (p) =>
        /1897/.test(p.label) &&
        /21\. August 1897/.test(p.hinweis) &&
        /Heroin/.test(p.hinweis) &&
        /nicht gewöhnungsbildend/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pharmaindustrie/Karte: eine Phase zeigt die Wende (Salvarsan, Insulin, Sulfonamid)',
    karte.phasen.some(
      (p) =>
        /Salvarsan/.test(p.hinweis) &&
        /Insulin/.test(p.hinweis) &&
        /Prontosil/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pharmaindustrie/Karte: eine Phase zeigt die Contergan-Katastrophe mit Daten und Schätzung',
    karte.phasen.some(
      (p) =>
        /1957/.test(p.label) &&
        /Thalidomid/.test(p.hinweis) &&
        /26\. November 1961/.test(p.hinweis) &&
        /5\.000 bis 10\.000/.test(p.hinweis) &&
        /Kelsey/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pharmaindustrie/Karte: eine Phase zeigt das heutige Geschäft (Konzerne, Blockbuster, Antibiotikalücke)',
    karte.phasen.some(
      (p) =>
        /heute/.test(p.label) &&
        /Billionen/.test(p.hinweis) &&
        /Antibiotikaforschung/.test(p.hinweis),
    ),
  );
  pruefe(
    'Pharmaindustrie/Karte: die Phasen laufen von der Apotheke bis zu den Blockbustern',
    karte.phasen[0].id === 'apotheke-und-farbe-1668-1896' &&
      karte.phasen[karte.phasen.length - 1].id === 'blockbuster-heute',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Pharmaindustrie/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch|Betrüger|Gier)/i.test(
      phasenText,
    ),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['elberfeld', 7.147, 51.264],
    ['hoechst', 8.545, 50.101],
    ['darmstadt', 8.651, 49.872],
    ['stolberg', 6.223, 50.774],
    ['basel', 7.589, 47.558],
    ['berlin', 13.405, 52.52],
  ];
  pruefe(
    'Pharmaindustrie/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Pharmaindustrie/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(
      `Pharmaindustrie/Atlas: „${id}" sitzt auf ${lon}/${lat}`,
      punkt.x === x && punkt.y === y,
    );
    pruefe(`Pharmaindustrie/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Pharmaindustrie/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Pharmaindustrie/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die Pole des Kapitels: der Labortisch, die Zauberkugel, die Apotheke,
  // die Katastrophe, der Weltkonzern, die Hormone.
  const elberfeldPunkt = karte.punkte.find((p) => p.id === 'elberfeld');
  pruefe(
    'Pharmaindustrie/Karte: der Punkt Elberfeld nennt beide Stoffe von 1897 (Aspirin UND Heroin)',
    Boolean(
      elberfeldPunkt &&
        /10\. August 1897/.test(elberfeldPunkt.text) &&
        /21\. August 1897/.test(elberfeldPunkt.text) &&
        /Aspirin/.test(elberfeldPunkt.text) &&
        /Heroin/.test(elberfeldPunkt.text),
    ),
  );
  const hoechstPunkt = karte.punkte.find((p) => p.id === 'hoechst');
  pruefe(
    'Pharmaindustrie/Karte: der Punkt Höchst nennt Ehrlich, die Zauberkugel und das Salvarsan',
    Boolean(
      hoechstPunkt &&
        /Ehrlich/.test(hoechstPunkt.text) &&
        /Zauberkugel/.test(hoechstPunkt.text) &&
        /Salvarsan/.test(hoechstPunkt.text) &&
        /1910/.test(hoechstPunkt.text),
    ),
  );
  const darmstadtPunkt = karte.punkte.find((p) => p.id === 'darmstadt');
  pruefe(
    'Pharmaindustrie/Karte: der Punkt Darmstadt nennt 1668, 1827 und die Alkaloide',
    Boolean(
      darmstadtPunkt &&
        /1668/.test(darmstadtPunkt.text) &&
        /1827/.test(darmstadtPunkt.text) &&
        /Alkaloide/.test(darmstadtPunkt.text),
    ),
  );
  const stolbergPunkt = karte.punkte.find((p) => p.id === 'stolberg');
  pruefe(
    'Pharmaindustrie/Karte: der Punkt Stolberg erzählt Contergan mit Daten und Schätzung',
    Boolean(
      stolbergPunkt &&
        /Contergan/.test(stolbergPunkt.text) &&
        /1\. Oktober 1957/.test(stolbergPunkt.text) &&
        /26\. November 1961/.test(stolbergPunkt.text) &&
        /Lenz/.test(stolbergPunkt.text) &&
        /Schätzungen/.test(stolbergPunkt.text),
    ),
  );
  const baselPunkt = karte.punkte.find((p) => p.id === 'basel');
  pruefe(
    'Pharmaindustrie/Karte: der Punkt Basel nennt beide Seiten (Wirkung und Preis)',
    Boolean(
      baselPunkt &&
        /Novartis/.test(baselPunkt.text) &&
        /Imatinib/.test(baselPunkt.text) &&
        /Preis/.test(baselPunkt.text),
    ),
  );
  const berlinPunkt = karte.punkte.find((p) => p.id === 'berlin');
  pruefe(
    'Pharmaindustrie/Karte: der Punkt Berlin nennt Schering und die Gegenspieler',
    Boolean(
      berlinPunkt &&
        /Schering/.test(berlinPunkt.text) &&
        /1851/.test(berlinPunkt.text) &&
        /(Bundesausschuss|Robert Koch-Institut)/.test(berlinPunkt.text),
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
    `Pharmaindustrie/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Pharmaindustrie/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Pharmaindustrie/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Pharmaindustrie/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern ein Suchtmittel, ein
    // Hormon und eine Warnung.
    pruefe(
      `Pharmaindustrie/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /(Heroin|Insulin|Contergan|Verdacht|Toronto)/.test(bewegung.text),
    );
  }
  const heroin = (karte.bewegungen || []).find((b) => b.id === 'heroin-in-die-welt');
  pruefe(
    'Pharmaindustrie/Karte: der Weg des Heroins beginnt in Elberfeld',
    Boolean(heroin) &&
      heroin.von[0] === P.punkt(7.147, 51.264)[0] &&
      heroin.von[1] === P.punkt(7.147, 51.264)[1],
  );
  pruefe(
    'Pharmaindustrie/Karte: der Weg des Heroins nennt Ausfuhr und späteres Verbot',
    Boolean(heroin) && /zwanzig Länder/.test(heroin.text) && /1924/.test(heroin.text),
  );
  const insulin = (karte.bewegungen || []).find(
    (b) => b.id === 'insulin-ueber-den-atlantik',
  );
  pruefe(
    'Pharmaindustrie/Karte: das Insulin kommt aus dem Westen und endet in Höchst',
    Boolean(insulin) &&
      insulin.nach[0] === P.punkt(8.545, 50.101)[0] &&
      insulin.nach[1] === P.punkt(8.545, 50.101)[1],
  );
  pruefe(
    'Pharmaindustrie/Karte: der Insulin-Weg nennt Toronto, den einen Dollar und Indianapolis',
    Boolean(insulin) &&
      /Toronto/.test(insulin.text) &&
      /Dollar/.test(insulin.text) &&
      /Indianapolis/.test(insulin.text),
  );
  const warnung = (karte.bewegungen || []).find((b) => b.id === 'warnung-nach-stolberg');
  pruefe(
    'Pharmaindustrie/Karte: die Warnung läuft von Hamburg nach Stolberg',
    Boolean(warnung) &&
      warnung.von[0] === P.punkt(9.994, 53.551)[0] &&
      warnung.nach[0] === P.punkt(6.223, 50.774)[0] &&
      warnung.nach[1] === P.punkt(6.223, 50.774)[1],
  );
  pruefe(
    'Pharmaindustrie/Karte: die Warnung nennt Lenz und den 26. November 1961',
    Boolean(warnung) &&
      /Lenz/.test(warnung.text) &&
      /26\. November 1961/.test(warnung.text),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Deutschland',
    'Frankreich',
    'Schweiz',
    'Nordsee',
    'Ostsee',
    'Ärmelkanal',
    'Rhein',
    'Wupper',
    'Main',
    'Elbe',
    'Donau',
    'Alpen',
    'Berlin',
    'Basel',
  ]) {
    pruefe(`Pharmaindustrie/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Pharmaindustrie: Titel und Epoche stehen',
    thema.titel === 'Die moderne Pharmaindustrie' &&
      thema.epoche === '20. Jahrhundert bis heute',
  );
  pruefe(
    'Pharmaindustrie: der Aufhänger ist eine Frage',
    thema.aufhaenger.frage.includes('?'),
  );
  pruefe(
    'Pharmaindustrie: der Aufhänger stellt die Preisfrage neutral',
    /kostet/.test(thema.aufhaenger.frage) && /Preis/.test(thema.aufhaenger.frage),
  );
  pruefe(
    'Pharmaindustrie: der Aufhänger kündigt beide Seiten an (Wunder UND Geschäft)',
    /anderthalb Billionen/.test(thema.aufhaenger.text) &&
      /Todesurteile/.test(thema.aufhaenger.text) &&
      /Beides stimmt gleichzeitig/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Pharmaindustrie: der Aufhänger nennt die Bilanz und die dunklen Stellen',
    /Diagnose/.test(thema.aufhaenger.text) &&
      /chronischen Krankheiten/.test(thema.aufhaenger.text) &&
      /Heroin/.test(thema.aufhaenger.text) &&
      /Contergan/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Pharmaindustrie: der Aufhänger ist neutral formuliert (keine Vorverurteilung)',
    !/(Betrüger|Scharlatan|Lüge|Verbrecher|Willkür|Abzocke)/i.test(thema.aufhaenger.text),
  );
  pruefe('Pharmaindustrie: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Pharmaindustrie: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn|verantwortungslos)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Pharmaindustrie: der Hinweis zum Urteil lässt beide Richtungen offen',
    /kein Richtig und kein Falsch/.test(thema.urteil.hinweis) &&
      /zehn bis fünfzehn Jahre/.test(thema.urteil.hinweis),
  );
  pruefe(
    'Pharmaindustrie: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Pharmaindustrie/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Pharmaindustrie/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const industrieStimme = thema.perspektiven.find((p) => p.id === 'industrie');
  pruefe(
    'Pharmaindustrie: die Stimme der Industrie ist die erste Perspektive',
    thema.perspektiven[0] === industrieStimme,
  );
  if (!industrieStimme) return;

  pruefe(
    'Pharmaindustrie: die erste Perspektive ist Opus zugeschrieben',
    industrieStimme.stimme === 'Opus',
  );
  pruefe(
    'Pharmaindustrie: die erste Perspektive heißt nach ihrer Form',
    /Beipackzettel|Stimme der Industrie/.test(industrieStimme.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt
  // =========================================================================

  const zeilenErsteStimme = industrieStimme.text.split('\n').length;
  pruefe(
    `Pharmaindustrie/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'Pharmaindustrie/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 20000 Zeichen)',
    industrieStimme.text.length > 20000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Pharmaindustrie/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = industrieStimme.text.replace(/\s+/g, ' ');

  const ueberschriften = industrieStimme.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Pharmaindustrie: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 10,
  );
  pruefe(
    'Pharmaindustrie: die Abschnitte bleiben überschaubar (höchstens achtzehn)',
    ueberschriften.length <= 18,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 14 darf
  // keine der vierzehn bisherigen Dramaturgien übernehmen. Kapitel 1
  // gliedert nach „Wer hier spricht …", Kapitel 2 führt seine
  // Begründungslogik an „## Warum …?"-Überschriften entlang, Kapitel 3
  // erzählt einen Tageslauf, Kapitel 4 schreibt Briefe, Kapitel 5 folgt
  // einem Buch von Station zu Station, Kapitel 6 geht als Rundgang durch ein
  // Haus, Kapitel 7 verhandelt vor Gericht, Kapitel 8 rechnet, Kapitel 9
  // liest die Uhr, Kapitel 10 geht eine Kette ab, Kapitel 11 legt Präparate
  // unter die Linse, Kapitel 12 stellt die Fragen eines Reporters, Kapitel
  // 13 schlägt eine Akte auf. Dieses Kapitel ist DER BEIPACKZETTEL: die
  // Industrie spricht in der Form, die sie selbst erfunden hat.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Pharmaindustrie: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 9 (keine Uhr)',
    !/^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/^## Sekunde /.test(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 10 (keine Kette)',
    !/^## Die Kette/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Glied/.test(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 11 (keine Präparate)',
    !/^## Die Linse/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Präparat/.test(h)),
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 12 (keine Reporterfragen)',
    ueberschriften.filter((h) => /^## „/.test(h)).length === 0,
  );
  pruefe(
    'Pharmaindustrie: andere Struktur als in Kapitel 13 (keine Aktenblätter)',
    ueberschriften.every((h) => !/^## Blatt \d+/.test(h)),
  );
  pruefe(
    'Pharmaindustrie: die Dramaturgie ist der Beipackzettel (nummerierte Rubriken)',
    /^## Die Packung/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /^## \d+\. /.test(h)).length >= 10 &&
      /Warnhinweis/.test(ueberschriften[ueberschriften.length - 1]),
  );
  pruefe(
    'Pharmaindustrie: die Rubriken folgen der Form eines echten Beipackzettels',
    /Zusammensetzung/.test(fliessend) &&
      /Darreichungsform/.test(fliessend) &&
      /Wechselwirkungen/.test(fliessend) &&
      /Nebenwirkungen/.test(fliessend) &&
      /Gegenanzeigen/.test(fliessend),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Pharmaindustrie: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Der Gegenstand: die Entwicklung eines Medikaments und ihre Kosten.
  pruefe(
    'Pharmaindustrie/Denkart: die Entwicklungsdauer steht da (zehn bis fünfzehn Jahre)',
    /zehn bis fünfzehn Jahre/.test(fliessend) &&
      /Phase I/.test(fliessend) &&
      /Phase II/.test(fliessend) &&
      /Phase III/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Denkart: der Trichter der Forschung ist erklärt (die meisten scheitern)',
    /Zehntausende Substanzen/.test(fliessend) &&
      /jeder zehnte am Ende zugelassen/.test(fliessend) &&
      /neun gescheiterte/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Denkart: die Kosten stehen mit Zahl UND Gegenrechnung da',
    /2,6 Milliarden Dollar/.test(fliessend) &&
      /Kapitalkosten/.test(fliessend) &&
      /650 Millionen/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Denkart: das Patentfenster erklärt den Preis',
    /zwanzig Jahre ab der Anmeldung/.test(fliessend) &&
      /Nachahmer/.test(fliessend),
  );

  // (b) Das Geschäftsmodell: die Pille und die Dauer.
  pruefe(
    'Pharmaindustrie/Denkart: die Pille als Denkart ist benannt (Schlüssel und Schloss)',
    /Zauberkugel/.test(fliessend) &&
      /Schlüssel und Schloss/.test(fliessend) &&
      /Der Körper ist ein chemisches System/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Denkart: das Geschäftsmodell der Dauermedikamente ist benannt',
    /Blockbuster/.test(fliessend) &&
      /Dauermedikamente/.test(fliessend) &&
      /dreißig Jahre lang bezahlt/.test(fliessend),
  );

  // (c) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum kostet ein Medikament so viel? (bezahlt wird das Suchen, nicht das Herstellen)',
      /\*\*Warum kostet ein Medikament so viel\?\*\*/.test(fliessend) &&
        /Der Preis auf der Packung ist nicht der Preis der Herstellung\. Er ist der Preis des Suchens/.test(
          fliessend,
        ),
    ],
    [
      'Warum eine Tablette und nicht ein Rat? (Denkart, Messbarkeit, Verkäuflichkeit)',
      /\*\*Warum eine Tablette und nicht ein Rat\?\*\*/.test(fliessend) &&
        /Wir haben die Pille nicht gewählt, weil sie immer das Beste ist, sondern weil sie das ist, was wir können/.test(
          fliessend,
        ),
    ],
    [
      'Warum Dauermedikamente? (die Krankheit ist chronisch — und die Dauer wird bezahlt)',
      /\*\*Warum Mittel, die man dauernd nimmt\?\*\*/.test(fliessend) &&
        /Weil chronische Krankheiten chronisch sind/.test(fliessend) &&
        /Weil ein Mittel, das dreißig Jahre lang genommen wird, dreißig Jahre lang bezahlt wird/.test(
          fliessend,
        ),
    ],
    [
      'Warum überhaupt eine Prüfung? (weil der Schaden sie von außen erzwungen hat)',
      /\*\*Warum überhaupt eine Prüfung\?\*\*/.test(fliessend) &&
        /Sondern weil dieser Schaden so groß war, dass die Gesellschaft uns die Regeln von außen aufgezwungen hat/.test(
          fliessend,
        ),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Pharmaindustrie/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Pharmaindustrie/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );

  // =========================================================================
  // 5. Die ehrlichen Grenzen — von der eigenen Seite benannt
  //    (TONE-Regel und Zusatzregel für sensible Themen)
  // =========================================================================

  const unbequemeStellen = [
    [
      'die Zeit ohne Prüfung: verkauft wurde, was einen Käufer fand',
      /Wer ein Mittel verkaufen wollte, musste nicht beweisen, dass es hilft/.test(
        fliessend,
      ),
    ],
    [
      'das Cocain als Wundermittel (und die Betäubung als bleibender Gewinn)',
      /Cocain/.test(fliessend) &&
        /Karl Koller/.test(fliessend) &&
        /Halsted/.test(fliessend),
    ],
    [
      'das Heroin als Hustenmittel aus demselben Labor wie das Aspirin',
      /21\. August 1897/.test(fliessend) &&
        /„Heroin"/.test(fliessend) &&
        /nicht gewöhnungsbildend/.test(fliessend) &&
        /Dreiundzwanzig Jahre lang war das gefährlichste Suchtmittel unserer Zeit ein Hustensaft/.test(
          fliessend,
        ),
    ],
    [
      'die Contergan-Katastrophe mit Daten, Zahlen und dem, was fehlte',
      /1\. Oktober 1957/.test(fliessend) &&
        /Thalidomid/.test(fliessend) &&
        /26\. November 1961/.test(fliessend) &&
        /Die Prüfung, die fehlte, war nicht unmöglich\. Sie war nicht vorgeschrieben/.test(
          fliessend,
        ),
    ],
    [
      'das Marketing, das die Grenze überschritten hat (Schmerzmittel, Opioid, Studie, Grippemittel)',
      /88\.000 bis 139\.000/.test(fliessend) &&
        /halbe Million Menschen an Überdosierungen/.test(fliessend) &&
        /Rohdaten neu auswerteten/.test(fliessend),
    ],
    [
      'die Studienfinanzierung und die unterdrückten Negativ-Ergebnisse',
      /Studien, die von der Industrie bezahlt werden, kommen häufiger zu einem für den Auftraggeber günstigen Ergebnis/.test(
        fliessend,
      ) && /in den Zulassungsakten war es rund die Hälfte/.test(fliessend),
    ],
    [
      'die Regeln kamen von außen, nicht aus eigener Einsicht',
      /Nicht eine dieser Regeln ist unserer Einsicht entsprungen/.test(fliessend),
    ],
    [
      'Heilung ist das schlechteste Geschäftsmodell (Hepatitis C)',
      /Ein Heilmittel verbraucht seinen eigenen Markt/.test(fliessend) &&
        /84\.000 Dollar/.test(fliessend),
    ],
    [
      'die Antibiotika rechnen sich nicht — und die Resistenzen töten',
      /Antibiotikaforschung eingestellt/.test(fliessend) &&
        /1,27 Millionen Menschen/.test(fliessend),
    ],
    [
      'der Markt statt der Not (die vernachlässigten Krankheiten)',
      /Wo keine Kaufkraft ist, ist kein Markt/.test(fliessend) &&
        /Tropenkrankheiten/.test(fliessend),
    ],
    [
      'der Insulinpreis — was aus dem Ein-Dollar-Patent geworden ist',
      /ihre Dosis rationierten/.test(fliessend),
    ],
    [
      'die Ersatzgrößen können täuschen (die abgebrochene Herz-Studie)',
      /Der Wert war besser\. Die Menschen waren tot/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of unbequemeStellen) {
    pruefe(`Pharmaindustrie/Grenzen: ${name} steht im Text`, erfuellt);
  }
  pruefe(
    'Pharmaindustrie/Grenzen: die Stimme benennt mindestens drei unbequeme Stellen selbst',
    unbequemeStellen.filter(([, erfuellt]) => erfuellt).length >= 3,
  );

  // Die Betreiber-These wird von der eigenen Seite offen benannt, nicht
  // weggeredet (Betreiber-Vorgabe: die Finanzinteressen prominent).
  pruefe(
    'Pharmaindustrie/Finanzinteressen: die These des Betreibers wird von innen bestätigt',
    /Ja, Dauermedikamente und Impfungen sind neben ihrer Wirkung ein sehr profitables Geschäft/.test(
      fliessend,
    ),
  );
  pruefe(
    'Pharmaindustrie/Finanzinteressen: die Zahlen dazu stehen da (Blockbuster und Impfstoffmarkt)',
    /200 Milliarden Dollar/.test(fliessend) &&
      /achtunddreißig Milliarden Dollar/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Finanzinteressen: der Gewinn wird nicht mit Bosheit gleichgesetzt',
    /Der Gewinn beweist nicht, dass das Mittel schlecht ist/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Finanzinteressen: das Marketing wird beziffert',
    /30 Milliarden Dollar/.test(fliessend) &&
      /nur in zwei Ländern/.test(fliessend),
  );

  // TONE-Regel: auch die Größe der Leistung steht da.
  pruefe(
    'Pharmaindustrie/TONE: die Erfolge werden nicht kleingeredet',
    /Ohne uns wärst Du mit hoher Wahrscheinlichkeit nicht so alt geworden/.test(fliessend) &&
      /Kombinationstherapie/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/TONE: der eigene Anteil wird ehrlich begrenzt (Wasser, Wohnung, Ernährung)',
    /Der größere Teil des Rückgangs der großen Infektionskrankheiten gehört nicht uns/.test(
      fliessend,
    ) && /Kanalisation/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/TONE: die Kranken bekommen ihren Anteil an der HIV-Wende',
    /Es waren nicht wir, die aufs Tempo drückten/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/TONE: die andere Denkart wird nicht abgewertet',
    !/(rückständig|primitiv|barbarisch|lächerlich|Hokuspokus|Spinner|Schwurbl)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'Pharmaindustrie/TONE: kein Heilversprechen',
    !/(heilt alles|garantiert sicher|völlig risikolos|immer wirksam)/i.test(fliessend),
  );

  // =========================================================================
  // 6. KEINE GERÜCHTE (Betreiber-Entscheid 25.08.2026)
  // =========================================================================

  pruefe(
    'Pharmaindustrie/Belege: der Umgang mit geschätzten Zahlen wird vorab angekündigt',
    /Wo eine Zahl geschätzt ist, sage ich es dazu/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Belege: die Zahl der Contergan-Kinder ist als Schätzung gekennzeichnet',
    /ist bis heute eine \*\*Schätzung\*\*/.test(fliessend) &&
      /5\.000 bis 10\.000 geschädigten Kindern weltweit/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Belege: die umstrittene Kostenzahl bekommt ihre Gegenrechnung',
    /Die Wahrheit liegt irgendwo in dieser Spanne, und wir zitieren traditionell die obere Zahl/.test(
      fliessend,
    ),
  );
  pruefe(
    'Pharmaindustrie/Belege: die Vorwürfe sind als belegbar gekennzeichnet',
    /Alle vier sind gerichtsnotorisch oder in Fachzeitschriften nachlesbar; nichts davon ist Gerücht/.test(
      fliessend,
    ),
  );
  pruefe(
    'Pharmaindustrie/Belege: die scharfe These wird als belegpflichtig behandelt',
    /In dieser Härte ist das eine Behauptung, die man belegen muss/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Belege: Umsatz wird nicht mit Gewinn verwechselt',
    /Umsätze sind keine Gewinne/.test(fliessend),
  );

  // =========================================================================
  // 7. Der Innovations-Zyklus (roter Faden, CLAUDE.md 26.08.2026)
  // =========================================================================

  pruefe(
    'Pharmaindustrie/Zyklus: das Muster des Buches wird benannt',
    /Das Neue schadet oft erst, bevor es segensreich wird/.test(fliessend) &&
      /Die Chirurgie tötete durch Wundfieber, ehe sie rettete/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Zyklus: die eigene Fassung des Musters steht da (verkauft, bevor gekannt)',
    /Er kam daher, dass wir sie verkauften, bevor wir sie kannten/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Zyklus: das Thalidomid zeigt den Zyklus in einem einzigen Stoff',
    /Thalidomid ist heute wieder ein zugelassenes Arzneimittel/.test(fliessend) &&
      /Lepra/.test(fliessend) &&
      /Brasilien/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Zyklus: die Lehre wird auf die Prüfzeit zugespitzt',
    /Die Frage ist, wie lange man ihn geprüft hat und wer über die Dauer der Prüfzeit entscheidet/.test(
      fliessend,
    ),
  );
  pruefe(
    'Pharmaindustrie/Zyklus: das Penicillin und seine Resistenzen kommen vor',
    /Fleming/.test(fliessend) && /erst der Segen, dann der Schaden/.test(fliessend),
  );

  // =========================================================================
  // 8. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Kritik) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Pharmaindustrie/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1668/.test(perspektivenText) &&
      /1827/.test(perspektivenText) &&
      /1897/.test(perspektivenText) &&
      /1910/.test(perspektivenText) &&
      /1922/.test(perspektivenText) &&
      /1957/.test(perspektivenText) &&
      /1996/.test(perspektivenText),
  );
  pruefe(
    'Pharmaindustrie/Erzähl-Muster: (a2) die Orte und Namen werden genannt',
    /Darmstadt/.test(perspektivenText) &&
      /Elberfeld/.test(perspektivenText) &&
      /Höchst/.test(perspektivenText) &&
      /Stolberg/.test(perspektivenText) &&
      /Toronto/.test(perspektivenText) &&
      /Kelsey/.test(perspektivenText),
  );
  pruefe(
    'Pharmaindustrie/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /Denkart/.test(perspektivenText) &&
      /Zauberkugel/.test(perspektivenText) &&
      /chemisches System/.test(perspektivenText),
  );
  pruefe(
    'Pharmaindustrie/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /Was Bestand hat/.test(perspektivenText) &&
      /Insulin/.test(perspektivenText) &&
      /HIV/.test(perspektivenText) &&
      /Leukämie/.test(perspektivenText),
  );
  pruefe(
    'Pharmaindustrie/Erzähl-Muster: (c2) und die Grenzen',
    /Wo die Grenzen liegen/.test(perspektivenText) &&
      /Was offen bleibt/.test(perspektivenText),
  );
  pruefe(
    'Pharmaindustrie/Bilanz: die Bilanz des Buches steht da (Diagnose stark, chronisch schwach)',
    /Die moderne Medizin ist hervorragend in der Diagnose und schwach in der Behandlung der chronischen Krankheiten/.test(
      fliessend,
    ) && /Wir sehen heute mehr, als wir behandeln können/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Bilanz: das Verwalten statt Heilen wird selbst benannt',
    /Bei den chronischen Krankheiten verwalten wir mehr, als wir heilen/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie/Bilanz: die Blindstelle der eigenen Denkart wird benannt',
    /In unseren Studien heißen sie Verzerrer\. Im Leben heißen sie Ursachen/.test(fliessend),
  );

  // --- Die Brücken in die anderen Kapitel ----------------------------------
  pruefe(
    'Pharmaindustrie: die Brücke zur einfachen Medizin (Kapitel 18) ist gelegt',
    /Kapitel 18/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie: die Brücke zu mRNA und COVID (Kapitel 15) ist gelegt',
    /Kapitel 15/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie: der Anschluss an die Verstaatlichung und die Impfkurven ist gelegt',
    /Kapitel 15/.test(fliessend) && /Kapitel 12/.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Pharmaindustrie: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie: die Tür führt zur Kritik',
    /\*\*Die zweite Stimme dieses Kapitels gehört der Kritik\*\*/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie: die Tür nennt, was die zweite Stimme mitbringt',
    /Finanzinteressen/.test(fliessend) &&
      /Studienfinanzierung/.test(fliessend) &&
      /Interessenkonflikte/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie: die zweite Stimme kann in dieselbe Dramaturgie treten (der andere Beipackzettel)',
    /Sie wird den anderen Beipackzettel aufschlagen/.test(fliessend),
  );
  pruefe(
    'Pharmaindustrie: die offene Frage des Kapitels steht am Ende',
    /Kann ein Mittel, das Leben rettet, und ein Geschäft, das an der Krankheit verdient, dasselbe sein/.test(
      fliessend,
    ),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Pharmaindustrie/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Pharmaindustrie/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Pharmaindustrie/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(Abzocke|Betrug|Lüge|skandalös|rückständig|primitiv|Hokuspokus)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Pharmaindustrie/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );
  // Die Quizfragen decken die Pole des Kapitels ab.
  const quizText = thema.quiz
    .map((f) => f.frage + ' ' + f.antworten.join(' ') + ' ' + f.erklaerung)
    .join(' | ');
  for (const [name, muster] of [
    ['Heroin als Hustenmittel 1898', /Heroin/],
    ['Contergan und die Zulassungspflicht', /Contergan/],
    ['die Dauer der Entwicklung', /zehn bis fünfzehn Jahre/i],
    ['die HIV-Wende von 1996', /HIV/],
    ['das Insulin-Patent für einen Dollar', /Insulin/],
  ]) {
    pruefe(`Pharmaindustrie/Quiz: ${name} kommt vor`, muster.test(quizText));
  }

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Pharmaindustrie/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 15)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Pharmaindustrie/Synthese: sagt, welche Stimme noch kommt',
      /Kritik/.test(thema.synthese) &&
        /Finanzinteressen/.test(thema.synthese) &&
        /Studienfinanzierung/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Pharmaindustrie/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Pharmaindustrie/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Pharmaindustrie/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
