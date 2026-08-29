// Kapitel 13 — „Statsliggørelsen af sundhedsvæsenet".
//
// Nyere tids femte kapitel og det første, hvor ikke en forsker, men
// en lov spiller hovedrollen. Indtil 1883 var der ved sygesengen to
// parter: den syge og den, der behandlede ham. Den 15. juni 1883
// træder en tredje til — staten. Den betaler ikke selv, men den
// foreskriver, at der betales, af hvem, hvor meget og til hvad. Den
// syge bliver til en forsikret, lægen til en kasselæge, behandlingen
// til et krav. Siden da er spørgsmålet om, hvem sundheden tilhører,
// et af samfundets største stridsspørgsmål.
//
// TÆNKEMÅDE-analysen er kernen (forfatterens krav). Den spørger
// her: Hvorfor overhovedet staten? (Fordi industrialiseringen har
// revet de gamle net i stykker — den, der bliver syg i minekolonien,
// har hverken jord, slægt eller lav, kun den udeblivende løn; og
// fordi utilfredse masser truer ordenen.) Hvorfor en forsikring og
// ikke velgørenhed? (Fordi almisse gør afhængig og i Preussen endda
// kostede stemmeretten — forsikringen skaber et retskrav, man kan
// gå rettens vej med uden at tigge.) Hvorfor pligten? (Fordi
// frivilligheden holder de raske væk og dermed tømmer netop den
// kasse, der skal bære de syge.) Og bagsiden af hver eneste
// begrundelse: Den, der betaler, er medbestemmende; den, der
// forvalter, kontrollerer; den, der giver adgang, lukker ude.
//
// LÆNGDEREGEL (forfatterens feedback 24.08.2026): Fra kapitel 9
// gælder det modsatte — fuldstændigt og udførligt. Udførligt
// betyder ikke opsvulmet: hvert afsnit fører fortællingen videre.
// Målt i tests/karte-verstaatlichung.mjs.
//
// TONE-reglen: BEGGE sider behandles fair. Den første stemme viser
// sociallovenes velsignelse (lægen for alle, hygiejnen som
// statsopgave, den faldende dødelighed, forbilledet for verden) OG
// nævner selv de ubehagelige steder: den politiske hensigt ved siden
// af socialistloven, kontrollen og bureaukratiet, den syge med
// nummer, naturmedicinens økonomiske fortrængning — og det, en
// senere stat gjorde med det samme værktøj.
//
// INGEN RYGTER (forfatterens beslutning 25.08.2026): Kun det, der
// er belagt. To vendinger, som Bismarck ofte tillægges, står sådan
// i ingen protokol; teksten siger det udtrykkeligt og stiller de
// dokumenterede sætninger ved siden af.
//
// INNOVATIONSCYKLUSSEN (forfatterens observation 26.08.2026, den
// røde tråd): Også en institution er en opfindelse. Velfærdsstaten
// har hjulpet millioner — og givet staten et værktøj i hånden, som
// en senere stat vendte mod menneskene. Stemmen siger det selv.
//
// Stemmer (runde 14): Den FØRSTE synsvinkel — staten indefra, akten
// fra rigskanslerembedet — skrev Opus. Den ANDEN (de forsikrede og
// de fortrængte: arbejderne med sygekassekortet, den nye tryghed og
// den nye afhængighed; naturlægerne, urtekvinderne og baderne, som
// sygekasserne fratog grundlaget) og den endelige syntese supplerede
// Hermes i anden omgang. Synsvinkel-workflow: CLAUDE.md.
//
// INGEN GENTAGELSER (forfatterens beslutning 21.08.2026): Kapitel 1
// struktureres efter „hvem der taler her", kapitel 2 begynder med en
// scene, kapitel 3 fortæller et døgn, kapitel 4 er en brevveksling,
// kapitel 5 en bogs rejse, kapitel 6 en rundvisning, kapitel 7 en
// retssag, kapitel 8 en regning, kapitel 9 et ur, kapitel 10 en kæde,
// kapitel 11 en linse, kapitel 12 et interview. Dette kapitel vælger
// den fjortende dramaturgi: AKTEN. Staten taler, som den virkelig
// taler — i ark, sagsakter, paragraffer og marginalbemærkninger. Den
// anden stemme kan træde i samme form: den anden akt, den forsikredes
// akt, hvor den samme sag set nedefra ser anderledes ud.
//
// Teksterne ligger som linje-Arrays med `.join('\n')` — sådan
// forbliver de i repoet læsbare ved ~72 tegn (forfatteren læser dem
// her imod), og utils/markdown.js gør i appen igen flydende tekst ud
// af dem.
//
// CommonJS uden UI-import (arkitekturregel): kan kontrolleres med
// blankt `node`.

/**
 * Statens stemme — akten fra rigskanslerembedet.
 *
 * Skrevet af Opus (runde 14). En stemme, der taler for den side, der
 * har lavet lovene: dens situation, dens regnestykke, dens hensigt.
 * Den fortæller, hvorfor den gjorde, hvad den gjorde — og den nævner
 * selv de ubehagelige steder (tillægsregel for følsomme emner i
 * CLAUDE.md).
 */
const statensStemme = [
  '## Akten, der ligger i rigskanslerembedet',
  '',
  'En stat tænker ikke i fortællinger. Den tænker i sagsakter. Det, der',
  'beskæftiger den, får et nummer, en kuvert og en rækkefølge; den, der',
  'senere vil vide, hvorfor noget skete, slår arkene op og læser bagfra',
  'mod forrest.',
  '',
  'Dette kapitel er sådan en akt. Den bærer titlen „Det sociale',
  'spørgsmål" og ligger mellem 1871 og 1911 i rigskanslerembedet i',
  'Berlin. Den indeholder rapporter fra minerne, avisudklip,',
  'lovforslag, mødereferater, bidragstabeller, klager fra læger,',
  'henvendelser fra foreninger — og nogle sedler, der egentlig ikke',
  'hører til i den.',
  '',
  '**Det, du læser her, er statens syn på sig selv — en tænkemåde,',
  'ikke en sandhed.** Staten har i disse år anset sig selv for de',
  'svages beskytter, og den havde grunde til det. Den har samtidig',
  'anset sig selv for at være ordenens vogter og havde også grunde',
  'til det. Begge dele står i samme akt, ofte på samme ark.',
  '',
  'To sætninger, som man gerne lægger rigskansleren i munden, står',
  'sådan i ingen protokol: at den sociale elendighed var',
  'socialdemokratiets skarpeste våben, og at staten skulle behandle',
  'arbejderen sådan, at denne elskede den. De rammer meningen med',
  'sagen, men de er ikke dokumenterede. **Hvor noget kun er',
  'overleveret og ikke kan belægges, siger jeg det til.** De',
  'sætninger, der virkelig faldt, står længere nede, og de er',
  'tydelige nok.',
  '',
  '## Ark 1: Befundet — hvad fabrikken gør ved menneskene',
  '',
  'Det første ark er ingen lov, men en beskrivelse. Uden den giver',
  'resten af akten ingen mening.',
  '',
  'Efter rigsgrundlæggelsen i 1871 vokser landet hurtigere, end',
  'nogen kan indrette det. Befolkningen stiger fra omkring enogfyrre',
  'millioner til femogtres millioner i 1910. Men først og fremmest',
  'flytter den: I 1871 bor godt en tredjedel af menneskene i byerne,',
  'i 1910 er det omkring to tredjedele. Berlin vokser fra omkring',
  'ottehundrede og tyve tusind indbyggere til over halvanden million.',
  'Til Ruhr-området kommer fra Østpreussen, Masurien, Posen og',
  'Schlesien flere hundrede tusinde.',
  '',
  'Disse tal er den egentlige sagsakt. **For et menneske, der flytter',
  'fra landsbyen til minekolonien, mister ikke kun sit hjem. Det',
  'mister hele sit sikkerhedsnet på én gang.**',
  '',
  'På landet var den syge aldrig alene. Der var et stykke ager, der',
  'blev dyrket videre; en storfamilie, der trådte til; en præst, en',
  'sognemenighed, en godsejer med en pligt af en eller anden art; et',
  'lav med sin kasse, hvorfra mesterens enke fik noget; en viden om',
  'urter i huset og en helbredskvinde i landsbyen. Det var hverken',
  'retfærdigt eller pålideligt — men det var der.',
  '',
  'I lejekasernen er intet af det tilbage. I Berliner Ackerstraße',
  'står siden 1874 et hus med seks baggårde, hvor over tusind',
  'mennesker bor. Hvem der ikke selv har råd, bliver **sengens',
  'lejer**: Han lejer ikke en bolig, ikke et værelse, men en seng —',
  'og det i timevis, for i samme seng har natholdet sovet før ham.',
  'Børnene dør i baggårdene af diarré, mæslinger, difteri og',
  'tuberkulose. Omkring 1900 dør i riget omtrent hvert femte barn i',
  'sit første leveår.',
  '',
  'Og hvem der arbejder, arbejder farligt. Under jorden styrter en',
  'minegang sammen, i smelteværket vælter flydende jern, ved maskinen',
  'springer et drivrem. Indtil 1884 har den forulykkede kun én vej:',
  'Han stævner virksomhedsejeren og må bevise, at denne har **skyld**.',
  'En minearbejder uden ben og uden penge, der skal bevise uagtsomhed',
  'mod en minetyv for en domstol — det er ingen retsvej, det er en',
  'hån.',
  '',
  'Så er der kommunens fattighjælp. Den findes, og den har en pris,',
  'som i dag er svær at tro: **Den, der i Preussen modtog',
  'fattighjælp, mistede sin stemmeret.** Han blev journalført, han',
  'blev besigtiget, han blev ført som almisse-modtager. Derfor gik',
  'folk ikke dertil, så længe de kunne kravle.',
  '',
  '**Hvorfor overhovedet staten?** Her er svaret, og det har to',
  'halvdele, som begge er sande.',
  '',
  'Den første halvdel: **Fordi der ellers ikke er nogen tilbage.**',
  'Industrialiseringen har ikke beskadiget de gamle net, den har',
  'skåret dem over. Familie, lav, landsby, godsejer — alt det, der i',
  'århundreder har båret den syge, ligger fire hundrede kilometer',
  'væk. Tilbage er løn og husleje. Og lønnen holder op i det øjeblik,',
  'hvor mennesket har brug for den allermest.',
  '',
  'Den anden halvdel: **Fordi en utilfreds masse er farlig.** Jeg',
  'pynter ikke på det. Millioner af mennesker, der intet har at tabe,',
  'trængt sammen i byerne, læsende, organiserede, vrede — det er for',
  'enhver regering et spørgsmål om sikkerhed, ikke om medfølelse.',
  'Hvem der ærligt læser akten, finder begge motiver på samme ark, og',
  'han vil ikke kunne adskille dem rent.',
  '',
  '## Ark 2: Pisken — socialistloven af 21. oktober 1878',
  '',
  'Det næste ark er det ubehageligste i hele akten, og det optræder',
  'som regel ikke i fortællingerne om velfærdsstaten. Men det hører',
  'til på dette sted, for det kom først.',
  '',
  'I 1878 skydes der to gange mod kejser Wilhelm I.: den 11. maj af en',
  'klejnsmedesvend ved navn Max Hödel, den 2. juni af en doktor i',
  'nationaløkonomi ved navn Karl Nobiling; kejseren bliver alvorligt',
  'såret. **Ingen af de to tilhørte socialdemokratiet** — Hödel var',
  'blevet udelukket fra partiet, Nobiling var aldrig medlem. Det er',
  'dokumenteret, og det stoppede ikke regeringen.',
  '',
  'Den 21. oktober 1878 vedtager Rigstagen „loven mod',
  'socialdemokratiets almenfarlige bestræbelser". Forbudt bliver',
  'foreninger, forsamlinger, aviser, skrifter, indsamlinger. Over',
  'enkelte steder udråbes belejringstilstand; omkring ni hundrede',
  'mennesker bliver udvist, godt og vel tusind dømt til fængselsstraffe.',
  'Loven forlænges fire gange og udløber først den 30. september 1890.',
  '',
  'Der var et hul: **Man måtte stadig stille op.** Fordi stemmeretten',
  'ikke blev rørt, sad socialdemokratiske medlemmer i hele de tolv år',
  'i Rigstagen. De var forbudte og valgte på samme tid.',
  '',
  'Hvorfor ligger dette ark i en akt om sundhedsvæsenet? Fordi',
  'sociallovene ikke kan forstås uden det. **Regeringen hjalp ikke',
  'først og forbød så. Den forbød først og hjalp så** — og den',
  'betragtede begge dele som ét eneste foretagende. Eftertiden kalder',
  'det pisk og gulerod. Akten kalder det orden og omsorg. Meningen er',
  'den samme.',
  '',
  '## Ark 3: Guleroden — det kejserlige budskab af 17. november 1881',
  '',
  'Tre år efter forbuddet oplæser rigskansleren i Rigstagen et',
  'budskab fra kejseren. Det er velfærdsstatens grundlæggelsestekst,',
  'og dets kernsætning siger hensigten så åbent, at man ikke behøver',
  'at fortolke den. Den lyder, at helbredelsen af de sociale skader',
  '**„ikke udelukkende søges ad repressiv vej mod socialdemokratiske',
  'udskejelser, men lige så meget ad vejen til positiv fremme af',
  'arbejdernes velfærd"**.',
  '',
  'Man skal læse det langsomt. Der står ikke: Vi har taget fejl,',
  'forbuddet var forkert. Der står: Forbuddet alene er ikke nok, vi',
  'har også brug for det andet. Budskabet annoncerer, hvad der skal',
  'komme ud af det: en forsikring mod sygdom, en mod ulykker, en for',
  'alderdommen og invaliditeten.',
  '',
  'Og tre år senere, den 9. maj 1884, siger kansleren i Rigstagen en',
  'sætning, der har endnu mindre brug for fortolkning: **„Hvis der',
  'ikke fandtes noget socialdemokrati, og hvis ikke en mængde',
  'mennesker frygtede det, ville de beskedne fremskridt, som vi',
  'overhovedet har gjort i socialreformen indtil nu, heller ikke',
  'eksistere."**',
  '',
  'Hans fortrolige Moritz Busch har nedskrevet, hvordan han',
  'formulerede det i en privat samtale: Hans tanke havde været at',
  'vinde arbejderklassen — eller skulle han sige: at bestikke den —,',
  'til at se staten som en social institution, der består for dens',
  'skyld og vil sørge for dens velfærd. **Den formulering er ingen',
  'tale, men en nedtegnelse fra anden hånd; den er kendetegnet som',
  'sådan.** Den ændrer intet ved befundet.',
  '',
  'Det ville være bekvemt at slutte deraf: altså var alt kun',
  'beregning. Det giver akten ikke grundlag for. En lov, der opstår',
  'af beregning, virker derfor ikke mindre. Minearbejderen, hvis',
  'brækkede ben i 1886 skinnes for kassens regning, har ingen gavn af',
  'at vide, af hvilket motiv paragraffen blev skrevet. **Spørgsmålet',
  'er ikke, om hensigten var ren. Spørgsmålet er, hvad loven har',
  'gjort.**',
  '',
  '## Ark 4: Tænkemåden — fra almisse til krav',
  '',
  'Nu kommer det ark, det kommer an på. For den egentlige nyskabelse',
  'i 1883 er ikke pengene. Det er en anden måde at tænke om, hvad',
  'hjælp overhovedet er.',
  '',
  'Indtil da kendte Europa to former: **velgørenheden** og',
  '**selvhjælpen**. Velgørenheden var almissen — legatfonden,',
  'klosterporten, hospitalet som velgørende stiftelse, kommunens',
  'fattigkasse. Den hjalp uregelmæssigt, den hjalp efter personens',
  'anseelse, og den hjalp oppefra og ned. Selvhjælpen var kassen,',
  'fællesskabet, broderskabet: minearbejderne med deres',
  'århundredgamle **minebroderskaber**, håndværkssvendene med deres',
  'lavskasser, senere arbejderforeningernes frie hjælpekasser. Den',
  'hjalp mere retfærdigt, men den rakte kun så langt som gruppen.',
  '',
  '**Hvorfor en forsikring og ikke velgørenhed?** Fordi velgørenheden',
  'gør mennesket til en beder og forsikringen til en berettiget. Det',
  'er hele forskellen, og den er enorm.',
  '',
  'Den, der modtager en almisse, må bede om den, må virke værdig,',
  'må lade sig besigtige — og mister i Preussen endda sin stemmeret.',
  'Den, der er forsikret, har et **retskrav**. Han beder ikke, han',
  'fordrer. Han kan klage, og han kan gå rettens vej. Han behøver',
  'ikke være taknemmelig. **Af en nåde bliver en ret — og den, der',
  'har en ret, behøver ikke sænke hovedet.** Netop derfor valgte',
  'staten denne model og ikke en opgradering af fattigkasserne, som',
  'havde været billigere.',
  '',
  'Regnestykket bagved er enkelt og urgammelt; hansekøbmændene',
  'kendte det for deres skibe. **Mange betaler lidt, for at den',
  'enkelte i ulykken får meget.** Ingen ved på forhånd, hvem det går',
  'ud over. Hvis alle betaler, kan enhver bæres. Det er ingen',
  'omfordeling fra rig til fattig — bidragene kom fra de samme smalle',
  'lønninger. Det er en omfordeling **fra de raske til de syge og fra',
  'de gode år til de dårlige.** Arbejderen forsikrer sig i grunden mod',
  'sit eget fremtidige uheld.',
  '',
  'Og det fører til den formel, der bærer hele tænkemåden: **Sundhed',
  'er hverken en forretning eller en nåde, men en sag for',
  'fællesskabet.** Om nogen bliver behandlet, skal ikke afhænge af,',
  'hvor meget vedkommende har i lommen.',
  '',
  'Denne formel har en bagside, og jeg nævner den med det samme, så',
  'den ikke senere lyder som en bebrejdelse: **Den, der betaler, er',
  'medbestemmende.** Når fællesskabet bærer behandlingen, får',
  'fællesskabet et ord at skulle have sagt om, hvad der behandles, af',
  'hvem, hvor længe og til hvilken pris. Den sætning står i 1883 i',
  'ingen paragraf. Den er alligevel i loven fra første færd, ligesom',
  'træet er indeholdt i kernen.',
  '',
  '## Ark 5: Tvangen — hvorfor pligten og ikke frivilligheden',
  '',
  'En indvending kom straks, og den kom fra de liberale: Hvorfor',
  'tvang? Lad dog folk selv beslutte, om de vil forsikre sig. Der',
  'findes hjælpekasser, der findes foreninger, der findes',
  'sparebøger. Staten skal ikke stikke hånden i lønningspungen.',
  '',
  'Svaret står i erfaringerne med netop disse frie hjælpekasser, og',
  'det er nøgternt: **Frivilligheden svigter præcis der, hvor den',
  'skal bruges.**',
  '',
  'Hvem der er ung, stærk og rask, melder sig ikke ind. Han har',
  'anden brug for sine skillinger og føler sig usårlig. Hvem der er',
  'gammel, svag eller kronisk syg, melder sig ind, så snart han kan.',
  'Dermed samler en frivillig kasse præcis de mennesker, der koster',
  'meget, og mister dem, der kunne bære. Den må forhøje bidragene,',
  'hvorefter de tilbageværende raske melder sig ud, hvorefter den må',
  'forhøje bidragene igen. Til sidst står der en dyr kasse for fattige',
  'syge — eller slet ingen.',
  '',
  'Dertil kommer skiftet af arbejdsplads. Hjælpekasserne hang sammen',
  'med virksomhed, sted eller forening; hvem der flyttede videre,',
  'mistede sin optjente ret og begyndte forfra. I et land, hvor',
  'millioner flyttede, var det en konstruktionsfejl.',
  '',
  'Derfor pligten. **Pligten er ikke solidaritetens modsætning, den',
  'er dens forudsætning** — en kasse er kun solidarisk, hvis også de',
  'er med, som den i øjeblikket ikke har brug for.',
  '',
  'Og også her hører bagsiden på samme ark: **Pligt betyder tvang.**',
  'Fra 1883 er en del af lønnen ikke længere løn; den bliver tilbageholdt,',
  'før arbejderen får den i hånden, og andre beslutter over dens',
  'anvendelse. Hvem der siger, at det er formynderi, har ret i sagen —',
  'han siger bare ikke, hvad alternativet var.',
  '',
  '## Ark 6: Loven af 15. juni 1883 — hvad der virkelig står i den',
  '',
  'Nu selve sagsforløbet. Den 15. juni 1883 vedtages',
  'sygeforsikringsloven; den 1. december 1884 træder den i kraft. Det',
  'er den første lov af denne art i verden.',
  '',
  '**Hvem er forsikret?** Først og fremmest industriarbejdere i',
  'fabrikker, miner, smelteværker, værksteder og ved byggeriet, under',
  'en indtægtsgrænse. Det er i 1885 omkring **4,3 millioner mennesker**',
  '— omtrent hver tiende indbygger i riget. Landarbejdere,',
  'tjenestefolk, hjemmearbejdere og hustruerne holder i første omgang',
  'udenfor. Udbredelsen til dem varer tredive år.',
  '',
  '**Hvem betaler?** Bidraget udgør op til tre procent af den stedlige',
  'dagløn. Heraf bærer **arbejderen to tredjedele, arbejdsgiveren en',
  'tredjedel**. Arbejderen betaler altså omkring to procent af sin',
  'løn, virksomhedsejeren endnu en gang halvdelen deraf oveni. Det er',
  'ingen detalje, men grunden til, at økonomien ikke løb løbsk — og',
  'grunden til det, der følger straks efter.',
  '',
  '**Hvad får man?** Fri lægebehandling og medicinen fra første dag.',
  'Sygedagpenge fra tredjedagen på halvdelen af den stedlige dagløn,',
  'i op til tretten uger. Dertil en begravelseshjælp og en støtte til',
  'barselskvinder. **For en fabriksarbejder i 1884 er det første punkt',
  'det mest utrolige: Lægen kommer, og det koster ham intet.** Før',
  'hentede man lægen, når det næsten var for sent, fordi hans besøg',
  'kostede en halv uges løn.',
  '',
  '**Hvem forvalter?** Ikke riget. Kasserne forbliver selvstændige:',
  'lokale sygekasser, virksomhedssygekasser, lavssygekasser,',
  'minearbejdernes gamle broderskabskasser, indskrevne hjælpekasser.',
  'Der er tusindvis af dem, forskelligt store, forskelligt gode. Og',
  'fordi arbejderne bærer to tredjedele af bidragene, stiller de to',
  'tredjedele af repræsentanterne i kassens organer.',
  '',
  '**Netop denne ene sætning har ødelagt kanslerens regnestykke.** For',
  'hvor arbejdere flertalsvælger, forvalter og beslutter, opstår et',
  'offentligt hverv for folk, hvis parti netop er forbudt. I kasserne',
  'lærer arbejdere bogføring, mødeledelse, vedtægter og forhandlinger.',
  'De bliver kasseforstandere, de ansætter personale, de opstiller',
  'budgetter. Da socialistloven falder i 1890, står en øvet',
  'organisation parat. Socialdemokratiet bliver i 1890 efter stemmer',
  'det stærkeste parti og i 1912 den stærkeste fraktion i Rigstagen.',
  '**Loven, der skulle sulte socialismen ihjel, har bygget den en',
  'skole.**',
  '',
  '## Ark 7: De to andre love — 1884 og 1889',
  '',
  'Akten bliver tykkere. Den 6. juli 1884 følger',
  '**ulykkesforsikringsloven**, i kraft fra oktober 1885. Bærere er',
  'erhvervsgrenenes fællesorganisationer, og denne gang betaler',
  'arbejdsgiverne **alene**. Den overtager, hvor sygedagpengene',
  'slutter efter tretten uger, og betaler pensioner til tilskadekomne',
  'og efterladte.',
  '',
  'Dens vigtigste nyskabelse står ikke blandt tallene. Den lyder:',
  '**ingen bevis for skyld længere.** Det er ligegyldigt, om formanden',
  'var skødesløs eller minearbejderen uforsigtig; det er ulykken, der',
  'erstattes, ikke skylden. Til gengæld mister den tilskadekomne',
  'adgangen til at sagsøge sin arbejdsgiver. Begge sider har opgivet',
  'noget: arbejderen retssagen, som han alligevel næsten aldrig ville',
  'have vundet; arbejdsgiveren muligheden for at slippe godt fra det',
  'med en dygtig advokat.',
  '',
  'Og fordi arbejdsgiverne nu betaler hver eneste ulykke, får de for',
  'første gang en håndgribelig interesse i, at der ikke sker nogen.',
  'Fællesorganisationerne udsteder **ulykkesforebyggende forskrifter**',
  'og ansætter tekniske tilsynsembedsmænd. Sådan opstår ved siden af',
  'noget, der hidtil næsten ikke fandtes i medicinen: **forebyggelse,',
  'der kan betale sig.**',
  '',
  'Den 22. juni 1889 kommer loven om **invalide- og',
  'aldersforsikringen**, i kraft fra 1891. Arbejdere og arbejdsgivere',
  'betaler hver halvdelen, og riget lægger halvtreds mark om året',
  'oveni hver løbende pension. To tilfælde er dækket: den varige',
  'erhvervsevnemist — **invalidepensionen**, som gælder i enhver alder',
  '— og opnåelsen af **halvfjerdsårsalderen**.',
  '',
  'Der spottes om den halvfjerds den dag i dag, og spotten har en sand',
  'kerne: Den gennemsnitlige forventede levetid ved fødslen lå i',
  '1880\'ernes rige på omkring femogtredive til otteogtredive år. **Det',
  'tal bedrager imidlertid**, fordi det trækkes ned af',
  'børnedødeligheden; hvem der nåede det tyvende leveår, havde gode',
  'udsigter til det tresindstyvende. Men halvfjerds nåede kun et',
  'mindretal. Det vidste lovgiverne, og det var indregnet. Derfor var',
  '**invalidepensionen** i praksis den vigtigste del: Den betalte til',
  'den opbrugte halvtredsårige, hvis ryg og lunger ikke længere',
  'ville.',
  '',
  'Rig blev ingen af dem. Pensionerne lå på omkring hundrede og tyve',
  'til knap to hundrede mark om året, mens en industriarbejder tjente',
  'seks til otte hundrede mark om året. **Det var et tilskud, ikke et',
  'udkomme** — tænkt som supplement til det, familien bidrog med.',
  '',
  'I praksis så sagen sådan ud: Enhver forsikret fik et',
  '**kvitteringskort**, hvori der uge for uge blev klistret et',
  '**bidragsmærke**. Hvem der arbejdede, klistrede mærker. Fyrre års',
  'arbejde blev til en stak kort, og det, der i sidste ende kom ud af',
  'det, hang på, at kortene var fuldstændige. Udtrykket „at klistre',
  'mærker" for et arbejdsliv stammer herfra.',
  '',
  '## Ark 8: Det, kansleren ikke fik',
  '',
  'I fortællingerne står der som regel, at Bismarck lavede',
  'velfærdsstaten. Akten viser en mand, der har tabt tre afgørende',
  'opgør.',
  '',
  '**For det første** ville han have én stor **Rigsforsikringsanstalt**',
  '— statsligt ført, fra én hånd. Det ville Rigstagen ikke. Især',
  'Centrumspartiet insisterede på, at de mindre fællesskaber skulle',
  'beholde deres opgaver. Det, der kom ud af det, er',
  '**selvforvaltningen**: tusindvis af selvstændige kasser og',
  'fællesorganisationer under statsligt tilsyn. Det tyske',
  'sundhedsvæsen er den dag i dag derfor så uoverskueligt — og',
  'derfor også aldrig helt i én hånd.',
  '',
  '**For det andet** ville han have et kraftigt **rigstilskud**,',
  'finansieret blandt andet gennem et tobaksmonopol. Monopolet',
  'strandede, tilskuddet blev strøget ved ulykkesforsikringen og',
  'forblev ved pensionen begrænset til halvtreds mark per pension. To',
  'udkast til ulykkesforsikringen faldt i 1881 og 1882, før det',
  'tredje kom igennem i 1884.',
  '',
  '**For det tredje** ville han have tilslutningen fra dem, det',
  'drejede sig om. De socialdemokratiske medlemmer stemte imod',
  'sygeforsikringsloven. Deres begrundelse: for lidt, for snævert, og',
  'i grunden en almisse, der skulle aflede fra det egentlige',
  'spørgsmål om forholdene. Først senere erkendte de, hvad',
  'selvforvaltningen bød dem, og greb den med begge hænder.',
  '',
  'Jeg fastholder det, fordi det ødelægger den bekvemme historie:',
  '**Velfærdsstaten er ikke en kanslers udkast, men resultatet af en',
  'strid, hvor ingen fik helt, hvad han ville.** Netop derfor har den',
  'holdt.',
  '',
  '## Ark 9: Virkningerne — hvad der blev af tallene',
  '',
  '**Det, der holder.** Først det tal, der bærer alt andet: Fra 4,3',
  'millioner forsikrede i 1885 bliver der indtil 1914 omkring',
  '**seksten millioner**. I 1911 samler **Rigsforsikringsforordningen**',
  'af 19. juli alle tre grene i én lovbog; samme år kommer',
  'funktionærforsikringen til, og landarbejdere og tjenestefolk',
  'inddrages. Af en lov for fabriksarbejdere er blevet et system for',
  'et folk.',
  '',
  'Så den forventede levetid. For årene 1871 til 1881 udviser',
  'statistikken ved fødslen omkring 35,6 år for mænd og 38,5 for',
  'kvinder. For 1901 til 1910 er det 44,8 og 48,3 år. For midten af',
  '1920\'erne 56,0 og 58,8. **På godt halvtreds år vinder et tysk liv i',
  'gennemsnit tyve år.**',
  '',
  '**Disse tyve år tilhører ikke kassemedicinen alene — den største',
  'del tilhører vandet.** Det er vigtigt og bliver brugt igen i denne',
  'bog. Tilbagegangen for de store infektionssygdomme har først og',
  'fremmest at gøre med kloakering, rent drikkevand, bedre bolig og',
  'bedre ernæring, ikke med medicin. München byggede under Max von',
  'Pettenkofer allerede i 1860\'erne kloakering og vandledning; Berlin',
  'begyndte i 1873 efter James Hobrechts planer, gennemført af',
  'byrådsmedlemmet og patologen Rudolf Virchow.',
  '',
  'Beviset kom i 1892 i **Hamborg**. Byen tog sit drikkevand ufiltreret',
  'fra Elben; det umiddelbart tilstødende **Altona** lod sit løbe',
  'gennem sandfiltre. Da koleraen kom, døde der i Hamborg omkring',
  '8.600 mennesker, mens Altona næsten gik fri. På enkelte gader løb',
  'bygrænsen midt gennem husrækken: de samme mennesker, den samme',
  'luft, det samme arbejde — to vandværker, to resultater. Robert',
  'Koch kom og krævede filtrering.',
  '',
  '**Derefter var spørgsmålet afgjort.** Vand, spildevand og',
  'epidemibekæmpelse var ikke længere den gode viljes sag, men',
  'myndighedernes sag; i 1900 regulerede en rigslov bekæmpelsen af',
  'almenfarlige sygdomme. Dertil kom boligtilsyn, erhvervstilsyn,',
  'skolelæger, spædbarnsomsorg og mælkekøkkener. **Statsliggørelsen',
  'af sundhedsvæsenet var ikke i første række en statsliggørelse af',
  'lægerne. Den var en statsliggørelse af de betingelser, mennesker',
  'lever under.**',
  '',
  'Og endelig virkningen udadtil: Østrig fulgte efter i 1887 og 1888,',
  'Ungarn i 1891, andre fulgte. I 1908 rejste den britiske',
  'finansminister David Lloyd George til Tyskland for at se systemet;',
  'i 1911 vedtog Det Forenede Kongerige sin National Insurance Act.',
  '**Herfra har ideen om, at en stat skal stå inde for sine borgeres',
  'sundhed, erobret verden.**',
  '',
  '## Ark 10: Prisen — den syge får et nummer',
  '',
  '**Det, der har skadet.** Nu kommer arkene, som en myndighed nødigt',
  'lægger frem. De hører til, for de er ingen driftsulykke, men den',
  'logiske fortsættelse af den samme tænkemåde.',
  '',
  '**For det første: Den, der betaler, kontrollerer.** En kasse, der',
  'udbetaler sygedagpenge, vil vide, om der virkelig er nogen, der er',
  'syg. Derfor ansætter den **kontrollører**, der dukker uanmeldt op i',
  'boligen og ser efter, om den syge ligger i sengen. Af den lidende',
  'bliver en mulig simulator. Det var udtrykkeligt fastsat i kassens',
  'vedtægter, og det har præget tonen mellem forsikret og kasse for',
  'altid.',
  '',
  '**For det andet: Af den syge bliver en sag.** Enhver får et',
  'medlemsnummer, et kort, en sygeseddel. Behandling sker ikke',
  'længere, fordi et menneske lider, men fordi en ydelsesbetingelse',
  'er opfyldt. Det er prisen for retskravet, og den er uundgåelig:',
  '**Et krav skal kunne efterprøves, ellers er det intet krav. Men kun',
  'det, der kan skrives i formularer, kan efterprøves.** Det, der ikke',
  'kan skrives i formularer — udmattelse, sorg, et liv, der ikke',
  'længere bærer —, forsvinder ud af akten uden at forsvinde ud af',
  'verden.',
  '',
  '**For det tredje: Lægen får en kontraktpartner.** Før 1883 havde',
  'lægen en patient, der betalte ham. Derefter har han en kasse, der',
  'betaler ham, og en patient, som kassen sender. Kasserne sluttede',
  'kontrakter med enkelte læger, fastsatte honorarerne og besluttede,',
  'hvem der blev godkendt, og hvem der ikke blev. Lægestanden værnede',
  'sig: I 1900 stiftedes i Leipzig det forbund, der senere hed',
  'Hartmann-forbundet; der kom boykot og strejker, indtil',
  '**Berlin-aftalen** i 1913 afværgede en rigsdækkende lægestrejke —',
  'med en fast nøgle på én kasselæge per 1.350 forsikrede og fælles',
  'udvalg. **Siden den dag forhandler forbund i Tyskland om, hvad en',
  'syg er værd. Ved forhandlingsbordet sidder han selv ikke.**',
  '',
  '**For det fjerde: Forvaltningen vokser af sig selv.** Enhver regel',
  'frembringer en stridssag, enhver stridssag en ny regel. Af loven',
  'fra 1883 med dens overskuelige paragraffer blev der i 1911 en',
  'lovbog med over atten hundrede. Det er ingen tysk ulykke, men',
  'sagens egenart: **Et system, der vil være retfærdigt, må skelne.',
  'Den, der skelner, har brug for regler. Den, der har regler, har',
  'brug for embedsmænd.**',
  '',
  '## Ark 11: Den anden pris — kurérfriheden og sygekasserne',
  '',
  'Et ark for sig selv, fordi det angår den side, der forekommer',
  'mindst i statens akt: helbrederne uden autorisation.',
  '',
  'Først en kendsgerning, som de fleste finder overraskende:',
  '**Kejserriget forbød ikke helbredelsen, den gav den fri.**',
  'Næringsloven af 1869 bragte **kurérfriheden** — udøvelsen af',
  'helbredelse var tilladt for enhver. Beskyttet var alene',
  'betegnelsen „læge". Tanken bagved var en liberal: At helbrede er',
  'et erhverv som andre, og den myndige borger vælger selv, hvem han',
  'betror sig til.',
  '',
  'Helbrederne blev altså ikke fortrængt af et forbud. **De blev',
  'fortrængt af pengene.** Fra 1883 betalte kassen den godkendte læge',
  '— og kun ham. Hvem der gik til urtekvinden, til baderen, til',
  'magnetisøren, til naturlægen, betalte fortsat af egen lomme, selv',
  'om han hver uge havde indbetalt sit bidrag. For en',
  'arbejderhusholdning var dermed afgjort. **Det var ikke paragraffen,',
  'der trængte den gamle helbredelseskunst ud af de almindelige',
  'menneskers hverdag, men sygesedlen.**',
  '',
  'Lægeforbundene ville have mere. Fra 1900 krævede de i flere',
  'omgange en lov mod „kvaksalveriet". Udkastene strandede i',
  'Rigstagen — også fordi naturmedicinbevægelsen havde organiseret',
  'sig: hundredvis af foreninger for naturlig leve- og',
  'helbredelsesmåde med langt over hundrede tusind medlemmer, med',
  'tidsskrifter, badeanstalter og medlemmer af Rigstagen, der lyttede',
  'til dem. **Kurérfriheden er blevet forsvaret i kejserriget, og det',
  'nedefra.**',
  '',
  'Hvor succesrig den anden side var, viser det sted, der på dette',
  'kapitels kort ligger helt mod syd. I **Bad Wörishofen** behandlede',
  'en katolsk præst ved navn **Sebastian Kneipp** med koldt vand,',
  'urter, bevægelse og regelmæssig livsførelse. Hans bog „Min',
  'vandkur" fra 1886 blev oversat til mange sprog; i 1890\'erne kom',
  'titusinder af kurgæster om året til den schwabiske landsby, og i',
  '1894 modtog paven ham. Han havde ingen autorisation. Han var efter',
  'loven af 1869 fuldstændig i sin gode ret. Og ingen kasse har',
  'nogensinde betalt for en eneste af hans behandlinger. Kapitel 17',
  'fortæller hans historie.',
  '',
  'Hvordan det gik videre, hører for fuldstændighedens skyld til her,',
  'selv om det rækker ud over denne akts tid: Kurérfriheden sluttede',
  'i **1939** med naturlægeloven. Fra da af krævedes en statslig',
  'tilladelse, og efter den daværende regerings vilje skulle der ikke',
  'udstedes nye — erhvervet skulle dø ud. Efter 1945 havde denne',
  'spærre ikke holdbarhed over for grundloven; siden da udstedes',
  'tilladelsen igen. **Netop en lov, der skulle afslutte erhvervet, er',
  'blevet grundlaget for dets eksistens.**',
  '',
  '## Ark 12: Værktøjet i fremmede hænder',
  '',
  'Og nu det ark, hvor staten ser værst ud — det hører til i denne',
  'akt, fordi det følger af den samme tænkemåde.',
  '',
  'Denne bog fortæller siden kapitel 9 igen og igen det samme mønster:',
  '**Det nye skader ofte først, før det bliver til velsignelse.**',
  'Kirurgien dræbte gennem sårfeber, før den reddede. Strålerne',
  'brændte deres pionerer, før der blev radiologi ud af det.',
  'Penicillinen reddede millioner og frembragte kimenes',
  'modstandsdygtighed.',
  '',
  'Ved en institution ser dette mønster anderledes ud, men det er det',
  'samme. **Et værktøj spørger ikke, hvem der tager det i hånden.**',
  'Hvem der erklærer sundheden for fællesskabets sag, skaber dertil',
  'embeder, indberetningsveje, registre, statistikker og vanen med,',
  'at en myndighed blander sig i kroppen. Så længe dette værktøj',
  'ligger i hænderne på en orden, der vil hjælpe den enkelte, hjælper',
  'det den enkelte.',
  '',
  'Femti år efter 1883 lå det i andre hænder. En lov fra 1933 påbød',
  'ufrugtbargørelse af mennesker, som man anså for arveligt syge;',
  'indtil 1945 blev omkring fire hundrede tusinde mennesker',
  'tvangssteriliseret. Af „folkesundheden", som i 1911 på en',
  'udstilling i Dresden endnu havde betydet tandbørstning og',
  'spædbarnspleje, blev spørgsmålet om, hvilket liv der gavner',
  'fællesskabet. **Tanken om, at sundhed ikke kun tilhører den',
  'enkelte, kan frembringe det bedste og det værste.** Kapitel 14 og',
  '15 vil tage emnet op igen.',
  '',
  'Jeg skriver det ikke som en anklage mod lovene fra 1883, 1884 og',
  '1889 — de har hverken haft til hensigt eller skyld i det. Jeg',
  'skriver det som det, der burde stå i akten bag ethvert skabt',
  'embede: **Et værktøj er så godt som den hånd, der holder det — og',
  'hånden skifter.**',
  '',
  '## Sedlen, der ikke hører til i akten — kansleren og hans læge',
  '',
  'Til sidst et ark, der egentlig er privatsag, og som alligevel',
  'siger mere om dette kapitel end de fleste paragraffer.',
  '',
  'Manden, der satte kassemedicinen i værk, var selv en alvorligt syg',
  'mand: søvnløs, hissig, lidende på mave og nerver, svært',
  'overvægtig, en gevaldig spiser og drikker. Berlins førende læger',
  'havde behandlet ham, uden at det blev bedre.',
  '',
  'I 1883 — året for sygeforsikringsloven — overtog **Ernst',
  'Schweninger** ham, en læge, som Berlins medicinske fakultet anså',
  'for en outsider, og som det kun gav professoratet under pres fra',
  'oven. Schweninger ordinerede næsten ingen medicin. Han ordinerede',
  '**orden**: mådehold i mad og drikke, regelmæssig søvn, bevægelse,',
  'omslag, et strengt regime og betingelsen om, at patienten',
  'indordner sig. Kansleren tabte omkring tredive kilo og blev et',
  'andet menneske. Han døde i 1898, treogfirs år gammel.',
  '',
  'Dertil passer det sted, som han i årtier rejste til igen og igen:',
  '**Bad Kissingen**, helbredende kilder, drikkekur, bade,',
  'spadsereture, en regelmæssig dag. Præcis det, der i denne bogs',
  'tidlige kapitler står under diætetik og livsorden, fra Hippokrates',
  'til klosterhaverne.',
  '',
  '**Ophavsmanden til kassemedicinen blev rask af noget, som ingen',
  'kasse ville have betalt.** Jeg lader denne seddel ligge',
  'ukommenteret i akten. Den modbeviser ingen lov. Men den viser, at',
  'den grænse, der fra 1883 løb gennem helbredelsen, ikke var en',
  'grænse mellem virksomt og ikke-virksomt, men en mellem afregneligt',
  'og ikke-afregneligt. Hvem der havde råd, har aldrig agtet på den.',
  '',
  '## Efterskrift: hvad denne akt ikke indeholder',
  '',
  'En akt er et standpunkt på papir. Den indeholder det, myndigheden',
  'måtte vide, og den indeholder ikke det, der aldrig blev meldt til',
  'myndigheden.',
  '',
  '**Det, der står åbent**, er derfor ikke lidt. I disse ark står der',
  'ikke, hvordan det føles første gang at hente en læge uden først at',
  'tælle husholdningspengene — og hvordan det føles at blive spurgt',
  'om nummeret, før nogen spørger om navnet. Her står der ikke, hvad',
  'en urtekvinde i en landsby tænkte, da folk holdt op med at komme,',
  'fordi sygesedlen kun gjaldt hos doktoren. Her står der ikke,',
  'hvordan en minearbejder dømte om, at hans bidrag ganske vist',
  'betalte hans behandling, men ikke den behandling, han ønskede.',
  '',
  '**Dette kapitels anden stemme tilhører de forsikrede og de',
  'fortrængte** — arbejderne, der fra den ene dag til den anden blev',
  'kassepatienter, og helbrederne, som den samme nyskabelse fratog',
  'grundlaget. Den vil slå den anden akt op: den forsikredes akt,',
  'hvor den samme sag nedefra ser anderledes ud. Den vil fortælle om',
  'den nye tryghed og den nye afhængighed; om kvitteringskortet,',
  'mærkerne og kontrolløren ved døren; om baderne, urtekvinderne og',
  'naturlægerne, som i århundreder havde behandlet og nu ikke længere',
  'blev betalt.',
  '',
  'Og den vil stille det spørgsmål, som denne akt ikke kan besvare,',
  'fordi en myndighed vanskeligt kan betvivle sit eget ansvarsområde:',
  '**Hvem tilhører sundheden — staten, markedet eller det menneske,',
  'der har den?**',
  '',
  'Staten har i 1883 givet sit svar, og det var ingen fejl: Den, der',
  'er syg, skal behandles, ligegyldigt om han kan betale. Millioner',
  'af mennesker skylder dette svar deres liv. Man har betalt for det',
  'med et stykke selvbestemmelse, med en forvaltning, der aldrig igen',
  'blev mindre, og med forsvinden ud af de almindelige menneskers',
  'hverdag af alt det, der ikke lod sig afregne.',
  '',
  '**Begge dele tilsammen er sandheden i dette kapitel. Hvilken',
  'halvdel der vejer tungest, afgør akten ikke. Det beslutter du.**',
].join('\n');

/**
 * De forsikrede og de fortrængte — den anden akt. Det, akten i
 * rigskanslerembedet ikke indeholder: arbejderen med sygekassekortet,
 * den nye tryghed og den nye afhængighed, kurérfriheden og
 * fortrængningen af naturmedicinen.
 *
 * Skrevet af DeepSeek (runde 14, anden omgang). Også denne stemme
 * nævner selv sin egen sides ubehagelige steder (tillægsregel for
 * følsomme emner).
 */
const deForsikredesStemme = [
  '## Den anden akt: en forsikret',
  '',
  'Akten i rigskanslerembedet fortæller historien oppefra: befundene,',
  'pisken, guleroden, lovene. Nu lægger vi den anden akt ved siden af',
  '— den af en mand, der aldrig blev spurgt, om han vil ind i',
  'historien. Hans navn står ikke i historiebøgerne, men hans nummer',
  'står i registrene: Han er den første årgang af de forsikrede, som',
  'staten har opfundet.',
  '',
  '## Ark 1: Befundet — fabrikken indefra',
  '',
  'Manden arbejder i en fabrik ved Ruhr, tolv timer om dagen, seks',
  'dage om ugen. Bliver han syg, mister han lønnen; bliver han syg i',
  'lang tid, mister han arbejdet; mister han arbejdet, flytter',
  'familien i fattighuset, hvor mænd og kvinder bor adskilt, og hvor',
  'børnene kommer på anstalten. Det er det sociale spørgsmål, som',
  'akten taler om — bortset fra at det for ham ikke er et begreb,',
  'men hverdagen. Hans far døde fattig, uden nogensinde at have set',
  'en læge. Han selv har endnu aldrig set en indefra.',
  '',
  '## Ark 2: Sygekassekortet — hvad der ændrede sig',
  '',
  'I 1884 får han et kort. På det står hans nummer, hans navn,',
  'bidraget: to procent af lønnen, arbejdsgiveren betaler halvdelen.',
  'Og med kortet kommer noget, der aldrig har eksisteret for folk af',
  'hans slags: retten. Bliver han syg, får han sygedagpenge; går han',
  'til lægen, bliver lægen betalt — af kassen, ikke af egen lomme,',
  'som er tom. For første gang i sin klasses historie er medicinen',
  'ikke en gave fra de rige, men et krav. Børnedødeligheden falder,',
  'den forventede levetid stiger, epidemierne viger — ikke alene på',
  'grund af kassen, men også på grund af den. Hvem der ikke',
  'anerkender det, har ikke læst akten.',
  '',
  '## Ark 3: Prisen — patienten med nummer',
  '',
  'Men nu kortets anden side, for også denne stemme er ærlig. Med',
  'kravet kom forvaltningen. Den syge blev til en forsikret: en sag,',
  'et nummer, en takst. Lægen, hidtil en fri herre over sin kunst,',
  'blev til en kasselæge — bundet til honorarordningen, til kasserne,',
  'til kontrollen. Hvem der blev behandlet, blev prøvet: Om sygdommen',
  'var „ægte", afgjorde ikke længere den syge med sin egen krop, men',
  'sygekassens tillidslæge med sit stempel. Det menneske, der gik til',
  'lægen for at blive hørt, hørte først spørgsmålet om sit nummer.',
  'Trygheden havde en pris, og prisen var et stykke frihed.',
  '',
  '## Ark 4: De fortrængte — kurérfriheden',
  '',
  'Og så den anden regning: den frihed, der ikke blev forvaltet, men',
  'afskaffet. Tyskland havde haft en århundredgammel kurérfrihed:',
  'Enhver måtte helbrede, hvem der kunne — baderen, urtekvinden,',
  'naturhelbrederen, præsten med urtebogen. Folk på landet gik til',
  'den, de stolede på, ikke til den med titlen. Med statsliggørelsen',
  'kom felttoget mod „kvaksalveriet": Kasserne betalte kun',
  'autoriserede læger; de andre blev erklæret forbudte, forfulgt,',
  'skubbet ud i kanten. Noget af det var berettiget — der var',
  'kvaksalvere, der tjente penge på mirakelmidler. Men felttoget',
  'ramte også de traditioner, som denne bog har hædret i de første',
  'kapitler: urteviden, naturmedicinen, jordemødrenes kunst. Sebastian',
  'Kneipp, præsten fra Wörishofen, blev bekæmpet af lægestanden og',
  'elsket af menneskene — sygekasserne kendte ham ikke. Medicinen',
  'blev statslig, og hvad der ikke var statsligt, blev mistænkeligt.',
  '',
  '## Ark 5: Hvad akten ikke indeholder',
  '',
  'Akten indeholder heller ikke stemmerne fra dem, der slet ikke kom',
  'ind i den. Kvinderne, der ikke havde noget eget krav; børnene,',
  'hvis kort hang på faderen; landarbejderne, der ofte stod udenfor;',
  'de arbejdsløse, der med arbejdet også mistede kassen. Den',
  'velfærdsstat, der blev opfundet her, var en forsikring for',
  'arbejderne — ikke for de fattige. Kløften mellem krav og',
  'virkelighed hører til sandheden i denne akt, og hvem der fortier',
  'den, fortæller kun halvdelen af historien.',
  '',
  '## Svar til staten',
  '',
  'Akten i rigskanslerembedet ender med spørgsmålet om, hvad der blev',
  'af det værk, som staten ikke havde drømt om. Svaret fra denne',
  'anden akt: Det blev den største gave — og den største forvaltning',
  '—, som medicinen nogensinde har fået. Arbejderen fik den læge,',
  'han aldrig ville have haft; og han mistede friheden til selv at',
  'vælge, hvem der helbreder ham. Staten gjorde sundheden til en',
  'borgerpligt — og borgeren til en forsikret. Det spørgsmål, som',
  'begge akter efterlader sammen, er hele bogens spørgsmål: Hvem',
  'tilhører sundheden? Den, der lever den? Den, der helbreder den?',
  'Den, der betaler den? Eller den, der forvalter den? Svaret søger',
  'denne bog indtil sidste side.',
].join('\n');

/** Kapitel 13 på emnelandkortet. */
const verstaatlichung = {
  id: 'verstaatlichung',
  titel: 'Statsliggørelsen af sundhedsvæsenet',
  epoche: '~1883 ff.',

  aufhaenger: {
    frage:
      'Hvem tilhører den syge — lægen, staten eller sig selv?',
    text: [
      'Indtil 1883 var der to parter ved sygesengen. Den syge, der betalte,',
      'og den, der behandlede. Hvem der ikke kunne betale, gik til',
      'urtekvinden, til baderen, til fattighjælpen — eller han blev uden',
      'hjælp. I Preussen kostede kommunens almisse endda stemmeretten.',
      '',
      'Så kom en tredje part til. Den 15. juni 1883 vedtog Rigstagen',
      'sygeforsikringsloven, 1884 fulgte ulykkesforsikringen, 1889',
      'aldersforsikringen. Staten behandlede ikke selv nogen — den',
      'foreskrev, at der betales, af hvem, hvor meget og til hvad. Det var',
      'den første lov af sin slags i verden, og næsten alle industrilande',
      'har kopieret den.',
      '',
      'Det, der kom ud af det, er begge dele: lægen for alle, ligegyldigt',
      'om nogen har penge — kloakeringen, det rene vand,',
      'epidemibekæmpelsen, tyve vundne leveår på to generationer. Og:',
      'nummeret i stedet for navnet, kontrolløren ved lejlighedsdøren,',
      'lægen som sygekassens kontraktpartner, en lovbog med atten hundrede',
      'paragraffer — og en helbredelseskunst, som ingen forbød, men som',
      'ingen længere betalte.',
      '',
      'Dette kapitel læser akten fra begge sider. For spørgsmålet om, hvem',
      'sundheden tilhører, er ikke forstummet siden 1883: retfærdig og',
      'bureaukratisk, reddende og formynderisk, til stede for alle og i',
      'sidste ende dog ikke helt for nogen.',
    ].join('\n'),
  },

  perspektiven: [
    {
      id: 'staat',
      name: 'Statens stemme',
      stimme: 'Opus',
      text: statensStemme,
    },
    {
      id: 'versicherte',
      name: 'De forsikrede og de fortrængte',
      stimme: 'DeepSeek',
      text: deForsikredesStemme,
    },
  ],

  synthese: [
    '## Hvor de to akter mødes',
    '',
    'Først det fælles — og det er kapitelts kerne: Begge akter',
    'fortæller den samme historie fra to sider. Staten og den',
    'forsikrede er enige om, at sygekassen var en gave — adgangen til',
    'medicin for alle, sygedagpengene, den faldende dødelighed; den',
    'ene akt kalder det kravet, den anden retten. Begge nævner den',
    'samme pris: kontrollen, nummeret, forvaltningen — staten kalder',
    'den bureaukratiet, den forsikrede kalder den friheden. Og begge',
    'ved om de fortrængte: Kanslerens akt indrømmer, at sygekasserne',
    'har fortrængt den gamle helbredelseskunst; den anden akt',
    'fortæller, hvad det betød for urtekvinderne og Kneipp-foreningerne.',
    'Hvem der kun læser én akt, læser kun halvdelen af historien.',
    '',
    '## Hvor de skilles',
    '',
    'Modsætningen begynder ved spørgsmålet om, hvad staten egentlig',
    'ville. For kanslerens akt er forsikringen et omsorgsværk: staten,',
    'der beskytter sine arbejdere, fordi den har brug for dem — pisken',
    'og guleroden hører til samme hånd. For den forsikredes akt er',
    'omsorgen også en tøjle: Hvem der forvalter sundheden, forvalter',
    'mennesket; hvem der afskaffer kurérfriheden, afskaffer',
    'selvbestemmelsen. De strides ikke om tallene — de er gode —,',
    'men om hensigten og om tryghedens pris. Og de strides om',
    'fremtiden: Staten ser den orden, der vokser; den forsikrede ser',
    'den umyndiggørelse, der vokser. Begge har et stykke ret — og',
    'netop det gør spørgsmålet om, hvem sundheden tilhører, uløst den',
    'dag i dag.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'For fjortende gang det samme mønster — og nu vender det sig mod',
    'nutiden: Tænkemåden bestemmer metoden. Med statsliggørelsen',
    'træder en ny tænkemåde ind i medicinen: sundheden som borgerret,',
    'forvaltet af staten. Denne tænkemåde har åbnet medicinen for',
    'alle — og den har gjort medicinen til en institution med takster,',
    'kasser og kontrol. Lægen, der var fri i de tidlige kapitler, er i',
    'dag et lille tandhjul; patienten, der før valgte, er i dag en',
    'forsikret.',
    '',
    'Og dette kapitel stiller det spørgsmål, der vil følge bogen til',
    'ende: Hvem tilhører sundheden? Staten har gjort den til en',
    'borgerpligt — og dermed beredt grunden for det næste kapitel:',
    'medicinalindustrien, der gør sin forretning ud af den samme',
    'forsikring. Hvem der forvalter kassen, forvalter også markedet;',
    'hvem der forvalter markedet, bestemmer, hvad der betales — og',
    'hvad der ikke gør. De næste kapitlers spørgsmål lyder: Hvem',
    'profiterer på det syge samfund — og hvem betaler prisen?',
  ].join('\n'),

  urteil: {
    frage:
      'Hvem tilhører dit helbred — dig, din læge, din sygekasse eller ' +
      'staten? Og hvem skal beslutte, når det bliver dyrt?',
    hinweis: [
      'Der er her intet rigtigt og intet forkert. Tag de to halvdele af',
      'dette kapitel for dig. Den ene: Siden 1883 bliver en syg behandlet,',
      'ligegyldigt om han kan betale — det er et retskrav, ingen almisse,',
      'og millioner af mennesker skylder det deres liv. Den anden: Den,',
      'der betaler, er medbestemmende, og det, der betales, har slået',
      'igennem. Spørg dig selv om tre ting. For det første: Ville du selv',
      'betale frivilligt ind, når du er ung og rask — og hvad følger af',
      'dit svar for pligten? For det andet: Hvem skal beslutte, hvilken',
      'behandling der betales — lægestanden, sygekassen, politikerne',
      'eller du? For det tredje: Hvad ændrer sig ved dit svar, hvis den',
      'behandling, der hjælper dig, ikke står på listen? Præcis mellem',
      'disse spørgsmål ligger den strid, der i hundrede og fyrre år ikke',
      'er blevet afgjort.',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Hvilke tre sociallove indførte Det Tyske Rige mellem 1883 ' +
        'og 1889?',
      antworten: [
        'Syge-, ulykkes- og aldersforsikringen (1883, 1884, 1889).',
        'Syge-, arbejdsløsheds- og plejeforsikringen.',
        'Ulykkes-, brand- og livsforsikringen.',
      ],
      richtig: 0,
      erklaerung:
        'Den 15. juni 1883 kom sygeforsikringsloven (i kraft fra ' +
        'december 1884), den 6. juli 1884 ulykkesforsikringen og den ' +
        '22. juni 1889 invalide- og aldersforsikringen. ' +
        'Arbejdsløshedsforsikringen fulgte først i 1927, ' +
        'plejeforsikringen i 1995.',
    },
    {
      frage:
        'Hvordan blev bidraget til sygeforsikringen fra 1883 delt ' +
        'mellem arbejder og arbejdsgiver?',
      antworten: [
        'Arbejdsgiveren betalte det hele alene.',
        'Begge betalte præcis halvdelen.',
        'Arbejderen betalte to tredjedele, arbejdsgiveren en tredjedel.',
      ],
      richtig: 2,
      erklaerung:
        'Bidraget udgjorde op til tre procent af den stedlige dagløn; ' +
        'heraf bar arbejderen to tredjedele. Fordi pladserne i kassens ' +
        'organer fulgte bidragenes andele, stillede arbejderne to ' +
        'tredjedele af repræsentanterne — og sygekasserne blev for dem ' +
        'en skole i selvforvaltning. Ulykkesforsikringen fra 1884 ' +
        'betalte arbejdsgiverne derimod alene.',
    },
    {
      frage:
        'Hvilket forhold havde sociallovene til socialistloven fra ' +
        '1878?',
      antworten: [
        'Sociallovene ophævede socialistloven.',
        'De løb parallelt: Forbuddet mod socialdemokratiet gjaldt fra ' +
          '1878 til 1890, sociallovene kom til fra 1883.',
        'Begge blev vedtaget samme dag.',
      ],
      richtig: 1,
      erklaerung:
        '„Loven mod socialdemokratiets almenfarlige bestræbelser" af ' +
        '21. oktober 1878 forbød partiets foreninger, forsamlinger og ' +
        'aviser; den blev forlænget fire gange og udløb først i 1890. ' +
        'Det kejserlige budskab af 17. november 1881 annoncerede ' +
        'sociallovene udtrykkeligt som supplement til repressionen. ' +
        'Det forblev tilladt at stille op, derfor sad socialdemokratiske ' +
        'medlemmer hele tiden i Rigstagen.',
    },
    {
      frage:
        'Hvad betød „kurérfriheden" i næringsloven af 1869?',
      antworten: [
        'Kure på helbredende badeanstalter var gratis for alle.',
        'Kun autoriserede læger måtte behandle syge.',
        'Alle havde lov til at helbrede; beskyttet var kun betegnelsen ' +
          '„læge".',
      ],
      richtig: 2,
      erklaerung:
        'Udøvelsen af helbredelse var et frit erhverv. Bader, urtekvinder ' +
        'og naturlæger blev ikke fortrængt af et forbud, men af ' +
        'sygekasserne: De betalte fra 1883 kun godkendte læger. Flere ' +
        'forsøg på en lov mod „kvaksalveri" strandede efter 1900 i ' +
        'Rigstagen. Først naturlægeloven af 1939 afsluttede ' +
        'kurérfriheden.',
    },
    {
      frage:
        'Hvad viste sammenligningen mellem Hamborg og Altona under ' +
        'koleraen i 1892?',
      antworten: [
        'At sygdommen kun spredte sig i havnebyer.',
        'At byen med filtreret drikkevand næsten gik fri, mens ' +
          'nabobyen med ufiltreret elb-vand havde omkring 8.600 døde.',
        'At vaccinationer afsluttede epidemien.',
      ],
      richtig: 1,
      erklaerung:
        'Hamborg tog sit drikkevand ufiltreret fra Elben, det ' +
        'tilstødende Altona lod sit løbe gennem sandfiltre. På nogle ' +
        'gader løb bygrænsen midt gennem husrækken — de samme ' +
        'mennesker, to vandværker, to resultater. Robert Koch krævede ' +
        'filtrering. Derefter stod det fast, at vand, spildevand og ' +
        'epidemibekæmpelse er myndighedernes sag; i 1900 fulgte en ' +
        'rigslov.',
    },
  ],

  // Kortet ligger i utils/themen/karten/verstaatlichung.js — her er kun
  // fasehenvisningerne oversat (phasen → karteHinweise), ikke selve kortet.
  karteHinweise: [
    {
      label: '1871–1878: kejserriget, industrien og det sociale spørgsmål',
      hinweis:
        'Efter rigsgrundlæggelsen i 1871 vokser industribyerne hurtigere, ' +
        'end nogen kan bygge dem. I Ruhr-området, i Oberschlesien og i ' +
        'Sachsen flytter hundredtusinder fra landet til miner og væve. ' +
        'I Berlin opstår lejekasernerne med deres baggårde; såkaldte ' +
        'sengens lejere lejer sig ind på en seng i timevis. Hvem der ' +
        'bliver syg, mister lønnen: Der er intet krav på hjælp, kun ' +
        'kommunens fattighjælp — og den kostede stemmeretten i Preussen. ' +
        'Efter to attentater mod kejser Wilhelm I. forbyder socialistloven ' +
        'af 21. oktober 1878 socialdemokratiets organisationer, ' +
        'forsamlinger og aviser.',
    },
    {
      label: '1881–1889: de tre sociallove — Berlin',
      hinweis:
        'Den 17. november 1881 oplæser Bismarck i Rigstagen det kejserlige ' +
        'budskab: Helbredelsen af de sociale skader skulle ikke søges ' +
        'alene gennem undertrykkelse af socialdemokratiske udskejelser, ' +
        'men lige så meget gennem fremme af arbejdernes velfærd. Der ' +
        'følger tre love: sygeforsikringsloven af 15. juni 1883 (i kraft ' +
        '1. december 1884; arbejderne bærer to tredjedele af bidraget, ' +
        'arbejdsgiverne en tredjedel), ulykkesforsikringsloven af ' +
        '6. juli 1884 (betalt alene af arbejdsgiverne) og loven om ' +
        'invalide- og aldersforsikringen af 22. juni 1889 (alderspension ' +
        'fra halvfjerds, i kraft fra 1891). Dermed er Det Tyske Rige det ' +
        'første land i verden med en lovbestemt pligtforsikring.',
    },
    {
      label: '1892–1900: epidemien som statsopgave — Hamborg og koleraen',
      hinweis:
        'I august 1892 udbryder koleraen i Hamborg; omkring 8.600 ' +
        'mennesker dør. Byen tager sit drikkevand ufiltreret fra Elben. ' +
        'Det umiddelbart naboeliggende Altona, som leder sit vand gennem ' +
        'sandfiltre, går næsten fri — de samme gader, to vandværker, to ' +
        'resultater. Robert Koch undersøger på stedet og kræver ' +
        'filtrering og statsligt tilsyn. München havde under Max von ' +
        'Pettenkofer allerede i 1860\'erne bygget kloakering og ' +
        'vandledning, Berlin fra 1873. I 1900 regulerer en rigslov ' +
        'bekæmpelsen af almenfarlige sygdomme. Hygiejne er nu ' +
        'myndighedernes sag, ikke den gode viljes.',
    },
    {
      label: '1900–1910: striden om „kvaksalveriet" og kurbyerne',
      hinweis:
        'Næringsloven af 1869 havde bragt kurérfriheden: Hvem der ville ' +
        'helbrede, måtte helbrede; beskyttet var kun titlen læge. Efter ' +
        '1883 betaler sygekasserne imidlertid kun for godkendte læger — ' +
        'hvem der behandler anderledes, bliver ikke forbudt, men ikke ' +
        'betalt. Fra 1900 kræver lægeforbundene i flere omgange en lov ' +
        'mod kvaksalveri. Udkastene strander i Rigstagen, også fordi ' +
        'naturmedicinbevægelsen med hundredvis af foreninger og over ' +
        'hundrede tusind medlemmer går imod. I Bad Wörishofen behandler ' +
        'præst Sebastian Kneipp indtil sin død i 1897 titusinder af ' +
        'kurgæster om året; i Bad Kissingen kurer kansleren selv.',
    },
    {
      label: '1911–1914: Rigsforsikringsforordningen ensretter systemet',
      hinweis:
        'Den 19. juli 1911 samler Rigsforsikringsforordningen de tre ' +
        'grene i én enkelt lovbog; samme år kommer funktionærforsikringen ' +
        'til, og landarbejdere og tjenestefolk inddrages. Fra 4,3 ' +
        'millioner forsikrede i 1885 er der indtil 1914 blevet omkring 16 ' +
        'millioner. I 1911 viser den internationale hygiejneudstilling i ' +
        'Dresden befolkningen sin egen krop som folkesundhedens ' +
        'anliggende; deraf bliver i 1912 Det Tyske Hygiejnemuseum. I ' +
        'samme årti strides kasselægerne om honorarer og godkendelse — ' +
        'Berlin-aftalen af 1913 afværger en rigsdækkende lægestrejke.',
    },
  ],
};

module.exports = verstaatlichung;
