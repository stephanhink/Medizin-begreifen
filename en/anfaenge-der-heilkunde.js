// Chapter 1 — "The Beginnings of Healing".
//
// Shamans, herbalists, the so-called "primitive" peoples — and ancient
// Egypt as the first medicine that was written down. The term "primitive"
// appears in quotation marks throughout the chapter: it is an attribution
// from the outside, from colonial Europe of the 19th century — not a
// self-designation and not a finding (the TONE rule in CLAUDE.md).
//
// Operator decision of 21.08.2026: the originally separate chapters
// "Beginnings" and "Egypt" have been merged into ONE chapter — the core
// is the same (people acted intuitively and treated with natural means),
// and Egypt is the station where this knowledge was first set down in
// writing. No repetitions.
//
// Voices (rounds 1 + 2, merged): The FIRST perspective (the voice of the
// healer woman) was written by Opus; the SECOND (the voice of devaluation
// and rediscovery) and the final synthesis were added by Hermes.
// Perspectives workflow: CLAUDE.md.
//
// The texts are stored as line arrays with `.join('\n')` — this keeps
// them readable in the repo at ~72 characters per line (the operator
// proofreads them here), and utils/markdown.js turns them into flowing
// text in the app.
//
// English translation of utils/themen/anfaenge-der-heilkunde.js (German
// original). The map lives in utils/themen/karten/anfaenge-der-heilkunde.js
// — here only its texts are translated (karteHinweise), not the map itself.
//
// CommonJS without UI imports (architecture rule): checkable with plain
// `node`.

/**
 * The voice of the healer woman — the early art of healing from within,
 * from the first knowledge of herbs to the first written medicine on
 * the Nile.
 *
 * Written by Opus (rounds 1–2). She tells how the knowledge grew, which
 * world view lay behind it, why people did what they did — and what it
 * achieved. She names the uncomfortable places herself instead of
 * leaving them to the counter-voice (additional rule for sensitive
 * topics).
 */
const stimmeDerHeilerin = [
  '## Who speaks here',
  '',
  'This page tells the early art of healing from within — from the',
  'perspective of those who practised it: the herbalists, the shamans,',
  'the women and men to whom one went when the fever would not break.',
  'It is a story, not a transcript of reality. None of them wrote down',
  'what they thought. What we believe we know, we infer from graves,',
  'bones, tools and plant remains — and from what healers among living',
  'peoples tell us to this day. Much of it is well founded. Certain it',
  'is not.',
  '',
  '## How the knowledge grew',
  '',
  'It did not begin with an invention but with a need: someone is in',
  'pain, someone is bleeding, someone is burning with fever. And it',
  'began with an observation — of the kind that takes time and a good',
  'memory. This root tastes bitter and stops the diarrhoea. This bark',
  'brings down the fever. That berry makes one ill, but a thimbleful',
  'makes the sick person sweat. Whoever noticed that once, passed it',
  'on.',
  '',
  'That is the real achievement: **passing it on**. A single human',
  'life is not enough to test a hundred plants. But ten lives are, and',
  'a hundred all the more. Knowledge that passed through generations',
  'from the old woman to her granddaughter, from the healer to her',
  'pupil, is tested knowledge — tested not in a laboratory but on',
  'people, over a very long time. It is called **experiential',
  'medicine**. It gathers what helps and forgets what does not help.',
  'Slowly, imprecisely, but relentlessly.',
  '',
  'And there was learning by watching. Animals eat plants when they',
  'feel ill. Wounds heal better when they are washed out. A broken arm',
  'grows straight again when it is bound between two pieces of wood.',
  'None of it had to be explainable for someone to do it.',
  '',
  '## What we believed — the way of thinking behind the art of healing',
  '',
  'To understand why the healer did what she did, one must know her',
  'world view. It is different from ours, but it is not one without',
  'order.',
  '',
  '**First: the human being does not stand alone.** He belongs to the',
  'clan, to the land, to the dead, to the forces that make the weather',
  'and the luck of the hunt. Health is the state in which everything',
  'is in balance with everything else. Illness is a **disturbance** of',
  'that balance — not merely a defect in the body, but a tear in the',
  'fabric.',
  '',
  '**Second: nothing happens without a reason.** The decisive question',
  'of early healing is not "what does he have?" but "why does it',
  'strike him, and why now?". The world view of the time answered that',
  'question with what it had: with a spirit that had been offended.',
  'With a rule that someone had broken. With something foreign that',
  'had got into the body — an arrow, a worm, an evil eye. Or with the',
  'idea that a part of the person has gone away and must be brought',
  'back.',
  '',
  '**Third: healing means restoring the balance.** Not "killing the',
  'pathogen" — no one knew it —, but bringing back the order.',
  'Everything else follows from this single assumption.',
  '',
  '## Why we did what we did',
  '',
  'From this way of thinking, every tool of the healer is explained.',
  'She did not do three different things — she always did the same',
  'thing, by three paths.',
  '',
  '- **The plant.** It works on the body at the point where it is out',
  '  of balance: it drives out what is too much, it warms what is',
  '  cold, it releases the cramp. That a bark lowers the fever needed',
  '  no theory — it was enough that it happened, again and again.',
  '- **The ritual.** It treats the other part of the disturbance: the',
  '  tear between the sick person and his world. The song, the smoke,',
  '  the drum, the blowing out of the foreign thing from the body —',
  '  for those involved that was no show, but the actual treatment of',
  '  the cause. And the whole clan sat with them. The sick person was',
  '  not alone.',
  '- **The hand.** Setting, splinting, cauterising, cutting, sewing.',
  '  The knife, too, served the same view: what does not belong inside',
  '  must come out.',
  '',
  'For the healer these were not separate things between which she had',
  'to choose. Herb and song belonged together as diagnosis and',
  'prescription do for us. Whoever gave only the herb had done half',
  'the work.',
  '',
  '## Writing changes everything — Egypt',
  '',
  'Then came a people that could hold on to experience. On the Nile',
  'grew the papyrus plant; from its pith the Egyptians pressed sheets,',
  'and on those sheets came what a healer had done for a sick person.',
  'For the first time something was possible that a human memory',
  'cannot do: **collecting**. A recipe from two hundred years ago was',
  'available the same day as one from yesterday. Knowledge no longer',
  'had to be remembered; it could be looked up.',
  '',
  'The Egyptian physician, the **swnu**, was no magician but a scribe:',
  'an official with training, title and rank. There were eye doctors,',
  'dentists, physicians for the body, even a "female overseer of the',
  'female physicians". When the Greek Herodotus travelled the land, he',
  'marvelled: every physician was responsible for only one disease.',
  'He exaggerated — but the titles in the graves give him essentially',
  'right.',
  '',
  'Two scrolls are the most famous books of ancient medicine. The',
  '**Ebers Papyrus**, around 1550 BC, about twenty metres long,',
  'collects about 877 recipes — against abdominal pain, worms, burns,',
  'crocodile bites and hair loss. The **Edwin Smith Papyrus** is a',
  'copy of a much older text: 48 surgical cases, each following the',
  'same pattern — examination, judgement, treatment. It even names',
  'three verdicts: "a disease I will treat", "one I will fight" — and',
  '"a disease that cannot be treated". Pronouncing the third verdict',
  'and giving only care was permitted and written down. It is perhaps',
  'the most sober sentence in all of ancient medicine.',
  '',
  'And the way of thinking remained the same, only more pictorial.',
  'The Egyptians thought of the body as a land with canals, exactly',
  'like their Nile valley: from the heart run the **metu**, and in',
  'them everything flows — blood, air, water, semen. The heart is the',
  'centre of the person; it thinks and speaks. Illness is something',
  'that gets in or collects: a worm, an evil breath, or the **wechedu**,',
  'a putrefying substance that arises in the gut and travels through',
  'the canals. Pus, fever and pain were considered its traces. Hence',
  'the pulse: "It measures his heart", it says in the Ebers Papyrus —',
  'whoever believes that all strands issue from the heart, for him the',
  'pulse is a message. And hence the enemas and emetics: whoever gets',
  'the putrefying substance out before it travels cuts the disease off',
  'at the root.',
  '',
  'The remedies, too, remained those of the healer, only more',
  'precisely applied. On the first day fresh meat was put on the',
  'wound, then honey with fat and a linen bandage — repeated a hundred',
  'times. And the amulet around the neck? Against an intruder one',
  'posts a guard. The amulet is the door one locks before the thief',
  'comes — prevention with the means of a world view in which evil',
  'forces are as real as worms in the gut.',
  '',
  '## The gods, too, healed',
  '',
  'For there was yet a second path, and it was no contradiction. The',
  'Egyptian who felt unwell did not go only to the physician. He went',
  'to the temple and slept there to receive an answer in a dream. He',
  'bought an amulet. He summoned a conjurer of the goddess Selket when',
  'a scorpion had stung him — in Deir el-Medina one such sat beside',
  'the physician on the same payroll. Illness was for him never merely',
  'a state of the body, but also a sign: a trial, a word of the gods',
  'that wanted to be decoded. Healing then meant putting the',
  'relationship back in order — appeasing the angry god, driving out',
  'the evil spirit. The same world view as everywhere, only with',
  'officials: the incantation was the second part of the medicine, the',
  'holy water carried the power of the words into the sick person, and',
  'the temple gave the human being what the clan had given the sick in',
  'hunter times: he was not alone.',
  '',
  '## What it achieved',
  '',
  'Much of it worked — measurably, traceable to this day.',
  '',
  '**The plants.** Willow bark contains the substance from which',
  'aspirin was later made. The opium poppy carried within it the opium',
  'from which morphine came — to this day our strongest painkiller.',
  'Cinchona bark, for generations the knowledge of the people of the',
  'Andes, became quinine against malaria. From the arrow poison curare,',
  'with which indigenous hunters of South America paralysed their prey,',
  'came an agent that first made modern surgery possible. And the',
  'foxglove, a household remedy of English folk medicine, entered heart',
  'medicine as digitalis. No laboratory invented these substances.',
  'They were found — by people without a microscope, with nothing but',
  'attention and time.',
  '',
  '**Wound care.** Honey draws water out of germs, is acidic and forms',
  'small amounts of hydrogen peroxide — it really inhibits bacteria.',
  'Medical honey is given again today on wounds that heal poorly; the',
  'research on it is sound, though it is no substitute for',
  'antibiotics. Myrrh has a pain-relieving and germ-inhibiting effect',
  'and is still in mouthwashes today.',
  '',
  '**Surgery and the hand.** The oldest skull in Europe with a',
  'trepanation, an opening of the cranial vault, comes from Ensisheim',
  'in Alsace, around 5100 BC. The man had two such openings — and the',
  'bone edges are smoothly healed. In Peru hundreds of such skulls',
  'were found; in a large part of them the bone shows the same',
  'healing. Someone opened a living head with stone tools, and the',
  'person stood up again. From a Theban grave also comes a toe made of',
  'wood and leather, carefully worked, with signs of wear: a',
  'prosthesis that was worn.',
  '',
  '**The precise description.** The Edwin Smith Papyrus names the',
  'brain, its membranes and its convolutions — the first known mention',
  'altogether. It describes that an injury to one side of the head',
  'paralyses the other side of the body — and how to reset a',
  'dislocated jaw, exactly as it is still done today.',
  '',
  '**And that which is harder to grasp.** Care, rest, expectation, the',
  'certainty that someone is looking after you — that changes how a',
  'person experiences pain and how he recovers. Today\'s research',
  'calls it the placebo effect and the care effect and finds it again',
  'and again in its studies. The healer did not call it that. She used',
  'it every day — and the temple on the Nile turned it into an art of',
  'its own.',
  '',
  '## Where we failed',
  '',
  'It would be a poor story that kept silent about it. This healing',
  'had hard limits, and they cost lives.',
  '',
  'Every second or third child died before growing up. Women died in',
  'childbed. A wound that became inflamed, a burst appendix, pneumonia',
  'in winter — against that there was nothing to be done, nothing at',
  'all. Even Egypt\'s knowledge did not help against the great plagues:',
  'in mummies tuberculosis, malaria, schistosomiasis and calcified',
  'arteries have been detected. The schistosomiasis came with the',
  'irrigation water — precisely the water from which the land lived.',
  '',
  'And anatomy stayed absent. One might think that a people that opens',
  'and eviscerates its dead must know the body. It was not so. The',
  'embalmers were their own, little-regarded trade; no physician stood',
  'beside them and drew along. The brain, which one pulled out through',
  'the nose, was considered unimportant. Heart and canals remained an',
  'idea, not a finding.',
  '',
  'The world view itself also had a price. If illness is a tear in the',
  'fabric, then perhaps someone caused it — and then one looks for',
  'who. Out of the question "why does it strike him?" much misfortune',
  'has grown over the millennia: suspicions, expulsion, later the',
  'persecution of healer women as "witches". That belongs to this way',
  'of thinking, even if it is unpleasant.',
  '',
  'And the remedies themselves were risky. Between the dose that helps',
  'and the one that kills, there is little room with foxglove and',
  'opium poppy. In the Egyptian recipes stand donkey dung and fly',
  'dirt — following the logic of the repulsive; on an open wound,',
  'however, dung is a path to tetanus. And where the incantation',
  'replaced the treatment instead of accompanying it, time passed',
  'that no one had. Some of what was passed down through generations',
  'never helped and was still passed on, because most illnesses pass',
  'on their own and memory then attaches itself to the remedy. Not',
  'every old knowledge is good knowledge. Old only means old.',
  '',
  '## What became of this knowledge',
  '',
  'At the end stands a question that this voice can no longer answer.',
  'What happened to this healing when others came who thought',
  'differently? When scholars in Europe in the 19th century began to',
  'call whole peoples "primitive" — a word no one gave himself — and',
  'their art of healing along with it? What was lost in the process,',
  'and what has modern medicine, without always saying so, taken over',
  'from precisely these hands?',
  '',
  'The second voice of this chapter answers that: the view of',
  'devaluation — and of the late rediscovery.',
].join('\n');

/**
 * The voice of devaluation and rediscovery — how the later, "modern"
 * world dismissed early healing knowledge as "primitive" — and what it
 * owes it today.
 *
 * Written by DeepSeek (round 1, second pass). It names the uncomfortable
 * places of its own side itself: the devaluation was not only evil
 * intent, and today's admiration is not only insight (additional rule
 * for sensitive topics).
 */
const stimmeDerAbwertungUndWiederentdeckung = [
  '## Who speaks here',
  '',
  'This voice has two faces, and it says so from the start. The first',
  'face is the Europe of the 19th century: scholars, missionaries,',
  'physicians and colonial officials who wrote about the world they',
  'were just subjugating. They called whole peoples "primitive" — and',
  'their art of healing along with them. The second face is today\'s',
  'research, which rediscovers precisely this knowledge and takes it',
  'seriously. It is the same voice that first devalued and then',
  'marvelled. Honestly, that belongs together.',
  '',
  '## How the knowledge was devalued',
  '',
  'The devaluation did not begin with a judgement about individual',
  'remedies, but with a judgement about whole peoples. Whoever had no',
  'writing, so it was thought, had no thought either; whoever lived in',
  'a different world view had no knowledge either. "Primitive" was',
  'thereby no finding but a rank — whoever used the word placed',
  'himself at the top.',
  '',
  'The consequences were concrete. Knowledge of healing plants that',
  'had grown over millennia was not collected but displaced: the',
  'colonial masters\' own medicine was to take its place. Healers lost',
  'their standing, their schools, often their names. And when a remedy',
  'did work, it was taken — without the name of the one who had found',
  'it. The cinchona bark of the Andean peoples became "the Europeans\'',
  'quinine"; the hunters\' curare was "discovered" as if it had not',
  'been there before. That was later called biopiracy: taking without',
  'naming whom one owes it to.',
  '',
  '## The way of thinking of the devaluation — why did they do it?',
  '',
  'This way of thinking, too, should be understood, not merely',
  'condemned. Whoever set out in the 19th century carried real',
  'successes in his baggage: vaccination against smallpox, the first',
  'steps of hygiene, the beginnings of anatomy. That one\'s own',
  'medicine was superior to the other\'s was then no evil claim but a',
  'daily experience. Added to that was the belief in progress: whoever',
  'believed in the one, just-won reason, for him every other way of',
  'thinking was an error or a preliminary stage. And the economic',
  'interests came: colonial rule was harder to sell if one at the same',
  'time envied the subjugated their knowledge. Thus envy, superiority',
  'and profit became a single word: "primitive".',
  '',
  '## What this way of thinking overlooked',
  '',
  'It overlooked that the healer\'s remedies were not superstition but',
  'tested experience. Modern research has caught up, substance by',
  'substance: from willow bark came aspirin, from the opium poppy',
  'morphine, from cinchona bark quinine, from the foxglove digitalis,',
  'from curare the muscle relaxant of surgery. And it continues:',
  'artemisinin against malaria, one of the most important',
  'active-agent discoveries of recent decades, comes from the mugwort',
  'that the Chinese healing tradition has used for centuries.',
  'Pharmaceutical companies comb the world\'s healing knowledge for new',
  'substances to this day — and the research on care and expectation',
  '(what the healer used every day) confirms that healing is more than',
  'the active agent.',
  '',
  'Something has also moved legally: since the Nagoya Protocol,',
  'countries and peoples must give their consent before their',
  'traditional knowledge is used for research and business. The',
  'question of whom the knowledge belongs to is today a legal dispute',
  '— a hundred and fifty years ago no one would have thought of asking',
  'it.',
  '',
  '## Where this voice itself fails',
  '',
  'Now the uncomfortable places, for this voice has them. First: the',
  'rediscovery is also a fashion. Whoever today raves about "ancient',
  'wisdom" sometimes does the same as the devaluers, only with the',
  'opposite sign — he places the old at the top without testing it.',
  'But not everything old is good, just as not everything old is bad.',
  '"Old only means old" applies in both directions.',
  '',
  'Second: the devaluation also had an honest side. Colonial medicine',
  'brought vaccinations and hygiene where they did not exist and saved',
  'lives — often with the same hands that shortly after despised the',
  'knowledge of others. That cannot be cleanly separated, and whoever',
  'separates it cleanly tells again a victor\'s or a victim\'s story.',
  '',
  'Third: even the rediscovery itself is not free of appropriation.',
  'Whoever markets an "indigenous" remedy today does not automatically',
  'pay those whose grandmothers knew it. The Nagoya Protocol is a',
  'beginning, not an end.',
  '',
  '## What this voice answers the healer',
  '',
  'At the end of her text the healer asked: What happened to my',
  'knowledge when others came who thought differently? The answer of',
  'this voice is: part of it was destroyed, part of it was taken',
  'without naming the name — and part of it is today, late and not',
  'without guilt feelings, taken seriously again. Whoever wants to',
  'know what this knowledge was worth must read both sentences at the',
  'same time. The synthesis attempts exactly that.',
].join('\n');

/** Chapter 1 of the topic map. */
const anfaengeDerHeilkunde = {
  id: 'anfaenge-der-heilkunde',
  titel: 'The Beginnings of Healing',
  epoche: 'From hunters and gatherers to ancient Egypt',

  aufhaenger: {
    frage: 'Who invented the first medicine?',
    text: [
      'The question has a catch: there is no answer with a name in it.',
      'Long before anyone knew writing, cities or physicians, people',
      'sat with the sick, cooled fevers, set bones and gave herbs.',
      'They did it in Europe, in Africa, in Asia, in the Americas —',
      'everywhere people lived, and at roughly the same time.',
      '',
      'And they acted intuitively: they observed, tried things out and',
      'passed on what helped — with the natural means they knew:',
      'plants, water, warmth, their own hands. In Egypt this experience',
      'became a writing for the first time: books with hundreds of',
      'recipes, physicians with specialisms — and alongside them',
      'prayers, gods and amulets, without which no recipe was complete.',
      '',
      'Some of it worked astonishingly well. Some of it did not work at',
      'all. Both belong to the story. This chapter goes back to where',
      'medicine begins — and asks what the people of that time thought',
      'when they had a sick person before them.',
    ].join('\n'),
  },

  // The map lives in utils/themen/karten/anfaenge-der-heilkunde.js —
  // here only its texts are translated (karteHinweise), not the map
  // itself.
  karteHinweise: [
    // Phases from the map.
    {
      label: 'Around 12,000 years ago',
      hinweis:
        'Hunters and gatherers — and everywhere people who cared for the sick. ' +
        'The map shows only a section of the world: China, the Americas, ' +
        'Australia and Africa south of the Sahara are missing. People healed there too.',
    },
    {
      label: 'Around 10,000 BC: the first villages',
      hinweis:
        'Settling down means: more food, more people in a confined space — ' +
        'and new diseases. The art of healing gets more to do.',
    },
    {
      label: 'Around 3500–1500 BC: the early high cultures',
      hinweis:
        'On the Nile, the Euphrates, the Tigris and the Indus cities arise — and with them ' +
        'people who only heal: the first physicians with a title.',
    },

    // Info points from the map.
    {
      label: 'Shanidar',
      hinweis:
        'In this cave in the Zagros mountains lay Neanderthal graves. One of the ' +
        'dead, "Shanidar 1", had a withered arm, a crushed facial bone ' +
        'and was probably blind in one eye — and still lived with it for ' +
        'years. Alone he would hardly have managed: someone cared for ' +
        'him. The famous "flower grave" with pollen from healing plants, by contrast, is ' +
        'disputed — the pollen could also have been carried in by rodents.',
    },
    {
      label: 'Ensisheim',
      hinweis:
        'In Alsace the oldest skull in Europe so far was found, with two ' +
        'trepanations — openings in the bone, around 5100 BC. The edges ' +
        'are smoothly healed: the man survived both procedures and lived ' +
        'long afterwards. Why the skull was opened, no one knows for ' +
        'sure: against headache, after a blow to the head — or to let ' +
        'something out that one suspected was there.',
    },
    {
      label: 'Ötzi',
      hinweis:
        'The man from the ice died around 3300 BC at the Tisenjoch. On his ' +
        'equipment hung two pieces of birch polypore, a tree fungus, on ' +
        'leather straps. In his gut were eggs of the whipworm, his ' +
        'joints were worn, and 61 tattoos lie conspicuously often ' +
        'precisely there. Whether the fungus was a medicine and the ' +
        'lines a treatment is a well-founded supposition — proven it is not.',
    },
    {
      label: 'Jericho',
      hinweis:
        'One of the oldest settlements in the world: already around 9000 BC ' +
        'people lived here together permanently, later behind a wall. Where ' +
        'many live closely together, diseases spread more easily — and ' +
        'where someone stays, he can nurse the sick for weeks. Both begin ' +
        'here: the new afflictions and the lasting care.',
    },
    {
      label: 'On the Nile',
      hinweis:
        'Long before Egypt described its famous papyri, people on the ' +
        'Nile cared for wounds, fractures and fevers. The skeletons show ' +
        'splinted arms and healed fractures. From the experiential ' +
        'knowledge of the villages there later became a profession with ' +
        'name, rank and writing — the chapter on Egypt tells that story.',
    },
    {
      label: 'Mohenjo-Daro',
      hinweis:
        'On the Indus stood around 2500 BC a city with brick-built baths, ' +
        'wells and drainage channels in almost every house. No one knew ' +
        'bacteria — nevertheless people kept dirt and drinking water ' +
        'apart. Cleanliness was here order and purity, not hygiene in ' +
        'today\'s sense. Worked it probably did all the same.',
    },

    // Movements from the map.
    {
      label: 'Villages and farming to the west',
      hinweis:
        'From the Fertile Crescent, farming and fixed villages spread ' +
        'over Anatolia and the Balkans to Central Europe. With the fields ' +
        'travelled the useful plants — and with them the knowledge of ' +
        'which plant by the wayside helps against what. Travelling ' +
        'along, however, were also new diseases: cramped villages, ' +
        'stored-produce pests and animals in the house brought ' +
        'afflictions that hunters and gatherers hardly knew.',
    },
    {
      label: 'Villages and farming to the east',
      hinweis:
        'The same movement ran east: over the Zagros mountains and the ' +
        'Iranian highlands all the way to the Indus valley. Healing ' +
        'plants, hand grips and ideas about disease travelled with the ' +
        'people — knowledge has never stayed in one place. What became ' +
        'of it in India, the later chapter on Ayurveda tells.',
    },
  ],

  perspektiven: [
    {
      id: 'heilerin',
      name: 'The Voice of the Healer Woman',
      stimme: 'Opus',
      text: stimmeDerHeilerin,
    },
    {
      id: 'wiederentdeckung',
      name: 'The Voice of Devaluation and Rediscovery',
      stimme: 'DeepSeek',
      text: stimmeDerAbwertungUndWiederentdeckung,
    },
  ],

  synthese: [
    '## Where both voices meet',
    '',
    'First the common ground, and it is more than one would think.',
    'Both voices agree on the facts: the trepanation was survived —',
    'that stands in the bones. Cinchona bark, willow bark, opium poppy,',
    'foxglove and curare worked before anyone named their substances.',
    'Honey on the wound was no fashion but experience — research',
    'confirms it to this day. Both acknowledge that this knowledge',
    'arose through observation and passing on — the healer calls it',
    'experiential medicine, the rediscovery calls it tested',
    'experience. And both see that healing is more than the',
    'intervention: the care, the expectation, the feeling of not being',
    'alone. The healer used it, the temple on the Nile made an art of',
    'it, research measures it. They mean the same thing.',
    '',
    '## Where they part ways',
    '',
    'The contradiction begins with interpretation. For the healer her',
    'art is a self-consistent way of thinking: illness as a',
    'disturbance of the balance, healing as the restoration of order —',
    'in Egypt painted out as a body-land with canals and putrefying',
    'substance. For the voice of devaluation the same thinking was a',
    'preliminary stage that modern medicine had to overcome — and the',
    'voice of rediscovery must ask itself whether it does not today,',
    'conversely, elevate the old. They thus quarrel not about the',
    'plants but about the question of who decides what counts as',
    'knowledge: the experience of a hundred generations or the',
    'laboratory of a hundred years. And they quarrel about the balance',
    'sheet of the devaluation: what was destroyed cannot be brought',
    'back — but colonial medicine also brought vaccinations and',
    'hygiene, and whoever keeps silent about that tells again only one',
    'side.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'At the beginnings one sees for the first time what will accompany',
    'all the following chapters: The way of thinking determines the method.',
    'Whoever understands illness as a disturbance heals',
    'differently than whoever understands it as a pathogen — and the',
    'question "why should it help?" has in every age a different,',
    'self-consistent answer. The dispute over interpretation is older',
    'than medicine itself.',
    '',
    'And something else begins here: the healer had a tool that no',
    'laboratory has built in replica — the certainty that someone is',
    'looking after you. Modern medicine measures it as the care effect',
    'and has trouble giving it a place in its daily routine. Perhaps',
    'that is the first point at which a working together would be not',
    'only possible but necessary.',
    '',
    'The Greeks, who next step onto the stage, will inherit the',
    'tension: Hippocrates cuts himself loose from the gods — and his',
    'people build temples for the healing god Asclepius in which the',
    'sick sleep, exactly as on the Nile. The question remains: what is',
    'a remedy worth that does not reach the body but reaches the',
    'person?',
  ].join('\n'),

  urteil: {
    frage: 'What would you accept from a healer — and what not?',
    hinweis: [
      'There is no right and no wrong here. Think of the herb against',
      'fever, of the opened cranial vault, of the song at the bedside',
      'of the sick, of the hand that splints the arm — and of the',
      'Egyptian physician who at the same time spoke prayers. Where',
      'would you agree, where would you hesitate — and on what do you',
      'base the difference?',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Is it true that people in the Stone Age could survive an ' +
        'opening in the skull (a trepanation)?',
      antworten: [
        'No, such a procedure always ended fatally.',
        'Yes — in many finds the bone edges are healed.',
        'Trepanations have only existed since the Middle Ages.',
      ],
      richtig: 1,
      erklaerung:
        'Healed bone edges only grow in the living. The skull from ' +
        'Ensisheim in Alsace (around 5100 BC) bears two healed ' +
        'openings; in Peru hundreds more examples were found.',
    },
    {
      frage: 'How extensive is the Ebers Papyrus (around 1550 BC)?',
      antworten: [
        'About two metres long, with roughly 30 recipes.',
        'About twenty metres long, with roughly 877 recipes and sections.',
        'About a hundred metres long, with roughly 5000 recipes.',
      ],
      richtig: 1,
      erklaerung:
        'The roll is about twenty metres long and contains roughly 877 ' +
        'sections — recipes against abdominal pain, eye ailments, worms, ' +
        'burns and much more. It was bought in Luxor in 1873 ' +
        'and lies today in Leipzig.',
    },
    {
      frage:
        'Is it true that honey on wounds is also used in today\'s ' +
        'medicine?',
      antworten: [
        'Yes — medical honey is given on poorly healing wounds and ' +
          'burns.',
        'No, honey on wounds is considered pure superstition today.',
        'Only in Egypt, nowhere else.',
      ],
      richtig: 0,
      erklaerung:
        'Honey draws water out of germs, is acidic and forms small ' +
        'amounts of hydrogen peroxide — it inhibits bacteria. Specially ' +
        'prepared honey is therefore used in wound care; ' +
        'a substitute for antibiotics it is not.',
    },
    {
      frage:
        'Which remedy against malaria goes back to the knowledge of ' +
        'indigenous peoples of South America?',
      antworten: [
        'Penicillin from the mould.',
        'Quinine from the bark of the cinchona tree.',
        'Insulin from the pancreas.',
      ],
      richtig: 1,
      erklaerung:
        'The cinchona bark was known in the Andes long before Europeans ' +
        'came to know it. From it came quinine — for centuries the ' +
        'most important remedy against malaria.',
    },
    {
      frage:
        'Was "primitive peoples" a designation that these peoples gave ' +
        'themselves?',
      antworten: [
        'Yes, they understood themselves as simple people.',
        'No — the term came from outside, from the Europe of the ' +
          '19th century.',
        'The term comes from the Stone Age.',
      ],
      richtig: 1,
      erklaerung:
        '"Primitive" is an attribution of European scholars of the ' +
        'colonial era. It does not describe the healing of these peoples ' +
        'but the view of those who coined the term.',
    },
  ],
};

module.exports = anfaengeDerHeilkunde;
