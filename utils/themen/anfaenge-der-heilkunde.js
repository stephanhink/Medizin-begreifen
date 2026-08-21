// Kapitel 1 — „Die Anfänge der Heilkunde".
//
// Schamanen, Kräuterkundige und die sogenannten „primitiven" Völker. Der
// Begriff steht im ganzen Kapitel in Anführungszeichen: Er ist eine
// Zuschreibung von außen, aus dem kolonialen Europa des 19. Jahrhunderts —
// keine Selbstbezeichnung und kein Befund (TONE-Regel in CLAUDE.md).
//
// Stand der Runde 1: Die ERSTE Perspektive (die Stimme der Heilerin)
// verfasste Opus; die ZWEITE (die Stimme der Abwertung und Wiederentdeckung)
// und die finale Synthese ergänzte Hermes im zweiten Pass. Perspektiven-
// Workflow: CLAUDE.md.
//
// Die Texte liegen als Zeilen-Arrays mit `.join('\n')` — so bleiben sie im
// Repo bei ~72 Zeichen lesbar (der Betreiber liest sie hier gegen), und
// utils/markdown.js macht in der App wieder fließenden Text daraus.
//
// CommonJS ohne UI-Importe (Architektur-Regel): mit blankem `node` prüfbar.

const { karte } = require('./karten/anfaenge-der-heilkunde');

/**
 * Die Stimme der Heilerin — die frühe Heilkunst von innen.
 *
 * Verfasst von Opus (Runde 1). Sie erzählt, wie das Wissen wuchs, welches
 * Weltbild dahinterstand, warum die Menschen taten, was sie taten — und was
 * es bewirkte. Die unbequemen Stellen benennt sie selbst, statt sie der
 * Gegenstimme zu überlassen (Zusatzregel für sensible Themen).
 */
const stimmeDerHeilerin = [
  '## Wer hier spricht',
  '',
  'Diese Seite erzählt die frühe Heilkunde von innen — aus der Sicht',
  'derer, die sie ausübten: der Kräuterkundigen, der Schamaninnen und',
  'Schamanen, der Frauen und Männer, zu denen man ging, wenn das Fieber',
  'nicht wich. Es ist eine Erzählung, keine Abschrift der Wirklichkeit.',
  'Niemand von ihnen hat aufgeschrieben, was er dachte. Was wir zu wissen',
  'glauben, schließen wir aus Gräbern, Knochen, Werkzeugen und',
  'Pflanzenresten — und aus dem, was Heilerinnen und Heiler lebender',
  'Völker bis heute erzählen. Vieles davon ist gut begründet. Sicher ist',
  'es nicht.',
  '',
  '## Wie das Wissen wuchs',
  '',
  'Es begann nicht mit einer Erfindung, sondern mit einer Not: Jemand hat',
  'Schmerzen, jemand blutet, jemand glüht. Und es begann mit einer',
  'Beobachtung — jener Sorte, für die man Zeit braucht und ein gutes',
  'Gedächtnis. Diese Wurzel schmeckt bitter und stillt den Durchfall.',
  'Diese Rinde nimmt das Fieber. Von jener Beere wird man krank, aber ein',
  'Fingerhut voll bringt den Kranken zum Schwitzen. Wer das einmal',
  'bemerkte, erzählte es weiter.',
  '',
  'Das ist die eigentliche Leistung: **das Weitergeben**. Ein Menschenleben',
  'reicht nicht, um hundert Pflanzen zu prüfen. Aber zehn Leben reichen,',
  'und hundert erst recht. Wissen, das über Generationen von der Alten an',
  'die Enkelin ging, von der Heilerin an ihre Schülerin, ist geprüftes',
  'Wissen — geprüft nicht im Labor, sondern an Menschen, über sehr lange',
  'Zeit. Man nennt das **Erfahrungsmedizin**. Sie sammelt, was hilft, und',
  'vergisst, was nicht hilft. Langsam, ungenau, aber unerbittlich.',
  '',
  'Dazu kam das Abschauen. Die Tiere fressen Pflanzen, wenn ihnen schlecht',
  'ist. Wunden heilen besser, wenn man sie auswäscht. Ein gebrochener Arm',
  'wächst gerade zusammen, wenn man ihn zwischen zwei Hölzer bindet. Nichts',
  'davon musste jemand erklären können, um es zu tun.',
  '',
  '## Woran wir glaubten — die Denkart hinter der Heilkunst',
  '',
  'Um zu verstehen, warum die Heilerin tat, was sie tat, muss man ihr',
  'Weltbild kennen. Es ist ein anderes als unseres, aber es ist keines',
  'ohne Ordnung.',
  '',
  '**Erstens: Der Mensch steht nicht für sich.** Er gehört zur Sippe, zum',
  'Land, zu den Toten, zu den Kräften, die Wetter und Jagdglück machen.',
  'Gesundheit ist der Zustand, in dem alles miteinander im Lot ist.',
  'Krankheit ist eine **Störung** dieses Lots — nicht bloß ein Defekt im',
  'Körper, sondern ein Riss im Gefüge.',
  '',
  '**Zweitens: Nichts geschieht ohne Grund.** Die entscheidende Frage der',
  'frühen Heilkunde ist nicht „was hat er?", sondern „warum trifft es ihn,',
  'und warum jetzt?". Auf diese Frage antwortete das Weltbild der Zeit mit',
  'dem, was es hatte: mit einem Geist, der beleidigt wurde. Mit einer',
  'Regel, die jemand gebrochen hat. Mit etwas Fremdem, das in den Körper',
  'geraten ist — ein Pfeil, ein Wurm, ein böser Blick. Oder damit, dass',
  'ein Teil des Menschen fortgegangen ist und zurückgeholt werden muss.',
  '',
  '**Drittens: Heilen heißt, das Lot wiederherstellen.** Nicht „den Erreger',
  'töten" — den kannte niemand —, sondern die Ordnung zurückbringen. Alles',
  'Weitere folgt aus dieser einen Annahme.',
  '',
  '## Warum wir taten, was wir taten',
  '',
  'Aus dieser Denkart erklärt sich jedes Werkzeug der Heilerin. Sie tat',
  'nicht dreierlei — sie tat immer dasselbe, auf drei Wegen.',
  '',
  '- **Die Pflanze.** Sie greift den Körper an der Stelle an, wo er aus dem',
  '  Lot ist: Sie treibt aus, was zu viel ist, sie wärmt, was kalt ist, sie',
  '  löst den Krampf. Dass eine Rinde das Fieber senkt, brauchte keine',
  '  Theorie — es genügte, dass es geschah, und zwar wieder und wieder.',
  '- **Das Ritual.** Es behandelt den anderen Teil der Störung: den Riss',
  '  zwischen dem Kranken und seiner Welt. Der Gesang, der Rauch, die',
  '  Trommel, das Ausblasen des Fremden aus dem Leib — das war für die',
  '  Beteiligten keine Show, sondern die eigentliche Ursachenbehandlung.',
  '  Und die ganze Sippe saß dabei. Der Kranke war nicht allein.',
  '- **Die Hand.** Richten, schienen, ausbrennen, schneiden, nähen. Auch das',
  '  Messer diente derselben Sicht: Was nicht hineingehört, muss heraus.',
  '',
  'Für die Heilerin waren das keine getrennten Dinge, zwischen denen sie',
  'hätte wählen müssen. Kraut und Gesang gehörten zusammen wie bei uns',
  'Diagnose und Rezept. Wer nur das Kraut gab, hatte die halbe Arbeit',
  'getan.',
  '',
  '## Was es bewirkte',
  '',
  'Vieles davon hat gewirkt — messbar, bis heute nachvollziehbar.',
  '',
  '**Die Pflanzen.** Weidenrinde enthält den Stoff, aus dem später Aspirin',
  'wurde. Der Schlafmohn trug das Opium in sich, aus dem das Morphin kam —',
  'bis heute unser stärkstes Schmerzmittel. Die Chinarinde, seit',
  'Generationen Wissen der Menschen in den Anden, wurde zum Chinin gegen',
  'die Malaria. Aus dem Pfeilgift Kurare, mit dem indigene Jäger',
  'Südamerikas ihre Beute lähmten, wurde ein Mittel, das die moderne',
  'Chirurgie erst möglich machte. Und der Fingerhut, ein Hausmittel der',
  'englischen Volksmedizin, ist als Digitalis in die Herzmedizin',
  'eingegangen. Diese Stoffe hat kein Labor erfunden. Sie wurden gefunden —',
  'von Menschen ohne Mikroskop, mit nichts als Aufmerksamkeit und Zeit.',
  '',
  '**Die Chirurgie.** Der älteste Schädel Europas mit einer Trepanation,',
  'einer Öffnung der Schädeldecke, stammt aus Ensisheim im Elsass, etwa',
  '5100 v. Chr. Der Mann hatte zwei solcher Öffnungen — und die',
  'Knochenränder sind glatt verheilt. Er hat beide überlebt und danach noch',
  'jahrelang gelebt. In Peru fand man Hunderte solcher Schädel; bei einem',
  'großen Teil davon zeigt der Knochen dieselbe Heilung. Jemand öffnete',
  'einen lebenden Kopf mit Steinwerkzeug, und der Mensch stand wieder auf.',
  'Das setzt ruhige Hände voraus, eine Vorstellung davon, wo man schneiden',
  'darf, und eine Nachsorge, die die Wunde nicht vereitern ließ.',
  '',
  '**Die Pflege.** In der Höhle von Shanidar im Zagros-Gebirge lag ein',
  'Neandertaler mit verkümmertem Arm, zerschmettertem Gesicht und',
  'vermutlich blind auf einem Auge. Er lebte damit noch Jahre. Allein',
  'schafft das niemand. Und der Mann aus dem Eis, den wir Ötzi nennen,',
  'trug um 3300 v. Chr. Birkenporling bei sich, einen Baumpilz, an',
  'Lederriemen aufgefädelt — in seinem Darm steckten Peitschenwürmer.',
  'Seine 61 Tätowierungen liegen auffällig oft genau über abgenutzten',
  'Gelenken. Beweisen lässt sich daraus nichts, aber es ist eine gut',
  'begründete Vermutung: Er hatte etwas dabei, das ihm helfen sollte.',
  '',
  '**Und das, was schwerer zu fassen ist.** Zuwendung, Ruhe, Erwartung,',
  'die Gewissheit, dass sich jemand kümmert — das verändert, wie ein',
  'Mensch Schmerz erlebt und wie er gesundet. Die heutige Forschung nennt',
  'es Placebo-Wirkung und Zuwendungseffekt und findet es in ihren Studien',
  'immer wieder. Die Heilerin hat es nicht so genannt. Benutzt hat sie es',
  'jeden Tag.',
  '',
  '## Wo wir scheiterten',
  '',
  'Es wäre eine schlechte Erzählung, die das verschwiege. Diese Heilkunde',
  'hatte harte Grenzen, und sie kosteten Leben.',
  '',
  'Jedes zweite oder dritte Kind starb, bevor es erwachsen war. Frauen',
  'starben im Kindbett. Eine Wunde, die sich entzündete, ein durchbrochener',
  'Blinddarm, eine Lungenentzündung im Winter — dagegen war nichts',
  'auszurichten, gar nichts. Wer Bakterien nicht kennt, kann sie auch nicht',
  'meiden; dass Sauberkeit über Leben entscheidet, hat noch das 19.',
  'Jahrhundert erbittert bestritten.',
  '',
  'Auch das Weltbild selbst hatte einen Preis. Wenn Krankheit ein Riss im',
  'Gefüge ist, dann hat ihn womöglich jemand verursacht — und dann wird',
  'gesucht, wer. Aus der Frage „warum trifft es ihn?" ist über die',
  'Jahrtausende viel Unglück entstanden: Verdächtigungen, Ausstoßung,',
  'später die Verfolgung von Heilerinnen als „Hexen". Das gehört zu dieser',
  'Denkart dazu, auch wenn es unangenehm ist.',
  '',
  'Und die Mittel selbst waren riskant. Zwischen der Dosis, die hilft, und',
  'der, die tötet, liegt beim Fingerhut und beim Schlafmohn wenig. Manches,',
  'was über Generationen weitergegeben wurde, half nie und wurde trotzdem',
  'weitergegeben, weil die meisten Krankheiten von allein vergehen und die',
  'Erinnerung sich dann an das Mittel hängt. Nicht jedes alte Wissen ist',
  'gutes Wissen. Alt heißt nur alt.',
  '',
  '## Was aus diesem Wissen wurde',
  '',
  'Am Ende steht eine Frage, die diese Stimme nicht mehr beantworten kann.',
  'Was geschah mit dieser Heilkunde, als andere kamen, die anders dachten?',
  'Als Gelehrte in Europa im 19. Jahrhundert begannen, ganze Völker',
  '„primitiv" zu nennen — ein Wort, das sich niemand selbst gegeben hat —,',
  'und ihre Heilkunst gleich mit? Was ging dabei verloren, und was hat die',
  'moderne Medizin, ohne es immer zu sagen, aus genau diesen Händen',
  'übernommen?',
  '',
  'Darauf antwortet die zweite Stimme dieses Kapitels: die Sicht der',
  'Abwertung — und der späten Wiederentdeckung.',
].join('\n');

/**
 * Die Stimme der Abwertung und Wiederentdeckung — wie die spätere,
 * „moderne" Welt das frühe Heilwissen als „primitiv" abtat — und was sie
 * ihm heute verdankt.
 *
 * Verfasst von Hermes (Runde 1, zweiter Pass). Sie benennt die unbequemen
 * Stellen der eigenen Seite selbst: Die Abwertung war nicht nur böse
 * Absicht, und die heutige Bewunderung ist nicht nur Einsicht
 * (Zusatzregel für sensible Themen).
 */
const stimmeDerAbwertungUndWiederentdeckung = [
  '## Wer hier spricht',
  '',
  'Diese Stimme hat zwei Gesichter, und sie sagt das von Anfang an.',
  'Das erste Gesicht ist das Europa des 19. Jahrhunderts: Gelehrte,',
  'Missionare, Ärzte und Kolonialbeamte, die über die Welt schrieben, die',
  'sie gerade unterwarfen. Sie nannten ganze Völker „primitiv" — und ihre',
  'Heilkunde gleich mit. Das zweite Gesicht ist die heutige Forschung, die',
  'genau dieses Wissen wiederentdeckt und ernst nimmt. Es ist dieselbe',
  'Stimme, die erst abgewertet und dann gestaunt hat. Das gehört',
  'ehrlicherweise zusammen.',
  '',
  '## Wie das Wissen abgewertet wurde',
  '',
  'Die Abwertung begann nicht mit einem Urteil über einzelne Mittel,',
  'sondern mit einem Urteil über ganze Völker. Wer keine Schrift hatte, so',
  'dachte man, hatte auch kein Denken; wer in einem anderen Weltbild lebte,',
  'hatte auch kein Wissen. „Primitiv" war dabei kein Befund, sondern ein',
  'Rang — wer das Wort benutzte, stellte sich selbst an die Spitze.',
  '',
  'Die Folgen waren handfest. Heilpflanzenwissen, das über Jahrtausende',
  'gewachsen war, wurde nicht gesammelt, sondern verdrängt: die eigene',
  'Medizin der Kolonialherren sollte an ihre Stelle treten. Heilerinnen',
  'und Heiler verloren ihre Stellung, ihre Schulen, oft ihren Namen.',
  'Und wenn ein Mittel doch wirkte, wurde es genommen — ohne den Namen',
  'dessen, der es gefunden hatte. Die Chinarinde der Andenvölker wurde',
  'zum „Chinin der Europäer"; das Kurare der Jäger wurde „entdeckt", als',
  'ob es vorher nicht da gewesen wäre. Man hat das später Biopiraterie',
  'genannt: nehmen, ohne zu nennen, wem man es verdankt.',
  '',
  '## Die Denkart der Abwertung — warum taten sie das?',
  '',
  'Auch diese Denkart soll man verstehen, nicht nur verurteilen. Wer im',
  '19. Jahrhundert aufbrach, hatte echte Erfolge im Gepäck: die Impfung',
  'gegen Pocken, die ersten Schritte der Hygiene, die beginnende',
  'Anatomie. Dass die eigene Medizin der anderen überlegen war, war',
  'damals keine böse Behauptung, sondern eine tägliche Erfahrung. Dazu',
  'kam der Fortschrittsglaube: Wer an die eine, gerade erkämpfte',
  'Vernunft glaubte, für den war jede andere Art zu denken ein Irrtum',
  'oder eine Vorstufe. Und es kamen die wirtschaftlichen Interessen:',
  'Kolonialherrschaft ließ sich schlechter verkaufen, wenn man die',
  'Bevölkerten zugleich um ihr Wissen beneidete. So wurde aus Neid,',
  'Überlegenheit und Gewinn ein einziges Wort: „primitiv".',
  '',
  '## Was diese Denkart übersah',
  '',
  'Sie übersah, dass die Mittel der Heilerin nicht Aberglaube waren,',
  'sondern geprüfte Erfahrung. Die moderne Forschung hat das nachgeholt,',
  'Stoff für Stoff: Aus der Weidenrinde wurde das Aspirin, aus dem',
  'Schlafmohn das Morphin, aus der Chinarinde das Chinin, aus dem',
  'Fingerhut das Digitalis, aus dem Kurare das Muskelrelaxans der',
  'Chirurgie. Und es geht weiter: Das Artemisinin gegen Malaria, einer',
  'der wichtigsten Wirkstoff-Funde der letzten Jahrzehnte, stammt aus',
  'dem Beifuß, den die chinesische Heiltradition seit Jahrhunderten',
  'nutzt. Pharmafirmen durchforsten bis heute das Heilwissen der',
  'Welt nach neuen Stoffen — und die Forschung über Zuwendung und',
  'Erwartung (das, was die Heilerin jeden Tag benutzte) bestätigt,',
  'dass Heilung mehr ist als der Wirkstoff.',
  '',
  'Auch rechtlich hat sich etwas bewegt: Seit dem Nagoya-Protokoll',
  'müssen Länder und Völker zustimmen, bevor ihr traditionelles Wissen',
  'für Forschung und Geschäfte genutzt wird. Die Frage, wem das Wissen',
  'gehört, ist heute ein Rechtsstreit — vor hundertfünfzig Jahren wäre',
  'niemand auf die Idee gekommen, sie zu stellen.',
  '',
  '## Wo diese Stimme selbst scheitert',
  '',
  'Jetzt die unbequemen Stellen, denn diese Stimme hat sie. Erstens: Die',
  'Wiederentdeckung ist auch eine Mode. Wer heute über „uraltes Wissen"',
  'schwärmt, tut manchmal dasselbe wie die Abwerter, nur mit anderem',
  'Vorzeichen — er setzt das Alte an die Spitze, ohne zu prüfen. Aber',
  'nicht alles Alte ist gut, so wenig wie alles Alte schlecht ist.',
  '„Alt heißt nur alt" gilt in beide Richtungen.',
  '',
  'Zweitens: Die Abwertung hatte auch eine ehrliche Seite. Die',
  'Kolonialmedizin brachte Impfungen und Hygiene dorthin, wo es sie',
  'nicht gab, und rettete Leben — oft mit denselben Händen, die kurz',
  'darauf das Wissen der anderen verachteten. Das lässt sich nicht',
  'sauber trennen, und wer es sauber trennt, erzählt wieder eine',
  'Sieger- oder eine Opfergeschichte.',
  '',
  'Drittens: Auch die Wiederentdeckung selbst ist nicht frei von',
  'Aneignung. Wer heute ein „indigenes" Mittel vermarktet, zahlt nicht',
  'automatisch an die, deren Großmütter es kannten. Das Nagoya-',
  'Protokoll ist ein Anfang, kein Ende.',
  '',
  '## Was diese Stimme der Heilerin antwortet',
  '',
  'Die Heilerin hat am Ende ihres Textes gefragt: Was geschah mit meinem',
  'Wissen, als andere kamen, die anders dachten? Die Antwort dieser',
  'Stimme lautet: Ein Teil wurde zerstört, ein Teil wurde genommen, ohne',
  'den Namen zu nennen — und ein Teil wird heute, spät und nicht ohne',
  'Schuldgefühle, wieder ernst genommen. Wer wissen will, was dieses',
  'Wissen wert war, muss beide Sätze gleichzeitig lesen. Die Synthese',
  'versucht genau das.',
].join('\n');

/** Kapitel 1 der Themenlandkarte. */
const anfaengeDerHeilkunde = {
  id: 'anfaenge-der-heilkunde',
  titel: 'Die Anfänge der Heilkunde',
  epoche: 'Von der Steinzeit bis zu den frühen Hochkulturen',

  aufhaenger: {
    frage: 'Wer hat die erste Medizin erfunden?',
    text: [
      'Die Frage hat einen Haken: Es gibt keine Antwort mit einem Namen',
      'darin. Lange bevor jemand Schrift, Städte oder Ärzte kannte, saßen',
      'Menschen bei Kranken, kühlten Fieber, richteten Knochen und gaben',
      'Kräuter. Sie taten es in Europa, in Afrika, in Asien, in Amerika —',
      'überall dort, wo Menschen lebten, und ungefähr zur selben Zeit.',
      '',
      'Manches davon wirkte erstaunlich gut. Manches wirkte gar nicht.',
      'Beides gehört dazu. Dieses Kapitel geht dorthin zurück, wo die',
      'Medizin anfängt — und fragt, was die Menschen damals dachten,',
      'wenn sie einen Kranken vor sich hatten.',
    ].join('\n'),
  },

  karte,

  perspektiven: [
    {
      id: 'heilerin',
      name: 'Die Stimme der Heilerin',
      stimme: 'Opus',
      text: stimmeDerHeilerin,
    },
    {
      id: 'wiederentdeckung',
      name: 'Die Stimme der Abwertung und Wiederentdeckung',
      stimme: 'Hermes',
      text: stimmeDerAbwertungUndWiederentdeckung,
    },
  ],

  synthese: [
    '## Wo sich beide Stimmen treffen',
    '',
    'Zuerst das Gemeinsame, und es ist mehr, als man denken würde. Beide',
    'Stimmen stimmen über die Tatsachen überein: Die Trepanation wurde',
    'überlebt — das steht in den Knochen. Chinarinde, Weidenrinde,',
    'Schlafmohn, Fingerhut und Kurare wirkten, bevor jemand ihre Stoffe',
    'benannte. Beide erkennen an, dass dieses Wissen durch Beobachtung',
    'und Weitergeben entstand — die Heilerin nennt es Erfahrungsmedizin,',
    'die Wiederentdeckung nennt es geprüfte Erfahrung. Und beide sehen,',
    'dass Heilung mehr ist als der Eingriff: die Zuwendung, die',
    'Erwartung, das Gefühl, nicht allein zu sein. Die Heilerin benutzte',
    'es, die Forschung misst es. Sie meinen dasselbe.',
    '',
    '## Wo sie auseinandergehen',
    '',
    'Der Widerspruch beginnt bei der Deutung. Für die Heilerin ist ihre',
    'Kunst eine in sich stimmige Art des Denkens: Krankheit als Störung',
    'des Lots, Heilung als Wiederherstellung der Ordnung. Für die',
    'Stimme der Abwertung war dasselbe Denken eine Vorstufe, die die',
    'moderne Medizin überwinden musste — und die Stimme der',
    'Wiederentdeckung muss sich fragen, ob sie das Alte nicht heute',
    'umgekehrt überhöht. Sie streiten also nicht über die Pflanzen,',
    'sondern über die Frage, wer entscheidet, was als Wissen zählt:',
    'die Erfahrung von hundert Generationen oder das Labor von hundert',
    'Jahren. Und sie streiten über die Bilanz der Abwertung: Was',
    'zerstört wurde, lässt sich nicht zurückholen — aber die',
    'Kolonialmedizin brachte auch Impfungen und Hygiene, und wer das',
    'verschweigt, erzählt wieder nur eine Seite.',
    '',
    '## Was dieses Kapitel für das ganze Buch zeigt',
    '',
    'An den Anfängen sieht man zum ersten Mal, was alle folgenden',
    'Kapitel begleiten wird: Die Denkart bestimmt die Methode. Wer',
    'Krankheit als Störung versteht, heilt anders, als wer sie als',
    'Erreger versteht — und die Frage „warum sollte es helfen?" hat in',
    'jeder Zeit eine andere, in sich schlüssige Antwort. Der Streit um',
    'die Deutung ist älter als die Medizin selbst.',
    '',
    'Und noch etwas beginnt hier: Die Heilerin hatte ein Werkzeug, das',
    'kein Labor nachgebaut hat — die Gewissheit, dass jemand sich',
    'kümmert. Die moderne Medizin misst es als Zuwendungseffekt und',
    'hat Mühe, ihm in ihrem Alltag einen Platz zu geben. Vielleicht ist',
    'das der erste Punkt, an dem ein Miteinander nicht nur möglich,',
    'sondern nötig wäre.',
  ].join('\n'),

  urteil: {
    frage: 'Was würdest du von einer Heilerin annehmen — und was nicht?',
    hinweis: [
      'Es gibt hier kein Richtig und kein Falsch. Denk an das Kraut gegen',
      'Fieber, an die geöffnete Schädeldecke, an den Gesang am Lager des',
      'Kranken, an die Hand, die den Arm schient. Wo würdest du',
      'zustimmen, wo würdest du zögern — und woran machst du den',
      'Unterschied fest?',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Stimmt es, dass Menschen in der Steinzeit eine Öffnung im Schädel ' +
        '(eine Trepanation) überleben konnten?',
      antworten: [
        'Nein, ein solcher Eingriff endete immer tödlich.',
        'Ja — bei vielen Funden sind die Knochenränder verheilt.',
        'Trepanationen gibt es erst seit dem Mittelalter.',
      ],
      richtig: 1,
      erklaerung:
        'Verheilte Knochenränder wachsen nur bei Lebenden. Der Schädel von ' +
        'Ensisheim im Elsass (um 5100 v. Chr.) trägt zwei verheilte ' +
        'Öffnungen; in Peru fand man Hunderte weiterer Beispiele.',
    },
    {
      frage:
        'Was trug Ötzi, der Mann aus dem Eis (um 3300 v. Chr.), an ' +
        'Lederriemen bei sich?',
      antworten: [
        'Zwei Stücke eines Baumpilzes, den Birkenporling.',
        'Einen Beutel mit gemahlenem Kalk.',
        'Getrocknete Fischhaut als Verbandsmaterial.',
      ],
      richtig: 0,
      erklaerung:
        'Der Birkenporling gilt vielen als mögliche Arznei — Ötzi hatte ' +
        'Peitschenwürmer im Darm. Bewiesen ist der Zusammenhang nicht, ' +
        'aber er ist gut begründet.',
    },
    {
      frage:
        'Welches Mittel gegen Malaria geht auf das Wissen indigener Völker ' +
        'Südamerikas zurück?',
      antworten: [
        'Penicillin aus dem Schimmelpilz.',
        'Chinin aus der Rinde des Chinarindenbaums.',
        'Insulin aus der Bauchspeicheldrüse.',
      ],
      richtig: 1,
      erklaerung:
        'Die Chinarinde war in den Anden lange bekannt, bevor Europäer sie ' +
        'kennenlernten. Aus ihr wurde das Chinin — jahrhundertelang das ' +
        'wichtigste Mittel gegen Malaria.',
    },
    {
      frage:
        'War „primitive Völker" eine Bezeichnung, die diese Völker sich ' +
        'selbst gaben?',
      antworten: [
        'Ja, sie verstanden sich selbst als einfache Menschen.',
        'Nein — der Begriff kam von außen, aus dem Europa des ' +
          '19. Jahrhunderts.',
        'Der Begriff stammt aus der Steinzeit.',
      ],
      richtig: 1,
      erklaerung:
        '„Primitiv" ist eine Zuschreibung europäischer Gelehrter der ' +
        'Kolonialzeit. Sie beschreibt nicht die Heilkunde dieser Völker, ' +
        'sondern die Sicht derer, die den Begriff vergaben.',
    },
    {
      frage:
        'Was gab es in der Indus-Stadt Mohenjo-Daro um 2500 v. Chr. bereits?',
      antworten: [
        'Ein Krankenhaus mit angestellten Ärzten.',
        'Gemauerte Bäder, Brunnen und Abwasserkanäle.',
        'Eine Apotheke mit beschrifteten Gefäßen.',
      ],
      richtig: 1,
      erklaerung:
        'Fast jedes Haus hatte Zugang zu Wasser und einen Abfluss. Bakterien ' +
        'kannte niemand — Reinheit war eine Frage der Ordnung. Genützt hat ' +
        'sie den Menschen vermutlich trotzdem.',
    },
  ],
};

module.exports = anfaengeDerHeilkunde;
