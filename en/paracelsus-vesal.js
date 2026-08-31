// Chapter 7 — "Paracelsus and Vesal".
//
// The station at which European medicine stops obeying its books. Between
// 1527 and 1543 two things happen that have nothing to do with each other
// and yet mean the same: a wandering physician publicly throws the works
// of the old authorities into the fire in Basel, and a young professor in
// Padua opens corpses and draws what he finds in them — instead of what
// stands in the book.
//
// The WAY-OF-THINKING analysis is the heart of the chapter (operator
// requirement). It asks here: What worldview lies behind the chemistry of
// Paracelsus (Sal, Sulfur, Mercury)? Why would someone burn books instead
// of refuting them? Why should an herb carry its sign (the doctrine of
// signatures)? And why does the question "Is this remedy poisonous?"
// become the question "How much of it?" — the dose maxim with which the
// science of medicines begins. Alongside this, the honest balance in both
// directions: what has held up, what was error, and what caused harm. The
// voice names this itself (additional rule for sensitive topics in
// CLAUDE.md).
//
// LENGTH RULE (operator feedback 24.08.2026): Chapters 1–8 stay short and
// dense — each perspective at most ~250 lines, the chapter in total at
// most ~600 lines. The first voice here has around 220 lines; the rest
// leaves Hermes room for the second voice and the final synthesis. Line
// counts are measured in tests/karte-paracelsus-vesal.mjs.
//
// Voices (round 8): The FIRST perspective — Paracelsus as prosecutor —
// was written by Opus. The SECOND (Vesal, the anatomist from Brussels and
// professor in Padua: the quiet break in the anatomy theatre) and the
// final synthesis were added by Hermes in the second pass. Perspective
// workflow: CLAUDE.md.
//
// NO REPETITIONS (operator decision of 21.08.2026): Chapter 1 is
// structured by "who speaks here → …", chapter 2 begins with a scene,
// chapter 3 tells a day in the life, chapter 4 is an exchange of letters,
// chapter 5 the journey of a book, chapter 6 a tour through the
// monastery. This chapter chooses the seventh dramaturgy: a TRIAL. The
// sections are the stations of a hearing — indictment, the person of the
// prosecutor, three pieces of evidence, cross-examination, verdict
// pending. The courtroom is explicitly marked as an invention: the two
// men never met. The second voice may appear as a witness in the same
// hearing.
//
// The texts are stored as line arrays with `.join('\n')` — this keeps
// them readable in the repo at ~72 characters (the operator reads them
// against it here), and utils/markdown.js turns them back into flowing
// text in the app.
//
// CommonJS without UI imports (architecture rule): checkable with plain
// `node`.

/**
 * The voice of Paracelsus — the prosecutor in an invented trial.
 *
 * Written by Opus (round 8). It tells from within: why the old books
 * burned, why the physician belongs at the furnace, why nature speaks in
 * signs, and why the dose decides between poison and remedy — and where
 * this way of thinking reached its limit. The uncomfortable places it
 * names itself, instead of leaving them to the counter-voice.
 */
const stimmeDesParacelsus = [
  '## The Indictment',
  '',
  'This courtroom never existed. The two men who speak here, one after',
  'the other, never met: one was a wandering physician without a fixed',
  'abode, the other a professor in Padua, twenty-one years younger.',
  'Neither knew anything of the other — and in the same decade they did',
  'the same thing. That is why this court is invented: so that both may',
  'have their say.',
  '',
  'I speak first. **Theophrastus Bombastus von Hohenheim**, surgeon, son',
  'of a miner, vagrant; people call me **Paracelsus**. And at the very',
  'start, so that you know where you stand: **What you hear here is my',
  'view — a way of thinking, not a truth.** I was a quarrelsome man and',
  'hurled abuse where I ought to have examined. Count on it.',
  '',
  'I bring charges: **Galen of Pergamon**, dead for thirteen hundred',
  'years, and with him **Avicenna**, the Persian — and with them the',
  'faculties of Paris, Leipzig, Vienna and Basel.',
  '',
  'The charge is not that these men erred. To err is no crime; I have',
  'erred more than they. The charge is this: **Their books were made',
  'into a law.** Whoever wanted to become a physician at a university',
  'read Galen, heard lectures on Galen, and was examined on whether he',
  'knew Galen. What was to be seen at the sickbed had to conform to',
  'that. If the finding did not match the book, then the finding was',
  'simply the exception.',
  '',
  'On St John\'s Day 1527 I gave those books, before the University of',
  'Basel, what I considered their due: I threw them into the students\'',
  'bonfire. What exactly lay in the flames, scholars dispute to this',
  'day; Avicenna\'s "Canon" certainly. It was a performance, and I knew',
  'it. **You do not burn errors, you refute them.** I will come back to',
  'that.',
  '',
  '## About the person of the prosecutor',
  '',
  'Born around 1493 near Einsiedeln in Switzerland, son of a surgeon who',
  'was my first teacher. In 1502 my father moved to Villach in Carinthia',
  'and taught at the mining school. That is where I grew up: among',
  'shafts, smelting furnaces and miners who could no longer breathe at',
  'forty.',
  '',
  '**That is the beginning of my whole way of thinking.** Whoever',
  'watches how grey ore becomes metal in the heat no longer believes',
  'that the world consists of four humours. He sees: things have',
  'components, and fire can separate them. And he sees something else:',
  'the miners\' illness does not come from within. It comes from the',
  'shaft.',
  '',
  'I studied in Italy, probably in Ferrara. Where exactly, and whether I',
  'really earned the doctorate, my opponents dispute to this day — they',
  'hung that over me all my life. Afterwards I wandered through the',
  'lands for decades: field surgeon in wars, guest of barbers,',
  'midwives, executioners, miners and old women who knew their herbs.',
  '',
  '**Why with them and not at the faculties?** Because that is where the',
  'sick lay. A book repeats what another book says; a barber has seen a',
  'thousand wounds. I put it bluntly: the universities do not teach',
  'everything; the physician must also go to the old women. **Experience',
  'is the teacher** — not Aristotle, not Galen, and not I.',
  '',
  'Then 1527, Basel. I had treated the ailing leg of the printer',
  'Johannes Froben, which others wanted to amputate; he kept it. That is',
  'how I became city physician, and the city allowed me to lecture at',
  'the university. I lectured **in German** instead of Latin and let in',
  'anyone who wanted to come — including barbers and surgeons who knew',
  'no Latin. To the faculty, that was no innovation but an',
  'impertinence.',
  '',
  'It lasted under a year. A canon whom I had treated refused to pay the',
  'agreed fee; the court ruled in his favour, I answered with libellous',
  'pamphlets — and fled the city by night early in 1528. After that I',
  'never held office again.',
  '',
  '## Exhibit one: the furnace',
  '',
  'I present the first exhibit: a smelting furnace.',
  '',
  'The school teaches: man is a mixture of four humours, and he is ill',
  'when one of them prevails. So one bleeds, purges, cools and warms',
  'until the balance is restored.',
  '',
  'I say: **The world is not built of humours but of three principles —',
  'Sal, Sulfur and Mercury**, that is, salt, sulphur and quicksilver.',
  'Throw a piece of wood into the fire: what burns is the sulfur; what',
  'escapes as smoke is the mercury; what remains as ash is the sal. The',
  'combustible, the volatile, the fixed — everything is made of these,',
  'including the body.',
  '',
  '**Why these three and not the four humours?** Because I can show',
  'them. The humours are an assertion; the furnace is an experiment.',
  'What happens in the fire happens before your eyes — and again',
  'tomorrow.',
  '',
  'From this follows my second sentence, and it is the more important',
  'one: **An illness is not an imbalance but a thing that comes from',
  'outside and has its own seat.** Miners\' disease sits in the lungs',
  'and comes from the shaft. But if every illness has its own cause,',
  'then it also needs **its own remedy** — not the same old bloodletting',
  'for everything.',
  '',
  '**Why then the furnace and not the herb garden?** Because in the',
  'plant the effective principle lies hidden like the metal in the ore.',
  'The alchemist separates the pure from the impure — not to make gold,',
  'that is fool\'s work, but to make medicine. **The physician is a',
  'chemist.** That is why I worked with metals and minerals where others',
  'knew only herbs: quicksilver, antimony, iron, sulphur, the zinc to',
  'which I gave its name, and the poppy extract that I called laudanum.',
  '',
  '**That is the part of my indictment that has stood.** Out of this',
  'workshop grew the pharmacy, and out of the pharmacy the science of',
  'medicines. Whoever today isolates an active substance from a plant',
  'does what I attempted at the furnace — only better.',
  '',
  '## Exhibit two: the signs of nature',
  '',
  'Now the piece in which I erred most thoroughly. I present it anyway,',
  'for without it you will not understand my way of thinking.',
  '',
  '**Why should any herb heal anything at all?** The question is meant',
  'seriously: there are a thousand plants — how does the physician know',
  'which one? My answer was the **signature**. God made the world for',
  'man and wrote each remedy\'s sign on its outside; whoever can read',
  'will find it.',
  '',
  'The greater celandine carries a yellow sap — so, against jaundice and',
  'bile. Lungwort bears spots like a lung — so, against the cough. The',
  'walnut looks like a brain in its shell — so, for the head. **Creation',
  'speaks in signs, and the healing art is the art of reading them.**',
  '',
  'Do you understand why that sounded reasonable then? It made nature a',
  'book that anyone could open, even those who knew no Latin. It put in',
  'the place of authority something that everyone was allowed to check',
  'for themselves. To my mind, it was freedom.',
  '',
  '**And it was wrong.** The colour of a sap says nothing about its',
  'effect. Celandine does not help the liver — it can damage it. The',
  'doctrine of signatures made healers confident, for generations,',
  'where they ought to have tested; it is a system that has an answer to',
  'every question and therefore gives none. **I attacked one authority',
  'and put another in its place: myself.**',
  '',
  '## Exhibit three: the dose',
  '',
  'The last exhibit is a sentence. It comes from a writing in which I',
  'defended myself against the accusation that I was poisoning my',
  'patients:',
  '',
  '> All things are poison, and nothing is without poison; only the dose',
  '> makes a thing not a poison.',
  '',
  '**Why did I have to write that?** Because of the French disease,',
  'which you today call syphilis. It raged like a fire, and there were',
  'two treatments. One was guaiac wood from the West Indies: gentle,',
  'very expensive and without effect — and the trade in it lay with one',
  'of the richest trading houses in Europe. The other was quicksilver,',
  'which worked and, in the usual amounts, killed people: salivation,',
  'lost teeth, ruined kidneys.',
  '',
  'My answer was not to ban the poison but to **measure** it: small',
  'doses, taken internally, exactly measured. Thus the question "Is this',
  'remedy poisonous?" becomes the question "How much of it?" — and that',
  'is the beginning of pharmacology. Every package insert you read today',
  'stands on this sentence.',
  '',
  'What that earned me belongs to the story: my book on the French',
  'disease was stopped in Nuremberg in 1530, at the instigation of the',
  'Leipzig faculty. **The quarrel was never only a quarrel about',
  'illnesses. It was also about offices, books and money.**',
  '',
  'One more piece I lay before you, because it is my dearest: in 1534 I',
  'wrote "Von der Bergsucht" in Carinthia, about the lungs of miners.',
  'Before that, no one had asked whether the work itself makes people',
  'ill. **That was the first writing about an occupational disease** —',
  'and it came not from a library but from a mine shaft.',
  '',
  '## The cross-examination: what counts against me',
  '',
  'A prosecutor who does not cross-examine himself is worthless. So here',
  'is the counter-account, and I make it honestly.',
  '',
  '**I tore down more than I built up.** Burning Galen was easy; putting',
  'something testable in his place I did not manage. My three',
  'principles can be proven just as little as the four humours I',
  'laughed at.',
  '',
  '**My writings are a thicket.** Beside the furnace stand the stars,',
  'the spirits of the elements, an inner alchemist I called Archeus,',
  'and words I invented myself. Whoever reads me finds on the same page',
  'a clever observation and an incantation — and cannot tell the two',
  'apart. Most of my works appeared only decades after my death; which',
  'of them really comes from me, scholars dispute to this day.',
  '',
  '**My tone harmed me more than my opponents.** I publicly insulted the',
  'doctors as windbags and wrote of the "Herrn von Hohlschädel" — the',
  'lords of the hollow skulls. Whoever speaks like that is not refuted;',
  'he is simply no longer invited. I had no school, no chair and no',
  'pupil of note. I died in 1541 in an inn in Salzburg, forty-eight',
  'years old, without office.',
  '',
  '**And my remedies killed.** Quicksilver kills even in small doses if',
  'given for a long time; I did not know that. Antimony was sold after',
  'me as a miracle cure, until Paris banned it. **I made the dose a',
  'rule and yet did not know its limit.**',
  '',
  'There remains the fire of Basel. It made me famous and harmed my',
  'cause. **Authority did not break because one man burned its books.**',
  'It broke because someone went and looked.',
  '',
  '## The verdict is pending',
  '',
  'For while I was making fire in Basel, a boy sat over his books in',
  'Leuven whom I never met: **Andreas Vesal**, born in Brussels in 1514,',
  'from a family of court physicians and apothecaries — everything I was',
  'not. At twenty-three he held a chair in Padua.',
  '',
  'He did something that would never have occurred to me. He held no',
  'speech against Galen. He stepped down from the lectern, took the',
  'knife himself, opened the body and **looked** — and wrote down, point',
  'by point, where Galen had described something other than what is',
  'found in man. In 1543 his work "De humani corporis fabrica" appeared,',
  'seven books with images unlike any ever seen.',
  '',
  'And now the sentence I must swallow: **It was printed in Basel, by',
  'Johannes Oporinus — the young man who had tended the coals in my',
  'furnace in 1527.** Our paths never crossed. Our books lay in the',
  'same workshop.',
  '',
  'Which of us truly toppled authority — the one who shouted or the one',
  'who looked — I will not decide. For that, the second witness must be',
  'heard. **The second voice of this chapter belongs to him: the',
  'anatomist from Padua.**',
].join('\n');

/**
 * Vesal — the witness in the trial against authority. The anatomist from
 * Brussels, professor in Padua: the man who refuted authority by looking
 * — the quiet break in the anatomy theatre.
 *
 * Written by DeepSeek (round 8, second pass). This voice, too, names the
 * uncomfortable places of its own side itself (additional rule for
 * sensitive topics).
 */
const stimmeDesVesal = [
  '## The witness is called',
  '',
  'The prosecutor has spoken loudly and burned books. Now another man',
  'steps before the court: quiet, in a black professorial robe, with',
  'reddened hands — from soap and cadaver wax. His name is Andreas',
  'Vesal; at thirty he is professor in Padua and has just completed a',
  'book that shows the anatomy of man as it is — not as Galen described',
  'it. The prosecutor insulted authority. This witness refuted it. That',
  'is not the same thing.',
  '',
  '## Testimony: the theatre of anatomy',
  '',
  'I ask the court to imagine a theatre. In Padua stands a wooden tower',
  'with a table at its centre. On the table lies a body — a human',
  'being, not an ape, not a pig. Around the table the students sit in',
  'ranks, and I stand among them, not as a lecturer but as a',
  'craftsman: I cut myself. That was the scandal. Until then the',
  'professor read aloud from Galen while an assistant dissected below',
  'and the professor never looked. I set Galen aside and asked the',
  'corpse.',
  '',
  'Galen never opened a human being. He dissected apes and pigs and',
  'transferred the results to man — a blueprint tested on the wrong',
  'model. I knew that when I studied in Paris, and no one wanted to',
  'hear it. In Padua I showed it: the human lower jaw is one bone, not',
  'two. The sternum has three parts, not seven. The liver does not have',
  'five lobes. Galen erred — at every second point where it can be',
  'checked.',
  '',
  '## Testimony: why I did not burn, but drew',
  '',
  'The prosecutor threw Galen\'s books on the pyre. I did not burn him —',
  'I replaced him. For seven years I opened corpses, drew, engraved and',
  'printed: the "Fabrica", the great book on the structure of the human',
  'body, printed in Basel in 1543 — of all people by Johannes Oporinus,',
  'who had once served the prosecutor as a scribe. The world is small,',
  'and the printing press turns a refutation into common property. The',
  'prosecutor\'s pyre burned for one evening. My copper plates travel',
  'over the Alps and print the truth in a thousand copies.',
  '',
  'And here lies the difference I wish to lay before the court:',
  'Authority did not break because one man burned its books. It broke',
  'because someone went and looked — and drew the result so precisely',
  'that no one could look away anymore. The prosecutor made the storm.',
  'I made the light.',
  '',
  '## The cross-examination: what counts against me too',
  '',
  'The prosecutor was cross-examined; I take myself into it, for this',
  'witness, too, has his shadows.',
  '',
  '**First: I erred — I too.** The Fabrica is a masterpiece of anatomy',
  'and yet full of errors: I described the flow of the blood wrongly,',
  'misunderstood the heart, and drew some of the vessels as Galen saw',
  'them, not as they are. One does not see everything at once. Whoever',
  'opens a new window first sees only a section of the view.',
  '',
  '**Second: anatomy is not the illness.** I understood the dead body —',
  'but the living one is more than its structure. A surgeon who knows',
  'anatomy is not yet a physician. The faculty I so despised knew',
  'something my knife does not show: the sick human being. I later',
  'became court physician and healed as best I could — with means I',
  'learned in no anatomy theatre.',
  '',
  '**Third: fame came before thoroughness.** I was young, quick and',
  'vain. The great plates of the Fabrica are also stage sets —',
  'skeletons that pose, landscapes in the background. Some of it was',
  'science, some of it was theatre. And when the resistance to my book',
  'grew, I did not stay in Padua to fight; I went to the imperial',
  'court. The witness who showed the truth withdrew when it came to',
  'defending it.',
  '',
  '## The closing argument: the verdict',
  '',
  'The prosecutor said at the end that the verdict is pending. As a',
  'witness I lay it before the court: both were right — the storm and',
  'the light. Without the storm no one would have listened; without the',
  'light no one would have seen. The prosecutor had the courage to',
  'insult authority; I had the labour of replacing it. Medicine needed',
  'both: the one who burned the old books and the one who printed new',
  'ones. The verdict is not: Which of the two won? It is: What do we',
  'continue with? And the answer stands in Padua: with the knife, the',
  'eye and the press — and with the question the prosecutor always',
  'asked.',
].join('\n');

/** Chapter 7 of the topic map. */
const paracelsusVesal = {
  id: 'paracelsus-vesal',
  titel: 'Paracelsus and Vesal',
  epoche: '16th century',

  aufhaenger: {
    frage: 'What happens when two men stop fearing authority?',
    text: [
      'For thirteen hundred years Europe had settled what a physician',
      'had to know: Galen had written it down, Avicenna had ordered it,',
      'the universities examined it. Whoever saw something other than',
      'what stood in the book had presumably erred.',
      '',
      'Then, within a few years, two things happen. In Basel in 1527 a',
      'wandering physician throws the works of the old masters into the',
      'fire, lectures in German instead of Latin, and maintains that',
      'experience is the teacher: Paracelsus. And in Padua a young',
      'professor steps down from the lectern, takes the knife himself',
      'and draws what he really finds in the opened body: Andreas Vesal.',
      'In 1543 his anatomy work appears — printed, of all places, in',
      'Basel.',
      '',
      'The two never met and were as different as two people can be: the',
      'loud outsider and the precise professor. This chapter asks what',
      'they actually attacked, what they put in its place — and what of',
      'both has remained.',
    ].join('\n'),
  },

  // The map itself lives in karten/paracelsus-vesal.js — here only the
  // phase references are translated (phasen → karteHinweise), not the map.
  karteHinweise: [
    {
      label: '1493–1524: Einsiedeln, Villach and the wandering years',
      hinweis:
        'Near Einsiedeln in Switzerland, Theophrastus Bombastus von ' +
        'Hohenheim is born around 1493, the son of a surgeon. In 1502 ' +
        'the family moves to Villach in Carinthia, where the father ' +
        'teaches at the mining school — there the boy comes to know the ' +
        'metals, the furnaces and the diseases of the miners. Afterwards ' +
        'he travels through Europe for years and learns from barbers, ' +
        'midwives, surgeons and miners instead of at the faculties.',
    },
    {
      label: '1527: Basel — the burning of the books',
      hinweis:
        'After treating the leg of the printer Johannes Froben, ' +
        'Paracelsus becomes city physician of Basel in 1527 and ' +
        'lectures at the university — in German instead of Latin, and ' +
        'for anyone who wants to come. On St John\'s Day he throws the ' +
        'books of the old authorities into the students\' fire. A ' +
        'quarrel over a fee brings him before the court; early in 1528 ' +
        'he has to leave the city in haste.',
    },
    {
      label: '1528–1541: the late years up to Salzburg',
      hinweis:
        'After fleeing Basel, Paracelsus remains without office. In ' +
        'Nuremberg his book on the French disease is stopped in 1530 at ' +
        'the instigation of the Leipzig faculty. In 1534 he writes in ' +
        'Carinthia about miners\' disease — the first writing about an ' +
        'occupational disease. On 24 September 1541 he dies in Salzburg, ' +
        'about forty-eight years old. Most of his works appear only ' +
        'decades after his death.',
    },
    {
      label: '1543: Padua and Basel — the "Fabrica" appears',
      hinweis:
        'Andreas Vesal, born in Brussels in 1514, has been teaching in ' +
        'Padua since 1537 and dissects there himself instead of having ' +
        'others read aloud. In 1543 his anatomy work "De humani corporis ' +
        'fabrica" appears — printed in Basel by Johannes Oporinus, who ' +
        'sixteen years earlier had been Paracelsus\' assistant. The two ' +
        'men never met; their paths meet only in this print shop.',
    },
  ],

  perspektiven: [
    {
      id: 'paracelsus',
      name: 'The Voice of Paracelsus',
      stimme: 'Opus',
      text: stimmeDesParacelsus,
    },
    {
      id: 'vesal',
      name: 'The Voice of Vesal',
      stimme: 'DeepSeek',
      text: stimmeDesVesal,
    },
  ],

  synthese: [
    '## Where the two voices meet',
    '',
    'First, the common ground. The prosecutor and the witness never',
    'spoke to each other — and yet they say the same thing at the core:',
    'the authority of the old books is broken. Paracelsus burned it,',
    'Vesal replaced it; both left Galen behind, both taught from their',
    'own observation, both put experience above the quotation. And both',
    'admit that their own work was flawed: one calls his writings a',
    'thicket, the other confesses that he erred. Even fate binds them',
    'together: both failed at the universities, both ended as court',
    'physicians — and both went out into the world the same way,',
    'through Oporinus, the printer from Basel: as printed books.',
    '',
    '## Where they part ways',
    '',
    'The contradiction begins with the question of how one breaks',
    'authority. For Paracelsus it is an act of courage: publicly burning',
    'the old books, teaching in German, insulting the faculty — the',
    'storm that clears the air. For Vesal it is a labour: dissecting,',
    'drawing, printing for years — the light that makes darkness',
    'superfluous. The one wins by destroying; the other by building.',
    'And they disagree about the source of knowledge: Paracelsus reads',
    'in nature and in the signs of creation, Vesal reads in the body',
    'itself. Both call it experience — and mean different things: the',
    'one the interpretation of the world, the other the measurement of',
    'man.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'For the eighth time the same pattern — and for the first time it',
    'turns toward the future: the way of thinking determines the method.',
    'The early ways of thinking asked about balance (lot, channels, Qi,',
    'doshas, humours); now two men ask about experience — and with that',
    'begins the way of thinking from which modern medicine grows: not',
    'authority, not balance, but looking.',
    '',
    'And this chapter shows the answer to the question it itself asked:',
    'Who writes the history of medicine — the loud one or the thorough',
    'one? The synthesis\'s answer: both. The storm without light is',
    'empty; the light without storm is not seen. Medicine needs the one',
    'who burns the old books and the one who prints new ones — and next',
    'it needs the one who does not only open the dead body but asks the',
    'living one: How does the blood move? His name is Harvey — and his',
    'chapter comes next.',
  ].join('\n'),

  urteil: {
    frage:
      'Which is closer to you — the loud rebel who throws the old books ' +
      'into the fire, or the quiet researcher who simply goes and looks?',
    hinweis: [
      'There is no right or wrong here. Think about what each achieves:',
      'the rebel gives the question an audience, but often delivers no',
      'replacement — Paracelsus brought the furnace into medicine and,',
      'with it, the doctrine of signatures. The thorough one delivers',
      'the replacement, but it can take decades before anyone bothers to',
      'look — Vesal\'s images had to be printed first in order to take',
      'effect. Think of today, too: whoever questions a common treatment',
      'must be able to do both — be loud enough to be heard, and precise',
      'enough to be right. What do you trust yourself to do better?',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'What happened in 1527 in Basel?',
      antworten: [
        'Paracelsus was elected rector of the university.',
        'Paracelsus publicly burned books of the old authorities.',
        'Vesal held his first public dissection there.',
      ],
      richtig: 1,
      erklaerung:
        'In 1527 Paracelsus was city physician in Basel and was allowed ' +
        'to lecture at the university — in German instead of Latin. On ' +
        'St John\'s Day he threw works of the old authorities, among ' +
        'them Avicenna\'s "Canon", into the students\' bonfire. After a ' +
        'lost quarrel over a fee he had to leave the city early in 1528.',
    },
    {
      frage: 'What does the dose maxim of Paracelsus say?',
      antworten: [
        'Only natural remedies are harmless.',
        'The more diluted a remedy is, the stronger it works.',
        'Everything is poison — only the amount decides whether something is poisonous.',
      ],
      richtig: 2,
      erklaerung:
        '"All things are poison, and nothing is without poison; only the ' +
        'dose makes a thing not a poison." The sentence comes from a ' +
        'defence writing of 1538 and to this day counts as a basic rule ' +
        'of pharmacology: it is not the substance alone that decides ' +
        'between effect and harm, but the amount.',
    },
    {
      frage: 'What is the doctrine of signatures?',
      antworten: [
        'The assumption that nature shows on a plant\'s outside what it ' +
          'is good for.',
        'The physician\'s duty to sign every prescription by hand.',
        'A procedure for sorting remedies by weight.',
      ],
      richtig: 0,
      erklaerung:
        'According to this idea, creation gave every remedy a sign: the ' +
        'greater celandine with its yellow sap against jaundice, the ' +
        'spotted lungwort against the cough, the walnut for the head. ' +
        'Paracelsus advocated it emphatically. It does not stand up to ' +
        'scrutiny — appearance and effect have nothing to do with each ' +
        'other.',
    },
    {
      frage: 'What distinguished Vesal\'s anatomy teaching?',
      antworten: [
        'He dispensed with dissections entirely and worked only with ' +
          'models.',
        'He dissected himself instead of having others lecture from the ' +
          'lectern.',
        'He had only animals opened, because that was permitted.',
      ],
      richtig: 1,
      erklaerung:
        'The custom was for the professor to read aloud from Galen at ' +
        'the lectern while a barber opened the body and an assistant ' +
        'pointed at it. Vesal stepped down and cut himself — and in so ' +
        'doing found places where Galen had described something other ' +
        'than what is to be seen in man. Galen had mostly dissected ' +
        'animals.',
    },
    {
      frage: 'What appeared in 1543?',
      antworten: [
        'Avicenna\'s "Canon of Medicine".',
        'The first German translation of the Hippocratic oath.',
        'Vesal\'s "De humani corporis fabrica" — printed in Basel.',
      ],
      richtig: 2,
      erklaerung:
        'The seven books on the structure of the human body with their ' +
        'famous woodcuts appeared in 1543 with Johannes Oporinus in ' +
        'Basel. The same Oporinus had been Paracelsus\' assistant in ' +
        '1527 — the only connection between two men who never met.',
    },
  ],
};

module.exports = paracelsusVesal;
