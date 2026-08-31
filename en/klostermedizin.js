// Chapter 6 — "Monastic Medicine".
//
// The station at which Europe itself begins to heal again — with what it
// has: a garden, a scriptorium and a rule that puts the care of the sick
// above everything else. Between Benedict (c. 529) and Hildegard of
// Bingen (1098–1179) lie six hundred years in which the monasteries are
// the hospitals, the pharmacies and the libraries of the West.
//
// The WAY-OF-THINKING analysis is the heart of the chapter (operator
// requirement). Here it asks: Why did they heal at all — and with what
// justification? Why was the garden the pharmacy? Why did they copy out
// what they did not understand? Why did prayer and plant belong
// together? And where exactly did this way of thinking reach its limit:
// where faith replaced the diagnosis and the authority of the Church
// stood above doubt. The voice names this itself (additional rule for
// sensitive topics in CLAUDE.md).
//
// LENGTH RULE (operator feedback 24.08.2026): Chapters 1–8 stay short and
// dense — each perspective at most ~250 lines, the whole chapter at most
// ~600 lines. The first voice here has around 235 lines; the rest leaves
// Hermes room for the second voice and the final synthesis. Line counts
// are measured in tests/karte-klostermedizin.mjs.
//
// Voices (round 7): The FIRST perspective — the monastery from within —
// was written by Opus. The SECOND (the marketplace: barber-surgeons,
// wound doctors, midwives and herb women, whom nobody wrote down) and
// the final synthesis were added by Hermes in a second pass. Perspective
// workflow: CLAUDE.md.
//
// NO REPETITION (operator decision 21.08.2026): Chapter 1 is organised by
// "Who speaks here → …", chapter 2 opens with a scene, chapter 3 tells a
// day in the life, chapter 4 is an exchange of letters, chapter 5 the
// journey of a book. This chapter chooses the sixth dramaturgy: a WALK
// THROUGH the monastery. Every section is a place behind the wall — gate,
// herb garden, scriptorium, infirmary, Rupertsberg, chapter house — and
// the last leads to the wall itself, where the second voice waits. The
// marketplace lies outside; the same dramaturgy carries it on.
//
// The map lives in utils/themen/karten/klostermedizin.js (geometry
// instead of narration). Here only the phase references are translated
// as karteHinweise — not the map itself.
//
// The texts are stored as line arrays joined with `.join('\n')` — that
// keeps them readable in the repo at ~72 characters (the operator reads
// them here), and utils/markdown.js turns them back into flowing text in
// the app.
//
// CommonJS without UI imports (architecture rule): verifiable with plain
// `node`.

/**
 * The voice of the monastery — a walk through six places behind the wall.
 *
 * Written by Opus (round 7). It tells from within: why healing happened,
 * why gardening, why copying, why praying — and where this way of
 * thinking reached its limit. It names the uncomfortable spots itself,
 * instead of leaving them to the counter-voice.
 */
const stimmeDesKlosters = [
  '## At the Gate: whom we let in, and why',
  '',
  'You stand before the gate. First a word about the voice that guides you:',
  'We are the monastery — the brother who nurses the sick, who digs the',
  'garden, who sits in the scriptorium. Often it is one and the same man.',
  '',
  'And straight away the second thing: **What you hear here is our view of',
  'ourselves — a way of thinking, not a truth.** Outside this wall the',
  'same story is told differently. We will come back to that at the end.',
  '',
  'The gate stands open, and that is not friendliness but a rule. In the',
  'rule that Benedict wrote down around 529 on the mountain of',
  'Montecassino it says: All guests are to be received as Christ. And in',
  'its 36th chapter: **Before all and above all, care must be taken of',
  'the sick; one should serve them as if it were Christ himself.**',
  '',
  'Read that sentence twice, for it justifies everything that follows. It',
  'does not say: nurse the sick so that they can work again. It says: **In',
  'the sick person you meet your Lord.** With that, care is no side job',
  'that is dropped when the harvest presses, but divine service like the',
  'choir office. That is neighbourly love, caritas — with us not a',
  'feeling, but an order with responsibility and a fixed hour.',
  '',
  'Out of this sentence grew Europe\'s first organised system of care: a',
  'house of its own for the sick, a brother in charge, a kitchen of its',
  'own in which meat is allowed, meat that is forbidden to the rest of',
  'us. Whoever comes in is not asked whether he can pay — in a time when',
  'nobody else asks where the feverish will lie tonight.',
  '',
  '## In the Herb Garden: the pharmacy of creation',
  '',
  'Walk on; the beds lie to the left. Four steps wide, bordered with box,',
  'each bed one plant: sage, rue, mugwort, fennel, lovage, horehound,',
  'mint, caraway, opium poppy. The ground plan they keep in St. Gallen',
  'draws around 820 sixteen labelled beds next to the physician\'s house.',
  'On the Reichenau, Abbot Walahfrid Strabo put his own garden into',
  'verse around 840 — twenty-four plants, and he begins with the nettles',
  'that stung his hands.',
  '',
  '**Why a garden and not a store of bought remedies?** Because creation',
  'itself is the pharmacy for us. In the Book of Sirach stands the',
  'sentence we rely on: The Lord lets the medicine grow out of the',
  'earth, and a sensible man does not despise it. **If God has ordered',
  'the world, he has also provided for the diseases — one only has to',
  'know it and tend it.** No herb is there by chance. It is meant.',
  '',
  'That sounds pious, but it has a very practical consequence: whoever',
  'thinks that way collects, plants and writes down. Charlemagne decreed',
  'it around 795 — in the instruction for his estates, plant by plant,',
  'what is to be grown everywhere. Out of an article of faith comes a',
  'list, out of the list a store.',
  '',
  '**And how did we know which herb for which ailment?** From two sources',
  'that we never fully kept apart. One is the books of the ancients:',
  'there stands the doctrine of the four humours and the four qualities —',
  'warm, cold, moist, dry. Whoever has a cold, moist disease needs a',
  'warm, dry herb. **A rule one can act on, even knowing nothing about',
  'the sick.** The other source is experience: year after year we have',
  'the same people before us.',
  '',
  'What of it worked, we tell you honestly in both directions. The opium',
  'poppy took away the pain and made dependent — we saw it and could not',
  'name it. Fennel and mint helped the belly, the mugwort accompanied',
  'births. Much else was weak, and we had no measure for its strength:',
  '**The same plant, harvested in May or in August, is not the same',
  'medicine.** And yes — herbs were also merchandise, and a rich',
  'monastery became richer.',
  '',
  '## In the Scriptorium: why we copied out what we did not understand',
  '',
  'Now the cold room with the high windows. Here they sit half the day,',
  'and in the margin notes stands what they think of it: Three fingers',
  'write, the whole body suffers. The parchment for one great book costs',
  'a flock of sheep.',
  '',
  '**Why do we do it?** First for the word of God — that is what the',
  'scriptorium is for. But immediately after, for the ancients.',
  'Cassiodorus, a Roman official who founded a monastery in Calabria',
  'around 550, wrote into his monks\' rule book: If Greek is closed to',
  'you, at least read Dioscorides on the herbs, then Hippocrates and',
  'Galen — and copy them.',
  '',
  '**That is the core of our way of thinking about knowledge: preserving',
  'is an activity.** A book that nobody copies dies; parchment decays,',
  'is scraped off and written over. We did not copy because we',
  'understood the books, but because we sensed that someone will one day',
  'understand them. That is no glory — it is a bet on the future, and it',
  'has paid off.',
  '',
  'In Fulda, Lorsch, Corbie and St. Gallen, texts survived that way that',
  'would otherwise exist nowhere any more. And at the beginning of the',
  'oldest surviving pharmacopoeia in Germany, from Lorsch around 795,',
  'stands something you do not expect: a long defence of the healing',
  'art. For there was the objection, and it came from our own ranks:',
  '**Whoever takes medicine mistrusts the providence of God.**',
  '',
  'The answer written there is ours: God himself let the herbs grow; the',
  'art of the physician is a gift of God; and to refuse the sick their',
  'earthly help is not piety but hardness. **Only this sentence allows',
  'us medicine at all** — and the fact that it had to be written',
  'expressly tells you how seriously the objection was taken.',
  '',
  'The uncomfortable side of the same work: we copied, we did not check.',
  'A misread plant name turns one recipe into another, and we could not',
  'notice the error. We passed Galen on with all his errors, because for',
  'us the old was not a proposal but authority. **Whoever preserves,',
  'preserves everything — the truth and the error in the same volume.**',
  '',
  '## In the Infirmary: why prayer and plant belong together',
  '',
  'The room is warm, that is the first thing. A bed, a blanket, a bowl,',
  'someone who looks in. In Cluny it is written down to the last detail',
  'when the sick are washed, fed and visited, and how a dying person is',
  'accompanied. **That is our strongest medicine, and it took us long to',
  'notice it: warmth, food, rest and a person who stays.**',
  '',
  'Beside it stands prayer, and here you must take our way of thinking',
  'exactly, or you will misunderstand it. We do not pray instead of',
  'treating. We pray, **because body and soul are not two things for',
  'us.** A disease is for us never only a disturbance in the body; it',
  'also stands between the human being and God. Whoever treats only the',
  'body leaves out half — that is how we saw it. That is why the herb',
  'and the prayer belong to the same treatment, and why the infirmary is',
  'built next to the church.',
  '',
  'Add to that the bloodletting, four or five times a year, by calendar',
  'and phase of the moon, with rest days afterwards. We held it to be a',
  'cleansing; it did harm and helped nobody — the same account as the',
  'warm bed.',
  '',
  'And now the limit, and we name it ourselves so that no one else must.',
  '**When disease can also be a trial or a punishment of God, then the',
  'sick person receives a guilt on top of his pain.** We consoled people',
  'by explaining to them what their suffering was good for — and in',
  'doing so we sometimes stopped looking for what it really was. **Faith',
  'has often replaced the diagnosis with us.**',
  '',
  'Worse is the second thing: our explanation always fit. If the sick',
  'person recovered, it was grace; if he died, it was God\'s will. **An',
  'answer that holds in both cases teaches nobody anything.** We did not',
  'count, did not compare, did not test whether our remedy was better',
  'than nothing at all. For six hundred years hardly anyone among us',
  'asked that question.',
  '',
  'And the Church itself bound our hands. From 1130 its councils',
  'forbade the monks to practise medicine for money outside the',
  'monastery; in 1215 clerics were forbidden to cut with knife or',
  'cautery iron. **With that, the whole art of wound medicine fell to',
  'the men outside.** In the same year the physicians were ordered, in',
  'cases of serious illness, to have the priest called first: the soul',
  'before the body, as law. **Our medicine stood in the service of',
  'religion, not the other way round** — taken for granted by us,',
  'probably not by you.',
  '',
  '## On the Rupertsberg: the woman who was not allowed to teach',
  '',
  'Let us leave the hall and go to the Rhine, where the Nahe flows in.',
  'Here, around 1150, an abbess founds her own monastery against the',
  'resistance of her abbot: **Hildegard of Bingen**, born 1098, died',
  '1179, placed in the cloister cell at eight, leader at thirty-eight.',
  '',
  'She writes two books that strictly speaking should not exist: the',
  '**"Physica"**, a natural history of plants, trees, stones, fish and',
  'animals with their uses, and **"Causae et curae"** on the causes and',
  'treatment of diseases. Her key word is **viriditas, the green',
  'force** — the succulent life force that dwells in everything healthy',
  'and dries up in the sick. Healing means for her: bringing the green',
  'back into flow, with food, measure, sleep, warmth and herb.',
  '',
  '**Why was she allowed to do it?** Strictly speaking she was not. A',
  'woman had no teaching office in the Church; one appealed to the',
  'apostle who forbids women to teach. Hildegard\'s way past it is the',
  'vision: **It is not she who speaks, but the living light that speaks',
  'through her.** She calls herself a poor, unlearned woman — and at',
  'the same time writes to emperors and popes. In 1147 Pope Eugene III',
  'reads aloud from her writings at the Synod of Trier and approves',
  'them; from then on she is unassailable.',
  '',
  '**That is the most honest sentence of this section: her authority',
  'came not from a woman being allowed to teach, but from her being an',
  'exception.** She found a door, she opened none. The healers, the',
  'midwives, the herb women in the land had no light that spoke for',
  'them — and nobody who wrote down their names.',
  '',
  'What survives of her, and what does not, belong together. Her',
  'observations are often astonishingly precise; about melancholy, about',
  'the female body and about desire she writes as openly as almost',
  'nobody then. But her healing books are handed down separately from',
  'the vision writings, and scholars dispute how much of it comes from',
  'her herself. And the "Hildegard medicine" one can buy today — spelt,',
  'gemstones, fixed cure plans — is largely an invention of the 20th',
  'century: **It does not stand like that in her books, and what stands',
  'there is not effective because it is old.**',
  '',
  '## In the Chapter House: the account',
  '',
  'We end where we gather every morning and where everyone must say his',
  'faults aloud. So the account, both columns.',
  '',
  '**What remains.**',
  '',
  '- **Care as an institution.** A house in which a stranger without',
  '  money gets a bed, food and supervision — that did not exist in',
  '  Europe before. Out of the monastery hospice grew the hospitals.',
  '- **The preservation.** Without the copies from Vivarium, Fulda,',
  '  Lorsch and St. Gallen, the ancient holdings in the West would',
  '  largely have vanished.',
  '- **The garden.** Sage, fennel, caraway, valerian, lemon balm,',
  '  poppy — the beds of those days stand in excerpts in the',
  '  pharmacopoeia to this day.',
  '- **The order.** Warmth, rest, regular food, time and attention',
  '  work to this day, even if one does not call it medicine.',
  '',
  '**What we must reproach ourselves with.**',
  '',
  '- **We did not test.** No counting, no comparison, no question',
  '  whether it would have turned out differently without our remedy.',
  '- **Faith often replaced the diagnosis,** and interpreting disease',
  '  as punishment burdened the sick instead of helping them.',
  '- **Authority stood above doubt** — that of the ancients in the',
  '  books, and that of the Church above the books.',
  '- **We despised those outside.** What was known on the market, in',
  '  the bath houses and in the villages counted for us as disorderly',
  '  and unlearned. We did not write it down — and that is why it has',
  '  almost entirely disappeared. To be a preserver also means: to',
  '  decide what is not preserved.',
  '',
  '## At the Wall: Salerno and the voice from outside',
  '',
  'One last look, to the south. In **Salerno**, a port city near',
  'Naples, something has been arising since the 10th century that we',
  'did not build: the first medical school of Europe — and it does not',
  'stand behind a wall. There everything mixes: monastic knowledge from',
  'nearby Montecassino, where the merchant Constantinus Africanus as a',
  'monk translates Arabic books into Latin, the knowledge of the',
  'physicians in the city, and the experience of the women whose',
  'writings on gynaecology are attributed to a certain Trota. From',
  'there come the rhyming health rules that half of Europe learns by',
  'heart.',
  '',
  '**Where the wall was permeable, things progressed fastest.** An',
  'uncomfortable sentence for us — and a true one.',
  '',
  'For behind this wall we have always heard the noise: the',
  'barber-surgeon with his basin, the wound doctor who sets the bone,',
  'the midwife who is called in the night, the woman who knows her',
  'herbs without ever having seen a book. We called them unlearned.',
  'They treated more people than all of us together.',
  '',
  'What they can do, whether they heal, and what it is like to have a',
  'knowledge that nobody writes down — that we cannot tell you. To',
  'that, the second voice of this chapter answers: the marketplace',
  'before our gate.',
].join('\n');

/**
 * The marketplace — the world outside the monastery wall: barber-surgeons,
 * wound doctors, midwives and herb women. The oral knowledge that nobody
 * wrote down — and that history has overlooked.
 *
 * Written by DeepSeek (round 7, second pass). This voice too names the
 * uncomfortable spots of its own side itself (additional rule for
 * sensitive topics).
 */
const stimmeDesMarktplatzes = [
  '## Outside the Wall',
  '',
  'The monks tell of their walk through the monastery — gate, garden,',
  'scriptorium, infirmary. Now we tell of the other side of the wall,',
  'for the medicine that happened outside was no less real — it was',
  'only not written down. Whoever cannot write leaves no books behind.',
  'He leaves hands.',
  '',
  'Outside, on the market, at the edge of town, in the alleys: there',
  'the barber-surgeons work, who cut, cup and let blood. There the',
  'wound doctors set bones, sew wounds and cut stones — the craft of',
  'the bloody work that the monks left to the hands, because their',
  'rule forbade them the blood. There the midwives sit at the births,',
  'when the physicians — scholars, men — are not even allowed in. And',
  'there the herb women gather what the forest and the hedge yield,',
  'and know what helps against fever, against worms, against childbed',
  'fever.',
  '',
  '## The Craft: what the hands could do',
  '',
  'Their knowledge was oral and practical, from mistress to apprentice,',
  'from mother to daughter — and it was often astonishingly good. The',
  'wound doctors knew the dangers of the wound long before anyone',
  'spoke of germs: they knew that a wound must stay open and may',
  'suppurate, that one must pull out foreign bodies and sever limbs',
  'when the flesh turns black. The midwives knew how to turn a child',
  'when it lies wrong — a knowledge that the learned medicine of the',
  'universities only reached centuries later. The barber-surgeons knew',
  'the ointments, the plasters, the poultices; the market was one',
  'single open medicine cabinet in which there was trading, testing',
  'and lying — as everywhere people do business.',
  '',
  'What distinguished this world was its usefulness: it measured its',
  'knowledge by the hand, not by the writing. What helped was passed',
  'on; what did not help died with the one who applied it. That is a',
  'cruel form of testing — but it is testing.',
  '',
  '## Where this voice itself fails',
  '',
  'Now the uncomfortable places, for the market too has its account.',
  '',
  '**First: the craft was crude.** Without anaesthesia, without',
  'hygiene, without anatomy the bloody work was a game of chance. Some',
  'wound doctors were skilful craftsmen, others were butchers — and',
  'the patient could not tell the difference before it was too late.',
  'The market knew no examination of the skilled and no punishment for',
  'the quacks, except the reputation.',
  '',
  '**Second: business came before truth.** On the market whatever',
  'could be sold was sold: miracle cures, love potions, universal',
  'salves. Whoever could not read could also not check the bills — and',
  'the herb woman who had helped yesterday could cheat tomorrow.',
  'Charlatanry and craft lay close together, and nobody drew the line.',
  '',
  '**Third: the persecution.** The herb women who guarded the',
  'knowledge in the village were suspected as soon as something went',
  'wrong — and out of the suspicion later grew the witch hunt. The',
  'midwife who failed at a difficult birth could end as a witch. That',
  'is the darkest side of this voice: the oral knowledge had no',
  'protection, no name, no guild — only hands and a reputation that',
  'could also kill.',
  '',
  '## Answer to the Monastery',
  '',
  'The monk has asked at the end of his walk what begins outside the',
  'wall. The answer of this voice: there begins the half of medicine',
  'that wrote no books. The monastery preserved the writings and the',
  'garden; the market preserved the hands and the craft. Neither would',
  'have endured without the other — and both have despised each other.',
  'Perhaps Salerno, the school on the coast, where monastic knowledge',
  'and market knowledge came together, is the point at which the wall',
  'became permeable. Whether a bridge could grow out of it, the',
  'synthesis must answer.',
].join('\n');

/** Chapter 6 of the topic map. */
const klostermedizin = {
  id: 'klostermedizin',
  titel: 'Monastic Medicine',
  epoche: '~500–1200',

  aufhaenger: {
    frage: 'Who healed when Europe no longer had physicians?',
    text: [
      'After the end of the Western Roman Empire there were no more',
      'medical schools in the West, no libraries, hardly anyone who could',
      'read Greek. What remained were the monasteries.',
      '',
      'There three things happened at once: monks laid out gardens in',
      'which healing herbs were planted according to lists. They copied',
      'out texts in their scriptoria that they often did not understand',
      'themselves — and in doing so saved the medicine of antiquity. And',
      'they nursed the sick, because their rule commanded it: for the',
      'sick one must care before all and above all.',
      '',
      'Thus the monasteries became for six hundred years the hospitals,',
      'the pharmacies and the libraries of Europe. And in one of them,',
      'on the Rupertsberg near Bingen, a woman wrote around 1150 two of',
      'the most important healing books of the Middle Ages — although the',
      'Church forbade women to teach: Hildegard of Bingen.',
      '',
      'This chapter asks why people healed who at the same time held',
      'disease to be a dispensation of God — and what this way of',
      'thinking achieved and what it cost.',
    ].join('\n'),
  },

  // The map lives in utils/themen/karten/klostermedizin.js — here only the
  // phase references are translated (phasen → karteHinweise), not the map
  // itself.
  karteHinweise: [
    {
      label: '~529: Montecassino — the rule comes into being',
      hinweis:
        'Benedict of Nursia founds a monastery on a mountain between Rome ' +
        'and Naples and writes a rule for living together. Two of its ' +
        'sentences become important for medicine: guests are to be ' +
        'received as Christ, and for the sick one must care before all ' +
        'and above all. In the same century Cassiodorus has medical ' +
        'writings copied out in Vivarium — with the instruction to ' +
        'preserve them even when nobody understands them any more.',
    },
    {
      label: '~800: St. Gallen, Reichenau and Fulda',
      hinweis:
        'In the Frankish realm of Charlemagne the great monasteries arise ' +
        'north of the Alps. An ordinance for the royal estates, the ' +
        'Capitulare de villis, lists around 795 which herbs are to be ' +
        'planted everywhere. The St. Gallen monastery plan draws around ' +
        '820 a herb garden with sixteen beds next to the physician\'s ' +
        'house, and on the Reichenau Abbot Walahfrid Strabo writes his ' +
        'poem about two dozen healing plants.',
    },
    {
      label: '~1080–1130: Cluny reforms, Salerno teaches',
      hinweis:
        'Cluny in Burgundy becomes the centre of a network of hundreds of ' +
        'monasteries and builds the largest church of the West. At the ' +
        'same time the first medical school of Europe arises in the port ' +
        'city of Salerno — not behind a wall, but in the mixture of ' +
        'monastery, market and Arabic books. Constantinus Africanus ' +
        'brings them from North Africa and translates them as a monk of ' +
        'Montecassino into Latin.',
    },
    {
      label: '~1150: Rupertsberg — Hildegard writes',
      hinweis:
        'Hildegard of Bingen leaves the Disibodenberg with her sisters ' +
        'and, against the will of her abbot, founds her own monastery on ' +
        'the Rupertsberg, where the Nahe flows into the Rhine. Here the ' +
        '"Physica" and "Causae et curae" come into being — a natural ' +
        'history and a healing book. At the same time the Cistercians in ' +
        'the north lay out new monasteries and clear the land.',
    },
  ],

  perspektiven: [
    {
      id: 'kloster',
      name: 'The Voice of the Monastery',
      stimme: 'Opus',
      text: stimmeDesKlosters,
    },
    {
      id: 'marktplatz',
      name: 'The Voice of the Marketplace',
      stimme: 'DeepSeek',
      text: stimmeDesMarktplatzes,
    },
  ],

  synthese: [
    '## Where the two voices meet',
    '',
    'First the common ground. Both voices heal — only with different',
    'hands. The monastery nurses in the infirmary, the market treats in',
    'the alley; both rely on plants, both know the limit of their art,',
    'both admit that often enough they cannot help. Both preserve',
    'knowledge: the monastery writes it down, the market passes it on —',
    'and both know that the one without the other is incomplete.',
    'Salerno, where the school from the monastery and the craft from',
    'the market came together, shows it: the first medical school of',
    'Europe arose exactly there, where the wall became permeable.',
    '',
    '## Where they part ways',
    '',
    'The contradiction begins with the question of what carries the',
    'knowledge. For the monastery it is the writing and the faith: what',
    'is written down endures; what God has created is good. For the',
    'market it is the hand and experience: what helps remains; what',
    'does not help dies. They do not argue about individual remedies,',
    'but about the form of knowledge — and about the contempt: the monk',
    'sees in the barber\'s apprentice a quack, the barber sees in the',
    'monk one who has never seen blood. History decided the dispute',
    'before it was fought: it has only written down the side that could',
    'write. From the market almost nothing is handed down — not because',
    'it knew nothing, but because nobody wrote it down.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'For the seventh time the same pattern — and now the melody becomes',
    'two-voiced: the way of thinking determines the method. In the',
    'monastery the way of thinking is: healing as service, knowledge as',
    'preservation. On the market it is: healing as craft, knowledge as',
    'experience. Two ways of thinking that saw the same disease and',
    'despised each other — and both have helped people.',
    '',
    'And this chapter shows for the first time the power of writing in',
    'history: whoever writes determines what later counts as knowledge.',
    'The midwives, the barber-surgeons, the herb women treated the',
    'majority of the sick for centuries — and in the history books they',
    'do not exist, because nobody copied them down. The question that',
    'runs through this book gains a new sharpness here: who writes the',
    'history of medicine? The answer of this chapter: so far, those who',
    'could write. The next voice that makes itself heard will be loud',
    'and impatient — it comes from the city and is called Paracelsus.',
  ].join('\n'),

  urteil: {
    frage:
      'Would you rather be treated by someone who prays, ' +
      'or by someone who has learned a craft — and what would you ' +
      'miss with the other choice?',
    hinweis: [
      'There is no right and no wrong here. Think about what both really',
      'mean: In the monastery you got warmth, food, rest and someone who',
      'stays — but nobody who tested whether the treatment helps at all.',
      'With the craftsman you got practised hands and experience — but',
      'no explanation of why it happened to you. Think also of today:',
      'attention and skill are still two different things, and few of',
      'the sick get both in the same consultation. What would matter',
      'more to you if you had to choose?',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'What was the monastery garden for?',
      antworten: [
        'Above all for flowers to adorn the church.',
        'It was the pharmacy: healing herbs, planted according to lists.',
        'It served only the kitchen; medicines were bought.',
      ],
      richtig: 1,
      erklaerung:
        'Behind the beds stood a conviction: God has let the medicine ' +
        'grow out of the earth, one only has to know it. Charlemagne had ' +
        'it written down around 795 which herbs were to be planted on his ' +
        'estates; the St. Gallen monastery plan draws around 820 sixteen ' +
        'labelled beds next to the physician\'s house.',
    },
    {
      frage: 'What did the monks do in the scriptorium with medical writings?',
      antworten: [
        'They copied them out — even those they did not understand.',
        'They burned everything that was not Christian.',
        'They translated them into German and tested them on the sick.',
      ],
      richtig: 0,
      erklaerung:
        'Cassiodorus instructed his monks around 550 at least to read and ' +
        'copy Dioscorides, Hippocrates and Galen. Because parchment ' +
        'decays, only what is copied out survives. Nothing was tested in ' +
        'the process: the errors of the ancients were passed on with the ' +
        'same care as their knowledge.',
    },
    {
      frage: 'What is the "Physica" of Hildegard of Bingen?',
      antworten: [
        'Her biography, written by her sisters.',
        'A collection of her songs for the divine service.',
        'A natural history: plants, trees, stones, animals and their uses.',
      ],
      richtig: 2,
      erklaerung:
        'Hildegard (1098–1179) wrote on the Rupertsberg near Bingen the ' +
        '"Physica" and "Causae et curae" on the causes and treatment of ' +
        'diseases. A woman was not allowed to teach in the Church — she ' +
        'legitimised her books as records of what was shown to her in ' +
        'visions; in 1147 Pope Eugene III approved them.',
    },
    {
      frage: 'Were monks allowed to operate in the High Middle Ages?',
      antworten: [
        'Yes, surgery was expressly their task.',
        'No: the Church forbade clerics interventions with the knife.',
        'Only with the written permission of the emperor.',
      ],
      richtig: 1,
      erklaerung:
        'From 1130 councils forbade the monks to practise medicine for ' +
        'money outside the monastery; in 1215 clerics were forbidden to ' +
        'cut and burn. The wound medicine thereby passed to ' +
        'barber-surgeons and wound doctors outside the monastery wall — ' +
        'to the trades that hardly anyone has written down.',
    },
    {
      frage: 'What was special about Salerno?',
      antworten: [
        'It was the largest monastery of the West.',
        'There the rule of Benedict was written.',
        'There the first medical school of Europe arose — outside the ' +
          'monastery walls.',
      ],
      richtig: 2,
      erklaerung:
        'In the port city near Naples, monastic knowledge, the city\'s ' +
        'physicians and Arabic books met from the 10th century on. ' +
        'Constantinus Africanus translated them as a monk of Montecassino ' +
        'into Latin. From Salerno come writings on gynaecology that are ' +
        'attributed to a woman physician named Trota.',
    },
  ],
};

module.exports = klostermedizin;

