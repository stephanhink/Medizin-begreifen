// Emne: Pasteur og Lister — mikroskopet, kimteorien og vendepunktet.
//
// Dansk oversættelse af utils/themen/pasteur-lister.js (tysk original).
// Det tredje kapitel i den nyere tid og hele bogens vendepunkt: Her
// finder medicinen årsagen til sårinfektionen, som Semmelweis i kapitel 9
// havde set, men ikke kunnet navngive. En kemiker i Frankrig forklarer,
// hvad gæring er — og en kirurg i Skotland drager konsekvensen for
// operationsbordet.
//
// TÆNKEMÅDE-analysen er hjertestykket (forfatterens krav). Den spørger
// her: Hvorfor netop gæringen? (Fordi en kemiker, der skulle hjælpe
// industrien, i fordærvet vin, surt øl og syge silkeorme hele tiden
// fandt det samme mønster — små levende væsner, der nedbryder noget.)
// Hvorfor kimene? (Fordi de er overalt: i luften, i støvet, på huden —
// og fordi de falder ned i flasken, ligesom de falder ned i det åbne
// sår.) Hvorfor måtte læren om spontan generering falde? (Fordi kim,
// der opstår ud af intet, ikke ville være en årsag, men en følge — hele
// kimteorien hang på det.) Hvorfor svække i stedet for at dræbe? (Fordi
// kroppen lærer en levende, men udmattet modstander bedre at kende.) Og
// den store afløsning: Ligevægtens tænkemåde viger for årsagens
// tænkemåde — sygdom er en ubuden gæst, ikke en forstyrret målestok.
//
// LÆNGDEREGEL (forfatterens feedback 24.08.2026): Fra kapitel 9 gælder
// det modsatte — fuldstændigt og udførligt. Udførligt betyder ikke
// opblæst: hvert afsnit fører fortællingen videre. Der måles i
// tests/karte-pasteur-lister.mjs.
//
// TONE-reglen: BEGGE sider behandles fair. Den første stemme taler her
// fra laboratoriet og nævner selv de ubehagelige pletter på sin egen
// side: iscenesættelsen af Pouilly-le-Fort og vaccinen, som Pasteur
// offentligt talte anderledes om end i sine notesbøger (Gerald Geison,
// 1995); rabiesvaccinationen af et barn uden forudgående afprøvning på
// mennesker; de to behandlinger før Joseph Meister, som han ikke omtalte;
// ærgerrigheden og striden med Pouchet og med Koch; og grænsen for sin
// egen tænkemåde — kimen forklarer ikke, hvorfor den ene bliver syg og
// den anden ikke.
//
// INGEN RYGTER (forfatterens beslutning 25.08.2026): Kun dokumenteret.
// To kendte fortællinger om Pasteur er IKKE dokumenteret og bliver i
// teksten udtrykkeligt markeret som ubekræftede: det påståede citat på
// dødslejet („kimen er intet, miljøet er alt") og den udbredte
// fortolkning af Joseph Meisters død i juni 1940.
//
// Stemmer (runde 12): Den FØRSTE synsvinkel — laboratoriet, Pasteurs
// stemme — er skrevet af Opus. Den ANDEN (klinikken: Joseph Lister i
// Glasgow, karbolsyren, tallene, kollegernes spot, forbindelsen mellem
// laboratorium og klinik som den egentlige begivenhed) og den
// afsluttende syntese tilføjer Hermes i anden omgang. Synsvinkel-
// workflow: CLAUDE.md.
//
// INGEN GENTAGELSER (forfatterens beslutning af 21.08.2026): Kapitel 1
// inddeler efter „hvem der taler her", kapitel 2 begynder med en scene,
// kapitel 3 fortæller en dags forløb, kapitel 4 er en brevveksling,
// kapitel 5 en bogs rejse, kapitel 6 en rundtur, kapitel 7 en retssag,
// kapitel 8 en regning, kapitel 9 et ur, kapitel 10 en kæde. Dette
// kapitel vælger den tolvte dramaturgi: MIKROSKOPET. Afsnittene er
// præparater, der efter hinanden kommer under linsen — en dråbe syg
// roesaft, luftens støv, halsen på en flaske, en silkeorm, blodet fra
// et dødt får, rygmarven fra en kanin. Den anden stemme kan holde den
// samme linse over operationsbordet: Der ligger det præparat, som
// Pasteur aldrig fik — et åbent sår.
//
// Kortet ligger i karten/pasteur-lister.js — det er langt og af en anden
// art (geometri i stedet for fortælling), derfor i en egen fil. Her er
// kun fasehenvisningerne oversat (karteHinweise), ikke selve kortet.
//
// Teksterne ligger som linje-arrays med `.join('\n')` — sådan forbliver
// de læsbare i repoet ved ~72 tegn, og utils/markdown.js laver igen
// flydende tekst af dem i appen.
//
// CommonJS uden UI-imports (arkitekturregel): kan kontrolleres med
// blank `node`.

/**
 * Laboratoriets stemme — kimteorien indefra.
 *
 * Skrevet af Opus (runde 12). En stemme, der taler for Louis Pasteur og
 * hans medarbejdere: Émile Roux, Charles Chamberland, Louis Thuillier.
 * Den fortæller, hvorfor de gjorde, hvad de gjorde — og den nævner selv
 * de ubehagelige pletter (tillægsregel for følsomme emner i CLAUDE.md).
 */
const laboratorietsStemme = [
  '## Linsen',
  '',
  'Vi begynder med et apparat, ikke med et menneske.',
  '',
  'På bordet står et mikroskop. Derunder ligger en lille glasplade, og på',
  'pladen en dråbe væske. Det, der svømmer i denne dråbe, er for lille til',
  'at ane, og det afgør, om et fad vin bliver solgt eller hældt ud, om en',
  'familie kan leve af silkeavl — og, som det vil vise sig, om et menneske',
  'dør eller ikke.',
  '',
  '**Det, du hører her, er laboratoriets syn — en tænkemåde, ikke en',
  'sandhed.** Vi taler for kemikeren Louis Pasteur (1822–1895) og for dem,',
  'der stod ved hans side ved dette bord: Émile Roux, Charles Chamberland,',
  'Louis Thuillier. Vi er ikke læger. Vi har aldrig plejet en sygeseng,',
  'aldrig syet et sår, aldrig skrevet en recept. Vi har undersøgt gæringer.',
  'At det blev den største vending i medicinhistorien, overraskede os selv.',
  '',
  'Vi fortæller derfor dette kapitel, som vi arbejdede: **som en række af',
  'præparater.** Ét efter ét kommer de under linsen, og hver enkelt',
  'besvarer et spørgsmål og stiller det næste. Til sidst ligger der et',
  'præparat på bordet, som vi ikke længere kunne undersøge — et åbent sår.',
  'Dertil skulle der en kirurg til.',
  '',
  'Og fordi du ikke skal tro os, bare fordi vi har monumenter: Vi lægger',
  'også det under linsen, der får os til at se dårligt ud. Det er ikke lidt.',
  '',
  '## Det første præparat: en dråbe syg roesaft',
  '',
  'Lille, sommeren 1856. En by af fabriksskorstene, og den nye dekan for',
  'det naturvidenskabelige fakultet har den udtrykkelige opgave at gavne',
  'fabrikkerne. En brænderiejer ved navn Bigo kommer med et dyrt problem:',
  'Af hans roesaft bliver der ikke længere alkohol, men en slimet, sur',
  'suppe. Hele kar er tabt. Ingen ved hvorfor.',
  '',
  'Dekanen henter prøver fra de gode og fra de fordærvede kar og lægger',
  'begge under linsen. **I de gode svømmer runde, spændstige gærceller. I',
  'de fordærvede ligger andre, meget mindre dannelser: korte stave.** Ikke',
  'så få. Millioner.',
  '',
  'For en kemiker i de år er det ikke et fund, men en ærgrelse. Den',
  'herskende lære — den stammer fra Justus von Liebig, Europas mest',
  'anerkendte kemiker — siger: Gæring er et kemisk henfald. Noget dødt',
  'falder fra hinanden og river sukkeret med sig i forbigående. Gæren er',
  'efter denne lære en rest af processen, ikke dens ophav. Det, man ser',
  'under mikroskopet, er affald.',
  '',
  'Vi har vendt det om, og det er den første og måske vigtigste sætning i',
  'dette kapitel: **Gæren er ikke affald. Den er et levende væsen, og',
  'gæringen er det, den gør.** Det, der forvandler sukker til alkohol, er',
  'ikke kemien, men en organisme, der lever af det. Og når der i stedet for',
  'alkohol opstår mælkesyre, så skyldes det ikke en forstyrret henfald,',
  'men at et andet levende væsen sidder i karet — staven i stedet for',
  'kuglen.',
  '',
  '**Hvorfor netop gæringen?** Ikke af nysgerrighed efter vinen. Men fordi',
  'der i den bliver noget synligt, som man ellers ingen steder kan se så',
  'rent: **en stor, skæbnesvanger forandring, der udgår fra et bitte',
  'levende væsen.** Et par kugler, som ingen kan se med det blotte øje,',
  'forvandler et helt fad. Den, der har set det én gang, tænker ved enhver',
  'anden forandring, der synes at ske af sig selv, det samme: Måske er der',
  'også her nogen bagved, som jeg bare ikke kan se.',
  '',
  'Og der kommer endnu noget til, som gjorde sagen praktisk: Vi kunne',
  '**styre** den. Vin, der kortvarigt opvarmes til omkring femoghalvtreds',
  'grader, fordærves ikke længere — de generende levende væsner dør, og',
  'vinen forbliver drikkelig. I 1865 blev metoden beskyttet; i dag bærer',
  'den vores navn, og den står på hver mælkekarton. **Når man kan afhjælpe',
  'et onde ved at dræbe noget levende, så var det onde levende.**',
  '',
  '## Det andet præparat: støvet i luften',
  '',
  'Dermed stod det næste spørgsmål: Hvor kommer de fra?',
  '',
  'Karet havde været rent. Saften var frisk. Alligevel sidder der pludselig',
  'millioner af stave i det. Kommer de udefra — eller opstår de i karet?',
  '',
  'Vi lagde derfor selve luften under linsen. Man suger luft gennem en prop',
  'af skydebomuld, opløser proppen og ser på det, der er blevet hængende.',
  'Man finder støv — og mellem støvkornene små kroppe, der ser ud som det,',
  'der svømmer i det fordærvede kar.',
  '',
  'Det lyder harmløst og er en verdensbeskrivelse: **Luften er ikke tom.**',
  'I hvert værelse, over hvert bord, i hvert åndedrag svæver en usynlig',
  'fragt. Den lægger sig på alt, der står åbent: på suppen, på kødet, på',
  'mælken — og, det bliver senere hele pointen, på hvert åbent sår.',
  '',
  '**Hvorfor er det den afgørende observation?** Fordi den erstatter en',
  'tusind år gammel forklaring. Lægerne før os talte om miasmer: om dårlig,',
  'fordærvet luft, der gør syg — sumpen, stanken, de onde dunster. De havde',
  'ikke uret i det, de observerede; hvor det stank, blev man syg. Men de',
  'havde den forkerte årsag. **Det er ikke lugten, der gør syg. Det er det,',
  'der svæver med støvet i luften, der gør syg.** Forskellen ser lille ud',
  'og er enorm: Mod en stank kan man gøre lidt. Mod noget levende, som man',
  'kan dræbe, filtrere og holde væk, meget.',
  '',
  '## Det tredje præparat: halsen på en flaske',
  '',
  'Og nu til striden, der kostede os år, og uden hvilken intet af alt',
  'dette ville have stået.',
  '',
  'Mod vores forklaring stod en ærværdig lære: den **spontane generering**.',
  'Den siger, at lavt liv af sig selv opstår af død materie — i rådnende',
  'kød, i hø-udtræk, i en suppe, der får lov at stå. Dens mest anerkendte',
  'forsvarer var Félix-Archimède Pouchet, direktøren for det naturhistoriske',
  'museum i Rouen, en seriøs mand med seriøse forsøg: Han kogte sine',
  'udtræk, lukkede dem, lukkede kun glødende luft ind — og fandt alligevel',
  'liv i dem igen.',
  '',
  '**Hvorfor måtte vi modbevise den spontane generering?** Fordi hele',
  'kimteorien ellers falder sammen, og det netop på sit vigtigste sted.',
  'Tænk det til ende: Hvis der i et rådnende sår kan opstå liv af sig',
  'selv, så er de kim, man finder der, **ikke årsagen til forrådnelsen,',
  'men dens følge** — tilbehør, der indfinder sig, når kødet fordærves. Så',
  'er enhver foranstaltning mod kim meningsløs, for de opstår jo igen og',
  'igen. **Spørgsmålet, om liv opstår ud af intet, er derfor ikke en',
  'filosofisk leg. Det afgør, om det kan betale sig at koge en kniv.**',
  '',
  'Vores svar var et stykke glas. Man tager en kolbe med suppe, opvarmer',
  'halsen i flammen og trækker den ud til en lang, nedad bøjet svanehals.',
  'Kolben forbliver **åben** — luften går ind og ud, uhindret. Kun støvet',
  'kommer ikke igennem: Det sætter sig i bugtningen, fordi det er tungere',
  'end luften. Så koger man suppen op én gang og stiller kolben hen.',
  '',
  'Den forbliver klar. Uger, måneder, år. Nogle af disse kolber står den',
  'dag i dag klar på instituttet i Paris. Vender man derimod kolben sådan,',
  'at suppen rører bugtningen og løber tilbage, eller brækker man halsen',
  'af, så bliver den grumset inden for en til to dage. **Det lå aldrig i',
  'luften. Det lå altid i støvet i luften.**',
  '',
  'Vi bar derefter prøven ud i landskabet, og det var den smukkeste del af',
  'arbejdet: tyve tilsmeltede kolber, åbnet i den støvede gård, tyve åbnet',
  'i en kølig kælder, tyve åbnet på markerne ved Arbois — og tyve højt',
  'oppe på gletsjeren Mer de Glace ved Chamonix, i luft, hvor der næsten',
  'ikke svæver noget. Resultatet var en stafet: **Jo renere luften, desto',
  'færre kolber fordærvedes.** På gletsjeren forblev næsten alt klart. Den',
  '7. april 1864 har vi demonstreret det i Sorbonne for et stort publikum.',
  '',
  'Og nu den ubehagelige halvdel af denne historie, som sjældent står i',
  'skolebøgerne.',
  '',
  '**Pouchets forsøg var ikke forfalskede, og han var ingen nar.** Han',
  'arbejdede med hø-udtræk. I hø sidder der varige former af bakterier —',
  'sporer —, der overlever kogende vand. Den, der koger hø-suppe i ti',
  'minutter, har ikke gjort den kimfri; den bliver bagefter grumset, helt',
  'uden spontan generering. Vi arbejdede med gærvand og sukkeropløsninger,',
  'som man faktisk kunne gøre kimfrie ved at koge. **Vi havde altså ikke',
  'kun den bedre forklaring, vi havde også det mere medgørlige materiale.**',
  'At sporer er så varmebestandige, viste først John Tyndall et lille årti',
  'senere.',
  '',
  'Vi udtalte ikke denne fordel. I stedet pressede vi på for offentlige',
  'demonstrationer og indkaldte Pouchet for kommissioner, hvis betingelser',
  'vi var med til at bestemme; til sidst trak han sig tilbage.',
  'Videnskabshistorikere har senere tegnet det efter, og de har ret: **Vi',
  'vandt striden også med den bedre talers midler, ikke kun med den bedre',
  'forsøgs midler.** Vores konklusion var rigtig. Vejen dertil var ikke så',
  'ren som kolberne.',
  '',
  '## Det fjerde præparat: en syg silkeorm',
  '',
  'I 1865 kaldte regeringen os til syden. I dalene omkring Alès døde',
  'silkeormene; en hel egn levede af dem, og den var ved at blive',
  'forarmet. Vi vidste intet om silkeorme. Vi havde aldrig set én.',
  '',
  'Fem år tilbragte vi der. Under linsen fandt vi i de syge dyr bitte små',
  'legemer, og vi fandt dem også i de sommerfugle, der endnu så sunde ud og',
  'lagde æg. **Dermed opstod en metode, der ikke kostede en franc: Man',
  'undersøger efter æglægningen sommerfuglen under mikroskopet. Er der',
  'legemer, bliver æggene tilintetgjort. Er der ikke, er æggene sunde.**',
  'Dermed kunne avlen reddes. Det var første gang, vores arbejde ikke',
  'reddede et fad, men et erhverv.',
  '',
  'Disse fem år var de tungeste i vores liv, og de hører hjemme i dette',
  'kapitel, fordi de forklarer, hvorfor vi senere blev så ubetingede. I',
  'denne tid falder faderens død og døden af to døtre: Camille, to år',
  'gammel, og Cécile, tolv. En tredje datter, Jeanne, var i 1859 død af',
  '**tyfus** som niårig. Tre ud af fem børn. Ingen læge kunne gøre noget,',
  'og ingen kunne sige, hvad det skyldtes.',
  '',
  'I oktober 1868, femogfyrre år gammel, kom et slagtilfælde. Den venstre',
  'side forblev lammet; benet slæbte, hånden var næsten ubrugelig. **Alt,',
  'der endnu kommer i dette kapitel — miltbranden, hønsekoleran, rabies,',
  'instituttet — er arbejdet af en mand med lammelse i den ene side**, som',
  'måtte diktere håndgrebene, fordi andre udførte dem.',
  '',
  'Og i disse år faldt den sætning, der lavede en medicin ud af en',
  'observation om vin og orme: **Det, gæringen er for vinen, er sygdommen',
  'for mennesket.** I begge tilfælde trænger et bitte levende væsen ind,',
  'formerer sig og forvandler det hele. Vinen bliver sur, ormen dør,',
  'mennesket får feber. Det er den samme proces i en anden beholder.',
  '',
  '## Det, der ikke kan ses under noget glas: tænkemåden',
  '',
  'Lad os stoppe her, for her ligger det egentlige, og det ligger ikke',
  'under linsen, men bagved den.',
  '',
  'I to tusind år har medicinen forstået sygdom som **forstyrrelse af en',
  'ligevægt**. Hos Hippokrates og Galen er det de fire safter, der er',
  'kommet ud af mål; i den kinesiske medicin er det qi, der ikke flyder; i',
  'ayurveda er det doshaerne. Så forskellige disse lærer er, deler de en',
  'grundfigur: **Syg er et menneske, hos hvem noget ikke længere stemmer —',
  'for meget, for lidt, for varmt, for koldt, blokeret.** Behandling',
  'betyder så: genoprette målet, aflede, varme, køle, styrke.',
  '',
  'Vores tænkemåde er en anden, og den er bruddet, som hele denne bog',
  'handler om: **Sygdommen er en ubuden gæst, ikke en ligevægt.** Den',
  'kommer udefra. Den har et navn, en skikkelse, en levevis, en vej, den',
  'rejser ad. Man kan farve den, dyrke den, lægge den under glasset og',
  'tælle den.',
  '',
  'Af denne grundfigur følger alt det øvrige, og det gør det med',
  'nødvendighed:',
  '',
  '**For det første: Hver sygdom har sin egen årsag.** Ikke „feber" som',
  'tilstand, men netop det ene patogen, der laver præcis det ene',
  'sygdomsbillede. Det er grunden til, at den moderne medicin er så',
  'besat af diagnoser: Den, der ikke navngiver årsagen, kan ikke angribe',
  'den.',
  '',
  '**For det andet: Årsagen finder man, før man helbreder.** Det er',
  'omvendelsen af hele den hidtidige lægekunst, og den er ubehagelig: Den',
  'kræver års arbejde, hvor ingen bliver hjulpet. Vi arbejdede seks år på',
  'silkeorme, før et eneste menneske havde noget ud af det. **Den, der',
  'kender årsagen, kan skære den over ved roden — den, der kun lindrer',
  'generne, må lindre evigt.**',
  '',
  '**For det tredje: Forsøget er dommeren, ikke erfaringen og ikke',
  'autoriteten.** Ikke hvad Liebig siger, ikke hvad der har gjaldt i',
  'århundreder, ikke hvad den erfarne praktiker har i maven: Kolben',
  'afgør. Man bygger to opstillinger, der adskiller sig i præcis ét punkt,',
  'og lader dem svare. **Tilfældet begunstiger kun den forberedte ånd** —',
  'denne sætning, udtalt i 1854 i Lille, er ingen trøst for heldige, men',
  'en arbejdsanvisning: Forbered opstillingen sådan, at tilfældet kan',
  'sige dig noget.',
  '',
  '**For det fjerde: Det, man forstår i sin årsagssammenhæng, kan man',
  'forebygge.** Og det er det egentlige bytte. Ikke behandlingen —',
  '**forebyggelsen**. Filtrere, opvarme, holde væk, dræbe, vaccinere.',
  '',
  'Denne tænkemåde har givet medicinen sine største sejre, og den har',
  'gjort den blind et sted, som vi selv navngiver, før andre gør det. **Vi',
  'forklarer patogenet. Vi forklarer ikke, hvorfor tre ud af ti mennesker,',
  'der indånder den samme kim, bliver syge og syv ikke.** For den gamle',
  'tænkemåde var netop det hovedspørgsmålet: menneskets tilstand, som kimen',
  'falder ned i. Vores samtidige Claude Bernard insisterede på det, og',
  'kemikeren Antoine Béchamp stillede os det samme spørgsmål i fjendtlig',
  'ånd.',
  '',
  '(Der cirkulerer i den forbindelse en sætning, som Pasteur skulle have',
  'sagt på dødslejet: kimen er intet, miljøet er alt. **Denne sætning er',
  'ikke dokumenteret** — den optræder i ingen samtidig kilde. Vi nævner',
  'den her, fordi den ofte citeres, og vi markerer den som det, den er:',
  'ubekræftet. Spørgsmålet bagved er alligevel berettiget.)',
  '',
  '## Det femte præparat: blodet fra et dødt får',
  '',
  'Fra 1877 lå noget andet under linsen: en dråbe blod fra et får, der var',
  'død af **miltbrand**. Deri, i stort tal, lange ubevægelige stave.',
  '',
  'Og her skylder vi ærlighed nummer to: **Vi var ikke de første.** En tysk',
  'landlæge ved navn Robert Koch havde i 1876 opklaret hele dette patogens',
  'livsforløb, inklusive de varige former, der overlever i jorden i',
  'årtier. Det forklarede, hvad bønderne kaldte „de forbandede agre":',
  'arealer, hvor kvæget igen og igen blev sygt. Vi har vist, hvordan',
  'sporerne fra dybet kommer op til overfladen igen — regnorme bringer dem',
  'op, når døde dyr er blevet gravet ned.',
  '',
  'Mellem Koch og os stod fra begyndelsen mere end et fagligt spørgsmål.',
  'Frankrig havde i 1871 tabt en krig mod Tyskland, og vi har, det er',
  'dokumenteret, haft vores del af ondskabsfuldheden. **Striden mellem to',
  'nationer om æren af en opdagelse har i årevis holdt sagen tilbage**, og',
  'begge sider brugte tid på at påvise hinandens fejl i stedet for at',
  'arbejde. Til ærens forsvar skal siges: Der kom alligevel noget ud af',
  'det. Modstanderens hårde prøvelse gjorde begge skoler bedre.',
  '',
  'Det egentlige fund kom så af en forsømmelse. Sommeren 1879 stod en',
  'kultur af **hønsekolerapatogenet** i skabet hen over ferien. Da man om',
  'efteråret gav den til hønsene, blev de kun let syge og kom sig. Man',
  'kunne have smidt den gamle kultur ud. Vi vaccinerede senere de samme',
  'dyr med frisk, fuld kultur — og de forblev raske, mens de øvrige høns',
  'døde.',
  '',
  '**Hvorfor svække i stedet for at dræbe?** Fordi et svækket patogen endnu',
  'lever og endnu — svagt — formerer sig. Det stiller kroppen en opgave,',
  'som den kan løse, men den stiller den for alvor. Kroppen lærer af en',
  'modstander, der ikke slår den ihjel. **Det er præcis Jenners tanke fra',
  'forrige kapitel — med en afgørende forskel: Jenner måtte vente, til',
  'naturen skænkede ham en mild slægtning, kokopperne. Vi kunne nu selv',
  'fremstille den milde form.** Af et lykketræf blev en metode; af én',
  'vaccination blev mange. Navnet har vi udtrykkeligt bevaret til ære for',
  'Jenner: vaccine, fra koen.',
  '',
  '## Forsøget i Pouilly-le-Fort, 5. maj til 2. juni 1881',
  '',
  'Påstande koster intet. Så vi stillede os til prøven — og det offentligt,',
  'i fuld form, på et gods ved Melun.',
  '',
  'Den var sat i værk af en dyrlæge ved navn Hippolyte Rossignol, der holdt',
  'os for blærehalse og derfor valgte betingelserne hårdt: tres dyr, får,',
  'dertil geder og kvæg. Den ene halvdel blev vaccineret den 5. og 17. maj,',
  'den anden ikke. Den 31. maj fik **alle** dyr en kraftig dosis levende',
  'miltbrandpatogener. Presse, landmænd og politikere blev indbudt til den',
  '2. juni.',
  '',
  'Den 2. juni stod de vaccinerede dyr på græsgangen og åd. De uvaccinerede',
  'var døde eller lå for døden. Nyheden gik verden rundt på få dage;',
  'inden for et år blev hundredtusindvis af får vaccineret i Frankrig. **Det',
  'var det mest overbevisende offentlige forsøg, medicinen hidtil havde',
  'set.**',
  '',
  'Og nu det, der i hundrede år ikke blev fortalt med.',
  '',
  '**Forsøget var iscenesat.** Ikke resultatet — det var ægte og er blevet',
  'bekræftet hundredvis af gange. Men den måde, det kom i stand på.',
  'Offentligt havde vi annonceret, at vi ville arbejde med en vaccine, der',
  'svækkes af ilt i luften — vores egen metode, som vi var stolte af. I',
  'Pouilly-le-Fort blev der brugt en anden: en vaccine behandlet med',
  'kaliumdichromat fra Chamberland og Roux’ hånd, som på det tidspunkt var',
  'mere pålidelig.',
  '',
  'Det står i laboratorienotesbøgerne. Videnskabshistorikeren **Gerald',
  'Geison** har bearbejdet og offentliggjort dem i 1995, efter at familien',
  'havde frigivet dem. **Vi har altså for hele verden vundet et forsøg og',
  'imens ikke sagt sandheden om et væsentligt punkt.** Det kan ikke',
  'forklares pænt, og vi forsøger ikke. Den, der i dag spotter over, at',
  'studier bliver pyntet på, og at resultater lyder bedre end deres',
  'grundlag, finder i denne juni 1881 et tidligt tilfælde — ikke hos en',
  'bedrager, men hos en mand, der havde ret og alligevel hjalp efter.',
  '',
  '## Det sjette præparat: rygmarven fra en kanin',
  '',
  'Det sidste præparat er det mærkeligste, for under linsen var der intet',
  'at se.',
  '',
  '**Rabies** er en sygdom, man i det 19. århundrede frygtede som intet',
  'andet — ikke på grund af antallet af døde (det var lille), men på grund',
  'af måden at dø på: Uger efter et bid begynder angst, kramper,',
  'vandskræk, lammelse. Den, der blev syg, døde, undtagelsesløst.',
  '',
  'Vi søgte efter patogenet og fandt det ikke. Ingen stav, ingen kugle,',
  'intet. I dag ved man hvorfor: Det er et virus, alt for lille til de',
  'tiders linser. **Vi har altså arbejdet med noget, vi aldrig har fået at',
  'se** — vi vidste kun, hvor det sidder: i nervevævet, i rygmarven, i',
  'hjernen.',
  '',
  'Metoden, som Roux og vi udviklede, var tilsvarende grov: Man tager',
  'rygmarven fra inficerede kaniner og hænger den i en kolbe over ætskali,',
  'hvor den langsomt tørrer. For hver dag med tørring mister den kraft.',
  'Fjorten dages tørring: næsten harmløst. Frisk: dødbringende. **Man',
  'vaccinerer med det ældste, svageste materiale og arbejder sig dag for',
  'dag frem til det friskere.** På hunde — omkring halvtreds — har det',
  'holdt: Behandlede dyr blev ikke syge, heller ikke når man inficerede dem',
  'derefter.',
  '',
  'Og her kommer omstændigheden, der gør rabies til dette kapitels',
  'grænsetilfælde. **Rabies er den eneste sygdom, hvor man kan vaccinere',
  'endnu efter smitten**, fordi virusset i ugevis vandrer langsomt langs',
  'nerverne, før det når hjernen. Vaccinen løber foran det ad blodvejen.',
  'Men det betyder også: Man behandler et menneske, der endnu ikke er sygt',
  'og måske aldrig ville være blevet sygt — ikke alle bidte bliver syge.',
  '',
  '## Den 6. juli 1885: en dreng fra Alsace',
  '',
  'Den mandag morgen stod en kvinde i laboratoriet, der havde rejst to dage',
  'og fire hundrede kilometer. Hos sig en dreng på ni år, **Joseph',
  'Meister** fra Meissengott i Alsace. Den 4. juli havde en gal hund kastet',
  'ham om på skolevejen og bidt ham fjorten gange, på hænder, ben og lår,',
  'dybt. En læge havde brændt sårene ud med karbolsyre og sagt til moderen,',
  'at der i Paris var én, der forsøgte noget på hunde.',
  '',
  'Det, der derefter skete, hører til medicinhistoriens mest kendte timer,',
  'og vi fortæller dem så præcist som muligt, fordi enkelthederne her er',
  'alt.',
  '',
  'Pasteur sendte bud efter to læger: **Alfred Vulpian** og **Jacques-Joseph',
  'Grancher**. De så på drengen og anså situationen for håbløs nok til at',
  'retfærdiggøre forsøget. Om aftenen den 6. juli begyndte behandlingen:',
  'tretten indsprøjtninger på ti dage, begyndende med femten dage tørret',
  'marv, sluttende med frisk, fuldt virksomt. **Sprøjterne satte Grancher,',
  'ikke Pasteur. For Pasteur måtte ikke: Jeg er kemiker, ikke læge** —',
  'uden lægeautorisation ville enhver egen indsprøjtning have været',
  'strafbar.',
  '',
  'Drengen forblev rask. Tre måneder senere blev en anden behandlet:',
  '**Jean-Baptiste Jupille**, en fjortenårig fårehyrdedreng fra Jura, der',
  'med bare hænder havde revet en gal hund væk fra yngre børn. Også han',
  'overlevede. Inden for et år kom over to tusind bidte til Paris, fra',
  'Rusland, fra Amerika, fra hele verden.',
  '',
  '## Hvad dette forsøg var — og hvad det ikke var',
  '',
  'Nu lægger vi vores egen handling under linsen. Den holder ikke stand i',
  'alle dele.',
  '',
  '**For det første: Der var ingen afprøvning på mennesker før dette',
  'menneske.** Metoden var afprøvet på hunde, ikke på personer. Om aftenen',
  'den 6. juli 1885 fik et niårigt barn sprøjtet et middel ind, som ingen',
  'vidste, hvordan en menneskekrop svarer på — og hvis sidste doser',
  'udtrykkeligt indeholdt **fuldt smitsomt materiale**. Var behandlingen',
  'slået fejl, ville man aldrig have kunnet sige, om hunden eller sprøjten',
  'havde slået drengen ihjel.',
  '',
  '**For det andet: Samtykket var ikke et i dagens forstand.** En desperat',
  'moder, der har rejst fire hundrede kilometer, fordi man sagde til hende,',
  'at dette var det eneste håb, beslutter ikke frit. Informationsblanketter,',
  'betænkningstid, et uafhængigt organ, der på forhånd prøver forsøget:',
  'intet af det fandtes. Det er ingen anklage mod tiden — disse indretninger',
  'fandtes ingen steder. Det er en konstatering af, hvad vores berømmelse',
  'er bygget på.',
  '',
  '**For det tredje: Vi har ikke fortalt alt.** Af laboratorienotesbøgerne,',
  'som Geison har bearbejdet, fremgår det, at Pasteur allerede før Joseph',
  'Meister havde behandlet to mennesker med rabiesmateriale uden at tale',
  'offentligt om det; en af de to tilfælde endte dødeligt. **Meister var i',
  'vores fremstilling det første menneske. I notesbøgerne var han det',
  'ikke.**',
  '',
  '**For det fjerde: Succesen beviser mindre, end den ser ud til.** Af',
  'hundred mennesker, som et rabiat dyr bider, bliver ikke hundred syge. Om',
  'Joseph Meister ville være blevet syg uden behandling, ved ingen. Først',
  'de mange tusind behandlede i de følgende år og sammenligningen med',
  'ubehandlede har vist, at metoden virker — **enkeltstående tilfælde, som',
  'legenden blev lavet af, kunne aldrig vise det.**',
  '',
  'Og det, der taler til vores fordel, siger vi også, så du kan veje begge',
  'dele. Alternativet var ikke forsigtighed mod vovemod. Alternativet var',
  'et barn med fjorten dybe bid mod en sygdom, der dengang **dræbte',
  'enhver**, som fik den. Vi inddrog to læger i stedet for at handle alene.',
  'Vi lod ikke drengen af syne: Joseph Meister arbejdede senere på',
  'instituttet, som portner. **Det gik godt. Det gør det ikke til et',
  'tilladt forsøg — det gør det til et vovestykke, der gik godt.** Disse to',
  'sætninger må man kunne holde ud at have ved siden af hinanden.',
  '',
  '(Om Meisters død i juni 1940 cirkulerer en dramatisk fortælling.',
  'Dokumenteret er: Han døde den 24. juni 1940, kort efter de tyske',
  'troppers indmarch i Paris, af egen hånd. Den udbredte begrundelse derfor',
  'er **ikke bekræftet**, og vi giver den derfor ikke igen.)',
  '',
  '## Huset, der blev bygget af donationer',
  '',
  'Efter rabies kom pengene — og de kom nedefra. Til et institut, hvor',
  'bidte skulle behandles og patogener forskes i, kom der en offentlig',
  'indsamling sammen: fra Frankrig, fra Rusland, fra Brasilien, fra sultanen',
  'af Det Osmanniske Rige, fra skoleklasser og arbejderforeninger. Den 14.',
  'november 1888 blev **Institut Pasteur** i Paris åbnet.',
  '',
  'Det var fra begyndelsen tænkt anderledes end et universitet: et hus,',
  'hvor der forskes, behandles og undervises, og hvor medarbejderne må',
  'blive. Fra dette hus kom i de følgende årtier serummet mod difteri',
  '(Roux), opdagelsen af pestpatogenet (Yersin), vaccinen mod tuberkulose',
  '(Calmette og Guérin) og Metschnikows arbejder om fagocytterne — de',
  'første svar på spørgsmålet om, **hvorfor** en vaccination overhovedet',
  'beskytter. Dette spørgsmål kunne vi selv ikke besvare.',
  '',
  'Pasteur døde den 28. september 1895. Han ligger i en gravhvælving i',
  'dette hus, ikke hundrede skridt fra laboratorierne.',
  '',
  '## Balancen under linsen',
  '',
  'Lad os gøre status, i begge retninger — så ærligt, som vi ville ved et',
  'præparat.',
  '',
  '**Det, der holder stand.** Kimteorien er den mest skæbnesvangre enkelte',
  'indsigt i medicinhistorien. På den står hygiejnen, antiseptikken og',
  'aseptikken i kirurgien, steriliseringen af instrumenter,',
  'vandbehandlingen, fødevarekontrollen, hele vaccineudviklingen og, et',
  'halvt århundrede senere, antibiotika. Modbevisningen af den spontane',
  'generering holder den dag i dag; svanehalskolberne er et forsøg, man kan',
  'bygge efter i enhver skole. Pasteuriseringen har reddet utallige liv —',
  'ikke gennem behandling, men ved at mælk holdt op med at overføre',
  'tuberkulose. Vaccinerne mod miltbrand og rabies var de første, der blev',
  '**lavet** i laboratoriet i stedet for fundet i naturen.',
  '',
  '**Hvor vores grænser ligger.** Vi var kemikere, ikke læger. Vi har',
  'forvandlet medicinen uden nogensinde at have skrevet en recept, og vi',
  'har derfor undervurderet noget af det, der tæller ved sygesengen. Vi',
  'hjalp efter i Pouilly-le-Fort og tav om det. Vi behandlede et barn med',
  'et middel, der aldrig før var afprøvet på et menneske, og glattede vejen',
  'dertil. Vi vandt en strid med taleren og ikke kun med kolben. Og vi lod',
  'os hylde — æresrækken, jubilæet i Sorbonne, monumentet i levende live.',
  '**En mand, der har ret, kan alligevel være forfængelig, og vi er ikke',
  'parat til at regne det ene op mod det andet.**',
  '',
  '**Det, der forbliver åbent.** Vores tænkemåde forklarer patogenet og',
  'ikke mennesket. Den siger, hvorfor et sår danner værk, men ikke, hvorfor',
  'den samme kim slår den ene ihjel og ikke rører den anden. Den egner sig',
  'fremragende til sygdomme, der kommer udefra — og dårligt til dem, som',
  'medicinen i dag har mest at gøre med: kræft, diabetes, gigt, udmattelse.',
  '**Vi har givet medicinen et værktøj, der er lavet til én slags sygdom,',
  'og den har længe forsøgt at bearbejde alle de andre med det.** At',
  'forskningen i dag igen spørger efter, hvad der udgør jorden, som en kim',
  'falder ned i — bakterierne i tarmen, forsvarsberedskabet, livsvilkårene',
  '— er ingen modbevisning af vores arbejde. Det er tilbagekomsten af et',
  'spørgsmål, som vi skubbede til side, fordi vi ikke kunne måle det.',
  '',
  '## Det præparat, vi ikke kunne lægge på objektglasset',
  '',
  'Tilbage står det ene, som vi skylder dig.',
  '',
  'I kapitel 11 i denne bog står en læge i Wien, der tæller det, ingen vil',
  'tælle: **Ignaz Semmelweis**, hvis barselspatienter døde, når læger',
  'undersøgte dem, og levede, når jordemødre gjorde det. Han fandt',
  'foranstaltningen — håndvask med klorkalk — og fik ret, og han kunne',
  'alligevel ikke overbevise nogen. **For han kunne ikke sige, HVAD der',
  'klæber ved hænderne.** Han kaldte det „nedbrudte organiske partikler".',
  'Det er ingen årsag, det er en formodning med fine ord.',
  '',
  'Det, vi har fundet i dette kapitel, er præcis svaret på hans spørgsmål.',
  'Der klæber noget levende ved disse hænder. Det har et navn, det formerer',
  'sig, det kan dræbes. **Semmelweis havde foranstaltningen uden',
  'forklaringen. Vi havde forklaringen uden den syge.**',
  '',
  'Sat sammen har en anden det, og han er dette kapitels anden stemme.',
  '**Den tilhører kirurgen Joseph Lister i Glasgow** — manden, der læste',
  'vores artikler om gæring og drog den eneste konsekvens, en kirurg kan',
  'drage af dem: Hvis sår ikke rådner af sig selv, men af noget, der falder',
  'nede i dem, så må man dræbe dette noget, før det når såret. Det gjorde',
  'han med karbolsyre, fra 1865, mod sine kollegers spot, og han lagde',
  'tallene frem: dødeligheden efter amputationer fra omkring femogfyrre til',
  'omkring femten ud af hundrede.',
  '',
  'Han vil også fortælle dig, hvad vi ikke lykkedes med. At hans metode var',
  'besværlig, og at syren irriterede sårene. At der skulle tredive år og en',
  'krig til, før London troede, hvad Glasgow havde vist. Og at det til',
  'sidst ikke var hans antiseptik, der vandt, men den tyske skoles aseptik:',
  'ikke dræbe kimene i såret, men slet ikke lukke dem ind.',
  '',
  '**Den egentlige begivenhed i dette kapitel er derfor ingen opdagelse,',
  'men en forbindelse:** en kemiker, der fandt årsagen, og en kirurg, der',
  'gjorde en handling ud af en årsag. De to mødtes først sent — i 1892, til',
  'en fest i Sorbonne, hvor en gammel mand med lammelse i den ene side gik',
  'en gammel kirurg fra Skotland i møde. **Det, der lå mellem dem, var ikke',
  'samtaler. Det var læste artikler.**',
  '',
  'Læg nu den anden stemme under linsen.',
].join('\n');

/**
 * Lister — klinikken. Det præparat, der ikke passede på objektglasset:
 * den syge. Kirurgen i Glasgow, der læste Pasteurs artikel, indførte
 * karbolsyren og sænkede dødeligheden efter amputationer fra næsten
 * halvdelen til en sjettedel.
 *
 * Skrevet af DeepSeek (runde 12, anden omgang). Også denne stemme
 * nævner selv de ubehagelige pletter på sin egen side (tillægsregel for
 * følsomme emner).
 */
const klinikkensStemme = [
  '## Det præparat, der ikke passede på objektglasset',
  '',
  'Laboratoriet har lagt sine præparater på bordet — roesaft, støv,',
  'flaskehals, silkeorm, fåreblod, rygmarv. Nu lægger klinikken sit ved',
  'siden af, og det er det eneste, der ikke passer under et glas: den',
  'syge. Han trækker vejret, han stønner, han har feber, han dør — og',
  'netop det er det præparat, medicinen handler om. Uden ham ville',
  'laboratoriet være en samling pæne billeder. Med ham bliver det til',
  'spørgsmålet: Hvad redder dette menneske?',
  '',
  '## Det første præparat fra Glasgow: tallene',
  '',
  'Glasgow, 1860’erne. Jeg er kirurg på Royal Infirmary og kender de tal,',
  'som ingen nævner med glæde: Af de mennesker, som jeg amputerer et ben',
  'på, dør næsten halvdelen. Ikke af min kniv — selve amputationen',
  'lykkes. De dør i dagene efter: såret danner værk, kroppen hæver,',
  'feberen stiger, og intet hjælper. Vi kirurger er blevet så vant til',
  'det, at vi kalder det „sårfeberen", som var det en skæbne som vejret.',
  'Vi skifter forbindinger uden at vaske hænder; vi syr med den samme',
  'tråd, som vi i går åbnede en byld med; vi opererer i de samme kitler,',
  'der er stive af blod og værk. Og vi spørger ikke hvorfor. Man spørger',
  'ikke til vejret.',
  '',
  '## Det andet præparat: en artikel fra Frankrig',
  '',
  'Så, i 1865, falder en artikel i mine hænder — af en kemiker i Paris,',
  'der beskæftiger sig med vin og silkeorme. Louis Pasteur har vist, at',
  'nedbrydning forårsages af levende væsner: usynlige kim, der er overalt,',
  'i luften, i støvet, på hænderne. Et sårs forrådnelse, tænkte jeg, er da',
  'præcis det: nedbrydning. Hvis kimene laver vinens gæring, laver de',
  'måske også sårets gæring — værkfeberen. Og hvis de kommer udefra, kan',
  'man holde dem ude — eller dræbe dem, før de trænger ind.',
  '',
  'Det var øjeblikket, hvor laboratoriet og klinikken rørte hinanden for',
  'første gang. Pasteur havde fundet årsagen uden nogensinde at se en syg.',
  'Jeg så de syge uden at kende årsagen. Sammen var vi fuldstændige.',
  '',
  '## Det tredje præparat: karbolsyren',
  '',
  'Jeg søgte et middel, der dræber kimene uden at dræbe den syge. Valget',
  'faldt på karbolsyre — et tjæreprodukt, som man dengang brugte til at',
  'rense spildevand. Jeg lod instrumenterne vaske i det, hænderne, såret,',
  'forbindingen. Kollegerne spottede over lugten, der trak gennem',
  'afdelingen; jeg lugtede den gerne, for den lugtede af liv. Tallene',
  'ændrede sig: På min afdeling døde efter amputationen i stedet for',
  'næsten halvdelen kun omkring en ud af seks. Jeg offentliggjorde',
  'tilfældene, ét efter ét, med alle tal — og verden så til, mens',
  'dødeligheden faldt.',
  '',
  '## Det fjerde præparat: spotten',
  '',
  'Verden så til — og lo. Antiseptikken blev i England i årevis',
  'latterliggjort: for besværlig, for dyr, for meget lugten af spildevand.',
  'Nogle kolleger forsøgte halvhjertet, sprang forbindingerne over,',
  'vaskede såret kun én gang — og når det så ikke virkede, var metoden',
  'skyld i det. I Tyskland lyttede man bedre; dér byggede kirurgien på',
  'mit arbejde. Jeg har aldrig skændtes, som Pasteur skændtes. Jeg',
  'leverede tal og ventede. Tallene vandt — langsommere, end jeg havde',
  'ønsket mig, men de vandt.',
  '',
  '## Hvor denne stemme selv svigter',
  '',
  'Nu de ubehagelige pletter — også klinikken har en regning at gøre op.',
  '',
  '**For det første: Karbolsyren var ikke det sidste svar.** Den dræbte',
  'kim — og den irriterede sårene, svækkede forsvaret, ætsede kirurgernes',
  'hænder. Da Robert Koch og hans elever viste, at man ikke behøver at',
  'dræbe kimene, men kan holde dem væk — aseptikken: alt sterilt, intet',
  'trænger ind —, var det den bedre metode. Jeg gjorde længe modstand mod',
  'aseptikken, fordi jeg forsvarede min antiseptik. Også det hører til',
  'sandheden: Manden, der lærte sterilitet, hang fast i sit',
  'desinfektionsmiddel, da fremtiden allerede hed noget andet.',
  '',
  '**For det andet: Spørgsmålet om, hvem der kom først, fik jeg aldrig',
  'helt afklaret.** Andre kirurger havde før mig forsøgt noget lignende —',
  'Semmelweis i Wien, som man lo ad, før jeg blev født. Jeg nævnte hans',
  'navn sent. Sandheden er: Jeg havde fordelen af at læse Pasteurs',
  'artikel; han havde kun sin egen observation. Berømmelsen gik til mig,',
  'fordi jeg havde beviset. Det er ikke altid retfærdigt.',
  '',
  '**For det tredje: Jeg var kirurg, ikke revolutionær.** Jeg besejrede',
  'sårinfektionen, men jeg ændrede ikke hospitalerne — hygiejnen,',
  'ventilationen, uddannelsen af sygeplejerskerne kom først efter mig.',
  'Den, der kun renser såret, men lader huset være beskidt, har gjort',
  'halvdelen af arbejdet.',
  '',
  '## Svar til laboratoriet',
  '',
  'Laboratoriet spurgte til sidst, hvad der skete med dets opdagelse, da',
  'den nåede klinikken. Denne stemmes svar: Den blev sat på prøve — på',
  'mennesker, der ikke spurgte, om de ville være forsøgspersoner, fordi',
  'de ikke havde noget valg. Kimteorien forvandlede kirurgien: fra',
  'håndværket med at skære til en videnskab om redning. De tal, vi siden',
  'når, ville være utænkelige uden Pasteurs linse — og linsen ville uden',
  'den syge kun være et legetøj. Laboratoriet finder sandheden. Klinikken',
  'redder mennesket. Først begge sammen er den medicin, som dette kapitel',
  'kan fejre — og spørgsmålet, om den også redder de fattige, der lå på',
  'bordene, forbliver åbent for de kapitler, der kommer.',
].join('\n');

/** Kapitel 13 i emnekortet. */
const pasteurLister = {
  id: 'pasteur-lister',
  titel: 'Pasteur og Lister',
  epoche: '~1860–1880',

  aufhaenger: {
    frage:
      'Hvad har vinflekker, silkeorme og en bidt dreng at gøre med den ' +
      'største vending i medicinen?',
    text: [
      'Alt. En kemiker i Frankrig skal finde ud af, hvorfor vin bliver sur,',
      'øl fordærves og silkeorme dør. Han finder overalt det samme: små',
      'levende væsner, der nedbryder noget. Og han drager den slutning, der',
      'vil forvandle medicinen — det, gæringen er for vinen, er sygdommen',
      'for mennesket.',
      '',
      'En kirurg i Glasgow læser hans artikler og begriber, hvad det',
      'betyder for hans operationsbord: Hvis sår ikke rådner af sig selv,',
      'men af noget, der falder ned fra luften, så må man dræbe dette',
      'noget. Fra 1865 vasker han sår og instrumenter med karbolsyre.',
      'Inden for få år falder dødeligheden efter amputationer på hans',
      'afdelinger fra næsten halvdelen til omkring en sjettedel.',
      '',
      'Dermed er spørgsmålet besvaret, som Ignaz Semmelweis tyve år',
      'tidligere havde stillet og ikke kunnet forklare: Hvad klæber ved',
      'lægernes hænder? Medicinen har fundet årsagen til sårinfektionen —',
      'og med den en ny tænkemåde. Sygdom er fra nu af ikke længere en',
      'forstyrret ligevægt, men en ubuden gæst med navn og skikkelse.',
      '',
      'Dette kapitel fortæller begge dele: triumfen — og hvad den kostede.',
      'Det offentlige forsøg fra 1881, der var mere omhyggeligt iscenesat,',
      'end det hed. Den første rabiesvaccination i 1885 på et niårigt barn,',
      'med et middel, der aldrig før var afprøvet på et menneske. Og',
      'grænsen for en tænkemåde, der forklarer patogenet, men ikke det',
      'menneske, som det rammer.',
    ].join('\n'),
  },

  karteHinweise: [
    {
      label: '1854–1864: gæringen og modbevisningen af den spontane generering',
      hinweis:
        'Louis Pasteur, kemiker, bliver i 1854 dekan i Lille — en by af ' +
        'brænderier. I 1856 beder fabrikanten Bigo ham om hjælp: Hans ' +
        'roealkohol bliver sur. Under mikroskopet finder Pasteur i de gode ' +
        'kar runde gærceller, i de fordærvede små stave. Gæringen er ' +
        'således ikke et henfald, men arbejdet af små levende væsner. ' +
        'Deraf bliver kimteorien — og dertil må læren om den spontane ' +
        'generering falde: I sit foredrag i Sorbonne den 7. april 1864 ' +
        'viser Pasteur svanehalskolberne, der lukker luft ind og holder ' +
        'støv tilbage. De forbliver klare.',
    },
    {
      label: '1865–1867: karbolsyren i Glasgow',
      hinweis:
        'Joseph Lister, professor i kirurgi på Glasgow Royal Infirmary, ' +
        'læser Pasteurs arbejder om gæring og drager den slutning, en ' +
        'kirurg kan drage: Hvis sår ikke rådner af sig selv, men af noget, ' +
        'der falder ned i dem, så må man dræbe dette noget. Fra august ' +
        '1865 behandler han åbne brud med karbolsyre. I 1867 ' +
        'offentliggør han resultaterne: Dødeligheden efter amputationer ' +
        'falder på hans afdelinger fra omkring 45 til omkring 15 procent. ' +
        'Tallene stammer fra sengene hos havne- og værftsarbejderne ved ' +
        'Clyde.',
    },
    {
      label: '1877–1881: vaccinerne og forsøget i Pouilly-le-Fort',
      hinweis:
        'I 1879 står en kultur af hønsekolerapatogenet i laboratoriet hen ' +
        'over sommeren; den gør ikke længere hønsene syge — og beskytter ' +
        'dem. Af denne tilfældighed bliver en metode: svække patogenet, ' +
        'derefter give det. Fra 5. maj til 2. juni 1881 prøver Pasteur den ' +
        'offentligt på godset i Pouilly-le-Fort ved Melun på får, geder og ' +
        'kvæg; presse og landmænd ser til. De vaccinerede dyr overlever ' +
        'miltbranden, de uvaccinerede dør. Senere viste hans notesbøger, at ' +
        'det ikke var den offentligt beskrevne vaccine, der blev brugt, ' +
        'men en anderledes fremstillet fra laboratoriet.',
    },
    {
      label: '1885: rabiesvaccinationen — Joseph Meister fra Alsace',
      hinweis:
        'Den 6. juli 1885 bringer en mor fra Meissengott i Alsace sin ' +
        'niårige søn Joseph Meister til Paris; en gal hund havde bidt ham ' +
        'mange gange to dage tidligere. Pasteur råder over en metode med ' +
        'tørret rygmarv fra inficerede kaniner, som er afprøvet på hunde, ' +
        'men aldrig på et menneske. Fordi han ikke er læge, sætter lægerne ' +
        'Vulpian og Grancher sprøjterne — tretten på ti dage. Drengen ' +
        'forbliver rask. I oktober følger fårehyrdedrengen Jean-Baptiste ' +
        'Jupille.',
    },
    {
      label: '1888–1900: Institut Pasteur og antiseptikken i Europa',
      hinweis:
        'Af donationer fra hele verden opstår Institut Pasteur i Paris; ' +
        'den 14. november 1888 bliver det åbnet. Lister tager i 1877 som ' +
        'professor til London på King’s College Hospital, hvor hans metode ' +
        'længst blev bestridt; i 1897 bliver han som den første læge i ' +
        'Storbritannien ophøjet i adelsstanden. På fastlandet udvikler ' +
        'Robert Kochs skole aseptikken ud af antiseptikken: I stedet for ' +
        'at dræbe kimene i såret holder man dem væk med damp, varme og ' +
        'kogte instrumenter.',
    },
  ],

  perspektiven: [
    {
      id: 'pasteur',
      name: 'Laboratoriets stemme',
      stimme: 'Opus',
      text: laboratorietsStemme,
    },
    {
      id: 'lister',
      name: 'Klinikkens stemme',
      stimme: 'DeepSeek',
      text: klinikkensStemme,
    },
  ],

  synthese: [
    '## Hvor de to stemmer mødes',
    '',
    'Først det fælles — og det er kernen i dette kapitel: Laboratoriet og',
    'klinikken havde brug for hinanden, selv om de aldrig mødtes. Pasteur',
    'fandt årsagen uden at se en syg; Lister så de syge uden at kende',
    'årsagen. Begge stiller observationen over meningen: Pasteur stoler på',
    'eksperimentet, Lister på tallene. Begge nævner de samme ubehagelige',
    'sandheder — den ene iscenesættelsen af Pouilly-le-Fort og',
    'rabiesvaccinationen af barnet, den anden sin egen modstand mod',
    'aseptikken og den sene indrømmelse over for Semmelweis. Og begge ved:',
    'Den vending, de har bevirket sammen, står på skuldrene af dem, der',
    'blev leet ad før dem.',
    '',
    '## Hvor de går fra hinanden',
    '',
    'Modsætningen begynder ved spørgsmålet om, hvad medicinen er. For',
    'laboratoriet er den en videnskab: et spørgsmål, et eksperiment, et',
    'bevis — sandheden kommer fra linsen. For klinikken er den en kunst ved',
    'sygesengen: Sandheden nytter intet, hvis den ikke når frem, hvis',
    'forbindingen ikke bliver skiftet, hvis den syge ikke stoler på det.',
    'Pasteur kunne have tænkt medicinen uden den syge; Lister ikke. Og de',
    'skændes om prisen: Laboratoriet ser fremskridtet — kimteorien,',
    'vaccinerne, redningen af millioner. Klinikken ser også omkostningerne:',
    'menneskene, der først blev afprøvet på, uden at spørge; de fattige,',
    'der lå på bordene; spørgsmålet, om fremskridtet tilhører alle eller',
    'kun dem, der kan betale for det.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'For tolvte gang det samme mønster — og nu bliver det til klimaks:',
    'Tænkemåden bestemmer metoden. Med Pasteur og Lister ender ligevægtens',
    'tænkemåders lange herredømme — loddet, kanalerne, qi, doshaerne,',
    'safterne. I stedet træder årsagens tænkemåde: Sygdommen har et',
    'patogen, patogenet har et svagt punkt, og medicinen kan finde og',
    'ramme det. Denne tænkemåde har forvandlet verden — og den har, som',
    'alle tænkemåder i denne bog, sin pris: Den ser kimen, men den mister',
    'let mennesket af syne; den måler succesen ved tallet, ikke ved',
    'erfaringen.',
    '',
    'Og dette kapitel lukker buen, der begyndte med Semmelweis: Manden fra',
    'Wien har set sandheden uden at kunne bevise den og er brudt sammen på',
    'det. Pasteur og Lister har givet den samme sandhed navn og tal — og',
    'blev helte. Den medicin, der nu begynder, er mægtigere end nogensinde:',
    'Den kan finde årsagen, holde såret rent, forudsige sygdommen. Om den',
    'med denne magt også bliver klogere, viser sig i de kapitler, der nu',
    'kommer — Röntgen og penicillin, statsliggørelsen, medicinalindustrien,',
    'og spørgsmålet om, hvem medicinen tilhører.',
  ].join('\n'),

  urteil: {
    frage:
      'Ville du betro dig til et middel, der aldrig er afprøvet på et ' +
      'menneske — hvis alternativet er den sikre død? Og ville du træffe ' +
      'denne beslutning også for dit barn?',
    hinweis: [
      'Der er her ikke noget rigtigt og noget forkert. Tag Joseph Meisters',
      'mors situation for dig: fjorten dybe bid, en sygdom, der dengang',
      'dræbte enhver, og en mand i Paris, der har forsøgt det på hunde.',
      'Spørg dig selv om to ting. For det første: Hvad skulle du vide, for',
      'at du samtykker — og hvem skulle sige dig det? For det andet:',
      'Ændrer dit svar sig, når faren er mindre? Ved sikker død beslutter',
      'de fleste mennesker anderledes end ved en risiko på én ud af tusind.',
      'Præcis derimellem ligger det spørgsmål, som medicinen den dag i dag',
      'hver gang skal besvare på ny.',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Hvad beskæftigede Louis Pasteur sig med, da han stødte på ' +
        'kimene?',
      antworten: [
        'Med operationer på tilskadekomne.',
        'Med gæringen — fordærvet vin, surt øl og syge silkeorme.',
        'Med opmåling af kranier.',
      ],
      richtig: 1,
      erklaerung:
        'Pasteur var kemiker, ikke læge. I 1856 bad en brænderiejer ham i ' +
        'Lille om hjælp, fordi hans roealkohol blev sur. Under mikroskopet ' +
        'fandt Pasteur i de gode kar gærceller, i de fordærvede små stave. ' +
        'Deraf blev tanken, der forvandlede medicinen: Det, gæringen er ' +
        'for vinen, er sygdommen for mennesket.',
    },
    {
      frage:
        'Hvad viste de berømte svanehalsflasker fra 1864?',
      antworten: [
        'At der i en kogt suppe ikke opstår liv af sig selv, så længe ' +
          'luftens støv ikke kommer ind.',
        'At luft forhindrer forrådnelse.',
        'At vin holder længere i bøjede flasker.',
      ],
      richtig: 0,
      erklaerung:
        'Den lange, bøjede hals lukkede luft ind, men holdt støvet tilbage ' +
        'i bøjningen: Den kogte suppe forblev klar i årevis. Brød man ' +
        'halsen af eller lod suppen røre bøjningen, blev den grumset ' +
        'inden for to dage. Dermed var læren om den spontane generering ' +
        'modbevist — og det var forudsætningen for, at kim kunne gælde ' +
        'som årsag til sygdom og ikke som deres følge.',
    },
    {
      frage:
        'Hvad skete der i maj og juni 1881 på godset Pouilly-le-Fort ved ' +
        'Melun?',
      antworten: [
        'Pasteur udførte den første operation under narkose.',
        'Et offentligt forsøg: Vaccinerede og uvaccinerede dyr fik ' +
          'miltbrandpatogener — de vaccinerede overlevede.',
        'Den franske regering forbød vaccination af husdyr.',
      ],
      richtig: 1,
      erklaerung:
        'Dyrlægen Hippolyte Rossignol, en tvivler, satte forsøget i værk: ' +
        'tres dyr, den ene halvdel vaccineret, den anden ikke, derefter en ' +
        'kraftig dosis miltbrandpatogener til alle. Den 2. juni stod de ' +
        'vaccinerede dyr, de uvaccinerede var døde. Succesen var ægte — ' +
        'notesbøgerne viser dog, at der blev brugt en anden vaccine end ' +
        'den offentligt annoncerede.',
    },
    {
      frage:
        'Hvorfor var det ikke Pasteur selv, der i 1885 satte sprøjterne ' +
        'på drengen Joseph Meister?',
      antworten: [
        'Fordi han på grund af sit slagtilfælde ikke kunne holde hånden ' +
          'rolig.',
        'Fordi han var kemiker og ikke havde lægeautorisation — lægerne ' +
          'Vulpian og Grancher behandlede.',
        'Fordi han frygtede en smitte.',
      ],
      richtig: 1,
      erklaerung:
        'Pasteur har aldrig studeret medicin; egne indsprøjtninger ville ' +
        'have været strafbare. Han inddrog lægerne Alfred Vulpian og ' +
        'Jacques-Joseph Grancher, og Grancher gav de tretten indsprøjtninger. ' +
        'Drengen var to dage tidligere blevet bidt fjorten gange af en gal ' +
        'hund. Midlet var afprøvet på omkring halvtreds hunde, aldrig før ' +
        'på et menneske.',
    },
    {
      frage:
        'Hvilket spørgsmål fra et tidligere kapitel besvarer kimteorien?',
      antworten: [
        'Hvorfor kredser blodet i kroppen?',
        'Hvorfor døde i Wien flere barselspatienter hos lægerne end hos ' +
          'jordemødrene?',
        'Hvorfor virker kinabark mod malaria?',
      ],
      richtig: 1,
      erklaerung:
        'Ignaz Semmelweis havde i 1847 fundet foranstaltningen — håndvask ' +
        'med klorkalk — og kunne ikke sige, hvad der klæber ved hænderne; ' +
        'han talte om „nedbrudte organiske partikler". Kimteorien leverede ' +
        'den manglende årsag: levende patogener. Joseph Lister drog deraf ' +
        'fra 1865 i Glasgow konsekvensen for operationsbordet og sænkede ' +
        'dødeligheden efter amputationer fra omkring 45 til omkring 15 ud ' +
        'af hundrede.',
    },
  ],
};

module.exports = pasteurLister;
