// Kapitel 5 — „Avicenna und die arabische Medizin".
//
// Die Station, an der die Antike nicht verloren ging. Während in Europa das
// Griechische verlernt wurde, sammelte, übersetzte und ordnete die
// islamische Welt, was Hippokrates und Galen hinterlassen hatten — und gab
// es fünf Jahrhunderte später über Toledo zurück. Avicennas „Kanon der
// Medizin" wurde das Lehrbuch der europäischen Universitäten.
//
// Die DENKART-Analyse ist auch hier das Herzstück (Betreiber-Vorgabe), und
// sie ist in diesem Kapitel besonders heikel: Diese Tradition hat ihre
// Größe im Bewahren und Ordnen — nicht im Umstoßen. Warum übersetzten sie?
// Warum ordneten sie in ein System? Warum bauten sie auf Galen auf, statt
// ihn zu prüfen? Aus denselben Gründen, aus denen der Kanon so groß wurde,
// wurde er später zur Fessel. Die Stimme sagt das selbst (Zusatzregel für
// sensible Themen in CLAUDE.md).
//
// LÄNGENREGEL (Betreiber-Feedback 24.08.2026): Kapitel 1–8 bleiben kurz und
// dicht — jede Perspektive höchstens ~250 Zeilen, das Kapitel insgesamt
// höchstens ~600 Zeilen. Die erste Stimme hier hat rund 230 Zeilen; der
// Rest des Moduls lässt Hermes Platz für die zweite Stimme und die finale
// Synthese. Gemessen wird die Zeilenzahl in tests/.
//
// Stimmen (Runde 6): Die ERSTE Perspektive — die Bewahrer von innen —
// verfasste Opus. Die ZWEITE (der Okzident: Europa, das die Antike vergessen
// hatte und sie über Toledo zurückbekam) und die finale Synthese ergänzte
// Hermes im zweiten Pass. Perspektiven-Workflow: CLAUDE.md.
//
// KEINE WIEDERHOLUNGEN (Betreiber-Entscheid vom 21.08.2026): Kapitel 1
// gliedert nach „Wer hier spricht → …", Kapitel 2 beginnt mit einer Szene,
// Kapitel 3 erzählt einen Tageslauf, Kapitel 4 ist ein Briefwechsel. Dieses
// Kapitel wählt die fünfte Dramaturgie: die REISE EINES BUCHES. Jeder
// Abschnitt ist eine Station auf dem Weg — Ort und Jahreszahl im Titel —,
// erzählt von denen, die das Buch abgeschrieben, übersetzt und
// weitergereicht haben. Die zweite Stimme kann den Weg an derselben Straße
// fortsetzen: Toledo, Montpellier, Padua.
//
// Die Texte liegen als Zeilen-Arrays mit `.join('\n')` — so bleiben sie im
// Repo bei ~72 Zeichen lesbar (der Betreiber liest sie hier gegen), und
// utils/markdown.js macht in der App wieder fließenden Text daraus.
//
// CommonJS ohne UI-Importe (Architektur-Regel): mit blankem `node` prüfbar.

const { karte } = require('./karten/avicenna-arabische-medizin');

/**
 * Die Stimme der Bewahrer — sieben Stationen einer Buchreise.
 *
 * Verfasst von Opus (Runde 6). Sie erzählt von innen: warum übersetzt
 * wurde, warum geordnet wurde, warum man auf Galen aufbaute — und wo genau
 * diese Denkart an ihre Grenze kam. Die unbequemen Stellen benennt sie
 * selbst, statt sie der Gegenstimme zu überlassen.
 */
const stimmeDerBewahrer = [
  '## Erste Station: Antiochia, um 800 — was übrig war',
  '',
  'Dieses Buch, das Du in der Hand hältst, ist auf Reisen. Wir haben es',
  'ein Stück des Weges getragen, und weil man einem Buch nicht ansieht,',
  'durch wie viele Hände es gegangen ist, erzählen wir Dir die Stationen.',
  '',
  'Zuerst aber die Wahrheit über uns: **Wir haben dieses Buch nicht',
  'geschrieben.** Es ist griechisch. Ein Mann aus Pergamon hat es',
  'verfasst, sechshundert Jahre bevor einer von uns geboren wurde. Was Du',
  'hier liest, ist unsere Sicht auf das, was wir getan haben — eine',
  'Denkart, keine Wahrheit. Andere werden sie anders erzählen.',
  '',
  'In den Klöstern Nordsyriens haben Mönche solche Bücher abgeschrieben',
  'und ins Syrische übersetzt, weil sie Ärzte ausbildeten und die',
  'griechische Sprache im Alltag verschwand. In Gundischapur, drüben in',
  'Persien, lehrten Ärzte aus derselben Tradition. So lagen die Schriften',
  'da: verstreut, in Bruchstücken, in Abschriften von Abschriften.',
  '',
  '**Bücher sterben leise.** Papyrus zerfällt, Pergament wird abgeschabt',
  'und neu beschrieben, eine Bibliothek brennt, und niemand merkt es, weil',
  'niemand mehr die Sprache kann. Von Galens Werken ist ein Teil auf genau',
  'diesem Weg verloren gegangen — es gab niemanden mehr, der sie brauchte.',
  '',
  '## Zweite Station: Bagdad, 830 — warum wir übersetzten',
  '',
  'Dann kam die Stadt am Tigris. Sie war neu, sie war reich, und ihre',
  'Kalifen ließen zusammentragen, was in Griechisch, Persisch, Syrisch und',
  'Sanskrit über Heilkunde, Sternkunde und Rechnen geschrieben stand. Das',
  '„Haus der Weisheit" war Bibliothek, Übersetzerwerkstatt und Akademie in',
  'einem.',
  '',
  '**Warum übersetzten wir?** Drei Gründe, und keiner davon ist Zufall.',
  '',
  '**Erstens: Wir hielten das Wissen der Alten für einen Schatz, den man',
  'nicht verlieren darf.** Nicht für einen Konkurrenten des Glaubens. Wer',
  'die Ordnung der Welt versteht, versteht mehr von ihrem Schöpfer — so',
  'haben wir es gesehen. Das erste Wort, das unserem Propheten offenbart',
  'wurde, lautet „Lies!". Ein Wort, das ihm zugeschrieben wird, sagt: Sucht',
  'das Wissen, und sei es in China. Ob er es wirklich gesagt hat, ist unter',
  'Gelehrten strittig. Dass wir danach gehandelt haben, ist es nicht.',
  '',
  '**Zweitens: Wir brauchten es.** Ein Kalif, dessen Leibarzt ein Christ',
  'aus Gundischapur ist, fragt nicht nach dem Glauben des Arztes, sondern',
  'nach seinem Können. Wer ein Krankenhaus baut, braucht Lehrbücher. Wer',
  'Lehrbücher will, muss übersetzen.',
  '',
  '**Drittens: Es war plötzlich bezahlbar.** Aus China war das Papier zu',
  'uns gekommen. Vorher kostete ein Buch ein Vermögen; jetzt konnte ein',
  'Händler eine Bibliothek besitzen. Ohne diese eine Erfindung wäre alles',
  'Weitere nicht geschehen.',
  '',
  'Wie das aussah, zeigt einer von uns am besten: **Hunain ibn Ishaq**',
  '(809–873), christlicher Arzt, der beste Übersetzer, den wir hatten. Er',
  'reiste bis nach Byzanz, um Handschriften zu suchen. Für eine einzige',
  'Schrift Galens durchsuchte er Mesopotamien, Syrien, Palästina und',
  'Ägypten und fand in Damaskus die Hälfte davon. Er übersetzte nicht Wort',
  'für Wort, sondern Sinn für Sinn, und er verglich mehrere Fassungen',
  'miteinander, bevor er eine Zeile schrieb. Nebenbei musste er die',
  'arabischen Fachwörter erst erfinden — für Begriffe, die es in unserer',
  'Sprache noch nicht gab.',
  '',
  'Sag also nicht, Übersetzen sei das Abschreiben in einer anderen',
  'Sprache. Es ist eine Entscheidung darüber, was ein Satz bedeutet. **Wer',
  'übersetzt, deutet — und jede Deutung, die wir trafen, haben spätere',
  'Leser für den Urtext gehalten.** Das ist die erste unbequeme Stelle',
  'unserer Geschichte.',
  '',
  '## Dritte Station: Rey, um 910 — der Zweifler unter uns',
  '',
  'In Rey, nahe dem heutigen Teheran, arbeitete **ar-Razi** (um 865–925),',
  'den Europa Rhazes nennen wird. Er leitete Krankenhäuser, schrieb seine',
  'Fälle auf wie ein Buchhalter und tat zweierlei, das wir Dir nicht',
  'verschweigen wollen.',
  '',
  'Er beschrieb als Erster den Unterschied zwischen **Pocken und Masern** —',
  'nicht aus einem Buch, sondern vom Krankenbett her, am Verlauf, am',
  'Ausschlag, am Fieber. Zwei Krankheiten, die vorher eine waren.',
  '',
  'Und er schrieb ein Buch mit dem Titel **„Zweifel an Galen"**. Darin',
  'listete er auf, wo seine eigene Beobachtung dem großen Lehrer',
  'widersprach — beim Fieber, beim Sehen, bei einzelnen Mitteln. Er sagte',
  'dazu sinngemäß: Die Heilkunde ehrt Galen am besten, indem sie',
  'weiterforscht, statt ihn abzuschreiben.',
  '',
  '**Hier hätte unsere Geschichte anders laufen können.** Ein Arzt zweifelt',
  'öffentlich an der Autorität, mit Gründen, aus der Erfahrung. Genau',
  'daraus ist siebenhundert Jahre später in Europa eine Methode geworden.',
  'Bei uns wurde daraus ein einzelnes Buch, das man zur Kenntnis nahm und',
  'dann beiseitelegte. **Der Zweifel war da. Er wurde nur nicht unsere',
  'Denkart.**',
  '',
  '## Vierte Station: Buchara und Hamadan, 1020 — warum wir ordneten',
  '',
  'Nun zu dem Mann, dessen Name über diesem Kapitel steht. **Ibn Sina**,',
  'bei Euch Avicenna, geboren um 980 bei Buchara, gestorben 1037 in',
  'Hamadan. Arzt, Philosoph, zeitweise Minister, zeitweise Gefangener,',
  'immer unterwegs. Er schrieb nachts, zwischen Staatsgeschäften und',
  'Flucht.',
  '',
  'Sein Hauptwerk ist der **„Kanon der Medizin"**: fünf Bücher, die das',
  'gesamte damals bekannte Wissen in eine Ordnung bringen — die Grundlagen',
  'und die Säftelehre; gegen achthundert Einzelmittel, jedes mit Wirkung',
  'und Anwendung; die Krankheiten vom Kopf bis zum Fuß, jede an ihrem',
  'Platz; dazu Fieber, Chirurgie und die zusammengesetzten Rezepturen.',
  '',
  '**Warum ordneten wir das Wissen zu einem System?** Weil Wissen, das',
  'nicht geordnet ist, nicht weitergegeben werden kann.',
  '',
  'Stell Dir vor, Du bist Arzt in einer Stadt ohne Lehrer. Vor Dir liegen',
  'hundert Schriften, die einander widersprechen; drei sagen, das Fieber',
  'komme von der Galle, zwei sagen etwas anderes, und keiner sagt Dir, in',
  'welcher Reihenfolge Du lesen sollst. Du wirst kein Arzt. **Ein Buch,',
  'in dem alles seinen Platz hat, macht aus einem Bücherberg einen',
  'Lehrgang** — und aus einem Lehrgang eine Prüfung, ein Krankenhaus, einen',
  'Beruf. Deshalb schlug der Kanon alles andere: Man konnte ihn lehren.',
  '',
  '**Und warum bauten wir dabei auf Galen auf, statt ihn zu prüfen?** Weil',
  'unsere Denkart eine andere war als Deine. Für uns stand das Wissen im',
  'Ganzen schon fest — es war einmal gefunden worden, von den Alten, und',
  'lag verstreut und verdunkelt herum. **Die Aufgabe des Gelehrten war,',
  'es zu sammeln, zu reinigen, zu ordnen und lückenlos zu machen; nicht,',
  'es umzustoßen.** Wer eine Lücke im Gebäude fand, füllte sie. Wer einen',
  'Widerspruch fand, löste ihn auf — meistens, indem er zeigte, dass der',
  'Alte doch recht hatte und man ihn nur falsch verstanden habe.',
  '',
  'Das ist der Satz, an dem dieses Kapitel hängt: **Für uns war Wissen',
  'Überlieferung und Ordnung. Für die, die nach uns kamen, wurde es',
  'Beobachtung und Zweifel.** Beides sind Denkarten. Die erste bewahrt,',
  'was sonst verloren geht. Die zweite findet, was noch niemand wusste.',
  'Wir konnten die erste. Die zweite haben wir gestreift und nicht',
  'ergriffen.',
  '',
  '## Fünfte Station: Kairo, 1242 — der Mann, den niemand las',
  '',
  'Was das kostet, zeigt eine Geschichte aus Kairo. Dort arbeitete **Ibn',
  'an-Nafis** (um 1213–1288) und schrieb einen Kommentar zur Anatomie des',
  'Kanons. Bei Galen stand: Das Blut sickere durch unsichtbare Poren in',
  'der Scheidewand des Herzens von der rechten in die linke Kammer.',
  '',
  'Ibn an-Nafis schrieb dagegen: **Diese Scheidewand ist dicht. Es gibt',
  'dort keine Poren. Das Blut muss den Weg über die Lunge nehmen.**',
  '',
  'Das ist der kleine Blutkreislauf, rund vierhundert Jahre bevor ein',
  'Engländer namens Harvey ihn beschreiben wird. Es steht in unserer',
  'Sprache, in einem unserer Bücher, in einer unserer Bibliotheken.',
  '',
  'Und es geschah — nichts. Kein Streit, keine Schule, keine Prüfung am',
  'Leichnam. Der Satz stand da und wurde überlesen. Erst 1924 fand ihn',
  'ein ägyptischer Arzt in einer Berliner Handschrift wieder.',
  '',
  '**Ein System, das keine Lücke lässt, hat auch keinen Platz für eine',
  'Korrektur.** Das ist nicht Ibn an-Nafis vorzuwerfen und auch nicht Ibn',
  'Sina. Es ist der Preis unserer Denkart, und wir zahlen ihn hier zum',
  'ersten Mal sichtbar.',
  '',
  '## Sechste Station: die Rechnung — was blieb, was wir mit-zementierten',
  '',
  'Bevor das Buch weiterreist, die Bilanz. Beide Spalten.',
  '',
  '**Was von uns bleibt.**',
  '',
  '- **Die Bewahrung selbst.** Ohne die Übersetzer von Bagdad wäre ein',
  '  großer Teil von Hippokrates und Galen für Europa verloren gewesen.',
  '  Das ist keine kleine Leistung, auch wenn es eine dienende ist.',
  '- **Die Krankenhäuser.** Das Bimaristan von Damaskus (1154), die',
  '  Häuser in Bagdad, Kairo und Cordoba: getrennte Abteilungen, eine',
  '  Apotheke, angestellte Ärzte, Unterricht am Krankenbett, Aufnahme',
  '  ohne Ansehen von Glauben oder Vermögen, bezahlt aus frommen',
  '  Stiftungen. Diese Verbindung von Pflege, Lehre und Prüfung ist',
  '  unsere eigene Erfindung.',
  '- **Die Apotheke als eigener Beruf**, mit geprüften Rezeptbüchern —',
  '  und mit der Erkenntnis, dass ein Mittel eine Dosis braucht.',
  '- **Die Chirurgie des az-Zahrawi** aus Cordoba (um 936–1013): rund',
  '  zweihundert gezeichnete Instrumente, Naht, Ausbrennen, Steinschnitt.',
  '  In Europa bis ins 18. Jahrhundert nachgedruckt.',
  '- **Der Kanon als Ordnung.** Ein Buch, das man vom ersten bis zum',
  '  letzten Tag eines Studiums benutzen kann.',
  '',
  '**Was wir mit-zementiert haben.**',
  '',
  '- **Wir bewahrten Galen mitsamt seinen Irrtümern.** Die Poren in der',
  '  Herzscheidewand, die Leber als Werkstatt des Blutes, die vier Säfte —',
  '  wir haben sie nicht erfunden, aber wir haben ihnen ein so schönes',
  '  Gehäuse gebaut, dass sie weitere fünfhundert Jahre hielten.',
  '- **Wir prüften die Autorität nicht.** Ar-Razi hat gezweifelt, Ibn',
  '  an-Nafis hat korrigiert — beide blieben Einzelfälle. Auch wir haben',
  '  keine Menschen seziert; das Verbot war bei uns so stark wie in Rom.',
  '- **Der Kanon war ein Kompendium, kein neues Denken.** Er ordnet',
  '  hervorragend. Er fragt selten.',
  '- **Und je größer er wurde, desto schwerer wog er.** Was in Europa',
  '  später „Buchmedizin" hieß und dort verspottet wurde — der Arzt, der',
  '  nachschlägt, statt nachzusehen —, hat auch bei uns gelehrt.',
  '',
  '## Siebte Station: Toledo, 1187 — wohin das Buch weitergeht',
  '',
  'Hier endet unser Stück des Weges. Das Buch reist weiter nach Westen:',
  'über Kairouan, wo ein Mönch namens Constantinus Handschriften nach',
  'Salerno mitnimmt, über Cordoba und schließlich nach **Toledo**, das',
  '1085 an Kastilien fällt — mitsamt seinen arabischen Bibliotheken.',
  '',
  'Dort arbeiten arabisch sprechende Christen, jüdische Gelehrte und',
  'zugereiste Lateiner oft zu zweit: Einer liest laut in der Volkssprache',
  'vor, der andere schreibt Latein. **Gerhard von Cremona** übersetzt so',
  'über siebzig Werke, darunter den Kanon. Er stirbt 1187 in Toledo.',
  '',
  'Von dort geht das Buch in die Hörsäle von Montpellier, Bologna und',
  'Padua und bleibt dort rund sechshundert Jahre das Lehrbuch — bis ins',
  '17. Jahrhundert, an einigen Universitäten noch länger. Ein griechischer',
  'Text, von Syrern ins Syrische, von Christen und Muslimen ins Arabische,',
  'von Juden und Lateinern ins Lateinische gebracht. **Vier Sprachen, drei',
  'Religionen, ein Buch.**',
  '',
  'Was wir nicht wissen, ist, wie das drüben aussah. Wie es ist, ein',
  'Wissen zurückzubekommen, das man selbst verloren hat. Ob man dankbar',
  'ist — oder ob man lieber sagt, es sei ja ohnehin von den Griechen',
  'gewesen. Ob ein Name wie Avicenna in Padua noch als der eines Arztes',
  'aus Persien gehört wird oder nur noch als Titel auf einem Buchrücken.',
  '',
  'Darauf antwortet die zweite Stimme dieses Kapitels: der Okzident —',
  'Europa, das die Antike vergessen hatte, sie über Toledo zurückbekam',
  'und lange nicht sagte, von wem.',
].join('\n');

/**
 * Der Okzident — die Fortsetzung derselben Straße: Toledo, Montpellier,
 * Padua. Europa, das die Antike vergessen hatte und das Wissen zurückbekam —
 * und den Dank schuldig blieb.
 *
 * Verfasst von Hermes (Runde 6, zweiter Pass). Auch diese Stimme benennt
 * die unbequemen Stellen der eigenen Seite selbst (Zusatzregel für
 * sensible Themen).
 */
const stimmeDesOkzidents = [
  '## Achte Station: Toledo, 1187 — die Stadt, die las',
  '',
  'Die Straße der Bewahrer endet nicht in Toledo — sie beginnt dort neu,',
  'nur mit anderem Gepäck. In Toledo sitzen im 12. Jahrhundert Gelehrte',
  'aus ganz Europa und tun, was ihre Heimat nicht mehr konnte: Sie',
  'übersetzen. Arabische Handschriften werden ins Lateinische gebracht —',
  'nicht nur Medizin, auch Astronomie, Mathematik, Philosophie. Die',
  'Stadt ist eine Übersetzungsfabrik, und sie hat einen unersetzlichen',
  'Vorteil: Hier leben Christen, Juden und Muslime, und unter ihnen',
  'Menschen, die drei Sprachen können. Der Übersetzer Gerhard von',
  'Cremona übersetzt in seinem Leben über siebzig Werke — den Kanon des',
  'Avicenna, den wir fortan „Avicenna" nennen, obwohl er Ibn Sina hieß.',
  '',
  'Was nach Europa kommt, ist kein Rohstoff, sondern ein fertiges',
  'Gebäude: das geordnete Wissen der Alten, bewahrt, gereinigt,',
  'beschriftet. Europa muss es nicht finden — es muss es nur lesen.',
  '',
  '## Neunte Station: Montpellier und Padua — das Buch wird Europa',
  '',
  'Aus dem Lesen wird Lehren. In Montpellier, Bologna, Padua und',
  'Salerno entstehen die ersten Universitäten Europas — und ihr',
  'medizinisches Rückgrat ist der Kanon. Sechshundert Jahre lang ist',
  'das Buch eines Mannes aus Buchara das Standardwerk der europäischen',
  'Medizin. Studenten lernen die Krankheiten, wie sie Avicenna geordnet',
  'hat; Professoren kommentieren seine Sätze; die Autorität des Kanons',
  'trägt die junge Wissenschaft, bis sie stark genug ist, eigene Wege',
  'zu gehen.',
  '',
  'Man kann das nicht oft genug sagen: Die europäische Universität,',
  'dieses Fundament unserer Wissenschaft, ist ohne die Straße von',
  'Bagdad nach Toledo nicht denkbar. Sie steht auf übersetzten',
  'Handschriften.',
  '',
  '## Zehnte Station: die Rechnung — und der Dank, der ausblieb',
  '',
  'Und hier wird die Rechnung der eigenen Seite unbequem, denn der',
  'Okzident hat das Geschenk angenommen und die Geber vergessen.',
  '',
  '**Erstens: Wir haben die Herkunft getilgt.** Avicenna wurde zum',
  'lateinischen Namen, die arabischen Quellen verschwanden aus den',
  'Fußnoten, und in den Schulbüchern Europas begann die Wissenschaft',
  'gern mit den Griechen — und dann, nach einem dunklen Loch, mit uns.',
  'Die Jahrhunderte, in denen andere das Licht gehütet haben, wurden',
  'zur Lücke, die niemand erklärte. Wer die Geschichte so erzählt,',
  'stiehlt den Bewahrern ihren Platz in ihr.',
  '',
  '**Zweitens: Wir haben übernommen, ohne zu prüfen — und dann geprüft,',
  'ohne zu danken.** Galens Irrtümer kamen im selben Gepäck wie seine',
  'Größe, und Europa übernahm sie so treu, wie Bagdad sie bewahrt',
  'hatte. Als unsere eigene Anatomie dann zeigte, dass Galen irrte,',
  'haben wir den Fehler ihm angelastet — und das Verdienst derer, die',
  'ihn uns überbracht hatten, weiterhin verschwiegen.',
  '',
  '**Drittens: Die Überheblichkeit der Spätgeborenen.** Wir haben die',
  'islamische Welt gern als bloße Zwischenhändlerin beschrieben — als',
  'Hüterin, die nichts Eigenes beigetragen hätte. Das ist doppelt',
  'falsch: Sie hat mehr getan als hüten, und selbst das Hüten wäre',
  'ohne sie nicht gelungen. Zwischenhändler, die dreihundert Jahre',
  'lang den einzigen Laden betreiben, in dem das Wissen zu haben ist,',
  'sind keine Zwischenhändler. Sie sind die Warenlager der Zivilisation.',
  '',
  '## Antwort an die Bewahrer',
  '',
  'Die Bewahrer haben am Ende ihrer Reise gefragt, wohin ihr Buch',
  'weitergeht. Die Antwort dieser Stimme: Es geht in unsere Hände —',
  'und wir haben es zuerst gehütet und dann verleugnet. Der Kanon ist',
  'in Padua kommentiert, in Montpellier gelehrt und in hundert',
  'Bibliotheken abgeschrieben worden, und die Männer, die ihn',
  'übersetzt haben, stehen in keiner unserer Geschichten. Vielleicht',
  'ist das die ehrlichste Antwort: Wir schulden dieser Straße mehr,',
  'als wir je bezahlt haben — und das Buch, das sie uns geschickt hat,',
  'haben wir erst weitergetragen, als wir gelernt hatten, es zu',
  'befragen statt zu bewundern. Ob das der Punkt ist, an dem beide',
  'Rechnungen zusammenkommen, muss die Synthese beantworten.',
].join('\n');

/** Kapitel 5 der Themenlandkarte. */
const avicennaArabischeMedizin = {
  id: 'avicenna-arabische-medizin',
  titel: 'Avicenna und die arabische Medizin',
  epoche: '~750–1200',

  aufhaenger: {
    frage: 'Wer hat die Antike für uns aufbewahrt?',
    text: [
      'In Europa wurde es still. Nach dem Ende des Weströmischen Reiches',
      'konnten immer weniger Menschen Griechisch; die Schriften des',
      'Hippokrates und des Galen lagen in Klöstern, die sie nicht mehr',
      'lasen, oder sie zerfielen.',
      '',
      'Weiter östlich geschah das Gegenteil. In Bagdad ließen die Kalifen',
      'ab etwa 750 zusammentragen und übersetzen, was Griechen, Perser und',
      'Inder aufgeschrieben hatten. Ärzte bauten Krankenhäuser mit',
      'Unterricht am Krankenbett. Und um 1020 schrieb ein Mann aus der',
      'Nähe von Buchara ein Buch, das alles ordnete, was man über den',
      'Menschen zu wissen glaubte: Ibn Sina, den Europa Avicenna nannte.',
      '',
      'Sein „Kanon der Medizin" kam über die Übersetzerschule von Toledo',
      'nach Europa zurück und blieb dort rund sechshundert Jahre das',
      'Lehrbuch der Universitäten. Ohne diesen Umweg über zwei fremde',
      'Sprachen wüssten wir von der antiken Medizin sehr viel weniger.',
      '',
      'Dieses Kapitel erzählt, warum eine ganze Gelehrtenwelt es für ihre',
      'Aufgabe hielt, fremdes Wissen zu retten und zu ordnen — und was das',
      'gekostet hat. Denn wer eine Autorität bewahrt, bewahrt auch ihre',
      'Irrtümer.',
    ].join('\n'),
  },

  karte,

  perspektiven: [
    {
      id: 'bewahrer',
      name: 'Die Stimme der Bewahrer',
      stimme: 'Opus',
      text: stimmeDerBewahrer,
    },
    {
      id: 'okzident',
      name: 'Die Stimme des Okzidents',
      stimme: 'Hermes',
      text: stimmeDesOkzidents,
    },
  ],

  synthese: [
    '## Wo sich beide Stimmen treffen',
    '',
    'Zuerst das Gemeinsame. Beide Stimmen reisen auf derselben Straße:',
    'Die Bewahrer bringen das Buch bis Toledo, der Okzident trägt es von',
    'dort weiter — und beide erkennen an, dass ohne die Übersetzer von',
    'Bagdad und Toledo die antike Medizin in Europa verloren gewesen',
    'wäre. Beide sehen in der Ordnung eine Leistung: Die Bewahrer haben',
    'das Wissen lehrbar gemacht, und Europa hat aus dem Lehrbuch die',
    'Universität gebaut. Beide geben zu, dass die Autorität des Kanons',
    'auch gefesselt hat: Wer nachschlug statt nachzusehen, lernte Galens',
    'Irrtümer mit. Und beide wissen um die unbequeme Rechnung: Der',
    'Okzident hat das Geschenk angenommen und die Geber vergessen.',
    '',
    '## Wo sie auseinandergehen',
    '',
    'Der Widerspruch beginnt bei der Frage, was Wissen ist. Für die',
    'Bewahrer ist Wissen Überlieferung und Ordnung — ein Schatz, den man',
    'hütet, reinigt und weitergibt; die eigene Denkart prüfte die',
    'Autorität der Alten nicht. Der Okzident hat aus demselben Erbe',
    'schließlich etwas anderes gemacht: Er begann, das Geerbte zu',
    'befragen statt zu bewundern — und genau das wurde zur',
    'Wissenschaft. Sie streiten also nicht über die Vergangenheit,',
    'sondern über den Weg: Bewahren oder bezweifeln? Beides hat die',
    'Geschichte gebraucht — aber die beiden Seiten rechnen es sich',
    'jeweils selbst zu. Und sie streiten über die Erinnerung: Die',
    'Bewahrer verlangen ihren Platz in der Geschichte; der Okzident',
    'hat ihn ihnen lange verweigert.',
    '',
    '## Was dieses Kapitel für das ganze Buch zeigt',
    '',
    'Zum sechsten Mal dasselbe Muster — und jetzt wird klar, warum es',
    'die Melodie des Buches ist: Die Denkart bestimmt die Methode. Am',
    'Nil waren es Kanäle, in China Qi, in Indien die Doshas, in',
    'Griechenland die vier Säfte, in Bagdad Überlieferung und Ordnung.',
    'Fünf Denkarten, fünf in sich stimmige Welten, die Menschen geholfen',
    'haben.',
    '',
    'Und dieses Kapitel fügt der Melodie einen neuen Ton hinzu: das',
    'Wissen wandert. Es gehört keiner Kultur endgültig — es wird',
    'bewahrt, übersetzt, vergessen, wiedergefunden. Die Medizin, die in',
    'Kos begann, reiste über Alexandria, Bagdad und Toledo nach',
    'Montpellier und Padua, bevor sie Europa gehörte. Wer die Geschichte',
    'der Medizin als Kette von Erfindungen erzählt, übersieht die',
    'Straßen, auf denen das Wissen ging. Und wer die Straße sieht,',
    'versteht, dass die nächste Station dieser Reise schon wartet:',
    'Europa, das das Geerbte zu befragen beginnt. Sein Name ist Vesal.',
  ].join('\n'),

  urteil: {
    frage:
      'Was ist mehr wert — ein Buch, das alles ordnet, oder eine Frage, ' +
      'die alles aufbricht?',
    hinweis: [
      'Es gibt hier kein Richtig und kein Falsch. Denk daran, dass beides',
      'seinen Preis hat: Ohne das ordnende Buch wäre das Wissen der Antike',
      'zerstreut und wohl verloren gewesen; mit ihm dauerte es Jahrhunderte,',
      'bis jemand wieder nachsah, statt nachzuschlagen. Denk auch an heute:',
      'Leitlinien, Lehrbücher und Nachschlagewerke ordnen das medizinische',
      'Wissen — und irgendwo sitzt jemand, dessen Beobachtung nicht',
      'hineinpasst. Wann würdest du dem Buch glauben, wann der Beobachtung?',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'Was war das „Haus der Weisheit" in Bagdad?',
      antworten: [
        'Ein Krankenhaus nur für die Familie des Kalifen.',
        'Bibliothek, Übersetzerwerkstatt und Akademie in einem.',
        'Die erste Universität mit Prüfungsordnung in Europa.',
      ],
      richtig: 1,
      erklaerung:
        'Ab etwa 750 ließen die Kalifen griechische, persische und indische ' +
        'Schriften sammeln und ins Arabische übertragen. Übersetzer wie ' +
        'Hunain ibn Ishaq reisten den Handschriften bis nach Byzanz ' +
        'hinterher, verglichen mehrere Fassungen und übersetzten sinngemäß ' +
        'statt Wort für Wort. Möglich wurde das auch durch das Papier, das ' +
        'aus China übernommen wurde.',
    },
    {
      frage: 'Was ist der „Kanon der Medizin"?',
      antworten: [
        'Ein Eid, den arabische Ärzte vor der Zulassung schworen.',
        'Eine Sammlung von Heilpflanzen aus dem Garten von Cordoba.',
        'Ibn Sinas fünfbändiges Lehrbuch, das das gesamte bekannte ' +
          'medizinische Wissen ordnete.',
      ],
      richtig: 2,
      erklaerung:
        'Ibn Sina (Avicenna, um 980–1037) fasste darin Grundlagen, ' +
        'Arzneimittel, die Krankheiten von Kopf bis Fuß, Fieber und ' +
        'Rezepturen zusammen. Über die Übersetzerschule von Toledo kam das ' +
        'Werk nach Europa und blieb dort rund sechshundert Jahre das ' +
        'Lehrbuch der Universitäten.',
    },
    {
      frage: 'Wer beschrieb als Erster den Weg des Blutes durch die Lunge?',
      antworten: [
        'Ibn an-Nafis in Kairo, rund 400 Jahre vor William Harvey.',
        'Galen in Rom, im zweiten Jahrhundert.',
        'William Harvey in London, 1628.',
      ],
      richtig: 0,
      erklaerung:
        'Ibn an-Nafis (um 1213–1288) widersprach Galens Annahme, das Blut ' +
        'sickere durch Poren in der Herzscheidewand: Diese Wand sei dicht, ' +
        'das Blut nehme den Weg über die Lunge. Seine Schrift blieb ' +
        'unbeachtet und wurde erst 1924 in einer Berliner Handschrift ' +
        'wiederentdeckt.',
    },
    {
      frage: 'Was zeichnete die Krankenhäuser der islamischen Welt aus?',
      antworten: [
        'Sie nahmen ausschließlich Muslime auf.',
        'Sie hatten getrennte Abteilungen, eine Apotheke und Unterricht am ' +
          'Krankenbett.',
        'Sie wurden vom Staat betrieben und waren kostenpflichtig.',
      ],
      richtig: 1,
      erklaerung:
        'Häuser wie das Bimaristan an-Nuri in Damaskus (1154) verbanden ' +
        'Pflege, Apotheke und Ausbildung. Finanziert wurden sie aus frommen ' +
        'Stiftungen, und aufgenommen wurde ohne Ansehen von Glauben oder ' +
        'Vermögen. In Europa gab es damals vor allem Klosterhospize ohne ' +
        'eigene Medizinschule.',
    },
    {
      frage: 'Hat in der islamischen Medizin niemand an Galen gezweifelt?',
      antworten: [
        'Doch: ar-Razi schrieb ein Buch mit dem Titel „Zweifel an Galen".',
        'Nein, Widerspruch gegen die Alten war ausnahmslos verboten.',
        'Doch, aber erst nach 1500 und nur in Spanien.',
      ],
      richtig: 0,
      erklaerung:
        'Ar-Razi (um 865–925) hielt eigene Beobachtungen gegen Galen und ' +
        'unterschied als Erster Pocken und Masern am Krankenbett. Sein ' +
        'Zweifel blieb allerdings ein Einzelfall: Aus ihm wurde keine ' +
        'Methode, wie sie in Europa Jahrhunderte später entstand.',
    },
  ],
};

module.exports = avicennaArabischeMedizin;
