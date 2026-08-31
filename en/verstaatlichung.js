// Chapter 15 — "The Nationalisation of Healthcare".
//
// The fifth chapter of the modern era and the first in which not a
// researcher but a law plays the leading role. Until 1883 there were two
// parties at the sickbed: the sick person and the one who treated him. On
// 15 June 1883 a third joins them — the state. It does not pay itself, but
// it prescribes that payment is made, by whom, how much and for what. The
// sick person becomes an insured person, the physician a panel doctor,
// treatment becomes an entitlement. Since then the question of whom health
// belongs to has been one of the great controversies of society.
//
// The WAY-OF-THINKING analysis is the centrepiece (operator requirement).
// Here it asks: Why the state at all? (Because industrialisation has torn
// the old networks apart — whoever falls ill in the mining colony has
// neither land, nor kin, nor guild, only the wage that stops coming; and
// because discontented masses threaten order.) Why insurance and not
// charity? (Because alms make people dependent and in Prussia even cost
// them the right to vote — insurance creates a legal claim one can sue
// for without having to beg.) Why the obligation? (Because voluntariness
// keeps the healthy away and thereby empties exactly the fund that is
// supposed to carry the sick.) And the flip side of each of these
// justifications: whoever pays has a say; whoever administers controls;
// whoever grants access excludes.
//
// LENGTH RULE (operator feedback 24.08.2026): From chapter 9 the reverse
// applies — complete and detailed. Detailed does not mean bloated: every
// paragraph advances the narrative. Measured in
// tests/karte-verstaatlichung.mjs.
//
// TONE rule: BOTH sides fairly. This first voice shows the blessing of
// the social legislation (access to the physician for all, sanitation as
// a task of the state, the falling mortality, the model for the world)
// AND names the uncomfortable places itself: the political intention
// beside the Anti-Socialist Law, the control and the bureaucracy, the
// patient with a number, the economic displacement of naturopathy — and
// what a later state did with the same tool.
//
// NO RUMOURS (operator decision 25.08.2026): Only what is documented. Two
// phrases that are gladly attributed to Bismarck stand in no protocol;
// the text says so explicitly and sets the documented sentences beside
// them.
//
// THE INNOVATION CYCLE (operator observation 26.08.2026, the common
// thread): An institution too is an invention. The welfare state has
// helped millions — and placed in the state's hand a tool that a later
// state turned against the people. The voice says so itself.
//
// Voices (round 14): The FIRST perspective — the state from within, the
// file of the Reich Chancellery — was written by Opus. The SECOND (the
// insured and the displaced: the workers with the insurance card, the new
// security and the new dependency; the lay healers, herb women and
// barber-surgeons whose livelihood the funds took away) and the final
// synthesis were added by Hermes in the second pass. Perspective
// workflow: CLAUDE.md.
//
// NO REPETITIONS (operator decision of 21.08.2026): Chapter 1 is
// organised by "who speaks here", chapter 2 begins with a scene, chapter
// 3 recounts a day's routine, chapter 4 is a correspondence, chapter 5
// the journey of a book, chapter 6 a tour, chapter 7 a trial, chapter 8
// an invoice, chapter 9 a clock, chapter 10 a chain, chapter 11 a lens,
// chapter 12 an interview. This chapter chooses the fourteenth
// dramaturgy: THE FILE. The state speaks the way it really speaks — in
// sheets, case files, paragraphs and marginal notes. The second voice can
// step into the same form: the other file, the insured person's file, in
// which the same matter looks different from below.
//
// The texts are stored as line arrays joined with `.join('\n')` — this
// keeps them readable in the repo at ~72 characters (the operator
// proofreads them here), and utils/markdown.js turns them back into
// flowing text in the app.
//
// CommonJS without UI imports (architecture rule): verifiable with plain
// `node`.

/**
 * The Voice of the State — the file of the Reich Chancellery.
 *
 * Written by Opus (round 14). A voice that speaks for the side that made
 * the laws: its situation, its reckoning, its intention. It tells why it
 * did what it did — and it names the uncomfortable places itself
 * (additional rule for sensitive topics in CLAUDE.md).
 */
const voiceOfTheState = [
  '## The file that lies in the Reich Chancellery',
  '',
  'A state does not think in stories. It thinks in case files. Whatever',
  'occupies it is given a number, an envelope and a sequence; whoever',
  'wants to know later why something happened opens the pages and reads',
  'from back to front.',
  '',
  'This chapter is such a file. It bears the title "The Social Question"',
  'and lies between 1871 and 1911 in the Reich Chancellery in Berlin. It',
  'contains reports from the mines, newspaper clippings, draft laws,',
  'minutes of sessions, contribution tables, complaints from physicians,',
  'petitions from associations — and a few slips of paper that do not',
  'really belong in it.',
  '',
  '**What you read here is the state\'s view of itself — a way of',
  'thinking, not a truth.** In these years the state took itself for the',
  'protector of the weak, and it had reasons for that. At the same time',
  'it took itself for the guardian of order and had reasons for that',
  'too. Both stand in the same file, often on the same sheet.',
  '',
  'Two sentences that are gladly put into the Reich Chancellor\'s mouth',
  'stand in no protocol: that social misery was the sharpest weapon of',
  'Social Democracy, and that the state must treat the worker in such a',
  'way that the worker loves it. They capture the gist of the matter,',
  'but they are not on the record. **Wherever something is merely handed',
  'down and cannot be documented, I say so.** The sentences that were',
  'really spoken stand further down, and they are plain enough.',
  '',
  '## Sheet 1: The findings — what the factory does to people',
  '',
  'The first sheet is not a law but a description. Without it the rest',
  'of the file makes no sense.',
  '',
  'After the founding of the Empire in 1871 the country grows faster',
  'than anyone can keep up with. The population rises from around',
  'forty-one million to sixty-five million in 1910. Above all, though,',
  'it moves: in 1871 a good third of the people live in cities, by 1910',
  'about two thirds. Berlin grows from around eight hundred and twenty',
  'thousand inhabitants to over one and a half million. Several hundred',
  'thousand come to the Ruhr region from East Prussia, Masuria, Posen',
  'and Silesia.',
  '',
  'These numbers are the real case file. **For a person who moves from',
  'the village to the mining colony loses not only his home. He loses',
  'his entire safety net at one stroke.**',
  '',
  'In the countryside the sick person was never alone. There was a plot',
  'of land that kept being worked; an extended family that stepped in; a',
  'pastor, a parish, a squire with a duty of some kind; a guild with its',
  'chest, from which the master\'s widow received something; herbal',
  'knowledge in the house and a woman healer in the village. That was',
  'neither just nor reliable — but it was there.',
  '',
  'In the tenement barracks none of it remains. On Berlin\'s Ackerstraße a',
  'house with six courtyards has stood since 1874, in which more than a',
  'thousand people live. Whoever has no money for it himself becomes a',
  '**bed lodger**: he rents not a flat, not a room, but a bed — and by',
  'the hour, because in the same bed the night shift has slept before',
  'him. The children die in the courtyards of diarrhoea, measles,',
  'diphtheria and tuberculosis. Around 1900 in the Empire roughly every',
  'fifth child dies in its first year of life.',
  '',
  'And whoever works, works dangerously. Underground a gallery',
  'collapses, in the foundry molten iron tips over, at the machine a',
  'belt tears. Until 1884 the man who has an accident has exactly one',
  'path: he sues the employer and must prove **fault** against him. A',
  'miner without a leg and without money, who is supposed to prove',
  'negligence in court against a mine owner — that is no legal path,',
  'that is a mockery.',
  '',
  'There remains the poor relief of the municipality. It exists, and it',
  'has a price that is hard to believe today: **whoever in Prussia',
  'received poor relief lost his right to vote.** He was put on file, he',
  'was inspected, he was listed as a recipient of alms. That is why',
  'people did not go there as long as they could still crawl.',
  '',
  '**Why the state at all?** Here is the answer, and it has two halves,',
  'both of which are true.',
  '',
  'The first half: **Because otherwise no one is left.**',
  'Industrialisation has not damaged the old networks, it has cut them',
  'through. Family, guild, village, landlord — everything that carried',
  'the sick person for centuries lies four hundred kilometres away. What',
  'remains are the wage and the rent. And the wage stops at the very',
  'moment the person needs it most urgently.',
  '',
  'The second half: **Because a discontented mass is dangerous.** I do',
  'not gloss over that. Millions of people with nothing to lose,',
  'crowded together in cities, literate, organised, angry — for any',
  'government that is a question of security, not of compassion.',
  'Whoever reads the file honestly finds both motives on the same sheet,',
  'and he will not be able to separate them cleanly.',
  '',
  '## Sheet 2: The whip — the Anti-Socialist Law of 21 October 1878',
  '',
  'The next sheet is the most unpleasant in the whole file, and in the',
  'stories about the welfare state it usually does not appear. But it',
  'belongs in this place, because it came first.',
  '',
  'In the year 1878 shots are fired at Kaiser Wilhelm I. twice: on',
  '11 May by a journeyman plumber named Max Hödel, on 2 June by a doctor',
  'of political economy named Karl Nobiling; the Kaiser is seriously',
  'wounded. **Neither of the two belonged to the Social Democratic',
  'Party** — Hödel had been expelled from it, Nobiling had never been a',
  'member. That is on the record, and it did not stop the government.',
  '',
  'On 21 October 1878 the Reichstag passes the "Law against the',
  'publicly dangerous aspirations of Social Democracy". Banned are',
  'associations, assemblies, newspapers, writings, collections. A state',
  'of siege is declared over individual places; around nine hundred',
  'people are expelled, well over a thousand sentenced to prison terms.',
  'The law is extended four times and expires only on 30 September 1890.',
  '',
  'One gap remained: **one was still allowed to stand for election.**',
  'Because the suffrage was not touched, Social Democratic deputies sat',
  'in the Reichstag throughout all twelve years. They were banned and',
  'elected at the same time.',
  '',
  'Why does this sheet lie in a file about healthcare? Because the',
  'social legislation cannot be understood without it. **The government',
  'did not first help and then ban. It first banned and then helped** —',
  'and it regarded both as a single course of action. Posterity calls it',
  'the carrot and the stick. The file calls it order and care. What is',
  'meant is the same thing.',
  '',
  '## Sheet 3: The carrot — the Imperial Message of 17 November 1881',
  '',
  'Three years after the ban the Reich Chancellor reads out in the',
  'Reichstag a message of the Kaiser. It is the founding text of the',
  'German welfare state, and its core sentence states the intention so',
  'openly that one does not have to interpret it. It reads that the',
  'healing of the social ills "**is not to be sought exclusively in the',
  'way of repression of Social Democratic excesses, but equally in that',
  'of the positive promotion of the welfare of the workers**".',
  '',
  'One should read that slowly. It does not say: we were wrong, the ban',
  'was a mistake. It says: the ban alone is not enough, we need the',
  'other thing as well. The message announces what is to come of it: an',
  'insurance against sickness, one against accidents, one for old age',
  'and invalidity.',
  '',
  'And three years later, on 9 May 1884, the Chancellor says in the',
  'Reichstag a sentence that needs even less interpretation: **"If there',
  'were no Social Democracy and if not a great many people feared it,',
  'the modest progress that we have made at all in social reform so far',
  'would not exist either."**',
  '',
  'His confidant Moritz Busch has recorded how he put it in a private',
  'conversation: his thought had been to win the working classes — or',
  'should he say: to bribe them — into seeing the state as a social',
  'institution that exists for their sake and wants to provide for their',
  'well-being. **This version is no speech but a record at second hand;',
  'it is marked as such.** It changes nothing about the findings.',
  '',
  'It would be convenient to conclude from it: so it was all mere',
  'calculation. The file does not yield that. A law that arises from',
  'calculation works no less because of it. The miner whose broken leg',
  'is set in 1886 at the expense of the fund has no benefit from knowing',
  'out of what motive the paragraph was written. **The question is not',
  'whether the intention was pure. The question is what the law has',
  'done.**',
  '',
  '## Sheet 4: The way of thinking — from alms to entitlement',
  '',
  'Now comes the sheet that matters. For the real innovation of 1883 is',
  'not the money. It is a different way of thinking about what help',
  'even is.',
  '',
  'Until then Europe knew two forms: **charity** and **self-help**.',
  'Charity was the alms — the endowed fund, the monastery gate, the',
  'hospital as a charitable foundation, the poor chest of the',
  'municipality. It helped irregularly, it helped according to the',
  'standing of the person, and it helped from above. Self-help was the',
  'chest, the fund, the brotherhood: the miners with their centuries-old',
  '**Knappschaften**, their miners\' brotherhoods; the journeymen with',
  'their guild chests; later the free relief funds of the workers\'',
  'associations. It helped more fairly, but it reached only as far as',
  'the group.',
  '',
  '**Why insurance and not charity?** Because charity makes the person',
  'a supplicant and insurance makes him an entitled person. That is the',
  'whole difference, and it is enormous.',
  '',
  'Whoever receives alms must ask for it, must appear worthy, must let',
  'himself be inspected — and in Prussia even forfeits his right to',
  'vote. Whoever is insured has a **legal entitlement**. He does not',
  'beg, he demands. He can complain, and he can sue. He does not have to',
  'be grateful. **Out of a grace becomes a right — and whoever has a',
  'right does not have to bow his head.** Precisely for that reason the',
  'state chose this model and not the topping-up of the poor chests,',
  'which would have been cheaper.',
  '',
  'The reckoning behind it is simple and ancient; the merchants of the',
  'Hanseatic League knew it for their ships. **Many pay little so that',
  'the individual receives much in misfortune.** Nobody knows in advance',
  'whom it will strike. If all pay, everyone can be carried. That is no',
  'redistribution from rich to poor — the contributions came out of the',
  'same slender wages. It is a redistribution **from the healthy to the',
  'sick and from the good years into the bad ones.** In essence the',
  'worker insures himself against his own future misfortune.',
  '',
  'And that leads to the formula that carries the whole way of',
  'thinking: **Health is neither a business nor a grace but a matter',
  'for the community.** Whether someone is treated is not to depend on',
  'how much he has in his pocket.',
  '',
  'This formula has a flip side, and I name it at once so that it does',
  'not sound like a reproach later: **Whoever pays has a say.** When the',
  'community bears the treatment, then the community gets a word on',
  'what is treated, by whom, for how long and at what price. This',
  'sentence stands in no paragraph in 1883. It is nonetheless contained',
  'in the law from the very beginning, just as the tree is contained in',
  'the kernel.',
  '',
  '## Sheet 5: The compulsion — why the obligation and not the',
  'voluntariness',
  '',
  'An objection came at once, and it came from the liberals: why',
  'coercion? Let the people decide for themselves whether they insure',
  'themselves. There are relief funds, there are associations, there',
  'are savings books. The state is not to reach into the wage purse.',
  '',
  'The answer stands in the experiences with precisely these free',
  'relief funds, and it is sober: **Voluntariness fails exactly where',
  'it is needed.**',
  '',
  'Whoever is young, strong and healthy does not join. He has other use',
  'for his pennies and feels invulnerable. Whoever is old, weak or',
  'chronically ill joins as soon as he can. Thus a voluntary fund',
  'collects exactly the people who cost much and loses those who could',
  'carry. It must raise the contributions, whereupon the remaining',
  'healthy leave, whereupon it must raise the contributions again. In',
  'the end stands an expensive fund for poor sick people — or none at',
  'all.',
  '',
  'Added to that is the change of workplace. The relief funds were tied',
  'to the enterprise, the place or the association; whoever moved on',
  'lost his accrued entitlement and started from the beginning. In a',
  'country in which millions moved, that was a design flaw.',
  '',
  'Hence the obligation. **The obligation is not the opposite of',
  'solidarity, it is its precondition** — a fund is solidary only if',
  'those who do not need it at the moment are in it too.',
  '',
  'And here too the flip side belongs on the same sheet: **Obligation',
  'means coercion.** From 1883 a part of the wage is no longer wage; it',
  'is withheld before the worker gets it into his hand, and others',
  'decide over its use. Whoever says that is paternalism is right in',
  'the matter — he only fails to say what the alternative was.',
  '',
  '## Sheet 6: The law of 15 June 1883 — what really stands in it',
  '',
  'Now the matter itself. On 15 June 1883 the Sickness Insurance Law is',
  'passed; on 1 December 1884 it comes into force. It is the first law',
  'of this kind in the world.',
  '',
  '**Who is insured?** Initially industrial workers in factories,',
  'mines, foundries, workshops and in construction, below an income',
  'limit. In 1885 that is around **4.3 million people** — about every',
  'tenth inhabitant of the Empire. Agricultural labourers, domestic',
  'servants, home workers and the wives remain outside for the time',
  'being. The extension to them takes thirty years.',
  '',
  '**Who pays?** The contribution amounts to up to three per cent of',
  'the local daily wage. Of that the **worker bears two thirds, the',
  'employer one third**. The worker thus pays around two per cent of his',
  'wage, the entrepreneur another half of that on top. That is no side',
  'detail but the reason why the economy did not storm louder — and the',
  'reason for what follows shortly.',
  '',
  '**What does one get?** Free medical treatment and the medicine from',
  'the first day. Sickness benefit from the third day at half the local',
  'daily wage, for up to thirteen weeks. In addition a death benefit and',
  'a support for women in childbed. **For a factory worker of 1884 the',
  'first point is the most incredible: the physician comes, and it costs',
  'him nothing.** Before, one fetched the physician when it was almost',
  'too late, because his visit cost half a week\'s wage.',
  '',
  '**Who administers?** Not the Empire. The funds remain',
  'self-governing: local sickness funds, works sickness funds, guild',
  'sickness funds, the miners\' old Knappschaft funds, registered relief',
  'funds. There are thousands of them, of varying size, of varying',
  'quality. And because the workers bear two thirds of the',
  'contributions, they provide two thirds of the representatives in the',
  'organs of the funds.',
  '',
  '**This one sentence spoiled the Chancellor\'s reckoning.** For where',
  'workers elect, administer and decide by majority, a public office',
  'arises for people whose party is just then banned. In the funds',
  'workers learn bookkeeping, chairing sessions, statutes and',
  'negotiations. They become fund chairmen, they hire staff, they draw',
  'up budgets. When the Anti-Socialist Law falls in 1890, a practised',
  'organisation stands ready. Social Democracy becomes in 1890 by votes',
  'the strongest party and in 1912 the strongest faction of the',
  'Reichstag. **The law that was to starve socialism out built it a',
  'school.**',
  '',
  '## Sheet 7: The two other laws — 1884 and 1889',
  '',
  'The file grows thicker. On 6 July 1884 follows the **Accident',
  'Insurance Law**, in force from October 1885. Its carriers are the',
  'employers\' liability associations of the branches of trade, and this',
  'time the employers pay **alone**. It takes over where the sickness',
  'benefit ends after thirteen weeks and pays pensions to the injured',
  'and the bereaved.',
  '',
  'Its most important innovation does not stand among the numbers. It',
  'reads: **no proof of fault any more.** It is irrelevant whether the',
  'foreman was negligent or the miner careless; what is compensated is',
  'the accident, not the guilt. In return the injured person loses the',
  'path of suing his employer. Both sides have given something up: the',
  'worker the lawsuit that he would almost never have won anyway; the',
  'employer the possibility of getting away with a good lawyer.',
  '',
  'And because the employers now pay for every accident, they get for',
  'the first time a tangible interest in none happening. The',
  'associations issue **accident prevention regulations** and employ',
  'technical supervisory officers. Thus something arises in passing',
  'that barely existed in medicine until then: **prevention that pays',
  'off.**',
  '',
  'On 22 June 1889 comes the law on **invalidity and old age',
  'insurance**, in force from 1891. Workers and employers each pay',
  'half, and the Empire adds fifty marks a year to every running',
  'pension. Two cases are covered: permanent incapacity for work — the',
  '**invalidity pension**, which applies at any age — and reaching the',
  '**seventieth year of life**.',
  '',
  'This seventy is mocked to this day, and the mockery has a true core:',
  'the average life expectancy at birth in the Empire of the 1880s lay',
  'at around thirty-five to thirty-eight years. **This number',
  'deceives, however**, because it is pulled down by infant mortality;',
  'whoever reached the twentieth year of life had good prospects of the',
  'sixtieth. But only a minority reached seventy. That was known to the',
  'authors, and it was calculated in. That is why the **invalidity',
  'pension** was in practice the more important part: it paid the',
  'used-up fifty-year-old whose back and lungs no longer did their',
  'service.',
  '',
  'Nobody became rich from it. The pensions lay at around one hundred',
  'and twenty to just under two hundred marks a year, while an',
  'industrial worker earned six to eight hundred marks a year. **That',
  'was a subsidy, not a livelihood** — meant as a supplement to what the',
  'family contributed.',
  '',
  'In practice the matter looked like this: every insured person',
  'received a **receipt card** into which a **contribution stamp** was',
  'stuck week for week. Whoever worked stuck stamps. Forty years of',
  'work became a pile of cards, and what came out at the end depended',
  'on these cards being complete. The phrase "sticking stamps" for a',
  'working life comes from here.',
  '',
  '## Sheet 8: What the Chancellor did not get',
  '',
  'In the stories it usually says that Bismarck made the welfare state.',
  'The file shows a man who lost three decisive confrontations.',
  '',
  '**First**, he wanted one great **Imperial Insurance Institution** —',
  'run by the state, from one hand. The Reichstag did not want that.',
  'Especially the Centre Party insisted that the smaller communities',
  'keep their tasks. What came out of it is **self-administration**:',
  'thousands of independent funds and employers\' liability',
  'associations under state supervision. That is why the German',
  'healthcare system is to this day so confusing — and why it has also',
  'never been entirely in one hand.',
  '',
  '**Second**, he wanted a substantial **Imperial subsidy**, financed',
  'among other things from a tobacco monopoly. The monopoly failed, the',
  'subsidy was struck from the accident insurance and remained limited',
  'to fifty marks per pension in the old age insurance. Two drafts for',
  'the accident insurance fell through in 1881 and 1882 before the',
  'third got through in 1884.',
  '',
  '**Third**, he wanted the consent of those it was about. The Social',
  'Democratic deputies voted against the Sickness Insurance Law. Their',
  'reasoning: too little, too narrow, and at bottom an alms meant to',
  'distract from the real question of the conditions. Only later did',
  'they recognise what self-administration offered them, and they',
  'seized it with both hands.',
  '',
  'I note that because it destroys the convenient story: **The welfare',
  'state is not the design of a chancellor but the result of a',
  'struggle in which nobody got entirely what he wanted.** Precisely',
  'for that reason it has held.',
  '',
  '## Sheet 9: The effects — what became of the numbers',
  '',
  '**What endures.** First the number that carries everything else:',
  'from 4.3 million insured in 1885 there become by 1914 around',
  '**sixteen million**. In 1911 the **Imperial Insurance Code** of',
  '19 July combines all three branches in one law book; in the same',
  'year the salaried employees\' insurance is added, and agricultural',
  'labourers and domestic servants are included. Out of a law for',
  'factory workers has become a system for a people.',
  '',
  'Then life expectancy. For the years 1871 to 1881 the statistics show',
  'at birth around 35.6 years for men and 38.5 for women. For 1901 to',
  '1910 it is 44.8 and 48.3 years. For the middle of the 1920s 56.0 and',
  '58.8. **In a good fifty years a German life gains on average twenty',
  'years.**',
  '',
  '**These twenty years do not belong to the panel medicine alone — the',
  'greater part belongs to the water.** That is important and will be',
  'needed again in this book. The decline of the great infectious',
  'diseases has above all to do with sewers, clean drinking water,',
  'better housing and better nutrition, not with medicines. Munich',
  'built sewerage and water supply under Max von Pettenkofer already in',
  'the 1860s; Berlin began in 1873 according to the plans of James',
  'Hobrecht, pushed through by the city councillor and pathologist',
  'Rudolf Virchow.',
  '',
  'The proof came in 1892 in **Hamburg**. The city took its drinking',
  'water unfiltered from the Elbe; the immediately adjoining **Altona**',
  'ran its through sand filters. When the cholera came, around 8,600',
  'people died in Hamburg while Altona almost escaped. On individual',
  'streets the city boundary ran right through the row of houses: the',
  'same people, the same air, the same work — two waterworks, two',
  'results. Robert Koch came and pressed for filtration.',
  '',
  '**After that the question was decided.** Water, sewage and defence',
  'against epidemics were no longer a matter of good will but a matter',
  'for the authorities; in 1900 an Imperial law regulated the fight',
  'against publicly dangerous diseases. Added to that came housing',
  'inspection, factory inspection, school physicians, infant care and',
  'milk kitchens. **The nationalisation of healthcare was not in the',
  'first place a nationalisation of the physicians. It was a',
  'nationalisation of the conditions under which people live.**',
  '',
  'And finally the effect outward: Austria followed in 1887 and 1888,',
  'Hungary in 1891, others followed. In 1908 the British Chancellor of',
  'the Exchequer David Lloyd George travelled to Germany to look at the',
  'system; in 1911 the United Kingdom passed its National Insurance',
  'Act. **From here the idea that a state has to stand up for the',
  'health of its citizens conquered the world.**',
  '',
  '## Sheet 10: The price — the sick person gets a number',
  '',
  '**What has harmed.** Now the sheets that an authority does not like',
  'to produce. They belong here, because they are no operational',
  'accident but the logical continuation of the same way of thinking.',
  '',
  '**First: whoever pays, controls.** A fund that pays out sickness',
  'benefit wants to know whether someone really is sick. So it employs',
  '**sickness inspectors** who appear unannounced at the dwelling and',
  'check whether the sick person lies in bed. Out of the sufferer',
  'becomes a possible malingerer. That was expressly provided for in',
  'the fund regulations, and it has durably shaped the tone between the',
  'insured person and the fund.',
  '',
  '**Second: out of the sick person becomes a case.** Everyone gets a',
  'membership number, a card, a sickness certificate. Treatment no',
  'longer happens because a person suffers but because a benefit',
  'condition is fulfilled. That is the price of the legal entitlement,',
  'and it is unavoidable: **an entitlement must be verifiable,',
  'otherwise it is none. But verifiable is only what can be written',
  'into forms.** What cannot be written into forms — exhaustion, grief,',
  'a life that no longer carries — disappears out of the file without',
  'disappearing out of the world.',
  '',
  '**Third: the physician gets a contracting partner.** Before 1883 the',
  'physician had a patient who paid him. After that he has a fund that',
  'pays him and a patient whom the fund sends. The funds concluded',
  'contracts with individual physicians, set the fees and decided who',
  'was admitted and who not. The medical profession defended itself: in',
  '1900 the association was founded in Leipzig that later was called',
  'Hartmannbund; there were boycotts and strikes until the **Berlin',
  'Agreement** of 1913 averted an Empire-wide physicians\' strike — with',
  'a fixed ratio of one panel doctor per 1,350 insured and joint',
  'committees. **Since that day in Germany associations negotiate about',
  'what a sick person is worth. At the negotiating table he himself',
  'does not sit.**',
  '',
  '**Fourth: the administration grows by itself.** Every rule produces',
  'a dispute, every dispute a new rule. Out of the law of 1883 with its',
  'manageable paragraphs became in 1911 a law book with over eighteen',
  'hundred. That is no German misfortune but the nature of the matter:',
  '**a system that wants to be just must distinguish. Whoever',
  'distinguishes needs rules. Whoever has rules needs officials.**',
  '',
  '## Sheet 11: The other price — the freedom to practise healing and',
  'the funds',
  '',
  'A sheet of its own, because it concerns the side that appears least',
  'in the file of the state: the healers without a licence.',
  '',
  'First a fact that most find surprising: **The Empire did not forbid',
  'healing, it set it free.** The Trade Regulation of 1869 brought the',
  '**freedom to practise healing** — the practice of the healing art',
  'was allowed to everyone. Protected was only the designation',
  '"physician". The thought behind it was a liberal one: healing is a',
  'trade like any other, and the mature citizen chooses himself whom he',
  'entrusts himself to.',
  '',
  'The healers were thus not displaced by a prohibition. **They were',
  'displaced by the money.** From 1883 the fund paid the admitted',
  'physician — and only him. Whoever went to the herb woman, to the',
  'barber-surgeon, to the magnetiser, to the naturopath continued to',
  'pay out of his own pocket, although he had paid his contribution',
  'every week. For a worker\'s household that decided it. **It was not',
  'the paragraph that pushed the old healing art out of the everyday',
  'life of ordinary people, but the sickness certificate.**',
  '',
  'The medical associations wanted more. From 1900 they demanded in',
  'several attempts a law against "quackery". The drafts failed in the',
  'Reichstag — also because the naturopathy movement had organised',
  'itself: hundreds of associations for the natural way of life and',
  'healing with far over a hundred thousand members, with journals,',
  'baths and deputies who listened to them. **The freedom to practise',
  'healing was defended in the Empire, and it was defended from',
  'below.**',
  '',
  'How successful the other side was is shown by the place that lies on',
  'the map of this chapter far in the south. In **Bad Wörishofen** a',
  'Catholic priest named **Sebastian Kneipp** treated with cold water,',
  'herbs, exercise and a regulated way of life. His book "My Water',
  'Cure" of 1886 was translated into many languages; in the 1890s tens',
  'of thousands of cure guests came every year to the Swabian village,',
  'and in 1894 the Pope received him. He had no licence. He was',
  'completely within his rights according to the law of 1869. And no',
  'fund has ever paid for any of his applications. Chapter 10 tells his',
  'story.',
  '',
  'How it went on belongs here for the sake of completeness, even',
  'though it reaches beyond the time of this file: the freedom to',
  'practise healing ended in **1939** with the Heilpraktiker Law, the',
  'law on non-medical practitioners. From then on a state permission',
  'was needed, and according to the will of the then government no new',
  'ones were to be granted — the profession was to die out. After 1945',
  'this block did not stand before the Basic Law; since then the',
  'permission is granted again. **Precisely a law that was to end the',
  'profession has become the foundation of its existence.**',
  '',
  '## Sheet 12: The tool in foreign hands',
  '',
  'And now the sheet on which the state looks worst — it belongs in',
  'this file because it follows from the same way of thinking.',
  '',
  'This book has told since chapter 11 again and again the same',
  'pattern: **The new often harms first before it becomes a blessing.**',
  'Surgery killed through wound fever before it saved. The rays burned',
  'their pioneers before radiology came of it. The penicillin saved',
  'millions and produced the resistance of the germs.',
  '',
  'With an institution this pattern looks different, but it is the',
  'same. **A tool does not ask who takes it in hand.** Whoever declares',
  'health a matter for the community creates for it offices, reporting',
  'paths, registers, statistics and the habit that an authority has a',
  'say over the body. As long as this tool lies in the hand of an order',
  'that wants to help the individual, it helps the individual.',
  '',
  'Fifty years after 1883 it lay in other hands. A law of 1933 ordered',
  'the sterilisation of people whom one held to be hereditarily ill;',
  'until 1945 around four hundred thousand people were forcibly',
  'sterilised. Out of the "public health" that in 1911 at an exhibition',
  'in Dresden had still meant tooth brushing and infant care became the',
  'question of which life is of use to the community. **The thought',
  'that health does not belong only to the individual can produce the',
  'best and the worst.** Chapters 16 and 17 will take up the topic',
  'again.',
  '',
  'I do not write that as an accusation against the laws of 1883, 1884',
  'and 1889 — they neither intended nor caused that. I write it as what',
  'should stand in the file behind every office created: **A tool is as',
  'good as the hand that holds it, and the hand changes.**',
  '',
  '## The slip that does not belong in the file — the Chancellor and',
  'his physician',
  '',
  'In the end a sheet that is really a private matter and that',
  'nevertheless says more about this chapter than most paragraphs.',
  '',
  'The man who set the panel medicine in motion was himself a',
  'seriously ill man: sleepless, choleric, suffering on stomach and',
  'nerves, heavily overweight, a prodigious eater and drinker. The',
  'leading physicians of Berlin had treated him without it getting',
  'better.',
  '',
  'In 1883 — the year of the Sickness Insurance Law — **Ernst',
  'Schweninger** took him over, a physician whom the Berlin faculty',
  'held for an outsider and to whom it gave the chair only under',
  'pressure from above. Schweninger prescribed hardly any medicine. He',
  'prescribed **order**: measure in eating and drinking, regular sleep,',
  'exercise, compresses, a strict regimen and the condition that the',
  'patient submits. The Chancellor lost around thirty kilograms and',
  'became a different person. He died in 1898 at eighty-three.',
  '',
  'That fits the place to which he travelled again and again over',
  'decades: **Bad Kissingen**, healing springs, drinking cure, baths,',
  'walks, a regulated day. Precisely what stands in the early chapters',
  'of this book under dietetics and the order of life, from Hippocrates',
  'to the monastery gardens.',
  '',
  '**The originator of the panel medicine was healed by something that',
  'no fund would have paid.** I leave this slip lying uncommented in',
  'the file. It refutes no law. But it shows that the boundary that ran',
  'from 1883 through the healing art was no boundary between effective',
  'and ineffective but one between billable and non-billable. Whoever',
  'could afford it has never heeded it.',
  '',
  '## Afterword: what this file does not contain',
  '',
  'A file is a standpoint in paper form. It contains what the authority',
  'had to know, and it does not contain what was never reported to the',
  'authority.',
  '',
  '**What remains open** is therefore not little. In these sheets there',
  'stands not how it feels to fetch a physician for the first time',
  'without first counting the household money — and how it feels to be',
  'asked for the number before anyone asks for the name. Here stands',
  'not what a herb woman in a village thought when the people stopped',
  'coming because the sickness certificate was only valid at the',
  'doctor\'s. Here stands not how a miner judged that his contribution',
  'paid for his treatment, but not for the treatment he wanted.',
  '',
  '**The second voice of this chapter belongs to the insured and the',
  'displaced** — the workers who became panel patients overnight and',
  'the healers from whom the same innovation took away the foundation.',
  'It will open the other file: the insured person\'s file, in which the',
  'same matter looks different from below. It will tell of the new',
  'security and of the new dependency; of the receipt card, the stamps',
  'and the inspector at the door; of the barber-surgeons, the herb',
  'women and the naturopaths who had treated for centuries and were',
  'now no longer paid.',
  '',
  'And it will ask the question that this file cannot answer, because',
  'an authority can hardly doubt its own competence: **Whom does health',
  'belong to — the state, the market, or the person who has it?**',
  '',
  'The state gave its answer in 1883, and it was no mistake: whoever is',
  'sick is to be treated, whether he can pay or not. Millions of people',
  'owe this answer their lives. Paid for it was with a piece of',
  'self-determination, with an administration that never again became',
  'smaller, and with the disappearance from the everyday life of',
  'ordinary people of everything that could not be billed.',
  '',
  '**Both together are the truth of this chapter. Which half weighs',
  'heavier, the file does not decide. That you decide.**',
].join('\n');

/**
 * The Insured and the Displaced — the other file. What the file in the
 * Reich Chancellery does not contain: the worker with the insurance
 * card, the new security and the new dependency, the freedom to practise
 * healing and the displacement of naturopathy.
 *
 * Written by DeepSeek (round 14, second pass). This voice too names the
 * uncomfortable places of its own side itself (additional rule for
 * sensitive topics).
 */
const voiceOfTheInsured = [
  '## The other file: an insured person',
  '',
  'The file in the Reich Chancellery tells the story from above: the',
  'findings, the whip, the carrot, the laws. Now we lay the other file',
  'beside it — that of a man who was never asked whether he wants to',
  'enter history. His name stands in no history book, but his number',
  'stands in the registers: he is the first year of the insured whom',
  'the state has invented.',
  '',
  '## Sheet 1: The findings — the factory from within',
  '',
  'The man works in a factory on the Ruhr, twelve hours a day, six days',
  'a week. If he falls ill, he loses the wage; if he is ill for a long',
  'time, he loses the work; if he loses the work, the family moves into',
  'the poorhouse, in which men and women live separated and the children',
  'go into the institution. That is the social question of which the',
  'file speaks — except that for him it is no concept but the everyday.',
  'His father died impoverished without ever having seen a physician.',
  'He himself has never yet seen one from within.',
  '',
  '## Sheet 2: The insurance card — what changed',
  '',
  'In 1884 he gets a card. On it stand his number, his name, the',
  'contribution: two per cent of the wage, the employer pays half. And',
  'with the card comes something that has never existed for people of',
  'his kind: the right. If he falls ill, he gets sickness benefit; if',
  'he goes to the physician, the physician is paid — by the fund, not',
  'out of his own pocket, which is empty. For the first time in the',
  'history of his class medicine is not a gift of the rich but an',
  'entitlement. Infant mortality falls, life expectancy rises, the',
  'epidemics yield — not alone because of the fund, but also because of',
  'it. Whoever does not acknowledge that has not read the file.',
  '',
  '## Sheet 3: The price — the patient with a number',
  '',
  'But now the other side of the card, for this voice too is honest.',
  'With the entitlement came the administration. The sick person became',
  'an insured person: a case, a number, a tariff. The physician, until',
  'then a free lord over his art, became a panel doctor — bound to the',
  'fee schedule, to the funds, to the control. Whoever was treated was',
  'examined: whether the illness was "genuine" was decided no longer by',
  'the sick person with his own body but by the fund\'s trust physician',
  'with his stamp. The person who went to the physician to be heard',
  'first heard the question about his number. The security had a price,',
  'and the price was a piece of freedom.',
  '',
  '## Sheet 4: The displaced — the freedom to practise healing',
  '',
  'And then the second reckoning: the freedom that was not administered',
  'but abolished. Germany had had a centuries-old freedom to practise',
  'healing: everyone was allowed to heal, whoever could — the',
  'barber-surgeon, the herb woman, the nature healer, the pastor with',
  'the herb book. The people in the country went to the one they',
  'trusted, not to the one with the title. With the nationalisation',
  'came the campaign against "quackery": the funds paid only licensed',
  'physicians; the others were declared forbidden, persecuted, pushed',
  'to the margin. Some of it was justified — there were charlatans who',
  'made money with miracle cures. But the campaign also hit the',
  'traditions that this book has honoured in the first chapters: the',
  'herbal knowledge, the naturopathy, the art of the midwives.',
  'Sebastian Kneipp, the pastor from Wörishofen, was fought by the',
  'medical profession and loved by the people — the funds did not know',
  'him. The medicine became state-run, and what was not state-run',
  'became suspect.',
  '',
  '## Sheet 5: What the file does not contain',
  '',
  'The file also does not contain the voices of those who never even',
  'got in. The women who had no claim of their own; the children whose',
  'card was tied to the father; the agricultural labourers who often',
  'stayed outside; the unemployed who with the work also lost the fund.',
  'The welfare state invented here was an insurance of the workers —',
  'not of the poor. The gap between entitlement and reality belongs to',
  'the truth of this file, and whoever keeps silent about it tells only',
  'half the story.',
  '',
  '## Answer to the state',
  '',
  'The file in the Reich Chancellery ends with the question of what',
  'became of the work that the state had not dreamt of. The answer of',
  'this other file: it became the greatest gift — and the greatest',
  'administration — that medicine has ever received. The worker got the',
  'physician he would never have had; and he lost the freedom to choose',
  'himself who heals him. The state made health a civic duty — and the',
  'citizen an insured person. The question that both files leave behind',
  'together is the question of the whole book: Whom does health belong',
  'to? To the one who lives it? To the one who heals it? To the one who',
  'pays it? Or to the one who administers it? This book seeks the',
  'answer to the last page.',
].join('\n');

/** Chapter 15 of the topic map. */
const verstaatlichung = {
  id: 'verstaatlichung',
  titel: 'The Nationalisation of Healthcare',
  epoche: '~1883 ff.',

  aufhaenger: {
    frage:
      'Whom does the sick person belong to — the physician, the state or ' +
      'himself?',
    text: [
      'Until 1883 there were two parties at the sickbed. The sick person who',
      'paid, and the one who treated. Whoever could not pay went to the herb',
      'woman, to the barber-surgeon, to poor relief — or he remained without',
      'help. In Prussia the alms of the municipality even cost the right to',
      'vote.',
      '',
      'Then a third party joined. On 15 June 1883 the Reichstag passed the',
      'Sickness Insurance Law; in 1884 followed the accident insurance, in',
      '1889 the pension insurance. The state did not treat anyone itself —',
      'it prescribed that payment is made, by whom, how much and for what.',
      'It was the first law of this kind in the world, and almost all',
      'industrial countries have copied it.',
      '',
      'What became of it is both: the physician for everyone, whether',
      'someone has money or not — the sewers, the clean water, the defence',
      'against epidemics, twenty gained years of life in two generations.',
      'And: the number instead of the name, the inspector at the dwelling',
      'door, the physician as contracting partner of a fund, a law book with',
      'eighteen hundred paragraphs — and a healing art that nobody forbade',
      'but that nobody paid any more.',
      '',
      'This chapter reads the file from both sides. For the question of whom',
      'health belongs to has not fallen silent since 1883: just and',
      'bureaucratic, saving and paternalistic, there for everyone and in the',
      'end yet for no one entirely.',
    ].join('\n'),
  },

  perspektiven: [
    {
      id: 'staat',
      name: 'The Voice of the State',
      stimme: 'Opus',
      text: voiceOfTheState,
    },
    {
      id: 'versicherte',
      name: 'The Insured and the Displaced',
      stimme: 'DeepSeek',
      text: voiceOfTheInsured,
    },
  ],

  synthese: [
    '## Where the two files meet',
    '',
    'First the common ground — and it is the core of the chapter: Both',
    'files tell the same story from two sides. The state and the insured',
    'person agree that the fund was a gift — access to medicine for all,',
    'the sickness benefit, the falling mortality; the one file calls it',
    'the entitlement, the other the right. Both name the same price: the',
    'control, the number, the administration — the state calls it the',
    'bureaucracy, the insured person calls it the freedom. And both know',
    'of the displaced: the Chancellor\'s file admits that the funds have',
    'displaced the old healing art; the other file tells what that meant',
    'for the herb women and the Kneipp associations. Whoever reads only',
    'one file reads half the story.',
    '',
    '## Where they part',
    '',
    'The contradiction begins with the question of what the state really',
    'wanted. For the Chancellor\'s file the insurance is a work of care:',
    'the state that protects its workers because it needs them — the whip',
    'and the carrot belong to the same hand. For the insured person\'s',
    'file the care is also a rein: whoever administers health',
    'administers the person; whoever abolishes the freedom to practise',
    'healing abolishes self-determination. They do not quarrel about the',
    'numbers — those are good — but about the intention and about the',
    'price of security. And they quarrel about the future: the state sees',
    'the order that grows; the insured person sees the disenfranchisement',
    'that grows. Both have a piece of right — and precisely that leaves',
    'the question of whom health belongs to unsolved to this day.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'For the fourteenth time the same pattern — and now it turns toward',
    'the present: the way of thinking determines the method. With the',
    'nationalisation a new way of thinking enters medicine: health as a',
    'civic right, administered by the state. This way of thinking has',
    'opened medicine for all — and it has made medicine an institution,',
    'with tariffs, funds and control. The physician who was free in the',
    'early chapters is today a cog; the patient who once chose is today',
    'an insured person.',
    '',
    'And this chapter asks the question that will accompany the book to',
    'the end: Whom does health belong to? The state has made it a civic',
    'duty — and thereby prepared the ground for the next chapter: the',
    'pharmaceutical industry that makes its business out of the same',
    'insurance. Whoever administers the fund also administers the market;',
    'whoever administers the market decides what is paid — and what is',
    'not. The question of the next chapters reads: Who profits from the',
    'sick society — and who pays the price?',
  ].join('\n'),

  urteil: {
    frage:
      'Whom does your health belong to — you, your physician, your fund ' +
      'or the state? And who is to decide when it becomes expensive?',
    hinweis: [
      'There is here no right and no wrong. Take the two halves of this',
      'chapter to heart. The one: since 1883 a sick person is treated,',
      'whether he can pay or not — that is a legal entitlement, no alms,',
      'and millions of people owe it their lives. The other: whoever pays',
      'has a say, and what is paid for has prevailed. Ask yourself three',
      'things. First: would you yourself pay in voluntarily when you are',
      'young and healthy — and what follows from your answer for the',
      'obligation? Second: who is to decide which treatment is paid for —',
      'the medical profession, the fund, the politicians or you? Third:',
      'what changes in your answer if the treatment that helps you is not',
      'on the list? Precisely between these questions lies the dispute',
      'that has not been decided in a hundred and forty years.',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Which three social laws did the German Empire create between 1883 ' +
        'and 1889?',
      antworten: [
        'Sickness, accident and pension insurance (1883, 1884, 1889).',
        'Sickness, unemployment and long-term care insurance.',
        'Accident, fire and life insurance.',
      ],
      richtig: 0,
      erklaerung:
        'On 15 June 1883 came the Sickness Insurance Law (in force from ' +
        'December 1884), on 6 July 1884 the accident insurance and on ' +
        '22 June 1889 the invalidity and old age insurance. The ' +
        'unemployment insurance followed only in 1927, the long-term care ' +
        'insurance in 1995.',
    },
    {
      frage:
        'How was the contribution to the sickness insurance of 1883 divided ' +
        'between worker and employer?',
      antworten: [
        'The employer paid everything alone.',
        'Both paid exactly half.',
        'The worker paid two thirds, the employer one third.',
      ],
      richtig: 2,
      erklaerung:
        'The contribution amounted to up to three per cent of the local ' +
        'daily wage; of that the worker bore two thirds. Because the seats ' +
        'in the organs of the funds followed the shares of the ' +
        'contributions, the workers provided two thirds of the ' +
        'representatives there — and the funds became for them a school of ' +
        'self-administration. The accident insurance of 1884, by contrast, ' +
        'was paid by the employers alone.',
    },
    {
      frage:
        'In what relation did the social laws stand to the Anti-Socialist ' +
        'Law of 1878?',
      antworten: [
        'The social laws repealed the Anti-Socialist Law.',
        'They ran side by side: the ban on Social Democracy applied from ' +
          '1878 to 1890, the social laws were added from 1883.',
        'Both were passed on the same day.',
      ],
      richtig: 1,
      erklaerung:
        'The "Law against the publicly dangerous aspirations of Social ' +
        'Democracy" of 21 October 1878 banned the associations, ' +
        'assemblies and newspapers of the party; it was extended four ' +
        'times and expired only in 1890. The Imperial Message of ' +
        '17 November 1881 announced the social laws expressly as a ' +
        'supplement to the repression. Standing for election remained ' +
        'allowed, which is why Social Democratic deputies sat in the ' +
        'Reichstag the whole time.',
    },
    {
      frage:
        'What did the "freedom to practise healing" of the Trade Regulation ' +
        'of 1869 mean?',
      antworten: [
        'Cures in health spas were free of charge for everyone.',
        'Only licensed physicians were allowed to treat the sick.',
        'Healing was allowed to everyone; protected was only the ' +
          'designation "physician".',
      ],
      richtig: 2,
      erklaerung:
        'The practice of the healing art was a free trade. ' +
        'Barber-surgeons, herb women and naturopaths were displaced not by ' +
        'a prohibition but by the funds: these paid from 1883 only ' +
        'admitted physicians. Several attempts at a law against ' +
        '"quackery" failed in the Reichstag after 1900. Only the ' +
        'Heilpraktiker Law of 1939 ended the freedom to practise healing.',
    },
    {
      frage:
        'What did the comparison of Hamburg and Altona show during the ' +
        'cholera of 1892?',
      antworten: [
        'That the disease spread only in port cities.',
        'That the city with filtered drinking water almost escaped, while ' +
          'the neighbouring city with unfiltered Elbe water had around ' +
          '8,600 dead.',
        'That vaccinations ended the epidemic.',
      ],
      richtig: 1,
      erklaerung:
        'Hamburg took its drinking water unfiltered from the Elbe, the ' +
        'adjoining Altona ran its through sand filters. On some streets ' +
        'the city boundary ran right through the row of houses — the same ' +
        'people, two waterworks, two results. Robert Koch pressed for ' +
        'filtration. After that it was decided that water, sewage and the ' +
        'defence against epidemics are a matter for the authorities; in ' +
        '1900 an Imperial law followed.',
    },
  ],

  // The map lives in utils/themen/karten/verstaatlichung.js — here only the
  // phase hints are translated (phasen → karteHinweise), not the map itself.
  karteHinweise: [
    {
      label: '1871–1878: the Empire, industry and the social question',
      hinweis:
        'After the founding of the Empire in 1871 the industrial cities ' +
        'grow faster than anyone can build them. In the Ruhr region, in ' +
        'Upper Silesia and in Saxony hundreds of thousands move from the ' +
        'land to the mines and looms. In Berlin the tenement barracks with ' +
        'their courtyards arise; so-called bed lodgers rent a bed by the ' +
        'hour. Whoever falls ill loses the wage: there is no entitlement ' +
        'to help, only the poor relief of the municipality — and that cost ' +
        'the right to vote in Prussia. After two assassination attempts on ' +
        'Kaiser Wilhelm I. the Anti-Socialist Law of 21 October 1878 bans ' +
        'the organisations, assemblies and newspapers of Social Democracy.',
    },
    {
      label: '1881–1889: the three social laws — Berlin',
      hinweis:
        'On 17 November 1881 Bismarck reads out in the Reichstag the ' +
        'Imperial Message: the healing of the social ills was to be sought ' +
        'not alone through the suppression of Social Democratic excesses ' +
        'but equally through the promotion of the welfare of the workers. ' +
        'Three laws follow: the Sickness Insurance Law of 15 June 1883 (in ' +
        'force on 1 December 1884; the workers bear two thirds of the ' +
        'contribution, the employers one third), the Accident Insurance ' +
        'Law of 6 July 1884 (borne by the employers alone) and the law on ' +
        'invalidity and old age insurance of 22 June 1889 (old age pension ' +
        'from seventy, in force from 1891). With that the German Empire is ' +
        'the first country in the world with a statutory compulsory ' +
        'insurance.',
    },
    {
      label: '1892–1900: the epidemic as a task of the state — Hamburg and ' +
        'the cholera',
      hinweis:
        'In August 1892 cholera breaks out in Hamburg; around 8,600 people ' +
        'die. The city takes its drinking water unfiltered from the Elbe. ' +
        'The immediately neighbouring Altona, which leads its water ' +
        'through sand filters, almost escapes — the same streets, two ' +
        'waterworks, two results. Robert Koch investigates on the spot and ' +
        'presses for filtration and state supervision. Munich had under ' +
        'Max von Pettenkofer already built sewerage and water supply in ' +
        'the 1860s, Berlin from 1873. In 1900 an Imperial law regulates ' +
        'the fight against publicly dangerous diseases. Sanitation is now ' +
        'a matter for the authorities, not of good will.',
    },
    {
      label: '1900–1910: the dispute over "quackery" and the spa towns',
      hinweis:
        'The Trade Regulation of 1869 had brought the freedom to practise ' +
        'healing: whoever wanted to heal was allowed to heal; protected ' +
        'was only the title of physician. After 1883, however, the funds ' +
        'pay only for admitted physicians — whoever treats differently is ' +
        'not forbidden but not paid. From 1900 the medical associations ' +
        'demand in several attempts a law against quackery. The drafts ' +
        'fail in the Reichstag, also because the naturopathy movement with ' +
        'hundreds of associations and over a hundred thousand members ' +
        'opposes them. In Bad Wörishofen the pastor Sebastian Kneipp ' +
        'treats until his death in 1897 tens of thousands of cure guests a ' +
        'year; in Bad Kissingen the Chancellor takes the cure himself.',
    },
    {
      label: '1911–1914: the Imperial Insurance Code standardises the ' +
        'system',
      hinweis:
        'On 19 July 1911 the Imperial Insurance Code combines the three ' +
        'branches in a single law book; in the same year the salaried ' +
        'employees\' insurance is added, and agricultural labourers and ' +
        'domestic servants are included. From 4.3 million insured in 1885 ' +
        'there have become by 1914 around 16 million. In 1911 the ' +
        'International Hygiene Exhibition in Dresden shows the population ' +
        'its own body as a matter of public health; out of it becomes in ' +
        '1912 the German Hygiene Museum. In the same decade the panel ' +
        'doctors quarrel about fees and admission — the Berlin Agreement ' +
        'of 1913 averts an Empire-wide physicians\' strike.',
    },
  ],
};

module.exports = verstaatlichung;


