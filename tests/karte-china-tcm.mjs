// Prüfungen für Kapitel 2 — „China und die TCM" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Drei Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien der Karte liegen als echte
//      Längen-/Breitengrade im Modul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Hafenstädte auf der gezeichneten Küste, Binnenorte
//      innerhalb der Landflächen, offene See außerhalb. Der Ausschnitt ist
//      kleiner als der von Kapitel 1 (52° Länge statt 104°), deshalb ist
//      die Toleranz enger gesetzt.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück dieses
//      Kapitels: Im Text der ersten Stimme müssen Qi, Yin und Yang, die
//      Fünf Elemente und die Meridiane vorkommen — und die
//      Begründungslogik muss „Warum"-Fragen tatsächlich beantworten
//      (Nadel, Kräuter-Rezeptur, Puls- und Zungendiagnose).
//
//   3. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, ehrliche
//      Wirkungsbilanz in beide Richtungen, Quiz-Umfang, offene
//      Urteilsfrage.
//
// Zustandstolerant gebaut wie bei Kapitel 1: Die zweite Perspektive (der
// westliche Blick) und die endgültige Synthese kommen erst mit dem
// Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten, hängen
// deshalb an ihrer id („tcm-innen"); die Prüfungen zum Erzähl-Muster laufen
// über ALLE Perspektiven zusammen. Die Synthese wird je nach Ausbaustand
// verzweigt gemessen (siehe unten).
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
} = require('../utils/themen/karten/china-tcm.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Der Ausschnitt Ostasiens ist rund halb so breit wie der von Kapitel 1 —
 * eine halbgradige Toleranz entspricht hier also derselben Strenge auf dem
 * Bildschirm wie dort 0,8°.
 */
const KUESTEN_TOLERANZ = 0.5;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in Kapitel 1: Ein Strahl nach
 * Osten schneidet den Rand eines geschlossenen Rings ungerade oft, wenn der
 * Punkt drinnen liegt. Gerechnet wird in Längen-/Breitengraden.
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
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge bei Wladiwostok genauso
 * „lang" wie auf Hainan; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('china-tcm');
  pruefe('China: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: China steht
  // hinter den Anfängen der Heilkunde (Themenlandkarte in CLAUDE.md).
  const { alleThemen } = require('../utils/themen/index.js');
  pruefe(
    'China: steht in der App hinter „Die Anfänge der Heilkunde"',
    alleThemen.findIndex((t) => t.id === 'china-tcm') ===
      alleThemen.findIndex((t) => t.id === 'anfaenge-der-heilkunde') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('China/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'China/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss das chinesische Kernland mit seiner Küste, das Gelbe Meer, Korea
  // und den japanischen Inselbogen enthalten.
  pruefe(
    'China/Karte: der Ausschnitt reicht vom osttibetischen Rand bis über Japan',
    RAHMEN.minLon <= 100 && RAHMEN.maxLon >= 142,
  );
  pruefe(
    'China/Karte: der Ausschnitt reicht von Hainan bis an den Amur',
    RAHMEN.minLat <= 20 && RAHMEN.maxLat >= 45,
  );
  pruefe('China/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('China/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Ausgewählt sind Häfen, die im Schulatlas eindeutig am Wasser stehen.
  const kuestenorte = [
    ['Tianjin (Bohai-Meer)', 117.7, 38.98, kuesten.festland],
    ['Dalian (Liaodong)', 121.6, 38.9, kuesten.festland],
    ['Qingdao (Gelbes Meer)', 120.38, 36.07, kuesten.festland],
    ['Shanghai (Jangtse-Mündung)', 121.5, 31.4, kuesten.festland],
    ['Fuzhou (Taiwanstraße)', 119.6, 26.06, kuesten.festland],
    ['Hongkong (Perlfluss-Mündung)', 114.17, 22.28, kuesten.festland],
    ['Incheon (Westküste Koreas)', 126.6, 37.45, kuesten.festland],
    ['Busan (Südküste Koreas)', 129.05, 35.1, kuesten.festland],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `China/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb der Landflächen liegen -----------------
  const binnenorte = [
    ['Peking', 116.4, 39.9],
    ['Xi’an', 108.94, 34.27],
    ['Luoyang', 112.45, 34.62],
    ['Wuhan (am Jangtse)', 114.3, 30.6],
    ['Chengdu', 104.07, 30.67],
    ['Guangzhou (Kanton)', 113.26, 23.13],
    ['Seoul', 126.98, 37.57],
    ['Kyoto (Honshu)', 135.77, 35.02],
    ['Tokio (Honshu)', 139.69, 35.69],
    ['Sapporo (Hokkaido)', 141.35, 43.06],
    ['Taipeh (Taiwan)', 121.56, 25.03],
    // Nicht Haikou selbst: Die Stadt liegt genau auf einem Stützpunkt der
    // Küstenlinie, und ein Punkt exakt auf der Kante ist beim
    // Strahlensatz-Verfahren zweideutig. Geprüft wird deshalb das Innere.
    ['das Innere von Hainan', 109.8, 19.2],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`China/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['das Gelbe Meer', 123.0, 35.5],
    ['das Bohai-Meer', 119.5, 38.5],
    ['das Ostchinesische Meer', 126.0, 29.0],
    ['die Taiwanstraße', 119.5, 24.5],
    ['das Südchinesische Meer', 114.0, 18.0],
    ['der Golf von Tonkin', 107.5, 19.5],
    ['das Japanische Meer', 134.0, 39.5],
    ['der Pazifik östlich von Honshu', 144.0, 35.0],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`China/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // Korea und Japan sind getrennt — sonst wäre das Japanische Meer zugewachsen.
  pruefe(
    'China/Atlas: Japan ist eine eigene Landmasse, nicht mit dem Festland verwachsen',
    liegtIn([139.69, 35.69], kuesten.honshu) && !liegtIn([139.69, 35.69], kuesten.festland),
  );
  pruefe(
    'China/Atlas: Korea gehört zum Festland-Ring',
    liegtIn([126.98, 37.57], kuesten.festland),
  );

  // --- Die Phasen ----------------------------------------------------------
  pruefe('China/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(`China/Karte: Phase „${phase.id}" nennt eine Jahreszahl`, /\d/.test(phase.label));
    pruefe(
      `China/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `China/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: vom Gelben Fluss über das
  // Han-Reich (die Klassiker) bis zur Ming-Zeit (das Wissen erreicht Europa).
  pruefe(
    'China/Karte: die Phasen laufen von den frühen Kulturen bis zur Ming-Zeit',
    karte.phasen[0].id === 'fruehe-kulturen' &&
      karte.phasen[karte.phasen.length - 1].id === 'ming-zeit',
  );
  pruefe(
    'China/Karte: die Han-Phase nennt den Klassiker des Gelben Kaisers',
    karte.phasen.some((p) => /Gelben Kaisers|Shennong/.test(p.hinweis || '')),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['anyang', 114.35, 36.1],
    ['xian', 108.94, 34.27],
    ['luoyang', 112.45, 34.62],
    ['qichun', 115.43, 30.24],
    ['guangzhou', 113.26, 23.13],
    ['peking', 116.4, 39.9],
  ];
  pruefe(
    'China/Karte: fünf bis sieben Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 7,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`China/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`China/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`China/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(`China/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`, punkt.text.length > 150);
  }

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'China/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `China/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `China/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // Auch hier gilt: Es wandern nicht nur Waren, sondern Wissen.
    pruefe(
      `China/Karte: Bewegung „${bewegung.id}" spricht vom Wissen, nicht nur vom Weg`,
      /Wissen|Arznei|Bücher|Berichte|Kunde|Rezeptur/.test(bewegung.text),
    );
  }
  pruefe(
    'China/Karte: die Seidenstraße ist als Weg des Wissens gezeichnet',
    (karte.bewegungen || []).some((b) => /Seidenstra/.test(b.name)),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Gelbes Meer',
    'Ostchinesisches Meer',
    'Gelber Fluss',
    'Jangtse',
    'Japan',
    'Korea',
    'Wüste Gobi',
    'Tibet',
  ]) {
    pruefe(`China/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'China: Titel und Epoche stehen',
    thema.titel === 'China und die TCM' && thema.epoche.length > 10,
  );
  pruefe('China: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe('China: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe('China: das Quiz hat 3 bis 5 Fragen', thema.quiz.length >= 3 && thema.quiz.length <= 5);

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'China/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'China/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const tcm = thema.perspektiven.find((p) => p.id === 'tcm-innen');
  pruefe('China: die Stimme der chinesischen Medizin ist die erste Perspektive', thema.perspektiven[0] === tcm);
  if (!tcm) return;

  pruefe('China: die erste Perspektive ist Opus zugeschrieben', tcm.stimme === 'Opus');
  pruefe(
    'China: die erste Perspektive heißt nach ihrer Sicht',
    /chinesischen Medizin/.test(tcm.name),
  );
  pruefe('China: die erste Perspektive ist ausgeführt (über 8000 Zeichen)', tcm.text.length > 8000);

  const ueberschriften = tcm.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe('China: die erste Perspektive ist in Abschnitte gegliedert', ueberschriften.length >= 8);

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 2 darf
  // die Abschnittsstruktur von Kapitel 1 nicht als Schablone übernehmen.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'China: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );

  // Sie sagt selbst, dass sie eine Erzählung von innen ist, keine Wahrheit.
  pruefe(
    'China: die erste Perspektive kennzeichnet sich als Sicht von innen',
    /von innen/.test(tcm.text) && /(behauptet nicht|Denkart|eigenen Worten)/.test(tcm.text),
  );

  // =========================================================================
  // 3. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Das Weltbild: Qi, Yin und Yang, die Fünf Elemente, die Meridiane.
  pruefe('China/Denkart: das Qi wird erklärt', /Qi/.test(tcm.text) && /## Qi/.test(tcm.text));
  pruefe(
    'China/Denkart: Yin und Yang werden erklärt',
    /Yin/.test(tcm.text) && /Yang/.test(tcm.text) && /Gleichgewicht/.test(tcm.text),
  );
  pruefe(
    'China/Denkart: die Fünf Elemente kommen mit allen fünf Namen vor',
    /Fünf (Elemente|Wandlungsphasen)/.test(tcm.text) &&
      ['Holz', 'Feuer', 'Erde', 'Metall', 'Wasser'].every((e) => tcm.text.includes(e)),
  );
  pruefe(
    'China/Denkart: die Zyklen der Fünf Elemente werden erklärt',
    /Hervorbringung/.test(tcm.text) && /Kontrollzyklus/.test(tcm.text),
  );
  pruefe(
    'China/Denkart: die Meridiane (Leitbahnen) werden erklärt',
    /Meridian/.test(tcm.text) && /Leitbahn/.test(tcm.text),
  );

  // (b) Die Begründungslogik: die „Warum"-Fragen müssen beantwortet werden.
  const warumFragen = ueberschriften.filter((h) => /^## Warum /.test(h));
  pruefe(
    'China/Denkart: die Begründungslogik läuft an „Warum"-Fragen entlang (mind. 3)',
    warumFragen.length >= 3,
  );
  pruefe(
    'China/Denkart: Warum sticht die Nadel? — Fluss, Stau, Punkt',
    /Warum sticht die Nadel/.test(tcm.text) &&
      /(Stau|staut)/.test(tcm.text) &&
      /(Fluss|fließt)/.test(tcm.text),
  );
  pruefe(
    'China/Denkart: Warum eine Kräuter-Mischung? — Temperatur, Geschmack, Rangordnung',
    /Warum eine Mischung/.test(tcm.text) &&
      /Temperatur/.test(tcm.text) &&
      /Geschmack/.test(tcm.text) &&
      /(Kaiser|Minister|Bote)/.test(tcm.text),
  );
  pruefe(
    'China/Denkart: Warum Puls und Zunge? — sechs Positionen, Zunge als Landkarte',
    /Warum Puls und Zunge/.test(tcm.text) &&
      /sechs Stellen/.test(tcm.text) &&
      /(Belag|Landkarte)/.test(tcm.text),
  );
  pruefe(
    'China/Denkart: Warum Bewegung und Atem? — Qigong und Taiji als Übung des Qi',
    /Qigong/.test(tcm.text) && /Taiji/.test(tcm.text) && /Vorbeugung/.test(tcm.text),
  );
  // Der Schlüsselsatz der Miteinander-Frage: zwei Denkarten von Gesundheit.
  pruefe(
    'China/Denkart: der Unterschied der Fragestellung wird benannt (kaputt vs. Gleichgewicht)',
    /(Was ist kaputt|Ursache und Wirkung)/.test(tcm.text) &&
      /Gleichgewicht/.test(tcm.text),
  );

  // =========================================================================
  // 4. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme ergänzt.
  const perspektivenText = thema.perspektiven.map((p) => p.text).join('\n');
  pruefe(
    'China/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /(Huangdi Neijing|Klassiker des Gelben Kaisers)/.test(perspektivenText) &&
      /(Shennong|Bencao|Li Shizhen)/.test(perspektivenText),
  );
  pruefe(
    'China/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Weltbild|Denkart|Annahme|Logik)/.test(perspektivenText),
  );
  pruefe(
    'China/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /Artemisinin/.test(perspektivenText) && /Tu Youyou/.test(perspektivenText),
  );
  pruefe(
    'China/Erzähl-Muster: (c2) und die Grenzen',
    /(Grenzen|dünn wird|nicht messbar|schaden|Risiko)/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Tradition selbst.
  pruefe(
    'China/Bilanz: was die Forschung stützt (Schmerz, Übelkeit, Taiji)',
    /chronisch/.test(tcm.text) &&
      /Übelkeit/.test(tcm.text) &&
      /(Cochrane|Vickers|Studien)/.test(tcm.text),
  );
  pruefe(
    'China/Bilanz: das Nobelpreis-Beispiel ist nachprüfbar datiert',
    /2015/.test(tcm.text) && /Nobelpreis/.test(tcm.text),
  );
  pruefe(
    'China/Bilanz: die junge Ordnung der „TCM" wird nicht verschwiegen',
    /1950er/.test(tcm.text),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst.
  pruefe(
    'China/TONE: die eigene Stimme benennt, dass Qi nicht messbar ist',
    /nicht messbar/.test(tcm.text),
  );
  pruefe(
    'China/TONE: die eigene Stimme benennt die Schwäche der Studienlage',
    /(Scheinakupunktur|Scheinbehandlung)/.test(tcm.text) &&
      /(auffällig oft positiv|Negative Ergebnisse)/.test(tcm.text),
  );
  pruefe(
    'China/TONE: die eigene Stimme benennt Vergiftungen und Schwermetalle',
    /Aristolochias/.test(tcm.text) && /(Quecksilber|Zinnober)/.test(tcm.text),
  );
  pruefe(
    'China/TONE: die eigene Stimme benennt Wechselwirkungen mit modernen Medikamenten',
    /Wechselwirk/.test(tcm.text) && /(Blutverdünner|Medikament)/.test(tcm.text),
  );
  pruefe(
    'China/TONE: die eigene Stimme benennt den Artenschutz-Skandal',
    /(Nashorn|Tigerknochen|Schuppentier)/.test(tcm.text),
  );
  pruefe(
    'China/TONE: die eigene Stimme benennt die Gefahr verlorener Zeit',
    /(verstreicht Zeit|nicht die erste Wahl)/.test(tcm.text),
  );
  // Kein Missionieren: Die Stimme spricht keine Heilversprechen aus.
  pruefe(
    'China/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert|Wundermittel|immer wirksam)/i.test(tcm.text),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'China: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(tcm.text),
  );
  pruefe(
    'China: die Tür führt zum westlichen Blick (Staunen, Skepsis, Prüfung)',
    /westliche/.test(tcm.text) && /(Skepsis|geprüft|Prüfung)/.test(tcm.text),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `China/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `China/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `China/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|Hokuspokus)/i.test(frage.frage),
    );
  }

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes den westlichen Blick ergänzt hat, wird sie
  // an ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND
  // Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'China/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 3)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'China/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'China/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'China/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
