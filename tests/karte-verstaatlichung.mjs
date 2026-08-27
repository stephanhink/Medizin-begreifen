// Prüfungen für Kapitel 13 — „Die Verstaatlichung des Gesundheitswesens"
// und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Sieben Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen an Nord- und Ostsee auf der gezeichneten
//      Küste, Binnenorte innerhalb der Landfläche, offene See außerhalb.
//      Geprüft werden bewusst Orte, die NICHT selbst Stützpunkte der Linien
//      sind — sonst prüfte der Test nur, ob eine Zahl mit sich selbst
//      übereinstimmt. Der Ausschnitt umfasst 14° Länge, deshalb die
//      Toleranz von 0,4°.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen die Sozialgesetze und die Krankenkasse
//      stehen, die Idee der Solidarität und der Pflicht — und die
//      Begründungslogik muss ausgeführt sein: warum überhaupt der Staat,
//      warum eine Versicherung statt Wohltätigkeit, warum Pflicht statt
//      Freiwilligkeit, und was die politische Absicht war.
//
//   3. **Die ehrlichen Grenzen (TONE-Regel und Zusatzregel für sensible
//      Themen).** Die Stimme des Staates muss die unbequemen Stellen SELBST
//      benennen: das Sozialistengesetz von 1878 als Vorgeschichte, die
//      Absicht des „Aushungerns", die Krankenkontrolleure, den Kranken mit
//      Nummer, den Kassenarzt mit Tarif, die wachsende Bürokratie und die
//      wirtschaftliche Verdrängung der Naturheilkunde durch den
//      Krankenschein.
//
//   4. **Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026).** Zwei
//      Wendungen, die Bismarck gern zugeschrieben werden, stehen in keinem
//      Protokoll; der Text muss das kennzeichnen und die aktenkundigen
//      Sätze daneben stellen. Auch die Aufzeichnung Moritz Buschs ist als
//      Quelle zweiter Hand zu kennzeichnen.
//
//   5. **Der Innovations-Zyklus (Betreiber-Beobachtung 26.08.2026).** Der
//      rote Faden des Buches muss auch hier sichtbar sein — diesmal an
//      einer Einrichtung statt an einem Verfahren: Das Werkzeug, das den
//      Schwachen helfen sollte, lag fünfzig Jahre später in anderen Händen.
//
//   6. **Die Längenregel, umgekehrt (Betreiber-Vorgabe 24.08.2026).** Ab
//      Kapitel 9 gilt: vollständig und ausführlich. Nach oben bleibt eine
//      großzügige Grenze stehen, damit „ausführlich" nicht in „aufgebläht"
//      kippt.
//
//   7. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, Quiz-Umfang,
//      offene Urteilsfrage, Lernformat und die offene Tür zur zweiten
//      Stimme (die Versicherten und die Verdrängten).
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 12: Die zweite
// Perspektive und die endgültige Synthese kommen erst mit dem Hermes-Pass
// dazu. Prüfungen, die nur für die erste Stimme gelten, hängen deshalb an
// ihrer id („staat"); die Prüfungen zum Erzähl-Muster laufen über ALLE
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
} = require('../utils/themen/karten/verstaatlichung.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt umfasst 14° Länge — etwas weniger als das Blatt von
 * Kapitel 12 (20°, Toleranz 0,4°). 0,4° sind hier rund zwanzig Bildpunkte in
 * der Waagerechten; das deckt die Vereinfachung der Wattenmeer- und
 * Boddenküsten ab, ohne einen falsch gesetzten Punkt durchzulassen.
 */
const KUESTEN_TOLERANZ = 0.4;

/**
 * Mindestumfang der ersten Perspektive (Neuzeit-Regel, Kapitel 9 ff.).
 *
 * Die frühen Kapitel durften höchstens ~250 Zeilen je Stimme haben; ab
 * Kapitel 9 gilt die Umkehrung — vollständig und ausführlich.
 */
const MIN_ZEILEN_ERSTE_STIMME = 300;

/** Obergrenze fürs ganze Kapitel — ausführlich ja, aufgebläht nein. */
const MAX_ZEILEN_KAPITEL = 1500;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 12: Ein
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
 * Dieser Ausschnitt hat zwei Landflächen: das Festland (die Niederlande,
 * Deutschland, Jütland, Böhmen, Österreich, Hinterpommern — alles hängt in
 * diesem Rahmen zusammen) und Lolland-Falster.
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
  const thema = themaNachId('verstaatlichung');
  pruefe(
    'Verstaatlichung: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 13
  // steht hinter Röntgen und Penicillin (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Verstaatlichung: steht in der App hinter „Röntgen und Penicillin"',
    alleThemen.findIndex((t) => t.id === 'verstaatlichung') ===
      alleThemen.findIndex((t) => t.id === 'roentgen-penicillin') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Verstaatlichung/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Verstaatlichung/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss das Ruhrgebiet, Berlin, München und Wien auf dasselbe Blatt
  // bringen — und beide Meere zeigen, an denen die Hygienefrage entschieden
  // wurde.
  pruefe(
    'Verstaatlichung/Karte: der Ausschnitt reicht vom Rhein bis nach Wien',
    RAHMEN.minLon <= 4 && RAHMEN.maxLon >= 16,
  );
  pruefe(
    'Verstaatlichung/Karte: der Ausschnitt reicht vom Alpenrand bis an die Ostsee',
    RAHMEN.minLat <= 48 && RAHMEN.maxLat >= 54.5,
  );
  pruefe('Verstaatlichung/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Verstaatlichung/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Ostende (Flandern)', 2.92, 51.23],
    ['Zeebrügge (Belgien)', 3.2, 51.33],
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
    ['Kolberg (Hinterpommern)', 15.58, 54.18],
    ['Stolpmünde (Hinterpommern)', 16.86, 54.58],
  ];
  for (const [name, lon, lat] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], kuesten.festland);
    pruefe(
      `Verstaatlichung/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb einer Landfläche liegen ----------------
  const binnenorte = [
    ['Berlin', 13.405, 52.52],
    ['Essen', 7.013, 51.455],
    ['Dortmund', 7.47, 51.51],
    ['Hamburg', 9.994, 53.551],
    ['Dresden', 13.738, 51.05],
    ['Leipzig', 12.37, 51.34],
    ['München', 11.576, 48.137],
    ['Nürnberg', 11.08, 49.45],
    ['Köln', 6.96, 50.94],
    ['Frankfurt am Main', 8.68, 50.11],
    ['Stuttgart', 9.18, 48.78],
    ['Straßburg', 7.75, 48.58],
    ['Bad Kissingen', 10.078, 50.202],
    ['Bad Wörishofen', 10.599, 48.005],
    ['Rostock', 12.14, 54.09],
    ['Stettin', 14.55, 53.43],
    ['Breslau', 17.03, 51.11],
    ['Posen', 16.93, 52.41],
    ['Prag', 14.42, 50.08],
    ['Wien', 16.372, 48.208],
    ['Zürich', 8.54, 47.37],
    ['Amsterdam', 4.9, 52.37],
    ['Brüssel', 4.35, 50.85],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Verstaatlichung/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['die mittlere Nordsee', 5.0, 54.2],
    ['die Deutsche Bucht', 7.5, 54.2],
    ['die südliche Nordsee', 3.6, 52.6],
    ['die Nordsee vor Sylt', 7.9, 54.9],
    ['die Kieler Bucht', 10.5, 54.7],
    ['die Mecklenburger Bucht', 11.8, 54.4],
    ['die Ostsee vor Rügen', 13.9, 54.85],
    ['die Ostsee vor Kolberg', 15.4, 54.6],
    ['die Ostsee östlich Bornholms', 15.9, 54.75],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Verstaatlichung/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Das Reichsgebiet ----------------------------------------------------
  // Die Phasenfläche „Deutsches Reich 1871" muss die Grenzen von 1871
  // treffen: Straßburg lag drinnen (Elsass-Lothringen), Wien und Prag nicht.
  for (const [name, lon, lat] of [
    ['Berlin', 13.405, 52.52],
    ['Essen', 7.013, 51.455],
    ['Straßburg', 7.75, 48.58],
    ['München', 11.576, 48.137],
    ['Breslau', 17.03, 51.11],
    ['Hamburg', 9.994, 53.551],
  ]) {
    pruefe(
      `Verstaatlichung/Atlas: ${name} lag im Deutschen Reich von 1871`,
      liegtIn([lon, lat], kuesten.reich1871),
    );
  }
  for (const [name, lon, lat] of [
    ['Wien', 16.372, 48.208],
    ['Prag', 14.42, 50.08],
    ['Zürich', 8.54, 47.37],
    ['Amsterdam', 4.9, 52.37],
    ['Brüssel', 4.35, 50.85],
  ]) {
    pruefe(
      `Verstaatlichung/Atlas: ${name} lag außerhalb des Deutschen Reiches`,
      !liegtIn([lon, lat], kuesten.reich1871),
    );
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Verstaatlichung/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Verstaatlichung/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\b(1[6-9]\d\d|20\d\d)\b/.test(phase.label),
    );
    pruefe(
      `Verstaatlichung/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Verstaatlichung/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: das Elend, die Gesetze, die
  // Hygiene, der Streit um die Kurierfreiheit, die Vereinheitlichung.
  pruefe(
    'Verstaatlichung/Karte: eine Phase zeigt die soziale Frage und das Sozialistengesetz von 1878',
    karte.phasen.some(
      (p) =>
        /1878/.test(p.label) &&
        /Sozialistengesetz/.test(p.hinweis) &&
        /(Mietskasernen|Schlafgänger)/.test(p.hinweis),
    ),
  );
  pruefe(
    'Verstaatlichung/Karte: eine Phase zeigt die drei Sozialgesetze in Berlin',
    karte.phasen.some(
      (p) =>
        /188[0-9]/.test(p.label) &&
        /Berlin/.test(p.label + p.hinweis) &&
        /15\. Juni 1883/.test(p.hinweis) &&
        /6\. Juli 1884/.test(p.hinweis) &&
        /22\. Juni 1889/.test(p.hinweis),
    ),
  );
  pruefe(
    'Verstaatlichung/Karte: die Gesetzes-Phase nennt die Kaiserliche Botschaft von 1881',
    karte.phasen.some(
      (p) => /17\. November 1881/.test(p.hinweis) && /Kaiserliche Botschaft/.test(p.hinweis),
    ),
  );
  pruefe(
    'Verstaatlichung/Karte: eine Phase zeigt die Cholera von 1892 in Hamburg und Altona',
    karte.phasen.some(
      (p) =>
        /1892/.test(p.label) &&
        /Hamburg/.test(p.label + p.hinweis) &&
        /Altona/.test(p.hinweis) &&
        /8\.600/.test(p.hinweis),
    ),
  );
  pruefe(
    'Verstaatlichung/Karte: eine Phase zeigt den Streit um die Kurierfreiheit',
    karte.phasen.some(
      (p) =>
        /Kurpfuscherei/.test(p.label) &&
        /Kurierfreiheit/.test(p.hinweis) &&
        /1869/.test(p.hinweis) &&
        /Kneipp/.test(p.hinweis),
    ),
  );
  pruefe(
    'Verstaatlichung/Karte: eine Phase zeigt die Reichsversicherungsordnung von 1911',
    karte.phasen.some(
      (p) =>
        /1911/.test(p.label) &&
        /Reichsversicherungsordnung/.test(p.hinweis) &&
        /19\. Juli 1911/.test(p.hinweis),
    ),
  );
  pruefe(
    'Verstaatlichung/Karte: die Phasen laufen von der sozialen Frage bis zur Reichsversicherungsordnung',
    karte.phasen[0].id === 'soziale-frage-1871-1878' &&
      karte.phasen[karte.phasen.length - 1].id === 'rvo-1911',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Verstaatlichung/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch|Betrüger)/i.test(
      phasenText,
    ),
  );
  // Der zeitgenössische Kampfbegriff steht in Anführungszeichen — er ist
  // zitiert, nicht übernommen.
  pruefe(
    'Verstaatlichung/Karte: „Kurpfuscherei" ist als zeitgenössischer Begriff gekennzeichnet',
    karte.phasen.every((p) => !/Kurpfuscherei/.test(p.label) || /„Kurpfuscherei"/.test(p.label)),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['berlin', 13.405, 52.52],
    ['essen', 7.013, 51.455],
    ['hamburg', 9.994, 53.551],
    ['dresden', 13.738, 51.05],
    ['bad-kissingen', 10.078, 50.202],
    ['bad-woerishofen', 10.599, 48.005],
  ];
  pruefe(
    'Verstaatlichung/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Verstaatlichung/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(
      `Verstaatlichung/Atlas: „${id}" sitzt auf ${lon}/${lat}`,
      punkt.x === x && punkt.y === y,
    );
    pruefe(`Verstaatlichung/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Verstaatlichung/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Verstaatlichung/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die Pole des Kapitels: das Gesetz, der Anlass, die Seuche, die Kurorte.
  const berlinPunkt = karte.punkte.find((p) => p.id === 'berlin');
  pruefe(
    'Verstaatlichung/Karte: der Punkt Berlin nennt die drei Gesetze und die Kaiserliche Botschaft',
    Boolean(
      berlinPunkt &&
        /17\. November 1881/.test(berlinPunkt.text) &&
        /15\. Juni 1883/.test(berlinPunkt.text) &&
        /1889/.test(berlinPunkt.text) &&
        /1911/.test(berlinPunkt.text),
    ),
  );
  pruefe(
    'Verstaatlichung/Karte: der Punkt Berlin nennt auch die Kehrseite (Mietskasernen)',
    Boolean(berlinPunkt && /Mietskasernen/.test(berlinPunkt.text)),
  );
  const essenPunkt = karte.punkte.find((p) => p.id === 'essen');
  pruefe(
    'Verstaatlichung/Karte: der Punkt Essen nennt die Knappschaften als Vorbild',
    Boolean(
      essenPunkt &&
        /Knappschaften/.test(essenPunkt.text) &&
        /Krupp/.test(essenPunkt.text) &&
        /1836/.test(essenPunkt.text),
    ),
  );
  const hamburgPunkt = karte.punkte.find((p) => p.id === 'hamburg');
  pruefe(
    'Verstaatlichung/Karte: der Punkt Hamburg nennt die Cholera 1892, Altona und Koch',
    Boolean(
      hamburgPunkt &&
        /1892/.test(hamburgPunkt.text) &&
        /Altona/.test(hamburgPunkt.text) &&
        /Koch/.test(hamburgPunkt.text),
    ),
  );
  const kissingenPunkt = karte.punkte.find((p) => p.id === 'bad-kissingen');
  pruefe(
    'Verstaatlichung/Karte: der Punkt Bad Kissingen nennt Schweninger und die Lebensordnung',
    Boolean(
      kissingenPunkt &&
        /Schweninger/.test(kissingenPunkt.text) &&
        /(Trinkkur|Bäder)/.test(kissingenPunkt.text),
    ),
  );
  const woerishofenPunkt = karte.punkte.find((p) => p.id === 'bad-woerishofen');
  pruefe(
    'Verstaatlichung/Karte: der Punkt Bad Wörishofen nennt Kneipp und die Kurierfreiheit von 1869',
    Boolean(
      woerishofenPunkt &&
        /Kneipp/.test(woerishofenPunkt.text) &&
        /1869/.test(woerishofenPunkt.text) &&
        /Krankenkassen/.test(woerishofenPunkt.text),
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
    `Verstaatlichung/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Verstaatlichung/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Verstaatlichung/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Verstaatlichung/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern Arbeiter, eine Seuche
    // und Kurgäste.
    pruefe(
      `Verstaatlichung/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /Arbeit|Cholera|Kurgäste|Zechen|Versicherung/.test(bewegung.text),
    );
  }
  const landflucht = (karte.bewegungen || []).find((b) => b.id === 'landflucht-ins-revier');
  pruefe(
    'Verstaatlichung/Karte: die Landflucht endet im Ruhrrevier bei Essen',
    Boolean(landflucht) &&
      landflucht.nach[0] === P.punkt(7.013, 51.455)[0] &&
      landflucht.nach[1] === P.punkt(7.013, 51.455)[1],
  );
  pruefe(
    'Verstaatlichung/Karte: die Landflucht erklärt die zerrissene Sicherung',
    Boolean(landflucht) && /Pflichtversicherung/.test(landflucht.text),
  );
  const cholera = (karte.bewegungen || []).find((b) => b.id === 'cholera-nach-hamburg');
  pruefe(
    'Verstaatlichung/Karte: der Weg der Cholera endet in Hamburg',
    Boolean(cholera) &&
      cholera.nach[0] === P.punkt(9.994, 53.551)[0] &&
      cholera.nach[1] === P.punkt(9.994, 53.551)[1],
  );
  pruefe(
    'Verstaatlichung/Karte: der Weg der Cholera nennt Altona und die Filter',
    Boolean(cholera) && /Altona/.test(cholera.text) && /Sandfilter/.test(cholera.text),
  );
  const kurgaeste = (karte.bewegungen || []).find(
    (b) => b.id === 'kurgaeste-nach-woerishofen',
  );
  pruefe(
    'Verstaatlichung/Karte: die Kurgäste fahren von Berlin nach Bad Wörishofen',
    Boolean(kurgaeste) &&
      kurgaeste.von[0] === P.punkt(13.405, 52.52)[0] &&
      kurgaeste.nach[0] === P.punkt(10.599, 48.005)[0] &&
      kurgaeste.nach[1] === P.punkt(10.599, 48.005)[1],
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Deutsches Reich',
    'Berlin',
    'Ruhrgebiet',
    'Nordsee',
    'Ostsee',
    'Rhein',
    'Donau',
    'Alpen',
    'Elbe',
    'Hamburg',
    'München',
  ]) {
    pruefe(`Verstaatlichung/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Verstaatlichung: Titel und Epoche stehen',
    thema.titel === 'Die Verstaatlichung des Gesundheitswesens' &&
      thema.epoche === '~1883 ff.',
  );
  pruefe(
    'Verstaatlichung: der Aufhänger ist eine Frage',
    thema.aufhaenger.frage.includes('?'),
  );
  pruefe(
    'Verstaatlichung: der Aufhänger stellt die Eigentumsfrage neutral',
    /gehört/.test(thema.aufhaenger.frage) &&
      /Arzt/.test(thema.aufhaenger.frage) &&
      /Staat/.test(thema.aufhaenger.frage),
  );
  pruefe(
    'Verstaatlichung: der Aufhänger nennt die drei Jahreszahlen',
    /15\. Juni 1883/.test(thema.aufhaenger.text) &&
      /1884/.test(thema.aufhaenger.text) &&
      /1889/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Verstaatlichung: der Aufhänger kündigt beide Seiten an (Segen UND Schatten)',
    /(Arzt für alle|sauberes Wasser|saubere Wasser)/.test(thema.aufhaenger.text) &&
      /Nummer statt des/.test(thema.aufhaenger.text) &&
      /bevormundend/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Verstaatlichung: der Aufhänger ist neutral formuliert (keine Vorverurteilung)',
    !/(Betrüger|Scharlatan|Lüge|Verbrecher|Willkür)/i.test(thema.aufhaenger.text),
  );
  pruefe('Verstaatlichung: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Verstaatlichung: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn|verantwortungslos)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Verstaatlichung: der Hinweis zum Urteil lässt beide Richtungen offen',
    /kein Richtig und kein Falsch/.test(thema.urteil.hinweis) &&
      /Rechtsanspruch/.test(thema.urteil.hinweis),
  );
  pruefe(
    'Verstaatlichung: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Verstaatlichung/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Verstaatlichung/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const staatsStimme = thema.perspektiven.find((p) => p.id === 'staat');
  pruefe(
    'Verstaatlichung: die Stimme des Staates ist die erste Perspektive',
    thema.perspektiven[0] === staatsStimme,
  );
  if (!staatsStimme) return;

  pruefe(
    'Verstaatlichung: die erste Perspektive ist Opus zugeschrieben',
    staatsStimme.stimme === 'Opus',
  );
  pruefe(
    'Verstaatlichung: die erste Perspektive heißt nach ihrer Form',
    /Akte|Stimme des Staates/.test(staatsStimme.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt
  // =========================================================================

  const zeilenErsteStimme = staatsStimme.text.split('\n').length;
  pruefe(
    `Verstaatlichung/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'Verstaatlichung/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 20000 Zeichen)',
    staatsStimme.text.length > 20000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Verstaatlichung/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = staatsStimme.text.replace(/\s+/g, ' ');

  const ueberschriften = staatsStimme.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Verstaatlichung: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 10,
  );
  pruefe(
    'Verstaatlichung: die Abschnitte bleiben überschaubar (höchstens achtzehn)',
    ueberschriften.length <= 18,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 13 darf
  // keine der dreizehn bisherigen Dramaturgien übernehmen. Kapitel 1
  // gliedert nach „Wer hier spricht …", Kapitel 2 führt seine
  // Begründungslogik an „## Warum …?"-Überschriften entlang, Kapitel 3
  // erzählt einen Tageslauf, Kapitel 4 schreibt Briefe, Kapitel 5 folgt
  // einem Buch von Station zu Station, Kapitel 6 geht als Rundgang durch
  // ein Haus, Kapitel 7 verhandelt vor Gericht, Kapitel 8 rechnet, Kapitel
  // 9 liest die Uhr, Kapitel 10 geht eine Kette ab, Kapitel 11 legt
  // Präparate unter die Linse, Kapitel 12 stellt die Fragen eines
  // Reporters. Dieses Kapitel ist DIE AKTE: Der Staat spricht so, wie er
  // wirklich spricht — Blatt für Blatt.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Verstaatlichung: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 9 (keine Uhr)',
    !/^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/^## Sekunde /.test(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 10 (keine Kette)',
    !/^## Die Kette/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Glied/.test(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 11 (keine Präparate)',
    !/^## Die Linse/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Präparat/.test(h)),
  );
  pruefe(
    'Verstaatlichung: andere Struktur als in Kapitel 12 (keine Reporterfragen)',
    ueberschriften.filter((h) => /^## „/.test(h)).length === 0,
  );
  pruefe(
    'Verstaatlichung: die Dramaturgie ist die Akte (Blätter als Abschnitte)',
    /^## Die Akte, die im Reichskanzleramt liegt/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /^## Blatt \d+: /.test(h)).length >= 10 &&
      /Nachtrag/.test(ueberschriften[ueberschriften.length - 1]),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Verstaatlichung: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Der Gegenstand: die Versicherung, die Kassen, die Sozialgesetze.
  pruefe(
    'Verstaatlichung/Denkart: die Sozialgesetze und die Krankenkasse stehen mit Namen da',
    /Sozialgesetze/.test(fliessend) &&
      /Krankenversicherungsgesetz/.test(fliessend) &&
      /Ortskrankenkassen/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Denkart: die Solidarität ist als Rechnung erklärt',
    /Viele zahlen wenig, damit der Einzelne im Unglück viel bekommt/.test(fliessend) &&
      /Umverteilung/.test(fliessend) &&
      /solidarisch/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Denkart: der Kern der Neuerung ist benannt (aus Almosen wird Anspruch)',
    /Rechtsanspruch/.test(fliessend) &&
      /Aus einer Gnade wird ein Recht/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Denkart: die Formel des Staates steht da',
    /Gesundheit ist kein Geschäft und keine Gnade, sondern eine Angelegenheit des Gemeinwesens/.test(
      fliessend,
    ),
  );
  pruefe(
    'Verstaatlichung/Denkart: die Kehrseite der Formel wird sofort mitgenannt',
    /Wer zahlt, bestimmt mit/.test(fliessend),
  );

  // (b) Die Vorgeschichte: die alten Netze und ihre Zerstörung.
  pruefe(
    'Verstaatlichung/Denkart: die alten Sicherungen werden benannt (Zunft, Knappschaft, Familie)',
    /Knappschaften/.test(fliessend) &&
      /Zunft/.test(fliessend) &&
      /Armenpflege/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Denkart: der Preis des Almosens in Preußen steht da (Wahlrecht)',
    /Wer in Preußen Armenunterstützung bezog, verlor sein Wahlrecht/.test(fliessend),
  );

  // (c) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum überhaupt der Staat? (die Industrialisierung zerschnitt die alten Netze)',
      /Warum überhaupt der Staat\?/.test(fliessend) &&
        /Weil sonst niemand mehr da ist/.test(fliessend) &&
        /Weil eine unzufriedene Masse gefährlich ist/.test(fliessend),
    ],
    [
      'Warum eine Versicherung und keine Wohltätigkeit? (Bittsteller oder Berechtigter)',
      /Warum eine Versicherung und keine Wohltätigkeit\?/.test(fliessend) &&
        /Weil die Wohltätigkeit den Menschen zum Bittsteller macht und die Versicherung ihn zum Berechtigten/.test(
          fliessend,
        ),
    ],
    [
      'Warum die Pflicht und nicht die Freiwilligkeit? (die Gesunden bleiben sonst fern)',
      /Die Freiwilligkeit versagt genau da, wo sie gebraucht wird/.test(fliessend) &&
        /Die Pflicht ist nicht der Gegensatz zur Solidarität, sie ist ihre Voraussetzung/.test(
          fliessend,
        ),
    ],
    [
      'Warum sollte das den Sozialismus schwächen? (und warum es misslang)',
      /aushungern/.test(fliessend) &&
        /hat ihm eine Schule gebaut/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Verstaatlichung/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Verstaatlichung/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );

  // =========================================================================
  // 5. Die ehrlichen Grenzen — von der eigenen Seite benannt
  //    (TONE-Regel und Zusatzregel für sensible Themen)
  // =========================================================================

  const unbequemeStellen = [
    [
      'die Peitsche kam zuerst: das Sozialistengesetz vom 21. Oktober 1878',
      /21\. Oktober 1878/.test(fliessend) &&
        /Sozialistengesetz/.test(fliessend) &&
        /Sie hat zuerst verboten und dann geholfen/.test(fliessend),
    ],
    [
      'die politische Absicht wird mit dem belegten Zitat von 1884 offengelegt',
      /Wenn es keine Sozialdemokratie gäbe/.test(fliessend) &&
        /9\. Mai 1884/.test(fliessend),
    ],
    [
      'die Kontrolle: Krankenkontrolleure in der Wohnung',
      /Krankenkontrolleure/.test(fliessend) &&
        /Aus dem Leidenden wird ein möglicher Simulant/.test(fliessend),
    ],
    [
      'der Kranke wird zum Vorgang mit Nummer',
      /Aus dem Kranken wird ein Vorgang/.test(fliessend) &&
        /Mitgliedsnummer/.test(fliessend),
    ],
    [
      'der Arzt wird Kassenarzt mit Tarif (Leipzig 1900, Berliner Abkommen 1913)',
      /Hartmannbund/.test(fliessend) &&
        /Berliner Abkommen/.test(fliessend) &&
        /1\.350 Versicherte/.test(fliessend),
    ],
    [
      'die Bürokratie wächst von selbst',
      /Wer Regeln hat, braucht Beamte/.test(fliessend) &&
        /achtzehnhundert/.test(fliessend),
    ],
    [
      'die Verdrängung der Naturheilkunde geschah über das Geld, nicht über ein Verbot',
      /Nicht der Paragraph hat die alte Heilkunde aus dem Alltag der einfachen Leute gedrängt, sondern der Krankenschein/.test(
        fliessend,
      ),
    ],
    [
      'die Kurierfreiheit von 1869 und ihr Ende 1939',
      /Kurierfreiheit/.test(fliessend) &&
        /1869/.test(fliessend) &&
        /Heilpraktikergesetz/.test(fliessend),
    ],
    [
      'der Kanzler bekam nicht, was er wollte (Reichsanstalt, Reichszuschuss, Zustimmung)',
      /Reichsversicherungsanstalt/.test(fliessend) &&
        /Tabakmonopol/.test(fliessend) &&
        /stimmten gegen das Krankenversicherungsgesetz/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of unbequemeStellen) {
    pruefe(`Verstaatlichung/Grenzen: ${name} steht im Text`, erfuellt);
  }
  pruefe(
    'Verstaatlichung/Grenzen: die Stimme benennt mindestens drei unbequeme Stellen selbst',
    unbequemeStellen.filter(([, erfuellt]) => erfuellt).length >= 3,
  );
  // TONE-Regel: auch die Größe der Leistung steht da.
  pruefe(
    'Verstaatlichung/TONE: der Segen der Gesetze wird nicht kleingeredet',
    /Millionen Menschen verdanken dieser Antwort ihr Leben/.test(fliessend) &&
      /sechzehn Millionen/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/TONE: die gewonnene Lebenszeit wird mit Zahlen belegt',
    /35,6 Jahre für Männer/.test(fliessend) && /44,8 und 48,3/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/TONE: der Anteil der Hygiene wird ehrlich zugeordnet',
    /gehören nicht der Kassenmedizin allein — der größere Teil gehört dem Wasser/.test(
      fliessend,
    ) && /Altona/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/TONE: die Beweggründe der Gegenseite werden fair wiedergegeben',
    /Lasst die Leute doch selbst entscheiden/.test(fliessend) &&
      /ein Almosen, das von der eigentlichen Frage nach den Verhältnissen ablenken solle/.test(
        fliessend,
      ),
  );
  pruefe(
    'Verstaatlichung/TONE: die andere Denkart wird nicht abgewertet',
    !/(rückständig|primitiv|barbarisch|lächerlich|Hokuspokus|Spinner|Schwurbl)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'Verstaatlichung/TONE: kein Heilversprechen',
    !/(heilt alles|garantiert sicher|völlig risikolos|immer wirksam)/i.test(fliessend),
  );

  // =========================================================================
  // 6. KEINE GERÜCHTE (Betreiber-Entscheid 25.08.2026)
  // =========================================================================

  pruefe(
    'Verstaatlichung/Belege: der Umgang mit Überliefertem wird vorab angekündigt',
    /Wo etwas nur überliefert ist und sich nicht belegen lässt, sage ich es dazu/.test(
      fliessend,
    ),
  );
  pruefe(
    'Verstaatlichung/Belege: die zugeschriebenen Bismarck-Wendungen sind als unbelegt gekennzeichnet',
    /stehen so in keinem Protokoll/.test(fliessend) &&
      /sie sind nicht aktenkundig/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Belege: der aktenkundige Wortlaut der Kaiserlichen Botschaft steht daneben',
    /nicht ausschließlich im Wege der Repression sozialdemokratischer Ausschreitungen/.test(
      fliessend,
    ) && /17\. November 1881/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Belege: die Aufzeichnung Moritz Buschs ist als Quelle zweiter Hand markiert',
    /Moritz Busch/.test(fliessend) &&
      /Diese Fassung ist keine Rede, sondern eine Aufzeichnung aus zweiter Hand/.test(
        fliessend,
      ),
  );
  pruefe(
    'Verstaatlichung/Belege: die Attentäter von 1878 werden richtig eingeordnet',
    /Keiner der beiden gehörte der sozialdemokratischen Partei an/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Belege: die täuschende Lebenserwartungszahl wird erklärt statt benutzt',
    /Diese Zahl täuscht allerdings/.test(fliessend) &&
      /Kindersterblichkeit/.test(fliessend),
  );

  // =========================================================================
  // 7. Der Innovations-Zyklus (roter Faden, CLAUDE.md 26.08.2026)
  // =========================================================================

  pruefe(
    'Verstaatlichung/Zyklus: das Muster des Buches wird benannt',
    /Das Neue schadet oft erst, bevor es segensreich wird/.test(fliessend) &&
      /Die Chirurgie tötete durch Wundfieber, ehe sie rettete/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Zyklus: das Muster wird auf eine Einrichtung übertragen',
    /Ein Werkzeug fragt nicht, wer es in die Hand nimmt/.test(fliessend) &&
      /Ein Werkzeug ist so gut wie die Hand, die es hält, und die Hand wechselt/.test(
        fliessend,
      ),
  );
  pruefe(
    'Verstaatlichung/Zyklus: der spätere Missbrauch wird von der eigenen Seite benannt',
    /1933/.test(fliessend) && /vierhunderttausend/.test(fliessend),
  );

  // =========================================================================
  // 8. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Versicherten und die Verdrängten) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Verstaatlichung/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1869/.test(perspektivenText) &&
      /1878/.test(perspektivenText) &&
      /1883/.test(perspektivenText) &&
      /1884/.test(perspektivenText) &&
      /1889/.test(perspektivenText) &&
      /1911/.test(perspektivenText),
  );
  pruefe(
    'Verstaatlichung/Erzähl-Muster: (a2) die Orte werden genannt',
    /Berlin/.test(perspektivenText) &&
      /Hamburg/.test(perspektivenText) &&
      /Altona/.test(perspektivenText) &&
      /Ruhrrevier/.test(perspektivenText) &&
      /Bad Kissingen/.test(perspektivenText) &&
      /Bad Wörishofen/.test(perspektivenText),
  );
  pruefe(
    'Verstaatlichung/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /Denkart/.test(perspektivenText) &&
      /Rechtsanspruch/.test(perspektivenText) &&
      /Solidarität/.test(perspektivenText),
  );
  pruefe(
    'Verstaatlichung/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /Was Bestand hat/.test(perspektivenText) &&
      /Reichsversicherungsordnung/.test(perspektivenText) &&
      /Lloyd George/.test(perspektivenText),
  );
  pruefe(
    'Verstaatlichung/Erzähl-Muster: (c2) und die Grenzen',
    /Was geschadet hat/.test(perspektivenText) &&
      /Was offen bleibt/.test(perspektivenText),
  );
  pruefe(
    'Verstaatlichung/Bilanz: die Blindstelle der eigenen Denkart wird benannt',
    /Nachprüfbar aber ist nur, was sich in Formulare schreiben lässt/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung/Bilanz: die Grenze zwischen abrechenbar und nicht abrechenbar steht da',
    /Der Urheber der Kassenmedizin ist von etwas gesund geworden, was keine Kasse bezahlt hätte/.test(
      fliessend,
    ) && /Schweninger/.test(fliessend),
  );

  // --- Die Brücken in die folgenden Kapitel --------------------------------
  pruefe(
    'Verstaatlichung: die Brücke zu Kneipp (Kapitel 17) ist gelegt',
    /Kneipp/.test(fliessend) && /Kapitel 17/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung: die Brücke zu den Gegenwartskapiteln ist gelegt',
    /Kapitel 14 und 15/.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Verstaatlichung: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung: die Tür führt zu den Versicherten und den Verdrängten',
    /Die zweite Stimme dieses Kapitels gehört den Versicherten und den Verdrängten/.test(
      fliessend,
    ),
  );
  pruefe(
    'Verstaatlichung: die Tür nennt, was die zweite Stimme mitbringt',
    /Quittungskarte/.test(fliessend) &&
      /Kontrolleur/.test(fliessend) &&
      /Kräuterfrauen/.test(fliessend) &&
      /Bader/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung: die zweite Stimme kann in dieselbe Dramaturgie treten (die andere Akte)',
    /Sie wird die andere Akte aufschlagen/.test(fliessend) &&
      /Versichertenakte/.test(fliessend),
  );
  pruefe(
    'Verstaatlichung: die offene Frage des Kapitels steht am Ende',
    /Wem gehört die Gesundheit — dem Staat, dem Markt oder dem Menschen, der sie hat\?/.test(
      fliessend,
    ),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Verstaatlichung/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Verstaatlichung/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Verstaatlichung/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Verstaatlichung/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Verstaatlichung/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 14)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Verstaatlichung/Synthese: sagt, welche Stimme noch kommt',
      /Versicherten und die Verdrängten/.test(thema.synthese) &&
        /(Kräuterfrauen|Bader|Naturheilkundigen)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Verstaatlichung/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Verstaatlichung/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Verstaatlichung/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
