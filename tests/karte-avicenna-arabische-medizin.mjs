// Prüfungen für Kapitel 5 — „Avicenna und die arabische Medizin" und seine
// Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Vier Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen auf der gezeichneten Küste, Binnenorte
//      innerhalb der Landflächen, offene See außerhalb. Geprüft werden
//      bewusst Orte, die NICHT selbst Stützpunkte der Linien sind — sonst
//      prüfte der Test nur, ob eine Zahl mit sich selbst übereinstimmt.
//      Schwarzes Meer und Kaspisches Meer liegen als eigene Wasserflächen
//      ÜBER der Landmasse; „auf Land" heißt hier deshalb: innerhalb einer
//      Landfläche und außerhalb dieser beiden Binnenmeere.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen Übersetzung und Bewahrung vorkommen, der
//      Kanon mit Ibn Sina — und vor allem die Begründungslogik. Mindestens
//      zwei „Warum"-Fragen müssen tatsächlich beantwortet werden (warum
//      übersetzen, warum ordnen, warum auf Galen aufbauen), dazu die
//      Denkart selbst (Überlieferung und Ordnung statt Beobachtung und
//      Zweifel) und ihre Grenze.
//
//   3. **Die Längenregel (Betreiber-Feedback 24.08.2026).** Kapitel 1 bis 8
//      bleiben kurz und dicht: höchstens ~250 Zeilen je Perspektive,
//      höchstens ~600 Zeilen für das ganze Kapitel. Gemessen wird die
//      Zeilenzahl der Texte — sie ist im Repo das, was der Betreiber sieht.
//
//   4. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, ehrliche
//      Wirkungsbilanz in beide Richtungen, Quiz-Umfang, offene
//      Urteilsfrage, Lernformat.
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 4: Die zweite
// Perspektive (der Okzident — Europa, Toledo, der ausbleibende Dank) und
// die endgültige Synthese kommen erst mit dem Hermes-Pass dazu. Prüfungen,
// die nur für die erste Stimme gelten, hängen deshalb an ihrer id
// („bewahrer"); die Prüfungen zum Erzähl-Muster laufen über ALLE
// Perspektiven zusammen. Die Synthese wird je nach Ausbaustand verzweigt
// gemessen (siehe unten).
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
} = require('../utils/themen/karten/avicenna-arabische-medizin.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt ist mit 78° Länge der breiteste des Buches (Kapitel 4:
 * 28°, Kapitel 3: 38°, Kapitel 2: 52°) — Toledo und Buchara müssen beide
 * ins Bild. Entsprechend großzügiger wird gemessen: 1,0° sind hier auf dem
 * Bildschirm ungefähr so viel wie 0,35° beim Mittelmeer-Ausschnitt.
 */
const KUESTEN_TOLERANZ = 1.0;

/** Höchstzahl an Zeilen je Perspektive (Längenregel, Kapitel 1–8). */
const MAX_ZEILEN_PERSPEKTIVE = 250;

/** Höchstzahl an Zeilen für das ganze Kapitel (Längenregel, Kapitel 1–8). */
const MAX_ZEILEN_KAPITEL = 600;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 4: Ein
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
 * Die Binnenmeere sind aus der Landmasse nicht ausgeschnitten, sondern
 * darübergelegt (so zeichnet die Karte sie auch). Wer im Schwarzen oder im
 * Kaspischen Meer schwimmt, steht deshalb nicht an Land.
 */
function aufLand(punkt) {
  if (!landflaechen.some((ring) => liegtIn(punkt, ring))) return false;
  return (
    !liegtIn(punkt, kuesten.schwarzesMeer) &&
    !liegtIn(punkt, kuesten.kaspischesMeer)
  );
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge am Kaspischen Meer genauso
 * „lang" wie am Golf von Aden; die Toleranz würde im Norden großzügiger.
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
  const thema = themaNachId('avicenna-arabische-medizin');
  pruefe('Avicenna: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Avicenna steht
  // hinter Hippokrates und Galen (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Avicenna: steht in der App hinter „Hippokrates und Galen"',
    alleThemen.findIndex((t) => t.id === 'avicenna-arabische-medizin') ===
      alleThemen.findIndex((t) => t.id === 'hippokrates-galen') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Avicenna/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Avicenna/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss den ganzen Bogen zeigen: Toledo im Westen, Buchara im Osten.
  pruefe(
    'Avicenna/Karte: der Ausschnitt reicht von Spanien bis über Buchara hinaus',
    RAHMEN.minLon <= -5 && RAHMEN.maxLon >= 65,
  );
  pruefe(
    'Avicenna/Karte: der Ausschnitt reicht von Arabien bis an das Schwarze Meer',
    RAHMEN.minLat <= 18 && RAHMEN.maxLat >= 42,
  );
  pruefe('Avicenna/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Avicenna/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Barcelona', 2.17, 41.38, kuesten.eurasien],
    ['Valencia', -0.37, 39.47, kuesten.eurasien],
    ['Thessaloniki', 22.94, 40.63, kuesten.eurasien],
    ['Tyros (Libanon)', 35.2, 33.27, kuesten.eurasien],
    ['Dschidda (Rotes Meer)', 39.17, 21.54, kuesten.eurasien],
    ['Basra am Persischen Golf', 48.5, 29.9, kuesten.eurasien],
    ['Alexandria', 29.9, 31.2, kuesten.afrika],
    ['Tunis', 10.3, 36.8, kuesten.afrika],
    ['Bengasi', 20.07, 32.12, kuesten.afrika],
    ['Tanger', -5.8, 35.79, kuesten.afrika],
    ['Palermo (Sizilien)', 13.36, 38.11, kuesten.sizilien],
    ['Chania (Kreta)', 24.02, 35.51, kuesten.kreta],
    ['Larnaka (Zypern)', 33.63, 34.92, kuesten.zypern],
    ['Cagliari (Sardinien)', 9.1, 39.21, kuesten.sardinien],
    ['Palma (Mallorca)', 2.65, 39.57, kuesten.mallorca],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Avicenna/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb der Landflächen liegen -----------------
  const binnenorte = [
    ['Toledo', -4.03, 39.86],
    ['Cordoba', -4.78, 37.89],
    ['Fes', -5.0, 34.03],
    ['Kairouan', 10.1, 35.68],
    ['Salerno', 14.79, 40.68],
    ['Ankara', 32.85, 39.93],
    ['Damaskus', 36.29, 33.51],
    ['Kairo', 31.24, 30.05],
    ['Mekka', 39.83, 21.42],
    ['Bagdad', 44.36, 33.31],
    ['Hamadan', 48.51, 34.8],
    ['Isfahan', 51.68, 32.65],
    ['Rey (bei Teheran)', 51.42, 35.7],
    ['Merw', 62.19, 37.66],
    ['Buchara', 64.42, 39.77],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Avicenna/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['das westliche Mittelmeer', 4.0, 39.0],
    ['das Mittelmeer vor Tripolis', 18.0, 34.5],
    ['das Ionische Meer', 18.5, 37.5],
    ['die Ägäis', 25.2, 38.5],
    ['die Adria', 17.0, 42.0],
    ['das östliche Mittelmeer', 31.0, 33.5],
    ['das Schwarze Meer', 34.0, 43.0],
    ['das Kaspische Meer', 51.0, 40.0],
    ['der Persische Golf', 51.0, 27.5],
    ['das Rote Meer', 38.5, 20.0],
    ['der Golf von Oman', 58.5, 24.5],
    ['der Atlantik vor Lissabon', -11.0, 38.7],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Avicenna/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // Die beiden Binnenmeere müssen als eigene Wasserflächen gezeichnet sein —
  // sonst wäre das Kaspische Meer eine Steppe.
  for (const [name, lon, lat, ring] of [
    ['das Schwarze Meer', 34.0, 43.0, kuesten.schwarzesMeer],
    ['das Kaspische Meer', 51.0, 40.0, kuesten.kaspischesMeer],
  ]) {
    pruefe(
      `Avicenna/Atlas: ${name} ist eine eigene Wasserfläche`,
      liegtIn([lon, lat], ring),
    );
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Avicenna/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(`Avicenna/Karte: Phase „${phase.id}" nennt eine Jahreszahl`, /\d/.test(phase.label));
    pruefe(
      `Avicenna/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Avicenna/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: übersetzen, ordnen,
  // weitergeben.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Avicenna/Karte: eine Phase zeigt das Haus der Weisheit in Bagdad',
    karte.phasen.some((p) => /Haus der Weisheit/.test(p.label) && /Bagdad/.test(p.label)),
  );
  pruefe(
    'Avicenna/Karte: eine Phase zeigt die Entstehung des Kanons',
    karte.phasen.some((p) => /Kanon/.test(p.label) && /(Ibn Sina|Avicenna)/.test(p.hinweis || '')),
  );
  pruefe(
    'Avicenna/Karte: eine Phase zeigt Toledo als Rückweg nach Europa',
    karte.phasen.some((p) => /Toledo/.test(p.label)) && /Europa/.test(phasenText),
  );
  pruefe(
    'Avicenna/Karte: die Phasen laufen von Bagdad bis Toledo',
    karte.phasen[0].id === 'haus-der-weisheit' &&
      karte.phasen[karte.phasen.length - 1].id === 'toledo-uebersetzt',
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['bagdad', 44.36, 33.31],
    ['buchara', 64.42, 39.77],
    ['hamadan', 48.51, 34.8],
    ['damaskus', 36.29, 33.51],
    ['kairo', 31.24, 30.05],
    ['cordoba', -4.78, 37.89],
    ['toledo', -4.03, 39.86],
  ];
  pruefe(
    'Avicenna/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Avicenna/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Avicenna/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Avicenna/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Avicenna/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Avicenna/Karte: alle Info-Punkte liegen innerhalb der Karte',
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
    `Avicenna/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Avicenna/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Avicenna/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Avicenna/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern Bücher.
    pruefe(
      `Avicenna/Karte: Bewegung „${bewegung.id}" spricht vom Wissen, nicht nur vom Weg`,
      /Wissen|Bücher|Buch|Schrift|Handschrift|übersetz|Kanon|Bibliothek/.test(bewegung.text),
    );
  }
  // Der Weg des Kanons nach Westen ist der Bogen des Kapitels.
  const kanonWeg = (karte.bewegungen || []).find((b) => b.id === 'kanon-nach-toledo');
  pruefe('Avicenna/Karte: der Weg des Kanons nach Westen ist eingezeichnet', Boolean(kanonWeg));
  if (kanonWeg) {
    pruefe(
      'Avicenna/Karte: der Weg des Kanons beginnt in Buchara und endet in Toledo',
      kanonWeg.von[0] === P.punkt(64.42, 39.77)[0] &&
        kanonWeg.von[1] === P.punkt(64.42, 39.77)[1] &&
        kanonWeg.nach[0] === P.punkt(-4.03, 39.86)[0] &&
        kanonWeg.nach[1] === P.punkt(-4.03, 39.86)[1],
    );
    pruefe(
      'Avicenna/Karte: der Weg des Kanons führt über Bagdad',
      (kanonWeg.ueber || []).some(
        ([x, y]) => x === P.punkt(44.36, 33.31)[0] && y === P.punkt(44.36, 33.31)[1],
      ),
    );
  }

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Mittelmeer',
    'Schwarzes Meer',
    'Kaspisches Meer',
    'Rotes Meer',
    'Persischer Golf',
    'Spanien',
    'Ägypten',
    'Arabische Halbinsel',
    'Persien',
    'Euphrat',
    'Tigris',
  ]) {
    pruefe(`Avicenna/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Avicenna: Titel und Epoche stehen',
    thema.titel === 'Avicenna und die arabische Medizin' && thema.epoche === '~750–1200',
  );
  pruefe('Avicenna: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Avicenna: der Aufhänger nennt die Bewahrung und den Kanon',
    /(bewahr|aufbewahr|übersetz)/i.test(thema.aufhaenger.frage + thema.aufhaenger.text) &&
      /Kanon/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Avicenna: der Aufhänger sagt, dass das Wissen über Toledo zurückkam',
    /Toledo/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Avicenna: der Aufhänger wertet keine der beiden Seiten ab',
    !/(rückständig|lächerlich|Unsinn|dumm|primitiv)/i.test(thema.aufhaenger.text),
  );
  pruefe('Avicenna: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Avicenna: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Avicenna: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Avicenna/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Avicenna/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const bewahrer = thema.perspektiven.find((p) => p.id === 'bewahrer');
  pruefe(
    'Avicenna: die Stimme der Bewahrer ist die erste Perspektive',
    thema.perspektiven[0] === bewahrer,
  );
  if (!bewahrer) return;

  pruefe('Avicenna: die erste Perspektive ist Opus zugeschrieben', bewahrer.stimme === 'Opus');
  pruefe(
    'Avicenna: die erste Perspektive heißt nach ihrer Sicht',
    /Bewahrer/.test(bewahrer.name),
  );

  // =========================================================================
  // 3. Die Längenregel (Betreiber-Feedback vom 24.08.2026)
  // =========================================================================

  // Kapitel 1 bis 8 bleiben kurz und dicht. Gemessen wird in Zeilen — das
  // ist das, was der Betreiber im Repo sieht.
  const zeilenErsteStimme = bewahrer.text.split('\n').length;
  pruefe(
    `Avicenna/Länge: die erste Perspektive bleibt unter ${MAX_ZEILEN_PERSPEKTIVE} Zeilen (${zeilenErsteStimme})`,
    zeilenErsteStimme <= MAX_ZEILEN_PERSPEKTIVE,
  );
  for (const p of thema.perspektiven) {
    const zeilen = p.text.split('\n').length;
    pruefe(
      `Avicenna/Länge: Perspektive „${p.id}" bleibt unter ${MAX_ZEILEN_PERSPEKTIVE} Zeilen (${zeilen})`,
      zeilen <= MAX_ZEILEN_PERSPEKTIVE,
    );
  }
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Avicenna/Länge: das ganze Kapitel bleibt unter ${MAX_ZEILEN_KAPITEL} Zeilen (${zeilenKapitel})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );
  // Kurz heißt nicht dünn: Die Denkart-Analyse muss trotzdem ausgeführt sein.
  pruefe(
    'Avicenna/Länge: die erste Perspektive ist trotzdem ausgeführt (über 6000 Zeichen)',
    bewahrer.text.length > 6000,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = bewahrer.text.replace(/\s+/g, ' ');

  const ueberschriften = bewahrer.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Avicenna: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 5,
  );
  // Wenige, starke Abschnitte — die Längenregel verlangt Dichte, nicht Breite.
  pruefe(
    'Avicenna: die Abschnitte bleiben wenige (höchstens acht)',
    ueberschriften.length <= 8,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 5 darf
  // keine der vier bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf,
  // Kapitel 4 schreibt Briefe. Dieses Kapitel folgt einem Buch auf seiner
  // Reise: Station für Station, mit Ort und Jahreszahl.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Avicenna: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Avicenna: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Avicenna: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every((h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h)),
  );
  pruefe(
    'Avicenna: die Abschnittsstruktur ist eine andere als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Avicenna: die Dramaturgie ist die Reise eines Buches (Stationen mit Ort und Jahr)',
    /^## Erste Station/m.test(bewahrer.text) &&
      ueberschriften.filter((h) => /Station/.test(h)).length >= 4 &&
      ueberschriften.filter((h) => /\d{3,4}/.test(h)).length >= 3,
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Avicenna: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Die Sache selbst: Übersetzung, Bewahrung, der Kanon.
  pruefe(
    'Avicenna/Denkart: die Übersetzungsbewegung wird erklärt',
    /übersetz/i.test(fliessend) &&
      /Haus der Weisheit/.test(fliessend) &&
      /Bagdad/.test(fliessend),
  );
  pruefe(
    'Avicenna/Denkart: die Bewahrung wird als eigene Leistung benannt',
    /(bewahr|Bewahrung)/i.test(fliessend) && /verloren/.test(fliessend),
  );
  pruefe(
    'Avicenna/Denkart: der Kanon und sein Verfasser werden genannt',
    /Kanon/.test(fliessend) && /Ibn Sina/.test(fliessend) && /Avicenna/.test(fliessend),
  );
  pruefe(
    'Avicenna/Denkart: der Aufbau des Kanons wird gezeigt (fünf Bücher, Arzneimittel, Krankheiten)',
    /fünf Bücher/.test(fliessend) &&
      /(Einzelmittel|Arznei)/.test(fliessend) &&
      /Kopf bis zum Fuß/.test(fliessend),
  );
  pruefe(
    'Avicenna/Denkart: die Übersetzer werden namentlich fassbar (Hunain ibn Ishaq)',
    /Hunain ibn Ishaq/.test(fliessend) && /Sinn für Sinn/.test(fliessend),
  );

  // (b) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum übersetzen?',
      /Warum übersetzten wir/.test(fliessend) &&
        /Schatz/.test(fliessend) &&
        /(Lies|Wissen, und sei es in China)/.test(fliessend),
    ],
    [
      'Warum ordnen?',
      /Warum ordneten wir/.test(fliessend) &&
        /(nicht geordnet ist, nicht weitergegeben|Lehrgang)/.test(fliessend) &&
        /lehren/.test(fliessend),
    ],
    [
      'Warum auf Galen aufbauen?',
      /warum bauten wir dabei auf Galen auf/i.test(fliessend) &&
        /(sammeln, zu reinigen, zu ordnen|nicht, es umzustoßen)/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Avicenna/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Avicenna/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );
  // Der Kern der Denkart — und ihr Gegensatz, der später in Europa greift.
  pruefe(
    'Avicenna/Denkart: die Denkart wird auf den Begriff gebracht (Überlieferung und Ordnung)',
    /Überlieferung und Ordnung/.test(fliessend) &&
      /Beobachtung und Zweifel/.test(fliessend),
  );
  pruefe(
    'Avicenna/Denkart: das Papier als Voraussetzung wird genannt',
    /Papier/.test(fliessend) && /China/.test(fliessend),
  );

  // (c) Die Grenze der eigenen Denkart — von der Stimme selbst benannt.
  pruefe(
    'Avicenna/Denkart: die Grenze der eigenen Denkart wird selbst benannt',
    /(Grenze|Preis unserer Denkart)/.test(fliessend) &&
      /keinen Platz für eine Korrektur/.test(fliessend),
  );
  pruefe(
    'Avicenna/Denkart: der Zweifel des ar-Razi wird gezeigt und eingeordnet',
    /ar-Razi/.test(fliessend) &&
      /Zweifel an Galen/.test(fliessend) &&
      /(Einzelfall|nicht unsere Denkart)/.test(fliessend),
  );
  pruefe(
    'Avicenna/Denkart: Ibn an-Nafis und der Lungenweg des Blutes werden erzählt',
    /Ibn an-Nafis/.test(fliessend) &&
      /Lunge/.test(fliessend) &&
      /1924/.test(fliessend),
  );

  // =========================================================================
  // 5. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (den Okzident) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Avicenna/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /(syrisch|Syrische)/.test(perspektivenText) &&
      /Bagdad/.test(perspektivenText) &&
      /ar-Razi/.test(perspektivenText) &&
      /Toledo/.test(perspektivenText),
  );
  pruefe(
    'Avicenna/Erzähl-Muster: (a2) die griechische Herkunft wird nicht verschwiegen',
    /(griechisch|Griechen)/i.test(perspektivenText) &&
      /(Galen|Hippokrates)/.test(perspektivenText),
  );
  pruefe(
    'Avicenna/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Denkart|Annahme|Aufgabe des Gelehrten|Autorität)/.test(perspektivenText),
  );
  pruefe(
    'Avicenna/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /(Krankenhäuser|Bimaristan)/.test(perspektivenText) &&
      /Apotheke/.test(perspektivenText) &&
      /az-Zahrawi/.test(perspektivenText),
  );
  pruefe(
    'Avicenna/Erzähl-Muster: (c2) und die Grenzen',
    /(Grenze|zementiert|Irrtüm|Preis)/.test(perspektivenText),
  );

  // Die ehrliche Wirkungsbilanz — beide Richtungen, von der Tradition selbst.
  pruefe(
    'Avicenna/Bilanz: die Stimme nennt, was von ihr bleibt',
    /Was von uns bleibt/.test(fliessend),
  );
  pruefe(
    'Avicenna/Bilanz: die Stimme nennt, was sie mit-zementiert hat',
    /Was wir mit-zementiert haben/.test(fliessend),
  );
  pruefe(
    'Avicenna/Bilanz: die Krankenhäuser mit Ausbildung werden als Leistung benannt',
    /Unterricht am Krankenbett/.test(fliessend) && /Stiftungen/.test(fliessend),
  );

  // TONE-Regel: Die unbequemen Stellen benennt die Stimme selbst.
  pruefe(
    'Avicenna/TONE: die Stimme sagt selbst, dass sie das Buch nicht geschrieben hat',
    /Wir haben dieses Buch nicht geschrieben/.test(fliessend),
  );
  pruefe(
    'Avicenna/TONE: die Stimme benennt, dass sie Galens Irrtümer mitbewahrte',
    /Galen mitsamt seinen Irrtümern/.test(fliessend),
  );
  pruefe(
    'Avicenna/TONE: die Stimme benennt, dass sie die Autorität nicht prüfte',
    /prüften die Autorität nicht/.test(fliessend),
  );
  pruefe(
    'Avicenna/TONE: die Stimme nennt den Kanon ein Kompendium, kein neues Denken',
    /Kompendium, kein neues Denken/.test(fliessend),
  );
  pruefe(
    'Avicenna/TONE: die Grenzen der Übersetzung werden eingeräumt',
    /Wer übersetzt, deutet/.test(fliessend),
  );
  // Kein Missionieren: Die Stimme spricht keine Heilversprechen aus.
  pruefe(
    'Avicenna/TONE: die erste Perspektive gibt kein Heilversprechen',
    !/(heilt alles|garantiert|Wundermittel|immer wirksam)/i.test(fliessend),
  );
  // Und sie wertet die andere Seite nicht ab.
  pruefe(
    'Avicenna/TONE: die erste Perspektive wertet Europa nicht ab',
    !/(rückständig|primitiv|barbarisch|dumm)/i.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Avicenna: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Avicenna: die Tür führt zum Okzident (Toledo, Europa, der ausbleibende Dank)',
    /Okzident/.test(fliessend) &&
      /Toledo/.test(fliessend) &&
      /Europa/.test(fliessend) &&
      /(nicht sagte, von wem|dankbar)/.test(fliessend),
  );
  pruefe(
    'Avicenna: die Tür nennt Gerhard von Cremona als Übersetzer des Kanons',
    /Gerhard von Cremona/.test(fliessend) && /1187/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Avicenna/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Avicenna/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Avicenna/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Avicenna/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes den Okzident ergänzt hat, wird sie an ihrer
  // eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Avicenna/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 6)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Avicenna/Synthese: sagt, welche Stimme noch kommt',
      /Okzident/.test(thema.synthese) && /Europa/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Avicenna/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Avicenna/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Avicenna/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
