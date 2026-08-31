// Chapter 8 — "Harvey and the Circulation of the Blood".
//
// The station where calculation moves into medicine. For fifteen hundred
// years it held: blood is made in the liver, flows through the veins into
// the body and is used up there. An English physician puts to this doctrine
// a question that no one before him had asked — not "is it true?", but
// "how much?". The answer is a quantity that no one can produce and no one
// can consume. So the same blood must keep coming round: it circulates.
//
// The WAY-OF-THINKING analysis is the heart of the chapter (operator
// requirement). It asks here: why calculate, where previously one quoted?
// Why look at the living animal and not the dead one? Why the heart as a
// pump and not as a furnace? And why does a demonstration on one's own arm
// convince more people than any lecture? To this the honest balance sheet
// in both directions: what endures (the circulation, the method), what
// remained error (the lung as cooling, the missing capillaries) and what
// had no consequence (the insight first helped a patient two hundred years
// later). The voice names it herself (additional rule for sensitive topics
// in CLAUDE.md).
//
// LENGTH RULE (operator feedback 24.08.2026): Chapters 1–8 stay short and
// dense — each perspective at most ~250 lines, the chapter in total at most
// ~600 lines. This is the LAST of the early chapters; from chapter 9 (the
// cruel beginnings of modern surgery) the rule is reversed. The line count
// is measured in tests/karte-harvey.mjs.
//
// Voices (round 9): The FIRST perspective — Harvey from within, the
// physician who calculated — was written by Opus. The SECOND (the tradition:
// the Galenic doctrine that had held for fifteen hundred years, its
// resistance and the question of why a false doctrine survives so long) and
// the final synthesis were added by Hermes in the second pass.
// Perspective workflow: CLAUDE.md.
//
// NO REPETITIONS (operator decision 21.08.2026): Chapter 1 is organised by
// "who speaks here → …", chapter 2 begins with a scene, chapter 3 tells a
// day's course, chapter 4 is an exchange of letters, chapter 5 the journey
// of a book, chapter 6 a tour through the monastery, chapter 7 a trial.
// This chapter chooses the eighth dramaturgy: a CALCULATION. The sections
// are the steps of a problem — the problem, the first quantity, the second
// quantity, the sum, the proof, the remainder that does not work out, the
// counter-calculation. The second voice can work the same calculation from
// the other side.
//
// The texts are stored as line arrays joined with `.join('\n')` — that way
// they stay readable in the repo at ~72 characters (the operator reads them
// here against the original), and utils/markdown.js turns them back into
// flowing text in the app.
//
// CommonJS without UI imports (architecture rule): verifiable with plain
// `node`.

/**
 * The Voice of Harvey — the calculating physician.
 *
 * Written by Opus (round 9). It tells from within: why he began to count,
 * why he looked at the living, why the heart must be a pump and what his
 * calculation left open. It names the uncomfortable places itself instead
 * of leaving them to the counter-voice.
 */
const stimmeDesHarvey = [
  '## The problem',
  '',
  'My name is **William Harvey**, born 1578 in Folkestone in Kent,',
  'the eldest of seven sons of a merchant. I was a physician at',
  'St Bartholomew\'s Hospital in London and later physician-in-ordinary',
  'to two kings. And let me say this at once, so you know where you',
  'stand: **What you hear here is my view — a way of thinking, not a',
  'truth.** I have erred, and I will tell you where.',
  '',
  'When I began my studies, what happens to the blood had been settled',
  'for fifteen hundred years. **Galen** had written it down, and it',
  'sounded reasonable: from the food, the liver makes blood. From there',
  'it flows through the veins out into the body and is used up there —',
  'like water that a field drinks in. Part of it seeps through fine',
  'pores in the septum of the heart from the right chamber into the',
  'left and is imbued there with vital spirit. The blood ebbs and',
  'flows, back and forth, and is constantly made anew.',
  '',
  '**That doctrine was not stupid.** It explained why one must eat,',
  'why one bleeds to death from a wound, why bloodletting relieves and',
  'why the blood in the veins looks different from the blood in the',
  'arteries. It had an answer to every question. That must be said',
  'before one overturns it.',
  '',
  'I did not ask whether it is true. **I asked: how much?** That is',
  'the whole difference. An opinion can be answered with an opinion; a',
  'quantity cannot. **Why calculate instead of argue?** Because a',
  'number cannot be talked round. It has no chair to lose and no',
  'reputation to defend. Whoever knows the quantity no longer needs to',
  'ask who is right.',
  '',
  '## The first quantity: what a beat expels',
  '',
  'Open a dead body and look at the left ventricle. It holds a',
  'quantity that can be measured — two ounces, often more. With every',
  'beat it drives part of it into the great artery.',
  '',
  'How much exactly, I did not know. So I deliberately calculated too',
  'low: only an eighth, only a sixth, only half a drachm — the',
  'smallest amount that my sharpest opponent would still concede me.',
  '**Whoever wants to prove something takes the number the other side',
  'likes best.** If the calculation already fails with that, it is',
  'finished.',
  '',
  'Today it can be said more precisely: an adult heart expels about',
  'seventy millilitres with each beat — barely a wine glass.',
  '',
  '## The second quantity: how often the heart beats',
  '',
  'Everyone carries the second number with him. Put two fingers on',
  'your wrist and count: about seventy beats a minute. That is over a',
  'thousand in half an hour and more than **a hundred thousand in a',
  'day**. No one had ever thought that through to the end.',
  '',
  '**Why look at the living rather than the dead?** Because a dead',
  'body does not show the most important thing: the movement. On the',
  'dissecting table lies a still piece of flesh. I had to see what a',
  'heart does while it is doing it.',
  '',
  'So I opened whatever I could get hold of: eels, fish, snails,',
  'crabs, frogs, pigeons, dogs — and the game from the royal parks,',
  'to which my office gave me access. Warm-blooded animals have a',
  'heart that beats too fast; the eye cannot keep up. In cold animals',
  'it beats slowly, and in a dying animal it grows slower and slower,',
  'until at last one sees the sequence.',
  '',
  'And the sequence was a different one from what was taught. It was',
  'said that the heart expands and **sucks** the blood in. I saw: the',
  'deed is the **contraction**. The heart becomes hard, short and',
  'pale, it presses — and the relaxation afterwards is only the',
  'pause. A muscle, a pouch that squeezes shut.',
  '',
  'That belongs to the truth of this chapter: **I opened animals',
  'while they were still alive, many hundreds.** I am not writing that',
  'as a side note. Whoever uses my numbers uses them.',
  '',
  '## The sum: more than the whole body contains',
  '',
  'Now take the two quantities together — more is not needed.',
  '',
  'Even with my deliberately tiny amount, in half an hour more blood',
  'leaves the heart than there is in a whole person. Reckoned with',
  'today\'s values it becomes irrefutable: seventy millilitres,',
  'seventy times a minute — that is nearly **five litres a minute and',
  'about two hundred and fifty to three hundred litres an hour**. In',
  'the whole body of an adult there are five to six litres.',
  '',
  'With that the old doctrine is given two tasks it cannot solve.',
  '**The liver would have to make hundreds of litres of blood from',
  'one day\'s food** — more than a person takes in at all. And the',
  'flesh would have to use up the same amount again, without anyone',
  'seeing where it goes.',
  '',
  'Only one explanation remains, and it is simple: **It is always the',
  'same blood. It runs in a circle** — from the heart through the',
  'arteries into the body, from the body through the veins back to',
  'the heart, through the lungs and round again.',
  '',
  '**Why then the heart as a pump?** Because I leave nothing else. A',
  'sack that contracts; valves that open only in one direction; a',
  'pressure that makes a severed artery spurt in a jet. Any craftsman',
  'who knows a fire engine understands it at once — and that is why',
  'it could be understood without Latin.',
  '',
  'To be honest: **That comparison was made only by my successors.**',
  'I myself called the heart the prince of the body and the sun of',
  'the little world. I was a pupil of Aristotle and no mechanic. That',
  'a machine grew out of my calculation is the effect of my book, not',
  'my intention.',
  '',
  '## The proof: a band around the arm',
  '',
  'A calculation convinces the head. I needed something for the eyes —',
  'and something, what is more, that anyone can repeat on himself.',
  'Tie off an arm, as the barber does before the bloodletting.',
  '',
  'What I use for that, I learned as a student. From 1599 to 1602 I',
  'studied in **Padua**, the freest university in Europe, where a',
  'permanent anatomy theatre had stood since 1594.',
  '',
  'Pull the band **tight**: the hand becomes pale and cold, and below',
  'the band there is no pulse any more. So the blood comes from',
  'above, through the arteries, which lie deep.',
  '',
  'Now **loosen it a little**: the hand turns red, and the veins',
  'beneath stand out like cords — with knots in them, at regular',
  'intervals. These knots are the **valves**. My teacher in Padua,',
  'Hieronymus Fabricius, had described them and taken them for brakes',
  'that prevent the blood from pooling in arms and legs. **He saw',
  'them; I read them.**',
  '',
  'For now comes the decisive grip: press a filled vein shut with one',
  'finger and stroke the blood away with the other finger towards the',
  'heart. The stretch stays empty. It does **not** fill from above —',
  'only when you let go does it shoot full again from below.',
  '',
  'With that it is decided, and without a single quotation: **In the',
  'veins the blood flows only in one direction — towards the heart.**',
  'Out through the arteries, back through the veins. That is the',
  'circle.',
  '',
  '## The remainder that does not work out',
  '',
  'And now the part I remained in debt.',
  '',
  '**How the blood gets from the arteries into the veins, I could not',
  'show.** I wrote of pores in the flesh and of a seeping through and',
  'knew that that is no answer. I lacked the microscope. Only in 1661',
  'did Marcello Malpighi in Bologna direct a lens at the lung of a',
  'frog and see the network of finest vessels that connects the two —',
  'the capillaries. By then I had been dead four years. **The last',
  'gap in my proof was closed by another.**',
  '',
  '**What it all was good for, I did not know.** I held to the old',
  'idea that the lung cools the heated blood. Of the air taken up in',
  'it I suspected nothing; that came only with the chemists, long',
  'after me. I explained the movement and not its purpose.',
  '',
  'And the most uncomfortable part: **My circulation healed not a',
  'single patient.** People were still bled as before — I myself too.',
  'The first attempts to make something of the insight went badly:',
  'after me, remedies were injected into the veins of the sick and',
  'blood was transferred from animals to humans; people died of it,',
  'and the transfusion was forbidden for a hundred years. **Between',
  'my calculation and the first patient it helped lie two hundred',
  'years.**',
  '',
  '## The counter-calculation',
  '',
  'I first uttered all of this in **April 1616**, in my lecture before',
  'the College of Physicians in London — my notes on it lie preserved',
  'to this day in a cramped Latin handwriting. Then I waited twelve',
  'years, kept dissecting and kept calculating. **1628** I had my book',
  'printed, in Frankfurt am Main, because that was where the book',
  'fair was and a work from there reached all Europe: seventy-two',
  'pages on bad paper, full of printers\' errors. What I harvested',
  'was contradiction.',
  '',
  'As early as 1630 a colleague in London wrote against it. Caspar',
  'Hofmann in Nuremberg watched my demonstration, admitted that he',
  'saw it, and still explained to me that I had accused nature of an',
  'indiscretion: why should she arrange such a roundabout business?',
  'In Paris, Jean Riolan the Younger in 1648 let only a small part of',
  'the blood circulate and kept the rest with Galen.',
  '',
  '**Why did they resist for so long?** Not out of stupidity. I',
  'demanded something insolent: to believe a calculation more than an',
  'edifice that explained everything — nourishment, bloodletting,',
  'diet, the whole order of the body. And my best proof lay in an',
  'opened, still beating animal. **I asked whoever had never seen a',
  'heart beat to believe me more than his teachers.** In their place',
  'I would have been cautious too.',
  '',
  'I paid for it as well. After the book I lost part of my patients;',
  'it was said that I had grown odd in the head. In the Civil War my',
  'rooms were plundered and my notes destroyed.',
  '',
  'And myself? **I did not fight.** I answered where I had to,',
  'otherwise kept silent, gave up the teaching post and turned to the',
  'question of how living things come into being. I was not the man',
  'for the quarrel; I was the man for the number. That the',
  'circulation prevailed has less to do with my tenacity than with',
  'the fact that everyone could repeat the proof on his own arm.',
  '',
  '## What the calculation does not decide',
  '',
  'One thing remains open, and I am the wrong man to answer it,',
  'because I stood on one side.',
  '',
  'The doctrine I overturned had carried for fifteen hundred years.',
  'It was false and yet usable: physicians worked with it, helped,',
  'comforted. Why does a false doctrine hold for so long — and why',
  'does a true one need decades to get through? Which of the two was',
  'inertia, which caution, which fear?',
  '',
  '**The second voice of this chapter belongs to the other side: the',
  'tradition** that contradicted — the Galenic doctrine, its reasons',
  'and its persistence. It is to work the same calculation from the',
  'back.',
].join('\n');

/**
 * The Tradition — the Galenic doctrine that had held for 1500 years.
 * The counter-calculation: why the world did not want to see the
 * circulation — and why the old calculation convinced for so long.
 *
 * Written by DeepSeek (round 9, second pass). This voice too names the
 * uncomfortable places on its own side itself (additional rule for
 * sensitive topics).
 */
const stimmeDerTradition = [
  '## The counter-calculation of the old ones',
  '',
  'The man from London has calculated and thought that settled the',
  'matter. Now we calculate back — not out of stubbornness, but',
  'because our calculation held together for a millennium and a half',
  'and his does not quite. Hear the calculation we inherited:',
  '',
  'Blood is made in the liver, from the digested food. It flows',
  'through the veins to the organs, nourishes them and is consumed',
  'there — like water that is led out onto the fields and soaked up',
  'by the soil. A small part goes to the heart and is warmed there, a',
  'part to the lung and is cooled there. That is no stupid doctrine:',
  'it explains why the liver so often hurts in the sick, why the',
  'blood at the bloodletting is dark and thick, why a person grows',
  'sleepy after eating. It explains what one sees — and what one sees',
  'is the blood in the veins that flows towards the hand when one',
  'cuts it open. Of a circulation one sees nothing.',
  '',
  '## The second calculation: what spoke against Harvey',
  '',
  'And now the objections to the gentleman from London — seriously',
  'put forward, for he too has gaps.',
  '',
  '**First: he has not closed the circle.** The man claims that the',
  'blood circulates. But where is the way back? He shows the veins,',
  'he shows the arteries — but the fine connections between them he',
  'cannot show, because he has no instrument that would make them',
  'visible. A circulation without a connection is an assertion. We',
  'asked: where does the circle close? And he could not say. Only in',
  '1661, years after his death, will an Italian with a magnifying',
  'glass find the capillaries and close the circle. But in 1628 the',
  'circle was open — and we were right to notice that.',
  '',
  '**Second: who has ever seen a heart beat?** Most physicians of his',
  'century never saw a living heart in a breast. Harvey\'s proof',
  'demanded that one open deer and dogs and watch — who did that? His',
  'figure of two hundred and forty litres an hour no one could check',
  'who had not calculated himself. A calculation one cannot follow',
  'looks like an assertion.',
  '',
  '**Third: the authority was not mere obstinacy.** Galen had for a',
  'millennium and a half supplied the foundation of every medical',
  'education. To reject him meant tearing down the foundation on',
  'which the students stood. Whoever demanded that had to offer more',
  'than a number — he had to build a new edifice. Harvey built it,',
  'but the world needed time to move in.',
  '',
  '## The third calculation: what the tradition itself knew',
  '',
  'Now the places where we ourselves must grow quieter — for our',
  'calculation too has its faults.',
  '',
  '**First: we stopped asking.** That is the heaviest accusation, and',
  'it hits home. Galen had asked, and his answer was good for his',
  'time. But we repeated his answer for a millennium and a half',
  'without asking anew. A doctrine that no one tests any more becomes',
  'a wall. The man from London asked — and precisely that was his',
  'crime and his merit.',
  '',
  '**Second: we took the body to be simpler than it is.** Our',
  'calculation knew the back and forth, not the circle. We saw that',
  'the blood flows, but not where to. The truth was more complicated',
  'than our order allowed — and we defended the order instead of',
  'seeking the truth.',
  '',
  '## The verdict of the times',
  '',
  'The calculator from London asked at the end what his calculation',
  'does not decide. Our answer as the voice that resisted: it does',
  'not decide the worth of the old, but that one must test. His',
  'calculation has won — not because he shouted louder, but because',
  'it was right and because the magnifying glass came and closed the',
  'circle he had left open. We have lost — not because our',
  'calculation was stupid, but because we held it to be finished.',
  'That is the lesson every way of thinking must learn before this',
  'book: a calculation is never finished. It is only provisionally',
  'right — until someone counts again.',
].join('\n');

/** Chapter 8 of the topic map. */
const harvey = {
  id: 'harvey',
  titel: 'Harvey and the Circulation of the Blood',
  epoche: '1578–1657',

  aufhaenger: {
    frage:
      'How does one prove something that no one can see — with a knife, ' +
      'a counting and a calculation?',
    text: [
      'For fifteen hundred years the matter was clear: blood is made in',
      'the liver, flows through the veins into the body and is used up',
      'there. Always new blood, always used up again. The doctrine came',
      'from Galen, it explained everything, and no one calculated.',
      '',
      'Then an English physician asked a question no one before him had',
      'asked — not "is it true?", but "how much?". The heart beats over',
      'a hundred thousand times a day and expels barely a wine glass',
      'with every beat. That is hundreds of litres in a day. No liver',
      'can produce that much and no flesh consume it.',
      '',
      'Only one explanation remains: it is always the same blood — it',
      'circulates. William Harvey calculated it, showed it on a',
      'tied-off arm and had it printed in Frankfurt in 1628, on',
      'seventy-two pages. It took decades before the world believed',
      'it — and one place in his proof he could never himself show.',
    ].join('\n'),
  },

  // The map lives in utils/themen/karten/harvey.js — here only the
  // phase references are translated (phasen → karteHinweise), not the
  // map itself.
  karteHinweise: [
    {
      label: '1599–1602: Padua — Harvey studies under Fabricius',
      hinweis:
        'The Englishman William Harvey enrols at the University of ' +
        'Padua, the most famous medical faculty in Europe. His teacher ' +
        'Hieronymus Fabricius ab Aquapendente has had the permanent ' +
        'anatomy theatre built there in 1594 and shows his students the ' +
        'small valves in the veins. Fabricius takes them for brakes that ' +
        'prevent the blood from pooling in arms and legs. Harvey sees ' +
        'the same thing and later thinks it through differently. In ' +
        '1602 he takes his doctorate and returns to England.',
    },
    {
      label: '1616: London — the Lumleian Lectures',
      hinweis:
        'Harvey is a physician at St Bartholomew\'s Hospital and a ' +
        'member of the College of Physicians, which elects him Lumleian ' +
        'lecturer in 1615: for years he is to dissect and teach in ' +
        'public. In the notes to his lectures of April 1616 there stands ' +
        'for the first time the sentence that the blood is carried in a ' +
        'circle. None of it is printed at first — Harvey calculates, ' +
        'dissects and waits another twelve years.',
    },
    {
      label: '1628: Frankfurt — "De motu cordis" is printed',
      hinweis:
        'The book on the movement of the heart and the blood does not ' +
        'appear in London, but with Wilhelm Fitzer in Frankfurt am ' +
        'Main — that is where the book fair is, and from there a work ' +
        'travels out into the whole of Europe. It is seventy-two pages ' +
        'on bad paper, full of printing errors, dedicated to the King ' +
        'of England. No book in the history of medicine has overturned ' +
        'so much on so few pages.',
    },
    {
      label: '1649–1661: contradiction in Paris, capillaries in Bologna',
      hinweis:
        'The Paris anatomist Jean Riolan the Younger, the most respected ' +
        'spokesman for the old doctrine, concedes the circulation only a ' +
        'small part of the blood in 1648; Harvey answers him in 1649 ' +
        'with two polemical tracts. The gap he himself had left open is ' +
        'closed only by Marcello Malpighi: in 1661 he sees under the ' +
        'microscope in Bologna the fine vessels in the lung of a frog — ' +
        'the connection between arteries and veins. Harvey has been dead ' +
        'for four years.',
    },
  ],

  perspektiven: [
    {
      id: 'harvey',
      name: 'The Voice of Harvey',
      stimme: 'Opus',
      text: stimmeDesHarvey,
    },
    {
      id: 'tradition',
      name: 'The Voice of the Tradition',
      stimme: 'DeepSeek',
      text: stimmeDerTradition,
    },
  ],

  synthese: [
    '## Where the two voices meet',
    '',
    'First the common ground. Both voices calculate — and both admit',
    'that their calculation has gaps. Harvey concedes that he cannot',
    'close the circle: no one has seen the fine connections between',
    'veins and arteries. The tradition concedes that it stopped asking',
    'for a millennium and a half. Both acknowledge experience: Harvey',
    'shows it on the tied-off arm, the tradition appeals to what every',
    'physician sees. And both know that the truth is more complicated',
    'than the order they have arranged for themselves.',
    '',
    '## Where they part',
    '',
    'The contradiction begins with the question of what counts as',
    'proof. For Harvey it is the number: if the calculation does not',
    'work out, the doctrine must be false — the quantity of blood',
    'forces the circulation. For the tradition it is visible',
    'experience: what one cannot see is not proven — and a circulation',
    'without a visible connection remains an assertion. So they are',
    'not arguing over individual facts, but over the nature of proof:',
    'counting or seeing? And from that follows the second dispute:',
    'over time. Harvey wants the truth to hold at once; the tradition',
    'wants the proven to be refuted first before it is abandoned. Both',
    'have a piece of right — and precisely that makes the story so',
    'human.',
    '',
    '## What this chapter shows for the whole book',
    '',
    'For the ninth time the same pattern — and now an arc closes: the',
    'way of thinking determines the method. At the beginning stood the',
    'plumb line, the channels, the qi, the doshas, the humours — ways',
    'of thinking of balance. Then came the ways of thinking of rupture:',
    'Paracelsus and Vesal taught experience, Harvey teaches the',
    'number. With that the foundation is laid on which modern medicine',
    'stands: no longer authority, but measurement.',
    '',
    'And this chapter shows something new: the price of progress.',
    'Harvey\'s calculation was right — but it needed decades, a',
    'magnifying glass and the courage to abandon the proven. The',
    'tradition was not stupid; it was only slow. Whoever tells the',
    'history of medicine as the triumphal march of the reasonable',
    'overlooks that every new truth must first fight against the old —',
    'and that the doubt the tradition cultivated is itself part of',
    'science. The next chapters will show what becomes of this',
    'tension: medicine now has the way of thinking of measurement —',
    'but it still has no measuring instrument that shows the disease,',
    'and no hand that heals it. It will become cruel before it becomes',
    'clean.',
  ].join('\n'),

  urteil: {
    frage:
      'What convinces you more — a calculation that no one can refute, ' +
      'or a sight that everyone understands?',
    hinweis: [
      'There is no right and no wrong here. Remember that Harvey needed',
      'both: the numbers compelled the mind, but what convinced in the',
      'end was the band around the arm, because everyone could repeat',
      'it on himself. Think too of how it is for you today: if a study',
      'gives you a number that contradicts your experience — whom do',
      'you side with? And if you see something with your own eyes that',
      'no statistic confirms: how much is it worth to you? Both paths',
      'have led astray, and both have been right.',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'On what grounds did Harvey argue that the blood must circulate?',
      antworten: [
        'On the quantity: the heart expels more blood than the body ' +
          'could produce or consume.',
        'On the microscope, under which he saw the fine vessels.',
        'On a new interpretation of the writings of Galen.',
      ],
      richtig: 0,
      erklaerung:
        'Harvey calculated: the ventricle expels a measurable quantity ' +
        'with every beat, and the heart beats over a hundred thousand ' +
        'times a day. Even with deliberately low-set values, in half an ' +
        'hour more blood comes out of the heart than there is in a ' +
        'whole person. Since the liver cannot produce it and the body ' +
        'cannot consume it, it must always be the same blood.',
    },
    {
      frage: 'Where did Harvey\'s book "De motu cordis" appear in 1628?',
      antworten: [
        'In London, at the court of the king.',
        'In Padua, where he had studied.',
        'In Frankfurt am Main, because of the book fair.',
      ],
      richtig: 2,
      erklaerung:
        'The seventy-two pages were printed by Wilhelm Fitzer in ' +
        'Frankfurt — on bad paper and with many printers\' errors. The ' +
        'detour had a reason: through the Frankfurt book fair a work ' +
        'reached Paris, Leiden, Venice and Basel within a few months. ' +
        'Harvey wanted to be read, also by his opponents.',
    },
    {
      frage: 'What do the valves in the veins show?',
      antworten: [
        'That the blood pools in arms and legs.',
        'That the blood in the veins flows only in one direction: ' +
          'towards the heart.',
        'That the veins are thinner than the arteries.',
      ],
      richtig: 1,
      erklaerung:
        'Harvey\'s teacher Hieronymus Fabricius had described the ' +
        'valves in Padua and taken them for brakes against the pooling ' +
        'of the blood. Harvey turned the interpretation around: if one ' +
        'strokes a tied-off vein empty towards the heart, it does not ' +
        'fill from above, but only from below. The blood can pass the ' +
        'valves only in one direction — towards the heart.',
    },
    {
      frage: 'Which place in his proof could Harvey not show?',
      antworten: [
        'That the heart contracts.',
        'That there are valves in the veins.',
        'How the blood passes over from the arteries into the veins.',
      ],
      richtig: 2,
      erklaerung:
        'The connection between arteries and veins remained open — ' +
        'Harvey lacked the microscope and spoke vaguely of pores in ' +
        'the flesh. Only in 1661 did Marcello Malpighi in Bologna see ' +
        'under the lens the finest vessels in the lung of a frog: the ' +
        'capillaries. Harvey had then been dead for four years.',
    },
    {
      frage: 'Where did Harvey study medicine?',
      antworten: [
        'In Paris, at the most famous faculty in France.',
        'In Padua, with Hieronymus Fabricius.',
        'In Basel, where Vesal\'s anatomical work had been printed.',
      ],
      richtig: 1,
      erklaerung:
        'After six years in Cambridge, Harvey went to Padua in 1599 — ' +
        'the freest university in Europe, with a permanent anatomy ' +
        'theatre since 1594. There Hieronymus Fabricius taught, who ' +
        'had described the venous valves. In 1602 Harvey returned to ' +
        'England as a doctor of medicine.',
    },
  ],
};

module.exports = harvey;
