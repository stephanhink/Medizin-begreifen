// Kapitel 8 — „Harvey og blodkredsløbet".
//
// Den station, hvor regningen flytter ind i medicinen. I femtenhundrede
// år gjaldt: Blodet opstår i leveren, flyder gennem årerne ud i kroppen
// og bliver der brugt op. En engelsk læge stiller denne lære et spørgsmål,
// som ingen før ham havde stillet — ikke „passer det?", men „hvor meget?".
// Svaret er et tal, som ingen kan fremstille, og ingen kan bruge op. Altså
// må det samme blod komme forbi igen og igen: Det kredser.
//
// TÆNKEMÅDE-analysen er kernen (forfatterens krav). Den spørger her:
// Hvorfor regne, når man hidtil citerede? Hvorfor se efter på det levende
// dyr og ikke på det døde? Hvorfor hjertet som pumpe og ikke som ildsted?
// Og hvorfor overbeviser en prøve på ens egen arm flere mennesker end
// enhver forelæsning? Hertil den ærlige balance i begge retninger: hvad
// der holder (kredsløbet, metoden), hvad der var en fejltagelse (lungen
// som afkøling, de manglende kapillærer), og hvad der var uden følger
// (den første syge fik først hjælp af indsigten to hundrede år senere).
// Stemmen nævner det selv (tillægsregel for følsomme emner i CLAUDE.md).
//
// LÆNGDEREGEL (forfatterens feedback 24.08.2026): Kapitel 1–8 forbliver
// korte og tætte — hver synsvinkel højst ~250 linjer, kapitlet i alt
// højst ~600 linjer. Dette er det SIDSTE af de tidlige kapitler; fra
// kapitel 9 (de grusomme begyndelser på den moderne kirurgi) vendes
// reglen om. Linjeantallet måles i tests/karte-harvey.mjs.
//
// Stemmer (runde 9): Den FØRSTE synsvinkel — Harvey indefra, lægen, der
// regnede — skrev Opus. Den ANDEN (traditionen: den galeniske lære, der
// havde holdt i femtenhundrede år, dens modstand og spørgsmålet om,
// hvorfor en falsk lære overlever så længe) og den endelige syntese
// tilføjede Hermes i anden omgang. Synsvinkel-workflow: CLAUDE.md.
//
// INGEN GENTAGELSER (forfatterens beslutning af 21.08.2026): Kapitel 1
// struktureres efter „Hvem taler her → …", kapitel 2 begynder med en
// scene, kapitel 3 fortæller et døgns forløb, kapitel 4 er en
// brevveksling, kapitel 5 en bogs rejse, kapitel 6 en rundgang gennem
// klosteret, kapitel 7 en retssag. Dette kapitel vælger den ottende
// dramaturgi: en REGNING. Afsnittene er trinene i en opgave — opgaven,
// den første størrelse, den anden størrelse, summen, prøven, resten,
// der ikke går op, modregningen. Den anden stemme kan lægge den samme
// regning op fra den anden side.
//
// Teksterne ligger som linjearrays med `.join('\n')` — sådan forbliver
// de læsbare i reposen ved ~72 tegn (forfatteren læser dem her mod
// originalen), og utils/markdown.js gør dem igen til flydende tekst i
// appen.
//
// CommonJS uden UI-imports (arkitekturregel): kan tjekkes med blank `node`.

/**
 * Harveys stemme — lægen, der regnede.
 *
 * Skrevet af Opus (runde 9). Den fortæller indefra: hvorfor han begyndte
 * at tælle, hvorfor han så efter på det levende, hvorfor hjertet må være
 * en pumpe, og hvad hans regning lod stå åbent. De ubehagelige steder
 * nævner den selv i stedet for at overlade dem til modstemmen.
 */
const stimmeDesHarvey = [
  '## Opgaven',
  '',
  'Mit navn er **William Harvey**, født 1578 i Folkestone i Kent,',
  'som ældste af syv sønner af en købmand. Jeg var læge på',
  'St.-Bartholomæus-Hospitalet i London og senere livlæge for to konger.',
  'Og med det samme, så du ved, hvad du har med at gøre: **Det, du hører',
  'her, er min synsvinkel — en tænkemåde, ikke en sandhed.** Jeg har',
  'taget fejl, og jeg vil sige hvor.',
  '',
  'Da jeg begyndte at studere, havde det i femtenhundrede år været',
  'fastlagt, hvad der sker med blodet. **Galen** havde skrevet det ned,',
  'og det lød fornuftigt: Af føden dannes der blod i leveren. Derfra',
  'flyder det gennem årerne ud i kroppen og bliver der brugt op — som',
  'vand, en mark suger op. En del siver gennem fine porer i hjertets',
  'skillevæg fra den højre til den venstre hjertekammer og får der',
  'livsånd. Blodet ebber og flyder, frem og tilbage, og dannes hele',
  'tiden på ny.',
  '',
  '**Den lære var ikke dum.** Den forklarede, hvorfor man må spise,',
  'hvorfor man forbløder ved et sår, hvorfor en åreladning lindrer, og',
  'hvorfor blodet i årerne ser anderledes ud end i pulsårerne. Den',
  'havde et svar på ethvert spørgsmål. Det må man sige, før man vælter',
  'den.',
  '',
  'Jeg spurgte ikke, om den passer. **Jeg spurgte: hvor meget?**',
  'Det er hele forskellen. En mening kan man besvare med en mening;',
  'en mængde ikke. **Hvorfor regne og ikke skændes?** Fordi et tal',
  'ikke lader sig overtale. Det har intet professorat at miste og',
  'intet ry at forsvare. Den, der kender mængden, behøver ikke længere',
  'spørge, hvem der har ret.',
  '',
  '## Den første størrelse: hvad et slag pumper ud',
  '',
  'Åbn en død krop og se på det venstre hjertekammer. Det rummer en',
  'mængde, man kan måle — to unzer, ofte mere. Ved hvert slag presser',
  'det en del af den ud i den store pulsåre.',
  '',
  'Hvor meget helt præcist, vidste jeg ikke. Derfor regnede jeg bevidst',
  'for lavt: kun en ottendedel, kun en sjettedel, kun en halv drakme —',
  'den mindste mængde, som min skarpeste modstander ville indrømme mig.',
  '**Den, der vil bevise noget, tager det tal, modparten helst vil',
  'have.** Går regningen ikke op allerede dermed, er den færdig.',
  '',
  'I dag kan man sige det mere præcist: Et voksent hjerte pumper ved',
  'hvert slag omkring halvfjerds milliliter ud — et lille vinglas.',
  '',
  '## Den anden størrelse: hvor ofte hjertet slår',
  '',
  'Det andet tal bærer alle med sig. Læg to fingre på dit håndled og',
  'tæl: omkring halvfjerds slag i minuttet. Det er over tusind på en',
  'halv time og mere end **hundrede tusinde på en dag**. Ingen havde',
  'nogensinde tænkt det til ende.',
  '',
  '**Hvorfor se efter på det levende og ikke på det døde?** Fordi en',
  'død krop ikke viser det vigtigste: bevægelsen. På dissektionsbordet',
  'ligger et stille stykke kød. Jeg måtte se, hvad et hjerte gør,',
  'mens det gør det.',
  '',
  'Så jeg åbnede, hvad jeg kunne få fat i: ål, fisk, snegle, krabber,',
  'frøer, duer, hunde — og vildtet fra de kongelige parker, som mit',
  'embede gav mig adgang til. Varmblodede dyr har et for hurtigt',
  'hjerte; øjet kan ikke følge med. Hos kolde dyr slår det langsomt,',
  'og hos et døende dyr bliver det langsommere og langsommere, indtil',
  'man endelig ser rækkefølgen.',
  '',
  'Og rækkefølgen var en anden end den, man lærte. Man sagde, hjertet',
  'udvider sig og **suger** blodet til sig. Jeg så: Gerningen er',
  '**sammentrækningen**. Hjertet bliver hårdt, kort og blegt, det',
  'presser — og afslapningen bagefter er kun pausen. En muskel, en',
  'pose, der klemmer sammen.',
  '',
  'Det hører med til sandheden i dette kapitel: **Jeg har åbnet dyr',
  'levende, mange hundrede.** Jeg skriver det ikke som en bisætning.',
  'Den, der bruger mine tal, bruger dem.',
  '',
  '## Summen: mere, end hele kroppen rummer',
  '',
  'Tag nu de to størrelser sammen — mere behøves ikke.',
  '',
  'Selv med min bevidst ynkelige mængde kommer der på en halv time',
  'mere blod ud af hjertet, end der er i hele mennesket. Regner man med',
  'dagens værdier, bliver det uigendriveligt: halvfjerds milliliter,',
  'halvfjerds gange i minuttet — det er næsten **fem liter i minuttet',
  'og omkring to hundrede halvtreds til tre hundrede liter i timen**.',
  'I hele kroppen på en voksen er der fem til seks liter.',
  '',
  'Dermed får den gamle lære to opgaver, den ikke kan løse. **Leveren',
  'skulle af en dags føde lave flere hundrede liter blod** — mere,',
  'end et menneske overhovedet indtager. Og kødet skulle bruge den',
  'samme mængde op igen, uden at nogen så, hvor den blev af.',
  '',
  'Der er kun én forklaring tilbage, og den er enkel: **Det er altid',
  'det samme blod. Det løber i ring** — fra hjertet gennem pulsårerne',
  'ud i kroppen, fra kroppen gennem årerne tilbage til hjertet,',
  'gennem lungen og forfra igen.',
  '',
  '**Hvorfor så hjertet som pumpe?** Fordi jeg ikke efterlader noget',
  'andet. En sæk, der trækker sig sammen; klapper, der kun åbner i én',
  'retning; et tryk, der får en overskåret pulsåre til at sprøjte i en',
  'stråle. Enhver håndværker, der kender en brandsprøjte, forstår det',
  'med det samme — og derfor kunne det forstås uden latin.',
  '',
  'For ærlighedens skyld: **Den sammenligning lavede først mine',
  'efterfølgere.** Jeg selv kaldte hjertet kroppens fyrste og det',
  'lille universums sol. Jeg var en elev af Aristoteles og ingen',
  'mekaniker. At der ud af min regning blev en maskine, er virkningen',
  'af min bog, ikke min hensigt.',
  '',
  '## Prøven: et bånd om armen',
  '',
  'En regning overbeviser hovedet. Jeg havde brug for noget for',
  'øjnene — og ganske vist noget, enhver kan gentage på sig selv.',
  'Bind en arm af, som barberen gør det før åreladningen.',
  '',
  'Det, jeg bruger dertil, lærte jeg som studerende. Fra 1599 til 1602',
  'studerede jeg i **Padua**, Europas frieste universitet, hvor der',
  'siden 1594 havde stået et fast anatomi-teater.',
  '',
  'Træk båndet **stramt**: Hånden bliver bleg og kold, og nedenunder',
  'båndet er der ingen puls mere. Altså kommer blodet ovenfra, gennem',
  'pulsårerne, der ligger dybt.',
  '',
  'Slip det nu **lidt**: Hånden bliver rød, og årerne derunder træder',
  'frem som snore — med knuder i, med regelmæssige mellemrum. Disse',
  'knuder er **klapperne**. Min lærer i Padua, Hieronymus Fabricius,',
  'havde beskrevet dem og holdt dem for bremser, der hindrer, at',
  'blodet står stille i arme og ben. **Han har set dem; jeg har læst',
  'dem.**',
  '',
  'For nu kommer det afgørende greb: Tryk en fyldt åre sammen med',
  'fingeren og strøg blodet væk med den anden finger mod hjertet til.',
  'Stykket forbliver tomt. Det fyldes **ikke** ovenfra — først når du',
  'slipper, skyder det igen fuldt nedefra.',
  '',
  'Dermed er det afgjort, og ganske vist uden et eneste citat: **I',
  'årerne flyder blodet kun i én retning — mod hjertet.** Ud gennem',
  'pulsårerne, tilbage gennem årerne. Det er kredsen.',
  '',
  '## Resten, der ikke går op',
  '',
  'Og nu det stykke, jeg er blevet skyldig.',
  '',
  '**Hvordan blodet kommer fra pulsårerne over i årerne, kunne jeg',
  'ikke vise.** Jeg skrev om porer i kødet og om en gennemsivning og',
  'vidste, at det ikke er noget svar. Jeg manglede mikroskopet. Først',
  'i 1661 rettede Marcello Malpighi i Bologna en linse mod lungen på',
  'en frø og så nettet af de fineste kar, der forbinder begge —',
  'kapillærerne. Da havde jeg været død i fire år. **Det sidste sted i',
  'mit bevis har en anden lukket.**',
  '',
  '**Hvad det hele er godt for, vidste jeg ikke.** Jeg holdt fast i den',
  'gamle tanke, at lungen afkøler det ophedede blod. Om luften, der',
  'optages deri, anede jeg intet; det kom først med kemikerne, længe',
  'efter mig. Jeg har forklaret bevægelsen og ikke dens formål.',
  '',
  'Og det mest ubehagelige: **Mit kredsløb har ikke helbredt en eneste',
  'syg.** Man årelod fortsat som før — også jeg selv. De første',
  'forsøg på at gøre noget ud af indsigten gik skidt: Efter mig',
  'sprøjtede man syge mennesker med midler ind i årerne og overførte',
  'blod fra dyr til mennesker; mennesker døde af det, og overførslen',
  'blev forbudt i hundrede år. **Mellem min regning og den første',
  'syge, den hjalp, ligger der to hundrede år.**',
  '',
  '## Modregningen',
  '',
  'Alt dette udtalte jeg første gang i **april 1616**, i min',
  'forelæsning for College of Physicians i London — mine noter dertil',
  'ligger den dag i dag i en tæt latinsk håndskrift. Så ventede jeg',
  'tolv år, fortsatte med at dissekere og fortsatte med at regne.',
  '**1628** lod jeg min bog trykke, i Frankfurt am Main, fordi',
  'bogmessen var der, og et værk derfra nåede hele Europa:',
  'tooghalvfjerds sider på dårligt papir, fuld af sætterfejl. Det, jeg',
  'høstede, var modsigelse.',
  '',
  'Allerede i 1630 skrev en kollega i London imod. Caspar Hofmann i',
  'Nürnberg overværede min demonstration, indrømmede, at han så det,',
  'og forklarede mig alligevel, at jeg havde beskyldt naturen for en',
  'ubetænksomhed: Hvorfor skulle den indrette sig så omstændeligt? I',
  'Paris lod Jean Riolan den Yngre i 1648 kun en lille del af blodet',
  'kredse og beholdt resten hos Galen.',
  '',
  '**Hvorfor forsvarede de sig så længe?** Ikke af dumhed. Jeg krævede',
  'noget uforskammet: at tro mere på en regning end på en bygning, der',
  'forklarede alt — ernæringen, åreladningen, diæten, hele kroppens',
  'orden. Og mit bedste bevis lå i et åbnet, endnu slående dyr. **Den,',
  'der aldrig har set et hjerte slå, krævede jeg skulle tro mere på',
  'mig end på sine lærere.** I deres sted var jeg også gået varsomt',
  'frem.',
  '',
  'Jeg har også betalt for det. Efter bogen mistede jeg en del af',
  'mine syge; det hed sig, at jeg var blevet sær i hovedet. I',
  'borgerkrigen blev mine værelser plyndret, og mine optegnelser',
  'tilintetgjort.',
  '',
  'Og jeg selv? **Jeg kæmpede ikke.** Jeg svarede, hvor jeg måtte,',
  'ellers tav jeg, opgav lærerembedet og vendte mig mod spørgsmålet',
  'om, hvordan levende væsener opstår. Jeg var ikke manden for',
  'striden; jeg var manden for tallet. At kredsløbet slog igennem,',
  'har mindre at gøre med min ihærdighed end med, at enhver kunne',
  'gentage prøven på sin egen arm.',
  '',
  '## Hvad regningen ikke afgør',
  '',
  'Én ting forbliver åben, og jeg er den forkerte til at besvare den,',
  'fordi jeg stod på den ene side.',
  '',
  'Den lære, jeg væltede, har båret i femtenhundrede år. Den var falsk',
  'og alligevel brugbar: Læger har arbejdet med den, hjulpet,',
  'trøstet. Hvorfor holder en falsk lære sig så længe — og hvorfor',
  'behøver en rigtig årtier, før den trænger igennem? Hvad af de to',
  'var dovenskab, hvad forsigtighed, hvad angst?',
  '',
  '**Dette kapitels anden stemme tilhører den anden side: traditionen**,',
  'der modsagde — den galeniske lære, dens grunde og dens holden fast.',
  'Den skal lægge den samme regning op bagfra.',
].join('\n');

/**
 * Traditionen — den galeniske lære, der havde holdt i 1500 år.
 * Modregningen: Hvorfor verden ikke ville se kredsløbet — og hvorfor
 * den gamle regning overbeviste så længe.
 *
 * Skrevet af DeepSeek (runde 9, anden omgang). Også denne stemme nævner
 * selv de ubehagelige steder på sin egen side (tillægsregel for
 * følsomme emner).
 */
const stimmeDerTradition = [
  '## De gamles modregning',
  '',
  'Manden fra London har regnet og ment, at dermed var sagen afgjort.',
  'Nu regner vi tilbage — ikke af stædighed, men fordi vores regning',
  'har været sammenhængende i halvandet årtusinde, og hans er det ikke',
  'helt. Hør den regning, vi arvede:',
  '',
  'Blodet opstår i leveren, af den fordøjede føde. Det flyder gennem',
  'årerne til organerne, nærer dem og bliver der brugt op — som vand,',
  'der ledes ud på markerne og suges op af jorden. En lille del går til',
  'hjertet og bliver der opvarmet, en del til lungen og bliver der',
  'afkølet. Det er ingen dum lære: Den forklarer, hvorfor leveren så',
  'ofte gør ondt hos syge, hvorfor blodet ved åreladningen er mørkt og',
  'tykt, hvorfor man bliver søvnig efter måltidet. Den forklarer, hvad',
  'man ser — og hvad man ser, er blodet i årerne, der flyder mod',
  'hånden, når man skærer den op. Af et kredsløb ser man intet.',
  '',
  '## Den anden regning: hvad der talte mod Harvey',
  '',
  'Og nu indvendingerne mod herren fra London — alvorligt fremsat,',
  'for også han har huller.',
  '',
  '**For det første: Han har ikke lukket kredsen.** Manden påstår, at',
  'blodet kredser. Men hvor er vejen tilbage? Han viser årerne, han',
  'viser pulsårerne — men de fine forbindelser mellem dem kan han ikke',
  'vise, fordi han ikke har noget redskab, der gjorde dem synlige. Et',
  'kredsløb uden forbindelse er en påstand. Vi spurgte: Hvor lukker',
  'kredsen sig? Og han kunne ikke sige det. Først i 1661, år efter',
  'hans død, vil en italiener med et forstørrelsesglas finde',
  'kapillærerne og lukke kredsen. Men i 1628 var kredsen åben — og vi',
  'havde ret i at bemærke det.',
  '',
  '**For det andet: Hvem har nogensinde set et hjerte slå?** De fleste',
  'læger i hans århundrede har aldrig set et levende hjerte i brystet.',
  'Harveys bevis krævede, at man åbnede hjorte og hunde og så til —',
  'hvem gjorde dét? Hans tal på to hundrede fyrre liter i timen kunne',
  'ingen efterprøve, som ikke selv havde regnet. En regning, man ikke',
  'kan følge, virker som en påstand.',
  '',
  '**For det tredje: Autoriteten var ikke kun stædighed.** Galen havde',
  'i halvandet årtusinde leveret grundlaget for enhver lægeuddannelse.',
  'At forkaste ham betød at rive fundamentet ned, som de studerende',
  'stod på. Den, der krævede det, måtte byde mere end et tal — han',
  'måtte bygge en ny bygning. Harvey byggede den, men verden havde',
  'brug for tid til at flytte ind.',
  '',
  '## Den tredje regning: hvad traditionen selv vidste',
  '',
  'Nu de steder, hvor vi selv må blive mere stille — for også vores',
  'regning har sine fejl.',
  '',
  '**For det første: Vi holdt op med at spørge.** Det er den tungeste',
  'bebrejdelse, og den rammer. Galen havde spurgt, og hans svar var',
  'godt for hans tid. Men vi gentog hans svar i halvandet årtusinde',
  'uden at spørge forfra. En lære, som ingen længere prøver, bliver',
  'til en mur. Manden fra London spurgte — og netop det var hans',
  'forbrydelse og hans fortjeneste.',
  '',
  '**For det andet: Vi holdt kroppen for enklere, end den er.** Vores',
  'regning kendte frem og tilbage, ikke kredsen. Vi så, at blodet',
  'flyder, men ikke hvorhen. Sandheden var mere kompliceret, end vores',
  'orden tillod — og vi forsvarede ordenen i stedet for at søge',
  'sandheden.',
  '',
  '## Tidens dom',
  '',
  'Regnemesteren fra London spurgte til sidst, hvad hans regning ikke',
  'afgør. Vores svar som den stemme, der gjorde modstand: Den afgør',
  'ikke, hvad det gamle er værd, men at man må prøve. Hans regning har',
  'vundet — ikke fordi han råbte højere, men fordi den passede, og',
  'fordi forstørrelsesglasset kom og lukkede den kreds, han havde',
  'ladet stå åben. Vi har tabt — ikke fordi vores regning var dum,',
  'men fordi vi holdt den for færdig. Det er den lektie, enhver',
  'tænkemåde må lære foran denne bog: En regning er aldrig færdig. Den',
  'er kun foreløbigt rigtig — indtil nogen tæller efter.',
].join('\n');

/** Kapitel 8 i emnekortet. */
const harvey = {
  id: 'harvey',
  titel: 'Harvey og blodkredsløbet',
  epoche: '1578–1657',

  aufhaenger: {
    frage:
      'Hvordan beviser man noget, som ingen kan se — med en kniv, ' +
      'en optælling og en regning?',
    text: [
      'I femtenhundrede år var sagen klar: Blodet opstår i leveren,',
      'flyder gennem årerne ud i kroppen og bliver der brugt op. Hele',
      'tiden nyt blod, hele tiden brugt op igen. Læren stammede fra',
      'Galen, den forklarede alt, og ingen regnede efter.',
      '',
      'Så stillede en engelsk læge et spørgsmål, som ingen før ham',
      'havde stillet — ikke „passer det?", men „hvor meget?". Hjertet',
      'slår over hundrede tusinde gange om dagen og pumper ved hvert',
      'slag et lille vinglas ud. Det er flere hundrede liter på en dag.',
      'Så meget kan ingen lever fremstille, og intet kød bruge op.',
      '',
      'Der er kun én forklaring: Det er altid det samme blod — det',
      'kredser. William Harvey regnede det for, viste det på en afbundet',
      'arm og lod det trykke i Frankfurt i 1628, på tooghalvfjerds',
      'sider. Det varede årtier, før verden troede på det — og ét sted i',
      'sit bevis kunne han selv aldrig vise.',
    ].join('\n'),
  },

  // Kortet ligger i utils/themen/karten/harvey.js — her er kun
  // fasehenvisningerne oversat (phasen → karteHinweise), ikke selve kortet.
  karteHinweise: [
    {
      label: '1599–1602: Padua — Harvey studerer hos Fabricius',
      hinweis:
        'Englænderen William Harvey skriver sig ind på universitetet i ' +
        'Padua, Europas berømteste medicinske fakultet. Hans lærer ' +
        'Hieronymus Fabricius ab Aquapendente har der i 1594 ladet bygge ' +
        'det faste anatomi-teater og viser sine studerende de små klapper ' +
        'i årerne. Fabricius holder dem for bremser, der hindrer, at ' +
        'blodet står stille i arme og ben. Harvey ser det samme og ' +
        'tænker det senere anderledes til ende. I 1602 tager han ' +
        'doktorgraden og vender tilbage til England.',
    },
    {
      label: '1616: London — Lumleian-forelæsningerne',
      hinweis:
        'Harvey er læge på St.-Bartholomæus-Hospitalet og medlem af ' +
        'College of Physicians, der i 1615 vælger ham til ' +
        'Lumleian-forelæser: Han skal i årevis offentligt dissekere og ' +
        'undervise. I noterne til sine forelæsninger i april 1616 står ' +
        'der for første gang den sætning, at blodet føres i kredsløb. ' +
        'Trykt bliver der først intet af det — Harvey regner, ' +
        'dissekerer og venter i tolv år til.',
    },
    {
      label: '1628: Frankfurt — „De motu cordis\" bliver trykt',
      hinweis:
        'Bogen om hjertets og blodets bevægelse udkommer ikke i London, ' +
        'men hos Wilhelm Fitzer i Frankfurt am Main — der er bogmessen, ' +
        'derfra rejser et værk ud i hele Europa. Det er tooghalvfjerds ' +
        'sider på dårligt papir, fuld af trykfejl, tilegnet kongen af ' +
        'England. Ingen bog i medicinhistorien har på så få sider ' +
        'væltet så meget.',
    },
    {
      label: '1649–1661: Modsigelse i Paris, kapillærer i Bologna',
      hinweis:
        'Paris-anatomen Jean Riolan den Yngre, den anseteste talsmand ' +
        'for den gamle lære, indrømmer kredsløbet i 1648 kun en lille ' +
        'del af blodet; Harvey svarer ham i 1649 med to stridsskrifter. ' +
        'Det hul, han selv havde ladet stå åbent, lukker først Marcello ' +
        'Malpighi: I 1661 ser han i Bologna under mikroskopet de fine ' +
        'kar i lungen på en frø — forbindelsen mellem pulsårer og årer. ' +
        'Harvey har været død i fire år.',
    },
  ],

  perspektiven: [
    {
      id: 'harvey',
      name: 'Harveys stemme',
      stimme: 'Opus',
      text: stimmeDesHarvey,
    },
    {
      id: 'tradition',
      name: 'Traditionens stemme',
      stimme: 'DeepSeek',
      text: stimmeDerTradition,
    },
  ],

  synthese: [
    '## Hvor de to stemmer mødes',
    '',
    'Først det fælles. Begge stemmer regner — og begge indrømmer, at',
    'deres regning har huller. Harvey erkender, at han ikke kan lukke',
    'kredsen: De fine forbindelser mellem årer og pulsårer har ingen',
    'set. Traditionen erkender, at den i halvandet årtusinde har holdt',
    'op med at spørge. Begge anerkender erfaringen: Harvey viser det på',
    'den afbundne arm, traditionen henviser til det, enhver læge ser.',
    'Og begge ved, at sandheden er mere kompliceret end den orden, de',
    'har lagt sig til rette.',
    '',
    '## Hvor de skilles',
    '',
    'Modsætningen begynder ved spørgsmålet om, hvad der gælder som',
    'bevis. For Harvey er det tallet: Går regningen ikke op, må læren',
    'være falsk — mængden af blod tvinger kredsløbet frem. For',
    'traditionen er det den synlige erfaring: Hvad man ikke kan se, er',
    'ikke bevist — og et kredsløb uden synlig forbindelse forbliver en',
    'påstand. De strides altså ikke om enkelte kendsgerninger, men om',
    'bevisets art: Tælle eller se? Og deraf følger den anden strid: om',
    'tiden. Harvey vil, at sandheden gælder straks; traditionen vil, at',
    'det velafprøvede først skal modbevises, før man forlader det.',
    'Begge har et stykke ret — og netop det gør historien så',
    'menneskelig.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'For niende gang samme mønster — og nu lukker en bue sig:',
    'Tænkemåden bestemmer metoden. I begyndelsen stod loddet, kanalerne,',
    'qi, doshaerne, safterne — tænkemåder om ligevægt. Så kom bruddets',
    'tænkemåder: Paracelsus og Vesal lærte erfaringen, Harvey lærer',
    'tallet. Dermed er fundamentet lagt, som den moderne medicin står',
    'på: ikke længere autoriteten, men målingen.',
    '',
    'Og dette kapitel viser noget nyt: prisen for fremskridtet. Harveys',
    'regning var rigtig — men den behøvede årtier, et forstørrelsesglas',
    'og modet til at forlade det velafprøvede. Traditionen var ikke dum;',
    'den var bare langsom. Den, der fortæller medicinhistorien som de',
    'fornuftiges sejrsgang, overser, at enhver ny sandhed først må kæmpe',
    'mod den gamle — og at den tvivl, traditionen passede på, selv er',
    'en del af videnskaben. De næste kapitler vil vise, hvad der bliver',
    'ud af denne spænding: Medicinen har nu målingens tænkemåde — men',
    'den har endnu intet måleinstrument, der viser sygdommen, og ingen',
    'hånd, der helbreder den. Det vil blive grusomt, før det bliver',
    'rent.',
  ].join('\n'),

  urteil: {
    frage:
      'Hvad overbeviser dig mest — en regning, som ingen kan modbevise, ' +
      'eller et syn, som alle forstår?',
    hinweis: [
      'Der er her intet rigtigt og intet forkert. Husk, at Harvey havde',
      'brug for begge dele: Tallene tvang forstanden, men til sidst',
      'overbeviste båndet om armen, fordi enhver kunne gentage det på',
      'sig selv. Tænk også på, hvordan du har det i dag: Hvis en',
      'undersøgelse nævner et tal, der modsiger din erfaring — hvem',
      'giver du så ret? Og hvis du ser noget med egne øjne, som ingen',
      'statistik bekræfter: Hvor meget er det værd for dig? Begge veje',
      'har ført vild, og begge har haft ret.',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'Hvad begrundede Harvey med, at blodet må kredse?',
      antworten: [
        'Med mængden: Hjertet pumper mere blod ud, end kroppen kunne ' +
          'fremstille eller bruge op.',
        'Med mikroskopet, under hvilket han så de fine kar.',
        'Med en ny fortolkning af Galens skrifter.',
      ],
      richtig: 0,
      erklaerung:
        'Harvey regnede: Hjertekammeret pumper ved hvert slag en ' +
        'målelig mængde ud, hjertet slår over hundrede tusinde gange om ' +
        'dagen. Selv med bevidst for lavt satte værdier kommer der på en ' +
        'halv time mere blod ud af hjertet, end der er i hele mennesket. ' +
        'Da leveren ikke kan fremstille det, og kroppen ikke kan bruge ' +
        'det op, må det være det samme blod hele tiden.',
    },
    {
      frage: 'Hvor udkom Harveys bog „De motu cordis\" i 1628?',
      antworten: [
        'I London, ved kongens hof.',
        'I Padua, hvor han havde studeret.',
        'I Frankfurt am Main, på grund af bogmessen.',
      ],
      richtig: 2,
      erklaerung:
        'De tooghalvfjerds sider blev trykt hos Wilhelm Fitzer i ' +
        'Frankfurt — på dårligt papir og med mange sætterfejl. Omvejen ' +
        'havde en grund: Via Frankfurter-bogmessen nåede et værk på få ' +
        'måneder til Paris, Leiden, Venedig og Basel. Harvey ville ' +
        'læses, også af sine modstandere.',
    },
    {
      frage: 'Hvad viser klapperne i årerne?',
      antworten: [
        'At blodet står stille i arme og ben.',
        'At blodet i årerne kun flyder i én retning: mod hjertet.',
        'At årerne er tyndere end pulsårerne.',
      ],
      richtig: 1,
      erklaerung:
        'Harveys lærer Hieronymus Fabricius havde beskrevet klapperne ' +
        'i Padua og holdt dem for bremser mod, at blodet står stille. ' +
        'Harvey vendte fortolkningen om: Stryger man en afbundet åre tom ' +
        'mod hjertet, fyldes den ikke ovenfra, men kun nedefra. Blodet ' +
        'kan kun passere klapperne i én retning — mod hjertet.',
    },
    {
      frage: 'Hvilket sted i sit bevis kunne Harvey ikke vise?',
      antworten: [
        'At hjertet trækker sig sammen.',
        'At der sidder klapper i årerne.',
        'Hvordan blodet går fra pulsårerne over i årerne.',
      ],
      richtig: 2,
      erklaerung:
        'Forbindelsen mellem pulsårer og årer forblev åben — Harvey ' +
        'manglede mikroskopet og talte vagt om porer i kødet. Først i ' +
        '1661 så Marcello Malpighi i Bologna under linsen de fineste kar ' +
        'i lungen på en frø: kapillærerne. Harvey havde da været død i ' +
        'fire år.',
    },
    {
      frage: 'Hvor studerede Harvey medicin?',
      antworten: [
        'I Paris, på Frankrigs berømteste fakultet.',
        'I Padua, hos Hieronymus Fabricius.',
        'I Basel, hvor Vesals anatomi-værk var blevet trykt.',
      ],
      richtig: 1,
      erklaerung:
        'Efter seks år i Cambridge tog Harvey i 1599 til Padua — ' +
        'Europas frieste universitet, siden 1594 med et fast ' +
        'anatomi-teater. Der underviste Hieronymus Fabricius, som havde ' +
        'beskrevet åreklapperne. I 1602 vendte Harvey tilbage til ' +
        'England som doktor i medicin.',
    },
  ],
};

module.exports = harvey;
