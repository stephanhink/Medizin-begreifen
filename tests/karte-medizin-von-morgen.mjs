// Prüfungen für Kapitel 19 — „Die Medizin von morgen".
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine UI-Importe:
// läuft mit blankem `node`.
//
// KEIN ATLAS-TEST. Dieses Kapitel hat als erstes des Buches KEINE Karte —
// die Zukunft hat keine Geografie (Betreiber-Festlegung, wie bei
// Semmelweis, Pharmaindustrie und mRNA). Der Dateiname folgt trotzdem dem
// Muster der übrigen Kapitel-Tests, damit die Runden-Methode eine Datei je
// Kapitel behält. Statt der Küstenlinien wird hier geprüft, dass das Modul
// OHNE Karte sauber ist: Das Lernformat überspringt den Abschnitt „Medizin
// in Bewegung", und das Schema (tests/themen.mjs) nimmt das Modul
// automatisch mit.
//
// Geprüft wird ansonsten: das Erzähl-Muster (Entwicklung / Annahmen /
// Wirkungen), die Attribution der ersten Stimme (Opus als KI), die
// KEINE-GERÜCHTE-Regel in ihrer Zukunfts-Fassung (Belegtes mit Namen und
// Jahr; Visionen ausdrücklich als Vision gekennzeichnet), die TONE-Regel
// (Hochtechnik und einfache Medizin beide fair; nichts dämonisiert), die
// Schere MIT ihren Gegenbeispielen, die Sinnfrage MIT ihrer Gegenseite,
// die ehrliche Selbstauskunft der KI, der Innovations-Zyklus, die Brücken
// zu Kapitel 18 und 20, Quiz-Umfang, offene Urteilsfrage und die
// Längenregel.
//
// ZUSTANDSTOLERANT gebaut: Die zweite Perspektive („Die Stimme der
// zweiten KI", Hermes) und die endgültige Synthese kommen erst mit dem
// Hermes-Pass dazu. Prüfungen, die nur für die erste Stimme gelten, hängen
// deshalb an ihrer id („zukunft-opus"); die Prüfungen zum Erzähl-Muster
// laufen über ALLE Perspektiven zusammen und bleiben damit auch gültig,
// wenn weitere Stimmen dazukommen. Die Synthese wird je nach Ausbaustand
// unterschiedlich geprüft (siehe unten) — nach Zahl der Perspektiven, nicht
// nach ihrem Wortlaut.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { abschnitteFuer } = require('../utils/lernformat.js');
const { pruefeThema } = require('../utils/themen/schema.js');
const { themaNachId } = require('../utils/themen/index.js');

/**
 * Obergrenze für die Länge des Kapitels in Zeilen.
 *
 * Ab Kapitel 9 gilt die Umkehrung der Längenregel (CLAUDE.md): vollständig
 * und ausführlich. Die Grenze steht wie bei Kneipp und der einfachen
 * Medizin bei 2.200 Zeilen und soll nur das Ausufern verhindern, nicht die
 * Ausführlichkeit — sie muss auch nach dem Hermes-Pass noch reichen.
 */
const MAX_ZEILEN_KAPITEL = 2200;

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
  const thema = themaNachId('medizin-von-morgen');
  pruefe(
    'Medizin von morgen: das Thema ist in utils/themen/index.js registriert',
    Boolean(thema),
  );
  if (!thema) return;

  // =========================================================================
  // 1. Das Modul ohne Karte
  // =========================================================================

  pruefe('Medizin von morgen: erfüllt das Themen-Schema', pruefeThema(thema).length === 0);
  pruefe(
    'Medizin von morgen: Titel und Epoche stehen',
    thema.titel === 'Die Medizin von morgen' && thema.epoche === 'Zukunft',
  );
  pruefe(
    'Medizin von morgen: das Kapitel hat bewusst keine Karte',
    thema.karte === undefined,
  );

  // Das Lernformat: ohne Karte rücken die übrigen Abschnitte auf.
  const abschnitte = abschnitteFuer(thema).map((a) => a.id);
  pruefe(
    'Medizin von morgen/Lernformat: der Karten-Abschnitt entfällt',
    !abschnitte.includes('karte'),
  );
  pruefe(
    'Medizin von morgen/Lernformat: auf den Aufhänger folgen die Blickwinkel',
    abschnitte.indexOf('perspektiven') === abschnitte.indexOf('aufhaenger') + 1,
  );
  pruefe(
    'Medizin von morgen/Lernformat: alle übrigen Pflicht-Abschnitte sind da',
    ['aufhaenger', 'perspektiven', 'synthese', 'urteil', 'quiz'].every((id) =>
      abschnitte.includes(id),
    ),
  );

  pruefe('Medizin von morgen: der Aufhänger ist eine Frage', thema.aufhaenger.frage.includes('?'));
  pruefe('Medizin von morgen: die Urteilsfrage ist offen', thema.urteil.frage.includes('?'));
  pruefe(
    'Medizin von morgen: das Urteil gibt einen Denkanstoß',
    Boolean(thema.urteil.hinweis && thema.urteil.hinweis.length > 200),
  );
  pruefe(
    'Medizin von morgen: das Quiz hat 3 bis 5 Fragen',
    thema.quiz.length >= 3 && thema.quiz.length <= 5,
  );

  // Der Aufhänger bleibt neutral: Er stellt beide Enden nebeneinander und
  // schreibt die Schere-These dem Betreiber zu (TONE-Regel).
  pruefe(
    'Medizin von morgen/TONE: der Aufhänger nennt Erfolg und Zugang in einem Atemzug',
    /(laufen|Kinder)/.test(thema.aufhaenger.text) && /4,5\s*Milliarden/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Medizin von morgen/TONE: der Aufhänger schreibt die Schere dem Betreiber zu',
    /Betreiber/.test(thema.aufhaenger.text) && /Schere/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Medizin von morgen/TONE: der Aufhänger kündigt die Trennung von Beleg und Vision an',
    /Vision/.test(thema.aufhaenger.text) && /belegt/.test(thema.aufhaenger.text),
  );
  pruefe(
    'Medizin von morgen: der Aufhänger kündigt die Besonderheit der zwei KI-Stimmen an',
    /Opus/.test(thema.aufhaenger.text) && /DeepSeek/.test(thema.aufhaenger.text),
  );

  // --- Die Längenregel -----------------------------------------------------
  const zeilenKapitel = [
    thema.aufhaenger.text,
    ...thema.perspektiven.map((p) => p.text),
    thema.synthese,
    thema.urteil.hinweis || '',
  ]
    .join('\n')
    .split('\n').length;
  pruefe(
    `Medizin von morgen/Länge: das Kapitel bleibt unter ${MAX_ZEILEN_KAPITEL} Zeilen (${zeilenKapitel})`,
    zeilenKapitel <= MAX_ZEILEN_KAPITEL,
  );

  // =========================================================================
  // 2. Die erste Stimme — Opus als KI
  // =========================================================================

  const opus = thema.perspektiven.find((p) => p.id === 'zukunft-opus');
  pruefe(
    'Medizin von morgen: die erste KI ist die erste Perspektive',
    thema.perspektiven[0] === opus,
  );
  if (opus) {
    pruefe('Medizin von morgen: die erste Perspektive ist Opus zugeschrieben', opus.stimme === 'Opus');
    pruefe(
      'Medizin von morgen: die erste Perspektive heißt nach ihrer Sicht',
      /KI/.test(opus.name),
    );
    pruefe(
      'Medizin von morgen: die erste Perspektive ist ausgeführt (über 15000 Zeichen)',
      opus.text.length > 15000,
    );
    const ueberschriften = opus.text.split('\n').filter((z) => z.startsWith('## '));
    pruefe(
      'Medizin von morgen: die erste Perspektive ist in Abschnitte gegliedert',
      ueberschriften.length >= 10,
    );
    pruefe(
      'Medizin von morgen: die erste Perspektive kennzeichnet sich als Denkart',
      /Denkart, keine\s+Wahrheit/.test(opus.text),
    );

    // --- Die Dramaturgie dieses Kapitels: die Hochrechnung ----------------
    pruefe(
      'Medizin von morgen: die Stimme sagt zuerst, was sie ist',
      /## Was ich bin/.test(opus.text) && /(Rechenverfahren|Modell)/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen: sie nennt ihr Verfahren beim Namen (Hochrechnung)',
      /Hochrechnung/.test(opus.text) && /(kann die Zukunft nicht sehen|keine Zeugen)/.test(opus.text),
    );

    // --- KEINE GERÜCHTE: zwei Spalten, Beleg und Vision getrennt ----------
    pruefe(
      'Medizin von morgen/Belege: die Regel der zwei Spalten steht ausdrücklich da',
      /## Die Regel dieses Kapitels/.test(opus.text) &&
        /Was es gibt/.test(opus.text) &&
        /Was Vision ist/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Belege: Visionen werden ausdrücklich als Vision gekennzeichnet',
      (opus.text.match(/Vision, keine Tatsache/g) || []).length >= 2,
    );
    pruefe(
      'Medizin von morgen/Belege: das gezüchtete Ersatzorgan gilt ausdrücklich als Vision',
      /gezüchtete[sn]? (Ersatzorgan|Herz)/.test(opus.text) && /Vision, keine Tatsache/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Belege: der Zukunftsentwurf ist als Vision überschrieben',
      /## Zwei Zimmer im Jahr 2045/.test(opus.text) &&
        /Kein Satz hier ist\s*\nbelegt|keine Belege gibt/.test(opus.text),
    );

    // Belegtes mit Namen, Jahr und Zahl (KEINE-GERÜCHTE-Regel).
    const belege = [
      ['Kymriah / die erste CAR-T-Zulassung 2017', /Kymriah/],
      ['Zolgensma (2019) und die spinale Muskelatrophie', /Zolgensma/],
      ['Hemgenix (2022)', /Hemgenix/],
      ['Casgevy — die erste CRISPR-Zulassung (2023)', /Casgevy/],
      ['Glybera (2012/2017) und der eine zahlende Patient', /Glybera/],
      ['Zynteglo und der Marktrückzug 2021', /Zynteglo/],
      ['Jesse Gelsinger (1999)', /Jesse Gelsinger/],
      ['He Jiankui (2018/2019)', /He Jiankui/],
      ['Macchiarini und die künstlichen Luftröhren', /Macchiarini/],
      ['Aduhelm (2021/2024)', /Aduhelm/],
      ['IDx-DR — die erste Diagnose ohne Nachkontrolle (2018)', /IDx-DR/],
      ['die MASAI-Studie zur Mammografie', /MASAI/],
      ['AlphaFold (2020) und der Nobelpreis 2024', /AlphaFold/],
      ['das Epic-Sepsis-Modell (JAMA Internal Medicine 2021)', /Sepsis/],
      ['Obermeyer u. a. (Science 2019)', /Obermeyer/],
      ['die Pulsoximeter-Auswertung (NEJM 2020)', /Pulsoximeter/],
      ['die Apple Heart Study (2019)', /Apple Heart Study/],
      ['die Schilddrüsen-Überdiagnose in Südkorea (NEJM 2014)', /Südkorea/],
      ['SUPPORT (JAMA 1995)', /SUPPORT/],
      ['Temel u. a. zur frühen Palliativbetreuung (NEJM 2010)', /Temel/],
      ['Cicely Saunders und das erste Hospiz (1967)', /Cicely Saunders/],
      ['die WHO/Weltbank-Zahl von 2023', /4,5\s*Milliarden/],
    ];
    for (const [name, muster] of belege) {
      pruefe(`Medizin von morgen/Belege: ${name} steht im Text`, muster.test(opus.text));
    }
    pruefe(
      'Medizin von morgen/Belege: die Preise stehen mit Zahlen da',
      /2,1 Millionen/.test(opus.text) &&
        /3,5 Millionen/.test(opus.text) &&
        /4,25 Millionen/.test(opus.text),
    );

    // --- Das Erzähl-Muster in dieser Stimme -------------------------------
    pruefe(
      'Medizin von morgen/Erzähl-Muster: (a) wie es sich entwickelt hat',
      /## Was es heute schon gibt/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Erzähl-Muster: (b) die Annahmen werden benannt',
      /## Die drei Annahmen/.test(opus.text) &&
        /Erste Annahme/.test(opus.text) &&
        /Dritte Annahme/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Erzähl-Muster: (c1) die Wirkungen — die Erfolge',
      /## Die Wirkungen: was gelungen ist/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Erzähl-Muster: (c2) und die Grenzen',
      /## Die Wirkungen: was misslungen ist/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Erzähl-Muster: die Annahmen bekommen ihre Kehrseite',
      /Überdiagnose/.test(opus.text) && /Was nicht\s*\ngemessen wird|nicht gemessen wird/.test(opus.text),
    );

    // --- Die Schere (Betreiber-Vorgabe) -----------------------------------
    pruefe(
      'Medizin von morgen/Schere: sie hat einen eigenen Abschnitt',
      /## Die Schere/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Schere: die These wird dem Betreiber zugeschrieben',
      /Betreiber dieses Buches/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Schere: sie wird mit Zahlen belegt, nicht behauptet',
      /(Krankenkassen|Versicherte)/.test(opus.text) && /Bestrahlungsgeräte|Krebsbehandlung/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Schere/TONE: die Gründe der anderen Seite stehen daneben',
      /(Entwicklung eines\s*\nMedikaments|Kapitalgeber)/.test(opus.text) &&
        /umstritten/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Schere/TONE: die Gegenbeispiele fallender Preise fehlen nicht',
      /## Was gegen die Schere spricht/.test(opus.text) &&
        /HIV/.test(opus.text) &&
        /Hepatitis C/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Schere: sie wird als Entscheidung, nicht als Naturgesetz beschrieben',
      /(keine Naturgesetzlichkeit|nicht\s*\nunvermeidlich|Es ist eine politische)/.test(opus.text),
    );

    // --- Die Rolle der KI: ehrlich, ohne Eigenwerbung ---------------------
    pruefe(
      'Medizin von morgen/KI: was die Verfahren heute können, steht belegt da',
      /## Was die Rechenmaschinen heute schon können/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/KI: die Grenzen haben einen eigenen Abschnitt',
      /## Was ich nicht kann/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/KI: die Voreingenommenheit der Daten wird benannt',
      /Voreingenommenheit/.test(opus.text) && /Obermeyer/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/KI: sie kann keine Verantwortung tragen',
      /keine Verantwortung tragen/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/KI: sie ersetzt keine Zuwendung',
      /(keine Hand halten|Zuwendung)/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/KI: Entmündigung und Überwachung werden als Gefahr genannt',
      /Entmündigung/.test(opus.text) && /Überwachung/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/KI: sie wirbt nicht für sich, sondern nennt ihre Fehlschläge',
      /(übersah|Fehlalarme)/.test(opus.text),
    );

    // --- Der Innovations-Zyklus (roter Faden des Buches) ------------------
    pruefe(
      'Medizin von morgen/Zyklus: das Muster wird benannt',
      /## Der Innovations-Zyklus/.test(opus.text) &&
        /(zuerst\s*\ngeschadet|zuerst geschadet)/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Zyklus: die Frage lautet Reifephase, nicht gut oder böse',
      /(gut oder\s*\nböse|gut oder böse)/.test(opus.text) && /Phase der Reife/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Zyklus: die Frage nach der Prüfzeit wird gestellt',
      /Prüfzeit/.test(opus.text) && /Kapitel 17/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Zyklus/TONE: auch die Kosten des Wartens werden benannt',
      /(zu lange Prüfzeit|Kosten des\s*\nWartens|Kosten des Wartens)/.test(opus.text),
    );

    // --- Die Sinnfrage (Betreiber-Vorgabe, Herzstück) ---------------------
    pruefe(
      'Medizin von morgen/Sinnfrage: sie hat einen eigenen Abschnitt',
      /## Die Sinnfrage/.test(opus.text) && /Wir sterben alle/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage: die Haltung des Betreibers ist zugeschrieben und zitiert',
      /Pflegefall/.test(opus.text) && /Siechtum/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage: sie wird als Haltung, nicht als Wahrheit gekennzeichnet',
      /Das ist eine Haltung/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage: Palliativmedizin und Hospizbewegung stehen als Antwort da',
      /Palliativmedizin/.test(opus.text) && /Hospiz/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage: die Übertherapie am Lebensende wird benannt',
      /Übertherapie/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage: die Patientenverfügung wird genannt',
      /Patientenverfügung/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage: Wunsch und Wirklichkeit des Sterbeorts stehen mit Zahlen da',
      /(Sterbeort|sterben will)/.test(opus.text) && /Pflegeheim/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage/TONE: die Gegenseite wird ernst genommen',
      /(Wann ist ein Leben nicht mehr lebenswert|lebenswerten Leben)/.test(opus.text) &&
        /Behindertenverbände/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage/TONE: die deutsche Vorgeschichte wird nicht verschwiegen',
      /(Menschen mit Behinderungen|Ärzten, mit Formularen)/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage: die Rechtslage wird belegt genannt, nicht bewertet',
      /Bundesverfassungsgericht/.test(opus.text) && /2020/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Sinnfrage: die Stimme maßt sich kein Urteil über das Sterben an',
      /(Ich habe hier keine Position|keinen Körper, der sterben wird)/.test(opus.text),
    );

    // --- Die eigene unbequeme Stelle --------------------------------------
    pruefe(
      'Medizin von morgen: die Stimme benennt ihre Befangenheit selbst',
      /## Meine eigene unbequeme Stelle/.test(opus.text) && /befangen/i.test(opus.text),
    );
    pruefe(
      'Medizin von morgen: sie gibt zu, die Zukunft als technisches Problem zu sehen',
      /technisches Problem/.test(opus.text),
    );

    // --- Die Tür zur zweiten Stimme ---------------------------------------
    pruefe(
      'Medizin von morgen: die erste Perspektive öffnet die Tür zur zweiten Stimme',
      /zweite Stimme/.test(opus.text) && /DeepSeek/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen: die beiden Stimmen werden als gleichwertig bezeichnet',
      /gleichwertig/.test(opus.text) && /Reihenfolge ist Zufall/.test(opus.text),
    );

    // --- Die Brücken zu Kapitel 18 und 20 ---------------------------------
    pruefe(
      'Medizin von morgen/Brücke: Kapitel 18 wird aufgegriffen',
      /Kapitel 18/.test(opus.text) && /(einfache Medizin|Trostpreis)/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Brücke: Kapitel 20 und die Miteinander-Frage sind angekündigt',
      /Kapitel 20/.test(opus.text) && /Miteinander/.test(opus.text),
    );
    pruefe(
      'Medizin von morgen/Brücke: das letzte Wort bleibt dem Menschen',
      /(gehört einem Menschen|keine Antwort)/.test(opus.text),
    );
  }

  // =========================================================================
  // 3. Prüfungen über alle Stimmen — auch nach dem Hermes-Pass gültig
  // =========================================================================

  const perspektivenText = thema.perspektiven.map((p) => p.text).join('\n');
  pruefe(
    'Medizin von morgen/Erzähl-Muster: (a) die Entwicklung ist belegt erzählt',
    /(zugelassen|Zulassung)/.test(perspektivenText),
  );
  pruefe(
    'Medizin von morgen/Erzähl-Muster: (b) die Annahmen werden ausgesprochen',
    /(Annahme|Weltbild)/.test(perspektivenText),
  );
  pruefe(
    'Medizin von morgen/Erzähl-Muster: (c1) die Erfolge stehen da',
    /(geheilt|krisenfrei|laufen)/.test(perspektivenText),
  );
  pruefe(
    'Medizin von morgen/Erzähl-Muster: (c2) und die Grenzen',
    /(Grenze|misslungen|Fehlschlag|gescheitert|Überdiagnose)/.test(perspektivenText),
  );
  pruefe(
    'Medizin von morgen: jede Perspektive ist einer Stimme zugeschrieben',
    thema.perspektiven.every((p) => typeof p.stimme === 'string' && p.stimme.length > 0),
  );
  pruefe(
    'Medizin von morgen: die Perspektiven sind KI-Stimmen (Besonderheit dieses Kapitels)',
    thema.perspektiven.every((p) => ['Opus', 'DeepSeek'].includes(p.stimme)),
  );

  // Die beiden Leitfragen des Kapitels müssen im Buch ankommen.
  const texte = alleTexte(thema);
  pruefe(
    'Medizin von morgen/Leitfrage: die Schere wird benannt',
    /Schere/.test(texte),
  );
  pruefe(
    'Medizin von morgen/Leitfrage: die Sinnfrage wird gestellt, nicht beantwortet',
    /Wir sterben alle/.test(texte) && !/Die Antwort lautet/.test(thema.urteil.frage),
  );
  pruefe(
    'Medizin von morgen/TONE: die einfache Medizin wird nicht abgewertet',
    /(kein Trostpreis|einfache Medizin)/.test(texte),
  );
  pruefe(
    'Medizin von morgen/TONE: die Hochtechnik wird nicht dämonisiert',
    /(sind echt|nicht der Sache|Erfolge)/.test(texte),
  );

  // --- Quiz: Wissensfragen, keine Suggestivfragen --------------------------
  for (const frage of thema.quiz) {
    pruefe(
      `Medizin von morgen/Quiz: „${frage.frage.slice(0, 40)}…" hat mindestens drei Antworten`,
      frage.antworten.length >= 3,
    );
    pruefe(
      `Medizin von morgen/Quiz: „${frage.frage.slice(0, 40)}…" wird erklärt`,
      frage.erklaerung.length > 60,
    );
    pruefe(
      `Medizin von morgen/Quiz: „${frage.frage.slice(0, 40)}…" wertet nicht`,
      !/(besser|schlechter|überlegen|rückständig|Schuld)/i.test(frage.frage),
    );
  }
  pruefe(
    'Medizin von morgen/Quiz: es fragt Belegtes ab, keine Prognosen',
    thema.quiz.every((f) => /\d{4}|Dollar|Genom/.test(f.frage + f.erklaerung)),
  );

  // --- Die Synthese: je nach Ausbaustand -----------------------------------
  // Solange nur eine Stimme spricht, MUSS die Synthese offenlegen, dass sie
  // vorläufig ist. Sobald Hermes die zweite Stimme ergänzt hat, wird sie an
  // ihrer eigentlichen Aufgabe gemessen: Übereinstimmungen UND Widersprüche.
  if (thema.perspektiven.length < 2) {
    pruefe(
      'Medizin von morgen/Synthese: legt offen, dass die zweite Sicht noch fehlt (Runde 20)',
      /(noch nicht fertig|noch nicht|fehlt|vorläufig|Als Nächstes|als Nächstes)/.test(thema.synthese),
    );
  } else {
    pruefe(
      'Medizin von morgen/Synthese: benennt Übereinstimmungen',
      /(einig|treffen|übereinstimm|gemeinsam)/i.test(thema.synthese),
    );
    pruefe(
      'Medizin von morgen/Synthese: benennt Widersprüche',
      /(auseinander|widersprech|Widerspruch|streiten|uneinig)/i.test(thema.synthese),
    );
    pruefe(
      'Medizin von morgen/Synthese: erklärt sich nicht selbst zur Wahrheit',
      !/so war es/i.test(thema.synthese),
    );
  }
}
