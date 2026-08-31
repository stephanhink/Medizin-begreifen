// Chapter 5 — "Avicenna and Arabic Medicine".
//
// The station where antiquity did not get lost. While Greek was being
// forgotten in Europe, the Islamic world collected, translated and
// ordered what Hippocrates and Galen had left behind — and gave it
// back five hundred years later through Toledo. Avicenna's "Canon of
// Medicine" became the textbook of the European universities.
//
// The way-of-thinking analysis is also the core here (operator
// requirement), and in this chapter it is especially delicate: this
// tradition's greatness lay in preserving and ordering — not in
// overturning. Why did they translate? Why did they arrange knowledge
// into a system? Why did they build on Galen instead of testing him?
// For the same reasons that made the Canon so great, it later became
// a shackle. The voice says so itself (additional rule for sensitive
// topics in CLAUDE.md).
//
// LENGTH RULE (operator feedback 24.08.2026): Chapters 1–8 stay short
// and dense — each perspective at most ~250 lines, the chapter as a
// whole at most ~600 lines. The first voice here has about 230 lines;
// the rest of the module leaves Hermes room for the second voice and
// the final synthesis. Line counts are measured in tests/.
//
// Voices (round 6): The FIRST perspective — the keepers from within —
// was written by Opus. The SECOND (the Occident: Europe, which had
// forgotten antiquity and received it back through Toledo) and the
// final synthesis were added by Hermes in the second pass.
// Perspective workflow: CLAUDE.md.
//
// NO REPETITIONS (operator decision 21.08.2026): Chapter 1 is
// structured by "who speaks here → …", chapter 2 opens with a scene,
// chapter 3 tells a day in the life, chapter 4 is an exchange of
// letters. This chapter chooses the fifth dramaturgy: THE JOURNEY OF
// A BOOK. Every section is a station on the way — place and year in
// the title —, told by those who copied, translated and passed the
// book on. The second voice can continue the road on the same street:
// Toledo, Montpellier, Padua.
//
// The texts are stored as line arrays with `.join('\n')` — this keeps
// them readable in the repo at ~72 characters (the operator
// proofreads them here), and utils/markdown.js turns them back into
// flowing text in the app.
//
// CommonJS without UI imports (architecture rule): checkable with
// plain `node`.

/**
 * The Voice of the Keepers — seven stations of a book's journey.
 *
 * Written by Opus (round 6). It tells from within: why translation
 * happened, why ordering happened, why they built on Galen — and
 * exactly where this way of thinking reached its limit. It names the
 * uncomfortable spots itself, instead of leaving them to the
 * counter-voice.
 */
const stimmeDerBewahrer = [
  '## First Station: Antioch, around 800 — what remained',
  '',
  'This book in your hands is on a journey. We have carried it',
  'a stretch of the way, and because one cannot tell from a book',
  'how many hands it has passed through, we will tell you the stations.',
  '',
  'But first the truth about us: **We did not write this book.**',
  'It is Greek. A man from Pergamon composed it, six hundred years',
  'before any of us was born. What you read here is our view of what',
  'we did — a way of thinking, not a truth. Others will tell it',
  'differently.',
  '',
  'In the monasteries of northern Syria, monks copied such books and',
  'translated them into Syriac, because they were training physicians',
  'and the Greek language was disappearing from daily life. In',
  'Gundischapur, over in Persia, physicians of the same tradition',
  'taught. And so the writings lay there: scattered, in fragments, in',
  'copies of copies.',
  '',
  '**Books die quietly.** Papyrus crumbles, parchment is scraped clean',
  'and written over, a library burns, and nobody notices, because no',
  'one knows the language anymore. Part of Galen\'s works was lost on',
  'exactly that path — there was no one left who needed them.',
  '',
  '## Second Station: Bagdad, 830 — why we translated',
  '',
  'Then came the city on the Tigris. It was new, it was rich, and its',
  'caliphs had gathered whatever had been written in Greek, Persian,',
  'Syriac and Sanskrit about healing, astronomy and calculation. The',
  '"House of Wisdom" was library, translators\' workshop and academy',
  'in one.',
  '',
  '**Why did we translate?** Three reasons, and none of them by chance.',
  '',
  '**First: We held the knowledge of the ancients to be a treasure',
  'that must not be lost.** Not as a rival to faith. Whoever',
  'understands the order of the world understands more of its',
  'Creator — that is how we saw it. The first word revealed to our',
  'Prophet is "Read!". A saying attributed to him says: Seek',
  'knowledge, even unto China. Whether he really said it is disputed',
  'among scholars. That we acted accordingly is not.',
  '',
  '**Second: We needed it.** A caliph whose personal physician is a',
  'Christian from Gundischapur does not ask about the physician\'s',
  'faith, but about his skill. Whoever builds a hospital needs',
  'textbooks. Whoever wants textbooks must translate.',
  '',
  '**Third: It suddenly became affordable.** Paper had come to us',
  'from China. Before, a book cost a fortune; now a merchant could',
  'own a library. Without that single invention, nothing of what',
  'followed would have happened.',
  '',
  'One of us shows best what that looked like: **Hunain ibn Ishaq**',
  '(809–873), a Christian physician and the finest translator we had.',
  'He travelled as far as Byzantium in search of manuscripts. For a',
  'single work of Galen he searched Mesopotamia, Syria, Palestine',
  'and Egypt and found half of it in Damascus. He did not translate',
  'word for word, but sense for sense, and he compared several',
  'versions with one another before writing a single line. In passing',
  'he also had to invent the Arabic technical terms — for concepts',
  'that did not yet exist in our language.',
  '',
  'So do not say that translating is copying a text into another',
  'language. It is a decision about what a sentence means. **Whoever',
  'translates, interprets — and every interpretation we made, later',
  'readers took to be the original text.** That is the first',
  'uncomfortable place in our story.',
  '',
  '## Third Station: Rey, around 910 — the doubter among us',
  '',
  'In Rey, near present-day Tehran, worked **al-Razi** (around',
  '865–925), whom Europe would come to call Rhazes. He ran hospitals,',
  'recorded his cases like a bookkeeper, and did two things we will',
  'not keep from you.',
  '',
  'He was the first to describe the difference between **smallpox',
  'and measles** — not from a book, but from the sickbed, by the',
  'course of the illness, by the rash, by the fever. Two diseases',
  'that had previously been one.',
  '',
  'And he wrote a book with the title **"Doubts about Galen"**. In',
  'it he listed where his own observation contradicted the great',
  'teacher — on fever, on vision, on individual remedies. He said, in',
  'so many words: Medicine honours Galen best by continuing to',
  'investigate rather than copying him out.',
  '',
  '**Here our story could have run differently.** A physician doubts',
  'the authority in public, with reasons, out of experience.',
  'Precisely that became a method in Europe seven hundred years',
  'later. Among us it became a single book, which people took note',
  'of and then set aside. **The doubt was there. It simply never',
  'became our way of thinking.**',
  '',
  '## Fourth Station: Buchara and Hamadan, 1020 — why we ordered',
  '',
  'Now to the man whose name stands over this chapter. **Ibn Sina**,',
  'called Avicenna among you, born around 980 near Buchara, died in',
  '1037 in Hamadan. Physician, philosopher, at times a minister, at',
  'times a prisoner, always on the move. He wrote at night, between',
  'affairs of state and flight.',
  '',
  'His main work is the **"Canon of Medicine"**: five books that',
  'bring all knowledge known at the time into an order — the',
  'foundations and the doctrine of the humours; close to eight',
  'hundred individual remedies, each with its effect and use; the',
  'diseases from head to foot, each in its place; and with them',
  'fever, surgery and the compound prescriptions.',
  '',
  '**Why did we arrange knowledge into a system?** Because knowledge',
  'that is not ordered cannot be passed on.',
  '',
  'Imagine you are a physician in a town without teachers. Before',
  'you lie a hundred writings that contradict one another; three say',
  'the fever comes from the bile, two say something else, and no one',
  'tells you in what order you should read. You will not become a',
  'physician. **A book in which everything has its place turns a',
  'mountain of books into a course of study** — and a course of',
  'study into an examination, a hospital, a profession. That is why',
  'the Canon outdid everything else: it could be taught.',
  '',
  '**And why did we build on Galen instead of testing him?** Because',
  'our way of thinking was different from yours. For us, knowledge',
  'as a whole already stood firm — it had once been found, by the',
  'ancients, and lay about scattered and obscured. **The scholar\'s',
  'task was to collect it, to purify it, to order it and to make it',
  'complete; not to overturn it.** Whoever found a gap in the',
  'building filled it. Whoever found a contradiction resolved it —',
  'most often by showing that the ancient had been right after all',
  'and had merely been misunderstood.',
  '',
  'This is the sentence on which this chapter hangs: **For us,',
  'knowledge was tradition and order. For those who came after us,',
  'it became observation and doubt.** Both are ways of thinking. The',
  'first preserves what would otherwise be lost. The second finds',
  'what no one knew yet. We mastered the first. The second we',
  'brushed against and did not seize.',
  '',
  '## Fifth Station: Kairo, 1242 — the man nobody read',
  '',
  'What that costs is shown by a story from Kairo. There worked **Ibn',
  'an-Nafis** (around 1213–1288), writing a commentary on the',
  'anatomy of the Canon. Galen had written: the blood seeps through',
  'invisible pores in the septum of the heart from the right into',
  'the left ventricle.',
  '',
  'Ibn an-Nafis wrote against this: **That septum is solid. There',
  'are no pores there. The blood must take the way through the',
  'lungs.**',
  '',
  'That is the lesser circulation, some four hundred years before an',
  'Englishman by the name of Harvey would describe it. It stands in',
  'our language, in one of our books, in one of our libraries.',
  '',
  'And what happened — nothing. No dispute, no school, no examination',
  'at the corpse. The sentence stood there and was skipped over.',
  'Only in 1924 did an Egyptian physician find it again in a Berlin',
  'manuscript.',
  '',
  '**A system that leaves no gap also has no room for a correction.**',
  'That is not to be blamed on Ibn an-Nafis, nor on Ibn Sina. It is',
  'the price of our way of thinking, and we pay it here for the',
  'first time, visibly.',
  '',
  '## Sixth Station: the reckoning — what remained, what we cemented in',
  '',
  'Before the book travels on, the balance sheet. Both columns.',
  '',
  '**What remains of us.**',
  '',
  '- **The preservation itself.** Without the translators of Bagdad,',
  '  a large part of Hippocrates and Galen would have been lost to',
  '  Europe. That is no small achievement, even if it is a serving',
  '  one.',
  '- **The hospitals.** The Bimaristan of Damascus (1154), the',
  '  houses in Bagdad, Kairo and Cordoba: separate wards, a pharmacy,',
  '  salaried physicians, teaching at the bedside, admission without',
  '  regard to faith or means, paid for out of pious endowments.',
  '  That linking of care, teaching and examination is our own',
  '  invention.',
  '- **The pharmacy as a profession in its own right**, with',
  '  inspected formularies — and with the insight that a remedy',
  '  needs a dose.',
  '- **The surgery of az-Zahrawi** of Cordoba (around 936–1013):',
  '  about two hundred drawn instruments, suturing, cautery,',
  '  lithotomy. Reprinted in Europe into the 18th century.',
  '- **The Canon as order.** A book one can use from the first to',
  '  the last day of a course of study.',
  '',
  '**What we cemented in.**',
  '',
  '- **We preserved Galen together with his errors.** The pores in',
  '  the septum of the heart, the liver as workshop of the blood,',
  '  the four humours — we did not invent them, but we built them so',
  '  beautiful a housing that they held for another five hundred',
  '  years.',
  '- **We did not test authority.** Al-Razi doubted, Ibn an-Nafis',
  '  corrected — both remained isolated cases. We too did not',
  '  dissect human bodies; the prohibition was as strong with us as',
  '  in Rome.',
  '- **The Canon was a compendium, not new thought.** It orders',
  '  excellently. It rarely asks.',
  '- **And the greater it grew, the heavier it weighed.** What in',
  '  Europe was later called "book medicine" and mocked there — the',
  '  physician who looks things up instead of looking for himself —',
  '  was taught among us too.',
  '',
  '## Seventh Station: Toledo, 1187 — where the book goes on',
  '',
  'Here our stretch of the way ends. The book travels on westwards:',
  'via Kairouan, where a monk named Constantinus takes manuscripts',
  'to Salerno with him, via Cordoba and finally to **Toledo**, which',
  'fell to Castile in 1085 — together with its Arabic libraries.',
  '',
  'There, Arabic-speaking Christians, Jewish scholars and Latin',
  'scholars from abroad often work in pairs: one reads aloud in the',
  'vernacular while the other writes Latin. **Gerhard von Cremona**',
  'translates more than seventy works this way, among them the',
  'Canon. He dies in 1187 in Toledo.',
  '',
  'From there the book goes into the lecture halls of Montpellier,',
  'Bologna and Padua and remains the textbook there for about six',
  'hundred years — into the 17th century, and longer at some',
  'universities. A Greek text, rendered into Syriac by Syrians, into',
  'Arabic by Christians and Muslims, into Latin by Jews and Latins.',
  '**Four languages, three religions, one book.**',
  '',
  'What we do not know is what it looked like over there. What it is',
  'like to receive back knowledge one has oneself lost. Whether one',
  'is grateful — or whether one would rather say it had come from',
  'the Greeks anyway. Whether a name like Avicenna is still heard in',
  'Padua as that of a physician from Persia, or only as a title on a',
  'book spine.',
  '',
  'The second voice of this chapter answers that: the Occident —',
  'Europe, which had forgotten antiquity, received it back through',
  'Toledo and for a long time did not say from whom.',
].join('\n');

/**
 * The Occident — the continuation of the same road: Toledo,
 * Montpellier, Padua. Europe, which had forgotten antiquity and
 * received the knowledge back — and remained owing the thanks.
 *
 * Written by DeepSeek (round 6, second pass). This voice too names
 * the uncomfortable spots of its own side itself (additional rule
 * for sensitive topics).
 */
const stimmeDesOkzidents = [
  '## Eighth Station: Toledo, 1187 — the city that read',
  '',
  'The road of the keepers does not end in Toledo — it begins there',
  'anew, only with different luggage. In Toledo, in the 12th',
  'century, scholars from all over Europe sit and do what their',
  'homelands could no longer do: they translate. Arabic manuscripts',
  'are rendered into Latin — not only medicine, but also astronomy,',
  'mathematics, philosophy. The city is a translation factory, and',
  'it has an irreplaceable advantage: here live Christians, Jews and',
  'Muslims, and among them people who command three languages. The',
  'translator Gerhard von Cremona translates more than seventy works',
  'in his lifetime — the Canon of Avicenna, whom from now on we call',
  '"Avicenna", although his name was Ibn Sina.',
  '',
  'What reaches Europe is not a raw material but a finished',
  'building: the ordered knowledge of the ancients, preserved,',
  'purified, labelled. Europe does not have to find it — it only has',
  'to read it.',
  '',
  '## Ninth Station: Montpellier and Padua — the book becomes Europe',
  '',
  'Reading turns into teaching. In Montpellier, Bologna, Padua and',
  'Salerno the first universities of Europe arise — and their',
  'medical backbone is the Canon. For six hundred years, the book of',
  'a man from Buchara is the standard work of European medicine.',
  'Students learn the diseases as Avicenna ordered them; professors',
  'comment on his sentences; the authority of the Canon carries the',
  'young science until it is strong enough to go its own ways.',
  '',
  'One cannot say it often enough: the European university, this',
  'foundation of our science, is unthinkable without the road from',
  'Bagdad to Toledo. It stands on translated manuscripts.',
  '',
  '## Tenth Station: the reckoning — and the thanks that never came',
  '',
  'And here the reckoning of one\'s own side becomes uncomfortable,',
  'for the Occident accepted the gift and forgot the givers.',
  '',
  '**First: we erased the origin.** Avicenna became a Latin name,',
  'the Arabic sources vanished from the footnotes, and in the',
  'textbooks of Europe science liked to begin with the Greeks — and',
  'then, after a dark hole, with us. The centuries in which others',
  'guarded the light became a gap that nobody explained. Whoever',
  'tells history this way steals the keepers their place in it.',
  '',
  '**Second: we took over without testing — and then tested,',
  'without thanking.** The errors of Galen arrived in the same',
  'luggage as his greatness, and Europe adopted them as faithfully',
  'as Bagdad had preserved them. When our own anatomy then showed',
  'that Galen was wrong, we blamed the error on him — and continued',
  'to keep silent about the merit of those who had brought him to',
  'us.',
  '',
  '**Third: the arrogance of the late-born.** We have liked to',
  'describe the Islamic world as a mere middleman — as a keeper who',
  'contributed nothing of its own. That is doubly wrong: it did',
  'more than keep, and even the keeping would not have succeeded',
  'without it. Middlemen who for three hundred years run the only',
  'shop in which knowledge is to be had are no middlemen. They are',
  'the storehouses of civilisation.',
  '',
  '## Answer to the Keepers',
  '',
  'At the end of their journey the keepers asked where their book',
  'goes on. The answer of this voice: it goes into our hands — and',
  'we first guarded it and then denied it. The Canon has been',
  'commented on in Padua, taught in Montpellier and copied in a',
  'hundred libraries, and the men who translated it appear in none',
  'of our histories. Perhaps that is the most honest answer: we owe',
  'this road more than we have ever paid — and the book it sent us',
  'we only passed on once we had learned to question it instead of',
  'admiring it. Whether that is the point at which both reckonings',
  'come together, the synthesis must answer.',
].join('\n');

/** Chapter 5 of the topic map. */
const avicennaArabischeMedizin = {
  id: 'avicenna-arabische-medizin',
  titel: 'Avicenna and Arabic Medicine',
  epoche: '~750–1200',

  aufhaenger: {
    frage: 'Who preserved antiquity for us?',
    text: [
      'In Europe it had grown quiet. After the end of the Western',
      'Roman Empire, ever fewer people could read Greek; the writings',
      'of Hippocrates and Galen lay in monasteries that no longer',
      'read them, or they fell apart.',
      '',
      'Further east, the opposite happened. In Bagdad, from around',
      '750, the caliphs had gathered and translated what Greeks,',
      'Persians and Indians had written down. Physicians built',
      'hospitals with teaching at the bedside. And around 1020 a man',
      'from near Buchara wrote a book that ordered everything people',
      'believed they knew about the human being: Ibn Sina, whom',
      'Europe called Avicenna.',
      '',
      'His "Canon of Medicine" came back to Europe through the',
      'translation school of Toledo and remained the textbook of the',
      'universities there for about six hundred years. Without that',
      'detour through two foreign languages we would know far less',
      'about ancient medicine.',
      '',
      'This chapter tells why an entire world of scholars considered',
      'it their task to rescue and order foreign knowledge — and what',
      'that cost. For whoever preserves an authority also preserves',
      'its errors.',
    ].join('\n'),
  },

  // The map itself lives in utils/themen/karten/avicenna-arabische-medizin.js —
  // here only the phase notes are translated (karteHinweise), not the
  // map itself.
  karteHinweise: [
    {
      label: '~830: the House of Wisdom in Bagdad',
      hinweis:
        'The caliphs of Bagdad have gathered what the Greeks, the ' +
        'Persians and the Indians wrote about healing, astronomy and ' +
        'calculation. Translators such as Hunain ibn Ishaq fetch the ' +
        'manuscripts from Byzantium and from the Syrian monasteries, ' +
        'compare several versions and render them into Arabic — ' +
        'inventing the Arabic technical terms along the way. Paper, ' +
        'adopted from China, makes books affordable for the first ' +
        'time.',
    },
    {
      label: "~1020: Avicenna's Canon takes shape in Persia",
      hinweis:
        'Ibn Sina, called Avicenna in Europe, is born in 980 near ' +
        'Buchara and travels as physician and minister from court to ' +
        'court: Buchara, Gurgandsch, Rey, Hamadan, Isfahan. On the ' +
        'way he writes the "Canon of Medicine" — five books that ' +
        'order all known knowledge, from the foundations over around ' +
        '800 individual remedies to the diseases from head to foot. ' +
        'In 1037 he dies in Hamadan.',
    },
    {
      label: '~1000–1100: Cordoba, Kairouan and Kairo',
      hinweis:
        'Knowledge wanders further west. In Cordoba, az-Zahrawi ' +
        'writes a surgical textbook with drawn instruments that is ' +
        'used in Europe for centuries. In Kairouan, Constantinus ' +
        'Africanus later collects the books he takes to Salerno. In ' +
        'Kairo and Damascus stand hospitals with wards, a pharmacy ' +
        'and teaching — for everyone who comes.',
    },
    {
      label: '~1150–1187: Toledo translates for Europe',
      hinweis:
        'In Toledo, Christian since 1085, Arabic, Jewish and ' +
        'Christian scholars work side by side on the same ' +
        'manuscripts. Gerhard von Cremona here renders the Canon ' +
        'into Latin; he dies in 1187 in Toledo. From there the book ' +
        'goes to Montpellier, Paris, Bologna and Padua — and remains ' +
        'the textbook of the European universities for about 600 ' +
        'years.',
    },
  ],

  perspektiven: [
    {
      id: 'bewahrer',
      name: 'The Voice of the Keepers',
      stimme: 'Opus',
      text: stimmeDerBewahrer,
    },
    {
      id: 'okzident',
      name: 'The Voice of the Occident',
      stimme: 'DeepSeek',
      text: stimmeDesOkzidents,
    },
  ],

  synthese: [
    '## Where both voices meet',
    '',
    'First, the common ground. Both voices travel on the same road:',
    'the keepers bring the book to Toledo, the Occident carries it',
    'on from there — and both acknowledge that without the',
    'translators of Bagdad and Toledo, ancient medicine would have',
    'been lost in Europe. Both see an achievement in the ordering:',
    'the keepers made knowledge teachable, and Europe built the',
    'university out of the textbook. Both admit that the authority',
    'of the Canon also shackled: whoever looked things up instead',
    'of looking for himself learned Galen\'s errors along with it.',
    'And both know the uncomfortable reckoning: the Occident',
    'accepted the gift and forgot the givers.',
    '',
    '## Where they part ways',
    '',
    'The disagreement begins with the question of what knowledge',
    'is. For the keepers, knowledge is tradition and order — a',
    'treasure one guards, purifies and passes on; their own way of',
    'thinking never tested the authority of the ancients. The',
    'Occident eventually made something else out of the same',
    'inheritance: it began to question what was inherited instead',
    'of admiring it — and precisely that became science. So they do',
    'not argue about the past, but about the path: preserve or',
    'doubt? History needed both — but each side credits itself with',
    'both. And they argue about memory: the keepers demand their',
    'place in history; the Occident long refused it to them.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'For the sixth time the same pattern — and now it becomes clear',
    'why it is the melody of the book: the way of thinking',
    'determines the method. On the Nile it was canals, in China qi,',
    'in India the doshas, in Greece the four humours, in Bagdad',
    'tradition and order. Five ways of thinking, five worlds that',
    'are coherent in themselves and have helped people.',
    '',
    'And this chapter adds a new tone to the melody: knowledge',
    'wanders. It never belongs to any culture for good — it is',
    'preserved, translated, forgotten, rediscovered. The medicine',
    'that began on Kos travelled via Alexandria, Bagdad and Toledo',
    'to Montpellier and Padua before it belonged to Europe.',
    'Whoever tells the history of medicine as a chain of inventions',
    'overlooks the roads on which knowledge travelled. And whoever',
    'sees the road understands that the next station of this',
    'journey is already waiting: Europe, beginning to question what',
    'it inherited. His name is Vesalius.',
  ].join('\n'),

  urteil: {
    frage:
      'What is worth more — a book that orders everything, or a ' +
      'question that breaks everything open?',
    hinweis: [
      'There is no right and no wrong here. Remember that both have ' +
      'their price: without the ordering book, the knowledge of ' +
      'antiquity would have been scattered and probably lost; with ' +
      'it, it took centuries until someone looked for himself again ' +
      'instead of looking things up. Think of today as well: ' +
      'guidelines, textbooks and reference works order medical ' +
      'knowledge — and somewhere sits someone whose observation ' +
      'does not fit in. When would you trust the book, and when the ' +
      'observation?',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'What was the "House of Wisdom" in Bagdad?',
      antworten: [
        "A hospital only for the caliph's family.",
        "Library, translators' workshop and academy in one.",
        'The first university with examination regulations in Europe.',
      ],
      richtig: 1,
      erklaerung:
        'From around 750 the caliphs had Greek, Persian and Indian ' +
        'writings collected and rendered into Arabic. Translators ' +
        'such as Hunain ibn Ishaq chased the manuscripts as far as ' +
        'Byzantium, compared several versions and translated by ' +
        'sense rather than word for word. This was also made ' +
        'possible by paper, adopted from China.',
    },
    {
      frage: 'What is the "Canon of Medicine"?',
      antworten: [
        'An oath Arabic physicians swore before being licensed.',
        'A collection of medicinal plants from the garden of Cordoba.',
        "Ibn Sina's five-volume textbook that ordered all known " +
          'medical knowledge.',
      ],
      richtig: 2,
      erklaerung:
        'In it Ibn Sina (Avicenna, around 980–1037) brought together ' +
        'the foundations, remedies, the diseases from head to foot, ' +
        'fever and prescriptions. Through the translation school of ' +
        'Toledo the work reached Europe and remained the textbook of ' +
        'the universities there for about six hundred years.',
    },
    {
      frage: 'Who was the first to describe the path of the blood through the lungs?',
      antworten: [
        'Ibn an-Nafis in Kairo, about 400 years before William Harvey.',
        'Galen in Rome, in the second century.',
        'William Harvey in London, 1628.',
      ],
      richtig: 0,
      erklaerung:
        "Ibn an-Nafis (around 1213–1288) contradicted Galen's " +
        'assumption that the blood seeps through pores in the ' +
        'septum of the heart: that wall is solid, the blood takes ' +
        'the way through the lungs. His writing went unnoticed and ' +
        'was only rediscovered in 1924 in a Berlin manuscript.',
    },
    {
      frage: 'What distinguished the hospitals of the Islamic world?',
      antworten: [
        'They admitted only Muslims.',
        'They had separate wards, a pharmacy and teaching at the bedside.',
        'They were run by the state and charged fees.',
      ],
      richtig: 1,
      erklaerung:
        'Houses such as the Bimaristan an-Nuri in Damascus (1154) ' +
        'combined care, pharmacy and training. They were financed ' +
        'out of pious endowments, and admission was without regard ' +
        'to faith or means. In Europe at the time there were above ' +
        'all monastic hospices without their own medical school.',
    },
    {
      frage: 'Did nobody in Islamic medicine doubt Galen?',
      antworten: [
        'They did: al-Razi wrote a book titled "Doubts about Galen".',
        'No, contradicting the ancients was forbidden without exception.',
        'They did, but only after 1500 and only in Spain.',
      ],
      richtig: 0,
      erklaerung:
        'Al-Razi (around 865–925) held his own observations against ' +
        'Galen and was the first to distinguish smallpox and measles ' +
        'at the bedside. His doubt, however, remained an isolated ' +
        'case: from it no method emerged, as one did in Europe ' +
        'centuries later.',
    },
  ],
};

module.exports = avicennaArabischeMedizin;
