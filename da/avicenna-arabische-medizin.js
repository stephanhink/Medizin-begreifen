// Kapitel 5 — „Avicenna og den arabiske medicin".
//
// Stationen, hvor antikken ikke gik tabt. Mens man i Europa glemte det
// græske sprog, samlede, oversatte og ordnede den islamiske verden, hvad
// Hippokrates og Galen havde efterladt — og gav det fem hundrede år
// senere tilbage via Toledo. Avicennas „Kanonen for medicin" blev de
// europæiske universiteters lærebog.
//
// Også her er tænkemåde-analysen kernen (forfatterens krav), og den er
// særligt delikat i dette kapitel: Denne tradition har sin styrke i at
// bevare og ordne — ikke i at vælte noget om. Hvorfor oversatte de?
// Hvorfor ordnede de i et system? Hvorfor byggede de videre på Galen i
// stedet for at afprøve ham? Af de samme grunde, som gjorde kanonen så
// stor, blev den senere en lænke. Stemmen siger det selv (tillægsregel
// for følsomme emner i CLAUDE.md).
//
// LÆNGDEREGEL (forfatterens feedback 24.08.2026): Kapitel 1–8 forbliver
// korte og tætte — hver synsvinkel højst ~250 linjer, kapitlet i alt
// højst ~600 linjer. Den første stemme her har omkring 230 linjer;
// resten af modulet giver Hermes plads til den anden stemme og den
// endelige syntese. Linjetallet måles i tests/.
//
// Stemmer (runde 6): Den FØRSTE synsvinkel — bevarerne indefra —
// skrev Opus. Den ANDEN (Vesten: Europa, der havde glemt antikken og
// fik den tilbage via Toledo) og den endelige syntese tilføjede Hermes
// i anden gennemgang. Synsvinkel-workflow: CLAUDE.md.
//
// INGEN GENTAGELSER (forfatterens beslutning 21.08.2026): Kapitel 1
// er bygget op om „hvem der taler her → …", kapitel 2 begynder med en
// scene, kapitel 3 fortæller en dags forløb, kapitel 4 er en brevveksling.
// Dette kapitel vælger den femte dramaturgi: EN BOGS REJSE. Hvert afsnit
// er en station på vejen — sted og årstal i titlen —, fortalt af dem,
// der har afskrevet, oversat og givet bogen videre. Den anden stemme kan
// fortsætte vejen på samme gade: Toledo, Montpellier, Padua.
//
// Teksterne ligger som linje-Arrays med `.join('\n')` — sådan forbliver
// de læsbare i repoet ved ~72 tegn (forfatteren læser dem her imod), og
// utils/markdown.js laver igen flydende tekst af dem i appen.
//
// CommonJS uden UI-imports (arkitekturregel): kan kontrolleres med
// blot `node`.

/**
 * Bevarernes stemme — syv stationer på en bogs rejse.
 *
 * Skrevet af Opus (runde 6). Den fortæller indefra: hvorfor der blev
 * oversat, hvorfor der blev ordnet, hvorfor man byggede videre på Galen —
 * og hvor præcis denne tænkemåde nåede sin grænse. De ubehagelige pletter
 * nævner den selv i stedet for at overlade dem til modstemmen.
 */
const stimmeDerBewahrer = [
  '## Første station: Antiokia, omkring 800 — hvad der var tilbage',
  '',
  'Denne bog, som du holder i hånden, er på rejse. Vi har båret den et',
  'stykke af vejen, og fordi man ikke kan se på en bog, hvor mange hænder',
  'den har været igennem, fortæller vi dig stationerne.',
  '',
  'Men først sandheden om os: **Vi har ikke skrevet denne bog.** Den er',
  'græsk. En mand fra Pergamon har forfattet den, seks hundrede år før',
  'nogen af os blev født. Det, du læser her, er vores syn på det, vi har',
  'gjort — en tænkemåde, ikke en sandhed. Andre vil fortælle den',
  'anderledes.',
  '',
  'I klostrene i det nordlige Syrien har munke afskrevet sådanne bøger',
  'og oversat dem til syrisk, fordi de uddannede læger, og det græske',
  'sprog forsvandt fra hverdagen. I Gundischapur, ovre i Persien,',
  'underviste læger fra samme tradition. Sådan lå skrifterne: spredt, i',
  'brudstykker, i afskrifter af afskrifter.',
  '',
  '**Bøger dør stille.** Papyrus smuldrer, pergament bliver skrabet af',
  'og skrevet på igen, et bibliotek brænder, og ingen bemærker det, fordi',
  'ingen længere kan sproget. En del af Galens værker gik tabt præcis på',
  'den måde — der var ingen tilbage, der havde brug for dem.',
  '',
  '## Anden station: Bagdad, 830 — hvorfor vi oversatte',
  '',
  'Så kom byen ved Tigris. Den var ny, den var rig, og dens kaliffer lod',
  'samle, hvad der stod skrevet på græsk, persisk, syrisk og sanskrit om',
  'lægekunst, stjernekundskab og regning. „Visdommens Hus" var bibliotek,',
  'oversætterværksted og akademi i ét.',
  '',
  '**Hvorfor oversatte vi?** Tre grunde, og ingen af dem er tilfældig.',
  '',
  '**For det første: Vi anså de gamles viden for en skat, man ikke må',
  'miste.** Ikke for en konkurrent til troen. Den, der forstår verdens',
  'orden, forstår mere om dens skaber — sådan så vi det. Det første ord,',
  'der blev åbenbaret for vores profet, lyder „Læs!". Et ord, der',
  'tilskrives ham, siger: Søg viden, selv i Kina. Om han virkelig har',
  'sagt det, er omstridt blandt lærde. At vi handlede derefter, er det',
  'ikke.',
  '',
  '**For det andet: Vi havde brug for det.** En kalif, hvis livlæge er',
  'en kristen fra Gundischapur, spørger ikke til lægens tro, men til hans',
  'dygtighed. Den, der bygger et hospital, har brug for lærebøger. Den,',
  'der vil have lærebøger, må oversætte.',
  '',
  '**For det tredje: Det blev pludselig til at betale.** Fra Kina var',
  'papiret kommet til os. Før kostede en bog en formue; nu kunne en',
  'handler eje et bibliotek. Uden den ene opfindelse var intet af det',
  'videre sket.',
  '',
  'Hvordan det så ud, viser en af os bedst: **Hunain ibn Ishaq**',
  '(809–873), kristen læge, den bedste oversætter, vi havde. Han rejste',
  'helt til Byzans for at søge efter håndskrifter. For et eneste af',
  'Galens skrifter gennemsøgte han Mesopotamien, Syrien, Palæstina og',
  'Egypten og fandt i Damaskus halvdelen af det. Han oversatte ikke ord',
  'for ord, men mening for mening, og han sammenlignede flere udgaver,',
  'før han skrev en linje. Desuden måtte han opfinde de arabiske',
  'fagudtryk — for begreber, der endnu ikke fandtes i vores sprog.',
  '',
  'Sig derfor ikke, at oversættelse er at afskrive på et andet sprog.',
  'Det er en beslutning om, hvad en sætning betyder. **Den, der',
  'oversætter, fortolker — og enhver fortolkning, vi foretog, har senere',
  'læsere holdt for originalteksten.** Det er den første ubehagelige plet',
  'i vores historie.',
  '',
  '## Tredje station: Rey, omkring 910 — tvivleren blandt os',
  '',
  'I Rey, nær det nuværende Teheran, arbejdede **ar-Razi** (omkring',
  '865–925), som Europa vil kalde Rhazes. Han ledede hospitaler,',
  'noterede sine sager som en bogholder og gjorde to ting, som vi ikke',
  'vil fortie for dig.',
  '',
  'Han beskrev som den første forskellen mellem **kopper og mæslinger** —',
  'ikke ud fra en bog, men fra sygesengen, ud fra forløbet, udslættet og',
  'feberen. To sygdomme, der før var én.',
  '',
  'Og han skrev en bog med titlen **„Tvivl om Galen"**. Deri listede han',
  'op, hvor hans egen iagttagelse modsagde den store lærer — ved feber,',
  'ved synet, ved enkelte midler. Han sagde omtrent: Lægekunsten ærer',
  'Galen bedst ved at forske videre i stedet for at skrive ham af.',
  '',
  '**Her kunne vores historie have taget en anden drejning.** En læge',
  'tvivler offentligt på autoriteten, med grunde, ud fra erfaring. Præcis',
  'det blev syv hundrede år senere i Europa til en metode. Hos os blev',
  'det en enkelt bog, som man tog til efterretning og derefter lagde til',
  'side. **Tvivlen var der. Den blev bare ikke vores tænkemåde.**',
  '',
  '## Fjerde station: Buchara og Hamadan, 1020 — hvorfor vi ordnede',
  '',
  'Nu til den mand, hvis navn står over dette kapitel. **Ibn Sina**, hos',
  'jer Avicenna, født omkring 980 ved Buchara, død 1037 i Hamadan. Læge,',
  'filosof, til tider minister, til tider fange, altid på farten. Han',
  'skrev om natten, mellem statens anliggender og flugt.',
  '',
  'Hans hovedværk er **„Kanonen for medicin"**: fem bøger, der bringer al',
  'dengang kendt viden i en orden — grundlaget og læren om safterne; mod',
  'otte hundrede enkeltmidler, hver med virkning og anvendelse;',
  'sygdommene fra hoved til fod, hver på sin plads; desuden feber,',
  'kirurgi og de sammensatte recepturer.',
  '',
  '**Hvorfor ordnede vi viden i et system?** Fordi viden, der ikke er',
  'ordnet, ikke kan gives videre.',
  '',
  'Forestil dig, at du er læge i en by uden lærere. Foran dig ligger',
  'hundrede skrifter, der modsiger hinanden; tre siger, at feberen kommer',
  'fra galden, to siger noget andet, og ingen fortæller dig, i hvilken',
  'rækkefølge du skal læse. Du bliver ikke læge. **En bog, hvor alting',
  'har sin plads, gør et bjerg af bøger til en uddannelse** — og en',
  'uddannelse til en eksamen, et hospital, et fag. Derfor slog kanonen',
  'alt andet: Den kunne undervises i.',
  '',
  '**Og hvorfor byggede vi videre på Galen i stedet for at afprøve ham?**',
  'Fordi vores tænkemåde var en anden end din. For os stod viden som',
  'helhed allerede fast — den var engang blevet fundet, af de gamle, og',
  'lå spredt og formørket. **Den lærdes opgave var at samle, rense, ordne',
  'og gøre den uden huller; ikke at vælte den om.** Den, der fandt et hul',
  'i bygningen, fyldte det ud. Den, der fandt en modsigelse, løste den op',
  '— som regel ved at vise, at den gamle alligevel havde ret, og at man',
  'bare havde misforstået ham.',
  '',
  'Det er den sætning, dette kapitel hænger på: **For os var viden',
  'overlevering og orden. For dem, der kom efter os, blev den iagttagelse',
  'og tvivl.** Begge dele er tænkemåder. Den første bevarer det, der',
  'ellers går tabt. Den anden finder det, ingen endnu vidste. Vi kunne',
  'den første. Den anden strejfede vi uden at gribe den.',
  '',
  '## Femte station: Kairo, 1242 — manden, som ingen læste',
  '',
  'Hvad det koster, viser en historie fra Kairo. Der arbejdede **Ibn',
  'an-Nafis** (omkring 1213–1288) og skrev en kommentar til kanonens',
  'anatomi. Hos Galen stod: Blodet siver gennem usynlige porer i hjertets',
  'skillevæg fra højre til venstre hjertekammer.',
  '',
  'Ibn an-Nafis skrev derimod: **Denne skillevæg er tæt. Der er ingen',
  'porer der. Blodet må tage vejen gennem lungerne.**',
  '',
  'Det er det lille kredsløb, omkring fire hundrede år før en englænder',
  'ved navn Harvey vil beskrive det. Det står på vores sprog, i en af',
  'vores bøger, i et af vores biblioteker.',
  '',
  'Og der skete — intet. Ingen strid, ingen skole, ingen undersøgelse af',
  'et lig. Sætningen stod der og blev overset. Først i 1924 fandt en',
  'ægyptisk læge den igen i et berlinerhåndskrift.',
  '',
  '**Et system, der ikke levner noget hul, har heller ikke plads til en',
  'korrektion.** Det kan hverken Ibn an-Nafis eller Ibn Sina lastes for.',
  'Det er prisen for vores tænkemåde, og vi betaler den her for første',
  'gang synligt.',
  '',
  '## Sjette station: regnskabet — hvad der blev, hvad vi støbte fast',
  '',
  'Før bogen rejser videre, balancen. Begge kolonner.',
  '',
  '**Hvad der bliver fra os.**',
  '',
  '- **Selve bevarelsen.** Uden oversætterne i Bagdad ville en stor del',
  '  af Hippokrates og Galen have været tabt for Europa. Det er ingen',
  '  lille bedrift, selv om den er en tjenende.',
  '- **Hospitalerne.** Bimaristan i Damaskus (1154), husene i Bagdad,',
  '  Kairo og Cordoba: adskilte afdelinger, et apotek, ansatte læger,',
  '  undervisning ved sygesengen, optagelse uden hensyn til tro eller',
  '  formue, betalt af fromme stiftelser. Denne forbindelse af pleje,',
  '  undervisning og eksamen er vores egen opfindelse.',
  '- **Apoteket som selvstændigt fag**, med kontrollerede receptbøger —',
  '  og med erkendelsen af, at et middel har brug for en dosis.',
  '- **az-Zahrawis kirurgi** fra Cordoba (omkring 936–1013): omkring to',
  '  hundrede tegnede instrumenter, syning, udbrænding, stenoperation.',
  '  I Europa genoptrykt indtil det 18. århundrede.',
  '- **Kanonen som orden.** En bog, man kan bruge fra første til sidste',
  '  dag af et studium.',
  '',
  '**Hvad vi støbte fast.**',
  '',
  '- **Vi bevarede Galen sammen med hans fejltagelser.** Porerne i',
  '  hjertets skillevæg, leveren som blodets værksted, de fire safter —',
  '  vi har ikke opfundet dem, men vi byggede dem et så smukt hus, at de',
  '  holdt i yderligere fem hundrede år.',
  '- **Vi afprøvede ikke autoriteten.** Ar-Razi tvivlede, Ibn an-Nafis',
  '  korrigerede — begge forblev enkeltstående tilfælde. Heller ikke vi',
  '  har dissekeret mennesker; forbuddet var hos os lige så stærkt som',
  '  i Rom.',
  '- **Kanonen var et kompendium, ikke en ny tænkning.** Den ordner',
  '  fortrinligt. Den spørger sjældent.',
  '- **Og jo større den blev, desto tungere vejede den.** Det, man i',
  '  Europa senere kaldte „bogmedicin" og gjorde grin med der — lægen,',
  '  der slår op i stedet for at se efter —, underviste også hos os.',
  '',
  '## Syvende station: Toledo, 1187 — hvor bogen går hen',
  '',
  'Her ender vores stykke af vejen. Bogen rejser videre mod vest: over',
  'Kairouan, hvor en munk ved navn Constantinus tager håndskrifter med',
  'til Salerno, over Cordoba og endelig til **Toledo**, der falder i 1085',
  'til Kastilien — sammen med sine arabiske biblioteker.',
  '',
  'Der arbejder arabisktalende kristne, jødiske lærde og tilrejste',
  'latinere ofte to og to: Én læser højt på folkesproget, den anden',
  'skriver latin. **Gerhard von Cremona** oversætter sådan over halvfjerds',
  'værker, deriblandt kanonen. Han dør i 1187 i Toledo.',
  '',
  'Derfra går bogen ind i forelæsningssalene i Montpellier, Bologna og',
  'Padua og forbliver der omkring seks hundrede år som lærebog — indtil',
  'det 17. århundrede, på nogle universiteter endnu længere. En græsk',
  'tekst, bragt af syrere til syrisk, af kristne og muslimer til arabisk,',
  'af jøder og latinere til latin. **Fire sprog, tre religioner, én bog.**',
  '',
  'Hvad vi ikke ved, er, hvordan det så ud derovre. Hvordan det er at få',
  'en viden tilbage, som man selv har mistet. Om man er taknemmelig —',
  'eller om man hellere siger, at det jo under alle omstændigheder havde',
  'været grækernes. Om et navn som Avicenna i Padua stadig høres som en',
  'læges fra Persien eller kun som en titel på en bogryg.',
  '',
  'Det svarer dette kapitels anden stemme på: Vesten — Europa, der havde',
  'glemt antikken, fik den tilbage via Toledo og sagde længe ikke, fra',
  'hvem.',
].join('\n');

/**
 * Vesten — fortsættelsen af samme gade: Toledo, Montpellier, Padua.
 * Europa, der havde glemt antikken og fik viden tilbage — og blev
 * takken skyldig.
 *
 * Skrevet af DeepSeek (runde 6, anden gennemgang). Også denne stemme
 * nævner selv sin egen sides ubehagelige pletter (tillægsregel for
 * følsomme emner).
 */
const stimmeDesOkzidents = [
  '## Ottende station: Toledo, 1187 — byen, der læste',
  '',
  'Bevarernes gade ender ikke i Toledo — den begynder forfra der, bare',
  'med anden bagage. I Toledo sidder i det 12. århundrede lærde fra hele',
  'Europa og gør det, deres hjemland ikke længere kunne: De oversætter.',
  'Arabiske håndskrifter bliver bragt til latin — ikke kun medicin, også',
  'astronomi, matematik, filosofi. Byen er en oversættelsesfabrik, og den',
  'har en uerstattelig fordel: Her lever kristne, jøder og muslimer, og',
  'blandt dem mennesker, der kan tre sprog. Oversætteren Gerhard von',
  'Cremona oversætter i sit liv over halvfjerds værker — Avicennas kanon,',
  'som vi fremover kalder „Avicenna", selv om han hed Ibn Sina.',
  '',
  'Det, der kommer til Europa, er ikke et råstof, men en færdig bygning:',
  'de gamles ordnede viden, bevaret, renset, forsynet med navn. Europa',
  'behøver ikke finde den — det behøver kun læse den.',
  '',
  '## Niende station: Montpellier og Padua — bogen bliver Europa',
  '',
  'Af læsning bliver undervisning. I Montpellier, Bologna, Padua og',
  'Salerno opstår Europas første universiteter — og deres medicinske',
  'rygrad er kanonen. I seks hundrede år er bogen af en mand fra Buchara',
  'standardværket i europæisk medicin. Studerende lærer sygdommene, som',
  'Avicenna ordnede dem; professorer kommenterer hans sætninger; kanonens',
  'autoritet bærer den unge videnskab, indtil den er stærk nok til at gå',
  'egne veje.',
  '',
  'Man kan ikke sige det ofte nok: Det europæiske universitet, dette',
  'fundament for vores videnskab, er utænkeligt uden gaden fra Bagdad til',
  'Toledo. Det står på oversatte håndskrifter.',
  '',
  '## Tiende station: regnskabet — og takken, der udeblev',
  '',
  'Og her bliver regnskabet for den egen side ubehageligt, for Vesten har',
  'taget imod gaven og glemt giverne.',
  '',
  '**For det første: Vi har slettet oprindelsen.** Avicenna blev et',
  'latinsk navn, de arabiske kilder forsvandt fra fodnoterne, og i',
  'Europas skolebøger begyndte videnskaben gerne med grækerne — og',
  'derefter, efter et mørkt hul, med os. De århundreder, hvor andre',
  'havde vogtet lyset, blev til et hul, som ingen forklarede. Den, der',
  'fortæller historien sådan, stjæler bevarerne deres plads i den.',
  '',
  '**For det andet: Vi overtog uden at afprøve — og afprøvede derefter',
  'uden at takke.** Galens fejltagelser kom i samme bagage som hans',
  'storhed, og Europa overtog dem så trofast, som Bagdad havde bevaret',
  'dem. Da vores egen anatomi så viste, at Galen tog fejl, lagde vi',
  'fejlen på ham — og fortsat fortiede fortjenesten hos dem, der havde',
  'bragt ham til os.',
  '',
  '**For det tredje: De sent fødtes hovmod.** Vi har gerne beskrevet den',
  'islamiske verden som en ren mellemhandler — som en vogter, der ikke',
  'selv havde bidraget med noget. Det er dobbelt forkert: Den gjorde mere',
  'end at vogte, og selv vogteriet var ikke lykkedes uden den.',
  'Mellemhandlere, der i tre hundrede år driver den eneste butik, hvor',
  'viden kan fås, er ikke mellemhandlere. De er civilisationens lagre.',
  '',
  '## Svar til bevarerne',
  '',
  'Bevarerne spurgte i slutningen af deres rejse, hvor deres bog går hen.',
  'Svaret fra denne stemme: Den går i vores hænder — og vi har først',
  'vogtet den og derefter fornægtet den. Kanonen er blevet kommenteret i',
  'Padua, undervist i Montpellier og afskrevet i hundrede biblioteker, og',
  'de mænd, der oversatte den, står ikke i nogen af vores historier.',
  'Måske er det det ærligste svar: Vi skylder denne gade mere, end vi',
  'nogensinde har betalt — og bogen, som den sendte os, har vi først',
  'båret videre, da vi havde lært at befrage den i stedet for at beundre',
  'den. Om det er det punkt, hvor begge regnskaber mødes, må syntesen',
  'svare på.',
].join('\n');

/** Kapitel 5 i emne-landkortet. */
const avicennaArabischeMedizin = {
  id: 'avicenna-arabische-medizin',
  titel: 'Avicenna og den arabiske medicin',
  epoche: '~750–1200',

  aufhaenger: {
    frage: 'Hvem har bevaret antikken for os?',
    text: [
      'I Europa blev det stille. Efter det vestromerske riges undergang',
      'kunne stadig færre mennesker græsk; Hippokrates\' og Galens skrifter',
      'lå i klostre, der ikke længere læste dem, eller de smuldrede.',
      '',
      'Længere mod øst skete det modsatte. I Bagdad lod kalifferne fra',
      'omkring 750 samle og oversætte, hvad grækere, persere og indere',
      'havde skrevet ned. Læger byggede hospitaler med undervisning ved',
      'sygesengen. Og omkring 1020 skrev en mand fra egnen omkring Buchara',
      'en bog, der ordnede alt det, man troede at vide om mennesket: Ibn',
      'Sina, som Europa kaldte Avicenna.',
      '',
      'Hans „Kanonen for medicin" kom via oversætterskolen i Toledo',
      'tilbage til Europa og forblev der omkring seks hundrede år som',
      'universiteternes lærebog. Uden denne omvej over to fremmede sprog',
      'ville vi vide meget mindre om den antikke medicin.',
      '',
      'Dette kapitel fortæller, hvorfor en hel verden af lærde anså det',
      'for sin opgave at redde og ordne fremmed viden — og hvad det har',
      'kostet. For den, der bevarer en autoritet, bevarer også dens',
      'fejltagelser.',
    ].join('\n'),
  },

  // Kortet ligger i utils/themen/karten/avicenna-arabische-medizin.js —
  // her er kun fasehenvisningerne oversat (karteHinweise), ikke selve
  // kortet.
  karteHinweise: [
    {
      label: '~830: Visdommens Hus i Bagdad',
      hinweis:
        'Bagdads kaliffer lader samle, hvad grækerne, perserne og inderne ' +
        'har skrevet om lægekunst, stjernekundskab og regning. Oversættere ' +
        'som Hunain ibn Ishaq henter håndskrifterne fra Byzans og fra de ' +
        'syriske klostre, sammenligner flere udgaver og overfører dem til ' +
        'arabisk — og opfinder samtidig de arabiske fagudtryk. Papir, ' +
        'overtaget fra Kina, gør bøger for første gang til at betale.',
    },
    {
      label: '~1020: Avicennas kanon opstår i Persien',
      hinweis:
        'Ibn Sina, i Europa kaldet Avicenna, fødes i 980 ved Buchara og ' +
        'rejser som læge og minister fra hof til hof: Buchara, Gurgandsch, ' +
        'Rey, Hamadan, Isfahan. Undervejs skriver han „Kanonen for medicin" ' +
        '— fem bøger, der ordner al kendt viden, fra grundlaget over ' +
        'omkring 800 enkeltmidler til sygdommene fra hoved til fod. I 1037 ' +
        'dør han i Hamadan.',
    },
    {
      label: '~1000–1100: Cordoba, Kairouan og Kairo',
      hinweis:
        'Viden vandrer videre mod vest. I Cordoba skriver az-Zahrawi en ' +
        'kirurgisk lærebog med tegnede instrumenter, som bruges i Europa i ' +
        'århundreder. I Kairouan samler Constantinus Africanus senere de ' +
        'bøger, han tager med til Salerno. I Kairo og Damaskus står ' +
        'hospitaler med afdelinger, apotek og undervisning — for enhver, ' +
        'der kommer.',
    },
    {
      label: '~1150–1187: Toledo oversætter for Europa',
      hinweis:
        'I Toledo, kristent siden 1085, arbejder arabiske, jødiske og ' +
        'kristne lærde side om side på de samme håndskrifter. Gerhard von ' +
        'Cremona overfører her kanonen til latin; han dør i 1187 i Toledo. ' +
        'Derfra går bogen til Montpellier, Paris, Bologna og Padua — og ' +
        'forbliver omkring 600 år som lærebog på de europæiske ' +
        'universiteter.',
    },
  ],

  perspektiven: [
    {
      id: 'bewahrer',
      name: 'Bevarernes stemme',
      stimme: 'Opus',
      text: stimmeDerBewahrer,
    },
    {
      id: 'okzident',
      name: 'Vestens stemme',
      stimme: 'DeepSeek',
      text: stimmeDesOkzidents,
    },
  ],
  synthese: [
    '## Hvor begge stemmer mødes',
    '',
    'Først det fælles. Begge stemmer rejser på samme gade: Bevarerne',
    'bringer bogen til Toledo, Vesten bærer den videre derfra — og begge',
    'anerkender, at uden oversætterne i Bagdad og Toledo ville den antikke',
    'medicin have været tabt i Europa. Begge ser en bedrift i ordenen:',
    'Bevarerne gjorde viden undervisbar, og Europa byggede universitetet',
    'af lærebogen. Begge indrømmer, at kanonens autoritet også har lænket:',
    'Den, der slog op i stedet for at se efter, lærte Galens fejltagelser',
    'med. Og begge kender det ubehagelige regnskab: Vesten har taget imod',
    'gaven og glemt giverne.',
    '',
    '## Hvor de skilles',
    '',
    'Modsætningen begynder ved spørgsmålet om, hvad viden er. For',
    'bevarerne er viden overlevering og orden — en skat, man vogter,',
    'renser og giver videre; den egen tænkemåde afprøvede ikke de gamles',
    'autoritet. Vesten har af den samme arv til sidst gjort noget andet:',
    'Det begyndte at befrage det arvede i stedet for at beundre det — og',
    'præcis det blev til videnskaben. De strides altså ikke om fortiden,',
    'men om vejen: Bevare eller betvivle? Historien har haft brug for',
    'begge dele — men de to sider regner det hver især sig selv til. Og de',
    'strides om erindringen: Bevarerne kræver deres plads i historien;',
    'Vesten har længe nægtet dem den.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'For sjette gang det samme mønster — og nu bliver det klart, hvorfor',
    'det er bogens melodi: Tænkemåden bestemmer metoden. Ved Nilen var det',
    'kanaler, i Kina qi, i Indien doshaerne, i Grækenland de fire safter,',
    'i Bagdad overlevering og orden. Fem tænkemåder, fem i sig selv',
    'sammenhængende verdener, der har hjulpet mennesker.',
    '',
    'Og dette kapitel føjer en ny tone til melodien: Viden vandrer. Den',
    'tilhører ingen kultur endeligt — den bliver bevaret, oversat, glemt,',
    'genfundet. Den medicin, der begyndte på Kos, rejste via Alexandria,',
    'Bagdad og Toledo til Montpellier og Padua, før den tilhørte Europa.',
    'Den, der fortæller medicinens historie som en kæde af opfindelser,',
    'overser de gader, viden gik ad. Og den, der ser gaden, forstår, at',
    'rejsens næste station allerede venter: Europa, der begynder at',
    'befrage det arvede. Hans navn er Vesal.',
  ].join('\n'),

  urteil: {
    frage:
      'Hvad er mest værd — en bog, der ordner alting, eller et spørgsmål, ' +
      'der bryder alting op?',
    hinweis: [
      'Der er her ikke noget rigtigt eller forkert. Tænk på, at begge dele',
      'har sin pris: Uden den ordnende bog ville antikkens viden have været',
      'spredt og formentlig tabt; med den varede det århundreder, før nogen',
      'igen så efter i stedet for at slå op. Tænk også på i dag:',
      'retningslinjer, lærebøger og opslagsværker ordner den medicinske',
      'viden — og et sted sidder der nogen, hvis iagttagelse ikke passer',
      'ind. Hvornår ville du tro på bogen, hvornår på iagttagelsen?',
    ].join(' '),
  },
  quiz: [
    {
      frage: 'Hvad var „Visdommens Hus" i Bagdad?',
      antworten: [
        'Et hospital kun for kaliffens familie.',
        'Bibliotek, oversætterværksted og akademi i ét.',
        'Det første universitet med eksamensorden i Europa.',
      ],
      richtig: 1,
      erklaerung:
        'Fra omkring 750 lod kalifferne græske, persiske og indiske ' +
        'skrifter samle og overføre til arabisk. Oversættere som Hunain ' +
        'ibn Ishaq rejste håndskrifterne efter helt til Byzans, ' +
        'sammenlignede flere udgaver og oversatte efter meningen i stedet ' +
        'for ord for ord. Muligt blev det også takket være papiret, som ' +
        'blev overtaget fra Kina.',
    },
    {
      frage: 'Hvad er „Kanonen for medicin"?',
      antworten: [
        'En ed, som arabiske læger svor før godkendelsen.',
        'En samling lægeurter fra haven i Cordoba.',
        'Ibn Sinas lærebog i fem bind, der ordnede al den kendte ' +
          'medicinske viden.',
      ],
      richtig: 2,
      erklaerung:
        'Ibn Sina (Avicenna, omkring 980–1037) samlede deri grundlaget, ' +
        'lægemidlerne, sygdommene fra hoved til fod, feber og recepturer. ' +
        'Via oversætterskolen i Toledo kom værket til Europa og forblev ' +
        'der omkring seks hundrede år som universiteternes lærebog.',
    },
    {
      frage: 'Hvem beskrev som den første blodets vej gennem lungerne?',
      antworten: [
        'Ibn an-Nafis i Kairo, omkring 400 år før William Harvey.',
        'Galen i Rom, i det andet århundrede.',
        'William Harvey i London, 1628.',
      ],
      richtig: 0,
      erklaerung:
        'Ibn an-Nafis (omkring 1213–1288) modsagde Galens antagelse om, ' +
        'at blodet siver gennem porer i hjertets skillevæg: Denne væg er ' +
        'tæt, blodet tager vejen gennem lungerne. Hans skrift forblev ' +
        'upåagtet og blev først genopdaget i 1924 i et berlinerhåndskrift.',
    },
    {
      frage: 'Hvad kendetegnede hospitalerne i den islamiske verden?',
      antworten: [
        'De optog udelukkende muslimer.',
        'De havde adskilte afdelinger, et apotek og undervisning ved ' +
          'sygesengen.',
        'De blev drevet af staten og var betalingspligtige.',
      ],
      richtig: 1,
      erklaerung:
        'Huse som Bimaristan an-Nuri i Damaskus (1154) forenede pleje, ' +
        'apotek og uddannelse. De blev finansieret af fromme stiftelser, ' +
        'og man optog uden hensyn til tro eller formue. I Europa fandtes ' +
        'dengang først og fremmest klosterhospicer uden egen medicinskole.',
    },
    {
      frage: 'Tvivlede ingen på Galen i den islamiske medicin?',
      antworten: [
        'Jo: ar-Razi skrev en bog med titlen „Tvivl om Galen".',
        'Nej, modsigelse mod de gamle var undtagelsesløst forbudt.',
        'Jo, men først efter 1500 og kun i Spanien.',
      ],
      richtig: 0,
      erklaerung:
        'Ar-Razi (omkring 865–925) holdt egne iagttagelser op imod Galen ' +
        'og adskilte som den første kopper og mæslinger ved sygesengen. ' +
        'Hans tvivl forblev dog et enkeltstående tilfælde: Den blev ikke ' +
        'til en metode, sådan som den opstod i Europa århundreder senere.',
    },
  ],
};

module.exports = avicennaArabischeMedizin;
