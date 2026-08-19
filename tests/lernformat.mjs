// Prüfungen für utils/lernformat.js — die Abschnitte eines Kapitels.
//
// Registriert in tests/alle.mjs (Prüf-Regel aus CLAUDE.md). Keine UI-Importe:
// läuft mit blankem `node`.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { ABSCHNITTE, abschnitteFuer, begrenze } = require('../utils/lernformat.js');
const { alleThemen, themaNachId } = require('../utils/themen/index.js');

/**
 * @param {(name: string, ok: boolean) => void} pruefe Prüf-Funktion des Rahmens
 */
export function laufe(pruefe) {
  // --- Die Reihenfolge aus CLAUDE.md -------------------------------------
  // Das Schlusswort des Autors steht als letzter, optionaler Abschnitt
  // hinter dem Quiz — das letzte Wort der App gehört dem Menschen.
  const erwartet = ['aufhaenger', 'karte', 'perspektiven', 'synthese', 'urteil', 'quiz', 'autorenwort'];
  pruefe(
    'Lernformat: Abschnitte stehen in der Reihenfolge aus CLAUDE.md',
    ABSCHNITTE.map((a) => a.id).join(',') === erwartet.join(','),
  );
  pruefe('Lernformat: jeder Abschnitt hat einen Anzeigenamen', ABSCHNITTE.every((a) => a.name.length > 0));
  pruefe('Lernformat: jeder Abschnitt hat eine Kurzform für die Schrittleiste', ABSCHNITTE.every((a) => a.kurz.length > 0));

  // --- Abschnitte eines konkreten Themas ---------------------------------
  // Einrichtungsstand: kein Medizin-Modul vorhanden — geprüft wird mit
  // einem synthetischen Thema, das alle Felder des Schemas trägt.
  const testThema = {
    id: 'test-thema',
    titel: 'Testthema',
    epoche: 'Testzeit',
    aufhaenger: { frage: 'Eine Frage?', text: 'Ein Einstiegstext.' },
    perspektiven: [
      {
        id: 'eine-sicht',
        name: 'Eine Sicht',
        stimme: 'Opus',
        text: 'Ein Perspektiventext, der lang genug ist, um kein Platzhalter zu sein.',
      },
    ],
    synthese: 'Eine Synthese, die lang genug ist, um nicht als Platzhalter zu gelten.',
    urteil: { frage: 'Was meinst du?' },
    quiz: [
      { frage: 'A?', antworten: ['ja', 'nein'], richtig: 0, erklaerung: 'weil.' },
      { frage: 'B?', antworten: ['ja', 'nein'], richtig: 1, erklaerung: 'weil.' },
      { frage: 'C?', antworten: ['ja', 'nein'], richtig: 0, erklaerung: 'weil.' },
    ],
  };
  const themaAbschnitte = abschnitteFuer(testThema);
  // Ohne Karte (optional) und ohne Autorenwort sind es fünf Pflicht-Abschnitte.
  pruefe('Lernformat: „Testthema" hat die fünf Pflicht-Abschnitte', themaAbschnitte.length === 5);
  pruefe(
    'Lernformat: die zurückgegebenen Abschnitte tragen keine Prüffunktion mit',
    themaAbschnitte.every((a) => typeof a.hatInhalt === 'undefined'),
  );

  // Ein Thema ohne Inhalt darf keine leeren Abschnitte erzeugen.
  pruefe('Lernformat: ein leeres Thema hat keine Abschnitte', abschnitteFuer({}).length === 0);
  pruefe('Lernformat: fehlendes Thema hat keine Abschnitte', abschnitteFuer(undefined).length === 0);
  pruefe(
    'Lernformat: ein Thema ohne Quiz zeigt keinen Quiz-Abschnitt',
    !abschnitteFuer({ ...testThema, quiz: [] }).some((a) => a.id === 'quiz'),
  );
  pruefe(
    'Lernformat: ein Thema ohne Synthese zeigt keinen Synthese-Abschnitt',
    !abschnitteFuer({ ...testThema, synthese: '  ' }).some((a) => a.id === 'synthese'),
  );

  // Jedes registrierte Thema muss die volle Strecke anbieten — sonst fehlt
  // Inhalt, den das Lernformat vorsieht. Zwei Ausnahmen: „Geschichte in
  // Bewegung" (eine Karte darf fehlen) und das „Schlusswort des Autors"
  // (das schreibt nur der Betreiber, und nur im KI-Kapitel).
  const PFLICHT = ABSCHNITTE.filter((a) => a.id !== 'karte' && a.id !== 'autorenwort').map((a) => a.id);
  for (const thema of alleThemen) {
    const habe = abschnitteFuer(thema).map((a) => a.id);
    pruefe(
      `Lernformat: „${thema.id}" bietet alle Pflicht-Abschnitte`,
      PFLICHT.every((id) => habe.includes(id)),
    );
  }

  // --- Blättern ----------------------------------------------------------
  pruefe('Lernformat: Blättern über das Ende hinaus bleibt am Ende stehen', begrenze(9, 5) === 4);
  pruefe('Lernformat: Blättern vor den Anfang bleibt am Anfang stehen', begrenze(-3, 5) === 0);
  pruefe('Lernformat: gültiger Schritt bleibt unverändert', begrenze(2, 5) === 2);
  pruefe('Lernformat: ohne Abschnitte ist der Schritt 0', begrenze(3, 0) === 0);
  pruefe('Lernformat: Nicht-Zahlen ergeben 0', begrenze(undefined, 5) === 0);
}
