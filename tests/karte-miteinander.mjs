// Prüfungen für Kapitel 20 — „Das Miteinander?", das letzte Kapitel.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine UI-Importe:
// läuft mit blankem `node`.
//
// KEIN ATLAS-TEST. Dieses Kapitel hat KEINE Karte — das Miteinander hat
// keine Geografie (Betreiber-Logik, wie bei Pharmaindustrie, mRNA und der
// Medizin von morgen). Der Dateiname folgt trotzdem dem Muster der übrigen
// Kapitel-Tests, damit die Runden-Methode eine Datei je Kapitel behält.
//
// INHALT (Betreiber-Vorgabe 29.08.2026): Das Corona-Thema war in Kapitel 15
// abgehandelt und gehört NICHT ins Finale. Stattdessen versammelt der runde
// Tisch die Figuren des Buches selbst (Ägypter, Chinese, Inder,
// Hippokrates, Avicenna, Hahnemann, Kneipp, Katalin Karikó, die zwei KIs ...), die
// kurz miteinander reden — „nur als knappes Schlusswort und nicht als
// endloses Kapitel" (Betreiber). Deshalb gilt eine KNAPPE Längengrenze.
//
// Geprüft wird: das Modul ohne Karte, die Figuren am Tisch, die
// Gemeinsamkeit der Stimmen (alle wollten helfen; Denkart bestimmt
// Methode), die Kernbotschaft („Nicht spalten, sondern argumentieren"),
// die TONE-Regel (keine Dämonisierung), Quiz-Umfang, offene Urteilsfrage,
// die Knappheit — und das AUTORENWORT.
//
// DAS AUTORENWORT IST HEILIG. Es ist der einzige Text des Buches, der
// nicht von einer KI stammt: das Schlusswort des Betreibers, wörtlich und
// unverbessert. Die Prüfungen dazu sind deshalb bewusst TOLERANT
// formuliert — sie stellen sicher, dass der Text da ist, vollständig ist
// und die Unterschrift trägt. Sie prüfen NICHT den Wortlaut Satz für Satz,
// denn ein Test darf diesen Text nicht in eine Form zwingen.
//
// ZUSTANDSTOLERANT gebaut: Die zweite Perspektive (DeepSeek) und die
// endgültige Synthese kamen mit dem Hermes-Pass dazu. Prüfungen, die nur
// für die erste Stimme gelten, hängen an ihrer id („miteinander-opus").
// Die Synthese wird nach der ZAHL der Perspektiven unterschiedlich
// geprüft, nicht nach ihrem Wortlaut.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { abschnitteFuer } = require('../utils/lernformat.js');
const { pruefeThema } = require('../utils/themen/schema.js');
const { themaNachId } = require('../utils/themen/index.js');

/**
 * Obergrenze für die Länge des Kapitels in Zeilen.
 *
 * Der Betreiber will das letzte Kapitel KNAPP: „nur als knappes
 * Schlusswort und nicht als endloses Kapitel." Die Grenze ist deshalb
 * deutlich niedriger als bei den ausführlichen Kapiteln (2200–2400) und
 * muss auch nach dem Hermes-Pass noch reichen.
 */
const MAX_ZEILEN_KAPITEL = 1200;

/** Mindestlänge des Autorenworts — es ist ein Schlusswort, kein Gruß. */
const MIN_ZEICHEN_AUTORENWORT = 1000;

/** Alle Texte eines Themas an einem Stück — für Schlagwort-Prüfungen. */
function alleTexte(thema) {
  const stuecke = [thema.aufhaenger.frage, thema.aufhaenger.text, thema.synthese];
  stuecke.push(thema.urteil.frage, thema.urteil.hinweis || '');
  for (const perspektive of thema.perspektiven) stuecke.push(perspektive.text);
  for (const frage of thema.quiz) {
    stuecke.push(frage.frage, frage.erklaerung, ...frage.antworten);
  }
  return stuecke.join('\n');
}

/**
 * @param {(name: string, ok: boolean) => void} pruefe Prüf-Funktion des Rahmens
 */
export function laufe(pruefe) {
  const thema = themaNachId('miteinander');
  pruefe(
    'Miteinander: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // =========================================================================
  // 1. Das Modul ohne Karte
  // =========================================================================

  pruefe('Miteinander: erfüllt das Themen-Schema', pruefeThema(thema).length === 0);
  pruefe(
    'Miteinander: Titel und Epoche stehen',
    thema.titel === 'Das Miteinander?' && thema.epoche === 'Gegenwart',
  );
  pruefe(
    'Miteinander: das Kapitel hat bewusst keine Karte',
    thema.karte === undefined,
  );

  // Das Lernformat: ohne Karte rücken die übrigen Abschnitte auf — und ganz
  // am Ende steht das Schlusswort des Autors.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Miteinander/Lernformat: der Karten-Abschnitt entfällt',
    !abschnitte.includes('karte'),
  );
  pruefe(
    'Miteinander/Lernformat: auf den Aufhänger folgen die Blickwinkel',
    abschnitte.indexOf('perspektiven') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Miteinander/Lernformat: alle übrigen Pflicht-Abschnitte sind da',
    ['aufhaenger', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );
  pruefe(
    'Miteinander/Lernformat: das Schlusswort des Autors ist der letzte Abschnitt',
    abschnitte[abschnitte.length - 1] === 'autorenwort',
  );

  pruefe('Miteinander: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe('Miteinander: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Miteinander: das Urteil gibt einen Denkanstoß',
    Boolean(thema.urteil.hinweis && thema.urteil.hinweis.length > 200),
  );
  pruefe(
    'Miteinander: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Der Aufhänger kündigt den Tisch der Zeiten und das Schlusswort an.
  pruefe(
    'Miteinander: der Aufhänger kündigt die Versammlung der Figuren an',
    /(Ägypter|Hippokrates|Kneipp|Karikó)/.test(thema.aufhaenger.text) &&
      /alle noch einmal/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Miteinander: der Aufhänger nennt die Miteinander-Frage',
    /Miteinander existieren/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Miteinander: der Aufhänger kündigt das Schlusswort des Autors an',
    /Schlusswort des Autors/.test(thema.aufhaenger.text) &&
      /(wörtlich|unverbessert)/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Miteinander: der Aufhänger nennt beide KI-Stimmen',
    /Opus/.test(thema.aufhaenger.text) && /DeepSeek/.test(thema.aufhaenger.text),
  );

  // --- Die Längenregel: KNAPP (Betreiber-Vorgabe „nur als knappes
  // Schlusswort") ----------------------------------------------------------
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
    thema.urteil.hinweis || '',
    thema.autorenwort || '',
  ]
    .join('\n')
    .split('\n').length;
  pruefe(
    `Miteinander/Länge: das Kapitel bleibt unter ${MAX_ZEILEN_KAPITEL} Zeilen (${zeilenKapitel})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // =========================================================================
  // 2. DAS AUTORENWORT — das Schlusswort des Betreibers
  // =========================================================================
  // Tolerant geprüft: vorhanden, vollständig, unterschrieben. Kein Test
  // schreibt diesem Text vor, wie er zu klingen hat.

  const autorenwort =
    typeof thema.autorenwort === 'string'
      ? thema.autorenwort
      : (thema.autorenwort && thema.autorenwort.text) || '';

  pruefe(
    'Miteinander/Autorenwort: das Feld ist vorhanden',
    typeof autorenwort === 'string' && autorenwort.trim().length > 0,
  );
  pruefe(
    `Miteinander/Autorenwort: es ist ein Schlusswort, kein Gruß (über ${MIN_ZEICHEN_AUTORENWORT} Zeichen)`,
    autorenwort.length > MIN_ZEICHEN_AUTORENWORT,
  );
  pruefe(
    'Miteinander/Autorenwort: es trägt die Unterschrift des Autors',
    /Stephan Hink/.test(autorenwort),
  );
  pruefe(
    'Miteinander/Autorenwort: der Autor nennt seinen Beruf und sein Land',
    /Heilpraktiker aus Dänemark/.test(autorenwort),
  );
  pruefe(
    'Miteinander/Autorenwort: die Kernbotschaft oder die Miteinander-Frage klingt an',
    /miteinander/i.test(autorenwort) || /nicht gegeneinander/i.test(autorenwort),
  );
  pruefe(
    'Miteinander/Autorenwort: es ist in Absätze gegliedert (Leerzeilen erhalten)',
    autorenwort.split(/\n\s*\n/).length >= 5,
  );
  // Ein Schlusswort einer KI wäre kein Schlusswort des Autors: Das Feld
  // darf keiner KI-Stimme zugeschrieben sein.
  pruefe(
    'Miteinander/Autorenwort: es ist keiner Perspektive zugeordnet',
    thema.perspektiven.every((p) => p.text !== autorenwort),
  );

  // =========================================================================
  // 3. Die erste Stimme — Opus am Tisch der Zeiten
  // =========================================================================

  const opus = thema.perspektiven.find((p) => p.id === 'miteinander-opus');
  pruefe(
    'Miteinander: die erste Stimme ist die erste Perspektive',
    thema.perspektiven[0] === opus,
  );
  if (opus) {
    pruefe('Miteinander: die erste Perspektive ist Opus zugeschrieben', opus.stimme === 'Opus');
    pruefe(
      'Miteinander: die erste Perspektive ist ausgeführt (über 6000 Zeichen)',
      opus.text.length > 6000,
    );
    pruefe(
      'Miteinander: die erste Perspektive kennzeichnet sich als Denkart',
      /Denkart/.test(opus.text),
    );

    // --- Die Dramaturgie: der Tisch der Zeiten ---------------------------
    pruefe(
      'Miteinander/Dramaturgie: der Tisch der Zeiten wird aufgebaut',
      /## Der Tisch, an dem alle Zeiten sitzen/.test(opus.text) &&
        /runde/.test(opus.text),
    );
    pruefe(
      'Miteinander/Dramaturgie: die Gäste sind die Figuren des Buches',
      /(Ägypter|Chinese|Inder)/.test(opus.text) &&
        /Hippokrates/.test(opus.text) &&
        /Avicenna/.test(opus.text) &&
        /Hahnemann/.test(opus.text) &&
        /Kneipp/.test(opus.text) &&
        /Karikó/.test(opus.text),
    );
    pruefe(
      'Miteinander/Dramaturgie: auch die zwei KIs sitzen am Tisch',
      /zwei KIs/.test(opus.text),
    );
    pruefe(
      'Miteinander/Dramaturgie/Belege: die Stimmen sind ausdrücklich gekürzt (keine neuen Kapitel)',
      /(sie haben ihre Kapitel bereits gehabt|kürze sie)/.test(opus.text),
    );

    // --- Die Gemeinsamkeit des Tisches ------------------------------------
    pruefe(
      'Miteinander/Tisch: alle wollten helfen — mit den Mitteln ihrer Zeit',
      /versucht, einen kranken/.test(opus.text) && /Menschen zu verstehen/.test(opus.text),
    );
    pruefe(
      'Miteinander/Tisch: die Denkart bestimmt die Methode (roter Faden)',
      /Denkart hat die Methode\s+bestimmt/.test(opus.text),
    );
    pruefe(
      'Miteinander/Tisch: keine Denkart war die ganze Wahrheit',
      /keine Denkart\s+war die ganze Wahrheit/.test(opus.text),
    );
    pruefe(
      'Miteinander/Tisch: der Tisch beschließt Zuhören statt Einigkeit',
      /(nicht einig sein, um miteinander zu sein|zuhören)/.test(opus.text),
    );

    // --- Die Kernbotschaft (Betreiber, 27.08.2026) ------------------------
    pruefe(
      'Miteinander/Kernbotschaft: „nicht spalten" steht im Text',
      /[Nn]icht spalten/.test(opus.text),
    );
    pruefe(
      'Miteinander/Kernbotschaft: „argumentieren" steht im Text',
      /argumentieren/.test(opus.text),
    );
    pruefe(
      'Miteinander/Kernbotschaft: die neuen Wege werden gemeinsam gegangen',
      /gemeinsam/.test(opus.text),
    );

    // --- Die offene Frage + die Übergabe ----------------------------------
    pruefe(
      'Miteinander: die Miteinander-Frage wird gestellt, nicht beantwortet',
      /Sollte nicht ein Miteinander\s+existieren/.test(opus.text) &&
        /Keiner antwortet/.test(opus.text),
    );
    pruefe(
      'Miteinander: der Stuhl des Autors bleibt leer',
      /Stuhl des Autors/.test(opus.text),
    );
    pruefe(
      'Miteinander: die Tür zur zweiten Stimme ist offen',
      /zweiten Stimme/.test(opus.text) && /DeepSeek/.test(opus.text),
    );
    pruefe(
      'Miteinander: die beiden Stimmen werden als gleichwertig bezeichnet',
      /gleichwertig/.test(opus.text) && /Reihenfolge ist Zufall/.test(opus.text),
    );

    // --- TONE: keine Dämonisierung ----------------------------------------
    pruefe(
      'Miteinander/TONE: keine Seite wird dämonisiert',
      !/(Verbrecher|Lügenpresse|Impfsekte|Schwurbler)/.test(opus.text),
    );
  }

  // =========================================================================
  // 4. Prüfungen über alle Stimmen — auch nach dem Hermes-Pass gültig
  // =========================================================================

  const perspektivenText = thema.perspektiven.map((p) => p.text).join('\n');
  pruefe(
    'Miteinander/Erzähl-Muster: (a) die Entwicklung ist über die Epochen erzählt',
    /(Papyrus|Kanon|Säfte|Doshas|Keime|Boten-RNA)/.test(perspektivenText),
  );
  pruefe(
    'Miteinander/Erzähl-Muster: (b) die Denkarten werden ausgesprochen',
    /(Denkart|Weltbild|Annahme)/.test(perspektivenText),
  );
  pruefe(
    'Miteinander/Erzähl-Muster: (c1) die Wirkungen — geholfen haben',
    /(geholfen|helfen|Zuwendung|gerettet)/.test(perspektivenText),
  );
  pruefe(
    'Miteinander/Erzähl-Muster: (c2) und die Grenzen',
    /(geirrt|Grenze|Blindheit|kostet)/.test(perspektivenText),
  );
  pruefe(
    'Miteinander: jede Perspektive ist einer Stimme zugeschrieben',
    thema.perspektiven.every((p) => typeof p.stimme === 'string' && p.stimme.length > 0),
  );
  pruefe(
    'Miteinander: die Perspektiven sind KI-Stimmen (wie in Kapitel 19)',
    thema.perspektiven.every((p) => ['Opus', 'DeepSeek'].includes(p.stimme)),
  );

  // Die Leitfragen des Kapitels müssen im Buch ankommen.
  const texte = alleTexte(thema);
  pruefe(
    'Miteinander/Leitfrage: die Kernbotschaft steht im Kapitel',
    /[Nn]icht spalten/.test(texte) && /argumentieren/.test(texte) && /gemeinsam/.test(texte),
  );
  pruefe(
    'Miteinander/Leitfrage: die Miteinander-Frage wird gestellt, nicht beantwortet',
    /Miteinander/.test(texte) && !/Die Antwort lautet/.test(thema.urteil.frage),
  );
  pruefe(
    'Miteinander/TONE: keine Seite wird dämonisiert',
    !/(Verbrecher|Lügenpresse|Impfsekte|Schwurbler)/.test(texte),
  );
  pruefe(
    'Miteinander/TONE: beide Seiten kommen mit ihren Gründen vor',
    /(nicht aus Bosheit|guten Glauben|Gründe der anderen Seite|jede Zeit hielt ihr Wissen)/.test(texte),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Miteinander/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Miteinander/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Miteinander/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|Schuld)/i.test(frage.frage),
    );
  }
  pruefe(
    'Miteinander/Quiz: es fragt Belegtes ab, keine Meinungen',
    thema.quiz.every((f) => /\d{4}|Prozent|mRNA|Kanon|Beweis|Säulen/.test(f.frage + f.erklaerung)),
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Miteinander/Synthese: legt offen, dass die zweite Sicht noch fehlt',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig|Als Nächstes|als Nächstes)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Miteinander/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Miteinander/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Miteinander/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
  // Unabhängig vom Ausbaustand: Die Synthese darf sich nicht an die Stelle
  // des Autorenworts setzen — das letzte Wort gehört dem Menschen.
  pruefe(
    'Miteinander/Synthese: verweist auf das Schlusswort des Autors',
    /(Schlusswort|Autor)/.test(thema.synthese),
  );
}
