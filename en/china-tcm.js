// Chapter 2 — "China and TCM".
//
// Chinese medicine is the oldest healing tradition practised without
// interruption to this day. This chapter does what the operator asked
// for: it analyses its WAY OF THINKING at length — not only WHAT was
// done, but WHY. The worldview (qi, yin and yang, the Five
// Transforming Phases, the meridians), the logic of justification
// behind needle, prescription, pulse and breath — and the honest
// balance of effects: what research supports today and what is not
// measurable or is disputed (CLAUDE.md, analysis of the way of
// thinking).
//
// Voices (round 3): The FIRST perspective — Chinese medicine from
// within — was written by Opus. The SECOND (the Western view: wonder,
// scepticism, scientific scrutiny) and the final synthesis were added
// by Hermes in the second pass. Perspectives workflow: CLAUDE.md.
//
// NO REPETITIONS (operator's decision of 21.08.2026): Chapter 1
// structures its voices by "Who speaks here → How knowledge grew →
// Way of thinking → …". This chapter deliberately chooses a different
// dramaturgy: it opens with a scene at the wrist, unfolds the
// worldview in four concepts and develops the logic of justification
// along four "why" questions.
//
// The map lives in utils/themen/karten/china-tcm.js — of a different
// kind (geometry instead of narrative), therefore in its own file.
// Here only the map's texts are translated (phases, points,
// movements) as karteHinweise, not the map itself.
//
// The texts are stored as line arrays joined with `.join('\n')` — this
// keeps them readable in the repo at ~72 characters (the operator
// proofreads them here), and utils/markdown.js turns them back into
// flowing text in the app.
//
// CommonJS without UI imports (architecture rule): verifiable with
// plain `node`.

/**
 * The voice of Chinese medicine — the tradition from within.
 *
 * Written by Opus (round 3). It explains its worldview in its own
 * words, justifies its methods from that logic, shows how the
 * knowledge came into being — and names the uncomfortable spots of its
 * own narrative itself, instead of leaving them to the opposing voice
 * (additional rule for sensitive topics in CLAUDE.md).
 */
const stimmeDerChinesischenMedizin = [
  '## Three fingers on the wrist',
  '',
  'A man comes in. He has been tired for months, sleeps badly, his',
  'stomach presses after eating. The physician asks him to sit down',
  'and places three fingers on his wrist — first the right, then the',
  'left. He remains silent for quite a while. Then he asks him to',
  'stick out his tongue and examines it: colour, shape, coating,',
  'moisture. He asks about his sleep, his bowel movements, his thirst,',
  'about cold feet, about his mood in the evening, about the taste in',
  'his mouth.',
  '',
  'No blood count, no ultrasound, no fever thermometer. In the end he',
  'does not say "you have gastritis" either. He says something that,',
  'to Western ears, first sounds like poetry: the centre is weak,',
  'there is dampness, and the qi of the liver is running crosswise.',
  'Then he writes out a prescription — twelve plants, in specific',
  'amounts, in a specific order of rank — and perhaps sets a few',
  'needles.',
  '',
  'This page tells what that physician is thinking as he does so. It',
  'tells it from within, in the words of the tradition itself, and it',
  'does not claim to be the truth — it explains a way of thinking.',
  'Whoever wants to understand it must, for a while, allow a different',
  'question than the familiar one. Western medicine asks: **What is',
  'broken?** Chinese medicine asks: **What is out of balance?**',
  'Everything else follows from this one difference.',
  '',
  '## Qi — a word that cannot be translated',
  '',
  'At the beginning stands a concept at which every translation',
  'fails. **Qi** is usually rendered as "vital energy", and that is',
  'misleading: it is not energy in the sense of physics, not a',
  'current one could measure. The character originally shows the',
  'steam above boiling rice. What is meant is both at once: the fine',
  'substance and its movement.',
  '',
  'One comes closest to the concept by reading it as **function**.',
  'Not: "What is the heart?", but: "What does the heart do, and does',
  'it do it strongly, evenly, in the right place?" Qi is what warms,',
  'what moves, what holds together, what transforms, what protects.',
  'Where qi flows abundantly and freely, a person is healthy. Where',
  'there is too little of it, one grows tired, feels cold, digests',
  'poorly. Where it stagnates, pain arises.',
  '',
  'From this follows the most important sentence of this medicine,',
  'and it is millennia old: **"Where it flows, there is no pain;',
  'where there is pain, it does not flow."** In this way of thinking,',
  'pain is not a signal from damaged tissue but a blockage. And a',
  'blockage is not treated by switching off the signal but by',
  'dissolving it.',
  '',
  'Alongside qi stand three other fundamental quantities that',
  'together make up the human being: **Xue**, the blood, which',
  'nourishes and moistens; **Jing**, the essence, a kind of innate',
  'reserve that is slowly used up over a lifetime; and **Shen**, the',
  'spirit, which shows itself in the eyes and in sleep. Whoever',
  'assesses a person assesses all four — not a single organ.',
  '',
  '## Yin and yang — two poles, one balance',
  '',
  'The second tool is a pattern of thought, not a thing. **Yin and',
  'yang** are neither substances nor powers. They are a pair of',
  'concepts with which any phenomenon can be placed in a relation.',
  '',
  'Originally the two words meant the shady side and the sunny side',
  'of a mountain slope — and in that one can already see everything',
  'essential. First: they are not opponents but two sides of the same',
  'thing. A mountain without a shady side is no mountain. Second:',
  'they are always relative. The same side is shadow in the morning',
  'and sun in the afternoon. Third: they merge into one another. When',
  'the sun stands at its highest, the way back has already begun.',
  '',
  'Transferred to the human being: **yin** is the cooling, moist,',
  'resting, nourishing, material — the inner and the below. **yang**',
  'is the warming, dry, moving, driving, functional — the outer and',
  'the above. Health is not "plenty of yang" or "plenty of yin" but',
  'their mobile balance.',
  '',
  'And precisely for that reason this medicine knows **four** basic',
  'disturbances where a simpler view would see only two. There can be',
  'too much yang (genuine heat) — or too little yin, so that the',
  'present warmth is no longer cooled (emptiness heat). Both feel hot',
  'to the sick person, but they are treated in opposite ways: in the',
  'first case one cools down, in the second one nourishes up. The',
  'same holds, mirrored, for cold. Whoever fails to recognise this',
  'difference makes the sick person sicker with an otherwise correct',
  'remedy. That is why this tradition puts so much effort into',
  'diagnosis and works so little with ready-made standard',
  'prescriptions.',
  '',
  '## The Five Transforming Phases — wood, fire, earth, metal, water',
  '',
  'Yin and yang divide the world in two. The **Five Elements** divide',
  'it more finely. The usual name is actually already a',
  'mistranslation: it is not about building materials out of which',
  'the world is made, but about five **transforming phases** — five',
  'states that a process passes through, just as the year passes',
  'through the seasons.',
  '',
  '- **Wood** — the rising, the sprouting, spring, the beginning.',
  '- **Fire** — the peak, the heat, summer, the spreading.',
  '- **Earth** — the centre, the ripening, the transformation, the',
  '  nourishing.',
  '- **Metal** — the contracting, the clarifying, autumn, the',
  '  harvesting.',
  '- **Water** — the sinking, the storing, winter, the resting.',
  '',
  'To each phase belongs a functional circle — wood to the liver,',
  'fire to the heart, earth to the spleen, metal to the lungs, water',
  'to the kidneys — and along with it a season, a taste, a colour, an',
  'emotion, a sense organ. Here an honest warning is necessary, and',
  'it comes from the tradition itself: these organ names do not mean',
  'the organs of anatomy. The "spleen" of Chinese medicine is the',
  'entire process of digestion and of transforming food into qi —',
  'with the organ a surgeon removes it has little to do. Whoever',
  'reads the terms anatomically understands no word correctly.',
  '',
  'The five phases are held together by two cycles, and these are the',
  'actual tool:',
  '',
  '- The **generating cycle**: wood nourishes fire, fire becomes ash',
  '  and thus earth, earth brings forth metal, metal carries water',
  '  (on cold metal water condenses), water again nourishes wood.',
  '  Each phase is the mother of the next.',
  '- The **controlling cycle**: wood penetrates and exhausts the',
  '  earth, earth dams the water, water extinguishes the fire, fire',
  '  melts the metal, metal cuts the wood. Each phase keeps another',
  '  in check.',
  '',
  'That sounds like symbolism, but in everyday practice it is a',
  'thinking tool for chains of causes. An example of how a physician',
  'uses it: a person is permanently irritable and tense — that is',
  'wood, the liver. When the wood becomes too strong, it attacks the',
  'earth via the controlling cycle, the digestion. The sick person',
  'gets pressure in the stomach and flatulence as soon as he gets',
  'angry. The physician then treats not the stomach but the wood.',
  'Whether one shares this explanation or not — the observation that',
  'anger strikes the stomach is as old as humankind, and this',
  'medicine has brought it into a system instead of dismissing it as',
  'a side issue.',
  '',
  '## The meridians — where qi has its paths',
  '',
  'That leaves the fourth building block: the **meridians**, in',
  'Chinese *jingluo*, better rendered as **channels**. They are the',
  'network of pathways on which qi and blood run through the body:',
  'twelve main meridians, each assigned to a functional circle, plus',
  'eight extraordinary vessels and a fine network of branches. On',
  'them lie the classical acupuncture points, a good three hundred',
  'and sixty in number.',
  '',
  'The oldest description we have is a stroke of luck for',
  'archaeology: in a tomb at Mawangdui, sealed in 168 BC, lay silk',
  'scrolls that already knew eleven such vessels — nothing is said',
  'there yet about needles; treatment was with warmth. The system',
  'thus grew, it was not invented.',
  '',
  'And the uncomfortable question right behind it, because it belongs',
  'to this way of thinking: no, there is no anatomical structure one',
  'could cut open and present as a meridian. No anatomist has ever',
  'found a meridian. Seen from within the tradition, this is no',
  'objection but a confusion of levels — the meridian describes no',
  'tube but a connection: that a pressure point on the lower leg',
  'regularly acts on the belly, that complaints travel along a',
  'recognisable line, that certain pairs of points together do more',
  'than each on its own. The map is not the landscape. But one can',
  'walk with it.',
  '',
  '## Why does the needle prick?',
  '',
  'Now what looks most puzzling from the outside can be answered. The',
  'needle does not treat the place that hurts — at least not only.',
  'It intervenes at a point in the pathway network to restore the',
  'flow: where qi stagnates, it is opened and drained; where it is',
  'lacking, it is gathered and supported. That is why the point used',
  'against headache often lies on the hand, and the point against',
  'nausea two thumb widths above the wrist crease.',
  '',
  'The physician watches for a particular sign: **de qi**, the',
  '"arrival of qi" — a dull, heavy, sometimes radiating feeling',
  'around the needle, which the patient feels and the physician',
  'feels in his fingers. If it fails to appear, the stimulus counts',
  'as too weak.',
  '',
  'The needle has its twin, which is often forgotten in the West:',
  '**moxibustion**. Above the point, dried mugwort is burned, as a',
  'cone or as a glowing cigar, until the skin becomes warm. The',
  'reasoning is consistent: if the disturbance is an emptiness or a',
  'cold, no opening helps — then warmth must be supplied. Needle and',
  'moxa are the two answers to the two fundamental states. That is',
  'also why the Chinese word for acupuncture is not "needling" but',
  '*zhenjiu*: needle and burning herb.',
  '',
  '## Why a mixture and not the single herb?',
  '',
  'Herbal medicine is the larger part of medicine in China — far',
  'larger than acupuncture, even though the West perceives it the',
  'other way round. And it almost never works with a single plant.',
  '',
  'Every remedy is described by four properties, and none of them is',
  'an active substance. **First the temperature**: hot, warm,',
  'neutral, cool, cold — what is meant is what the remedy does in the',
  'human being, not its own warmth. **Second the taste**: sour draws',
  'together, bitter dries and leads downward, sweet nourishes and',
  'relaxes, pungent disperses outward, salty softens hardenings.',
  '**Third the direction**: ascending, descending, outward, inward.',
  '**Fourth the meridian relation**: which functional circle the',
  'remedy reaches.',
  '',
  'From these four pieces of information the logic of the',
  'prescription follows by itself. If a person has inner cold and a',
  'blockage, he needs something warming that acts inward and',
  'downward. But a single strong remedy would overshoot the mark.',
  'That is why a classical prescription is built like a royal court,',
  'and the Chinese call the roles exactly that:',
  '',
  '- the **emperor** — the main remedy against the main disturbance;',
  '- the **minister** — he reinforces the emperor or treats a second,',
  '  accompanying disturbance;',
  '- the **assistant** — he softens the sharpness of the emperor,',
  '  catches his side effect or counteracts an exaggeration;',
  '- the **messenger** — he leads the mixture to the right place and',
  '  brings the other remedies into harmony with one another.',
  '',
  'Hence the mixture: it is not meant to be stronger but more precise',
  'and more tolerable. The best-known example of the assistant is the',
  'liquorice-root share, which is found in a large part of all',
  'prescriptions — it takes the edge off pungent remedies. And',
  'because every person brings a different mixture of states, the',
  'prescription is modified at every visit: two herbs out, one',
  'added, one amount changed. One and the same Western diagnosis can',
  'yield five different prescriptions in five patients — and the same',
  'prescription can be used for five different diagnoses. That is not',
  'a lack of order but order itself: what is treated is the pattern,',
  'not the name of the disease.',
  '',
  '## Why pulse and tongue?',
  '',
  'This also makes clear why the diagnosis looks the way it does.',
  'Whoever wants to assess a balance does not need a look into a',
  'single cell but a picture of the state of the whole. And this',
  'picture the tradition seeks at places where the whole person shows',
  'itself — without opening him.',
  '',
  'The **pulse** is felt at six places: three positions on each',
  'wrist, each probed at three depths. Each position is assigned to a',
  'functional circle. And what is measured is not the frequency but',
  'the **quality**: is the pulse taut like a guitar string?',
  'Slippery like a pearl rolling away under the finger? Rough, deep,',
  'superficial, empty, full? The classics distinguish twenty-eight',
  'such pulse images. The thought behind it: the pulse is the',
  'movement of qi and blood, directly under the finger — movement',
  'cannot be more visible than that.',
  '',
  'The **tongue**, in turn, is the only place where one can look at a',
  'mucous-membrane organ in daylight. It is read like a map: the tip',
  'for the heart, the middle part for spleen and stomach, the edges',
  'for the liver, the root of the tongue for the kidneys. The body of',
  'the tongue shows the state of the blood and the fluids — pale in',
  'emptiness, red in heat, bluish in stagnation. The **coating**',
  'shows the state of the digestion: thick and greasy in dampness,',
  'dry in heat, absent in exhaustion of yin. The advantage over the',
  'pulse is practical: the tongue lies less. It changes more slowly',
  'and is less influenced by excitement, coffee or a hurried walk.',
  '',
  'Both together, along with questioning and listening and smelling,',
  'make up the **four examinations** — seeing, hearing/smelling,',
  'asking, feeling. They do not lead to a disease but to a **pattern**.',
  'And the pattern is the actual diagnosis.',
  '',
  '## Why movement and breath?',
  '',
  'The fourth branch is the quietest and the cheapest — and, from the',
  'point of view of the tradition, the most important. **Qigong** and',
  '**taiji** are slow, guided sequences of movement with conscious',
  'breathing. Their justification is simple: if health means that qi',
  'flows freely, then one can practise the flowing itself — daily,',
  'without a physician, without medicine.',
  '',
  'Behind it stands the primacy of prevention, which has shaped this',
  'medicine from the beginning. The "Classic of the Yellow Emperor"',
  'formulates it unmistakably: the superior physician treats what is',
  'not yet ill; to act only once the disease has broken out is like',
  'digging a well when one is already thirsty, or forging weapons',
  'when the battle has begun. This also includes eating according to',
  'temperature and season, regular sleep and moderation in',
  'everything. It is a medicine that has something to say to the',
  'healthy — and not only to the sick.',
  '',
  '## How experience became books',
  '',
  'None of this came into being in a single day. The development can',
  'be told in stages.',
  '',
  'At the beginning stands the oracle. In the ruins of Anyang, the',
  'last Shang capital, tens of thousands of inscribed bones and',
  'turtle shells from around 1200 BC were found. On them stand the',
  'oldest sentences about illness in China — "toothache", "Will the',
  'suffering pass?" — addressed to the ancestors. Illness was then a',
  'curse from outside, as almost everywhere in the world at that',
  'time.',
  '',
  'The actual break comes in the centuries before the turn of the',
  'era: illness becomes something that arises from **conditions** —',
  'from cold, wind, dampness, heat, from excess, from emotions. The',
  'physician takes the place of the exorcist. This was summarised in',
  'the **Huangdi Neijing**, the "Inner Canon of the Yellow Emperor",',
  'compiled in roughly the 2nd and 1st century BC from older',
  'material. It is written as a conversation between the legendary',
  'Yellow Emperor and his physicians and consists of two parts: the',
  '"Plain Questions" (Suwen) and the "Spiritual Pivot" (Lingshu).',
  'There qi, yin and yang, the transforming phases and the meridians',
  'stand together — to this day the foundation.',
  '',
  'Around the same time the **Shennong Bencao Jing** comes into',
  'being, the pharmacopoeia attributed to the mythical farmer',
  'emperor Shennong — according to the legend he tasted a hundred',
  'herbs and was poisoned seventy times a day. It lists 365',
  'remedies, ordered in three classes: upper ones, which one can take',
  'for a long time, middle ones, which one uses with a specific aim,',
  'and lower ones, which act strongly and are given for a short time.',
  'A classification by effect and risk, then — two thousand years',
  'ago.',
  '',
  'Around AD 200 **Zhang Zhongjing** writes the "Treatise on Cold',
  'Damage and Miscellaneous Diseases" after an epidemic had carried',
  'off a large part of his family. His book does not list',
  'prescriptions but orders the course of a febrile illness into',
  'stages and names the appropriate prescription for each stage. His',
  'formulas are prescribed to this day. The same period sees **Hua',
  'Tuo**, the surgeon to whom tradition attributes an anaesthetic and',
  'operations on the abdomen — how much of that is true, nobody',
  'knows.',
  '',
  'Then come the centuries of collecting. **Sun Simiao** (7th',
  'century) writes, alongside his collections of prescriptions, a',
  'famous text on the attitude of the physician: he should treat',
  'every sick person alike, whether poor or rich, young or old,',
  'friend or stranger — the Chinese counterpart to the Hippocratic',
  'oath. And in 1578 **Li Shizhen** completes, after twenty-seven',
  'years of work, the **Bencao Gangmu**: 1892 remedies, over eleven',
  'thousand prescriptions, with drawings. He does not only collect,',
  'he also deletes — superstitious and dangerous material from older',
  'books.',
  '',
  'The last section is the most recent, and it is rarely added: the',
  'orderly form that today is called "Traditional Chinese Medicine"',
  'came into being only in the **1950s**. Before that, Chinese',
  'healing was many-voiced, regionally different, divided from school',
  'to school; in the early 20th century it even came close to being',
  'banned, because many reformers considered it backward. The',
  'People\'s Republic then summarised it, standardised it, poured it',
  'into textbooks and taught it at universities — also out of',
  'practical need, because there were far too few Western-trained',
  'physicians. What today appears as an ancient unity is thus an old',
  'knowledge in a young order. Whoever keeps quiet about that tells',
  'a prettier story than the one that was.',
  '',
  'Today Chinese medicine stands in China on an equal footing with',
  'Western medicine: its own universities, its own hospitals, its',
  'own departments in Western clinics. Many patients get both. And',
  'worldwide it is practised as complementary medicine — in Germany',
  'predominantly acupuncture, in East Asia above all the herbs.',
  '',
  '## What we can do — and how it can be checked',
  '',
  'What has all this achieved? Today the tradition can no longer',
  'answer this question with experience alone — and it should not',
  'either. There are places where the test with modern means has',
  'turned out in its favour — and others where it has not.',
  '',
  '**The strongest evidence comes from the herbal cabinet.** In 1969',
  'the pharmacologist **Tu Youyou** began, on the commission of a',
  'government body, to search old Chinese collections of',
  'prescriptions for a remedy against malaria. She found with **Ge',
  'Hong**, a physician of the 4th century, the hint to steep the',
  'annual mugwort (*qinghao*) in water and press out the juice —',
  'striking, because normally one boiled it. She concluded from this',
  'that heat destroys the active substance, and extracted it cold',
  'with ether. The result was **artemisinin**, the most effective',
  'antimalarial of the present day; it has saved millions of lives.',
  'In 2015 she received the Nobel Prize in Physiology or Medicine',
  'for it. The active substance comes from modern chemistry — the',
  'hint where to look comes from a sixteen-hundred-year-old book of',
  'prescriptions.',
  '',
  '**With acupuncture the situation is more nuanced, but not empty.**',
  'Best studied are chronic pain conditions: a large analysis of',
  'individual data from around twenty thousand patients (Vickers and',
  'colleagues, 2012 and 2018) found for chronic back and neck pain,',
  'knee osteoarthritis and headache a genuine but moderate advantage',
  'over sham acupuncture — and a more distinct one over usual',
  'treatment. For the prevention of migraine and tension-type',
  'headache, the Cochrane reviews come to a similar result. Also well',
  'documented is the effect against nausea and vomiting after surgery',
  'and during chemotherapy (point Neiguan on the forearm). In',
  'Germany, acupuncture has been a statutory health-insurance',
  'benefit since 2007 for chronic low back pain and knee',
  'osteoarthritis — on the basis of the large German studies, in',
  'which it did better than the usual treatment. The World Health',
  'Organization published a list of indications in 2003; it has,',
  'however, been criticised methodically and is today considered too',
  'generous. That too belongs to an honest balance sheet.',
  '',
  '**Movement and breath are quietly well documented.** For taiji',
  'there is solid evidence for balance and fall prevention in old',
  'age, and serviceable evidence for knee osteoarthritis, high blood',
  'pressure and fibromyalgia. That is no sensation — but falls in',
  'old age are one of the largest unsolved problems of geriatric',
  'medicine.',
  '',
  '**And finally that which this medicine can do without a measuring',
  'instrument.** It takes time: an initial history often lasts an',
  'hour. It asks about sleep, digestion, mood, season, way of life —',
  'even when the occasion is a knee pain. It gives the sick person an',
  'explanation he can remember and do something with. And it expects',
  'of him that he himself does something. A part of the effect that',
  'patients report surely comes from there and not from the needle.',
  'From the point of view of the tradition that is no objection —',
  'attention and care are treatment. That it thereby explains a part',
  'of what research calls the placebo effect, it admits without',
  'hesitation.',
  '',
  '## Where our narrative grows thin',
  '',
  'And now the places where this voice itself must grow quieter. They',
  'belong to it, and it is better to name them oneself.',
  '',
  '**First: qi is not measurable.** There is no device that shows',
  'it, and no structure that corresponds to a meridian. Whoever takes',
  'Chinese medicine for a natural science confuses two things. It is',
  'a system of order for observations, refined over millennia — not',
  'a model of metabolism. As an explanation of why something works',
  'it therefore only serves within its own logic.',
  '',
  '**Second: the state of the studies is confusing, and part of the',
  'blame lies with us.** For many applications — from infertility',
  'via allergies to addiction treatments — the evidence does not',
  'suffice to say more than "unclear". With acupuncture the',
  'difference from the sham treatment is often small; setting needles',
  'at "wrong" places also often works. And studies from China turn',
  'out positive conspicuously often — in a review of older Chinese',
  'studies practically all yielded a favourable result, which',
  'statistically cannot be. Negative results are published less',
  'often. That is a problem of the tradition, not of its critics.',
  '',
  '**Third: some of our remedies have harmed people.** The alchemy',
  'of the imperial era made elixirs from cinnabar, lead and arsenic',
  'that were supposed to grant a long life — several emperors died',
  'of them. Cinnabar (mercury sulphide) and realgar (arsenic',
  'sulphide) are to this day found in individual traditional',
  'preparations. In the 1990s, women on a slimming cure in Belgium',
  'fell ill with severe kidney failure and later with cancer of the',
  'urinary tract: the prescription contained by mistake a birthwort',
  'species that contains **aristolochic acid**. The substance is',
  'today banned in Europe and restricted in China — but it has',
  'killed people. And ma huang (ephedra), for centuries a cold',
  'remedy, has as a slimming remedy triggered heart attacks.',
  '',
  '**Fourth: plants are medicines and behave accordingly.** There',
  'are real **interactions** with modern drugs — danshen, for',
  'example, strengthens blood thinners, other remedies influence the',
  'breakdown of drugs in the liver. Whoever takes both and does not',
  'tell one physician about the other takes a risk that nobody',
  'controls. Added to this are quality problems: contamination with',
  'heavy metals and pesticides, confusion of similar-looking roots,',
  'preparations with secretly mixed-in Western active substances.',
  '',
  '**Fifth: a part of our list of remedies cannot be defended.**',
  'Tiger bone, rhino horn, bear bile, pangolin — the trade in these',
  'remedies has brought animal species to the brink of extinction.',
  'The benefit is nowhere proven; the rhino delivers the same keratin',
  'as a fingernail. China banned the trade in 1993, the ban is not',
  'airtight everywhere, and the demand comes to a large extent from',
  'popular belief, not from the classics. It does not help to play',
  'that down: this side belongs to the history of this medicine.',
  '',
  '**And sixth, the bitterest:** where an easily treatable disease',
  'is treated for too long only with herbs, time passes that nobody',
  'brings back. With a tumour, an appendicitis, a bacterial',
  'pneumonia, this medicine is not the first choice, and an honest',
  'physician of the tradition says so. Chinese hospitals have been',
  'doing exactly that for decades: they operate and give',
  'antibiotics — and place the tradition beside that, not against',
  'it.',
  '',
  '## What I leave to the second voice',
  '',
  'With that ends what this page can tell from within. What it cannot',
  'do is look at itself from outside.',
  '',
  'For there is a second narrative, and it begins three hundred and',
  'fifty years ago in a harbour: a Dutch physician sees needles and',
  'burning herb, does not understand the reasoning, marvels all the',
  'same and invents a Latin word for it — "acupuncture". From then',
  'on the story continues in another language. What happens when a',
  'way of thinking about balance meets a way of thinking about cause',
  'and effect? What has the West understood of this medicine, what',
  'has it made convenient for itself, and what has it tested — with',
  'what result? And what became of an art that thinks in patterns',
  'when it was measured in studies with control groups?',
  '',
  'The second voice of this chapter answers that: the Western view —',
  'wonder, scepticism and scrutiny.',
].join('\n');

/**
 * The Western view — how Chinese medicine came to Europe, what the
 * West marvelled at in it, how it tested it — and where it itself
 * failed.
 *
 * Written by DeepSeek (round 3, second pass). This voice, too, names
 * the uncomfortable spots of its own side itself: colonial arrogance,
 * commercialisation, double standards (additional rule for sensitive
 * topics).
 */
const stimmeDesWestlichenBlicks = [
  '## The arrival in the West',
  '',
  'It did not begin with a laboratory but with the reports of',
  'travellers. In the 17th century, Jesuits brought the first news',
  'of Chinese physicians who treated diseases with needles — and of',
  'pulse-taking that supposedly revealed everything. The scholars of',
  'Europe read this with polite scepticism. It was held to be a',
  'curiosity of a distant country, just as one collected other',
  'curiosities.',
  '',
  'Then came the night in which the needle became world news: in',
  '1971 American journalists accompanied Henry Kissinger to China,',
  'and one of them, James Reston, was operated on there. The Chinese',
  'physicians treated his pain with acupuncture — and he wrote',
  'enthusiastically about it in the New York Times. For the first',
  'time the West looked at this medicine with wonder, not with',
  'condescension.',
  '',
  '## What the West saw',
  '',
  'It saw physicians who feel the pulse at six places and draw',
  'conclusions from it that no blood count can deliver. It saw',
  'prescriptions of a dozen plants instead of a single tablet. It saw',
  'people who have a migraine treated with a needle in the foot —',
  'and who say it helps. And it saw a medicine that took the human',
  'being as a whole: sleep, mood, season, diet, the relation of the',
  'organs to one another. Precisely what modern medicine, in the age',
  'of specialisation, increasingly let go missing.',
  '',
  'The wonder was honest. But it was also the wonder of a way of',
  'thinking that is used to testing everything — and now it did.',
  '',
  '## The test',
  '',
  'The test began with acupuncture, because it can be captured most',
  'easily in studies. Real needles were stuck against sham needles',
  'that do not penetrate the skin, and compared. The result was',
  'sobering and exciting at once: for many pain conditions — back',
  'pain, knee osteoarthritis, migraine — real acupuncture did better',
  'than no treatment. But the difference from sham acupuncture was',
  'often small. The "wrong" needles worked too. What does that mean?',
  'Either the ritual works — or we do not understand the meridians.',
  'Both interpretations are allowed, and research argues about it to',
  'this day.',
  '',
  'The herbs fared more strictly. The great success stands at the',
  'beginning: artemisinin, the most important active substance',
  'against malaria of recent decades, was won from the mugwort that',
  'the Chinese healing tradition has used for centuries — the',
  'researcher Tu Youyou received the Nobel Prize for it in 2015.',
  'Traditional knowledge led to the medicine. But the same test also',
  'found the shadows: aristolochic acid, contained in some',
  'traditional prescriptions, damages the kidneys and is considered',
  'carcinogenic; some elixirs of the imperial era contained heavy',
  'metals. And the state of the studies as a whole is confusing: a',
  'conspicuously large part of the positive results comes from China',
  'itself, where negative findings are published less often. That is',
  'no objection to the tradition — it is a demand to examine',
  'closely.',
  '',
  '## Where the West itself fails',
  '',
  'Now the uncomfortable spots, for this voice has plenty of them.',
  '',
  '**First: the colonial arrogance.** For over two centuries the',
  'West dismissed Chinese medicine as superstition without testing',
  'it — from the same attitude that called whole peoples',
  '"primitive". Whoever tests nothing and condemns all the same has',
  'not won; he has only not looked.',
  '',
  '**Second: the commercialisation.** What the West sells today as',
  '"TCM" is often a stripped-down, adapted version: acupuncture as a',
  'wellness offer, herbs in capsules, without the diagnosis, without',
  'the logic of the prescription, without the physician who feels',
  'the pulse for an hour. Whoever reduces the tradition to its',
  'products does not understand it — he exploits it.',
  '',
  '**Third: the double standards.** The West demands of Chinese',
  'medicine studies that it does not always demand of its own: a',
  'large part of modern drug effects rests on the same kind of',
  'evidence that is missed here — and the conflicts of interest of',
  'one\'s own industry are named less often than the gaps of the',
  'other side. Whoever points a finger at TCM should first examine',
  'his own palm.',
  '',
  '## What the West answers the Chinese voice',
  '',
  'At the end, the Chinese voice asked what became of its art when',
  'it was measured in studies with control groups. This voice\'s',
  'answer: it was tested — sometimes fairly, sometimes arrogantly,',
  'sometimes greedily. What remained of it is more than the sceptics',
  'admit and less than the advertising claims. And the West\'s most',
  'honest insight reads: it has learned that a medicine which sees',
  'the human being as a whole can do something its own has',
  'unlearned. Whether that is a reason for working together, the',
  'synthesis must answer.',
].join('\n');

/** Chapter 2 of the topic map. */
const chinaTcm = {
  id: 'china-tcm',
  titel: 'China and TCM',
  epoche: 'From the early emperors to today',

  aufhaenger: {
    frage: 'What is a physician thinking when he sets a needle?',
    text: [
      'Chinese medicine is over two thousand years old, handed down',
      'without interruption — and today it is taught at universities',
      'in China and practised worldwide. Millions of people are',
      'treated with needles, herbal mixtures and slow movement',
      'exercises.',
      '',
      'From the outside this looks puzzling. Why does someone stick a',
      'needle into the hand when the head hurts? Why does a physician',
      'prescribe twelve plants instead of one? Why does he feel the',
      'pulse at six places and look at the tongue instead of taking',
      'blood?',
      '',
      'There are answers to all of it — they just follow a different',
      'logic than the familiar one. This chapter first explains this',
      'logic, as precisely as possible and in its own words. Then it',
      'asks just as precisely: what of it stands up to scrutiny?',
    ].join('\n'),
  },

  // The map itself lives in utils/themen/karten/china-tcm.js — of a
  // different kind (geometry instead of narrative), therefore in its
  // own file. Here only the map's texts are translated (phases,
  // points, movements) as karteHinweise, not the map itself.
  karteHinweise: [
    {
      label: 'c. 2000 BC: the early cultures of the Yellow River',
      hinweis:
        'Villages, towns and the first script arise on the Yellow ' +
        'River and the Yangtze. The oldest news about illness in ' +
        'China comes from this time: questions to the ancestors, ' +
        'scratched into bone.',
    },
    {
      label: 'c. 2nd century BC: the Han Empire',
      hinweis:
        'In the Han Empire things are collected and ordered: the ' +
        '"Classic of the Yellow Emperor" and Shennong\'s ' +
        'pharmacopoeia come into being. To the west, the Silk Road ' +
        'opens — it leads far beyond the edge of the picture.',
    },
    {
      label: 'c. 16th century: the Ming era',
      hinweis:
        'Li Shizhen completes his great pharmacopoeia in 1578. At ' +
        'the same time European ships put in at Canton and Macau — ' +
        'from there the first reports of needles and pulse-taking go ' +
        'to Europe.',
    },
    {
      label: 'Anyang',
      hinweis:
        'Here stood the last capital of the Shang era (around 1200 ' +
        'BC). In the ruins tens of thousands of inscribed shoulder ' +
        'blades and turtle shells were found: oracle bones. On them ' +
        'stand the oldest known sentences about illness in China — ' +
        '"toothache", "headache", "Will the illness pass?". What was ' +
        'asked were the ancestors, not the physician. Healing begins ' +
        'in China as a conversation with the dead.',
    },
    {
      label: 'Xi’an (Chang’an)',
      hinweis:
        'As Chang’an the city was the capital of the Han and the ' +
        'Tang — and the eastern starting point of the Silk Road. In ' +
        'the Han era, what is to this day the foundation of Chinese ' +
        'medicine was compiled here: the "Inner Canon of the Yellow ' +
        'Emperor". In a tomb near Changsha, scrolls were found that ' +
        'are even older and already know the meridians — though ' +
        'without needles.',
    },
    {
      label: 'Luoyang',
      hinweis:
        'The second great capital of the Han era. In these centuries ' +
        'Zhang Zhongjing writes his "Treatise on Cold Damage" — a ' +
        'book that no longer merely lists prescriptions but orders ' +
        'diseases by stages and names a prescription for each stage. ' +
        'From here the knowledge went on via Korea to Japan, where ' +
        'it became Kampō medicine.',
    },
    {
      label: 'Qichun',
      hinweis:
        'The home town of Li Shizhen (1518–1593). For twenty-seven ' +
        'years he collected, checked, discarded and ordered — the ' +
        'result was the "Bencao Gangmu", finished in 1578: 1892 ' +
        'remedies, over 11,000 prescriptions, with drawings. He also ' +
        'deleted: nonsensical, superstitious and dangerous material ' +
        'from older books. The work is to this day regarded as the ' +
        'greatest pharmacopoeia of the old world.',
    },
    {
      label: 'Guangzhou (Canton)',
      hinweis:
        'The great harbour of the south, for centuries the only gate ' +
        'for European ships. Via Canton and nearby Macau the first ' +
        'news of Chinese healing art came to Europe: Jesuits ' +
        'translated texts about pulse-taking, merchants reported on ' +
        'needles and burning cones of herbs. At first little was ' +
        'understood of it — the more it was marvelled at.',
    },
    {
      label: 'Beijing',
      hinweis:
        'Today the centre of Chinese medicine: large TCM universities ' +
        'and clinics stand here, in which herbal prescriptions and ' +
        'acupuncture stand alongside X-ray machines and laboratory ' +
        'values. In China both medicines are recognised by the state; ' +
        'many patients get both. The present, orderly form of "TCM" ' +
        'is, however, young — it came into being in the 1950s.',
    },
    {
      label: 'The Silk Road to the West',
      hinweis:
        'From Chang’an the caravans travelled west — and knowledge ' +
        'travelled with the goods. Medicinal plants came from Persia ' +
        'and India to China, from China cinnamon, rhubarb and ginger ' +
        'went the other way; rhubarb root was for centuries one of ' +
        'Europe\'s most coveted remedies. The road leads far beyond ' +
        'the edge of the picture: as far as Samarkand, Baghdad and ' +
        'the Mediterranean.',
    },
    {
      label: 'Across Korea to Japan',
      hinweis:
        'In the 6th and 7th centuries, monks and envoys brought the ' +
        'Chinese pharmacopoeias via Korea to Japan. There a tradition ' +
        'of its own grew out of them: Kampō medicine, which is ' +
        'practised to this day — with the same prescriptions, but ' +
        'dosed more sparingly and justified differently. Knowledge ' +
        'rarely remains as it arrives.',
    },
    {
      label: 'The first reports to Europe',
      hinweis:
        'From the 16th century on, Portuguese, Dutch and Jesuit ' +
        'travellers took along what they had seen in China. The word ' +
        '"acupuncture" itself is European: the Dutch physician Willem ' +
        'ten Rhijne coined it in 1683 from Latin — he had, however, ' +
        'seen the needles in Japan, not in China. That is how the ' +
        'knowledge came to the West: second-hand and in foreign ' +
        'words.',
    },
  ],

  perspektiven: [
    {
      id: 'tcm-innen',
      name: 'The Voice of Chinese Medicine',
      stimme: 'Opus',
      text: stimmeDerChinesischenMedizin,
    },
    {
      id: 'westlicher-blick',
      name: 'The Western View',
      stimme: 'DeepSeek',
      text: stimmeDesWestlichenBlicks,
    },
  ],

  synthese: [
    '## Where both voices meet',
    '',
    'First the common ground. Both voices acknowledge that TCM rests',
    'on millennia of observation — the tradition calls it its',
    'experience, the West calls it an empirical basis. Both see the',
    'value of the whole: Chinese medicine treats the human being as a',
    'whole, and the West admits that it has unlearned this ability.',
    'Both agree that attention and expectation work — the tradition',
    'says it openly ("attention and care are treatment"), research',
    'measures it as placebo and expectation effect. And both share a',
    'great success: artemisinin, won from the mugwort of the Chinese',
    'tradition, against malaria — tradition and laboratory worked',
    'together here, and the world has profited from it.',
    '',
    '## Where they part ways',
    '',
    'The contradiction begins with the question of measurability. For',
    'Chinese medicine, qi is a reality of its thinking — for the',
    'West, what cannot be measured is initially no active substance.',
    'They do not argue about individual needles but about the',
    'question of what counts as evidence: a system of order for',
    'observations, refined over millennia, or a study with a control',
    'group? Added to this is the interpretation of the results: if',
    'the sham needle also works, that is for some a pointer to the',
    'ritual — for others a pointer to the fact that research simply',
    'does not measure the meridians. And there is dispute about who',
    'checks the bill: the West demands of TCM studies that it does',
    'not always demand of its own pharmaceutical industry.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'For the third time the same pattern shows itself: the way of',
    'thinking determines the method. Egyptian medicine saw the body',
    'as a land with channels, the early healing art saw the',
    'disturbance of the plumb line — and China sees the balance of',
    'qi, yin and yang. Three times a different way of thinking,',
    'three times a thinking consistent in itself that has helped',
    'people.',
    '',
    'And something else becomes visible here for the first time: the',
    'possibility of working together in a concrete example.',
    'Artemisinin has shown the way — traditional knowledge, tested',
    'and made modern. Perhaps the future is not a choice between two',
    'ways of thinking but the art of deploying each where it is',
    'strong: fight the cause where it is known — and keep the human',
    'being in balance where the cause remains unclear. That would be',
    'no betrayal of one side or the other. It would be medicine.',
  ].join('\n'),

  urteil: {
    frage:
      'Would you let yourself be treated with needles — and what ' +
      'would matter to you in doing so?',
    hinweis: [
      'There is no right and no wrong here. Think of what is',
      'documented (chronic pain, nausea, the artemisinin against',
      'malaria), of what remains unclear, and of what can cause harm',
      '(aristolochic acid, interactions, lost time with a serious',
      'illness). Would someone have to be able to explain to you why',
      'something works — or would it suffice for you that it helps',
      'you? And does it make a difference whether it concerns a',
      'chronic back pain or a pneumonia?',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'For what did the Chinese pharmacologist Tu Youyou receive ' +
        'the 2015 Nobel Prize in Physiology or Medicine?',
      antworten: [
        'For research into the acupuncture points.',
        'For the antimalarial artemisinin from the annual mugwort.',
        'For the development of the first Chinese antibiotic.',
      ],
      richtig: 1,
      erklaerung:
        'Tu Youyou searched old Chinese collections of prescriptions ' +
        'and came across, with Ge Hong (4th century), the hint to ' +
        'press the mugwort cold. Out of that came artemisinin — to ' +
        'this day the most effective remedy against malaria.',
    },
    {
      frage: 'What does the term "qi" designate in Chinese medicine?',
      antworten: [
        'A measurable form of energy that was demonstrated in the 1970s.',
        'A model of thought for movement and function in the body — ' +
          'not a substance measurable with devices.',
        'A particular medicinal plant from southern China.',
      ],
      richtig: 1,
      erklaerung:
        'Qi describes what in the body warms, moves, holds together ' +
        'and transforms. No measuring device exists for it — the ' +
        'tradition itself, too, understands qi as a concept of ' +
        'order, not as a physical quantity.',
    },
    {
      frage:
        'When was the "Classic of the Yellow Emperor" (Huangdi ' +
        'Neijing) compiled?',
      antworten: [
        'Roughly in the 2nd and 1st century BC, from older material.',
        'Only in the 19th century, after contact with Europe.',
        'Around 3000 BC, by the Yellow Emperor in person.',
      ],
      richtig: 0,
      erklaerung:
        'The work came into being in the Han era from older texts ' +
        'and is written as a conversation between the legendary ' +
        'Yellow Emperor and his physicians. The emperor himself is a ' +
        'legendary figure — the form gave the book authority.',
    },
    {
      frage:
        'Is it true that acupuncture in Germany is paid for by the ' +
        'statutory health insurance?',
      antworten: [
        'No, it is in principle a private service.',
        'Yes — since 2007 for chronic low back pain and knee ' +
          'osteoarthritis.',
        'Yes, for all complaints without restriction.',
      ],
      richtig: 1,
      erklaerung:
        'After large German studies, the Federal Joint Committee ' +
        '(Gemeinsamer Bundesausschuss) decided in 2007 to reimburse ' +
        'acupuncture for chronic low back and knee pain. For other ' +
        'complaints the statutory insurances do not pay for it.',
    },
    {
      frage:
        'How does the classical pulse diagnosis of Chinese medicine ' +
        'proceed?',
      antworten: [
        'It counts the beats per minute at the carotid artery.',
        'It probes three positions on each wrist at several depths ' +
          'and assesses the quality of the pulse.',
        'It measures the blood pressure on both upper arms.',
      ],
      richtig: 1,
      erklaerung:
        'It is felt at six places — three on each wrist, each at ' +
        'several depths. What is assessed is not the frequency but ' +
        'the quality: taut, slippery, rough, deep, empty. The ' +
        'classics distinguish 28 such pulse images.',
    },
  ],
};

module.exports = chinaTcm;
