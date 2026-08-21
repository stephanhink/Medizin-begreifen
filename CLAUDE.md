# Medizin begreifen — Projektregeln

Dieses Dokument ist die verbindliche Projekt-DNA. Es wächst mit dem Projekt
und wird vor jeder Arbeit gelesen. Stand: 2026-08-19 (V2, vom Betreiber
bestätigt). Vorlage: Schwesterprojekt „Geschichte begreifen".

## Ziel und Zielgruppe

Die App „Medizin begreifen" erzählt **Die Geschichte der Medizin** — und sie
vermittelt dem Leser eine Grundbotschaft, die der Betreiber so formuliert
hat:

> **Die Medizin hat eine lange Vergangenheit.** Die Menschen haben schon
> immer versucht, Krankheiten zu verstehen und mit ihren Mitteln zu
> behandeln — und das war ganz unterschiedlich. Die Ägypter waren ihrerzeit
> sehr fortschrittlich, die chinesische Medizin hat bis heute ihre
> Bedeutung, auch die indische Medizin ist noch aktuell — und die deutsche
> Tradition mit Hildegard von Bingen und Pfarrer Sebastian Kneipp.

Die App macht Medizin für interessierte Laien begreifbar: **kein
Fachchinesisch, keine Angst, kein Missionieren.** Sie zeigt, dass Medizin
weltweit, in allen Kulturen und zu allen Zeiten betrieben wurde — und sie
stellt die Frage, die den Betreiber umtreibt: **Sollte nicht ein Miteinander
existieren?**

Der Betreiber ist Heilpraktiker. Die App ist sein persönlichstes Projekt:
Sie behandelt die Naturheilkunde als gleichwertige Tradition mit eigener
Geschichte — ohne die Schulmedizin zu verurteilen.

## Die zwei Grundfragen des Buches

1. **Die lange Vergangenheit:** Wie haben sich die alten Methoden
   entwickelt, welche Annahmen standen dahinter, welche Wirkungen hatten
   sie? Jedes Kapitel beantwortet diese drei Fragen für seine Zeit:
   **(a) Entwicklung** (wie entstand das Wissen?), **(b) Annahmen** (was
   glaubten die Menschen damals, warum handelten sie so?), **(c) Wirkungen**
   (was bewirkte es — für die Menschen damals und bis heute, Erfolge UND
   Grenzen/Nebenwirkungen).
2. **Das Miteinander:** Die moderne Medizin ist erst ~150 Jahre alt und
   begann unter grausamen Umständen (keine Hygiene, Amputationen ohne
   Betäubung vor Publikum in London, dann die Keimtheorie und die
   Verstaatlichung des Gesundheitswesens). Sie ist hervorragend in der
   **Diagnose** (vor allem bildgebende Verfahren), aber in der **Behandlung**
   chronischer Krankheiten (Krebs, Diabetes) noch nicht sehr weit. Das Buch
   erzählt beide Seiten fair — und endet OFFEN mit der Frage, ob nicht ein
   Miteinander von Schulmedizin und Tradition existieren sollte.

## Leitidee: Wer schreibt die Geschichte der Medizin?

Das Herzstück ist **Multiperspektivität**: Die akademische Schulmedizin hat
die Geschichte der Medizin lange allein geschrieben — die Naturheilkunde,
die Kräuterheilkunde, die verfolgten Heilerinnen („Hexen") und die
indigenen Völker hatten keine Stimme. Deshalb gilt wie im Geschichtsprojekt:

- **Kein Thema wird als eine einzige Wahrheit erzählt.** Zu jedem Kapitel
  gibt es mehrere klar gekennzeichnete Perspektiven (z. B. „Sicht der
  Schulmedizin", „Sicht der Naturheilkunde", „Sicht der Patienten", „Sicht
  der indigenen Völker").
- Jede Perspektive ist als solche markiert — sie ist eine Erzählung, keine
  objektive Wahrheit. Die App sagt nie „so war es", sondern „so wird es aus
  dieser Sicht erzählt".
- Eine **Synthese** führt die Perspektiven zusammen: Wo stimmen sie überein,
  wo widersprechen sie sich, und warum könnte das sein?
- Am Ende steht **„Dein Urteil"**: Die Leserin/der Leser bildet sich
  ihre/seine eigene Meinung. Es gibt kein Richtig oder Falsch — nur die
  eigene, begründete Sicht.

### TONE-Regel (verbindlich)

BEIDE Seiten werden fair behandelt — nichts einseitig verurteilen, nichts
beschönigen. „Wirklich objektiv" gilt wie beim Putin-Kapitel im
Geschichtsbuch.

- Die **Schulmedizin**: Erfolge (Hygiene, Antibiotika, Impfung, Chirurgie,
  Bildgebung) UND die dunklen Stellen (grausame Anfänge ohne Narkose und
  Hygiene, NS-Medizin, Zwangssterilisationen, Interessenkonflikte der
  Pharmaindustrie, Grenzen bei chronischen Krankheiten wie Krebs und
  Diabetes).
- Die **Naturheilkunde und die alten Traditionen**: Wissen, Tradition,
  Sanftheit, jahrhundertealtes Erfahrungswissen (TCM, Ayurveda, Hildegard,
  Kneipp, indigene Heilpflanzen) UND die dunklen Stellen (Wundermittel,
  fehlende Evidenz, Scharlatanerie, Heilversprechen ohne Beleg).
- Der **Begriff „primitiv"** wird im Buch kritisch behandelt: Er ist eine
  koloniale Zuschreibung (wer nannte wen primitiv?). Die sogenannten
  „primitiven" Völker hatten ausgefeilte Heilverfahren — und die moderne
  Medizin verdankt ihnen wirksame Arzneien (z. B. Chinin aus der
  Chinarinde gegen Malaria, Kurare für die Chirurgie, Digitalis-Wissen aus
  der Volksmedizin, Schädeltrepanationen, die Menschen überlebten).
- Der Deutschland-Bezug gehört dazu: Hildegard von Bingen, Kneipp,
  Hahnemann, Kurierfreiheit — und heikel: die „Neue Deutsche Heilkunde"
  (NS). Das wird fair behandelt.

**Zusatzregel für sensible Themen** (übernommen aus dem Geschichtsprojekt):
Jede Perspektive benennt die unbequemen Stellen der eigenen Erzählung
selbst, statt sie der Gegenstimme zu überlassen; die Beweggründe der anderen
Seite werden fair wiedergegeben; die Karte zeigt historische Zustände mit
Jahreszahl und bewertet nicht; Quizfragen bleiben Wissensfragen. `tests/`
prüft diese Zusagen nach.

### Perspektiven-Workflow (wer schreibt welche Stimme)

- **Opus (Claude Code)** verfasst die ERSTE Perspektive je Kapitel + die
  Karte + die Tests (Runden-Methode, siehe unten).
- **Hermes** verfasst die weiteren Perspektiven (2–4 Stimmen), die finale
  Synthese und aktualisiert CLAUDE.md und Tests.
- Im Repo ist pro Perspektive festgehalten, welche Stimme sie geschrieben
  hat (Attribution im Themen-Modul, nicht in der App-Oberfläche).

## Themenlandkarte (Bogen)

Die Reihenfolge hier ist zugleich die Reihenfolge in der App
(`utils/themen/index.js`). Details: `notizen/kapitel-planung.md`.

1. **Die Anfänge der Heilkunde** — Schamanen, Kräuterkundige und die
   „primitiven" Völker (Begriff kritisch reflektiert). Trepanation,
   Heilpflanzenwissen, indigene Medizin weltweit; was die moderne Medizin
   von ihnen übernahm. Perspektiven: Heilerin/Heiler vs. Stamm; indigenes
   Wissen vs. koloniale Abwertung.
2. **Ägypten** — der Ebers-Papyrus; die fortschrittliche Heilkunst des
   Niltals.
3. **China und die TCM** — die chinesische Medizin hat bis heute ihre
   Bedeutung (Akupunktur, Kräuter, Qi). Perspektiven: Westen vs. Osten.
   **Betreiber-Vorgabe (Denkart-Analyse):** Dieses Kapitel analysiert die
   Denkart der TCM UMFANGREICH: das Weltbild (Qi, Yin und Yang, die Fünf
   Elemente, Meridiane), die Begründungslogik hinter den Methoden (Warum
   Akupunktur? — den Fluss des Qi fördern; Warum Kräuter-Rezepturen? —
   kombinierte Wirkung; Warum Puls- und Zungendiagnose?) — und die
   ehrliche Wirkungsbilanz (was die Forschung heute belegt, z. B.
   Akupunktur bei Schmerzen, und was nicht messbar/umstritten ist).
4. **Indien und der Ayurveda** — bis heute aktuell. Perspektiven:
   Tradition vs. Modernisierung; Indien vs. koloniale Medizin.
   **Betreiber-Vorgabe (Denkart-Analyse):** Dieses Kapitel analysiert die
   Denkart des Ayurveda UMFANGREICH: das Weltbild (die drei Doshas Vata,
   Pitta, Kapha aus den Elementen), die Begründungslogik hinter den
   Methoden (Warum Ernährung/Lebensweise? — Doshas ausgleichen; Warum
   Panchakarma-Reinigungen?; Warum Kräuter wie Kurkuma/Ashwagandha?) —
   und die ehrliche Wirkungsbilanz (was belegt ist, was kulturell
   verwurzelt/umstritten ist).
5. **Hippokrates und Galen** — die europäische Wurzel; der Eid.
6. **Avicenna und die arabische Medizin** — sie bewahrten die Antike.
7. **Klostermedizin** — Hildegard von Bingen; die deutsche Tradition der
   Klostergärten.
8. **Paracelsus und Vesal** — die Anatomie erwacht; Empirie vs. Autorität.
9. **Harvey** — der Blutkreislauf; Beobachtung vs. Lehrmeinung.
10. **Die grausamen Anfänge der modernen Chirurgie** — Amputationen ohne
    Betäubung vor Publikum (London), die chirurgischen Theater; Semmelweis
    und das Händewaschen. Die moderne Medizin ist erst ~150 Jahre alt.
11. **Jenner** — die Impfung (1796); Impfbefürworter vs. Impfgegner.
12. **Pasteur und Lister** — die Keimtheorie; Narkose und Antisepsis; die
    Geburtsstunde der wissenschaftlichen Medizin (~1870).
13. **Röntgen und Penicillin** — bildgebende Diagnostik und Antibiotika;
    Strahleneuphorie vs. Strahlenschäden.
14. **Die Verstaatlichung des Gesundheitswesens** — Hygiene als
    Staatsaufgabe, Krankenhäuser, Bismarck 1883; Zugang für alle UND
    Verdrängung der Naturheilkunde, Kurierfreiheit.
15. **Die moderne Pharmaindustrie** — Heilsbringer und Interessen; die
    ehrliche Bilanz: Diagnose hervorragend (Bildgebung), Behandlung
    chronischer Krankheiten (Krebs, Diabetes) noch nicht weit.
16. **mRNA/COVID** — die Impfstoff-Wende; Wissenschaft vs. Politik.
    **Betreiber-Vorgabe (wichtig):** Dieses Kapitel behandelt der Betreiber
    mit besonderer Sorgfalt — er stimmt in diesen Punkten vermutlich nicht
    mit der KI überein. Deshalb gilt hier die TONE-Regel doppelt: BEIDE
    Sichtweisen (Befürworter wie Skeptiker) stehen mit ihren Argumenten
    nebeneinander, ohne Dämonisierung und ohne Beschönigung; die kritischen
    Fragen (Schnellzulassung, Nebenwirkungs-Meldeverfahren, politische
    Maßnahmen, Impfpflicht-Debatten) werden fair und sachlich behandelt.
    Die KI setzt hier nicht ihre eigene Position durch — das Kapitel wird
    nur mit ausdrücklicher Freigabe des Betreibers final.
17. **Kneipp und die Wiederentdeckung der Naturheilkunde** — Wasser,
    Bewegung, Ordnung; die Naturheilkunde heute (Heilpraktiker,
    Kurierfreiheit).
18. **Das Miteinander?** — die offene Zukunft: Integrative Medizin, KI in
    der Medizin. Das Buch endet OFFEN mit der Frage, ob nicht ein
    Miteinander existieren sollte — der Betreiber schreibt das letzte Wort
    selbst, wörtlich, unverbessert, hervorgehoben als „Schlusswort des
    Autors" (Feld `autorenwort` im Modul).

## Lernformat

Kein Zeitdruck, keine Noten — **Erforschen statt Pauken.** Jedes Kapitel
folgt demselben Muster (aus dem Geschichtsprojekt übernommen):

1. **Aufhänger** — eine spannende Frage statt Datenwüste.
2. **Medizin in Bewegung** — interaktive Grafiken (Karten/Zeitverläufe) mit
   `react-native-svg`. Die Karte ist die Bühne, nicht die Illustration:
   Texte stehen hinter anklickbaren Info-Punkten. **Der Abschnitt ist
   optional** — Themen ohne `karte` überspringen ihn (viele Medizin-Kapitel
   wie Semmelweis oder die Pharmaindustrie haben keine Geografie; dort
   entfällt er bewusst, wie beim Zukunftskapitel im Geschichtsprojekt).
3. **Zwei Blickwinkel** (oder mehr) — die Perspektiven nebeneinander.
4. **Synthese** — Übereinstimmungen und Widersprüche.
5. **Dein Urteil** — offene Frage; die eigene Antwort wird auf dem Gerät
   gespeichert (kein Richtig/Falsch).
6. **Nebenbei: „Stimmt's?"** — lockere Quizfragen ohne Zeitdruck.

**Erzähl-Muster je Kapitel (Betreiber-Vorgabe):** Jedes Kapitel beantwortet
die drei Fragen — Wie entwickelte sich die Methode? Welche Annahmen standen
dahinter? Welche Wirkungen hatte sie (Erfolge UND Grenzen)?

**Denkart-Analyse (Betreiber-Vorgabe, besonders für TCM und Ayurveda):**
Der Betreiber will die DENKART hinter den Methoden verstehen und
beschreiben — nicht nur WAS gemacht wurde, sondern WARUM: Welches
Weltbild steckt dahinter (Qi, Yin/Yang, Fünf Elemente; Doshas, Elemente)?
Warum wurde dies oder das gemacht — was versprach man sich davon? Warum
sollte es helfen (die Begründungslogik der Zeit)? Dazu gehört immer auch
die ehrliche Wirkungsbilanz: Was belegt die Forschung heute, was ist
nicht messbar oder umstritten? Die Denkart ist der Schlüssel zur
Miteinander-Frage: Zwei Denkarten von Gesundheit (Gleichgewicht vs.
Ursache-Wirkung) stehen sich gegenüber — beide haben Stärken.

Der Lernfortschritt („erforscht/entdeckt") wird lokal gespeichert — keine
Accounts, kein Netzwerk.

## Tech-Stack (bewusste Entscheidungen, aus dem Geschichtsprojekt)

- **Expo SDK 57 / React Native / JavaScript** — kein TypeScript.
- **Fachlogik in `utils/` ohne UI** — mit blankem `node` prüfbar.
- **Lokaler State via `@react-native-async-storage/async-storage`** —
  Lernfortschritt und „Dein Urteil" bleiben auf dem Gerät.
- **EAS Build remote-Credentials** — Keystore liegt bei EAS
  (@heilpraktikerdk/medizin). NIE den Geschichts-Keystore verwenden;
  Keystore nur lesen, nie neu generieren. Backup auf dem M5 des Betreibers.

## Architektur-Regel

**Fachlogik und Inhalte gehören in `utils/` — ohne UI-Importe, mit blankem
`node` prüfbar.** React-Komponenten (`components/`, `screens/`) bleiben dünn.

Die **Themeninhalte** liegen als strukturierte Daten in `utils/themen/`
(ein Modul pro Kapitel: Aufhänger, Karte, Perspektiven mit Attribution,
Synthese, Urteils-Fragen, Quiz, optional `autorenwort`). Die Texte sind
menschenlesbar (der Betreiber liest sie im Repo gegen) und testbar.

Die **Karten** liegen daneben in `utils/themen/karten/` (eine Datei je
Kapitel): Küstenlinien als echte Längen-/Breitengrade `[lon, lat]`,
`utils/karte-geo.js` rechnet sie in SVG-Koordinaten um. Der Karten-Test je
Kapitel prüft gegen den Atlas nach (bekannte Punkte auf der gezeichneten
Linie, Kontrollpunkte im Binnenland/auf See, Toleranz nach Maßstab).

`tests/architektur.mjs` prüft die Regel nach: keine UI-Importe in `utils/`
und `tests/`, jede utils-Datei mit blankem `node` ladbar, alle Importpfade
auflösbar, keine neuen npm-Pakete.

## Prüf-Regel

**`npm test` ist der Torwächter.** Eine Änderung an der Fachlogik ohne
bestandene Prüfung gehört nicht ins Repo. Neue Testdateien MÜSSEN in
`tests/alle.mjs` eingetragen werden, sonst zählen sie nicht.

## Runden-Methode (wie im Geschichtsprojekt)

Ablauf pro Kapitel:
1. Runde mit Opus (`claude -p`, Prompt in `.claude/prompt-rundeNN.txt` —
   NIE inline, NIE in /tmp/). Opus schreibt die ERSTE Perspektive + Karte +
   Tests.
2. Hermes-Pass: die weiteren Perspektiven (2–4 Stimmen), die finale
   Synthese, CLAUDE.md-Update, `npm test` grün.
3. Freigabe vom Betreiber → Commit + Push.
4. Weiter.

Auth vor jeder Runde: Mini-Test `claude -p "Antworte nur mit OK"` —
Session-Limits sind normal („resets HH:MM" — kein Auth-Problem);
Login-Workflow: `claude auth login` im Chat (URL + Code an den Betreiber);
nie `~/.claude/.credentials.json` löschen; `CLAUDE_CODE_OAUTH_TOKEN`
unsetten.

## Git- und Build-Regeln

- **Zwei-Bediener-Regel:** Git-Operationen (commit/push) und Builds
  (`eas build`) laufen nur mit ausdrücklicher Freigabe des Betreibers.
  Code-Änderungen + `npm test` laufen autonom.
- **CLAUDE.md ist geschützt** — Agent-Patches an dieser Datei brauchen die
  Freigabe des Betreibers.
- `git status` ist der erste Schritt jeder Arbeit.
- Commit-Messages auf Deutsch, prägnant, OHNE Umlaute.
- Keine neuen npm-Pakete ohne Freigabe. Kommunikation auf Deutsch.
- `unset GITHUB_TOKEN GH_TOKEN` vor jedem `gh`-Befehl (abgelaufene
  env-Variable überschreibt die gespeicherte Auth!). Expo-Token nur für
  Builds (liegt in `~/.expo/access-token`).
- Env-Variablen nur in Build-Skripten (`~/.hermes/scripts/build-aab-lokal.sh`
  als Vorlage: JDK 17 brew keg-only, ANDROID_HOME/JAVA_HOME nur im Skript,
  Gradle-RAM 2 GB, AAB nach `~/AABs/`).
- versionCode automatisch hochzählen (EAS remote, `autoIncrement: true`).

## Sprachen

DE zuerst, dann DA (die Frau des Betreibers liest/hört alles!), EN später.
Die dänischen Fassungen liegen in `da/` (eine Datei je Modul).

## Verteilung (nach dem Buch)

Amazon 2,99 € (KDP verifiziert, NIE KDP Select), Website
naturklinikken-jylland.dk, Leanpub, GitHub, Internet Archive, Podcast via
GitHub-Releases (Feed-URLs gratis + stabil).

## Adresse

Stephan Hink, Kirkevænget 5, DK-6900 Skjern (æ!).
