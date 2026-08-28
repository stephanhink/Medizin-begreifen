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
// Runde 10: Kapitel „Die grausamen Anfänge der modernen Chirurgie" (Modul +
// Atlas-Test + Denkart-Analyse + Belege-Prüfung).
// Runde 11: Kapitel „Jenner und die Impfung" (Modul + Atlas-Test +
// Denkart-Analyse + dunkle Frühgeschichte + impfkritische Statistik).
// Runde 13: Kapitel „Röntgen und Penicillin" (Modul + Atlas-Test +
// Denkart-Analyse + Innovations-Zyklus); dazu der in Runde 12 vergessene
// Aufruf des Pasteur-Tests nachgetragen.
// Runde 15: Kapitel „Die moderne Pharmaindustrie" (Modul + Atlas-Test +
// Denkart-Analyse + Finanzinteressen + Innovations-Zyklus).
// HINWEIS für den Hermes-Pass: tests/karte-verstaatlichung.mjs (Runde 14)
// ist hier noch NICHT eingetragen — die Datei ist vorhanden, meldet aber
// zwei Abweichungen zum inzwischen geänderten Modul (Name der ersten Stimme,
// Text einer Bewegung). Erst anpassen, dann eintragen.
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
import { laufe as laufeAvicenna } from './karte-avicenna-arabische-medizin.mjs';
import { laufe as laufeKloster } from './karte-klostermedizin.mjs';
import { laufe as laufeParacelsus } from './karte-paracelsus-vesal.mjs';
import { laufe as laufeVerstaatlichung } from './karte-verstaatlichung.mjs';
// Runde 9 hat tests/karte-harvey.mjs angelegt, aber nicht hier eingetragen —
// damit zählte die Prüfung nicht (Prüf-Regel in CLAUDE.md). Nachgetragen in
// Runde 10; die Datei läuft unverändert und fehlerfrei durch.
import { laufe as laufeHarvey } from './karte-harvey.mjs';
import { laufe as laufeChirurgie } from './karte-chirurgie-anfaenge.mjs';
import { laufe as laufeJenner } from './karte-jenner-impfung.mjs';
import { laufe as laufePasteur } from './karte-pasteur-lister.mjs';
import { laufe as laufeRoentgen } from './karte-roentgen-penicillin.mjs';
import { laufe as laufePharma } from './karte-pharmaindustrie.mjs';
import { laufe as laufeMrna } from './karte-mrna-covid.mjs';
import { laufe as laufeHomoeopathie } from './karte-homoeopathie.mjs';
import { laufe as laufeKneipp } from './karte-kneipp.mjs';

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
laufeAvicenna(pruefe);
laufeKloster(pruefe);
laufeParacelsus(pruefe);
laufeVerstaatlichung(pruefe);
laufeHarvey(pruefe);
laufeChirurgie(pruefe);
laufeJenner(pruefe);
// Runde 12 hat tests/karte-pasteur-lister.mjs zwar importiert, aber nicht
// aufgerufen — damit zählte die Prüfung nicht (Prüf-Regel in CLAUDE.md).
// Nachgetragen in Runde 13; die Datei läuft unverändert und fehlerfrei durch.
laufePasteur(pruefe);
laufeRoentgen(pruefe);
laufePharma(pruefe);
laufeMrna(pruefe);
laufeHomoeopathie(pruefe);
laufeKneipp(pruefe);
await laufeFortschritt(pruefe);

if (fehler > 0) {
  console.error(`${fehler} Prüfung(en) fehlgeschlagen.`);
  process.exit(1);
}
console.log('Alle Prüfungen bestanden.');
