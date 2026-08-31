# Medizin begreifen — Projekt-Übergabe (Stand: 31.08.2026)

> Diese Datei ist die Brücke für jede neue Session. Lies sie zuerst —
> zusammen mit `CLAUDE.md` (Projekt-DNA, verbindlich) und
> `notizen/kapitel-planung.md`. Der Skill `medizin-begreifen-workflow`
> (Hermes) enthält den Runden-Workflow, die Prompt-Vorlage und alle
> Stolpersteine.
>
> **REPO FINDEN (3 Wege):**
> 1. Symlink im Home: `~/Medizin-begreifen` → Repo. `cd ~/Medizin-begreifen`
>    oder in der Desktop-App das Projekt auf diesen Pfad setzen.
> 2. Direktpfad: `/Users/openclaw/Documents/GitHub/Medizin-begreifen`
>    (NUR auf dem M1-Server; alles läuft im DEFAULT-Profil, nur M1).
> 3. Diese Übergabe liegt zusätzlich unter `~/Medizin-begreifen-UEBERGABE.md`
>    (Home) — jede Session findet sie sofort.
> Läuft die Session nicht auf dem M1 (z. B. lokal auf dem M5), gibt es
> dort KEIN Repo — dann über Tailscale/SSH auf dem M1 arbeiten.

## 1. Das Projekt

**„Medizin begreifen" — Die Geschichte der Medizin** (Expo SDK 57, React
Native, JavaScript, CommonJS). Persönlichstes Buchprojekt von Stephan
(Heilpraktiker, impfkritisch, naturheilkundlich). Leitidee:
**„Wer schreibt die Geschichte der Medizin?"** — Multiperspektivität
zwischen Schulmedizin und Naturheilkunde. Jedes Kapitel = 2 Stimmen
(Opus = erste Perspektive, DeepSeek = zweite Perspektive) + finale
Synthese. Durchgängige Erkenntnis: **„Die Denkart bestimmt die Methode."**

**Buch-Titel (neu, Betreiber 30.08.):** DE „Eine Reise durch die
Medizingeschichte" — DA „En rejse gennem medicinhistorien".
Untertitel DE: „Von der Vergangenheit über die Gegenwart in die
Zukunft — ausgedacht von einem Menschen, geschrieben von zwei
unterschiedlichen KI-Modellen". DA: „Fra fortiden over nutiden ind i
fremtiden — udtænkt af et menneske, skrevet af to forskellige
AI-modeller".

Repo: https://github.com/stephanhink/Medizin-begreifen (public, main)
Lokal: `/Users/openclaw/Documents/GitHub/Medizin-begreifen` (M1-Server)
App: „Medizin begreifen" / `com.hink.medizin`; EAS:
@heilpraktikerdk/medizin-begreifen; Keystore `medizin-keystore`
(Backup: `~/Medizin-Keystore-Backup/` — NIE neu generieren!)

## 2. Stand: BUCH KOMPLETT — 20/20 Kapitel DE + DA, Cover, EPUB/PDF
(chronologische Kapitelreihenfolge seit 31.08.)

| # | Kapitel | Modul |
|---|---|---|
| 1 | Die Anfänge der Heilkunde (inkl. Ägypten) | anfaenge-der-heilkunde |
| 2 | China und die TCM | china-tcm |
| 3 | Indien und der Ayurveda | indien-ayurveda |
| 4 | Hippokrates und Galen | hippokrates-galen |
| 5 | Avicenna und die arabische Medizin | avicenna-arabische-medizin |
| 6 | Die Klostermedizin | klostermedizin |
| 7 | Paracelsus und Vesal | paracelsus-vesal |
| 8 | Harvey und der Blutkreislauf | harvey |
| 9 | Hahnemann und die Homöopathie | homoeopathie |
| 10 | Kneipp und die Naturheilkunde | kneipp |
| 11 | Grausame Anfänge der Chirurgie | chirurgie-anfaenge |
| 12 | Jenner und die Impfung | jenner-impfung |
| 13 | Pasteur und Lister | pasteur-lister |
| 14 | Röntgen und Penicillin | roentgen-penicillin |
| 15 | Die Verstaatlichung | verstaatlichung |
| 16 | Die moderne Pharmaindustrie | pharmaindustrie |
| 17 | mRNA/COVID | mrna-covid |
| 18 | Die einfache Medizin | einfache-medizin |
| 19 | Die Medizin von morgen (KI-Stimmen!) | medizin-von-morgen |
| 20 | Das Miteinander? + Autorenwort | miteinander |

**Commits (chronologisch):** 0ded738 (Kap. 18) → 32e2ac0 (Übergabe
29.08.) → e07e452 + 0d62418 (Kap. 19) → 8014a13 (Kap. 20, Buch 20/20)
→ 9bd4e27 (DA-Übersetzung aller 20) → 4064fe6 (Cover DE+DA)
→ b32f514 (Buch-Export: Titel + Stimmen-Labels) → 9b89768
(Kapitel-Umordnung: Homöopathie 9 + Kneipp 10 vor die Neuzeit;
Liston-Anekdote erklärt; Bücher neu gebaut).

**AUSGABE-DATEIEN (in `/Users/openclaw/Medizin-Buch/`, NICHT im Repo):**
- `Eine-Reise-durch-die-Medizingeschichte-DE.epub` + `.pdf` (PDF 448 S.)
- `En-rejse-gennem-medicinhistorien-DA.epub` + `.pdf` (PDF 427 S.)
- `Einleitung-und-Quellen-DE.md` / `-DA.md` (Vorwort-Quelle)
- EPUB: sichtbares Inhaltsverzeichnis (klickbar, nach Cover) +
  Reader-TOC (Nav+NCX) + Rücklinks; PDF: TOC mit Seitenzahlen
  (Zwei-Pass), Lesezeichen. Generator: `tools/buch-epub.cjs`
  (für Medizin angepasst; grünes Farbschema; Stimmen-Zeilen nennen
  „Opus — amerikanische KI (Anthropic)" / „DeepSeek — chinesische KI").
- Karten werden beim EPUB-Build als PNGs gerendert (karten-vorschau.js
  + rsvg-convert, Cache `/tmp/karten-cache`).

**Cover (`assets/`, Commit 4064fe6):** Gemini-Collage (google/gemini-3-
pro-image): Heilerin am Feuer → Kneipp im Wassertrog → moderner Chirurg
→ DNA (deutlich, oben), Grundfarbe Grün, verbindender Lichtfluss.
Dateien: cover-1600x2560.png (DE), cover-da-1600x2560.png (DA), je
JPEG 1600/800/400 (Kindle/Website/Miniatur), cover-collage-gemini.png
(ohne Text). Composite (Titel/Text) via HTML + Playwright-Screenshot.

## 3. Verbindliche Betreiber-Vorgaben (alle in CLAUDE.md)

- **TONE-Regel:** Beide Seiten fair, nichts einseitig verurteilen,
  nichts beschönigen. Jede Stimme benennt ihre unbequemen Stellen selbst.
- **KEINE-GERÜCHTE-Regel (25.08.):** Nur Belegtes. Unbelegtes fliegt raus.
  ABER: Ioannidis/COVID-Kritik bleibt (belegte Position, bestätigt).
  Quellen-Politik: KEIN Wikipedia, KEINE Faktencheck-Seiten —
  Primärquellen + investigative Medien.
- **Innovations-Zyklus (26.08., roter Faden):** Neues schadet zuerst,
  bevor es segensreich wird. Reifephase statt gut/böse.
- **Längenregel (24.08., gestuft):** Kap. 1–8 kurz+dicht; ab Kap. 9
  ausführlich+vollständig. **ABER Kap. 20 (Finale): bewusst KNAPP**
  (Betreiber-Korrektur 29.08.: „nur als knappes Schlusswort").
- **KLARSTELLUNG (29.08., in ALLE Module übernommen): Die zweite
  Stimme IST DeepSeek — die chinesische KI. Hermes ist nur der Agent.
  Leser-sichtbar: stimme 'DeepSeek' (19+1 Module), Kap. 19 nennt die
  Herkunft ausdrücklich (bewusst eine amerikanische KI (Opus) und eine
  chinesische KI (DeepSeek), ohne Wertung).**
- **KEINE Corona-Wiederholung im Finale (29.08.):** Kap. 15 deckt das
  ab; Kap. 20 = Tisch der Zeiten (Figuren des Buches) + Autorenwort.
- **Fauci RAUS (29.08.):** „ein Bürokrat, den ich nicht in meinem Buch
  haben möchte" → **Katalin Karikó** (mRNA-Forscherin, Nobelpreis 2023).
- **Homöopathie (Kap. 16):** Informations-These; NICHT als Placebo
  abtun; Ende offen: „Was gilt als Beweis?"
- **mRNA/COVID (Kap. 15):** TONE doppelt; Sorgfaltspflicht; Ioannidis;
  final nur mit Freigabe (Freigabe erteilt).
- **Einfache Medizin (Kap. 18):** Betreiber-These (Bewegung/Ernährung/
  Umfeld+Stress); „keine Raketenwissenschaft".
- **Medizin von morgen (Kap. 19):** Schere reich/arm, Sinnfrage,
  KI-Rolle; Verfügbarkeits-Abschnitt mit echten OpenRouter-Preisen
  (Opus 5 = 5/25 $ pro 1M, DeepSeek V4 Flash = 4,5/9 Cent, fairer
  Vergleich mit V4 Pro = 66 Cent/1,98 $ — Betreiber-Freigabe 29.08.).
- **Autorenwort (Kap. 20):** wörtlich, unverbessert, Feld `autorenwort`
  (5.474 Zeichen). In DA NICHT übersetzt (nur mit ausdrücklicher
  Freigabe; Mona-Entscheidung offen).

## 4. OFFENE PUNKTE / NÄCHSTE SCHRITTE

**Erledigt am 31.08. (Commits 9b89768 + 9a4dd6b):**
1. **Liston-300%-Satz:** Kap. 11 (chirurgie-anfaenge) erzählt die
   Anekdote jetzt als drei Todesfälle bei einer Operation; die
   Redewendung von der „dreihundertprozentigen Sterblichkeit" wird als
   Überlieferung erklärt (DE + DA, Tests angepasst). EPUB+PDF neu
   gebaut.
2. **Kapitelfolge chronologisch:** Homöopathie (9) + Kneipp (10) stehen
   nach Harvey (8) vor der Neuzeit. Neue Reihenfolge: 11 Chirurgie,
   12 Jenner, 13 Pasteur/Lister, 14 Röntgen/Penicillin,
   15 Verstaatlichung, 16 Pharmaindustrie, 17 mRNA/COVID,
   18 einfache Medizin, 19 Medizin von morgen, 20 Miteinander.
   Umgesetzt in index.js, buch-epub.cjs, allen Kopfzeilen und
   Querverweisen (DE + DA, auch kleingeschriebene dänische
   „kapitel"-Stellen) und Tests; npm test grün; Bücher neu gebaut.
   Hinweis: Dramaturgie-Beschriftungen in Testdateien („andere Struktur
   als in Kapitel N") behalten bewusst die Runden-Nummern.
3. **DA-Titel:** „En rejse gennem medicinhistorien" gewählt (im
   Buch-Export verwendet).
4. **Doku nachgezogen (31.08.):** CLAUDE.md, notizen/kapitel-planung.md
   und STAND.md zeigen die chronologische Kapitelliste.
5. **EN-ÜBERSETZUNG (Commit 73e4e26):** alle 20 Kapitel als en/<id>.js
   (Schema identisch, karteHinweise, EN-Glossar); Autorenwort ZWEISPRACHIG
   (en.autorenwort = Übersetzung, en.autorenwortDe = deutsches Original
   byte-identisch — der Leser wählt); Buch-Export um 'en' erweitert
   (Titel „A Journey Through the History of Medicine"). Buch gebaut:
   ~/Medizin-Buch/A-Journey-Through-the-History-of-Medicine-EN.epub/.pdf
   (11,9/18,0 MB, TOC englisch + chronologisch, Preface EN). Verifikation:
   en-check.js 20/20 OK (Längen 90–95 %), npm test grün. FALLEN: 2
   Timeout-Kapitel (mrna 2×, medizin-von-morgen 2× — trotz Schreib-Strategie;
   Fragment-Rettung per Vervollständigungs-Agent), Namensform Hippokrates →
   Hippocrates (deutsche Namensformen im EN-Text anpassen).
6. **EN-COVER (Commit …):** gleiche Gemini-Collage (cover-collage-gemini),
   englischer Text-Composite (HTML + Playwright): Titel „A Journey Through
   the History of Medicine", Untertitel, „Naturopath from Denmark".
   assets/cover-en-1600x2560.png + JPEG 1600/800/400. Buch + PDF damit
   neu gebaut (PDF-Seite 1 visuell verifiziert). FALLE: der PDF-Render
   hatte eine ZWEITE, ungepatchte Cover-Stelle (Zeile ~321) → PDF zeigte
   noch das DE-Cover; fixen + Backtick-Fehler beim Patchen (Syntaxfehler).

**Offen / nächste Schritte:**
1. **Hörbuch** (tools/hoerbuch.py): eine TTS-Stimme pro Perspektive
   (Opus-Stimme + DeepSeek-Stimme hörbar getrennt); da-DK ChristelNeural
   existiert.
2. **App-Build** (eas build, AAB) — mit Freigabe; GitHub Pages
   aktivieren (Workflow existiert, Pages war nie aktiviert: Fix
   `gh api repos/.../pages -X POST -f build_type=workflow`).
3. **Verteilung:** Amazon KDP 2,99 € (DE + DA, KI-Offenlegung
   ankreuzen!), naturklinikken-jylland.dk, Leanpub, GitHub (Release mit
   EPUB/PDF), Internet Archive, Podcast via GitHub-Releases.
4. **DA- und EN-Korrekturlesen** durch Betreiber/Mona
   (Qualitätsschritt).

## 5. Runden-Workflow (bewährt, für Inhalts-Runden)

1. Prompt → `.claude/prompt-rundeNN.txt` (deutsch, selbsttragend,
   Längenregel + NEUE Dramaturgie + Betreiber-Vorgaben + Test-Muster +
   Abbruchkriterium). Vorlage: Skill `medizin-begreifen-workflow`,
   `templates/medizin-modul-prompt.md`.
2. Auth-Test: `claude -p "Antworte nur mit OK" --max-turns 2` (echter
   Test!). Login-Flow siehe Skill (Code VOLLSTÄNDIG inkl. #state-Teil).
3. Start: `claude -p "$(cat .claude/prompt-rundeNN.txt)" --model opus
   --allowedTools 'Read,Edit,Write,Bash(npm test),Bash(node*)'
   --max-turns 40 --output-format text` (Hintergrund, notify).
4. **STIMMEN:** Opus = erste Perspektive + Karte + Tests; **DeepSeek**
   (über Hermes) = zweite Perspektive + finale Synthese. Zweite Stimme
   EIGENSTÄNDIG schreiben (Runde-20-Lehre: „nicht an Opus heften",
   Herkunft als echte Perspektive nutzen).
5. **Hermes-Pass:** zweite Stimme + Synthese; `npm test` (Torwächter —
   Registrierung in tests/alle.mjs GEGENPRÜFEN: Import + Aufruf!);
   Balance-Check (Ziel ±20 %; Asymmetrie als Option anbieten);
   Vorschau mit NEUEM Dateinamen (Cache-Falle!);
   Freigabe → Commit+Push (deutsche Message OHNE Umlaute).
6. Abbruch-Behandlung + alle Stolpersteine: Skill `medizin-begreifen-
   workflow` (Stand-Abschnitt ist aktuell bis 30.08.).

## 6. Technik / Stolpersteine (Kurzfassung — Details im Skill)

- **DA-Übersetzung:** Subagenten-Pipeline (Skill `mehrsprachige-
  inhaltsuebersetzung`), Glossar `/tmp/da-glossar.md`, da/<id>.js mit
  karteHinweise statt karte, Autorenwort NICHT übersetzen, Länge
  89–93 %. NACH jedem Batch LÄNGENVERHÄLTNIS JE STIMME prüfen
  (mrna-covid-Falle: Struktur ok, aber Stimme nur 40 %!).
- **Buch-Export:** `tools/buch-epub.cjs <de|da> [pdf]` → ~/Medizin-Buch.
  Hintergrund-Prozesse scheitern beim PDF-Render (python3-heredoc) —
  PDFs IMMER im Vordergrund bauen! Karten-Cache /tmp/karten-cache.
- **Vorschau-Skript:** medizin-Kopie mit Autorenwort-Support
  (medizin-begreifen-workflow/scripts/themen-vorschau.js) — die
  geschichte-Kopie kennt `autorenwort` nicht.
- **Cover:** OpenRouter images/generations mit google/gemini-3-pro-image;
  Composite via HTML + Playwright (/usr/local/bin/python3);
  Bildmodelle schreiben keinen langen Text → Text im HTML-Composite.
- **Git:** Push nur nach Freigabe; `unset GITHUB_TOKEN GH_TOKEN`;
  Parallel-Session-Falle (vor jedem Commit: git status + git log + ps).
- **Keine neuen npm-Pakete** ohne Freigabe; app.json/eas.json/
  package.json nur mit Freigabe ändern.
- **Commit-Messages auf Deutsch, OHNE Umlaute.**

## 7. Betreiber-Persönliches (für den Ton)

Stephan Hink, Kirkevænget 5, DK-6900 Skjern. Heilpraktiker, impfkritisch
(Ioannidis-Anhänger), kritisch zu Pharma-Finanzen, Homöopathie: „Anhänger
verstehen statt belächeln". Will ein faires, überprüfbares Buch (TONE,
keine Gerüchte). Liest alles gegen — Vorschauen als MEDIA:-Dateien.
Commit-Freigaben: „passt committen". Verheiratet mit Mona (Dänin, liest
die DA-Fassung — VOLLSTÄNDIGE Inhalte wichtig). Zwei Kinder im
Schulalter. Neue Kapitel-Ideen kommen laufend — immer erst in die DNA
(CLAUDE.md + kapitel-planung.md), dann in Runden.
