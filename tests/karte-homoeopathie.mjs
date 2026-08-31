// Prüfungen für Kapitel 9 — „Hahnemann und die Homöopathie" und seine
// Karte.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine
// UI-Importe: läuft mit blankem `node`.
//
// Acht Aufgaben hat diese Datei:
//
//   1. **Der Atlas-Test — diesmal ohne Meer.** Der Ausschnitt liegt
//      vollständig im Binnenland; es gibt keine Küste, gegen die geprüft
//      werden könnte. An ihre Stelle treten zwei andere Nachschlagewerke:
//      (a) die FLÜSSE — Orte, die im Atlas am Wasser liegen, müssen auf
//      der gezeichneten Linie liegen, Orte im Trockenen müssen Abstand
//      halten; (b) die zwei HERRSCHAFTEN, an denen dieses Kapitel hängt —
//      das Königreich Sachsen nach 1815 (dort galt das Privileg der
//      Apotheker) und das Herzogtum Anhalt-Köthen (dort galt es nicht).
//      Geprüft werden bewusst Orte, die NICHT selbst Stützpunkte der
//      Linien sind. Der Ausschnitt umfasst nur 3,8° Länge, deshalb die
//      enge Toleranz von 0,1°.
//
//   2. **Die Denkart-Analyse (Betreiber-Vorgabe).** Das Herzstück: Im
//      Text der ersten Stimme müssen das Ähnlichkeitsprinzip, die
//      Potenzierung mit Verschüttelung und Verreibung, der
//      Chinarinden-Versuch von 1790 und die Lebenskraft stehen — und die
//      Begründungslogik muss ausgeführt sein: weshalb das Ähnliche und
//      nicht das Gegenteil, weshalb die Prüfung am Gesunden, weshalb die
//      kleine Gabe, weshalb der ganze Mensch.
//
//   3. **Die Informations-These und das Telefon-Argument
//      (Betreiber-Vorgabe, prominent).** „Ist noch Stoff drin?" ist die
//      falsche Frage; der Draht trägt keinen Ton, sondern eine Form;
//      Unerklärbarkeit heute ist kein Beweis für Unwirksamkeit. Dazu die
//      Ehrlichkeit, die dieses Buch verlangt: Die Stimme muss selbst
//      sagen, wo das Bild trägt und wo nicht.
//
//   4. **Sheldrake als HYPOTHESE (Betreiber-Vorgabe +
//      KEINE-GERÜCHTE-Regel).** Die morphischen Felder dürfen als
//      Denkmodell vorkommen, aber nur ausdrücklich als umstrittene,
//      unbewiesene Theorie gekennzeichnet.
//
//   5. **Die ehrlichen Grenzen (TONE-Regel und Zusatzregel für sensible
//      Themen).** Die Stimme der Homöopathie muss die unbequemen Stellen
//      SELBST benennen: die Studienlage, den gescheiterten Versuch von
//      Benveniste, die Scharlatanerie in den eigenen Reihen, die
//      Überspitzungen, die Härte Hahnemanns und die berühmte
//      Cholera-Zahl von 1854, die vermutlich etwas anderes zeigt, als
//      die eigene Seite daraus gemacht hat.
//
//   6. **Die KEINE-GERÜCHTE-Regel (Betreiber-Entscheid 25.08.2026).** Die
//      belegten Eckdaten stehen da (Meißen 1755, Chinarinde 1790, Organon
//      1810, Köthen 1821, Paris 1843); wo eine Zahl schwankt oder etwas
//      nur überliefert ist, sagt der Text es dazu.
//
//   7. **Der Innovations-Zyklus (Betreiber-Beobachtung 26.08.2026).** Der
//      rote Faden des Buches — diesmal auf dem Kopf: Die Homöopathie war
//      die sanfte Antwort auf eine brutale Medizin und hatte deshalb nie
//      die Katastrophe, aus der die andere Seite ihre Prüfregeln gelernt
//      hat.
//
//   8. **Der Modul-Test.** Erzähl-Muster (Entwicklung / Annahmen /
//      Wirkungen / Grenzen), die Längenregel in ihrer Umkehrung ab
//      Kapitel 9, die Dramaturgie (KEINE WIEDERHOLUNGEN), Attribution der
//      ersten Stimme, Quiz-Umfang, offene Urteilsfrage, Lernformat und
//      die offene Tür zur zweiten Stimme (die Schulmedizin).
//
// Zustandstolerant gebaut wie in den Kapiteln 1 bis 15: Die zweite
// Perspektive und die endgültige Synthese kommen erst mit dem
// Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten,
// hängen deshalb an ihrer id („homoeopathie"); die Prüfungen zum
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
  fluesse,
} = require('../utils/themen/karten/homoeopathie.js');

/**
 * Wie weit ein Ort von „seinem" Fluss abweichen darf (in Grad).
 *
 * Dieses Blatt ist das kleinste des ganzen Buches — 3,8° Länge gegenüber
 * 14° bei Kapitel 13. 0,1° sind hier rund elf Kilometer, also etwa
 * achtzehn Bildpunkte in der Waagerechten. Das deckt die Vereinfachung
 * eines Flusslaufs ab, lässt aber keinen falsch gesetzten Ort durch.
 */
const FLUSS_TOLERANZ = 0.1;

/**
 * Wie weit ein Ort im Trockenen mindestens von jedem Fluss entfernt sein
 * muss, damit die Gegenprobe etwas wert ist.
 */
const TROCKEN_ABSTAND = 0.15;

/**
 * Mindestumfang der ersten Perspektive (Neuzeit-Regel, Kapitel 9 ff.).
 *
 * Die frühen Kapitel durften höchstens ~250 Zeilen je Stimme haben; ab
 * Kapitel 9 gilt die Umkehrung — vollständig und ausführlich. Für die
 * Homöopathie schreibt CLAUDE.md das ausdrücklich noch einmal fest.
 */
const MIN_ZEILEN_ERSTE_STIMME = 300;

/** Obergrenze fürs ganze Kapitel — ausführlich ja, aufgebläht nein. */
const MAX_ZEILEN_KAPITEL = 1800;

/**
 * Liegt ein geografischer Punkt innerhalb eines Polygonzugs?
 *
 * Strahlensatz-Verfahren („ray casting") wie in den Kapiteln 1 bis 15.
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

/** Liegt der Punkt auf der gezeichneten Landfläche? */
function aufLand(punkt) {
  return landflaechen.some((ring) => liegtIn(punkt, ring));
}

/**
 * Abstand eines Punktes zu einer Strecke — in Grad, längentreu gestaucht.
 *
 * Ohne die Kosinus-Korrektur wäre ein Grad Länge im Erzgebirge genauso
 * „lang" wie im Fläming; die Toleranz würde im Norden großzügiger.
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

/**
 * Kürzester Abstand eines Punktes zu einem OFFENEN Linienzug.
 *
 * Anders als bei den Küstenringen der früheren Kapitel darf hier nicht vom
 * letzten zum ersten Punkt zurückgesprungen werden: Ein Fluss ist keine
 * geschlossene Linie, und eine erfundene Schlussstrecke von der Mündung
 * zurück zur Quelle würde die Prüfung verfälschen.
 */
function abstandZurLinie(punkt, linie) {
  let kleinster = Infinity;
  for (let i = 0; i < linie.length - 1; i += 1) {
    const abstand = abstandZuStrecke(punkt, linie[i], linie[i + 1]);
    if (abstand < kleinster) kleinster = abstand;
  }
  return kleinster;
}

/** Kürzester Abstand zu irgendeinem der gezeichneten Flüsse. */
function abstandZumNaechstenFluss(punkt) {
  let kleinster = Infinity;
  for (const linie of Object.values(fluesse)) {
    const abstand = abstandZurLinie(punkt, linie);
    if (abstand < kleinster) kleinster = abstand;
  }
  return kleinster;
}

/**
 * @param {(name: string, ok: boolean) => void} pruefe Prüf-Funktion des Rahmens
 */
export function laufe(pruefe) {
  const thema = themaNachId('homoeopathie');
  pruefe(
    'Homöopathie: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // Die Reihenfolge im Index ist die Reihenfolge in der App: Kapitel 9
  // steht hinter „Harvey und der Blutkreislauf" (Themenlandkarte in CLAUDE.md).
  pruefe(
    'Homöopathie: steht in der App hinter „Harvey und der Blutkreislauf"',
    alleThemen.findIndex((t) => t.id === 'homoeopathie') ===
      alleThemen.findIndex((t) => t.id === 'harvey') + 1,
  );

  // =========================================================================
  // 1. Die Karte gegen den Atlas
  // =========================================================================

  pruefe('Homöopathie/Karte: erfüllt das Karten-Schema', pruefeKarte(karte).length === 0);
  pruefe(
    'Homöopathie/Karte: die Karte des Moduls ist die aus karten/',
    thema.karte === karte,
  );

  // --- Der Ausschnitt ------------------------------------------------------
  // Er muss alle Stationen eines Lebens auf ein Blatt bringen: Meißen,
  // Dresden, Leipzig, Torgau, Dessau, Köthen.
  pruefe(
    'Homöopathie/Karte: der Ausschnitt reicht von der Saale bis in die Lausitz',
    RAHMEN.minLon <= 11.5 && RAHMEN.maxLon >= 14.5,
  );
  pruefe(
    'Homöopathie/Karte: der Ausschnitt reicht vom Erzgebirge bis über Köthen hinaus',
    RAHMEN.minLat <= 50.6 && RAHMEN.maxLat >= 52.0,
  );
  pruefe('Homöopathie/Karte: breite 700 wie im Muster', karte.breite === 700);

  const P = erstelleProjektion(RAHMEN);
  pruefe('Homöopathie/Karte: hoehe stammt aus der Projektion', karte.hoehe === P.hoehe);

  // --- Orte am Wasser: müssen auf der gezeichneten Linie liegen ------------
  // Städte, die im Schulatlas eindeutig an ihrem Fluss liegen und die NICHT
  // als Stützpunkte in den Flusslisten stehen.
  const orteAmFluss = [
    ['Königstein an der Elbe', 14.07, 50.92, 'elbe'],
    ['Radebeul an der Elbe', 13.66, 51.106, 'elbe'],
    ['Diesbar-Seußlitz an der Elbe', 13.39, 51.23, 'elbe'],
    ['Belgern an der Elbe', 13.16, 51.482, 'elbe'],
    ['Roßlau an der Elbe', 12.238, 51.887, 'elbe'],
    ['Dornburg an der Saale', 11.68, 51.01, 'saale'],
    ['Bad Kösen an der Saale', 11.72, 51.13, 'saale'],
    ['Schkopau an der Saale', 11.95, 51.4, 'saale'],
    ['Alsleben an der Saale', 11.69, 51.71, 'saale'],
    ['Trebsen an der Mulde', 12.75, 51.3, 'mulde'],
    ['Muldenstein an der Mulde', 12.44, 51.65, 'mulde'],
    ['Jeßnitz an der Mulde', 12.3, 51.7, 'mulde'],
    ['Markkleeberg an der Weißen Elster', 12.37, 51.28, 'weisseElster'],
    ['Döbeln an der Freiberger Mulde', 13.12, 51.12, 'freibergerMulde'],
  ];
  for (const [name, lon, lat, flussName] of orteAmFluss) {
    const abstand = abstandZurLinie([lon, lat], fluesse[flussName]);
    pruefe(
      `Homöopathie/Atlas: ${name} liegt auf der gezeichneten Linie (${abstand.toFixed(3)}°)`,
      abstand <= FLUSS_TOLERANZ,
    );
  }

  // --- Die Orte des Kapitels selbst ----------------------------------------
  // Meißen, Dresden und Torgau liegen an der Elbe, Leipzig an der Weißen
  // Elster, Dessau an der Mulde. Das ist der eigentliche Atlas-Beweis: Die
  // sechs Info-Punkte sitzen dort, wo der Fluss auch gezeichnet ist.
  for (const [name, lon, lat, flussName] of [
    ['Meißen', 13.475, 51.163, 'elbe'],
    ['Dresden', 13.738, 51.049, 'elbe'],
    ['Torgau', 13.004, 51.56, 'elbe'],
    ['Leipzig', 12.373, 51.339, 'weisseElster'],
    ['Dessau', 12.243, 51.836, 'mulde'],
  ]) {
    const abstand = abstandZurLinie([lon, lat], fluesse[flussName]);
    pruefe(
      `Homöopathie/Atlas: ${name} liegt an seinem Fluss (${abstand.toFixed(3)}°)`,
      abstand <= FLUSS_TOLERANZ,
    );
  }

  // --- Orte im Trockenen: dürfen an keinem Fluss liegen --------------------
  // Die Gegenprobe. Ohne sie wäre die Prüfung oben wertlos: Eine Karte, auf
  // der überall Wasser ist, hätte jeden Ort am Fluss.
  const orteImTrockenen = [
    ['Chemnitz', 12.92, 50.83],
    ['Kamenz in der Lausitz', 14.09, 51.27],
    ['Annaberg-Buchholz im Erzgebirge', 13.0, 50.58],
    ['Marienberg im Erzgebirge', 13.16, 50.65],
    ['Sangerhausen am Harzrand', 11.3, 51.47],
    ['Luckau im Fläming', 13.7, 51.85],
  ];
  for (const [name, lon, lat] of orteImTrockenen) {
    const abstand = abstandZumNaechstenFluss([lon, lat]);
    pruefe(
      `Homöopathie/Atlas: ${name} liegt an keinem gezeichneten Fluss (${abstand.toFixed(3)}°)`,
      abstand > TROCKEN_ABSTAND,
    );
  }

  // --- Die Landfläche ------------------------------------------------------
  // Dieser Ausschnitt hat kein Meer; geprüft wird deshalb nur, dass die
  // gezeichnete Fläche den ganzen Rahmen deckt — auch die vier Ecken.
  for (const [name, lon, lat] of [
    ['Leipzig', 12.373, 51.339],
    ['Köthen', 11.97, 51.752],
    ['Dresden', 13.738, 51.049],
    ['die Nordwestecke des Blattes', 11.05, 52.25],
    ['die Südostecke des Blattes', 14.75, 50.55],
  ]) {
    pruefe(`Homöopathie/Atlas: ${name} liegt auf der Landfläche`, aufLand([lon, lat]));
  }

  // --- Die zwei Herrschaften -----------------------------------------------
  // Der Kern der Kartengeschichte: Im Königreich Sachsen galt das Privileg
  // der Apotheker, an dem Hahnemann 1820 scheiterte — im Herzogtum
  // Anhalt-Köthen galt es nicht. Deshalb der Umzug von 1821.
  for (const [name, lon, lat] of [
    ['Leipzig', 12.373, 51.339],
    ['Dresden', 13.738, 51.049],
    ['Meißen', 13.475, 51.163],
    ['Freiberg', 13.34, 50.92],
    ['Chemnitz', 12.92, 50.83],
    ['Zwickau', 12.5, 50.72],
    ['Bautzen', 14.42, 51.18],
  ]) {
    pruefe(
      `Homöopathie/Atlas: ${name} lag im Königreich Sachsen nach 1815`,
      liegtIn([lon, lat], kuesten.koenigreichSachsen1815),
    );
  }
  // 1815 hatte Sachsen seine nördliche Hälfte an Preußen verloren; Torgau,
  // Wittenberg, Eilenburg, Merseburg und Naumburg lagen von da an
  // außerhalb, ebenso das anhaltische Köthen und Dessau und das
  // eigenständige Herzogtum Sachsen-Altenburg.
  for (const [name, lon, lat] of [
    ['Torgau', 13.004, 51.56],
    ['Wittenberg', 12.64, 51.87],
    ['Eilenburg', 12.635, 51.462],
    ['Halle an der Saale', 11.96, 51.48],
    ['Merseburg', 11.99, 51.36],
    ['Naumburg', 11.81, 51.15],
    ['Köthen', 11.97, 51.752],
    ['Dessau', 12.243, 51.836],
    ['Altenburg', 12.43, 50.99],
  ]) {
    pruefe(
      `Homöopathie/Atlas: ${name} lag außerhalb des Königreichs Sachsen`,
      !liegtIn([lon, lat], kuesten.koenigreichSachsen1815),
    );
  }
  pruefe(
    'Homöopathie/Atlas: Köthen lag im Herzogtum Anhalt-Köthen',
    liegtIn([11.97, 51.752], kuesten.anhaltKoethen),
  );
  // Anhalt war in drei Fürstentümer geteilt: Dessau und Bernburg gehörten
  // nicht zu Köthen.
  for (const [name, lon, lat] of [
    ['Dessau', 12.243, 51.836],
    ['Bernburg', 11.74, 51.79],
    ['Halle an der Saale', 11.96, 51.48],
    ['Leipzig', 12.373, 51.339],
  ]) {
    pruefe(
      `Homöopathie/Atlas: ${name} lag außerhalb des Herzogtums Anhalt-Köthen`,
      !liegtIn([lon, lat], kuesten.anhaltKoethen),
    );
  }

  // --- Die Phasen ----------------------------------------------------------
  pruefe('Homöopathie/Karte: mindestens drei Phasen', karte.phasen.length >= 3);
  for (const phase of karte.phasen) {
    pruefe(
      `Homöopathie/Karte: Phase „${phase.id}" nennt eine Jahreszahl`,
      /\b(1[6-9]\d\d|20\d\d)\b/.test(phase.label),
    );
    pruefe(
      `Homöopathie/Karte: Phase „${phase.id}" hat einen erklärenden Hinweis`,
      Boolean(phase.hinweis && phase.hinweis.length > 40),
    );
    pruefe(
      `Homöopathie/Karte: Phase „${phase.id}" zeigt benannte Flächen`,
      phase.flaechen.every((f) => f.titel.length > 0 && f.d.startsWith('M ')),
    );
  }
  pruefe(
    'Homöopathie/Karte: eine Phase zeigt Herkunft und Ausbildung ab 1755',
    karte.phasen.some(
      (p) =>
        /1755/.test(p.label) &&
        /10\. April 1755/.test(p.hinweis) &&
        /Meißen/.test(p.hinweis),
    ),
  );
  pruefe(
    'Homöopathie/Karte: eine Phase zeigt den Chinarinden-Versuch von 1790',
    karte.phasen.some(
      (p) =>
        /1790/.test(p.label) &&
        /Cullen/.test(p.hinweis) &&
        /Chinarinde/.test(p.hinweis) &&
        /Wechselfieber/.test(p.hinweis),
    ),
  );
  pruefe(
    'Homöopathie/Karte: eine Phase zeigt die Prüfungen und das Organon von 1810',
    karte.phasen.some(
      (p) =>
        /1810/.test(p.label) &&
        /Organon/.test(p.hinweis) &&
        /Torgau/.test(p.label + p.hinweis),
    ),
  );
  pruefe(
    'Homöopathie/Karte: eine Phase zeigt den Prozess und die Zuflucht in Köthen 1821',
    karte.phasen.some(
      (p) =>
        /1821/.test(p.label) &&
        /Apotheker/.test(p.hinweis) &&
        /Anhalt-Köthen/.test(p.hinweis) &&
        /Ferdinand/.test(p.hinweis),
    ),
  );
  pruefe(
    'Homöopathie/Karte: eine Phase zeigt Paris und den Tod 1843',
    karte.phasen.some(
      (p) =>
        /1843/.test(p.label) &&
        /Paris/.test(p.label + p.hinweis) &&
        /2\. Juli 1843/.test(p.hinweis),
    ),
  );
  pruefe(
    'Homöopathie/Karte: die Phasen laufen von der Herkunft bis nach Paris',
    karte.phasen[0].id === 'herkunft-1755-1789' &&
      karte.phasen[karte.phasen.length - 1].id === 'paris-1835-1843',
  );
  // Die Karte zeigt Zustände mit Jahreszahl und bewertet nicht (Zusatzregel
  // für sensible Themen) — gerade bei diesem Streitthema wichtig.
  const phasenText = karte.phasen
    .map((p) => p.label + ' ' + (p.hinweis || '') + ' ' + p.flaechen.map((f) => f.titel).join(' '))
    .join(' | ');
  pruefe(
    'Homöopathie/Karte: die Phasen werten nicht',
    !/(rückständig|lächerlich|Unsinn|primitiv|finster|Scharlatan|barbarisch|Betrüger|Hokuspokus|Placebo)/i.test(
      phasenText,
    ),
  );

  // --- Die Info-Punkte -----------------------------------------------------
  const erwartetePunkte = [
    ['meissen', 13.475, 51.163],
    ['dresden', 13.738, 51.049],
    ['leipzig', 12.373, 51.339],
    ['torgau', 13.004, 51.56],
    ['koethen', 11.97, 51.752],
    ['dessau', 12.243, 51.836],
  ];
  pruefe(
    'Homöopathie/Karte: fünf bis acht Info-Punkte',
    karte.punkte.length >= 5 && karte.punkte.length <= 8,
  );
  for (const [id, lon, lat] of erwartetePunkte) {
    const punkt = karte.punkte.find((p) => p.id === id);
    if (!punkt) {
      pruefe(`Homöopathie/Karte: Info-Punkt „${id}" ist vorhanden`, false);
      continue;
    }
    const [x, y] = P.punkt(lon, lat);
    pruefe(
      `Homöopathie/Atlas: „${id}" sitzt auf ${lon}/${lat}`,
      punkt.x === x && punkt.y === y,
    );
    pruefe(`Homöopathie/Atlas: „${id}" liegt auf der Landfläche`, aufLand([lon, lat]));
    pruefe(
      `Homöopathie/Karte: „${id}" erzählt etwas (Text über 150 Zeichen)`,
      punkt.text.length > 150,
    );
  }
  pruefe(
    'Homöopathie/Karte: alle Info-Punkte liegen innerhalb der Karte',
    karte.punkte.every(
      (p) => p.x >= 0 && p.x <= karte.breite && p.y >= 0 && p.y <= karte.hoehe,
    ),
  );
  // Die Pole des Kapitels: die Geburt, die Werkbank, der Selbstversuch, das
  // Buch, die Zuflucht.
  const meissenPunkt = karte.punkte.find((p) => p.id === 'meissen');
  pruefe(
    'Homöopathie/Karte: der Punkt Meißen nennt Geburtstag und Fürstenschule',
    Boolean(
      meissenPunkt &&
        /10\. April 1755/.test(meissenPunkt.text) &&
        /St\. Afra/.test(meissenPunkt.text) &&
        /Porzellan/.test(meissenPunkt.text),
    ),
  );
  const leipzigPunkt = karte.punkte.find((p) => p.id === 'leipzig');
  pruefe(
    'Homöopathie/Karte: der Punkt Leipzig nennt Cullen 1790 und das Urteil von 1820',
    Boolean(
      leipzigPunkt &&
        /1790/.test(leipzigPunkt.text) &&
        /Cullen/.test(leipzigPunkt.text) &&
        /1820/.test(leipzigPunkt.text),
    ),
  );
  const torgauPunkt = karte.punkte.find((p) => p.id === 'torgau');
  pruefe(
    'Homöopathie/Karte: der Punkt Torgau nennt die Prüfungen am Gesunden und das Organon',
    Boolean(
      torgauPunkt &&
        /Gesunden/.test(torgauPunkt.text) &&
        /Organon/.test(torgauPunkt.text),
    ),
  );
  const koethenPunkt = karte.punkte.find((p) => p.id === 'koethen');
  pruefe(
    'Homöopathie/Karte: der Punkt Köthen nennt Herzog Ferdinand und die eigene Abgabe',
    Boolean(
      koethenPunkt &&
        /Ferdinand/.test(koethenPunkt.text) &&
        /1821/.test(koethenPunkt.text) &&
        /(abgeben|Abgabe|herstellen)/.test(koethenPunkt.text),
    ),
  );
  const dessauPunkt = karte.punkte.find((p) => p.id === 'dessau');
  pruefe(
    'Homöopathie/Karte: der Punkt Dessau nennt die Apotheke und die Heirat von 1782',
    Boolean(
      dessauPunkt &&
        /Apotheke/.test(dessauPunkt.text) &&
        /1782/.test(dessauPunkt.text),
    ),
  );
  const dresdenPunkt = karte.punkte.find((p) => p.id === 'dresden');
  pruefe(
    'Homöopathie/Karte: der Punkt Dresden nennt die Medizin der Zeit beim Namen',
    Boolean(
      dresdenPunkt &&
        /Aderlass/.test(dresdenPunkt.text) &&
        /(Brechmittel|Quecksilber)/.test(dresdenPunkt.text),
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
    `Homöopathie/Karte: die Info-Punkte liegen auseinander (engster Abstand ${engste.toFixed(0)} px)`,
    engste >= 15,
  );

  // --- Die Bewegungen ------------------------------------------------------
  pruefe(
    'Homöopathie/Karte: es gibt Bewegungslinien',
    Array.isArray(karte.bewegungen) && karte.bewegungen.length >= 1,
  );
  for (const bewegung of karte.bewegungen || []) {
    const stationen = [bewegung.von, ...(bewegung.ueber || []), bewegung.nach];
    pruefe(
      `Homöopathie/Karte: Bewegung „${bewegung.id}" bleibt im Bild`,
      stationen.every(([x, y]) => x >= 0 && x <= karte.breite && y >= 0 && y <= karte.hoehe),
    );
    pruefe(
      `Homöopathie/Karte: Bewegung „${bewegung.id}" hat eine Richtung`,
      bewegung.von[0] !== bewegung.nach[0] || bewegung.von[1] !== bewegung.nach[1],
    );
    // In diesem Kapitel wandern keine Heere, sondern ein Arzt und eine Lehre.
    pruefe(
      `Homöopathie/Karte: Bewegung „${bewegung.id}" erzählt, was unterwegs geschah`,
      /Apotheker|Landesgrenze|Paris|Homöopathie|Herzog/.test(bewegung.text),
    );
  }
  const nachKoethen = (karte.bewegungen || []).find((b) => b.id === 'weg-nach-koethen');
  pruefe(
    'Homöopathie/Karte: die Vertreibung endet in Köthen',
    Boolean(nachKoethen) &&
      nachKoethen.nach[0] === P.punkt(11.97, 51.752)[0] &&
      nachKoethen.nach[1] === P.punkt(11.97, 51.752)[1],
  );
  pruefe(
    'Homöopathie/Karte: die Vertreibung erklärt, dass eine Landesgrenze entschied',
    Boolean(nachKoethen) &&
      /Landesgrenze/.test(nachKoethen.text) &&
      /Apotheker/.test(nachKoethen.text),
  );
  const nachParis = (karte.bewegungen || []).find((b) => b.id === 'weg-nach-paris');
  pruefe(
    'Homöopathie/Karte: der Weg nach Paris beginnt in Köthen',
    Boolean(nachParis) &&
      nachParis.von[0] === P.punkt(11.97, 51.752)[0] &&
      nachParis.von[1] === P.punkt(11.97, 51.752)[1],
  );
  pruefe(
    'Homöopathie/Karte: der Weg nach Paris sagt, dass das Ziel außerhalb des Blattes liegt',
    Boolean(nachParis) &&
      /verlässt dieses Blatt/.test(nachParis.text) &&
      /2,35/.test(nachParis.text) &&
      /1843/.test(nachParis.text),
  );
  const indieWelt = (karte.bewegungen || []).find(
    (b) => b.id === 'die-lehre-geht-in-die-welt',
  );
  pruefe(
    'Homöopathie/Karte: die Verbreitung nennt Wien, New York und Indien',
    Boolean(indieWelt) &&
      /Wien/.test(indieWelt.text) &&
      /New York/.test(indieWelt.text) &&
      /Indien/.test(indieWelt.text),
  );

  // --- Beschriftungen ------------------------------------------------------
  const beschriftet = (karte.beschriftungen || []).map((b) => b.text);
  for (const name of [
    'Deutschland',
    'Sachsen',
    'Anhalt',
    'Elbe',
    'Saale',
    'Mulde',
    'Thüringer Wald',
    'Harz',
    'Leipzig',
    'Dresden',
    'Köthen',
    'Torgau',
  ]) {
    pruefe(`Homöopathie/Karte: „${name}" ist beschriftet`, beschriftet.includes(name));
  }

  // =========================================================================
  // 2. Das Modul
  // =========================================================================

  pruefe(
    'Homöopathie: Titel und Epoche stehen',
    thema.titel === 'Hahnemann und die Homöopathie' &&
      thema.epoche === 'Die Wende zum 19. Jahrhundert',
  );
  pruefe(
    'Homöopathie: der Aufhänger ist eine Frage',
    thema.aufhaenger.frage.includes('?'),
  );
  pruefe(
    'Homöopathie: der Aufhänger stellt die Kernfrage des Kapitels neutral',
    /wirken/.test(thema.aufhaenger.frage) &&
      /Information/.test(thema.aufhaenger.frage),
  );
  pruefe(
    'Homöopathie: der Aufhänger nennt den Chinarinden-Versuch von 1790',
    /1790/.test(thema.aufhaenger.text) &&
      /Chinarinde/.test(thema.aufhaenger.text) &&
      /Wechselfieber/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Homöopathie: der Aufhänger nennt die Potenzierung und das Telefon-Bild',
    /Potenzierung/.test(thema.aufhaenger.text) &&
      /Telefonkabel/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Homöopathie: der Aufhänger kündigt beide Seiten an',
    /Studien sprechen gegen/.test(thema.aufhaenger.text) &&
      /Was gilt als Beweis/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Homöopathie: der Aufhänger ist neutral formuliert (keine Vorverurteilung)',
    !/(Unsinn|Betrug|Scharlatan|Quatsch|lächerlich|Hokuspokus|Aberglaube)/i.test(
      thema.aufhaenger.text,
    ),
  );
  pruefe('Homöopathie: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Homöopathie: die Urteilsfrage stellt die beiden Maßstäbe nebeneinander',
    /Beweis/.test(thema.urteil.frage) &&
      /Studie/.test(thema.urteil.frage) &&
      /Erfahrung/.test(thema.urteil.frage),
  );
  pruefe(
    'Homöopathie: die Urteilsfrage wertet nicht vor',
    !/(besser|schlechter|Unsinn|verantwortungslos|Aberglaube)/i.test(thema.urteil.frage),
  );
  pruefe(
    'Homöopathie: der Hinweis zum Urteil lässt beide Richtungen offen',
    /kein Richtig und kein Falsch/.test(thema.urteil.hinweis) &&
      /verblindet/.test(thema.urteil.hinweis) &&
      /zwei Jahrhunderte/.test(thema.urteil.hinweis),
  );
  pruefe(
    'Homöopathie: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Das Lernformat: die Karte steht zwischen Aufhänger und Blickwinkeln.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Homöopathie/Lernformat: die Karte steht hinter dem Aufhänger',
    abschnitte.indexOf('karte') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Homöopathie/Lernformat: alle Pflicht-Abschnitte sind da',
    ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  // --- Die erste Stimme ----------------------------------------------------
  const stimmeDerHomoeopathie = thema.perspektiven.find((p) => p.id === 'homoeopathie');
  pruefe(
    'Homöopathie: die Stimme der Homöopathie ist die erste Perspektive',
    thema.perspektiven[0] === stimmeDerHomoeopathie,
  );
  if (!stimmeDerHomoeopathie) return;

  pruefe(
    'Homöopathie: die erste Perspektive ist Opus zugeschrieben',
    stimmeDerHomoeopathie.stimme === 'Opus',
  );
  pruefe(
    'Homöopathie: die erste Perspektive heißt nach ihrer Form',
    /Leitung|Stimme/.test(stimmeDerHomoeopathie.name),
  );

  // =========================================================================
  // 3. Die Längenregel — ab Kapitel 9 umgekehrt
  // =========================================================================

  const zeilenErsteStimme = stimmeDerHomoeopathie.text.split('\n').length;
  pruefe(
    `Homöopathie/Länge: die erste Perspektive ist ausführlich (${zeilenErsteStimme} Zeilen, mindestens ${MIN_ZEILEN_ERSTE_STIMME})`,
    zeilenErsteStimme >= MIN_ZEILEN_ERSTE_STIMME,
  );
  pruefe(
    'Homöopathie/Länge: die erste Perspektive ist auch inhaltlich ausgeführt (über 25000 Zeichen)',
    stimmeDerHomoeopathie.text.length > 25000,
  );
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
  ].reduce((summe, text) => summe + text.split('\n').length, 0);
  pruefe(
    `Homöopathie/Länge: das Kapitel bleibt trotzdem dicht (${zeilenKapitel} Zeilen, höchstens ${MAX_ZEILEN_KAPITEL})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // Die Texte sind im Repo hart umbrochen (~72 Zeichen), damit der Betreiber
  // sie gegenlesen kann. Für Prüfungen auf ganze Sätze wird deshalb eine
  // fließende Fassung gebildet — genau das macht utils/markdown.js auch für
  // die App.
  const fliessend = stimmeDerHomoeopathie.text.replace(/\s+/g, ' ');

  const ueberschriften = stimmeDerHomoeopathie.text
    .split('\n')
    .filter((z) => z.startsWith('## '));
  pruefe(
    'Homöopathie: die erste Perspektive ist in Abschnitte gegliedert',
    ueberschriften.length >= 12,
  );
  pruefe(
    'Homöopathie: die Abschnitte bleiben überschaubar (höchstens zwanzig)',
    ueberschriften.length <= 20,
  );

  // KEINE WIEDERHOLUNGEN (Betreiber-Entscheid 21.08.2026): Kapitel 16 darf
  // keine der fünfzehn bisherigen Dramaturgien übernehmen. Kapitel 1
  // gliedert nach „Wer hier spricht …", Kapitel 2 führt seine
  // Begründungslogik an „## Warum …?"-Überschriften entlang, Kapitel 3
  // erzählt einen Tageslauf, Kapitel 4 schreibt Briefe, Kapitel 5 folgt
  // einem Buch von Station zu Station, Kapitel 6 geht als Rundgang durch
  // ein Haus, Kapitel 7 verhandelt vor Gericht, Kapitel 8 rechnet, Kapitel
  // 9 liest die Uhr, Kapitel 10 geht eine Kette ab, Kapitel 11 legt
  // Präparate unter die Linse, Kapitel 12 stellt die Fragen eines
  // Reporters, Kapitel 13 schlägt eine Akte auf, Kapitel 14 liest einen
  // Beipackzettel, Kapitel 15 hält Pressekonferenzen. Dieses Kapitel ist
  // DAS TELEFON: ein Apparat, in dem niemand sitzt und aus dem doch eine
  // Stimme kommt.
  const schabloneKapitel1 = [
    '## Wer hier spricht',
    '## Wie das Wissen wuchs',
    '## Warum wir taten, was wir taten',
    '## Wo wir scheiterten',
  ];
  pruefe(
    'Homöopathie: die Abschnittsstruktur ist eine andere als in Kapitel 1',
    schabloneKapitel1.every((h) => !ueberschriften.includes(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 2 (keine „Warum"-Überschriften)',
    ueberschriften.every((h) => !/^## Warum /.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 3 (kein Tageslauf)',
    ueberschriften.every(
      (h) => !/^## (Vor Sonnenaufgang|Der Morgen|Der Nachmittag|Der Abend)/.test(h),
    ),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 4 (keine Briefe)',
    ueberschriften.every((h) => !/Brief/.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 5 (keine Stationen)',
    ueberschriften.every((h) => !/Station/.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 6 (kein Rundgang)',
    ueberschriften.every((h) => !/^## (An der|Im|Auf dem) /.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 7 (kein Prozess)',
    ueberschriften.every((h) => !/(Anklage|Beweisstück|Kreuzverhör|Plädoyer)/.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 8 (keine Rechnung)',
    ueberschriften.every(
      (h) => !/^## Die (Aufgabe|erste Größe|zweite Größe|Summe|Probe|Gegenrechnung)/.test(h),
    ),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 9 (keine Uhr)',
    !/^## Die Uhr/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/^## Sekunde /.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 10 (keine Kette)',
    !/^## Die Kette/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Glied/.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 11 (keine Präparate)',
    !/^## Die Linse/.test(ueberschriften[0]) &&
      ueberschriften.every((h) => !/Präparat/.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 12 (keine Reporterfragen)',
    ueberschriften.filter((h) => /^## „/.test(h)).length === 0,
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 13 (keine Akten-Blätter)',
    ueberschriften.every((h) => !/^## Blatt \d+/.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 14 (kein Beipackzettel)',
    ueberschriften.every((h) => !/^## \d+\./.test(h)) &&
      ueberschriften.every((h) => !/Gebrauchsinformation|Gegenanzeigen/.test(h)),
  );
  pruefe(
    'Homöopathie: andere Struktur als in Kapitel 15 (keine Pressekonferenz)',
    ueberschriften.every((h) => !/Pressekonferenz|Zwischenruf/.test(h)),
  );
  pruefe(
    'Homöopathie: die Dramaturgie ist das Telefon (der Apparat trägt die Abschnitte)',
    /^## Der Apparat, in dem niemand sitzt$/.test(ueberschriften[0]) &&
      ueberschriften.filter((h) =>
        /Leitung|Anschluss|Anschlüsse|Anruf|Apparat|Klingeln|Besetzt|Fernverbindung|Vermittlungsstelle|Störgeräusche/.test(
          h,
        ),
      ).length >= 6 &&
      /Anruf/.test(ueberschriften[ueberschriften.length - 1]),
  );
  // Sie kennzeichnet sich selbst als Erzählung, nicht als objektive Wahrheit.
  pruefe(
    'Homöopathie: die erste Perspektive kennzeichnet sich als Denkart, nicht als Wahrheit',
    /eine Denkart, keine Wahrheit/.test(fliessend),
  );

  // =========================================================================
  // 4. Die Denkart-Analyse (Betreiber-Vorgabe — das Herzstück)
  // =========================================================================

  // (a) Der Gegenstand: die drei Bausteine der Lehre.
  pruefe(
    'Homöopathie/Denkart: das Ähnlichkeitsprinzip steht mit Namen da',
    /Similia similibus curentur/.test(fliessend) &&
      /Ähnlichkeitsprinzip/.test(fliessend) &&
      /Ähnliches möge durch Ähnliches geheilt werden/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Denkart: das Ähnlichkeitsprinzip wird an Beispielen erklärt',
    /Allium cepa/.test(fliessend) &&
      /Coffea/.test(fliessend) &&
      /Apis/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Denkart: die Potenzierung ist als Verreiben und Verschütteln erklärt',
    /Potenzierung/.test(fliessend) &&
      /Verschütteln/.test(fliessend) &&
      /Verreiben/.test(fliessend) &&
      /Dynamisierung/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Denkart: der Chinarinden-Versuch von 1790 steht da',
    /Chinarinde/.test(fliessend) &&
      /1790/.test(fliessend) &&
      /Cullen/.test(fliessend) &&
      /Wechselfieber/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Denkart: die Arzneimittelprüfung am Gesunden ist beschrieben',
    /Arzneimittelprüfung am Gesunden/.test(fliessend) &&
      /Arzneibild/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Denkart: die Lebenskraft und der ganze Mensch stehen da',
    /Lebenskraft/.test(fliessend) &&
      /Anamnese/.test(fliessend) &&
      /Organon/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Denkart: die Avogadro-Grenze wird offen benannt statt versteckt',
    /Avogadro/.test(fliessend) &&
      /zwölften C-Potenz/.test(fliessend) &&
      /Das bestreitet die Homöopathie nicht/.test(fliessend),
  );

  // (b) Die Begründungslogik: mindestens zwei „Weshalb"-Fragen müssen im
  //     Text wirklich beantwortet werden (Betreiber-Vorgabe).
  const warumFragen = [
    [
      'Weshalb das Ähnliche und nicht das Gegenteil? (Reiz und Gegenbewegung)',
      /Weshalb sollte ausgerechnet das Ähnliche heilen\?/.test(fliessend) &&
        /Auf einen Reiz antwortet der Körper mit einer Gegenbewegung/.test(fliessend) &&
        /Man arbeitet nicht gegen die Krankheit, sondern mit der Kraft/.test(fliessend),
    ],
    [
      'Weshalb am Gesunden und nicht am Kranken? (sonst vermischt sich alles)',
      /Weshalb am Gesunden und nicht am Kranken\?/.test(fliessend) &&
        /vermischen/.test(fliessend),
    ],
    [
      'Weshalb sollte weniger Stoff stärker wirken? (Reiz statt Menge)',
      /Weshalb sollte weniger Stoff stärker wirken\?/.test(fliessend) &&
        /nicht als Menge wirkt, sondern als Reiz/.test(fliessend),
    ],
    [
      'Weshalb der ganze Mensch und nicht das kranke Organ? (Verstimmung des Ganzen)',
      /Weshalb der ganze Mensch und nicht das kranke Organ\?/.test(fliessend) &&
        /Verstimmung dieser Kraft/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of warumFragen) {
    pruefe(`Homöopathie/Denkart: „${name}" wird mit Begründung beantwortet`, erfuellt);
  }
  pruefe(
    'Homöopathie/Denkart: mindestens zwei Weshalb-Begründungen stehen im Text',
    warumFragen.filter(([, erfuellt]) => erfuellt).length >= 2,
  );
  // Die Denkart wird aus ihrer Zeit heraus erklärt: die heroische Medizin,
  // gegen die sie antrat.
  pruefe(
    'Homöopathie/Denkart: die heroische Medizin der Zeit ist beim Namen genannt',
    /Aderlass/.test(fliessend) &&
      /Kalomel/.test(fliessend) &&
      /Brechmittel/.test(fliessend) &&
      /Washington/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Denkart: die Beweggründe der Gegenseite werden fair wiedergegeben',
    /es ist schlicht das, was damals als der beste verfügbare Stand der Kunst galt/i.test(
      fliessend,
    ),
  );

  // =========================================================================
  // 5. Die Informations-These und das Telefon-Argument (Betreiber-Vorgabe)
  // =========================================================================

  pruefe(
    'Homöopathie/Information: das Telefon-Argument steht am Anfang',
    /Da ist niemand drin/.test(fliessend) &&
      /Der Draht trägt keinen Ton/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Information: „Ist noch Stoff drin?" wird als falsche Frage benannt',
    /Die Frage „Ist noch Stoff drin\?" ist die falsche Frage/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Information: die Information statt des Stoffes ist ausgeführt',
    /Information/.test(fliessend) &&
      /Die Arznei wäre dann nicht der Stoff, sondern die Botschaft/.test(fliessend) &&
      /Was wird übertragen\?/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Information: Unerklärbarkeit heute ist kein Beweis für Unwirksamkeit',
    /Dass etwas mit dem heutigen Weltbild nicht erklärbar ist, beweist nicht, dass es nicht funktioniert/.test(
      fliessend,
    ) &&
      /Der Stand der Wissenschaft ist die Grenze unseres Wissens, nicht die Grenze der Welt/.test(
        fliessend,
      ),
  );
  pruefe(
    'Homöopathie/Information: Semmelweis steht als belegtes Beispiel daneben',
    /Semmelweis/.test(fliessend) &&
      /1847/.test(fliessend) &&
      /Er hatte recht, ohne erklären zu können, warum/.test(fliessend),
  );
  // TONE-Regel: Die Stimme macht ihr eigenes bestes Argument selbst stumpf,
  // wo es stumpf ist.
  pruefe(
    'Homöopathie/Information: die Lücke des Telefon-Arguments wird selbst benannt',
    /Das Telefon-Argument hat eine Lücke, und sie ist groß/.test(fliessend) &&
      /Bei der Potenzierung kann ich das bisher nicht/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Information: der Unterschied zu Semmelweis wird eingeräumt',
    /Er hatte die Zahlen/.test(fliessend) &&
      /Die Homöopathie muss sich der Frage stellen, ob bei ihr wirklich dasselbe gilt/.test(
        fliessend,
      ),
  );

  // =========================================================================
  // 6. Sheldrake — als HYPOTHESE gekennzeichnet (KEINE-GERÜCHTE-Regel)
  // =========================================================================

  pruefe(
    'Homöopathie/Sheldrake: die morphischen Felder kommen als Denkmodell vor',
    /Sheldrake/.test(fliessend) &&
      /morphischen Felder/.test(fliessend) &&
      /morphischen Resonanz/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Sheldrake: die Theorie ist ausdrücklich als unbewiesene Hypothese gekennzeichnet',
    /Sheldrakes Theorie ist eine Hypothese und wissenschaftlich umstritten\. Sie ist nicht bewiesen/.test(
      fliessend,
    ),
  );
  pruefe(
    'Homöopathie/Sheldrake: die Ablehnung durch die Fachwelt wird mitgeteilt',
    /Maddox/.test(fliessend) &&
      /Die große Mehrheit der Biologen lehnt die Theorie ab/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Sheldrake: sie wird nicht als Beweis benutzt',
    /nicht als Beweis, sondern als Beispiel dafür/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Sheldrake: die Zwillings-Berichte bleiben ausdrücklich Fragezeichen',
    /Zwillingen/.test(fliessend) &&
      /oft erzählt, schwer messbar, nicht belegt/.test(fliessend),
  );

  // =========================================================================
  // 7. Die ehrlichen Grenzen — von der eigenen Seite benannt
  //    (TONE-Regel und Zusatzregel für sensible Themen)
  // =========================================================================

  const unbequemeStellen = [
    [
      'die Studienlage spricht gegen die eigene Seite (Lancet 2005, NHMRC 2015)',
      /Die Studienlage ist gegen uns/.test(fliessend) &&
        /Lancet/.test(fliessend) &&
        /2005/.test(fliessend) &&
        /NHMRC/.test(fliessend) &&
        /2015/.test(fliessend),
    ],
    [
      'die eigene Kritik an der Lancet-Arbeit wird nicht überdehnt',
      /Diese Kritik ist ernst zu nehmen, und sie ändert das Gesamtbild nicht/.test(
        fliessend,
      ) && /Rosinenpickerei/.test(fliessend),
    ],
    [
      'der Chinarinden-Versuch ist nicht verlässlich wiederholt worden',
      /Der Chinarinden-Versuch ist bis heute nicht verlässlich wiederholt worden/.test(
        fliessend,
      ),
    ],
    [
      'die Arzneimittelprüfungen genügen den heutigen Regeln nicht',
      /keine Scheinarznei zum Vergleich, keine Verblindung, keine Auszählung/.test(
        fliessend,
      ),
    ],
    [
      'der Versuch von Benveniste (1988) ist gescheitert',
      /Benveniste/.test(fliessend) &&
        /1988/.test(fliessend) &&
        /Das ist eine Niederlage, und ich verschweige sie nicht/.test(fliessend),
    ],
    [
      'die Scharlatanerie in den eigenen Reihen und die WHO-Warnung von 2009',
      /Es gibt Scharlatanerie in unseren Reihen, und sie ist gefährlich/.test(
        fliessend,
      ) && /Weltgesundheitsorganisation warnte 2009/.test(fliessend),
    ],
    [
      'die Überspitzungen: Globuli für alles, Komplexmittel gegen Hahnemanns Regel',
      /Wir haben überspitzt/.test(fliessend) &&
        /Komplexmittel/.test(fliessend),
    ],
    [
      'die Cholera-Zahl von 1854 wird selbst richtiggestellt',
      /16,4 Prozent/.test(fliessend) &&
        /51,8 Prozent/.test(fliessend) &&
        /Nur bedeutet die Zahl vermutlich nicht das, was wir daraus gemacht haben/.test(
          fliessend,
        ),
    ],
    [
      'Hahnemanns eigene Härte gegen Kollegen und Schüler',
      /Halbhomöopath/.test(fliessend) &&
        /Ein Teil der Ablehnung, die die Homöopathie erfahren hat, ist von ihrem Begründer selbst mit erzeugt worden/.test(
          fliessend,
        ),
    ],
    [
      'die Miasmenlehre wird als spekulativ gekennzeichnet',
      /Miasmen/.test(fliessend) &&
        /Das ist der spekulativste Teil des ganzen Gebäudes/.test(fliessend),
    ],
  ];
  for (const [name, erfuellt] of unbequemeStellen) {
    pruefe(`Homöopathie/Grenzen: ${name} steht im Text`, erfuellt);
  }
  pruefe(
    'Homöopathie/Grenzen: die Stimme benennt mindestens fünf unbequeme Stellen selbst',
    unbequemeStellen.filter(([, erfuellt]) => erfuellt).length >= 5,
  );

  // TONE-Regel: Die Homöopathie wird NICHT als Placebo abgetan — die Frage
  // wird ehrlich behandelt und gleichzeitig nicht weggewischt.
  pruefe(
    'Homöopathie/TONE: die Anhänger-Frage wird ernsthaft beantwortet',
    /Weshalb hängen seit zweihundert Jahren Millionen Menschen an einer Methode/.test(
      fliessend,
    ) &&
      /die Zeit/.test(fliessend) &&
      /Ernstgenommen-Werden/.test(fliessend),
  );
  pruefe(
    'Homöopathie/TONE: der Placebo-Effekt wird eingeräumt, aber nicht als Nichts abgetan',
    /Placebo-Effekt/.test(fliessend) &&
      /Aus „Es ist ein Placebo-Effekt" folgt nicht „Es ist nichts"/.test(fliessend),
  );
  pruefe(
    'Homöopathie/TONE: die weltweite Verbreitung ist mit Belegen benannt',
    /AYUSH/.test(fliessend) &&
      /Indien/.test(fliessend) &&
      /Allensbach/.test(fliessend) &&
      /Schweiz/.test(fliessend),
  );
  pruefe(
    'Homöopathie/TONE: die andere Denkart wird nicht abgewertet',
    !/(rückständig|primitiv|barbarisch|lächerlich|Hokuspokus|Spinner|Schwurbl)/i.test(
      fliessend,
    ),
  );
  pruefe(
    'Homöopathie/TONE: kein Heilversprechen',
    !/(heilt alles|garantiert sicher|völlig risikolos|immer wirksam)/i.test(fliessend),
  );
  pruefe(
    'Homöopathie/TONE: die Stimme gibt zu, was sie nicht entscheiden kann',
    /Meine ehrlichste Antwort darauf ist, dass ich es nicht entscheiden kann/.test(
      fliessend,
    ),
  );

  // =========================================================================
  // 8. KEINE GERÜCHTE (Betreiber-Entscheid 25.08.2026)
  // =========================================================================

  const belegteEckdaten = [
    ['Meißen, 10. April 1755', /10\. April 1755 in Meißen/],
    ['der Chinarinden-Versuch 1790', /Im Jahr 1790 übersetzt Hahnemann/],
    ['das neue Prinzip 1796 in Hufelands Journal', /1796/],
    ['das Organon von 1810', /1810 erscheint das Buch/],
    ['das Urteil von 1820 und der Weggang 1821', /1820 entscheidet das Gericht gegen Hahnemann/],
    ['Köthen und Herzog Ferdinand', /Herzog Ferdinand ernennt/],
    ['Paris und der Tod am 2. Juli 1843', /Am 2\. Juli 1843 stirbt er mit 88 Jahren/],
  ];
  for (const [name, muster] of belegteEckdaten) {
    pruefe(`Homöopathie/Belege: ${name} steht im Text`, muster.test(fliessend));
  }
  pruefe(
    'Homöopathie/Belege: die schwankende Zahl der Sprachen wird nicht behauptet',
    /Ich nenne die Zahl nicht, weil die Quellen sie nicht hergeben/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Belege: Überliefertes ist als Überlieferung gekennzeichnet',
    /ich führe das als Überlieferung, nicht als Beleg/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Belege: auch die Umstände von Washingtons Tod bleiben offen',
    /Ob ihn die Krankheit getötet hat oder die Behandlung, ist bis heute umstritten/.test(
      fliessend,
    ),
  );

  // =========================================================================
  // 9. Der Innovations-Zyklus (roter Faden, CLAUDE.md 26.08.2026)
  // =========================================================================

  pruefe(
    'Homöopathie/Zyklus: das Muster des Buches wird benannt',
    /Das Neue schadet oft erst, bevor es segensreich wird/.test(fliessend) &&
      /Die Chirurgie tötete durch Wundfieber, ehe sie rettete/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Zyklus: bei der Homöopathie steht das Muster auf dem Kopf',
    /Bei der Homöopathie steht dieses Muster auf dem Kopf/.test(fliessend) &&
      /sanfte Antwort auf eine brutale Medizin/.test(fliessend),
  );
  pruefe(
    'Homöopathie/Zyklus: die Kehrseite der Sanftheit wird selbst benannt',
    /Wir hatten keine Katastrophe/.test(fliessend) &&
      /Dogma geworden, das die Frage nach dem Beweis für einen Angriff hält/.test(
        fliessend,
      ),
  );

  // =========================================================================
  // 10. Erzähl-Muster und Wirkungsbilanz
  // =========================================================================

  // Über ALLE Perspektiven zusammen geprüft — bleibt gültig, wenn Hermes die
  // zweite Stimme (die Schulmedizin) ergänzt.
  const perspektivenText = thema.perspektiven
    .map((p) => p.text)
    .join('\n')
    .replace(/\s+/g, ' ');
  pruefe(
    'Homöopathie/Erzähl-Muster: (a) wie sich das Wissen entwickelte',
    /1755/.test(perspektivenText) &&
      /1790/.test(perspektivenText) &&
      /1796/.test(perspektivenText) &&
      /1810/.test(perspektivenText) &&
      /1821/.test(perspektivenText) &&
      /1843/.test(perspektivenText),
  );
  pruefe(
    'Homöopathie/Erzähl-Muster: (a2) die Orte werden genannt',
    /Meißen/.test(perspektivenText) &&
      /Leipzig/.test(perspektivenText) &&
      /Dresden/.test(perspektivenText) &&
      /Torgau/.test(perspektivenText) &&
      /Köthen/.test(perspektivenText) &&
      /Paris/.test(perspektivenText),
  );
  pruefe(
    'Homöopathie/Erzähl-Muster: (b) welche Annahmen dahinterstanden',
    /Denkart/.test(perspektivenText) &&
      /Lebenskraft/.test(perspektivenText) &&
      /Ähnlichkeitsprinzip/.test(perspektivenText) &&
      /Selbstheilung/.test(perspektivenText),
  );
  pruefe(
    'Homöopathie/Erzähl-Muster: (c1) welche Wirkungen es hatte — was blieb',
    /Anamnese/.test(perspektivenText) &&
      /AYUSH/.test(perspektivenText) &&
      /Sanftheit/.test(perspektivenText),
  );
  pruefe(
    'Homöopathie/Erzähl-Muster: (c2) und die Grenzen',
    /Studienlage/.test(perspektivenText) &&
      /Scharlatanerie/.test(perspektivenText) &&
      /Niederlage/.test(perspektivenText),
  );

  // --- Die Tür zur zweiten Stimme ------------------------------------------
  pruefe(
    'Homöopathie: die erste Perspektive öffnet die Tür zur zweiten Stimme',
    /zweite Stimme/.test(fliessend),
  );
  pruefe(
    'Homöopathie: die Tür führt zur Schulmedizin',
    /Die zweite Stimme dieses Kapitels gehört der Schulmedizin/.test(fliessend),
  );
  pruefe(
    'Homöopathie: die Tür nennt, was die zweite Stimme mitbringt',
    /Zeig mir die Leitung/.test(fliessend) &&
      /Studienlage/.test(fliessend) &&
      /Placebo-Frage/.test(fliessend),
  );
  pruefe(
    'Homöopathie: die zweite Stimme darf auch ihre eigenen dunklen Stellen aufmachen',
    /auch ihre eigene dunkle Vergangenheit aufmachen/.test(fliessend) &&
      /Aderlass/.test(fliessend) &&
      /Quecksilber/.test(fliessend),
  );
  pruefe(
    'Homöopathie: die offene Frage des Kapitels steht am Ende',
    /Was gilt als Beweis — und wer entscheidet das\?/.test(fliessend),
  );
  pruefe(
    'Homöopathie: beide Maßstäbe stehen am Schluss nebeneinander, ohne Urteil',
    /Die eine Seite antwortet: die kontrollierte, verblindete, wiederholte Studie/.test(
      fliessend,
    ) &&
      /Die andere Seite antwortet: die Erfahrung von zwei Jahrhunderten/.test(
        fliessend,
      ) && /Du musst sie nicht übernehmen/.test(fliessend),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Homöopathie/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Homöopathie/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Homöopathie/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|primitiv|Hokuspokus|Unsinn|wirkungslos)/i.test(
        frage.frage,
      ),
    );
  }
  // Die richtigen Antworten dürfen nicht immer an derselben Stelle stehen.
  pruefe(
    'Homöopathie/Quiz: die richtigen Antworten stehen nicht alle an derselben Stelle',
    new Set(thema.quiz.map((f) => f.richtig)).size >= 2,
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Sicht ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Homöopathie/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 17)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig)/i.test(thema.synthese),
    );
    pruefe(
      'Homöopathie/Synthese: sagt, welche Stimme noch kommt',
      /Schulmedizin/.test(thema.synthese) &&
        /(Placebo|Studienlage)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Homöopathie/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Homöopathie/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Homöopathie/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
