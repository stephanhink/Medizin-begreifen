// Kapitel 8 — „Harvey und der Blutkreislauf".
//
// Die Station, an der in die Medizin das Rechnen einzieht. Fünfzehnhundert
// Jahre lang galt: Das Blut entsteht in der Leber, fließt durch die Adern in
// den Leib und wird dort verbraucht. Ein englischer Arzt stellt dieser Lehre
// eine Frage, die vor ihm niemand gestellt hatte — nicht „stimmt das?",
// sondern „wie viel?". Die Antwort ist eine Zahl, die niemand herstellen und
// niemand verbrauchen kann. Also muss dasselbe Blut immer wieder
// vorbeikommen: Es kreist.
//
// Die DENKART-Analyse ist das Herzstück (Betreiber-Vorgabe). Sie fragt hier:
// Warum rechnen, wo man bisher zitierte? Warum am lebenden Tier nachsehen und
// nicht am Toten? Warum das Herz als Pumpe und nicht als Ofen? Und warum
// überzeugt eine Probe am eigenen Arm mehr Menschen als jede Vorlesung? Dazu
// die ehrliche Bilanz in beide Richtungen: was Bestand hat (der Kreislauf,
// die Methode), was Irrtum blieb (die Lunge als Kühlung, die fehlenden
// Kapillaren) und was folgenlos war (dem ersten Kranken half die Einsicht
// erst zweihundert Jahre später). Die Stimme benennt das selbst (Zusatzregel
// für sensible Themen in CLAUDE.md).
//
// LÄNGENREGEL (Betreiber-Feedback 24.08.2026): Kapitel 1–8 bleiben kurz und
// dicht — jede Perspektive höchstens ~250 Zeilen, das Kapitel insgesamt
// höchstens ~600 Zeilen. Dies ist das LETZTE der frühen Kapitel; ab Kapitel 9
// (die grausamen Anfänge der modernen Chirurgie) kehrt sich die Regel um.
// Gemessen wird die Zeilenzahl in tests/karte-harvey.mjs.
//
// Stimmen (Runde 9): Die ERSTE Perspektive — Harvey von innen, der Arzt, der
// rechnete — verfasste Opus. Die ZWEITE (die Tradition: die galenische Lehre,
// die fünfzehnhundert Jahre gehalten hatte, ihr Widerstand und die Frage,
// warum eine falsche Lehre so lange überlebt) und die finale Synthese ergänzte
// Hermes im zweiten Pass. Perspektiven-Workflow: CLAUDE.md.
//
// KEINE WIEDERHOLUNGEN (Betreiber-Entscheid vom 21.08.2026): Kapitel 1
// gliedert nach „Wer hier spricht → …", Kapitel 2 beginnt mit einer Szene,
// Kapitel 3 erzählt einen Tageslauf, Kapitel 4 ist ein Briefwechsel,
// Kapitel 5 die Reise eines Buches, Kapitel 6 ein Rundgang durchs Kloster,
// Kapitel 7 ein Prozess. Dieses Kapitel wählt die achte Dramaturgie: eine
// RECHNUNG. Die Abschnitte sind die Schritte einer Aufgabe — die Aufgabe,
// die erste Größe, die zweite Größe, die Summe, die Probe, der Rest, der
// nicht aufgeht, die Gegenrechnung. Die zweite Stimme kann dieselbe Rechnung
// von der anderen Seite aufmachen.
//
// Die Texte liegen als Zeilen-Arrays mit `.join('\n')` — so bleiben sie im
// Repo bei ~72 Zeichen lesbar (der Betreiber liest sie hier gegen), und
// utils/markdown.js macht in der App wieder fließenden Text daraus.
//
// CommonJS ohne UI-Importe (Architektur-Regel): mit blankem `node` prüfbar.

const { karte } = require('./karten/harvey');

/**
 * Die Stimme des Harvey — der rechnende Arzt.
 *
 * Verfasst von Opus (Runde 9). Sie erzählt von innen: warum er zu zählen
 * begann, warum er am Lebenden nachsah, warum das Herz eine Pumpe sein muss
 * und was seine Rechnung offenließ. Die unbequemen Stellen benennt sie
 * selbst, statt sie der Gegenstimme zu überlassen.
 */
const stimmeDesHarvey = [
  '## Die Aufgabe',
  '',
  'Mein Name ist **William Harvey**, geboren 1578 in Folkestone in Kent,',
  'als ältester von sieben Söhnen eines Kaufmanns. Ich war Arzt am',
  'St.-Bartholomäus-Hospital in London und später Leibarzt zweier Könige.',
  'Und gleich vorweg, damit Du weißt, woran Du bist: **Was Du hier hörst,',
  'ist meine Sicht — eine Denkart, keine Wahrheit.** Ich habe geirrt, und',
  'ich werde sagen, wo.',
  '',
  'Als ich zu studieren begann, war seit fünfzehnhundert Jahren geregelt,',
  'was mit dem Blut geschieht. **Galen** hatte es aufgeschrieben, und es',
  'klang vernünftig: Aus der Nahrung wird in der Leber Blut. Von dort',
  'fließt es durch die Adern in den Leib hinaus und wird dort',
  'aufgebraucht — wie Wasser, das ein Acker aufnimmt. Ein Teil sickert',
  'durch feine Poren in der Scheidewand des Herzens von der rechten in',
  'die linke Kammer und wird dort mit Lebensgeist versetzt. Das Blut',
  'ebbt und flutet, hin und her, und wird ständig neu gemacht.',
  '',
  '**Diese Lehre war nicht dumm.** Sie erklärte, warum man essen muss,',
  'warum man an einer Wunde verblutet, warum ein Aderlass entlastet und',
  'warum das Blut in den Adern anders aussieht als in den Schlagadern.',
  'Sie hatte auf jede Frage eine Antwort. Man muss das aussprechen,',
  'bevor man sie umwirft.',
  '',
  'Ich habe nicht gefragt, ob sie stimmt. **Ich habe gefragt: wie viel?**',
  'Das ist der ganze Unterschied. Eine Meinung kann man mit einer Meinung',
  'beantworten; eine Menge nicht. **Warum rechnen und nicht streiten?**',
  'Weil eine Zahl sich nicht überreden lässt. Sie hat keinen Lehrstuhl zu',
  'verlieren und keinen Ruf zu verteidigen. Wer die Menge kennt, muss',
  'nicht mehr fragen, wer recht hat.',
  '',
  '## Die erste Größe: was ein Schlag auswirft',
  '',
  'Öffne einen toten Leib und sieh Dir die linke Herzkammer an. Sie fasst',
  'eine Menge, die man messen kann — zwei Unzen, oft mehr. Bei jedem',
  'Schlag wirft sie einen Teil davon in die große Schlagader.',
  '',
  'Wie viel genau, wusste ich nicht. Also habe ich absichtlich zu niedrig',
  'gerechnet: nur ein Achtel, nur ein Sechstel, nur eine halbe Drachme —',
  'die kleinste Menge, die mir mein schärfster Gegner noch zugestehen',
  'würde. **Wer etwas beweisen will, nimmt die Zahl, die der Gegenseite',
  'am liebsten ist.** Geht die Rechnung schon damit nicht auf, ist sie',
  'erledigt.',
  '',
  'Heute lässt sich das genauer sagen: Ein erwachsenes Herz wirft bei',
  'jedem Schlag etwa siebzig Milliliter aus — ein knappes Weinglas.',
  '',
  '## Die zweite Größe: wie oft das Herz schlägt',
  '',
  'Die zweite Zahl trägt jeder bei sich. Leg zwei Finger an Dein',
  'Handgelenk und zähle: etwa siebzig Schläge in der Minute. Das sind',
  'über tausend in einer halben Stunde und mehr als **hunderttausend an',
  'einem Tag**. Kein Mensch hatte das je zu Ende gedacht.',
  '',
  '**Warum am Lebenden nachsehen und nicht am Toten?** Weil ein toter',
  'Leib das Wichtigste nicht zeigt: die Bewegung. Auf dem Seziertisch',
  'liegt ein stilles Stück Fleisch. Ich musste sehen, was ein Herz tut,',
  'während es tut.',
  '',
  'Also habe ich geöffnet, was ich bekommen konnte: Aale, Fische,',
  'Schnecken, Krebse, Frösche, Tauben, Hunde — und das Wild aus den',
  'königlichen Parks, zu dem mir mein Amt den Zugang gab. Warmblütige',
  'Tiere haben ein zu schnelles Herz; das Auge kommt nicht mit. Bei',
  'kalten Tieren aber schlägt es langsam, und bei einem sterbenden Tier',
  'wird es langsamer und langsamer, bis man endlich die Reihenfolge',
  'sieht.',
  '',
  'Und die Reihenfolge war eine andere als gelehrt. Man sagte, das Herz',
  'dehne sich und **sauge** das Blut an. Ich sah: Die Tat ist das',
  '**Zusammenziehen**. Das Herz wird hart, kurz und blass, es presst —',
  'und das Erschlaffen danach ist nur die Pause. Ein Muskel, ein',
  'Beutel, der zudrückt.',
  '',
  'Das gehört zur Wahrheit dieses Kapitels: **Ich habe Tiere bei',
  'lebendigem Leibe geöffnet, viele hundert.** Ich schreibe das nicht',
  'als Nebensatz. Wer meine Zahlen benutzt, benutzt sie.',
  '',
  '## Die Summe: mehr, als der ganze Leib enthält',
  '',
  'Jetzt nimm die beiden Größen zusammen — mehr braucht es nicht.',
  '',
  'Selbst mit meiner absichtlich winzigen Menge kommt in einer halben',
  'Stunde mehr Blut aus dem Herzen, als im ganzen Menschen ist. Rechnet',
  'man mit den heutigen Werten, wird es unwiderleglich: siebzig',
  'Milliliter, siebzig Mal in der Minute — das sind fast **fünf Liter in',
  'der Minute und rund zweihundertfünfzig bis dreihundert Liter in einer',
  'Stunde**. Im ganzen Leib eines Erwachsenen sind fünf bis sechs Liter.',
  '',
  'Damit hat die alte Lehre zwei Aufgaben, die sie nicht lösen kann.',
  '**Die Leber müsste aus dem Essen eines Tages hunderte Liter Blut',
  'machen** — mehr, als ein Mensch überhaupt zu sich nimmt. Und das',
  'Fleisch müsste dieselbe Menge wieder aufbrauchen, ohne dass jemand',
  'sähe, wohin sie geht.',
  '',
  'Es bleibt nur eine Erklärung, und sie ist einfach: **Es ist immer',
  'dasselbe Blut. Es läuft im Kreis** — aus dem Herzen durch die',
  'Schlagadern in den Leib, aus dem Leib durch die Adern zurück ins',
  'Herz, durch die Lunge hindurch und wieder von vorn.',
  '',
  '**Warum dann das Herz als Pumpe?** Weil ich nichts anderes',
  'übriglasse. Ein Sack, der sich zusammenzieht; Klappen, die nur in',
  'eine Richtung öffnen; ein Druck, der eine durchtrennte Schlagader im',
  'Strahl spritzen lässt. Jeder Handwerker, der eine Feuerspritze kennt,',
  'versteht das sofort — und deshalb war es zu verstehen, ohne Latein.',
  '',
  'Ehrlichkeitshalber: **Diesen Vergleich haben erst meine Nachfolger',
  'daraus gemacht.** Ich selbst nannte das Herz den Fürsten des Leibes',
  'und die Sonne des kleinen Weltalls. Ich war ein Schüler des',
  'Aristoteles und kein Mechaniker. Dass aus meiner Rechnung eine',
  'Maschine wurde, ist die Wirkung meines Buches, nicht meine Absicht.',
  '',
  '## Die Probe: ein Band um den Arm',
  '',
  'Eine Rechnung überzeugt den Kopf. Ich brauchte etwas für die Augen —',
  'und zwar etwas, das jeder an sich selbst wiederholen kann. Binde',
  'einen Arm ab, wie es der Bader vor dem Aderlass tut.',
  '',
  'Was ich dabei benutze, habe ich als Student gelernt. Von 1599 bis 1602',
  'studierte ich in **Padua**, der freiesten Universität Europas, wo seit',
  '1594 ein festes Anatomietheater stand.',
  '',
  'Zieh das Band **fest**: Die Hand wird blass und kalt, und unterhalb',
  'des Bandes ist kein Puls mehr. Also kommt das Blut von oben, durch',
  'die Schlagadern, die tief liegen.',
  '',
  'Nun **löse es ein wenig**: Die Hand läuft rot an, und die Adern',
  'darunter treten hervor wie Stränge — mit Knoten darin, in',
  'regelmäßigen Abständen. Diese Knoten sind die **Klappen**. Mein Lehrer',
  'in Padua, Hieronymus Fabricius, hatte sie beschrieben und für Bremsen',
  'gehalten, die verhindern, dass sich das Blut in Armen und Beinen',
  'staut. **Er hat sie gesehen; ich habe sie gelesen.**',
  '',
  'Denn jetzt kommt der entscheidende Griff: Drück eine gefüllte Ader',
  'mit dem Finger zu und streiche das Blut mit dem anderen Finger zum',
  'Herzen hin weg. Das Stück bleibt leer. Es füllt sich **nicht** von',
  'oben nach — erst wenn Du loslässt, schießt es von unten wieder voll.',
  '',
  'Damit ist es entschieden, und zwar ohne ein einziges Zitat: **In den',
  'Adern fließt das Blut nur in eine Richtung — zum Herzen hin.** Hinaus',
  'durch die Schlagadern, zurück durch die Adern. Das ist der Kreis.',
  '',
  '## Der Rest, der nicht aufgeht',
  '',
  'Und nun das Stück, das ich schuldig geblieben bin.',
  '',
  '**Wie das Blut von den Schlagadern in die Adern kommt, konnte ich',
  'nicht zeigen.** Ich schrieb von Poren im Fleisch und von einem',
  'Durchsickern und wusste, dass das keine Antwort ist. Mir fehlte das',
  'Mikroskop. Erst 1661 richtete Marcello Malpighi in Bologna eine Linse',
  'auf die Lunge eines Frosches und sah das Netz feinster Gefäße, das',
  'beide verbindet — die Kapillaren. Da war ich vier Jahre tot. **Die',
  'letzte Stelle meines Beweises hat ein anderer geschlossen.**',
  '',
  '**Wozu das Ganze gut ist, wusste ich nicht.** Ich hielt an dem alten',
  'Gedanken fest, die Lunge kühle das erhitzte Blut. Von der Luft, die',
  'darin aufgenommen wird, ahnte ich nichts; das kam erst mit den',
  'Chemikern, lange nach mir. Ich habe die Bewegung erklärt und nicht',
  'ihren Zweck.',
  '',
  'Und das Unbequemste: **Mein Kreislauf hat keinen einzigen Kranken',
  'geheilt.** Man ließ weiter zur Ader wie zuvor — ich selbst auch. Die',
  'ersten Versuche, aus der Einsicht etwas zu machen, gingen schlecht',
  'aus: Nach mir spritzte man Kranken Mittel in die Adern und übertrug',
  'Blut von Tieren auf Menschen; Menschen starben daran, und die',
  'Übertragung wurde für hundert Jahre verboten. **Zwischen meiner',
  'Rechnung und dem ersten Kranken, dem sie half, liegen zweihundert',
  'Jahre.**',
  '',
  '## Die Gegenrechnung',
  '',
  'Ausgesprochen habe ich das alles zum ersten Mal im **April 1616**, in',
  'meiner Vorlesung vor dem College of Physicians in London — meine',
  'Notizen dazu liegen bis heute in einer engen lateinischen Handschrift',
  'vor. Dann habe ich zwölf Jahre gewartet, weiter seziert und weiter',
  'gerechnet. **1628** ließ ich mein Buch drucken, in Frankfurt am Main,',
  'weil dort die Buchmesse war und ein Werk von dort in ganz Europa',
  'ankam: zweiundsiebzig Seiten auf schlechtem Papier, voller Setzfehler.',
  'Was ich erntete, war Widerspruch.',
  '',
  'Schon 1630 schrieb ein Londoner Kollege dagegen an. Caspar Hofmann in',
  'Nürnberg sah meiner Vorführung zu, gab zu, dass er es sehe, und',
  'erklärte mir trotzdem, ich hätte die Natur einer Unklugheit',
  'beschuldigt: Wozu solle sie so eine Umständlichkeit einrichten? In',
  'Paris ließ Jean Riolan der Jüngere 1648 nur einen kleinen Teil des',
  'Blutes kreisen und behielt den Rest bei Galen.',
  '',
  '**Warum haben sie sich so lange gewehrt?** Nicht aus Dummheit. Ich',
  'verlangte etwas Unverschämtes: einer Rechnung mehr zu glauben als',
  'einem Gebäude, das alles erklärte — die Ernährung, den Aderlass, die',
  'Diät, die ganze Ordnung des Leibes. Und mein bester Beweis lag in',
  'einem geöffneten, noch schlagenden Tier. **Wer nie ein Herz hat',
  'schlagen sehen, dem mutete ich zu, mir mehr zu glauben als seinen',
  'Lehrern.** An ihrer Stelle wäre ich auch vorsichtig gewesen.',
  '',
  'Bezahlt habe ich es auch. Nach dem Buch verlor ich einen Teil meiner',
  'Kranken; es hieß, ich sei wunderlich im Kopf geworden. Im Bürgerkrieg',
  'wurden meine Zimmer geplündert und meine Aufzeichnungen vernichtet.',
  '',
  'Und ich selbst? **Ich habe nicht gekämpft.** Ich habe geantwortet, wo',
  'ich musste, sonst geschwiegen, das Lehramt abgegeben und mich der',
  'Frage zugewandt, wie Lebendiges entsteht. Ich war nicht der Mann für',
  'den Streit; ich war der Mann für die Zahl. Dass sich der Kreislauf',
  'durchsetzte, hat weniger mit meiner Hartnäckigkeit zu tun als damit,',
  'dass jeder die Probe am eigenen Arm wiederholen konnte.',
  '',
  '## Was die Rechnung nicht entscheidet',
  '',
  'Eines bleibt offen, und ich bin der Falsche, um es zu beantworten,',
  'weil ich auf einer Seite stand.',
  '',
  'Die Lehre, die ich umgeworfen habe, hat fünfzehnhundert Jahre',
  'getragen. Sie war falsch und trotzdem brauchbar: Ärzte haben mit ihr',
  'gearbeitet, geholfen, getröstet. Warum hält sich eine falsche Lehre',
  'so lange — und warum braucht eine richtige Jahrzehnte, bis sie',
  'durchdringt? Was von beidem war Trägheit, was Vorsicht, was Angst?',
  '',
  '**Die zweite Stimme dieses Kapitels gehört der anderen Seite: der',
  'Tradition**, die widersprach — der galenischen Lehre, ihren Gründen',
  'und ihrem Beharren. Sie soll dieselbe Rechnung von hinten aufmachen.',
].join('\n');

/**
 * Die Tradition — die galenische Lehre, die 1500 Jahre gehalten hatte.
 * Die Gegenrechnung: Warum die Welt den Kreislauf nicht sehen wollte —
 * und warum die alte Rechnung so lange überzeugte.
 *
 * Verfasst von Hermes (Runde 9, zweiter Pass). Auch diese Stimme benennt
 * die unbequemen Stellen der eigenen Seite selbst (Zusatzregel für
 * sensible Themen).
 */
const stimmeDerTradition = [
  '## Die Gegenrechnung der Alten',
  '',
  'Der Mann aus London hat gerechnet und gemeint, damit sei die Sache',
  'entschieden. Nun rechnen wir zurück — nicht aus Sturheit, sondern',
  'weil unsere Rechnung anderthalb Jahrtausende lang stimmig war und',
  'seine es nicht ganz ist. Hört die Rechnung, die wir erbten:',
  '',
  'Das Blut entsteht in der Leber, aus der verdauten Nahrung. Es fließt',
  'durch die Adern zu den Organen, nährt sie und wird dort verbraucht —',
  'wie Wasser, das auf die Felder geleitet und vom Boden aufgesogen',
  'wird. Ein kleiner Teil geht ins Herz und wird dort erwärmt, ein',
  'Teil in die Lunge und wird dort gekühlt. Das ist keine dumme',
  'Lehre: Sie erklärt, warum die Leber bei Kranken so oft schmerzt,',
  'warum das Blut bei der Aderlass dunkel und dick ist, warum der',
  'Mensch nach dem Essen schläfrig wird. Sie erklärt, was man sieht —',
  'und was man sieht, ist das Blut in den Adern, das zur Hand',
  'hinfließt, wenn man sie aufschneidet. Von einem Kreislauf sieht',
  'man nichts.',
  '',
  '## Die zweite Rechnung: was gegen Harvey sprach',
  '',
  'Und nun die Einwände gegen den Herrn aus London — ernsthaft',
  'vorgetragen, denn auch er hat Lücken.',
  '',
  '**Erstens: Er hat den Kreis nicht geschlossen.** Der Mann behauptet,',
  'das Blut kreise. Aber wo ist der Weg zurück? Er zeigt die Adern,',
  'er zeigt die Schlagadern — aber die feinen Verbindungen zwischen',
  'ihnen kann er nicht zeigen, weil er kein Gerät hat, das sie sichtbar',
  'machte. Ein Kreislauf ohne Verbindung ist eine Behauptung. Wir',
  'haben gefragt: Wo schließt sich der Kreis? Und er konnte es nicht',
  'sagen. Erst 1661, Jahre nach seinem Tod, wird ein Italiener mit',
  'einem Vergrößerungsglas die Kapillaren finden und den Kreis',
  'schließen. Aber 1628 war der Kreis offen — und wir hatten recht,',
  'das zu bemerken.',
  '',
  '**Zweitens: Wer hat je ein Herz schlagen sehen?** Die meisten Ärzte',
  'seines Jahrhunderts haben nie ein lebendes Herz in der Brust',
  'gesehen. Harveys Beweis verlangte, dass man Hirsche und Hunde',
  'öffnete und zusah — wer tat das schon? Seine Zahl von zweihundert-',
  'vierzig Litern in der Stunde konnte niemand nachprüfen, der nicht',
  'selbst gerechnet hatte. Eine Rechnung, die man nicht nachvollziehen',
  'kann, wirkt wie eine Behauptung.',
  '',
  '**Drittens: Die Autorität war nicht nur Starrsinn.** Galen hatte',
  'anderthalb Jahrtausende lang die Grundlage jeder ärztlichen',
  'Ausbildung geliefert. Ihn zu verwerfen hieß, das Fundament',
  'einzureißen, auf dem die Studenten standen. Wer das verlangte,',
  'musste mehr bieten als eine Zahl — er musste ein neues Gebäude',
  'bauen. Harvey hat es gebaut, aber die Welt brauchte Zeit, um',
  'einzuziehen.',
  '',
  '## Die dritte Rechnung: was die Tradition selbst wusste',
  '',
  'Jetzt die Stellen, an denen wir selbst leiser werden müssen — denn',
  'auch unsere Rechnung hat ihre Fehler.',
  '',
  '**Erstens: Wir haben aufgehört zu fragen.** Das ist der schwerste',
  'Vorwurf, und er trifft. Galen hatte gefragt, und seine Antwort war',
  'gut für seine Zeit. Aber wir haben seine Antwort anderthalb',
  'Jahrtausende lang wiederholt, ohne neu zu fragen. Eine Lehre, die',
  'niemand mehr prüft, wird zur Mauer. Der Mann aus London hat',
  'gefragt — und genau das war sein Verbrechen und sein Verdienst.',
  '',
  '**Zweitens: Wir haben den Körper für einfacher gehalten, als er',
  'ist.** Unsere Rechnung kannte das Hin und Her, nicht den Kreis. Wir',
  'haben gesehen, dass das Blut fließt, aber nicht, wohin. Die',
  'Wahrheit war komplizierter, als unsere Ordnung zuließ — und wir',
  'haben die Ordnung verteidigt statt die Wahrheit zu suchen.',
  '',
  '## Das Urteil der Zeit',
  '',
  'Der Rechner aus London hat am Ende gefragt, was seine Rechnung',
  'nicht entscheidet. Unsere Antwort als die Stimme, die widerstand:',
  'Sie entscheidet nicht über den Wert des Alten, sondern darüber,',
  'dass man prüfen muss. Seine Rechnung hat gewonnen — nicht weil er',
  'lauter rief, sondern weil sie stimmte und weil das Vergrößerungsglas',
  'kam und den Kreis schloss, den er offen gelassen hatte. Wir haben',
  'verloren — nicht weil unsere Rechnung dumm war, sondern weil wir',
  'sie für fertig hielten. Das ist die Lektion, die jede Denkart vor',
  'diesem Buch lernen muss: Eine Rechnung ist nie fertig. Sie ist nur',
  'vorläufig richtig — bis jemand nachzählt.',
].join('\n');

/** Kapitel 8 der Themenlandkarte. */
const harvey = {
  id: 'harvey',
  titel: 'Harvey und der Blutkreislauf',
  epoche: '1578–1657',

  aufhaenger: {
    frage:
      'Wie weist man etwas nach, das niemand sehen kann — mit einem Messer, ' +
      'einem Zählen und einer Rechnung?',
    text: [
      'Fünfzehnhundert Jahre lang war die Sache klar: Das Blut entsteht in',
      'der Leber, fließt durch die Adern in den Leib und wird dort',
      'aufgebraucht. Immer neues Blut, immer wieder verbraucht. Die Lehre',
      'stammte von Galen, sie erklärte alles, und niemand rechnete nach.',
      '',
      'Dann stellte ein englischer Arzt eine Frage, die vor ihm keiner',
      'gestellt hatte — nicht „stimmt das?", sondern „wie viel?". Das Herz',
      'schlägt über hunderttausend Mal am Tag und wirft bei jedem Schlag ein',
      'knappes Weinglas aus. Das sind hunderte Liter in einem Tag. So viel',
      'kann keine Leber herstellen und kein Fleisch verbrauchen.',
      '',
      'Es bleibt nur eine Erklärung: Es ist immer dasselbe Blut — es kreist.',
      'William Harvey rechnete es vor, zeigte es an einem abgebundenen Arm',
      'und ließ es 1628 in Frankfurt drucken, auf zweiundsiebzig Seiten. Es',
      'dauerte Jahrzehnte, bis die Welt es glaubte — und eine Stelle seines',
      'Beweises konnte er selbst nie zeigen.',
    ].join('\n'),
  },

  karte,

  perspektiven: [
    {
      id: 'harvey',
      name: 'Die Stimme des Harvey',
      stimme: 'Opus',
      text: stimmeDesHarvey,
    },
    {
      id: 'tradition',
      name: 'Die Stimme der Tradition',
      stimme: 'Hermes',
      text: stimmeDerTradition,
    },
  ],

  synthese: [
    '## Wo sich beide Stimmen treffen',
    '',
    'Zuerst das Gemeinsame. Beide Stimmen rechnen — und beide geben zu,',
    'dass ihre Rechnung Lücken hat. Harvey räumt ein, dass er den Kreis',
    'nicht schließen kann: Die feinen Verbindungen zwischen Adern und',
    'Schlagadern hat niemand gesehen. Die Tradition räumt ein, dass sie',
    'anderthalb Jahrtausende lang aufgehört hat zu fragen. Beide',
    'anerkennen die Erfahrung: Harvey zeigt es am abgebundenen Arm, die',
    'Tradition beruft sich auf das, was jeder Arzt sieht. Und beide',
    'wissen, dass die Wahrheit komplizierter ist als die Ordnung, die',
    'sie sich zurechtgelegt haben.',
    '',
    '## Wo sie auseinandergehen',
    '',
    'Der Widerspruch beginnt bei der Frage, was als Beweis gilt. Für',
    'Harvey ist es die Zahl: Wenn die Rechnung nicht aufgeht, muss die',
    'Lehre falsch sein — die Menge des Blutes zwingt den Kreislauf. Für',
    'die Tradition ist es die sichtbare Erfahrung: Was man nicht sehen',
    'kann, ist nicht bewiesen — und ein Kreislauf ohne sichtbare',
    'Verbindung bleibt eine Behauptung. Sie streiten also nicht über',
    'einzelne Tatsachen, sondern über die Art des Beweises: Zählen oder',
    'Sehen? Und daraus folgt der zweite Streit: über die Zeit. Harvey',
    'will, dass die Wahrheit sofort gilt; die Tradition will, dass das',
    'Bewährte erst widerlegt werden muss, bevor man es verlässt. Beide',
    'haben ein Stück recht — und genau das macht die Geschichte so',
    'menschlich.',
    '',
    '## Was dieses Kapitel für das ganze Buch zeigt',
    '',
    'Zum neunten Mal dasselbe Muster — und jetzt schließt sich ein',
    'Bogen: Die Denkart bestimmt die Methode. Am Anfang standen das Lot,',
    'die Kanäle, das Qi, die Doshas, die Säfte — Denkarten vom',
    'Gleichgewicht. Dann kamen die Denkarten des Bruchs: Paracelsus und',
    'Vesal lehrten die Erfahrung, Harvey lehrt die Zahl. Damit ist das',
    'Fundament gelegt, auf dem die moderne Medizin steht: nicht mehr',
    'die Autorität, sondern die Messung.',
    '',
    'Und dieses Kapitel zeigt etwas Neues: den Preis des Fortschritts.',
    'Harveys Rechnung war richtig — aber sie brauchte Jahrzehnte, ein',
    'Vergrößerungsglas und den Mut, das Bewährte zu verlassen. Die',
    'Tradition war nicht dumm; sie war nur langsam. Wer die Geschichte',
    'der Medizin als Siegeszug der Vernünftigen erzählt, übersieht,',
    'dass jede neue Wahrheit erst gegen die alte kämpfen muss — und',
    'dass der Zweifel, den die Tradition pflegte, selbst ein Teil der',
    'Wissenschaft ist. Die nächsten Kapitel werden zeigen, was aus',
    'dieser Spannung wird: Die Medizin hat jetzt die Denkart des',
    'Messens — aber sie hat noch kein Messgerät, das die Krankheit',
    'zeigt, und keine Hand, die sie heilt. Es wird grausam werden,',
    'bevor es sauber wird.',
  ].join('\n'),

  urteil: {
    frage:
      'Was überzeugt dich mehr — eine Rechnung, die niemand widerlegen kann, ' +
      'oder ein Anblick, den jeder versteht?',
    hinweis: [
      'Es gibt hier kein Richtig und kein Falsch. Denk daran, dass Harvey',
      'beides gebraucht hat: Die Zahlen zwangen den Verstand, aber',
      'überzeugt hat am Ende das Band um den Arm, weil es jeder an sich',
      'selbst wiederholen konnte. Denk auch daran, wie es dir heute geht:',
      'Wenn dir eine Studie eine Zahl nennt, die deiner Erfahrung',
      'widerspricht — wem gibst du recht? Und wenn du etwas mit eigenen',
      'Augen siehst, was keine Statistik bestätigt: Wie viel ist dir das',
      'wert? Beide Wege haben schon in die Irre geführt, und beide haben',
      'schon recht behalten.',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'Womit begründete Harvey, dass das Blut kreisen muss?',
      antworten: [
        'Mit der Menge: Das Herz wirft mehr Blut aus, als der Körper ' +
          'herstellen oder verbrauchen könnte.',
        'Mit dem Mikroskop, unter dem er die feinen Gefäße sah.',
        'Mit einer neuen Auslegung der Schriften Galens.',
      ],
      richtig: 0,
      erklaerung:
        'Harvey rechnete: Die Herzkammer wirft bei jedem Schlag eine ' +
        'messbare Menge aus, das Herz schlägt über hunderttausend Mal am ' +
        'Tag. Selbst mit absichtlich zu niedrig angesetzten Werten kommt in ' +
        'einer halben Stunde mehr Blut aus dem Herzen, als im ganzen ' +
        'Menschen ist. Da die Leber das nicht herstellen und der Körper es ' +
        'nicht verbrauchen kann, muss es immer dasselbe Blut sein.',
    },
    {
      frage: 'Wo erschien 1628 Harveys Buch „De motu cordis"?',
      antworten: [
        'In London, am Hof des Königs.',
        'In Padua, wo er studiert hatte.',
        'In Frankfurt am Main, wegen der Buchmesse.',
      ],
      richtig: 2,
      erklaerung:
        'Die zweiundsiebzig Seiten wurden bei Wilhelm Fitzer in Frankfurt ' +
        'gedruckt — auf schlechtem Papier und mit vielen Setzfehlern. Der ' +
        'Umweg hatte einen Grund: Über die Frankfurter Buchmesse erreichte ' +
        'ein Werk in wenigen Monaten Paris, Leiden, Venedig und Basel. ' +
        'Harvey wollte gelesen werden, auch von seinen Gegnern.',
    },
    {
      frage: 'Was zeigen die Klappen in den Venen?',
      antworten: [
        'Dass sich das Blut in Armen und Beinen staut.',
        'Dass das Blut in den Venen nur in eine Richtung fließt: zum Herzen.',
        'Dass die Venen dünner sind als die Schlagadern.',
      ],
      richtig: 1,
      erklaerung:
        'Harveys Lehrer Hieronymus Fabricius hatte die Klappen in Padua ' +
        'beschrieben und für Bremsen gegen das Stauen des Blutes gehalten. ' +
        'Harvey drehte die Deutung um: Streicht man eine abgebundene Vene ' +
        'zum Herzen hin leer, füllt sie sich nicht von oben nach, sondern ' +
        'nur von unten. Das Blut kann die Klappen nur in eine Richtung ' +
        'passieren — zum Herzen hin.',
    },
    {
      frage: 'Welche Stelle seines Beweises konnte Harvey nicht zeigen?',
      antworten: [
        'Dass das Herz sich zusammenzieht.',
        'Dass in den Venen Klappen sitzen.',
        'Wie das Blut von den Schlagadern in die Venen übertritt.',
      ],
      richtig: 2,
      erklaerung:
        'Die Verbindung zwischen Arterien und Venen blieb offen — Harvey ' +
        'fehlte das Mikroskop und er sprach vage von Poren im Fleisch. ' +
        'Erst 1661 sah Marcello Malpighi in Bologna unter der Linse die ' +
        'feinsten Gefäße in der Lunge eines Frosches: die Kapillaren. ' +
        'Harvey war da seit vier Jahren tot.',
    },
    {
      frage: 'Wo studierte Harvey Medizin?',
      antworten: [
        'In Paris, an der berühmtesten Fakultät Frankreichs.',
        'In Padua, bei Hieronymus Fabricius.',
        'In Basel, wo Vesals Anatomiewerk gedruckt worden war.',
      ],
      richtig: 1,
      erklaerung:
        'Nach sechs Jahren in Cambridge ging Harvey 1599 nach Padua — die ' +
        'freieste Universität Europas, seit 1594 mit einem festen ' +
        'Anatomietheater. Dort lehrte Hieronymus Fabricius, der die ' +
        'Venenklappen beschrieben hatte. 1602 kehrte Harvey als Doktor der ' +
        'Medizin nach England zurück.',
    },
  ],
};

module.exports = harvey;
