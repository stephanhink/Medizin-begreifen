// Kapitel 6 — „Die Klostermedizin".
//
// Die Station, an der Europa selbst wieder zu heilen beginnt — mit dem, was
// es hat: einem Garten, einer Schreibstube und einer Vorschrift, die die
// Krankenpflege über alles andere stellt. Zwischen Benedikt (um 529) und
// Hildegard von Bingen (1098–1179) liegen sechshundert Jahre, in denen die
// Klöster die Krankenhäuser, die Apotheken und die Bibliotheken des
// Abendlandes sind.
//
// Die DENKART-Analyse ist das Herzstück (Betreiber-Vorgabe). Sie fragt hier:
// Warum heilten sie überhaupt — und mit welcher Begründung? Warum war der
// Garten die Apotheke? Warum schrieben sie ab, was sie nicht verstanden?
// Warum gehörten Gebet und Pflanze zusammen? Und wo genau kam diese Denkart
// an ihre Grenze: dort, wo der Glaube die Diagnose ersetzte und die
// Autorität der Kirche über dem Zweifel stand. Die Stimme benennt das selbst
// (Zusatzregel für sensible Themen in CLAUDE.md).
//
// LÄNGENREGEL (Betreiber-Feedback 24.08.2026): Kapitel 1–8 bleiben kurz und
// dicht — jede Perspektive höchstens ~250 Zeilen, das Kapitel insgesamt
// höchstens ~600 Zeilen. Die erste Stimme hier hat rund 235 Zeilen; der Rest
// lässt Hermes Platz für die zweite Stimme und die finale Synthese. Gemessen
// wird die Zeilenzahl in tests/karte-klostermedizin.mjs.
//
// Stimmen (Runde 7): Die ERSTE Perspektive — das Kloster von innen —
// verfasste Opus. Die ZWEITE (der Marktplatz: Bader, Wundärzte, Hebammen
// und Kräuterfrauen, die niemand abschrieb) und die finale Synthese ergänzte
// Hermes im zweiten Pass. Perspektiven-Workflow: CLAUDE.md.
//
// KEINE WIEDERHOLUNGEN (Betreiber-Entscheid vom 21.08.2026): Kapitel 1
// gliedert nach „Wer hier spricht → …", Kapitel 2 beginnt mit einer Szene,
// Kapitel 3 erzählt einen Tageslauf, Kapitel 4 ist ein Briefwechsel,
// Kapitel 5 die Reise eines Buches. Dieses Kapitel wählt die sechste
// Dramaturgie: einen RUNDGANG durch das Kloster. Jeder Abschnitt ist ein
// Ort hinter der Mauer — Pforte, Kräutergarten, Skriptorium, Krankensaal,
// Rupertsberg, Kapitelsaal — und der letzte führt an die Mauer selbst, wo
// die zweite Stimme wartet. Der Marktplatz liegt draußen; dieselbe
// Dramaturgie trägt ihn weiter.
//
// Die Texte liegen als Zeilen-Arrays mit `.join('\n')` — so bleiben sie im
// Repo bei ~72 Zeichen lesbar (der Betreiber liest sie hier gegen), und
// utils/markdown.js macht in der App wieder fließenden Text daraus.
//
// CommonJS ohne UI-Importe (Architektur-Regel): mit blankem `node` prüfbar.

const { karte } = require('./karten/klostermedizin');

/**
 * Die Stimme des Klosters — ein Rundgang durch sechs Orte hinter der Mauer.
 *
 * Verfasst von Opus (Runde 7). Sie erzählt von innen: warum geheilt wurde,
 * warum gegärtnert, warum abgeschrieben, warum gebetet — und wo diese
 * Denkart an ihre Grenze kam. Die unbequemen Stellen benennt sie selbst,
 * statt sie der Gegenstimme zu überlassen.
 */
const stimmeDesKlosters = [
  '## An der Pforte: wen wir einlassen und warum',
  '',
  'Du stehst vor dem Tor. Ein Wort zuerst über die Stimme, die Dich führt:',
  'Wir sind das Kloster — der Bruder, der die Kranken pflegt, der den Garten',
  'hackt, der in der Schreibstube sitzt. Oft ist das ein und derselbe Mann.',
  '',
  'Und gleich das Zweite: **Was Du hier hörst, ist unsere Sicht auf uns',
  'selbst — eine Denkart, keine Wahrheit.** Draußen vor dieser Mauer wird',
  'dieselbe Geschichte anders erzählt. Auf die kommen wir am Ende zurück.',
  '',
  'Die Pforte steht offen, und das ist keine Freundlichkeit, sondern',
  'Vorschrift. In der Regel, die Benedikt um 529 auf dem Berg von',
  'Montecassino aufschrieb, steht: Alle Gäste sind aufzunehmen wie Christus.',
  'Und im 36. Kapitel: **Vor allem und über allem ist für die Kranken zu',
  'sorgen; man soll ihnen dienen, als wäre es Christus selbst.**',
  '',
  'Lies den Satz zweimal, denn er begründet alles Weitere. Er sagt nicht:',
  'Pflege die Kranken, damit sie wieder arbeiten. Er sagt: **In dem Kranken',
  'begegnet Dir Dein Herr.** Damit ist die Pflege keine Nebenarbeit, die',
  'ausfällt, wenn die Ernte drängt, sondern Gottesdienst wie das Chorgebet.',
  'Das ist die Nächstenliebe, die caritas — bei uns kein Gefühl, sondern',
  'eine Ordnung mit Zuständigkeit und Uhrzeit.',
  '',
  'Aus diesem Satz ist in Europa das erste geordnete Krankenwesen geworden:',
  'ein eigenes Haus für die Kranken, ein zuständiger Bruder, eine eigene',
  'Küche, in der Fleisch erlaubt ist, das uns anderen verboten bleibt. Wer',
  'hereinkommt, wird nicht gefragt, ob er zahlen kann — in einer Zeit, in',
  'der sonst niemand fragt, wo der Fiebernde heute Nacht liegt.',
  '',
  '## Im Kräutergarten: die Apotheke der Schöpfung',
  '',
  'Geh weiter, links liegen die Beete. Vier Schritte breit, mit Buchsbaum',
  'eingefasst, jedes Beet eine Pflanze: Salbei, Raute, Beifuß, Fenchel,',
  'Liebstöckel, Andorn, Minze, Kümmel, Schlafmohn. Der Bauplan, den sie in',
  'St. Gallen aufbewahren, zeichnet um 820 sechzehn beschriftete Beete',
  'neben dem Haus des Arztes. Auf der Reichenau hat Abt Walahfrid Strabo um',
  '840 seinen eigenen Garten in Verse gebracht — vierundzwanzig Pflanzen,',
  'und er beginnt mit den Brennnesseln, die ihm in die Hände stachen.',
  '',
  '**Warum ein Garten und kein Vorrat gekaufter Mittel?** Weil die Schöpfung',
  'selbst für uns die Apotheke ist. Im Buch Jesus Sirach steht der Satz, auf',
  'den wir uns berufen: Der Herr lässt die Arznei aus der Erde wachsen, und',
  'ein Vernünftiger verachtet sie nicht. **Wenn Gott die Welt geordnet hat,',
  'hat er auch für die Krankheiten etwas vorgesehen — man muss es nur kennen',
  'und pflegen.** Kein Kraut ist zufällig da. Es ist gemeint.',
  '',
  'Das klingt fromm, hat aber eine sehr praktische Folge: Wer so denkt,',
  'sammelt, pflanzt und schreibt auf. Karl der Große verordnete es um 795 —',
  'in der Anweisung für seine Güter steht Pflanze für Pflanze, was überall',
  'anzubauen ist. Aus einer Glaubensaussage wird eine Liste, aus der Liste',
  'ein Vorrat.',
  '',
  '**Und woher wussten wir, welches Kraut wozu?** Aus zwei Quellen, die wir',
  'nie ganz getrennt haben. Die eine sind die Bücher der Alten: Dort steht',
  'die Lehre von den vier Säften und den vier Eigenschaften — warm, kalt,',
  'feucht, trocken. Wer eine kalte, feuchte Krankheit hat, braucht ein',
  'warmes, trockenes Kraut. **Eine Regel, nach der man handeln kann, auch',
  'wenn man nichts vom Kranken weiß.** Die andere Quelle ist die Erfahrung:',
  'Wir haben Jahr um Jahr dieselben Menschen vor uns.',
  '',
  'Was davon wirkte, sagen wir Dir ehrlich in beide Richtungen. Der',
  'Schlafmohn nahm die Schmerzen und machte abhängig — wir sahen es und',
  'konnten es nicht benennen. Fenchel und Minze halfen dem Bauch, der Beifuß',
  'begleitete Geburten. Vieles andere war schwach, und wir hatten kein Maß',
  'für seine Kraft: **Dieselbe Pflanze, im Mai oder im August geerntet, ist',
  'nicht dieselbe Arznei.** Und ja — Kräuter waren auch Ware, und ein',
  'reiches Kloster wurde reicher.',
  '',
  '## Im Skriptorium: warum wir abschrieben, was wir nicht verstanden',
  '',
  'Jetzt der kalte Raum mit den hohen Fenstern. Hier sitzen sie den halben',
  'Tag, und in den Randnotizen steht, was sie davon halten: Drei Finger',
  'schreiben, der ganze Leib leidet. Das Pergament für ein großes Buch',
  'kostet eine Herde Schafe.',
  '',
  '**Warum tun wir das?** Zuerst für das Wort Gottes — dafür ist die',
  'Schreibstube da. Aber gleich danach für die Alten. Cassiodorus, ein',
  'römischer Beamter, der um 550 in Kalabrien ein Kloster einrichtete,',
  'schrieb seinen Mönchen ins Regelbuch: Wenn Euch das Griechische',
  'verschlossen ist, lest wenigstens Dioskurides über die Kräuter, dann',
  'Hippokrates und Galen — und schreibt sie ab.',
  '',
  '**Das ist der Kern unserer Denkart vom Wissen: Bewahren ist eine',
  'Tätigkeit.** Ein Buch, das niemand abschreibt, stirbt; Pergament',
  'zerfällt, wird abgeschabt und neu beschrieben. Wir haben nicht kopiert,',
  'weil wir die Bücher verstanden, sondern weil wir ahnten, dass jemand sie',
  'einmal verstehen wird. Das ist kein Ruhm — es ist eine Wette auf die',
  'Zukunft, und sie ist aufgegangen.',
  '',
  'In Fulda, Lorsch, Corbie und St. Gallen sind so Texte durchgekommen, die',
  'es sonst nirgends mehr gäbe. Und am Anfang des ältesten in Deutschland',
  'erhaltenen Arzneibuchs, aus Lorsch um 795, steht etwas, das Du nicht',
  'erwartest: eine lange Verteidigung der Heilkunst. Denn es gab den',
  'Einwand, und er kam aus den eigenen Reihen: **Wer Arznei nimmt,',
  'misstraut der Vorsehung Gottes.**',
  '',
  'Die Antwort, die dort steht, ist unsere: Gott hat die Kräuter selbst',
  'wachsen lassen; die Kunst des Arztes ist eine Gabe Gottes; und dem',
  'Kranken die irdische Hilfe zu verweigern, ist nicht Frömmigkeit, sondern',
  'Härte. **Erst dieser Satz erlaubt uns die Medizin überhaupt** — und dass',
  'er eigens geschrieben werden musste, sagt Dir, wie ernst der Einwand',
  'genommen wurde.',
  '',
  'Die unbequeme Seite derselben Arbeit: Wir haben abgeschrieben, nicht',
  'geprüft. Ein verlesener Pflanzenname macht aus einem Rezept ein anderes,',
  'und wir konnten den Fehler nicht bemerken. Wir haben Galen mitsamt seinen',
  'Irrtümern weitergereicht, weil das Alte für uns kein Vorschlag war,',
  'sondern Autorität. **Wer bewahrt, bewahrt alles — die Wahrheit und den',
  'Fehler im selben Band.**',
  '',
  '## Im Krankensaal: warum Gebet und Pflanze zusammengehören',
  '',
  'Der Raum ist warm, das ist das Erste. Ein Bett, eine Decke, eine',
  'Schüssel, jemand, der nachsieht. In Cluny steht bis ins Einzelne',
  'geschrieben, wann der Kranke gewaschen, gefüttert und besucht und wie ein',
  'Sterbender begleitet wird. **Das ist unsere stärkste Arznei, und wir',
  'haben lange gebraucht, es zu bemerken: Wärme, Essen, Ruhe und ein',
  'Mensch, der bleibt.**',
  '',
  'Daneben steht das Gebet, und hier musst Du unsere Denkart genau nehmen,',
  'sonst verstehst Du sie falsch. Wir beten nicht statt zu behandeln. Wir',
  'beten, **weil Leib und Seele für uns nicht zwei Dinge sind.** Eine',
  'Krankheit ist für uns nie nur eine Störung im Körper; sie steht auch',
  'zwischen dem Menschen und Gott. Wer nur den Leib behandelt, lässt die',
  'Hälfte aus — so haben wir es gesehen. Deshalb gehören das Kraut und das',
  'Gebet in dieselbe Behandlung, und deshalb ist der Krankensaal neben der',
  'Kirche gebaut.',
  '',
  'Dazu kommt der Aderlass, vier- oder fünfmal im Jahr, nach Kalender und',
  'Mondstand, mit Ruhetagen danach. Wir hielten ihn für Reinigung; er hat',
  'geschadet und niemandem genützt — dieselbe Rechnung wie das warme Bett.',
  '',
  'Und nun die Grenze, und wir sagen sie selbst, damit sie nicht jemand',
  'anders sagen muss. **Wenn Krankheit auch Prüfung oder Strafe Gottes sein',
  'kann, dann bekommt der Kranke zu seinen Schmerzen noch eine Schuld',
  'dazu.** Wir haben Menschen getröstet, indem wir ihnen erklärten, wozu ihr',
  'Leiden gut sei — und wir haben damit manchmal aufgehört zu suchen, woran',
  'es wirklich lag. **Der Glaube hat bei uns oft die Diagnose ersetzt.**',
  '',
  'Schlimmer ist das Zweite: Unsere Erklärung passte immer. Wurde der Kranke',
  'gesund, war es Gnade; starb er, war es Gottes Wille. **Eine Antwort, die',
  'in beiden Fällen stimmt, bringt niemandem etwas bei.** Wir haben nicht',
  'gezählt, nicht verglichen, nicht geprüft, ob unser Mittel besser war als',
  'gar nichts. Sechshundert Jahre lang hat kaum jemand von uns diese Frage',
  'gestellt.',
  '',
  'Und die Kirche selbst hat uns die Hände gebunden. Ihre Konzilien',
  'verboten den Mönchen ab 1130, außerhalb des Klosters gegen Geld Medizin',
  'zu treiben; 1215 wurde Klerikern untersagt, mit Messer oder Brenneisen',
  'zu schneiden. **Damit fiel die ganze Wundarznei an die Männer draußen.**',
  'Im selben Jahr wurde den Ärzten befohlen, bei Schwerkranken zuerst den',
  'Priester rufen zu lassen: die Seele vor dem Leib, als Gesetz. **Unsere',
  'Medizin stand im Dienst der Religion, nicht umgekehrt** — für uns',
  'selbstverständlich, für Dich vermutlich nicht.',
  '',
  '## Auf dem Rupertsberg: die Frau, die nicht lehren durfte',
  '',
  'Verlassen wir den Saal und gehen an den Rhein, wo die Nahe einmündet.',
  'Hier gründet um 1150 eine Äbtissin gegen den Widerstand ihres Abtes ein',
  'eigenes Kloster: **Hildegard von Bingen**, 1098 geboren, 1179 gestorben,',
  'mit acht Jahren in die Klause gegeben, mit achtunddreißig Leiterin.',
  '',
  'Sie schreibt zwei Bücher, die es eigentlich nicht geben dürfte: die',
  '**„Physica"**, eine Naturkunde von Pflanzen, Bäumen, Steinen, Fischen und',
  'Tieren mit ihrem Gebrauch, und **„Causae et curae"** über Ursachen und',
  'Behandlung der Krankheiten. Ihr Grundwort ist **viriditas, die',
  'Grünkraft** — die saftige Lebenskraft, die in allem Gesunden steckt und',
  'im Kranken versiegt. Heilen heißt für sie: das Grün wieder in Fluss',
  'bringen, mit Speise, Maß, Schlaf, Wärme und Kraut.',
  '',
  '**Warum durfte sie das?** Streng genommen durfte sie es nicht. Eine Frau',
  'hatte in der Kirche kein Lehramt; man berief sich auf den Apostel, der',
  'den Frauen das Lehren untersagt. Hildegards Weg daran vorbei ist die',
  'Vision: **Nicht sie spricht, sondern das lebendige Licht spricht durch',
  'sie.** Sie nennt sich selbst ein armes, ungelehrtes Weib — und schreibt',
  'zugleich an Kaiser und Päpste. 1147 liest Papst Eugen III. auf der Synode',
  'von Trier aus ihren Aufzeichnungen vor und billigt sie; von da an ist sie',
  'unangreifbar.',
  '',
  '**Das ist der ehrlichste Satz dieses Abschnitts: Ihre Autorität kam',
  'nicht daher, dass eine Frau lehren durfte, sondern daher, dass sie eine',
  'Ausnahme war.** Sie hat eine Tür gefunden, keine geöffnet. Die',
  'Heilerinnen, die Hebammen, die Kräuterfrauen im Land hatten kein Licht,',
  'das für sie sprach — und niemanden, der ihre Namen aufschrieb.',
  '',
  'Was von ihr bleibt und was nicht, gehört zusammen. Ihre Beobachtungen',
  'sind oft erstaunlich genau; über Schwermut, über den Leib der Frau und',
  'über die Lust schreibt sie so offen wie kaum jemand damals. Aber ihre',
  'Heilbücher sind getrennt von den Visionsschriften überliefert, und',
  'Gelehrte streiten, wie viel davon von ihr selbst stammt. Und die',
  '„Hildegard-Medizin", die man heute kaufen kann — Dinkel, Edelsteine,',
  'feste Kurpläne —, ist großenteils eine Erfindung des 20. Jahrhunderts:',
  '**Sie steht so nicht in ihren Büchern, und was dort steht, ist nicht',
  'deshalb wirksam, weil es alt ist.**',
  '',
  '## Im Kapitelsaal: die Rechnung',
  '',
  'Wir enden dort, wo wir uns jeden Morgen versammeln und wo jeder seine',
  'Fehler laut sagen muss. Also die Rechnung, beide Spalten.',
  '',
  '**Was bleibt.**',
  '',
  '- **Die Pflege als Einrichtung.** Ein Haus, in dem ein Fremder ohne Geld',
  '  ein Bett, Essen und Aufsicht bekommt — das gab es vorher in Europa',
  '  nicht. Aus dem Klosterhospiz sind die Spitäler geworden.',
  '- **Die Bewahrung.** Ohne die Abschriften aus Vivarium, Fulda, Lorsch und',
  '  St. Gallen wäre der antike Bestand im Westen weitgehend verschwunden.',
  '- **Der Garten.** Salbei, Fenchel, Kümmel, Baldrian, Melisse, Mohn — die',
  '  Beete von damals stehen in Auszügen bis heute im Arzneibuch.',
  '- **Die Ordnung.** Wärme, Ruhe, geregeltes Essen, Zeit und Zuwendung',
  '  wirken bis heute, auch wenn man es nicht Medizin nennt.',
  '',
  '**Was wir uns vorwerfen müssen.**',
  '',
  '- **Wir haben nicht geprüft.** Keine Zählung, kein Vergleich, keine',
  '  Frage, ob es ohne unser Mittel anders ausgegangen wäre.',
  '- **Der Glaube ersetzte oft die Diagnose,** und die Deutung der Krankheit',
  '  als Strafe hat Kranke belastet, statt ihnen zu helfen.',
  '- **Die Autorität stand über dem Zweifel** — die der Alten in den Büchern',
  '  und die der Kirche über den Büchern.',
  '- **Wir haben die draußen verachtet.** Was auf dem Markt, in den',
  '  Badstuben und in den Dörfern gewusst wurde, galt uns als unordentlich',
  '  und ungelehrt. Wir haben es nicht aufgeschrieben — und deshalb ist es',
  '  fast ganz verschwunden. Bewahrer sein heißt eben auch: entscheiden,',
  '  was nicht bewahrt wird.',
  '',
  '## An der Mauer: Salerno und die Stimme von draußen',
  '',
  'Ein letzter Blick, nach Süden. In **Salerno**, einer Hafenstadt bei',
  'Neapel, entsteht seit dem 10. Jahrhundert etwas, das wir nicht gebaut',
  'haben: die erste medizinische Schule Europas — und sie steht nicht hinter',
  'einer Mauer. Dort mischt sich alles: Klosterwissen aus dem nahen',
  'Montecassino, wo der Kaufmann Constantinus Africanus als Mönch arabische',
  'Bücher ins Lateinische überträgt, das Wissen der Ärzte in der Stadt und',
  'die Erfahrung der Frauen, deren Schriften zur Frauenheilkunde einer Trota',
  'zugeschrieben werden. Von dort kommen die gereimten Gesundheitsregeln,',
  'die halb Europa auswendig lernt.',
  '',
  '**Wo die Mauer durchlässig war, ging es am schnellsten voran.** Ein',
  'unbequemer Satz für uns — und ein wahrer.',
  '',
  'Denn hinter dieser Mauer haben wir immer den Lärm gehört: den Bader mit',
  'seinem Becken, den Wundarzt, der den Knochen richtet, die Hebamme, die',
  'in der Nacht gerufen wird, die Frau, die ihre Kräuter kennt, ohne je ein',
  'Buch gesehen zu haben. Wir haben sie ungelehrt genannt. Sie haben mehr',
  'Menschen behandelt als wir alle zusammen.',
  '',
  'Was sie können, ob sie heilen, und wie es ist, ein Wissen zu haben, das',
  'niemand aufschreibt — das können wir Dir nicht sagen. Darauf antwortet',
  'die zweite Stimme dieses Kapitels: der Marktplatz vor unserem Tor.',
].join('\n');

/**
 * Der Marktplatz — die Welt außerhalb der Klostermauer: Bader, Wundärzte,
 * Hebammen und Kräuterfrauen. Das mündliche Wissen, das niemand aufschrieb —
 * und das die Geschichte übersehen hat.
 *
 * Verfasst von Hermes (Runde 7, zweiter Pass). Auch diese Stimme benennt
 * die unbequemen Stellen der eigenen Seite selbst (Zusatzregel für
 * sensible Themen).
 */
const stimmeDesMarktplatzes = [
  '## Draußen vor der Mauer',
  '',
  'Die Mönche erzählen von ihrem Rundgang durch das Kloster — Pforte,',
  'Garten, Schreibstube, Krankensaal. Nun erzählen wir von der anderen',
  'Seite der Mauer, denn die Medizin, die draußen geschah, war nicht',
  'weniger wirklich — sie war nur nicht aufgeschrieben. Wer nicht',
  'schreiben kann, hinterlässt keine Bücher. Er hinterlässt Hände.',
  '',
  'Draußen, auf dem Markt, am Stadtrand, in den Gassen: Da arbeiten',
  'die Bader, die schneiden und schröpfen und zur Ader lassen. Da',
  'richten die Wundärzte Knochen, nähen Wunden und schneiden Steine',
  '— das Handwerk der blutigen Arbeit, das die Mönche den Händen',
  'überließen, weil ihre Regel ihnen das Blut verbot. Da sitzen die',
  'Hebammen bei den Geburten, wenn die Ärzte — Gelehrte, Männer —',
  'nicht einmal hereingelassen werden dürfen. Und da sammeln die',
  'Kräuterfrauen, was der Wald und der Zaun hergeben, und wissen, was',
  'gegen Fieber, gegen Würmer, gegen das Kindbettfieber hilft.',
  '',
  '## Das Handwerk: was die Hände konnten',
  '',
  'Ihr Wissen war mündlich und praktisch, von Meisterin zu Lehrling,',
  'von Mutter zu Tochter — und es war oft erstaunlich gut. Die',
  'Wundärzte kannten die Gefahren der Wunde, lange bevor jemand von',
  'Keimen sprach: Sie wussten, dass eine Wunde offen bleiben und',
  'eitern darf, dass man Fremdkörper herausziehen und Gliedmaßen',
  'trennen muss, wenn das Fleisch schwarz wird. Die Hebammen wussten,',
  'wie man ein Kind wendet, wenn es falsch liegt — ein Wissen, das',
  'die gelehrte Medizin der Universitäten erst Jahrhunderte später',
  'erreichte. Die Bader kannten die Salben, die Pflaster, die',
  'Bähungen; der Markt war ein einziger offener Arzneischrank, in dem',
  'gehandelt, geprüft und gelogen wurde — wie überall, wo Menschen',
  'ihr Geschäft machen.',
  '',
  'Was diese Welt auszeichnete, war ihre Nützlichkeit: Sie maß ihr',
  'Wissen an der Hand, nicht an der Schrift. Was half, wurde',
  'weitergegeben; was nicht half, starb mit dem, der es anwandte. Das',
  'ist eine grausame Form der Prüfung — aber es ist eine Prüfung.',
  '',
  '## Wo diese Stimme selbst scheitert',
  '',
  'Jetzt die unbequemen Stellen, denn auch der Markt hat seine Rechnung.',
  '',
  '**Erstens: Das Handwerk war roh.** Ohne Narkose, ohne Hygiene, ohne',
  'Anatomie war die blutige Arbeit ein Glücksspiel. Manche',
  'Wundärzte waren geschickte Handwerker, andere waren Schlächter —',
  'und der Patient konnte den Unterschied nicht erkennen, bevor es',
  'zu spät war. Der Markt kannte keine Prüfung der Könner und keine',
  'Strafe für die Pfuscher, außer den Ruf.',
  '',
  '**Zweitens: Das Geschäft ging vor der Wahrheit.** Auf dem Markt',
  'wurde verkauft, was sich verkaufen ließ: Wundermittel,',
  'Liebestränke, Universalsalben. Wer nicht lesen konnte, konnte auch',
  'Rechnungen nicht prüfen — und die Kräuterfrau, die gestern noch',
  'geholfen hatte, konnte morgen betrügen. Scharlatanerie und',
  'Handwerk lagen dicht beieinander, und niemand zog die Grenze.',
  '',
  '**Drittens: Die Verfolgung.** Die Kräuterfrauen, die im Dorf das',
  'Wissen hüteten, wurden verdächtigt, sobald etwas schiefging — und',
  'aus dem Verdacht wurde später die Hexenverfolgung. Die Hebamme,',
  'die bei einer schwierigen Geburt versagte, konnte als Hexe enden.',
  'Das ist die dunkelste Seite dieser Stimme: Das mündliche Wissen',
  'hatte keinen Schutz, keinen Namen, keine Gilde — nur Hände und',
  'einen Ruf, der auch töten konnte.',
  '',
  '## Antwort an das Kloster',
  '',
  'Der Mönch hat am Ende seines Rundgangs gefragt, was draußen an der',
  'Mauer beginnt. Die Antwort dieser Stimme: Dort beginnt die Hälfte',
  'der Medizin, die keine Bücher schrieb. Das Kloster bewahrte die',
  'Schriften und den Garten; der Markt bewahrte die Hände und die',
  'Kunst. Keiner von beiden hätte ohne den anderen bestanden — und',
  'beide haben einander verachtet. Vielleicht ist Salerno, die Schule',
  'an der Küste, wo Klosterwissen und Marktwissen zusammenkamen, der',
  'Punkt, an dem die Mauer durchlässig wurde. Ob daraus eine Brücke',
  'werden konnte, muss die Synthese beantworten.',
].join('\n');

/** Kapitel 6 der Themenlandkarte. */
const klostermedizin = {
  id: 'klostermedizin',
  titel: 'Die Klostermedizin',
  epoche: '~500–1200',

  aufhaenger: {
    frage: 'Wer heilte, als Europa keine Ärzte mehr hatte?',
    text: [
      'Nach dem Ende des Weströmischen Reiches gab es im Westen keine',
      'Ärzteschulen mehr, keine Bibliotheken, kaum noch jemanden, der',
      'Griechisch lesen konnte. Was blieb, waren die Klöster.',
      '',
      'Dort geschah dreierlei gleichzeitig: Mönche legten Gärten an, in denen',
      'Heilkräuter nach Listen gepflanzt wurden. Sie schrieben in ihren',
      'Schreibstuben Texte ab, die sie oft selbst nicht verstanden — und',
      'retteten damit die Medizin der Antike. Und sie pflegten Kranke, weil',
      'ihre Regel es ihnen befahl: Für die Kranken sei vor allem und über',
      'allem zu sorgen.',
      '',
      'So wurden die Klöster für sechshundert Jahre die Krankenhäuser, die',
      'Apotheken und die Bibliotheken Europas. Und in einem von ihnen, auf',
      'dem Rupertsberg bei Bingen, schrieb um 1150 eine Frau zwei der',
      'wichtigsten Heilbücher des Mittelalters — obwohl die Kirche den Frauen',
      'das Lehren verbot: Hildegard von Bingen.',
      '',
      'Dieses Kapitel fragt, warum Menschen heilten, die die Krankheit',
      'zugleich für eine Fügung Gottes hielten — und was diese Denkart',
      'geleistet und was sie gekostet hat.',
    ].join('\n'),
  },

  karte,

  perspektiven: [
    {
      id: 'kloster',
      name: 'Die Stimme des Klosters',
      stimme: 'Opus',
      text: stimmeDesKlosters,
    },
    {
      id: 'marktplatz',
      name: 'Die Stimme des Marktplatzes',
      stimme: 'Hermes',
      text: stimmeDesMarktplatzes,
    },
  ],

  synthese: [
    '## Wo sich beide Stimmen treffen',
    '',
    'Zuerst das Gemeinsame. Beide Stimmen heilen — nur mit verschiedenen',
    'Händen. Das Kloster pflegt im Krankensaal, der Markt behandelt in',
    'der Gasse; beide verlassen sich auf Pflanzen, beide kennen die',
    'Grenze ihrer Kunst, beide geben zu, dass sie oft genug nicht helfen',
    'können. Beide bewahren Wissen: Das Kloster schreibt es auf, der',
    'Markt gibt es weiter — und beide wissen, dass das eine ohne das',
    'andere unvollständig ist. Salerno, wo die Schule aus dem Kloster',
    'und das Handwerk vom Markt zusammenkamen, zeigt es: Die erste',
    'medizinische Schule Europas entstand genau dort, wo die Mauer',
    'durchlässig wurde.',
    '',
    '## Wo sie auseinandergehen',
    '',
    'Der Widerspruch beginnt bei der Frage, was das Wissen trägt. Für',
    'das Kloster ist es die Schrift und der Glaube: Was aufgeschrieben',
    'ist, überdauert; was Gott geschaffen hat, ist gut. Für den Markt',
    'ist es die Hand und die Erfahrung: Was hilft, bleibt; was nicht',
    'hilft, stirbt. Sie streiten nicht über einzelne Mittel, sondern',
    'über die Form des Wissens — und über die Verachtung: Der Mönch',
    'sieht im Badergesellen den Pfuscher, der Bader im Mönch den, der',
    'nie Blut gesehen hat. Die Geschichte hat den Streit entschieden,',
    'bevor er geführt wurde: Sie hat nur die Seite aufgeschrieben, die',
    'schreiben konnte. Vom Markt ist fast nichts überliefert — nicht',
    'weil er nichts wusste, sondern weil niemand ihn aufschrieb.',
    '',
    '## Was dieses Kapitel für das ganze Buch zeigt',
    '',
    'Zum siebten Mal dasselbe Muster — und jetzt wird die Melodie',
    'doppelstimmig: Die Denkart bestimmt die Methode. Im Kloster heißt',
    'die Denkart: Heilung als Dienst, Wissen als Bewahrung. Auf dem',
    'Markt heißt sie: Heilung als Handwerk, Wissen als Erfahrung. Zwei',
    'Denkarten, die dieselbe Krankheit sahen und sich gegenseitig',
    'verachteten — und beide haben Menschen geholfen.',
    '',
    'Und dieses Kapitel zeigt zum ersten Mal die Macht der Schrift in',
    'der Geschichte: Wer schreibt, bestimmt, was später als Wissen',
    'gilt. Die Hebammen, die Bader, die Kräuterfrauen haben',
    'Jahrhunderte lang die Mehrheit der Kranken behandelt — und in',
    'den Geschichtsbüchern existieren sie nicht, weil niemand sie',
    'abschrieb. Die Frage, die dieses Buch durchzieht, bekommt hier',
    'eine neue Schärfe: Wer schreibt die Geschichte der Medizin? Die',
    'Antwort dieses Kapitels: bisher die, die schreiben konnten. Die',
    'nächste Stimme, die sich Gehör verschafft, wird laut und',
    'ungeduldig sein — sie kommt aus der Stadt und heißt Paracelsus.',
  ].join('\n'),

  urteil: {
    frage:
      'Würdest du dich lieber von jemandem behandeln lassen, der betet, ' +
      'oder von jemandem, der ein Handwerk gelernt hat — und was würde dir ' +
      'bei der anderen Wahl fehlen?',
    hinweis: [
      'Es gibt hier kein Richtig und kein Falsch. Denk daran, was beides',
      'wirklich bedeutet: Im Kloster bekamst du Wärme, Essen, Ruhe und',
      'jemanden, der bleibt — aber niemanden, der prüfte, ob die Behandlung',
      'überhaupt etwas nützt. Beim Handwerker bekamst du geübte Hände und',
      'Erfahrung — aber keine Erklärung, warum es dir passiert ist. Denk auch',
      'an heute: Zuwendung und Können sind noch immer zwei verschiedene',
      'Dinge, und die wenigsten Kranken bekommen beides in derselben',
      'Sprechstunde. Was wäre dir wichtiger, wenn du wählen müsstest?',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'Wofür war der Klostergarten da?',
      antworten: [
        'Vor allem für Blumen zum Schmuck der Kirche.',
        'Er war die Apotheke: Heilkräuter, nach Listen gepflanzt.',
        'Er diente nur der Küche; Arzneien wurden gekauft.',
      ],
      richtig: 1,
      erklaerung:
        'Hinter den Beeten stand eine Überzeugung: Gott habe die Arznei aus ' +
        'der Erde wachsen lassen, man müsse sie nur kennen. Karl der Große ' +
        'ließ um 795 aufschreiben, welche Kräuter auf seinen Gütern zu ' +
        'pflanzen seien; der St. Galler Klosterplan zeichnet um 820 sechzehn ' +
        'beschriftete Beete neben dem Haus des Arztes.',
    },
    {
      frage: 'Was taten die Mönche im Skriptorium mit medizinischen Schriften?',
      antworten: [
        'Sie schrieben sie ab — auch solche, die sie nicht verstanden.',
        'Sie verbrannten alles, was nicht christlich war.',
        'Sie übersetzten sie ins Deutsche und prüften sie am Kranken nach.',
      ],
      richtig: 0,
      erklaerung:
        'Cassiodorus wies seine Mönche um 550 an, wenigstens Dioskurides, ' +
        'Hippokrates und Galen zu lesen und zu kopieren. Weil Pergament ' +
        'zerfällt, überlebt nur, was abgeschrieben wird. Geprüft wurde dabei ' +
        'nichts: Die Irrtümer der Alten wurden mit derselben Sorgfalt ' +
        'weitergereicht wie ihr Wissen.',
    },
    {
      frage: 'Was ist die „Physica" der Hildegard von Bingen?',
      antworten: [
        'Ihre Lebensbeschreibung, verfasst von ihren Schwestern.',
        'Eine Sammlung ihrer Lieder für den Gottesdienst.',
        'Eine Naturkunde: Pflanzen, Bäume, Steine, Tiere und ihr Gebrauch.',
      ],
      richtig: 2,
      erklaerung:
        'Hildegard (1098–1179) schrieb auf dem Rupertsberg bei Bingen die ' +
        '„Physica" und „Causae et curae" über Ursachen und Behandlung von ' +
        'Krankheiten. Lehren durfte eine Frau in der Kirche nicht — ihre ' +
        'Bücher legitimierte sie als Aufzeichnung dessen, was ihr in ' +
        'Visionen gezeigt wurde; 1147 billigte Papst Eugen III. sie.',
    },
    {
      frage: 'Durften Mönche im hohen Mittelalter operieren?',
      antworten: [
        'Ja, die Chirurgie war ausdrücklich ihre Aufgabe.',
        'Nein: Die Kirche untersagte den Klerikern Eingriffe mit dem Messer.',
        'Nur mit schriftlicher Erlaubnis des Kaisers.',
      ],
      richtig: 1,
      erklaerung:
        'Ab 1130 verboten Konzilien den Mönchen, außerhalb des Klosters ' +
        'gegen Geld Medizin zu betreiben; 1215 wurde Klerikern das Schneiden ' +
        'und Brennen untersagt. Die Wundarznei ging damit an Bader und ' +
        'Wundärzte außerhalb der Klostermauer über — an die Berufe, die ' +
        'kaum jemand aufgeschrieben hat.',
    },
    {
      frage: 'Was war das Besondere an Salerno?',
      antworten: [
        'Es war das größte Kloster des Abendlandes.',
        'Dort wurde die Regel des Benedikt geschrieben.',
        'Dort entstand die erste medizinische Schule Europas — außerhalb ' +
          'der Klostermauern.',
      ],
      richtig: 2,
      erklaerung:
        'In der Hafenstadt bei Neapel trafen ab dem 10. Jahrhundert ' +
        'Klosterwissen, städtische Ärzte und arabische Bücher zusammen. ' +
        'Constantinus Africanus übersetzte sie als Mönch von Montecassino ' +
        'ins Lateinische. Aus Salerno stammen Schriften zur Frauenheilkunde, ' +
        'die einer Ärztin namens Trota zugeschrieben werden.',
    },
  ],
};

module.exports = klostermedizin;
