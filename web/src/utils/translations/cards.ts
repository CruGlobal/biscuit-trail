import { Translations } from '../../constants';

export const TranslationCards: {
  [key in string]: {
    frontText: { [key in Translations]: { text: string; isBold?: boolean }[] };
    backText: { [key in Translations]: { top: string; steps: string; example?: string } };
  };
} = {
  card1: {
    frontText: {
      en: [
        { text: 'Sharing', isBold: false },
        { text: 'the Gospel', isBold: true },
      ],
      lt: [
        { text: 'Dalintis', isBold: false },
        { text: 'Evangelija', isBold: true },
      ],
      it: [
        { text: 'Condividere', isBold: false },
        { text: 'il Vangelo', isBold: true },
      ],
      ptPT: [
        { text: 'Partilhar', isBold: false },
        { text: 'o Evangelho', isBold: true },
      ],
    },
    backText: {
      en: {
        top:
          'We know that the gospel is powerful. Sharing the gospel message usually involves knowing how to explain it in a clear and concise way.',
        steps: `Consider having a tool (perhaps an outline or tract) that clearly outlines the gospel. Make sure you are very familiar with how to use the outline.
          \nHave a picture that you can draw (on a napkin or scrap of paper) that helps explain how someone can know Jesus personally
          \nMemorize one or two Bible verses that clearly explain how someone invites Christ into their life.
          \nNeed extra help: See the “For More Information” card for helpful tools.`,
        example:
          'Anya has had many conversations with her friend Maria over the last year about Anya’s faith. Maria’s questions were simple and usually about Anya’s choices or behavior, but recently they have become deeper. One afternoon over coffee Anya sensed God’s urging that it was time to ask Maria if she wanted to know this Jesus personally. Anya was thankful that she had practiced using a simple outline she had learned at her church and that she could use a napkin to draw a picture that was very clear to Maria. Maria wants to think about what Anya shared and talk again soon.',
      },
      lt: {
        top:
          'Mes žinome, kad Evangelijos žinia yra galinga. Kai dalinamės Evangelija, svarbu šią žinią perteikti aiškiai ir glaustai.',
        steps: `Atraskite, kaip Jums lengviausia ir natūraliausia dalintis Evangelijos žinia. Galbūt Jūs aiškiausiai Evangeliją perteikiate kalbėdamas (-a), gal piešdamas (-a) diagramą, o gal tiesiog samprotaudamas (-a).
        \nIšmokite mintinai vieną arba dvi Biblijos ištraukas, kurios paprastai paaiškina, kaip žmogus gali pakviesti Kristų į savo gyvenimą.`,
        example:
          'Julija ir Edita – buvusios bendradarbės, kurios darbo metu trumpam susitiko papietauti. Edita norėjo papasakoti Julijai, kaip pasikeitė jos gyvenimas, tapus krikščione. Bekalbėdama, ji suvokė, kad dabar yra gera proga ne tik pasakyti, ką Jėzus atliko jos gyvenime, bet ir papasakoti Julijai apie patį Jėzų ir Jo atliktą auką. Taigi ji ėmė pasakoti apie Jėzų, Jo mirtį ir prisikėlimą. ',
      },
      it: {
        top:
          'Sappiamo che il vangelo è potente. Condividere il messaggio del vangelo di solito implica saperlo spiegare in un modo chiaro e conciso.',
        steps: `Considera avere uno schema (forse un abbozzo o un libretto) che chiaramente spiega il vangelo. Utilizza un'immagine che puoi disegnare (su un tovagliolo o un pezzo di carta) che aiuti a spiegare come uno può conoscere personalmente Gesù. Memorizza uno o due versetti della bibbia che spiegano chiaramente come invitare Cristo nella propria vita. Hai bisogno di ulteriore aiuto: Consulta il bigliettino "Ulteriori informazioni" per altri strumenti utili.`,
        example: `Nell'ultimo anno Sara ha avuto tante conversazioni con la sua amica Maria in merito alla propria fede. Le domande di Maria erano semplici e solitamente basate sulle scelte o sul comportamento di Sara, ma recentemente le domande sono diventate più profonde. Un pomeriggio, mentre prendevano il caffè, Sara sentì l'esortazione da parte di Dio a chiedere a Maria se conoscesse personalmente Gesù. Sara era riconoscente di aver utilizzato ripetutamente un semplice schema appreso nella sua chiesa e quindi usò un tovagliolo per disegnare un'immagine che fosse molto chiara per Maria. Così Maria volle riflettere su ciò che Sara aveva condiviso e riparlarci a breve.`,
      },
      ptPT: {
        top:
          'Nós sabemos que o evangelho é poderoso. Partilhar o evangelho envolve saber explicá-lo de forma clara e concisa.',
        steps: `Pensa sobre ter uma ferramenta (talvez um resumo) que explique o Evangelho claramente. Pensa numa imagem que possas desenhar (num guardanapo ou pedaço de papel) que te ajude a explicar como alguém pode conhecer Jesus pessoalmente. Memoriza um ou dois versículos da Bíblia que expliquem claramente como convidar Jesus para a nossa vida. Se precisares de mais ajuda: Encontra ajudas úteis na carta "Mais Informações"`,
        example:
          'No último ano, a Ana tem tido muitas conversas com a Maria sobre a sua fé. As perguntas da Maria eram simples e, geralmente, sobre as escolhas e comportamentos da Ana. Mas, mais recentemente, as suas perguntas têm-se tornado mais profundas. Uma tarde, durante um café, a Ana sentiu Deus a dizer-lhe que estava na altura de perguntar à Maria se ela queria conhecer Jesus pessoalmente. A Ana ficou grata por ter praticado uma forma de explicar o evangelho que tinha aprendido na igreja, em que podia usar um guardanapo para fazer um desenho que era claro para a Maria. A Maria quer pensar mais sobre o que a Ana partilhou e depois voltar a falar sobre isso.',
      },
    },
  },
  card2: {
    frontText: {
      en: [
        { text: 'Making the Gospel', isBold: false },
        { text: 'Relevant', isBold: true },
        { text: 'to Work and Life', isBold: false },
      ],
      lt: [
        { text: 'Atskleisti Evangelijos', isBold: false },
        { text: 'svarbą darbe', isBold: true },
        { text: 'ir gyvenime', isBold: false },
      ],
      it: [
        { text: 'Rendere il Vangelo', isBold: false },
        { text: 'Rilevante per il', isBold: true },
        { text: 'Lavoro e la Vita', isBold: false },
      ],
      ptPT: [
        { text: 'Tornar o Evangelho', isBold: false },
        { text: 'Relevante para o', isBold: true },
        { text: 'Trabalho e para a Vida', isBold: false },
      ],
    },
    backText: {
      en: {
        top:
          'Jesus life, death and resurrection are more than just historical fact, they have relevance to every part of our lives. We can show this relevance to our non-Christian colleagues and help them to see Christ’s impact on our lives.',
        steps: `Brainstorm topics that come up often at your workplace where you could make a connection to God’s work in the world or in your life personally.
          \nThink of a recent instance when you could have related your faith to a colleagues comment but you didn’t. Instead of feeling guilt or regret use that example as a chance to think how you could respond next time.`,
        example: `Elizabeth works in a high stress environment. She and her colleagues discuss it often. Elizabeth asked the others how they deal with it. When they inquired of her she told them she turns stress over to Jesus, who says he will take it from us because he cares for us. One colleague replied that she had never thought of turning something over to God before.`,
      },
      lt: {
        top: `Jėzaus gyvenimas, mirtis ir prisikėlimas yra kur kas daugiau nei paprasti istoriniai faktai. Ši tiesa keičia kiekvieną mūsų gyvenimo sritį. Mes galime atskleisti Evangelijos svarbą mūsų netikintiems bendradarbiams ir padėti jiems pamatyti, kokią įtaką Kristus daro mūsų gyvenimams.`,
        steps: `Prisiminkite temas, kurios dažnai aptarinėjamos Jūsų darbovietėje ir kurias Jūs galėtumėte susieti su Dievo darbu pasaulyje ar Jūsų asmeniniame gyvenime.
        \nPrisiminkite pastarąjį kartą, kai atsakydamas (-a) į bendradarbio komentarą galėjote išreikšti tikėjimo svarbą aptariamu klausimu, bet to nepadarėte. Užuot apgailestavęs (-usi) ar kaltinęs (-usi) save, pasinaudokite proga apgalvoti tą įvykį ir nuspręskite, ką kitą kartą galėtumėte pasakyti kitaip.`,
        example: `Rūta darbe patiria daug streso. Ji su bendradarbiais dažnai apie tai pasikalba. Rūta paklausė, kaip jie susidoroja su įtampa. Kai kolegos uždavė tą patį klausimą jai, Rūta atsakė, kad patiki sunkumus Jėzui, kuris žada paimti juos iš mūsų, nes rūpinasi mumis. Viena bendradarbė atsakė, jog anksčiau niekada nepagalvojo, kad galima kažką patikėti Dievui.`,
      },
      it: {
        top: `La vita di Gesù, la morte e la risurrezione sono più che fatti storici, hanno importanza in ogni parte della nostra vita. Possiamo mostrare questa importanza ai nostri colleghi non cristiani e aiutarli a vedere l'impatto che Cristo ha nelle nostre vite.`,
        steps: `Pensa agli argomenti spontanei che spesso si presentano al tuo posto lavoro con cui puoi creare una connessione con l'opera di Dio nel mondo e nella tua vita personale.
        \nPensa a un caso recente in cui avresti potuto collegare la tua fede con un commento dei tuoi colleghi ma non l'hai fatto. Invece di provare sensi di colpa o rimpianti usa quell'esempio come un'opportunità per pensare a come potresti rispondere la prossima volta.`,
        example: `Alessandra lavora in un ambiente stressante. Lei e i suoi colleghi ne discutono spesso. Alessandra ha chiesto ai suoi colleghi come si comportano in questo ambiente e quando hanno chiesto a lei, lei ha risposto che affida lo stress a Gesù il quale se ne farà carico perché ci tiene a noi. Un collega ha risposto che non aveva mai pensato ad affidare qualcosa a Dio prima.`,
      },
      ptPT: {
        top: `A vida, morte e ressurreição de Jesus são mais do que factos históricos. Elas são relevantes para todas as áreas da nossa vida. Nós podemos mostrar esta relevância aos nossos colegas não cristãos e ajudá-los a ver o impacto de Cristo nas nossas vidas.`,
        steps: `Pensa em assuntos de conversa que surgem no teu local de trabalho e como podes conectá-los ao que Deus está a fazer no mundo ou na tua vida.
        \nPensa numa situação recente em que poderias ter relacionado a tua fé com um comentário que um colega fez, mas não o fizeste. Em vez de sentires culpa ou ressentimento, usa esse exemplo como uma oportunidade para pensar como podes responder da próxima vez.`,
        example: `A Elizabete trabalha num ambiente com um alto nível de stress. Ela e os seus colegas discutem frequentemente. A Elizabete perguntou aos outros como é que eles lidam com isso. Quando eles lhe perguntaram o mesmo, ela disse que entrega o stress a Jesus, o qual tira o nosso stress porque se preocupa connosco. Uma colega comentou que nunca tinha pensado em entregar algo a Deus.`,
      },
    },
  },
  card3: {
    frontText: {
      en: [
        { text: 'Inviting Them into', isBold: false },
        { text: 'Christian Community', isBold: true },
      ],
      lt: [
        { text: 'Pakviesti juos', isBold: false },
        { text: 'į krikščionių bendruomenę', isBold: true },
      ],
      it: [
        { text: 'Invitali in una', isBold: false },
        { text: 'Comunità Cristiana', isBold: true },
      ],
      ptPT: [
        { text: 'Convidá-los para', isBold: false },
        { text: 'Comunidade Cristã', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `Seeing the love that exists in a Christian community and seeing God’s work in others can have a powerful influence on non-Christian friends and colleagues.`,
        steps: `Are there existing activities in your life that you could invite a non-Christian to that would allow then to meet other Christians?
          \nInviting non-Christians to church can be a good way to expose them to Christian community.
          \nIf they won’t come to church, are there social events you could organize or invite them to? These can be simple and as large or small as you feel is appropriate.`,
        example: `Hans and several of his friends from church like to cycle together on the weekends. Hans learned that one of his associates at work, Benni, really enjoys cycling, so Hans invited Benni to join the group on one of their weekend rides. Benni is not a Christian and had not really met many Christians before, but he enjoyed going out with this group of guys and wants to spend more time with them.`,
      },
      lt: {
        top: `Kai mūsų netikintys draugai ir bendradarbiai mato meilę, kuri aiškiai regima krikščioniškoje bendruomenėje, ir pastebi Dievo darbą kituose žmonėse, tai jiems daro didelę įtaką.`,
        steps: `Į kokią veiklą galėtumėte pakviesti savo netikinčius draugus, kur jie galėtų susipažinti su kitais tikinčiaisiais?
          \nVienas iš puikių būdų, kaip galite pristatyti netikintiems bendradarbiams krikščionišką bendruomenę, – tai pakviesti juos į bažnyčią.
          \nJei jie neateis į bažnyčią, į kokį susitikimą su savo tikinčiais draugais norėtumėte juos pakviesti arba ką galėtumėte organizuoti? Tai gali būti paprastas (tiek mažas, tiek didelis) susibūrimas, kaip Jums pačiam (-ai) atrodo priimtiniau.`,
        example: `Jonas ir keli jo draugai iš bažnyčios mėgsta savaitgaliais kartu važinėtis dviračiais. Jonas sužinojo, kad vienam iš jo bendradarbių, Benui, taip pat patinka važinėtis dviračiu, todėl vieną iš savaitgalių Jonas pakvietė jį prisijungti prie jų grupelės. Benas nėra krikščionis ir nėra susidūręs su krikščionimis, tačiau jam smagu leisti laiką su šia vaikinų grupele. Benas norėtų su jais praleisti dar daugiau laiko.`,
      },
      it: {
        top: `Vedere l'amore che esiste in una comunità cristiana e vedere il lavoro di Dio negli altri può avere una forte influenza su amici e colleghi non cristiani.`,
        steps: `Esistono delle attività nella tua vita che potresti condividere con un non cristiano per permettergli di incontrare altri cristiani?
          \nInvitare i non cristiani in chiesa può essere un buon modo per esporli alla comunità cristiana.
          \nSe non verranno in chiesa, ci sono eventi sociali che potresti organizzare e a cui potresti invitarli? Questi possono essere semplici e grandi o piccoli come ritieni appropriato.`,
        example: `Luca e molti dei suoi amici della chiesa amano andare in bicicletta insieme nei fine settimana. Luca ha saputo che uno dei suoi colleghi al lavoro, Marco, ama molto andare in bicicletta, quindi Luca ha invitato Marco a unirsi al gruppo in una delle loro uscite nei weekend. Marco non è un cristiano e non aveva mai incontrato molti cristiani prima, ma gli piace uscire con questo gruppo di ragazzi e vuole passare più tempo con loro.`,
      },
      ptPT: {
        top: `Ver o amor que existe numa comunidade cristã e ver o que Deus faz na vida de outras pessoas pode ter uma forte influência em amigos e colegas não cristãos.`,
        steps: `Há atividades na tua vida para as quais poderias convidar alguém não cristão permitindo que essa pessoa conhecesse outros cristãos?
          \nConvidar pessoas não cristãs para ir à igreja pode ser uma boa forma de os expor à comunidade cristã.
          \nSe eles não quiserem ir à igreja, há eventos sociais que poderias organizar ou para os quais os poderias convidar? Podem ser eventos simples e tão grandes ou tão pequenos como achares apropriado.`,
        example: `O André e vários amigos da igreja gostam de andar de bicicleta nos fins-de-semana. O André descobriu que um dos seus sócios no trabalho, o Bernardo, gosta muito de ciclismo. Então, o André convidou o Bernardo para se juntar ao grupo num fim-de-semana. O Bernardo não é cristão e não conhecia muitos cristãos, mas gostou de passar tempo com este grupo e quer voltar a fazê-lo.`,
      },
    },
  },
  card4: {
    frontText: {
      en: [
        { text: 'Earning Trust and Earning the Right to', isBold: false },
        { text: "Speak into Someone's Life", isBold: true },
      ],
      lt: [
        { text: 'Kurti pasitikėjimą ir užsitarnauti', isBold: false },
        { text: 'teisę kalbėti su', isBold: true },
        { text: 'žmogumi apie jo gyvenimą', isBold: false },
      ],
      it: [
        { text: 'Guadagnare la Fiducia degli Altri', isBold: false },
        { text: 'e il Diritto a Esprimere il Proprio', isBold: true },
        { text: 'Parare sulla Vita di Qualcuno', isBold: false },
      ],
      ptPT: [
        { text: 'Ganhar Confiança de Falar', isBold: false },
        { text: 'Abertamente Sobre a', isBold: true },
        { text: 'Vida da Pessoa', isBold: false },
      ],
    },
    backText: {
      en: {
        top: `For someone to explore spiritual questions with us they will need to feel that they can trust us. We need to learn how to lovingly invest in people over time to earn their trust.`,
        steps: `Pray for them - Ask God for His heart for that person and His insight into ways you can be there for them
          \nLearn and listen - Ask questions, listen to the things they share, find out about them and their interests
          \nSpend time with them - Make time for them at work when possible and look for ways to spend time with them outside of work
          \nBe open and honest - Be willing to share your own struggles and be vulnerable where appropriate
          \nGive it time - Building trust doesn’t happen overnight. Be patient, persistent and consistent`,
        example: `Florence and Cho became friends when they began teaching at the same school around the same time. Florence had made casual mention of her church and the importance of her faith, but it was obvious Cho was not interested in discussing it. Florence sensed that Cho may have had some negative experience with Christians in her past that made her guarded with Florence. Florence decided to pray regularly for Cho and just continue to be her friend. It has been over a year and Florence has continued to listen without judgment to Cho as well as share her own struggles. Cho has become more open and has even begun to ask Florence for advice.`,
      },
      lt: {
        top: `Kad žmogus atvirai kalbėtų dvasinėmis temomis, jis turi mumis pasitikėti. Mums svarbu išmokti su meile bendrauti su žmonėmis ir tai daryti ilgą laiką.`,
        steps: `Melskitės už juos – prašykite, kad Dievas duotų Jums meilės ir išminties, kaip padėti ir padrąsinti savo bendradarbius. 
          \nPažinkite ir įsiklausykite – užduokite klausimus, atidžiai klausykitės, sužinokite daugiau apie juos ir jų pomėgius. 
          \nLeiskite laiką su jais – kai įmanoma, skirkite jiems laiko darbe ir ieškokite būdų, kaip galėtumėte daugiau bendrauti su jais už darbo ribų.
          \nBūkite atviras (-a) ir nuoširdus (-i) – atvirai pasakokite, kaip gyvenate, ir tinkamu metu būkite atviras (-a) bei pažeidžiamas (-a).
          \nNeskubėkite – pasitikėjimas nesukuriamas pernakt. Būkite kantrus (-i), atkaklus (-i) ir pastovus (-i).`,
        example: `Nepaisant didelio darbo krūvio naujame darbe, Neringa sąmoningai skyrė kelias minutes per dieną pokalbiui su savo bendradarbe Kotryna ir domėjosi jos gyvenimu bei šeima. Po kelių mėnesių Kotryna taip pat pradėjo domėtis, kaip sekasi Neringai, bei uždavė kelis svarbesnius klausimus apie Dievą ir tikėjimą. Jos kalbėjosi apie Kotrynos vidines kovas ir abejones dėl bažnyčios ir tikėjimo. Nepaisant skirtingų nuomonių dėl kai kurių dalykų, Kotryna susidomėjo Neringos mintimis bei jos teigiamu požiūriu į bažnyčią. `,
      },
      it: {
        top: `Affinché qualcuno possa affrontare con noi domande spirituali, dovrà capire che può fidarsi di noi. Dobbiamo imparare a investire con amore nelle persone per guadagnare la loro fiducia nel tempo.`,
        steps: `Prega per loro - Chiedi a Dio il suo cuore per quella persona e la sua opinione sui modi in cui puoi essere presente per loro.
          \nImpara e ascolta - Fai domande, ascolta le cose che condividono, scopri di più di loro e sui loro interessi
          \nTrascorri del tempo con loro - Trova il tempo per loro al lavoro quando ti è possibile e cerca dei modi per trascorrere del tempo con loro al di fuori del lavoro
          \nSii aperto e onesto - Sii disposto a condividere le tue lotte e ad essere vulnerabile, se necessario
          \nDai tempo - Costruire la fiducia non avviene da un giorno all'altro. Sii paziente, persistente e coerente`,
        example: `Vanessa e Anna divennero amici quando iniziarono ad insegnare nella stessa scuola più o meno nello stesso periodo. Vanessa aveva menzionato casualmente la sua chiesa e l'importanza della sua fede, ma era ovvio che a Anna non interessava discuterne. Vanessa intuì che Anna poteva aver avuto qualche esperienza negativa con i cristiani in passato che la mettevano in guardia da Vanessa. Vanessa decise di pregare regolarmente per Anna e continuare ad essere sua amica. È passato più di un anno e Vanessa continua ad ascoltare senza giudicare Anna e a condividere le proprie battaglie della vita. Anna è diventato più aperto e ha persino iniziato a chiedere consiglio a Vanessa.`,
      },
      ptPT: {
        top: `Para alguém explorar assuntos espirituais connosco eles terão de sentir que podem confiar em nós. Precisamos de aprender como amar e investir em pessoas ao longo do tempo para ganhar a sua confiança.`,
        steps: `Ora por eles - Pede a Deus que te dê um coração como o dele em relação a essa pessoa e que te dê uma boa perspetiva sobre como podes estar presente para ajudá-la.
          \nAprende e escuta - Faz perguntas, ouve o que eles partilham, aprende sobre eles e sobre o que eles gostam.
          \nPassa tempo com eles - Quando possível, separa tempo para estar com eles no trabalho e procura oportunidades para passar tempo com eles fora do trabalho.
          \nSê aberto e honesto - Dispõe-te a partilhar as tuas lutas e sê vulnerável, quando apropriado.
          \nEspera - Criar confiança não acontece do dia para a noite. Sê paciente, persistente e consistente.`,
        example: `A Fernanda e o Carlos tornaram-se amigos quando começaram a ensinar na mesma escola. A Fernanda mencionou casualmente que ia à igreja e que a sua fé era importante para ela, mas o Carlos claramente não tinha interesse em falar disso. A Fernanda ficou com a impressão que o Carlos teria tido experiências negativas com cristãos no passado, que faziam com que ele estivesse mais fechado com a Fernanda. A Fernanda decidiu orar regularmente pelo Carlos e continuar a amizade. Já passou mais de um ano e a Fernanda continua a ouvir o Carlos sem julgar e a partilhar as suas próprias dificuldades. O Carlos tem ficado mais aberto e tem pedido conselhos à Fernanda.`,
      },
    },
  },
  card5: {
    frontText: {
      en: [
        { text: 'Opening the Bible', isBold: true },
        { text: 'with your Colleague', isBold: false },
      ],
      lt: [
        { text: 'Skaityti Bibliją', isBold: true },
        { text: 'kartu su bendradarbiu', isBold: false },
      ],
      it: [
        { text: 'Aprire e Leggere la Bibbia', isBold: true },
        { text: 'con il tuo Collega', isBold: false },
      ],
      ptPT: [
        { text: 'Abrir a Bíblia', isBold: true },
        { text: 'com o teu Colega', isBold: false },
      ],
    },
    backText: {
      en: {
        top: `One of the best ways for someone to encounter Jesus is by reading God’s Word for themselves.`,
        steps: `Some people will be naturally curious about the Bible, while others may have little knowledge or interest. Finding the proper opportunity will require prayerful sensitivity and patience.
          \nLook for an opportunity to mention the connection between an issue you have faced and something you read (or heard shared) from the Bible. Many individuals have no idea that the Bible speaks to the daily problems of life.
          \nIf someone shows interest in reading the Bible you may want to lend them a copy or suggest where they should begin reading. Don’t assume they know the structure of books and verses as you do. For a good narrative story, start with the Gospel of Luke. The Gospel of John gives a good “executive summary” of the Bible.
          \nBe willing to discuss with your colleague what they read if they would like to, keeping in mind that this may all be very new to them.`,
        example: `In the 10 months that Rich had worked with Luke, they had become good friends. Rich had shared with Luke how he had become a Christian, and although Luke was not from a religious background he was interested in some of the spiritual insights Rich had shared. Luke confided to Rich that he was having trouble forgiving someone and Rich mentioned that the Bible actually had a lot to say about forgiveness. This caught Luke’s interest so he agreed to meet Rich after work one day to look at what the Bible had to say. Together they looked at the story of the woman at the well and this led to an even deeper spiritual discussion.`,
      },
      lt: {
        top: `Vienas iš geriausių būdų žmogui pažinti Jėzų yra pačiam skaityti Dievo Žodį.`,
        steps: `Kai kuriuos žmones nuoširdžiai domina Biblija, tuo tarpu kiti ja nesidomi ar apie ją neturi pakankamai žinių. Tik būdami kantrūs, maldingi ir jautrūs kito atžvilgiu, galime rasti tinkamą būdą, kaip padrąsinti netikintį bendradarbį pradėti skaityti Bibliją.
          \nIeškokite galimybių pakalbėti apie sąsajas tarp problemų, su kuriomis susidūrėte, ir to, ką perskaitėte Biblijoje (ar girdėjote dalinantis iš jos). Dauguma žmonių nežino, jog Biblija kalba apie kasdienes mūsų gyvenimo problemas.
          \nJei kas nors susidomi Šventuoju Raštu, paskolinkite Bibliją ir patarkite, nuo kur pradėti ją skaityti. Greičiausiai žmonės nežinos Biblijos sandaros, todėl patarkite skaityti nuo Luko evangelijos. Jono evangelija pateikia gerą Biblijos santrauką.
          \nBūkite pasiruošęs (-usi) noriai diskutuoti su savo bendradarbiais apie tai, ką jie perskaitė (jei jie to norės), suprasdamas (-a), kad visa tai jiems bus nauja.`,
        example: `Per 10 mėnesių, kuriuos Titas dirbo su Luku, jie tapo gerais draugais. Titas pasakojo Lukui, kaip jis tapo krikščioniu. Nors Lukas anksčiau nesusidūrė su religija, jam buvo įdomios kai kurios dvasinės įžvalgos, kuriomis pasidalino Titas. Kartą Lukas prasitarė, kad negali kažkam atleisti, o Titas pastebėjo, kad Biblijoje daug rašoma atleidimo tema. Tai Luką sudomino, ir vieną dieną jis panoro po darbo susitikti su Titu, kad galėtų sužinoti, kas apie atleidimą rašoma Biblijoje. Titas atspausdino istoriją apie moterį prie šulinio ir kartu su Luku ją panagrinėjo – tai išsirutuliojo į gilesnę dvasinę diskusiją.`,
      },
      it: {
        top: `Uno dei modi migliori per incontrare Gesù è leggere la Parola di Dio per se stessi.`,
        steps: `Alcune persone saranno naturalmente incuriosite della Bibbia, mentre altre potrebbero avere poca conoscenza o interesse. Trovare la giusta opportunità richiederà una devota sensibilità e pazienza.
          \nCerca un'opportunità per menzionare la connessione tra un problema che hai affrontato e qualcosa che hai letto (o sentito condividere) dalla Bibbia. Molte persone non hanno idea che la Bibbia parla ai problemi quotidiani della vita.
          \nSe qualcuno mostra interesse a leggere la Bibbia, potresti voler prestargli una copia o suggerirgli dove potrebbero iniziare a leggere. Non dare per scontato che conoscano la struttura di libri e versetti come fai tu. Per una buona storia narrativa, inizia con il Vangelo di Luca. Il Vangelo di Giovanni offre un buon "sommario esecutivo" della Bibbia.
          \nSiate disposti a discutere con il vostro collega ciò che leggono se lo desiderano, tenendo presente che questo può essere tutto molto nuovo per loro.`,
        example: `Nei 10 mesi in cui Ivan aveva lavorato con Dario, erano diventati buoni amici. Ivan aveva condiviso con Dario come fosse diventato un cristiano, e sebbene Dario non avesse avuto un insegnamento religioso, era interessato ad alcune delle opinioni spirituali che Ivan aveva condiviso con lui. Dario confidò a Ivan che stava avendo problemi a perdonare qualcuno e Ivan disse che la Bibbia in realtà aveva molto da dire sul perdono. Questo suscitò l'interesse di Dario, così un giorno acconsentì a incontrare Ivan dopo il lavoro per vedere cosa aveva da dire la Bibbia. Insieme analizzarono la storia della donna al pozzo e questo portò a una discussione spirituale ancora più profonda.`,
      },
      ptPT: {
        top: `Uma das melhores formas para alguém encontrar Jesus é lendo a Palavra de Deus por eles próprios.`,
        steps: `Algumas pessoas estão naturalmente curiosas acerca da Bíblia, enquanto que outros não sabem muito ou não têm muito interesse. Encontrar a oportunidade certa requer oração, sensibilidade e paciência.
          \nProcura uma oportunidade para fazer uma ponte entre um problema que tenhas enfrentado e algo que leste (ou ouviste alguém partilhar) na Bíblia. Muita gente não faz ideia que a Bíblia fala sobre os problemas quotidianos.
          \nSe alguém mostrar interesse em ler a Bíblia, talvez seja bom emprestares-lhes uma Bíblia ou sugerir onde eles podem começar. Não assumas que eles conhecem a estrutura dos livros e capítulos tão bem como tu. Para uma boa história narrativa, começa com o Evangelho de Lucas. O Evangelho de João dá um bom resumo da Bíblia.
          \nDisponibiliza-te para falar com o teu colega sobre o que ele leu, se ele quiser. Lembra-te que tudo isto pode ser uma novidade para ele.`,
        example: `Nos 10 meses em que o Ricardo trabalhou com o Lucas eles tornaram-se bons amigos. O Ricardo tinha partilhado com o Lucas como se tinha tornado cristão, e ainda que o Lucas não viesse de uma família cristã, ficou interessado sobre algumas coisas que o Ricardo partilhou. O Lucas confidenciou que tinha dificuldade em perdoar a uma pessoa e o Ricardo partilhou que a Bíblia falava muito sobre perdão. Isto chamou à atenção do Lucas, e então ele decidiu encontrar-se com o Ricardo um dia a seguir ao trabalho para ver o que a Bíblia tinha a dizer. Olharam juntos para a história da mulher no poço e isto levou a uma conversa ainda mais profunda.`,
      },
    },
  },
  card6: {
    frontText: {
      en: [
        { text: 'Sužinoti, ką kitas', isBold: false },
        { text: 'mąsto apie Jėzų', isBold: true },
      ],
      lt: [
        { text: "Finding Out Someone's", isBold: false },
        { text: 'Perception of Jesus', isBold: true },
      ],
      it: [
        { text: 'Scoprire la Percezione', isBold: false },
        { text: 'che Qualcuno ha di Gesù', isBold: true },
      ],
      ptPT: [
        { text: 'Descobrir o Que Alguém', isBold: false },
        { text: 'Pensa sobre Jesus', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `Understanding a non-Christian’s perception of Jesus can help you explore their spiritual beliefs. Then you will know how to guide the discussion and what questions or topics make the gospel feel relevant to them.`,
        steps: `Think of questions that will gauge their perception, like “Who do you think God is?” or “What do you make of Jesus?”
          \nMake sure that you are showing genuine interest in their opinions and thoughts.
          \nHave suggestions to get them engaged in learning more about Jesus (this could be giving them a book to read, inviting them to an event or simply planning a time to talk further).`,
        example: `Mike, a junior consultant, was working late and eating takeaway with a colleague Leon. Leon had showed curiosity in Mike’s faith and had asked about his weeknight church small group. As they ate, Mike decided to ask Leon some deeper questions about his perspective on God and Jesus. Leon shared that he thought Jesus was a good man but not God. Mike listened and shared some of his thoughts of his own. The discussion was lively but cordial and in the end Mike asked Leon if he would like to look at the Bible together sometime to see what Jesus had to say about himself. Leon agreed.`,
      },

      lt: {
        top: `Sužinoję, ką netikintis mąsto apie Jėzų, geriau suprantame, kuo jis tiki. Tuomet žinome, kokia linkme kreipti diskusiją ir kokie klausimai ar temos padės jam pamatyti, kad evangelija yra aktuali šiandien.`,
        steps: `Sugalvokite klausimus, kurie padės suprasti jų dabartinį požiūrį, pavyzdžiui: „Kaip manai, kas yra Dievas?“ arba „Ką galvoji apie Jėzų?“
          \nNuoširdžiai domėkitės jų nuomone ir mintimis.
          \nPagalvokite ir kartu pabandykite paaiškinti, kas, Jūsų manymu, yra Jėzus ir kodėl tuo tikite.`,
        example: `Kadangi jaunesnysis konsultantas Mikas dirbo iki vėlumos, jis ir jo bendradarbis Linas užsisakė maisto ir kartu vakarieniavo biure. Linas paklausė Miko apie bažnyčios grupelę, kurią šis lankė vakarais. Jiems bevalgant, Mikas nusprendė paklausti Lino kelių svarbių klausimų apie jo požiūrį į Dievą ir Jėzų. Linas pasakė, jog mano, kad Jėzus buvo geras žmogus, bet ne Dievas. Mikas išklausė ir išsakė kelias mintis. Galiausiai Mikas paklausė Lino, ar jis norėtų kartu kartais paskaityti, ką Biblijoje Jėzus sako apie save. Linas sutiko.`,
      },
      it: {
        top: `Comprendere la percezione di Gesù da parte di un non cristiano può aiutarti a esaminare le loro credenze spirituali. Allora saprai come guidare la discussione e quali domande o argomenti  renderanno il vangelo pertinente per loro.`,
        steps: `Pensa a domande che possano misurare la loro percezione, come "Chi pensi che sia Dio?" O "Cosa pensi di Gesù?"
          \nAssicurati di mostrare un genuino interesse per le loro opinioni e i loro pensieri.
          \nAbbi dei suggerimenti per coinvolgerli nell'imparare di più su Gesù (come dare loro un libro da leggere, invitandoli a un evento o semplicemente pianificando un momento per parlare in profondità).`,
        example: `Pietro, un giovane consulente, lavorava fino a tardi e mangiava cibo da asporto con un collega di nome Leonardo. Leonardo si mostrò curioso per la fede di Pietro e si era interessato del gruppo della chiesa settimanale. Mentre mangiavano, Pietro decise di rivolgere a Leonardo alcune domande più profonde sulla sua prospettiva di Dio e Gesù. Leonardo pensava che Gesù fosse un uomo buono ma non che fosse Dio. Pietro ascoltò e condivideva alcuni dei suoi pensieri. La discussione fu vivace ma profonda e alla fine Pietro chiese a Leonardo se gli sarebbe piaciuto leggere insieme la Bibbia qualche volta per vedere cosa Gesù avesse da dire su se stesso. Leonardo fu d'accordo.`,
      },
      ptPT: {
        top: `Perceber a forma como uma pessoa não cristã vê Jesus pode ajudar-te a explorar as suas crenças espirituais. A partir daí, podes aprender como guiar as conversas e que assuntos podem tornar o evangelho relevante para eles.`,
        steps: `Pensa em perguntas que vão capturar a sua atenção, como "Quem achas que Deus é?" ou "O que pensas sobre Jesus?"
          \nCertifica-te que estás a mostrar interesse genuíno nas suas opiniões e pensamentos.
          \nPrepara sugestões que podes dar para mantê-los a interagir na aprendizagem sobre Jesus (oferecer um livro, convidá-los para um evento ou simplesmente planear um tempo para falar mais).`,
        example: `O Miguel, um consultor, ficou a trabalhar até tarde e encomendou comida para o escritório com o seu colega Leo. O Leo tinha mostrado curiosidade acerca da fé do Miguel e tinha feito perguntas sobre o seu pequeno grupo na igreja. Enquanto comiam, o Miguel decidiu fazer perguntas mais profundas ao Leo sobre os seus pensamentos acerca de Deus e Jesus. O Leo partilhou que acreditava que Jesus era um bom homem, mas não era Deus. O Miguel ouviu e partilhou alguns dos seus pensamentos. A conversa estava acesa, mas foi cordial, e no final o Miguel perguntou ao Leo se gostava de olhar para a Bíblia com ele e ver o que Jesus tinha dito sobre ele próprio. O Leo concordou.`,
      },
    },
  },
  card7: {
    frontText: {
      en: [
        { text: 'Praying', isBold: true },
        { text: 'for People at Work', isBold: false },
      ],

      lt: [
        { text: 'Melstis', isBold: true },
        { text: 'už žmones darbe', isBold: false },
      ],
      it: [
        { text: 'Pregare', isBold: true },
        { text: 'per le Persone', isBold: false },
      ],
      ptPT: [
        { text: 'Orar', isBold: true },
        { text: 'por Pessoas no Trabalho', isBold: false },
      ],
    },
    backText: {
      en: {
        top: `God gives us regular opportunities to pray for situations with colleagues, customers and clients. Some may be one time opportunities and others will mean consistent prayer over weeks or months.`,
        steps: `Be alert for circumstances where someone at work may need your prayers. Keeping a note on your phone or in a notebook will help you to pray more consistently and specifically.
          \nSome non-Christians will ask for prayer if they know you are a praying person...particularly in serious circumstances. You may also want to volunteer to pray for something that is shared with you. In either case, make sure you DO pray and let them know later that you did.
          \nWatch for appropriate times when you can ask to pray with someone. This can be a great blessing and comfort to them and may open the door for further dialogue.`,
        example: `Rachael is a community nurse. On a routine home visit she noticed that her patient was unusually upset. The woman shared that she had just received a cancer diagnosis. Rachael encouraged the woman to share some of what she was feeling. At the end of the visit, Rachael felt impressed by God to ask the woman if she could pray with her. The woman agreed and Rachael prayed for the woman to know Jesus’ comfort and peace. The patient was clearly moved, gave Rachael a tearful thanks, and has since been more open to share with Rachael.`,
      },

      lt: {
        top: `Dievas nuolatos mums suteikia galimybių melstis už situacijas su bendradarbiais, pirkėjais ir klientais. Kai kurios situacijos gali būti vienkartinės galimybės, o kitos tampa pastovia malda, kuri trunka savaitėmis ar mėnesiais.`,
        steps: `Būkite atidus (-i), kad pastebėtumėte, kam darbe reikia Jūsų maldų. Pasižymėkite tai telefone arba kompiuteryje, taip Jūsų maldos bus dažnesnės ir konkretesnės.
          \nKai kurie netikintys prašys  melstis už juos, jei žinos, kad esate pamaldus žmogus, ypač susidūrę su dideliais iššūkiais. Taip pat galite pats (-i) pasisiūlyti melstis už kažkokią problemą, apie kurią Jums ką tik papasakojo. Tokiu atveju BŪTINAI melskitės, o vėliau pasakykite, kad už tai meldėtės.
          \nPastebėkite, kada tinkamas laikas ką nors pakviesti kartu pasimelsti. Tai gali būti didžiulis palaiminimas ir paguoda netikinčiajam ir atvers duris tolimesniems pokalbiams. `,
        example: `Gabrielė dirba slauge. Vieno įprasto vizito metu ji pastebėjo, jog jos pacientė labai liūdna. Moteris papasakojo, jog ką tik sužinojo, kad jai diagnozuotas vėžys. Gabrielė padrąsino moterį atsiverti ir išsisakyti, kaip jaučiasi. Vizitui einant į pabaigą Gabrielė jautėsi Dievo įkvėpta paklausti, ar jos pacientė norėtų kartu su ja pasimelsti. Ji sutiko ir Gabrielė meldėsi, kad ši moteris pažintų Jėzaus paguodą ir ramybę. Jos pacientė buvo akivaizdžiai paliesta ir atsidėkodama apkabino ją su ašaromis akyse.`,
      },
      it: {
        top: `Dio ci offre regolarmente opportunità di pregare per le situazioni dei nostri  colleghi e dei clienti che incontriamo. Alcune situazioni potrebbero essere opportunità uniche nella vita e altre includeranno una preghiera costante per settimane o mesi.`,
        steps: `Sii attento alle circostanze in cui qualcuno al lavoro potrebbe aver bisogno delle tue preghiere. Avere un appunto sul telefono o in un diario ti aiuterà a pregare in modo più coerente e specifico.
          \nAlcuni non cristiani ti chiederanno di pregare se sapranno che sei una persona che prega...specialmente in circostanze serie. Potresti anche proporti per pregare per qualcosa che hanno condiviso con te. In entrambi i casi, assicurati di pregare e faglielo sapere più tardi.
          \nRicerca i momenti adatti in cui puoi chiedere di pregare con qualcuno. Questo può essere una grande benedizione e conforto per loro e può aprire la porta per ulteriori conversazioni.`,
        example: `Sabrina è un'infermiera attiva nella propria comunità. Durante una visita a domicilio, notò che la sua paziente era insolitamente turbata. La donna le disse di aver appena ricevuto una diagnosi di cancro. Sabrina la incoraggiò a condividere parte di ciò che stava provando. Alla fine della visita, Sabrina ebbe l'impressione da parte di Dio di chiederle se potesse pregare con lei. La donna acconsentì e Sabrina pregò affinché la donna conoscesse il conforto e la pace di Gesù. La paziente fu chiaramente toccata, ringraziò Sabrina in lacrime, e da quel momento fu più aperta a condividere le proprie esperienze con Sabrina.`,
      },
      ptPT: {
        top: `Deus dá-nos oportunidades frequentes para orar por situações com colegas e clientes. Algumas são oportunidades pontuais e outras vão ser orações que durarão semanas ou meses.`,
        steps: `Fica atento a situações no trabalho em que alguém pode precisar da tua oração. Ter uma nota no teu telemóvel ou computador vai ajudar-te a orar mais consistente e especificamente.
          \nAlgumas pessoas não cristãs vão pedir-te que ores se souberem que és uma pessoa que ora... especialmente em situações sérias. Também te podes oferecer para orar por algo que alguém partilhou contigo. Em qualquer caso, certifica-te de que oras e que lhes dizes que oraste.
          \nToma atenção a tempos apropriados em que podes orar por alguém. Isto pode ser uma grande bênção e conforto para eles e pode abrir a porta para mais conversas.`,
        example: `A Raquel é uma enfermeira. Numa visita de rotina a casa de uma paciente, reparou que a senhora estava perturbada. Ela tinha acabado de receber um diagnóstico de cancro. A Raquel encorajou a senhora a partilhar como se sentia. No final da visita, a Raquel sentiu Deus a dizer-lhe para perguntar se podia orar com a senhora. A senhora aceitou e a Raquel orou para que a senhora conhecesse o conforto e paz de Jesus. A sua paciente estava claramente comovida, agradeceu à Raquel e tem estado mais aberta a partilhar coisas com a Raquel.`,
      },
    },
  },
  card8: {
    frontText: {
      en: [
        { text: 'Living a Life that', isBold: false },
        { text: 'Demands an Explanation', isBold: true },
      ],
      lt: [
        { text: 'Gyventi tokį gyvenimą', isBold: false },
        { text: 'kuris reikalauja paaiškinimo', isBold: true },
      ],
      it: [
        { text: 'Vivere una Vita che', isBold: false },
        { text: 'Richiede una Spiegazione', isBold: true },
      ],
      ptPT: [
        { text: 'Viver uma Vida que', isBold: false },
        { text: 'Requer uma Explicação', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `Our actions in our daily lives can be a clear testimony to God’s love before our colleagues.`,
        steps: `Look for ways to influence the culture in your workplace with acts of Christ-like love.
          \nThink about how you would respond if someone asked you why you acted in the way that you did. Remember that you don’t want to preach but rather make a simple connection between an act of kindness and your faith.`,
        example: `Amos works in a firm where most of the staff has worked together for a couple of years and know each other well. A new associate has just joined and the rest of the office is making his initiation to the firm difficult by giving him an unbearable workload of all the least desirable jobs as well as talking behind his back. Amos was tempted to laugh with the others, but he decided that, as a Christ follower, he should be a help and encouragement to the new associate. He has been kind to him and offered help. Amos is beginning to notice the other associates now seem less comfortable giving the “new guy” a hard time and are being nicer to him as well.`,
      },

      lt: {
        top: `Mūsų kasdieninis elgesys bendradarbiams liudija Dievo meilę.`,
        steps: `Kaip Jūsų sekimas Jėzumi keičia Jūsų elgesį darbe?
          \nPagalvokite, ką atsakytumėte, jei stebėdamas Jūsų elgesį kas nors paklaustų, kodėl pasielgėte būtent taip. Nepamokslaukite! Tiesiog pabandykite atskleisti ryšį tarp savo malonaus poelgio ir tikėjimo.`,
        example: `Arūnas ir dauguma jo kolegų kartu dirba jau keletą metų ir vienas kitą gerai pažįsta. Prie jų kolektyvo neseniai prisijungė naujas darbuotojas. Didžioji dauguma biuro darbuotojų paverčia jo darbą įmonėje tiesiog nepakeliamu, mat ant jo pečių užmeta didžiulį darbo krūvį, duoda jam pačius nemaloniausius darbus ir dar jį apkalbinėja. Iš pradžių Arūnui kilo noras kartu su visais iš jo pasijuokti, bet kiek pagalvojęs jis nusprendė, kad kaip Kristaus sekėjas turėtų pagelbėti ir padrąsinti naują darbuotoją. Jis maloniai su juo elgėsi ir pasiūlė pagalbą. Netrukus Arūnas pastebėjo, kad ir kiti darbuotojai tapo jam malonesni. `,
      },
      it: {
        top: `Le azioni nella nostra vita quotidiana possono essere una chiara testimonianza dell'amore di Dio di fronte ai nostri colleghi.`,
        steps: `Cerca dei modi per influenzare la cultura sul posto di lavoro con atti di amore come ha fatto Cristo.
          \nPensa a come risponderesti se qualcuno ti chiedesse perché hai agito nel modo in cui l'hai fatto. Ricorda di non fare 'la predica' ma piuttosto crea una semplice connessione tra una tua azione di amore e la tua fede.`,
        example: `Carlo lavora in un'azienda dove la maggior parte dello staff lavora insieme da un paio d'anni e si conosce bene. Un nuovo collega si è appena unito al team e il resto dell'ufficio sta rendendo difficile il suo inserimento nell'azienda perché gli affida un carico di lavoro insopportabile di tutte le mansioni meno desiderabili e perché gli parla alle spalle. Carlo è tentato di prendere la parte dei suoi colleghi, ma decide che, essendo seguace di Cristo, deve essere un aiuto e un incoraggiamento per il nuovo collega. Carlo è gentile con il nuovo collega e gli offre il suo aiuto. A lungo andare comincia a notare che gli altri colleghi si sentono a disagio a rendere difficile la vita al "nuovo collega" e sono anche più gentili con lui.`,
      },
      ptPT: {
        top: `As nossas ações no dia-a-dia podem ser um testemunho claro para os nossos colegas do amor de Deus.`,
        steps: `Procura formas de influenciar a cultura no teu local de trabalho com atos de amor que reflitam Jesus.
          \nPensa sobre como responderias se alguém te perguntasse o motivo da tua atitude. Lembra-te que não queres pregar, mas sim fazer uma ligação simples entre uma ação bondosa e a tua fé.`,
        example: `O António trabalha numa empresa onde a maioria dos empregados trabalha há alguns anos e todos se conhecem bem. Uma pessoa nova foi contratada e toda a gente está a tornar as suas primeiras semanas difíceis, dando-lhe uma quantidade de trabalho insuportável e falando dele nas suas costas. O António estava tentado a rir-se da situação com os seus colegas, mas decidiu que, como seguidor de Cristo, ele deveria ser uma ajuda e encorajamento para o seu novo colega. Ele tem sido simpático com ele e tem oferecido ajuda. O António está a ver que os seus colegas se sentem menos confortáveis a dificultar a vida do novo colega e estão a ser mais simpáticos com ele.`,
      },
    },
  },
  card9: {
    frontText: {
      en: [
        { text: 'Finding Out', isBold: false },
        { text: "Someone's Spiritual Background", isBold: true },
      ],

      lt: [
        { text: 'Sužinoti kokia', isBold: false },
        { text: 'yra žmogaus dvasinė patirtis', isBold: true },
      ],
      it: [
        { text: 'Scoprire il', isBold: false },
        { text: 'Background Spirituale di Qualcuno', isBold: true },
      ],
      ptPT: [
        { text: 'Descobrir o Passado', isBold: false },
        { text: 'Espiritual de Alguém', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `Questions about someone’s spiritual background can be a non-threatening way to open a spiritual dialogue.`,
        steps: `Think of some questions you could ask about a person’s spiritual background that would be non-offensive.
          \nMake sure you ask at an appropriate time and place and listen respectfully to whatever they share.`,
        example: `Sanjay, a junior engineer, was travelling with a senior engineer he did not know well but admired very much. Conversation turned to their plans for the weekend. Sanjay mentioned church and his colleague asked a few questions. Sanjay nervously asked, “Would you say you have a faith yourself?” His colleague paused, then began to open up about his upbringing, his beliefs about God and some of his current feelings about faith. Sanjay didn’t know much about the religious beliefs he was describing so he just chose to listen and be attentive. Now when they see each other, the conversations naturally go to a deeper level.`,
      },

      lt: {
        top: `Klausimai apie kieno nors dvasinę patirtį gali atverti kelią dvasiniam dialogui.`,
        steps: `Pagalvokite, kokius klausimus (jie turėtų būti neįžeidžiantys!) galėtumėte užduoti žmogui apie jo dvasinę patirtį.
          \nPagalvokite, kokiomis natūraliomis aplinkybėmis galėtumėte užduoti šiuos klausimus darbe.`,
        example: `Marius, jaunas inžinierius, keliavo su vyresniuoju inžinieriumi, kurio gerai nepažinojo, tačiau juo žavėjosi. Jie ėmė kalbėtis apie savaitgalio planus. Marius paminėjo bažnyčią, ir jo bendradarbis uždavė keletą klausimų. Marius nervingai paklausė: „Ar tu esi tikintis žmogus?“ Jo bendradarbis trumpam nutilo, o tada ėmė pasakoti apie save, ką galvoja apie Dievą ir savo dabartinį tikėjimą. Marius sunkiai suprato esmę, bet jis įdėmiai klausėsi, ką kalbėjo bendradarbis. Dabar, jiems susitikus, pokalbiai natūraliai pakrypsta dvasine linkme.`,
      },
      it: {
        top: `Le domande in merito al background spirituale di qualcuno possono essere un modo non minaccioso per aprire un dialogo spirituale.`,
        steps: `Pensa ad alcune domande sullo sfondo spirituale che potresti porre a una persona che non siano offensive.
          \nAssicurati di fare le domande al momento opportuno e di collocare e ascoltare rispettosamente ciò che condividono.`,
        example: `Valerio, un giovane ingegnere, stava viaggiando con un ingegnere più esperto che non conosceva bene ma ammirava molto. La conversazione ruotava intorno ai loro piani per il fine settimana. Valerio menzionò la chiesa e il suo collega fece alcune domande. Valerio chiese nervosamente: "Diresti che tu stesso hai una fede?" Il suo collega fece una pausa, poi iniziò ad aprirsi riguardo la sua educazione, le sue convinzioni su Dio e alcuni dei suoi attuali sentimenti riguardo alla fede. Valerio non sapeva molto delle credenze religiose che stava descrivendo, quindi scelse solo di ascoltare e di prestare attenzione alle risposte. Ora, quando si vedono, le conversazioni si svolgono su un livello più profondo.`,
      },
      ptPT: {
        top: `Perguntas sobre o passado espiritual de alguém podem ser uma forma não ameaçadora de começar um diálogo espiritual.`,
        steps: `Pensa em algumas perguntas que não sejam ofensivas sobre o passado espiritual de uma pessoa.
          \nCertifica-te que perguntas num espaço e momento apropriados e que ouves o que eles partilham de forma respeitosa.`,
        example: `O Simão, um engenheiro novo, estava a viajar com um engenheiro mais experiente que não conhecia bem mas admirava muito. Começaram a conversar sobre os seus planos para o fim-de-semana. O Simão mencionou a igreja e o seu colega fez algumas questões. O Simão perguntou nervosamente: "Diria que tem algum tipo de fé?" O seu colega fez uma pausa e começou a partilhar sobre a sua educação, as suas crenças acerca de Deus e alguns sentimentos que tinha sobre fé. O Simão não sabia muito sobre as crenças religiosas que o seu colega partilhava, então escolheu ouvir atentamente. Agora, quando eles estão juntos, as conversas são naturalmente mais profundas.`,
      },
    },
  },
  card10: {
    frontText: {
      en: [
        { text: 'Telling Them', isBold: false },
        { text: 'You Are a Christian', isBold: true },
      ],

      lt: [
        { text: 'Pasakyti jiems', isBold: false },
        { text: 'kad esi krikščionis', isBold: true },
      ],
      it: [
        { text: 'Dirgli che', isBold: false },
        { text: 'Sei un Cristiano', isBold: true },
      ],
      ptPT: [
        { text: 'Dizer-lhes', isBold: false },
        { text: 'que Tu És um Cristão', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `Finding a natural way to let colleagues know you are a Christian early in your relationship sets the context for other things you will say and do and shows the important place faith holds in your life.`,
        steps: `Keep in mind that you don’t have to be perfect to be a Christian. You are simply saying you believe in Jesus and are trying to follow Him. People will respond better to a humble person than a “good person”.
          \nThink through easy ways to bring it up. Be positive and mention activities you are involved in, not a list of things “don’t do”.`,
        example: `Ian recently took his “dream” position as a technical advisor on a television production. He has been pleased to find the cast and crew friendly. At the close of work one day several colleagues began talking about their plans for the evening. Ian was hesitant to tell the group that he was going to a small group bible study that night for fear of being labeled weird, but he decided to mention it as naturally. One woman asked if he was religious and Ian replied that actually, he was just someone who followed Jesus. Surprisingly, most did not seem as uncomfortable as Ian had feared. This has boosted his desire to live for Christ at work.`,
      },

      lt: {
        top: `Jei dar bendravimo pradžioje natūraliai pasakysite kolegoms, kad esate krikščionis, tai padės pamatą tam, ką sakysite ir darysite ateityje, bei parodys, kad tikėjimas Jūsų gyvenime užima svarbią vietą.`,
        steps: `Prisiminkite, kad neturite būti tobulas (-a) krikščionis (-ė). Tiesiog pasakykite, jog tikite Jėzumi ir stengiatės Juo sekti. Žmonės geriau priima nuolankų nei „gerą žmogų“. 
          \nApmąstykite, kaip galėtumėte pasakyti kitiems, kad sekate Kristumi. Būkite nuoširdus (-i) ir paminėkite veiklas, kuriose dalyvaujate, o ne sąrašą dalykų, kurių nedarote.`,
        example: `Kristupas įsidarbino naujoje įmonėje. Per darbuotojų susipažinimo vakarienę, kurioje dalyvavo keli įmonės verslo vadovai, jis norėjo padaryti gerą įspūdį. Vis dėlto, kalbėdamas su vienu iš įmonės vadovų, Kristupas nusprendė atvirai pasakyti, kad yra krikščionis ir tarnauja bažnyčios veiklose. Kai jis prisėdo prie stalo, vienas iš jo naujųjų bendradarbių pasisuko į jį ir tarė: „Gerbiu tave, kad būdamas toks jaunas tu taip atvirai išpažįsti savo tikėjimą.“`,
      },
      it: {
        top: `Trovare un modo naturale per far sapere ai tuoi colleghi che sei un cristiano all'inizio dei rapporti stabilisce il contesto per altre cose che dirai, farai e mostra il posto importante che la fede occupa nella tua vita.`,
        steps: `Tieni presente che non devi essere perfetto per essere un cristiano. Stai semplicemente dicendo che credi in Gesù e stai cercando di seguirlo. Le persone reagiranno meglio nei confronti di una persona umile piuttosto che una "brava persona".
          \nPensa a dei semplici modi per iniziare questa conversazione. Sii positivo e menziona le attività in cui sei coinvolto, non un elenco di cose che "non fai".`,
        example: `Recentemente Matteo ha iniziato il suo lavoro di "sogno" come consulente tecnico in una produzione televisiva. È stato felice di trovare un cast e una compagnia amichevoli. Un giorno, alla fine del turno di lavoro, diversi colleghi hanno iniziato a parlare dei loro progetti per la serata. Matteo era riluttante a dire al gruppo che quella sera stava andando a studiare con un piccolo gruppo biblico per paura di essere etichettato come 'strano', ma decise di dirlo comunque. Una donna chiese se fosse religioso e Matteo rispose che in realtà era solo qualcuno che seguiva Gesù. Sorprendentemente la maggior parte non sembrava così a disagio come Matteo aveva temuto. Ciò aumentò il suo desiderio di vivere per Cristo al lavoro.`,
      },
      ptPT: {
        top: `Encontrar formas naturais de dizer aos teus colegas que és cristão no início da vossa relação, prepara o contexto para outras coisas que vais dizer e fazer e mostra o lugar importante que a tua fé ocupa na tua vida.`,
        steps: `Lembra-te que não precisas de ser perfeito para ser um cristão. Estás simplesmente a dizer que acreditas em Jesus e que estás a tentar segui-lo. As pessoas vão lidar melhor com uma pessoa humilde do que com uma "boa pessoa".
          \nPensa em formas fáceis de trazer isso à conversa. Sê positivo e menciona atividades em que estás envolvido, ao invés de mencionar uma lista de coisas que não podes fazer.`,
        example: `A Inês conseguiu o seu emprego de sonho como produtora num canal televisivo. Ela ficou feliz por ver que o elenco e equipa com quem ia trabalhar eram simpáticos. No final de um dia, algumas pessoas começaram a falar sobre os seus planos para essa noite. A Inês estava com receio de mencionar que ia a um estudo bíblico nessa noite porque não queria ser considerada estranha, mas decidiu falar disso naturalmente. Uma colega perguntou se ela era religiosa e a Inês disse que, na realidade, ela era apenas alguém que seguia Jesus. Surpreendentemente, a maioria não pareceu tão desconfortável como a Inês tinha temido. Isto aumentou o seu desejo de viver para Cristo no trabalho.`,
      },
    },
  },
  card11: {
    frontText: {
      en: [
        { text: 'Building a', isBold: false },
        { text: 'Friendship', isBold: true },
      ],

      lt: [
        { text: 'Užmegzti draugiškus', isBold: false },
        { text: 'santykius', isBold: true },
      ],
      it: [
        { text: 'Costruire', isBold: false },
        { text: "un'Amicizia", isBold: true },
      ],
      ptPT: [
        { text: 'Construir a', isBold: false },
        { text: 'uma Amizade', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `Jesus gave us the example for building relationships with non-Christians. As we develop relationships with individuals at our workplaces we have more opportunities to demonstrate God’s love to them.`,
        steps: `Think of your most positive work relationships, whether currently or in a past job. What things contributed to those good relationships?
          \nIdentify relationships at work you would like to put more effort into developing. List several simple actions you could take to build those relationships.`,
        example: `James wants to build friendships at his new job in a large media corporation. He has gotten to know Tom from another team and discovered that he has a passion for social justice. Tom suggested a book on the subject to James, and as he read it he would ask Tom questions and they would discuss the themes of the book. James has now suggested a Christian book to Tom and they have begun to discuss that together. The two have gotten to know each other better through this process and the relationship has now grown to social interactions outside of work.`,
      },

      lt: {
        top: `Jėzus mums parodė pavyzdį, kaip užmegzti santykius su netikinčiaisiais. Kai susidraugaujame su savo bendradarbiais, galime jiems dažniau parodyti Dievo meilę.`,
        steps: `Prisiminkite, kokie buvo artimiausi santykiai, kuriuos Jums pavyko užmegzti darbo aplinkoje. Kodėl būtent tie darbo santykiai išaugo į draugystę?
          \nApgalvokite, su kuriais kolegomis norėtumėte daugiau susipažinti ir nuoširdžiau bendrauti. Užrašykite keletą paprastų veiksmų, kurie padėtų labiau susidraugauti su pasirinktais žmonėmis.`,
        example: `Jokūbas dirba didelėje medijų korporacijoje ir nori susidraugauti su savo kolegomis. Jis susipažino su Tomu iš kitos komandos ir sužinojo, kad šis domisi socialiniu teisingumu. Tomas pasiūlė Jokūbui knygą šia tema, o šis skaitant iškylančius klausimus užduodavo Tomui. Taip jie kartu aptarė knygoje aprašomas temas. Vėliau Jokūbas Tomui pasiūlė krikščionišką knygą ir jie taip pat pradėjo kartu apie ją diskutuoti. Šio proceso metu abu vaikinai artimai susipažino ir ėmė bendrauti ir už darbovietės ribų. `,
      },
      it: {
        top: `Gesù ci ha fornito l'esempio per costruire amicizie con i non cristiani. Quando sviluppiamo relazioni con le persone sul posto di lavoro, abbiamo più opportunità di dimostrare loro l'amore di Dio.`,
        steps: `Pensa ai rapporti più positivi con le persone di lavoro, adesso o in passato. Quali aspetti hanno contribuito a quelle buone relazioni?
          \nIdentifica le amicizie sul lavoro in cui desideri dedicare più impegno allo sviluppo. Elenca diverse semplici azioni che potresti intraprendere per costruire tali relazioni.`,
        example: `Giosuè vuole costruire amicizie nel suo nuovo lavoro in una grande azienda che si occupa di mass media. Ha conosciuto Andrea che fa parte di un altro team e che ha una passione per la giustizia sociale. Andrea ha suggerito a Giosuè un libro su questo argomento, e mentre Giosuè lo leggeva, faceva alcune domande a Andrea e discuteva le tematiche del libro. Giosuè suggerì un libro cristiano a Andrea e cominciarono a discuterne insieme. I due si sono conosciuti meglio attraverso questo processo e l'amicizia ora è cresciuta fino a continuare anche al di fuori del lavoro.`,
      },
      ptPT: {
        top: `Jesus deu-nos o exemplo de construir relacionamentos com pessoas não cristãs. À medida que desenvolvemos relacionamentos com pessoas no nosso local de trabalho, temos mais oportunidades de mostrar o amor de Deus por eles.`,
        steps: `Pensa nos teus relacionamentos mais positivos no trabalho (atualmente ou no passado). O que contribuiu para esses bons relacionamentos?
          \nIdentifica relacionamentos no teu trabalho nos quais gostarias de investir mais. Faz uma lista de várias ações simples que podem ser úteis para construir esses relacionamentos.`,
        example: `O Tiago quer construir amizades no seu novo trabalho numa grande empresa de comunicação social. Ele conheceu o Tomás, que faz parte de outra equipa, e descobriu que ele tem uma grande paixão por justiça social. O Tomás sugeriu ao Tiago um livro sobre o assunto, e à medida que ele ia lendo, ia fazendo perguntas ao Tomás e iam discutindo os temas do livro. Agora, o Tiago sugeriu um livro cristão ao Tomás e eles começaram a discutir esse livro. Os dois conheceram-se melhor através deste processo e a amizade cresceu agora para interações sociais fora do local de trabalho.`,
      },
    },
  },
  card12: {
    frontText: {
      en: [
        { text: 'Sharing your', isBold: false },
        { text: 'Story', isBold: true },
      ],

      lt: [
        { text: 'Papasakoti savo', isBold: false },
        { text: 'istoriją', isBold: true },
      ],
      it: [
        { text: 'Condividere la', isBold: false },
        { text: 'Propria Storia', isBold: true },
      ],
      ptPT: [
        { text: 'Partilhar a tua', isBold: false },
        { text: 'História', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `Your personal experience of seeing God change your life can speak powerfully to others.`,
        steps: `Write out your story of meeting Jesus (3 minutes or less) and commit it to memory. Practice telling your story with one of the group members.
          \nThink of incidents or themes in your life where faith has played a major role. Discuss with the group ways these could be related to situations at work.`,
        example: `Ruth and Mara work together at a design firm. As the two have become friends they are sharing more openly with each other and Ruth senses that Mara has some interest in spiritual things. While discussing romantic relationships, Ruth confided in Mara about a heartbreak and how she struggled with trust for some time. Ruth also shared how her relationship with Jesus helped her to learn about true trustworthiness. This has sparked Mara’s interest in learning more about Jesus.`,
      },

      lt: {
        top: `Asmeninė patirtis apie tai, kaip Dievas keičia Jūsų gyvenimą, gali sujaudinti žmonių širdis. `,
        steps: `Parašykite istoriją, kaip pažinote Jėzų, ir išmokite ją mintinai. Pasipraktikuokite pasakodamas (-a) ją vienam iš grupės narių. Jūsų istorija turėtų trukti ne daugiau nei tris minutes.
          \nPrisiminkite situacijas arba temas, kurios dažnai aptariamos darbe (pvz., stresas, pinigai) ir į kurias  Jūsų tikėjimas padėjo pažvelgti kitu kampu. Kaip galėtumėte šį pokytį paaiškinti savo bendradarbiams?`,
        example: `Rūta ir Marija kartu dirba dizaino įmonėje. Kai jos susidraugavo ir ėmė viena su kita atviriau kalbėtis, Rūta pastebėjo, kad Mariją domina dvasiniai dalykai. Kartą jos aptarinėjo romantinius santykius. Rūta atsivėrė ir papasakojo Marijai, kaip vienas vaikinas ją įskaudino ir kaip santykiai su Jėzumi padėjo jam atleisti. Mariją sujaudino Rūtos atvirumas, todėl jos pratęsė pokalbį apie tikėjimą ir atleidimą.`,
      },
      it: {
        top: `La tua esperienza personale di Dio che cambia la tua vita può parlare in modo potente agli altri.`,
        steps: `Trascrivi la tua storia di come hai incontrato Gesù (per una durata di 3 minuti o meno) e memorizzala. Esercitati a raccontare la tua storia con uno dei membri del gruppo.
          \nPensa agli inconvenienti o alle situazioni della tua vita in cui la fede ha avuto un ruolo importante. Discuti con il gruppo i modi in cui queste situazioni si sono presentati in contesti lavorativi.`,
        example: `Claudia e Mara lavorano insieme in un'azienda di design. Da quando sono diventati amici, condividono più apertamente l'uno con l'altro e Claudia sente che Mara ha un certo interesse per le cose spirituali. Mentre parlava di relazioni romantiche, Claudia confidò a Mara un dolore straziante che le è capitato e di come trovasse difficoltà a fidarsi per molto tempo. Claudia condivise anche di come la sua relazione con Gesù l'abbia aiutata a conoscere la vera fiducia. Ciò ha stimolato l'interesse di Mara a imparare di più su Gesù.`,
      },
      ptPT: {
        top: `A tua experiência pessoal de ver Deus mudar a tua vida pode falar a outras pessoas de forma poderosa.`,
        steps: `Escreve a tua história sobre conhecer Jesus (máximo 3 minutos) e memoriza-a. Pratica contar a história com um dos membros do grupo.
          \nPensa em incidentes na tua vida em que a fé foi muito importante. Discute com o grupo formas de contar estas histórias no trabalho.`,
        example: `A Rute e a Márcia trabalham juntas numa empresa de design. À medida que se tornaram amigas, têm falado mais abertamente e a Rute acha que a Márcia tem algum interesse em coisas espirituais. Enquanto falavam sobre relações amorosas, a Rute contou à Márcia sobre quando teve um desgosto amoroso e como lutou com problemas de confiança durante algum tempo. A Rute também partilhou sobre como o seu relacionamento com Jesus a ajudou a aprender sobre verdadeira fidelidade. Isto criou um interesse maior na Márcia em aprender mais sobre Jesus.`,
      },
    },
  },
};
