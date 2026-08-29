// Kapitel 1 — „Lægekunstens begyndelse" (tysk: „Die Anfänge der Heilkunde").
//
// Schamaner, urtekyndige, de såkaldte „primitive" folk — og det gamle
// Egypten som den første medicin, der blev skrevet ned. Begrebet „primitiv"
// står i hele kapitlet i anførselstegn: Det er en tilskrivning udefra, fra
// det koloniale Europa i 1800-tallet — ingen selvbetegnelse og intet
// resultat (TONE-reglen i CLAUDE.md).
//
// Forfatterens beslutning af 21.08.2026: De oprindeligt adskilte kapitler
// „Begyndelsen" og „Egypten" er smeltet sammen til ÉT kapitel — kernen er
// den samme (menneskene handlede intuitivt og behandlede med naturlige
// midler), og Egypten er dér stationen, hvor denne viden første gang blev
// fastholdt skriftligt. Ingen gentagelser.
//
// Stemmer (runde 1 + 2, samlet): Den FØRSTE synsvinkel (helbrederskens
// stemme) skrev Opus; den ANDEN (stemmen om nedvurderingen og
// genopdagelsen) og den endelige syntese tilføjede Hermes.
// Synsvinkel-workflow: CLAUDE.md.
//
// Teksterne ligger som linje-arrays med `.join('\n')` — sådan forbliver de
// i repoet læsbare ved ~72 tegn pr. linje (forfatteren læser dem her op
// imod), og utils/markdown.js gør i appen flydende tekst ud af dem.
//
// Dansk oversættelse af utils/themen/anfaenge-der-heilkunde.js (tysk
// original). Kortet ligger i utils/themen/karten/anfaenge-der-heilkunde.js
// — her er kun dets tekster oversat (karteHinweise), ikke selve kortet.
//
// CommonJS uden UI-imports (arkitekturregel): kan kontrolleres med blank
// `node`.

/**
 * Helbrederskens stemme — den tidlige lægekunst indefra, fra den første
 * viden om urter til den første skriftlige medicin ved Nilen.
 *
 * Skrevet af Opus (runde 1–2). Hun fortæller, hvordan viden voksede, hvilket
 * verdensbillede der lå bag, hvorfor menneskene gjorde, hvad de gjorde — og
 * hvad det udrettede. De ubehagelige pletter nævner hun selv, i stedet for
 * at overlade dem til modstemmen (tillægsregel for følsomme emner).
 */
const stemmeHelbredersken = [
  '## Hvem der taler her',
  '',
  'Denne side fortæller den tidlige lægekunst indefra — fra de menneskers',
  'synsvinkel, der udøvede den: de urtekyndige, schamaninderne og',
  'schamanerne, de kvinder og mænd, man gik til, når feberen ikke gav slip.',
  'Det er en fortælling, ikke en afskrift af virkeligheden. Ingen af dem har',
  'skrevet ned, hvad de tænkte. Det, vi tror at vide, slutter vi ud fra',
  'grave, knogler, redskaber og planterester — og ud fra det, helbredersker',
  'og helbredere hos nulevende folk fortæller den dag i dag. Meget af det er',
  'velbegrundet. Sikkert er det ikke.',
  '',
  '## Hvordan viden voksede',
  '',
  'Det begyndte ikke med en opfindelse, men med en nød: Nogen har ondt,',
  'nogen bløder, nogen gløder. Og det begyndte med en iagttagelse — af den',
  'slags, man behøver tid til og en god hukommelse. Den rod smager bittert',
  'og standser diarréen. Den bark tager feberen. Af det bær bliver man syg,',
  'men en fingerbøl fuld får den syge til at svede. Den, der først lagde',
  'mærke til det, fortalte det videre.',
  '',
  'Det er den egentlige præstation: **at give videre**. Et menneskeliv',
  'rækker ikke til at afprøve hundrede planter. Men ti liv rækker, og',
  'hundrede så meget mere. Viden, der gennem generationer gik fra den gamle',
  'kone til barnebarnet, fra helbredersken til hendes elev, er afprøvet',
  'viden — afprøvet ikke i et laboratorium, men på mennesker, over meget',
  'lang tid. Det kalder man **erfaringsmedicin**. Den samler det, der',
  'hjælper, og glemmer det, der ikke hjælper. Langsomt, upræcist, men',
  'ubønhørligt.',
  '',
  'Dertil kom det at afse. Dyrene æder planter, når de har ondt. Sår heler',
  'bedre, når man skyller dem. En brækket arm vokser lige sammen, når man',
  'binder den mellem to træstykker. Intet af det behøvede nogen at kunne',
  'forklare for at gøre det.',
  '',
  '## Hvad vi troede på — tænkemåden bag lægekunsten',
  '',
  'For at forstå, hvorfor helbredersken gjorde, hvad hun gjorde, må man',
  'kende hendes verdensbillede. Det er et andet end vores, men det er ikke',
  'et uden orden.',
  '',
  '**For det første: Mennesket står ikke alene.** Det hører til slægten,',
  'til landet, til de døde, til de kræfter, der skaber vejr og jagtlykke.',
  'Sundhed er den tilstand, hvor alting er i balance med hinanden. Sygdom',
  'er en **forstyrrelse** af denne balance — ikke blot en defekt i kroppen,',
  'men en revne i sammenhængen.',
  '',
  '**For det andet: Intet sker uden grund.** Det afgørende spørgsmål i den',
  'tidlige lægekunst er ikke „hvad fejler han?", men „hvorfor rammer det',
  'ham, og hvorfor nu?". På det spørgsmål svarede tidens verdensbillede med',
  'det, det havde: med en ånd, der var blevet krænket. Med en regel, som',
  'nogen havde brudt. Med noget fremmed, der var kommet ind i kroppen — en',
  'pil, en orm, et ondt blik. Eller med, at en del af mennesket er gået',
  'bort og skal hentes tilbage.',
  '',
  '**For det tredje: At hele betyder at genoprette balancen.** Ikke „dræbe',
  'smitten" — den kendte ingen —, men bringe ordenen tilbage. Alt det',
  'øvrige følger af den ene antagelse.',
  '',
  '## Hvorfor vi gjorde, hvad vi gjorde',
  '',
  'Af den tænkemåde forklares hvert eneste redskab, helbredersken brugte.',
  'Hun gjorde ikke tre forskellige ting — hun gjorde altid det samme, ad',
  'tre veje.',
  '',
  '- **Planten.** Den griber ind i kroppen dér, hvor den er ude af balance:',
  '  Den driver ud, hvad der er for meget, den varmer, hvad der er koldt,',
  '  den løser krampen. At en bark sænker feberen, behøvede ingen teori —',
  '  det var nok, at det skete, igen og igen.',
  '- **Ritualet.** Det behandler den anden del af forstyrrelsen: revnen',
  '  mellem den syge og hans verden. Sangen, røgen, trommen, udblæsningen',
  '  af det fremmede fra kroppen — det var for de involverede ingen',
  '  forestilling, men den egentlige årsagsbehandling. Og hele slægten sad',
  '  med. Den syge var ikke alene.',
  '- **Hånden.** Rette, skinne, brænde, skære, sy. Også kniven tjente',
  '  samme syn: Det, der ikke hører til inde, skal ud.',
  '',
  'For helbredersken var det ikke adskilte ting, som hun skulle vælge',
  'imellem. Urt og sang hørte sammen, ligesom diagnose og recept hos os.',
  'Den, der kun gav urten, havde gjort halvdelen af arbejdet.',
  '',
  '## Skriften forandrer alt — Egypten',
  '',
  'Så kom et folk, der kunne fastholde erfaringen. Ved Nilen voksede',
  'papyrusplanten; af dens marv pressede egypterne blade, og på de blade',
  'kom det, en helbreder havde gjort hos en syg. For første gang var noget',
  'muligt, som en menneskehukommelse ikke kan: **at samle**. En recept fra',
  'to hundrede år siden stod samme dag til rådighed som gårsdagens. Viden',
  'behøvede ikke længere at blive husket, den kunne slås op.',
  '',
  'Den egyptiske læge, **swnu**, var ingen troldmand, men en skriver: en',
  'embedsmand med uddannelse, titel og rang. Der fandtes øjenlæger,',
  'tandlæger, læger for kroppen, endog en „opsynskvinde over lægekvinderne".',
  'Da grækeren Herodot rejste i landet, undrede han sig: Hver læge skulle',
  'kun beskæftige sig med én sygdom. Han overdrev — men titlerne i gravene',
  'giver ham i kernen ret.',
  '',
  'To skrifter er den gamle medicins mest berømte bøger. **Ebers-papyrusen**,',
  'omkring 1550 f.Kr., omkring tyve meter lang, samler omkring 877 recepter —',
  'mod mavepine, orm, forbrændinger, krokodillebid og hårtab.',
  '**Edwin Smith-papyrusen** er en afskrift af en meget ældre tekst: 48',
  'kirurgiske tilfælde, hver efter samme mønster — undersøgelse, vurdering,',
  'behandling. Den nævner endda tre vurderinger: „en sygdom, som jeg vil',
  'behandle", „en, som jeg vil kæmpe med" — og „en sygdom, der ikke kan',
  'behandles". At udtale den tredje vurdering og kun give pleje var tilladt',
  'og nedskrevet. Det er måske den nøgterneste sætning i hele den gamle',
  'medicin.',
  '',
  'Og tænkemåden forblev den samme, kun mere billedrig. Egypterne tænkte',
  'kroppen som et land med kanaler, præcis som deres Nildal: Fra hjertet',
  'løber **metu**, og i dem flyder alting — blod, luft, vand, sæd. Hjertet',
  'er menneskets midte; det tænker og taler. Sygdom er noget, der kommer',
  'ind eller samler sig: en orm, et ondt pust, eller **wechedu**, et',
  'forrådnelsesstof, der opstår i tarmen og vandrer gennem kanalerne. Pus,',
  'feber og smerte gjaldt som dets spor. Derfor pulsen: „Det måler hans',
  'hjerte" hedder det i Ebers-papyrusen — den, der tror, at alle strenge',
  'går ud fra hjertet, for ham er pulsen en besked. Og derfor klysterne og',
  'brækmidlerne: Den, der får forrådnelsesstoffet ud, før det vandrer,',
  'skærer sygdommen over ved roden.',
  '',
  'Også midlerne forblev helbrederskens, blot anvendt mere præcist. På',
  'såret kom den første dag frisk kød, derefter honning med fedt og en',
  'linnedforbinding — gentaget hundrede gange. Og amuletten om halsen? Mod',
  'en ubuden gæst stiller man en vagt. Amuletten er den dør, man låser,',
  'før tyven kommer — forebyggelse med midlerne fra et verdensbillede,',
  'hvor onde kræfter er lige så virkelige som orm i tarmen.',
  '',
  '## Også guderne helbredte',
  '',
  'For der fandtes endnu en anden vej, og den var ikke en modsætning. Den',
  'egypter, der havde det skidt, gik ikke kun til lægen. Han gik i templet,',
  'sov der for at få et svar i drømmen. Han købte en amulet. Han lod en',
  'besværger for gudinden Selket komme, hvis en skorpion havde stukket ham —',
  'i Deir el-Medina sad sådan én ved siden af lægen på samme lønningsliste.',
  'Sygdom var for ham aldrig kun en kroppens tilstand, men også et tegn: en',
  'prøvelse, et ord fra guderne, der skulle tydes. Helbredelse betød så at',
  'bringe forholdet i orden igen — formilde den vrede gud, fordrive den',
  'onde ånd. Det samme verdensbillede som overalt, blot med embedsmænd:',
  'Formularen var medicinens anden del, det hellige vand bar ordenes kraft',
  'ind i den syge, og templet gav mennesket det, som slægten havde givet',
  'den syge i jægertiden: Han var ikke alene.',
  '',
  '## Hvad det udrettede',
  '',
  'Meget af det virkede — målbart, den dag i dag kan man følge det.',
  '',
  '**Planterne.** Pilebark indeholder det stof, som senere blev til',
  'aspirin. Opiumsvalmuen bar opium i sig, som morfinen kom fra — den dag i',
  'dag vores stærkeste smertestillende middel. Kinabarken, i generationer',
  'viden hos folket i Andesbjergene, blev til kinin mod malaria. Af',
  'pilegiften kurare, som indigene jægere i Sydamerika lammede deres bytte',
  'med, blev et middel, der først gjorde den moderne kirurgi mulig. Og',
  'fingerbøllen, et husmiddel i den engelske folkemedicin, er gået ind i',
  'hjertemedicinen som digitalis. Disse stoffer har intet laboratorium',
  'opfundet. De blev fundet — af mennesker uden mikroskop, med intet andet',
  'end opmærksomhed og tid.',
  '',
  '**Sårplejen.** Honning trækker vand ud af bakterier, er sur og danner i',
  'små mængder brintoverilte — den hæmmer bakterier virkelig. Medicinsk',
  'honning gives i dag igen på dårligt helende sår; forskningen derom er',
  'ordentlig, om end ingen erstatning for antibiotika. Myrra virker',
  'smertestillende og kimhæmmende og sidder den dag i dag i mundskyllevand.',
  '',
  '**Kirurgien og hånden.** Det ældste kranium i Europa med en trepanation,',
  'en åbning af kranielaget, stammer fra Ensisheim i Elsass, omkring 5100',
  'f.Kr. Manden havde to sådanne åbninger — og knoglekanterne er glat',
  'tilhelede. I Peru fandt man hundredvis af sådanne kranier; ved en stor',
  'del af dem viser knoglen samme heling. Nogen åbnede et levende hoved med',
  'stenredskaber, og mennesket rejste sig igen. Fra en grav i Theben',
  'stammer desuden en tå af træ og læder, omhyggeligt arbejdet, med',
  'slitage: en protese, der blev båret.',
  '',
  '**Den præcise beskrivelse.** Edwin Smith-papyrusen nævner hjernen, dens',
  'hinder og dens vindinger — den første kendte omtale overhovedet. Den',
  'beskriver, at en skade på den ene side af hovedet lammer den anden side',
  'af kroppen — og hvordan man sætter en af led gået kæbe på plads,',
  'præcis som man stadig gør i dag.',
  '',
  '**Og det, der er sværere at få hold på.** Omsorg, ro, forventning,',
  'visheden om, at der er nogen, der tager sig af én — det forandrer,',
  'hvordan et menneske oplever smerte, og hvordan det kommer sig. Den',
  'nuværende forskning kalder det placeboeffekt og omsorgseffekt og finder',
  'det igen og igen i sine undersøgelser. Helbredersken kaldte det ikke',
  'sådan. Brugt har hun det hver dag — og templet ved Nilen gjorde en egen',
  'kunst ud af det.',
  '',
  '## Hvor vi fejlede',
  '',
  'Det ville være en dårlig fortælling, der fortiede det. Denne lægekunst',
  'havde hårde grænser, og de kostede liv.',
  '',
  'Hvert andet eller tredje barn døde, før det blev voksent. Kvinder døde i',
  'barselssengen. Et sår, der betændte sig, en sprængt blindtarm, en',
  'lungebetændelse om vinteren — der var intet at stille op, slet intet.',
  'Mod de store plager hjalp heller ikke Egyptens viden: I mumier er der',
  'påvist tuberkulose, malaria, bilharziose og forkalkede pulsårer.',
  'Bilharziosen kom med vandingsvandet — netop det vand, som landet levede',
  'af.',
  '',
  'Og anatomien udeblev. Man skulle tro, at et folk, der åbner og tømmer',
  'sine døde, må kende kroppen. Sådan var det ikke. Balsamererne var en',
  'egen, lidet agtet faggruppe; ingen læge stod ved siden af og tegnede',
  'med. Den hjerne, man trak ud gennem næsen, holdt man for uvigtig. Hjerte',
  'og kanaler forblev en forestilling, ikke et fund.',
  '',
  'Også selve verdensbilledet havde en pris. Hvis sygdom er en revne i',
  'sammenhængen, så har måske nogen forårsaget den — og så søger man efter',
  'hvem. Af spørgsmålet „hvorfor rammer det ham?" er der gennem årtusinderne',
  'opstået megen ulykke: mistanker, udstødelse, senere forfølgelsen af',
  'helbredersker som „hekse". Det hører med til denne tænkemåde, selv om',
  'det er ubehageligt.',
  '',
  'Og midlerne selv var risikable. Mellem den dosis, der hjælper, og den,',
  'der dræber, ligger der ved fingerbøllen og opiumsvalmuen kun lidt. I de',
  'egyptiske recepter står æselmøg og fluelort — efter logikken om det',
  'frastødende; på et åbent sår er møg imidlertid en vej til stivkrampe. Og',
  'hvor formularen erstattede behandlingen i stedet for at ledsage den, gik',
  'der tid tabt, som ingen havde. Noget af det, der blev givet videre',
  'gennem generationer, hjalp aldrig og blev alligevel givet videre, fordi',
  'de fleste sygdomme går over af sig selv, og erindringen så hænger sig i',
  'midlet. Ikke al gammel viden er god viden. Gammel betyder kun gammel.',
  '',
  '## Hvad der blev af denne viden',
  '',
  'Til sidst står der et spørgsmål, som denne stemme ikke længere kan',
  'besvare. Hvad skete der med denne lægekunst, da andre kom, som tænkte',
  'anderledes? Da lærde i Europa i 1800-tallet begyndte at kalde hele folk',
  '„primitive" — et ord, som ingen har givet sig selv — og deres lægekunst',
  'med? Hvad gik tabt undervejs, og hvad har den moderne medicin, uden',
  'altid at sige det, overtaget fra netop disse hænder?',
  '',
  'Det svarer den anden stemme i dette kapitel på: synsvinklen om',
  'nedvurderingen — og den sene genopdagelse.',
].join('\n');

/**
 * Nedvurderingens og genopdagelsens stemme — hvordan den senere, „moderne"
 * verden afviste den tidlige helbredelsesviden som „primitiv" — og hvad den
 * i dag skylder den.
 *
 * Skrevet af DeepSeek (runde 1, anden gennemgang). Hun nævner selv de
 * ubehagelige pletter på sin egen side: Nedvurderingen var ikke kun ond
 * hensigt, og nutidens beundring er ikke kun indsigt (tillægsregel for
 * følsomme emner).
 */
const stemmeNedvurderingOgGenopdagelse = [
  '## Hvem der taler her',
  '',
  'Denne stemme har to ansigter, og det siger den fra begyndelsen af. Det',
  'første ansigt er Europas 1800-tal: lærde, missionærer, læger og',
  'koloniale embedsmænd, der skrev om den verden, de netop underlagde sig.',
  'De kaldte hele folk „primitive" — og deres lægekunst med. Det andet',
  'ansigt er den nuværende forskning, der netop genopdager denne viden og',
  'tager den alvorligt. Det er den samme stemme, der først nedvurderede og',
  'så undrede sig. Det hører ærligt talt sammen.',
  '',
  '## Hvordan viden blev nedvurderet',
  '',
  'Nedvurderingen begyndte ikke med en vurdering af enkelte midler, men med',
  'en vurdering af hele folk. Den, der ikke havde skrift, sådan tænkte man,',
  'havde heller ingen tænkning; den, der levede i et andet verdensbillede,',
  'havde heller ingen viden. „Primitiv" var derved ingen konstatering, men',
  'en rang — den, der brugte ordet, stillede sig selv øverst.',
  '',
  'Følgerne var konkrete. Viden om lægeurter, der var vokset gennem',
  'årtusinder, blev ikke samlet, men fortrængt: Koloniherrernes egen',
  'medicin skulle træde i dens sted. Helbredersker og helbredere mistede',
  'deres stilling, deres skoler, ofte deres navn. Og når et middel alligevel',
  'virkede, blev det taget — uden navnet på den, der havde fundet det.',
  'Andesfolkenes kinabark blev til „europæernes kinin"; jægernes kurare blev',
  '„opdaget", som om det ikke havde været der før. Det har man senere kaldt',
  'biopirateri: at tage uden at nævne, hvem man skylder det.',
  '',
  '## Nedvurderingens tænkemåde — hvorfor gjorde de det?',
  '',
  'Også denne tænkemåde skal man forstå, ikke kun fordømme. Den, der i',
  '1800-tallet drog ud, havde ægte resultater i bagagen: vaccinationen mod',
  'kopper, de første skridt i hygiejnen, den begyndende anatomi. At ens',
  'egen medicin var den andens overlegen, var dengang ingen ond påstand,',
  'men en daglig erfaring. Dertil kom fremskridtstroen: Den, der troede på',
  'den ene, netop tilkæmpede fornuft, for ham var enhver anden måde at',
  'tænke på en vildfarelse eller et forstadium. Og der kom de økonomiske',
  'interesser til: Koloniherredømme lod sig dårligere sælge, hvis man',
  'samtidig misundte de underlagte deres viden. Sådan blev misundelse,',
  'overlegenhed og fortjeneste til ét eneste ord: „primitiv".',
  '',
  '## Hvad denne tænkemåde overså',
  '',
  'Den overså, at helbrederskens midler ikke var overtro, men afprøvet',
  'erfaring. Den moderne forskning har indhentet det, stof for stof: Af',
  'pilebarken blev der aspirin, af opiumsvalmuen morfin, af kinabarken',
  'kinin, af fingerbøllen digitalis, af kurare muskelafslapperen i',
  'kirurgien. Og det fortsætter: Artemisinin mod malaria, et af de',
  'vigtigste aktivstof-fund i de seneste årtier, stammer fra bynken, som',
  'den kinesiske helbredelsestradition har brugt i århundreder.',
  'Medicinfirmaer gennemsøger den dag i dag verdens helbredelsesviden for',
  'nye stoffer — og forskningen i omsorg og forventning (det, helbredersken',
  'brugte hver dag) bekræfter, at helbredelse er mere end aktivstoffet.',
  '',
  'Også juridisk er der sket noget: Siden Nagoya-protokollen skal lande og',
  'folk give deres samtykke, før deres traditionelle viden bruges til',
  'forskning og forretning. Spørgsmålet om, hvem viden tilhører, er i dag en',
  'retsstrid — for hundredeoghalvtreds år siden var der ingen, der var',
  'kommet på ideen at stille det.',
  '',
  '## Hvor denne stemme selv fejler',
  '',
  'Nu de ubehagelige pletter, for denne stemme har dem. For det første:',
  'Genopdagelsen er også en mode. Den, der i dag sværmer for „gammel',
  'visdom", gør nogle gange det samme som nedvurdererne, blot med omvendt',
  'fortegn — han sætter det gamle øverst uden at afprøve det. Men ikke alt',
  'gammelt er godt, lige så lidt som alt gammelt er dårligt. „Gammel',
  'betyder kun gammel" gælder i begge retninger.',
  '',
  'For det andet: Nedvurderingen havde også en ærlig side. Kolonimedicinen',
  'bragte vaccinationer og hygiejne dertil, hvor det ikke fandtes, og',
  'reddede liv — ofte med de samme hænder, der kort efter foragtede de',
  'andres viden. Det lader sig ikke adskille rent, og den, der adskiller',
  'det rent, fortæller igen en sejrshistorie eller en offerhistorie.',
  '',
  'For det tredje: Også genopdagelsen selv er ikke fri for tilegnelse. Den,',
  'der i dag markedsfører et „indigent" middel, betaler ikke automatisk til',
  'dem, hvis bedstemødre kendte det. Nagoya-protokollen er en begyndelse,',
  'ikke en afslutning.',
  '',
  '## Hvad denne stemme svarer helbredersken',
  '',
  'Helbredersken har til sidst i sin tekst spurgt: Hvad skete der med min',
  'viden, da andre kom, som tænkte anderledes? Svaret fra denne stemme',
  'lyder: En del blev ødelagt, en del blev taget uden at nævne navnet — og',
  'en del bliver i dag, sent og ikke uden dårlig samvittighed, taget',
  'alvorligt igen. Den, der vil vide, hvad denne viden var værd, må læse',
  'begge sætninger på en gang. Syntesen forsøger netop det.',
].join('\n');

/** Kapitel 1 i emnekortet. */
const anfaengeDerHeilkunde = {
  id: 'anfaenge-der-heilkunde',
  titel: 'Lægekunstens begyndelse',
  epoche: 'Fra jægerne og samlerne til det gamle Egypten',

  aufhaenger: {
    frage: 'Hvem opfandt den første medicin?',
    text: [
      'Spørgsmålet har en hage: Der findes intet svar med et navn i sig.',
      'Længe før nogen kendte skrift, byer eller læger, sad mennesker hos',
      'syge, kølede feber, rettede knogler og gav urter. De gjorde det i',
      'Europa, i Afrika, i Asien, i Amerika — overalt, hvor mennesker',
      'levede, og omtrent på samme tid.',
      '',
      'Og de handlede intuitivt: De iagttog, prøvede sig frem og gav videre,',
      'hvad der hjalp — med de naturlige midler, de kendte: planter, vand,',
      'varme, den egne hånd. I Egypten blev denne erfaring for første gang',
      'til en skrift: bøger med hundredvis af recepter, læger med specialer —',
      'og ved siden af bønner, guder og amuletter, uden hvilke ingen recept',
      'var fuldstændig.',
      '',
      'Noget af det virkede forbløffende godt. Noget virkede slet ikke.',
      'Begge dele hører med. Dette kapitel går tilbage dertil, hvor',
      'medicinen begynder — og spørger, hvad menneskene dengang tænkte, når',
      'de havde en syg foran sig.',
    ].join('\n'),
  },

  // Kortet ligger i utils/themen/karten/anfaenge-der-heilkunde.js — her er
  // kun dets tekster oversat (karteHinweise), ikke selve kortet.
  karteHinweise: [
    // Faser fra kortet.
    {
      label: 'For omkring 12 000 år siden',
      hinweis:
        'Jægere og samlere — og overalt mennesker, der tog sig af syge. ' +
        'Kortet viser kun et udsnit af verden: Kina, Amerika, Australien ' +
        'og Afrika syd for Sahara mangler. Der blev også helbredt dér.',
    },
    {
      label: 'Omkring 10 000 f.Kr.: de første landsbyer',
      hinweis:
        'At blive bofast betyder: mere mad, flere mennesker på trang plads — ' +
        'og nye sygdomme. Lægekunsten får mere at lave.',
    },
    {
      label: 'Omkring 3500–1500 f.Kr.: de tidlige højkulturer',
      hinweis:
        'Ved Nil, Eufrat, Tigris og Indus opstår byer — og med dem ' +
        'mennesker, der kun helbreder: de første læger med titel.',
    },

    // Info-punkter fra kortet.
    {
      label: 'Shanidar',
      hinweis:
        'I denne hule i Zagros-bjergene lå neandertalergrave. En af de ' +
        'døde, „Shanidar 1", havde en forkrøblet arm, et knust ansigtsben ' +
        'og var vel blind på det ene øje — og levede alligevel med det i ' +
        'årevis. Alene havde han næppe klaret det: Nogen har taget sig af ' +
        'ham. Den berømte „blomstergrav" med pollen fra lægeurter er ' +
        'derimod omstridt — pollen kan også være ført ind af gnavere.',
    },
    {
      label: 'Ensisheim',
      hinweis:
        'I Elsass fandt man Europas hidtil ældste kranium med to ' +
        'trepanationer — åbninger i knoglen, omkring 5100 f.Kr. Kanterne ' +
        'er glat tilhelede: Manden overlevede begge indgreb og levede ' +
        'bagefter endnu længe. Hvorfor der blev åbnet, ved ingen med ' +
        'sikkerhed: mod hovedpine, efter et slag mod hovedet — eller for ' +
        'at lukke noget ud, som man formodede var der.',
    },
    {
      label: 'Ötzi',
      hinweis:
        'Manden fra isen døde omkring 3300 f.Kr. ved Tisenjoch. Ved hans ' +
        'udstyr hang to stykker birke-svamp, en træsvamp, i læderremme. I ' +
        'hans tarm sad æg fra piskeormen, hans led var nedslidte, og 61 ' +
        'tatoveringer ligger påfaldende ofte netop dér. Om svampen var en ' +
        'medicin, og stregerne en behandling, er en velbegrundet ' +
        'formodning — bevist er det ikke.',
    },
    {
      label: 'Jericho',
      hinweis:
        'En af verdens ældste bosættelser: Allerede omkring 9000 f.Kr. ' +
        'boede mennesker her varigt sammen, senere bag en mur. Hvor mange ' +
        'lever tæt sammen, spreder sygdomme sig lettere — og hvor nogen ' +
        'bliver, kan han pleje syge i ugevis. Begge dele begynder her: de ' +
        'nye lidelser og den varige omsorg.',
    },
    {
      label: 'Am Nil',
      hinweis:
        'Længe før Egypten beskrev sine berømte papyri, tog mennesker ved ' +
        'Nilen sig af sår, brud og feber. Skeletterne viser skinnede arme ' +
        'og tilhelede brud. Af landsbyernes erfaringsviden blev der senere ' +
        'et fag med navn, rang og skrift — historien derom fortæller ' +
        'kapitlet om Egypten.',
    },
    {
      label: 'Mohenjo-Daro',
      hinweis:
        'Ved Indus lå omkring 2500 f.Kr. en by med murede bade, brønde og ' +
        'afløbskanaler i næsten hvert hus. Ingen kendte bakterier — ' +
        'alligevel holdt menneskene snavs og drikkevand adskilt. Renlighed ' +
        'var her orden og renhed, ikke hygiejne i nutidens forstand. ' +
        'Virket har den formentlig alligevel.',
    },

    // Bevægelser fra kortet.
    {
      label: 'Landsbyer og agerbrug mod vest',
      hinweis:
        'Fra den frugtbare halvmåne spredte agerbrug og faste landsbyer sig ' +
        'over Anatolien og Balkan til Mellemeuropa. Med markerne rejste ' +
        'nytteplanterne — og med dem kendskabet til, hvilken plante ved ' +
        'vejkanten hjælper mod hvad. Med rejste der dog også nye sygdomme: ' +
        'trange landsbyer, forrådsskadedyr og dyr i huset bragte lidelser, ' +
        'som jægere og samlere næppe kendte.',
    },
    {
      label: 'Landsbyer og agerbrug mod øst',
      hinweis:
        'Den samme bevægelse løb mod øst: over Zagros-bjergene og de ' +
        'iranske højsletter helt til Indus-dalen. Lægeurter, håndgreb og ' +
        'forestillinger om sygdom vandrede med menneskene — viden er aldrig ' +
        'blevet på ét sted. Hvad der blev af det i Indien, fortæller senere ' +
        'kapitlet om ayurvedaen.',
    },
  ],

  perspektiven: [
    {
      id: 'heilerin',
      name: 'Helbrederskens stemme',
      stimme: 'Opus',
      text: stemmeHelbredersken,
    },
    {
      id: 'wiederentdeckung',
      name: 'Nedvurderingens og genopdagelsens stemme',
      stimme: 'DeepSeek',
      text: stemmeNedvurderingOgGenopdagelse,
    },
  ],
  synthese: [
    '## Hvor de to stemmer mødes',
    '',
    'Først det fælles, og det er mere, end man skulle tro. Begge stemmer er',
    'enige om kendsgerningerne: Trepanationen blev overlevet — det står i',
    'knoglerne. Kinabark, pilebark, opiumsvalmue, fingerbøl og kurare',
    'virkede, før nogen navngav deres stoffer. Honning på såret var ingen',
    'mode, men erfaring — forskningen bekræfter den den dag i dag. Begge',
    'anerkender, at denne viden opstod gennem iagttagelse og videregivelse —',
    'helbredersken kalder det erfaringsmedicin, genopdagelsen kalder det',
    'afprøvet erfaring. Og begge ser, at helbredelse er mere end indgrebet:',
    'omsorgen, forventningen, følelsen af ikke at være alene. Helbredersken',
    'brugte det, templet ved Nilen gjorde en kunst ud af det, forskningen',
    'måler det. De mener det samme.',
    '',
    '## Hvor de går fra hinanden',
    '',
    'Modsætningen begynder ved fortolkningen. For helbredersken er hendes',
    'kunst en i sig selv sammenhængende måde at tænke på: sygdom som en',
    'forstyrrelse af balancen, helbredelse som genoprettelse af ordenen — i',
    'Egypten udmalet som et kropsland med kanaler og forrådnelsesstof. For',
    'nedvurderingens stemme var den samme tænkning et forstadium, som den',
    'moderne medicin måtte overvinde — og genopdagelsens stemme må spørge',
    'sig selv, om den ikke i dag omvendt ophøjer det gamle. De strides altså',
    'ikke om planterne, men om spørgsmålet, hvem der bestemmer, hvad der',
    'gælder som viden: erfaringen fra hundrede generationer eller',
    'laboratoriet fra hundred år. Og de strides om nedvurderingens regnskab:',
    'Det, der blev ødelagt, kan ikke hentes tilbage — men kolonimedicinen',
    'bragte også vaccinationer og hygiejne, og den, der fortier det,',
    'fortæller igen kun én side.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'Ved begyndelsen ser man for første gang det, der vil ledsage alle de',
    'følgende kapitler: Tænkemåden bestemmer metoden. Den, der forstår',
    'sygdom som en forstyrrelse, helbreder anderledes end den, der forstår',
    'den som en smitte — og spørgsmålet „hvorfor skulle det hjælpe?" har i',
    'hver tid et andet, i sig selv sammenhængende svar. Striden om',
    'fortolkningen er ældre end medicinen selv.',
    '',
    'Og endnu noget begynder her: Helbredersken havde et redskab, som intet',
    'laboratorium har bygget efter — visheden om, at der er nogen, der tager',
    'sig af én. Den moderne medicin måler det som omsorgseffekt og har svært',
    'ved at give det en plads i sin hverdag. Måske er det det første punkt,',
    'hvor et fællesskab ikke blot er muligt, men nødvendigt.',
    '',
    'Grækerne, der som de næste træder ind på scenen, vil arve spændingen:',
    'Hippokrates siger sig løs fra guderne — og hans folk bygger templer for',
    'helbredelsesguden Asklepios, hvor syge sover, præcis som ved Nilen.',
    'Spørgsmålet bliver: Hvad er et middel værd, der ikke når kroppen, men',
    'når mennesket?',
  ].join('\n'),

  urteil: {
    frage: 'Hvad ville du tage imod fra en helbrederske — og hvad ikke?',
    hinweis: [
      'Der er her intet rigtigt og intet forkert. Tænk på urten mod feber,',
      'på det åbnede kranielåg, på sangen ved den syges leje, på hånden,',
      'der skinner armen — og på den egyptiske læge, der samtidig bad',
      'bønner. Hvor ville du være enig, hvor ville du tøve — og hvad gør du',
      'forskellen fast på?',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Stemmer det, at mennesker i stenalderen kunne overleve en åbning ' +
        'i kraniet (en trepanation)?',
      antworten: [
        'Nej, et sådant indgreb endte altid dødeligt.',
        'Ja — ved mange fund er knoglekanterne tilhelede.',
        'Trepanationer findes først fra middelalderen.',
      ],
      richtig: 1,
      erklaerung:
        'Tilhelede knoglekanter vokser kun hos levende. Kraniet fra ' +
        'Ensisheim i Elsass (omkring 5100 f.Kr.) bærer to tilhelede ' +
        'åbninger; i Peru fandt man hundredvis af yderligere eksempler.',
    },
    {
      frage: 'Hvor omfattende er Ebers-papyrusen (omkring 1550 f.Kr.)?',
      antworten: [
        'Omkring to meter lang, med cirka 30 recepter.',
        'Omkring tyve meter lang, med cirka 877 recepter og afsnit.',
        'Omkring hundrede meter lang, med cirka 5000 recepter.',
      ],
      richtig: 1,
      erklaerung:
        'Rullen er omkring tyve meter lang og indeholder cirka 877 afsnit — ' +
        'recepter mod mavepine, øjenlidelser, orm, forbrændinger og meget ' +
        'mere. Den blev købt i Luxor i 1873 og ligger i dag i Leipzig.',
    },
    {
      frage:
        'Stemmer det, at honning på sår også bruges i nutidens medicin?',
      antworten: [
        'Ja — medicinsk honning gives på dårligt helende sår og ' +
          'forbrændinger.',
        'Nej, honning på sår gælder i dag som ren overtro.',
        'Kun i Egypten, ingen andre steder.',
      ],
      richtig: 0,
      erklaerung:
        'Honning trækker vand ud af bakterier, er sur og danner i små ' +
        'mængder brintoverilte — den hæmmer bakterier. Særligt tilberedt ' +
        'honning bruges derfor i sårplejen; en erstatning for antibiotika ' +
        'er den ikke.',
    },
    {
      frage:
        'Hvilket middel mod malaria bygger på viden hos indigene folk i ' +
        'Sydamerika?',
      antworten: [
        'Penicillin fra skimmelsvampen.',
        'Kinin fra barken på kinatræet.',
        'Insulin fra bugspytkirtlen.',
      ],
      richtig: 1,
      erklaerung:
        'Kinabarken var kendt i Andesbjergene længe, før europæerne lærte ' +
        'den at kende. Af den blev der kinin — i århundreder det vigtigste ' +
        'middel mod malaria.',
    },
    {
      frage:
        'Var „primitive folk" en betegnelse, som disse folk gav sig selv?',
      antworten: [
        'Ja, de forstod sig selv som enkle mennesker.',
        'Nej — begrebet kom udefra, fra Europas 1800-tal.',
        'Begrebet stammer fra stenalderen.',
      ],
      richtig: 1,
      erklaerung:
        '„Primitiv" er en tilskrivning fra europæiske lærde i kolonitiden. ' +
        'Den beskriver ikke disse folks lægekunst, men synet hos dem, der ' +
        'gav begrebet.',
    },
  ],
};

module.exports = anfaengeDerHeilkunde;
