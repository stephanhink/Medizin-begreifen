// Prüfungen für Kapitel 1 — „Die Anfänge der Heilkunde" und seine Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine UI-Importe:
// läuft mit blankem `node`.
//
// Zwei Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test.** Die Küstenlinien der Karte liegen als echte
//      Längen-/Breitengrade im Modul. Hier werden bekannte Orte dagegen
//      nachgeschlagen: Hafenstädte müssen auf der gezeichneten Küste liegen,
//      Binnenstädte innerhalb der Landflächen, offene See außerhalb. Fällt
//      beim Nachbessern der Karte eine Küste ins Meer, meldet es sich hier
//      und nicht erst auf dem Handy.
//
//   2. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen), Attribution der ersten Stimme, TONE-Regel beim Begriff
//      „primitiv", Quiz-Umfang, offene Urteilsfrage.
//
// Zustandstolerant gebaut: Die zweite Perspektive und die endgültige
// Synthese kommen erst mit dem Hermes-Pass dazu. Prüfungen, die nur für die
// erste Stimme gelten, hängen deshalb an ihrer id („heilerin"); die
// Prüfungen zum Erzähl-Muster laufen über ALLE Perspektiven zusammen und
// bleiben damit auch gültig, wenn weitere Stimmen dazukommen. Die Synthese
// wird je nach Ausbaustand unterschiedlich geprüft (siehe unten).
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
} = require('../utils/themen/karten/anfaenge-der-heilkunde.js');

/** Wie weit ein Ort von „seiner" Küste abweichen darf (in Grad). */
const KUESTEN_TOLERANZ = 0.8;

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
  const thema = themaNachId('anfaenge-der-heilkunde');
  pruefe('Anfänge: das Thema ist in utils/themen/index.js registriert', Boolean(thema));
  if (!thema) return;

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Anfänge/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Anfänge/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss Europa, das Mittelmeer, Nordafrika, Vorderasien und Indien
  // enthalten — sonst zeigt die Karte nicht, was das Kapitel erzählt.
  pruefe('Anfänge/Karte: der Ausschnitt reicht vom Atlantik bis über den Indus', RAHMEN.minLon <= -10 && RAHMEN.maxLon >= 85);
  pruefe('Anfänge/Karte: der Ausschnitt reicht von der Sahelzone bis Nordeuropa', RAHMEN.minLat <= 10 && RAHMEN.maxLat >= 55);
  pruefe('Anfänge/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Anfänge/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Küstenorte: müssen auf der gezeichneten Linie liegen ----------------
  // Ausgewählt sind Orte, die im Schulatlas eindeutig am Wasser stehen.
  const kuestenorte = [
    ['Gibraltar', -5.35, 36.14, kuesten.eurasien],
    ['Marseille', 5.37, 43.3, kuesten.eurasien],
    ['Piräus (Athen)', 23.6, 37.9, kuesten.eurasien],
    ['Beirut (Levante)', 35.5, 33.9, kuesten.eurasien],
    ['Suez (Rotes Meer)', 32.55, 29.97, kuesten.eurasien],
    ['Aden (Bab al-Mandab)', 45.03, 12.79, kuesten.eurasien],
    ['Basra (Persischer Golf)', 48.5, 30.0, kuesten.eurasien],
    ['Karachi (Indusmündung)', 67.0, 24.86, kuesten.eurasien],
    ['Mumbai (Westküste Indiens)', 72.87, 19.08, kuesten.eurasien],
    ['Alexandria (Nildelta)', 29.9, 31.2, kuesten.afrika],
    ['Tanger (Nordafrika)', -5.8, 35.79, kuesten.afrika],
  ];
  for (const [name, lon, lat, ring] of kuestenorte) {
    const abstand = abstandZurKueste([lon, lat], ring);
    pruefe(
      `Anfänge/Atlas: ${name} liegt auf der gezeichneten Küste (${abstand.toFixed(2)}°)`,
      abstand <= KUESTEN_TOLERANZ,
    );
  }

  // --- Binnenorte: müssen innerhalb der Landflächen liegen -----------------
  const binnenorte = [
    ['Paris', 2.35, 48.86],
    ['München', 11.58, 48.14],
    ['Ankara', 32.85, 39.93],
    ['Bagdad (Zweistromland)', 44.4, 33.3],
    ['Isfahan (Iran)', 51.7, 32.7],
    ['Delhi (Nordindien)', 77.2, 28.6],
    ['Mekka (Arabien)', 39.8, 21.4],
    ['Kairo (Niltal)', 31.24, 30.05],
    ['Kreta', 24.9, 35.2],
    ['Zypern', 33.2, 35.0],
    ['Sizilien', 14.0, 37.5],
    ['Sri Lanka', 80.7, 7.6],
  ];
  for (const [name, lon, lat] of binnenorte) {
    pruefe(`Anfänge/Atlas: ${name} liegt auf Land`, aufLand([lon, lat]));
  }

  // --- Offene See: darf auf keiner Landfläche liegen -----------------------
  const seepunkte = [
    ['das Mittelmeer bei Malta', 17.0, 34.5],
    ['die Ägäis', 25.0, 38.0],
    ['die Adria', 15.5, 42.5],
    ['die Nordsee', 3.5, 56.0],
    ['die Ostsee', 19.0, 56.5],
    ['der Atlantik vor Biskaya', -10.0, 45.0],
    ['das Rote Meer', 38.5, 20.5],
    ['der Persische Golf', 51.5, 27.5],
    ['das Arabische Meer', 63.0, 15.0],
    ['der Golf von Bengalen', 87.0, 15.0],
  ];
  for (const [name, lon, lat] of seepunkte) {
    pruefe(`Anfänge/Atlas: ${name} liegt nicht auf Land`, !aufLand([lon, lat]));
  }

  // Die beiden Binnenmeere liegen als eigene Wasserflächen über dem Land —
  // ihre Mitte muss innerhalb der jeweiligen Fläche liegen.
  pruefe('Anfänge/Atlas: das Schwarze Meer ist als Wasserfläche gezeichnet', liegtIn([34.0, 43.0], kuesten.schwarzesMeer));
  pruefe('Anfänge/Atlas: das Kaspische Meer ist als Wasserfläche gezeichnet', liegtIn([51.0, 41.0], kuesten.kaspischesMeer));
  // Und sie dürfen sich nicht überlappen — sonst stimmt eine der Küsten nicht.
  pruefe('Anfänge/Atlas: die beiden Binnenmeere überschneiden sich nicht', !liegtIn([34.0, 43.0], kuesten.kaspischesMeer));

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Anfänge/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(`Anfänge/Karte: Phase „${phase.id}" nennt eine Jahreszahl`, /\d/.test(phase.label));
    pruefe(`Anfänge/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`, Boolean(phase.hinweis && phase.hinweis.length > 40));
    pruefe(
      `Anfänge/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  // Die Phasen gehen von den Jägern zu den Hochkulturen — die Reihenfolge
  // trägt die Aussage des Kapitels.
  pruefe(
    'Anfänge/Karte: die Phasen laufen von den Jägern zu den Hochkulturen',
    karte.phasen[0].id === 'jaeger-und-sammler' &&
      karte.phasen[karte.phasen.length - 1].id === 'fruehe-hochkulturen',
  );
  // Die erste Phase sagt offen, dass die Karte nur ein Ausschnitt ist —
  // sonst behauptete sie, hier habe die Medizin begonnen.
  pruefe(
    'Anfänge/Karte: die erste Phase weist auf die fehlenden Weltteile hin',
    /China|Amerika|Australien/.test(karte.phasen[0].hinweis),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  // Jeder Punkt muss dort sitzen, wo der Ort wirklich liegt: Die erwarteten
  // Koordinaten stehen hier, die Projektion rechnet sie nach.
  const erwartetePunkte = [
    ['shanidar', 44.22, 36.83],
    ['ensisheim', 7.35, 47.87],
    ['oetzi', 10.84, 46.78],
    ['jericho', 35.44, 31.87],
    ['niltal', 32.63, 25.7],
    ['mohenjo-daro', 68.14, 27.33],
  ];
  pruefe('Anfänge/Karte: fünf bis sieben Info-Punkte', karte.punkte.length >= 5 && karte.punkte.length <= 7);
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Anfänge/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(`Anfänge/Atlas: „${id}" sitzt auf ${lon}/${lat}`, punkt.x === x && punkt.y === y);
    pruefe(`Anfänge/Atlas: „${id}" liegt auf Land`, aufLand([lon, lat]));
    pruefe(`Anfänge/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`, punkt.text.length > 150);
  }

  // --- Die Bewegungen ------------------------------------------------------
  pruefe('Anfänge/Karte: es gibt Bewegungslinien', Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1);
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Anfänge/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Anfänge/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // Wanderung heißt hier: Menschen, Pflanzen und Wissen zugleich.
    pruefe(
      `Anfänge/Karte: Bewegung „${bewegung.id}" spricht vom Wissen, nicht nur vom Weg`,
      /Wissen|Heilpflanz|Kenntnis|Vorstellung/.test(bewegung.text),
    );
  }

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of ['Europa', 'Ägypten', 'Mesopotamien', 'Indien', 'Mittelmeer']) {
    pruefe(`Anfänge/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe('Anfänge: Titel und Epoche stehen', thema.titel === 'Die Anfänge der Heilkunde' && thema.epoche.length > 10);
  pruefe('Anfänge: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe('Anfänge: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe('Anfänge: das Quiz hat 3 bis 5 Fragen', thema.quiz.length >= 3 && thema.quiz.length <= 5);

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Anfänge/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Anfänge/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) => abschnitte.includes(id)),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const heilerin = thema.perspektiven.find((p) => p.id === 'heilerin');
  pruefe('Anfänge: die Stimme der Heilerin ist die erste Perspektive', thema.perspektiven[0] === heilerin);
  if (heilerin) {
    pruefe('Anfänge: die erste Perspektive ist Opus zugeschrieben', heilerin.stimme === 'Opus');
    pruefe('Anfänge: die erste Perspektive heißt nach ihrer Sicht', /Heilerin/.test(heilerin.name));
    pruefe('Anfänge: die erste Perspektive ist ausgeführt (über 4000 Zeichen)', heilerin.text.length > 4000);
    const ueberschriften = heilerin.text.split('\n').filter((z) => z.startsWith('## '));
    pruefe('Anfänge: die erste Perspektive ist in Abschnitte gegliedert', ueberschriften.length >= 5);

    // Sie sagt selbst, dass sie eine Erzählung ist und keine Wahrheit.
    pruefe(
      'Anfänge: die erste Perspektive kennzeichnet sich als Erzählung',
      /Erzählung|Deutung|Sicherheit|Sicher ist es nicht/.test(heilerin.text),
    );

    // Zusatzregel für sensible Themen: Die unbequemen Stellen der eigenen
    // Erzählung benennt sie selbst.
    pruefe(
      'Anfänge: die erste Perspektive benennt ihre eigenen Grenzen',
      /Wo wir scheiterten|Grenzen/.test(heilerin.text) &&
        /starb|Kindbett|Blinddarm|half nie/.test(heilerin.text),
    );
    pruefe(
      'Anfänge: die erste Perspektive verklärt das Alter des Wissens nicht',
      /Nicht jedes alte Wissen ist gutes Wissen|Alt heißt nur alt/.test(heilerin.text),
    );

    // Die Tür zur zweiten Stimme bleibt offen — Hermes schreibt sie.
    pruefe(
      'Anfänge: die erste Perspektive öffnet die Tür zur zweiten Stimme',
      /zweite Stimme/.test(heilerin.text),
    );
    pruefe(
      'Anfänge: die Tür führt zu Abwertung und Wiederentdeckung',
      /Abwertung/.test(heilerin.text) && /Wiederentdeckung/.test(heilerin.text),
    );

    // Denkart-Vertiefung (Betreiber-Vorgabe): nicht nur WAS, sondern WARUM.
    pruefe(
      'Anfänge: die erste Perspektive beschreibt die Denkart dahinter',
      /Denkart/.test(heilerin.text) && /Weltbild/.test(heilerin.text),
    );
    pruefe(
      'Anfänge: die Denkart erklärt Krankheit als Störung des Lots',
      /Störung/.test(heilerin.text) && /(Gleichgewicht|im Lot|Ordnung)/.test(heilerin.text),
    );
    pruefe(
      'Anfänge: die Denkart erklärt Ritual UND Pflanze aus derselben Sicht',
      /Ritual/.test(heilerin.text) && /Pflanze/.test(heilerin.text),
    );
  }

  // --- Das Erzähl-Muster (Entwicklung / Annahmen / Wirkungen) --------------
  // Über ALLE Perspektiven zusammen geprüft: So bleibt die Zusage auch dann
  // erfüllt, wenn Hermes weitere Stimmen ergänzt.
  const perspektivenText = thema.perspektiven.map((p) => p.text).join('\n');
  pruefe(
    'Anfänge/Erzähl-Muster: (a) wie das Wissen sich entwickelte',
    /Generation|weitergeg|Erfahrungsmedizin|wuchs/.test(perspektivenText),
  );
  pruefe(
    'Anfänge/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /(glaub|Annahme|Weltbild|Geist)/.test(perspektivenText),
  );
  pruefe(
    'Anfänge/Erzähl-Muster: (c1) welche Wirkungen es hatte — die Erfolge',
    /(Trepanation|überlebt|Chinin|Digitalis|Kurare|Morphin)/.test(perspektivenText),
  );
  pruefe(
    'Anfänge/Erzähl-Muster: (c2) und die Grenzen',
    /(Grenzen|scheiter|starb|Risiko)/.test(perspektivenText),
  );

  // --- TONE-Regel: der Begriff „primitiv" ----------------------------------
  // Er darf vorkommen — aber nie unmarkiert, als wäre er ein Befund. Geprüft
  // wird, dass jede Fundstelle in Anführungszeichen steht.
  const texte = alleTexte(thema);
  const stellen = [];
  const muster = /primitiv/gi;
  let treffer = muster.exec(texte);
  while (treffer) {
    stellen.push(texte.slice(Math.max(0, treffer.index - 3), treffer.index + 20));
    treffer = muster.exec(texte);
  }
  pruefe('Anfänge/TONE: der Begriff „primitiv" kommt im Kapitel vor', stellen.length > 0);
  pruefe(
    'Anfänge/TONE: jede Fundstelle von „primitiv" steht in Anführungszeichen',
    stellen.every((stelle) => stelle.includes('„')),
  );
  pruefe(
    'Anfänge/TONE: das Kapitel ordnet den Begriff als Zuschreibung von außen ein',
    /(Zuschreibung|von außen|Kolonial|kolonial|19\. Jahrhundert)/.test(texte),
  );
  pruefe(
    'Anfänge/TONE: das Kapitel nennt, was die moderne Medizin diesem Wissen verdankt',
    /(Chinin|Chinarinde|Kurare|Digitalis|Aspirin|Morphin)/.test(texte),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(`Anfänge/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`, frage.antworten.length >= 3);
    pruefe(
      `Anfänge/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Anfänge/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig)/i.test(frage.frage),
    );
  }

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Stimme ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Anfänge/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 1)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig|als Nächstes)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Anfänge/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Anfänge/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Anfänge/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
