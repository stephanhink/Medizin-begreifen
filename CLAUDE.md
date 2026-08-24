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

1. **Die Anfänge der Heilkunde** — Schamanen, Kräuterkundige, die
   „primitiven" Völker (Begriff kritisch reflektiert) UND das alte
   Ägypten als die erste Medizin, die aufgeschrieben wurde (Ebers- und
   Edwin-Smith-Papyrus, die Kanäle-Denkart, die Tempelheilung). Kern der
   Aussage (Betreiber-Vorgabe): Die Menschen handelten intuitiv und
   behandelten mit natürlichen Mitteln; Ägypten ist die Station, an der
   dieses Wissen erstmals schriftlich wird. Trepanation,
   Heilpflanzenwissen, Chinin/Kurare/Digitalis. Perspektiven:
   Heilerin/Heiler vs. koloniale Abwertung und Wiederentdeckung. (Die
   ursprünglich getrennten Kapitel „Anfänge" und „Ägypten" wurden am
   21.08.2026 auf Betreiber-Wunsch verschmolzen — KEINE Wiederholungen;
   jede neue Runde variiert die Abschnittsstruktur der Stimmen.)
2. **China und die TCM** — die chinesische Medizin hat bis heute ihre
   Bedeutung (Akupunktur, Kräuter, Qi). Perspektiven: Westen vs. Osten.
   **Betreiber-Vorgabe (Denkart-Analyse):** Dieses Kapitel analysiert die
   Denkart der TCM UMFANGREICH: das Weltbild (Qi, Yin und Yang, die Fünf
   Elemente, Meridiane), die Begründungslogik hinter den Methoden (Warum
   Akupunktur? — den Fluss des Qi fördern; Warum Kräuter-Rezepturen? —
   kombinierte Wirkung; Warum Puls- und Zungendiagnose?) — und die
   ehrliche Wirkungsbilanz (was die Forschung heute belegt, z. B.
   Akupunktur bei Schmerzen, und was nicht messbar/umstritten ist).
3. **Indien und der Ayurveda** — bis heute aktuell. Perspektiven:
   Tradition vs. Modernisierung; Indien vs. koloniale Medizin.
   **Betreiber-Vorgabe (Denkart-Analyse):** Dieses Kapitel analysiert die
   Denkart des Ayurveda UMFANGREICH: das Weltbild (die drei Doshas Vata,
   Pitta, Kapha aus den Elementen), die Begründungslogik hinter den
   Methoden (Warum Ernährung/Lebensweise? — Doshas ausgleichen; Warum
   Panchakarma-Reinigungen?; Warum Kräuter wie Kurkuma/Ashwagandha?) —
   und die ehrliche Wirkungsbilanz (was belegt ist, was kulturell
   verwurzelt/umstritten ist).
4. **Hippokrates und Galen** — die europäische Wurzel; der Eid.
5. **Avicenna und die arabische Medizin** — sie bewahrten die Antike.
6. **Klostermedizin** — Hildegard von Bingen; die deutsche Tradition der
   Klostergärten.
7. **Paracelsus und Vesal** — die Anatomie erwacht; Empirie vs. Autorität.
8. **Harvey** — der Blutkreislauf; Beobachtung vs. Lehrmeinung.
9. **Die grausamen Anfänge der modernen Chirurgie** — Amputationen ohne
   Betäubung vor Publikum (London), die chirurgischen Theater; Semmelweis
   und das Händewaschen. Die moderne Medizin ist erst ~150 Jahre alt.
10. **Jenner** — die Impfung (1796); Impfbefürworter vs. Impfgegner.
    **Betreiber-Vorgabe (wichtig — die dunkle Frühgeschichte prominent):**
    Die Pockenimpfung wird oft gefeiert, ist aber in ihrer Frühgeschichte
    extrem umstritten — das wird prominent behandelt, nicht als Randnotiz:
    die Variolation (Infektion mit ECHTEN Pocken) wurde im 18. Jh. an
    Gefangenen (Newgate 1721) und Waisenkindern getestet, teils ohne
    echte Einwilligung; Jenners Versuch am Kind (James Phipps, 1796)
    entspricht keinen heutigen Ethikstandards; die Arm-zu-Arm-Übertragung
    von Lymphflüssigkeit verbreitete im 19. Jh. auch Syphilis; und die
    Impferei war von Anfang an auch ein Geschäft (Wanderimpfer,
    kommerzielle „Pockenlymphe"). BEIDE Seiten fair: die Ausrottung der
    Pocken (1980) UND das dunkle Kapitel. Die Sicht, die diese dunklen
    Seiten verneint („nur die Pharmaindustrie verneint diese Seite" —
    Betreiber), wird als Perspektive ernst genommen.
    **Betreiber-Vorgabe (die impfkritische Statistik prominent):** Der
    Betreiber ist impfkritisch. Seine These, gestützt auf Statistiken:
    Bei vielen Infektionskrankheiten war der Rückgang schon weit
    vorangegangen, bevor die Impfung kam (Hygiene, sauberes Wasser,
    Kanalisation, Ernährung, Wohnverhältnisse) — nach Einführung der
    Impfung gab es kaum noch zusätzlichen Rückgang. Diese Kurven werden
    im Buch GEZEIGT und erklärt. Dazu die offene Frage der Gegenwart:
    Heute gibt es kaum noch Infektionskrankheiten bei Kindern, aber
    Allergien sind auf dem Vormarsch — und dagegen gibt es kein Rezept
    (Hygiene-Hypothese: weniger mikrobielle Stimulation im Kindesalter).
    BEIDE Seiten fair: Die impfkritische Sicht steht gleichwertig neben
    der Epidemiologie der Impferfolge (z. B. Polio, Masern-Komplikationen);
    die Statistiken werden nachprüfbar dargestellt, nichts wird
    beschönigt, nichts wird verzerrt.
11. **Pasteur und Lister** — die Keimtheorie; Narkose und Antisepsis; die
    Geburtsstunde der wissenschaftlichen Medizin (~1870).
12. **Röntgen und Penicillin** — bildgebende Diagnostik und Antibiotika;
    Strahleneuphorie vs. Strahlenschäden.
13. **Die Verstaatlichung des Gesundheitswesens** — Hygiene als
    Staatsaufgabe, Krankenhäuser, Bismarck 1883; Zugang für alle UND
    Verdrängung der Naturheilkunde, Kurierfreiheit.
14. **Die moderne Pharmaindustrie** — Heilsbringer und Interessen; die
    ehrliche Bilanz: Diagnose hervorragend (Bildgebung), Behandlung
    chronischer Krankheiten (Krebs, Diabetes) noch nicht weit.
    **Betreiber-Vorgabe (wichtig — die Finanzinteressen prominent):**
    Impfungen und Dauermedikamente sind neben ihrer tatsächlichen Wirkung
    ein sehr profitables Geschäft — diese These des Betreibers wird
    prominent behandelt, nicht als Randnotiz. Dazu gehört auch die
    Forschung: Wer kritisch forscht, dem werden schnell die finanziellen
    Mittel gestrichen (Betreiber-These; sie ist „nicht unkritisch", wird
    aber ernst genommen und mit belegten Beispielen geprüft — z. B.
    Studienfinanzierung durch die Industrie, unterdrückte
    Negativ-Ergebnisse, Interessenkonflikte in Leitlinien). BEIDE Seiten
    fair: die Erfolge der Pharmaindustrie (Medikamente, die Leben retten)
    UND die Interessenkonflikte. Die Sicht der Kritiker wird gleichwertig
    neben die der Industrie gestellt.
15. **mRNA/COVID** — die Impfstoff-Wende; Wissenschaft vs. Politik.
    **Betreiber-Vorgabe (wichtig):** Dieses Kapitel behandelt der Betreiber
    mit besonderer Sorgfalt — er stimmt in diesen Punkten vermutlich nicht
    mit der KI überein. Deshalb gilt hier die TONE-Regel doppelt: BEIDE
    Sichtweisen (Befürworter wie Skeptiker) stehen mit ihren Argumenten
    nebeneinander, ohne Dämonisierung und ohne Beschönigung; die kritischen
    Fragen (Schnellzulassung, Nebenwirkungs-Meldeverfahren, politische
    Maßnahmen, Impfpflicht-Debatten) werden fair und sachlich behandelt.
    Die KI setzt hier nicht ihre eigene Position durch — das Kapitel wird
    nur mit ausdrücklicher Freigabe des Betreibers final.
    **Die impfkritische Sicht des Betreibers ist hier eine gleichwertige
    Perspektive** (Statistik: Rückgang vieler Krankheiten begann vor der
    Impfung; Nutzen-Risiko-Bewertung; die Allergie-/Hygiene-Hypothese;
    die Finanzinteressen der Hersteller).
    **Betreiber-Vorgabe (die mRNA-Sorgfaltspflicht-Debatte prominent):**
    Die mRNA-Impfstoffe waren technologisch vollständig neu und
    unerforscht (kein mRNA-Impfstoff war je zuvor zugelassen worden) und
    wurden dennoch in Rekordzeit und Milliardenfach verabreicht, ohne
    langfristige Sicherheitsdaten — der Betreiber sieht darin einen
    großen Verstoß gegen die Sorgfaltspflicht. Diese Debatte wird
    prominent behandelt: Notfallzulassung, fehlende Langzeitdaten,
    Pharmakovigilanz nach Markteinführung, Nutzen-Risiko-Abwägung auch
    für junge Menschen. Dazu die These der Überschätzung: Professor John
    Ioannidis (Stanford University) wies ab 2020/2021 mit
    epidemiologischen Schätzungen darauf hin, dass die Gefahr von
    COVID-19 näher an einer normalen Influenza lag — als gleichwertige
    wissenschaftliche Perspektive mit Namen und Quelle. BEIDE Seiten
    fair: die Argumente der Impfkampagne (Pandemie-Notstand, Reduktion
    schwerer Verläufe, Schutz der Risikogruppen) stehen gleichwertig
    neben der Kritik.
    **Betreiber-Vorgabe (Gleichschaltung und private Förderer):** Die
    Debatte über den weltweiten Konformitätsdruck wird prominent
    behandelt: Zensur und Löschung impfkritischer Inhalte auf den großen
    Plattformen, akademischer Druck auf abweichende Wissenschaftler
    (Ioannidis, Autoren der Great Barrington Declaration), das
    Verschwinden kritischer Stimmen aus Leitmedien, obwohl die Fakten
    dagegen sprachen (Betreiber: „Gleichschaltung"). Dazu die Rolle
    großer privater Förderer: die Bill & Melinda Gates Foundation als
    größter privater Geldgeber von Impfkampagnen weltweit mit ihren
    wirtschaftlichen Verflechtungen (auch in mRNA-Technologie) — die
    Fakten werden genannt, die Deutung bleibt multiperspektivisch.
16. **Hahnemann und die Homöopathie** — die umstrittenste Heilmethode der
    letzten 200 Jahre. **Betreiber-Vorgabe (wichtig — Denkart-Analyse und
    die Frage nach den Anhängern):** Die Wirkungsweise wird AUSFÜHRLICH
    beschrieben: das Ähnlichkeitsprinzip (Similia similibus curentur),
    die Potenzierung/Verdünnung mit Verschüttelung (Dynamisierung), die
    Idee der Lebenskraft, die ganzheitliche Anamnese. Dazu, warum die
    moderne Medizin sie ablehnt (kein nachweisbarer Wirkstoff in
    Hochpotenzen — Avogadro-Grenze, Studienlage, Unvereinbarkeit mit der
    Pharmakologie). UND die eigentliche Aufgabe dieses Kapitels
    (Betreiber): Warum hat die Homöopathie trotzdem seit über 200 Jahren
    so viele Anhänger — in Indien (staatlich anerkannt, AYUSH, sehr
    beliebt) und in Deutschland? „Meistens ist etwas daran, wenn über
    viele Jahrzehnte eine Heilmethode so viele Anhänger hat" (Betreiber).
    Es ist leicht, sich über die Homöopathie lustig zu machen — dieses
    Kapitel findet heraus, was die Menschen daran hält: die ausführliche
    Zuwendung der Anamnese, das Ernstgenommen-Werden, der Placebo- und
    Erwartungseffekt, die Sicherheit ohne Nebenwirkungen, die
    Selbstheilungskräfte. Der Betreiber selbst kann mit der Homöopathie
    wenig anfangen, hat das Prinzip aber verstanden — beides gehört in
    die Erzählung.
    **Betreiber-Vorgabe (die Informations-These und die offene Frage —
    WICHTIG):** Das Kapitel stellt die Homöopathie NICHT als bloßes
    Placebo dar. Die Informations-Therapie-These wird ernst genommen und
    ausführlich erklärt: Die Potenzierung überträgt nach homöopathischer
    Lehre die INFORMATION des Stoffes in das Trägermittel (Verschüttelung,
    Dynamisierung) — die Frage „ist noch Stoff drin?" ist dann die
    falsche Frage; die Information wäre das Wirksame. Dass das mit dem
    heutigen naturwissenschaftlichen Weltbild nicht haltbar ist, heißt
    nicht, dass es nicht funktionieren kann — Unerklärbarkeit heute ist
    kein Beweis für Unwirksamkeit (Telefon-Argument: Ein Mensch des
    Mittelalters hätte ein Telefongespräch als nicht wissenschaftlich
    erklärbar abgetan; der damalige Stand der „Wissenschaft" war die
    Grenze des damaligen Wissens, nicht die Grenze der Welt). Die
    Perspektive der Skeptiker (Avogadro-Grenze, Studienlage) steht
    gleichwertig daneben — aber nicht als letztes Wort, sondern als eine
    Denkart von Wirksamkeit. Dazu werden unerklärte Phänomene als
    Hinweise behandelt, dass das Weltbild Lücken hat: morphische Felder
    (Rupert Sheldrake), die Zwillings-Phänomene (Kontakt ohne physische
    Anwesenheit), die Geschichte der „unmöglichen" Technologien. Das
    Kapitel endet offen mit der Frage: Was gilt als Beweis — und wer
    entscheidet das? (Die „Wissenschaft" ist auch nur eine Perspektive,
    die wächst.)
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

**LÄNGENREGEL (Betreiber-Feedback 24.08.2026, gestuft):** Die frühen Kapitel
(1–8, bis Harvey) KURZ und DICHT halten: jede Perspektive maximal ~250 Zeilen
(≈ 3.000 Zeichen), ein Kapitel insgesamt maximal ~600 Zeilen. Mehr Dichte,
weniger Breite; wenige starke Abschnitte; jeder Absatz muss die Erzählung
voranbringen. AB DER NEUZEIT (Kapitel 9 ff.) gilt die Umkehrung
(Betreiber-Vorgabe): **vollständig und ausführlich** — insbesondere die
grausamen Anfänge der modernen Medizin um 1850 in London (Kapitel 9:
anschaulich berichten — OP-Theater, Amputation ohne Narkose), das
Impfkapitel (10: dunkle Frühgeschichte + impfkritische Statistik
prominent), die finanzielle Abhängigkeit der Forschung von der
Pharmaindustrie (14) und die Homöopathie (16: Informations-These,
Anhänger-Frage). KEIN BRUCH im Konzept: Erzählstruktur und
Perspektiven-Muster bleiben überall gleich — nur die Ausführlichkeit wächst
mit der Nähe zur Gegenwart. Die Runden-Prompts enthalten die jeweilige
Begrenzung explizit. Qualität und Spannung zählen — ein spannendes kurzes
Kapitel schlägt ein vollständiges langes; ein ausführliches Neuzeit-Kapitel
bleibt trotzdem dicht.

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
