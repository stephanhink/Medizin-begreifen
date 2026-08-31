// Kapitel 16 — „Den moderne medicinalindustri".
//
// Det sjette kapitel om den nyere tid og det første, hvor hovedrollen
// ikke spilles af en forsker og ikke af en lov, men af en virksomhed.
// Siden 1883 betaler en sygekasse for behandlingen (kapitel 13). Dermed
// findes der for første gang i medicinens historie et betalingsdygtigt
// marked for lægemidler — og en branche, der leverer til det. Fra et
// apotek i Darmstadt og to farvefabrikker ved Wupper og Main bliver der
// i løbet af hundrede og halvtreds år en industri med en omsætning på
// omkring halvanden billion dollar om året, som har gjort en ende på
// sygdomme, som vores oldeforældre døde af — og som tjener penge på, at
// mennesker er syge.
//
// TÆNKEMÅDE-analysen er hjertestykket (forfatterens krav). Den spørger
// her: Hvorfor koster en medicin så meget? (Fordi der betales for det,
// der blev søgt, ikke for det, der blev fremstillet: ti til femten år,
// tre undersøgelsesfaser — og af de kandidater, der overhovedet når
// frem til den første afprøvning på mennesker, bliver omkring hver
// tiende godkendt.) Hvorfor en tablet og ikke et råd? (Fordi
// industriens tænkemåde ser sygdommen som et kemisk problem — et
// molekyle mod en proces; og fordi kun tabletten lader sig dosere,
// afprøve, patentere og sælge.) Hvorfor varig medicin? (Fordi kroniske
// sygdomme kræver daglige midler — og fordi et middel, der tages i
// tredive år, også betales i tredive år.) Og bagsiden af hver af disse
// begrundelser: Der forskes, hvor der betales — ikke, hvor nøden er
// størst.
//
// LÆNGDEREGLEN (forfatterens feedback 24.08.2026): Fra kapitel 9 gælder
// omvendelsen — fuldstændig og udførlig; for dette kapitel udtrykkeligt
// (forskningens økonomiske afhængighed). Udførlig betyder ikke oppustet:
// hvert afsnit fører fortællingen videre. Målt bliver der i
// tests/karte-pharmaindustrie.mjs.
//
// TONE-reglen: BEGGE sider fair. Denne første stemme viser industriens
// præstationer (insulin, sulfonamider, penicillin, hiv-behandlingen,
// kræftmidlerne, vaccinerne) OG nævner selv de ubehagelige steder:
// tiden uden afprøvning (kokain som mirakelmiddel, heroin som
// hostemiddel), Contergan, markedsføringen, der overskred grænsen
// (Vioxx, OxyContin, undertrykte undersøgelser), den varige medicin som
// forretningsmodel og den ærlige balance: stærk i diagnostikken, svag
// ved de kroniske sygdomme.
//
// INGEN RYGTER (forfatterens beslutning 25.08.2026): Kun dokumenteret.
// Hvor tal er skøn (antallet af Contergan-børn, udviklingsomkostningerne
// for en medicin), siger teksten det udtrykkeligt og nævner modregningen.
//
// INNOVATIONSCYKLUSSEN (forfatterens observation 26.08.2026, rød tråd):
// Bogens mønster gentager sig her to gange i ren form. Heroinen var i
// treogtyve år et hostemiddel, før den blev forbudt. Thalidomiden har
// skadet tusindvis af børn — og er i dag et godkendt middel mod
// spedalskheds-komplikationer og knoglemarvskræft. Stemmen nævner det
// selv.
//
// Stemmer (runde 15): Den FØRSTE synsvinkel — industrien indefra, som
// sin egen indlægsseddel — skrev Opus. Den ANDEN (kritikken:
// finansinteresserne, forretningen med sygdommen, studiefinansieringen,
// de undertrykte negative resultater, interessekonflikterne i de
// kliniske retningslinjer, den simple medicin uden lobby) og den
// endelige syntese tilføjede Hermes i anden gennemgang.
// Synsvinkel-workflow: CLAUDE.md.
//
// INGEN GENTAGELSER (forfatterens beslutning af 21.08.2026): Kapitel 1
// inddeler efter „hvem der taler her", kapitel 2 begynder med en scene,
// kapitel 3 fortæller et døgn, kapitel 4 er en brevveksling, kapitel 5
// en bogs rejse, kapitel 6 en rundgang, kapitel 7 en proces, kapitel 8
// en regning, kapitel 9 et ur, kapitel 10 en kæde, kapitel 11 en linse,
// kapitel 12 et interview, kapitel 13 en journal. Dette kapitel vælger
// den femtende dramaturgi: INDLÆGSSEDLEN. Industrien taler i den form,
// den selv har opfundet — i rubrikker, med småt, med sammensætning,
// anvendelsesområder, dosering, vekselvirkninger, bivirkninger og
// kontraindikationer. Den anden stemme kan træde ind i samme form: den
// anden indlægsseddel, samme aktive stof, læst fra den anden side.
//
// Kortet ligger i utils/themen/karten/pharmaindustrie.js — af en anden
// art (geometri i stedet for fortælling), derfor i en egen fil. Her er
// kun kortets tekster oversat (faser, punkter, bevægelser) som
// karteHinweise, ikke selve kortet.
//
// Teksterne ligger som linje-Arrays med `.join('\n')` — sådan forbliver
// de læsbare i repoet ved ~72 tegn (forfatteren læser dem her igennem),
// og utils/markdown.js gør dem i appen igen til flydende tekst.
//
// CommonJS uden UI-imports (arkitekturregel): kan kontrolleres med rent
// `node`.

/**
 * Industriens stemme — indlægssedlen for en branche.
 *
 * Skrevet af Opus (runde 15). En stemme, der taler for den side, der
 * laver medicinen: dens regning, dens tænkemåde, dens resultater. Den
 * fortæller, hvorfor den gør, hvad den gør — og den nævner selv de
 * ubehagelige pletter (tillægsregel for følsomme emner i CLAUDE.md).
 */
const stimmeDerIndustrie = [
  '## Pakken, der ligger foran dig',
  '',
  'Tag en hvilken som helst æske fra dit skab. Tyve tabletter i en',
  'blister, en papkasse med blindskrift, en seddel, der er foldet',
  'otte gange, og som næsten ingen læser til ende. På denne seddel',
  'står alt, hvad en myndighed finder nødvendigt: hvad der er i, hvad',
  'det hjælper mod, hvor meget man tager, hvad der kan gå galt.',
  '',
  'Dette kapitel er sådan en seddel. Bare at der denne gang ikke står',
  'et middel på den, men den branche, der laver midlerne.',
  '',
  '**Det, du læser her, er industriens syn på sig selv — en tænkemåde,',
  'ikke en sandhed.** Jeg taler om os i vi-form, fordi det er mere',
  'ærligt end en neutral tone, som ikke findes her. Vi er kemikerne,',
  'lægerne i kontrolafdelingerne, folkene i godkendelsen, på fabrikken,',
  'i salget, i bestyrelsen. Vi har gjort en ende på sygdomme, som dine',
  'oldeforældre døde af. Vi tjener penge på, at mennesker er syge.',
  'Begge dele står på denne indlægsseddel, og ingen af delene ophæver',
  'den anden.',
  '',
  'En indlægsseddel har en særhed, der gør den brugbar for dette',
  'kapitel: **Den er den eneste reklame i verden, der foreskriver, at',
  'man også skal skrive det dårlige om sit eget produkt.** Ikke',
  'frivilligt. Der skulle katastrofer til, før disse rubrikker stod på',
  'papiret. Om disse katastrofer skal der tales længere nede.',
  '',
  'To forord til tallene, fordi dette kapitel er fuld af tal. For det',
  'første: **Hvor et tal er et skøn, siger jeg det.** Der er i denne',
  'historie nogle tal, der bliver skrevet af overalt og alligevel er',
  'omstridte — udviklingsomkostningerne for en medicin for eksempel.',
  'Så nævner jeg regningen og modregningen. For det andet: Omsætning',
  'er ikke profit, og profit er ikke bevis på dårlige hensigter — men',
  'den er heller ikke en baggrundsstøj. Den forklarer, hvad der',
  'forskes i, og hvad der ikke gør.',
  '',
  '## Brugsanvisning: læs venligst hele sedlen',
  '',
  'Hvad der ligger i denne pakke, i den rækkefølge, en indlægsseddel',
  'fører det op:',
  '',
  '1. hvad denne industri er, og hvad den anvendes til;',
  '2. hvor det aktive stof kommer fra — et apotek og to farvefabrikker;',
  '3. tiden før afprøvningen: kokain, heroin, beroligende safter;',
  '4. vendepunktet: salvarsan, insulin, sulfonamider, penicillin;',
  '5. Contergan — katastrofen, som vores regler er skrevet på;',
  '6. prissammensætningen;',
  '7. lægemiddelformen: hvorfor tablet og ikke råd;',
  '8. behandlingens varighed: forretningen med det igen og igen;',
  '9. vekselvirkninger: markedsføringen og dens overskredne grænser;',
  '10. bivirkninger: den ærlige balance på vores side;',
  '11. kontraindikationer: hvor vores tænkemåde ikke må anvendes.',
  '',
  'Til sidst står en advarsel — den del, der ikke står på nogen af',
  'vores pakker.',
  '',
  '## 1. Hvad denne industri er, og hvad den anvendes til',
  '',
  'Sobert først størrelsen. Verdensmarkedet for lægemidler ligger i',
  'dag på omkring **halvanden billion dollar om året** — halvandet',
  'tusind milliarder. Næsten halvdelen af det omsættes i Nordamerika,',
  'hvor der bor mindre end en tyvendedel af menneskeheden. De tyve',
  'største koncerner beskæftiger tilsammen godt over en million',
  'mennesker.',
  '',
  'Og nu virkningen, som disse tal står for. I 1900 lå den forventede',
  'levetid i Det Tyske Kejserrige på omkring **seksogfyrre** år, i dag',
  'på omkring enogfirs. En lungebetændelse var en dødsdom med usikkert',
  'udfald; et betændt sår på benet kunne dræbe en rask mand på en uge;',
  'et barn med diabetes døde — og det gjorde det med sikkerhed, som',
  'regel inden for et år efter diagnosen.',
  '',
  '**Det er ikke sådan længere, og en del af denne forskel er vores',
  'arbejde.** Jeg siger udtrykkeligt: en del. Den største del af',
  'tilbagegangen for de store infektionssygdomme tilhører ikke os, men',
  'kloakeringen, det rene drikkevand, bedre boliger og bedre kost.',
  'Kapitel 15 har regnet det ud på Hamborg og Altona, kapitel 12 på',
  'kurverne, der allerede faldt, før vaccinationerne kom. Den, der',
  'ikke hører denne sætning fra os, får af os fortalt en pyntet',
  'historie. Vores bidrag kommer senere, og det er smallere, end vores',
  'reklame lader ane — men det er der, og det kan efterprøves.',
  '',
  'Hvad anvendes denne industri så til? **Den forvandler molekyler til',
  'midler.** Den søger stoffer, afprøver dem, fremstiller dem i',
  'uforanderlig renhed, i millioner af pakker, den ene som den anden,',
  'med en holdbarhed og en dosis, man kan stole på. Det lyder',
  'kedeligt. Det er halvdelen af præstationen. Et urteekstrakt virker',
  'forskelligt stærkt alt efter jord, høstår og tilberedning; en',
  'tablet virker i Kiel som i Cape Town.',
  '',
  '## 2. Det aktive stofs oprindelse: et apotek og to farvefabrikker',
  '',
  'Vores oprindelse har to rødder, og begge ligger tæt på hinanden på',
  'kortet over dette kapitel.',
  '',
  '**Den første rod er apoteket.** I 1668 overtager Friedrich Jacob',
  'Merck Engel-apoteket i Darmstadt. I næsten hundrede og tres år sker',
  'der det, som apotekere har gjort siden middelalderen: blande, hvad',
  'lægen ordinerer. Så kommer i 1827 det skridt, der ændrer alt.',
  'Emanuel Merck fremstiller rene alkaloider — morfin, kodein, kinin',
  '— ikke længere kun til sin egen disk, men til handel, i jævn',
  'kvalitet og i mængder.',
  '',
  'Man kan overse denne sætning. Den er hele historiens stille vending.',
  '**Indtil da var medicin noget, der blev tilberedt til en bestemt',
  'syg. Fra da af er medicin et produkt med etiket, pris og mærke,',
  'fremstillet til et marked.** Apotekeren blandede til dig. Fabrikken',
  'fremstiller til mange — og du er én af mange.',
  '',
  '**Den anden rod er farven.** I 1863, samme år, opstår to',
  'farvefabrikker: i Barmen-Elberfeld ved Wupper den, der tilhører',
  'Friedrich Bayer og Johann Friedrich Weskott, i Frankfurt-Höchst ved',
  'Main den, der tilhører Meister, Lucius og Brüning. I Basel vokser',
  'Ciba, Geigy og Sandoz ud af silke-farverierne; i 1896 kommer',
  'Hoffmann-La Roche til. I Berlin bliver Ernst Scherings Grønne',
  'Apotek i 1851 til en virksomhed.',
  '',
  'Hvorfor netop farvefabrikker? To grunde, en håndværksmæssig og en',
  'tankemæssig.',
  '',
  'Den håndværksmæssige: Den, der fremstiller anilinfarver, har',
  'kedler, destillationsapparater, kemikere og et laboratorium. Det',
  'samme udstyr, der koger et farvestof, koger også et',
  'lægemiddelstof.',
  '',
  'Den tankemæssige er den mere interessante — og den er oprindelsen',
  'til hele vores tænkemåde. Et farvestof farver ikke alt ens. Det',
  'sætter sig på uld og ikke på bomuld, det farver i et præparat',
  'cellekernen og lader resten stå bleg. Paul Ehrlich, der som ung',
  'mand arbejdede med sådanne farvninger, drog deraf den slutning, der',
  'bærer det tyvende århundredes medicin: **Hvis et stof kan skelne,',
  'hvilket væv det binder sig til, så må der kunne bygges et stof, der',
  'kun rammer smittestoffet og lader mennesket i fred.** Han kaldte',
  'det den magiske kugle.',
  '',
  'Det er fødselsattesten for vores tænkemåde, og den er forbavsende',
  'enkel: **Kroppen er et kemisk system. En sygdom er en forstyrrelse',
  'i dette system. Altså kan den afhjælpes med et stof, der griber ind',
  'præcis det rigtige sted.** Nøgle og lås. Alt, hvad vi siden har',
  'gjort, følger af denne sætning — resultaterne og de blinde pletter',
  'i lige grad.',
  '',
  '## 3. Tiden før afprøvningen: kokain, heroin og en saft til spædbørn',
  '',
  'Og nu rubrikken, som vi helst ville lade være. Den kommer tidligt,',
  'fordi den kom tidligt.',
  '',
  'I slutningen af det nittende århundrede fandtes der ingen',
  'godkendelse. Der fandtes ingen myndighed, der krævede et bevis for',
  'virkning, ingen pligt til at melde bivirkninger, ingen kontrolleret',
  'undersøgelse. **Den, der ville sælge et middel, skulle ikke bevise,',
  'at det hjalp. Han skulle finde en køber.** Det er ingen beskyldning',
  'mod vores forgængere, det var retstilstanden.',
  '',
  'Hvad der kom ud af det, kan vises med tre stoffer.',
  '',
  '**Kokainen.** I 1884 viser øjenlægen Karl Koller fra Wien, at en',
  'opløsning af det gør øjet følelsesløst — den første lokale bedøvelse',
  'i medicinhistorien. Det er en ægte gave og gælder den dag i dag; de',
  'moderne midler, tandlægen sprøjter ind, er dens efterkommere. I',
  'samme tiår bliver det samme stof imidlertid solgt som opkvikkende',
  'middel, som middel mod udmattelse, mod tandpine hos børn og mod',
  'morfinmisbrug; det sidder i vin-tonika og, indtil 1903, i en berømt',
  'amerikansk forfriskning. Kirurgen William Halsted, en af de største',
  'i sit fag, prøvede det på sig selv og forblev afhængig resten af',
  'livet.',
  '',
  '**Heroinen.** Dette er den historie, der optræder sjældnest i vores',
  'jubilæumsskrifter, og den hører til på dette sted, fordi den',
  'udspiller sig ved samme laboratoriebord som vores største',
  'salgssucces. Den 10. august 1897 fremstiller Felix Hoffmann i',
  'Elberfeld acetylsalicylsyre — solgt som aspirin fra 1899. **Elleve',
  'dage senere, den 21. august 1897, fremstiller den samme mand i det',
  'samme laboratorium diacetylmorfin.** Farmakologen Heinrich Dreser',
  'afprøver det, finder det hostestillende og veltolereret, og fra',
  '1898 sælges det under handelsnavnet „Heroin" — navnet kommer af',
  '„heroisk", fordi testerne følte sig stærke og vel til mode.',
  '',
  'Det bliver markedsført som hostemiddel, også til børn, det bliver',
  'anbefalet som erstatning for morfin — og udtrykkeligt som ikke',
  'vanedannende. Det går til mere end tyve lande. Først da',
  'afhængigheden ikke længere kan overses, vælter vurderingen: I 1913',
  'ender fremstillingen, i 1924 forbyder Amerikas Forenede Stater',
  'stoffet, i 1931 bliver det stærkt begrænset i Tyskland.',
  '',
  '**I treogtyve år var vor tids farligste rusmiddel en hostesaft fra',
  'tysk produktion.** Ikke af ond vilje. Af en afprøvning, der efter',
  'dagens målestok ikke var nogen.',
  '',
  '**De beroligende safter.** I det nittende århundredes hjemmeapoteker',
  'stod midler, der beroligede skrigende spædbørn. Hvad der var i dem,',
  'stod ikke på flasken: morfin, opium, alkohol. Børn døde af det.',
  'Først i 1906 krævede Amerikas Forenede Stater, at der stod på',
  'flasken, hvad der var i den — og selv det var kun en pligt til at',
  'angive, ikke et forbud.',
  '',
  'Den næste regel kostede igen liv. I 1937 opløste en amerikansk',
  'producent et sulfonamid i diethylenglycol — frostvæske — og solgte',
  'det som hindbærsirup. **Et hundrede og fem mennesker døde, mange af',
  'dem børn.** Stoffet var ikke blevet afprøvet; det behøvede det',
  'ikke. Et år senere krævede loven for første gang bevis for, at et',
  'middel er uskadeligt.',
  '',
  'Det er det mønster, denne bog siden kapitel 11 fortæller igen og',
  'igen: **Det nye skader ofte først, før det bliver til velsignelse.**',
  'Kirurgien dræbte gennem sårfeber, før den reddede. Strålerne brændte',
  'sine pionerer, før radiologien opstod af det. Hos os ser det sådan',
  'ud: **Skaden kom ikke af, at vi havde dårlige stoffer. Den kom af,',
  'at vi solgte dem, før vi kendte dem.**',
  '',
  '## 4. Vendepunktet: salvarsan, insulin, sulfonamider, penicillin',
  '',
  'Mellem 1909 og 1945 bliver en handel med stoffer til en industri,',
  'der forsker. Fire midler viser, hvordan det gik.',
  '',
  '**Salvarsanen, 1910.** Paul Ehrlich søger sammen med sin japanske',
  'medarbejder Sahachiro Hata den magiske kugle mod syfilis, en',
  'sygdom, der dengang ramte millioner og ødelagde dem langsomt. De',
  'fremstiller arsenforbindelser og afprøver dem, den ene efter den',
  'anden. Nummer 606 virker. Farveværkerne i Höchst udgiver den i',
  '1910. **Det er det første lægemiddel, der ikke blev fundet, men',
  'søgt og udtænkt** — begyndelsen på den planmæssige søgen efter',
  'aktive stoffer, som vi driver den dag i dag. Ehrlich selv advarede',
  'mod bivirkningerne og mod forkert anvendelse; der var alvorlige',
  'skader, og der var en bitter kampagne mod ham. Begge dele hører med.',
  '',
  '**Insulinen, 1922.** I Toronto vinder Frederick Banting og Charles',
  'Best sammen med John Macleod og James Collip et udtræk fra',
  'bugspytkirtlen. I januar 1922 får den trettenårige Leonard Thompson',
  'den første indsprøjtning; han lever. Før denne dag var diabetes hos',
  'børn en sygdom, som man med sultnekure udsatte i måneder, og som så',
  'dræbte.',
  '',
  'Og nu sætningen, der følger os den dag i dag: **Opdagerne overlod',
  'patentet til University of Toronto for en symbolsk dollar.** Ingen',
  'skulle tjene på et livreddende stof. Til fremstillingen behøvedes',
  'der alligevel fabrikker — Eli Lilly i Indianapolis leverer fra 1923',
  'i store mængder, i Europa optager Höchst licensproduktionen. Hvad',
  'der er blevet af denne dollar hundrede år senere, står længere nede',
  'under „Bivirkninger"; det er et af de mest ubehagelige afsnit i',
  'dette kapitel.',
  '',
  '**Sulfonamiderne, 1932/35.** Gerhard Domagk søger i Elberfeld blandt',
  'farvestoffer efter et middel mod bakterielle infektioner — den',
  'magiske kugle-ide, gennemprøvet konsekvent. Det røde azofarvestof',
  'prontosil redder inficerede mus. I 1935 offentliggør han det. For',
  'første gang findes der et middel mod sårinfektion, barselsfeber,',
  'blodforgiftning — de dræbere, som kapitlerne 9 og 11 fortæller om.',
  'Domagk får i 1939 Nobelprisen og må afvise den under pres fra',
  'regimet; han får medaljen først i 1947.',
  '',
  '**Penicillinen, 1941 til 1945.** Opdagelsen hører til kapitel 14.',
  'Til os hører den anden del: at gøre et laboratoriesaft til et',
  'masseprodukt. Amerikanske fabrikker bygger gæringstanke; til',
  'landgangen i Normandiet i juni 1944 står millioner af doser klar.',
  '**Det er vores egentlige rolle i denne historie, og den er ikke',
  'romantisk: Vi opdager sjældent. Vi gør opdagelser til mængder.**',
  'Uden denne evne ville penicillinen være blevet, hvad den var i',
  'elleve år — en fodnote i et fagtidsskrift.',
  '',
  'Og med penicillinen kommer straks bagsiden: Fleming advarede',
  'allerede i 1945 i sin nobeltale mod smittestoffer, der bliver',
  'modstandsdygtige. Han fik ret. Også derom mere længere nede.',
  '',
  '## 5. Contergan 1957 til 1961: katastrofen, som vores regler er skrevet på',
  '',
  'Nu rubrikken, hvor man kan aflæse, hvad en indlægsseddel i',
  'virkeligheden er: et ar i papirform.',
  '',
  'Den **1. oktober 1957** bringer Chemie Grünenthal i Stolberg ved',
  'Aachen et sove- og beroligelsesmiddel på markedet. Aktivt stof:',
  'thalidomid. Handelsnavn: **Contergan**. Det er **receptfrit**. Det',
  'bliver markedsført som særligt veltolereret, som ugiftigt, som',
  'ubekymrende — også for gravide og ammende mødre. Der findes',
  'Contergan forte og en saft til børn. Det bliver eksporteret til',
  'seksogfyrre lande.',
  '',
  'Stoffet virker mod morgenkvalme i graviditeten. Netop derfor tager',
  'kvinder det i de første uger.',
  '',
  'Fra 1959 bliver der født børn med svære misdannelser på lemmerne,',
  'med forkortede eller manglende arme og ben, ofte også med skader på',
  'ører og indre organer. Lægerne står over for noget, de næsten ikke',
  'kender: Sådanne misdannelser var så sjældne, at en børnelæge i hele',
  'sit erhvervsliv måske mødte ét tilfælde. Nu ligger der flere i',
  'samme klinik.',
  '',
  'Børnelægen **Widukind Lenz** fra Hamborg tæller tilfældene, spørger',
  'mødrene systematisk om medicin og finder mønsteret. **Den 15.',
  'november 1961 meddeler han producenten sin mistanke**, den 18.',
  'november fremlægger han den offentligt. Uafhængigt af ham kommer',
  'den australske læge William McBride til samme resultat. **Den 26.',
  'november 1961 bliver Contergan taget af markedet.**',
  '',
  'Hvor mange børn det ramte, er den dag i dag et **skøn** — jeg siger',
  'det udtrykkeligt: Landenes tal blev indsamlet forskelligt, mange',
  'børn døde før eller kort efter fødslen og blev aldrig talt. De',
  'gængse skøn ligger på **5.000 til 10.000 skadede børn på',
  'verdensplan**; i Tyskland blev omkring 2.800 overlevende ramte',
  'talt.',
  '',
  'To ting skal denne indlægsseddel sige om det, og begge er',
  'ubehagelige.',
  '',
  '**For det første: Det kunne have været opdaget.** Stoffet var blevet',
  'afprøvet på dyr, men ikke på drægtige dyr — spørgsmålet om skader',
  'på det ufødte stillede dengang næsten ingen, fordi man troede, at',
  'moderkagen holdt alt skadeligt tilbage. Henvisninger til',
  'nervebeskadigelser hos voksne forelå siden 1959; på lægers klager',
  'blev der svaret undvigende. **Den afprøvning, der manglede, var',
  'ikke umulig. Den var ikke foreskrevet.**',
  '',
  '**For det andet: Et enkelt menneske gjorde forskellen.** I Amerikas',
  'Forenede Stater gennemgik **Frances Oldham Kelsey**',
  'godkendelsesansøgningen og frigav den ikke, fordi dataene forekom',
  'hende tynde — trods ansøgerens gentagne pres. Derfor forblev',
  'Amerika stort set forskånet. En embedskvinde, der sagde nej.',
  '',
  'Og her er det egentlige svar på det spørgsmål, man må stille en',
  'indlægsseddel: **Hvorfor overhovedet en afprøvning?** Ikke, fordi',
  'vi en dag var blevet indsigtsfulde. **Men fordi denne skade var så',
  'stor, at samfundet har påtvunget os reglerne udefra.** I 1962',
  'krævede Amerikas Forenede Stater for første gang ikke kun',
  'uskadelighed, men også et **virkningsbevis i kontrollerede',
  'undersøgelser** og oplysning af testdeltagerne. I Tyskland fulgte i',
  '1961 en første lægemiddellov, der i sin kerne kun krævede en',
  'registrering; den ægte statslige godkendelse med bevis for kvalitet,',
  'virkning og uskadelighed kom først med loven fra 1976, i kraft fra',
  '1978. **Fra de første dødsfald til den bindende tyske godkendelse',
  'gik der næsten tyve år.**',
  '',
  'Straffesagen mod de ansvarlige begyndte i 1968 og blev i 1970',
  'indstillet mod et forligsbeløb; en dom faldt der aldrig. Producenten',
  'undskyldte i 2013, tooghalvtreds år efter tilbagetagelsen. Den, der',
  'synes, det er sent, har ret.',
  '',
  'Og så vendingen, der forbinder dette kapitel med bogens røde tråd.',
  '**Thalidomid er i dag igen et godkendt lægemiddel.** I 1964',
  'konstaterede en israelsk læge, at det næsten øjeblikkeligt lindrer',
  'svære betændelsesudbrud ved spedalskhed; siden 2000\'erne er det et',
  'vigtigt middel mod knoglemarvskræft. Det udleveres under de',
  'strengeste vilkår: graviditetstests, dobbelt prævention,',
  'udleveringsprotokoller. Og alligevel er der i Brasilien, hvor det',
  'bruges mod spedalskhed, blevet født nye skadede børn.',
  '',
  '**Det samme stof, der var en forbrydelse af skødesløshed, er i dag',
  'en velsignelse med sikkerhedsnet — og hullerne i nettet koster',
  'stadig børn.** Hvis denne bog har en regel, så står den her: Det er',
  'ikke stoffet, der er godt eller ondt. Spørgsmålet er, hvor længe man',
  'har afprøvet det, og hvem der bestemmer over prøvetidens længde.',
  '',
  '## 6. Sammensætning: hvad der er i prisen',
  '',
  'Nu til det spørgsmål, vi får oftest, for det meste vredt. **Hvorfor',
  'koster en medicin så meget?**',
  '',
  'Svaret begynder med en sætning, der lyder som en undskyldning og',
  'alligevel er sagens kerne: **Prisen på pakken er ikke prisen for',
  'fremstillingen. Den er prisen for søgningen.** Den anden tablet',
  'koster øre. Det er den første, der betales.',
  '',
  'Sådan ser søgningen ud.',
  '',
  'I begyndelsen står en målstruktur: et protein, en receptor, en',
  'proces i kroppen, som man antager driver sygdommen. Imod den bliver',
  '**tit tusindvis af substanser** gennemprøvet — i dag maskinelt, i',
  'plader med tusind bittesmå fordybninger. Nogle hundrede bliver',
  'tilbage. De bliver ændret, forbedret, igen kasseret. Det, der',
  'bliver tilbage, går ind i den prækliniske afprøvning: cellekulturer,',
  'så dyr — virkning, giftighed, adfærd i kroppen, og siden Contergan',
  'obligatorisk også forsøg på drægtige dyr.',
  '',
  'Først derefter mennesket, i tre faser:',
  '',
  '**Fase I** — tyve til hundrede frivillige, for det meste raske.',
  'Spørgsmål: Bliver stoffet tolereret, hvad gør kroppen ved det,',
  'hvilken dosis er tålelig? Ikke: Hjælper det.',
  '',
  '**Fase II** — nogle hundrede syge. Spørgsmål: Virker det',
  'overhovedet, og ved hvilken dosis? Her fejler de fleste kandidater.',
  '',
  '**Fase III** — hundreder til titusinder af syge, i mange lande,',
  'tilfældigt fordelt, om muligt blindet, sammenlignet med det bedst',
  'kendte middel eller med placebo. Spørgsmål: Er det bedre end det,',
  'der allerede findes, og hvad koster det i bivirkninger? Sådan en',
  'undersøgelse varer år og koster ofte trecifrede millionbeløb.',
  '',
  'Så gennemgår en myndighed — i Europa EMA, i Tyskland BfArM, i',
  'Amerikas Forenede Stater FDA — rådataene, ofte flere titusind',
  'sider. Og derefter begynder **fase IV**: overvågningen i hverdagen,',
  'fordi en bivirkning, der rammer én ud af ti tusind, ikke kan falde',
  'i øjnene i nogen undersøgelse med tre tusind deltagere.',
  '',
  '**I alt: ti til femten år.**',
  '',
  'Og nu tallet, der forklarer prisen: **Af de aktive stoffer, der',
  'overhovedet når frem til den første afprøvning på mennesker, bliver',
  'omkring hver tiende til sidst godkendt.** Ni ud af ti fejler — de',
  'fleste i fase II og III, altså først efter at størstedelen af',
  'pengene er brugt. Den, der finansierer en medicin, finansierer i',
  'virkeligheden ni fejlede oveni.',
  '',
  'Hvor meget det koster, er vores branches mest omstridte tal, og her',
  'hører modregningen med. En meget citeret undersøgelse fra Tufts',
  'University kom i 2016 frem til omkring **2,6 milliarder dollar** pr.',
  'godkendt middel. I dette tal sidder to poster, der strides om:',
  'omkostningerne ved de fejlede kandidater og „kapitalomkostningerne"',
  '— den tabte fortjeneste på de penge, der var bundet i årevis.',
  'Regner man begge dele ud, kommer andre grupper frem til markant',
  'mindre; en undersøgelse af kræftmidler kom i 2017 frem til et',
  'gennemsnit på omkring 650 millioner dollar pr. virksomhed, en',
  'bredere udarbejdelse fra 2020 til knap en milliard pr. nyt aktivt',
  'stof. **Sandheden ligger et sted i denne spændvidde, og vi citerer',
  'traditionelt det øverste tal.** Også det hører på denne seddel.',
  '',
  'Så patentet. Det løber **tyve år fra ansøgningen** — og der ansøges',
  'tidligt, længe før godkendelsen, ellers ansøger en anden. Af',
  'patentet bliver der til sidst oftest otte til tolv år, hvor et',
  'middel er alene på markedet. Derefter kommer generika, og prisen',
  'falder ofte med firs til halvfems procent. **Hele vores regning',
  'hænger på dette vindue.** Derfor den høje pris i begyndelsen,',
  'derfor hastværket, derfor presset på enhver forsinkelse.',
  '',
  'Og endnu noget hører i denne rubrik, fordi det ellers lyder som en',
  'bebrejdelse udefra: **Grundforskningen, som vi bygger på, betaler',
  'som regel andre.** Universiteterne og de statslige institutter',
  'finder målstrukturerne; alene de amerikanske National Institutes of',
  'Health bruger årligt et tocifret milliardbeløb på det. Vi kommer',
  'ofte, når risikoen i grundforskningsspørgsmålet allerede er båret —',
  'og køber derudover små biotekfirmaer, der har lavet den tidlige del',
  'for egen risiko. Vores risiko er ægte. Den er bare ikke hele',
  'risikoen.',
  '',
  '## 7. Lægemiddelformen: hvorfor det er en tablet og ikke et råd',
  '',
  'Nu det spørgsmål, som denne bog styrer mod, og som kommer igen i',
  'kapitel 18. **Hvorfor en tablet og ikke et råd?**',
  '',
  'Det ærlige svar har tre dele, og den tredje er den, man sjældent',
  'hører fra os.',
  '',
  '**For det første, fordi det er vores tænkemåde.** Vi tænker i årsag',
  'og virkning, i molekyler, receptorer og måleværdier. En sygdom er i',
  'denne tænkemåde en reguleringskreds, der er løbet løbsk: for meget',
  'syre, for lidt insulin, et betændelsesbudbringer-stof i overflod.',
  'Den, der tænker sådan, søger det stof, der griber ind præcis der.',
  'Det er ingen grådighed, det er et verdensbillede — det samme, som',
  'kapitel 13 har beskrevet som årsag-virkning-tænkemåden, over for',
  'ligevægtstænkemåden i de gamle traditioner.',
  '',
  '**For det andet, fordi tabletten er målelig.** Fem milligram er',
  'altid fem milligram. Man kan halvere den, blinde den, afprøve den',
  'mod placebo, fordele den tilfældigt i en undersøgelse. **Hele vores',
  'afprøvningsmetode er skåret til ting, der lader sig gribe i',
  'milligram.** Hvordan blinder man bevægelse? Hvordan giver man et',
  'menneske til skin et godt socialt miljø? Det går ikke — og det,',
  'der ikke lader sig afprøve sådan, har en sværere kår i vores verden,',
  'selv hvis det virker.',
  '',
  '**For det tredje, fordi kun tabletten kan sælges.** Et råd kan ikke',
  'patenteres. For „gå en time til fods hver dag" findes der ingen',
  'beskyttelse, ingen pris, ingen margin og intet salg. Vi kan ikke',
  'bruge det til noget — ikke fordi vi mener, det er forkert, men',
  'fordi hele vores apparat ikke er indrettet på det.',
  '',
  '**Dette tredje punkt er den vigtigste sætning på denne indlægsseddel:',
  'Vi har ikke valgt pillen, fordi den altid er det bedste, men fordi',
  'den er det, vi kan — og det, der kan betale sig. Begge dele er',
  'tilfældet, og man kan ikke forstå det ene uden det andet.**',
  '',
  'Hvad der følger deraf, ser man i hverdagen: Til en udførlig',
  'rådgivning om kost og livsstil er der i konsultationsværelset',
  'hverken tid eller honorar afsat; til en recept er der begge dele.',
  'Vi har ikke opfundet dette system — men vi passer glimrende ind i',
  'det.',
  '',
  '## 8. Behandlingens varighed: forretningen med det igen og igen',
  '',
  '**Hvorfor midler, man tager hele tiden?** Også her to svar, der',
  'begge er sande, og det andet siger vi nødigt.',
  '',
  '**Det første: Fordi kroniske sygdomme er kroniske.** Den, der har',
  'type 1-diabetes, har brug for insulin, hver dag, hele livet, og der',
  'er intet anstødeligt ved det. Den, der har mistet en',
  'skjoldbruskkirtel, har brug for hormonet. For højt blodtryk',
  'helbredes ikke, det sænkes; sætter man midlet ud, stiger trykket',
  'igen. Det er ikke en opfindelse af salgsafdelingen, det er sagens',
  'natur.',
  '',
  '**Det andet: Fordi et middel, der tages i tredive år, også betales',
  'i tredive år.** Et antibiotikum tages i ti dage og er så færdigt.',
  'En blodtrykssænkende medicin tages til døden. Regn selv efter,',
  'hvilket af de to der er mere værd for en virksomhed.',
  '',
  'Deraf er der blevet en tænkemåde, som der findes et eget udtryk',
  'for: **blockbusteren** — en medicin med en omsætning på over en',
  'milliard dollar om året. Tallene er offentlige, de står i vores',
  'årsberetninger. En kolesterolsænkende medicin nåede mellem 1996 og',
  '2011 op på over 125 milliarder dollar. Et gigtmiddel har siden 2003',
  'indbragt over 200 milliarder dollar, i topår over tyve milliarder',
  'på et enkelt år. **Det er midler til mennesker, der tager dem i',
  'årtier.**',
  '',
  'Og her hører den tese, som dette kapitel skal prøve, åbent på',
  'bordet — ikke som en beskyldning udefra, men som et fund indefra:',
  '**Ja, varig medicin og vaccinationer er ud over deres virkning en',
  'meget profitabel forretning.** Ved vaccinerne var det længe',
  'anderledes: I 1970\'erne og 1980\'erne steg producenter ud, fordi',
  'marginerne var små og ansvarsrisikoen stor — i Amerikas Forenede',
  'Stater forblev der tidvis kun en enkelt producent tilbage for en',
  'børnevaccine, og staten måtte i 1986 oprette en erstatningsfond,',
  'for at der overhovedet blev produceret videre. I dag er det omvendt:',
  'Vaccinemarkedet er fra nogle få milliarder omkring år 2000 vokset',
  'til det mangedobbelte, og en enkelt corona-vaccine indbragte i 2022',
  'omkring otteogtredive milliarder dollar på et år — den højeste',
  'årsomsætning, nogen medicin nogensinde har haft. Kapitel 17 vil',
  'tage sig af det.',
  '',
  '**Profitten beviser ikke, at midlet er dårligt.** Insulinen er en',
  'forretning og redder liv; begge dele på én gang. Men profitten',
  'afgør, hvilke spørgsmål der overhovedet stilles. Og dertil lægger',
  'jeg to bevisstykker fra vores egen balance, der er mere ubehagelige',
  'end enhver bebrejdelse udefra:',
  '',
  '**For det første antibiotika.** De er det mest virksomme, vi',
  'nogensinde har bygget, og økonomisk en katastrofe: kort indtaget,',
  'billige, og et nyt reservelægemiddel skal efter alle fagfolks vilje',
  'helst bruges **sjældent**. Et produkt, hvis sagssvarende anvendelse',
  'består i at lade det blive i skabet, lader sig ikke finansiere.',
  'Derfor har store koncerner indstillet antibiotikaforskningen; små',
  'firmaer, der alligevel udviklede et, gik efter godkendelsen i',
  'betalingsstandsning. **Og samtidig døde der i 2019 efter det hidtil',
  'største skøn omkring 1,27 millioner mennesker umiddelbart af',
  'resistente bakterier.** Markedet har her ikke svigtet, fordi nogen',
  'var ond. Det svigtede, fordi det gjorde præcis det, det er bygget',
  'til.',
  '',
  '**For det andet hepatitis C.** I 2013 kom et middel på markedet,',
  'der helbreder denne leverbetændelse på tolv uger hos over halvfems',
  'procent af de behandlede — endeligt. Prisen i Amerikas Forenede',
  'Stater: omkring 84.000 dollar for kuren, tusind dollar pr. tablet.',
  'Opråbet var enormt. Og så skete det lærerige: Omsætningen brød',
  'sammen, fordi de helbredte ikke var kunder mere. **Et helbredende',
  'middel forbruger sit eget marked.** I vores regning er helbredelse',
  'den dårligste forretningsmodel, der findes.',
  '',
  'Den sætning bør man ikke overse, og jeg skriver den her selv ned,',
  'for at den anden stemme ikke skal fremføre den som en afsløring.',
  '',
  '## 9. Vekselvirkninger: markedsføringen og den grænse, den overskred',
  '',
  'En indlægsseddel fører op, hvad der sker, når to midler mødes. Hos',
  'os er den farligste vekselvirkning den mellem forskning og salg.',
  '',
  'Først størrelsesordenen. For det amerikanske marked, hvor der',
  'findes de bedste tal, er den medicinske markedsføring — reklame hos',
  'læger, reklame hos publikum, efteruddannelse, besøg af',
  'repræsentanter — mellem 1997 og 2016 vokset fra omkring 18 til',
  'omkring 30 milliarder dollar om året. Direkte reklame for',
  'receptpligtige midler hos patienten er på verdensplan **kun tilladt',
  'i to lande**: i Amerikas Forenede Stater og i New Zealand. I vores',
  'årsberetninger står posten for salg og administration regelmæssigt',
  'højere end den for forskning — den indeholder mere end bare',
  'reklame, men størrelsesordenen stemmer.',
  '',
  'Og så tilfældene, hvor grænsen blev overskredet. Alle fire er',
  'retligt kendte eller kan læses efter i fagtidsskrifter; intet af',
  'det er rygter.',
  '',
  '**Et smertemiddel mod artrose**, bragt på markedet i 1999, blev',
  'trukket tilbage i 2004, efter at en egen undersøgelse viste flere',
  'hjerteinfarkter og slagtilfælde. En analytiker ved den amerikanske',
  'lægemiddelmyndighed skønnede antallet af de ekstra alvorlige',
  'hjertehændelser i USA til **88.000 til 139.000**. Producenten',
  'betalte i 2007 omkring 4,85 milliarder dollar i et forlig.',
  '',
  '**Et stærkt opioid**, indført i 1996, blev markedsført med påstanden',
  'om, at afhængighedsrisikoen hos smertepatienter var meget lav —',
  'støttet på et tyndt datagrundlag. Producenten erkendte sig i 2007',
  'skyldig i vildledende mærkning og betalte 600 millioner dollar, i',
  '2020 en anden gang i milliardstørrelse. I Amerikas Forenede Stater',
  'døde der mellem 1999 og 2019 mere end en halv million mennesker af',
  'opioid-overdoser. **Det er den største dokumenterede skade,',
  'markedsføring har forårsaget i medicinhistorien.**',
  '',
  '**En undersøgelse af et antidepressivt middel hos unge** blev i',
  '2001 offentliggjort som „virksomt og veltolereret". Da uafhængige',
  'forskere i 2015 vurderede rådataene på ny, holdt hverken det ene',
  'eller det andet stik. I 2012 betalte koncernen i en sag, der blandt',
  'andet angik denne markedsføring, tre milliarder dollar.',
  '',
  '**Et influenzamiddel**, lagret af regeringer for milliarder: I',
  'årevis udgav producenten ikke de fuldstændige',
  'undersøgelsesrapporter. Først efter lang offentlig strid blev de',
  'tilgængelige; den nye vurdering faldt markant mere nøgternt ud end',
  'reklamen. Ud af denne strid er nutidens transparensregler opstået.',
  '',
  'Dermed er jeg ved den tese, der skal prøves i dette kapitel: **Den,',
  'der forsker kritisk, mister midlerne.** I den hårdhed er det en',
  'påstand, man må bevise — og det vil den anden stemme gøre udførligt.',
  'Jeg siger her kun, hvad der fra vores side er ubestrideligt:',
  '',
  '**For det første:** Undersøgelser, der er betalt af industrien,',
  'kommer oftere frem til et resultat, der er gunstigt for',
  'opdragsgiveren, end uafhængigt finansierede. Det er ingen formodning;',
  'det er fundet igen og igen i systematiske oversigtsarbejder.',
  '',
  '**For det andet:** Negative resultater blev længe offentliggjort',
  'sjældnere end positive. En gennemgang af alle undersøgelser af',
  'antidepressiva, der er registreret hos den amerikanske myndighed,',
  'viste: I fagtidsskrifterne så det ud, som om næsten alle',
  'undersøgelser havde vist en gavn — i godkendelsesakterne var det',
  'omkring halvdelen.',
  '',
  '**For det tredje:** Der findes enkelte, veldokumenterede tilfælde,',
  'hvor forskere blev sat under pres, fordi deres resultater var',
  'ubehagelige — en læge i Toronto, der i 1990\'erne advarede mod',
  'risiciene ved et middel og modtog juridiske trusler; en',
  'videnskabskvinde i San Francisco, hvis undersøgelse af et',
  'skjoldbruskkirtelmiddel i årevis ikke måtte udkomme, fordi',
  'finansieringsgiveren forbød det.',
  '',
  '**For det fjerde:** Modmidlerne mod alt dette — obligatoriske',
  'undersøgelsesregistre, offentliggørelsen af interessekonflikter,',
  'adgangen til rådata — er alle sammen kæmpet frem udefra: af',
  'fagtidsskrifter, af myndigheder, af lægegrupper, af journalister.',
  '**Ikke en eneste af disse regler er opstået af vores indsigt.** Det',
  'er den ærligste sætning i denne rubrik.',
  '',
  '## 10. Bivirkninger: den ærlige balance på vores side',
  '',
  'Nu rubrikken, som ingen læser, og som afgør alt. Hvad har vores',
  'arbejde udrettet — og hvad har det anrettet?',
  '',
  '**Hvad der holder.**',
  '',
  '**Infektionerne.** Før sulfonamiderne og penicillinen var et',
  'inficeret sår, en lungebetændelse, en barselsfeber et hasardspil',
  'med døden. I dag er det for det meste en uge med tabletter. I',
  'industrilandene er spædbørnsdødeligheden faldet til en brøkdel —',
  'hygiejnen og kosten har den større, vi den mindre, men ægte andel.',
  '',
  '**Hiv.** Det er vores klareste præstation, og den er først fyrre år',
  'gammel. I 1981 en sygdom uden navn, i 1980\'erne en sikker dødsdom.',
  'I 1987 det første middel, der knap hjalp og blev tolereret dårligt.',
  '**I 1996 kombinationsbehandlingen: tre aktive stoffer samtidig, så',
  'virussen ikke kan undvige** — og inden for to år brød dødeligheden',
  'sammen i de behandlede lande. I dag er det for mange en tablet om',
  'dagen, med en forventet levetid tæt på en ikke-smittets; den, der',
  'behandles med succes, er ikke længere smitsom. På verdensplan',
  'bliver omkring tredive millioner mennesker behandlet.',
  '',
  'Og i samme åndedrag den ubehagelige halvdel: **Det var ikke os, der',
  'satte tempoet op.** Det var de syge — aktivister, der besatte',
  'godkendelsesmyndighederne og forstyrrede konferencer, indtil',
  'procedurerne blev fremskyndet og de ramte blev lukket ind ved',
  'rådgivningsbordet. Og det tog yderligere år og en verdensomspændende',
  'strid om patenter, før midlerne nåede frem til Afrika: Årsprisen',
  'faldt først fra over ti tusind dollar til under hundrede, efter at',
  'indiske generikaproducenter brød priserne, og efter at en klage fra',
  'koncerner mod Sydafrika i 2001 blev trukket tilbage under offentligt',
  'pres.',
  '',
  '**Kræften, i dele.** Ved akut leukæmi hos børn er en næsten altid',
  'dødelig sygdom blevet en, som omkring ni ud af ti børn overlever.',
  'Ved en bestemt leukæmi hos voksne steg femårsoverlevelsen efter',
  '2001 med et målrettet udtænkt middel fra omkring tredive til',
  'omkring halvfems procent — den magiske kugle, som Ehrlich havde',
  'ment den. Ved nogle former for modermærkekræft når immunterapien i',
  'dag langtidsoverlevelse, hvor der tidligere kun var måneder tilbage.',
  '',
  '**Hvor grænserne ligger.**',
  '',
  'Og nu samme rubrik fra den anden side, i samme rækkefølge.',
  '',
  '**Ved kræft i det hele taget er balancen langt magerere, end vores',
  'pressemeddelelser lyder.** Ved de store solide tumorer —',
  'bugspytkirtel, fremskreden lungekræft, hjernetumorer — måler vi',
  'fremskridtet i uger og måneder. En gennemgang af alle',
  'kræftgodkendelser fra den europæiske myndighed fra årene 2009 til',
  '2013 fandt, at omkring halvdelen på godkendelsestidspunktet ikke',
  'viste nogen bevist fordel ved overlevelse eller livskvalitet. Vi',
  'godkender på surrogatmål — tumoren bliver mindre, tiden til',
  'fremgang bliver længere — og håber, at der bliver liv ud af det.',
  'Nogle gange gør der det. Ofte ikke.',
  '',
  '**Ved de kroniske sygdomme forvalter vi mere, end vi helbreder.**',
  'Jeg siger det så tydeligt, fordi det er kernen i denne bogs',
  'balance. Vi sænker blodtrykket, blodsukkeret, kolesterolet — og det',
  'redder beviseligt liv, det er ingen bagatel. Men sygdommen selv',
  'bliver. Ved type 2-diabetes har netop en undersøgelse uden vores',
  'deltagelse vist, at et tydeligt vægttab hos næsten halvdelen af',
  'deltagerne førte til tilbagegang efter et år — altså til det, vi',
  'ikke når med nogen tablet. **Den undersøgelse har ingen koncern',
  'betalt, og ingen ville have betalt den.** Kapitel 18 vil handle om',
  'det.',
  '',
  '**Alzheimers demens** er vores tydeligste fiasko. På tyve år er',
  'godt over hundrede kandidater til aktive stoffer fejlet i store',
  'undersøgelser. De nyeste antistoffer sænker nedbrydningen målbart,',
  'men lidt, og de medfører risikoen for hævelser i hjernen og',
  'blødninger. Vi ved den dag i dag ikke med sikkerhed, hvad der',
  'driver denne sygdom.',
  '',
  '**Bakteriernes modstandsdygtighed.** Fleming advarede i 1945. Vi har',
  'alligevel givet antibiotika i dyrefoderet og ordineret dem mod',
  'forkølelse, og så har vi indstillet forskningen, fordi den ikke',
  'kunne betale sig. Det er innovationscyklussen i ren form: **først',
  'velsignelsen, så skaden, som velsignelsen selv har skabt.**',
  '',
  '**Markedet i stedet for nøden.** Mellem 1975 og 1999 kom næsten',
  'fjorten hundrede nye aktive stoffer på markedet; efter en meget',
  'citeret gennemgang var omkring **seksten** af dem rettet mod',
  'tropesygdomme, som hundreder af millioner mennesker lider af.',
  'Grunden er ingen ondskab, men vores regning: Hvor der ikke er',
  'købekraft, er der intet marked, og hvor der ikke er et marked, er',
  'der hos os intet projekt. Der findes modeksempler fra vores egne',
  'rækker — en koncern har siden 1987 udleveret et middel mod',
  'flodblindhed gratis, milliarder af gange, indtil sygdommen er',
  'forsvundet i flere lande. Sådanne beslutninger er mulige. De er',
  'bare ikke reglen, fordi vores regning ikke forudsiger dem.',
  '',
  '**Og prisen på insulinen.** Et stof, hvis patent i 1923 blev givet',
  'væk for en dollar, for at ingen skulle tjene på det, kostede i',
  'Amerikas Forenede Stater hundrede år senere så meget, at mennesker',
  'rationerede deres dosis og døde af det. Først offentligt pres og en',
  'lov har loftsbegrænset priserne der. **Hvis ét eneste eksempel',
  'viser, hvad vores tænkemåde kan stille an med en gave, så er det',
  'dette.**',
  '',
  'Der bliver sætningen tilbage, hvormed forfatteren af denne bog',
  'opsummerer den moderne medicins balance — og jeg kan ikke modsige',
  'ham: **Den moderne medicin er fremragende i diagnostikken og svag i',
  'behandlingen af de kroniske sygdomme.** Kapitel 14 har vist, hvor',
  'godt vi kan se. Vi genkender en tumor på få millimeter, vi måler',
  'dusinvis af værdier ud af en bloddråbe, vi afbilder det bankende',
  'hjerte i lag. **Vi ser i dag mere, end vi kan behandle** — og',
  'afstanden mellem at se og at kunne er dette kapitels egentlige åbne',
  'sår.',
  '',
  '## 11. Kontraindikationer: hvor vores tænkemåde ikke må anvendes',
  '',
  'En kontraindikation siger, hvornår et middel ikke må gives. Her er',
  'vores — de steder, hvor vores tænkemåde ikke kun støder på grænser,',
  'men skader.',
  '',
  '**For det første: Når det, der hjælper, ikke lader sig gribe i',
  'milligram.** Bevægelse, søvn, kost, arbejdsforhold, ensomhed — det',
  'er for vores metode ingen størrelser, men forstyrrende faktorer,',
  'man regner ud. I vores undersøgelser hedder de confoundere. I livet',
  'hedder de årsager.',
  '',
  '**For det andet: Når vi holder måleværdien for målet.** Vi sænker',
  'en værdi, fordi den hænger sammen med en sygdom — og antager, at',
  'det går mennesket dermed bedre. Det er nogle gange sandt og nogle',
  'gange dødeligt forkert. Den klareste lære stammer fra 1980\'erne:',
  'Midler, der pålideligt undertrykte hjertebanken efter et infarkt,',
  'blev brugt i bredt omfang, fordi hjertebanken var et advarselstegn.',
  'Den store undersøgelse, der endelig efterprøvede det, måtte',
  'afbrydes — **de behandlede døde hyppigere end de ubehandlede.**',
  'Værdien var bedre. Menneskene var døde.',
  '',
  '**For det tredje: Når der af en risiko bliver gjort en sygdom.** Vi',
  'har en håndgribelig interesse i, at grænseværdierne falder: Enhver',
  'sænket grænseværdi forvandler millioner af raske til',
  'behandlingsbare. Det er ikke automatisk forkert — nogle sænkninger',
  'var medicinsk rigtige og har reddet liv. Men spørgsmålet om, hvem',
  'der sidder i de organer, der fastlægger sådanne værdier, er',
  'berettiget, og svaret er ofte utilfredsstillende: En betydelig del',
  'af forfatterne bag kliniske retningslinjer har økonomiske',
  'forbindelser til producenter. Det er offentliggjort og undersøgt.',
  '',
  '**For det fjerde: Når mange behandles, for at én profiterer.** I',
  'forebyggelsen er det reglen, ikke undtagelsen: Af hundrede',
  'mennesker, der i årevis tager et middel, undgår en enkelt derved et',
  'hjerteinfarkt — de andre nioghalvfems har kun omkostningerne og',
  'bivirkningerne. For den enkelte er denne regning afgørende, og den',
  'står i ingen reklame. **Den står ikke engang på vores',
  'indlægsseddel.**',
  '',
  '**For det femte: Når vi lader, som om vores tænkemåde er den',
  'eneste.** Den er mægtig, den er efterprøvbar, den har reddet',
  'millioner af liv. Men den ser kun det, den kan måle. Et menneske,',
  'hvis gener kommer fra sit liv, optræder i vores data som',
  'behandlingssvigt.',
  '',
  '## Advarsel: hvad der ikke står på nogen pakke',
  '',
  'En indlægsseddel har en egenskab, man må se den på: **Den er skrevet',
  'af producenten og godkendt af en myndighed.** Den indeholder, hvad',
  'der skal siges. Den indeholder ikke, hvad den syge tænker om det,',
  'og den indeholder ikke de spørgsmål, producenten hellere vil lade',
  'være med at stille.',
  '',
  '**Hvad der forbliver åbent**, er derfor ikke lidt. Her står ikke,',
  'hvordan det føles at have brug for et middel, man ikke kan betale.',
  'Her står ikke, hvad det gør ved en læge, når en venlig repræsentant',
  'kommer forbi hvert kvartal, og den syge kun har ti minutter. Her',
  'står ikke, hvorfor de tre ting, der hjælper mest ved kroniske',
  'sygdomme — bevægelse, god mad, et liv med mindre pres — ikke har',
  'nogen, der reklamerer for dem.',
  '',
  '**Dette kapitels anden stemme tilhører kritikken** — de syge, de',
  'uafhængige forskere, lægerne, der ikke er enige. **Den vil slå den',
  'anden indlægsseddel op: de samme rubrikker, den samme pakke, læst',
  'fra den anden side.** Den vil tale om finansinteresserne og om',
  'forretningen med sygdommen; om studiefinansieringen og om, hvad der',
  'sker med dem, der forsker kritisk; om de resultater, der aldrig er',
  'udkommet, og om interessekonflikterne i de organer, der fastlægger,',
  'hvad der gælder som sygdom. Og den vil stille det spørgsmål, vi',
  'ikke kan besvare, fordi en producent vanskeligt kan betvivle, at',
  'hans produkt er nødvendigt: **Hvor meget sundhed ville der være at',
  'få, hvis de samme penge ikke gik til molekyler, men til levevilkår?**',
  '',
  'Vores svar på dette kapitel står i to sætninger, og begge er sande.',
  '',
  'Den første: **Uden os ville du med stor sandsynlighed ikke være',
  'blevet så gammel, som du bliver.** Insulinen, antibiotika, midlerne',
  'mod hiv, de kræftterapier, der fortjener navnet — de er ikke faldet',
  'ned fra himlen. De er blevet fremstillet, af mennesker, der fik løn',
  'for det.',
  '',
  'Den anden: **Vi har i denne tid gjort alt det, man har betalt os',
  'for, og lidt af det, man ikke har betalt os for.** Hvor begge dele',
  'faldt sammen, er der opstået storhed. Hvor de faldt fra hinanden,',
  'blev nøden liggende — og nogle gange er der opstået skade, som vi',
  'har indrømmet for sent.',
  '',
  'Der bliver det spørgsmål tilbage, som dette kapitel lader stå',
  'åbent, og som du må besvare, ikke vi: **Kan et middel, der redder',
  'liv, og en forretning, der tjener på sygdommen, være det samme — og',
  'hvem sørger for, at det første ikke bliver ofret for det andet?**',
  '',
  'Læs sedlen til ende. Der står mere på den, end man tror.',
].join('\n');

/**
 * Kritikken — den samme indlægsseddel, læst fra den anden side.
 * Finansinteresserne, de forsvundne undersøgelser, forfatterens tese:
 * den, der forsker kritisk, mister midlerne. Og den ærlige balance:
 * stærk i diagnostikken, svag ved de kroniske sygdomme.
 *
 * Skrevet af DeepSeek (runde 15, anden gennemgang). Også denne stemme
 * nævner selv sin egen sides ubehagelige pletter (tillægsregel for
 * følsomme emner) — og holder sig til reglen om ingen rygter: kun
 * dokumenteret, intet opfundet.
 */
const stimmeDerKritik = [
  '## Den samme indlægsseddel, læst fra den anden side',
  '',
  'Industrien har fremlagt sin indlægsseddel — fuldstændig, ærlig,',
  'med Contergan og heroin og forretningen med det igen og igen. Det',
  'er mere, end hendes laug for det meste indrømmer, og vi regner',
  'hende det til gode. Nu slår vi den samme pakke op og læser den fra',
  'den anden side: ikke sådan, som producenten beskriver den, men',
  'sådan, som den syge oplever den — og sådan, som forskeren oplever',
  'den, der ikke er enig.',
  '',
  '## Brugsanvisning: hvad producenten ikke skriver',
  '',
  'En indlægsseddel forklarer, hvad et middel anvendes til. Den',
  'forklarer ikke, hvorfor medicinen er fordelt, som den er fordelt.',
  'Denne stemme siger det lige ud: Medicinalindustrien er en',
  'forretning, og forretningen har brug for sygdommen. Ikke sundheden',
  '— sygdommen. Vaccinationer og varig medicin er ud over deres',
  'faktiske virkning en meget profitabel forretning: Jo flere',
  'mennesker der dagligt har brug for et middel, desto mere stabil',
  'omsætning; jo flere vaccinerede, desto større marked. Det er ingen',
  'konspiration — det er logikken i en industri, der skal tjene sine',
  'aktionærer. Men det er den logik, der ikke står på nogen pakke. En',
  'virksomhed, der lever af sygdommen, har en interesse i, at',
  'sygdommen bliver — og at det enkle svar ikke bliver hørt:',
  'forebyggelsen, som ingen behøver at købe.',
  '',
  '## Sammensætning: hvad der virkelig er i prisen',
  '',
  'Industrien siger, at priserne er høje, fordi forskningen koster så',
  'meget. En del af det er sandt. Den anden del står i hendes egne',
  'balancer: De store koncerner bruger ofte flere penge på',
  'markedsføring og salg end på forskning. Repræsentanterne, der',
  'besøger praksisserne, annoncerne, kongresserne, gaverne — det er',
  'ingen forskningspris, det er salgsprisen. Og forskningen selv er',
  'ikke fri: Den retter sig efter markedet. En medicin mod en sygdom,',
  'der kun rammer fattige, bliver ikke udviklet, fordi den ikke kan',
  'betale sig; et middel, der skaber millioner af faste kunder, bliver',
  'udviklet, fordi det kan betale sig. Prisens sammensætning indeholder',
  'altså også svaret på spørgsmålet om, hvorfor verden har så mange',
  'midler mod kolesterol og så få mod forsømte tropesygdomme.',
  '',
  '## Vekselvirkninger: de forsvundne undersøgelser',
  '',
  'Og nu punktet, hvor forretningen bliver til et problem: de',
  'undersøgelser, der ikke udkommer. Det er dokumenteret, at en stor',
  'del af de kliniske undersøgelser, industrien finansierer, aldrig',
  'bliver offentliggjort — først og fremmest dem med negativt',
  'resultat. Den, der kun ser de positive undersøgelser, ser en',
  'verden, hvor midlerne virker bedre, end de gør. Forskeren Nancy',
  'Olivieri opdagede, at et af industrien støttet middel havde farlige',
  'bivirkninger — og blev bekæmpet af sit eget hospital, som var',
  'sponsoreret af industrien. Forskeren Peter Dong blev fyret, efter',
  'at han havde betvivlet et middels virkning. Disse tilfælde er',
  'dokumenterede — og de er beviset på det, forfatteren af denne bog',
  'har formuleret: Den, der forsker kritisk, får hurtigt de',
  'økonomiske midler skåret fra. Ikke altid med forsæt, ikke altid med',
  'ond hånd — men altid med samme resultat: Kritikken er dyrere end',
  'tilslutningen.',
  '',
  '## Lægemiddelform: hvorfor pillen og ikke rådet',
  '',
  'Industrien har spurgt, hvorfor der af en sygdom bliver en tablet og',
  'ikke et råd. Denne stemmes svar: Fordi tabletten kan sælges, og',
  'rådet ikke kan. En tablet kan man patentere, fremstille,',
  'markedsføre og ordinere. Et råd — spis bedre, bevæg dig, skaf dig',
  'et liv med mindre pres — er gratis, og ingen tjener på det. De',
  'kliniske retningslinjer, efter hvilke læger beslutter, er skrevet',
  'af fagfolk, der ofte modtager honorarer fra industrien;',
  'interessekonflikterne er dokumenterede, og offentliggørelsen er',
  'ung. Systemet er ikke ondt — det er skævt: Det belønner pillen og',
  'straffer rådet. Og den, der alligevel giver rådet, får hverken',
  'forskning, retningslinje eller honorar for det.',
  '',
  '## Behandlingens varighed: forretningen med det igen og igen',
  '',
  'Industrien har selv navngivet forretningen med det igen og igen:',
  'den varige medicin. Denne stemme føjer det spørgsmål til, der ikke',
  'står på nogen pakke: Helbredes der her — eller forvaltes der? For',
  'højt blodtryk, kolesterolværdien, diabetes: De holdes i skak med',
  'daglige midler, ofte hele livet. Medicinen er god — og',
  'livsstilsændringen, som ofte kan nå samme værdi uden pille, bliver',
  'ikke ordineret, fordi ingen kan ordinere den. Den balance,',
  'forfatteren af denne bog har opstillet, stemmer: Diagnostikken er',
  'stærk — billeddiagnostikken, laboratorierne, den tidlige erkendelse',
  'er medicinens mirakler. Behandlingen af de kroniske sygdomme er',
  'svag — fordi det enkle svar (bevægelse, kost, fællesskab, mindre',
  'stress) ikke har nogen lobby, ingen pris, ingen fabrik.',
  '',
  '## Kontraindikationer: den simple medicin',
  '',
  'Og dermed er denne indlægsseddels kontraindikation navngivet: den',
  'simple medicin, som denne bog til sidst vil handle om. De tre ting,',
  'der hjælper mest ved kroniske sygdomme, har ingen reklame, ingen',
  'repræsentanter, ingen kongresser: bevægelse, god mad, et liv med',
  'mindre pres. De virker — og de er ubehagelige, fordi de skal gøres',
  'af hver enkelt selv, og fordi ingen tjener på dem. Industrien kan',
  'ikke gøre for det; samfundet, der overlader alt til markedet, kan.',
  'Den, der ordinerer den simple medicin, ordinerer noget, der ikke',
  'kan købes.',
  '',
  '## Svar til industrien',
  '',
  'Industrien har fremlagt sin pakke og navngivet sine ærlige pletter.',
  'Denne stemme svarer: Resultaterne er ægte — medicinen, der redder',
  'liv, hiv-vendepunktet, insulinen, vaccinerne. Ingen her vil',
  'afskaffe industrien; den, der ville det, måtte også afskaffe',
  'redningen. Men regningen skal være fuldstændig: Forretningen har',
  'brug for sygdommen, forskningen følger markedet, de forsvundne',
  'undersøgelser fordrejer viden, og den simple medicin har ingen',
  'lobby. Det spørgsmål, denne indlægsseddel efterlader, er hele',
  'bogens spørgsmål: Hvem tjener medicinen — den syge eller markedet?',
  'Og hvem bestemmer, hvad der betales: behovet eller profitten?',
  'Syntesen må føre denne regning — med begge sider.',
].join('\n');

/**
 * Kapitel 16 — „Den moderne medicinalindustri".
 *
 * Runde 15 anlægger modulet med den første synsvinkel (industrien
 * indefra, som sin egen indlægsseddel). Den anden stemme (kritikken) og
 * den endelige syntese tilføjer Hermes i anden gennemgang.
 */
const pharmaindustrie = {
  id: 'pharmaindustrie',
  titel: 'Den moderne medicinalindustri',
  epoche: '1900-tallet til i dag',

  aufhaenger: {
    frage: 'Hvad koster et liv — og hvem bestemmer prisen?',
    text: [
      'Et barn med diabetes døde i 1920 med temmelig stor sikkerhed,',
      'som regel inden for et år. To år senere fandtes insulinen, og',
      'opdagerne solgte patentet for en enkelt dollar, for at ingen',
      'skulle tjene på et livreddende stof. Hundrede år senere',
      'rationerede mennesker i Amerikas Forenede Stater det samme',
      'middel, fordi de ikke kunne betale det. Begge dele er historien',
      'om den samme industri.',
      '',
      'Medicinalindustrien er en af verdens største forretninger —',
      'omkring halvanden billion dollar i omsætning om året. Og den er',
      'et af de største mirakler: Den har gjort en ende på sygdomme,',
      'der for hundrede år siden var dødsdomme. Begge dele gælder',
      'samtidig, og deri ligger vanskeligheden ved dette kapitel.',
      '',
      'Det spørger, hvordan der af et apotek i Darmstadt og to',
      'farvefabrikker ved Wupper og Main blev et system, der redder liv',
      'og tjener penge — ofte i samme åndedrag. Hvorfor en ny medicin',
      'koster ti til femten år og milliarder. Hvorfor det næsten altid',
      'er en tablet og næsten aldrig et råd. Hvorfor de midler, man',
      'tager i årtier, er den bedste forretning — og et middel, der',
      'helbreder, den dårligste. Og hvorfor balancen falder så ulige',
      'ud: stærk i diagnostikken, svag ved de kroniske sygdomme.',
      '',
      'Imellem ligger de mørke pletter, der hører til denne historie',
      'ligesom de lyse: heroinen, der i treogtyve år blev solgt som',
      'hostemiddel, og Contergan-katastrofen, som reglerne er skrevet',
      'på, der beskytter os i dag.',
    ].join('\n'),
  },

  // Kortet ligger i utils/themen/karten/pharmaindustrie.js — her er kun
  // dets tekster oversat (faser, punkter, bevægelser), ikke selve kortet.
  karteHinweise: [
    {
      label: '1668–1896: fra apoteket og farvefabrikken bliver der en industri',
      hinweis:
        'I begyndelsen står ingen koncern, men et apotek. I 1668 overtager ' +
        'Friedrich Jacob Merck Engel-apoteket i Darmstadt; i 1827 begynder ' +
        'Emanuel Merck at fremstille rene alkaloider — morfin, kodein, ' +
        'senere kokain — ikke længere kun til sin egen disk, men til handel. ' +
        'Det er fødselsstunden for det aktive stof som vare. Den anden rod ' +
        'er farven: I 1851 grundlægger Ernst Schering i Berlin det Grønne ' +
        'Apotek, i 1863 opstår samme år farvefabrikken Friedr. Bayer et ' +
        'comp. i Barmen-Elberfeld ved Wupper og farveværkerne Meister ' +
        'Lucius & Brüning i Frankfurt-Höchst. I Basel vokser Ciba, Geigy ' +
        'og Sandoz ud af silke-farverierne. Den, der kan koge farvestoffer, ' +
        'kan også koge lægemiddelstoffer — det er den indsigt, hvoraf der ' +
        'blev en verdensindustri.',
    },
    {
      label: '1897–1937: tiden uden afprøvning — aspirin, heroin, mirakelmidler',
      hinweis:
        'I laboratoriet i Elberfeld fremstiller Felix Hoffmann den 10. ' +
        'august 1897 acetylsalicylsyre og elleve dage senere, den 21. ' +
        'august 1897, diacetylmorfin. Begge stoffer bliver afprøvet, begge ' +
        'fundet gode, begge markedsført: det ene fra 1899 som aspirin, det ' +
        'andet fra 1898 som „Heroin" — et hostemiddel, der udtrykkeligt ' +
        'bliver markedsført som ikke vanedannende og eksporteret til mere ' +
        'end tyve lande. På samme tid er kokain et fejret mirakelmiddel, og ' +
        'beroligende safter med morfin gives til spædbørn. Ingen behøver at ' +
        'bevise, at et middel virker eller er uskadeligt. Først katastrofer ' +
        'tvinger regler frem: I 1906 kræver Amerikas Forenede Stater ' +
        'angivelsen af indholdsstofferne, i 1938 efter en sirup med ' +
        'frostvæske og 105 døde beviset for uskadelighed.',
    },
    {
      label: '1909–1945: vendepunktet — salvarsan, insulin, sulfonamider, penicillin',
      hinweis:
        'Paul Ehrlich og Sahachiro Hata finder i 1909 i substansen med ' +
        'nummer 606 et middel mod syfilis; farveværkerne i Höchst udgiver ' +
        'den i 1910 som salvarsan — det første lægemiddel, der er udtænkt ' +
        'målrettet mod et smittestof. I 1921/22 vinder forskere i Toronto ' +
        'insulinen og sælger patentet for en symbolsk dollar; fra 1923 ' +
        'fremstiller Eli Lilly i Indianapolis den og på licens ' +
        'farveværkerne i Höchst. I 1932 finder Gerhard Domagk i Elberfeld ' +
        'med prontosilen det første sulfonamid; i 1939 får han Nobelprisen, ' +
        'som han må afvise under pres fra regimet. 1941 til 1945 gør ' +
        'amerikanske fabrikker penicillinen til et masseprodukt. Af handlen ' +
        'med stoffer er der blevet en industri, der forsker.',
    },
    {
      label: '1957–1961: Contergan — katastrofen, der tvang godkendelsen igennem',
      hinweis:
        'Den 1. oktober 1957 bringer Chemie Grünenthal i Stolberg ved ' +
        'Aachen sove- og beroligelsesmidlet Contergan med det aktive stof ' +
        'thalidomid receptfrit på markedet, markedsført som særligt ' +
        'veltolereret, også for gravide. Fra 1959 hober fødsler med svære ' +
        'misdannelser på lemmerne sig op. Børnelægen Widukind Lenz fra ' +
        'Hamborg meddeler producenten sin mistanke den 15. november 1961; ' +
        'australieren William McBride kommer uafhængigt til samme resultat. ' +
        'Den 26. november 1961 bliver midlet taget af markedet. Skøn går ud ' +
        'fra 5.000 til 10.000 skadede børn på verdensplan. I Amerikas ' +
        'Forenede Stater havde prøveren Frances Oldham Kelsey nægtet ' +
        'godkendelsen. Følgen er de lægemiddellove, der gælder i dag.',
    },
    {
      label: '1990 til i dag: verdenskoncerner, blockbustere og varig medicin',
      hinweis:
        'Af værkerne ved Rhinen bliver dele af verdenskoncerner: I 1996 ' +
        'slår Ciba-Geigy og Sandoz i Basel sig sammen til Novartis, Höchsts ' +
        'lægemiddeldivision går over Hoechst Marion Roussel og Aventis op ' +
        'i Sanofi, Schering bliver i 2006 overtaget af Bayer. ' +
        'Verdensmarkedet for lægemidler ligger i dag på omkring halvanden ' +
        'billion dollar om året. Forretningen flytter sig til midler, der ' +
        'tages permanent: mod for højt blodtryk, høje kolesterolværdier, ' +
        'diabetes, gigt. Historiens omsætningsstærkeste medicin, et ' +
        'gigtmiddel, har siden 2003 indbragt over 200 milliarder dollar. ' +
        'Samtidig trækker store producenter sig ud af ' +
        'antibiotikaforskningen, fordi korte behandlinger ikke kan betale ' +
        'sig.',
    },
    {
      label: 'Wuppertal-Elberfeld',
      hinweis:
        'Stedet, hvor begge sider af dette kapitel opstod ved ét enkelt ' +
        'laboratoriebord. I 1863 grundlægges ved Wupper en farvefabrik; ud ' +
        'af dens kemiske afdeling bliver lægemiddelforskningen. Den 10. ' +
        'august 1897 fremstiller Felix Hoffmann her acetylsalicylsyre — ' +
        'solgt som aspirin fra 1899, den dag i dag et af verdens mest ' +
        'brugte midler. Elleve dage senere, den 21. august 1897, fremstiller ' +
        'han diacetylmorfin: fra 1898 markedsført som „Heroin", som ' +
        'hostemiddel, udtrykkeligt markedsført som ikke vanedannende og ' +
        'eksporteret til over tyve lande. I 1932 finder Gerhard Domagk her ' +
        'prontosilen, det første sulfonamid. Velsignelse og skade fra samme ' +
        'hus.',
    },
    {
      label: 'Frankfurt-Höchst',
      hinweis:
        'Farveværkerne ved Main, grundlagt i 1863 — her bliver ideen om ' +
        'den „magiske kugle" til et produkt. Paul Ehrlich havde observeret, ' +
        'at farvestoffer kun farver bestemte væv, og havde sluttet deraf, ' +
        'at der må lade sig bygge et stof, der kun rammer smittestoffet. I ' +
        '1909 finder hans medarbejder Sahachiro Hata blandt hundreder af ' +
        'arsenforbindelser nummer 606; i 1910 kommer den på markedet som ' +
        'salvarsan mod syfilis — det første målrettet udtænkte lægemiddel ' +
        'mod et smittestof, virksomt og ikke uden svære bivirkninger. Her ' +
        'blev i 1894 også Emil von Behrings difteriserum fremstillet og fra ' +
        '1923 insulin på licens. I dag hører lægemiddelforretningen til ' +
        'Sanofi.',
    },
    {
      label: 'Darmstadt',
      hinweis:
        'Det ældste sted i denne historie. I 1668 overtager Friedrich ' +
        'Jacob Merck Engel-apoteket; den virksomhed, der blev af det, ' +
        'gælder for verdens ældste kemi- og lægemiddelvirksomhed. Det ' +
        'afgørende skridt kommer i 1827: Emanuel Merck fremstiller rene ' +
        'alkaloider ikke længere kun til sin egen offizin, men til handel ' +
        '— morfin, kodein, kinin, senere kokain, i jævn kvalitet og i ' +
        'mængder. Fra da af er det aktive stof et produkt med etiket, pris ' +
        'og mærke. Det er den stille vending: Ikke apotekeren blander til ' +
        'den enkelte syge, men en fabrik fremstiller til et marked.',
    },
    {
      label: 'Stolberg ved Aachen',
      hinweis:
        'Stedet for katastrofen, som nutidens lægemiddelafprøvning er ' +
        'skrevet på. Den 1. oktober 1957 udgiver Chemie Grünenthal her ' +
        'Contergan, et receptfrit sove- og beroligelsesmiddel med det ' +
        'aktive stof thalidomid, markedsført som særligt veltolereret og ' +
        'også egnet til gravide. Fra 1959 bliver der født børn med svære ' +
        'misdannelser på arme og ben. Børnelægen Widukind Lenz fra Hamborg ' +
        'melder sin mistanke den 15. november 1961; den 26. november 1961 ' +
        'bliver midlet trukket tilbage. Skøn taler om 5.000 til 10.000 ' +
        'skadede børn på verdensplan, heraf omkring 2.800 overlevende i ' +
        'Tyskland. Sagen mod de ansvarlige blev i 1970 indstillet mod et ' +
        'forligsbeløb.',
    },
    {
      label: 'Basel',
      hinweis:
        'Stedet med verdens højeste tæthed af lægemiddelforskning — og ' +
        'også det begynder med farve. Ud af silke-farverierne ved ' +
        'Rhinknæet bliver Ciba, Geigy og Sandoz; i 1896 grundlægger Fritz ' +
        'Hoffmann-La Roche sin virksomhed, der tidligt satser på ' +
        'standardiserede færdigpræparater. I 1996 slår Ciba-Geigy og Sandoz ' +
        'sig sammen til Novartis. Herfra kommer vitaminer, psykofarmaka, ' +
        'immunhæmmere — og i 2001 med imatinib et af de mest imponerende ' +
        'kræftmidler overhovedet: Ved en bestemt leukæmi steg ' +
        'femårsoverlevelsen fra omkring tredive til omkring halvfems ' +
        'procent. Det samme middel står også for den anden side: Dets pris ' +
        'steg inden for femten år til det mangedobbelte.',
    },
    {
      label: 'Berlin',
      hinweis:
        'Den tredje rod: hormonerne. I 1851 åbner Ernst Schering det ' +
        'Grønne Apotek i Chausseestraße; i 1871 bliver deraf et ' +
        'aktieselskab, der senere bliver til hormonproducenten — i 1961 ' +
        'kommer her med Anovlar den første i Europa udviklede p-pille på ' +
        'markedet, et middel, som raske kvinder tager i årevis. I 2006 ' +
        'bliver Schering overtaget af Bayer. I samme by sidder ' +
        'modspillerne: Robert Koch-Instituttet, Fællesudvalget, der ' +
        'beslutter om refusion, og forbundene, der forhandler om priser. ' +
        'Hvor der laves medicin, strides der også om den.',
    },
    {
      label: 'Heroinens vej ud i verden',
      hinweis:
        'Fra 1898 bliver diacetylmorfin under handelsnavnet „Heroin" fra ' +
        'Elberfeld eksporteret til mere end tyve lande — som hostemiddel, ' +
        'som erstatning for morfin og udtrykkeligt markedsført som ikke ' +
        'vanedannende. Over Rotterdam og Antwerpen går det til verdens ' +
        'havne. Først da afhængigheden ikke længere kan overses, vælter ' +
        'vurderingen: I 1913 ender fremstillingen, i 1924 forbyder ' +
        'Amerikas Forenede Stater midlet, i 1931 bliver det stærkt ' +
        'begrænset i Tyskland. Det nye skadede, før det var afprøvet — i ' +
        'treogtyve år.',
    },
    {
      label: 'Insulinen kommer over Atlanten',
      hinweis:
        'Sommeren 1921 vinder Frederick Banting og Charles Best i Toronto ' +
        'et udtræk fra bugspytkirtlen; i januar 1922 overlever den ' +
        'trettenårige Leonard Thompson. Opdagerne overlader patentet til ' +
        'universitetet for en symbolsk dollar — ingen skulle tjene på et ' +
        'livreddende stof. Til fremstillingen behøves der alligevel en ' +
        'fabrik: Eli Lilly i Indianapolis leverer fra 1923 i store mængder, ' +
        'i Europa optager farveværkerne i Höchst licensproduktionen. Af en ' +
        'dødsdom bliver en behandling — som man har brug for hele livet.',
    },
    {
      label: 'Børnelægens advarsel',
      hinweis:
        'I efteråret 1961 tæller børnelægen Widukind Lenz fra Hamborg ' +
        'tilfældene med misdannelser i sin konsultation, spørger mødrene ' +
        'om de indtagne midler og finder et mønster. Den 15. november 1961 ' +
        'meddeler han producenten i Stolberg sin mistanke; den 18. november ' +
        'fremlægger han den offentligt. Den 26. november 1961 bliver ' +
        'Contergan taget af markedet. Advarslen løb ikke fra forskningen ' +
        'til den syge, men fra sygesengen tilbage til fabrikken — sådan er ' +
        'lægemiddelsikkerheden opstået.',
    },
  ],

  perspektiven: [
    {
      id: 'industrie',
      name: 'Industriens stemme',
      stimme: 'Opus',
      text: stimmeDerIndustrie,
    },
    {
      id: 'kritik',
      name: 'Kritikkens stemme',
      stimme: 'DeepSeek',
      text: stimmeDerKritik,
    },
  ],

  synthese: [
    '## Hvor begge sedler mødes',
    '',
    'Først det fælles — og det er større, end overskrifterne på begge',
    'sider lader formode. Industrien og kritikken nævner de samme',
    'kendsgerninger: resultaterne (insulin, antibiotika,',
    'hiv-vendepunktet, vaccinerne — redningen af millioner),',
    'katastroferne (tiden uden afprøvning, Contergan — reglerne, der',
    'opstod deraf), forretningen med det igen og igen (den varige',
    'medicin), markedsføringen, der overskred grænsen, og den magre',
    'balance ved de kroniske sygdomme. Den ene stemme kalder det den',
    'ærlige selvprøvelse, den anden den halverede regning — men begge',
    'står foran de samme tal. Og begge ved: Medicinen er ikke',
    'problemet. Forretningen er ikke problemet. Spørgsmålet er, hvem',
    'systemet tjener, når begge dele kommer sammen.',
    '',
    '## Hvor de går fra hinanden',
    '',
    'Modsigelsen begynder ved fortolkningen af forretningen. Industrien',
    'siger: Prisen er forskningsprisen — uden profit ingen udvikling,',
    'uden udvikling ingen redning. Kritikken siger: Prisen er også',
    'markedets pris — forskningen følger profitten, markedsføringen',
    'overgår forskningen, de forsvundne undersøgelser fordrejer viden,',
    'og den, der forsker kritisk, mister midlerne. Industrien ser i den',
    'syge kunden, der bliver forsynet; kritikken ser kunden, der bliver',
    'brugt, for at forretningen kan køre. De strides ikke om enkelte',
    'lægemidler — de er gode —, men om spørgsmålet, om et system, der',
    'lever af sygdommen, virkelig vil sundheden. Og de strides om den',
    'simple medicin: Industrien siger, den er den enkeltes sag;',
    'kritikken siger, den er den sandhed, der ikke har nogen lobby.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'For femtende gang det samme mønster — og nu bliver det til en',
    'prøvesten: Tænkemåden bestemmer metoden. Pillens tænkemåde —',
    'sygdommen som kemisk problem, tabletten som svar — har forvandlet',
    'medicinen og reddet millioner. Men den har også gjort grænsen for',
    'denne tænkemåde synlig: Den ser molekylet, ikke mennesket; den',
    'helbreder symptomet, ikke livet; den forvalter den kroniske sygdom',
    'i stedet for at forebygge den. Denne bogs innovationscyklus gælder',
    'også her: Det nye skadede først (kokain, heroin, Contergan), før',
    'det blev til velsignelse — og den afprøvning, der reddede det, kom',
    'først efter katastrofen.',
    '',
    'Og dette kapitel stiller det spørgsmål, der fører mod bogens',
    'slutning: Hvem tjener medicinen — den syge eller markedet? Svaret',
    'ligger ikke i at afskaffe industrien, men i erindringen om, hvad',
    'medicin er: en tjeneste for mennesket, der ikke behøver at kunne',
    'betale sig. De næste kapitler vil vise, hvad der sker, når denne',
    'tjeneste bliver til forretning — og hvad der sker, når mennesker',
    'sætter sig imod: vaccinedebatten, naturmedicinen, den simple',
    'medicin. Og til sidst spørgsmålet, om et fællesskab er muligt',
    'mellem pillen og rådet, mellem markedet og mennesket.',
  ].join('\n'),

  urteil: {
    frage:
      'Hvad er dig mere værd — en medicin, der redder dit liv, eller ' +
      'et system, du kan gennemskue? Og må begge dele koste det samme?',
    hinweis: [
      'Der er her ikke noget rigtigt og forkert. Tag dig af de to',
      'halvdele af dette kapitel. Den ene: Uden denne industri ville der',
      'ikke findes insulin, ingen antibiotika, ingen hiv-behandling — og',
      'millioner af mennesker ville ikke være blevet så gamle, som de er',
      'blevet. Den anden: Et erhverv, der tjener på en sygdoms varighed,',
      'har ingen interesse i dens ende, og et helbredende middel',
      'forbruger sit eget marked. Spørg dig selv om tre ting. For det',
      'første: Hvem skal betale de ti til femten års forskning, hvis',
      'ikke den senere pris — staten, sygekassen, en fond, alle sammen?',
      'For det andet: Hvem skal beslutte, hvad der forskes i, hvis ikke',
      'markedet — og hvem beslutter så? For det tredje: Hvad ændrer sig',
      'i dit svar, når det drejer sig om et middel, du selv har brug',
      'for? Præcis mellem disse spørgsmål ligger den strid, der i',
      'hundrede år ikke er afgjort.',
    ].join(' '),
  },

  quiz: [
    {
      frage:
        'Er det rigtigt, at „Heroin" engang var et ganske almindeligt ' +
        'sælgeligt hostemiddel?',
      antworten: [
        'Nej, det var forbudt fra begyndelsen.',
        'Ja — det blev fra 1898 markedsført som hostemiddel og ' +
          'udtrykkeligt annonceret som ikke vanedannende.',
        'Ja, men kun i Amerika og kun for voksne.',
      ],
      richtig: 1,
      erklaerung:
        'Den 10. august 1897 fremstillede Felix Hoffmann i Elberfeld ' +
        'acetylsalicylsyre (solgt som aspirin fra 1899) og elleve dage ' +
        'senere diacetylmorfin. Fra 1898 kom det under navnet „Heroin" på ' +
        'markedet, som hostemiddel og som angiveligt ubekymrende erstatning ' +
        'for morfin, og blev eksporteret til over tyve lande. I 1913 endte ' +
        'fremstillingen, i 1924 forbød USA det, i 1931 blev det stærkt ' +
        'begrænset i Tyskland — der fandtes dengang ingen ' +
        'godkendelsesafprøvning.',
    },
    {
      frage:
        'Hvad ændrede Contergan-katastrofen fra 1957 til 1961 ved ' +
        'lægemiddelafprøvningen?',
      antworten: [
        'Intet — reglerne bestod allerede før.',
        'Kun reklamen for sovemidler blev forbudt.',
        'Først derefter blev beviset for virkning og uskadelighed og den ' +
          'statslige godkendelse en pligt.',
      ],
      richtig: 2,
      erklaerung:
        'Contergan kom den 1. oktober 1957 receptfrit på markedet, ' +
        'annonceret som særligt veltolereret også for gravide. Efter ' +
        'advarslen fra børnelægen Widukind Lenz fra Hamborg blev det ' +
        'trukket tilbage den 26. november 1961; skøn taler om 5.000 til ' +
        '10.000 skadede børn på verdensplan. I 1962 krævede USA for første ' +
        'gang et virkningsbevis i kontrollerede undersøgelser; i Tyskland ' +
        'bragte først lægemiddelloven fra 1976 (i kraft 1978) den ægte ' +
        'godkendelse. I USA havde prøveren Frances Oldham Kelsey nægtet ' +
        'godkendelsen.',
    },
    {
      frage:
        'Hvor lang tid tager det i dag i gennemsnit, før der af et aktivt ' +
        'stof bliver et godkendt lægemiddel?',
      antworten: [
        'Ti til femten år — og omkring ni ud af ti kandidater fejler ' +
          'undervejs.',
        'Et til to år.',
        'Omkring tredive år.',
      ],
      richtig: 0,
      erklaerung:
        'På søgningen blandt titusindvis af substanser følger den ' +
        'prækliniske afprøvning og tre undersøgelsesfaser på mennesker: ' +
        'fase I (tolerance, for det meste raske), fase II (Virker det ' +
        'overhovedet?) og fase III (Er det bedre end det kendte?). Af de ' +
        'aktive stoffer, der når frem til den første afprøvning på ' +
        'mennesker, bliver omkring hver tiende godkendt — de fleste fejler ' +
        'sent, når pengene allerede er brugt. Det er industriens ' +
        'begrundelse for de høje priser; om udviklingsomkostningernes ' +
        'højde strides der.',
    },
    {
      frage:
        'Hvad skete der i 1996 i behandlingen af hiv?',
      antworten: [
        'En vaccine blev godkendt.',
        'Kombinationsbehandlingen med flere aktive stoffer slog igennem ' +
          'og gjorde af en dødsdom en behandlingsbar sygdom.',
        'Sygdommen blev erklæret udryddet.',
      ],
      richtig: 1,
      erklaerung:
        'Flere aktive stoffer samtidig giver virussen næsten ingen ' +
        'mulighed for at undvige. Dødeligheden brød i de behandlede lande ' +
        'sammen inden for to år; i dag er ofte en tablet om dagen nok, den ' +
        'forventede levetid ligger tæt på en ikke-smittets, og den, der ' +
        'behandles med succes, er ikke længere smitsom. En vaccine findes ' +
        'den dag i dag ikke. Indtil midlerne nåede frem til fattigere ' +
        'lande, gik der yderligere år og en strid om patenter og priser.',
    },
    {
      frage:
        'For hvor meget solgte opdagerne i 1923 patentet på insulinen?',
      antworten: [
        'For en million dollar.',
        'De ansøgte slet ikke om patent.',
        'For en symbolsk dollar, for at ingen skulle tjene på stoffet.',
      ],
      richtig: 2,
      erklaerung:
        'Frederick Banting, Charles Best og James Collip overlod patentet ' +
        'til University of Toronto for en dollar hver — et livreddende ' +
        'stof skulle ikke tilhøre nogen. Fremstillet blev det alligevel af ' +
        'virksomheder: fra 1923 af Eli Lilly i Indianapolis, i Europa ' +
        'blandt andet på licens af farveværkerne i Höchst. Hundrede år ' +
        'senere var prisen i Amerikas Forenede Stater så høj, at mennesker ' +
        'rationerede deres dosis; først offentligt pres og en lov lagde et ' +
        'loft på den.',
    },
  ],
};

module.exports = pharmaindustrie;
