// Kapitel 7 — „Paracelsus und Vesal".
//
// Die Station, an der die europäische Medizin aufhört, ihren Büchern zu
// gehorchen. Zwischen 1527 und 1543 geschieht zweierlei, das nichts
// miteinander zu tun hat und doch dasselbe bedeutet: Ein Wanderarzt wirft in
// Basel öffentlich die Werke der alten Autoritäten ins Feuer, und ein junger
// Professor in Padua öffnet Leichen und zeichnet, was er darin findet — statt
// was im Buch steht.
//
// Die DENKART-Analyse ist das Herzstück (Betreiber-Vorgabe). Sie fragt hier:
// Welches Weltbild steckt hinter der Chemie des Paracelsus (Sal, Sulfur,
// Merkur)? Warum verbrennt jemand Bücher, statt sie zu widerlegen? Warum
// sollte ein Kraut sein Zeichen tragen (die Signaturenlehre)? Und warum wird
// aus der Frage „Ist das Mittel giftig?" die Frage „Wie viel davon?" — die
// Dosis-Maxime, mit der die Arzneimittelkunde beginnt. Dazu die ehrliche
// Bilanz in beide Richtungen: was Bestand hat, was Irrtum war und was
// geschadet hat. Die Stimme benennt das selbst (Zusatzregel für sensible
// Themen in CLAUDE.md).
//
// LÄNGENREGEL (Betreiber-Feedback 24.08.2026): Kapitel 1–8 bleiben kurz und
// dicht — jede Perspektive höchstens ~250 Zeilen, das Kapitel insgesamt
// höchstens ~600 Zeilen. Die erste Stimme hier hat rund 220 Zeilen; der Rest
// lässt Hermes Platz für die zweite Stimme und die finale Synthese. Gemessen
// wird die Zeilenzahl in tests/karte-paracelsus-vesal.mjs.
//
// Stimmen (Runde 8): Die ERSTE Perspektive — Paracelsus als Ankläger —
// verfasste Opus. Die ZWEITE (Vesal, der Anatom aus Brüssel und Professor in
// Padua: der leise Bruch im Anatomietheater) und die finale Synthese ergänzte
// Hermes im zweiten Pass. Perspektiven-Workflow: CLAUDE.md.
//
// KEINE WIEDERHOLUNGEN (Betreiber-Entscheid vom 21.08.2026): Kapitel 1
// gliedert nach „Wer hier spricht → …", Kapitel 2 beginnt mit einer Szene,
// Kapitel 3 erzählt einen Tageslauf, Kapitel 4 ist ein Briefwechsel,
// Kapitel 5 die Reise eines Buches, Kapitel 6 ein Rundgang durchs Kloster.
// Dieses Kapitel wählt die siebte Dramaturgie: einen PROZESS. Die Abschnitte
// sind die Stationen einer Verhandlung — Anklage, Person des Anklägers, drei
// Beweisstücke, Kreuzverhör, ausstehendes Urteil. Der Gerichtssaal ist
// ausdrücklich als Erfindung gekennzeichnet: Die beiden Männer sind einander
// nie begegnet. Die zweite Stimme kann in derselben Verhandlung als Zeuge
// auftreten.
//
// Die Texte liegen als Zeilen-Arrays mit `.join('\n')` — so bleiben sie im
// Repo bei ~72 Zeichen lesbar (der Betreiber liest sie hier gegen), und
// utils/markdown.js macht in der App wieder fließenden Text daraus.
//
// CommonJS ohne UI-Importe (Architektur-Regel): mit blankem `node` prüfbar.

const { karte } = require('./karten/paracelsus-vesal');

/**
 * Die Stimme des Paracelsus — der Ankläger in einem erfundenen Prozess.
 *
 * Verfasst von Opus (Runde 8). Sie erzählt von innen: warum die alten Bücher
 * brannten, warum der Arzt an den Ofen gehört, warum die Natur in Zeichen
 * spricht und warum die Dosis über Gift und Arznei entscheidet — und wo diese
 * Denkart an ihre Grenze kam. Die unbequemen Stellen benennt sie selbst,
 * statt sie der Gegenstimme zu überlassen.
 */
const stimmeDesParacelsus = [
  '## Die Anklage',
  '',
  'Diesen Gerichtssaal hat es nie gegeben. Die beiden Männer, die hier',
  'nacheinander sprechen, sind einander nie begegnet: Der eine war ein',
  'wandernder Arzt ohne festen Wohnsitz, der andere ein Professor in',
  'Padua, einundzwanzig Jahre jünger. Sie haben nichts voneinander',
  'gewusst — und im selben Jahrzehnt dasselbe getan. Deshalb ist dieses',
  'Gericht erfunden: damit beide zu Wort kommen.',
  '',
  'Ich rede zuerst. **Theophrastus Bombastus von Hohenheim**, Wundarzt,',
  'Bergmannssohn, Landstreicher; die Leute nennen mich **Paracelsus**.',
  'Und gleich zu Anfang, damit Du weißt, woran Du bist: **Was Du hier',
  'hörst, ist meine Sicht — eine Denkart, keine Wahrheit.** Ich war ein',
  'streitsüchtiger Mensch und habe geschimpft, wo ich hätte prüfen',
  'sollen. Rechne damit.',
  '',
  'Ich klage an: **Galenos von Pergamon**, seit dreizehnhundert Jahren',
  'tot, und mit ihm **Avicenna**, den Perser — und mit ihnen die',
  'Fakultäten zu Paris, Leipzig, Wien und Basel.',
  '',
  'Der Vorwurf lautet nicht, dass diese Männer geirrt hätten. Irren ist',
  'kein Verbrechen; ich habe mehr geirrt als sie. Der Vorwurf lautet:',
  '**Man hat aus ihren Büchern ein Gesetz gemacht.** Wer an einer',
  'Universität Arzt werden wollte, las Galen, hörte Vorlesungen über',
  'Galen und wurde geprüft, ob er Galen kenne. Was am Kranken zu sehen',
  'war, hatte sich danach zu richten. Stimmte der Befund nicht mit dem',
  'Buch überein, dann war eben der Befund die Ausnahme.',
  '',
  'Am Johannistag 1527 habe ich diesen Büchern vor der Universität zu',
  'Basel gegeben, was ich für richtig hielt: Ich warf sie ins',
  'Freudenfeuer der Studenten. Was genau in den Flammen lag, streiten',
  'die Gelehrten bis heute; der Kanon des Avicenna gewiss. Es war eine',
  'Aufführung, und ich wusste es. **Man verbrennt keine Irrtümer, man',
  'widerlegt sie.** Ich komme darauf zurück.',
  '',
  '## Zur Person des Anklägers',
  '',
  'Geboren um 1493 bei Einsiedeln in der Schweiz, Sohn eines Wundarztes,',
  'der mein erster Lehrer war. 1502 zog mein Vater nach Villach in',
  'Kärnten und unterrichtete an der Bergschule. Dort bin ich',
  'aufgewachsen: zwischen Stollen, Schmelzöfen und Bergleuten, die mit',
  'vierzig Jahren nicht mehr atmen konnten.',
  '',
  '**Das ist der Anfang meiner ganzen Denkart.** Wer zusieht, wie aus',
  'grauem Erz in der Hitze Metall wird, glaubt nicht mehr, dass die Welt',
  'aus vier Säften besteht. Er sieht: Die Dinge haben Bestandteile, und',
  'mit Feuer lassen sie sich trennen. Und er sieht noch etwas: Die',
  'Krankheit der Bergleute kommt nicht aus ihrem Inneren. Sie kommt aus',
  'dem Stollen.',
  '',
  'Studiert habe ich in Italien, vermutlich in Ferrara. Wo genau und ob',
  'ich den Doktorgrad wirklich erwarb, bestreiten meine Gegner bis',
  'heute — sie haben mich mein Leben lang daran gepackt. Danach zog ich',
  'jahrzehntelang durch die Länder: Feldscher in Kriegen, Gast bei',
  'Badern, Hebammen, Scharfrichtern, Bergleuten und alten Frauen, die',
  'ihre Kräuter kannten.',
  '',
  '**Warum bei denen und nicht an den Fakultäten?** Weil dort die',
  'Kranken lagen. Ein Buch wiederholt, was ein anderes Buch sagt; ein',
  'Bader hat tausend Wunden gesehen. Ich habe es hart gesagt: Die',
  'Hochschulen lehren nicht alles, der Arzt muss auch zu den alten',
  'Frauen gehen. **Die Erfahrung ist der Lehrmeister** — nicht',
  'Aristoteles, nicht Galen und auch nicht ich.',
  '',
  '1527 dann Basel. Ich hatte dem Drucker Johannes Froben das kranke',
  'Bein behandelt, das ihm andere abnehmen wollten; er behielt es. So',
  'wurde ich Stadtarzt, und die Stadt erlaubte mir, an der Universität',
  'zu lesen. Ich las **auf Deutsch** statt auf Latein und ließ',
  'hereinkommen, wer wollte — auch Bader und Wundärzte, die kein Latein',
  'konnten. Für die Fakultät war das keine Neuerung, sondern eine',
  'Unverschämtheit.',
  '',
  'Es hielt kein Jahr. Ein Domherr, den ich behandelt hatte, wollte das',
  'zugesagte Honorar nicht zahlen; das Gericht gab ihm recht, ich',
  'antwortete mit Schmähschriften — und floh Anfang 1528 bei Nacht aus',
  'der Stadt. Danach hatte ich nie wieder ein Amt.',
  '',
  '## Beweisstück eins: der Ofen',
  '',
  'Ich lege das erste Beweisstück vor: einen Schmelzofen.',
  '',
  'Die Schule lehrt: Der Mensch ist ein Gemisch aus vier Säften, und',
  'krank ist er, wenn eines davon überwiegt. Also lässt man zur Ader,',
  'purgiert, kühlt und wärmt, bis das Gleichgewicht wieder stimmt.',
  '',
  'Ich sage: **Die Welt ist nicht aus Säften gebaut, sondern aus drei',
  'Prinzipien — Sal, Sulfur und Merkur**, also Salz, Schwefel und',
  'Quecksilber. Wirf ein Stück Holz ins Feuer: Was brennt, ist der',
  'Sulfur; was als Rauch entweicht, ist der Merkur; was als Asche',
  'zurückbleibt, ist das Sal. Das Brennbare, das Flüchtige, das Feste —',
  'daraus ist jedes Ding, auch der Leib.',
  '',
  '**Warum diese drei und nicht die vier Säfte?** Weil ich sie zeigen',
  'kann. Die Säfte sind eine Behauptung; der Ofen ist ein Versuch. Was',
  'im Feuer geschieht, geschieht vor Deinen Augen — und morgen wieder.',
  '',
  'Daraus folgt mein zweiter Satz, und er ist der wichtigere: **Eine',
  'Krankheit ist kein Ungleichgewicht, sondern ein Ding, das von außen',
  'kommt und einen eigenen Sitz hat.** Die Bergsucht sitzt in der Lunge',
  'und kommt aus dem Stollen. Wenn aber jede Krankheit ihre eigene',
  'Ursache hat, dann braucht sie auch **ihre eigene Arznei** — und nicht',
  'das immer gleiche Aderlassen für alles.',
  '',
  '**Warum dann der Ofen und nicht der Kräutergarten?** Weil in der',
  'Pflanze das Wirksame verborgen liegt wie das Metall im Erz. Der',
  'Alchemist scheidet das Reine vom Unreinen — nicht um Gold zu machen,',
  'das ist Narrenwerk, sondern um Arznei zu machen. **Der Arzt ist ein',
  'Chemiker.** Deshalb arbeitete ich mit Metallen und Mineralien, wo',
  'andere nur Kräuter kannten: Quecksilber, Antimon, Eisen, Schwefel,',
  'das Zink, dem ich seinen Namen gab, und der Mohnauszug, den ich',
  'Laudanum nannte.',
  '',
  '**Das ist der Teil meiner Anklage, der Bestand hatte.** Aus dieser',
  'Werkstatt ist die Apotheke geworden und aus der Apotheke die',
  'Arzneimittelkunde. Wer heute einen Wirkstoff aus einer Pflanze',
  'herauslöst, tut, was ich am Ofen versucht habe — nur besser.',
  '',
  '## Beweisstück zwei: die Zeichen der Natur',
  '',
  'Jetzt das Stück, bei dem ich mich am gründlichsten geirrt habe. Ich',
  'lege es trotzdem vor, denn ohne dieses Stück verstehst Du meine',
  'Denkart nicht.',
  '',
  '**Warum sollte überhaupt irgendein Kraut irgendetwas heilen?** Die',
  'Frage ist ernst gemeint: Es gibt tausend Pflanzen — woher weiß der',
  'Arzt, welche? Meine Antwort war die **Signatur**. Gott hat die Welt',
  'für den Menschen eingerichtet und jeder Arznei ihr Zeichen ins',
  'Äußere geschrieben; wer lesen kann, findet sie.',
  '',
  'Das Schöllkraut führt einen gelben Saft — also gegen Gelbsucht und',
  'Galle. Das Lungenkraut trägt Flecken wie eine Lunge — also gegen den',
  'Husten. Die Walnuss sieht aus wie ein Gehirn in seiner Schale — also',
  'für den Kopf. **Die Schöpfung spricht in Zeichen, und die Heilkunde',
  'ist die Kunst, sie zu lesen.**',
  '',
  'Verstehst Du, warum das damals vernünftig klang? Es machte die Natur',
  'zu einem Buch, das jeder aufschlagen konnte, auch wer kein Latein',
  'kannte. Es setzte an die Stelle der Autorität etwas, das jeder selbst',
  'nachsehen durfte. Es war, für mein Empfinden, Freiheit.',
  '',
  '**Und es war falsch.** Die Farbe eines Saftes sagt nichts über seine',
  'Wirkung. Schöllkraut hilft der Leber nicht — es kann sie schädigen.',
  'Die Signaturenlehre hat Heilkundige über Generationen sicher gemacht,',
  'wo sie hätten prüfen müssen; sie ist ein System, das auf jede Frage',
  'eine Antwort hat und deshalb keine gibt. **Ich habe die eine',
  'Autorität angegriffen und an ihre Stelle eine andere gesetzt: mich.**',
  '',
  '## Beweisstück drei: die Dosis',
  '',
  'Das letzte Beweisstück ist ein Satz. Er stammt aus einer Schrift, in',
  'der ich mich gegen den Vorwurf verteidigte, ich vergifte meine',
  'Kranken:',
  '',
  '> Alle Dinge sind Gift, und nichts ist ohne Gift; allein die Dosis',
  '> macht, dass ein Ding kein Gift ist.',
  '',
  '**Warum musste ich das schreiben?** Wegen der Franzosenkrankheit, die',
  'Ihr heute Syphilis nennt. Sie ging um wie ein Feuer, und es gab zwei',
  'Behandlungen. Die eine war das Guajakholz aus Westindien: sanft,',
  'sehr teuer und ohne Wirkung — und der Handel damit lag bei einem der',
  'reichsten Handelshäuser Europas. Die andere war Quecksilber, das',
  'wirkte und in den üblichen Mengen die Leute umbrachte: Speichelfluss,',
  'ausfallende Zähne, zerstörte Nieren.',
  '',
  'Meine Antwort war nicht, das Gift zu verbieten, sondern es zu',
  '**messen**: kleine Gaben, innerlich, genau bemessen. Damit wird aus',
  'der Frage „Ist dieses Mittel giftig?" die Frage „Wie viel davon?" —',
  'und das ist der Anfang der Arzneimittellehre. Jeder Beipackzettel,',
  'den Du heute liest, steht auf diesem Satz.',
  '',
  'Was mir das eintrug, gehört zur Geschichte: Mein Buch über die',
  'Franzosenkrankheit wurde 1530 in Nürnberg gestoppt, auf Betreiben der',
  'Leipziger Fakultät. **Der Streit war nie nur ein Streit über',
  'Krankheiten. Es ging auch um Ämter, um Bücher und um Geld.**',
  '',
  'Ein Stück lege ich noch dazu, weil es mir das liebste ist: 1534',
  'schrieb ich in Kärnten „Von der Bergsucht" über die Lunge der',
  'Bergleute. Vorher hatte niemand gefragt, ob die Arbeit selbst krank',
  'macht. **Das war die erste Schrift über eine Berufskrankheit** — und',
  'sie kam nicht aus einer Bibliothek, sondern aus einem Stollen.',
  '',
  '## Das Kreuzverhör: was gegen mich spricht',
  '',
  'Ein Ankläger, der sich nicht selbst verhört, taugt nichts. Also die',
  'Gegenrechnung, und ich mache sie ehrlich.',
  '',
  '**Ich habe mehr eingerissen als aufgebaut.** Galen zu verbrennen war',
  'leicht; etwas Prüfbares an seine Stelle zu setzen, habe ich nicht',
  'geschafft. Meine drei Prinzipien sind so wenig zu beweisen wie die',
  'vier Säfte, über die ich lachte.',
  '',
  '**Meine Schriften sind ein Dickicht.** Neben dem Ofen stehen die',
  'Gestirne, die Geister der Elemente, ein innerer Alchemist, den ich',
  'Archeus nannte, und Wörter, die ich selbst erfunden habe. Wer mich',
  'liest, findet auf derselben Seite eine kluge Beobachtung und einen',
  'Zauberspruch — und kann beides nicht auseinanderhalten. Der größte',
  'Teil meiner Werke erschien erst Jahrzehnte nach meinem Tod; was davon',
  'wirklich von mir stammt, streiten die Gelehrten bis heute.',
  '',
  '**Mein Ton hat mir mehr geschadet als meinen Gegnern.** Ich habe die',
  'Doktoren öffentlich als Schwätzer beschimpft und von den „Herren von',
  'Hohlschädel" geschrieben. Wer so redet, wird nicht widerlegt — er',
  'wird nicht mehr eingeladen. Ich hatte keine Schule, keinen Lehrstuhl',
  'und keinen Schüler von Rang. Ich starb 1541 in einem Gasthaus in',
  'Salzburg, achtundvierzig Jahre alt, ohne Amt.',
  '',
  '**Und meine Arzneien haben getötet.** Quecksilber tötet auch in',
  'kleinen Gaben, wenn man es lange gibt; das habe ich nicht gewusst.',
  'Antimon wurde nach mir als Wundermittel verkauft, bis Paris es',
  'verbot. **Ich habe die Dosis zur Regel gemacht und ihre Grenze doch',
  'nicht gekannt.**',
  '',
  'Bleibt das Feuer von Basel. Es hat mich berühmt gemacht und meiner',
  'Sache geschadet. **Die Autorität ist nicht daran zerbrochen, dass',
  'einer ihre Bücher verbrannte.** Sie zerbrach daran, dass jemand',
  'nachsah.',
  '',
  '## Das Urteil steht aus',
  '',
  'Denn während ich in Basel Feuer machte, saß in Löwen ein Junge über',
  'seinen Büchern, den ich nie kennengelernt habe: **Andreas Vesal**,',
  '1514 in Brüssel geboren, aus einer Familie von Hofärzten und',
  'Apothekern — alles, was ich nicht war. Mit dreiundzwanzig hatte er in',
  'Padua einen Lehrstuhl.',
  '',
  'Er tat etwas, das mir nie eingefallen wäre. Er hielt keine Rede gegen',
  'Galen. Er stieg von der Kanzel herab, nahm selbst das Messer, öffnete',
  'den Leib und **sah nach** — und schrieb Stelle für Stelle auf, wo',
  'Galen etwas anderes beschrieben hatte, als im Menschen zu finden ist.',
  '1543 erschien sein Werk „De humani corporis fabrica", sieben Bücher',
  'mit Bildern, wie sie noch niemand gesehen hatte.',
  '',
  'Und nun der Satz, an dem ich schlucken muss: **Gedruckt wurde es in',
  'Basel, von Johannes Oporinus — dem jungen Mann, der mir 1527 die',
  'Kohlen im Ofen nachgelegt hatte.** Unsere Wege haben sich nie',
  'gekreuzt. Unsere Bücher lagen in derselben Werkstatt.',
  '',
  'Wer von uns beiden die Autorität wirklich gestürzt hat — der, der',
  'schrie, oder der, der nachsah —, das entscheide ich nicht. Dazu muss',
  'der zweite Zeuge gehört werden. **Die zweite Stimme dieses Kapitels',
  'gehört ihm: dem Anatom aus Padua.**',
].join('\n');

/**
 * Vesal — der Zeuge im Prozess gegen die Autorität. Der Anatom aus
 * Brüssel, Professor in Padua: der Mann, der die Autorität widerlegte,
 * indem er nachsah — der leise Bruch im Anatomietheater.
 *
 * Verfasst von DeepSeek (Runde 8, zweiter Pass). Auch diese Stimme benennt
 * die unbequemen Stellen der eigenen Seite selbst (Zusatzregel für
 * sensible Themen).
 */
const stimmeDesVesal = [
  '## Der Zeuge wird aufgerufen',
  '',
  'Der Ankläger hat laut gesprochen und Bücher verbrannt. Nun tritt ein',
  'anderer Mann vor das Gericht: still, in schwarzer Professorenrobe,',
  'mit geröteten Händen — von Seife und Leichenwachs. Er heißt Andreas',
  'Vesal, ist mit dreißig Professor in Padua und hat soeben ein Buch',
  'vollendet, das die Anatomie des Menschen zeigt, wie sie ist — nicht',
  'wie Galen sie beschrieben hat. Der Ankläger hat die Autorität',
  'beschimpft. Dieser Zeuge hat sie widerlegt. Es ist nicht dasselbe.',
  '',
  '## Aussage: das Theater der Anatomie',
  '',
  'Ich bitte das Gericht, sich ein Theater vorzustellen. In Padua steht',
  'ein hölzerner Turm, in dessen Mitte ein Tisch liegt. Auf dem Tisch',
  'liegt ein Körper — ein Mensch, nicht ein Affe, nicht ein Schwein.',
  'Um den Tisch sitzen Studenten in Rängen, und ich stehe dazwischen,',
  'nicht als Vorleser, sondern als Handwerker: Ich schneide selbst. Das',
  'war das Skandalöse. Bis dahin las der Professor aus Galen vor,',
  'während unten ein Gehilfe sezierte und der Professor nie hinsah.',
  'Ich habe den Galen zur Seite gelegt und die Leiche gefragt.',
  '',
  'Galen hat nie einen Menschen geöffnet. Er hat Affen und Schweine',
  'seziert und das Ergebnis auf den Menschen übertragen — ein',
  'Bauplan, der am falschen Modell geprüft wurde. Das wusste ich, als',
  'ich in Paris studierte, und niemand wollte es hören. In Padua habe',
  'ich es gezeigt: Der Unterkiefer des Menschen ist ein Knochen,',
  'nicht zwei. Das Brustbein hat drei Teile, nicht sieben. Die',
  'Leber hat nicht fünf Lappen. Galen hat geirrt — an jeder zweiten',
  'Stelle, wo man es nachprüfen kann.',
  '',
  '## Aussage: warum ich nicht verbrannt, sondern gezeichnet habe',
  '',
  'Der Ankläger hat Galens Bücher auf den Scheiterhaufen geworfen. Ich',
  'habe ihn nicht verbrannt — ich habe ihn ersetzt. Sieben Jahre habe',
  'ich Leichen geöffnet, gezeichnet, gestochen und gedruckt: die',
  '„Fabrica", das große Buch vom Bau des menschlichen Körpers, 1543',
  'in Basel gedruckt — ausgerechnet von Johannes Oporinus, der einst',
  'dem Ankläger als Schreiber gedient hat. Die Welt ist klein, und die',
  'Druckerpresse macht aus einer Widerlegung ein Gemeingut. Der',
  'Scheiterhaufen des Anklägers brannte einen Abend. Meine Kupfer',
  'platten reisen über die Alpen und drucken die Wahrheit in tausend',
  'Exemplaren.',
  '',
  'Und hier liegt der Unterschied, den ich dem Gericht vorlegen möchte:',
  'Die Autorität ist nicht daran zerbrochen, dass einer ihre Bücher',
  'verbrannte. Sie zerbrach daran, dass jemand nachsah — und das',
  'Ergebnis so genau zeichnete, dass niemand mehr wegsehen konnte. Der',
  'Ankläger hat den Sturm gemacht. Ich habe das Licht gemacht.',
  '',
  '## Das Kreuzverhör: was auch gegen mich spricht',
  '',
  'Der Ankläger wurde ins Kreuzverhör genommen; ich nehme mich selbst',
  'hinein, denn auch dieser Zeuge hat seine Schatten.',
  '',
  '**Erstens: Ich habe geirrt — auch ich.** Die Fabrica ist ein',
  'Meisterwerk der Anatomie und dennoch voller Fehler: Ich habe den',
  'Blutfluss falsch beschrieben, das Herz missverstanden, die',
  'Gefäße teils so gezeichnet, wie Galen sie sah, nicht wie sie sind.',
  'Man sieht nicht alles auf einmal. Wer ein neues Fenster öffnet,',
  'sieht zunächst nur einen Ausschnitt.',
  '',
  '**Zweitens: Die Anatomie ist nicht die Krankheit.** Ich habe den',
  'toten Körper verstanden — aber der Lebende ist mehr als sein Bau.',
  'Ein Chirurg, der die Anatomie kann, ist noch kein Arzt. Die',
  'Fakultät, die ich so verachtete, wusste etwas, das mein Messer',
  'nicht zeigt: den kranken Menschen. Ich bin später Hofarzt',
  'geworden und habe geheilt, so gut ich konnte — mit Mitteln, die',
  'ich in keinem Anatomietheater gelernt habe.',
  '',
  '**Drittens: Der Ruhm ging vor der Gründlichkeit.** Ich war jung,',
  'schnell und eitel. Die großen Tafeln der Fabrica sind auch',
  'Bühnenbilder — Skelette, die posieren, Landschaften im',
  'Hintergrund. Einiges davon war Wissenschaft, einiges war Theater.',
  'Und als der Widerstand gegen mein Buch wuchs, bin ich nicht in',
  'Padua geblieben, um zu kämpfen; ich bin an den Kaiserhof gegangen.',
  'Der Zeuge, der die Wahrheit zeigte, hat sich zurückgezogen, als es',
  'galt, sie zu verteidigen.',
  '',
  '## Das Plädoyer: das Urteil',
  '',
  'Der Ankläger hat am Ende gesagt, das Urteil stehe aus. Als Zeuge',
  'lege ich es dem Gericht vor: Beide haben recht gehabt — der Sturm',
  'und das Licht. Ohne den Sturm hätte niemand zugehört; ohne das',
  'Licht hätte niemand gesehen. Der Ankläger hat den Mut gehabt, die',
  'Autorität zu beleidigen; ich habe die Mühe gehabt, sie zu',
  'ersetzen. Die Medizin brauchte beides: den, der die alten Bücher',
  'verbrannte, und den, der neue druckte. Das Urteil lautet nicht:',
  'Wer von beiden hat gewonnen? Es lautet: Womit wird weitergemacht?',
  'Und die Antwort steht in Padua: mit dem Messer, dem Auge und der',
  'Presse — und mit der Frage, die der Ankläger immer gestellt hat.',
].join('\n');

/** Kapitel 7 der Themenlandkarte. */
const paracelsusVesal = {
  id: 'paracelsus-vesal',
  titel: 'Paracelsus und Vesal',
  epoche: '16. Jahrhundert',

  aufhaenger: {
    frage: 'Was geschieht, wenn zwei Männer aufhören, die Autorität zu fürchten?',
    text: [
      'Dreizehnhundert Jahre lang war in Europa geregelt, was ein Arzt zu',
      'wissen hatte: Galen hatte es aufgeschrieben, Avicenna hatte es',
      'geordnet, die Universitäten prüften es ab. Wer etwas anderes sah als',
      'das, was im Buch stand, hatte sich vermutlich geirrt.',
      '',
      'Dann geschieht innerhalb weniger Jahre zweierlei. In Basel wirft 1527',
      'ein Wanderarzt die Werke der alten Meister ins Feuer, liest auf',
      'Deutsch statt auf Latein und behauptet, die Erfahrung sei der',
      'Lehrmeister: Paracelsus. Und in Padua steigt ein junger Professor von',
      'der Kanzel herunter, nimmt selbst das Messer und zeichnet auf, was er',
      'im geöffneten Körper wirklich findet: Andreas Vesal. 1543 erscheint',
      'sein Anatomiewerk — gedruckt ausgerechnet in Basel.',
      '',
      'Die beiden sind einander nie begegnet und waren so verschieden, wie',
      'zwei Menschen es sein können: der laute Außenseiter und der genaue',
      'Professor. Dieses Kapitel fragt, was sie eigentlich angriffen, womit',
      'sie es ersetzten — und was von beidem geblieben ist.',
    ].join('\n'),
  },

  karte,

  perspektiven: [
    {
      id: 'paracelsus',
      name: 'Die Stimme des Paracelsus',
      stimme: 'Opus',
      text: stimmeDesParacelsus,
    },
    {
      id: 'vesal',
      name: 'Die Stimme des Vesal',
      stimme: 'DeepSeek',
      text: stimmeDesVesal,
    },
  ],

  synthese: [
    '## Wo sich beide Stimmen treffen',
    '',
    'Zuerst das Gemeinsame. Der Ankläger und der Zeuge haben nie',
    'miteinander gesprochen — und doch sagen sie im Kern dasselbe: Die',
    'Autorität der alten Bücher ist zerbrochen. Paracelsus hat sie',
    'verbrannt, Vesal hat sie ersetzt; beide haben Galen hinter sich',
    'gelassen, beide haben aus eigener Anschauung gelehrt, beide haben',
    'die Erfahrung über das Zitat gestellt. Und beide geben zu, dass',
    'ihr eigenes Werk fehlerhaft war: Der eine nennt seine Schriften',
    'ein Dickicht, der andere bekennt, geirrt zu haben. Sogar das',
    'Schicksal verbindet sie: Beide sind an Universitäten gescheitert,',
    'beide endeten als Hofärzte — und beide sind über Oporinus, den',
    'Drucker aus Basel, auf dieselbe Art in die Welt gegangen: als',
    'gedruckte Bücher.',
    '',
    '## Wo sie auseinandergehen',
    '',
    'Der Widerspruch beginnt bei der Frage, wie man die Autorität',
    'bricht. Für Paracelsus ist es ein Akt des Mutes: die alten Bücher',
    'öffentlich verbrennen, auf Deutsch lehren, die Fakultät',
    'beleidigen — der Sturm, der die Luft reinigt. Für Vesal ist es',
    'eine Arbeit: jahrelang sezieren, zeichnen, drucken — das Licht,',
    'das die Dunkelheit überflüssig macht. Der eine gewinnt, indem er',
    'zerstört; der andere, indem er aufbaut. Und sie streiten über die',
    'Quelle des Wissens: Paracelsus liest in der Natur und in den',
    'Zeichen der Schöpfung, Vesal liest im Körper selbst. Beide nennen',
    'es Erfahrung — und meinen Verschiedenes: der eine die Deutung der',
    'Welt, der andere die Messung des Menschen.',
    '',
    '## Was dieses Kapitel für das ganze Buch zeigt',
    '',
    'Zum achten Mal dasselbe Muster — und zum ersten Mal wendet es sich',
    'der Zukunft zu: Die Denkart bestimmt die Methode. Die frühen',
    'Denkarten fragten nach dem Gleichgewicht (Lot, Kanäle, Qi, Doshas,',
    'Säfte); jetzt fragen zwei Männer nach der Erfahrung — und damit',
    'beginnt die Denkart, aus der die moderne Medizin entsteht: nicht',
    'die Autorität, nicht das Gleichgewicht, sondern das Nachsehen.',
    '',
    'Und dieses Kapitel zeigt die Antwort auf die Frage, die es selbst',
    'gestellt hat: Wer schreibt die Geschichte der Medizin — der Laute',
    'oder der Gründliche? Die Antwort der Synthese: Beide. Der Sturm',
    'ohne Licht ist leer; das Licht ohne Sturm wird nicht gesehen. Die',
    'Medizin braucht den, der die alten Bücher verbrennt, und den, der',
    'neue druckt — und sie braucht als Nächstes den, der nicht nur den',
    'toten Körper öffnet, sondern den lebenden fragt: Wie bewegt sich',
    'das Blut? Sein Name ist Harvey — und sein Kapitel kommt als',
    'nächstes.',
  ].join('\n'),

  urteil: {
    frage:
      'Was ist dir näher — der laute Rebell, der die alten Bücher ins Feuer ' +
      'wirft, oder der stille Forscher, der einfach nachsieht?',
    hinweis: [
      'Es gibt hier kein Richtig und kein Falsch. Denk daran, was beides',
      'bewirkt: Der Rebell verschafft der Frage Gehör, aber er liefert oft',
      'keinen Ersatz — Paracelsus hat den Ofen in die Medizin gebracht und',
      'zugleich die Signaturenlehre. Der Gründliche liefert Ersatz, aber es',
      'kann Jahrzehnte dauern, bis jemand hinsieht — Vesals Bilder mussten',
      'erst gedruckt werden, um zu wirken. Denk auch an heute: Wer eine',
      'gängige Behandlung anzweifelt, muss beides können — laut genug sein,',
      'um gehört zu werden, und genau genug, um recht zu behalten. Was',
      'traust du dir eher zu?',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'Was geschah 1527 in Basel?',
      antworten: [
        'Paracelsus wurde zum Rektor der Universität gewählt.',
        'Paracelsus verbrannte öffentlich Bücher der alten Autoritäten.',
        'Vesal hielt dort seine erste öffentliche Sektion ab.',
      ],
      richtig: 1,
      erklaerung:
        'Paracelsus war 1527 Stadtarzt in Basel und durfte an der ' +
        'Universität lesen — auf Deutsch statt auf Latein. Am Johannistag ' +
        'warf er Werke der alten Autoritäten, darunter den „Kanon" des ' +
        'Avicenna, ins Freudenfeuer der Studenten. Nach einem verlorenen ' +
        'Streit um ein Honorar musste er die Stadt Anfang 1528 verlassen.',
    },
    {
      frage: 'Was besagt die Dosis-Maxime des Paracelsus?',
      antworten: [
        'Nur natürliche Mittel sind ungefährlich.',
        'Je stärker verdünnt ein Mittel ist, desto stärker wirkt es.',
        'Alles ist Gift — allein die Menge entscheidet, ob etwas giftig ist.',
      ],
      richtig: 2,
      erklaerung:
        '„Alle Dinge sind Gift, und nichts ist ohne Gift; allein die Dosis ' +
        'macht, dass ein Ding kein Gift ist." Der Satz stammt aus einer ' +
        'Verteidigungsschrift von 1538 und gilt bis heute als Grundregel ' +
        'der Arzneimittelkunde: Nicht der Stoff allein entscheidet über ' +
        'Wirkung oder Schaden, sondern die Menge.',
    },
    {
      frage: 'Was ist die Signaturenlehre?',
      antworten: [
        'Die Annahme, die Natur zeige einer Pflanze im Äußeren an, wofür ' +
          'sie gut ist.',
        'Die Pflicht des Arztes, jedes Rezept eigenhändig zu unterschreiben.',
        'Ein Verfahren, Arzneien nach ihrem Gewicht zu ordnen.',
      ],
      richtig: 0,
      erklaerung:
        'Nach dieser Vorstellung hat die Schöpfung jeder Arznei ein Zeichen ' +
        'mitgegeben: das Schöllkraut mit seinem gelben Saft gegen die ' +
        'Gelbsucht, das gefleckte Lungenkraut gegen den Husten, die Walnuss ' +
        'für den Kopf. Paracelsus vertrat sie mit Nachdruck. Sie hält der ' +
        'Prüfung nicht stand — Aussehen und Wirkung haben nichts ' +
        'miteinander zu tun.',
    },
    {
      frage: 'Wodurch unterschied sich Vesals Anatomie-Unterricht?',
      antworten: [
        'Er verzichtete ganz auf Sektionen und arbeitete nur mit Modellen.',
        'Er sezierte selbst, statt vom Katheder aus vorlesen zu lassen.',
        'Er ließ ausschließlich Tiere öffnen, weil das erlaubt war.',
      ],
      richtig: 1,
      erklaerung:
        'Üblich war, dass der Professor auf dem Katheder aus Galen vorlas, ' +
        'während ein Bader den Körper öffnete und ein Gehilfe darauf ' +
        'zeigte. Vesal stieg herunter und schnitt selbst — und fand dabei ' +
        'Stellen, an denen Galen etwas anderes beschrieben hatte, als im ' +
        'Menschen zu sehen war. Galen hatte vor allem Tiere seziert.',
    },
    {
      frage: 'Was erschien 1543?',
      antworten: [
        'Der „Kanon der Medizin" des Avicenna.',
        'Die erste deutsche Übersetzung des Hippokrates-Eides.',
        'Vesals „De humani corporis fabrica" — gedruckt in Basel.',
      ],
      richtig: 2,
      erklaerung:
        'Die sieben Bücher „Über den Bau des menschlichen Körpers" mit ' +
        'ihren berühmten Holzschnitten erschienen 1543 bei Johannes ' +
        'Oporinus in Basel. Derselbe Oporinus war 1527 der Gehilfe des ' +
        'Paracelsus gewesen — die einzige Verbindung zwischen zwei Männern, ' +
        'die einander nie begegnet sind.',
    },
  ],
};

module.exports = paracelsusVesal;
