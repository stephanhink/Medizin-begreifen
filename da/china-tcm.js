// Kapitel 2 — „Kina og TKM".
//
// Den kinesiske medicin er den ældste helbredelsestradition, der uden
// afbrydelse praktiseres den dag i dag. Dette kapitel gør, hvad forfatteren
// af denne bog har krævet: Det analyserer dens TÆNKEMÅDE udførligt — ikke
// kun, HVAD der blev gjort, men HVORFOR. Verdensbilledet (qi, yin og yang,
// de fem forvandlingsfaser, meridianerne), begrundelseslogikken bag nål,
// recept, puls og åndedræt — og den ærlige virkningsbalance: hvad forskning
// i dag understøtter, og hvad der ikke er målbart eller er omstridt
// (CLAUDE.md, tænkemåde-analyse).
//
// Stemmer (runde 3): Den FØRSTE synsvinkel — den kinesiske medicin
// indefra — skrev Opus. Den ANDEN (det vestlige blik: undren, skepsis,
// videnskabelig afprøvning) og den afsluttende syntese tilføjede Hermes
// i anden gennemgang. Synsvinkel-workflow: CLAUDE.md.
//
// INGEN GENTAGELSER (forfatterens beslutning af 21.08.2026): Kapitel 1
// inddeler sine stemmer efter „Hvem taler her → Hvordan viden voksede →
// Tænkemåde → …". Dette kapitel vælger bevidst en anden dramaturgi: Det
// begynder med en scene ved håndleddet, folder verdensbilledet ud i fire
// begreber og fører begrundelseslogikken frem langs fire „hvorfor"-spørgsmål.
//
// Kortet ligger i utils/themen/karten/china-tcm.js — af en anden art
// (geometri i stedet for fortælling), derfor i en egen fil. Her er kun
// kortets tekster oversat (faser, punkter, bevægelser) som karteHinweise,
// ikke selve kortet.
//
// Teksterne ligger som linje-Arrays med `.join('\n')` — sådan forbliver de
// læsbare i repoet ved ~72 tegn (forfatteren læser dem her igennem), og
// utils/markdown.js gør dem i appen igen til flydende tekst.
//
// CommonJS uden UI-imports (arkitekturregel): tjekbar med blank `node`.

/**
 * Den kinesiske medicins stemme — traditionen indefra.
 *
 * Skrevet af Opus (runde 3). Den forklarer sit verdensbillede med egne
 * ord, begrunder sine metoder ud fra denne logik, viser, hvordan viden
 * opstod — og nævner selv de ubehagelige pletter i sin egen fortælling i
 * stedet for at overlade dem til modstemmen (tillægsregel for følsomme
 * emner i CLAUDE.md).
 */
const stimmeDerChinesischenMedizin = [
  '## Tre fingre på håndleddet',
  '',
  'En mand kommer ind. Han har været træt i måneder, sover dårligt, og',
  'maven trykker efter maden. Lægen beder ham sætte sig og lægger tre',
  'fingre på hans håndled — først højre, så venstre. Han tier imens',
  'temmelig længe. Så beder han ham række tungen ud og betragter den:',
  'farve, form, belægning, fugtighed. Han spørger til søvnen, til',
  'afføringen, til tørsten, til kolde fødder, til stemningen om aftenen,',
  'til smagen i munden.',
  '',
  'Intet blodbillede, ingen ultralyd, intet febertermometer. Til sidst',
  'siger han heller ikke „du har en gastritis". Han siger noget, der for',
  'vestlige ører først lyder som poesi: midten er svag, der ligger',
  'fugtighed, og leverens qi står på tværs. Så skriver han en recept op —',
  'tolv planter, i bestemte mængder, i en bestemt rangorden — og sætter',
  'måske et par nåle.',
  '',
  'Denne side fortæller, hvad denne læge tænker, mens han gør det. Den',
  'fortæller det indefra, i traditionens egne ord, og den hævder ikke at',
  'være sandheden — den forklarer en tænkemåde. Den, der vil forstå den,',
  'må et stykke tid tillade et andet spørgsmål end det vante. Den',
  'vestlige medicin spørger: **Hvad er i stykker?** Den kinesiske medicin',
  'spørger: **Hvad er ude af balance?** Alt andet følger af denne ene',
  'forskel.',
  '',
  '## Qi — et ord, der ikke kan oversættes',
  '',
  'I begyndelsen står et begreb, som enhver oversættelse strander på.',
  '**Qi** gengives som regel med „livsenergi", og det er vildledende: Det',
  'er ikke energi i fysikkens forstand, ikke en strøm, man kunne måle.',
  'Tegnet viser oprindeligt dampen over kogende ris. Meningen er begge',
  'dele på én gang: det fine stof og dets bevægelse.',
  '',
  'Man kommer begrebet nærmest, hvis man læser det som **funktion**.',
  'Ikke: „Hvad er hjertet?", men: „Hvad gør hjertet, og gør det det',
  'kraftigt, jævnt, på det rette sted?" Qi er det, der varmer, der',
  'bevæger, der holder sammen, der forvandler, der beskytter. Hvor qi',
  'flyder rigeligt og frit, er mennesket rask. Hvor der er for lidt,',
  'bliver man træt, fryser, fordøjer dårligt. Hvor det stagnerer,',
  'opstår smerte.',
  '',
  'Deraf følger denne medicins vigtigste sætning, og den er',
  'årtusindegammel: **„Hvor det flyder, er der ingen smerte; hvor der er',
  'smerte, flyder det ikke."** Smerte er i denne tænkemåde ikke et signal',
  'fra beskadiget væv, men en ophobning. Og en ophobning behandler man',
  'ikke ved at slukke signalet, men ved at opløse den.',
  '',
  'Ved siden af qi står tre andre grundstørrelser, der tilsammen udgør',
  'mennesket: **Xue**, blodet, der nærer og fugter; **Jing**, essensen,',
  'en slags medfødt forråd, der langsomt bruges op gennem hele livet; og',
  '**Shen**, ånden, der viser sig i øjnene og i søvnen. Den, der',
  'vurderer et menneske, vurderer alle fire — ikke et enkelt organ.',
  '',
  '## Yin og yang — to poler, en balance',
  '',
  'Det andet redskab er et tænkemønster, ikke en ting. **Yin og yang**',
  'er hverken substanser eller magter. De er et begrebspar, hvormed',
  'enhver foreteelse kan sættes i et forhold.',
  '',
  'Oprindeligt betød de to ord skyggesiden og solsiden af en',
  'bjergskråning — og deri ser man allerede alt det væsentlige. For det',
  'første: Det er ikke modstandere, men to sider af samme sag. Et bjerg',
  'uden skyggeside er ikke et bjerg. For det andet: De er altid',
  'relative. Den samme side er om morgenen skygge og om eftermiddagen',
  'sol. For det tredje: De glider over i hinanden. Når solen står',
  'højest, begynder tilbagevejen allerede.',
  '',
  'Overført på mennesket: **Yin** er det kølende, fugtige, hvilende,',
  'nærende, materielle, det indre og nede. **Yang** er det varmende,',
  'tørre, bevægede, drivende, funktionelle, det ydre og oppe. Sundhed er',
  'ikke „meget yang" eller „meget yin", men deres bevægelige balance.',
  '',
  'Og netop derfor kender denne medicin **fire** grundlidelser, hvor en',
  'enklere betragtning kun ville se to. Der kan være for meget yang',
  '(ægte hede) — eller for lidt yin, hvorved den tilstedeværende varme',
  'ikke længere køles ned (tomheds-hede). Begge dele føles varmt for den',
  'syge, men behandles modsat: I første tilfælde køler man ned, i andet',
  'tilfælde bygger man op ved at nære. Det samme gælder spejlvendt for',
  'kulden. Den, der ikke genkender denne forskel, gør med et ellers',
  'rigtigt middel den syge endnu sygere. Det er grunden til, at denne',
  'tradition lægger så megen møje i diagnosen og arbejder så lidt med',
  'færdige standardrecepter.',
  '',
  '## Fem forvandlingsfaser — træ, ild, jord, metal, vand',
  '',
  'Yin og yang deler verden i to. De **fem elementer** deler den finere.',
  'Det sædvanlige tyske navn er egentlig allerede en fejloversættelse:',
  'Det handler ikke om byggematerialer, som verden er lavet af, men om',
  'fem **forvandlingsfaser** — fem tilstande, som en proces gennemløber,',
  'ligesom året går gennem årstiderne.',
  '',
  '- **Træ** — det opadstigende, det spirende, foråret, begyndelsen.',
  '- **Ild** — højdepunktet, heden, sommeren, udbredelsen.',
  '- **Jord** — midten, modningen, forvandlingen, næringen.',
  '- **Metal** — sammentrækningen, klaringen, efteråret, høsten.',
  '- **Vand** — synkningen, lagringen, vinteren, hvilen.',
  '',
  'Til hver fase er knyttet en funktionskreds — træ til leveren, ild til',
  'hjertet, jord til milten, metal til lungerne, vand til nyrerne — og',
  'dertil en årstid, en smag, en farve, en følelse, et sanseorgan. Her',
  'er en ærlig advarsel nødvendig, og den kommer fra traditionen selv:',
  'Disse organnavne mener ikke anatomiens organer. Den kinesiske',
  'medicins „milte" er hele fordøjelsesprocessen og omdannelsen af føde',
  'til qi — med det organ, en kirurg fjerner, har den lidt at gøre. Den,',
  'der læser begreberne anatomisk, forstår ikke et eneste ord rigtigt.',
  '',
  'De fem faser holdes sammen af to kredsløb, og de er det egentlige',
  'redskab:',
  '',
  '- **Frembringelsescyklussen**: Træ nærer ild, ild bliver til aske og',
  '  dermed til jord, jord frembringer metal, metal bærer vand (på koldt',
  '  metal slår vandet sig ned), vand nærer igen træet. Hver fase er mor',
  '  til den næste.',
  '- **Kontrolcyklussen**: Træ gennemtrænger og tærer jorden ud, jord',
  '  dæmmer vandet, vand slukker ilden, ild smelter metallet, metal',
  '  skærer træet. Hver fase holder en anden i tømme.',
  '',
  'Det lyder som symbolik, men er i hverdagen et tænkeredskab til',
  'årsagskæder. Et eksempel på, hvordan en læge bruger det: Et menneske',
  'er vedvarende irritabelt og anspændt — det er træ, leveren. Når træet',
  'bliver for stærkt, angriber det via kontrolcyklussen jorden,',
  'fordøjelsen. Den syge får trykken for maven og luft i maven, så snart',
  'han bliver vred. Lægen behandler så ikke maven, men træet. Om man',
  'deler denne forklaring eller ej — iagttagelsen af, at vrede går på',
  'maven, er lige så gammel som menneskeheden, og denne medicin har',
  'bragt den ind i et system i stedet for at affærdige den som en',
  'bisag.',
  '',
  '## Meridianerne — hvor qi har sine veje',
  '',
  'Tilbage er den fjerde byggesten: **meridianerne**, på kinesisk',
  '*jingluo*. De er det vejnet, hvorpå qi og blod løber gennem kroppen:',
  'tolv hovedmeridianer, hver knyttet til en funktionskreds, dertil',
  'otte ekstraordinære kar og et fint net af forgreninger. På dem ligger',
  'de klassiske akupunkturpunkter, godt tre hundrede og tres i tallet.',
  '',
  'Den ældste beskrivelse, vi har, er et lykketræf for arkæologien: I en',
  'grav ved Mawangdui, lukket i 168 f.Kr., lå silkeruller, der allerede',
  'kender elleve sådanne kar — om nåle står der endnu intet, man',
  'behandlede med varme. Systemet er altså vokset frem, ikke blevet',
  'opfundet.',
  '',
  'Og så det ubehagelige spørgsmål lige efter, fordi det hører til denne',
  'tænkemåde: Nej, der findes ingen anatomisk struktur, som man kunne',
  'skære op og fremvise som en meridian. Ingen præparator har nogensinde',
  'fundet en meridian. Fra traditionens side er det ingen indvending,',
  'men en forveksling af niveauer — meridianen beskriver ikke et rør,',
  'men en sammenhæng: at et trykpunkt på underbenet regelmæssigt virker',
  'på maven, at gener vandrer i en genkendelig linje, at bestemte',
  'punktpar sammen gør mere end hver for sig. Kortet er ikke landskabet.',
  'Men man kan gå med det.',
  '',
  '## Hvorfor stikker nålen?',
  '',
  'Nu kan det besvares, som udefra ser mest gådefuldt ud. Nålen',
  'behandler ikke det sted, der gør ondt — i hvert fald ikke kun. Den',
  'griber ind på et punkt i vejnettet for at genoprette strømmen: Hvor',
  'qi stagnerer, åbnes og ledes der af; hvor det mangler, samles og',
  'støttes der. Derfor ligger punktet, der sættes mod hovedpine, ofte på',
  'hånden, og punktet mod kvalme to fingerbredder over håndledsfolden.',
  '',
  'Lægen holder imens øje med et bestemt tegn: **de qi**, at „qi',
  'ankommer" — en dump, tung, somme tider udstrålende fornemmelse omkring',
  'nålen, som den behandlede mærker, og som lægen mærker i sine fingre.',
  'Udebliver det, anses stimulansen for for svag.',
  '',
  'Til nålen hører dens tvilling, som i Vesten ofte glemmes:',
  '**moxibustion**. Over punktet brændes tørret bynke af, som kegle',
  'eller som glødende cigar, indtil huden bliver varm. Begrundelsen er',
  'logisk: Er lidelsen en tomhed eller en kulde, hjælper ingen åbning —',
  'så må der tilføres varme. Nål og moxa er de to svar på de to',
  'grundtilstande. Derfor hedder ordet for akupunktur på kinesisk heller',
  'ikke „nåling", men *zhenjiu*: nål og brændeurt.',
  '',
  '## Hvorfor en blanding og ikke den ene urt?',
  '',
  'Urtelæren er i Kina den største del af medicinen — langt større end',
  'akupunkturen, også selvom Vesten opfatter det omvendt. Og den',
  'arbejder næsten aldrig med en enkelt plante.',
  '',
  'Hver medicin beskrives efter fire egenskaber, og ingen af dem er et',
  'aktivt stof. **For det første temperaturen**: hed, varm, neutral,',
  'kølig, kold — meningen er, hvad midlet udretter i mennesket, ikke',
  'dets egen varme. **For det andet smagen**: surt trækker sammen,',
  'bittert tørrer og leder nedad, sødt nærer og afslapper, skarpt',
  'spreder udad, salt opløser forhærdelser. **For det tredje retningen**:',
  'opstigende, synkende, udad, indad. **For det fjerde',
  'meridian-tilknytningen**: hvilken funktionskreds midlet når.',
  '',
  'Af disse fire oplysninger følger receptens logik af sig selv. Hvis et',
  'menneske har indre kulde og en ophobning, har han brug for noget',
  'varmende, der virker indad og nedad. Men et enkelt stærkt middel ville',
  'skyde over målet. Derfor er en klassisk recept bygget op som et',
  'hofhold, og kineserne kalder rollerne netop sådan:',
  '',
  '- **kejseren** — hovedmidlet mod hovedlidelsen;',
  '- **ministeren** — han forstærker kejseren eller behandler en anden,',
  '  ledsagende lidelse;',
  '- **hjælperen** — han mildner kejserens skarphed, opfanger hans',
  '  bivirkning eller modvirker en overdrivelse;',
  '- **budbringeren** — han fører blandingen til det rette sted og',
  '  bringer de andre midler i harmoni med hinanden.',
  '',
  'Derfor blandingen: Den skal ikke være stærkere, men mere præcis og',
  'mere veltålelig. Det kendteste eksempel på hjælperen er',
  'lakridsrod-andelen, der indgår i en stor del af alle recepter — den',
  'tager spidsen af skarpe midler. Og fordi hvert menneske medbringer en',
  'anden blanding af tilstande, ændres recepten ved hvert besøg: to',
  'urter ud, én til, en mængde ændres. Én og samme vestlige diagnose kan',
  'hos fem syge give fem forskellige recepter — og den samme recept kan',
  'komme i brug ved fem forskellige diagnoser. Det er ikke en mangel på',
  'orden, men selve ordenen: Det er mønsteret, der behandles, ikke',
  'sygdomsnavnet.',
  '',
  '## Hvorfor puls og tunge?',
  '',
  'Dermed er det også klart, hvorfor diagnosen ser ud, som den gør. Den,',
  'der vil vurdere en balance, har ikke brug for et blik ind i en enkelt',
  'celle, men for et billede af helhedens tilstand. Og dette billede',
  'søger traditionen de steder, hvor hele mennesket viser sig — uden at',
  'åbne det.',
  '',
  '**Pulsen** føles seks steder: tre positioner på hvert håndled, hver',
  'afsøgt i tre dybder. Hver position er knyttet til en funktionskreds.',
  'Og det er ikke frekvensen, der måles, men **kvaliteten**: Er pulsen',
  'stram som en guitarstreng? Glat som en perle, der ruller væk under',
  'fingeren? Ru, dyb, overfladisk, tom, fuld? Klassikerne skelner mellem',
  'otteogtyve sådanne puls-billeder. Tanken bagved: Pulsen er',
  'bevægelsen af qi og blod, lige under fingeren — mere synligt bliver',
  'bevægelse ikke.',
  '',
  '**Tungen** er til gengæld det eneste sted, hvor man kan betragte et',
  'slimhindeorgan i dagslys. Den læses som et landkort: spidsen for',
  'hjertet, den midterste del for milt og mave, kanterne for leveren,',
  'tungeroden for nyrerne. Tungelegemet viser blodets og safternes',
  'tilstand — blegt ved tomhed, rødt ved hede, blåligt ved ophobning.',
  '**Belægningen** viser fordøjelsens tilstand: tyk og fedtet ved',
  'fugtighed, tør ved hede, fraværende ved yin-udmattelse. Fordelen i',
  'forhold til pulsen er praktisk: Tungen lyver mindre. Den ændrer sig',
  'langsommere og er mindre påvirket af ophidselse, kaffe eller en',
  'hastig gangtur.',
  '',
  'Begge dele sammen med udspørgningen og høren og lugten giver **de',
  'fire undersøgelser** — at se, at høre/lugte, at spørge, at føle. De',
  'munder ikke ud i en sygdom, men i et **mønster**. Og mønsteret er den',
  'egentlige diagnose.',
  '',
  '## Hvorfor bevægelse og åndedræt?',
  '',
  'Den fjerde gren er den stilleste og den billigste — og fra',
  'traditionens synspunkt den vigtigste. **Qigong** og **taiji** er',
  'langsomme, ledede bevægelsessekvenser med bevidst åndedræt. Deres',
  'begrundelse er enkel: Hvis sundhed betyder, at qi flyder frit, så kan',
  'man selv øve flydningen — dagligt, uden læge, uden medicin.',
  '',
  'Bagved står forebyggelsens forrang, som har præget denne medicin fra',
  'begyndelsen. „Den Gule Kejsers Klassiker" formulerer det',
  'umisforståeligt: Den overlegne læge behandler det, der endnu ikke er',
  'sygt; først at handle, når sygdommen er brudt ud, er, som at grave en',
  'brønd, når man allerede er tørstig, eller smede våben, når kampen er',
  'begyndt. Dertil hører også kost efter temperatur og årstid,',
  'regelmæssig søvn og mådehold i alting. Det er en medicin, der har',
  'noget at sige den raske — og ikke først den syge.',
  '',
  '## Hvordan erfaring blev til bøger',
  '',
  'Intet af dette er opstået på én dag. Udviklingen kan fortælles i',
  'trin.',
  '',
  'I begyndelsen står oraklet. I ruinerne af Anyang, den sidste',
  'Shang-hovedstad, fandt man titusindvis af beskrevne knogler og',
  'skildpaddeskjolde fra tiden omkring 1200 f.Kr. På dem står Kinas',
  'ældste sætninger om sygdom — „tandpine", „vil lidelsen forgå?" —',
  'rettet til forfædrene. Sygdom var dengang en forbandelse udefra, som',
  'næsten overalt i verden på den tid.',
  '',
  'Det egentlige brud kommer i århundrederne før tidsregningens',
  'begyndelse: Sygdom bliver til noget, der opstår af **forhold** — af',
  'kulde, vind, fugt, hede, af overdrev, af følelser. Lægen træder i',
  'besværgerens sted. Det blev sammenfattet i **Huangdi Neijing**, „Den',
  'Gule Kejsers Klassiker om det Indre", samlet omkring det 2. og 1.',
  'århundrede f.Kr. af ældre stof. Den er skrevet som en samtale mellem',
  'den sagnomspundne Gule Kejser og hans læger og består af to dele:',
  '„De enkle spørgsmål" (Suwen) og „Det spirituelle omdrejningspunkt"',
  '(Lingshu). Der står qi, yin og yang, forvandlingsfaserne og',
  'meridianerne samlet — den dag i dag grundlaget.',
  '',
  'Omtrent samtidig opstår **Shennong Bencao Jing**, urtelærebogen, der',
  'tilskrives den mytiske bondekejser Shennong — efter sagnet smagte han',
  'sig gennem hundrede urter og blev forgiftet halvfjerds gange om',
  'dagen. Den registrerer 365 lægemidler, ordnet i tre klasser: øvre,',
  'som man kan tage længe, midterste, som man sætter målrettet ind med,',
  'og nedre, som virker stærkt og gives kort. Altså en inddeling efter',
  'virkning og risiko — for to tusind år siden.',
  '',
  'Omkring 200 e.Kr. skriver **Zhang Zhongjing** „Afhandlingen om',
  'kuldeskader og forskellige sygdomme", efter at en epidemi havde revet',
  'en stor del af hans slægt bort. Hans bog oplister ikke recepter, men',
  'ordner forløbet af en febersygdom i stadier og nævner for hvert',
  'stadie den passende recept. Hans formler ordineres den dag i dag. I',
  'samme tid falder **Hua Tuo**, kirurgen, som overleveringen tilskriver',
  'et bedøvelsesmiddel og operationer i bughulen — hvad deraf er sandt,',
  'ved ingen.',
  '',
  'Så kommer århundrederne med at samle. **Sun Simiao** (7. årh.)',
  'skriver ved siden af sine receptsamlinger en berømt tekst om lægens',
  'holdning: Han skal behandle enhver syg ens, hvad enten den pågældende',
  'er fattig eller rig, ung eller gammel, ven eller fremmed — den',
  'kinesiske modpart til den hippokratiske ed. Og i 1578 fuldender **Li',
  'Shizhen** efter syvogtyve års arbejde **Bencao Gangmu**: 1892',
  'lægemidler, over ellevetusind recepter, med tegninger. Han samler',
  'ikke kun, han stryger også — overtroisk og farligt stof fra ældre',
  'bøger.',
  '',
  'Det sidste afsnit er det yngste, og det siges sjældent med: Den',
  'ordnede skikkelse, der i dag hedder „traditionel kinesisk medicin",',
  "opstod først i **1950'erne**. Tidligere var den kinesiske lægekunst",
  'flerstemmig, regionalt forskellig, uenig fra skole til skole; i det',
  'tidlige 20. århundrede var den endda tæt på et forbud, fordi mange',
  'reformatorer anså den for tilbagestående. Folkerepublikken har så',
  'sammenfattet den, ensrettet den, støbt den i lærebøger og undervist i',
  'den på universiteterne — også af praktisk nød, fordi der var alt for',
  'få vestligt uddannede læger. Det, der i dag fremtræder som en',
  'urgammel enhed, er altså en gammel viden i en ung orden. Den, der',
  'fortier det, fortæller en smukkere historie, end den var.',
  '',
  'I dag står den kinesiske medicin i Kina på lige fod med den',
  'vestlige: egne universiteter, egne hospitaler, egne afdelinger i',
  'vestlige klinikker. Mange syge får begge dele. Og over hele verden',
  'praktiseres den som komplementærmedicin — i Tyskland overvejende',
  'akupunkturen, i Østasien frem for alt urterne.',
  '',
  '## Hvad vi kan — og hvad man kan efterprøve det på',
  '',
  'Hvad har alt dette udrettet? Traditionen kan i dag ikke længere kun',
  'besvare dette spørgsmål med erfaring — og det burde den heller ikke.',
  'Der er steder, hvor afprøvningen med moderne midler er faldet ud til',
  'dens fordel — og andre, hvor den ikke er.',
  '',
  '**Det stærkeste bevis kommer fra urteskabet.** I 1969 begyndte',
  'farmakologen **Tu Youyou** efter opdrag fra et statsligt organ at',
  'gennemsøge gamle kinesiske receptsamlinger efter et middel mod',
  'malaria. Hun fandt hos **Ge Hong**, en læge fra det 4. århundrede,',
  'henvisningen til at lægge sommerbynken (*qinghao*) i vand og presse',
  'saften ud — påfaldende, for normalt kogte man. Hun sluttede deraf, at',
  'hede ødelægger det aktive stof, og udtrak det koldt med æter.',
  'Resultatet blev **artemisinin**, nutidens mest virksomme',
  'malariamiddel; det har reddet millioner af menneskers liv. I 2015 fik',
  'hun Nobelprisen i medicin for det. Det aktive stof stammer fra den',
  'moderne kemi — henvisningen til, hvor man skulle søge, stammer fra',
  'en et tusind seks hundrede år gammel receptbog.',
  '',
  '**Ved akupunkturen er billedet mere nuanceret, men ikke tomt.**',
  'Bedst undersøgt er kroniske smerter: en stor analyse af individuelle',
  'data fra omkring tyve tusind patienter (Vickers og kolleger, 2012 og',
  '2018) fandt ved kronisk ryg- og nakkesmerte, knæartrose og hovedpine',
  'en ægte, men moderat fordel i forhold til falsk akupunktur — og en',
  'tydeligere i forhold til sædvanlig behandling. For forebyggelsen af',
  'migræne og spændingshovedpine kommer Cochrane-oversigterne til et',
  'lignende resultat. Godt dokumenteret er desuden virkningen mod',
  'kvalme og opkast efter operationer og under kemoterapi (punktet',
  'Neiguan på underarmen). I Tyskland er akupunktur siden 2007 betalt af',
  'sygesikringen ved kronisk lændesmerte og knæartrose — på grundlag af',
  'de store tyske undersøgelser, hvor den klarede sig bedre end den',
  'sædvanlige behandling. Verdenssundhedsorganisationen (WHO) udgav i',
  '2003 en liste over indikationer; den er dog blevet kritiseret',
  'metodisk og anses i dag for at være for rummelig. Også det hører til',
  'en ærlig balance.',
  '',
  '**Bevægelse og åndedræt er diskret godt dokumenteret.** For taiji er',
  'der ordentlige beviser ved balance og faldforebyggelse i alderdommen',
  'og brugbare ved knæartrose, forhøjet blodtryk og fibromyalgi. Det er',
  'ingen sensation — men fald i alderdommen er et af de største uløste',
  'problemer i aldersmedicinen.',
  '',
  '**Og endelig det, som denne medicin kan uden måleapparat.** Den tager',
  'sig tid: En første anamnese varer ofte en time. Den spørger til søvn,',
  'fordøjelse, humør, årstid, levevis — også selvom anledningen er en',
  'knæsmerte. Den giver den syge en forklaring, som han kan huske og',
  'bruge til noget. Og den forventer af ham, at han selv gør noget. En',
  'del af den virkning, patienter beretter om, kommer sikkert derfra og',
  'ikke fra nålen. Fra traditionens synspunkt er det ingen indvending —',
  'omsorg er behandling. At den dermed forklarer en del af det, som',
  'forskningen kalder placeboeffekt, indrømmer den uden tøven.',
  '',
  '## Hvor vores fortælling bliver tynd',
  '',
  'Og nu de steder, hvor denne stemme selv må blive lavere. De hører',
  'med, og det er bedre at nævne dem selv.',
  '',
  '**For det første: Qi er ikke målbart.** Der er intet apparat, der',
  'viser det, og ingen struktur, der svarer til en meridian. Den, der',
  'anser den kinesiske medicin for naturvidenskab, forveksler to ting.',
  'Den er et gennem årtusinder forfinet ordningssystem for iagttagelser',
  '— ikke en model af stofskiftet. Som forklaring på, hvorfor noget',
  'virker, duer den derfor kun inden for sin egen logik.',
  '',
  '**For det andet: Studiebilledet er uoverskueligt, og en del af',
  'skylden ligger hos os.** Ved mange anvendelser — fra ufrugtbarhed',
  'over allergier til afhængighedsbehandlinger — rækker evidensen ikke',
  'til at sige mere end „uklart". Ved akupunkturen er forskellen til den',
  'falske behandling ofte lille; også at sætte nåle på „forkerte" steder',
  'virker ofte. Og undersøgelser fra Kina falder påfaldende ofte',
  'positivt ud — ved en gennemgang af ældre kinesiske studier gav',
  'praktisk talt alle et gunstigt resultat, hvilket statistisk ikke kan',
  'lade sig gøre. Negative resultater offentliggøres sjældnere. Det er',
  'et problem for traditionen, ikke for dens kritikere.',
  '',
  '**For det tredje: Nogle af vores midler har skadet mennesker.**',
  'Kejsertidens alkymi fremstillede eliksirer af cinnober, bly og arsen,',
  'som skulle skænke et langt liv — flere kejsere døde af dem. Cinnober',
  '(kviksølvsulfid) og realgar (arsensulfid) indgår den dag i dag i',
  "enkelte traditionelle præparater. I 1990'erne blev kvinder på en",
  'slankekur i Belgien syge af svær nyresvigt og senere af kræft i',
  'urinvejene: I recepten var der ved en fejl indgået en slangerod-art,',
  'som indeholder **aristolochiasyre**. Stoffet er i dag forbudt i',
  'Europa og begrænset i Kina — men det har slået mennesker ihjel. Og ma',
  'huang (ephedra), i århundreder et forkølelsesmiddel, har som',
  'slankemiddel udløst hjerteinfarkter.',
  '',
  '**For det fjerde: Planter er lægemidler og opfører sig også sådan.**',
  'Der findes ægte **vekselvirkninger** med moderne lægemidler —',
  'danshen forstærker for eksempel blodfortyndende midler, andre midler',
  'påvirker nedbrydningen af lægemidler i leveren. Den, der tager begge',
  'dele og ikke fortæller den ene læge om den anden, løber en risiko,',
  'som ingen kontrollerer. Dertil kommer kvalitetsproblemer: forurening',
  'med tungmetaller og pesticider, forveksling af ens udseende rødder,',
  'præparater med hemmeligt iblandede vestlige aktive stoffer.',
  '',
  '**For det femte: En del af vores medicinliste kan ikke forsvares.**',
  'Tigerknogler, næsehorn, bjørnegalde, skældyr — handelen med disse',
  'midler har bragt dyrearter til randen af udryddelse. Nytten er ingen',
  'steder dokumenteret; næsehornet leverer det samme keratin som en',
  'fingernegl. Kina forbød handelen i 1993, forbuddet er ikke tæt',
  'overalt, og efterspørgslen stammer i høj grad fra folketroen, ikke',
  'fra klassikerne. Det hjælper ikke at bagatellisere det: Denne side',
  'hører med til denne medicins historie.',
  '',
  '**Og for det sjette, det bitreste:** Hvor en let behandlbar sygdom i',
  'for lang tid kun behandles med urter, forløber der tid, som ingen',
  'henter tilbage. Ved en tumor, en blindtarmsbetændelse, en bakteriel',
  'lungebetændelse er denne medicin ikke første valg, og en ærlig læge',
  'fra traditionen siger det. Kinesiske hospitaler gør netop det i',
  'årtier: De opererer og giver antibiotika — og sætter traditionen ved',
  'siden af, ikke imod.',
  '',
  '## Hvad jeg overlader til den anden stemme',
  '',
  'Dermed ender det, som denne side kan fortælle indefra. Det, den ikke',
  'kan, er at betragte sig selv udefra.',
  '',
  'For der findes en anden fortælling, og den begynder for tre hundrede',
  'og halvtreds år siden i en havn: En hollandsk læge ser nåle og',
  'brændende urt, forstår ikke begrundelsen, undrer sig alligevel og',
  'opfinder et latinsk ord for det — „akupunktur". Fra da af fortsætter',
  'historien på et andet sprog. Hvad sker der, når en tænkemåde om',
  'balance møder en tænkemåde om årsag og virkning? Hvad har Vesten',
  'forstået af denne medicin, hvad har det lagt sig til rette, og hvad',
  'har det afprøvet — med hvilket resultat? Og hvad blev der af en',
  'kunst, der tænker i mønstre, da den blev målt i undersøgelser med',
  'kontrolgrupper?',
  '',
  'Det svarer den anden stemme i dette kapitel på: det vestlige blik —',
  'undren, skepsis og afprøvning.',
].join('\n');

/**
 * Det vestlige blik — hvordan den kinesiske medicin kom til Europa, hvad
 * Vesten beundrede ved den, hvordan den afprøvede den — og hvor den selv
 * fejlede.
 *
 * Skrevet af DeepSeek (runde 3, anden gennemgang). Også denne stemme
 * nævner selv sin egen sides ubehagelige pletter: kolonial arrogance,
 * kommercialisering, dobbelte standarder (tillægsregel for følsomme emner).
 */
const stimmeDesWestlichenBlicks = [
  '## Ankomsten i Vesten',
  '',
  'Det begyndte ikke med et laboratorium, men med rejsendes beretninger.',
  'Jesuitter bragte i det 17. århundrede de første efterretninger om',
  'kinesiske læger med, som behandlede sygdomme med nåle — og om',
  'puls-følingen, som angiveligt røbede alt. Europas lærde læste det med',
  'høflig skepsis. Man anså det for en kuriositet fra et fjernt land,',
  'ligesom man samlede på andre kuriositeter.',
  '',
  'Så kom natten, hvor nålen blev til en verdensnyhed: I 1971',
  'ledsagede amerikanske journalister Henry Kissinger til Kina, og en af',
  'dem, James Reston, blev opereret der. Hans smerter behandlede de',
  'kinesiske læger med akupunktur — og han skrev begejstret om det i',
  'New York Times. For første gang betragtede Vesten denne medicin med',
  'undren, ikke med nedladenhed.',
  '',
  '## Hvad Vesten så',
  '',
  'Det så læger, der føler pulsen seks steder og drager slutninger af',
  'det, som intet blodbillede kan levere. Det så recepter af et dusin',
  'planter i stedet for en enkelt tablet. Det så mennesker, der med en',
  'nål i foden lader en migræne behandle — og som siger, at det hjælper.',
  'Og det så en medicin, der tog mennesket som helhed: søvn, humør,',
  'årstid, kost, organernes indbyrdes forhold. Netop det, som den',
  'moderne medicin i specialiseringens tidsalder i stigende grad',
  'savnede.',
  '',
  'Undren var ærlig. Men det var også undren hos en tænkemåde, der er',
  'vant til at afprøve alting — og det gjorde den nu.',
  '',
  '## Afprøvningen',
  '',
  'Afprøvningen begyndte med akupunkturen, fordi den lettest lader sig',
  'indfange i undersøgelser. Man stak ægte nåle mod falske nåle, der',
  'ikke gennemtrænger huden, og sammenlignede. Resultatet var både',
  'nedslående og ophidsende på samme tid: Ved mange smertetilstande —',
  'rygsmerter, knæartrose, migræne — klarede den ægte akupunktur sig',
  'bedre end ingen behandling. Men forskellen til den falske akupunktur',
  'var ofte lille. Også de „forkerte" nåle virkede. Hvad betyder det?',
  'Enten virker ritualet — eller også forstår vi ikke meridianerne.',
  'Begge fortolkninger er tilladt, og forskningen strides om det den dag',
  'i dag.',
  '',
  'Urterne faldt strengere ud. Den store succes står i begyndelsen:',
  'Artemisinin, de sidste årtiers vigtigste aktive stof mod malaria,',
  'blev vundet af bynken, som den kinesiske helbredelsestradition har',
  'brugt i århundreder — forskeren Tu Youyou fik i 2015 Nobelprisen for',
  'det. Traditionel viden førte til medicinen. Men den samme afprøvning',
  'fandt også skyggesiderne: aristolochiasyre, som indgår i nogle',
  'traditionelle recepter, skader nyrerne og anses for kræftfremkaldende;',
  'nogle eliksirer fra kejsertiden indeholdt tungmetaller. Og',
  'studiebilledet som helhed er uoverskueligt: En påfaldende stor del af',
  'de positive resultater stammer fra Kina selv, hvor negative fund',
  'offentliggøres sjældnere. Det er ingen indvending mod traditionen —',
  'det er en opfordring til at afprøve nøje.',
  '',
  '## Hvor Vesten selv fejler',
  '',
  'Nu de ubehagelige pletter, for dem har denne stemme rigeligt af.',
  '',
  '**For det første: Den koloniale arrogance.** I over to århundreder har',
  'Vesten affærdiget den kinesiske medicin som overtro uden at afprøve',
  'den — af den samme holdning, der kaldte hele folkeslag „primitive".',
  'Den, der intet afprøver og alligevel fordømmer, har ikke vundet; han',
  'har bare ikke set efter.',
  '',
  '**For det andet: Kommercialiseringen.** Det, Vesten i dag sælger som',
  '„TKM", er ofte en nedbarberet, tilpasset version: akupunktur som',
  'wellness-tilbud, urter i kapsler, uden diagnosen, uden',
  'recept-logikken, uden lægen, der i en time føler pulsen. Den, der',
  'reducerer traditionen til sine produkter, forstår den ikke — han',
  'udnytter den.',
  '',
  '**For det tredje: De dobbelte standarder.** Vesten kræver af den',
  'kinesiske medicin undersøgelser, som det ikke altid kræver af sin',
  'egen: En stor del af de moderne farmakavirkninger støtter sig på den',
  'samme slags evidens, som man her savner — og den egne industris',
  'interessekonflikter nævnes sjældnere end den anden sides huller. Den,',
  'der peger på TKM, bør først efterse sin egen håndflade.',
  '',
  '## Hvad Vesten svarer den kinesiske stemme',
  '',
  'Den kinesiske stemme spurgte til sidst, hvad der blev af dens kunst,',
  'da den blev målt i undersøgelser med kontrolgrupper. Denne stemmes',
  'svar: Den blev afprøvet — somme tider fair, somme tider arrogant,',
  'somme tider grådigt. Det, der blev tilbage af den, er mere, end',
  'skeptikerne indrømmer, og mindre, end reklamen påstår. Og Vestens',
  'ærligste erkendelse lyder: Det har lært, at en medicin, der ser',
  'mennesket som helhed, kan noget, som dets egen har af-lært. Om det er',
  'en grund til fællesskab, må syntesen besvare.',
].join('\n');

/** Kapitel 2 i emnekortet. */
const chinaTcm = {
  id: 'china-tcm',
  titel: 'Kina og TKM',
  epoche: 'Fra de tidlige kejsere til i dag',

  aufhaenger: {
    frage: 'Hvad tænker en læge, der sætter en nål?',
    text: [
      'Den kinesiske medicin er over to tusind år gammel, overleveret',
      'uden afbrydelse — og i dag undervises der i den på Kinas',
      'universiteter, og den praktiseres over hele verden. Millioner af',
      'mennesker lader sig behandle med nåle, urtblandinger og langsomme',
      'bevægelsesøvelser.',
      '',
      'Udefra virker det gådefuldt. Hvorfor stikker nogen en nål i',
      'hånden, når hovedet gør ondt? Hvorfor ordinerer en læge tolv',
      'planter i stedet for én? Hvorfor føler han pulsen seks steder og',
      'ser på tungen i stedet for at tage blod?',
      '',
      'På alt det er der svar — de følger bare en anden logik end den',
      'vante. Dette kapitel forklarer først denne logik, så præcist som',
      'muligt og i dens egne ord. Derefter spørger det lige så præcist:',
      'Hvad af det består afprøvningen?',
    ].join('\n'),
  },

  // Kortet ligger i utils/themen/karten/china-tcm.js — her er kun dets
  // tekster oversat (faser, punkter, bevægelser), ikke selve kortet.
  karteHinweise: [
    {
      label: '~2000 f.Kr.: de tidlige kulturer ved Den Gule Flod',
      hinweis:
        'Ved Den Gule Flod og Yangtze opstår landsbyer, byer og den ' +
        'første skrift. Fra denne tid stammer de ældste efterretninger ' +
        'om sygdom i Kina: spørgsmål til forfædrene, ridset i knogler.',
    },
    {
      label: '~2. årh. f.Kr.: Han-riget',
      hinweis:
        'I Han-riget samles og ordnes der: „Den Gule Kejsers Klassiker" ' +
        'og Shennongs urtelærebog opstår. Mod vest åbner Silkevejen sig — ' +
        'den fører langt ud over billedets kant.',
    },
    {
      label: '~16. årh.: Ming-tiden',
      hinweis:
        'Li Shizhen gør i 1578 sit store lægemiddelværk færdigt. ' +
        'Samtidig lægger europæiske skibe til i Kanton og Macau — derfra ' +
        'går de første beretninger om nåle og puls-føling til Europa.',
    },
    {
      label: 'Anyang',
      hinweis:
        'Her lå Shang-tidens sidste hovedstad (omkring 1200 f.Kr.). I ' +
        'ruinerne fandt man titusindvis af beskrevne skulderblade og ' +
        'skildpaddeskjolde: orakelknogler. På dem står Kinas ældste ' +
        'kendte sætninger om sygdom — „tandpine", „hovedpine", „vil ' +
        'sygdommen forgå?". Spurgt blev forfædrene, ikke lægen. ' +
        'Lægekunsten begynder i Kina som en samtale med de døde.',
    },
    {
      label: 'Xi’an (Chang’an)',
      hinweis:
        'Som Chang’an var byen hovedstad for Han og Tang — og Silkevejens ' +
        'østlige udgangspunkt. I Han-tiden blev her samlet det, der den ' +
        'dag i dag er grundlaget for den kinesiske medicin: „Den Gule ' +
        'Kejsers Klassiker om det Indre". I en grav ved Changsha fandt ' +
        'man skriftruller, der er endnu ældre og allerede kender ' +
        'meridianerne — dog uden nåle.',
    },
    {
      label: 'Luoyang',
      hinweis:
        'Han-tidens anden store hovedstad. I disse århundreder skriver ' +
        'Zhang Zhongjing sin „Afhandling om kuldeskader" — en bog, der ' +
        'ikke længere kun oplister recepter, men ordner sygdomme efter ' +
        'stadier og nævner en recept for hvert stadie. Herfra gik viden ' +
        'videre over Korea til Japan, hvor deraf blev kampō-medicinen.',
    },
    {
      label: 'Qichun',
      hinweis:
        'Li Shizhens hjemsted (1518–1593). I syvogtyve år samlede han, ' +
        'efterprøvede, kasserede og ordnede — resultatet blev „Bencao ' +
        'Gangmu", færdig i 1578: 1892 lægemidler, over 11 000 recepter, ' +
        'med tegninger. Han streg også: tåbeligt, overtroisk og farligt ' +
        'stof fra ældre bøger. Værket anses den dag i dag for den gamle ' +
        'verdens største urtelærebog.',
    },
    {
      label: 'Guangzhou (Kanton)',
      hinweis:
        'Sydens store havn, i århundreder den eneste port for europæiske ' +
        'skibe. Over Kanton og det nærliggende Macau kom de første ' +
        'efterretninger om kinesisk lægekunst til Europa: jesuitter ' +
        'oversatte tekster om puls-føling, købmænd berettede om nåle og ' +
        'brændende urte-kegler. Forstået blev deraf i starten lidt — ' +
        'beundret til gengæld så meget desto mere.',
    },
    {
      label: 'Peking',
      hinweis:
        'I dag den kinesiske medicins centrum: Her ligger store ' +
        'TKM-universiteter og klinikker, hvor urterecepter og akupunktur ' +
        'står ved siden af røntgenapparater og laboratorieværdier. I ' +
        'Kina er begge mediciner anerkendt af staten; mange syge får ' +
        'begge dele. Den nuværende, ordnede skikkelse af „TKM" er dog ' +
        'ung — den opstod i 1950’erne.',
    },
    {
      label: 'Silkevejen mod vest',
      hinweis:
        'Fra Chang’an drog karavanerne mod vest — og sammen med varerne ' +
        'rejste viden. Fra Persien og Indien kom lægeplanter til Kina, ' +
        'fra Kina gik kanel, rabarber og ingefær den anden vej; ' +
        'rabarberrod var i århundreder et af Europas mest eftertragtede ' +
        'lægemidler. Vejen fører langt ud over billedets kant: helt til ' +
        'Samarkand, Bagdad og Middelhavet.',
    },
    {
      label: 'Over Korea til Japan',
      hinweis:
        'I det 6. og 7. århundrede bragte munke og udsendinge de ' +
        'kinesiske lægemiddelværker over Korea til Japan. Der voksede ' +
        'deraf en egen tradition: kampō-medicinen, som praktiseres den ' +
        'dag i dag — med de samme recepter, men slankere doseret og ' +
        'anderledes begrundet. Viden forbliver sjældent, som den ankommer.',
    },
    {
      label: 'De første beretninger til Europa',
      hinweis:
        'Fra det 16. århundrede tog portugisiske, hollandske og ' +
        'jesuitiske rejsende med, hvad de havde set i Kina. Selve ordet ' +
        '„akupunktur" er europæisk: Den hollandske læge Willem ten Rhijne ' +
        'dannede det i 1683 af latin — han havde dog set nålene i Japan, ' +
        'ikke i Kina. Sådan kom kundskaben til Vesten: fra anden hånd og ' +
        'i fremmede ord.',
    },
  ],

  perspektiven: [
    {
      id: 'tcm-innen',
      name: 'Den kinesiske medicins stemme',
      stimme: 'Opus',
      text: stimmeDerChinesischenMedizin,
    },
    {
      id: 'westlicher-blick',
      name: 'Det vestlige blik',
      stimme: 'DeepSeek',
      text: stimmeDesWestlichenBlicks,
    },
  ],

  synthese: [
    '## Hvor begge stemmer mødes',
    '',
    'Først det fælles. Begge stemmer anerkender, at TKM bygger på',
    'årtusinder af iagttagelse — traditionen kalder det sin erfaring,',
    'Vesten kalder det empirisk grundlag. Begge ser helhedens værdi: Den',
    'kinesiske medicin behandler mennesket som helhed, og Vesten',
    'indrømmer, at det har af-lært denne evne. Begge er enige om, at',
    'omsorg og forventning virker — traditionen siger det åbent („omsorg',
    'er behandling"), forskningen måler det som placebo- og',
    'forventningseffekt. Og begge deler en stor succes: artemisinin,',
    'vundet af den kinesiske traditions bynke, mod malaria — tradition',
    'og laboratorium har her arbejdet sammen, og verden har profiteret',
    'af det.',
    '',
    '## Hvor de går fra hinanden',
    '',
    'Modsigelsen begynder ved spørgsmålet om målelighed. For den',
    'kinesiske medicin er qi en virkelighed i dens tænkning — for Vesten',
    'er det, der ikke lader sig måle, i første omgang ikke et aktivt',
    'stof. De strides ikke om enkelte nåle, men om spørgsmålet om, hvad',
    'der tæller som bevis: et gennem årtusinder forfinet ordningssystem',
    'for iagttagelser eller en undersøgelse med kontrolgruppe? Dertil',
    'kommer fortolkningen af resultaterne: Hvis også den falske nål',
    'virker, er det for nogle en henvisning til ritualet — for andre en',
    'henvisning til, at forskningen blot ikke måler meridianerne. Og der',
    'strides om, hvem der tjekker regningen: Vesten kræver af TKM',
    'undersøgelser, som det ikke altid kræver af sin egen',
    'medicinalindustri.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'For tredje gang viser det samme mønster sig: Tænkemåden bestemmer',
    'metoden. Den ægyptiske medicin så kroppen som et land med kanaler,',
    'den tidlige lægekunst så lodets forstyrrelse — og Kina ser balancen',
    'mellem qi, yin og yang. Tre gange en anden tænkemåde, tre gange en',
    'i sig selv sammenhængende tænkning, der har hjulpet mennesker.',
    '',
    'Og endnu noget bliver her første gang synligt: muligheden for',
    'fællesskab i et konkret eksempel. Artemisinin har vist vejen —',
    'traditionel viden, moderne afprøvet og fremstillet. Måske er',
    'fremtiden ikke et valg mellem to tænkemåder, men kunsten at sætte',
    'hver af dem ind, hvor den er stærk: bekæmpe årsagen, hvor den er',
    'kendt — og holde mennesket i balance, hvor årsagen forbliver uklar.',
    'Det ville ikke være et forræderi mod den ene eller den anden side.',
    'Det ville være medicin.',
  ].join('\n'),

  urteil: {
    frage: 'Ville du lade dig behandle med nåle — og hvad ville det komme an på for dig?',
    hinweis: [
      'Der er her ikke noget rigtigt og forkert. Tænk på det, der er',
      'dokumenteret (kroniske smerter, kvalme, artemisininet mod',
      'malaria), på det, der forbliver uklart, og på det, der kan skade',
      '(aristolochiasyre, vekselvirkninger, tabt tid ved en alvorlig',
      'sygdom). Skulle nogen kunne forklare dig, hvorfor noget virker —',
      'eller ville det være nok for dig, at det hjælper dig? Og gør det',
      'en forskel, om det drejer sig om en kronisk rygsmerte eller om en',
      'lungebetændelse?',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Hvad fik den kinesiske farmakolog Tu Youyou i 2015 ' +
        'Nobelprisen i medicin for?',
      antworten: [
        'For forskningen i akupunkturpunkterne.',
        'For malariamidlet artemisinin fra sommerbynken.',
        'For udviklingen af det første kinesiske antibiotikum.',
      ],
      richtig: 1,
      erklaerung:
        'Tu Youyou gennemsøgte gamle kinesiske receptsamlinger og stødte ' +
        'hos Ge Hong (4. århundrede) på henvisningen til at presse bynken ' +
        'koldt. Deraf opstod artemisininet — den dag i dag det mest ' +
        'virksomme middel mod malaria.',
    },
    {
      frage: 'Hvad betegner begrebet „qi" i den kinesiske medicin?',
      antworten: [
        'En målelig energiart, som blev påvist i 1970’erne.',
        'En tænkemodel for bevægelse og funktion i kroppen — ikke et ' +
          'stof, der kan måles med apparater.',
        'En bestemt lægeplante fra Sydkina.',
      ],
      richtig: 1,
      erklaerung:
        'Qi beskriver det, der i kroppen varmer, bevæger, holder sammen ' +
        'og forvandler. Et måleapparat dertil findes ikke — også ' +
        'traditionen selv forstår qi som et ordensbegreb, ikke som en ' +
        'fysisk størrelse.',
    },
    {
      frage:
        'Hvornår blev „Den Gule Kejsers Klassiker" (Huangdi Neijing) ' +
        'samlet?',
      antworten: [
        'Omtrent i det 2. og 1. århundrede f.Kr., af ældre materiale.',
        'Først i det 19. århundrede, efter kontakten med Europa.',
        'Omkring 3000 f.Kr., af Den Gule Kejser personligt.',
      ],
      richtig: 0,
      erklaerung:
        'Værket opstod i Han-tiden af ældre tekster og er skrevet som en ' +
        'samtale mellem den sagnomspundne Gule Kejser og hans læger. ' +
        'Kejseren selv er en sagnskikkelse — formen gav bogen autoritet.',
    },
    {
      frage:
        'Passer det, at akupunktur i Tyskland betales af den offentlige ' +
        'sygesikring?',
      antworten: [
        'Nej, den er grundlæggende en privat ydelse.',
        'Ja — siden 2007 ved kronisk lændesmerte og knæartrose.',
        'Ja, ved alle gener uden begrænsning.',
      ],
      richtig: 1,
      erklaerung:
        'Efter store tyske undersøgelser besluttede det fælles ' +
        'forbundsudvalg (Gemeinsamer Bundesausschuss) i 2007, at ' +
        'akupunktur ved kroniske lænde- og knæsmerter skulle refunderes. ' +
        'For andre gener betaler sygesikringen den ikke.',
    },
    {
      frage: 'Hvordan foregår den klassiske pulsdiagnose i den kinesiske medicin?',
      antworten: [
        'Den tæller slagene i minuttet på halspulsåren.',
        'Den afsøger tre positioner på hvert håndled i flere dybder og ' +
          'vurderer pulsens kvalitet.',
        'Den måler blodtrykket på begge overarme.',
      ],
      richtig: 1,
      erklaerung:
        'Der føles seks steder — tre på hvert håndled, hver i flere ' +
        'dybder. Det er ikke frekvensen, der vurderes, men ' +
        'beskaffenheden: stram, glat, ru, dyb, tom. Klassikerne skelner ' +
        'mellem 28 sådanne puls-billeder.',
    },
  ],
};

module.exports = chinaTcm;
