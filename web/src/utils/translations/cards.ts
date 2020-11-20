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
      ['pt-PT']: [
        { text: 'Partilhar', isBold: false },
        { text: 'o Evangelho', isBold: true },
      ],
      ['es']: [
        { text: 'Compartir', isBold: false },
        { text: 'el Evangelio', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Fazer o evangelho', isBold: false },
        { text: 'relevante no', isBold: false },
        { text: 'trabalho e na vida', isBold: false },
      ],
      ['zh-CN']: [{ text: '分享福音', isBold: false }],
      ['ar']: [
        { text: 'ُممشاركة رسالة', isBold: true },
        { text: 'الإنجيل', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `We know that the gospel is powerful. Sharing the gospel message usually involves knowing how to explain it in a clear and concise way.`,
        steps: `Consider having a tool (perhaps an outline or tract) that clearly outlines the gospel. Make sure you are very familiar with how to use the outline.
          \nHave a picture that you can draw (on a napkin or scrap of paper) that helps explain how someone can know Jesus personally
          \nMemorize one or two Bible verses that clearly explain how someone invites Christ into their life.
          \nNeed extra help: See the “For More Information” card for helpful tools.`,
        example: `Anya has had many conversations with her friend Maria over the last year about Anya’s faith. Maria’s questions were simple and usually about Anya’s choices or behavior, but recently they have become deeper. One afternoon over coffee Anya sensed God’s urging that it was time to ask Maria if she wanted to know this Jesus personally. Anya was thankful that she had practiced using a simple outline she had learned at her church and that she could use a napkin to draw a picture that was very clear to Maria. Maria wants to think about what Anya shared and talk again soon.`,
      },
      lt: {
        top: `Mes žinome, kad Evangelijos žinia yra galinga. Kai dalinamės Evangelija, svarbu šią žinią perteikti aiškiai ir glaustai.`,
        steps: `Atraskite, kaip Jums lengviausia ir natūraliausia dalintis Evangelijos žinia. Galbūt Jūs aiškiausiai Evangeliją perteikiate kalbėdamas (-a), gal piešdamas (-a) diagramą, o gal tiesiog samprotaudamas (-a).
        \nIšmokite mintinai vieną arba dvi Biblijos ištraukas, kurios paprastai paaiškina, kaip žmogus gali pakviesti Kristų į savo gyvenimą.`,
        example: `Julija ir Edita – buvusios bendradarbės, kurios darbo metu trumpam susitiko papietauti. Edita norėjo papasakoti Julijai, kaip pasikeitė jos gyvenimas, tapus krikščione. Bekalbėdama, ji suvokė, kad dabar yra gera proga ne tik pasakyti, ką Jėzus atliko jos gyvenime, bet ir papasakoti Julijai apie patį Jėzų ir Jo atliktą auką. Taigi ji ėmė pasakoti apie Jėzų, Jo mirtį ir prisikėlimą. `,
      },
      it: {
        top: `Sappiamo che il vangelo è potente. Condividere il messaggio del vangelo di solito implica saperlo spiegare in un modo chiaro e conciso.`,
        steps: `Considera avere uno schema (forse un abbozzo o un libretto) che chiaramente spiega il vangelo. Utilizza un'immagine che puoi disegnare (su un tovagliolo o un pezzo di carta) che aiuti a spiegare come uno può conoscere personalmente Gesù. Memorizza uno o due versetti della bibbia che spiegano chiaramente come invitare Cristo nella propria vita. Hai bisogno di ulteriore aiuto: Consulta il bigliettino "Ulteriori informazioni" per altri strumenti utili.`,
        example: `Nell'ultimo anno Sara ha avuto tante conversazioni con la sua amica Maria in merito alla propria fede. Le domande di Maria erano semplici e solitamente basate sulle scelte o sul comportamento di Sara, ma recentemente le domande sono diventate più profonde. Un pomeriggio, mentre prendevano il caffè, Sara sentì l'esortazione da parte di Dio a chiedere a Maria se conoscesse personalmente Gesù. Sara era riconoscente di aver utilizzato ripetutamente un semplice schema appreso nella sua chiesa e quindi usò un tovagliolo per disegnare un'immagine che fosse molto chiara per Maria. Così Maria volle riflettere su ciò che Sara aveva condiviso e riparlarci a breve.`,
      },
      ['pt-PT']: {
        top: `Nós sabemos que o evangelho é poderoso. Partilhar o evangelho envolve saber explicá-lo de forma clara e concisa.`,
        steps: `Pensa sobre ter uma ferramenta (talvez um resumo) que explique o Evangelho claramente. Pensa numa imagem que possas desenhar (num guardanapo ou pedaço de papel) que te ajude a explicar como alguém pode conhecer Jesus pessoalmente. Memoriza um ou dois versículos da Bíblia que expliquem claramente como convidar Jesus para a nossa vida. Se precisares de mais ajuda: Encontra ajudas úteis na carta "Mais Informações"`,
        example: `No último ano, a Ana tem tido muitas conversas com a Maria sobre a sua fé. As perguntas da Maria eram simples e, geralmente, sobre as escolhas e comportamentos da Ana. Mas, mais recentemente, as suas perguntas têm-se tornado mais profundas. Uma tarde, durante um café, a Ana sentiu Deus a dizer-lhe que estava na altura de perguntar à Maria se ela queria conhecer Jesus pessoalmente. A Ana ficou grata por ter praticado uma forma de explicar o evangelho que tinha aprendido na igreja, em que podia usar um guardanapo para fazer um desenho que era claro para a Maria. A Maria quer pensar mais sobre o que a Ana partilhou e depois voltar a falar sobre isso.`,
      },
      ['es']: {
        top: `Sabemos que el evangelio es poderoso. Compartir el mensaje del evangelio generalmente implica saber cómo explicarlo de una manera clara y concisa.`,
        steps: `Encuentra una manera de explicar el evangelio que sea natural para tí. Podría ser a través de palabras, diagramas o utilizando algún material impreso.
          \nMemoriza uno o dos versículos de la Biblia que claramente explican cómo alguien invita a Cristo a su vida.`,
        example: `Julia y Andrea eran colegas en la misma oficina. Se reunían durante el receso del almuerzo en la jornada de trabajo. Andrea quería compartir su testimonio con Julia contándole cómo su vida había sido transformada desde que se hizo cristiana. A medio relato, se dió cuenta que esta era la manera más natural para compartir con Julia quién era Jesús y lo que había hecho para ella y para toda la humanidad. Así que comenzó compartiéndole cómo era Jesús, sobre su vida y resurrección y cómo había comenzado una relación personal con él que cambió completamente su vida.`,
      },
      ['pt-BR']: {
        top: `A vida, a morte e ressurreição de Jesus são mais que um feito histórico, têm relevância para cada parte de nossas vidas. Podemos mostras essa relevância a nossos colegas não cristãos e ajudá-los a ver o impacto de Cristo em nossas vidas.`,
        steps: `Faça um chuva de ideias sobre os temas que surgem frequentemente em seu lugar de trabalho onde poderiam estabelecer uma conexão com a obra de Deus no mundo e em sua vida pessoal.
          \nPense em um exemplo recente que poderia ter relacionado sua fé com um comentário de seus colegas, mas não o fez. Em lugar de se sentir culpado ou arrependido, use esse exemplo como uma oportunidade para pensar como poderia responder da próxima vez.`,
        example: `Elizabeth trabalha em um ambiente de alto estresse. Ela e seus colegas conversam bastante. Elizabeth perguntou aos demais como eles lidavam com
        o estresse. Quando perguntaram a ela, ela respondeu que lançava a tensão sobre Jesus, que disse que acabaria com a tensão porque cuida de nós. Uma colega respondeu que nunca havia pensado em entregar algo a Deus antes.`,
      },
      ['zh-CN']: {
        top: `我們知道福音本身是大有能力的。當向未信朋友分享福音時，我們需要學習如何以精簡而 清晰的方式把福音內容闡明`,
        steps: `• 學習使用一套能夠清晰地解說福音概要的工具(例如大綱圖表或小冊子)，並學習熟練地 運用此工具。
          \n• 在腦海中牢記一幅有關福音內容及如何認識耶穌的簡單圖像，以便你可以隨時隨地透過畫出 圖像向未信者解釋福音。
          \n• 背誦一至兩節關於怎樣邀請基督進入生命讓祂成為救主的聖經經文。
          \n• 【如需更多有關分享福音的協助，請看「更多資訊」一卡的內容。】`,
        example: `過去一年，Thomas 跟他的朋友 Chris 有過幾次淺談信仰的機會，在傾談過程裏 Chris 通常會簡單地詢問 Thomas 在做某些決定或行為背後的原因。直到最近，Chris 開始發問一些更深入的信仰問題。一天 下午當他們一起吃下午茶的時候，Thomas 感受到神的帶領，覺得是時候直接了解 Chris 會否希望認識 耶穌。Thomas 慶幸他曾在教會學習怎樣扼要地向人分享福音，於是他把福音概要以圖像畫在檯上的 一張紙餐巾上並與 Chris 分享。Chris 聽後表示希望認真思考Thomas 所分享的內容，並打算再約他討論
        更多有關福音的事情。`,
      },
      ['ar']: {
        top: `نعلم أن رسالة الإنجيل ف ّعالة، وعاد ًة ما تتض ّمن مشاركة رسالة الإنجيل معرفة كيف ّية شرحها￼￼￼￼￼ بطريقٍةواضحٍةوموجزٍة.`,
        steps: `ف ِّكر مل ًّيا في الاستعانة بأداة (مثل ُمل َّخص أو ُنبذة) ُتوجز رسالة الإنجيل بوضوح، وتأ َّكد ِمن أ ّنك على دراي ٍة￼￼
        ٍ
        تا ّم ٍة بكيف ّية استخدامها.
        ض ْع في ذهنك صورة ُيمكنك رسمها (على مندي ٍل أو قصاص ٍة ِمن الورق) ل ُتساعد في شرح كيف ُيمكن لشخ ٍص ما معرفة ال ّرب يسوع معرف ًة شخصي ًة.
        احف ْظ آي ًة أو اثن َت ْين ِمن آيات الكتاب ال ُمق ّدس تشرح بوضوح كيف ُيمكن لشخ ٍص ما أن يدعو المسيح إلى حياته.
        ٍ
        للمزيدِمنالمساعدة:راجْعبطاقة«المزيٍدمنالمعلومات»ِمنأجلالحصولعلىأدواٍتمفيدٍة.`,
        example: `أجرت «آنيا» الكثير ِمن المحادثات مع صديقتها «ماريا» خلال العام الماضي حول إيمان «آنيا». وكانت￼
        أسئلة «ماريا» بسيط ًة وتدور عاد ًة حول اختيارات «آنيا» وسلوكها، لكن ُمؤ ّخ ًرا تع َّم َق َتا في حديثهما م ًعا.
        ّ
        وفي ذات مساء في أثناء احتسائهما القهوة، شعرت «آنيا» أ ّن الله يحثها أن هذا هو الوقت ال ُمناسب لسؤال
        «ماريا» إذا كانت تريد معرفة يسوع معرفة شخص ّية. كانت «آنيا» ممت ّن ًة لأ ّنها تد َّربت على استخدام
        َّّّ ُملخ ٍص بسي ٍط تعلمته في كنيستها. ولأنها كانت تستطيع استخدام المنديل في رسم صورة كانت واضحة
        ج ًّدا لـ«ماريا» التي أرادت أن ُتف ّكر في ما شاركته «آنيا» معها وأن تتح َّدث م ّرة أخرى قري ًبا.`,
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
      ['pt-PT']: [
        { text: 'Tornar o Evangelho', isBold: false },
        { text: 'Relevante para o', isBold: true },
        { text: 'Trabalho e para a Vida', isBold: false },
      ],
      ['es']: [
        { text: 'Hacer el evangelio', isBold: false },
        { text: 'relevante', isBold: true },
        { text: 'al trabajo y la vida', isBold: false },
      ],
      ['pt-BR']: [
        { text: 'Contar a eles que', isBold: false },
        { text: 'você é cristão', isBold: true },
      ],
      ['zh-CN']: [
        { text: '把福音與你的', isBold: false },
        { text: '工作和生活', isBold: false },
        { text: '連上關係', isBold: false },
      ],
      ['ar']: [
        { text: 'ربط رسالة الإنجيل', isBold: true },
        { text: 'بالعمل والحياة', isBold: true },
      ],
    },
    backText: {
      en: {
        top: `Jesus life, death and resurrection are more than just historical fact, they have relevance to every part of our lives. We can show this relevance to our non-Christian colleagues and help them to see Christ’s impact on our lives.`,
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
      ['pt-PT']: {
        top: `A vida, morte e ressurreição de Jesus são mais do que factos históricos. Elas são relevantes para todas as áreas da nossa vida. Nós podemos mostrar esta relevância aos nossos colegas não cristãos e ajudá-los a ver o impacto de Cristo nas nossas vidas.`,
        steps: `Pensa em assuntos de conversa que surgem no teu local de trabalho e como podes conectá-los ao que Deus está a fazer no mundo ou na tua vida.
        \nPensa numa situação recente em que poderias ter relacionado a tua fé com um comentário que um colega fez, mas não o fizeste. Em vez de sentires culpa ou ressentimento, usa esse exemplo como uma oportunidade para pensar como podes responder da próxima vez.`,
        example: `A Elizabete trabalha num ambiente com um alto nível de stress. Ela e os seus colegas discutem frequentemente. A Elizabete perguntou aos outros como é que eles lidam com isso. Quando eles lhe perguntaram o mesmo, ela disse que entrega o stress a Jesus, o qual tira o nosso stress porque se preocupa connosco. Uma colega comentou que nunca tinha pensado em entregar algo a Deus.`,
      },
      ['es']: {
        top: `La vida, muerte y resurrección de Jesús son más que hechos históricos, tienen relevancia para cada parte de nuestras vidas.
        \nPodemos mostrar esta relevancia a nuestros colegas no cristianos y ayudarles a ver el impacto de Cristo en nuestras vidas.`,
        steps: `Hagan una lluvia de ideas sobre los temas que a menudo surgen en su lugar de trabajo donde podría establecer una conexión con la obra de Dios en el mundo o en su vida personal.
        \nPiensen en un ejemplo reciente en el que pudieron haber relacionado su fe con algún comentario de sus colegas, pero no lo hicieron. En lugar de sentirse culpables o apenados, usen ese ejemplo como una oportunidad para pensar cómo podrían responder la próxima vez.`,
        example: `Elizabeth trabaja en un ambiente de alto estrés. Ella y sus colegas hablan de esto a menudo. Elizabeth le preguntó a los demás cómo lidiaban con ello. Cuando le preguntaron a ella, les dijo que entregaba la tensión a Jesús, quien dijo que nos la quitaría porque nos cuida. Una colega respondió que nunca antes había pensado en entregar algo así a Dios.`,
      },
      ['pt-BR']: {
        top: `Encontre uma maneira natural para que seus colegas saibam que você é cristão desde o começo de sua relação, isto estabelece o contexto para outras coisas que você vai dizer e fazer e dessa
        maneira também mostra o lugar importante que a fé tem em sua vida.`,
        steps: `Tenha em mente que você não tem que ser perfeito para ser cristão. Simplesmente está dizendo que crê em Jesus e está tratando de segui-lo. As pessoas responderão melhor a uma pessoas humilde que a uma “boa pessoa”.
        \nPense em formas fáceis de representar isso. Seja positivo e mencione as atividades nas quais está envolvido e não uma lista de coisas que “não pode fazer”.`,
        example: `Ian recentemente alcansou sua posição “dos sonhos” como assessor técnico em uma produção de televisão. Ele tem estado contente pois tem encontrado um elenco e uma equipe amistosa. Um dia, ao final do trabalho vários colegas começaram a falar sobre seus planos para a noite. Ian não se atrevia a dizer-lhes que ia a um pequeno grupo de estudo bíblico essa noite por medo de ser etiquetado de estranho, mas decidiu menciona-lo como algo natural. Uma mulher lhe perguntou se era religioso e Ian respondeu que na realidade , ele era simplesmente alguém que seguia a Jesus. Surpreendente, a maioria não parecia tão incomodada como Ian havia temido. Isso tem impulsionado seu desejo de viver para Cristo no trabalho.`,
      },
      ['zh-CN']: {
        top: `耶穌的生活、死亡與復活不只是歷史事實而已，這些跟我們今日生活的每一部分都有着 密切的關係。我們可以讓未信朋友看見信仰與我們日常生活的關係，以及基督如何具體地 影響我們的生活。`,
        steps: `• 在小組中一同探索，在你的工作處境裏有否一些經常討論的話題或經常出現的情況，讓你 有機會把信仰和你的日常生活連上關係。
        \n• 試回想一次最近的經歷，是你本來可以以信仰的原則或價值觀去回答某位同事的評語的， 但你當時沒有這樣做。假如類似情景再發生，你的回應會有甚麼不同?`,
        example: `Emily 在一個壓力非常大的環境工作。她和同事們經常會談及這問題，她也會問她們如何紓緩工作 壓力。當同事們詢問 Emily 如何面對這問題時，Emily 回答說她會嘗試把她的壓力和擔憂交托給耶穌， 因為耶穌看顧她並有能力承擔她的壓力。一位同事聽後表示，她可從來沒有想過原來可以把困難
        交托給神。`,
      },
      ['ar']: {
        top: `حياة يسوع وموته وقيامته أكثر ِمن ُمج ّرد حقيقة تاريخية وقد صارت ُمرتبط ًة بك ّل جز ٍء ِمن￼￼￼￼￼ حياتنا. ُيمكننا عرض هذا الارتباط وال ّصلة على زملائنا غير المسيح ّيين و ُمساعدتهم على رؤية تأثير المسيح على حياتنا.`,
        steps: `ُيمكنكم الاستعانة بالعصف الذهني في الموضوعات التي كثي ًرا ما تظهر في مكان عملك والتي￼ ُيمكنك ربطها بعمل الله في العالم أو في حياتك شخصًّيا.
        ف ِّكر في مثا ٍل حدي ٍث كان ُيمكنك فيه أن تربط إيمانك بأحد التعليقات ِمن زملائك لك ّنك لم تفعل ذلك. وبد ًلا ِمن ال ّشعور بال ّذنب أو الندم، استخد ْم هذا المثال كفرص ٍة للتفكير في كيف ّية الر ّد المرة القادمة.`,
        example: `تعمل «إليزابيث» في بيئة شديدة ال ّضغط وكثي ًرا ما ناقشت هذا مع زملائها. سألت￼ «إليزابيث» الآخرين عن كيفّية تعاملهم مع الأمر، وعندما أعادوا عليها السؤال نفسه، أخبرتهم بأ ّنها ُتلقي ال ّضغط على يسوع الذي قال إ ّنه سيحمل أتعابنا لأ ّنه يعتني بنا، فأجابت إحدى زميلاتها بأ ّنها لم ُتف ّكر قط في تسليم شي ٍء ما لله ِمن قبل.`,
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
      ['pt-PT']: [
        { text: 'Convidá-los para', isBold: false },
        { text: 'Comunidade Cristã', isBold: true },
      ],
      ['es']: [
        { text: 'Invitarlos a una', isBold: false },
        { text: 'comunidad', isBold: true },
        { text: 'cristiana', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Convidá-los a uma', isBold: false },
        { text: 'comunidade cristã', isBold: true },
      ],
      ['zh-CN']: [
        { text: '邀請他們到', isBold: false },
        { text: '基督信仰的群體', isBold: false },
      ],
      ['ar']: [
        { text: 'دعوتهم إلى المجتمع', isBold: true },
        { text: 'المسيحي', isBold: true },
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
      ['pt-PT']: {
        top: `Ver o amor que existe numa comunidade cristã e ver o que Deus faz na vida de outras pessoas pode ter uma forte influência em amigos e colegas não cristãos.`,
        steps: `Há atividades na tua vida para as quais poderias convidar alguém não cristão permitindo que essa pessoa conhecesse outros cristãos?
          \nConvidar pessoas não cristãs para ir à igreja pode ser uma boa forma de os expor à comunidade cristã.
          \nSe eles não quiserem ir à igreja, há eventos sociais que poderias organizar ou para os quais os poderias convidar? Podem ser eventos simples e tão grandes ou tão pequenos como achares apropriado.`,
        example: `O André e vários amigos da igreja gostam de andar de bicicleta nos fins-de-semana. O André descobriu que um dos seus sócios no trabalho, o Bernardo, gosta muito de ciclismo. Então, o André convidou o Bernardo para se juntar ao grupo num fim-de-semana. O Bernardo não é cristão e não conhecia muitos cristãos, mas gostou de passar tempo com este grupo e quer voltar a fazê-lo.`,
      },
      ['es']: {
        top: `Ver el amor que existe en una comunidad cristiana y cómo Dios actúa en la vida de sus miembros puede tener una poderosa influencia en los amigos y colegas no cristianos.`,
        steps: `¿Existen actividades en tu vida a las cuales podrías invitar a un no-cristiano que le permitiría conocer a otros cristianos?
        \nInvitar a los no cristianos a una comunidad misional puede ser una buena manera de exponerlos a la comunidad cristiana.
        \nSi no vienen a la comunidad, ¿habrían eventos sociales que tu podrías organizar para invitarlos? Estos podrían ser tan grandes o pequeños como creas que sea apropiado.`,
        example: `Mauri y algunos de los amigos de su comunidad misional les gusta andar juntos en bicicleta los fines de semana. Mauri se enteró de que Armando, uno de sus colegas en el trabajo, también practica el ciclismo, por lo que Mauri lo invitó a unirse al grupo en una de sus jornadas de fin de semana. Armando no es un cristiano y no había tenido contacto con muchos cristianos, pero le gustó salir con este grupo de amigos y decidió pasar más tiempo con ellos.`,
      },
      ['pt-BR']: {
        top: `Ver o amor que existe em uma comunidade cristã e ver a obra de Deus nos demais pode ter uma poderosa influencia nos amigos e colegas não cristãos.`,
        steps: `Existem atividades em sua vida que você poderia convidar a um não cristão que permitam que ele conheça outros cristãos?
        \nConvidar aos não cristãos a igreja pode ser uma boa maneira de expô-los a comunidade cristã.
        \nSe eles não vão a igreja, há eventos sociais que você poderia organizar ou convidá-los a fazê-lo? Esses eventos podem ser simples e tão grandes ou pequenos como você creia que seja apropriado.`,
        example: `Hans e vários de seus amigos da igreja gostam de andar de bicicleta juntos nos finais de semana. Hans soube que um de seus associados/parceiros do trabalho, Benni, realmente desfruta/gosta de andar de bicicleta, então Hans o convidou a unir-se ao grupo em um de seus passeios no fim de semana. Benni não é um cristão e não havia conhecido a muitos cristãos antes, mas ele gostou de sair com esse grupo de rapazes e quer passar mais tempo com eles.`,
      },
      ['zh-CN']: {
        top: `假如未信朋友和同事能夠在一個基督信仰的群體中感受到愛及看見神在信徒生命中的工作， 這將對他們產生極大的影響力。`,
        steps: `• 你能否邀請未信朋友或同事參加一些你現時恆常參與的活動、小組或聚會，以致他們有機會 認識其他基督徒?
        \n• 邀請未信者去教會可以是一個好方法，讓他們接觸基督信仰的群體。
        \n• 假如他們暫時對教會較為抗拒，你能否嘗試組織或邀請他們參加其他性質較輕鬆的社交活動? 這些活動可以很簡單，規模可大可小，視乎你認為甚麼對他們最為合適。`,
        example: `Jessica 喜歡和她教會的弟兄姊妹一起在週末到郊外騎單車。當她知道她的同事 Rebecca 也喜歡 騎單車之後，她便嘗試邀請 Rebecca 一同參與她們的活動。縱然 Rebecca 仍未信主，也不是接觸過 很多基督徒，她卻十分享受跟 Jessica 和她的教會朋友一同騎單車的時間，並很樂意將來繼續花時間與她們在一起。`,
      },
      ['ar']: {
        top: `رؤية ال ُحب الموجود في المجتمع المسيحي ورؤية عمل الله في الآخرين ُيمكن أن يكون لهما￼￼￼￼￼ تأثير ف َّعال على الأصدقاء والزملاء غير المسيح ّيين.`,
        steps: `هل توجد أنشط ٌة في حيا ِتك ُيمكنك دعوة شخ ٍص غير مسيحي إليها وتسمح له بمقابلة مسيح ّيين￼ آخرين؟
        دعوة غير المسيح ّيين إلى الكنيسة ُيمكن أن تكون طريق ًة ج ّيد ًة لتقديمهم إلى المجتمع المسيحي. إن لم يحضروا إلى الكنيسة، هل توجد مناسبات اجتماعية ُيمكنك تنظيمها أو دعوتهم إليها؟ ُيمكنها أن تكون بسيط ًة أو كبير ًة أو صغير ًة حسب ما تراه مناس ًبا.`,
        example: `يح ّب «هانز» والعديد ِمن أصدقائه في الكنيسة ركوب الد ّراجات م ًعا في عطلات نهاية الأسبوع.￼ وعرف «هانز» أن أحد زملائه في العمل، ُيدعى «بيني»، يستمتع للغاية بركوب الد ّراجات، لذا دعا «هانز» زميله «بيني» إلى الانضمام للمجموعة في إحدى جولاتهم الأسبوعية بالد ّراجة. على الرغم ِمن أن «بيني» ليس مسيح ًّيا ولم يلتق كثي ًرا ِمن المسيح ّيين ِمن قبل فإ ّنه استمتع
        ِ
        بالخروج مع هذه المجموعة ِمن الشباب وكان يرغب في قضاء المزيد ِمن الوقت معهم.`,
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
      ['pt-PT']: [
        { text: 'Ganhar Confiança de Falar', isBold: false },
        { text: 'Abertamente Sobre a', isBold: true },
        { text: 'Vida da Pessoa', isBold: false },
      ],
      ['es']: [
        { text: 'Ganar la confianza y', isBold: false },
        { text: 'el derecho de hablar', isBold: false },
        { text: 'a la vida de alguien', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Ganhar confiança e', isBold: false },
        { text: 'o direito de falar na', isBold: false },
        { text: 'vida de alguém', isBold: true },
      ],
      ['zh-CN']: [
        { text: '獲得他人的', isBold: false },
        { text: '信任和准許去進入', isBold: false },
        { text: '對方的生命', isBold: false },
      ],
      ['ar']: [
        { text: 'اكتساب الثّقة وحق', isBold: true },
        { text: 'التح ُّدث إلى حياة', isBold: true },
        { text: 'شخٍصما', isBold: true },
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
      ['pt-PT']: {
        top: `Para alguém explorar assuntos espirituais connosco eles terão de sentir que podem confiar em nós. Precisamos de aprender como amar e investir em pessoas ao longo do tempo para ganhar a sua confiança.`,
        steps: `Ora por eles - Pede a Deus que te dê um coração como o dele em relação a essa pessoa e que te dê uma boa perspetiva sobre como podes estar presente para ajudá-la.
          \nAprende e escuta - Faz perguntas, ouve o que eles partilham, aprende sobre eles e sobre o que eles gostam.
          \nPassa tempo com eles - Quando possível, separa tempo para estar com eles no trabalho e procura oportunidades para passar tempo com eles fora do trabalho.
          \nSê aberto e honesto - Dispõe-te a partilhar as tuas lutas e sê vulnerável, quando apropriado.
          \nEspera - Criar confiança não acontece do dia para a noite. Sê paciente, persistente e consistente.`,
        example: `A Fernanda e o Carlos tornaram-se amigos quando começaram a ensinar na mesma escola. A Fernanda mencionou casualmente que ia à igreja e que a sua fé era importante para ela, mas o Carlos claramente não tinha interesse em falar disso. A Fernanda ficou com a impressão que o Carlos teria tido experiências negativas com cristãos no passado, que faziam com que ele estivesse mais fechado com a Fernanda. A Fernanda decidiu orar regularmente pelo Carlos e continuar a amizade. Já passou mais de um ano e a Fernanda continua a ouvir o Carlos sem julgar e a partilhar as suas próprias dificuldades. O Carlos tem ficado mais aberto e tem pedido conselhos à Fernanda.`,
      },
      ['es']: {
        top: `Para que una persona esté dispuesta a discutir temas espirituales, tendrán que confiar en nosotros. Tenemos que aprender a invertir amorosamente en las personas para que con el tiempo ganemos su confianza.`,
        steps: `Ora por ellos - Pídele a Dios te de su corazón y sabiduría por esa person para saber cómo puedes estar disponible en el momento adecuado. Aprende y escucha - Haz preguntas, escucha las cosas que comparten, descubre sus intereses.
        \nPasa tiempo con ellos – Haz tiempo para ellos en el trabajo cuando sea posible y busca formas de pasar tiempo juntos afuera del trabajo.
        \nSe abierto y honesto - Debes estar dispuesto a compartir tus propias luchas y ser vulnerable cuando sea apropiado.
        \nInvierte tiempo - desarrollar la confianza no sucede de la noche a la mañana. Se paciente, persistente y consistente.`,
        example: `A pesar de estar super ocupada en su nuevo trabajo, Natalia deliberadamente invertía tiempo con su colega Catalina. Cada día intentaba compartir sobre su vida y familia. Después de un par de meses, Catalina comenzó hacerle las mismas preguntas a Natalia, además de preguntas más profundas sobre Dios y la fe. Comenzaron a discutir las luchas que Catalina estaba teniendo con la iglesia y la religión. Aunque no compartían las mismas opiniones en todo, muy pronto Catalina comenzó a interesarse en la perspectiva de Natalia y aceptó su invitación para asistir a su comunidad misional.`,
      },
      ['pt-BR']: {
        top: `Para que alguém explore perguntas espirituais conosco, precisam sentir que podem confiar em nós. Temos que aprender a investir amorosamente nas pessoas e com tempo, para ganhar sua confiança.`,
        steps: `Ore por eles- Peça a Deus Seu coração para essa pessoa e Seus pensamentos de como pode estar alí para eles. 
        \nAprender e escutar – Faça perguntas, escute as coisas que compartilham, investigue sobre eles e seus interesses.
        \nPasse tempo com eles – Passe tempo com eles no trabalho quando for possível e busque formas de passar tempo com eles fora do trabalho.
        \nSeja aberto e honesto – Esteja disposto a compartilhar suas próprias lutas e ser vulnerável onde seja apropriado.
        \nDê tempo a seu colega – a construção da confiança não acontece da noite para o dia. Seja paciente, persistente e consistente.`,
        example: `Florencia y Cho se tornaram amigos quando começaram a ensinar na mesma escola quase ao mesmo tempo. Florencia havia feito menção ocasional de sua igreja e a importância de sua fé, mas era evidente que Cho não estava interessada em conversar sobre. Florencia percebeu que Cho talvez tivesse tido alguma experiência negativa com cristãos em seu passado que a fizeram ser pouco aberta com Florencia. Ela decidiu orar regularmente por Cho e continuar sendo sua amiga. Passou mais de um ano e Florencia continua escutando sem julgamentos a CHO, assim como compartilhando suas próprias lutas. Cho está um pouco mais aberta e também tem começado a pedir conselhos a Florencia.`,
      },
      ['zh-CN']: {
        top: `未信朋友必須先感受到我們是值得信任的，才會願意跟我們探討信仰的問題。我們必須學習 以愛心付出時間與他們相處，以致能慢慢贏得他們的信任。`,
        steps: `• 為他們禱告 祈求神讓你有憐憫對方的心腸，並有屬靈的智慧與他們建立關係。
        \n• 藉着聆聽了解對方 透過問問題及聆聽他們所分享的東西，認識他們的關注、了解他們的興趣。 • 花時間與他們相處 不論在工作時間或是下班之後，尋找機會花時間與他們在一起。
        \n• 懷着開放和坦誠的態度 在某些合適的時候，真誠地分享你自己的掙扎和軟弱。
        \n• 願意等待 建立信任不是一朝一夕就能做到，我們需要有耐性、以及一顆堅持不懈和始終如一的心。`,
        example: `自二人在同一間學校教書開始，John 和 David 便成為了朋友。John 有時會不經意地提及他的教會 生活及信仰對他的重要性，然而 David 明顯對這些不太感興趣。John 感覺到 David 過往可能跟
        一些基督徒有不愉快的相處經驗，以致有時對 John 會表現出戒心。John 決定恆常地為 David 禱告， 並繼續作他的朋友;他會經常耐心聆聽 David 的分享，也會坦誠分享自己的掙扎。一年多時間過去， John 察覺到 David 的心較以往開放了，在某些事情上更會主動尋求 John 的意見。`,
      },
      ['ar']: {
        top: `ِمن أجل أن يستكشف شخ ٌص ما الأسئلة الروحية معنا سيحتاج إلى الشعور بالثقة نحونا، لذا￼￼￼￼￼ يجب أن نتعلّم كيف نستثمر بمحّب ٍة في الناس على مدار الوقت لكسب ثقتهم.`,
        steps: ` ِّل ِمن أجله: اسأل الله عن مشيئة قلبه تجاه هذا ال ّشخص وعن رؤيته لل ّطرق التي ُيمكنك الاستعانة بها￼￼
        ِمن أجله. 
        تعلَّم وا ْصغ: اطر ْح أسئل ًة وان ِص ْت إلى الأمور التي يشاركونها واعرف عنهم وعن اهتماماتهم.
        ًًًُِْ
        اق ِض وقتا معهم: خ ِّص ْص وقتا لهم في العمل عندما يكون ُممكنا وابحث عن ط ُر ٍق لقضاء الوقت معهم
        خارج العمل.
        ُك ْن منفت ًحا وصاد ًقا: ُك ْن على استعدا ٍد ل ُمشاركة صراعاتك الشخصية وضعفك حينما يكون ذلك ملائ ًما. امنحه وق ًتا: لا ُتبنى الثقة بين عشي ٍة وضحاها، لذا ُك ْن صبو ًرا و ُمثاب ًرا وثاب ًتا.`,
        example: `صارت«فلورنس»و»تشو»صديقَتْينعندمابدأتافيالتدريسفيالمدرسةنفسهاوفيالوقتعينهتقريًبا.￼
        ً
        أشارت «فلورنس» بعفوي ٍة إلى كنيستها وأهم ّية إيمانها، لكن كان واض ًحا أ ّن «تشو» ليست ُمهت ّمة بمناقشة
        ذلك، وبالتالي شعرت «فلورنس» أ ّن «تشو» ربما م َّرت ببعض التجارب السلب ّية مع المسيح ّيين في
        ًِّ ُِّ
        ماضيها م ّما جعلها ُمتحفظة معها، فق ّررت «فلورنس» أن تصلي بانتظام ِمن أجل «تشو» وأن تستم ّر في
        ٍ
        صداق ٍة معها. وم ّر أكثر ِمن عام واستم ّرت «فلورنس» في الإصغاء إلى «تشو» دون إدان ٍة مع ُمشاركتها ٍ
        لصراعاتها الخاصة أي ًضا، فأصبحت «تشو» أكثر انفتا ًحا بل وبدأت في طلب المشورة ِمن «فلورنس».
        ￼￼`,
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
      ['pt-PT']: [
        { text: 'Abrir a Bíblia', isBold: true },
        { text: 'com o teu Colega', isBold: false },
      ],
      ['es']: [
        { text: 'Abrir la Biblia', isBold: true },
        { text: 'con tu colega', isBold: false },
      ],
      ['pt-BR']: [
        { text: 'Abrir a Bíblia com', isBold: true },
        { text: 'seu colega', isBold: false },
      ],
      ['zh-CN']: [{ text: '與同事一起看聖經', isBold: false }],
      ['ar']: [
        { text: 'افتح الكتاب الم ُمقدَّس', isBold: true },
        { text: 'مع زميلك', isBold: true },
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
      ['pt-PT']: {
        top: `Uma das melhores formas para alguém encontrar Jesus é lendo a Palavra de Deus por eles próprios.`,
        steps: `Algumas pessoas estão naturalmente curiosas acerca da Bíblia, enquanto que outros não sabem muito ou não têm muito interesse. Encontrar a oportunidade certa requer oração, sensibilidade e paciência.
          \nProcura uma oportunidade para fazer uma ponte entre um problema que tenhas enfrentado e algo que leste (ou ouviste alguém partilhar) na Bíblia. Muita gente não faz ideia que a Bíblia fala sobre os problemas quotidianos.
          \nSe alguém mostrar interesse em ler a Bíblia, talvez seja bom emprestares-lhes uma Bíblia ou sugerir onde eles podem começar. Não assumas que eles conhecem a estrutura dos livros e capítulos tão bem como tu. Para uma boa história narrativa, começa com o Evangelho de Lucas. O Evangelho de João dá um bom resumo da Bíblia.
          \nDisponibiliza-te para falar com o teu colega sobre o que ele leu, se ele quiser. Lembra-te que tudo isto pode ser uma novidade para ele.`,
        example: `Nos 10 meses em que o Ricardo trabalhou com o Lucas eles tornaram-se bons amigos. O Ricardo tinha partilhado com o Lucas como se tinha tornado cristão, e ainda que o Lucas não viesse de uma família cristã, ficou interessado sobre algumas coisas que o Ricardo partilhou. O Lucas confidenciou que tinha dificuldade em perdoar a uma pessoa e o Ricardo partilhou que a Bíblia falava muito sobre perdão. Isto chamou à atenção do Lucas, e então ele decidiu encontrar-se com o Ricardo um dia a seguir ao trabalho para ver o que a Bíblia tinha a dizer. Olharam juntos para a história da mulher no poço e isto levou a uma conversa ainda mais profunda.`,
      },
      ['es']: {
        top: `Una de las mejores maneras de encontrar a Jesús es leer la Palabra de Dios por sí mismo.`,
        steps: `Algunas personas tendrán curiosidad natural por la Biblia, mientras que otras pueden tener poco conocimiento o interés. Encontrar la oportunidad adecuada requiere sensibilidad y paciencia.
        \nBusca oportunidades para mencionar la conexión entre un tema que has enfrentado y algo que has leído (o te han compartido) de la Biblia. La mayoría de las personas no tienen la menor idea de lo que la Biblia dice sobre los problemas cotidianos de la vida.
        \nSi alguien muestra interés en leer la Biblia, puede que desees prestarles una o sugerirles dónde deben comenzar a leer. No asumas que conocen la estructura de los libros y versículos como tú. Para una buena historia narrativa, sugiéreles comenzar con el Evangelio de Lucas. El Evangelio de Juan da un buen "resumen ejecutivo" de la Biblia.
        \nDebes estar listo a dialogar con tus colegas sobre lo que están leyendo (cuando quieran), teniendo en cuenta que mucho de esto puede ser muy nuevo para ellos.`,
        example: `En los 10 meses que Ricardo había trabajado con Luis, se habían convertido en buenos amigos. Ricardo ya le había compartido cómo se había convertido en cristiano, y aunque Luis no tenía un trasfondo religioso, estaba interesado en algunas de las ideas espirituales que Ricardo le había compartido. Luis compartió con Ricardo que estaba teniendo problemas para perdonar a alguien. Ricardo le mencionó que la Biblia tenía mucho que decir sobre el perdón. Esto atrajo el interés de Luis por lo que accedió a reunirse con Ricardo un día después del trabajo para ver lo que la Biblia tenía que decir. Juntos leyeron y discutieron la historia de la mujer en el pozo y esto los llevó a tener conversariones espirituales más profundas.`,
      },
      ['pt-BR']: {
        top: `Uma das melhores maneiras de encontrar a Jesus é lendo a Palavra de Deus para vocês mesmos.`,
        steps: `Algumas pessoas terão a curiosidade natural pela Bíblia, enquanto que outras podem ter pouco conhecimento ou interesse. Encontrar a oportunidade adequada precisará de sensibilidade e paciência.
        \nBusque uma oportunidade para mencionar a conexão entre um tema que tem enfrentado e algo que você leu (ou que compartil- haram com você) da Bíblia. Muitas pessoas não tem ideia que a Bíblia fala dos problemas cotidianos da vida.
        \nSe alguém mostra interesse em ler a bíblia, pode apresentar-lhes um exemplar ou sugerir onde podem começar a ler. Não presuma que todos conhecem a estrutura dos livros e versículos como você. Para uma boa historia narrativa, comece com o Evangelho de Lucas. O evangelho de João dá um bom resumo executivo da Bíblia.
        \nEsteja disposto a discutir com seus colegas o que leram se eles quisererem, tendo em mente qe isto pode ser muito novo para eles.`,
        example: `Nos 10 meses que Rich havia trabalhado com Luke, eles se tornaram bons amigos. Rich havia compartilhado com Lucas como se tornara cristão e ainda que Lucas não tivesse um plano de fundo religioso estava interessado em algumas das ideias espirituais que Rich havia compartilhado. Lucas confiou a Rich que estava tendo problemas em perdoar a alguém
        e Rich mencionou que a Biblia realmente tinha muito que dizer sobre perdão. Isto atraiu
        o interesse de Lucas e concordou reunir-se com Rich depois do trabalho um dia para ver
        o que a Biblia tinha a dizer. Juntos observaram a historia da mulher no poço e isto levou
        a uma discussão espiritual mais profunda.`,
      },
      ['zh-CN']: {
        top: `其中一個讓人遇見耶穌的好方法就是鼓勵對方看神的話語。`,
        steps: `• 有些人自然地對聖經感到好奇，但另有些人可能對聖經缺乏認識或不感興趣。因此我們需要有屬靈的 敏銳度和耐性，尋找合適的時機邀請同事一起看聖經。
        \n• 尋找機會指出神怎樣透過聖經經文幫助你面對某些處境，很多人都不曉得原來聖經能夠回應我們日常 生活中所遇到的問題。
        \n• 假如有朋友有興趣看聖經，你可考慮借或送一本給他回家看，並建議他可以由哪卷書開始讀。不要假設 對方像你一般熟悉聖經的書卷結構和內容。假如對方有興趣看敍事式故事，可讀路加福音;假如對方
        \n• 希望概略地了解聖經的一些重要主題，約翰福音會是不錯的選擇。
        \n• 你要常作準備，你的同事或許希望和你進一步討論他所讀了的聖經章節，因為聖經的內容和信息對他們 來說可能是十分陌生和新鮮的。`,
        example: `April 與 Shirley 一起工作了十個月，她倆成為了很好的朋友。April 跟 Shirley 分享了她成為基督徒的 經過，雖然 Shirley 沒有任何信仰，但她對 April 分享的信仰上的見解很感興趣。有一天，Shirley 坦誠地向 April 透露她對於要原諒某個人感到十分掙扎，April 告訴她聖經中其實有不少談及饒恕 的地方，於是，Shirley 開始對聖經產生興趣，並答應 April 在某天下班後一起看聖經。她們一起看有關
        井旁的撒瑪利亞婦人的故事，並藉這故事展開了更深入的信仰討論。`,
      },
      ['ar']: {
        top: `ِمن أفضل ال ّط ُرق ليلتقي شخص ما مع يسوع هو قراءة كلمة الله بنفسه.`,
        steps: `البعض سيكون لديهم فضول بطبيعتهم حول الكتاب ال ُمق ّدس في حين أ ّن البعض الآخر قد يكون لديهم القليل ِمن المعرفة أو الاهتمام، لذا￼ سيتطلّب إيجاد الفرصة ال ُمناسبة حساسية روحية وصب ًرا.
        ابح ْث عن فرص ٍة لتذ ّكر ال ّصلة بين مشكلة واجهتها وشيء قرأته (أو سمعت أح ًدا يشاركه) ِمن الكتاب ال ُمق ّدس، فالكثيرون ليس لديهم أي فكر ٍة أن الكتاب ال ُمق ّدس يتح ّدث عن مشاكل الحياة اليومية.
        إذا أظهر شخ ٌص ما اهتما ًما بقراءة الكتاب ال ُمق ّدس، قد تحتاج أن تعيره نسخ ًة أو تقترح عليه ِمن أين يبدأ القراءة، ولا تفترض أ ّنه يعرف بنية الأسفار والآيات مثلك. ابدأ بإنجيل لوقا لأ ّنه ق ّصة سردية ج ّيدة، أ ّما إنجيل يوح ّنا ف ُيق ّدم «موج ًزا واف ًيا» وج ّي ًدا للكتاب ال ُمق ّدس.
        ًُ ك ْن ُمستع ّدا للمناقشة مع زميلك حول ما قرأه إ ْن رغب في ذلك، مع الوضع في الاعتبار أ ّن كل هذا ربما يكون جدي ًدا للغاية بالنسبة إليه.`,
        example: `صار «ريتش» و»لوك» صديقين ُمق ّر َب ْين خلال الأشهر العشرة التي عملا فيها م ًعا، وشا َرك «ريتش» مع «لوك»￼
        ًًَّ
        ق ّصته عن كيف أصبح مسيح ّيا، وعلى الرغم ِمن أ ّن «لوك» لم يأ ِت ِمن خلفي ٍة ُمتد ّين ٍة فإنه كان ُمهت ّما ببعض الآراء
        الروحية التي شاركها «ريتش» معه. وباح «لوك» لـ»ريتش» بأ ّنه ُيواجه مشكلة في مسامحة شخ ٍص ما و َذ َكر له «ريتش» أ ّن الكتاب ال ُمق ّدس لديه الكثير ليقوله عن الغفران. أثار هذا اهتمام «لوك» ووافق على أن ُيقابل «ريتش» بعدالعملللتفكيرفيمايقولهالكتابالُمقّدس،وقرآمًعاق ّصةالمرأةعندالبئروتطّورالأمرإلىنقاشروحي أعمق.`,
      },
    },
  },
  card6: {
    frontText: {
      en: [
        { text: "Finding Out Someone's", isBold: false },
        { text: 'Perception of Jesus', isBold: true },
      ],
      lt: [
        { text: 'Sužinoti, ką kitas', isBold: false },
        { text: 'mąsto apie Jėzų', isBold: true },
      ],
      it: [
        { text: 'Scoprire la Percezione', isBold: false },
        { text: 'che Qualcuno ha di Gesù', isBold: true },
      ],
      ['pt-PT']: [
        { text: 'Descobrir o Que Alguém', isBold: false },
        { text: 'Pensa sobre Jesus', isBold: true },
      ],
      ['es']: [
        { text: 'Descubrir la', isBold: false },
        { text: 'percepción de', isBold: false },
        { text: 'alguien sobre Jesús', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Descobrir a percepção', isBold: false },
        { text: 'de alguém a', isBold: false },
        { text: 'cerca de Jesus', isBold: true },
      ],
      ['zh-CN']: [
        { text: '探索對方對', isBold: false },
        { text: '耶穌的看法', isBold: false },
      ],
      ['ar']: [
        { text: 'اكتشاف تص ُّور', isBold: true },
        { text: 'شخ ٍص ما عن يسوع', isBold: true },
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
      ['pt-PT']: {
        top: `Perceber a forma como uma pessoa não cristã vê Jesus pode ajudar-te a explorar as suas crenças espirituais. A partir daí, podes aprender como guiar as conversas e que assuntos podem tornar o evangelho relevante para eles.`,
        steps: `Pensa em perguntas que vão capturar a sua atenção, como "Quem achas que Deus é?" ou "O que pensas sobre Jesus?"
          \nCertifica-te que estás a mostrar interesse genuíno nas suas opiniões e pensamentos.
          \nPrepara sugestões que podes dar para mantê-los a interagir na aprendizagem sobre Jesus (oferecer um livro, convidá-los para um evento ou simplesmente planear um tempo para falar mais).`,
        example: `O Miguel, um consultor, ficou a trabalhar até tarde e encomendou comida para o escritório com o seu colega Leo. O Leo tinha mostrado curiosidade acerca da fé do Miguel e tinha feito perguntas sobre o seu pequeno grupo na igreja. Enquanto comiam, o Miguel decidiu fazer perguntas mais profundas ao Leo sobre os seus pensamentos acerca de Deus e Jesus. O Leo partilhou que acreditava que Jesus era um bom homem, mas não era Deus. O Miguel ouviu e partilhou alguns dos seus pensamentos. A conversa estava acesa, mas foi cordial, e no final o Miguel perguntou ao Leo se gostava de olhar para a Bíblia com ele e ver o que Jesus tinha dito sobre ele próprio. O Leo concordou.`,
      },
      ['es']: {
        top: `Comprender la percepción de un no cristiano sobre Jesús puede ayudarte a explorar sus creencias espiriuales. De esta manera tendrás una mejor idea sobre cómo guiar la conversación y qué preguntas o temas tocar para hacer que el evangelio sea relevante para ellos.`,
        steps: `Piensa en preguntas que te ayuden a medir su percepción, como "¿Quién crees que es Dios?" O "¿Qué piensas de Jesús?"
        \nAsegúrate de que muestras un interés genuino en sus opiniones y pensamientos.
        \nPractica la explicación de quién es Jesús y cómo llegaste a creer de esta manera.`,
        example: `Un día, Miguel, un joven consultor, estaba trabajando hasta tarde cenando comida rápida con su colega Frank, quien había expresado curiosidad en la fe de Miguel preguntándole sobre la reunión semanal de su comunidad misional. Mientras comían, Miguel decidió hacerle a Frank algunas preguntas más profundas sobre su perspectiva de Dios y Jesús. Frank ledijo que pensaba que Jesús era un buen hombre pero no Dios. Miguel escuchó y compartió algunos de su propios pensamientos. Al final Miguel le pregunto a Frank si le gustaría leer la Biblia juntos para comprender mejor lo que Jesús dijo acerca si mismo. Frank estuvo de acuerdo y definieron día y hora para hacerlo.`,
      },
      ['pt-BR']: {
        top: `Entender a percepção não cristã sobre Jesus pode ajudar você a explorar suas crenças espirituais. Dessa maneira, você saberá como guiar a discussão e que perguntas ou temas fazem com que o evangelho seja relevante para eles.`,
        steps: `Pense em perguntas que avaliarão sua percepção, como: “Quem você crê que é Deus?” ou “O que você pensa de/sobre Jesus?”
        \nAssegure-se de que você está mostrando interesse genuíno em suas opiniões e pensamentos.
        \nFaça sugestões para que participem e aprendam mais sobre Jesus (isto poderia ser: dar um livro para lerem, convidá-los para um evento ou simplesmente planejar um tempo para falar sobre isso mais profundamente).`,
        example: `Mike, um consultor júnior, estava trabalhando até tarde pediu comida delivery para comer com seu colega Leon. Leon mostrou curiosidade sobre a fé de Mike e lhe perguntou sobre a reunião semanal do grupo pequeno da igreja. Enquanto comiam, Mike decidiu fazer a Leon algumas perguntas mais profundas sobre sua perspectiva de Deus e Jesus. Leon compartilhou com ele que pensava que Jesus era um bom homem, mas que não era Deus. Mike escutou e compartilhou alguns de seus próprios pensamentos. A conversa foi dinâmica, porém respeitosa, e ao final Mike perguntou a Leon se ele gostaria que ler a bíblia juntos, para ver
        o que Jesus disse sobre si mesmo. Leon concordou.`,
      },
      ['zh-CN']: {
        top: `先了解未信朋友對耶穌的看法能幫助你進一步發掘對方對屬靈事物的觀念，由此你能慢慢 找到自然地談論信仰的入手點，並懂得發問一些好問題，讓對方感到原來福音是與他們的 生活有切身關係的。`,
        steps: `• 先想出一些有創意的問題幫助你有效探索對方對耶穌的看法，例如:「你心目中的『神』 是怎樣的?」或「當提起耶穌，你會即時聯想到甚麼?」
        \n• 請記住:你必須讓對方感受到你對他的想法或信念有真誠的興趣。
        \n• 假如對方願意的話，給予對方一些簡單可行的建議去更多認識耶穌，例如給他相關書籍 閱讀、邀請他去福音性聚會、或約他另一個時間再進深交流分享。`,
        example: `Alex 是一位初級會計師，最近他和另一位同事 Kevin 需要加班工作而經常一同買外賣晚餐。其實 較早前，Kevin 已對 Alex 的信仰感到好奇而詢問過 Alex 有關他在平日晚上恆常參加的教會小組。 今個晚上，當他們正在公司吃飯時，Alex 便決定趁這機會問 Kevin 一些更深入的問題去了解他對於 神和耶穌的看法。Kevin 坦誠地表示他認為耶穌是一個好人，但不是神。Alex 真誠地聆聽，也分享了 自己的看法。這是一次十分愉快和坦誠的交流。最後，Alex 問 Kevin 會否有興趣再找一個時間一同透過
        聖經去看看耶穌怎樣描述祂自己，Kevin 欣然地答應了。`,
      },
      ['ar']: {
        top: `ُيمكن أن ُيساعدك َفهم نظرة الشخص غير المسيحي ليسوع على استكشاف ُمعتقداته الروحية،￼￼￼￼￼ وحينئٍذ ستعرف كيف تقود النقاش وما الأسئلة أو الموضوعات التي تجعل الإنجيل مألوًفا لديه.`,
        steps: `فكرفيالأسئلةالتيستحّددمفهومهأوتصّورهمثل:«َمنهواللهفيرأيك؟»أو«مارأيكفييسوع؟».
        تأ َّكد ِمن أنك ُتبدي اهتما ًما حقيق ًّيا بآرائه وأفكاره.
        ف ِّكر في اقتراحات تجعله ُيشارك في تعلُّم المزيد عن يسوع (قد يكون هذا مثل إعطائه كتا ًبا ليقرأه أو دعوته لحضور مناسبة أو ترتيب وق ٍت ببساط ٍة للتح ّدث أكثر).`,
        example: `كان «مايك» مستشا ًرا ُمبت ِد ًئا ويعمل لوق ٍت ُمتأ ّخر ويتناول الطعام الجاهز مع زميله «ليون»، وأبدى «ليون» فضو ًلا￼ ٍ
        حول إيمان «مايك» وسأله عن مجموعته الصغيرة المسائية في الكنيسة. وفي أثناء تناولهما الطعام، ق َّرر «مايك» أن يسأل «ليون» بعض الأسئلة الأعمق التي تتعلَّق بمفهومه عن الله ويسوع، فشارك «ليون» أفكاره ُمو ّض ًحا أ ّنه يظ ّن أ ّن يسوع كان رج ًلا صال ًحا لك ّنه ليس الله. استمع «مايك» إليه وشاركه بعض أفكاره الخا ّصة، وكان النقاش ُمفعًمابالحيوّيةلكّنهكانودًّيا،وفيالنهايةسأل«مايك»زميله«ليون»عماإذاكانيرغبفيقراءةالكتاب ال ُمق ّدس معه في وق ٍت ما لمعرفة ما قاله يسوع عن نفسه، فوافق «ليون» على ذلك.`,
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
      ['pt-PT']: [
        { text: 'Orar', isBold: true },
        { text: 'por Pessoas no Trabalho', isBold: false },
      ],
      ['es']: [
        { text: 'Orar', isBold: true },
        { text: 'por las personas en', isBold: false },
        { text: 'el trabajo', isBold: false },
      ],
      ['pt-BR']: [
        { text: 'Orar pelas', isBold: true },
        { text: 'pessoas no', isBold: false },
        { text: 'trabalho', isBold: false },
      ],
      ['zh-CN']: [
        { text: '為你工作場景中的', isBold: false },
        { text: '朋友禱告', isBold: false },
      ],
      ['ar']: [
        { text: 'الّصلاةِمنأجل', isBold: true },
        { text: 'الناس في العمل', isBold: true },
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
      ['pt-PT']: {
        top: `Deus dá-nos oportunidades frequentes para orar por situações com colegas e clientes. Algumas são oportunidades pontuais e outras vão ser orações que durarão semanas ou meses.`,
        steps: `Fica atento a situações no trabalho em que alguém pode precisar da tua oração. Ter uma nota no teu telemóvel ou computador vai ajudar-te a orar mais consistente e especificamente.
          \nAlgumas pessoas não cristãs vão pedir-te que ores se souberem que és uma pessoa que ora... especialmente em situações sérias. Também te podes oferecer para orar por algo que alguém partilhou contigo. Em qualquer caso, certifica-te de que oras e que lhes dizes que oraste.
          \nToma atenção a tempos apropriados em que podes orar por alguém. Isto pode ser uma grande bênção e conforto para eles e pode abrir a porta para mais conversas.`,
        example: `A Raquel é uma enfermeira. Numa visita de rotina a casa de uma paciente, reparou que a senhora estava perturbada. Ela tinha acabado de receber um diagnóstico de cancro. A Raquel encorajou a senhora a partilhar como se sentia. No final da visita, a Raquel sentiu Deus a dizer-lhe para perguntar se podia orar com a senhora. A senhora aceitou e a Raquel orou para que a senhora conhecesse o conforto e paz de Jesus. A sua paciente estava claramente comovida, agradeceu à Raquel e tem estado mais aberta a partilhar coisas com a Raquel.`,
      },
      ['es']: {
        top: `Dios nos da oportunidades cotidianas para orar por situaciones específicas con colegas y clientes. Algunas son oportunidades únicas y otras implicarán oración constante por semanas o meses.`,
        steps: `Mantente alerta por circunstancias en donde alguien en el trabajo pueda necesitar tus oraciones. Tomar notas en tu celular o en un cuaderno te ayudará a orar de manera más consistente y específica.
        \nAlgunos no cristianos te pedirán oración si saben que eres una persona que ora...particularmente en circunstancias serias. Ocasionalmente, puedes ofrecerte a orar por algo que te compartieron. En cualquier caso, asegúrate de que SI oraste y hazles saber más tarde que lo hiciste.
        \nMantente atento a momentos apropiados en los que puedas orar con alguien. Esto puede ser de gran bendición y consuelo y puede abrir la puerta para un diálogo más profundo.`,
        example: `Raquel es una enfermera comunitaria. En una visita domiciliaria de rutina, notó que su paciente estaba muy acongojada. La mujer le compartió que acababa de recibir un diagnóstico de cáncer. Raquel animó a esta mujer a compartir cómo se sentía. Al final de la visita, Raquel se sintió impulsada por Dios a preguntarle a la mujer si podía orar con ella. La mujer aceptó y Raquel oró para que lla sintiera el consuelo y la paz de Jesús. La paciente terminó muy emocionada y conmovida, y con lágrimas le dio gracias a Raquel. Desde entonces ha estado más abierta a tener conversaciones más personales y profundas.`,
      },
      ['pt-BR']: {
        top: `Deus nos dá oportunidades regulares para orar por situações com colegas e clientes. Algumas são oportunidades únicas e outras significarão oração constante durante semanas ou meses.`,
        steps: `Mantenha-se alerta por circunstâncias nas quais alguém no trabalho precise de suas orações. Escrever notas em seu celular ou em um caderno lhe ajudará a orar de maneira mais consistente e específica.
        \nAlguns não cristãos lhe pedirão oração, se souberem que você é uma pessoa que ora... Particular- mente em circunstâncias sérias. Talvez você queira voluntariamente orar por algo que compartilha- ram com você. Em qualquer caso, e faça com que eles saibam e tenham segurança de você orou.
        \nEsteja atento a momentos apropriados nos quais você possa orar com alguém. Esta pode ser uma grande benção e conforto para eles, além de abrir a porta para um diálogo mais profundo.`,
        example: `Rachael é uma enfermeira comunitária. Em uma visita domiciliar habitual, notou que sua paciente estava incômodada fora da normalidade. A mulher compartilhou que acabava de receber um diagnóstico de câncer. Rachael encorajou a mulher a com- partilhar algo do que ela estava sentindo. Ao final da visita, Rachael se sentiu impres- sionada e motivada por Deus a perguntar a mulher se poderia orar com ela. A mu- lher aceitou e Rachael orou para que a mulher conhecesse o consolo e a paz de Je- sus. A paciente estava claramente emocionada e comovida, em lágrimas, agradeceu a Rachael, e desde então tem estado mais aberta a compartilhar com ela.`,
      },
      ['zh-CN']: {
        top: `神不斷給我們機會去為職場中所遇見的同事、顧客或服務對象禱告。有些朋友或者我們 只有一次碰上的機會去為他們代禱，另有些人我們可能恆常地接觸到，因而可以持續地 為他們的需要禱告。`,
        steps: `• 敏銳地觀察在你的工作場景中有哪些對象可能需要你的禱告。嘗試建立把代禱事情記在你的手提電話 或筆記簿中的習慣，這將大大幫助你更持續和具體地為職場朋友的需要代禱。
        \n• 有些未信朋友知道你是一位願意經常為他人祈禱的基督徒後，他們或許有天會主動請求你為他們禱告， 尤其是遇到非常危急事情之際。另一方面，假如有未信朋友向你分享一些生活上的問題或掙扎時，你也可 主動詢問對方能否為他所分享的需要禱告。無論上述哪種情況，請務必記緊花時間去禱告，並讓對方
        知道你確實已這樣做。
        \n• 請特別留意哪些時候可能是為某位未信朋友禱告的合適時機。你適時的關心和代禱可以成為對方很大 的祝福和安慰，甚至可能成為日後打開福音話題的好基礎。`,
        example: `Rachael 是一位社區外展護士。在一次恆常的病人家訪裏，她留意到對方的心情異常低落。那位病人 告訴 Rachael 她剛確診患上癌症，Rachael 耐心地鼓勵對方嘗試分享她當下的感受。在家訪完結時， 神感動 Rachael 詢問對方能否即時為她禱告;對方表示願意，於是 Rachael 開聲禱告，祈求那位病人 能真實經歷耶穌的安慰和平安。祈禱之後，那位病人感動不已，流着淚向 Rachael 道謝。自這次探訪
        之後，那位病人更願意開放自己的心向Rachael 分享自己的掙扎。`,
      },
      ['ar']: {
        top: `يمنحنا الله فر ًصا ُمستم ّرة للصلاة ِمن أجل مواقف مع الزملاء والزبائن والعملاء. قد يكون بعضها￼￼￼￼￼ فر ًصا تأتي م ّرة واحدة والبعض الآخر قد يكون فر ًصا ِمن أجل الصلاة ال ُمستم ّرة لأسابيع أو شهور.`,
        steps: `انتبه للظروف التي قد يحتاج فيها شخ ٌص ما في العمل إلى صلواتك. س ُيساعدك الاحتفاظ ب ُمذ ّكرة على هاتفك أو في دفتر￼ ُملاحظات أن ُتصلّي بمزي ٍد ِمن الانتظام والتحديد.
        سيطلب منك بعض ِمن غير المسيح ّيين أن ُتصلّي لأجلهم إذا عرفوا أ ّنك شخص ُمص ٍّل وخا ّصة في ال ّظروف ال ّصعبة، وربما تريد أي ًضا أن تتط ّوع لل ّصلاة ِمن أجل شيء شاركوه معك، وفي كلتا الحالتين تأ َّكد ِمن أنك ُتصلّي بالفعل واجعلهم يعرفون لاحًقا أّنك فعلت ذلك.
        تر َّقب الأوقات المناسبة التي ُيمكنك فيها أن تطلب الصلاة مع شخ ٍص ما. ُيمكن أن يكون هذا بركة عظيمة وتعزية لهم وربما يفتح الباب أمام المزيد ِمن الحوار.`,
        example: `تعمل «ريتشيل» مم ّرضة عمومية، وفي زيار ٍة منزلي ٍة روتيني ٍة لاحظت أ ّن مريضتها كانت مستاء ًة على￼ غير العادة، وقالت لها المرأة إنها استلمت لت ّوها نتائج تشخيص ُتشير إلى أ ّنها مصابة بالسرطان، فش ّجعتها «ريتشيل» أن تبوح ببع ٍض م ّما تشعر به. وفي نهاية الزيارة شعرت «ريتشيل» بأ ّن الله يدفعها إلى سؤال المرأة إن كانت تستطيع الصلاة معها، فوافقت المرأة وصلَّت «ريتشيل» ِمن أجل أن تختبر المرأة تعزية
        ّ
        يسوع وسلامه. كان تأثر المرأة واض ًحا، فشكرت «ريتشيل» بدموع، ومنذ ذلك الوقت صارت أكثر
        انفتا ًحا على الحديث مع «ريتشيل».`,
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
      ['pt-PT']: [
        { text: 'Viver uma Vida que', isBold: false },
        { text: 'Requer uma Explicação', isBold: true },
      ],
      ['es']: [
        { text: 'Vivir una vida', isBold: false },
        { text: 'que demande', isBold: true },
        { text: 'una explicación', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Viver uma vida que', isBold: false },
        { text: 'demande uma', isBold: true },
        { text: 'explicação', isBold: true },
      ],
      ['zh-CN']: [
        { text: '活出一個讓人感到', isBold: false },
        { text: '好奇的生命', isBold: false },
      ],
      ['ar']: [
        { text: 'نعيش حياة تتطلَّب', isBold: true },
        { text: 'تفسيرًا', isBold: true },
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
      ['pt-PT']: {
        top: `As nossas ações no dia-a-dia podem ser um testemunho claro para os nossos colegas do amor de Deus.`,
        steps: `Procura formas de influenciar a cultura no teu local de trabalho com atos de amor que reflitam Jesus.
          \nPensa sobre como responderias se alguém te perguntasse o motivo da tua atitude. Lembra-te que não queres pregar, mas sim fazer uma ligação simples entre uma ação bondosa e a tua fé.`,
        example: `O António trabalha numa empresa onde a maioria dos empregados trabalha há alguns anos e todos se conhecem bem. Uma pessoa nova foi contratada e toda a gente está a tornar as suas primeiras semanas difíceis, dando-lhe uma quantidade de trabalho insuportável e falando dele nas suas costas. O António estava tentado a rir-se da situação com os seus colegas, mas decidiu que, como seguidor de Cristo, ele deveria ser uma ajuda e encorajamento para o seu novo colega. Ele tem sido simpático com ele e tem oferecido ajuda. O António está a ver que os seus colegas se sentem menos confortáveis a dificultar a vida do novo colega e estão a ser mais simpáticos com ele.`,
      },
      ['es']: {
        top: `Las acciones de nuestra vida diaria pueden ser un claro testimonio del amor de Dios delante de nuestros colegas.`,
        steps: `¿En que maneras el hecho que eres un seguidor de Jesús cambia la manera como vives y trabajas?
        \nPiensa cómo responderías si alguien te preguntara por qué actuaste de la manera que lo hiciste. Recuerda que no se trata de predicar, sino de crear una simple conexión entre un acto de bondad y tu fe.`,
        example: `Ángel trabaja en una firma donde la mayoría del personal ha estado juntos durante un par de años y se conocen bien. Un nuevo socio acaba de unirse a la firma y el resto de la oficina está haciendo su iniciación en la firma muy difícil, dándole una carga de trabajo insoportable, asignándole todas las tareas menos deseables, además de chismorrear a sus espaldas. Ángel se sintió tentado a reír con los demás, pero decidió que, como seguidor de Jesús, debería ofrecer su ayuda y estímulo al nuevo asociado. Comenzó a ser amable con él y ofrecerle su ayuda. Ángel ha comenzado a notar que los otros asociados ahora parecen menos cómodos con hacerle la vida imposible al "chico nuevo" y han comenzado a portarse de manera más agradable con él.`,
      },
      ['pt-BR']: {
        top: `As ações do nosso viver diário podem ser um claro testemunho do amor de Deus perante nossos colegas.`,
        steps: `Procure maneiras de influenciar a cultura em seu local de trabalho com atos de amor semelhantes ao de Cristo.
        \nPense em como responderia a alguém que te perguntasse porque você agiu de uma determinada maneira. Lembre-se que não se trata de pregar, mas de criar uma simples conexão entre um ato de bondade e a sua fé.`,
        example: `Amós trabalha em uma firma onde a maioria do pessoal trabalha durante muitos anos e se conhecem bem. Um novo colaborador acaba de unir-se a firma e o resto do escritório está fazendo sua adaptação na firma muito difícil, dando-lhe uma carga de trabalho insuportável atribuindo-lhe todos os trabalhos menos desejáveis, além falarem mal pelas suas costas. Amós estava tentado a rir com os demais, mas decidiu que como seguidor de Cristo ele deve ser uma ajuda e um estímulo para o novo associado. Ele tem sido amável com ele e tem oferecido ajuda. Amós está come- çando a notar que os outros associados agora parecem desconfortáveis para conti- nuar destratando o “novato” e de igual forma estão sendo mais agradáveis com ele.`,
      },
      ['zh-CN']: {
        top: `我們日常生活中的行為能夠成為我們在同事面前彰顯神的愛的有力見證。`,
        steps: `• 設法在你的工作場景裏尋找一些能夠展現基督的愛的方式，藉着著這些愛心行動轉化 你所在的職場的文化。
        \n• 試想像一下:假如有人好奇地問你，為何你曾在某個困難的處境中仍能作出了正面的回應， 你會如何回答對方?請記住:傳福音不單是用口去宣講，更關乎你能否藉着愛人的行動去 具體活出信仰。`,
        example: `在 Ken 所工作的公司裏，大部分同事都已一起合作多年，而且十分熟稔。最近公司來了一位新同事， 大家都故意留難這位新同事，給了他大量其他人不願做的工作，更經常在背後取笑他。起初 Ken 也面對着
        試探，試圖跟隨同事們所作的去作;然而他後來決定，作為一個基督徒，他應該嘗試幫助和鼓勵這位 新同事，於是他積極地向新同事表達善意，並主動伸出援手。自從他的轉變後，Ken 漸漸察覺到， 其他同事刻意留難這位新同事的情況似乎減少了，而且對新同事的態度也友善了不少。`,
      },
      ['ar']: {
        top: `ِمن الممكن أن تكون حياتنا اليومية شهادة حّية عن محّبة الله أمام زملائنا.`,
        steps: `ابحث عن ط ُر ٍق للتأثير على ثقافة مكان عملك بأفعال تتشّبه بمحّبة المسيح.
        ف ِّكر في كيف تجيب إذا سألك شخ ٌص ما عن سبب تص ّرفك بهذه الطريقة، وتذ ّكر أن ِمن الأفضل ألا تعظ بل أن تربط ببساط ٍة بين فعل الإحسان وإيمانك.`,
        example: `يعمل «أموس» في شركة حيث يعمل أغلب المو ّظفين فيها م ًعا لأكثر ِمن عامين ويعرفون￼
        بعضهم البعض ج ّي ًدا. انضم زميل جديد لهم وبدأ باقي المكتب يص ّعبون ِمن مه ّمة انضمامه
        إلى العمل في الشركة من خلال تحميله أعباء عمل لا ُتحت َمل ِمن جميع الأعمال غير ال ُمستح ّبة بالإضافة إلى التح ّدث ِمن وراء ظهره. تع ّرض «أموس» إلى إغراء أن يسخر مع الآخرين ِمن الزميل الجديد لكنه ق َّرر أ ّنه بصفته تاب ًعا إلى المسيح يجب أن يكون عو ًنا وتشجي ًعا له، فكان لطي ًفا معه وعرض عليه المساعدة، حينئ ٍذ بدأ «أموس» ملاحظة أ ّن الزملاء الآخرين يبدون الآن أق ّل ارتيا ًحا لفكرة إعطاء «الشاب الجديد» وق ًتا عصي ًبا وصاروا أكثر لط ًفا معه أي ًضا.`,
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
      ['pt-PT']: [
        { text: 'Descobrir o Passado', isBold: false },
        { text: 'Espiritual de Alguém', isBold: true },
      ],
      ['es']: [
        { text: 'Descubrir el trasfondo', isBold: false },
        { text: 'espiritual de', isBold: true },
        { text: 'la persona', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Descobrir os', isBold: false },
        { text: 'antecedentes espirituais', isBold: true },
        { text: 'de alguém', isBold: true },
      ],
      ['zh-CN']: [
        { text: '探索對方的', isBold: false },
        { text: '信仰背景', isBold: false },
      ],
      ['ar']: [
        { text: 'اكتشاف الخلفية', isBold: true },
        { text: 'الروحية لشخ ٍص ما', isBold: true },
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
      ['pt-PT']: {
        top: `Perguntas sobre o passado espiritual de alguém podem ser uma forma não ameaçadora de começar um diálogo espiritual.`,
        steps: `Pensa em algumas perguntas que não sejam ofensivas sobre o passado espiritual de uma pessoa.
          \nCertifica-te que perguntas num espaço e momento apropriados e que ouves o que eles partilham de forma respeitosa.`,
        example: `O Simão, um engenheiro novo, estava a viajar com um engenheiro mais experiente que não conhecia bem mas admirava muito. Começaram a conversar sobre os seus planos para o fim-de-semana. O Simão mencionou a igreja e o seu colega fez algumas questões. O Simão perguntou nervosamente: "Diria que tem algum tipo de fé?" O seu colega fez uma pausa e começou a partilhar sobre a sua educação, as suas crenças acerca de Deus e alguns sentimentos que tinha sobre fé. O Simão não sabia muito sobre as crenças religiosas que o seu colega partilhava, então escolheu ouvir atentamente. Agora, quando eles estão juntos, as conversas são naturalmente mais profundas.`,
      },
      ['es']: {
        top: `Hacer preguntas sobre el trasfondo espiritual de la persona puede ser una manera no amenazadora de comenzar un diálogo espiritual.`,
        steps: `Piensa en algunas preguntas que podrías hacer acerca del trasfondo espiritual de una persona que no suenen ofensivas.
        \nPiensa en algunos contextos en el trabajo en que sería apropiado hacer estas preguntas.`,
        example: `Simón, un joven ingeniero, estaba de viaje con un ingeniero de mucha experiencia a quien no conocía bien, pero que admiraba mucho. La conversación dio un giro y comenzaron a hablar de sus planes para el fin de semana. Simón mencionó la comunidad misional y su colega comenzó a hacerle algunas preguntas. Simón le preguntó nerviosamente: "Y usted, ¿diría que tiene fe?" Su colega hizo una pausa, y luego empezó a compartir sobre su niñez, sus creencias acerca de Dios y algunos de sus sentimientos actuales acerca de la fe. Simón no sabía mucho acerca de las creencias religiosas que su colega estaba describiendo, así que decidió escuchar con atención. Ahora, cuando se ven, sus conversaciones fluyen naturalmente a un nivel más profundo.`,
      },
      ['pt-BR']: {
        top: `As perguntas sobre o passado espiritual de alguém podem ser uma maneira não ameaçadora de abrir um diálogo espiritual.`,
        steps: `Pense em algumas perguntas que não sejam ofensivas e que você poderia fazer sobre os antecedentes espirituais de uma pessoa.
        \nAssegure-se de perguntar em um momento e lugar apropriado e escutar com respeito ao que compartilharem com você.`,
        example: `Sanjay, um engenheiro júnior, estava viajando com um engenheiro sênior que ele não conhecia bem, mas que admirava muito. A conversa foi encaminhada para seus planos para o fim de semana. Sanjay mencionou a igreja e seu colega fez algumas perguntas. Sanjay perguntou nervosamente: "Você diria que tem fé em si mesmo?" Seu colega fez uma pausa, então começou a se abrir sobre sua criação, suas crenças sobre Deus e alguns de seus sentimentos atuais sobre a fé. Sanjay não sabia muito sobre as crenças religiosas que ele estava descrevendo, então ele apenas escolheu ouvir e estar atento. Agora, quando se vêem, as conversas vão naturalmente para um nível mais profundo.`,
      },
      ['zh-CN']: {
        top: `探問對方信仰背景的好問題，往往是一個不會讓對方感到有壓迫感的有效策略去打開信仰話題。`,
        steps: `• 想出一些能夠幫助你了解對方信仰背景的好問題，讓對方不會感到唐突或被冒犯。
        \n• 請記住:在準備探問未信朋友的信仰背景時，你必須選擇一個合適的時間和合宜的場合 去作，並懷着尊重的態度去聆聽對方的分享。`,
        example: `Roy 是一位初級工程師。有一次，他跟一位資深的工程師同事到外地公幹，他雖然不太認識這位前輩， 但一直十分欣賞他。他們一起聊天，並談到平時週日的活動。當 Roy 分享到他週日會上教會後，這位 同事問了他一些關於教會的事，於是，Roy 略帶緊張地問他:「你有信仰嗎?」這位同事想了一會兒，
        然後坦誠地分享了他的成長背景、他對神的看法、以及他現時對於信仰的感受。雖然 Roy 不太認識這位 同事所提及的宗教信仰，但他選擇專注地聆聽對方。現在，每當他們碰面時，二人的談話內容總會 很自然地便進到較深的層次。`,
      },
      ['ar']: {
        top: `ال ّسؤال عن الخلفية الروحية لشخ ٍص ما ُيمكن أن لا ُيش ّكل تهدي ًدا لفتح حوار روحي.`,
        steps: `فِّكرفيبعضالأسئلةالتيلاتعتبرمسيئًةوُيمكنكأنتسألهاعنالخلفيةالروحيةلشخٍصما.￼￼
        تأ َّكد ِمن أ ّنك تسأل في وق ٍت ومكان مناس َب ْين واصغ باحترام لما س ُيشاركه.`,
        example: `كان «سانجاي»، المهندس ال ُمبتدئ، ُمساف ًرا مع مهندس كبير لا يعرفه ج ّي ًدا لك ّنه كان ُمعج ًبا به￼ ٍٍ
        للغاية. تحّول الحديث إلى خططهم لعطلة نهاية الأسبوع وعندما َذ َكر «سانجاي» الكنيسة سأله
        زميله بعض الأسئلة القليلة، فسأله «سانجاي» بتو ّتر: «هل تقول إ ّنك مؤم ٌن؟» تو ّقف زميله ُبرهة ٍ
        ث ّم بدأ في الحديث عن نشأته و ُمعتقداته عن الله وبعض ِمن مشاعره الحالية نحو الإيمان. لم ي ُكن «سانجاي» يعرف الكثير عن ال ُمعتقدات الدينية التي كان يشرحها لذا اختار أن يكون ُمنص ًتا و ُمنتب ًها، والآن عندما يرى أحدهما الآخر يتح ّول الحديث بينهما بشك ٍل طبيعي إلى مستوى أعمق.`,
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
      ['pt-PT']: [
        { text: 'Dizer-lhes', isBold: false },
        { text: 'que Tu És um Cristão', isBold: true },
      ],
      ['es']: [
        { text: 'Contar que', isBold: false },
        { text: 'eres cristiano', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Compartilhar', isBold: false },
        { text: 'o evangelho', isBold: true },
      ],
      ['zh-CN']: [
        { text: '告訴他們你是一位', isBold: false },
        { text: '基督徒', isBold: false },
      ],
      ['ar']: [
        { text: 'أخبرهم أنّك', isBold: true },
        { text: 'مسيحّيُممؤمن', isBold: true },
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
      ['pt-PT']: {
        top: `Encontrar formas naturais de dizer aos teus colegas que és cristão no início da vossa relação, prepara o contexto para outras coisas que vais dizer e fazer e mostra o lugar importante que a tua fé ocupa na tua vida.`,
        steps: `Lembra-te que não precisas de ser perfeito para ser um cristão. Estás simplesmente a dizer que acreditas em Jesus e que estás a tentar segui-lo. As pessoas vão lidar melhor com uma pessoa humilde do que com uma "boa pessoa".
          \nPensa em formas fáceis de trazer isso à conversa. Sê positivo e menciona atividades em que estás envolvido, ao invés de mencionar uma lista de coisas que não podes fazer.`,
        example: `A Inês conseguiu o seu emprego de sonho como produtora num canal televisivo. Ela ficou feliz por ver que o elenco e equipa com quem ia trabalhar eram simpáticos. No final de um dia, algumas pessoas começaram a falar sobre os seus planos para essa noite. A Inês estava com receio de mencionar que ia a um estudo bíblico nessa noite porque não queria ser considerada estranha, mas decidiu falar disso naturalmente. Uma colega perguntou se ela era religiosa e a Inês disse que, na realidade, ela era apenas alguém que seguia Jesus. Surpreendentemente, a maioria não pareceu tão desconfortável como a Inês tinha temido. Isto aumentou o seu desejo de viver para Cristo no trabalho.`,
      },
      ['es']: {
        top: `Busca maneras naturales para que tus colegas sepan que eres cristiano desde el comienzo de la relación. Esto establece el contexto para otras cosas que vas a decir y hacer que demuestran la prioridad que la fe tiene en tu vida.`,
        steps: `Recuerda que no tienes que ser perfecto para ser cristiano. Simplemente estás diciendo que crees en Jesús y estás tratando de seguirlo. La gente responderá mejor a una persona humilde que a una "buena persona".
        \nPiensa en formas fáciles de sacar el tema. Se positivo y menciona las actividades en las que estás involucrado, no una lista de cosas "que no puedes hacer".`,
        example: `Durante la cena de bienvenida a la compañía, Alfredo compartió la mesa con algunos de los principales líderes de su empresa. Estaba conciente de querer dar una buena impresión a la empresa a la que recién se había unido, pero decidió compartir abiertamente sobre su participación en una comunidad misional y el hecho de ser un seguidor de Jesús en la conversación con sus jefes. Más adelante, cuando se juntó para almorzar con otro de sus nuevos colegas, éste le dijo, "respeto mucho como alguien tan joven como tú habla tan abiertamente de su fe en Jesús."`,
      },
      ['pt-BR']: {
        top: `Sabemos que o Evangelho é poderoso. Compartilhar a mensagem do evangelho geralmente implica em saber como explicá-lo de uma maneira clara e concisa.`,
        steps: `Considere ter uma ferramenta (um esquema ou panfleto) que claramente descreva o Evangelho.
        \nTenha um esquema que possa desenhar (em guardanapo ou um pedaço de papel) que ajude a explicar como alguém pode conhecer a Jesus pessoalmente.
        \nMemorize um ou dois versículos da Bíblia que claramente explicam como alguém convida a Cristo para sua vida.
        \nPrecisa de ajuda adicional? Consulte a carta “para mais informação” para obter ferramentas úteis...`,
        example: `Anya tem tido muitas conversas com sua amiga Maria durante o ano passado sobre a fe de Anya. As perguntas de Maria eram simples e usualmente sobre as decisões ou o comportamento de Anya, mas recentemente se tornam mais profundas. Uma tarde enquanto tomavam café, Anya estava agradecida de ter praticado com um simples esquema que havia aprendido em sua igreja e que podia usar no guardanapo para desenhar uma imagem que era muito clara para Maria. Maria quer pensar no que Anya compartilhou e voltar a conversar em breve.`,
      },
      ['zh-CN']: {
        top: `在你和同事建立關係的最初階段，設法找一個自然的機會讓他們知道你是基督徒，這不但 幫助你日後更容易把你的說話和行為連繫至信仰，更讓他們清楚看見信仰在你生活裏的 重要位置。`,
        steps: `• 請記緊你不用凡事做到完美才能成為基督徒;你只要讓人知道你是一個已經相信耶穌並學習 跟從祂的人。相比起一個完美的「好人」，有時候，一個謙卑的人所流露出來的生命更能喚起 別人積極的回應。
        \n• 想出一些容易而自然的方法讓他們知道你是基督徒，以積極正面的態度與他們分享一些你正 參與的活動和聚會，而不是過份強調一些基督徒不可以作的事情。`,
        example: `最近，在電視台工作的 George 被上司提升，得到他一直夢寐以求的職位 — 技術顧問，他更開心地 發現和他一起合作的演員和幕後團隊都非常友善。有天下班時，有幾位同事開始商量晚上消遣的地方， George 內心很忐忑，不知道該不該告訴他們晚上他會參與教會的查經小組。雖然他有點擔心假如 他說出來，同事們會覺得他很奇怪，然而他最終也決定要坦白告訴他們。有一位女同事問 George 是否一位虔誠的教徒，George 回答說他只是一個跟從耶穌的人。出乎意料地，George 發現同事並
        不覺得他奇怪，這經歷大大增強了他在職場裏為主而活的信心。`,
      },
      ['ar']: {
        top: `إيجاد طريقة طبيعية لإخبار زملائك أ ّنك مسيحي مبك ًرا في علاقتكم ُيه ّيئ السياق لأمور أخرى￼￼￼￼￼ ٍ
        ستقولها وتفعلها و ُيب ّين المكانة ال ُمه ّمة التي يشغلها الإيمان في حياتك.`,
        steps: `ضْعفياعتباركأنكلاتحتاجإلىأنتكونمثالّيالتكونمسيحّيا.أنتتقولببساطٍةإنكتؤمنبيسوع
        وُتحاولأنتّتبعه،وسيتجاَوبالناسمعشخ ٍص ُمتواضععلىنحوأفضل ِمن«شخ ٍصصالح». ٍٍ
        ًُِّ ًُُ فكر مل ّيا في ط ُر ٍق بسيط ٍة لعرض الأمر. ك ْن إيجاب ّيا واذكر الأنشطة التي تشترك بها وليس قائمة
        للأمور التي «لا تفعلها».`,
        example: `تولّى «إيان» ُمؤ َّخ ًرا المنصب الذي كان يحلُم به كمستشار تقني في الإنتاج التليفزيوني، وكان￼ مسرو ًرا لأ ّنه وجد فريق العمل ودو ًدا. وفي نهاية أحد أيام العمل بدأ العديد ِمن ال ّزملاء يتح ّدثون عن خططهم لقضاء السهرة وكان «إيان» ُمتر ّد ًدا أن ُيخبر المجموعة بأ ّنه ذاهب إلى مجموع ٍة صغير ٍة لدراسة الكتاب ال ُمق ّدس في هذا المساء خو ًفا ِمن أن يوصموه بالغرابة، لك ّنه ق ّرر أن يذ ُكر الأمر بطريق ٍة طبيعي ٍة. حينئ ٍذ سألته إحدى النساء ع ّما إذا كان ُمتد ّي ًنا، فأجاب «إيان» أ ّنه في الحقيقة شخص ي َّتبع يسوع. ِمن ال ُمثير للدهشة، أ ّن معظمهم كانوا مرتاحين على عكس ما كان «إيان» يخشى، وأشعل هذا رغبته في أن يعيش ِمن أجل المسيح في العمل.`,
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
      ['pt-PT']: [
        { text: 'Construir a', isBold: false },
        { text: 'uma Amizade', isBold: true },
      ],
      ['es']: [
        { text: 'Construir la', isBold: false },
        { text: 'amistad', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Construir uma', isBold: false },
        { text: 'amizade', isBold: true },
      ],
      ['zh-CN']: [{ text: '建立友誼', isBold: false }],
      ['ar']: [{ text: 'بناء صداقة', isBold: true }],
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
      ['pt-PT']: {
        top: `Jesus deu-nos o exemplo de construir relacionamentos com pessoas não cristãs. À medida que desenvolvemos relacionamentos com pessoas no nosso local de trabalho, temos mais oportunidades de mostrar o amor de Deus por eles.`,
        steps: `Pensa nos teus relacionamentos mais positivos no trabalho (atualmente ou no passado). O que contribuiu para esses bons relacionamentos?
          \nIdentifica relacionamentos no teu trabalho nos quais gostarias de investir mais. Faz uma lista de várias ações simples que podem ser úteis para construir esses relacionamentos.`,
        example: `O Tiago quer construir amizades no seu novo trabalho numa grande empresa de comunicação social. Ele conheceu o Tomás, que faz parte de outra equipa, e descobriu que ele tem uma grande paixão por justiça social. O Tomás sugeriu ao Tiago um livro sobre o assunto, e à medida que ele ia lendo, ia fazendo perguntas ao Tomás e iam discutindo os temas do livro. Agora, o Tiago sugeriu um livro cristão ao Tomás e eles começaram a discutir esse livro. Os dois conheceram-se melhor através deste processo e a amizade cresceu agora para interações sociais fora do local de trabalho.`,
      },
      ['es']: {
        top: `Jesús nos dio el ejemplo para construir relaciones con los no cristianos. A medida que desarrollamos relaciones con las personas en nuestros lugares de trabajo, tendremos más oportunidades para demostrarles el amor de Dios.`,
        steps: `Piensa en tus relaciones de trabajo más positivas, ya sea actualmente o en un trabajo anterior. ¿Qué cosas contribuyeron a desarrollar esas buenas relaciones?
        \nIdentifica las relaciones del trabajo en las que te gustaría poner más esfuerzo para su desarrollo. Enumera varias acciones sencillas que podrías tomar para fomentar esas relaciones.`,
        example: `Jaime quiere construir amistades en su nuevo trabajo en una gran corporación de medios. Ha llegado a conocer a Tomás quien está en otro equipo y descubrió que tiene una pasión por la justicia social. Tomás le sugirió a Jaime un libro sobre el tema, y a medida que lo va leyendo, le hace preguntas a Tomás, discutiendo temas del libro. Más adelante, Jaime le sugiere un libro cristiano a Tomás y han comenzado a discutir juntos algunos de esos temas. Han comenzado a conocerse mejor a través de este proceso y la amistad ha crecido hasta pasar tiempo juntos fuera del trabajo.`,
      },
      ['pt-BR']: {
        top: `Jesus nos deu o exemplo para construir relações com os não cristãos. A medida que desenvolvemos relações com pessoas em nossos locais de trabalho, temos mais oportunidades de demonstrar-lhes o amor de Deus para com eles.`,
        steps: `Pense em suas relações de trabalho mais positivas, seja atualmente ou em um trabalho anterior. Que coisas contribuíram para essas boas relações?
        \nIdentifique as relações de trabalho que você gostaria de se esforçar mais para desenvolver. Enumere várias ações simples que você poderia tomar para construir esses relacionamentos.`,
        example: `James quer construir amizades em seu novo emprego, uma grande empresa de mídia. Ele conheceu Tom em outra equipe e descobriu que ele é apaixonado por justiça social. Tom sugeriu um livro sobre o assunto para James, e enquanto lia ele fazia perguntas a Tom e eles discutiam os temas do livro. James agora sugeriu um livro cristão para Tom e eles começaram a discutir isso juntos. Os dois se conheceram melhor através desse processo e o relacionamento deles cresceu para interações sociais fora do trabalho.`,
      },
      ['zh-CN']: {
        top: `耶穌為我們樹立了榜樣，如何跟未信者建立關係。當我們能夠與工作場景中的同事建立 關係時，我們將有更多機會向他們展現神的愛。`,
        steps: `• 先回想一下在你現時或過去的工作場景中某些最良好、正面的人際關係。你認為有甚麼因素 促成這些良好的關係?
        \n• 列出一些你希望在現時的工作場景裏努力發展或改善的人際關係，然後寫下幾個簡單可行的 行動，幫助你與這些同事建立更好的關係。`,
        example: `Tommy 剛加入了一間大型的媒體公司，他希望跟同事建立友誼。最近，他認識了另一部門的同事 Andy， 並得悉他熱衷於社會公義的議題。Andy 建議 Tommy 看一本關於這方面的書，Tommy 看完後主動
        向 Andy 提出了一些問題並與 Andy 一起討論這本書。之後，Tommy 同樣地向 Andy 推介了一本有關 基督教信仰的書籍，Andy 也很樂意閱讀及與 Tommy 交流心得。在這互相交流的過程裏，他倆開始 認識對方更多，而二人的關係也慢慢由同事變成了朋友。`,
      },
      ['ar']: {
        top: `أعطانا يسوع مثا ًلا على بناء العلاقات مع غير المسيح ّيين، وبينما نن ّمي العلاقات مع الأفراد في￼￼￼￼￼￼￼￼￼ أماكن عملنا نحظى بالمزيد ِمن الفرص لإظهار محّبة الله لهم.`,
        steps: `ِّكر في أكثر علاقات العمل إيجابية لديك، سواء كانت حالي ًة أو سابق ًة. ما الأمور التي أسهمت في تلك￼￼
        العلاقات الجّيدة؟ 
        ُِّ حدد علاقات العمل التي ترغب في بذل مجهود أكبر لتنميتها، واذكر العديد ِمن التص ّرفات البسيطة
        التي ُيمكنك أن تفعلها لبناء تلك العلاقات.`,
        example: `يريد «جيمس» أن يبني صداقات في عمله الجديد في ُمؤ ّسس ٍة إعلامي ٍة كبير ٍة، فتع َّرف على￼
        «توم» ِمن فريق آخر واكتشف أ ّن لديه شغ ًفا نحو العدالة الاجتماعية. اقترح توم كتا ًبا عن هذا ٍ
        الموضوع على «جيمس»، وفي أثناء قراءته طرح بعض الأسئلة على «توم» وكانا ُيناقشان أفكارالكتاب.اقترح«جيمس»بعدذلككتاًبامسيحًّياعلى«توم»وبدآفيمناقشتهمًعا، واستطاع الاثنان أن يعرفا بعضهما البعض على نحو أفضل خلال هذه العملية ونمت علاقتهما الآن إلى التفاعلات الاجتماعية خارج العمل.`,
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
      ['pt-PT']: [
        { text: 'Partilhar a tua', isBold: false },
        { text: 'História', isBold: true },
      ],
      ['es']: [
        { text: 'Compartir tu', isBold: false },
        { text: 'historia', isBold: true },
      ],
      ['pt-BR']: [
        { text: 'Compartilhar a', isBold: false },
        { text: 'sua história', isBold: true },
      ],
      ['zh-CN']: [{ text: '分享你的生命故事', isBold: false }],
      ['ar']: [{ text: 'مشاركةق ّصتك', isBold: true }],
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
      ['pt-PT']: {
        top: `A tua experiência pessoal de ver Deus mudar a tua vida pode falar a outras pessoas de forma poderosa.`,
        steps: `Escreve a tua história sobre conhecer Jesus (máximo 3 minutos) e memoriza-a. Pratica contar a história com um dos membros do grupo.
          \nPensa em incidentes na tua vida em que a fé foi muito importante. Discute com o grupo formas de contar estas histórias no trabalho.`,
        example: `A Rute e a Márcia trabalham juntas numa empresa de design. À medida que se tornaram amigas, têm falado mais abertamente e a Rute acha que a Márcia tem algum interesse em coisas espirituais. Enquanto falavam sobre relações amorosas, a Rute contou à Márcia sobre quando teve um desgosto amoroso e como lutou com problemas de confiança durante algum tempo. A Rute também partilhou sobre como o seu relacionamento com Jesus a ajudou a aprender sobre verdadeira fidelidade. Isto criou um interesse maior na Márcia em aprender mais sobre Jesus.`,
      },
      ['es']: {
        top: `La experiencia personal de cómo Dios cambió tu vida puede ser una poderosa herramienta para iniciar conversaciones espirituales.`,
        steps: `Escribe la historia de cómo conociste a Jesús (3 minutos o menos) y memorízala. Practica contando tu historia con uno de los miembros del grupo.
        \nPiensa en una situación en el trabajo, o un tema de conversaciones frecuentes (estrés, dinero, etc.) en el que tu fe te ayudó a ver las cosas de manera diferente. ¿Cómo explicarías esto a un colega?`,
        example: `Rut y Marta trabajan en una empresa de diseño. A medida que se han hecho más amigas, han comenzado a conversar más abiertamente. Rut piensa que Marta tiene cierto interés en las cosas espirituales. Mientras hablaban sobre las relaciones románticas, Rut le contó a Marta sobre de un fracaso romántico reciente y cómo luchó con la falta de auto-confianza durante algún tiempo. Rut también le compartió cómo su relación con Jesús le ayudó a sentirse más segura en sí misma. Esto ha despertado el interés de Marta en hablar más acerca de Jesús.`,
      },
      ['pt-BR']: {
        top: `Sua experiência pessoal de ver como Deus tem mudado sua vida pode falar poderosamente aos demais.`,
        steps: `Escreva sua história de como conheceu a Jesus (3 minutos ou menos) e memorize-a. Pratique contando a sua história a cada um dos membros de sua equipe de trabalho.
        \nPense em incidentes ou temas em sua vida onde a fé tem desempenhado um papel importante. Discuta com o grupo as formas em que esses incidentes e a fé poderiam estar relacionados com situações no trabalho.`,
        example: `Ruth e Mara trabalham juntas em uma empresa de design. Como as duas se tornaram amigas, elas estão compartilhando mais abertamente uma com a outra, e Ruth sente que Mara tem algum interesse em coisas espirituais. Enquanto discutia relacionamentos românticos, Ruth confidenciou a Mara sobre um desgosto e como ela lutava com a confiança por algum tempo. Ruth também compartilhou como seu relacionamento com Jesus a ajudou a aprender sobre a verdadeira confiabilidade. Isso despertou o interesse de Mara em aprender mais sobre Jesus.`,
      },
      ['zh-CN']: {
        top: `神改變你生命的真實故事能對別人產生極大的震撼力。`,
        steps: `• 扼要地寫下你真實遇見耶穌並接受耶穌的故事(故事時限為三分鐘)，將這故事熟讀背誦， 然後嘗試找一位組員練習分享你的生命故事。
        \n• 回想在你生活中某幾次需要你突破信心(或信靠神)的具體事件，在小組裏一同討論如何能 把這些經歷中的學習應用在現時的工作場景中。`,
        example: `Mandy 和 Sara 在同一間設計公司工作。當她們慢慢成為朋友後，她倆之間的分享開始變得更加深入， 而 Mandy 也感覺到 Sara 似乎對信仰有些興趣。有一次，她倆談論到戀愛的話題，Mandy 坦誠地 向 Sara 分享了她過去的一次分手經歷如何影響她日後對人的信任。然後 Mandy 也藉這機會告訴 Sara，
        在她接受耶穌之後，在信仰歷程裏裡的經歷如何幫助她慢慢明白到何謂真正的信任和信靠。自這次 談話之後，Sara 對耶穌的興趣明顯地增加了。`,
      },
      ['ar']: {
        top: `ُيمكن التحّدث للآخرين من خلال اختبارك الشخصي عن تغيير الله لحياتك بفاعلية.`,
        steps: `اكت ْب ق ّصتك التي ُتل ّخص مقابلتك مع يسوع (في نحو 3 دقائق أو أقل) واحفظها في ذاكرتك. تد َّرب￼￼ على سرد ق ّصتك مع واح ٍد ِمن أفراد المجموعة.
        ف ِّكر في الأحداث أو الأفكار التي تدور في حياتك ويلعب فيها الإيمان دو ًرا كبي ًرا، وناقش مع المجموعة ُطرق ربطها مع المواقف في العمل.`,
        example: `تعمل «روث» و»مارا» م ًعا في شركة تصميمات، وعندما أصبحت الاثنتان صديق َت ْين صارتا￼ تتشاركنبمزيٍد ِمنالانفتاحمعبعضهماالبعضوشعرت«روث»أن«مارا»لديهابعض الاهتمام بالأمور الروحية. وفي أثناء مناقشتهما للعلاقات الرومانسية، كشفت «روث» لـ»مارا» عن علاق ٍة انتهت بالانفصال وكيف كافحت مع أزمة الثقة لبعض الوقت. وشاركت معها «روث» أيًضاكيفأنعلاقتهابيسوعساعدتهاعلىتعلُّمالجدارةبالثقةالحقيقية،فأثارهذااهتمام«مارا» بمعرفة المزيد عن يسوع.`,
      },
    },
  },
};
