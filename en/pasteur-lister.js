// Chapter 13 — "Pasteur and Lister".
//
// The third chapter of the modern era and the turning point of the whole
// book: here medicine finds the cause of wound infection, which Semmelweis
// saw in Chapter 9 but could not name. A chemist in France explains what
// fermentation is — and a surgeon in Scotland draws the conclusion for the
// operating table.
//
// The WAY-OF-THINKING analysis is the heart of the chapter (operator
// requirement). It asks here: Why fermentation? (Because a chemist who was
// supposed to help industry kept finding the same pattern in spoiled wine,
// sour beer and diseased silkworms — tiny living creatures that break
// something down.) Why the germs? (Because they are everywhere: in the air,
// in dust, on skin — and because they fall into the bottle just as they
// fall into the open wound.) Why did spontaneous generation have to fall?
// (Because germs that arise from nothing would not be a cause but a
// consequence — the whole germ theory hung on it.) Why weaken instead of
// kill? (Because the body gets to know a living but exhausted opponent
// better.) And the great replacement: the way of thinking of balance gives
// way to the way of thinking of cause — disease is an intruder, not a
// disturbed measure.
//
// LENGTH RULE (operator feedback 24.08.2026): From Chapter 9 onwards the
// rule is reversed — complete and detailed. Detailed does not mean padded:
// every paragraph carries the narrative forward. Measured in
// tests/karte-pasteur-lister.mjs.
//
// The TONE rule: BOTH sides treated fairly. This first voice speaks from
// the laboratory and names the uncomfortable spots on its own side itself:
// the staging of Pouilly-le-Fort and the vaccine about which Pasteur spoke
// differently in public than in his notebooks (Gerald Geison, 1995); the
// rabies vaccination of a child without prior testing on a human being;
// the two treatments before Joseph Meister of which he did not speak; the
// ambition, the quarrel with Pouchet and with Koch; and the limit of its
// own way of thinking — the germ does not explain why one person falls ill
// and another does not.
//
// NO RUMOURS (operator decision 25.08.2026): Only what is documented. Two
// well-known stories about Pasteur are NOT documented and are explicitly
// marked as unconfirmed in the text: the alleged deathbed saying ("the
// germ is nothing, the milieu is everything") and the widespread
// interpretation of Joseph Meister's death in June 1940.
//
// Voices (round 12): The FIRST perspective — the laboratory, the voice of
// Pasteur — was written by Opus. The SECOND (the clinic: Joseph Lister in
// Glasgow, the carbolic acid, the numbers, the mockery of colleagues, the
// connection of laboratory and clinic as the actual event) and the final
// synthesis were added by Hermes in the second pass. Perspective workflow:
// CLAUDE.md.
//
// NO REPETITIONS (operator decision 21.08.2026): Chapter 1 is structured by
// "who speaks here", Chapter 2 begins with a scene, Chapter 3 tells a day
// in the life, Chapter 4 is a correspondence, Chapter 5 the journey of a
// book, Chapter 6 a walk-through, Chapter 7 a trial, Chapter 8 an account,
// Chapter 9 a clock, Chapter 10 a chain. This chapter chooses the twelfth
// dramaturgy: THE MICROSCOPE. The sections are specimens that come under
// the lens one after another — a drop of diseased beet juice, the dust of
// the air, the neck of a bottle, a silkworm, the blood of a dead sheep,
// the spinal cord of a rabbit. The second voice can hold the same lens
// over the operating table: there lies the specimen Pasteur never
// received — an open wound.
//
// The texts are stored as line arrays joined with `.join('\n')` — this
// keeps them readable in the repo at ~72 characters (the operator
// proofreads them here), and utils/markdown.js turns them back into
// flowing text in the app.
//
// CommonJS without UI imports (architecture rule): checkable with bare
// `node`.

/**
 * The Voice of the Laboratory — the germ theory from within.
 *
 * Written by Opus (round 12). A voice that speaks for Louis Pasteur and
 * his co-workers: Émile Roux, Charles Chamberland, Louis Thuillier. It
 * tells why they did what they did — and it names the uncomfortable spots
 * itself (additional rule for sensitive topics in CLAUDE.md).
 */
const stimmeDesLabors = [
  '## The Lens',
  '',
  'We begin with an instrument, not with a person.',
  '',
  'On the table stands a microscope. Beneath it lies a small glass plate,',
  'and on the plate a drop of liquid. What swims in that drop is too',
  'small to be suspected, and it decides whether a cask of wine is sold',
  'or poured away, whether a family can live from silkworm breeding —',
  'and, as will become clear, whether a person lives or dies.',
  '',
  '**What you hear here is the view of the laboratory — a way of',
  'thinking, not a truth.** We speak for the chemist Louis Pasteur',
  '(1822–1895) and for those who stood with him at this table: Émile',
  'Roux, Charles Chamberland, Louis Thuillier. We are not physicians. We',
  'have never tended a sickbed, never stitched a wound, never written a',
  'prescription. We studied fermentations. That this became the greatest',
  'turn in the history of medicine surprised even us.',
  '',
  'We therefore tell this chapter the way we worked: **as a series of',
  'specimens.** One after another they come under the lens, and each one',
  'answers a question and poses the next. At the end a specimen lies on',
  'the table that we could no longer examine — an open wound. For that,',
  'a surgeon was needed.',
  '',
  'And because you should not believe us merely because we have',
  'monuments: we also put under the lens what makes us look bad. There',
  'is no small amount of it.',
  '',
  '## The First Specimen: a Drop of Diseased Beet Juice',
  '',
  'Lille, summer 1856. A city of factory chimneys, and the new dean of',
  'the faculty of science has the explicit mandate to be useful to the',
  'factories. A distillery owner named Bigo arrives with an expensive',
  'problem: his beet juice no longer yields alcohol but a slimy, sour',
  'broth. Whole vats are lost. Nobody knows why.',
  '',
  'The dean takes samples from the good vats and from the spoiled ones',
  'and puts both under the lens. **In the good ones swim round, plump',
  'yeast cells. In the spoiled ones lie other, much smaller forms: short',
  'rods.** Not a few. Millions.',
  '',
  'For a chemist of those years this is not a finding but a nuisance.',
  'The prevailing doctrine — it comes from Justus von Liebig, Europe\'s',
  'most respected chemist — says: fermentation is a chemical',
  'decomposition. Something dead falls apart and drags the sugar along',
  'with it in passing. According to this doctrine the yeast is a residue',
  'of the process, not its author. What one sees under the microscope is',
  'waste.',
  '',
  'We turned it around, and that is the first and perhaps most important',
  'sentence of this chapter: **The yeast is not waste. It is a living',
  'being, and fermentation is what it does.** What turns sugar into',
  'alcohol is not chemistry but an organism that lives on it. And when',
  'lactic acid forms instead of alcohol, that is not due to a disturbed',
  'decomposition but to another living being sitting in the vat — the',
  'rod instead of the ball.',
  '',
  '**Why fermentation of all things?** Not out of curiosity about wine.',
  'But because in it something becomes visible that one cannot see so',
  'cleanly anywhere else: **a great, consequential change that emanates',
  'from a tiny living being.** A few little globules that no one sees',
  'with the naked eye transform a whole cask. Whoever has seen that once',
  'thinks the same thing at every other transformation that seems to',
  'happen by itself: perhaps there is also someone behind this whom I',
  'simply cannot see.',
  '',
  'And something else came along that made the matter practical: we',
  'could **steer** it. Wine that is briefly warmed to about fifty-five',
  'degrees no longer spoils — the disruptive organisms die, the wine',
  'remains drinkable. In 1865 the process was protected; today it bears',
  'our name, and it is printed on every carton of milk. **If one can',
  'remedy an evil by killing something living, then the evil was',
  'alive.**',
  '',
  '## The Second Specimen: the Dust in the Air',
  '',
  'That raised the next question: where do they come from?',
  '',
  'The vat had been clean. The juice was fresh. Yet suddenly millions of',
  'rods are sitting in it. Do they come from outside — or do they arise',
  'in the vat?',
  '',
  'So we put the air itself under the lens. One draws air through a plug',
  'of guncotton, dissolves the plug and examines what has been caught.',
  'One finds dust — and among the grains of dust small bodies that look',
  'like what swims in the spoiled vat.',
  '',
  'That sounds harmless and is a description of the world: **The air is',
  'not empty.** In every room, over every table, in every breath floats',
  'an invisible cargo. It settles on everything that stands open: on the',
  'broth, on the meat, on the milk — and, this will later be the whole',
  'point, on every open wound.',
  '',
  '**Why is this the decisive observation?** Because it replaces an',
  'explanation thousands of years old. The physicians before us spoke of',
  'miasmas: of bad, spoiled air that makes one ill — the swamp, the',
  'stench, the noxious vapours. They were not wrong in what they',
  'observed; where it stank, people fell ill. But they had the wrong',
  'cause. **It is not the smell that makes one ill. It is what floats',
  'in the air with the dust.** The difference looks small and is',
  'enormous: against a stench one can do little. Against something',
  'living that can be killed, filtered and kept away, a great deal.',
  '',
  '## The Third Specimen: the Neck of a Bottle',
  '',
  'And now to the dispute that cost us years and without which none of',
  'all this would have stood.',
  '',
  'Against our explanation stood a venerable doctrine: **spontaneous',
  'generation**. It holds that low life arises by itself from dead',
  'matter — in putrefying meat, in hay infusions, in a broth that is',
  'left to stand. Its most respected defender was Félix-Archimède',
  'Pouchet, the director of the natural history museum in Rouen, a',
  'serious man with serious experiments: he boiled his infusions, sealed',
  'them, let only glowing-hot air in — and still found life in them',
  'again.',
  '',
  '**Why did we have to refute spontaneous generation?** Because without',
  'that the whole germ theory collapses, and precisely at its most',
  'important point. Think it through: if life can arise by itself in a',
  'putrefying wound, then the germs one finds there are **not the cause',
  'of the putrefaction but its consequence** — by-product that appears',
  'when the flesh spoils. Then every measure against germs is',
  'pointless, for they arise anew again and again. **The question of',
  'whether life arises from nothing is therefore no philosophical game.',
  'It decides whether it is worth boiling a knife.**',
  '',
  'Our answer was a piece of glass. One takes a flask of broth, heats',
  'the neck in the flame and draws it out into a long, downward-curved',
  'swan neck. The flask stays **open** — the air goes in and out,',
  'unimpeded. Only the dust does not get through: it settles in the',
  'curve, because it is heavier than the air. Then one boils the broth',
  'once and sets the flask aside.',
  '',
  'It remains clear. Weeks, months, years. Some of those flasks still',
  'stand clear today in the institute in Paris. But if one tips the',
  'flask so that the broth touches the curve and runs back, or breaks',
  'off the neck, it clouds within a day or two. **It was never the air.',
  'It was always the dust in the air.**',
  '',
  'We then carried the test out into the landscape, and that was the',
  'most beautiful part of the work: twenty sealed flasks opened in the',
  'dusty yard, twenty opened in a cool cellar, twenty opened in the',
  'fields near Arbois — and twenty high up on the Mer de Glace at',
  'Chamonix, in air in which almost nothing floats. The result was a',
  'relay: **The purer the air, the fewer flasks spoiled.** On the',
  'glacier almost everything stayed clear. On 7 April 1864 we',
  'demonstrated this at the Sorbonne before a large audience.',
  '',
  'And now the uncomfortable half of this story, which rarely appears in',
  'the schoolbooks.',
  '',
  '**Pouchet\'s experiments were not faked, and he was no fool.** He',
  'worked with hay infusions. In hay lurk durable forms of bacteria —',
  'spores — that survive boiling water. Whoever boils hay broth for ten',
  'minutes has not made it germ-free; afterwards it turns cloudy,',
  'without any spontaneous generation. We worked with yeast water and',
  'sugar solutions that could indeed be made germ-free by boiling. **So',
  'we had not only the better explanation, we also had the more',
  'tractable material.** That spores are so heat-resistant was only',
  'shown by John Tyndall nearly a decade later.',
  '',
  'We did not speak of this advantage. Instead we pressed for public',
  'demonstrations and summoned Pouchet before commissions whose',
  'conditions we helped determine; in the end he withdrew. Historians',
  'of science have since traced this, and they are right: **We won the',
  'dispute also with the means of the better speaker, not only with',
  'those of the better experiment.** Our conclusion was correct. The',
  'road there was not as clean as the flasks.',
  '',
  '## The Fourth Specimen: a Diseased Silkworm',
  '',
  'In 1865 the government summoned us to the south. In the valleys',
  'around Alès the silkworms were dying; a whole region lived from',
  'them, and it was on the way to ruin. We knew nothing about',
  'silkworms. We had never seen one.',
  '',
  'We spent five years there. Under the lens we found tiny corpuscles',
  'in the sick animals, and we also found them in the moths that still',
  'looked healthy and were laying the eggs. **Out of this came a method',
  'that cost not a single franc: after the egg-laying one examines the',
  'moth under the microscope. If the corpuscles are there, the eggs are',
  'destroyed. If they are not there, the eggs are sound.** That was how',
  'the breeding could be saved. It was the first time our work saved',
  'not a cask but a trade.',
  '',
  'Those five years were the hardest of our lives, and they belong in',
  'this chapter because they explain why we later became so unbending.',
  'In this period fall the death of our father and the deaths of two',
  'daughters: Camille, two years old, and Cécile, twelve. A third',
  'daughter, Jeanne, had died in 1859 at the age of nine of **typhoid**.',
  'Three of five children. No physician could do anything, and no one',
  'could say what it was.',
  '',
  'In October 1868, at forty-five, a stroke came. The left side',
  'remained paralysed; the leg dragged, the hand was barely usable.',
  '**Everything that still comes in this chapter — the anthrax, the',
  'fowl cholera, the rabies, the institute — is the work of a man',
  'paralysed on one side**, who had to dictate the hand movements',
  'because others carried them out.',
  '',
  'And in those years fell the sentence that turned an observation about',
  'wine and caterpillars into a medicine: **What fermentation is for',
  'wine, disease is for the human being.** In both cases a tiny living',
  'being penetrates, multiplies and transforms the whole. The wine turns',
  'sour, the caterpillar dies, the human gets a fever. It is the same',
  'process in a different vessel.',
  '',
  '## What Cannot Be Seen under Any Glass: the Way of Thinking',
  '',
  'Let us pause here, for here lies the essence, and it does not lie',
  'under the lens but behind it.',
  '',
  'For two thousand years medicine understood disease as a **disturbance',
  'of balance**. With Hippocrates and Galen it is the four humours that',
  'have fallen out of measure; in Chinese medicine it is the qi that',
  'does not flow; in Ayurveda it is the doshas. However different these',
  'doctrines are, they share a basic figure: **A person is ill when',
  'something is no longer right in them — too much, too little, too',
  'hot, too cold, blocked.** Treatment then means: restore the measure,',
  'draw off, warm, cool, strengthen.',
  '',
  'Our way of thinking is a different one, and it is the rupture this',
  'whole book is about: **Disease is an intruder, not a balance.** It',
  'comes from outside. It has a name, a shape, a way of life, a route',
  'on which it travels. One can stain it, cultivate it, put it under',
  'the glass and count it.',
  '',
  'Everything else follows from this basic figure, and it follows',
  'necessarily:',
  '',
  '**First: every disease has its own cause.** Not "fever" as a state,',
  'but this one pathogen that produces exactly this one clinical',
  'picture. That is the reason modern medicine is so obsessed with',
  'diagnoses: he who cannot name the cause cannot attack it.',
  '',
  '**Second: one finds the cause before one heals.** That is the',
  'inversion of all healing practice until then, and it is',
  'uncomfortable: it demands years of work during which nobody is',
  'helped. We worked six years on silkworms before a single human being',
  'had anything from it. **He who knows the cause can cut it off at the',
  'root — he who only relieves symptoms must relieve forever.**',
  '',
  '**Third: the experiment is the judge, not experience and not',
  'authority.** Not what Liebig says, not what has held for centuries,',
  'not what the experienced practitioner feels in his gut: the flask',
  'decides. One builds two setups that differ in exactly one point and',
  'lets them answer. **Chance favours only the prepared mind** — this',
  'sentence, spoken in 1854 in Lille, is not a consolation for lucky',
  'people but a work instruction: prepare the setup so that chance can',
  'tell you something.',
  '',
  '**Fourth: what one understands causally, one can prevent.** And that',
  'is the real prize. Not the treatment — the **prevention**. Filter,',
  'heat, keep away, kill, vaccinate.',
  '',
  'This way of thinking brought medicine its greatest victories, and it',
  'made it blind in one place, which we name ourselves before others',
  'do. **We explain the pathogen. We do not explain why of ten people',
  'who breathe in the same germ, three fall ill and seven do not.** For',
  'the old way of thinking that was precisely the main question: the',
  'state of the person into whom the germ falls. Our contemporary Claude',
  'Bernard insisted on that, and the chemist Antoine Béchamp held the',
  'same question up to us with hostility.',
  '',
  '(There is a sentence circulating about this that Pasteur is said to',
  'have spoken on his deathbed: the germ is nothing, the milieu is',
  'everything. **This sentence is not documented** — it appears in no',
  'contemporary source. We mention it here because it is often quoted,',
  'and we mark it as what it is: unconfirmed. The question behind it is',
  'nevertheless legitimate.)',
  '',
  '## The Fifth Specimen: the Blood of a Dead Sheep',
  '',
  'From 1877 something else lay under the lens: a drop of blood from a',
  'sheep that had died of **anthrax**. In it, in great numbers, long',
  'motionless rods.',
  '',
  'And here honesty number two is due: **We were not the first.** A',
  'German country doctor named Robert Koch had in 1876 clarified the',
  'whole life cycle of this pathogen, including the durable forms that',
  'survive in the soil for decades. That explained what the farmers',
  'called the "cursed fields": areas where the livestock fell ill again',
  'and again. We showed how the spores come up from the depths back to',
  'the surface — earthworms bring them up when dead animals have been',
  'buried.',
  '',
  'Between Koch and us there stood from the beginning more than a',
  'scientific question. France had lost a war against Germany in 1871,',
  'and we had, this is on record, our share of the spite. **The quarrel',
  'of two nations over the honour of a discovery held the matter up for',
  'years**, and both sides spent time proving each other\'s errors',
  'instead of working. In fairness to the honour: something did come of',
  'it. The harshness of the opponent\'s scrutiny made both schools',
  'better.',
  '',
  'The real discovery then came from a piece of carelessness. In the',
  'summer of 1879 a culture of the **fowl cholera** pathogen was left',
  'in the cupboard over the holidays. When it was given to the hens in',
  'the autumn, they became only mildly ill and recovered. One could',
  'have thrown the old culture away. We later re-inoculated the same',
  'animals with fresh, full-strength culture — and they stayed healthy',
  'while the other hens died.',
  '',
  '**Why weaken instead of kill?** Because a weakened pathogen still',
  'lives and still multiplies — weakly. It sets the body a task that',
  'the body can master, but it really does set it. The body learns from',
  'an opponent that does not kill it. **That is exactly Jenner\'s idea',
  'from the previous chapter — with one decisive difference: Jenner had',
  'to wait until nature gave him a mild relative, the cowpox. We could',
  'now produce the mild form ourselves.** Out of a stroke of luck came',
  'a method; out of one vaccination came many. We deliberately kept the',
  'name in Jenner\'s honour: vaccine, from the cow.',
  '',
  '## The Experiment at Pouilly-le-Fort, 5 May to 2 June 1881',
  '',
  'Claims cost nothing. So we submitted to the test — and publicly, in',
  'full form, on an estate near Melun.',
  '',
  'It had been set up by a veterinarian named Hippolyte Rossignol, who',
  'took us for charlatans and therefore chose harsh conditions: sixty',
  'animals, sheep, plus goats and cattle. One half was vaccinated on 5',
  'and 17 May, the other not. On 31 May **all** animals received a',
  'strong dose of living anthrax pathogens. The press, farmers and',
  'politicians were invited for 2 June.',
  '',
  'On 2 June the vaccinated animals stood in the pasture and grazed.',
  'The unvaccinated were dead or dying. The news went around the world',
  'within days; within a year hundreds of thousands of sheep were',
  'vaccinated in France. **It was the most convincing public experiment',
  'medicine had seen until then.**',
  '',
  'And now what was not told alongside for a hundred years.',
  '',
  '**The experiment was staged.** Not the result — that was genuine and',
  'has been confirmed a hundred times over. But the way it came about.',
  'In public we had announced that we would work with a vaccine weakened',
  'by oxygen in the air — our own process, of which we were proud. What',
  'was used at Pouilly-le-Fort was another one: a vaccine treated with',
  'potassium dichromate, from the hands of Chamberland and Roux, which',
  'at that time was more reliable.',
  '',
  'That is what the laboratory notebooks say. The historian of science',
  '**Gerald Geison** evaluated and published them in 1995, after the',
  'family had released them. **So before the whole world we won an',
  'experiment while not telling the truth about an essential point.**',
  'That cannot be talked prettily, and we do not try. Whoever today',
  'mocks that studies are prettified and results sound better than',
  'their basis will find in this June 1881 an early case — not with a',
  'fraudster, but with a man who was right and still helped things',
  'along.',
  '',
  '## The Sixth Specimen: the Spinal Cord of a Rabbit',
  '',
  'The last specimen is the strangest, for under the lens there was',
  'nothing to see.',
  '',
  '**Rabies** is a disease that in the nineteenth century was feared',
  'like nothing else — not because of the number of dead (it was',
  'small), but because of the way of dying: weeks after a bite begin',
  'fear, convulsions, hydrophobia, paralysis. Whoever fell ill died,',
  'without exception.',
  '',
  'We looked for the pathogen and did not find it. No rod, no ball,',
  'nothing. Today one knows why: it is a virus, far too small for the',
  'lenses of that time. **So we worked with something we never laid',
  'eyes on** — we only knew where it sits: in the nerve tissue, in the',
  'spinal cord, in the brain.',
  '',
  'The method that Roux and we developed was correspondingly crude: one',
  'takes the spinal cord of infected rabbits and hangs it in a flask',
  'over caustic potash, where it dries slowly. With every day of drying',
  'it loses strength. Dried for fourteen days: almost harmless. Fresh:',
  'deadly. **One vaccinates with the oldest, weakest material and works',
  'forward day by day to the fresher.** On dogs — about fifty — it',
  'held: treated animals did not fall ill, even when they were infected',
  'afterwards.',
  '',
  'And here comes the circumstance that makes rabies the borderline',
  'case of this chapter. **Rabies is the only disease in which one can',
  'still vaccinate after infection**, because the virus travels slowly',
  'along the nerves for weeks before it reaches the brain. The vaccine',
  'runs ahead of it along the bloodstream. But that also means: one',
  'treats a person who is not yet ill and might never have become ill —',
  'not everyone bitten falls ill.',
  '',
  '## 6 July 1885: a Boy from Alsace',
  '',
  'On that Monday morning a woman stood in the laboratory who had',
  'travelled two days and four hundred kilometres. With her a boy of',
  'nine, **Joseph Meister** from Meissengott in Alsace. On 4 July a',
  'rabid dog had thrown him to the ground on the way to school and',
  'bitten him fourteen times, on hands, legs and thighs, deeply. A',
  'physician had burned the wounds out with carbolic acid and told the',
  'mother that in Paris there was someone who was trying something on',
  'dogs.',
  '',
  'What happened then belongs to the most famous hours in the history',
  'of medicine, and we tell it as precisely as possible, because here',
  'the details are everything.',
  '',
  'Pasteur sent for two physicians: **Alfred Vulpian** and',
  '**Jacques-Joseph Grancher**. They looked at the boy and considered',
  'the situation hopeless enough to justify the attempt. On the evening',
  'of 6 July the treatment began: thirteen injections in ten days,',
  'starting with cord dried for fifteen days, ending with fresh, fully',
  'potent. **It was Grancher who gave the injections, not Pasteur. For',
  'Pasteur was not allowed to: I am a chemist, not a physician** —',
  'without a medical licence any injection of his own would have been',
  'punishable.',
  '',
  'The boy stayed healthy. Three months later a second was treated:',
  '**Jean-Baptiste Jupille**, a fourteen-year-old shepherd boy from the',
  'Jura who had torn a rabid dog away from younger children with his',
  'bare hands. He too survived. Within a year more than two thousand',
  'bitten people came to Paris, from Russia, from America, from all',
  'over the world.',
  '',
  '## What This Experiment Was — and What It Was Not',
  '',
  'Now we put our own deed under the lens. It does not hold up in every',
  'part.',
  '',
  '**First: there was no testing on a human being before this human',
  'being.** The method had been tried on dogs, not on persons. On the',
  'evening of 6 July 1885 a nine-year-old child was injected with an',
  'agent about which no one knew how a human body would respond — and',
  'whose final doses explicitly contained **fully infectious',
  'material**. Had the treatment failed, one could never have said',
  'whether the dog or the injection had killed the boy.',
  '',
  '**Second: the consent was not consent in today\'s sense.** A',
  'desperate mother who has travelled four hundred kilometres because',
  'she was told this was the only hope does not decide freely.',
  'Information forms, a cooling-off period, an independent body that',
  'reviews the experiment in advance: none of that existed. That is no',
  'accusation against the age — these institutions existed nowhere. It',
  'is a statement about what our fame is built on.',
  '',
  '**Third: we did not tell everything.** From the laboratory notebooks',
  'that Geison evaluated it emerges that Pasteur had already treated two',
  'people with rabies material before Joseph Meister, without speaking',
  'of it publicly; one of the two cases ended fatally. **In our account',
  'Meister was the first human being. In the notebooks he was not.**',
  '',
  '**Fourth: the success proves less than it seems.** Of a hundred',
  'people bitten by a rabid animal, not a hundred fall ill. Whether',
  'Joseph Meister would have fallen ill without treatment, no one',
  'knows. Only the many thousands treated in the following years and',
  'the comparison with the untreated have shown that the method works —',
  '**the single case from which the legend was made could never show',
  'that.**',
  '',
  'And what speaks in our favour we also say, so that you can weigh',
  'both. The alternative was not caution against daring. The',
  'alternative was a child with fourteen deep bites against a disease',
  'that back then killed **everyone** who got it. We called in two',
  'physicians instead of acting alone. We did not lose sight of the',
  'boy: Joseph Meister later worked at the institute, as a porter. **It',
  'turned out well. That does not make it a permissible experiment — it',
  'makes it a gamble that turned out well.** These two sentences one',
  'must be able to hold side by side.',
  '',
  '(About Meister\'s death in June 1940 a dramatic story circulates.',
  'What is documented: he died on 24 June 1940, shortly after the',
  'German troops marched into Paris, by his own hand. The widespread',
  'explanation for it is **not confirmed**, and we therefore do not',
  'repeat it.)',
  '',
  '## The House Built from Donations',
  '',
  'After the rabies came the money — and it came from below. For an',
  'institute where the bitten were to be treated and pathogens',
  'researched, a public collection came together: from France, from',
  'Russia, from Brazil, from the Sultan of the Ottoman Empire, from',
  'school classes and workers\' associations. On 14 November 1888 the',
  '**Institut Pasteur** in Paris was opened.',
  '',
  'It was conceived differently from a university from the start: a',
  'house in which research, treatment and teaching go on, and in which',
  'the staff may stay. From this house came in the following decades',
  'the serum against diphtheria (Roux), the discovery of the plague',
  'pathogen (Yersin), the vaccine against tuberculosis (Calmette and',
  'Guérin) and Metschnikoff\'s work on the phagocytes — the first',
  'answers to the question of **why** a vaccination protects at all.',
  'That question we could not answer ourselves.',
  '',
  'Pasteur died on 28 September 1895. He lies in a crypt in this house,',
  'not a hundred steps from the laboratories.',
  '',
  '## The Balance Sheet under the Lens',
  '',
  'Let us take stock, in both directions — as honestly as we would with',
  'a specimen.',
  '',
  '**What holds.** The germ theory is the most consequential single',
  'insight in the history of medicine. On it stand hygiene, antisepsis',
  'and asepsis in surgery, the sterilisation of instruments, drinking',
  'water treatment, food control, the entire development of vaccines',
  'and, half a century later, the antibiotics. The refutation of',
  'spontaneous generation holds to this day; the swan-neck flasks are',
  'an experiment one can reproduce in any school. Pasteurisation has',
  'saved countless lives — not through treatment, but by making milk',
  'stop transmitting tuberculosis. The vaccines against anthrax and',
  'rabies were the first that were **made** in the laboratory instead',
  'of found in nature.',
  '',
  '**Where our limits lie.** We were chemists, not physicians. We',
  'transformed medicine without ever writing a prescription, and we',
  'therefore underestimated some things that count at the bedside. We',
  'helped things along at Pouilly-le-Fort and kept silent about it. We',
  'treated a child with an agent that had never been tested on a human',
  'being, and smoothed the road there. We won a dispute with the',
  'speaker and not only with the flask. And we let ourselves be',
  'celebrated — the procession of honours, the jubilee at the Sorbonne,',
  'the monument during our lifetime. **A man who is right can',
  'nevertheless be vain, and we are not prepared to offset the one',
  'against the other.**',
  '',
  '**What remains open.** Our way of thinking explains the pathogen and',
  'not the person. It says why a wound suppurates, but not why the same',
  'germ kills one person and does not touch another. It is excellent',
  'for diseases that come from outside — and poor for those with which',
  'medicine today has most to do: cancer, diabetes, rheumatism,',
  'exhaustion. **We gave medicine a tool made for one kind of disease,',
  'and it has long tried to work all the others with it too.** That',
  'research today again asks what constitutes the soil into which a',
  'germ falls — the bacteria in the gut, the state of the defences,',
  'the life circumstances — is no refutation of our work. It is the',
  'return of a question we pushed aside because we could not measure',
  'it.',
  '',
  '## The Specimen We Could Not Put on the Slide',
  '',
  'There remains the one thing we owe you.',
  '',
  'In Chapter 11 of this book stands a physician in Vienna who counts',
  'what nobody wants to count: **Ignaz Semmelweis**, whose maternity',
  'patients died when physicians examined them and lived when midwives',
  'did. He found the measure — washing hands with chlorinated lime —',
  'and was right, and yet he could convince no one. **For he could not',
  'say WHAT clings to the hands.** He called it "decomposed organic',
  'particles". That is not a cause, that is a conjecture in fine words.',
  '',
  'What we found in this chapter is exactly the answer to his question.',
  'Something living clings to those hands. It has a name, it',
  'multiplies, it can be killed. **Semmelweis had the measure without',
  'the explanation. We had the explanation without the patient.**',
  '',
  'Both was put together by another, and he is the second voice of this',
  'chapter. **It belongs to the surgeon Joseph Lister in Glasgow** —',
  'the man who read our papers on fermentation and drew the only',
  'conclusion a surgeon can draw from them: if wounds do not putrefy by',
  'themselves but because of something that falls into them, then one',
  'must kill that something before it reaches the wound. He did it with',
  'carbolic acid, from 1865, against the mockery of his colleagues,',
  'and he presented the numbers: mortality after amputations from about',
  'forty-five to about fifteen in a hundred.',
  '',
  'He will also tell you what we did not manage. That his method was',
  'cumbersome and the acid irritated the wounds. That it took thirty',
  'years and a war until London believed what Glasgow had shown. And',
  'that in the end it was not his antisepsis that won, but the asepsis',
  'of the German school: not to kill germs in the wound, but not to let',
  'them in at all.',
  '',
  '**The real event of this chapter is therefore no discovery but a',
  'connection:** a chemist who found the cause, and a surgeon who made',
  'an action out of a cause. The two met only late — in 1892, at a',
  'celebration at the Sorbonne, where an old man paralysed on one side',
  'went to meet an old surgeon from Scotland. **What lay between them',
  'was not conversations. It was papers that had been read.**',
  '',
  'Now put the second voice under the lens.',
].join('\n');

/**
 * Lister — the clinic. The specimen that did not fit on the slide: the
 * patient. The surgeon in Glasgow who read Pasteur's paper, introduced
 * carbolic acid and lowered mortality after amputations from almost half
 * to one sixth.
 *
 * Written by DeepSeek (round 12, second pass). This voice too names the
 * uncomfortable spots on its own side itself (additional rule for
 * sensitive topics).
 */
const stimmeDesLister = [
  '## The Specimen That Did Not Fit on the Slide',
  '',
  'The laboratory has laid its specimens on the table — beet juice,',
  'dust, bottle neck, silkworm, sheep\'s blood, spinal cord. Now the',
  'clinic lays its own beside them, and it is the only one that does',
  'not fit under a glass: the patient. He breathes, he groans, he runs',
  'a fever, he dies — and precisely that is the specimen medicine is',
  'about. Without him the laboratory would be a collection of pretty',
  'pictures. With him it becomes the question: what saves this human',
  'being?',
  '',
  '## The First Specimen from Glasgow: the Numbers',
  '',
  'Glasgow, 1860s. I am a surgeon at the Royal Infirmary and I know the',
  'numbers nobody likes to utter: of the people whose leg I amputate,',
  'almost half die. Not by my knife — the amputation itself succeeds.',
  'They die in the days after: the wound suppurates, the body swells,',
  'the fever rises, and nothing helps. We surgeons have become so used',
  'to it that we call it "the wound fever", as if it were a fate like',
  'the weather. We change the dressings without washing our hands; we',
  'sew with the same thread with which we opened an abscess yesterday;',
  'we operate in the same coats stiff with blood and pus. And we do not',
  'ask why. One does not ask about the weather.',
  '',
  '## The Second Specimen: a Paper from France',
  '',
  'Then, in 1865, a paper falls into my hands — by a chemist in Paris',
  'who concerns himself with wine and silkworms. Louis Pasteur has',
  'shown that decomposition is caused by living beings: invisible germs',
  'that are everywhere, in the air, in the dust, on the hands. The',
  'putrefaction of a wound, I thought, is precisely that:',
  'decomposition. If the germs make the wine ferment, perhaps they also',
  'make the wound ferment — the pus fever. And if they come from',
  'outside, one can keep them out — or kill them before they penetrate.',
  '',
  'That was the moment when the laboratory and the clinic touched each',
  'other for the first time. Pasteur had found the cause without ever',
  'seeing a patient. I saw the patients without knowing the cause.',
  'Together we were complete.',
  '',
  '## The Third Specimen: the Carbolic Acid',
  '',
  'I looked for an agent that kills the germs without killing the',
  'patient. The choice fell on carbolic acid — a tar product that one',
  'used back then to purify sewage. I had the instruments washed in it,',
  'the hands, the wound, the dressing. The colleagues mocked the smell',
  'that drifted through the ward; I liked it, for it smelled of life.',
  'The numbers changed: in my department after the amputation, instead',
  'of almost half, only about one in six died. I published the cases,',
  'one after another, with all the numbers — and the world watched the',
  'mortality fall.',
  '',
  '## The Fourth Specimen: the Mockery',
  '',
  'The world watched — and laughed. For years antisepsis was ridiculed',
  'in England: too cumbersome, too expensive, too much the smell of',
  'sewage. Some colleagues tried it half-heartedly, skipped the',
  'dressings, washed the wound only once — and when it then did not',
  'work, the method was to blame. In Germany they listened better;',
  'there surgery built on my work. I never quarrelled the way Pasteur',
  'quarrelled. I delivered numbers and waited. The numbers won — more',
  'slowly than I had wished, but they won.',
  '',
  '## Where This Voice Itself Fails',
  '',
  'Now the uncomfortable spots, for the clinic too has an account to',
  'settle.',
  '',
  '**First: the carbolic acid was not the final answer.** It killed',
  'germs — and it irritated the wounds, weakened the defences,',
  'corroded the surgeons\' hands. When Robert Koch and his pupils',
  'showed that one need not kill the germs but can keep them away —',
  'the asepsis: everything sterile, nothing penetrates — that was the',
  'better method. I resisted asepsis for a long time because I',
  'defended my antisepsis. That too belongs to the truth: the man who',
  'taught sterility clung to his disinfectant when the future already',
  'bore a different name.',
  '',
  '**Second: I never fully settled the question of priority.** Other',
  'surgeons before me had tried something similar — Semmelweis in',
  'Vienna, whom they laughed at before I was born. I named him only',
  'late. The truth is: I had the advantage of reading Pasteur\'s paper;',
  'he had only his own observation. The fame went to me because I had',
  'the proof. That is not always just.',
  '',
  '**Third: I was a surgeon, not a revolutionary.** I conquered the',
  'wound infection, but I did not change the hospitals — the hygiene,',
  'the ventilation, the training of the nurses came only after me. He',
  'who only cleans the wound but leaves the house dirty has done half',
  'the work.',
  '',
  '## Answer to the Laboratory',
  '',
  'In the end the laboratory asked what became of its discovery when it',
  'reached the clinic. The answer of this voice: it was put to the',
  'test — on people who did not ask whether they wanted to be test',
  'subjects, because they had no choice. The germ theory transformed',
  'surgery: from the craft of cutting into a science of rescue. The',
  'numbers we have achieved since would be unthinkable without',
  'Pasteur\'s lens — and the lens without the patient would be only a',
  'toy. The laboratory finds the truth. The clinic saves the human',
  'being. Only both together are the medicine this chapter can',
  'celebrate — and the question of whether it also saves the poor who',
  'lay on the tables remains open for the chapters to come.',
].join('\n');

/** Chapter 13 of the topic map. */
const pasteurLister = {
  id: 'pasteur-lister',
  titel: 'Pasteur and Lister',
  epoche: '~1860–1880',

  aufhaenger: {
    frage:
      'What do wine stains, silkworms and a bitten boy have to do with ' +
      'the greatest turn in medicine?',
    text: [
      'Everything. A chemist in France is supposed to find out why wine',
      'turns sour, beer spoils and silkworms die. Everywhere he finds the',
      'same: tiny living creatures that break something down. And he draws',
      'the conclusion that will transform medicine — what fermentation is',
      'for wine, disease is for the human being.',
      '',
      'A surgeon in Glasgow reads his papers and understands what that',
      'means for his operating table: if wounds do not putrefy by',
      'themselves but because of something that falls in from the air,',
      'then one must kill that something. From 1865 he washes wounds and',
      'instruments with carbolic acid. Within a few years the mortality',
      'after amputations in his departments falls from almost half to',
      'about one sixth.',
      '',
      'That answers the question Ignaz Semmelweis had posed twenty years',
      'earlier and had not been able to explain: what clings to the hands',
      'of the physicians? Medicine has found the cause of wound',
      'infection — and with it a new way of thinking. From now on disease',
      'is no longer a disturbed balance but an intruder with a name and a',
      'shape.',
      '',
      'This chapter tells both: the triumph — and what it cost. The',
      'public experiment of 1881, which was more carefully staged than',
      'was said. The first rabies vaccination in 1885 on a nine-year-old',
      'child, with an agent that had never been tested on a human being.',
      'And the limit of a way of thinking that explains the pathogen but',
      'not the person into whom it falls.',
    ].join('\n'),
  },

  karteHinweise: [
    {
      label: '1854–1864: fermentation and the refutation of spontaneous generation',
      hinweis:
        'Louis Pasteur, chemist, becomes dean in Lille in 1854 — a city of ' +
        'distilleries. In 1856 the manufacturer Bigo asks him for help: his ' +
        'beet alcohol is turning sour. Under the microscope Pasteur finds in ' +
        'the good vats round yeast cells, in the spoiled ones small rods. ' +
        'Fermentation is thus not a decomposition but the work of tiny living ' +
        'beings. Out of that comes the germ theory — and for it the doctrine ' +
        'of spontaneous generation must fall: in his lecture at the Sorbonne ' +
        'on 7 April 1864 Pasteur shows the swan-neck flasks, which let air in ' +
        'and hold dust back. They remain clear.',
    },
    {
      label: '1865–1867: carbolic acid in Glasgow',
      hinweis:
        'Joseph Lister, professor of surgery at the Glasgow Royal Infirmary, ' +
        'reads Pasteur\'s works on fermentation and draws the conclusion a ' +
        'surgeon can draw: if wounds do not putrefy by themselves but because ' +
        'of something that falls into them, then one must kill that something. ' +
        'From August 1865 he treats open fractures with carbolic acid. In 1867 ' +
        'he publishes the results: mortality after amputations falls in his ' +
        'departments from about 45 to about 15 percent. The numbers come from ' +
        'the beds of the harbour and shipyard workers on the Clyde.',
    },
    {
      label: '1877–1881: the vaccines and the experiment at Pouilly-le-Fort',
      hinweis:
        'In 1879 a culture of the fowl cholera pathogen is left standing in ' +
        'the laboratory over the summer; it no longer makes the hens ill — ' +
        'and protects them. Out of this accident becomes a method: weaken the ' +
        'pathogen, then administer it. From 5 May to 2 June 1881 Pasteur tests ' +
        'it publicly on the estate at Pouilly-le-Fort near Melun on sheep, ' +
        'goats and cattle; the press and farmers watch. The vaccinated animals ' +
        'survive the anthrax, the unvaccinated die. Later his notebooks showed ' +
        'that it was not the publicly described vaccine that was used but a ' +
        'differently produced one from the laboratory.',
    },
    {
      label: '1885: the rabies vaccination — Joseph Meister from Alsace',
      hinweis:
        'On 6 July 1885 a mother from Meissengott in Alsace brings her ' +
        'nine-year-old son Joseph Meister to Paris; a rabid dog had bitten him ' +
        'many times two days earlier. Pasteur has at his disposal a method ' +
        'with dried spinal cord from infected rabbits, tested on dogs but ' +
        'never on a human being. Because he is not a physician, the doctors ' +
        'Vulpian and Grancher give the injections — thirteen in ten days. The ' +
        'boy stays healthy. In October follows the shepherd boy Jean-Baptiste ' +
        'Jupille.',
    },
    {
      label: '1888–1900: the Institut Pasteur and antisepsis in Europe',
      hinweis:
        'From donations from all over the world the Institut Pasteur in Paris ' +
        'comes into being; on 14 November 1888 it is opened. In 1877 Lister ' +
        'goes to London as professor at King\'s College Hospital, where his ' +
        'method was disputed longest; in 1897 he becomes the first physician ' +
        'in Britain to be raised to the peerage. On the Continent the school ' +
        'of Robert Koch develops asepsis out of antisepsis: instead of ' +
        'killing the germs in the wound, one keeps them away with steam, heat ' +
        'and boiled instruments.',
    },
  ],

  perspektiven: [
    {
      id: 'pasteur',
      name: 'The Voice of the Laboratory',
      stimme: 'Opus',
      text: stimmeDesLabors,
    },
    {
      id: 'lister',
      name: 'The Voice of the Clinic',
      stimme: 'DeepSeek',
      text: stimmeDesLister,
    },
  ],

  synthese: [
    '## Where the Two Voices Meet',
    '',
    'First the common ground — and it is the core of this chapter: the',
    'laboratory and the clinic needed each other, even though they never',
    'met. Pasteur found the cause without seeing a patient; Lister saw',
    'the patients without knowing the cause. Both put observation above',
    'opinion: Pasteur trusts the experiment, Lister the numbers. Both',
    'name the same uncomfortable truths — the one the staging of',
    'Pouilly-le-Fort and the rabies vaccination of the child, the other',
    'his own resistance to asepsis and the late admission towards',
    'Semmelweis. And both know: the turn they brought about together',
    'stands on the shoulders of those who were laughed at before them.',
    '',
    '## Where They Diverge',
    '',
    'The contradiction begins with the question of what medicine is. For',
    'the laboratory it is a science: a question, an experiment, a',
    'proof — the truth comes from the lens. For the clinic it is an art',
    'at the bedside: the truth is of no use if it does not arrive, if',
    'the dressing is not changed, if the patient does not trust. Pasteur',
    'could have thought medicine without the patient; Lister could not.',
    'And they dispute the price: the laboratory sees the progress — the',
    'germ theory, the vaccines, the rescue of millions. The clinic also',
    'sees the costs: the people who were first tested on without asking;',
    'the poor who lay on the tables; the question of whether progress',
    'belongs to everyone or only to those who can pay for it.',
    '',
    '## What This Chapter Shows for the Whole Book',
    '',
    'For the twelfth time the same pattern — and now it becomes the',
    'climax: the way of thinking determines the method. With Pasteur and',
    'Lister the long rule of the ways of thinking of balance ends — the',
    'plumb line, the channels, the qi, the doshas, the humours. In their',
    'place steps the way of thinking of cause: the disease has a',
    'pathogen, the pathogen has a weak point, and medicine can find and',
    'hit it. This way of thinking has transformed the world — and it',
    'has, like all ways of thinking in this book, its price: it sees the',
    'germ, but it easily loses sight of the person; it measures success',
    'by the number, not by experience.',
    '',
    'And this chapter closes the arc that began with Semmelweis: the man',
    'from Vienna saw the truth without being able to prove it, and broke',
    'on it. Pasteur and Lister gave the same truth names and numbers —',
    'and became heroes. The medicine that now begins is more powerful',
    'than ever: it can find the cause, keep the wound clean, predict the',
    'disease. Whether with this power it also becomes wiser shows in the',
    'chapters that now come — X-rays and penicillin, nationalisation,',
    'the pharmaceutical industry, and the question of whom medicine',
    'belongs to.',
  ].join('\n'),

  urteil: {
    frage:
      'Would you entrust yourself to an agent that has never been tested ' +
      'on a human being — if the alternative is certain death? And would ' +
      'you make this decision for your child as well?',
    hinweis: [
      'There is no right and no wrong here. Take the situation of Joseph',
      'Meister\'s mother: fourteen deep bites, a disease that back then',
      'killed everyone, and a man in Paris who had tried it on dogs. Ask',
      'yourself two things. First: what would you need to know in order to',
      'consent — and who would have to tell you? Second: does your answer',
      'change when the danger is smaller? With certain death most people',
      'decide differently than with a risk of one in a thousand. Exactly',
      'in between lies the question that medicine must answer anew every',
      'time to this day.',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'What was Louis Pasteur occupied with when he came upon the ' +
        'germs?',
      antworten: [
        'Operations on the injured.',
        'Fermentation — spoiled wine, sour beer and diseased silkworms.',
        'The measurement of skulls.',
      ],
      richtig: 1,
      erklaerung:
        'Pasteur was a chemist, not a physician. In 1856 a distillery owner ' +
        'in Lille asked him for help because his beet alcohol was turning ' +
        'sour. Under the microscope Pasteur found yeast cells in the good ' +
        'vats and small rods in the spoiled ones. Out of that came the idea ' +
        'that transformed medicine: what fermentation is for wine, disease ' +
        'is for the human being.',
    },
    {
      frage:
        'What did the famous swan-neck flasks of 1864 show?',
      antworten: [
        'That in a boiled broth no life arises by itself, as long as the ' +
          'dust of the air does not get in.',
        'That air prevents putrefaction.',
        'That wine keeps longer in curved flasks.',
      ],
      richtig: 0,
      erklaerung:
        'The long, curved neck let air in but held the dust back in the ' +
        'curve: the boiled broth stayed clear for years. If one broke off ' +
        'the neck or let the broth touch the curve, it clouded within two ' +
        'days. That refuted the doctrine of spontaneous generation — and ' +
        'that was the precondition for germs being able to count as the ' +
        'cause of disease and not as its consequence.',
    },
    {
      frage:
        'What happened in May and June 1881 on the estate Pouilly-le-Fort ' +
        'near Melun?',
      antworten: [
        'Pasteur performed the first operation under anaesthesia.',
        'A public experiment: vaccinated and unvaccinated animals received ' +
          'anthrax pathogens — the vaccinated survived.',
        'The French government forbade the vaccination of livestock.',
      ],
      richtig: 1,
      erklaerung:
        'The veterinarian Hippolyte Rossignol, a doubter, set up the ' +
        'experiment: sixty animals, one half vaccinated, the other not, ' +
        'then a strong dose of anthrax pathogens for all. On 2 June the ' +
        'vaccinated animals stood, the unvaccinated were dead. The success ' +
        'was genuine — the laboratory notebooks show, however, that a ' +
        'different vaccine was used than the publicly announced one.',
    },
    {
      frage:
        'Why was it not Pasteur himself who gave the boy Joseph Meister ' +
        'the injections in 1885?',
      antworten: [
        'Because he could not hold his hand steady due to his stroke.',
        'Because he was a chemist and had no medical licence — the doctors ' +
          'Vulpian and Grancher treated.',
        'Because he feared infection.',
      ],
      richtig: 1,
      erklaerung:
        'Pasteur never studied medicine; injections of his own would have ' +
        'been punishable. He called in the doctors Alfred Vulpian and ' +
        'Jacques-Joseph Grancher, and Grancher gave the thirteen ' +
        'injections. The boy had been bitten fourteen times by a rabid dog ' +
        'two days earlier. The agent had been tried on about fifty dogs, ' +
        'never before on a human being.',
    },
    {
      frage:
        'Which question from an earlier chapter does the germ theory ' +
        'answer?',
      antworten: [
        'Why does the blood circulate in the body?',
        'Why did more maternity patients die in Vienna with the doctors ' +
          'than with the midwives?',
        'Why does cinchona bark work against malaria?',
      ],
      richtig: 1,
      erklaerung:
        'In 1847 Ignaz Semmelweis had found the measure — washing hands ' +
        'with chlorinated lime — and could not say what clings to the ' +
        'hands; he spoke of "decomposed organic particles". The germ ' +
        'theory supplied the missing cause: living pathogens. Joseph ' +
        'Lister drew from it from 1865 in Glasgow the conclusion for the ' +
        'operating table and lowered the mortality after amputations from ' +
        'about 45 to about 15 in a hundred.',
    },
  ],
};

module.exports = pasteurLister;
