// Test-Einstieg: hier werden alle Testdateien registriert (wie bei "Mathe
// begreifen"). Neue Testdateien MÜSSEN hier importiert werden, sonst zählt
// `npm test` sie nicht.
//
// Stand: Smoke-Tests für die App-Dateien + Prüfungen der Fachlogik in utils/
// (Themen-Module, Markdown, Quiz, Fortschritt, Lernformat, Architektur).
// Die Karten-Tests der Geschichts-Module sind mit den Modulen entfernt
// worden — jede Medizin-Runde registriert ihren Modul- und Kartentest neu.
// Runde 1: Kapitel „Die Anfänge der Heilkunde" (Modul + Atlas-Test).
// Runde 2: Kapitel „Ägypten — die Heilkunst am Nil" (Modul + Atlas-Test).
// Runde 3: Kapitel „China und die TCM" (Modul + Atlas-Test + Denkart-Analyse).
//
// Eine registrierte Testdatei exportiert `laufe(pruefe)` und meldet ihre
// Ergebnisse über die übergebene Prüf-Funktion. `laufe` darf auch
// asynchron sein — hier unten wird darauf gewartet.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { laufe as laufeThemen } from './themen.mjs';
import { laufe as laufeMarkdown } from './markdown.mjs';
import { laufe as laufeQuiz } from './quiz.mjs';
import { laufe as laufeFortschritt } from './fortschritt.mjs';
import { laufe as laufeLernformat } from './lernformat.mjs';
import { laufe as laufeArchitektur } from './architektur.mjs';
import { laufe as laufeAnfaenge } from './karte-anfaenge-der-heilkunde.mjs';
import { laufe as laufeIndien } from './karte-indien-ayurveda.mjs';
import { laufe as laufeChina } from './karte-china-tcm.mjs';
import { laufe as laufeHippokrates } from './karte-hippokrates-galen.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const projekt = path.join(root, '..');

let fehler = 0;
function pruefe(name, ok) {
  if (ok) {
    console.log('ok: ' + name);
  } else {
    console.error('FEHLER: ' + name);
    fehler += 1;
  }
}

pruefe('App.js existiert', existsSync(path.join(projekt, 'App.js')));
pruefe('index.js existiert', existsSync(path.join(projekt, 'index.js')));
pruefe('app.json existiert', existsSync(path.join(projekt, 'app.json')));

// Registrierte Testdateien:
laufeThemen(pruefe);
laufeMarkdown(pruefe);
laufeQuiz(pruefe);
laufeLernformat(pruefe);
laufeArchitektur(pruefe);
laufeAnfaenge(pruefe);
laufeIndien(pruefe);
laufeChina(pruefe);
laufeHippokrates(pruefe);
await laufeFortschritt(pruefe);

if (fehler > 0) {
  console.error(`${fehler} Prüfung(en) fehlgeschlagen.`);
  process.exit(1);
}
console.log('Alle Prüfungen bestanden.');
