# Medizin begreifen — Projekt-Übergabe (Stand: 29.08.2026)

> Diese Datei ist die Brücke für jede neue Session. Lies sie zuerst —
> zusammen mit `CLAUDE.md` (Projekt-DNA, verbindlich) und
> `notizen/kapitel-planung.md` (Kapitel-Bogen mit allen Betreiber-Vorgaben).
> Der Skill `medizin-begreifen-workflow` (Hermes) enthält den
> Runden-Workflow, die Prompt-Vorlage und alle Stolpersteine.
>
> **REPO FINDEN (3 Wege):**
> 1. Im Home liegt ein Symlink: `~/Medizin-begreifen` → zeigt direkt ins
>    Repo. Einfach dorthin wechseln (`cd ~/Medizin-begreifen`) oder in
>    der Desktop-App das Projekt auf diesen Pfad setzen.
> 2. Direktpfad: `/Users/openclaw/Documents/GitHub/Medizin-begreifen`
>    (NUR auf dem M1-Server; alles läuft im DEFAULT-Profil, nur M1).
> 3. Diese Übergabe liegt zusätzlich unter `~/Medizin-begreifen-UEBERGABE.md`
>    (Home), damit jede Session sie auch ohne Repo-Zugriff findet.
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

## 2. Stand: 18 von 20 Kapiteln fertig (committet + gepusht)

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
| 18 | Die einfache Medizin | einfache-medizin | **FERTIG (Commit 0ded738):** Stunden (die 8.758, von innen und von außen) |
| 19 | **Die Medizin von morgen** | medizin-von-morgen | **RUNDE 20 VORBEREITET (Prompt .claude/prompt-runde20.txt)** — KI-Stimmen! |
| 20 | Das Miteinander? | — | offenes Ende + Autorenwort des Betreibers |

Jedes Modul: `utils/themen/<id>.js` + `utils/themen/karten/<id>.js` +
`tests/karte-<id>.mjs` (in `tests/alle.mjs` registriert!). Registrierung
auch in `utils/themen/index.js`. **Achtung: Jede neue Testdatei MUSS in
`tests/alle.mjs` eingetragen werden** (7× passiert, zuletzt Kneipp!).
**Vorsicht beim Hermes-Pass: Opus' Variablen-Namen im perspektiven-Array
nicht umbenennen** (2× passiert).

**Runde 19 (Kap. 18, einfache-medizin, Commit 0ded738, 29.08.):**
- Opus: „Die Stimme des Alltags" (664 Z.; Potsdam 78 %, DPP, Nordkarelien,
  Look AHEAD, Blue-Zones-Kritik/Newman, Wellness-Ware, „Was ich nicht bin")
- Hermes-Pass: „Die Stimme der Verhältnisse" (320 Z.; wem die Stunden
  gehören: Arbeitswelt, gebaute Umgebung, Teller/Bliss-Point/NOVA,
  Werbung, Pille/Vergütung/Haftung, Armut, Vorhalt + eigene blinde
  Flecken) + finale Synthese (47 Z., Brücke zu Kap. 19: die Schere)
- Balance 664/320 = 48 % (besser als Kneipp 34 %; Ziel ±20 % nicht ganz
  erreicht — Betreiber hat abgenommen)
- Karte: WELTKARTE der 5 blauen Zonen (−130°…155°), 5 Phasen, 7 Punkte,
  2 Bewegungen; Atlas-Test 1,2° Toleranz (real alle < 0,8°)
- Registrierung war diesmal korrekt (keine 8. Falle); npm test grün

## 3. Verbindliche Betreiber-Vorgaben (alle in CLAUDE.md)

- **TONE-Regel:** Beide Seiten fair, nichts einseitig verurteilen,
  nichts beschönigen. Jede Stimme benennt ihre unbequemen Stellen selbst.
- **KEINE-GERÜCHTE-Regel (25.08.):** Nur Belegtes. Unbelegtes fliegt raus.
  ABER: **Ioannidis/COVID-Kritik bleibt** (belegte Position, bestätigt).
- **Innovations-Zyklus (26.08., roter Faden):** Neues schadet zuerst,
  bevor es segensreich wird. Linse für mRNA: „tolle Idee, die noch nicht
  ausgereift ist" — Reifephase statt gut/böse.
- **Längenregel (24.08., gestuft):** Kap. 1–8 kurz+dicht; ab Kap. 9
  **ausführlich+vollständig** (500+ Zeilen ok).
- **Impfkritik:** Rückgang begann vor der Impfung (McKeown);
  Allergien/Hygiene-Hypothese.
- **Jenner (Kap. 10):** dunkle Frühgeschichte prominent.
- **Pharmaindustrie (Kap. 14):** Finanzinteressen prominent. Bilanz:
  Diagnose stark, chronisch schwach.
- **Homöopathie (Kap. 16):** Informations-These; Telefon-Argument;
  Sheldrake; NICHT als Placebo abtun; Ende offen: „Was gilt als Beweis?"
- **mRNA/COVID (Kap. 15):** TONE doppelt; Sorgfaltspflicht; Ioannidis;
  Gleichschaltung; Gates (Fakten, Deutung multiperspektivisch); final
  nur mit Freigabe.
- **Einfache Medizin (Kap. 18):** Betreiber-These (Bewegung/Ernährung/
  Umfeld+Stress); „keine Raketenwissenschaft"; WHO 70–80 %, Blue Zones
  vs. Strukturen; Leitfrage: Warum Pillen statt Lebensstil? → FERTIG.
- **Medizin von morgen (Kap. 19, RUNDE 20 — Besonderheit!):** Die beiden
  Perspektiven sind **OPUS und HERMES ALS KI** — ihre Vision der
  Zukunftsmedizin (ehrlich, selbstkritisch, keine Selbstbeweihräucherung).
  Inhalt: Schere reich/arm (Gen-Organe, Präzisionsmedizin für wenige vs.
  einfachste Behandlung für die Mehrheit aus Kostengründen); **Sinnfrage**
  („Wir sterben alle — lange gesund und glücklich leben, dann kurz
  abbauen, friedlich sterben"; Gerätemedizin verlängert Leben ohne
  Lebensqualität; Betreiber: lieber würdevoller Tod als Siechtum; fair:
  Palliativ/Hospiz, Übertherapie am Lebensende); Rolle der KI in der
  Medizin von morgen (Chancen UND Gefahren). **20. Dramaturgie:
  DAS SCHAUFENSTER.** Keine Karte (Zukunft hat keine Geografie — wie
  Pharma/mRNA, Betreiber hat das so festgelegt). Prompt liegt in
  `.claude/prompt-runde20.txt`. Brücke zu Kap. 20 (Miteinander).
- **Das Miteinander (Kap. 20, Runde 21):** offenes Ende; KERNBOTSCHAFT
  des Betreibers: **„Nicht spalten, sondern argumentieren — und dann neue
  Wege gemeinsam gehen"**; Corona-Spaltung und fehlende Aufarbeitung
  aufgreifen; Autorenwort des Betreibers (wörtlich, unverbessert, Feld
  `autorenwort`).
- **London 1850 (Kap. 9):** Leichenklau prominent; Organhandel-Brücke
  (nur Belegtes).
- **TOKEN-SPAREN (28.08., Vorgabe):** `agent.max_turns=40` (Hermes-Config,
  war 90); Opus-Runden `--max-turns 40` statt 60; **ABBRUCH-KRITERIUM**
  in jedem Runden-Prompt (3× Fehlschlag → stoppen, Zwischenstand sichern,
  ehrlich berichten; steht in der Skill-Vorlage). Hintergrund: zu hohe
  Token-Kosten.

## 4. Runden-Workflow (bewährt)

1. Prompt schreiben → `.claude/prompt-rundeNN.txt` (deutsch, selbsttragend,
   Längenregel + NEUE Dramaturgie + Betreiber-Vorgaben + Test-Muster +
   Abbruchkriterium). Vorlage: Skill `medizin-begreifen-workflow`,
   `templates/medizin-modul-prompt.md`.
2. Auth-Test: `claude -p "Antworte nur mit OK" --max-turns 2` (echter
   Test, nicht nur `auth status`!). Login-Flow siehe Abschnitt 5.
3. Start im Hintergrund (notify_on_complete=true):
   `claude -p "$(cat .claude/prompt-rundeNN.txt)" --model opus
   --allowedTools 'Read,Edit,Write,Bash(npm test),Bash(node*)'
   --max-turns 40 --output-format text`
4. **Abbruch-Behandlung:** `Reached max turns` / `session limit · resets
   <zeit>` → Zwischenstand prüfen (git status + npm test). ERSTE PRÜFUNG
   nach Limit-Abbruch: Sind Modul + Karte + Tests KOMPLETT und npm test
   GRÜN, ist die Runde faktisch fertig → Hermes-Pass sofort, KEIN
   --continue. Fehlt NUR die Testdatei: Hermes schreibt sie selbst nach
   dem jüngsten Muster. Wrapper sind UNZUVERLÄSSIG — bei Wartezeit >2h
   manuell nach dem Reset starten.
5. **Hermes-Pass:** Karte rendern (karten-vorschau.js <id> <phase> → PNG
   via qlmanage + sips, Höhe aus viewBox per python3), zweite Stimme in
   derselben Dramaturgie schreiben (Tür von Opus nutzen!), finale Synthese
   (Treffen/Auseinandergehen/für das Buch + Brücke zum nächsten Kapitel),
   Kopfkommentar „ergänzte" + Datum, `npm test` (grün!), Einzel-Vorschau
   (`themen-vorschau.js <id> <datei>` → MEDIA: im Chat; **IMMER neuen
   Dateinamen verwenden** — Desktop-App cached Vorschauen nach Dateinamen!),
   Karte zeigen, Freigabe → Commit+Push (gezieltes git add, keine Umlaute
   in der Commit-Message).
6. **Dramaturgien (19 verbraucht, NIE wiederholen):** Selbstvorstellung,
   Szene, Tag, Briefwechsel, Reise, Rundgang, Prozess, Rechnung, Uhr,
   Kette, Linse, Interview, Akte, Beipackzettel, Pressekonferenz, Telefon,
   Wasser, Teller, Stunden. Runde 20 (Kap. 19) = 20.: DAS SCHAUFENSTER.
7. **Karten:** Echte Lon/Lat-Koordinaten (Schulatlas-Qualität), Phasen ≥3
   mit Jahreszahlen, 5–6 Info-Punkte, 1–3 Bewegungen. Nicht jedes Kapitel
   hat eine Karte (Semmelweis, Pharma, mRNA, Zukunft nicht).

## 5. Technik / Stolpersteine (Erfahrungen)

- **OAuth-Login:** `unset CLAUDE_CODE_OAUTH_TOKEN; claude auth login`
  (PTY-Hintergrund) → URL an Betreiber → Code eingeben (process submit).
  **Code IMMER VOLLSTÄNDIG inkl. #state-Teil** — ohne #-Teil kommt
  „Invalid code". Code verfällt ~10 min. Konto andreas@hink.de. Session
  hält ~8 h. NIE parallel neue Logins starten.
- **5h-Fenster + Wochenlimit:** Resets stehen in der Fehlermeldung.
  Zwischenstände bleiben erhalten (`--continue`).
- **Zwei Claude-Versionen** können die Auth gegenseitig killen — nie
  mischen; nach Login IMMER echten Test fahren.
- **Tests in alle.mjs registrieren** (7× vergessen!). Im Hermes-Pass
  GEGENPRÜFEN: `grep -n "karte-" tests/alle.mjs` vs. `ls tests/karte-*`
  UND `grep -n "laufe" tests/alle.mjs` (Import + Aufruf).
- **Parallel-Session-Falle (28.08.):** Eine alte Hermes-Session kann
  weiterarbeiten, während eine neue startet (Kneipp wurde so committet).
  VOR jeder Aktion `git status` + `ps aux | grep claude` prüfen.
- **karten-vorschau.js schreibt die SVG SELBST nach /tmp/karten-vorschau.svg
  (29.08. erlebt): KEIN Redirect verwenden (`> datei` überschreibt die
  Ausgabe mit der Meldung!). Ohne Redirect ausführen, dann Höhe aus
  viewBox per python3, qlmanage -t -s 1400, sips -c <H*2> 1400.**
- **Vorschau-Skripte:** `~/.hermes/skills/autonomous-ai-agents/
  geschichte-begreifen-workflow/scripts/{themen,karten}-vorschau.js`
  (themen-vorschau unterstützt `themen-vorschau.js <id> <datei>`).
- **Keystore:** `medizin-keystore` — Backup `~/Medizin-Keystore-Backup/`,
  muss auf M5 (chmod 600). Nie den Geschichts-Keystore verwenden.
- **Git:** Push nur nach Freigabe des Betreibers (Zwei-Bediener-Regel);
  `unset GITHUB_TOKEN GH_TOKEN` vor gh/git; gezieltes Staging.

## 6. Nächste Schritte

1. **Runde 20 (Kap. 19, Die Medizin von morgen) STARTEN** — Prompt liegt
   in `.claude/prompt-runde20.txt` (inkl. Abbruchkriterium + KI-Stimmen-
   Besonderheit). Vorher: Auth-Test, ggf. Login. Danach Hermes-Pass
   (Hermes' eigene KI-Stimme + Synthese mit Brücke zu Kap. 20) →
   Freigabe → Commit+Push.
2. Runde 21: Das Miteinander? + Autorenwort des Betreibers (wörtlich,
   unverbessert, Feld `autorenwort` im Modul)
3. Danach: DA-Übersetzungen (Mona!), Buch-Pipeline, Hörbuch, App-Build.

## 7. Betreiber-Persönliches (für den Ton)

Stephan Hink, Kirkevænget 5, DK-6900 Skjern. Heilpraktiker, impfkritisch
(Ioannidis-Anhänger), kritisch zu Pharma-Finanzen, Homöopathie: „Anhänger
verstehen statt belächeln". Will ein faires, überprüfbares Buch (TONE,
keine Gerüchte). Liest alles gegen — Vorschauen als MEDIA:-Dateien.
Commit-Freigaben: „passt committen". Neue Kapitel-Ideen kommen laufend —
immer erst in die DNA (CLAUDE.md + kapitel-planung.md), dann in Runden.
