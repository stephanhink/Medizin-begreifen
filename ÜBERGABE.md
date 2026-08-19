# ÜBERGABE — Projekt „Medizin begreifen" (Die Geschichte der Medizin)
Stand: 2026-08-19. Diese Datei ist der Startpunkt für eine NEUE Session.

## 1. WAS DER BETREIBER WILL (wörtlich, 17./18.08.2026)
„Ich möchte das neue Projekt, das Medizinbuch angehen. Ich möchte es analog
zu dem Geschichtsprojekt angehen, also auch mit GitHub und der gleichen
Technik." — „Die Geschichte der Medizin" ist für ihn (Heilpraktiker!) das
persönlichste Projekt; es folgt NACH dem Abschluss von „Geschichte begreifen"
(Buch + Hörbuch sind dort fertig; Veröffentlichung läuft). Das Medizinbuch
bekommt dieselbe Maschine: App (React Native/Expo) + Buch (EPUB/PDF) +
Hörbuch (TTS/Podcast) + Verteilung (frei + Amazon 2,99 €, nie KDP Select).

## 2. DIE PROJEKT-DNA (aus notizen/medizin-projekt.md im Geschichts-Repo)
- Leitidee (wie beim Geschichtsbuch): „Der Sieger schreibt die Geschichte" —
  für die Medizin: Wer schreibt die Geschichte der Medizin? Die akademische
  Schulmedizin hat sie lange geschrieben — die Naturheilkunde, die
  Kräuterheilkunde, die verfolgten Heilerinnen („Hexen") hatten keine Stimme.
  Multiperspektivität ist hier BRISANT und persönlich (der Betreiber ist
  Heilpraktiker).
- TONE-Regel (verbindlich): BEIDE Seiten fair — die Schulmedizin (Erfolge:
  Hygiene, Antibiotika, Impfung, Chirurgie — und die dunklen Stellen:
  NS-Medizin, Zwangssterilisationen, späte Fehler) UND die Naturheilkunde
  (Wissen, Tradition, Sanftheit — und die dunklen Stellen: Wundermittel,
  fehlende Evidenz, Scharlatanerie). Nichts einseitig verurteilen, nichts
  beschönigen. „Wirklich objektiv" gilt wie bei Putin im Geschichtsbuch.
- Der Bogen (Kapitel-Idee, Reihenfolge final mit dem Betreiber abstimmen):
  Schamanen & Kräuterkundige → Ägypten (Ebers-Papyrus) → Hippokrates (der
  Eid) → Galen → Avicenna & die Araber (bewahrten die Antike!) →
  Klostermedizin (Hildegard von Bingen) → Paracelsus & Vesal (Anatomie) →
  Harvey (Blutkreislauf) → Jenner (Impfung 1796) → Semmelweis (Hände
  waschen!) → Pasteur & Lister (Keimtheorie) → Röntgen & Penicillin →
  moderne Pharmaindustrie → mRNA/COVID → die Wiederentdeckung der
  Naturheilkunde + Zukunft (KI in der Medizin).
- Perspektiven-Ideen (2+ pro Kapitel, je nach Kapitel 3-4):
  Schulmedizin vs. Naturheilkunde, Arzt vs. Patient, Westen vs. Osten
  (TCM/Ayurveda), Pharmaindustrie vs. Kranke, Heilerin vs. Inquisition.
- Das Buch endet OFFEN mit einer Frage (wie das Geschichtsbuch — der
  Betreiber schreibt das letzte Wort selbst, wörtlich, unverbessert,
  hervorgehoben als „Schlusswort des Autors").

## 3. DIE TECHNIK — ALLES AUS DEM GESCHICHTSPROJEKT ÜBERNEHMEN
Das Geschichtsprojekt ist die KOMPLETTE Vorlage:
- Repo: /Users/openclaw/Documents/GitHub/Geschichte-begreifen (main, public)
- App: React Native/Expo SDK 57; App.js, screens/, components/ (design.js,
  abschnitte/), utils/lernformat.js, utils/themen/ (die Module!) +
  utils/themen/index.js (Reihenfolge!), utils/themen/karten/, tests/
  (npm test = Torwächter, ~4100 Prüfungen), CLAUDE.md (Projekt-DNA!),
  eas.json, app.json, ÜBERGABE.md, .claude/ (wip.md, prompt-Runden).
- Buch-Pipeline: tools/buch-epub.cjs (EPUB + PDF, epubcheck-validiert),
  tools/hoerbuch.py (Hörbuch: Piper/Thorsten DE, edge/Christel DA, parallel,
  Continue), tools/podcast-feed.py (Feeds DE+DA, GitHub-Releases),
  tools/genspark-texte.py (Web-App-Vorlagen).
- Cover: HTML+Playwright (1600x2560, KDP-konform), cover-final.png (DE) +
  cover-da.png (DA) in ~/Geschichte-Buch/.
- Karten: utils/themen/karten/<id>.js (Phasen) + karten-vorschau.js-Skript
  (SVG→PNG via rsvg-convert, Cache /tmp/karten-cache).

### EINRICHTUNG (die neue Session führt das aus — Schritt für Schritt)
1. GitHub: `gh repo create Medizin-begreifen --public` (oder --private, mit
   dem Betreiber klären; public = Verteilungsweg). Der Betreiber: stephanhink.
   WICHTIG: `unset GITHUB_TOKEN GH_TOKEN` vor jedem gh-Befehl (die env-
   Variable ist abgelaufen und überschreibt die gespeicherte Auth!).
2. Vorlage kopieren: Das Geschichts-Repo in das neue Repo klonen/entpacken
   OHNE .git (git init neu), dann: App-Namen ändern (app.json: name/slug
   „Medizin begreifen"/„medizin-begreifen"; package com.hink.medizin — mit
   dem Betreiber abstimmen), die utils/themen/*.js ENTFERNEN (die neuen
   Medizin-Module kommen in den Runden!), CLAUDE.md NEU schreiben (die
   Medizin-DNA!), die Kapitel-Planung (notizen/) anlegen.
3. EAS/Keystore: `eas init` (Projekt @heilpraktikerdk/medizin — der
   Expo-Token in ~/.expo/access-token (chmod 600) funktioniert für beide!),
   `eas credentials` → einen NEUEN Keystore erzeugen (medizin-keystore) —
   NIE den Geschichts-Keystore verwenden! Keystore-Backup: der Betreiber
   speichert ihn auf dem M5. Regeln: Keystore NIE neu generieren, nur lesen;
   versionCode automatisch hochzählen (EAS remote).
4. Builds: ~/.hermes/scripts/build-aab-lokal.sh als Vorlage (JDK 17 brew
   keg-only + Android-SDK unter /opt/homebrew/share/android-commandlinetools;
   ANDROID_HOME/JAVA_HOME nur im Skript; Gradle-RAM 2 GB; AAB nach
   ~/AABs/).
5. Buch-Pipeline: tools/ aus dem Geschichts-Repo kopieren (die Pfade im
   Kopf der Skripte anpassen: REPO-Pfad + die Modul-Listen kommen aus dem
   neuen utils/themen/index.js von selbst).

## 4. DIE RUNDEN-METHODE (wie im Geschichtsprojekt)
- Ablauf pro Kapitel: (1) Runde mit Opus (claude -p, Prompt in .claude/
  prompt-rundeNN.txt — NIE inline, NIE in /tmp!), Opus schreibt die ERSTE
  Perspektive + Karte + Tests; (2) Hermes-Pass: die weiteren Perspektiven
  (2-4 Stimmen), die finale Synthese, CLAUDE.md-Update, npm test grün;
  (3) Freigabe vom Betreiber → Commit+Push; (4) weiter.
- Auth vor jeder Runde: Mini-Test `claude -p "Antworte nur mit OK"` —
  Session-Limits sind normal („resets HH:MM" — kein Auth-Problem);
  Login-Workflow: `claude auth login` im Chat (URL + Code an den Betreiber);
  nie ~/.claude/.credentials.json löschen; CLAUDE_CODE_OAUTH_TOKEN unsetten.
- Zwei-Bediener-Regel: Hermes committet/pusht NUR nach ausdrücklicher
  Freigabe. CLAUDE.md ist geschützt (Agent-Patches brauchen die Freigabe des
  Betreibers). Commit-Messages ohne Umlaute. `npm test` VOR jedem Commit.
- Tests: tests/alle.mjs registriert die Kapitel; die Testdatei pro Kapitel
  prüft Schema, TONE, Quiz, Karten-Zustände (zustandstolerant).
- Karten: historisch präzise, Phasen mit Jahreszahlen, Vision-Check.
- Die App endet offen; der Betreiber schreibt das Schlusswort selbst.

## 5. VERBINDLICHE REGELN (aus dem Geschichtsprojekt übernommen)
- Zwei-Bediener-Regel (Freigabe vor Commit/Push/Veröffentlichung).
- Bei neuen Vorhaben mit Konsequenzen: erst Ablauf + Risiken erklären, dann
  handeln. Bei hartnäckigen Problemen: Foren/GitHub-Issues prüfen.
- Keine neuen npm-Pakete ohne Freigabe. Kommunikation auf Deutsch.
- Keystore nur lesen. Env-Variablen nur in Build-Skripten.
- GITHUB_TOKEN/GH_TOKEN unsetten vor gh. Expo-Token nur für Builds.
- Die Betreiber-Anschrift: Stephan Hink, Kirkevænget 5, DK-6900 Skjern (æ!).
- Sprachen: DE zuerst, dann DA (Mona liest/hört alles!), EN später.

## 6. WAS BEREITS EXISTIERT (die neue Session findet es)
- Ideenskizze: /Users/openclaw/Documents/GitHub/Geschichte-begreifen/
  notizen/medizin-projekt.md (der Bogen + die Perspektiven-Ideen)
- Vorlage: das komplette Geschichts-Repo (s. o.) + ~/Geschichte-Buch/
  (die Buch-Pipeline-Artefakte, Cover, QS-Checkliste, Verteilungsstrategie)
- Skills: ~/.hermes/skills/autonomous-ai-agents/geschichte-begreifen-workflow/
  (Runden-Skripte, karten-vorschau.js — die neue Session kann sie laden
  und für Medizin anpassen; ggf. einen medizin-begreifen-workflow-Skill
  anlegen).
- Build: JDK 17 (brew, keg-only), Android-SDK, ~/.expo/access-token,
  ~/.hermes/scripts/build-aab-lokal.sh (Vorlage).
- Verteilung (nach dem Buch): Amazon 2,99 € (KDP verifiziert), Website
  naturklinikken-jylland.dk, Leanpub, GitHub, Internet Archive, Podcast
  via GitHub-Releases (die Feed-URLs sind gratis + stabil).

## 7. ERSTE SCHRITTE DER NEUEN SESSION (Vorschlag)
1. Diese Datei + notizen/medizin-projekt.md lesen (und die CLAUDE.md des
   Geschichtsprojekts als Vorlage).
2. Mit dem Betreiber klären: Repo-Name (Vorschlag: Medizin-begreifen),
   public/private, App-Name, die finale Kapitel-Reihenfolge.
3. Einrichtung (s. o.): Repo, EAS/Keystore, Build-Skript, Buch-Pipeline.
4. CLAUDE.md des neuen Projekts schreiben (Medizin-DNA + die Regeln).
5. Kapitel-Planung in notizen/kapitel-planung.md anlegen.
6. Runde 1 starten (das erste Kapitel — vermutlich die Anfänge: Schamanen,
   Ägypten, Hippokrates) — mit Auth-Check + Freigabe des Betreibers.
