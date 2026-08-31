// Chapter 16 — "The modern pharmaceutical industry".
//
// The sixth chapter of the modern era and the first in which the main
// role is played not by a researcher, not by a law, but by a company.
// Since 1883 a sickness fund has been paying for treatment (Chapter
// 13). For the first time in the history of medicine there is thus a
// solvent market for medicines — and a trade that supplies it. From a
// pharmacy in Darmstadt and two dye works on the Wupper and the Main,
// within a hundred and fifty years, grows an industry with a turnover
// of around one and a half trillion dollars a year that has ended
// diseases our great-grandparents died of — and that earns from the
// fact that people are ill.
//
// The WAY-OF-THINKING analysis is the heart of the chapter (operator
// requirement). It asks here: Why does a medicine cost so much?
// (Because what is paid for is what was searched for, not what was
// manufactured: ten to fifteen years, three study phases — and of the
// candidates that reach the first test in humans at all, about one in
// ten is approved.) Why a tablet and not advice? (Because the way of
// thinking of the industry sees illness as a chemical problem — a
// molecule against a process; and because only the tablet can be
// dosed, tested, patented and sold.) Why lifelong medication?
// (Because chronic diseases need daily remedies — and because a
// remedy taken for thirty years is paid for for thirty years.) And
// the flip side of each of these reasons: research is done where the
// money is, not where the need is greatest.
//
// LENGTH RULE (operator feedback 24.08.2026): From Chapter 9 onward
// the reverse applies — complete and detailed; for this chapter
// expressly so (the financial dependence of research). Detailed does
// not mean bloated: every paragraph carries the narrative forward.
// Measured in tests/karte-pharmaindustrie.mjs.
//
// TONE rule: BOTH sides fair. This first voice shows the
// achievements of the industry (insulin, the sulfonamides,
// penicillin, the HIV therapy, the cancer drugs, the vaccines) AND
// names the uncomfortable places itself: the early period without
// testing (cocaine as a miracle cure, heroin as a cough medicine),
// thalidomide, the marketing that crossed the line (Vioxx,
// OxyContin, suppressed studies), lifelong medication as a business
// model and the honest balance sheet: strong in diagnosis, weak at
// the chronic diseases.
//
// THE NO-RUMOURS RULE (operator decision of 25.08.2026): Only what is
// documented. Where numbers are estimates (the number of thalidomide
// children, the development costs of a medicine), the text says so
// explicitly and gives the counter-calculation.
//
// THE INNOVATION CYCLE (operator observation of 26.08.2026, red
// thread): The pattern of the book repeats itself here twice in pure
// form. Heroin was a cough medicine for twenty-three years before it
// was banned. Thalidomide harmed thousands of children — and is today
// an approved remedy against complications of leprosy and bone marrow
// cancer. The voice names this itself.
//
// Voices (round 15): The FIRST perspective — the industry from
// within, as its own package insert — was written by Opus. The
// SECOND (the criticism: the financial interests, the business with
// illness, study funding, the suppressed negative results, the
// conflicts of interest in the clinical guidelines, the simple
// medicine without a lobby) and the final synthesis were added by
// Hermes in the second pass. Perspective workflow: CLAUDE.md.
//
// NO REPETITIONS (operator decision of 21.08.2026): Chapter 1 is
// structured by "who speaks here", chapter 2 begins with a scene,
// chapter 3 tells a day in the life, chapter 4 is an exchange of
// letters, chapter 5 the journey of a book, chapter 6 a tour,
// chapter 7 a trial, chapter 8 an invoice, chapter 9 a clock,
// chapter 10 a chain, chapter 11 a lens, chapter 12 an interview,
// chapter 13 a file. This chapter chooses the fifteenth dramaturgy:
// THE PACKAGE INSERT. The industry speaks in the form it invented
// itself — in rubrics, small print, with composition, indications,
// dosage, interactions, side effects and contraindications. The
// second voice may step into the same form: the other package
// insert, the same active ingredient, read from the other side.
//
// The map itself lives in utils/themen/karten/pharmaindustrie.js —
// here only its texts are translated (phases, points, movements) as
// karteHinweise, not the map itself.
//
// The texts are stored as line arrays with `.join('\n')` — this
// keeps them readable in the repo at ~72 characters (the operator
// reads them against it here), and utils/markdown.js turns them back
// into flowing text in the app.
//
// CommonJS without UI imports (architecture rule): checkable with
// plain `node`.

/**
 * The voice of the industry — the package insert of a trade.
 *
 * Written by Opus (round 15). A voice that speaks for the side that
 * makes the medicines: its reckoning, its way of thinking, its
 * achievements. It tells why it does what it does — and it names the
 * uncomfortable places itself (additional rule for sensitive topics
 * in CLAUDE.md).
 */
const stimmeDerIndustrie = [
  '## The package lying before you',
  '',
  'Take any box from your cupboard. Twenty tablets in a',
  'blister, a cardboard carton with Braille, a leaflet folded',
  'eight times that hardly anyone reads to the end. On this',
  'leaflet stands everything an authority deems necessary: what',
  'is inside, what it helps against, how much one takes, what',
  'can go wrong.',
  '',
  'This chapter is such a leaflet. Only this time it is not a',
  'medicine that stands on it, but the trade that makes the',
  'medicines.',
  '',
  '**What you read here is the industry\'s view of itself — a',
  'way of thinking, not a truth.** I speak of us in the',
  'we-form, because that is more honest than a neutral tone,',
  'which does not exist here. We are the chemists, the',
  'physicians in the testing departments, the people in',
  'approval, in the plant, in sales, on the board. We have',
  'ended diseases your great-grandparents died of. We earn',
  'money from the fact that people are ill. Both stand on this',
  'package insert, and neither cancels out the other.',
  '',
  'A package insert has a peculiarity that makes it usable for',
  'this chapter: **It is the only advertisement in the world',
  'that prescribes writing the bad about your own product',
  'too.** Not voluntarily. It took catastrophes before these',
  'rubrics stood on the paper. These catastrophes will be',
  'spoken of further below.',
  '',
  'Two preliminary remarks on the numbers, because this chapter',
  'is full of numbers. First: **Where a number is an estimate,',
  'I say so.** There are in this story some numbers that are',
  'copied everywhere and are nevertheless disputed — the',
  'development costs of a medicine, for example. I then give',
  'the calculation and the counter-calculation. Second:',
  'turnover is not profit, and profit is not proof of bad',
  'intention — but it is also not background noise. It',
  'explains what is researched and what is not.',
  '',
  '## Patient information: please read in full',
  '',
  'What lies in this package, in the order in which a package',
  'insert lists it:',
  '',
  '1. what this industry is and what it is used for;',
  '2. where the active ingredient comes from — a pharmacy and two dye works;',
  '3. the time before testing: cocaine, heroin, soothing syrups;',
  '4. the turning point: salvarsan, insulin, sulfonamides, penicillin;',
  '5. thalidomide — the catastrophe on which our rules are written;',
  '6. the composition of the price;',
  '7. the pharmaceutical form: why a tablet and not advice;',
  '8. the duration of use: the business of again and again;',
  '9. interactions: the marketing and its crossed lines;',
  '10. side effects: the honest balance sheet of our side;',
  '11. contraindications: where our way of thinking may not be applied.',
  '',
  'At the end stands a warning — the part that stands on none',
  'of our packages.',
  '',
  '## 1. What this industry is and what it is used for',
  '',
  'Soberly, first the size. The world market for medicines',
  'today lies at around **one and a half trillion dollars a',
  'year** — one and a half thousand billion. Almost half of it',
  'is turned over in North America, where less than a',
  'twentieth of humanity lives. The twenty largest',
  'corporations together employ well over a million people.',
  '',
  'And now the effect these numbers stand for. In 1900 life',
  'expectancy in the German Empire lay at about **forty-six**',
  'years, today at about eighty-one. Pneumonia was a death',
  'sentence with an uncertain outcome; a suppurating wound on',
  'the leg could kill a healthy man in a week; a child with',
  'diabetes died — and died for certain, usually within a year',
  'of the diagnosis.',
  '',
  '**That is no longer so today, and part of this difference',
  'is our work.** I say expressly: part. The greater part of',
  'the decline of the great infectious diseases belongs not to',
  'us but to the sewers, clean drinking water, better housing',
  'and better nutrition. Chapter 15 worked it out for Hamburg',
  'and Altona, chapter 12 on the curves that were already',
  'falling before the vaccinations came. Whoever does not hear',
  'this sentence from us gets a whitewashed story told by us.',
  'Our contribution comes later, and it is narrower than our',
  'advertising suggests — but it is there, and it can be',
  'verified.',
  '',
  'What, then, is this industry used for? **It turns molecules',
  'into medicines.** It seeks substances, tests them, produces',
  'them in unchanging purity, in millions of packages, each',
  'like the other, with a shelf life and a dose one can rely',
  'on. That sounds boring. It is half the achievement. A',
  'herbal extract works with different strength depending on',
  'soil, harvest year and preparation; a tablet works in Kiel',
  'as in Cape Town.',
  '',
  '## 2. Origin of the active ingredient: a pharmacy and two dye works',
  '',
  'Our origin has two roots, and both lie close together on',
  'the map of this chapter.',
  '',
  '**The first root is the pharmacy.** In 1668 Friedrich Jacob',
  'Merck takes over the Engel-Apotheke in Darmstadt. For',
  'almost a hundred and sixty years what apothecaries have',
  'done since the Middle Ages happens there: mixing what the',
  'physician prescribes. Then, in 1827, comes the step that',
  'changes everything. Emanuel Merck produces pure alkaloids —',
  'morphine, codeine, quinine — no longer only for his own',
  'counter, but for trade, in unchanging quality and in',
  'quantity.',
  '',
  'One can skip over this sentence. It is the quiet turning',
  'point of the whole story. **Until then, medicine was',
  'something prepared for a particular sick person. From then',
  'on, medicine is a product with label, price and brand,',
  'manufactured for a market.** The apothecary mixed for you.',
  'The factory produces for many — and you are one of many.',
  '',
  '**The second root is the colour.** In 1863, in the same',
  'year, two dye works come into being: in Barmen-Elberfeld on',
  'the Wupper the one of Friedrich Bayer and Johann Friedrich',
  'Weskott, in Frankfurt-Höchst on the Main the one of',
  'Meister, Lucius und Brüning. In Basel, Ciba, Geigy and',
  'Sandoz grow out of silk dyeing works; in 1896',
  'Hoffmann-La Roche joins them. In Berlin, in 1851, Ernst',
  'Schering\'s Grüne Apotheke becomes a company.',
  '',
  'Why of all things dye works? Two reasons, one artisanal and',
  'one intellectual.',
  '',
  'The artisanal: whoever makes aniline dyes has vats,',
  'distillation apparatus, chemists and a laboratory. The same',
  'equipment that cooks a dyestuff also cooks a medicinal',
  'substance.',
  '',
  'The intellectual one is the more interesting — and it is',
  'the origin of our whole way of thinking. A dye does not',
  'colour everything alike. It attaches to wool and not to',
  'cotton, it colours the cell nucleus in a preparation and',
  'leaves the rest pale. Paul Ehrlich, who as a young man',
  'worked with such dyeings, drew from it the conclusion that',
  'carries the medicine of the twentieth century: **If a',
  'substance can distinguish which tissue it binds to, then a',
  'substance must be buildable that hits only the pathogen and',
  'leaves the human being in peace.** He called it the magic',
  'bullet.',
  '',
  'That is the birth certificate of our way of thinking, and',
  'it is astonishingly simple: **The body is a chemical',
  'system. An illness is a disturbance in this system. So it',
  'can be remedied with a substance that intervenes at exactly',
  'the right place.** Key and lock. Everything we have done',
  'since follows from this sentence — the successes and the',
  'blind spots alike.',
  '',
  '## 3. The time before testing: cocaine, heroin and a syrup for infants',
  '',
  'And now the rubric we would most like to leave out. It',
  'comes early because it came early.',
  '',
  'In the late nineteenth century there was no approval. There',
  'was no authority that demanded proof of efficacy, no duty',
  'to report side effects, no controlled study. **Whoever',
  'wanted to sell a remedy did not have to prove that it',
  'helped. He had to find a buyer.** That is no accusation',
  'against our predecessors; that was the legal situation.',
  '',
  'What came of it can be shown with three substances.',
  '',
  '**The cocaine.** In 1884 the Viennese eye physician Karl',
  'Koller shows that a solution of it numbs the eye — the',
  'first local anaesthesia in the history of medicine. That is',
  'a real gift and holds to this day; the modern agents the',
  'dentist injects are its descendants. In the same decade,',
  'however, the same substance is sold as a stimulant, as a',
  'remedy against exhaustion, against toothache in children',
  'and against morphine addiction; it sits in wine tonics and,',
  'until 1903, in a famous American soft drink. The surgeon',
  'William Halsted, one of the greatest of his field, tried it',
  'on himself and remained dependent for the rest of his life.',
  '',
  '**The heroin.** This is the story that occurs least often',
  'in our anniversary publications, and it belongs at this',
  'place because it plays at the same laboratory bench as our',
  'greatest sales success. On 10 August 1897 Felix Hoffmann',
  'produces acetylsalicylic acid in Elberfeld — sold as',
  'Aspirin from 1899. **Eleven days later, on 21 August 1897,',
  'the same man in the same laboratory produces',
  'diacetylmorphine.** The pharmacologist Heinrich Dreser',
  'tests it, finds it cough-suppressing and well tolerated,',
  'and from 1898 it is sold under the trade name "Heroin" —',
  'the name comes from "heroic", because the testers felt',
  'strong and well.',
  '',
  'It is advertised as a cough medicine, also for children, it',
  'is recommended as a substitute for morphine — and',
  'expressly as not habit-forming. It goes to more than twenty',
  'countries. Only when the dependence can no longer be',
  'overlooked does the assessment tip over: in 1913 production',
  'ends, in 1924 the United States ban the substance, in 1931',
  'it is strongly restricted in Germany.',
  '',
  '**For twenty-three years the most dangerous addictive drug',
  'of our time was a cough syrup of German production.** Not',
  'out of ill will. Out of a testing that by today\'s',
  'standards was no testing at all.',
  '',
  '**The soothing syrups.** In the home medicine cabinets of',
  'the nineteenth century stood remedies that soothed',
  'screaming infants. What was in them was not on the bottle:',
  'morphine, opium, alcohol. Children died of them. Only in',
  '1906 did the United States require that what is inside',
  'stands on the bottle — and even that was only a duty to',
  'declare, not a ban.',
  '',
  'The next rule cost lives again. In 1937 an American',
  'manufacturer dissolved a sulfonamide in diethylene glycol',
  '— antifreeze — and sold it as a raspberry-flavoured syrup.',
  '**One hundred and five people died, many of them',
  'children.** The substance had not been tested; it did not',
  'have to be. One year later the law demanded for the first',
  'time proof that a remedy is harmless.',
  '',
  'This is the pattern this book has told again and again',
  'since chapter 11: **The new often harms first, before it',
  'becomes a blessing.** Surgery killed through wound fever',
  'before it saved. The rays burned their pioneers before',
  'radiology came of it. With us it looks like this: **The',
  'harm did not come from our having bad substances. It came',
  'from our selling them before we knew them.**',
  '',
  '## 4. The turning point: salvarsan, insulin, sulfonamides, penicillin',
  '',
  'Between 1909 and 1945 a trade in substances becomes an',
  'industry that researches. Four remedies show how that went.',
  '',
  '**The salvarsan, 1910.** Paul Ehrlich seeks with his',
  'Japanese colleague Sahachiro Hata the magic bullet against',
  'syphilis, a disease that then afflicted millions and',
  'destroyed them slowly. They produce arsenic compounds and',
  'test them through, one after the other. Number 606 works.',
  'The Farbwerke Höchst bring it out in 1910. **It is the',
  'first medicine that was not found but sought and',
  'designed** — the beginning of the systematic search for',
  'active ingredients we still pursue today. Ehrlich himself',
  'warned of the side effects and of wrong application; there',
  'were severe injuries, and there was a bitter campaign',
  'against him. Both belong to it.',
  '',
  '**The insulin, 1922.** In Toronto, Frederick Banting and',
  'Charles Best together with John Macleod and James Collip',
  'win an extract from the pancreas. In January 1922 the',
  'thirteen-year-old Leonard Thompson receives the first',
  'injection; he lives. Before this day, diabetes in children',
  'was a disease that one delayed by months with starvation',
  'cures and that then killed.',
  '',
  'And now the sentence that has accompanied us to this day:',
  '**The discoverers surrendered the patent to the University',
  'of Toronto for a symbolic dollar.** No one should profit',
  'from a life-saving substance. For the production factories',
  'were needed nevertheless — Eli Lilly in Indianapolis',
  'delivers in large quantities from 1923, in Europe Höchst',
  'takes up the licensed production. What has become of this',
  'dollar a hundred years later stands further below under',
  '"side effects"; it is one of the most unpleasant paragraphs',
  'of this chapter.',
  '',
  '**The sulfonamides, 1932/35.** Gerhard Domagk seeks in',
  'Elberfeld among dyestuffs for a remedy against bacterial',
  'infections — the magic bullet idea, consistently tried',
  'through. The red azo dye Prontosil saves infected mice. In',
  '1935 he publishes. For the first time there is a remedy',
  'against wound infection, puerperal fever, blood poisoning',
  '— the killers of which chapters 11 and 13 tell. Domagk',
  'receives the Nobel Prize in 1939 and must decline it under',
  'pressure from the regime; he receives the medal only in',
  '1947.',
  '',
  '**The penicillin, 1941 to 1945.** The discovery belongs to',
  'chapter 14. To us belongs the second part: making a mass',
  'product out of a laboratory brew. American plants build',
  'fermentation tanks; for the landing in Normandy in June',
  '1944 millions of doses stand ready. **That is our actual',
  'role in this story, and it is not romantic: we rarely',
  'discover. We turn discoveries into quantities.** Without',
  'this ability the penicillin would have remained what it was',
  'for eleven years — a footnote in a specialist journal.',
  '',
  'And with the penicillin the flip side comes at once:',
  'Fleming warned already in 1945 in his Nobel speech of',
  'pathogens that become resistant. He was right. More on that',
  'below as well.',
  '',
  '## 5. Thalidomide 1957 to 1961: the catastrophe on which our rules are written',
  '',
  'Now the rubric on which one can read what a package insert',
  'really is: a scar in paper form.',
  '',
  'On **1 October 1957** Chemie Grünenthal in Stolberg near',
  'Aachen brings a sleeping and calming remedy to market.',
  'Active ingredient: thalidomide. Trade name: **Contergan**.',
  'It is **available without prescription**. It is advertised',
  'as especially well tolerated, as non-toxic, as harmless —',
  'also for pregnant and breastfeeding mothers. There is',
  'Contergan forte and a syrup for children. It is exported',
  'to forty-six countries.',
  '',
  'The substance works against morning sickness in pregnancy.',
  'Precisely for that reason women take it in the first weeks.',
  '',
  'From 1959 children are born with severe malformations of',
  'the limbs, with shortened or missing arms and legs, often',
  'also with damage to ears and internal organs. The',
  'physicians face something they hardly know: such',
  'malformations were so rare that a paediatrician might meet',
  'a single case in his whole professional life. Now several',
  'lie in the same clinic.',
  '',
  'The Hamburg paediatrician **Widukind Lenz** counts the',
  'cases, asks the mothers systematically about medicines and',
  'finds the pattern. **On 15 November 1961 he communicates',
  'his suspicion to the manufacturer**, on 18 November he',
  'presents it publicly. Independently of him, the Australian',
  'physician William McBride comes to the same result. **On',
  '26 November 1961 thalidomide is taken off the market.**',
  '',
  'How many children it hit is to this day an **estimate** —',
  'I say that expressly: the figures of the countries were',
  'collected differently, many children died before or',
  'shortly after birth and were never counted. The common',
  'estimates lie at **5,000 to 10,000 injured children',
  'worldwide**; in Germany around 2,800 surviving victims',
  'were counted.',
  '',
  'Two things this package insert must say about it, and both',
  'are unpleasant.',
  '',
  '**First: It could have been noticed.** The substance had',
  'been tested on animals, but not on pregnant animals — the',
  'question of harm to the unborn was asked by hardly anyone',
  'back then, because one believed the placenta holds back',
  'everything harmful. Indications of nerve damage in adults',
  'had been available since 1959; complaints from physicians',
  'were answered evasively. **The testing that was missing was',
  'not impossible. It was not prescribed.**',
  '',
  '**Second: A single person made the difference.** In the',
  'United States, **Frances Oldham Kelsey** examined the',
  'approval application and did not release it, because the',
  'data seemed thin to her — despite the repeated pressure of',
  'the applicant. That is why America remained largely',
  'spared. An official who said no.',
  '',
  'And here is the actual answer to the question one must ask',
  'a package insert: **Why testing at all?** Not because we',
  'one day became insightful. **But because this harm was so',
  'great that society imposed the rules on us from',
  'outside.** In 1962 the United States required for the',
  'first time not only safety but also **proof of efficacy in',
  'controlled studies** and the informed consent of the trial',
  'participants. In Germany a first Medicines Act followed in',
  '1961, which in its core only required registration; the',
  'real state approval with proof of quality, efficacy and',
  'safety came only with the law of 1976, in force from 1978.',
  '**From the first deaths to the binding German approval',
  'almost twenty years passed.**',
  '',
  'The criminal proceedings against those responsible began',
  'in 1968 and were discontinued in 1970 against a settlement',
  'payment; a verdict was never reached. The manufacturer',
  'apologised in 2013, fifty-two years after the withdrawal.',
  'Whoever thinks that late is right.',
  '',
  'And then the turn that links this chapter with the red',
  'thread of the book. **Thalidomide is today again an',
  'approved medicine.** In 1964 an Israeli physician',
  'established that it relieves severe inflammatory flare-ups',
  'in leprosy almost instantaneously; since the 2000s it is',
  'an important remedy against bone marrow cancer. It is',
  'dispensed under the strictest conditions: pregnancy tests,',
  'double contraception, dispensing protocols. And',
  'nevertheless, in Brazil, where it is used against leprosy,',
  'new injured children have been born.',
  '',
  '**The same substance that was a crime of carelessness is',
  'today a blessing with a safety net — and the holes in the',
  'net still cost children.** If this book has a rule, it',
  'stands here: not the substance is good or evil. The',
  'question is how long one has tested it and who decides',
  'over the length of the testing time.',
  '',
  '## 6. Composition: what is in the price',
  '',
  'Now to the question we are asked most often, usually',
  'angrily. **Why does a medicine cost so much?**',
  '',
  'The answer begins with a sentence that sounds like an',
  'excuse and is nevertheless the core of the matter: **The',
  'price on the package is not the price of production. It is',
  'the price of the search.** The second tablet costs cents.',
  'What is paid is the first.',
  '',
  'This is what the search looks like.',
  '',
  'At the beginning stands a target structure: a protein, a',
  'receptor, a process in the body that one assumes drives the',
  'disease. Against it **tens of thousands of substances** are',
  'tested through — today mechanically, in plates with a',
  'thousand tiny wells. A few hundred remain. They are',
  'changed, improved, discarded again. What remains goes into',
  'the preclinical testing: cell cultures, then animals —',
  'effect, toxicity, behaviour in the body, and since',
  'thalidomide compulsorily also experiments on pregnant',
  'animals.',
  '',
  'Only then the human being, in three stages:',
  '',
  '**Phase I** — twenty to a hundred volunteers, mostly',
  'healthy. Question: Is the substance tolerated, what does',
  'the body do with it, which dose is tolerable? Not: Does it',
  'help.',
  '',
  '**Phase II** — a few hundred sick people. Question: Does it',
  'work at all, and at which dose? Here most candidates fail.',
  '',
  '**Phase III** — hundreds to tens of thousands of sick',
  'people, in many countries, randomly allocated, blinded if',
  'possible, compared with the best known remedy or with a',
  'sham medicine. Question: Is it better than what already',
  'exists, and what does it cost in side effects? Such a',
  'study lasts years and often costs hundreds of millions.',
  '',
  'Then an authority examines — in Europe the EMA, in Germany',
  'the BfArM, in the United States the FDA — the raw data,',
  'often several tens of thousands of pages. And afterwards',
  '**Phase IV** begins: the surveillance in everyday life,',
  'because a side effect that hits one in ten thousand cannot',
  'stand out in any study with three thousand participants.',
  '',
  '**In total: ten to fifteen years.**',
  '',
  'And now the number that explains the price: **Of the',
  'active ingredients that make it at all into the first test',
  'in humans, about one in ten is eventually approved.** Nine',
  'of ten fail — most in Phases II and III, that is, only',
  'after the greater part of the money has been spent.',
  'Whoever finances a medicine in truth finances nine failed',
  'ones along with it.',
  '',
  'How much that costs is the most disputed number of our',
  'branch, and the counter-calculation belongs here. A much',
  'cited study of Tufts University came in 2016 to around',
  '**2.6 billion dollars** per approved remedy. In this number',
  'sit two items over which there is dispute: the costs of the',
  'failed candidates and the "capital costs" — the foregone',
  'profit of the money that was tied up for years. If one',
  'calculates both out, other groups arrive at considerably',
  'less; a study of cancer drugs came in 2017 to a mean of',
  'around 650 million dollars per company, a broader analysis',
  'of 2020 to just under a billion per new active ingredient.',
  '**The truth lies somewhere in this range, and we',
  'traditionally cite the upper number.** That also belongs on',
  'this leaflet.',
  '',
  'Then the patent. It runs **twenty years from the filing**',
  '— and filing happens early, long before the approval,',
  'otherwise someone else files. Of the patent usually eight',
  'to twelve years remain in the end, in which a remedy is',
  'alone on the market. Afterwards come the imitators, and',
  'the price often falls by eighty to ninety percent. **Our',
  'whole reckoning hangs on this window.** Hence the high',
  'price at the beginning, hence the haste, hence the pressure',
  'on every delay.',
  '',
  'And something else belongs in this rubric, because',
  'otherwise it sounds like an accusation from outside: **The',
  'basic research on which we build is mostly paid for by',
  'others.** The universities and the state institutes find',
  'the target structures; the American National Institutes of',
  'Health alone spend a double-digit billion amount on that',
  'every year. We often come when the risk of the basic',
  'question has already been borne — and additionally buy',
  'small biotech firms that did the early part at their own',
  'risk. Our risk is real. It is just not the whole risk.',
  '',
  '## 7. Pharmaceutical form: why it is a tablet and not advice',
  '',
  'Now the question this book is steering toward and that',
  'comes back in chapter 18. **Why a tablet and not advice?**',
  '',
  'The honest answer has three parts, and the third is the',
  'one one rarely hears from us.',
  '',
  '**First, because it is our way of thinking.** We think in',
  'cause and effect, in molecules, receptors and measured',
  'values. An illness is in this way of thinking a control',
  'loop that has run out of control: too much acid, too',
  'little insulin, an inflammatory messenger in excess.',
  'Whoever thinks so seeks the substance that intervenes',
  'exactly there. That is no greed, that is a worldview — the',
  'same that chapter 13 described as the cause-and-effect way',
  'of thinking, as against the equilibrium way of thinking of',
  'the old traditions.',
  '',
  '**Second, because the tablet is measurable.** Five',
  'milligrams are always five milligrams. One can halve it,',
  'blind it, test it against a sham medicine, allocate it',
  'randomly in a study. **Our whole testing method is',
  'tailored to things that can be grasped in milligrams.**',
  'How does one blind exercise? How does one give a person,',
  'for show, a good social environment? That does not work —',
  'and what cannot be tested that way has a harder standing in',
  'our world, even if it works.',
  '',
  '**Third, because only the tablet can be sold.** Advice',
  'cannot be patented. For "walk an hour a day on foot" there',
  'is no protection, no price, no margin and no sales. We can',
  'do nothing with it — not because we hold it to be wrong,',
  'but because our whole apparatus is not set up for it.',
  '',
  '**This third point is the most important sentence of this',
  'package insert: We did not choose the pill because it is',
  'always the best, but because it is what we can do — and',
  'what pays. Both are true, and one cannot understand the',
  'one without the other.**',
  '',
  'What follows from it one sees in everyday life: for',
  'extensive counselling on nutrition and lifestyle, the',
  'consulting room provides neither time nor remuneration;',
  'for a prescription it provides both. We did not invent this',
  'system — but we fit into it outstandingly.',
  '',
  '## 8. Duration of use: the business of again and again',
  '',
  '**Why remedies one takes permanently?** Here too two',
  'answers, both of which are true, and the second we say',
  'reluctantly.',
  '',
  '**The first: Because chronic diseases are chronic.**',
  'Whoever has type 1 diabetes needs insulin, every day, for',
  'life, and there is nothing disreputable about it. Whoever',
  'has lost a thyroid needs the hormone. High blood pressure',
  'is not cured, it is lowered; if one stops the remedy, the',
  'pressure rises again. That is no invention of the sales',
  'department, that is the nature of the matter.',
  '',
  '**The second: Because a remedy taken for thirty years is',
  'paid for for thirty years.** An antibiotic is taken for',
  'ten days and is then done. A blood pressure drug is taken',
  'until death. Calculate for yourself which of the two is',
  'more valuable for a company.',
  '',
  'From that a way of thinking has become, for which there is',
  'a term of its own: the **blockbuster** — a medicine with a',
  'turnover of over a billion dollars a year. The numbers are',
  'public, they stand in our annual reports. A cholesterol',
  'lowerer made it between 1996 and 2011 to over 125 billion',
  'dollars. A rheumatism remedy has since 2003 brought in',
  'over 200 billion dollars, in peak years over twenty',
  'billion in a single year. **These are remedies for people',
  'who take them for decades.**',
  '',
  'And here the thesis this chapter is meant to test belongs',
  'openly on the table — not as an accusation from outside,',
  'but as a finding from inside: **Yes, lifelong medication',
  'and vaccinations are, alongside their effect, a very',
  'profitable business.** With the vaccines that was long',
  'different: in the 1970s and 1980s manufacturers dropped',
  'out because the margins were small and the liability risks',
  'large — in the United States at times only a single',
  'manufacturer remained for a childhood vaccine, and the',
  'state had to set up a compensation fund in 1986 so that',
  'production continued at all. Today it is the reverse: the',
  'vaccine market has grown from a few billion around the',
  'year 2000 to a multiple, and a single coronavirus vaccine',
  'brought in 2022 around thirty-eight billion dollars in one',
  'year — the highest annual turnover any medicine ever had.',
  'Chapter 17 will deal with that.',
  '',
  '**The profit does not prove that the remedy is bad.** The',
  'insulin is a business and saves lives; both at once. But',
  'the profit decides which questions are asked at all. And',
  'for that I lay two pieces of evidence from our own balance',
  'sheet before you, which are more uncomfortable than any',
  'accusation from outside:',
  '',
  '**First the antibiotics.** They are the most effective',
  'thing we have ever built, and economically a catastrophe:',
  'taken briefly, cheap, and a new reserve remedy is, by the',
  'will of all experts, to be used as **rarely** as possible.',
  'A product whose proper use consists in leaving it in the',
  'cupboard cannot be financed. That is why large',
  'corporations have stopped antibiotic research; small firms',
  'that developed one nevertheless went bankrupt after',
  'approval. **And at the same time, in 2019, according to',
  'the largest estimate so far, around 1.27 million people',
  'died directly of resistant germs.** The market did not',
  'fail here because someone was evil. It failed because it',
  'did exactly what it is built for.',
  '',
  '**Second the hepatitis C.** In 2013 a remedy came to',
  'market that **cures** this liver inflammation in twelve',
  'weeks in over ninety percent of those treated —',
  'definitively. The price in the United States: around',
  '84,000 dollars for the course, a thousand dollars per',
  'tablet. The outcry was enormous. And then the instructive',
  'thing happened: the turnover collapsed, because the cured',
  'were no longer customers. **A cure consumes its own',
  'market.** In our reckoning, healing is the worst business',
  'model there is.',
  '',
  'This sentence one should not skip over, and I write it',
  'here myself so that the second voice does not have to',
  'present it as a revelation.',
  '',
  '## 9. Interactions: the marketing and the line it has crossed',
  '',
  'A package insert lists what happens when two remedies',
  'meet. With us the most dangerous interaction is the one',
  'between research and sales.',
  '',
  'First the order of magnitude. For the American market,',
  'where the best figures exist, medical marketing —',
  'advertising with physicians, advertising with the public,',
  'continuing education, representative visits — grew between',
  '1997 and 2016 from around 18 to around 30 billion dollars',
  'a year. Direct advertising of prescription remedies to the',
  'patient is allowed worldwide **in only two countries**: in',
  'the United States and in New Zealand. In our annual',
  'reports the item for sales and administration regularly',
  'stands higher than the one for research — it contains more',
  'than just advertising, but the order of magnitude is',
  'right.',
  '',
  'And then the cases in which the line was crossed. All four',
  'are notorious in court or verifiable in specialist',
  'journals; none of it is rumour.',
  '',
  '**A painkiller against osteoarthritis**, brought to market',
  'in 1999, was withdrawn in 2004 after one of its own studies',
  'showed more heart attacks and strokes. An analyst of the',
  'American drug authority estimated the number of additional',
  'serious cardiac events in the USA at **88,000 to',
  '139,000**. The manufacturer paid around 4.85 billion',
  'dollars in a settlement in 2007.',
  '',
  '**A strong opioid**, introduced in 1996, was advertised',
  'with the claim that the risk of dependence was very low in',
  'pain patients — based on a thin data basis. The',
  'manufacturer pleaded guilty in 2007 to misleading',
  'labelling and paid 600 million dollars, in 2020 a second',
  'time in the billions. In the United States, between 1999',
  'and 2019, more than half a million people died of opioid',
  'overdoses. **That is the greatest documented harm',
  'marketing has ever caused in the history of medicine.**',
  '',
  '**A study of an antidepressant in adolescents** was',
  'published in 2001 as "effective and well tolerated". When',
  'independent researchers re-evaluated the raw data in 2015,',
  'neither the one nor the other held up. In 2012 the',
  'corporation paid three billion dollars in proceedings that',
  'concerned, among other things, this marketing.',
  '',
  '**A flu remedy**, stockpiled by governments for billions:',
  'for years the manufacturer did not release the complete',
  'study reports. Only after a long public dispute did they',
  'become accessible; the re-evaluation turned out',
  'considerably more sober than the advertising. Out of this',
  'dispute the transparency rules of today have arisen.',
  '',
  'With that I have reached the thesis this chapter is meant',
  'to test: **Whoever researches critically loses the',
  'funding.** In this harshness that is a claim one must',
  'substantiate — and the second voice will do that',
  'extensively. I say here only what is undeniable from our',
  'side:',
  '',
  '**First:** Studies paid for by the industry come to a',
  'result favourable to the sponsor more often than',
  'independently financed ones. That is no supposition; it',
  'has been found again and again in systematic reviews.',
  '',
  '**Second:** Negative results were long published more',
  'rarely than positive ones. An evaluation of all studies',
  'registered with the American authority on antidepressants',
  'showed: in the specialist journals it looked as if almost',
  'all studies had shown a benefit — in the approval files it',
  'was about half.',
  '',
  '**Third:** There are individual, well-documented cases in',
  'which researchers were put under pressure because their',
  'results were uncomfortable — a physician in Toronto who in',
  'the 1990s warned of the risks of a remedy and received',
  'legal threats; a scientist in San Francisco whose study of',
  'a thyroid remedy was not allowed to appear for years',
  'because the funder forbade it.',
  '',
  '**Fourth:** The countermeasures against all this —',
  'mandatory study registries, the disclosure of conflicts of',
  'interest, access to raw data — have all been won from',
  'outside: by specialist journals, by authorities, by groups',
  'of physicians, by journalists. **Not one of these rules',
  'has sprung from our insight.** That is the most honest',
  'sentence of this rubric.',
  '',
  '## 10. Side effects: the honest balance sheet of our side',
  '',
  'Now the rubric nobody reads and that decides everything.',
  'What has our work achieved — and what has it done?',
  '',
  '**What holds.**',
  '',
  '**The infections.** Before the sulfonamides and the',
  'penicillin, an infected wound, pneumonia, puerperal fever',
  'was a gamble with death. Today it is usually a week of',
  'tablets. In the industrialised countries child mortality',
  'has fallen to a fraction — hygiene and nutrition have the',
  'greater share of that, we the smaller, but real one.',
  '',
  '**The HIV.** That is our clearest achievement, and it is',
  'only forty years old. In 1981 a disease without a name, in',
  'the 1980s a certain death sentence. In 1987 the first',
  'remedy, which barely helped and was poorly tolerated. **In',
  '1996 the combination therapy: three active ingredients at',
  'the same time, so that the virus cannot evade** — and',
  'within two years the mortality in the treated countries',
  'broke down. Today it is for many a tablet a day, with a',
  'life expectancy close to that of an uninfected person;',
  'whoever is successfully treated is no longer infectious.',
  'Worldwide around thirty million people are treated.',
  '',
  'And in the same breath the uncomfortable half: **It was',
  'not we who pushed for speed.** It was the sick — activists',
  'who occupied approval authorities and disrupted',
  'conferences until the procedures were accelerated and',
  'those affected were let to the advisory table. And it took',
  'further years and a worldwide dispute over patents until',
  'the remedies arrived in Africa: the annual price fell from',
  'over ten thousand dollars to under a hundred only after',
  'Indian imitators broke the prices and a lawsuit of',
  'corporations against South Africa was withdrawn in 2001',
  'under public pressure.',
  '',
  '**The cancer, in parts.** In childhood acute leukaemia, an',
  'almost always fatal disease has become one that about nine',
  'of ten children survive. In a certain leukaemia of adults,',
  'five-year survival rose after 2001, with a purposefully',
  'designed remedy, from around thirty to about ninety',
  'percent — the magic bullet, as Ehrlich had meant it. In',
  'some forms of black skin cancer, immunotherapy today',
  'achieves long-term survival where months used to remain.',
  '',
  '**Where the limits lie.**',
  '',
  'And now the same rubric from the other side, in the same',
  'order.',
  '',
  '**In cancer as a whole the balance is far leaner than our',
  'press releases sound.** In the large solid tumours —',
  'pancreas, advanced lung cancer, brain tumours — we measure',
  'progress in weeks and months. An evaluation of all cancer',
  'approvals of the European authority from the years 2009 to',
  '2013 found that around half showed at the time of approval',
  'no proven benefit in survival or quality of life. We',
  'approve on surrogate measures — the tumour becomes',
  'smaller, the time to progression becomes longer — and hope',
  'that life comes of it. Sometimes it does. Often not.',
  '',
  '**In the chronic diseases we manage more than we cure.** I',
  'say that so clearly because it is the core of the balance',
  'sheet of this book. We lower the blood pressure, the blood',
  'sugar, the cholesterol — and that demonstrably saves',
  'lives, that is no small matter. But the disease itself',
  'remains. In type 2 diabetes, of all things, a study',
  'without our participation showed that a marked weight loss',
  'led in almost half of the participants after a year to',
  'remission — that is, to what we achieve with no tablet.',
  '**No corporation paid for this study, and none would have',
  'paid for it.** Chapter 18 will deal with it.',
  '',
  '**The Alzheimer dementia** is our clearest failure. In',
  'twenty years, well over a hundred active ingredient',
  'candidates have failed in large studies. The newest',
  'antibodies slow the decline measurably, but slightly, and',
  'they bring the risk of brain swelling and bleeding. We do',
  'not know to this day for certain what drives this disease.',
  '',
  '**The resistance of the germs.** Fleming warned in 1945.',
  'We gave antibiotics into animal fattening anyway and',
  'prescribed them for colds, and then we stopped the',
  'research because it did not pay. That is the innovation',
  'cycle in pure form: **first the blessing, then the harm',
  'the blessing itself has generated.**',
  '',
  '**The market instead of the need.** Between 1975 and 1999',
  'almost fourteen hundred new active ingredients came to',
  'market; according to a much cited evaluation about',
  '**sixteen** of them were directed against tropical',
  'diseases from which hundreds of millions of people',
  'suffer. The reason is no malice but our reckoning: where',
  'there is no purchasing power there is no market, and where',
  'there is no market there is with us no project. There are',
  'counter-examples from our own ranks — a corporation has',
  'since 1987 dispensed a remedy against river blindness free',
  'of charge, billions of times over, until the disease has',
  'disappeared in several countries. Such decisions are',
  'possible. They are just not the rule, because our',
  'reckoning does not provide for them.',
  '',
  '**And the price of the insulin.** A substance whose patent',
  'was given away in 1923 for a dollar so that nobody profits',
  'from it cost in the United States a hundred years later so',
  'much that people rationed their dose and died of it. Only',
  'public pressure and a law have capped the prices there.',
  '**If a single example shows what our way of thinking can',
  'do with a gift, it is this one.**',
  '',
  'There remains the sentence with which the operator of this',
  'book summarises the balance sheet of modern medicine — and',
  'I cannot contradict him: **Modern medicine is excellent in',
  'diagnosis and weak in the treatment of the chronic',
  'diseases.** Chapter 12 has shown how well we can see. We',
  'recognise a tumour of a few millimetres, we measure dozens',
  'of values from a drop of blood, we image the beating heart',
  'in layers. **We see today more than we can treat** — and',
  'the distance between the seeing and the being able is the',
  'actual open wound of this chapter.',
  '',
  '## 11. Contraindications: where our way of thinking may not be applied',
  '',
  'A contraindication says when a remedy must not be given.',
  'Here are ours — the places where our way of thinking not',
  'only reaches its limits but harms.',
  '',
  '**First: When what helps cannot be grasped in',
  'milligrams.** Exercise, sleep, nutrition, working',
  'conditions, loneliness — for our method these are not',
  'quantities but confounding factors one calculates out. In',
  'our studies they are called confounders. In life they are',
  'called causes.',
  '',
  '**Second: When we take the measured value for the goal.**',
  'We lower a value because it is connected with a disease —',
  'and assume that the person thereby becomes better off.',
  'That is sometimes true and sometimes fatally wrong. The',
  'clearest lesson comes from the 1980s: remedies that',
  'reliably suppressed palpitations after an infarction were',
  'widely used, because the palpitations were a warning sign.',
  'The large study that finally checked that had to be broken',
  'off — **the treated died more often than the untreated.**',
  'The value was better. The people were dead.',
  '',
  '**Third: When a risk is made into a disease.** We have a',
  'tangible interest in threshold values falling: every',
  'lowered threshold turns millions of healthy people into',
  'treatable ones. That is not automatically wrong — some',
  'lowering was medically right and saved lives. But the',
  'question of who sits in the committees that fix such',
  'values is justified, and the answer is frequently',
  'unsatisfactory: a considerable part of the authors of',
  'clinical guidelines has financial connections to',
  'manufacturers. That is disclosed and investigated.',
  '',
  '**Fourth: When many are treated so that one profits.** In',
  'prevention that is the rule, not the exception: of a',
  'hundred people who take a remedy for years, a single one',
  'will avoid a heart attack by it — the other ninety-nine',
  'have only the costs and the side effects. For the',
  'individual this reckoning is decisive, and it stands in no',
  'advertisement. **It does not even stand in our package',
  'insert.**',
  '',
  '**Fifth: When we pretend our way of thinking is the only',
  'one.** It is powerful, it is testable, it has saved',
  'millions of lives. But it sees only what it can measure. A',
  'person whose complaints come from his life appears in our',
  'data as a therapy failure.',
  '',
  '## Warning: what stands on no package',
  '',
  'A package insert has a property one must see on it: **It',
  'is written by the manufacturer and approved by an',
  'authority.** It contains what must be said. It does not',
  'contain what the sick person thinks about it, and it does',
  'not contain the questions the manufacturer would rather',
  'not ask.',
  '',
  '**What remains open** is therefore not little. Here does',
  'not stand how it feels to need a remedy one cannot pay',
  'for. Here does not stand what it does to a physician when',
  'a friendly representative comes by every quarter and the',
  'sick person has only ten minutes. Here does not stand why',
  'the three things that help most with chronic diseases —',
  'exercise, good food, a life with less pressure — have',
  'nobody who advertises for them.',
  '',
  '**The second voice of this chapter belongs to the',
  'criticism** — to the sick, the independent researchers,',
  'the physicians who do not agree. **It will open the other',
  'package insert: the same rubrics, the same package, read',
  'from the other side.** It will speak of the financial',
  'interests and of the business with illness; of study',
  'funding and of what happens to those who research',
  'critically; of the results that never appeared, and of the',
  'conflicts of interest in the committees that decide what',
  'counts as an illness. And it will ask the question we',
  'cannot answer, because a manufacturer can poorly doubt',
  'that his product is needed: **How much health would there',
  'be if the same money went not into molecules but into',
  'living conditions?**',
  '',
  'Our answer to this chapter stands in two sentences, and',
  'both are true.',
  '',
  'The first: **Without us you would with high probability',
  'not have become as old as you are becoming.** The insulin,',
  'the antibiotics, the remedies against HIV, the cancer',
  'therapies that deserve the name — they did not fall from',
  'heaven. They have been manufactured, by people who were',
  'paid for it.',
  '',
  'The second: **We have in this time done everything for',
  'which one paid us, and little for which one did not pay',
  'us.** Where both coincided, great things arose. Where they',
  'fell apart, the need remained lying — and sometimes harm',
  'arose that we admitted too late.',
  '',
  'There remains the question this chapter leaves open and',
  'that you must answer, not we: **Can a remedy that saves',
  'lives and a business that profits from illness be the same',
  '— and who ensures that the first is not sacrificed to the',
  'second?**',
  '',
  'Read the leaflet to the end. There is more on it than one',
  'thinks.',
].join('\n');

/**
 * The criticism — the same package insert, read from the other
 * side. The financial interests, the vanished studies, the thesis
 * of the operator: whoever researches critically loses the
 * funding. And the honest balance: diagnosis strong, chronic
 * diseases weak.
 *
 * Written by DeepSeek (round 15, second pass). This voice too
 * names the uncomfortable places of its own side itself
 * (additional rule for sensitive topics) — and keeps to the
 * no-rumours rule: only what is documented, nothing invented.
 */
const stimmeDerKritik = [
  '## The same package insert, read from the other side',
  '',
  'The industry has submitted its package insert — complete,',
  'honest, with thalidomide and heroin and the business of',
  'again and again. That is more than its guild usually',
  'admits, and we credit it for that. Now we open the same',
  'package and read it from the other side: not as the',
  'manufacturer describes it, but as the sick person',
  'experiences it — and as the researcher experiences it who',
  'does not agree.',
  '',
  '## Patient information: what the manufacturer does not write',
  '',
  'A package insert explains what a remedy is used for. It',
  'does not explain why the medicines are distributed the way',
  'they are distributed. This voice says it outright: the',
  'pharmaceutical industry is a business, and the business',
  'needs the illness. Not health — illness. Vaccinations and',
  'lifelong medication are, alongside their actual effect, a',
  'very profitable business: the more people need a remedy',
  'daily, the more stable the turnover; the more vaccinated,',
  'the larger the market. That is no conspiracy — it is the',
  'logic of an industry that must serve its shareholders. But',
  'it is the logic that stands on no package. A company that',
  'lives from illness has an interest in the illness',
  'remaining — and in the simple answer not becoming loud:',
  'the prevention nobody has to buy.',
  '',
  '## Composition: what is really in the price',
  '',
  'The industry says the prices are high because the research',
  'costs so much. Part of that is true. The other part stands',
  'in its own balance sheets: the large corporations often',
  'spend more money on marketing and sales than on research.',
  'The representatives who visit practices, the',
  'advertisements, the congresses, the gifts — that is no',
  'price of research, that is the price of selling. And the',
  'research itself is not free: it follows the market. A',
  'medicine against a disease that hits only the poor is not',
  'developed, because it does not pay; a remedy that creates',
  'millions of permanent customers is developed, because it',
  'pays. The composition of the price thus also contains the',
  'answer to the question why the world has so many remedies',
  'against cholesterol and so few against neglected tropical',
  'diseases.',
  '',
  '## Interactions: the vanished studies',
  '',
  'And now the point at which the business becomes a problem:',
  'the studies that do not appear. It is documented that a',
  'large part of the clinical studies the industry finances',
  'is never published — above all those with a negative',
  'result. Whoever sees only the positive studies sees a',
  'world in which the remedies work better than they do. The',
  'researcher Nancy Olivieri discovered that a remedy',
  'promoted by the industry had dangerous side effects — and',
  'was fought by her own hospital, which was sponsored by the',
  'industry. The researcher Peter Dong was dismissed after he',
  'had doubted the efficacy of a remedy. These cases are',
  'documented — and they are the evidence for what the',
  'operator of this book has formulated: whoever researches',
  'critically quickly has the funding cut. Not always with',
  'intention, not always with an evil hand — but always with',
  'the same result: the criticism is more expensive than the',
  'agreement.',
  '',
  '## Pharmaceutical form: why the pill and not the advice',
  '',
  'The industry has asked why out of an illness a tablet',
  'becomes and not advice. The answer of this voice: because',
  'the tablet is saleable and the advice is not. A tablet one',
  'can patent, produce, market and prescribe. Advice — eat',
  'better, exercise, get yourself a life with less pressure',
  '— is free, and nobody profits from it. The clinical',
  'guidelines according to which physicians decide are',
  'written by experts who frequently receive honoraria from',
  'the industry; the conflicts of interest are documented,',
  'and the disclosure is young. The system is not evil — it',
  'is skewed: it rewards the pill and punishes the advice.',
  'And whoever gives the advice anyway gets no research, no',
  'guideline and no honorarium for it.',
  '',
  '## Duration of use: the business of again and again',
  '',
  'The industry has itself named the business of again and',
  'again: the lifelong medication. This voice adds the',
  'question that stands on no package: is healing done here —',
  'or managing? The high blood pressure, the cholesterol',
  'value, the diabetes: they are held in check with daily',
  'remedies, often for a lifetime. The medicines are good —',
  'and the lifestyle change that can often achieve the same',
  'value without a pill is not prescribed, because nobody can',
  'prescribe it. The balance the operator of this book has',
  'drawn up is right: the diagnosis is strong — the imaging,',
  'the laboratories, the early detection are wonders of',
  'medicine. The treatment of the chronic diseases is weak —',
  'because the simple answer (exercise, nutrition, community,',
  'less stress) has no lobby, no price, no factory.',
  '',
  '## Contraindications: the simple medicine',
  '',
  'And with that the contraindication of this package insert',
  'is named: the simple medicine, of which this book will',
  'treat at the end. The three things that help most with',
  'chronic diseases have no advertising, no representatives,',
  'no congresses: exercise, good food, a life with less',
  'pressure. They work — and they are uncomfortable, because',
  'everyone must do them themselves and because nobody',
  'profits from them. For that the industry cannot do',
  'anything; the society that leaves everything to the market',
  'can. Whoever prescribes the simple medicine prescribes',
  'something that is not for sale.',
  '',
  '## Answer to the industry',
  '',
  'The industry has submitted its package and named its',
  'honest places. This voice answers: the successes are real',
  '— the medicines that save lives, the HIV turnaround, the',
  'insulin, the vaccines. Nobody here wants to abolish the',
  'industry; whoever wanted that would also have to abolish',
  'the rescue. But the reckoning must be complete: the',
  'business needs the illness, the research follows the',
  'market, the vanished studies distort the knowledge, and',
  'the simple medicine has no lobby. The question this',
  'package insert leaves behind is the question of the whole',
  'book: Whom does medicine serve — the sick or the market?',
  'And who decides what is paid: need or profit? The',
  'synthesis must do this reckoning — with both sides.',
].join('\n');

/**
 * Chapter 16 — "The modern pharmaceutical industry".
 *
 * Round 15 creates the module with the first perspective (the
 * industry from within, as its own package insert). The second
 * voice (the criticism) and the final synthesis are added by
 * Hermes in the second pass.
 */
const pharmaindustrie = {
  id: 'pharmaindustrie',
  titel: 'The modern pharmaceutical industry',
  epoche: '20th century to today',

  aufhaenger: {
    frage: 'What does a life cost — and who sets the price?',
    text: [
      'In 1920 a child with diabetes died with near certainty,',
      'usually within a year. Two years later there was the',
      'insulin, and the discoverers sold the patent for a',
      'single dollar so that nobody should profit from a',
      'life-saving substance. A hundred years later people in',
      'the United States rationed the same remedy because they',
      'could not pay for it. Both are the story of the same',
      'industry.',
      '',
      'The pharmaceutical industry is one of the largest',
      'businesses in the world — around one and a half',
      'trillion dollars of turnover a year. And it is one of',
      'the largest wonders: it has ended diseases that a',
      'hundred years ago were death sentences. Both are true',
      'at the same time, and in that lies the difficulty of',
      'chapter.',
      '',
      'It asks how, from a pharmacy in Darmstadt and two dye',
      'works on the Wupper and the Main, a system became that',
      'saves lives and earns money — often in the same breath.',
      'Why a new medicine costs ten to fifteen years and',
      'billions. Why it is almost always a tablet and almost',
      'never advice. Why the remedies one takes for decades',
      'are the best business — and a remedy that cures the',
      'worst. And why the balance turns out so uneven: strong',
      'in diagnosis, weak at the chronic diseases.',
      '',
      'In between lie the dark places that belong to this',
      'story as the bright ones do: the heroin that was sold',
      'for twenty-three years as a cough medicine, and the',
      'thalidomide catastrophe on which the rules are written',
      'that protect us today.',
    ].join('\n'),
  },

  // The map itself lives in utils/themen/karten/pharmaindustrie.js —
  // here only its texts are translated (phases, points, movements) as
  // karteHinweise, not the map itself.
  karteHinweise: [
    {
      label: '1668–1896: from the pharmacy and the dye works an industry is born',
      hinweis:
        'At the beginning stands no corporation, but a pharmacy. In 1668 ' +
        'Friedrich Jacob Merck takes over the Engel-Apotheke in Darmstadt; in ' +
        '1827 Emanuel Merck begins to produce pure alkaloids — morphine, ' +
        'codeine, later cocaine — no longer only for his own counter, but for ' +
        'trade. That is the hour of birth of the active ingredient as a ware. ' +
        'The second root is the colour: in 1851 Ernst Schering founds the ' +
        'Grüne Apotheke in Berlin, in 1863, in the same year, the dye ' +
        'factory Friedr. Bayer et comp. in Barmen-Elberfeld on the Wupper and ' +
        'the dye works Meister Lucius & Brüning in Frankfurt-Höchst come into ' +
        'being. In Basel, Ciba, Geigy and Sandoz grow out of silk dyeing ' +
        'works. Whoever can cook dyestuffs can also cook medicinal ' +
        'substances — that is the insight out of which a world industry ' +
        'became.',
    },
    {
      label: '1897–1937: the time without testing — aspirin, heroin, miracle cures',
      hinweis:
        'In the laboratory in Elberfeld, Felix Hoffmann produces ' +
        'acetylsalicylic acid on 10 August 1897 and, eleven days later, on 21 ' +
        'August 1897, diacetylmorphine. Both substances are tested, both ' +
        'found good, both marketed: the one from 1899 as Aspirin, the other ' +
        'from 1898 as "Heroin" — a cough medicine that is expressly ' +
        'advertised as not habit-forming and exported to more than twenty ' +
        'countries. At the same time cocaine is a celebrated miracle cure, ' +
        'and soothing syrups with morphine are given to infants. Nobody has ' +
        'to prove that a remedy works or is harmless. Only catastrophes ' +
        'force rules: in 1906 the United States require the declaration of ' +
        'the ingredients, in 1938, after a syrup with antifreeze and 105 ' +
        'dead, the proof of safety.',
    },
    {
      label: '1909–1945: the turning point — salvarsan, insulin, sulfonamides, penicillin',
      hinweis:
        'Paul Ehrlich and Sahachiro Hata find in 1909, in the substance with ' +
        'the number 606, a remedy against syphilis; the Farbwerke Höchst ' +
        'bring it out in 1910 as salvarsan — the first medicine that was ' +
        'designed purposefully against a pathogen. In 1921/22 researchers in ' +
        'Toronto win the insulin and sell the patent for a symbolic dollar; ' +
        'from 1923 Eli Lilly in Indianapolis produces it, and on licence the ' +
        'Farbwerke Höchst. In 1932 Gerhard Domagk finds in Elberfeld, with ' +
        'Prontosil, the first sulfonamide; in 1939 he receives the Nobel ' +
        'Prize, which he must decline under pressure from the regime. From ' +
        '1941 to 1945 American plants make the penicillin into a mass ' +
        'product. Out of the trade in substances an industry has become that ' +
        'researches.',
    },
    {
      label: '1957–1961: thalidomide — the catastrophe that forced approval through',
      hinweis:
        'On 1 October 1957 Chemie Grünenthal in Stolberg near Aachen brings ' +
        'the sleeping and calming remedy Contergan with the active ingredient ' +
        'thalidomide onto the market without prescription, advertised as ' +
        'especially well tolerated, also for pregnant women. From 1959 births ' +
        'with severe malformations of the limbs pile up. The Hamburg ' +
        'paediatrician Widukind Lenz communicates his suspicion to the ' +
        'manufacturer on 15 November 1961; the Australian William McBride ' +
        'comes independently to the same result. On 26 November 1961 the ' +
        'remedy is taken off the market. Estimates assume 5,000 to 10,000 ' +
        'injured children worldwide. In the United States the examiner ' +
        'Frances Oldham Kelsey had refused the approval. The consequence is ' +
        'the medicines acts that apply today.',
    },
    {
      label: '1990 to today: global corporations, blockbusters and lifelong medication',
      hinweis:
        'Out of the works on the Rhine become parts of global corporations: ' +
        'in 1996 Ciba-Geigy and Sandoz merge in Basel into Novartis, the ' +
        'Höchst pharmaceuticals division passes via Hoechst Marion Roussel ' +
        'and Aventis into Sanofi, Schering is taken over by Bayer in 2006. ' +
        'The world market for medicines today lies at around one and a half ' +
        'trillion dollars a year. The business shifts to remedies that are ' +
        'taken permanently: against high blood pressure, high cholesterol ' +
        'values, diabetes, rheumatism. The strongest-selling medicine in ' +
        'history, a rheumatism remedy, has since 2003 brought in over 200 ' +
        'billion dollars. At the same time large manufacturers withdraw from ' +
        'antibiotic research because short treatments do not pay.',
    },
    {
      label: 'Wuppertal-Elberfeld',
      hinweis:
        'The place where both sides of this chapter arose at a single ' +
        'laboratory bench. In 1863 a dye factory is founded on the Wupper; ' +
        'out of its chemical department becomes the pharmaceutical research. ' +
        'On 10 August 1897 Felix Hoffmann produces acetylsalicylic acid here ' +
        '— sold as Aspirin from 1899, to this day one of the most used ' +
        'remedies in the world. Eleven days later, on 21 August 1897, he ' +
        'produces diacetylmorphine: from 1898 marketed as "Heroin", as a ' +
        'cough medicine, expressly advertised as not habit-forming and ' +
        'exported to over twenty countries. In 1932 Gerhard Domagk finds ' +
        'Prontosil here, the first sulfonamide. Blessing and harm from the ' +
        'same house.',
    },
    {
      label: 'Frankfurt-Höchst',
      hinweis:
        'The dye works on the Main, founded in 1863 — here the idea of the ' +
        '"magic bullet" becomes a product. Paul Ehrlich had observed that ' +
        'dyes colour only certain tissues and had concluded from it that a ' +
        'substance must be buildable that hits only the pathogen. In 1909 ' +
        'his colleague Sahachiro Hata finds, among hundreds of arsenic ' +
        'compounds, the number 606; in 1910 it comes onto the market as ' +
        'salvarsan against syphilis — the first purposefully designed ' +
        'medicine against a pathogen, effective and not without severe side ' +
        'effects. Here, in 1894, Emil von Behring\'s diphtheria serum was ' +
        'also produced and, from 1923, insulin on licence. Today the ' +
        'pharmaceutical business belongs to Sanofi.',
    },
    {
      label: 'Darmstadt',
      hinweis:
        'The oldest place in this story. In 1668 Friedrich Jacob Merck takes ' +
        'over the Engel-Apotheke; the company that became of it is regarded ' +
        'as the oldest chemistry and pharmaceutical company in the world. ' +
        'The decisive step comes in 1827: Emanuel Merck produces pure ' +
        'alkaloids no longer only for his own pharmacy, but for trade — ' +
        'morphine, codeine, quinine, later cocaine, in unchanging quality ' +
        'and in quantity. From here on the active ingredient is a product ' +
        'with label, price and brand. That is the quiet turning point: not ' +
        'the apothecary mixes for the individual sick person, but a factory ' +
        'produces for a market.',
    },
    {
      label: 'Stolberg near Aachen',
      hinweis:
        'The place of the catastrophe on which today\'s medicine testing is ' +
        'written. On 1 October 1957 Chemie Grünenthal brings out Contergan ' +
        'here, a sleeping and calming remedy without prescription with the ' +
        'active ingredient thalidomide, advertised as especially well ' +
        'tolerated and also suitable for pregnant women. From 1959 children ' +
        'are born with severe malformations of the arms and legs. The ' +
        'Hamburg paediatrician Widukind Lenz reports his suspicion on 15 ' +
        'November 1961; on 26 November 1961 the remedy is withdrawn. ' +
        'Estimates speak of 5,000 to 10,000 injured children worldwide, of ' +
        'them around 2,800 surviving in Germany. The proceedings against ' +
        'those responsible were discontinued in 1970 against a settlement ' +
        'payment.',
    },
    {
      label: 'Basel',
      hinweis:
        'The place with the highest density of pharmaceutical research in ' +
        'the world — and it too begins with colour. Out of silk dyeing ' +
        'works at the knee of the Rhine become Ciba, Geigy and Sandoz; in ' +
        '1896 Fritz Hoffmann-La Roche founds his company, which early on ' +
        'relies on standardised finished medicines. In 1996 Ciba-Geigy and ' +
        'Sandoz merge into Novartis. From here come vitamins, psychotropic ' +
        'drugs, immunosuppressants — and in 2001, with imatinib, one of the ' +
        'most impressive cancer remedies at all: in a certain leukaemia, ' +
        'five-year survival rose from about thirty to around ninety percent. ' +
        'The same remedy also stands for the other side: its price rose ' +
        'within fifteen years to a multiple.',
    },
    {
      label: 'Berlin',
      hinweis:
        'The third root: the hormones. In 1851 Ernst Schering opens the ' +
        'Grüne Apotheke in Chausseestraße; in 1871 a joint-stock company ' +
        'becomes of it, which later becomes the hormone manufacturer — in ' +
        '1961, with Anovlar, the first birth control pill developed in ' +
        'Europe comes onto the market here, a remedy that healthy women take ' +
        'for years. In 2006 Schering is taken over by Bayer. In the same ' +
        'city sit the opponents: the Robert Koch Institute, the Federal ' +
        'Joint Committee, which decides on reimbursement, and the ' +
        'associations that negotiate over prices. Where medicine is made, it ' +
        'is also disputed over.',
    },
    {
      label: 'The path of heroin into the world',
      hinweis:
        'From 1898 diacetylmorphine is exported under the trade name ' +
        '"Heroin" from Elberfeld to more than twenty countries — as a cough ' +
        'medicine, as a substitute for morphine and expressly advertised as ' +
        'not habit-forming. Via Rotterdam and Antwerp it goes to the harbours ' +
        'of the world. Only when the dependence can no longer be overlooked ' +
        'does the assessment tip over: in 1913 production ends, in 1924 the ' +
        'United States ban the remedy, in 1931 it is strongly restricted in ' +
        'Germany. The new harmed before it was tested — for twenty-three ' +
        'years.',
    },
    {
      label: 'Insulin comes across the Atlantic',
      hinweis:
        'In the summer of 1921 Frederick Banting and Charles Best win in ' +
        'Toronto an extract from the pancreas; in January 1922 the ' +
        'thirteen-year-old Leonard Thompson survives. The discoverers ' +
        'surrender the patent to the university for a symbolic dollar — ' +
        'nobody should profit from a life-saving substance. For the ' +
        'production a factory is needed nevertheless: Eli Lilly in ' +
        'Indianapolis delivers in large quantities from 1923, in Europe the ' +
        'Farbwerke Höchst take up the licensed production. Out of a death ' +
        'sentence becomes a treatment — one needs for a lifetime.',
    },
    {
      label: 'The paediatrician\'s warning',
      hinweis:
        'In the autumn of 1961 the Hamburg paediatrician Widukind Lenz ' +
        'counts the cases of malformations in his practice, asks the mothers ' +
        'about the remedies taken and finds a pattern. On 15 November 1961 ' +
        'he communicates his suspicion to the manufacturer in Stolberg; on ' +
        '18 November he presents it publicly. On 26 November 1961 ' +
        'thalidomide is taken off the market. The warning did not run from ' +
        'the research to the sick, but from the sickbed back into the ' +
        'factory — that is how medicine safety has arisen.',
    },
  ],

  perspektiven: [
    {
      id: 'industrie',
      name: 'The Voice of the Industry',
      stimme: 'Opus',
      text: stimmeDerIndustrie,
    },
    {
      id: 'kritik',
      name: 'The Voice of Criticism',
      stimme: 'DeepSeek',
      text: stimmeDerKritik,
    },
  ],

  synthese: [
    '## Where the two leaflets meet',
    '',
    'First the common ground — and it is larger than the',
    'headlines of both sides suggest. The industry and the',
    'criticism name the same facts: the successes (insulin,',
    'antibiotics, the HIV turnaround, the vaccines — the',
    'rescue of millions), the catastrophes (the time without',
    'testing, thalidomide — the rules that arose from it),',
    'the business of again and again (the lifelong',
    'medication), the marketing that crossed the line, and the',
    'lean balance sheet at the chronic diseases. The one voice',
    'calls it the honest self-examination, the other the',
    'halved reckoning — but both stand before the same',
    'numbers. And both know: the medicines are not the',
    'problem. The business is not the problem. The question is',
    'whom the system serves when both come together.',
    '',
    '## Where they go apart',
    '',
    'The contradiction begins with the interpretation of the',
    'business. The industry says: the price is the price of',
    'the research — without profit no development, without',
    'development no rescue. The criticism says: the price is',
    'also the price of the market — the research follows the',
    'profit, the marketing exceeds the research, the vanished',
    'studies distort the knowledge, and whoever researches',
    'critically loses the funding. The industry sees in the',
    'sick person the customer who is cared for; the criticism',
    'sees the customer who is needed so that the business',
    'runs. They do not quarrel about individual medicines —',
    'those are good —, but about the question whether a system',
    'that lives from illness really wants health. And they',
    'quarrel about the simple medicine: the industry says it',
    'is the affair of the individual; the criticism says it is',
    'the truth that has no lobby.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'For the fifteenth time the same pattern — and now it',
    'becomes the test: the way of thinking determines the',
    'method. The way of thinking of the pill — the illness as',
    'a chemical problem, the tablet as the answer — has',
    'transformed medicine and saved millions. But it has also',
    'made visible the limit of this way of thinking: it sees',
    'the molecule, not the human being; it heals the symptom,',
    'not the life; it manages the chronic disease instead of',
    'preventing it. The innovation cycle of this book holds',
    'here too: the new harmed first (cocaine, heroin,',
    'thalidomide), before it became a blessing — and the',
    'testing that saved it came only after the catastrophe.',
    '',
    'And this chapter asks the question that leads to the end',
    'of the book: Whom does medicine serve — the sick or the',
    'market? The answer lies not in the abolition of the',
    'industry, but in the memory of what medicine is: a',
    'service to the human being that does not have to pay for',
    'itself. The next chapters will show what happens when',
    'this service becomes a business — and what happens when',
    'people resist it: the vaccine debate, naturopathy, the',
    'simple medicine. And at the end the question whether a',
    'coexistence is possible between the pill and the advice,',
    'between the market and the human being.',
  ].join('\n'),

  urteil: {
    frage:
      'What is worth more to you — a medicine that saves your life, or ' +
      'a system you can see through? And may both cost the same?',
    hinweis: [
      'There is no right and no wrong here. Take the two halves',
      'of this chapter before you. The one: without this',
      'industry there would be no insulin, no antibiotics, no',
      'HIV therapy — and millions of people would not have',
      'become as old as they have become. The other: a trade',
      'that profits from the duration of an illness has no',
      'interest in its end, and a cure consumes its own market.',
      'Ask yourself three things. First: Who should pay for the',
      'ten to fifteen years of research, if not the later price',
      '— the state, the insurance fund, a foundation, all',
      'together? Second: Who should decide what is researched,',
      'if not the market — and who decides then? Third: What',
      'changes in your answer when it is about a remedy you',
      'need yourself? Exactly between these questions lies the',
      'dispute that has not been settled for a hundred years.',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Is it true that "Heroin" was once a quite normally saleable ' +
        'cough medicine?',
      antworten: [
        'No, it was banned from the beginning.',
        'Yes — it was marketed as a cough medicine from 1898 and ' +
          'expressly advertised as not habit-forming.',
        'Yes, but only in America and only for adults.',
      ],
      richtig: 1,
      erklaerung:
        'On 10 August 1897 Felix Hoffmann produced acetylsalicylic ' +
        'acid in Elberfeld (sold as Aspirin from 1899) and eleven days ' +
        'later diacetylmorphine. From 1898 it came onto the market under ' +
        'the name "Heroin", as a cough medicine and as an allegedly ' +
        'harmless substitute for morphine, and was exported to over ' +
        'twenty countries. In 1913 production ended, in 1924 the USA ' +
        'banned it, in 1931 it was strongly restricted in Germany — ' +
        'there was no approval testing back then.',
    },
    {
      frage:
        'What did the thalidomide catastrophe of 1957 to 1961 change in ' +
        'the testing of medicines?',
      antworten: [
        'Nothing — the rules existed before.',
        'Only the advertising of sleeping remedies was banned.',
        'Only afterwards did proof of efficacy and safety and the ' +
          'state approval become a duty.',
      ],
      richtig: 2,
      erklaerung:
        'Contergan came onto the market without prescription on 1 ' +
        'October 1957, advertised as especially well tolerated also for ' +
        'pregnant women. After the warning of the Hamburg paediatrician ' +
        'Widukind Lenz it was withdrawn on 26 November 1961; estimates ' +
        'speak of 5,000 to 10,000 injured children worldwide. In 1962 ' +
        'the USA required for the first time proof of efficacy in ' +
        'controlled studies; in Germany only the Medicines Act of 1976 ' +
        '(in force 1978) brought the real approval. In the USA the ' +
        'examiner Frances Oldham Kelsey had refused the approval.',
    },
    {
      frage:
        'How long does it take today on average before an active ' +
        'ingredient becomes an approved medicine?',
      antworten: [
        'Ten to fifteen years — and about nine of ten candidates ' +
          'fail along the way.',
        'One to two years.',
        'About thirty years.',
      ],
      richtig: 0,
      erklaerung:
        'On the search among tens of thousands of substances follow ' +
        'the preclinical testing and three study stages in humans: ' +
        'Phase I (tolerability, mostly healthy people), Phase II (Does ' +
        'it work at all?) and Phase III (Is it better than the known?). ' +
        'Of the active ingredients that reach the first test in humans, ' +
        'about one in ten is approved — most fail late, when the money ' +
        'has already been spent. That is the industry\'s justification ' +
        'for the high prices; the level of the development costs is ' +
        'disputed.',
    },
    {
      frage: 'What happened in 1996 in the treatment of HIV?',
      antworten: [
        'A vaccine was approved.',
        'The combination therapy of several active ingredients ' +
          'prevailed and made a treatable disease out of a death ' +
          'sentence.',
        'The disease was considered eradicated.',
      ],
      richtig: 1,
      erklaerung:
        'Several active ingredients at the same time give the virus ' +
        'hardly any possibility to evade. The mortality broke down ' +
        'within two years in the treated countries; today a tablet a ' +
        'day often suffices, the life expectancy lies close to that of ' +
        'an uninfected person, and whoever is successfully treated is ' +
        'no longer infectious. A vaccine does not exist to this day. ' +
        'Until the remedies arrived in poorer countries, further years ' +
        'and a dispute over patents and prices passed.',
    },
    {
      frage:
        'For how much did the discoverers sell the patent on the ' +
        'insulin in 1923?',
      antworten: [
        'For a million dollars.',
        'They did not file a patent at all.',
        'For a symbolic dollar, so that nobody profits from the ' +
          'substance.',
      ],
      richtig: 2,
      erklaerung:
        'Frederick Banting, Charles Best and James Collip surrendered ' +
        'the patent to the University of Toronto for a dollar each — a ' +
        'life-saving substance should belong to nobody. Produced it was ' +
        'nevertheless by companies: from 1923 by Eli Lilly in ' +
        'Indianapolis, in Europe among others on licence by the ' +
        'Farbwerke Höchst. A hundred years later the price in the ' +
        'United States was so high that people rationed their dose; ' +
        'only public pressure and a law capped it.',
    },
  ],
};

module.exports = pharmaindustrie;

