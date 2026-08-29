// Kapitel 7 — „Paracelsus og Vesal".
//
// Stationen, hvor den europæiske medicin holder op med at adlyde sine
// bøger. Mellem 1527 og 1543 sker der to ting, der intet har med
// hinanden at gøre og alligevel betyder det samme: En omrejsende læge
// kaster i Basel offentligt de gamle autoriteters værker på bålet, og
// en ung professor i Padua åbner lig og tegner det, han finder i dem —
// i stedet for det, der står i bogen.
//
// TÆNKEMÅDE-analysen er kapitelts hjerte (operatørens krav). Den spørger
// her: Hvilket verdensbillede ligger bag Paracelsus' kemi (Sal, Sulfur,
// Merkur)? Hvorfor brænder nogen bøger i stedet for at modbevise dem?
// Hvorfor skulle en urt bære sit tegn (signaturlæren)? Og hvorfor
// bliver spørgsmålet „Er midlet giftigt?" til spørgsmålet „Hvor meget
// af det?" — dosis-maksimen, som lægemiddellæren begynder med. Hertil
// den ærlige balance i begge retninger: hvad der holder, hvad der var
// en vildfarelse, og hvad der har skadet. Stemmen siger det selv
// (tillægsregel for følsomme emner i CLAUDE.md).
//
// LÆNGDEREGEL (operatørens feedback 24.08.2026): Kapitel 1–8 forbliver
// korte og tætte — hver synsvinkel højst ~250 linjer, kapitlet i alt
// højst ~600 linjer. Den første stemme her har omkring 220 linjer;
// resten giver Hermes plads til den anden stemme og den endelige
// syntese. Linjeantallet måles i tests/karte-paracelsus-vesal.mjs.
//
// Stemmer (runde 8): Den FØRSTE synsvinkel — Paracelsus som anklager —
// skrev Opus. Den ANDEN (Vesal, anatomen fra Bruxelles og professor i
// Padua: det stille brud i anatomi-teatret) og den endelige syntese
// tilføjede Hermes i anden omgang. Synsvinkel-workflow: CLAUDE.md.
//
// INGEN GENTAGELSER (operatørens beslutning af 21.08.2026): Kapitel 1
// inddeler efter „hvem der taler her → …", kapitel 2 begynder med en
// scene, kapitel 3 fortæller et døgn, kapitel 4 er en brevveksling,
// kapitel 5 en bogs rejse, kapitel 6 en rundtur i klosteret. Dette
// kapitel vælger den syvende dramaturgi: en PROCES. Afsnittene er
// stationerne i en forhandling — anklage, anklagerens person, tre
// beviser, krydsforhør, udestående dom. Retsbygningen er udtrykkeligt
// markeret som opdigtet: De to mænd mødte aldrig hinanden. Den anden
// stemme kan optræde som vidne i samme forhandling.
//
// Teksterne ligger som linje-arræer med `.join('\n')` — så forbliver de
// læsbare i repoet ved ~72 tegn (operatøren læser dem her imod), og
// utils/markdown.js gør i appen atter flydende tekst ud af dem.
//
// CommonJS uden UI-imports (arkitekturregel): kan kontrolleres med
// blank `node`.

/**
 * Paracelsus' stemme — anklageren i en opdigtet proces.
 *
 * Skrevet af Opus (runde 8). Den fortæller indefra: hvorfor de gamle
 * bøger brændte, hvorfor lægen hører til ved ovnen, hvorfor naturen
 * taler i tegn, og hvorfor dosis afgør mellem gift og lægemiddel — og
 * hvor denne tænkemåde nåede sin grænse. De ubehagelige steder nævner
 * den selv i stedet for at overlade dem til modstemmen.
 */
const stemmeParacelsus = [
  '## Anklagen',
  '',
  'Denne retssal har aldrig eksisteret. De to mænd, der taler her,',
  'den ene efter den anden, mødte aldrig hinanden: Den ene var en',
  'omrejsende læge uden fast bopæl, den anden en professor i Padua,',
  'enogtyve år yngre. De vidste intet om hinanden — og gjorde i samme',
  'årti det samme. Derfor er denne ret opfundet: så begge kan komme',
  'til orde.',
  '',
  'Jeg taler først. **Theophrastus Bombastus von Hohenheim**, sårlæge,',
  'søn af en bjergmand, landstryger; folk kalder mig **Paracelsus**. Og',
  'med det samme, så du ved, hvad du har med at gøre: **Det, du hører',
  'her, er min synsvinkel — en tænkemåde, ikke en sandhed.** Jeg var et',
  'stridslystent menneske og skældte ud, hvor jeg burde have undersøgt.',
  'Regn med det.',
  '',
  'Jeg anklager: **Galenos fra Pergamon**, død i tretten hundrede år,',
  'og med ham **Avicenna**, perseren — og med dem fakulteterne i',
  'Paris, Leipzig, Wien og Basel.',
  '',
  'Anklagen lyder ikke på, at disse mænd tog fejl. At tage fejl er',
  'ingen forbrydelse; jeg har taget mere fejl end de. Anklagen lyder:',
  '**Man har gjort deres bøger til en lov.** Den, der ville blive læge',
  'på et universitet, læste Galen, hørte forelæsninger om Galen og blev',
  'eksamineret i, om han kendte Galen. Det, der var at se ved den syge,',
  'skulle rette sig efter bogen. Stemte fundet ikke med bogen overens,',
  'så var fundet netop undtagelsen.',
  '',
  'På sankthansdag 1527 gav jeg foran universitetet i Basel disse',
  'bøger det, jeg anså for rigtigt: Jeg kastede dem i de studerendes',
  'bål. Hvad der præcis lå i flammerne, strides de lærde om den dag i',
  'dag; Avicennas „Kanon" sikkert. Det var en opførelse, og det vidste',
  'jeg. **Man brænder ikke vildfarelser, man modbeviser dem.** Jeg',
  'vender tilbage til det.',
  '',
  '## Anklagerens person',
  '',
  'Født omkring 1493 ved Einsiedeln i Schweiz, søn af en sårlæge, der',
  'var min første lærer. I 1502 flyttede min far til Villach i Kärnten',
  'og underviste på bjergskolen. Der voksede jeg op: mellem minegange,',
  'smelteovne og minearbejdere, der som fyrreårige ikke længere kunne',
  'ånde.',
  '',
  '**Det er begyndelsen på hele min tænkemåde.** Den, der ser, hvordan',
  'gråt malm i heden bliver til metal, tror ikke længere på, at verden',
  'består af fire safter. Han ser: Tingene har bestanddele, og med ild',
  'kan de adskilles. Og han ser endnu noget: Minearbejdernes sygdom',
  'kommer ikke indefra. Den kommer fra minegangen.',
  '',
  'Jeg studerede i Italien, formentlig i Ferrara. Hvor præcis, og om',
  'jeg virkelig tog doktorgraden, bestrider mine modstandere den dag i',
  'dag — de har hængt mig i det hele mit liv. Derefter rejste jeg i',
  'årtier gennem landene: feltskær i krige, gæst hos badere,',
  'jordemødre, skarprettere, minearbejdere og gamle kvinder, der',
  'kendte deres urter.',
  '',
  '**Hvorfor hos dem og ikke på fakulteterne?** Fordi de syge lå der.',
  'En bog gentager, hvad en anden bog siger; en bader har set tusind',
  'sår. Jeg har sagt det hårdt: Universiteterne lærer ikke alt, lægen',
  'må også gå til de gamle kvinder. **Erfaringen er læremesteren** —',
  'ikke Aristoteles, ikke Galen og heller ikke jeg.',
  '',
  '1527 så Basel. Jeg havde behandlet bogtrykkeren Johannes Frobens',
  'syge ben, som andre ville have amputeret; han beholdt det. Sådan',
  'blev jeg bylæge, og byen tillod mig at læse på universitetet. Jeg',
  'læste **på tysk** i stedet for latin og lukkede alle ind, der ville',
  '— også badere og sårlæger, der ikke kunne latin. For fakultetet var',
  'det ingen nyskabelse, men en uforskammethed.',
  '',
  'Det varede ikke et år. En domherre, som jeg havde behandlet, ville',
  'ikke betale det aftalte honorar; retten gav ham medhold, jeg svarede',
  'med smædeskrifter — og flygtede i begyndelsen af 1528 om natten ud',
  'af byen. Siden havde jeg aldrig igen et embede.',
  '',
  '## Bevis nummer ét: ovnen',
  '',
  'Jeg fremlægger det første bevis: en smelteovn.',
  '',
  'Skolen lærer: Mennesket er en blanding af fire safter, og sygt er',
  'det, når en af dem tager over. Så årelader man, udrenser, køler og',
  'varmer, indtil ligevægten igen passer.',
  '',
  'Jeg siger: **Verden er ikke bygget af safter, men af tre principper',
  '— Sal, Sulfur og Merkur**, altså salt, svovl og kviksølv. Kast et',
  'stykke træ i ilden: Det, der brænder, er sulfur; det, der slipper',
  'ud som røg, er merkur; det, der bliver tilbage som aske, er sal.',
  'Det brændbare, det flygtige, det faste — deraf er alting bygget,',
  'også legemet.',
  '',
  '**Hvorfor netop disse tre og ikke de fire safter?** Fordi jeg kan',
  'vise dem. Saftene er en påstand; ovnen er et forsøg. Det, der sker',
  'i ilden, sker for dine øjne — og i morgen igen.',
  '',
  'Deraf følger min anden sætning, og den er den vigtigste: **En',
  'sygdom er ikke en uligevægt, men en ting, der kommer udefra og har',
  'sit eget sæde.** Bjergsygen sidder i lungerne og kommer fra',
  'minegangen. Men hvis hver sygdom har sin egen årsag, så behøver den',
  'også **sin egen medicin** — og ikke den altid samme åreladning til',
  'alt.',
  '',
  '**Hvorfor så ovnen og ikke urtegården?** Fordi det virksomme i',
  'planten ligger skjult, ligesom metallet i malmen. Alkymisten',
  'adskiller det rene fra det urene — ikke for at lave guld, det er',
  'narrestreger, men for at lave medicin. **Lægen er kemiker.** Derfor',
  'arbejdede jeg med metaller og mineraler, hvor andre kun kendte',
  'urter: kviksølv, antimon, jern, svovl, zinken, som jeg gav dens',
  'navn, og valmueekstrakten, som jeg kaldte laudanum.',
  '',
  '**Det er den del af min anklage, der holdt.** Ud af dette værksted',
  'er apoteket blevet til, og ud af apoteket lægemiddellæren. Den, der',
  'i dag udvinder et aktivt stof fra en plante, gør det, jeg forsøgte',
  'ved ovnen — bare bedre.',
  '',
  '## Bevis nummer to: naturens tegn',
  '',
  'Nu det stykke, hvor jeg tog allermest fejl. Jeg lægger det',
  'alligevel frem, for uden det forstår du ikke min tænkemåde.',
  '',
  '**Hvorfor skulle overhovedet nogen urt helbrede noget?**',
  'Spørgsmålet er ment alvorligt: Der findes tusind planter — hvorfra',
  'ved lægen, hvilken? Mit svar var **signaturen**. Gud har indrettet',
  'verden for mennesket og skrevet hver medicin sit tegn på ydersiden;',
  'den, der kan læse, finder det.',
  '',
  'Svaleurten fører en gul saft — altså mod gulsot og galde. Lungeurten',
  'bærer pletter som en lunge — altså mod hosten. Valnødden ligner en',
  'hjerne i sin skal — altså for hovedet. **Skabelsen taler i tegn, og',
  'lægekunsten er kunsten at læse dem.**',
  '',
  'Forstår du, hvorfor det dengang lød fornuftigt? Det gjorde naturen',
  'til en bog, som enhver kunne slå op i, også den, der ikke kunne',
  'latin. Det satte noget i stedet for autoriteten, som enhver selv',
  'måtte efterprøve. Det var, efter min fornemmelse, frihed.',
  '',
  '**Og det var forkert.** Farven på en saft siger intet om dens',
  'virkning. Svaleurten hjælper ikke leveren — den kan skade den.',
  'Signaturlæren har i generationer gjort helbredere sikre, hvor de',
  'skulle have undersøgt; det er et system, der har et svar på ethvert',
  'spørgsmål og derfor intet giver. **Jeg angreb den ene autoritet og',
  'satte en anden i dens sted: mig selv.**',
  '',
  '## Bevis nummer tre: dosis',
  '',
  'Det sidste bevis er en sætning. Den stammer fra et skrift, hvor jeg',
  'forsvarede mig mod beskyldningen om, at jeg forgiftede mine syge:',
  '',
  '> Alle ting er gift, og intet er uden gift; alene dosis gør,',
  '> at en ting ikke er gift.',
  '',
  '**Hvorfor måtte jeg skrive det?** På grund af franskmandsygen, som',
  'man i dag kalder syfilis. Den rasede som en ild, og der var to',
  'behandlinger. Den ene var guajaktræet fra Vestindien: mildt, meget',
  'dyrt og uden virkning — og handelen med det lå hos et af Europas',
  'rigeste handelshuse. Den anden var kviksølv, som virkede og i de',
  'sædvanlige mængder slog folk ihjel: spytflåd, tabte tænder,',
  'ødelagte nyrer.',
  '',
  'Mit svar var ikke at forbyde giften, men at **måle** den: små doser,',
  'taget ind, nøje afmålt. Dermed bliver spørgsmålet „Er dette middel',
  'giftigt?" til spørgsmålet „Hvor meget?" — og det er begyndelsen på',
  'lægemiddellæren. Enhver indlægsseddel, du læser i dag, bygger på',
  'den sætning.',
  '',
  'Hvad det bragte mig, hører med til historien: Min bog om',
  'franskmandsygen blev i 1530 standset i Nürnberg, efter foranledning',
  'af Leipzig-fakultetet. **Striden var aldrig kun en strid om',
  'sygdomme. Den handlede også om embeder, bøger og penge.**',
  '',
  'Et stykke lægger jeg endnu til, fordi det er det, jeg holder mest',
  'af: I 1534 skrev jeg i Kärnten „Von der Bergsucht" om',
  'minearbejdernes lunger. Før havde ingen spurgt, om arbejdet selv',
  'gør syg. **Det var det første skrift om en erhvervssygdom** — og det',
  'kom ikke fra et bibliotek, men fra en minegang.',
  '',
  '## Krydsforhøret: hvad der taler imod mig',
  '',
  'En anklager, der ikke selv lader sig forhøre, duer ikke. Så her er',
  'modregnskabet, og jeg gør det ærligt.',
  '',
  '**Jeg har revet mere ned, end jeg har bygget op.** At brænde Galen',
  'var let; at sætte noget prøvbart i hans sted lykkedes ikke for mig.',
  'Mine tre principper kan bevises lige så lidt som de fire safter,',
  'som jeg lo ad.',
  '',
  '**Mine skrifter er et vildnis.** Ved siden af ovnen står',
  'himmellegemerne, elementernes ånder, en indre alkymist, som jeg',
  'kaldte Archeus, og ord, som jeg selv har opfundet. Den, der læser',
  'mig, finder på samme side en klog iagttagelse og en besværgelse —',
  'og kan ikke holde de to fra hinanden. Hovedparten af mine værker',
  'udkom først årtier efter min død; hvad deraf virkelig stammer fra',
  'mig, strides de lærde om den dag i dag.',
  '',
  '**Min tone har skadet mig mere end mine modstandere.** Jeg skældte',
  'doktorerne offentligt ud som snakkehoveder og skrev om de „Herren',
  'von Hohlschädel" — herrerne med de hule kranier. Den, der taler',
  'sådan, bliver ikke modbevist — han bliver ikke længere inviteret.',
  'Jeg havde ingen skole, intet professorat og ingen elever af',
  'betydning. Jeg døde i 1541 på en kro i Salzburg, otteogfyrre år',
  'gammel, uden embede.',
  '',
  '**Og mine lægemidler har dræbt.** Kviksølv dræber også i små doser,',
  'hvis man giver det længe; det vidste jeg ikke. Antimon blev efter',
  'min tid solgt som mirakelmiddel, indtil Paris forbød det. **Jeg',
  'gjorde dosis til en regel og kendte alligevel ikke dens grænse.**',
  '',
  'Der er stadig bålet i Basel. Det gjorde mig berømt og skadede min',
  'sag. **Autoriteten knækkede ikke på, at én brændte dens bøger.**',
  'Den knækkede på, at nogen gik og så efter.',
  '',
  '## Dommen er ikke afsagt',
  '',
  'For mens jeg lavede ild i Basel, sad en dreng i Leuven over sine',
  'bøger, en dreng jeg aldrig lærte at kende: **Andreas Vesal**, født',
  'i 1514 i Bruxelles, fra en familie af hofmedici og apotekere — alt',
  'det, jeg ikke var. Som treogtyveårig havde han et professorat i',
  'Padua.',
  '',
  'Han gjorde noget, som aldrig var faldet mig ind. Han holdt ingen',
  'tale mod Galen. Han steg ned fra katederet, tog selv kniven,',
  'åbnede legemet og **så efter** — og skrev punkt for punkt op, hvor',
  'Galen havde beskrevet noget andet, end det, der findes i mennesket.',
  'I 1543 udkom hans værk „De humani corporis fabrica", syv bøger med',
  'billeder, som ingen havde set magen til.',
  '',
  'Og nu den sætning, som jeg må synke: **Den blev trykt i Basel, hos',
  'Johannes Oporinus — den unge mand, der i 1527 havde lagt kul på',
  'ovnen for mig.** Vores veje krydsede aldrig hinanden. Vores bøger',
  'lå i det samme værksted.',
  '',
  'Hvem af os to, der virkelig væltede autoriteten — den, der råbte,',
  'eller den, der så efter — det afgør jeg ikke. Dertil må det andet',
  'vidne høres. **Dette kapitels anden stemme tilhører ham: anatomen',
  'fra Padua.**',
].join('\n');

/**
 * Vesal — vidnet i processen mod autoriteten. Anatomen fra Bruxelles,
 * professor i Padua: manden, der modbeviste autoriteten ved at se
 * efter — det stille brud i anatomi-teatret.
 *
 * Skrevet af DeepSeek (runde 8, anden omgang). Også denne stemme
 * nævner selv sin egen sides ubehagelige pletter (tillægsregel for
 * følsomme emner).
 */
const stemmeVesal = [
  '## Vidnet kaldes frem',
  '',
  'Anklageren har talt højt og brændt bøger. Nu træder en anden mand',
  'frem for retten: stille, i sort professorkappe, med røde hænder —',
  'af sæbe og ligvoks. Han hedder Andreas Vesal, er som trediveårig',
  'professor i Padua og har netop fuldendt en bog, der viser',
  'menneskets anatomi, som den er — ikke som Galen beskrev den.',
  'Anklageren har skældt autoriteten ud. Dette vidne har modbevist',
  'den. Det er ikke det samme.',
  '',
  '## Vidneforklaring: anatomiens teater',
  '',
  'Jeg beder retten forestille sig et teater. I Padua står et',
  'trætårn, i hvis midte der ligger et bord. På bordet ligger et',
  'legeme — et menneske, ikke en abe, ikke et svin. Omkring bordet',
  'sidder de studerende i rækker, og jeg står imellem, ikke som',
  'forelæser, men som håndværker: Jeg skærer selv. Det var det',
  'skandaløse. Hidtil læste professoren højt fra Galen, mens en',
  'hjælper der nede dissekerede, og professoren så aldrig ned. Jeg',
  'lagde Galen til side og spurgte liget.',
  '',
  'Galen har aldrig åbnet et menneske. Han har dissekeret aber og svin',
  'og overført resultatet på mennesket — en byggeplan, der blev',
  'afprøvet på den forkerte model. Det vidste jeg, da jeg studerede i',
  'Paris, og ingen ville høre på det. I Padua viste jeg det:',
  'Menneskets underkæbe er én knogle, ikke to. Brystbenet har tre',
  'dele, ikke syv. Leveren har ikke fem lapper. Galen tog fejl — på',
  'hvert andet punkt, hvor det kan efterprøves.',
  '',
  '## Vidneforklaring: hvorfor jeg ikke brændte, men tegnede',
  '',
  'Anklageren har kastet Galens bøger på bålet. Jeg brændte ham ikke —',
  'jeg erstattede ham. I syv år har jeg åbnet lig, tegnet, stukket og',
  'trykt: „Fabrica", den store bog om menneskekroppens bygning, trykt',
  'i 1543 i Basel — netop hos Johannes Oporinus, der engang havde',
  'tjent anklageren som skriver. Verden er lille, og trykpressen gør',
  'en modbevisning til allemandseje. Anklagerens bål brændte én aften.',
  'Mine kobberplader rejser over Alperne og trykker sandheden i tusind',
  'eksemplarer.',
  '',
  'Og her ligger den forskel, som jeg vil forelægge retten:',
  'Autoriteten knækkede ikke på, at én brændte dens bøger. Den',
  'knækkede på, at nogen gik og så efter — og tegnede resultatet så',
  'nøje, at ingen længere kunne se bort. Anklageren lavede stormen.',
  'Jeg lavede lyset.',
  '',
  '## Krydsforhøret: hvad der også taler imod mig',
  '',
  'Anklageren blev taget i krydsforhør; jeg tager mig selv i det, for',
  'også dette vidne har sine skygger.',
  '',
  '**For det første: Jeg tog fejl — også jeg.** Fabrica er et',
  'mesterværk i anatomi og alligevel fuld af fejl: Jeg beskrev blodets',
  'strømning forkert, misforstod hjertet og tegnede karrene til dels,',
  'som Galen så dem, ikke som de er. Man ser ikke alting på én gang.',
  'Den, der åbner et nyt vindue, ser først kun et udsnit.',
  '',
  '**For det andet: Anatomien er ikke sygdommen.** Jeg forstod det',
  'døde legeme — men den levende er mere end sin bygning. En kirurg,',
  'der kan sin anatomi, er endnu ingen læge. Det fakultet, som jeg',
  'foragtede, vidste noget, som min kniv ikke viser: det syge',
  'menneske. Jeg blev senere hofmedicus og helbredte, så godt jeg',
  'kunne — med midler, som jeg ikke har lært i noget anatomi-teater.',
  '',
  '**For det tredje: Berømmelsen kom før grundigheden.** Jeg var ung,',
  'hurtig og forfængelig. De store tavler i Fabrica er også kulisser —',
  'skeletter, der poserer, landskaber i baggrunden. Noget af det var',
  'videnskab, noget var teater. Og da modstanden mod min bog voksede,',
  'blev jeg ikke i Padua for at kæmpe; jeg gik til kejserhoffet.',
  'Vidnet, der viste sandheden, trak sig tilbage, da det gjaldt om at',
  'forsvare den.',
  '',
  '## Plæderingen: dommen',
  '',
  'Anklageren sagde til sidst, at dommen ikke er afsagt. Som vidne',
  'forelægger jeg den for retten: Begge havde ret — stormen og lyset.',
  'Uden stormen ville ingen have lyttet; uden lyset ville ingen have',
  'set. Anklageren havde modet til at fornærme autoriteten; jeg havde',
  'umagen med at erstatte den. Medicinen havde brug for begge dele:',
  'den, der brændte de gamle bøger, og den, der trykte nye. Dommen',
  'lyder ikke: Hvem af de to vandt? Den lyder: Hvad skal der',
  'fortsættes med? Og svaret står i Padua: med kniven, øjet og pressen',
  '— og med det spørgsmål, som anklageren altid stillede.',
].join('\n');

/** Kapitel 7 i temalandkortet. */
const paracelsusVesal = {
  id: 'paracelsus-vesal',
  titel: 'Paracelsus og Vesal',
  epoche: '16. århundrede',

  aufhaenger: {
    frage: 'Hvad sker der, når to mænd holder op med at frygte autoriteten?',
    text: [
      'I tretten hundrede år havde man i Europa fastlagt, hvad en læge',
      'skulle vide: Galen havde skrevet det ned, Avicenna havde ordnet',
      'det, universiteterne kontrollerede det. Den, der så noget andet',
      'end det, der stod i bogen, havde formentlig taget fejl.',
      '',
      'Så sker der inden for få år to ting. I Basel kaster en',
      'omrejsende læge i 1527 de gamle mestres værker på ilden, læser',
      'på tysk i stedet for latin og hævder, at erfaringen er',
      'læremesteren: Paracelsus. Og i Padua stiger en ung professor ned',
      'fra katederet, tager selv kniven og tegner op, hvad han virkelig',
      'finder i den åbnede krop: Andreas Vesal. I 1543 udkommer hans',
      'anatomi-værk — trykt netop i Basel.',
      '',
      'De to mødte aldrig hinanden og var så forskellige, som to',
      'mennesker kan være: den højlydte outsider og den præcise',
      'professor. Dette kapitel spørger, hvad de egentlig angreb, hvad',
      'de satte i stedet — og hvad der er blevet tilbage af begge dele.',
    ].join('\n'),
  },

  // Kortet ligger i karten/paracelsus-vesal.js — her er kun fasernes
  // henvisninger oversat (phasen → karteHinweise), ikke selve kortet.
  karteHinweise: [
    {
      label: '1493–1524: Einsiedeln, Villach og vandreårene',
      hinweis:
        'Ved Einsiedeln i Schweiz fødes omkring 1493 Theophrastus ' +
        'Bombastus von Hohenheim, søn af en sårlæge. I 1502 flytter ' +
        'familien til Villach i Kärnten, hvor faderen underviser på ' +
        'bjergskolen — dér lærer drengen metallerne, ovnene og ' +
        'minearbejdernes sygdomme at kende. Derefter rejser han i årevis ' +
        'rundt i Europa og lærer hos badere, jordemødre, sårlæger og ' +
        'minearbejdere i stedet for på fakulteterne.',
    },
    {
      label: '1527: Basel — bogbrændingen',
      hinweis:
        'Efter at have behandlet bogtrykkeren Johannes Frobens ben ' +
        'bliver Paracelsus i 1527 bylæge i Basel og læser på ' +
        'universitetet — på tysk i stedet for latin, og for enhver, der ' +
        'vil komme. På sankthansdag kaster han de gamle autoriteters ' +
        'bøger i de studerendes ild. Et skænderi om et honorar bringer ' +
        'ham for retten; i begyndelsen af 1528 må han forlade byen i en ' +
        'fart.',
    },
    {
      label: '1528–1541: de sene år frem til Salzburg',
      hinweis:
        'Efter flugten fra Basel står Paracelsus uden embede. I ' +
        'Nürnberg standses hans bog om franskmandsygen i 1530 efter ' +
        'foranledning af Leipzig-fakultetet. I 1534 skriver han i ' +
        'Kärnten om bjergsygen — det første skrift om en erhvervssygdom. ' +
        'Den 24. september 1541 dør han i Salzburg, omkring ' +
        'otteogfyrre år gammel. Hovedparten af hans værker udkommer ' +
        'først årtier efter hans død.',
    },
    {
      label: '1543: Padua og Basel — „Fabrica" udkommer',
      hinweis:
        'Andreas Vesal, født i 1514 i Bruxelles, underviser siden 1537 ' +
        'i Padua og dissekerer dér selv i stedet for at lade andre læse ' +
        'højt. I 1543 udkommer hans anatomi-værk „De humani corporis ' +
        'fabrica" — trykt i Basel af Johannes Oporinus, der seksten år ' +
        'tidligere havde været Paracelsus\' hjælper. De to mænd mødte ' +
        'aldrig hinanden; deres veje mødes kun i dette trykkeri.',
    },
  ],

  perspektiven: [
    {
      id: 'paracelsus',
      name: 'Paracelsus\' stemme',
      stimme: 'Opus',
      text: stemmeParacelsus,
    },
    {
      id: 'vesal',
      name: 'Vesals stemme',
      stimme: 'DeepSeek',
      text: stemmeVesal,
    },
  ],

  synthese: [
    '## Hvor de to stemmer mødes',
    '',
    'Først det fælles. Anklageren og vidnet har aldrig talt med',
    'hinanden — og siger dog i kernen det samme: De gamle bøgers',
    'autoritet er brudt. Paracelsus brændte den, Vesal erstattede den;',
    'begge lagde Galen bag sig, begge underviste ud fra egen',
    'iagttagelse, begge satte erfaringen over citatet. Og begge',
    'indrømmer, at deres eget værk var fejlbehæftet: Den ene kalder',
    'sine skrifter et vildnis, den anden bekender, at han tog fejl.',
    'Selv skæbnen binder dem sammen: Begge fejlede på universiteterne,',
    'begge endte som hofmedici — og begge er gået ud i verden ad samme',
    'vej, gennem Oporinus, bogtrykkeren fra Basel: som trykte bøger.',
    '',
    '## Hvor de skilles',
    '',
    'Modsætningen begynder ved spørgsmålet om, hvordan man bryder',
    'autoriteten. For Paracelsus er det en modig handling: de gamle',
    'bøger brænde offentligt, undervise på tysk, fornærme fakultetet —',
    'stormen, der renser luften. For Vesal er det et arbejde: i årevis',
    'dissekere, tegne, trykke — lyset, der gør mørket overflødigt. Den',
    'ene vinder ved at ødelægge; den anden ved at bygge op. Og de',
    'strides om kilden til viden: Paracelsus læser i naturen og i',
    'skabningens tegn, Vesal læser i kroppen selv. Begge kalder det',
    'erfaring — og mener noget forskelligt: den ene verdens',
    'fortolkning, den anden målingen af mennesket.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'For ottende gang samme mønster — og for første gang vender det sig',
    'mod fremtiden: Tænkemåden bestemmer metoden. De tidlige tænkemåder',
    'spurgte til ligevægten (lod, kanaler, qi, doshaer, safter); nu',
    'spørger to mænd til erfaringen — og dermed begynder den tænkemåde,',
    'som den moderne medicin vokser ud af: ikke autoriteten, ikke',
    'ligevægten, men det at se efter.',
    '',
    'Og dette kapitel viser svaret på det spørgsmål, det selv stillede:',
    'Hvem skriver medicinens historie — den højlydte eller den',
    'grundige? Syntesens svar: Begge. Stormen uden lys er tom; lyset',
    'uden storm bliver ikke set. Medicinen har brug for den, der',
    'brænder de gamle bøger, og den, der trykker nye — og den har brug',
    'for den næste, som ikke kun åbner det døde legeme, men spørger den',
    'levende: Hvordan bevæger blodet sig? Hans navn er Harvey — og hans',
    'kapitel kommer som det næste.',
  ].join('\n'),

  urteil: {
    frage:
      'Hvad står dig nærmest — den højlydte rebel, der kaster de gamle ' +
      'bøger på ilden, eller den stille forsker, der bare går og ser ' +
      'efter?',
    hinweis: [
      'Der er ikke noget rigtigt eller forkert her. Tænk på, hvad begge',
      'dele udretter: Rebellen skaffer spørgsmålet et publikum, men',
      'leverer ofte ingen erstatning — Paracelsus bragte ovnen ind i',
      'medicinen og samtidig signaturlæren. Den grundige leverer',
      'erstatningen, men der kan gå årtier, før nogen gider se efter —',
      'Vesals billeder skulle først trykkes, før de kunne virke. Tænk',
      'også på i dag: Den, der sætter spørgsmålstegn ved en gængs',
      'behandling, må kunne begge dele — være højlydt nok til at blive',
      'hørt og præcis nok til at få ret. Hvad tror du, du er bedst til?',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'Hvad skete der i 1527 i Basel?',
      antworten: [
        'Paracelsus blev valgt til rektor for universitetet.',
        'Paracelsus brændte offentligt de gamle autoriteters bøger.',
        'Vesal holdt der sin første offentlige sektion.',
      ],
      richtig: 1,
      erklaerung:
        'Paracelsus var bylæge i Basel i 1527 og måtte læse på ' +
        'universitetet — på tysk i stedet for latin. På sankthansdag ' +
        'kastede han de gamle autoriteters værker, deriblandt ' +
        'Avicennas „Kanon", i de studerendes bål. Efter et tabt ' +
        'skænderi om et honorar måtte han forlade byen i begyndelsen ' +
        'af 1528.',
    },
    {
      frage: 'Hvad siger Paracelsus\' dosis-maksime?',
      antworten: [
        'Kun naturlige midler er ufarlige.',
        'Jo mere fortyndet et middel er, desto stærkere virker det.',
        'Alt er gift — kun mængden afgør, om noget er giftigt.',
      ],
      richtig: 2,
      erklaerung:
        '„Alle ting er gift, og intet er uden gift; alene dosis gør, ' +
        'at en ting ikke er gift." Sætningen stammer fra et ' +
        'forsvarsskrift fra 1538 og gælder den dag i dag som grundregel ' +
        'i lægemiddellæren: Det er ikke stoffet alene, der afgør ' +
        'virkning eller skade, men mængden.',
    },
    {
      frage: 'Hvad er signaturlæren?',
      antworten: [
        'Antagelsen om, at naturen viser på en plantes ydre, hvad den ' +
          'er god til.',
        'Lægens pligt til at underskrive hver recept med egen hånd.',
        'En metode til at sortere lægemidler efter vægt.',
      ],
      richtig: 0,
      erklaerung:
        'Ifølge denne forestilling har skabelsen givet hvert lægemiddel ' +
        'et tegn: svaleurten med sin gule saft mod gulsot, den ' +
        'plettede lungeurt mod hoste, valnødden for hovedet. Paracelsus ' +
        'forfægtede den med eftertryk. Den holder ikke til prøven — ' +
        'udseende og virkning har intet med hinanden at gøre.',
    },
    {
      frage: 'Hvad adskilte Vesals anatomi-undervisning?',
      antworten: [
        'Han undlod helt at sektionere og arbejdede kun med modeller.',
        'Han dissekerede selv i stedet for at lade andre forelæse fra ' +
          'katederet.',
        'Han lod udelukkende dyr åbne, fordi det var tilladt.',
      ],
      richtig: 1,
      erklaerung:
        'Det var sædvanen, at professoren læste højt fra Galen på ' +
        'katederet, mens en bader åbnede kroppen, og en hjælper pegede ' +
        'på den. Vesal steg ned og skar selv — og fandt derved steder, ' +
        'hvor Galen havde beskrevet noget andet, end det, der er at se ' +
        'i mennesket. Galen havde for det meste dissekeret dyr.',
    },
    {
      frage: 'Hvad udkom i 1543?',
      antworten: [
        'Avicennas „Kanon der Medicin".',
        'Den første tyske oversættelse af den hippokratiske ed.',
        'Vesals „De humani corporis fabrica" — trykt i Basel.',
      ],
      richtig: 2,
      erklaerung:
        'De syv bøger om menneskekroppens bygning med deres berømte ' +
        'træsnit udkom i 1543 hos Johannes Oporinus i Basel. Den samme ' +
        'Oporinus havde i 1527 været Paracelsus\' hjælper — den eneste ' +
        'forbindelse mellem to mænd, der aldrig mødtes.',
    },
  ],
};

module.exports = paracelsusVesal;
