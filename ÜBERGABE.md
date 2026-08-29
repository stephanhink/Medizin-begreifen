# Medizin begreifen — Projekt-Übergabe (Stand: 28.08.2026, Abend)

> Diese Datei ist die Brücke für jede neue Session. Lies sie zuerst —
> zusammen mit `CLAUDE.md` (Projekt-DNA, verbindlich) und
> `notizen/kapitel-planung.md` (Kapitel-Bogen mit allen Betreiber-Vorgaben).
> Der Skill `medizin-begreifen-workflow` (Hermes) enthält den
> Runden-Workflow, die Prompt-Vorlage und alle Stolpersteine.
>
> **WICHTIG — Repo finden:** Das Repo liegt NUR auf dem M1-Server unter
> `/Users/openclaw/Documents/GitHub/Medizin-begreifen`. Eine neue Session
> muss zuerst dorthin wechseln (Projekt anlegen/wechseln auf diesen Pfad
> oder `cd`), BEVOR sie diese Datei und die Module sehen kann. Eine Kopie
> dieser Übergabe liegt zusätzlich unter `~/Medizin-begreifen-UEBERGABE.md`
> (Home-Verzeichnis), damit jede Session sie auch ohne Repo-Zugriff findet.
> Läuft die Session nicht auf dem M1 (z. B. lokal auf dem M5), gibt es
> dort KEIN Repo — dann über Tailscale/SSH auf dem M1 arbeiten.

## 1. Das Projekt

**„Medizin begreifen" — Die Geschichte der Medizin** (Expo SDK 57, React
Native, JavaScript, CommonJS). Persönlichstes Buchprojekt von Stephan
(Heilpraktiker, impfkritisch, naturheilkundlich). Leitidee:
**„Wer schreibt die Geschichte der Medizin?"** — Multiperspektivität
zwischen Schulmedizin und Naturheilkunde. Jedes Kapitel = 2 Stimmen
(Opus = erste Perspektive, Hermes = zweite Perspektive) + finale Synthese.
Durchgängige Erkenntnis: **„Die Denkart bestimmt die Methode."**

Repo: https://github.com/stephanhink/Medizin-begreifen (public, main)
Lokal: `/Users/openclaw/Documents/GitHub/Medizin-begreifen` (M1-Server)
App: „Medizin begreifen" / `com.hink.medizin`; EAS:
@heilpraktikerdk/medizin-begreifen; Keystore `medizin-keystore`
(Backup: `~/Medizin-Keystore-Backup/` — NIE neu generieren!)

## 2. Stand: 17 von 20 Kapiteln fertig (committet + gepusht)

| # | Kapitel | Modul | Dramaturgie |
|---|---|---|---|
| 1 | Die Anfänge der Heilkunde (inkl. Ägypten) | anfaenge-der-heilkunde | Selbstvorstellung („Wer hier spricht") |
| 2 | China und die TCM | china-tcm | Szene (drei Finger am Handgelenk) |
| 3 | Indien und der Ayurveda | indien-ayurveda | Tag (Vor Sonnenaufgang) |
| 4 | Hippokrates und Galen | hippokrates-galen | Briefwechsel |
| 5 | Avicenna und die arabische Medizin | avicenna-arabische-medizin | Reise des Wissens |
| 6 | Die Klostermedizin | klostermedizin | Rundgang durchs Kloster |
| 7 | Paracelsus und Vesal | paracelsus-vesal | Prozess gegen die Autorität |
| 8 | Harvey und der Blutkreislauf | harvey | Rechnung |
| 9 | Grausame Anfänge der Chirurgie | chirurgie-anfaenge | Uhr (Countdown der Amputation) |
| 10 | Jenner und die Impfung | jenner-impfung | Kette |
| 11 | Pasteur und Lister | pasteur-lister | Linse (Mikroskop) |
| 12 | Röntgen und Penicillin | roentgen-penicillin | Zwei Interviews |
| 13 | Die Verstaatlichung | verstaatlichung | Zwei Akten |
| 14 | Die moderne Pharmaindustrie | pharmaindustrie | Beipackzettel (beide Seiten) |
| 15 | mRNA/COVID | mrna-covid | Pressekonferenz (beide Seiten des Mikrofons) |
| 16 | Hahnemann und die Homöopathie | homoeopathie | Telefon (der Apparat, in dem niemand sitzt) |
| 17 | Kneipp und die Naturheilkunde | kneipp | Wasser (der Trog von Wörishofen erzählt) |
| 18 | **Die einfache Medizin** | einfache-medizin | **RUNDE 19 VORBEREITET (Prompt liegt in .claude/prompt-runde19.txt)** |
| 19 | Die Medizin von morgen | — | Schere reich/arm + Sinnfrage; OPUS+HERMES ALS KI-Stimmen |
| 20 | Das Miteinander? | — | offenes Ende + Autorenwort des Betreibers |

Jedes Modul: `utils/themen/<id>.js` + `utils/themen/karten/<id>.js` +
`tests/karte-<id>.mjs` (in `tests/alle.mjs` registriert!). Registrierung
auch in `utils/themen/index.js`. **Achtung: Jede neue Testdatei MUSS in
`tests/alle.mjs` eingetragen werden** (sonst zählt sie nicht — 7×
passiert, zuletzt Kneipp Runde 18!). **Vorsicht beim Hermes-Pass: Opus'
Variablen-Namen im perspektiven-Array nicht umbenennen** (2× passiert).

**Runde 18 (Kneipp) wurde am 28.08. 20:35 von einer ALTEN Hermes-Session
parallel abgeschlossen** (Commit 1a4ecd1, gepusht, wip.md aktualisiert),
während Hermes selbst committen wollte. Lehre: **VOR jeder Aktion
`git status` prüfen** — zwei Bediener können sich in die Quere kommen.

## 3. Verbindliche Betreiber-Vorgaben (alle in CLAUDE.md)

- **TONE-Regel:** Beide Seiten fair, nichts einseitig verurteilen,
  nichts beschönigen. Jede Stimme benennt ihre unbequemen Stellen selbst.
- **KEINE-GERÜCHTE-Regel (25.08.):** Nur Belegtes. Unbelegtes fliegt raus
  (Beispiel: Ukraine-Waisen-Organhandel-Gerücht gestrichen). ABER:
  **Ioannidis/COVID-Kritik bleibt** (belegte Position, ausdrücklich
  bestätigt).
- **Innovations-Zyklus (26.08., roter Faden):** Neues schadet zuerst,
  bevor es segensreich wird (Chirurgie, Strahlen, Impfung, Penicillin).
  Linse für mRNA: „tolle Idee, die noch nicht ausgereift ist" —
  Reifephase statt gut/böse.
- **Längenregel (24.08., gestuft):** Kapitel 1–8 kurz+dicht (~250 Zeilen/
  Perspektive); ab Kapitel 9 **ausführlich+vollständig** (500+ Zeilen ok).
- **Impfkritik (Betreiber, prominent):** Rückgang begann vor der Impfung
  (Hygiene/Wasser/Ernährung — McKeown); Allergien/Hygiene-Hypothese.
- **Jenner (Kap. 10):** dunkle Frühgeschichte prominent (Newgate 1721,
  Boston 1721/Onesimus, James Phipps, Arm-zu-Arm-Syphilis, Wanderimpfer).
- **Pharmaindustrie (Kap. 14):** Finanzinteressen prominent (Olivieri,
  Dong, Publikations-Bias). Bilanz: Diagnose stark, chronisch schwach.
- **Homöopathie (Kap. 16):** Informations-These (Potenzierung überträgt
  Information — „kein Stoff drin" ist die falsche Frage); Telefon-Argument;
  Sheldrake/morphische Felder; NICHT als Placebo abtun; Ende offen:
  „Was gilt als Beweis?"
- **mRNA/COVID (Kap. 15):** TONE-Regel doppelt; Sorgfaltspflicht-Debatte
  prominent; Ioannidis namentlich (Stanford, Influenza-Niveau);
  Gleichschaltung (Zensur, Great Barrington); Gates Foundation (Fakten
  nennen, Deutung multiperspektivisch); final nur mit Freigabe.
- **Einfache Medizin (Kap. 18, RUNDE 19, Betreiber-These):** 1) Bewegung,
  2) gesunde Ernährung (wenig verarbeitet), 3) soziales Umfeld + wenig
  Stress. „Keine Raketenwissenschaft — mehr Gesundheit durch Lebensstil
  als durch Chemie." Fair diskutieren (WHO 70–80 %, Blue Zones vs.
  Strukturen: Industrie, Werbung, Arbeitswelt, Pille statt Rat). Leitfrage:
  Warum verschreibt die Medizin Pillen statt Lebensstil? Stimmen:
  Opus = „Die Stimme des Alltags" (id 'alltag'), Hermes = „Die Stimme der
  Verhältnisse". Dramaturgie 18: **DER TELLER**. Karte optional
  (Blue Zones), sonst weglassen. Prompt: `.claude/prompt-runde19.txt`.
- **Medizin von morgen (Kap. 19):** Schere reich/arm; **Sinnfrage:**
  „Wir sterben alle — lange gesund und glücklich leben, dann kurz
  abbauen, friedlich sterben"; Betreiber: lieber schneller würdevoller
  Tod als Siechtum. BESONDERHEIT: Die beiden Perspektiven sind
  OPUS und HERMES ALS KI.
- **London 1850 (Kap. 9, Betreiber-Favorit):** ausführlich+anschaulich;
  Leichenklau prominent (Resurrection Men, Mortsafes — nicht „Soulers"!,
  Burke & Hare, Anatomy Act 1832); Organhandel-Brücke (nur Belegtes).
- **TOKEN-SPAREN (28.08., neue Vorgabe):** `agent.max_turns=40` in der
  Hermes-Config (vorher 90); Opus-Runden mit `--max-turns 40` statt 60;
  **ABBRUCH-KRITERIUM in jedem Runden-Prompt:** Wenn ein Ansatz 3×
  fehlschlägt → stoppen, Zwischenstand sichern, ehrlich berichten
  (steht jetzt in der Prompt-Vorlage des Skills). Hintergrund: zu hohe
  Token-Kosten in den letzten Tagen.

## 4. Runden-Workflow (bewährt)

1. Prompt schreiben → `.claude/prompt-rundeNN.txt` (deutsch, selbsttragend,
   mit Längenregel + NEUER Dramaturgie + Betreiber-Vorgaben + Test-Muster +
   Abbruchkriterium). Vorlage: Skill `medizin-begreifen-workflow`,
   `templates/medizin-modul-prompt.md`.
2. Auth-Test: `claude -p "Antworte nur mit OK" --max-turns 2` (echter
   Test, nicht nur `auth status`!). Login-Flow siehe Abschnitt 5.
3. Start im Hintergrund (notify_on_complete=true):
   `claude -p "$(cat .claude/prompt-rundeNN.txt)" --model opus
   --allowedTools 'Read,Edit,Write,Bash(npm test),Bash(node*)'
   --max-turns 40 --output-format text`
4. **Abbruch-Behandlung:** `Reached max turns` / `session limit · resets
   <zeit>` → Zwischenstand prüfen (git status + npm test — meist grün/
   fast fertig) → nach dem Reset `claude --continue` (Session überlebt).
   ERSTE PRÜFUNG nach Limit-Abbruch: Sind Modul + Karte + Tests KOMPLETT
   und npm test GRÜN, ist die Runde faktisch fertig → Hermes-Pass sofort,
   KEIN --continue. Fehlt NUR die Testdatei: Hermes schreibt sie selbst
   nach dem jüngsten Muster. Wrapper sind UNZUVERLÄSSIG — bei Wartezeit
   >2h manuell nach dem Reset starten.
5. **Hermes-Pass:** Karte rendern (`karten-vorschau.js <id> <phase>` →
   PNG via qlmanage + sips, Höhe aus viewBox per python3), zweite Stimme
   in derselben Dramaturgie schreiben (Tür von Opus nutzen!), finale
   Synthese (Treffen/Auseinandergehen/für das Buch + Brücke zum nächsten
   Kapitel), Kopfkommentar „ergänzte", `npm test` (grün!), Einzel-Vorschau
   (`themen-vorschau.js <id> <datei>` → MEDIA: im Chat; **IMMER neuen
   Dateinamen verwenden** — die Desktop-App cached Vorschauen nach
   Dateinamen!), Karte zeigen, Freigabe → Commit+Push (gezieltes git add,
   keine Umlaute in der Commit-Message).
6. **Dramaturgien (18 verbraucht, NIE wiederholen):** Selbstvorstellung,
   Szene, Tag, Briefwechsel, Reise, Rundgang, Prozess, Rechnung, Uhr,
   Kette, Linse, Interview, Akte, Beipackzettel, Pressekonferenz, Telefon,
   Wasser, Teller. Runde 20 (Kap. 19) braucht die 19.
7. **Karten:** Echte Lon/Lat-Koordinaten (Schulatlas-Qualität), Phasen ≥3
   mit Jahreszahlen, 5–6 Info-Punkte, 1–3 Bewegungen, Beschriftungen.
   Nicht jedes Kapitel hat eine Karte (Semmelweis, Pharma, mRNA nicht).

## 5. Technik / Stolpersteine (Erfahrungen)

- **OAuth-Login:** `unset CLAUDE_CODE_OAUTH_TOKEN; claude auth login`
  (PTY-Hintergrund) → URL an Betreiber → Code eingeben (process submit).
  **Code IMMER VOLLSTÄNDIG inkl. #state-Teil** („sDR…Rz9pq#KrGB3…") —
  ohne #-Teil kommt „Invalid code". Code verfällt ~10 min. Konto
  andreas@hink.de. Session hält ~8 h. NIE parallel neue Logins starten.
- **5h-Fenster + Wochenlimit:** Resets stehen in der Fehlermeldung.
  Zwischenstände bleiben erhalten (`--continue`).
- **Zwei Claude-Versionen** können die Auth gegenseitig killen — nie
  mischen; nach Login IMMER echten Test fahren.
- **Tests in alle.mjs registrieren** (7× vergessen, zuletzt Kneipp:
  280 Prüfungen zählten nicht!). Im Hermes-Pass IMMER GEGENPRÜFEN:
  `grep -n "karte-" tests/alle.mjs` vs. `ls tests/karte-*` UND
  `grep -n "laufe" tests/alle.mjs` (Import + Aufruf).
- **Parallel-Session-Falle (28.08.):** Eine alte Hermes-Session kann
  weiterarbeiten, während eine neue startet (Kneipp wurde so committet).
  VOR jeder Aktion `git status` + laufende Prozesse prüfen
  (`ps aux | grep claude`).
- **Vorschau-Skripte:** `~/.hermes/skills/autonomous-ai-agents/
  geschichte-begreifen-workflow/scripts/{themen,karten}-vorschau.js`
  (themen-vorschau unterstützt `themen-vorschau.js <id> <datei>`).
- **Karten-PNG:** viewBox-Höhe per python3-Regex, PNG = Höhe×2 bei 1400er
  Skalierung, Zuschnitt `sips -c <H> 1400`.
- **Keystore:** `medizin-keystore` — Backup `~/Medizin-Keystore-Backup/`,
  muss auf M5 (chmod 600). Nie den Geschichts-Keystore verwenden.
- **Git:** Push nur nach Freigabe des Betreibers (Zwei-Bediener-Regel);
  `unset GITHUB_TOKEN GH_TOKEN` vor gh/git; gezieltes Staging.

## 6. Nächste Schritte

1. **Runde 19 (Kap. 18, Die einfache Medizin) STARTEN** — Prompt liegt in
   `.claude/prompt-runde19.txt` (inkl. Abbruchkriterium). Vorher:
   Auth-Test, ggf. Login (Session-Limit resettet am 28.08. um 21:30).
   Danach Hermes-Pass (Stimme der Verhältnisse + Synthese mit Brücke zu
   Kap. 19) → Freigabe → Commit+Push.
2. Runde 20: Die Medizin von morgen (KI-Stimmen Opus+Hermes! Sinnfrage!)
3. Runde 21: Das Miteinander? + Autorenwort des Betreibers (wörtlich,
   unverbessert, Feld `autorenwort` im Modul)
4. Danach: DA-Übersetzungen (Mona!), Buch-Pipeline, Hörbuch, App-Build.

## 7. Betreiber-Persönliches (für den Ton)

Stephan Hink, Kirkevænget 5, DK-6900 Skjern. Heilpraktiker, impfkritisch
(Ioannidis-Anhänger), kritisch zu Pharma-Finanzen, Homöopathie: „Anhänger
verstehen statt belächeln". Will ein faires, überprüfbares Buch (TONE,
keine Gerüchte). Liest alles gegen — Vorschauen als MEDIA:-Dateien.
Commit-Freigaben: „passt committen". Neue Kapitel-Ideen kommen laufend —
immer erst in die DNA (CLAUDE.md + kapitel-planung.md), dann in Runden.
