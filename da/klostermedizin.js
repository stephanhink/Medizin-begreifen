// Kapitel 6 — „Klostermedicinen".
//
// Stationen, hvor Europa selv begynder at hele igen — med det, det har:
// en have, et skriverum og en forskrift, der stiller sygeplejen over alt
// andet. Mellem Benedikt (omkring 529) og Hildegard af Bingen (1098–1179)
// ligger seks hundrede år, hvor klostrene er Vestens hospitaler, apoteker
// og biblioteker.
//
// TÆNKEMÅDE-analysen er kernen (operatørens krav). Her spørger den:
// Hvorfor helbredte de overhovedet — og med hvilken begrundelse? Hvorfor
// var haven apoteket? Hvorfor skrev de af, hvad de ikke forstod? Hvorfor
// hørte bøn og plante sammen? Og præcis hvor nåede denne tænkemåde sin
// grænse: dér, hvor troen erstattede diagnosen, og hvor kirkens autoritet
// stod over tvivlen. Stemmen siger det selv (tillægsregel for følsomme
// emner i CLAUDE.md).
//
// LÆNGDEREGEL (operatørens feedback 24.08.2026): Kapitel 1–8 forbliver
// korte og tætte — hver synsvinkel højst ~250 linjer, kapitlet i alt
// højst ~600 linjer. Den første stemme her har omkring 235 linjer; resten
// giver Hermes plads til den anden stemme og den endelige syntese. Linje-
// antallet måles i tests/karte-klostermedizin.mjs.
//
// Stemmer (runde 7): Den FØRSTE synsvinkel — klostret indefra — skrev
// Opus. Den ANDEN (markedspladsen: badere, sårlæger, jordemødre og
// urtekvinder, som ingen fik skrevet ned) og den endelige syntese
// tilføjede Hermes i anden omgang. Synsvinkel-workflow: CLAUDE.md.
//
// INGEN GENTAGELSER (operatørens beslutning 21.08.2026): Kapitel 1
// inddeler efter „Hvem der taler her → …", kapitel 2 begynder med en
// scene, kapitel 3 fortæller et døgnforløb, kapitel 4 er en brevveksling,
// kapitel 5 en bogs rejse. Dette kapitel vælger den sjette dramaturgi:
// en RUNDGANG gennem klostret. Hvert afsnit er et sted bag muren — port,
// urtegård, skriptorium, sygestue, Rupertsberg, kapitelsal — og det
// sidste fører til selve muren, hvor den anden stemme venter. Markeds-
// pladsen ligger udenfor; samme dramaturgi bærer den videre.
//
// Kortet ligger i utils/themen/karten/klostermedizin.js (geometri i
// stedet for fortælling). Her er kun fasehenvisningerne oversat som
// karteHinweise — ikke selve kortet.
//
// Teksterne ligger som linje-arrayer med `.join('\n')` — så forbliver de
// læsbare i repoet ved ~72 tegn (operatøren læser dem her imod), og
// utils/markdown.js gør dem i appen til flydende tekst igen.
//
// CommonJS uden UI-imports (arkitekturregel): kan tjekkes med blank `node`.

/**
 * Klostrets stemme — en rundgang gennem seks steder bag muren.
 *
 * Skrevet af Opus (runde 7). Den fortæller indefra: hvorfor der blev
 * helbredt, hvorfor gartneret, hvorfor skrevet af, hvorfor bedt — og hvor
 * denne tænkemåde nåede sin grænse. De ubehagelige pletter nævner den
 * selv i stedet for at overlade dem til modstemmen.
 */
const stimmeDesKlosters = [
  '## Ved porten: hvem vi lukker ind, og hvorfor',
  '',
  'Du står foran porten. Først et ord om den stemme, der fører dig:',
  'Vi er klostret — den broder, der plejer de syge, den der graver i',
  'haven, den der sidder i skriverummet. Ofte er det én og samme mand.',
  '',
  'Og så det andet med det samme: **Det, du hører her, er vores syn på',
  'os selv — en tænkemåde, ikke en sandhed.** Uden for denne mur bliver',
  'den samme historie fortalt anderledes. Vi vender tilbage til den til',
  'sidst.',
  '',
  'Porten står åben, og det er ikke venlighed, men',
  'forskrift. I den regel, som Benedikt skrev omkring 529 på bjerget',
  'Montecassino, står der: Alle gæster skal modtages som Kristus.',
  'Og i kapitel 36: **Frem for alt og over alt skal man sørge for de',
  'syge; man skal tjene dem, som var det Kristus selv.**',
  '',
  'Læs sætningen to gange, for den begrunder alt det følgende. Den siger',
  'ikke: Plej de syge, så de kan arbejde igen. Den siger: **I den syge',
  'møder du din herre.** Dermed er plejen ikke et biarbejde, der',
  'udgår, når høsten haster, men gudstjeneste som korbønnen.',
  'Det er næstekærligheden, caritas — hos os ikke en følelse, men',
  'en orden med ansvar og fast tid.',
  '',
  'Af denne sætning blev Europas første ordnede sygevæsen til:',
  'et eget hus for de syge, en broder med ansvaret, et eget',
  'køkken, hvor kød er tilladt — kød, som er forbudt for os andre. Den,',
  'der kommer ind, bliver ikke spurgt, om han kan betale — i en tid,',
  'hvor ingen andre spørger, hvor den feberramte ligger i nat.',
  '',
  '## I urtegården: skabelsens apotek',
  '',
  'Gå videre, til venstre ligger bedene. Fire skridt brede, indfattet med',
  'buksbom, hvert bed én plante: salvie, rude, bynke, fennikel,',
  'løvstikke, kransemynte, mynte, kommen, opiumsvalmue. Den byggeplan, de',
  'gemmer i St. Gallen, tegner omkring 820 seksten skiltede bede',
  'ved siden af lægens hus. På Reichenau har abbed Walahfrid Strabo',
  'omkring 840 sat sin egen have på vers — fireogtyve planter,',
  'og han begynder med brændenælderne, der stak ham i hænderne.',
  '',
  '**Hvorfor en have og ikke et lager af købte midler?** Fordi skabelsen',
  'selv er apoteket for os. I Jesu Siraks bog står den sætning, vi',
  'støtter os på: Herren lader lægemidlet vokse frem af jorden, og',
  'en fornuftig mand foragter det ikke. **Når Gud har bragt verden i',
  'orden, har han også sørget for noget mod sygdommene — man skal bare',
  'kende det og dyrke det.** Ingen urt er der tilfældigt. Den er ment.',
  '',
  'Det lyder fromt, men har en meget praktisk følge: Den, der tænker',
  'sådan, samler, planter og skriver ned. Karl den Store påbød det',
  'omkring 795 — i anvisningen for hans godser står plante for plante,',
  'hvad der skal dyrkes alle vegne. Af et trosudsagn bliver en liste, af',
  'listen et lager.',
  '',
  '**Og hvor vidste vi, hvilken urt der hørte til hvad?** Fra to kilder,',
  'som vi aldrig helt adskilte. Den ene er de gamles bøger: Der står',
  'læren om de fire safter og de fire egenskaber — varm, kold,',
  'fugtig, tør. Den, der har en kold, fugtig sygdom, har brug for en',
  'varm, tør urt. **En regel, man kan handle efter, også',
  'selv om man intet ved om den syge.** Den anden kilde er erfaringen:',
  'År efter år har vi de samme mennesker foran os.',
  '',
  'Hvad af det der virkede, siger vi ærligt til dig i begge retninger.',
  'Opiumsvalmuen tog smerten og gjorde afhængig — vi så det og',
  'kunne ikke sætte ord på det. Fennikel og mynte hjalp maven, bynken',
  'fulgte fødsler. Meget andet var svagt, og vi havde intet mål',
  'for dets styrke: **Den samme plante, høstet i maj eller i august, er',
  'ikke det samme lægemiddel.** Og ja — urter var også en vare, og et',
  'rigt kloster blev rigere.',
  '',
  '## I skriptoriet: hvorfor vi skrev af, hvad vi ikke forstod',
  '',
  'Nu det kolde rum med de høje vinduer. Her sidder de halvdelen',
  'af dagen, og i margenotaterne står, hvad de mener om det: Tre fingre',
  'skriver, hele kroppen lider. Pergamentet til en stor bog',
  'koster en fårehjord.',
  '',
  '**Hvorfor gør vi det?** Først for Guds ord — det er skriverummets',
  'opgave. Men lige efter for de gamle. Cassiodorus, en',
  'romersk embedsmand, der omkring 550 oprettede et kloster i Calabrien,',
  'skrev i regelbogen til sine munke: Er græsk',
  'lukket for jer, så læs i det mindste Dioskurides om urterne, derefter',
  'Hippokrates og Galen — og skriv dem af.',
  '',
  '**Det er kernen i vores tænkemåde om viden: At bevare er en',
  'virksomhed.** En bog, som ingen skriver af, dør; pergamentet',
  'forfalder, bliver skrabet af og skrevet på igen. Vi kopierede ikke,',
  'fordi vi forstod bøgerne, men fordi vi anede, at nogen en dag',
  'vil forstå dem. Det er ingen ære — det er et væddemål på',
  'fremtiden, og det er gået op.',
  '',
  'I Fulda, Lorsch, Corbie og St. Gallen er tekster på den måde sluppet',
  'igennem, som ellers ikke ville findes nogen steder mere. Og i',
  'begyndelsen af den ældste bevarede lægebog i Tyskland, fra Lorsch',
  'omkring 795, står noget, du ikke venter: et langt forsvar for',
  'lægekunsten. For indvendingen fandtes, og den kom fra egne rækker:',
  '**Den, der tager medicin, mangler tillid til Guds forsyn.**',
  '',
  'Det svar, der står der, er vores: Gud har selv ladet urterne',
  'vokse; lægens kunst er en gave fra Gud; og at nægte den',
  'syge den jordiske hjælp er ikke fromhed, men',
  'hårdhed. **Først denne sætning tillader os medicinen overhovedet** —',
  'og at den måtte skrives ned særskilt, siger dig, hvor alvorligt',
  'indvendingen blev taget.',
  '',
  'Den ubehagelige side af samme arbejde: Vi har skrevet af, ikke',
  'prøvet. Et fejllæst plantenavn gør en opskrift til en anden,',
  'og vi kunne ikke opdage fejlen. Vi har givet Galen videre med alle',
  'hans fejl, fordi det gamle for os ikke var et forslag,',
  'men autoritet. **Den, der bevarer, bevarer alt — sandheden og',
  'fejlen i samme bind.**',
  '',
  '## I sygestuen: hvorfor bøn og plante hører sammen',
  '',
  'Rummet er varmt, det er det første. En seng, et tæppe, en',
  'skål, nogen der ser til. I Cluny står der ned til mindste detalje',
  'skrevet, hvornår den syge vaskes, fodres og besøges, og hvordan en',
  'døende ledsages. **Det er vores stærkeste lægemiddel, og vi',
  'brugte lang tid på at opdage det: varme, mad, ro og et',
  'menneske, der bliver.**',
  '',
  'Ved siden af står bønnen, og her må du tage vores tænkemåde præcist,',
  'ellers forstår du den forkert. Vi beder ikke i stedet for at behandle.',
  'Vi beder, **fordi krop og sjæl for os ikke er to ting.** En',
  'sygdom er for os aldrig kun en forstyrrelse i kroppen; den står også',
  'mellem mennesket og Gud. Den, der kun behandler kroppen, lader',
  'halvdelen ude — sådan så vi det. Derfor hører urten og',
  'bønnen til samme behandling, og derfor er sygestuen bygget ved siden',
  'af kirken.',
  '',
  'Dertil kommer åreladningen, fire eller fem gange om året, efter',
  'kalender og månestand, med hviledage bagefter. Vi anså den for',
  'rensning; den skadede og gavnede ingen — samme regnskab som den varme',
  'seng.',
  '',
  'Og nu grænsen, og vi siger den selv, så ingen andre',
  'behøver at sige den. **Når sygdom også kan være Guds prøve eller',
  'straf, så får den syge oven i smerten endnu en skyld',
  'med.** Vi har trøstet mennesker ved at forklare dem, hvad deres',
  'lidelse var god for — og dermed holdt vi nogle gange op med at søge',
  'efter, hvad der egentlig var galt. **Troen har hos os ofte erstattet',
  'diagnosen.**',
  '',
  'Værre er det andet: Vores forklaring passede altid. Blev den syge',
  'rask, var det nåde; døde han, var det Guds vilje. **Et svar, der',
  'passer i begge tilfælde, lærer ingen noget.** Vi har ikke',
  'talt, ikke sammenlignet, ikke prøvet, om vores middel var bedre end',
  'ingenting. I seks hundrede år stillede næsten ingen af os det',
  'spørgsmål.',
  '',
  'Og kirken selv bandt vores hænder. Dens konciler',
  'forbød fra 1130 munkene at drive medicin mod betaling uden for',
  'klostret; i 1215 blev det forbudt klerikere at skære med kniv eller',
  'brændejern. **Dermed faldt hele sårmedicinen i hænderne på mændene',
  'udenfor.** Samme år fik lægerne ordre til ved alvorligt syge først at',
  'lade præsten kalde: sjælen før kroppen, som lov. **Vores',
  'medicin stod i religionens tjeneste, ikke omvendt** — for os',
  'selvfølgeligt, for dig formentlig ikke.',
  '',
  '## På Rupertsberg: kvinden, der ikke måtte undervise',
  '',
  'Lad os forlade salen og gå til Rhinen, hvor Nahe løber ud.',
  'Her grundlægger omkring 1150 en abbedisse mod sin abbeds modstand et',
  'eget kloster: **Hildegard af Bingen**, født 1098, død 1179,',
  'givet i klostercellen som otteårig, leder som otteogtrediveårig.',
  '',
  'Hun skriver to bøger, som der egentlig ikke burde kunne findes:',
  '**„Physica"**, en naturlære om planter, træer, sten, fisk og',
  'dyr med deres brug, og **„Causae et curae"** om sygdommenes årsager',
  'og behandling. Hendes grundord er **viriditas,',
  'grønkraften** — den saftige livskraft, som bor i alt sundt og',
  'tørrer ud i den syge. At helbrede betyder for hende: at bringe det',
  'grønne i flow igen, med føde, mål, søvn, varme og urt.',
  '',
  '**Hvorfor måtte hun det?** Strengt taget måtte hun ikke. En kvinde',
  'havde ikke læreembede i kirken; man påberåbte sig apostlen, der',
  'forbyder kvinder at undervise. Hildegards vej udenom er',
  'visionen: **Det er ikke hende, der taler, men det levende lys, der',
  'taler gennem hende.** Hun kalder sig selv et fattigt, ulært',
  'kvindemenneske — og skriver samtidig til kejsere og paver. I 1147',
  'læser pave Eugen III. på synoden i Trier op af hendes optegnelser og',
  'godkender dem; fra da af er hun uangribelig.',
  '',
  '**Det er den ærligste sætning i dette afsnit: Hendes autoritet kom',
  'ikke af, at en kvinde måtte undervise, men af, at hun var en',
  'undtagelse.** Hun fandt en dør, hun åbnede ingen. De',
  'helbredersker, jordemødrene, urtekvinderne i landet havde intet lys,',
  'der talte for dem — og ingen, der skrev deres navne ned.',
  '',
  'Det, der bliver tilbage efter hende, og det, der ikke gør, hører',
  'sammen. Hendes iagttagelser er ofte forbløffende præcise; om',
  'tungsind, om kvindens krop og om lysten skriver hun så åbent som',
  'næsten ingen dengang. Men hendes helbredelsesbøger er overleveret',
  'adskilt fra visionsskrifterne, og lærde strides om, hvor meget af det',
  'der stammer fra hende selv. Og den „Hildegard-medicin", som man kan',
  'købe i dag — spelt, ædelstene, faste kure —, er for en stor del en',
  'opfindelse fra det 20. århundrede: **Sådan står den ikke i hendes',
  'bøger, og det, der står der, er ikke virkningsfuldt, fordi det er',
  'gammelt.**',
  '',
  '## I kapitelsalen: regnskabet',
  '',
  'Vi slutter, hvor vi samles hver morgen, og hvor alle højt',
  'må sige deres fejl. Så regnskabet, begge kolonner.',
  '',
  '**Det, der bliver.**',
  '',
  '- **Plejen som institution.** Et hus, hvor en fremmed uden penge',
  '  får en seng, mad og tilsyn — det fandtes ikke i Europa',
  '  før. Af klosterhospitset blev hospitalerne.',
  '- **Bevaringen.** Uden afskrifterne fra Vivarium, Fulda, Lorsch og',
  '  St. Gallen var antikkens bestand i Vesten stort set forsvundet.',
  '- **Haven.** Salvie, fennikel, kommen, baldrian, citronmelisse,',
  '  valmue — datidens bede står i uddrag den dag i dag i lægebogen.',
  '- **Ordens.** Varme, ro, regelmæssig mad, tid og omsorg',
  '  virker den dag i dag, også selv om man ikke kalder det medicin.',
  '',
  '**Det, vi må bebrejde os selv.**',
  '',
  '- **Vi har ikke prøvet.** Ingen optælling, ingen sammenligning, intet',
  '  spørgsmål om, hvorvidt det var gået anderledes uden vores middel.',
  '- **Troen erstattede ofte diagnosen,** og tolkningen af sygdommen',
  '  som straf har belastet de syge i stedet for at hjælpe dem.',
  '- **Autoriteten stod over tvivlen** — de gamles i bøgerne',
  '  og kirkens over bøgerne.',
  '- **Vi har foragtet dem udenfor.** Det, man vidste på markedet, i',
  '  badehusene og i landsbyerne, anså vi for uordentligt',
  '  og ulært. Vi skrev det ikke ned — og derfor er det',
  '  næsten helt forsvundet. At være bevarer betyder netop også: at',
  '  beslutte, hvad der ikke bevares.',
  '',
  '## Ved muren: Salerno og stemmen udefra',
  '',
  'Et sidste blik mod syd. I **Salerno**, en havneby ved',
  'Neapel, opstår fra det 10. århundrede noget, vi ikke har bygget:',
  'Europas første medicinske skole — og den står ikke bag',
  'en mur. Der blandes alt: klosterviden fra det nærliggende',
  'Montecassino, hvor købmanden Constantinus Africanus som munk',
  'oversætter arabiske bøger til latin, byens lægers viden og',
  'kvindernes erfaring, hvis skrifter om kvindesygdomme tilskrives en',
  'Trota. Derfra kommer de rimede sundhedsregler,',
  'som halv Europa lærer udenad.',
  '',
  '**Der, hvor muren var gennemtrængelig, gik det hurtigst fremad.** En',
  'ubehagelig sætning for os — og en sand.',
  '',
  'For bag denne mur har vi altid hørt larmen: baderen med',
  'sit bækken, sårlægen, der sætter knoglen på plads, jordemoderen, der',
  'bliver kaldt om natten, kvinden, der kender sine urter uden nogensinde',
  'at have set en bog. Vi kaldte dem ulærde. De har behandlet flere',
  'mennesker end os alle tilsammen.',
  '',
  'Hvad de kan, om de helbreder, og hvordan det er at have en viden, som',
  'ingen skriver ned — det kan vi ikke fortælle dig. På det svarer',
  'dette kapitels anden stemme: markedspladsen foran vores port.',
].join('\n');

/**
 * Markedspladsen — verden uden for klostermuren: badere, sårlæger,
 * jordemødre og urtekvinder. Den mundtlige viden, som ingen fik skrevet
 * ned — og som historien har overset.
 *
 * Skrevet af DeepSeek (runde 7, anden omgang). Også denne stemme nævner
 * selv de ubehagelige pletter på sin egen side (tillægsregel for
 * følsomme emner).
 */
const stimmeDesMarktplatzes = [
  '## Uden for muren',
  '',
  'Munkene fortæller om deres rundgang gennem klostret — port,',
  'have, skriverum, sygestue. Nu fortæller vi om den anden',
  'side af muren, for den medicin, der skete udenfor, var ikke',
  'mindre virkelig — den var bare ikke skrevet ned. Den, der ikke',
  'kan skrive, efterlader ingen bøger. Han efterlader hænder.',
  '',
  'Udenfor, på markedet, i byens udkant, i gaderne: Der arbejder',
  'baderne, som skærer, sætter koppe og årelader. Der',
  'retter sårlægerne knogler, syr sår og skærer sten',
  '— håndværket med det blodige arbejde, som munkene overlod til',
  'hænderne, fordi deres regel forbød dem blodet. Der sidder',
  'jordemødrene ved fødslerne, når lægerne — lærde, mænd —',
  'ikke engang må lukkes ind. Og der samler',
  'urtekvinderne, hvad skoven og hækken byder på, og ved, hvad',
  'der hjælper mod feber, mod orm, mod barselsfeber.',
  '',
  '## Håndværket: hvad hænderne kunne',
  '',
  'Deres viden var mundtlig og praktisk, fra mester til lærling,',
  'fra mor til datter — og den var ofte forbløffende god.',
  'Sårlægerne kendte sårets farer, længe før nogen talte om',
  'kim: De vidste, at et sår skal holdes åbent og',
  'må væske, at man skal trække fremmedlegemer ud og skille',
  'lemmer ad, når kødet bliver sort. Jordemødrene vidste,',
  'hvordan man vender et barn, når det ligger forkert — en viden, som',
  'universiteternes lærde medicin først nåede århundreder senere.',
  'Baderne kendte salverne, plastrene,',
  'dampomslagene; markedet var ét eneste åbent medicinskab, hvor der',
  'blev handlet, prøvet og løjet — som alle vegne, hvor mennesker',
  'driver deres forretning.',
  '',
  'Det, der kendetegnede denne verden, var dens nytteværdi: Den målte',
  'sin viden på hånden, ikke på skriften. Det, der hjalp, blev',
  'givet videre; det, der ikke hjalp, døde med den, der brugte det. Det',
  'er en grusom form for afprøvning — men det er en afprøvning.',
  '',
  '## Hvor denne stemme selv fejler',
  '',
  'Nu de ubehagelige pletter, for også markedet har sit regnskab.',
  '',
  '**For det første: Håndværket var råt.** Uden narkose, uden hygiejne,',
  'uden anatomi var det blodige arbejde et hasardspil. Nogle',
  'sårlæger var dygtige håndværkere, andre var slagtere —',
  'og patienten kunne ikke se forskellen, før det',
  'var for sent. Markedet kendte ingen afprøvning af de dygtige og',
  'ingen straf for fuskerne, bortset fra rygtet.',
  '',
  '**For det andet: Forretningen gik forud for sandheden.** På markedet',
  'blev der solgt, hvad der lod sig sælge: vidundermidler,',
  'kærlighedsdrikke, universalsalver. Den, der ikke kunne læse, kunne',
  'heller ikke kontrollere regninger — og urtekvinden, der i går endnu',
  'havde hjulpet, kunne bedrage i morgen. Charlataneri og',
  'håndværk lå tæt på hinanden, og ingen trak grænsen.',
  '',
  '**For det tredje: Forfølgelsen.** Urtekvinderne, der i landsbyen',
  'vogtede viden, blev mistænkt, så snart noget gik galt — og',
  'af mistanken blev senere hekseforfølgelsen. Jordemoderen,',
  'der svigtede ved en vanskelig fødsel, kunne ende som heks.',
  'Det er denne stemmes mørkeste side: Den mundtlige viden',
  'havde ingen beskyttelse, intet navn, intet laug — kun hænder og',
  'et rygte, der også kunne dræbe.',
  '',
  '## Svar til klostret',
  '',
  'Munken har til sidst i sin rundgang spurgt, hvad der begynder uden',
  'for muren. Denne stemmes svar: Der begynder den halvdel',
  'af medicinen, der ikke skrev bøger. Klostret bevarede',
  'skrifterne og haven; markedet bevarede hænderne og',
  'kunsten. Ingen af de to ville have bestået uden den anden — og',
  'begge har foragtet hinanden. Måske er Salerno, skolen',
  'ved kysten, hvor klosterviden og markedsviden mødtes, det',
  'punkt, hvor muren blev gennemtrængelig. Om det kunne blive en bro,',
  'må syntesen svare på.',
].join('\n');

/** Kapitel 6 i emnekortet. */
const klostermedizin = {
  id: 'klostermedizin',
  titel: 'Klostermedicinen',
  epoche: '~500–1200',

  aufhaenger: {
    frage: 'Hvem helbredte, da Europa ikke længere havde læger?',
    text: [
      'Efter Vestromerrigets undergang fandtes der i Vesten ikke længere',
      'nogen lægeskoler, ingen biblioteker, næsten ingen, der kunne læse',
      'græsk. Det, der var tilbage, var klostrene.',
      '',
      'Der skete tre ting på samme tid: Munke anlagde haver, hvor lægeurter',
      'blev plantet efter lister. De skrev i deres skriverum tekster af,',
      'som de ofte selv ikke forstod — og reddede dermed antikkens medicin.',
      'Og de plejede syge, fordi deres regel befalede dem det: For de syge',
      'skal man sørge frem for alt og over alt.',
      '',
      'Sådan blev klostrene i seks hundrede år Europas hospitaler, apoteker',
      'og biblioteker. Og i et af dem, på Rupertsberg ved Bingen, skrev',
      'omkring 1150 en kvinde to af middelalderens vigtigste lægebøger —',
      'selv om kirken forbød kvinder at undervise: Hildegard af Bingen.',
      '',
      'Dette kapitel spørger, hvorfor mennesker helbredte, som samtidig',
      'anså sygdommen for en Guds bestemmelse — og hvad denne tænkemåde',
      'har præsteret, og hvad den har kostet.',
    ].join('\n'),
  },

  // Kortet ligger i utils/themen/karten/klostermedizin.js — her er kun
  // fasehenvisningerne oversat (phasen → karteHinweise), ikke selve kortet.
  karteHinweise: [
    {
      label: '~529: Montecassino — reglen opstår',
      hinweis:
        'Benedikt af Nursia grundlægger på et bjerg mellem Rom og Neapel ' +
        'et kloster og skriver en orden for samlivet. To af dens sætninger ' +
        'bliver vigtige for medicinen: Gæster skal modtages som Kristus, og ' +
        'for de syge skal man sørge frem for alt og over alt. Samme ' +
        'århundrede lader Cassiodorus i Vivarium medicinske skrifter ' +
        'afskrive — med besked om at bevare dem, også selv om ingen længere ' +
        'forstår dem.',
    },
    {
      label: '~800: St. Gallen, Reichenau og Fulda',
      hinweis:
        'I Karl den Stores frankiske rige opstår de store klostre nord for ' +
        'Alperne. En forordning for de kongelige godser, Capitulare de ' +
        'villis, opregner omkring 795, hvilke urter der skal plantes alle ' +
        'vegne. St. Gallen-klosterplanen tegner omkring 820 en urtegård med ' +
        'seksten bede ved siden af lægens hus, og på Reichenau skriver ' +
        'abbed Walahfrid Strabo sit digt om to dusin lægeurter.',
    },
    {
      label: '~1080–1130: Cluny reformerer, Salerno underviser',
      hinweis:
        'Cluny i Burgund bliver midtpunkt i et netværk af hundredvis af ' +
        'klostre og bygger Vestens største kirke. Samtidig opstår i ' +
        'havnebyen Salerno Europas første medicinske skole — ikke bag en ' +
        'mur, men i blandingen af kloster, marked og arabiske bøger. ' +
        'Constantinus Africanus bringer dem med fra Nordafrika og ' +
        'oversætter dem som munk fra Montecassino til latin.',
    },
    {
      label: '~1150: Rupertsberg — Hildegard skriver',
      hinweis:
        'Hildegard af Bingen forlader sammen med sine søstre ' +
        'Disibodenberg og grundlægger mod sin abbeds vilje et eget kloster ' +
        'på Rupertsberg, dér hvor Nahe løber ud i Rhinen. Her opstår ' +
        '„Physica" og „Causae et curae" — en naturlære og en lægebog. ' +
        'Samtidig anlægger cistercienserne i nord nye klostre og rydder ' +
        'landet.',
    },
  ],

  perspektiven: [
    {
      id: 'kloster',
      name: 'Klostrets stemme',
      stimme: 'Opus',
      text: stimmeDesKlosters,
    },
    {
      id: 'marktplatz',
      name: 'Markedspladsens stemme',
      stimme: 'DeepSeek',
      text: stimmeDesMarktplatzes,
    },
  ],

  synthese: [
    '## Hvor de to stemmer mødes',
    '',
    'Først det fælles. Begge stemmer helbreder — bare med forskellige',
    'hænder. Klostret plejer i sygestuen, markedet behandler i',
    'gaden; begge stoler på planter, begge kender',
    'deres kunsts grænse, begge indrømmer, at de ofte nok ikke kan',
    'hjælpe. Begge bevarer viden: Klostret skriver den ned,',
    'markedet giver den videre — og begge ved, at det ene uden det',
    'andet er ufuldstændigt. Salerno, hvor skolen fra klostret',
    'og håndværket fra markedet mødtes, viser det: Den første',
    'medicinske skole i Europa opstod netop dér, hvor muren',
    'blev gennemtrængelig.',
    '',
    '## Hvor de går fra hinanden',
    '',
    'Modsætningen begynder ved spørgsmålet om, hvad der bærer viden. For',
    'klostret er det skriften og troen: Det, der er skrevet ned,',
    'overlever; det, Gud har skabt, er godt. For markedet',
    'er det hånden og erfaringen: Det, der hjælper, bliver; det, der ikke',
    'hjælper, dør. De strides ikke om enkelte midler, men',
    'om videnens form — og om foragten: Munken',
    'ser i badersvenden en fusker, baderen ser i munken en, der',
    'aldrig har set blod. Historien afgjorde striden,',
    'før den blev ført: Den har kun skrevet den side ned, der',
    'kunne skrive. Fra markedet er næsten intet overleveret — ikke',
    'fordi det intet vidste, men fordi ingen skrev det ned.',
    '',
    '## Hvad dette kapitel viser for hele bogen',
    '',
    'For syvende gang samme mønster — og nu bliver melodien',
    'tostemmig: Tænkemåden bestemmer metoden. I klostret hedder',
    'tænkemåden: helbredelse som tjeneste, viden som bevaring. På',
    'markedet hedder den: helbredelse som håndværk, viden som erfaring.',
    'To tænkemåder, der så den samme sygdom og foragtede hinanden',
    '— og begge har hjulpet mennesker.',
    '',
    'Og dette kapitel viser for første gang skriftens magt i',
    'historien: Den, der skriver, bestemmer, hvad der senere gælder som',
    'viden. Jordemødrene, baderne, urtekvinderne har i',
    'århundreder behandlet flertallet af de syge — og i',
    'historiebøgerne findes de ikke, fordi ingen fik dem',
    'skrevet ned. Det spørgsmål, der løber gennem denne bog, får her',
    'en ny skarphed: Hvem skriver medicinens historie?',
    'Dette kapitels svar: hidtil dem, der kunne skrive. Den',
    'næste stemme, der skaffer sig gehør, bliver høj og',
    'utålmodig — den kommer fra byen og hedder Paracelsus.',
  ].join('\n'),

  urteil: {
    frage:
      'Ville du helst lade dig behandle af en, der beder, ' +
      'eller af en, der har lært et håndværk — og hvad ville du ' +
      'savne ved det andet valg?',
    hinweis: [
      'Der findes her ikke noget rigtigt eller forkert. Tænk på, hvad',
      'begge dele egentlig betyder: I klostret fik du varme, mad, ro og en,',
      'der bliver — men ingen, der prøvede, om behandlingen overhovedet',
      'nytter noget. Hos håndværkeren fik du øvede hænder og erfaring —',
      'men ingen forklaring på, hvorfor det ramte dig. Tænk også på i dag:',
      'omsorg og kunnen er stadig to forskellige ting, og de færreste syge',
      'får begge dele i samme konsultation. Hvad ville være vigtigst for',
      'dig, hvis du skulle vælge?',
    ].join(' '),
  },

  quiz: [
    {
      frage: 'Hvad skulle klosterhaven bruges til?',
      antworten: [
        'Først og fremmest til blomster til at pynte kirken.',
        'Den var apoteket: lægeurter, plantet efter lister.',
        'Den tjente kun køkkenet; lægemidler blev købt.',
      ],
      richtig: 1,
      erklaerung:
        'Bag bedene stod en overbevisning: Gud har ladet lægemidlet ' +
        'vokse frem af jorden, man skal bare kende det. Karl den Store lod ' +
        'omkring 795 skrive ned, hvilke urter der skulle plantes på hans ' +
        'godser; St. Gallen-klosterplanen tegner omkring 820 seksten ' +
        'skiltede bede ved siden af lægens hus.',
    },
    {
      frage: 'Hvad gjorde munkene i skriptoriet med medicinske skrifter?',
      antworten: [
        'De skrev dem af — også dem, de ikke forstod.',
        'De brændte alt, der ikke var kristent.',
        'De oversatte dem til tysk og afprøvede dem på de syge.',
      ],
      richtig: 0,
      erklaerung:
        'Cassiodorus pålagde omkring 550 sine munke i det mindste at ' +
        'læse og kopiere Dioskurides, Hippokrates og Galen. Fordi ' +
        'pergament forfalder, overlever kun det, der bliver skrevet af. ' +
        'Prøvet blev der ikke noget: De gamles fejl blev givet videre med ' +
        'samme omhu som deres viden.',
    },
    {
      frage: 'Hvad er Hildegard af Bingens „Physica"?',
      antworten: [
        'Hendes levnedsbeskrivelse, skrevet af hendes søstre.',
        'En samling af hendes sange til gudstjenesten.',
        'En naturlære: planter, træer, sten, dyr og deres brug.',
      ],
      richtig: 2,
      erklaerung:
        'Hildegard (1098–1179) skrev på Rupertsberg ved Bingen ' +
        '„Physica" og „Causae et curae" om sygdommenes årsager og ' +
        'behandling. En kvinde måtte ikke undervise i kirken — sine bøger ' +
        'legitimerede hun som optegnelser over det, der blev vist hende i ' +
        'visioner; i 1147 godkendte pave Eugen III. dem.',
    },
    {
      frage: 'Måtte munke operere i højmiddelalderen?',
      antworten: [
        'Ja, kirurgien var udtrykkeligt deres opgave.',
        'Nej: Kirken forbød klerikere indgreb med kniv.',
        'Kun med kejserens skriftlige tilladelse.',
      ],
      richtig: 1,
      erklaerung:
        'Fra 1130 forbød konciler munkene at drive medicin mod betaling ' +
        'uden for klostret; i 1215 blev klerikere forbudt at skære og ' +
        'brænde. Sårmedicinen gik dermed over til badere og sårlæger uden ' +
        'for klostermuren — til de erhverv, som næsten ingen har skrevet ' +
        'ned.',
    },
    {
      frage: 'Hvad var det særlige ved Salerno?',
      antworten: [
        'Det var Vestens største kloster.',
        'Der blev Benedikts regel skrevet.',
        'Der opstod Europas første medicinske skole — uden for klostermurene.',
      ],
      richtig: 2,
      erklaerung:
        'I havnebyen ved Neapel mødtes fra det 10. århundrede ' +
        'klosterviden, byens læger og arabiske bøger. Constantinus ' +
        'Africanus oversatte dem som munk fra Montecassino til latin. Fra ' +
        'Salerno stammer skrifter om kvindesygdomme, som tilskrives en ' +
        'læge ved navn Trota.',
    },
  ],
};

module.exports = klostermedizin;
