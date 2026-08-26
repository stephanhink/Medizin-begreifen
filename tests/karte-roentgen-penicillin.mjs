// Prüfungen für Kapitel 12 — „Röntgen und Penicillin" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Sieben Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien liegen als echte Längen- und
//      Breitengrade im Kartenmodul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Häfen auf der gezeichneten Küste, Binnenorte
//      innerhalb der Landflächen, offene See außerhalb. Geprüft werden
//      bewusst Orte, die NICHT selbst Stützpunkte der Linien sind — sonst
//      prüfte der Test nur, ob eine Zahl mit sich selbst übereinstimmt.
//      Der Ausschnitt umfasst 20° Länge, deshalb die Toleranz von 0,4°.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im Text
//      der ersten Stimme müssen die X-Strahlen stehen, die Entdeckung vom
//      8. November 1895 mit dem leuchtenden Schirm und das erste Bild — und
//      die Begründungslogik muss ausgeführt sein: warum den Zufall ernst
//      nehmen, warum das Bild die Medizin verändert, warum kein Patent,
//      warum die Euphorie überhaupt möglich war (man spürt die Strahlen
//      nicht).
//
//   3. **Die ehrlichen Grenzen (TONE-Regel und Zusatzregel für sensible
//      Themen).** Die Stimme des Entdeckers muss die unbequemen Stellen
//      SELBST benennen: die Euphorie vor dem Wissen (Jahrmarkt, Schuhladen,
//      Kosmetiksalon, bestrahlte Kinder), die Pioniere, die an den Strahlen
//      starben (Dally, Fleischman, Hall-Edwards, Curie, das Hamburger
//      Ehrenmal), das eigene Schweigen und die fehlende Dosisangabe.
//
//   4. **Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026).** Der
//      berühmte Satz über die gesehene eigene Leiche ist überliefert, aber
//      nicht aus einer zeitgenössischen Quelle gesichert; er muss im Text
//      als Überlieferung gekennzeichnet sein. Dasselbe gilt für die
//      Hochrechnungen zum heutigen Strahlenrisiko (umstritten).
//
//   5. **Der Innovations-Zyklus (Betreiber-Beobachtung 26.08.2026).** Der
//      rote Faden des Buches muss in diesem Kapitel sichtbar sein: Das Neue
//      schadet erst, bevor es segensreich wird — und der Schaden kommt aus
//      dem Überspringen der Prüfzeit.
//
//   6. **Die Längenregel, umgekehrt (Betreiber-Vorgabe 24.08.2026).** Ab
//      Kapitel 9 gilt: vollständig und ausführlich. Nach oben bleibt eine
//      großzügige Grenze stehen, damit „ausführlich" nicht in „aufgebläht"
//      kippt.
//
//   7. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), Attribution der ersten Stimme, Quiz-Umfang,
//      offene Urteilsfrage, Lernformat und die offene Tür zur zweiten
//      Stimme (Fleming).
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 11: Die zweite
// Perspektive (der zweite Zufall) und die endgültige Synthese kommen erst
// mit dem Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten,
// hängen deshalb an ihrer id („roentgen"); die Prüfungen zum Erzähl-Muster
// laufen über ALLE Perspektiven zusammen. Die Synthese wird je nach
// Ausbaustand verzweigt gemessen.
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
} = require('../utils/themen/karten/roentgen-penicillin.js');

/**
 * Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad).
 *
 * Dieser Ausschnitt umfasst 20° Länge — so viel wie das Blatt von Kapitel 11
 * (19°, Toleranz 0,4°). 0,4° sind hier rund vierzehn Bildpunkte in der
 * Waagerechten.
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
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 11: Ein
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
 * Dieser Ausschnitt hat zwei Landflächen: das Festland (Frankreich, die
 * Niederlande, Deutschland bis Böhmen) und Großbritannien. Irland liegt
 * westlich des Rahmens.
 */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge an der Elbmündung genauso
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
  const thema = themaNachId('roentgen-penicillin');
  pruefe(
    'Röntgen: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 12
  // steht hinter Pasteur und Lister (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Röntgen: steht in der App hinter „Pasteur und Lister"',
    alleThemen.findIndex((t) => t.id === 'roentgen-penicillin') ===
      alleThemen.findIndex((t) => t.id === 'pasteur-lister') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Röntgen/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Röntgen/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss Würzburg, London und Oxford auf dasselbe Blatt bringen — sonst
  // stehen die beiden Zufälle nicht nebeneinander.
  pruefe(
    'Röntgen/Karte: der Ausschnitt reicht von England bis nach Böhmen',
    RAHMEN.minLon <= -2 && RAHMEN.maxLon >= 14,
  );
  pruefe(
    'Röntgen/Karte: der Ausschnitt reicht vom Alpenrand bis an die Nordsee',
    RAHMEN.minLat <= 46.5 && RAHMEN.maxLat >= 53.5,
  );
  pruefe('Röntgen/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Röntgen/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Häfen, die im Schulatlas eindeutig am Wasser stehen und die NICHT als
  // Stützpunkte in den Küstenlisten stehen.
  const kuestenorte = [
    ['Brighton (Ärmelkanal)', -0.14, 50.82, kuesten.grossbritannien],
    ['Torquay (Devon)', -3.53, 50.46, kuesten.grossbritannien],
    ['Eastbourne (Sussex)', 0.29, 50.77, kuesten.grossbritannien],
    ['Southwold (Suffolk)', 1.68, 52.33, kuesten.grossbritannien],
    ['Wells-next-the-Sea (Norfolk)', 0.85, 52.96, kuesten.grossbritannien],
    ['Southport (Irische See)', -3.01, 53.65, kuesten.grossbritannien],
    ['Swansea (Wales)', -3.94, 51.62, kuesten.grossbritannien],
    ['Pwllheli (Wales)', -4.41, 52.89, kuesten.grossbritannien],
    ['Rochefort (Charente)', -0.96, 45.94, kuesten.festland],
    ['Le Croisic (Loiremündung)', -2.51, 47.29, kuesten.festland],
    ['Brest (Bretagne)', -4.49, 48.39, kuesten.festland],
    ['Saint-Malo (Bretagne)', -2.02, 48.65, kuesten.festland],
    ['Cherbourg (Normandie)', -1.62, 49.64, kuesten.festland],
    ['Dünkirchen (Flandern)', 2.2, 51.03, kuesten.festland],
    ['Zeebrügge (Belgien)', 3.2, 51.33, kuesten.festland],
    ['Scheveningen (Holland)', 4.27, 52.1, kuesten.festland],
    ['Emden (Ostfriesland)', 7.19, 53.36, kuesten.festland],
    ['Wilhelmshaven (Jadebusen)', 8.11, 53.52, kuesten.festland],
    ['Bremerhaven (Wesermündung)', 8.58, 53.55, kuesten.festland],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Röntgen/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb einer Landfläche liegen ----------------
  const binnenorte = [
    ['Würzburg', 9.932, 49.791],
    ['Berlin', 13.405, 52.52],
    ['Hamburg', 9.994, 53.551],
    ['München', 11.576, 48.137],
    ['Frankfurt am Main', 8.68, 50.11],
    ['Köln', 6.96, 50.94],
    ['Straßburg', 7.75, 48.58],
    ['Zürich', 8.54, 47.37],
    ['Prag', 14.42, 50.08],
    ['Paris', 2.349, 48.857],
    ['Lyon', 4.84, 45.76],
    ['Brüssel', 4.35, 50.85],
    ['Amsterdam', 4.9, 52.37],
    ['London', -0.174, 51.517],
    ['Oxford', -1.257, 51.752],
    ['Manchester', -2.24, 53.48],
    ['Cardiff', -3.18, 51.48],
    ['Bristol', -2.59, 51.45],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Röntgen/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['der Ärmelkanal', 0.5, 50.3],
    ['der westliche Ärmelkanal', -3.0, 49.9],
    ['die Nordsee', 3.0, 53.2],
    ['die südliche Nordsee', 2.0, 52.5],
    ['die Deutsche Bucht', 7.5, 53.7],
    ['der Golf von Biskaya', -3.5, 46.3],
    ['der Sankt-Georgs-Kanal', -5.0, 53.0],
    ['der Atlantik südwestlich Cornwalls', -5.0, 49.6],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Röntgen/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Röntgen/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Röntgen/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\b(1[6-9]\d\d|20\d\d)\b/.test(phase.label),
    );
    pruefe(
      `Röntgen/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Röntgen/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen tragen den Bogen des Kapitels: die Entdeckung, die Euphorie
  // und ihre Schäden, die Schale, Oxford, die Massenproduktion.
  pruefe(
    'Röntgen/Karte: eine Phase zeigt die Entdeckung von 1895 in Würzburg',
    karte.phasen.some(
      (p) =>
        /1895/.test(p.label) &&
        /Würzburg/.test(p.label + p.hinweis) &&
        /8\. November 1895/.test(p.hinweis),
    ),
  );
  pruefe(
    'Röntgen/Karte: die Entdeckungs-Phase erzählt vom leuchtenden Schirm',
    karte.phasen.some(
      (p) => /1895/.test(p.label) && /Schirm/.test(p.hinweis) && /Karton/.test(p.hinweis),
    ),
  );
  pruefe(
    'Röntgen/Karte: eine Phase zeigt die Euphorie UND die Strahlenschäden',
    karte.phasen.some(
      (p) =>
        /Euphorie|Schäden/.test(p.label) &&
        /(Schuh|Jahrmarkt)/.test(p.hinweis) &&
        /(Amputiert|amputiert|Blutkrebs|Verbrennungen)/.test(p.hinweis),
    ),
  );
  pruefe(
    'Röntgen/Karte: die Schäden-Phase nennt das Hamburger Ehrenmal von 1936',
    karte.phasen.some((p) => /1936/.test(p.hinweis) && /Ehrenmal/.test(p.hinweis)),
  );
  pruefe(
    'Röntgen/Karte: eine Phase zeigt die verschimmelte Schale von 1928 in London',
    karte.phasen.some(
      (p) =>
        /1928/.test(p.label) &&
        /London/.test(p.label + p.hinweis) &&
        /Fleming/.test(p.hinweis) &&
        /Penicillium/.test(p.hinweis),
    ),
  );
  pruefe(
    'Röntgen/Karte: eine Phase zeigt Oxford — Florey, Chain und Heatley',
    karte.phasen.some(
      (p) =>
        /194[01]/.test(p.label) &&
        /Oxford/.test(p.label + p.hinweis) &&
        /Florey/.test(p.hinweis) &&
        /Chain/.test(p.hinweis) &&
        /Heatley/.test(p.hinweis),
    ),
  );
  pruefe(
    'Röntgen/Karte: eine Phase zeigt die Massenproduktion und 1944',
    karte.phasen.some(
      (p) =>
        /194[45]/.test(p.label) &&
        /(Peoria|Massenproduktion)/.test(p.label + p.hinweis) &&
        /1944/.test(p.hinweis),
    ),
  );
  pruefe(
    'Röntgen/Karte: die Phasen laufen von den X-Strahlen bis zur Massenproduktion',
    karte.phasen[0].id === 'x-strahlen-1895' &&
      karte.phasen[karte.phasen.length - 1].id === 'massenproduktion-1941-1945',
  );
  // Die Karte bewertet nicht, sie zeigt Zustände mit Jahreszahl.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Röntgen/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch|Betrüger)/i.test(
      phasenText,
    ),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['wuerzburg', 9.932, 49.791],
    ['berlin', 13.405, 52.52],
    ['hamburg', 9.994, 53.551],
    ['muenchen', 11.576, 48.137],
    ['london', -0.174, 51.517],
    ['oxford', -1.257, 51.752],
  ];
  pruefe(
    'Röntgen/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Röntgen/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Röntgen/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Röntgen/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(
      `Röntgen/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Röntgen/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die vier Pole des Kapitels: die Entdeckung, ihr Preis, die Schale und
  // ihre Reinigung.
  const wuerzburgPunkt = karte.punkte.find((p) => p.id === 'wuerzburg');
  pruefe(
    'Röntgen/Karte: der Punkt Würzburg nennt den 8. November 1895 und die Hand Berthas',
    Boolean(
      wuerzburgPunkt &&
        /8\. November 1895/.test(wuerzburgPunkt.text) &&
        /Bertha/.test(wuerzburgPunkt.text) &&
        /Bariumplatincyanür/.test(wuerzburgPunkt.text),
    ),
  );
  const hamburgPunkt = karte.punkte.find((p) => p.id === 'hamburg');
  pruefe(
    'Röntgen/Karte: der Punkt Hamburg nennt das Ehrenmal, 1936 und die Zahl der Namen',
    Boolean(
      hamburgPunkt &&
        /Ehrenmal der Radiologie/.test(hamburgPunkt.text) &&
        /1936/.test(hamburgPunkt.text) &&
        /169/.test(hamburgPunkt.text),
    ),
  );
  const muenchenPunkt = karte.punkte.find((p) => p.id === 'muenchen');
  pruefe(
    'Röntgen/Karte: der Punkt München nennt den Nobelpreis 1901 und das fehlende Patent',
    Boolean(
      muenchenPunkt &&
        /1901/.test(muenchenPunkt.text) &&
        /Nobelpreis/.test(muenchenPunkt.text) &&
        /Patent/.test(muenchenPunkt.text),
    ),
  );
  const londonPunkt = karte.punkte.find((p) => p.id === 'london');
  pruefe(
    'Röntgen/Karte: der Punkt London nennt Fleming, 1928 und die Schale',
    Boolean(
      londonPunkt &&
        /Fleming/.test(londonPunkt.text) &&
        /1928/.test(londonPunkt.text) &&
        /Schimmelpilz/.test(londonPunkt.text),
    ),
  );
  const oxfordPunkt = karte.punkte.find((p) => p.id === 'oxford');
  pruefe(
    'Röntgen/Karte: der Punkt Oxford nennt Florey, Chain, Heatley und Albert Alexander',
    Boolean(
      oxfordPunkt &&
        /Florey/.test(oxfordPunkt.text) &&
        /Chain/.test(oxfordPunkt.text) &&
        /Heatley/.test(oxfordPunkt.text) &&
        /Albert Alexander/.test(oxfordPunkt.text),
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
    `Röntgen/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Röntgen/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Röntgen/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Röntgen/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern eine Nachricht, ein
    // Aufsatz und ein Schimmelpilz.
    pruefe(
      `Röntgen/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /Strahlen|Penicillin|Schimmel|Nachricht|Sonderdruck/.test(bewegung.text),
    );
  }
  const wegDerNachricht = (karte.bewegungen || []).find(
    (b) => b.id === 'strahlen-nach-berlin',
  );
  pruefe(
    'Röntgen/Karte: die Nachricht führt von Würzburg nach Berlin',
    Boolean(wegDerNachricht) &&
      wegDerNachricht.von[0] === P.punkt(9.932, 49.791)[0] &&
      wegDerNachricht.von[1] === P.punkt(9.932, 49.791)[1] &&
      wegDerNachricht.nach[0] === P.punkt(13.405, 52.52)[0] &&
      wegDerNachricht.nach[1] === P.punkt(13.405, 52.52)[1],
  );
  pruefe(
    'Röntgen/Karte: die Nachricht nennt die Sonderdrucke vom 1. Januar 1896',
    Boolean(wegDerNachricht) && /1\. Januar 1896/.test(wegDerNachricht.text),
  );
  const wegDesSchimmels = (karte.bewegungen || []).find(
    (b) => b.id === 'schimmel-nach-oxford',
  );
  pruefe(
    'Röntgen/Karte: der Weg des Schimmels führt von London nach Oxford',
    Boolean(wegDesSchimmels) &&
      wegDesSchimmels.von[0] === P.punkt(-0.174, 51.517)[0] &&
      wegDesSchimmels.von[1] === P.punkt(-0.174, 51.517)[1] &&
      wegDesSchimmels.nach[0] === P.punkt(-1.257, 51.752)[0] &&
      wegDesSchimmels.nach[1] === P.punkt(-1.257, 51.752)[1],
  );
  const wegUeberDenAtlantik = (karte.bewegungen || []).find(
    (b) => b.id === 'penicillin-ueber-den-atlantik',
  );
  pruefe(
    'Röntgen/Karte: der Weg über den Atlantik beginnt in Oxford',
    Boolean(wegUeberDenAtlantik) &&
      wegUeberDenAtlantik.von[0] === P.punkt(-1.257, 51.752)[0] &&
      wegUeberDenAtlantik.von[1] === P.punkt(-1.257, 51.752)[1],
  );
  pruefe(
    'Röntgen/Karte: der Weg über den Atlantik nennt Peoria und 1944',
    Boolean(wegUeberDenAtlantik) &&
      /Peoria/.test(wegUeberDenAtlantik.text) &&
      /1944/.test(wegUeberDenAtlantik.text),
  );
  pruefe(
    'Röntgen/Karte: der Weg über den Atlantik verlässt das Blatt nach Westen (offene See)',
    Boolean(wegUeberDenAtlantik) &&
      wegUeberDenAtlantik.nach[0] < wegUeberDenAtlantik.von[0] &&
      !aufLand([-5.0, 49.6]),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Deutschland',
    'England',
    'Frankreich',
    'Ärmelkanal',
    'Nordsee',
    'Rhein',
    'Main',
    'Alpen',
    'Würzburg',
    'London',
    'Oxford',
  ]) {
    pruefe(`Röntgen/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Röntgen: Titel und Epoche stehen',
    thema.titel === 'Röntgen und Penicillin' && thema.epoche === '1895 / 1928',
  );
  pruefe('Röntgen: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe(
    'Röntgen: der Aufhänger stellt die zwei Zufälle nebeneinander',
    /Schirm/.test(thema.aufhaenger.frage) &&
      /Schale/.test(thema.aufhaenger.frage) &&
      /Zufälle/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Röntgen: der Aufhänger nennt beide Daten (1895 und 1928)',
    /8\. November 1895/.test(thema.aufhaenger.text) &&
      /1928/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Röntgen: der Aufhänger kündigt beide Seiten an (Gewinn UND Preis)',
    /(Schuhgeschäften|Jahrmärkten)/.test(thema.aufhaenger.text) &&
      /Denkmal/.test(thema.aufhaenger.text) &&
      /Warnung/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Röntgen: der Aufhänger ist neutral formuliert (keine Vorverurteilung)',
    !/(Betrüger|Scharlatan|Lüge|Wahnsinn|Verbrecher)/i.test(thema.aufhaenger.text),
  );
  pruefe('Röntgen: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Röntgen: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|richtig|falsch|Unsinn|verantwortungslos)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Röntgen: der Hinweis zum Urteil lässt beide Richtungen offen',
    /kein Richtig und kein Falsch/.test(thema.urteil.hinweis) &&
      /geprüft/.test(thema.urteil.hinweis),
  );
  pruefe(
    'Röntgen: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Röntgen/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Röntgen/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const entdeckerStimme = thema.perspektiven.find((p) => p.id === 'roentgen');
  pruefe(
    'Röntgen: die Stimme des Entdeckers ist die erste Perspektive',
    thema.perspektiven[0] === entdeckerStimme,
  );
  if (!entdeckerStimme) return;

  pruefe(
    'Röntgen: die erste Perspektive ist Opus zugeschrieben',
    entdeckerStimme.stimme === 'Opus',
  );
  pruefe(
    'Röntgen: die erste Perspektive heißt nach ihrer Form',
    /Interview/.test(entdeckerStimme.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt
  // =========================================================================

  const zeilenErsteStimme = entdeckerStimme.text.split('\n').length;
  pruefe(
    `Röntgen/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'Röntgen/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 20000 Zeichen)',
    entdeckerStimme.text.length > 20000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Röntgen/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = entdeckerStimme.text.replace(/\s+/g, ' ');

  const ueberschriften = entdeckerStimme.text.split('\n').filter((z) => z.startsWith('## '));
  pruefe(
    'Röntgen: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 10,
  );
  pruefe(
    'Röntgen: die Abschnitte bleiben überschaubar (höchstens sechzehn)',
    ueberschriften.length <= 16,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 12 darf
  // keine der zwölf bisherigen Dramaturgien übernehmen. Kapitel 1 gliedert
  // nach „Wer hier spricht …", Kapitel 2 führt seine Begründungslogik an
  // „## Warum …?"-Überschriften entlang, Kapitel 3 erzählt einen Tageslauf,
  // Kapitel 4 schreibt Briefe, Kapitel 5 folgt einem Buch von Station zu
  // Station, Kapitel 6 geht als Rundgang durch ein Haus, Kapitel 7
  // verhandelt vor Gericht, Kapitel 8 rechnet, Kapitel 9 liest die Uhr,
  // Kapitel 10 geht eine Kette ab, Kapitel 11 legt Präparate unter die
  // Linse. Dieses Kapitel ist DAS EINZIGE INTERVIEW: Röntgen hat in seinem
  // Leben genau ein Zeitungsgespräch gegeben, und die Abschnitte sind die
  // Fragen eines Reporters, der weiterfragt.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 9 (keine Uhr)',
    !/^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/^## Sekunde /.test(h)),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 10 (keine Kette)',
    !/^## Die Kette/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Glied/.test(h)),
  );
  pruefe(
    'Röntgen: die Abschnittsstruktur ist eine andere als in Kapitel 11 (keine Präparate)',
    !/^## Die Linse/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Präparat/.test(h)),
  );
  pruefe(
    'Röntgen: die Dramaturgie ist das einzige Interview (Fragen als Abschnitte)',
    /^## Der Mann, der keine Interviews gab/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) => /^## „/.test(h)).length >= 10 &&
      /Im April 1896 erscheint in einer amerikanischen Zeitschrift ein Gespräch/.test(
        fliessend,
      ),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Röntgen: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Der Gegenstand: die Strahlen, das Bild, die Durchleuchtung.
  pruefe(
    'Röntgen/Denkart: die X-Strahlen stehen mit ihrer Eigenart da',
    /X-Strahlen/.test(fliessend) &&
      /(durchdringen|Durchleuchtung|hindurch)/.test(fliessend) &&
      /Schatten/.test(fliessend),
  );
  pruefe(
    'Röntgen/Denkart: der Name sagt, dass die Erklärung fehlte',
    /Das X ist das Zeichen der Mathematiker für die unbekannte Größe/.test(fliessend),
  );

  // (b) Die Entdeckung: der Zufall mit dem Schirm.
  pruefe(
    'Röntgen/Denkart: die Entdeckung von 1895 steht am Anfang (Schirm, Karton, Würzburg)',
    /8\. November 1895/.test(fliessend) &&
      /Bariumplatincyanür/.test(fliessend) &&
      /schwarzen Karton/.test(fliessend) &&
      /Kathodenstrahlen/.test(fliessend),
  );
  pruefe(
    'Röntgen/Denkart: der überlieferte Satz des Entdeckers steht da',
    /Ich habe nicht gedacht\. Ich habe untersucht\./.test(fliessend),
  );
  pruefe(
    'Röntgen/Denkart: der Unterschied zwischen Panne und Entdeckung wird benannt',
    /Der Unterschied zwischen einer Panne und einer Entdeckung ist nicht das Ereignis\. Es ist die Frage, die man daran stellt\./.test(
      fliessend,
    ),
  );
  pruefe(
    'Röntgen/Denkart: die sieben Wochen Prüfung vor der Veröffentlichung stehen da',
    /sieben Wochen/.test(fliessend) && /28\. Dezember 1895/.test(fliessend),
  );

  // (c) Die neue Denkart: die Medizin des Bildes.
  pruefe(
    'Röntgen/Denkart: die Medizin des Bildes wird als neue Denkart benannt',
    /die Medizin des Bildes/.test(fliessend) &&
      /Was sichtbar ist, wird wirklich; was unsichtbar bleibt, gerät ins Hintertreffen/.test(
        fliessend,
      ),
  );
  pruefe(
    'Röntgen/Denkart: der Bruch mit den früheren Kapiteln wird gezogen (Vesal, Harvey, Chirurgie)',
    /Vesal/.test(fliessend) && /Harvey/.test(fliessend) && /Chirurgen/.test(fliessend),
  );

  // (d) Die Begründungslogik: mindestens zwei „Warum"-Fragen müssen im Text
  //     wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Warum den Zufall überhaupt ernst nehmen? (das Neue erscheint zwangsläufig als Fehler)',
      /Warum also den Zufall überhaupt ernst nehmen\?/.test(fliessend) &&
        /Alles, was wirklich neu ist, sieht im ersten Moment aus wie ein misslungener Versuch/.test(
          fliessend,
        ),
    ],
    [
      'Warum ausgerechnet das Bild? (in den lebenden Körper sehen, ohne ihn zu öffnen)',
      /Warum ausgerechnet das Bild\?/.test(fliessend) &&
        /Von diesem Tag an konnte man in einen lebenden Menschen hineinsehen, ohne ihn zu öffnen/.test(
          fliessend,
        ),
    ],
    [
      'Warum kein Patent? (eine Entdeckung gehört allen — und Schenken verbreitet schneller)',
      /Warum kein Patent\?/.test(fliessend) &&
        /Wer eine Entdeckung schnell in die Welt bringen will, verschenkt sie/.test(
          fliessend,
        ),
    ],
    [
      'Warum konnte die Euphorie entstehen? (man spürt die Strahlen nicht)',
      /Warum konnte das passieren\?/.test(fliessend) &&
        /Man spürt sie nicht/.test(fliessend) &&
        /Wo Warnung und Schaden zeitlich auseinanderfallen, versagt die Erfahrung als Lehrmeisterin/.test(
          fliessend,
        ),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Röntgen/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Röntgen/Denkart: mindestens zwei Warum-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );

  // =========================================================================
  // 5. Die ehrlichen Grenzen — von der eigenen Seite benannt
  //    (TONE-Regel und Zusatzregel für sensible Themen)
  // =========================================================================

  const unbequemeStellen = [
    [
      'die Euphorie: Jahrmarkt, Schuhladen, Kosmetiksalon',
      /Jahrmärkten/.test(fliessend) &&
        /Schuhgeschäften/.test(fliessend) &&
        /Haarentfernung/.test(fliessend),
    ],
    [
      'bestrahlte Kinder gegen harmlose Beschwerden',
      /Bis in die 1950er Jahre wurden Kinder gegen harmlose Beschwerden bestrahlt/.test(
        fliessend,
      ) && /Schilddrüsenkrebs/.test(fliessend),
    ],
    [
      'die Pioniere: Verbrennungen, Amputationen, Blutkrebs',
      /Amputationen/.test(fliessend) &&
        /Blutkrebs/.test(fliessend) &&
        /Clarence Dally/.test(fliessend),
    ],
    [
      'weitere Namen der ersten Generation (Fleischman, Hall-Edwards, Curie)',
      /Elizabeth Fleischman/.test(fliessend) &&
        /John Hall-Edwards/.test(fliessend) &&
        /Marie Curie/.test(fliessend),
    ],
    [
      'das Ehrenmal der Radiologie in Hamburg (1936, 169 Namen)',
      /Ehrenmal der Radiologie/.test(fliessend) &&
        /169/.test(fliessend) &&
        /1936/.test(fliessend),
    ],
    [
      'das eigene Schweigen: nicht laut gewarnt',
      /Ich habe nicht laut gewarnt/.test(fliessend) &&
        /Wer eine Kraft in die Welt setzt, ist aber zuständig/.test(fliessend),
    ],
    [
      'die Strahlen gefunden, nicht die Dosis',
      /Ich habe die Strahlen gefunden, nicht die Dosis/.test(fliessend),
    ],
    [
      'die Vorarbeit anderer (Lenard) wird eingeräumt',
      /Lenard/.test(fliessend) && /Darin hat er recht/.test(fliessend),
    ],
    [
      'die Strahlenbelastung ist auch heute nicht null',
      /Jede Aufnahme ist eine Abwägung/.test(fliessend) &&
        /Computertomografie des Bauches/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of unbequemeStellen) {
    pruefe(`Röntgen/Grenzen: ${name} steht im Text`, erfuellt);
  }
  pruefe(
    'Röntgen/Grenzen: die Stimme benennt mindestens drei unbequeme Stellen selbst',
    unbequemeStellen.filter(([, erfuellt]) => erfuellt).length >= 3,
  );
  // TONE-Regel: auch die Größe der Leistung steht da.
  pruefe(
    'Röntgen/TONE: die Größe der Entdeckung wird nicht kleingeredet',
    /Millionen gebrochener Knochen sind richtig zusammengewachsen/.test(fliessend) &&
      /Strahlentherapie/.test(fliessend),
  );
  pruefe(
    'Röntgen/TONE: die Vorsicht des Entdeckers wird ebenfalls genannt',
    /Kasten aus Zink mit Bleiauskleidung/.test(fliessend),
  );
  pruefe(
    'Röntgen/TONE: das Gegenargument zum verschenkten Patent wird fair wiedergegeben',
    /Ohne Aussicht auf Ertrag hätte keine Firma je die Millionen aufgebracht/.test(
      fliessend,
    ),
  );
  pruefe(
    'Röntgen/TONE: die andere Denkart wird nicht abgewertet',
    !/(rückständig|primitiv|barbarisch|lächerlich|Hokuspokus|Spinner|Schwurbl)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'Röntgen/TONE: kein Heilversprechen',
    !/(heilt alles|garantiert sicher|völlig risikolos|immer wirksam)/i.test(fliessend),
  );

  // =========================================================================
  // 6. KEINE GERÜCHTE (Betreiber-Entscheid 25.08.2026)
  // =========================================================================

  pruefe(
    'Röntgen/Belege: der Umgang mit Überliefertem wird vorab angekündigt',
    /Wo etwas nur überliefert ist und sich nicht belegen lässt, sage ich es dazu/.test(
      fliessend,
    ),
  );
  pruefe(
    'Röntgen/Belege: der berühmte Satz Bertha Röntgens ist als unbelegt gekennzeichnet',
    /Ob sie es genau so gesagt hat, lässt sich nicht belegen/.test(fliessend),
  );
  pruefe(
    'Röntgen/Belege: die Hochrechnungen zum heutigen Risiko werden als umstritten gekennzeichnet',
    /die Schätzungen gehen auseinander und sind umstritten/.test(fliessend),
  );

  // =========================================================================
  // 7. Der Innovations-Zyklus (roter Faden, CLAUDE.md 26.08.2026)
  // =========================================================================

  pruefe(
    'Röntgen/Zyklus: das Muster des Buches wird benannt (Chirurgie, Impfung, Strahlen)',
    /Die Chirurgie in Kapitel 9 hat getötet, bevor sie rettete/.test(fliessend) &&
      /Die Impfung in Kapitel 10/.test(fliessend),
  );
  pruefe(
    'Röntgen/Zyklus: die Ursache des Schadens wird benannt (übersprungene Prüfzeit)',
    /dass man die Zeit des Prüfens überspringen darf/.test(fliessend),
  );

  // =========================================================================
  // 8. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (Fleming) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Röntgen/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1895/.test(perspektivenText) &&
      /1896/.test(perspektivenText) &&
      /1901/.test(perspektivenText) &&
      /1928/.test(perspektivenText) &&
      /194[15]/.test(perspektivenText),
  );
  pruefe(
    'Röntgen/Erzähl-Muster: (a2) die Orte werden genannt',
    /Würzburg/.test(perspektivenText) &&
      /Berlin/.test(perspektivenText) &&
      /Hamburg/.test(perspektivenText) &&
      /London/.test(perspektivenText) &&
      /Oxford/.test(perspektivenText),
  );
  pruefe(
    'Röntgen/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(Denkart|Begründung|Haltung)/.test(perspektivenText) &&
      /was ist das\?/i.test(perspektivenText),
  );
  pruefe(
    'Röntgen/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /Was Bestand hat/.test(perspektivenText) &&
      /Computertomografie/.test(perspektivenText) &&
      /Magnetresonanztomografie/.test(perspektivenText),
  );
  pruefe(
    'Röntgen/Erzähl-Muster: (c2) und die Grenzen',
    /Was geschadet hat/.test(perspektivenText) &&
      /Was offen bleibt/.test(perspektivenText),
  );
  pruefe(
    'Röntgen/Bilanz: die Blindstelle der eigenen Denkart wird benannt',
    /Sie sagen, was ist — sie sagen nicht, was zu tun ist/.test(fliessend),
  );
  pruefe(
    'Röntgen/Bilanz: die Grenze bei den chronischen Krankheiten steht da',
    /Krebs, Diabetes, Rheuma/.test(fliessend),
  );

  // --- Die Brücke zu Kapitel 14 (Pharmaindustrie) --------------------------
  pruefe(
    'Röntgen: das verschenkte Patent bereitet das Kapitel der Pharmaindustrie vor',
    /Kapitel 14/.test(fliessend) && /lizenziert/.test(fliessend),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Röntgen: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Röntgen: die Tür führt zu Alexander Fleming in London',
    /Die zweite Stimme dieses Kapitels gehört Alexander Fleming in London/.test(
      fliessend,
    ),
  );
  pruefe(
    'Röntgen: die Tür nennt, was die zweite Stimme mitbringt (Reinigung, Oxford, Krieg, Resistenz)',
    /Florey/.test(fliessend) &&
      /Chain/.test(fliessend) &&
      /Heatley/.test(fliessend) &&
      /Normandie/.test(fliessend) &&
      /widerstandsfähige Erreger/.test(fliessend),
  );
  pruefe(
    'Röntgen: die zwei Zufälle werden am Ende ausdrücklich zusammengeführt',
    /Zwei Zufälle, dreiunddreißig Jahre auseinander/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Röntgen/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Röntgen/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Röntgen/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus)/i.test(frage.frage),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Röntgen/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Röntgen/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 13)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Röntgen/Synthese: sagt, welche Stimme noch kommt',
      /Fleming/.test(thema.synthese) &&
        /(Penicillin|Schale|Oxford)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Röntgen/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Röntgen/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Röntgen/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
