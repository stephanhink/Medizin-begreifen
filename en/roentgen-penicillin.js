// Chapter 14 — "X-rays and Penicillin".
//
// The fourth chapter of the modern era and the chapter of the two chances:
// in 1895 a screen lights up in Würzburg although the tube is shrouded —
// medicine gains an eye for the inside of the living human being. In 1928
// a forgotten culture dish grows mouldy in London — and out of the mould
// comes the agent that defeats the bacteria. Thirty-three years lie
// between the two; together they make the medicine of the 20th century.
//
// The WAY-OF-THINKING analysis is the heart of the chapter (operator
// requirement). It asks here: Why could chance mean anything at all?
// (Because a physicist who sees an unexpected glow does not think "that
// cannot be" but "what is that?" — and then investigates for seven weeks
// instead of proclaiming.) Why the image? (Because invisible rays
// penetrate the flesh and the bones cast a shadow: for the first time
// medicine can see into the living body without opening it — the diagnosis
// becomes visible.) Why no patent? (Because in Röntgen's conviction the
// discovery belonged to everyone — an attitude that becomes rare in later
// medicine and that prepares the chapter on the pharmaceutical industry.)
// And the new way of thinking of the visible: medicine becomes the science
// of the image — with everything that costs.
//
// LENGTH RULE (operator feedback 24.08.2026): From chapter 9 the reverse
// applies — complete and thorough. Thorough does not mean bloated: every
// paragraph advances the narrative. Measured in
// tests/karte-roentgen-penicillin.mjs.
//
// TONE rule: BOTH sides fairly. This first voice shows the greatness of
// the discovery AND names the uncomfortable places itself: the euphoria
// that came before knowledge (fairground, shoe shop, hair removal); the
// burns, amputations and leukaemia of the first generation; the memorial
// in Hamburg; the radiation exposure that remains a balancing act to this
// day. And it shows the INNOVATION CYCLE (operator observation 26.08.2026):
// the new harms first before it becomes a blessing — here especially
// clear, because the harm was invisible and came with delay.
//
// NO RUMOURS (operator decision 25.08.2026): Only what is documented. The
// famous sentence about having seen her own corpse is handed down, but not
// secured from a contemporary source — it is explicitly marked as
// tradition in the text. The same applies to the stories about individual
// victims of shoe fluoroscopy.
//
// Voices (round 13): The FIRST perspective — the discoverer of the rays —
// was written by Opus. The SECOND (the second chance: Alexander Fleming,
// the mouldy dish of 1928, the labour of purification, Florey, Chain and
// Heatley in Oxford, mass production in the war — and the discoverer's
// warning about resistance, which has come true today) and the final
// synthesis were added by Hermes in the second pass. Perspective workflow:
// CLAUDE.md.
//
// NO REPETITIONS (operator decision 21.08.2026): Chapter 1 is structured
// by "who speaks here", chapter 2 begins with a scene, chapter 3 tells a
// day's routine, chapter 4 is a correspondence, chapter 5 the journey of a
// book, chapter 6 a tour, chapter 7 a trial, chapter 8 an account, chapter
// 9 a clock, chapter 10 a chain, chapter 11 a lens with specimens. This
// chapter chooses the thirteenth dramaturgy: THE SINGLE INTERVIEW. Röntgen
// gave exactly one newspaper interview in his life (H. J. W. Dam,
// McClure’s Magazine, April 1896). The sections are the questions of a
// reporter who never stops asking — right up to the questions that nobody
// asked in 1896. The second voice can step into the same form: Fleming was
// the opposite, a man who gave hundreds of interviews.
//
// The texts are stored as line arrays joined with `.join('\n')` — so they
// remain readable in the repo at around 72 characters (the operator
// proofreads them here), and utils/markdown.js turns them back into
// flowing text in the app.
//
// CommonJS without UI imports (architecture rule): verifiable with plain
// `node`.

/**
 * The voice of the discoverer — the X-rays from within.
 *
 * Written by Opus (round 13). A voice that speaks for Wilhelm Conrad
 * Röntgen: the physicist in Würzburg who on 8 November 1895 saw something
 * that was not allowed to exist. It tells why he did what he did — and it
 * names the uncomfortable places itself (additional rule for sensitive
 * topics in CLAUDE.md).
 */
const stimmeDesEntdeckers = [
  '## The Man Who Gave No Interviews',
  '',
  'In April 1896 an American magazine publishes a',
  'conversation with me. It has remained the only one. A reporter had come',
  'to Würzburg, waited at the institute, and I had reluctantly given him',
  'half an hour. Never again after that.',
  '',
  '**What you read here is the discoverer’s view — a way of thinking,',
  'not a truth.** Two sentences in this conversation are handed down',
  'verbatim; they stand further below, and they are marked.',
  'Everything else is this book’s narrative, based on my three',
  'communications, on letters, on minutes of meetings and on what',
  'demonstrably happened. Where something is only handed down and cannot',
  'be verified, I say so.',
  '',
  'My name is Wilhelm Conrad Röntgen, born in 1845 in Lennep in the',
  'Bergisches Land, raised in the Netherlands. I was a mediocre pupil and',
  'was expelled from school because I refused to betray the author of a',
  'caricature. Without a school-leaving certificate, taking a detour via',
  'Zürich, I became a physicist. In 1888 I came to Würzburg; in 1894 I',
  'became rector of the university. I liked to work alone, disliked giving',
  'lectures and hated fuss.',
  '',
  'And then came 8 November 1895, and the reporter with his questions.',
  'Imagine he had not had to stop after half an hour. Imagine he had kept',
  'asking — including the questions that nobody asked in 1896, because',
  'nobody yet knew that they had to be asked. That is how this chapter is',
  'built.',
  '',
  '## "What happened here, Professor?"',
  '',
  'It was a Friday evening. At the institute on the Pleicherring I was',
  'working on something that occupied many physicists back then: on',
  '**cathode rays**. It is simpler than it sounds. You take a glass bulb,',
  'pump out almost all the air, seal metal parts into both ends and apply',
  'a high voltage. Then something inside the bulb flies from one electrode',
  'to the other and makes the glass glow green. Such bulbs stood in every',
  'physics institute in Europe. It was routine, not adventure.',
  '',
  'That evening I wanted to know something specific, and so I had',
  'carefully wrapped the bulb in **black card**, light-proof. The room was',
  'darkened. I switched on the current to test whether the covering really',
  'let nothing through.',
  '',
  'And then something glowed.',
  '',
  'Not on the bulb. A good distance away, on the bench, lay a paper',
  'screen that I had coated with **barium platinocyanide** — a substance',
  'that lights up when certain rays strike it. The screen flickered in',
  'time with the discharges. I switched off: dark. On: glowing.',
  '',
  'That was not allowed to be. Cathode rays travel a few centimetres',
  'through air, not one and a half metres, and through black card they do',
  'not travel at all. So something else was passing through the covering,',
  'something I did not know.',
  '',
  'Then I did what anyone would do who does not believe it: I carried',
  'the screen further away. It glowed. I held books in between, a board, a',
  'tin box, the door of the next room. It glowed more faintly, but it',
  'glowed. Only a piece of lead extinguished it.',
  '',
  'And then I held my own hand between the bulb and the screen — and',
  'saw on the screen the **shadows of my bones**, surrounded by a pale',
  'outline of the flesh.',
  '',
  '## "And what did you think at that moment?"',
  '',
  'The reporter really did ask me that question. My answer is handed',
  'down and documented verbatim, and I stand by it to this day:',
  '',
  '**"I did not think. I investigated."**',
  '',
  'That sounds gruff, and it is the most precise answer I can give. For',
  'here lies the entire way of thinking of this chapter.',
  '',
  'Whoever *thinks* at that moment is lost. Thinking in this situation',
  'means: comparing the observation with what one already knows. And what',
  'I knew said clearly: That cannot be. A physicist who trusts his',
  'knowledge more than his screen now wipes across the bench, looks for a',
  'hole in the card, is annoyed at the poor experimental set-up — and goes',
  'home.',
  '',
  '**Investigating** means the opposite: first letting the observation',
  'stand and closing in on it. Not asking "what may that be?" but "what is',
  'it?" How far does it reach? What stops it? Does it cast a shadow? Can',
  'it be deflected like light, refracted like light, reflected like light?',
  'Does it strike the photographic plate?',
  '',
  'That is the reason why the famous sentence from the previous chapter —',
  'chance favours only the prepared mind — has a very practical meaning',
  'here. **Prepared is not the one who knows much, but the one who can set',
  'his knowledge aside at the decisive moment.** Others before me had',
  'clues: in England people had been annoyed about photographic plates',
  'that turned grey next to such bulbs and had complained to the supplier.',
  'In Philadelphia, five years before me, a picture had been produced',
  'showing objects that nobody had photographed; it was filed with the',
  'failed images.',
  '',
  '**The difference between a mishap and a discovery is not the event.',
  'It is the question one asks of it.**',
  '',
  '## "Why did you remain silent for seven weeks?"',
  '',
  'Because I was not sure whether I had gone mad.',
  '',
  'That is not coquetry. A man who claims he can see through closed',
  'doors and through living flesh had, in 1895, two ways of ending up a',
  'fool: either he was mistaken, or he was taken for one of those miracle',
  'men who back then sold spiritualism, mind reading and dowsing rods. I',
  'later wrote to a friend that I had kept the matter to myself until I',
  'was sure — before that I would not have dared to speak of it.',
  '',
  'So I worked for seven weeks, during which I had food brought to the',
  'laboratory and slept there too. I tried everything that could be',
  'tried: paper, wood, rubber, water, aluminium, platinum, lead. I',
  'measured the thicknesses and noted down how much got through each',
  'time. **And I tried to refute my own discovery** — with prisms,',
  'mirrors, lenses, magnets. Nothing made the rays refract, reflect or',
  'deflect. They simply ran straight ahead.',
  '',
  'Only when I found nothing more that spoke against it did I write:',
  'nine pages, seventeen numbered sections, not a single grand word. On',
  '**28 December 1895** I submitted them to the Physical-Medical Society',
  'in Würzburg: "Über eine neue Art von Strahlen. Vorläufige',
  'Mittheilung."',
  '',
  '**Those seven weeks are the most important part of the story, and',
  'they are the part that is never told.** The legend wants the lightning',
  'bolt: a man, a glow, world fame. In fact, the glow was the easiest',
  'thing. The hard part was the fifty days in which I told nobody about',
  'it, because a claim without testing is worth nothing. Remember this',
  'number. It appears again in this book when it comes to procedures that',
  'were not given testing time.',
  '',
  '## "How is it that nobody before you noticed anything?"',
  '',
  'A few noticed it. Nobody understood it, myself included, until I',
  'looked.',
  '',
  'There is also an uncomfortable truth about my apparatus. The tube',
  'design I worked with that night I owe to others — among them Philipp',
  'Lenard, who had even sent me tubes on request. He felt overlooked all',
  'his life and publicly maintained that without his preparatory work my',
  'find would not have been possible. **In that he is right.** I invented',
  'nothing. I noticed something that had long been flying through the',
  'workshops of Europe without anyone looking.',
  '',
  'What distinguished me from the others was no better apparatus and no',
  'greater talent. It was a habit: **I did not treat the unexpected as a',
  'disturbance.** In a laboratory there are things every day that do not',
  'fit the picture — a pointer that trembles, a plate that turns grey, a',
  'noise. Almost all of them are disturbances. One learns to clear them',
  'away, otherwise one would never reach one’s goal. Exactly this useful',
  'habit makes one blind.',
  '',
  '**So why take chance seriously at all?** Because the new inevitably',
  'appears as an error. Everything that is truly new looks at first glance',
  'like a failed experiment — it fits no existing picture, otherwise it',
  'would not be new. Whoever searches only for what he expects finds only',
  'what he already knows. Chance is not the antagonist of science. **It is',
  'the only door that leads out of what one already knows — but it opens',
  'only if someone stands before it who is ready to look for seven',
  'weeks.**',
  '',
  '## "What are these rays — can you explain that?"',
  '',
  'No. And I never claimed to.',
  '',
  'That is why I called them **X-rays**. The X is the mathematicians’',
  'sign for the unknown quantity. The name was not a brainwave but an',
  'admission: here is something that can be measured and described, but',
  'not yet explained.',
  '',
  'What I could say stood in the seventeen sections: they travel',
  'straight ahead. They penetrate materials to different depths — the',
  'denser and heavier a material, the less gets through. Lead stops them,',
  'flesh hardly, bone moderately. They blacken the photographic plate.',
  'They can be neither refracted nor deflected. They arise where the',
  'cathode rays strike the wall of the bulb.',
  '',
  'Only seventeen years later, in 1912, Max von Laue showed in Munich',
  'that it is light of very short wavelength — waves of the same kind as',
  'visible light, only much shorter. Until then, half the world worked',
  'with something that nobody could explain.',
  '',
  '**That is a way of thinking, and it is worth holding on to:** one can',
  'use, test and master something long before one understands it. The',
  'effect is one thing, the explanation another; they rarely come at the',
  'same time, and usually the explanation comes later. Whoever says: what',
  'I cannot explain does not exist — he would have thrown these rays into',
  'the stove. I am not saying that everything unexplained is true. I am',
  'saying: **inexplicability is no proof of ineffectiveness, and',
  'effectiveness is no proof that one has understood why.**',
  '',
  'By the way: the name the world uses, I did not choose. On 23 January',
  '1896 I demonstrated the matter in Würzburg publicly for the only time',
  'and in doing so X-rayed the hand of the elderly anatomist Albert von',
  'Kölliker. He stood up and proposed naming the rays after me. The hall',
  'cheered. It was uncomfortable for me, and in German it has remained.',
  '',
  '## "What is it good for?" — the hand of 22 December 1895',
  '',
  'On 22 December 1895 I asked my wife **Bertha** to come to the',
  'laboratory. She laid her left hand on a photographic plate, and I let',
  'the tube run for a good quarter of an hour. Then I developed the plate.',
  '',
  'On the plate lay the bones of her hand, joint for joint, clearly,',
  'with the dark ring on the fourth finger. From her the sentence is',
  'handed down that she had seen her own death. **Whether she said it',
  'exactly like that cannot be verified** — the phrase appears only',
  'later. That she was startled is credible. For the first time in',
  'history a human being looked into his own living body, and what he saw',
  'was a skeleton.',
  '',
  'That single plate achieved more than my nine pages of text. I',
  'enclosed it with the offprints that went out to fellow scientists on',
  '1 January 1896. Four days later the news appeared in a Viennese',
  'newspaper, and from there it went around the world by telegraph. On',
  '13 January I demonstrated the matter in Berlin at court.',
  '',
  '**Why precisely the image?** Because it lifted a two-thousand-year-old',
  'boundary. Until that day there were exactly two ways of seeing the',
  'inside of a human being: cutting open — or waiting until he is dead.',
  'Vesalius in Chapter 7 worked out his anatomy on corpses. Harvey in',
  'Chapter 8 had to infer the circulation from valves, calculations and',
  'ligatures because he could not see it. The surgeons in Chapter 11 cut',
  'and only then found out what was going on inside — often too late.',
  '',
  '**From that day on one could look into a living human being without',
  'opening him.** The fracture is on the plate before the knife is',
  'applied. The bullet in the leg has a location. The needle stuck in the',
  'hand becomes visible. That is the beginning of what your doctor today',
  'does as a matter of course when she slides you into a machine before',
  'pronouncing a diagnosis.',
  '',
  'And with that begins a new way of thinking that I did not intend and',
  'that occupies this book to the end: **the medicine of the image.** From',
  'now on, illness is something one can **show**. No longer merely the',
  'sick person’s account ("it feels so heavy in here"), no longer merely',
  'the finding of the probing hand, no longer merely the balance of the',
  'humours, the doshas, the qi from the early chapters — but a shadow on',
  'a plate that two doctors can look at independently and argue about.',
  '**What is visible becomes real; what remains invisible falls behind.**',
  'That is an enormous gain in certainty and a quiet loss of attention',
  'for everything that makes no image.',
  '',
  '## "You could have become rich. No patent?"',
  '',
  'No. No patent, no licence, no fee — on none of it.',
  '',
  'It was suggested to me. The electrical industry was interested; a',
  'claim on the production of these rays would have been a fortune within',
  'a few years. Every hospital in the world would have paid, and for',
  'decades.',
  '',
  '**Why no patent?** For two reasons, and I name both, because the',
  'second is rarely added.',
  '',
  '**First:** I invented nothing. I found something that existed before',
  'and has always existed. Nobody can present a bill for the laws of',
  'nature. Whoever builds a machine has a claim on his machine; whoever',
  'describes a property of the world has a claim to be quoted correctly —',
  'nothing more. In the order in which I grew up, discoveries belong to',
  'the public.',
  '',
  '**Second, and that is the practical reason:** a patent would have',
  'slowed the spread. Because nobody had to ask and nobody had to pay,',
  'rebuilt apparatuses stood within a few months in hospitals and',
  'workshops from Chicago to Saint Petersburg. A broken bone in a charity',
  'hospital was X-rayed in 1896, not 1910. **Whoever wants to bring a',
  'discovery into the world quickly gives it away.**',
  '',
  'That cost me money, and I do not conceal it: after the war inflation',
  'devoured my fortune, and in 1923 I died not wealthy. I was the very',
  'first to receive the Nobel Prize in Physics, in 1901; I transferred',
  'the prize money — fifty thousand kronor — to the University of',
  'Würzburg. I did not give a Nobel lecture. I declined the offered title',
  'of nobility; the "von" before the name would have changed nothing',
  'about the matter.',
  '',
  'I do not present this as a heroic deed but as **a comparison that',
  'becomes due later in this book.** In the chapters on the pharmaceutical',
  'industry and on the vaccines of our day you will encounter the',
  'opposite attitude: there an active substance is protected, a process',
  'licensed, a price demanded. Both have their reasons. Without the',
  'prospect of return, no company would ever have raised the millions',
  'that drug development costs today — that argument is to be taken',
  'seriously, and the second voice of this chapter will confirm it:',
  'without American industry, nothing would have become of the mould.',
  '**But the question of whom a discovery belongs to is thereby not',
  'answered, only postponed.** Hold these two answers side by side when',
  'you reach Chapter 16.',
  '',
  '## "What did medicine make of it?"',
  '',
  'Everything, and immediately at that. I have never experienced a',
  'discovery falling into application so quickly.',
  '',
  'Four days after the newspaper report, a splinter of glass was',
  'located in a hand in Berlin. In Birmingham, on 11 January 1896, a',
  'doctor made an image of a needle in a wrist and then operated',
  'precisely on target. On 3 February 1896 the broken forearm of a boy',
  'was imaged in America — the first fracture diagnosis of an entire',
  'speciality that did not even exist yet. As early as 1896 British',
  'troops took an apparatus to Africa to search for bullets; in the',
  'Greco-Turkish War of 1897 it became routine.',
  '',
  'And in the war that came twenty years later, **Marie Curie** made',
  'something of it that I would never have imagined: she converted',
  'delivery vans into mobile X-ray stations, trained women as operators',
  'and drove with them to the front. Around twenty vans and two hundred',
  'fixed stations; over a million examinations. People called the vans',
  'the "little Curies". How many legs were thereby not amputated, because',
  'the splinter was found instead of guessed at, nobody has counted.',
  '',
  'It did not stop at seeing. Very quickly someone noticed that these',
  'rays not only image but **act**: they turn skin red, they make hair',
  'fall out, they destroy tissue. And because they strike rapidly growing',
  'tissue harder than resting tissue, one can attack tumours with them.',
  'As early as 1896 the first cancer patient was irradiated. From that',
  'came radiation therapy, which today, together with surgery and',
  'medication, is one of the three pillars of cancer treatment.',
  '',
  '**That the rays can heal because they destroy is no contradiction. It',
  'is the same property seen from two sides.** Precisely in that lies the',
  'trap into which the next quarter-century walked.',
  '',
  '## "They are doing X-rays at fairgrounds and in shoe shops. What do',
  'you say to that?"',
  '',
  'This is the part where I do not look good, and I will not begin it',
  'prettily.',
  '',
  'The rays became a fashion. At fairgrounds and in department stores',
  'apparatuses were set up at which people could view their own hand for',
  'an admission fee; seeing the skeleton of one’s beloved counted as',
  'entertainment. There were lectures with demonstrations, postcards with',
  'skeleton pictures, novelty items and advertisements for underwear that',
  'was supposedly radiation-proof.',
  '',
  'From the fashion grew businesses that ran for decades:',
  '',
  '- **The shoe shop.** From the 1920s onwards there stood in shoe shops',
  '  a box into which one stepped with one’s feet and through a viewing',
  '  window viewed one’s own toes in the shoe — supposedly to check the',
  '  fit. In the United States there were, in the best years, around ten',
  '  thousand devices, in Great Britain several thousand. Children stepped',
  '  in repeatedly because it was fun. Measurements by the health',
  '  authorities later showed doses far above anything that would be',
  '  defensible today — above all for the sales staff who stood next to it',
  '  all day. From the 1950s onwards the devices were banned; individual',
  '  ones still stood in the 1970s.',
  '- **The beauty salon.** In the 1920s a method of hair removal by',
  '  irradiation was sold in America and operated in hundreds of salons,',
  '  predominantly on women. It worked: the hair fell out. Years later the',
  '  bills came — severe skin damage, ulcers, cancer.',
  '- **Paediatrics.** Until the 1950s children were irradiated against',
  '  harmless complaints: against scalp ringworm, against acne, against a',
  '  supposedly enlarged thymus gland. Decades later, follow-up studies',
  '  found significantly more thyroid cancer in these people than in the',
  '  unirradiated. That is one of the best-documented harms in the history',
  '  of medicine — and it was inflicted by doctors who wanted to help.',
  '',
  '**Why could this happen?** Not because people were stupid. But because',
  'of a property of these rays that I consider the most important thing',
  'in this whole chapter: **you do not feel them.**',
  '',
  'A knife cuts and hurts. Boiling water scalds immediately. Poison',
  'tastes bitter or acts within hours. The body has a warning for almost',
  'every danger that comes at the right moment. For ionising radiation it',
  'has none. One stands before it, feels nothing, walks away — and the',
  'burn appears after days, the cancer after twenty years.',
  '',
  '**Where warning and harm fall apart in time, experience fails as a',
  'teacher.** Precisely on that the art of healing had relied for',
  'millennia: one tries, one sees what happens, one keeps what helps.',
  'With the herbs of the early chapters that often worked. Here it does',
  'not work. Whoever had listened only to experience would have concluded',
  'that the rays were harmless — for years, with full conviction and with',
  'tomorrow’s dead in the waiting room.',
  '',
  '## "And the men at the tubes — what became of them?"',
  '',
  'They died. Many of them, and badly.',
  '',
  'The early tubes were unpredictable; how "hard" the radiation was, one',
  'only knew when one tried it. So the technicians tried it on',
  'themselves: one held one’s own hand between tube and screen and saw',
  'how clearly the bones appeared. Every day, for years.',
  '',
  'What came of it stands in the case histories. First red, scaling',
  'skin that was taken for an irritation. Then cracks, warts, ulcers that',
  'no longer healed. Then the amputations — first individual fingers,',
  'then the hand, then the arm. Then, in many, leukaemia.',
  '',
  'Names, so that it does not remain a number:',
  '',
  '- **Clarence Dally**, glassblower and employee of Thomas Edison, held',
  '  his hands in the ray for years. Both arms were amputated; he died in',
  '  1904 at the age of thirty-nine. Edison thereupon stopped his work in',
  '  this field and said he wanted to hear nothing more of these rays,',
  '  that he was afraid of them.',
  '- **Elizabeth Fleischman**, one of the first X-ray technicians in',
  '  California, worked without any protection and died in 1905.',
  '- **John Hall-Edwards**, the doctor from Birmingham who in January 1896',
  '  had made one of the first images for surgical planning, lost his',
  '  left arm in 1908.',
  '- **Marie Curie**, who with the mobile stations saved so many lives,',
  '  died in 1934 of a bone marrow disease attributed to decades of',
  '  radiation exposure. Her notebooks are to this day so heavily',
  '  contaminated that they are kept in lead-lined boxes.',
  '',
  'On 4 April 1936 the **Radiology Memorial** was dedicated in Hamburg in',
  'the garden of St Georg Hospital. On it stand the names of female and',
  'male doctors, technicians and carers from fifteen countries who died',
  'from the consequences of their work with the rays. At first there were',
  '169 names. Later names were added until there were around 360. **It is',
  'the only monument of its kind in the history of medicine: a list of',
  'professionals who died of their own progress.** Studies of whole',
  'cohorts of radiologists later confirmed what the stone claims:',
  'whoever started before 1920 died significantly more often of leukaemia',
  'than his colleagues in other fields. Among those who started after the',
  'introduction of the protection rules, this difference disappeared.',
  '',
  '## "Do you bear guilt for it?"',
  '',
  'The honest answer is: partly, and not the way one thinks.',
  '',
  'What speaks for me: I worked with lead early on. From the very',
  'beginning my tube stood in a zinc box lined with lead, and I did not',
  'stand in the ray. I reached 77 and died in 1923 of bowel cancer; a',
  'connection with the rays is considered unlikely. One can learn from',
  'this that caution was possible even then — it was not knowledge from',
  'the future but a question of attitude.',
  '',
  'What speaks against me, and it weighs more heavily:',
  '',
  '**First: I did not warn loudly.** I published three communications',
  'about the rays and then turned to other questions. In the years in',
  'which the fairground booths opened and the first hands became',
  'inflamed, I was the most famous physicist in the world. A word from me',
  'would have carried weight. I did not speak it because I hated fuss and',
  'because I did not consider myself responsible. **But whoever puts a',
  'force into the world is responsible, even if he would rather not',
  'be.**',
  '',
  '**Second: I found the rays, not the dose.** In my communication it',
  'stands how far the rays penetrate aluminium and platinum. It does not',
  'stand in it how much of it a human being tolerates, for that I did not',
  'know and did not investigate. A discovery without measure is a half',
  'discovery. The units in which radiation is measured today, the limit',
  'values, the lead apron, the distance, the recording of every single',
  'examination: **all of that medicine worked out decades later — paid',
  'for with the names on the Hamburg stone.**',
  '',
  '**Third, and that is the general lesson:** this chapter repeats a',
  'pattern that runs through this book from the beginning. The surgery in',
  'Chapter 11 killed before it saved. Vaccination in Chapter 12 began',
  'with experiments that nobody would permit today. The rays killed their',
  'own pioneers before radiology grew out of them. And the second voice',
  'of this chapter will tell you how an agent that saved millions',
  'simultaneously gave the bacteria the training to survive it.',
  '',
  '**Harm rarely arises from ill will. It almost always arises from the',
  'same conviction: that one may skip the time of testing because the',
  'thing is obviously good.** I took seven weeks before I took the word',
  '"rays" into my mouth. The world took seven days before it did business',
  'with them. The difference between these two spans of time is the',
  'content of the list of names in Hamburg.',
  '',
  '## "What endures — and what has done harm?"',
  '',
  'Let us take stock, in both directions, as soberly as a series of',
  'measurements.',
  '',
  '**What endures.** Imaging is today the foundation of almost every',
  'serious diagnosis. Out of the single plate of 1895 have grown',
  'procedures that I could not have dreamed of: computed tomography, in',
  'use since 1971, which computes sectional images from many individual',
  'exposures; magnetic resonance imaging, which works entirely without',
  'these rays and shows the soft tissues for which my plate was blind;',
  'ultrasound, which needs neither radiation nor a magnetic field. Add to',
  'that radiation therapy: with some kinds of cancer it heals, with many',
  'others it prolongs and eases life. **And the simplest gain is the',
  'greatest: millions of broken bones have healed correctly because',
  'someone looked first.**',
  '',
  '**What has done harm.** The first generation of professionals paid',
  'with their hands and their lives. Two generations of patients were',
  'irradiated for complaints for which one should not have irradiated.',
  'And radiation exposure is not past: today it is regulated, measured',
  'and much smaller — but it is not zero. An image of the chest',
  'corresponds roughly to what a human being absorbs from his surroundings',
  'in a few days anyway. A CT scan of the abdomen corresponds to several',
  'years. In countries with well-equipped medicine, about half of a',
  'person’s total radiation exposure now comes from examinations meant to',
  'help him. Experts estimate that a small proportion of all cancers goes',
  'back to these examinations — **the estimates diverge and are disputed,',
  'because small doses cannot be measured directly but only',
  'extrapolated.** What is undisputed is the conclusion: **every image is',
  'a balancing act. It must have a reason.**',
  '',
  '**What remains open.** My rays have given medicine an excellent eye',
  'and not a single hand. **They say what is — they do not say what is to',
  'be done.** That is the imbalance that accompanies this book to its',
  'last chapter: modern medicine is brilliant in diagnosis and, in the',
  'treatment of the long-lasting diseases — cancer, diabetes, rheumatism',
  '— very much weaker than its images suggest. An image can be as sharp',
  'as it likes; whether it helps depends on whether there is a treatment',
  'and whether the person wants it. In a hundred years we have seen',
  'enormously better. Whether we have helped better to the same degree is',
  'a question I cannot answer. It belongs to you.',
  '',
  '## "One last question: could chance have struck someone else?"',
  '',
  'Of course. It even did — and was overlooked. And thirty-three years',
  'after my Friday evening it struck again, a thousand kilometres further',
  'west, and this time it hit not a physicist but a bacteriologist with',
  'an untidy laboratory.',
  '',
  'With that I pass on. **The second voice of this chapter belongs to',
  'Alexander Fleming in London** — the man who came back from his holiday',
  'at the end of September 1928 and found on his bench a culture dish',
  'that had gone mouldy. Around the mould the bacteria had dissolved. He,',
  'like me, did not clear it away but looked.',
  '',
  'He will also tell you what I was spared. That he could not get his',
  'active substance pure and penicillin remained a footnote for eleven',
  'years. That only Howard Florey, Ernst Boris Chain and Norman Heatley',
  'in Oxford made a medicine out of the juice — with bedpans and milk',
  'cans, because there were no apparatuses for it. That the first',
  'treatment failed on a policeman in 1941 because the agent ran out,',
  'although it helped. That it took American industry to make out of it',
  'the millions of doses that went ashore with the troops in Normandy in',
  '1944.',
  '',
  'And he will repeat to you the warning he pronounced in Stockholm in',
  '1945 when he received the Nobel Prize: **that bacteria learn to',
  'survive an agent when it is used too often and too weakly.** He said',
  'it when penicillin was still the wonder of the world. Today, resistant',
  'pathogens are one of the greatest worries of the hospitals.',
  '',
  '**Two chances, thirty-three years apart. Out of the one became the',
  'eye of medicine, out of the other its sharpest weapon. Both first',
  'harmed and then saved — and both are to this day not finished',
  'demanding their price.**',
  '',
  'Now listen to the other chance.',
].join('\n');

/**
 * Fleming — the second interview, 33 years later. The dish in London,
 * the chance that did not seem repeatable — and the discoverer's warning
 * about resistance, which has come true today.
 *
 * Written by DeepSeek (round 13, second pass). This voice too names the
 * uncomfortable places of its own side itself (additional rule for
 * sensitive topics) — and adheres to the no-rumours rule.
 */
const stimmeDesFleming = [
  '## The Man Who Did Not Tidy Up the Laboratory',
  '',
  'The physicist in Würzburg has given his interview — the questions',
  'about chance, about the patent, about guilt. Now, thirty-three',
  'years later, a second man sits before the same questioner:',
  'Alexander Fleming, bacteriologist in London, a man famous for his',
  'disorder. On his laboratory table Petri dishes pile up, some for',
  'weeks, overgrown with mould. The colleagues joke about it. Chance,',
  'as it will turn out, loves disorder.',
  '',
  '## "What happened here, Professor?"',
  '',
  'It happened on 28 September 1928, and it happened because I went on',
  'holiday. Before that I had set up cultures of staphylococci — the',
  'bacteria that cause suppuration — and put the dishes on the table,',
  'carelessly, as always. In my absence a spore settled from the air,',
  'from a laboratory on the floor below, where moulds were cultivated.',
  'When I came back, I saw: around the mould spot the bacterial',
  'colonies had become transparent — dissolved, dead. The mould, an',
  'unassuming "Penicillium notatum", had killed them. Anyone else',
  'would have thrown the dish away. I said: "That is interesting."',
  '',
  '## "And what did you think at that moment?"',
  '',
  'I thought: the mould makes a substance that kills bacteria without',
  'attacking them — it secretes it to keep its space free. If one can',
  'obtain this substance, one has an agent against the pus cocci —',
  'against blood poisoning, pneumonia, wound infection, the scourges',
  'of surgery that Lister could only keep away, not heal. I called the',
  'substance penicillin and wrote a paper about it. The world nodded',
  'politely. Nobody hurried over. For there was a catch: the penicillin',
  'was a drop in the ocean — tiny, unstable, impossible to purify. I',
  'tried for ten years, and I failed at it. A researcher who had found',
  'the most important substance in medicine and could not make it',
  'bottle-ready. That is the humility that stands in no heroic story.',
  '',
  '## "Who then made it into medicine?"',
  '',
  'Two men in Oxford: the Australian Howard Florey and the',
  'German-Briton Ernst Chain. They read my 1929 paper when the war',
  'began, and they made a drug out of the drop — with patience, with',
  'chemistry, with all the need of the war behind them. In 1941 the',
  'first patient came to the turn: a policeman named Albert Alexander,',
  'with blood poisoning that had survived every agent. The penicillin',
  'worked — for four days. Then the supply ran out; they distilled it',
  'back from his urine, but it was not enough. Albert Alexander died.',
  'Medicine had seen for the first time what was possible — and how',
  'cruel scarcity is. After that came American industry: the mass',
  'production, the mould from a mouldy melon from Peoria that',
  'surpassed everything. In March 1942 the first US patient was saved',
  'in New Haven — Anne Miller, close to death after a miscarriage. And',
  'on 6 June 1944, at the landing in Normandy, two million three',
  'hundred thousand doses of penicillin lay in the medical kits of the',
  'Allies. The agent that made modern medicine possible came in the',
  'luggage of liberation.',
  '',
  '## "You could have become rich. No patent?"',
  '',
  'I took no patent — I wanted the substance to belong to humanity, as',
  'Röntgen gave away his rays. Florey and Chain did not do it either;',
  'they published the production methods so that every company could',
  'help. That sounds pious, but it was also wise: in war only what',
  'benefits everyone counts. Industry later earned its money — and with',
  'it made the next stage possible. But the story of this discovery',
  'belongs to those who gave it away.',
  '',
  '## "You warned in 1945. What became of the warning?"',
  '',
  'In 1945, in my Nobel Prize speech, I said: whoever takes too little',
  'penicillin or stops too early makes the bacteria insensitive — and',
  'the germ that survives passes the resistance on to its descendants.',
  'I warned against wasting the agent. The world did not listen. Today',
  'the warning has come true: multi-resistant germs are one of the',
  'greatest threats to medicine; antibiotics are used in livestock',
  'farming in quantities that breed resistance; and new antibiotics',
  'hardly reach the market any more because they no longer pay off.',
  'The wonder drug that saved medicine is in the process of outliving',
  'itself. I saw it coming — and could not stop it. That too belongs',
  'to the truth of this discovery.',
  '',
  '## "Do you bear guilt for it?"',
  '',
  'Now the uncomfortable places, for this voice too has its bill. Guilt',
  'is too big a word for a truth that is smaller and sharper: medicine',
  'wasted the gift because it took success for granted. I found the',
  'substance but did not make it bottle-ready; industry multiplied it',
  'but also marketed it; the doctors prescribed it where it helped',
  'nothing — against viruses, against colds, at the patients’ request.',
  'We all took part in the waste; nobody stopped in time. The cycle',
  'this book describes has also fulfilled itself here: the new saved',
  'millions — and the arrogance afterwards created the price we pay',
  'today.',
  '',
  '## "What endures — and what has done harm?"',
  '',
  'What endures: penicillin itself, which to this day is the foundation',
  'of the antibiotics and has saved countless lives — every operation,',
  'every chemotherapy, every premature-baby ward stands on it. And the',
  'attitude of the discoverers: giving away instead of patenting. What',
  'has done harm: the waste, the resistance, the livestock farming,',
  'the belief that the wonder drug is inexhaustible. Medicine has',
  'learned from penicillin how to defeat bacteria — and it has not yet',
  'learned how to manage the victory frugally.',
  '',
  '## The Answer to the Physicist',
  '',
  'The physicist in Würzburg asked at the end whether chance could',
  'have struck someone else. The answer of this second interview: yes',
  '— but it strikes only the prepared. Röntgen took the glowing screen',
  'seriously; I did not throw the dish away. Chance delivers the',
  'moment; the way of thinking decides what becomes of it. And the way',
  'of thinking that distinguishes both discoveries is the same:',
  'looking when something does not fit — and giving the result away',
  'instead of hoarding it. Whether medicine keeps this way of thinking',
  'when discoveries become business is the question of the chapters',
  'that now come.',
].join('\n');

/** Chapter 14 of the topic map. */
const roentgenPenicillin = {
  id: 'roentgen-penicillin',
  titel: 'X-rays and Penicillin',
  epoche: '1895 / 1928',

  aufhaenger: {
    frage:
      'What do a glowing screen and a mouldy culture dish have in ' +
      'common?',
    text: [
      'Both were chances — and both transformed medicine.',
      '',
      'On 8 November 1895 a screen lights up in a darkened Würzburg',
      'laboratory, although the tube beside it is wrapped in black card.',
      'Wilhelm Conrad Röntgen holds his hand in between and sees the',
      'shadows of his own bones. Seven weeks later the image of a hand',
      'with a wedding ring lies on a photographic plate — and for the',
      'first time in history a human being can see into a living body',
      'without opening it.',
      '',
      'At the end of September 1928 a bacteriologist in London comes',
      'home from his holiday. On his laboratory bench stands a forgotten',
      'culture dish on which a mould has grown — and around the mould',
      'the bacteria have disappeared. Alexander Fleming calls the',
      'substance penicillin. For eleven years the discovery remains a',
      'footnote because nobody can get it pure. Then a team in Oxford',
      'makes a medicine out of the juice, and American industry makes',
      'millions of doses out of it.',
      '',
      'Out of the one chance came the medicine of the image: X-rays, CT,',
      'MRI, radiation therapy — the foundation of almost every diagnosis',
      'today. Out of the other came the agent that first made modern',
      'medicine possible: without antibiotics no major operations, no',
      'transplantations, no chemotherapy.',
      '',
      'This chapter tells both — and what it cost. The euphoria that',
      'came before knowledge: fluoroscopy at fairgrounds, in shoe shops,',
      'in beauty salons. The pioneers who died of their own rays and',
      'whose names stand on a memorial in Hamburg. And the warning that',
      'the discoverer of penicillin already pronounced in 1945 — and',
      'that has come true today.',
    ].join('\n'),
  },

  // The map lives in utils/themen/karten/roentgen-penicillin.js — here
  // only the phase hints are translated (phasen → karteHinweise), not the
  // map itself.
  karteHinweise: [
    {
      label: '1895/96: the X-rays — Würzburg and the world',
      hinweis:
        'On the evening of 8 November 1895 Wilhelm Conrad Röntgen works ' +
        'in the Physics Institute of the University of Würzburg with a ' +
        'discharge tube that he has wrapped in black card. A screen ' +
        'lying a few steps away begins to glow. For seven weeks he tests ' +
        'what passes through; on 22 December the image of a hand with a ' +
        'ring comes into being. On 28 December 1895 he submits his ' +
        '"Vorläufige Mittheilung"; on 1 January 1896 he sends offprints ' +
        'to fellow scientists. On 5 January a Viennese newspaper brings ' +
        'the news; on 13 January Röntgen demonstrates the rays in Berlin ' +
        'at court. Within a few weeks apparatuses are being rebuilt and ' +
        'fluoroscopy performed in Europe and America.',
    },
    {
      label: '1896–1930: the euphoria and the first radiation damage',
      hinweis:
        'The new rays become a sensation: fairground booths X-ray hands ' +
        'for an admission fee, shoe shops set up fluoroscopy devices, ' +
        'beauty institutes remove hair with them. Because one feels ' +
        'nothing, one holds the rays to be harmless — the damage comes ' +
        'with delay. Doctors, technicians and demonstrators get burns ' +
        'that do not heal; fingers, hands and arms are amputated; ' +
        'conspicuously many of the early radiologists die of leukaemia. ' +
        'In 1936 the Radiology Memorial is dedicated in Hamburg, ' +
        'initially with 169 names from fifteen countries. Röntgen ' +
        'receives the first Nobel Prize in Physics in 1901, moves to ' +
        'Munich in 1900 and dies there in 1923.',
    },
    {
      label: '1928: the mouldy dish — London, St Mary’s Hospital',
      hinweis:
        'Alexander Fleming studies staphylococci in his laboratory at ' +
        'St Mary’s Hospital in Paddington. Before the summer holiday the ' +
        'culture dishes remain standing on the bench. After his return ' +
        'at the end of September 1928 — 28 September counts as the day ' +
        'of the discovery — a dish has gone mouldy, and around the mould ' +
        'the bacteria have dissolved. Fleming identifies the fungus as ' +
        'Penicillium, calls the juice from it "penicillin" and publishes ' +
        'in 1929. The professional world barely takes notice: the ' +
        'substance is unstable, cannot be purified and counts as a ' +
        'laboratory curiosity.',
    },
    {
      label: '1939–1941: Oxford purifies the penicillin',
      hinweis:
        'At the Sir William Dunn School of Pathology in Oxford, Howard ' +
        'Florey, Ernst Boris Chain and Norman Heatley take up Fleming’s ' +
        'paper again. Heatley builds an apparatus for extraction from ' +
        'milk cans, bedpans and biscuit tins. On 25 May 1940 treated ' +
        'mice survive a deadly infection; the untreated ones die. On ' +
        '12 February 1941 the policeman Albert Alexander is treated; his ' +
        'condition improves clearly, but the supply does not suffice — ' +
        'he dies on 15 March 1941. The agent works. There is only far ' +
        'too little of it.',
    },
    {
      label: '1941–1945: mass production and the landing in Normandy',
      hinweis:
        'In July 1941 Florey and Heatley travel to the United States ' +
        'because British industry has no capacity in the war. At the ' +
        'research laboratory in Peoria, Illinois, corn steep liquor ' +
        'increases the yield; in 1943 a mould from a melon from the ' +
        'market delivers the most productive strain. American companies ' +
        'build large fermentation tanks. In March 1942 the first patient ' +
        'in the USA is saved in New Haven. For the landing in Normandy ' +
        'on 6 June 1944 around 2.3 million doses stand ready. In 1945 ' +
        'Fleming, Florey and Chain receive the Nobel Prize — and Fleming ' +
        'warns in his speech against pathogens that become resistant.',
    },
  ],

  perspektiven: [
    {
      id: 'roentgen',
      name: 'The only interview — the voice of the discoverer',
      stimme: 'Opus',
      text: stimmeDesEntdeckers,
    },
    {
      id: 'fleming',
      name: 'The Voice of Fleming',
      stimme: 'DeepSeek',
      text: stimmeDesFleming,
    },
  ],

  synthese: [
    '## Where the two voices meet',
    '',
    'First the common ground — and it is the pattern that runs through this',
    'book: both discoveries were chances, and both struck only the',
    'prepared. Röntgen tested the glowing screen for seven weeks before he',
    'said a word; Fleming did not throw the dish away because he looked.',
    'Both gave their discovery away — no patent, no profit; both remained',
    'modest when the world celebrated them. Both lived through the harm of',
    'their discovery: Röntgen the burnt pioneers, Fleming the resistance',
    'he foresaw. And both knew: the new is not finished when it is',
    'discovered — it needs time, testing and humility before it becomes a',
    'blessing.',
    '',
    '## Where they part ways',
    '',
    'The contradiction begins with the question of what became of the',
    'discovery. Röntgen’s image became a commodity within days — shoe',
    'shops, fairgrounds, beauty salons; the harm (the radiation damage)',
    'came at once, the benefit (radiology) needed decades. Fleming’s agent',
    'needed thirteen years to reach the clinic — the harm (the resistance)',
    'came late, the benefit (millions of saved lives) came first. The one',
    'discovery was there too early for its own safety, the other too early',
    'gone for its own caution. And they part ways on the question of',
    'industry: the physicist gave away his rays, and nobody could patent',
    'them — nature was the patent. Penicillin could be manufactured, and',
    'industry made of it a business that made the rescue possible — and',
    'brought the waste with it. Giving away was noble; production was',
    'necessary; the question of who profits from life remained open.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'For the thirteenth time the same pattern — and now it becomes a rule:',
    'the innovation cycle. Many new ideas that later proved to be a',
    'blessing were at first very harmful and destroyed much — surgery',
    'first killed through wound fever, the rays burnt their pioneers,',
    'vaccination began with unethical experiments, penicillin produced the',
    'resistance. The harm often came from the conviction that one could',
    'skip the time of testing. Whoever knows this pattern reads medicine',
    'differently — and he also reads the present differently.',
    '',
    'For this chapter asks the question that leads to the chapters of the',
    'present: if the new first harms and later benefits — who then decides',
    'how long the testing time lasts, and to whom does the benefit belong',
    'when it is finally there? Röntgen and Fleming gave away. The medicine',
    'that now arises will have to learn to live with what discoveries',
    'become when they become business: the nationalisation, the',
    'pharmaceutical industry, the question of whom health belongs to.',
  ].join('\n'),

  urteil: {
    frage:
      'Would you wish for a discovery that changes everything — even ' +
      'if you knew that its price would only become visible in decades?',
    hinweis: [
      'There is no right and no wrong here. Take two numbers from this',
      'chapter. Röntgen tested for seven weeks before he said a word; seven',
      'days after the first newspaper report money was already being made',
      'with the rays. Ask yourself three things. First: how long would you',
      'have tested in his place — and what would have made you speak?',
      'Second: who should decide how long a new thing is tested when people',
      'are now waiting for it? Third: does your answer change if the harm',
      'does not hit you but those who come after you? Precisely between',
      'these questions lies the decision that medicine must make again and',
      'again with every new technique.',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'What happened on the evening of 8 November 1895 in Röntgen’s ' +
        'laboratory in Würzburg?',
      antworten: [
        'He operated on a patient under anaesthesia for the first time.',
        'A screen lit up although the discharge tube was wrapped in ' +
          'black card.',
        'He discovered a new pathogen under the microscope.',
      ],
      richtig: 1,
      erklaerung:
        'Röntgen was investigating cathode rays and had wrapped the tube ' +
        'light-proof. A paper screen coated with barium platinocyanide, ' +
        'lying one and a half metres away, glowed anyway in time with the ' +
        'discharges. It could not be cathode rays — so something unknown ' +
        'was passing through the covering. Röntgen called them X-rays, ' +
        'because the X in mathematics stands for the unknown quantity.',
    },
    {
      frage:
        'What did the famous image of 22 December 1895 show?',
      antworten: [
        'The chest of a soldier with a bullet in it.',
        'The hand of Röntgen’s wife Bertha — the bones and the wedding ' +
          'ring.',
        'A child’s broken forearm.',
      ],
      richtig: 1,
      erklaerung:
        'Bertha Röntgen laid her left hand on a photographic plate for a ' +
        'good quarter of an hour. The result was the first published ' +
        'X-ray image of a human being: the bones joint for joint, plus ' +
        'the dark ring on the finger. Röntgen enclosed prints of it with ' +
        'the offprints he sent to fellow scientists on 1 January 1896 — ' +
        'this image made the discovery world-famous within days.',
    },
    {
      frage:
        'What were the new rays used for in the first decades outside the ' +
        'hospitals?',
      antworten: [
        'Only for the search for bullets and splinters in the wounded.',
        'Not at all — the use was strictly regulated from the beginning.',
        'Among other things for amusement at fairgrounds, for buying ' +
          'shoes and for hair removal in beauty salons.',
      ],
      richtig: 2,
      erklaerung:
        'Because one does not feel the rays, they long counted as ' +
        'harmless. From the 1920s fluoroscopy boxes stood in shoe shops — ' +
        'in the USA alone around ten thousand; beauty salons removed hair ' +
        'with them. The damage showed itself only years later. From the ' +
        '1950s the devices were banned.',
    },
    {
      frage:
        'What is the Radiology Memorial in Hamburg?',
      antworten: [
        'A monument to the inventors of computed tomography.',
        'A memorial stone for doctors, technicians and carers from ' +
          'fifteen countries who died of the consequences of the rays.',
        'The first German X-ray institute.',
      ],
      richtig: 1,
      erklaerung:
        'The memorial was dedicated on 4 April 1936 in the garden of St ' +
        'Georg Hospital. At first 169 names stood on it, later around ' +
        '360. The early pioneers tested the hardness of the tubes on ' +
        'their own hand; burns, amputations and leukaemia were the ' +
        'consequence. From these experiences arose dose limits, lead ' +
        'aprons and distance rules.',
    },
    {
      frage:
        'Why did Röntgen not file a patent on his discovery?',
      antworten: [
        'Because patent law at that time did not cover rays.',
        'Because he considered the discovery worthless.',
        'Because he believed a discovery of nature belongs to the ' +
          'public — and because a patent would have slowed the spread.',
      ],
      richtig: 2,
      erklaerung:
        'Röntgen stressed that he had invented nothing but found ' +
        'something that had always existed. Because nobody had to pay, ' +
        'rebuilt devices stood within months in hospitals from Chicago ' +
        'to Saint Petersburg. He received the first Nobel Prize in ' +
        'Physics in 1901 and gave the prize money to the University of ' +
        'Würzburg; he declined the offered title of nobility.',
    },
  ],
};

module.exports = roentgenPenicillin;
