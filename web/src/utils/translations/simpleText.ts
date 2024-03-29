import { Translations } from '../../constants';

// prettier-ignore
export type TranslationTextKey = 'enterRoomCode'|'enterName'|'noCodeHostNow'|'hostAGame'|'goBack'|'roomCode'|'room'|'code'|'name'|'join'|'letsGo'|'youreTheHost'|'startGame'|'goToNextRound'|'imDone'|'wereDone'|'readyToMoveOn'|'waitingOnEveryone'|'ready'|'discussChoices'|'hasLeft'|'hasJoined'|'disconnected'|'connected'|'youAreRemoved'|'blockedJoinedYouAreRemoved'|'copied'|'thanksSharing'|'pleaseSelectCard'|'changeRound'|'start'|'discussion'|'greatJob'|'done'|'discussionDesc'|'round1'|'round1Title'|'round1Desc'|'round2'|'round2Discuss'|'round2Title'|'round2Desc'|'round3'|'round3Discuss'|'round3Title'|'round3Desc'|'round4'|'round4Discuss'|'round4Title'|'round4Desc'|'boardOnly'|'removeUser'|'close'|'blocked'|'inactive'|'players'|'hostSettings'|'shareJoin'|'shareCode'|'share'|'havingFun'|'shareDescription'|'errorCodeNotValid'|'errorCodeNotAllowed'|'errorFillOutBoard'|'waitingOn'|'bePrepared'|'biscuitTrail';

export const TranslationText: { [key in Translations]: { [key2 in TranslationTextKey]: string } } = {
  [Translations.en]: {
    biscuitTrail: 'The Biscuit Trail',
    bePrepared: 'Be Prepared',
    enterRoomCode: 'Enter your Room Code',
    enterName: "What's your name?",
    noCodeHostNow: "Don't have a code? Host a Room for your friends!",
    hostAGame: 'Host a game',
    goBack: 'Go Back',
    roomCode: 'Room Code',
    room: 'Room',
    code: 'Code',
    name: 'Name',
    join: 'Join',
    letsGo: "Let's Go!",
    youreTheHost: "You're the Host!",
    startGame: 'Start Game!',
    goToNextRound: 'Go to next round',
    imDone: "I'm Done!",
    wereDone: "We're Done!",
    readyToMoveOn: 'Ready to move on?',
    waitingOnEveryone: 'Waiting on everyone else to finish and the host to move on.',
    ready: 'Ready!',
    discussChoices: "Discuss each other's choices.",
    hasLeft: 'has left',
    hasJoined: 'has joined',
    disconnected: 'Disconnected',
    connected: 'Connected',
    youAreRemoved: 'You have been removed',
    blockedJoinedYouAreRemoved: 'You are not allowed to join, you have been removed.',
    copied: 'Copied!',
    thanksSharing: 'Thanks for sharing!',
    pleaseSelectCard: 'Please select at least one card first!',
    changeRound: 'Change Round',
    start: 'Start!',
    discussion: 'Discussion',
    greatJob: 'Great Job Everyone!',
    done: 'Done!',
    discussionDesc: 'Now discuss together why you made your choices.',
    round1: 'Round 1',
    round1Title: 'Order the cards as a group',
    round1Desc: `Drag cards into what you think would be the proper order for taking steps with a colleague. Discuss it with your group as you collaborate together!`,
    round2: 'Round 2',
    round2Discuss: 'Round 2 Discuss',
    round2Title: 'Select the cards you think are the easiest',
    round2Desc: 'Choose the cards that you think are the easiest',
    round3: 'Round 3',
    round3Discuss: 'Round 3 Discuss',
    round3Title: 'Select the cards you think are the hardest',
    round3Desc: 'Choose the cards that you think are the hardest',
    round4: 'Round 4',
    round4Discuss: 'Round 4 Discuss',
    round4Title: 'Select the card(s) you will commit to engaging with',
    round4Desc: 'Choose the cards that you will commit to engaging with',
    boardOnly: 'Board Only',
    removeUser: 'Remove User',
    close: 'Close',
    blocked: 'Blocked',
    inactive: 'Inactive',
    players: 'Players',
    hostSettings: 'Host Settings',
    shareJoin: 'Join me at',
    shareCode: 'Share this code:',
    share: 'Share',
    havingFun: 'Having fun with Biscuit Trail?',
    waitingOn: 'Waiting on',
    shareDescription: `Share this game with your friends to help them become confident in sharing their faith with their colleagues!`,
    errorCodeNotValid: 'Sorry, that code is not valid.',
    errorCodeNotAllowed: 'Sorry, you are not allowed to join.',
    errorFillOutBoard: 'Please fill out the board before continuing.',
  },
  [Translations.mn]: {
    biscuitTrail: 'Жигнэмэг санал болгох алхмууд',
    bePrepared: 'Бэлтгэлтэй бай',
    enterRoomCode: 'Өрөөний дугаараа оруулна уу.',
    enterName: 'Таныг хэн гэдэг вэ?',
    noCodeHostNow: 'Дугаар байхгүй юу? Найзууддаа зориулж өрөө үүсгээрэй.',
    hostAGame: 'Тоглоом удирдах',
    goBack: 'Буцах',
    roomCode: 'Өрөөний дугаар',
    room: 'Өрөө',
    code: 'Дугаар',
    name: 'Нэр',
    join: 'Нэгдэх',
    letsGo: 'Эхэлцгээе',
    youreTheHost: 'Та бол тоглоомын удирдагч',
    startGame: 'Тоглоом эхлүүлэх!',
    goToNextRound: 'Дараагийн үерүү явах',
    imDone: 'Би болчихлоо!',
    wereDone: 'Бид болчихлоо!',
    readyToMoveOn: 'Үргэлжлүүлэхэд бэлэн үү?',
    waitingOnEveryone: 'Хүн бүрийг дуусгаж, удирдагч цааш үргэлжлүүлэхийг хүлээж байна.',
    ready: 'Эхлэхэд бэлэн!',
    discussChoices: 'Бие биетэйгээ сонголтуудаа харьцуулж ярилцаарай.',
    hasLeft: 'Гарчихлаа',
    hasJoined: 'Нэгдлээ',
    disconnected: 'Сүлжээнээс тасарлаа',
    connected: 'Холбогдлоо',
    youAreRemoved: 'Таныг өрөөнөөс гаргалаа.',
    blockedJoinedYouAreRemoved: 'Таныг өрөөнөөс гаргасан тул та нэвтрэх боломжгүй байна.',
    copied: 'Хуулсан!',
    thanksSharing: 'Хуваалцсанд баярлалаа.',
    pleaseSelectCard: 'Дор хаяж нэг карт сонгоно уу.',
    changeRound: 'Үеийг өөрчлөх',
    start: 'Эхлэ!',
    discussion: 'Ярилцлага',
    greatJob: 'Бүгд сайн ажиллалаа!',
    done: 'Дууссан.',
    discussionDesc: 'Хамтдаа яагаад энэ сонголтыг хийсэн тухайгаа ярилцаарай.',
    round1: '1-р үе',
    round1Title: 'Бүлгээрээ картуудаа эрэмбэлээрэй',
    round1Desc: `Картуудыг өөрсдийнхөө гүйцэтгэхэд тохиромжтой эрэмбийн дагуу байрлуулна уу. Хоорондоо ярилцаж, багаар ажиллаарай.`,
    round2: '2-р үе',
    round2Discuss: '2-р үеийн ярилцлага',
    round2Title: 'Өөрийн хувьд хамгийн амархан картуудыг ялгана уу.',
    round2Desc: 'Өөрийн хувьд хамгийн амархан картуудыг сонгоно уу.',
    round3: '3-р үе',
    round3Discuss: '3-р үеийн ярилцлага',
    round3Title: 'Өөрийн тань хувьд хамгийн хэцүү картуудыг ялгана уу.',
    round3Desc: 'Өөрийн тань хувьд хамгийн хэцүү картуудыг сонгоно уу.',
    round4: '4-р үе',
    round4Discuss: '4-р үеийн ярилцлага',
    round4Title: 'Өөрийн хэрэгжүүлэх картуудыг ялгана уу.',
    round4Desc: 'Өөрийн хэрэгжүүлэх картуудыг сонгоно уу.',
    boardOnly: 'Зөвхөн самбарт',
    removeUser: 'Оролцогчийг өрөөнөөс гаргах',
    close: 'Хаах',
    blocked: 'Блоклуулсан',
    inactive: 'Идэвхигүй',
    players: 'Тоглогчид',
    hostSettings: 'Удирдагчийн тохиргоо',
    shareJoin: 'Надтай нэгдэнэ үү.',
    shareCode: 'Энэ дугаарыг хуваалцаарай',
    share: 'Хуваалцах',
    havingFun: 'Жигнэмэг санал болгох алхмууд зугаатай байна уу?',
    waitingOn: 'Хүлээж байна',
    shareDescription: `Найзуудаа хамт олонтойгоо итгэл үнэмшилээ зоригтой хуваалцахад нь туслахыг хүсвэл энэ тоглоомыг тэдэнтэй хуваалцаарай.`,
    errorCodeNotValid: 'Уучлаарай, хүчингүй дугаар байна.',
    errorCodeNotAllowed: 'Уучлаарай, та нэвтрэх боломжгүй байна.',
    errorFillOutBoard: 'Үргэлжлүүлэхээс өмнө самбарыг бөглөнө үү.',
  },
  [Translations.fr]: {
    biscuitTrail: 'Le Sentier du Biscuit',
    bePrepared: 'Soyez Prêt',
    enterRoomCode: 'Entrez votre code de chambre',
    enterName: 'Quel est ton nom?',
    noCodeHostNow: "Vous n'avez pas de code? Hébergez une salle pour vos amis!",
    hostAGame: 'Hébergez un jeu',
    goBack: 'Retourner',
    roomCode: 'Code de chambre',
    room: 'Chambre',
    code: 'Code',
    name: 'Nom',
    join: 'Joindre',
    letsGo: `Allons-y!`,
    youreTheHost: `Vous êtes l'hôte!`,
    startGame: `Démarrer jeu!`,
    goToNextRound: `Passer au tour suivant`,
    imDone: `J'ai fini!`,
    wereDone: `Avaient fini!`,
    readyToMoveOn: `Prêt à continuer?`,
    waitingOnEveryone: `Attendre que tout le monde finisse et que l'hôte passe à autre chose.`,
    ready: `Prêt!`,
    discussChoices: `Discutez des choix de chacun.`,
    hasLeft: `a quitté`,
    hasJoined: `a rejoint`,
    disconnected: `Débranché`,
    connected: `Lié`,
    youAreRemoved: `Vous avez été supprimé`,
    blockedJoinedYouAreRemoved: `Vous n'êtes pas autorisé à rejoindre, vous avez été supprimé.`,
    copied: `Copié!`,
    thanksSharing: `Merci d'avoir partagé!`,
    pleaseSelectCard: `Veuillez d'abord sélectionner au moins une carte!`,
    changeRound: `Changer de tour`,
    start: `Début!`,
    discussion: `Discussion`,
    greatJob: `Excellent travail à tous!`,
    done: `Terminé!`,
    discussionDesc: `Maintenant, discutez ensemble des raisons pour lesquelles vous avez fait vos choix.`,
    round1: `Tour 1`,
    round1Title: `Commandez les cartes en groupe`,
    round1Desc: `Faites glisser les cartes dans ce que vous pensez être le bon ordre pour entreprendre des démarches avec un collègue. Discutez-en avec votre groupe pendant que vous collaborez ensemble!`,
    round2: `2ème round`,
    round2Discuss: `Ronde 2 Discuter`,
    round2Title: `Sélectionnez les cartes qui vous semblent les plus simples`,
    round2Desc: `Choisissez les cartes que vous jugez les plus faciles`,
    round3: `3e tour`,
    round3Discuss: `Ronde 3 Discuter`,
    round3Title: `Sélectionnez les cartes qui vous semblent les plus difficiles`,
    round3Desc: `Choisissez les cartes qui vous semblent les plus difficiles`,
    round4: `Tour 4`,
    round4Discuss: `Ronde 4 Discuter`,
    round4Title: `Sélectionnez la ou les cartes avec lesquelles vous vous engagez à interagir`,
    round4Desc: `Choisissez les cartes avec lesquelles vous vous engagez à vous engager`,
    boardOnly: `Conseil seulement`,
    removeUser: `Supprimer l'utilisateur`,
    close: `proche`,
    blocked: `Bloqué`,
    inactive: `Inactif`,
    players: `Joueurs`,
    hostSettings: `Paramètres de l'hôte`,
    shareJoin: `Rejoignez-moi à`,
    shareCode: `Partagez ce code:`,
    share: `Partager`,
    havingFun: `Vous vous amusez avec Biscuit Trail?`,
    waitingOn: `Attendre sur`,
    shareDescription: `Partagez ce jeu avec vos amis pour les aider à devenir confiants en partageant leur foi avec leurs collègues!`,
    errorCodeNotValid: `Désolé, ce code n'est pas valide.`,
    errorCodeNotAllowed: `Désolé, vous n'êtes pas autorisé à rejoindre.`,
    errorFillOutBoard: `Veuillez remplir le tableau avant de continuer.`,
  },
  [Translations.lt]: {
    biscuitTrail: 'Prieskoniai',
    bePrepared: 'Būk pasiruošęs',
    enterRoomCode: 'Įveskite savo kambario kodą',
    enterName: 'Koks tavo vardas?',
    noCodeHostNow: 'Neturite kodo? Priimkite kambarį savo draugams!',
    hostAGame: 'Vedu žaidimą',
    goBack: 'Eik atgal',
    roomCode: 'Kambario kodas',
    room: 'Kambarys',
    code: 'Kodas',
    name: 'vardas',
    join: 'Prisijunkite',
    letsGo: 'Eime!',
    youreTheHost: 'Tu esi vedėjas!',
    startGame: 'Pradėti žaidimą!',
    goToNextRound: 'Eikite į kitą turą',
    imDone: 'Aš baigiau!',
    wereDone: 'Mes baigėme!',
    readyToMoveOn: 'Pasiruošę judėti toliau?',
    waitingOnEveryone: 'Laukiu, kol visi kiti baigs, o šeimininkas eis toliau.',
    ready: 'Paruošta!',
    discussChoices: 'Aptarkite vienas kito pasirinkimus.',
    hasLeft: 'Liko',
    hasJoined: 'Prisijungė',
    disconnected: 'Atjungtas',
    connected: 'Prisijungta',
    youAreRemoved: 'Jus pašalino',
    blockedJoinedYouAreRemoved: 'Jums neleidžiama prisijungti, jus pašalino.',
    copied: 'Nukopijuota!',
    thanksSharing: 'Ačiū už dalinimąsi!',
    pleaseSelectCard: 'Pirmiausia pasirinkite bent vieną kortelę!',
    changeRound: 'Keisti turą',
    start: 'Pradėk!',
    discussion: 'Diskusija',
    greatJob: 'Puikus darbas visiems!',
    done: 'Padaryta!',
    discussionDesc: 'Dabar kartu aptarkite, kodėl pasirinkote.',
    round1: '1 turas',
    round1Title: 'Užsisakykite korteles kaip grupę',
    round1Desc: `Nuvilkite korteles į, jūsų manymu, tinkamą tvarką žingsniams su kolega. Aptarkite tai su savo grupe, kai bendradarbiaujate kartu!`,
    round2: '2 turas',
    round2Discuss: '2 turas Aptarkite',
    round2Title: 'Pasirinkite korteles, kurios, jūsų manymu, yra lengviausios',
    round2Desc: 'Pasirinkite korteles, kurios, jūsų manymu, yra lengviausios',
    round3: '3 turas',
    round3Discuss: '3 turas Aptarkite',
    round3Title: 'Pasirinkite korteles, kurios, jūsų manymu, yra sunkiausios',
    round3Desc: 'Pasirinkite korteles, kurios, jūsų manymu, yra sunkiausios',
    round4: '4 turas',
    round4Discuss: '4 turas Aptarkite',
    round4Title: 'Pasirinkite kortelę (-es), su kuria įsipareigosite bendrauti',
    round4Desc: 'Pasirinkite korteles, su kuriomis įsipareigosite užsiimti',
    boardOnly: 'Tik lenta',
    removeUser: 'Pašalinti vartotoją',
    close: 'Uždaryti',
    blocked: 'Užblokuota',
    inactive: 'Neaktyvus',
    players: 'Žaidėjai',
    hostSettings: 'Pagrindinio kompiuterio nustatymai',
    shareJoin: 'Prisijunkite prie manęs',
    shareCode: 'Bendrinkite šį kodą:',
    share: 'Dalintis',
    havingFun: 'Pramogos su sausainių taku?',
    waitingOn: 'Laukiama toliau',
    shareDescription: `Pasidalinkite šiuo žaidimu su draugais, kad padėtumėte jiems labiau pasitikėti savo kolegomis!`,
    errorCodeNotValid: 'Deja, šis kodas neteisingas.',
    errorCodeNotAllowed: 'Deja, jums neleidžiama prisijungti.',
    errorFillOutBoard: 'Prieš tęsdami, užpildykite lentą.',
  },
  [Translations.it]: {
    biscuitTrail: 'La scatola dei biscotti',
    bePrepared: 'Essere preparato',
    enterRoomCode: 'Inserisci il tuo codice camera',
    enterName: 'Come ti chiami?',
    noCodeHostNow: 'Non hai un codice? Ospita una stanza per i tuoi amici!',
    hostAGame: 'Ospita una partita',
    goBack: 'Torna indietro',
    roomCode: 'Codice stanza',
    room: 'Camera',
    code: 'Codice',
    name: 'Nome',
    join: 'Aderire',
    letsGo: 'Andiamo!',
    youreTheHost: "Sei l'host!",
    startGame: 'Inizia il gioco!',
    goToNextRound: 'Vai al prossimo round',
    imDone: 'Ho finito!',
    wereDone: 'Sono stati fatti!',
    readyToMoveOn: 'Pronto per andare avanti?',
    waitingOnEveryone: `Aspettando che tutti gli altri finissero e che l'host andasse avanti.`,
    ready: 'Pronto!',
    discussChoices: 'Discutete le scelte degli altri.',
    hasLeft: `se n'è andato`,
    hasJoined: 'ha aderito',
    disconnected: 'Disconnesso',
    connected: 'Collegato',
    youAreRemoved: 'Sei stato rimosso',
    blockedJoinedYouAreRemoved: 'Non sei autorizzato a partecipare, sei stato rimosso.',
    copied: 'Copiato!',
    thanksSharing: 'Grazie per la condivisione!',
    pleaseSelectCard: 'Seleziona prima almeno una carta!',
    changeRound: 'Cambia round',
    start: 'Inizio!',
    discussion: 'Discussione',
    greatJob: 'Ottimo lavoro a tutti!',
    done: 'Fatto!',
    discussionDesc: 'Ora discutete insieme perché avete fatto le vostre scelte.',
    round1: 'Turno 1',
    round1Title: 'Ordina le carte come gruppo',
    round1Desc: `Trascina le carte in quello che pensi sarebbe l'ordine corretto per fare passi con un collega. Discutilo con il tuo gruppo mentre collabori insieme!`,
    round2: 'Turno 2',
    round2Discuss: 'Round 2 Discussione',
    round2Title: 'Seleziona le carte che ritieni siano le più facili',
    round2Desc: 'Scegli le carte che ritieni più facili',
    round3: 'Turno 3',
    round3Discuss: 'Round 3 Discussione',
    round3Title: 'Seleziona le carte che ritieni siano le più difficili',
    round3Desc: 'Scegli le carte che ritieni siano le più difficili',
    round4: 'round4',
    round4Discuss: 'Round 4 Discussione',
    round4Title: 'Seleziona le carte con le quali ti impegnerai',
    round4Desc: 'Scegli le carte con cui ti impegnerai a interagire',
    boardOnly: 'Solo bordo',
    removeUser: 'Rimuovi utente',
    close: 'Vicino',
    blocked: 'Bloccato',
    inactive: 'Inattivo',
    players: 'Giocatori',
    hostSettings: 'Impostazioni host',
    shareJoin: 'Unisciti a me a',
    shareCode: 'Condividi questo codice:',
    share: 'Condividere',
    havingFun: 'Divertirsi con scatola dei biscotti?',
    waitingOn: 'Aspettando',
    shareDescription: `Condividi questo gioco con i tuoi amici per aiutarli a diventare sicuri di condividere la loro fede con i loro colleghi!`,
    errorCodeNotValid: 'Spiacenti, il codice non è valido.',
    errorCodeNotAllowed: 'Spiacenti, non sei autorizzato a partecipare.',
    errorFillOutBoard: 'Si prega di compilare la scheda prima di continuare.',
  },
  [Translations.ptPT]: {
    biscuitTrail: 'A Caixa de Biscoitos',
    bePrepared: 'Esteja preparado',
    enterRoomCode: 'Digite o código do seu quarto',
    enterName: 'Qual o seu nome?',
    noCodeHostNow: 'Não tem um código? Hospede um quarto para seus amigos!',
    hostAGame: 'Hospede um jogo',
    goBack: 'Volte',
    roomCode: 'Código da sala',
    room: 'Quarto',
    code: 'Código',
    name: 'Nome',
    join: 'Junte-se',
    letsGo: 'Vamos!',
    youreTheHost: 'Você é o anfitrião!',
    startGame: 'Começar o jogo!',
    goToNextRound: 'Vá para a próxima rodada',
    imDone: 'Terminei!',
    wereDone: 'Foram realizadas!',
    readyToMoveOn: 'Pronto para seguir em frente?',
    waitingOnEveryone: 'Esperando que todos terminem e o anfitrião siga em frente.',
    ready: 'Pronto!',
    discussChoices: 'Discuta as escolhas uns dos outros.',
    hasLeft: 'deixou',
    hasJoined: 'Juntou se, se juntou',
    disconnected: 'Desconectado',
    connected: 'Conectado',
    youAreRemoved: 'Você foi removido',
    blockedJoinedYouAreRemoved: 'Você não tem permissão para entrar, você foi removido.',
    copied: 'Copiado!',
    thanksSharing: 'Obrigado por compartilhar!',
    pleaseSelectCard: 'Selecione pelo menos um cartão primeiro!',
    changeRound: 'Mudança de Rodada',
    start: 'Começar!',
    discussion: 'Discussão',
    greatJob: 'Ótimo trabalho, todos!',
    done: 'Feito!',
    discussionDesc: 'Agora discutam juntos por que vocês fizeram suas escolhas.',
    round1: 'Rodada 1',
    round1Title: 'Ordene os cartões como um grupo',
    round1Desc: `Arraste os cartões para o que você acha que seria a ordem adequada para dar passos com um colega. Discuta isso com seu grupo enquanto você colabora!`,
    round2: '2 ª rodada',
    round2Discuss: '2ª Rodada Discuta',
    round2Title: 'Selecione os cartões que você acha mais fáceis',
    round2Desc: 'Escolha as cartas que você acha mais fáceis',
    round3: 'Rodada 3',
    round3Discuss: 'Rodada 3 Discuta',
    round3Title: 'Selecione as cartas que você acha que são as mais difíceis',
    round3Desc: 'Escolha as cartas que você acha que são as mais difíceis',
    round4: 'Rodada 4',
    round4Discuss: 'Rodada 4 Discuta',
    round4Title: 'Selecione os cartões com os quais você se comprometerá a interagir',
    round4Desc: 'Escolha os cartões com os quais você se comprometerá a interagir',
    boardOnly: 'Apenas placa',
    removeUser: 'Remover usuário',
    close: 'Perto',
    blocked: 'Bloqueado',
    inactive: 'Inativo',
    players: 'Jogadoras',
    hostSettings: 'Configurações do servidor',
    shareJoin: 'Junte-se a mim em',
    shareCode: 'Compartilhe este código:',
    share: 'Compartilhar',
    havingFun: 'Está se divertindo com a Caixa de Biscoitos?',
    waitingOn: 'Esperando',
    shareDescription: `Compartilhe este jogo com seus amigos para ajudá-los a ter confiança em compartilhar sua fé com seus colegas!`,
    errorCodeNotValid: 'Desculpe, esse código não é válido.',
    errorCodeNotAllowed: 'Desculpe, você não tem permissão para entrar.',
    errorFillOutBoard: 'Por favor, preencha o quadro antes de continuar.',
  },
  [Translations.ptBR]: {
    biscuitTrail: 'A Caixa de Biscoitos',
    bePrepared: 'Esteja preparado',
    enterRoomCode: 'Digite o código do seu quarto',
    enterName: 'Qual o seu nome?',
    noCodeHostNow: 'Não tem um código? Hospede um quarto para seus amigos!',
    hostAGame: 'Hospede um jogo',
    goBack: 'Volte',
    roomCode: 'Código da sala',
    room: 'Quarto',
    code: 'Código',
    name: 'Nome',
    join: 'Junte-se',
    letsGo: 'Vamos!',
    youreTheHost: 'Você é o anfitrião!',
    startGame: 'Começar o jogo!',
    goToNextRound: 'Vá para a próxima rodada',
    imDone: 'Terminei!',
    wereDone: 'Foram realizadas!',
    readyToMoveOn: 'Pronto para seguir em frente?',
    waitingOnEveryone: 'Esperando que todos terminem e o anfitrião siga em frente.',
    ready: 'Pronto!',
    discussChoices: 'Discuta as escolhas uns dos outros.',
    hasLeft: 'deixou',
    hasJoined: 'Juntou se, se juntou',
    disconnected: 'Desconectado',
    connected: 'Conectado',
    youAreRemoved: 'Você foi removido',
    blockedJoinedYouAreRemoved: 'Você não tem permissão para entrar, você foi removido.',
    copied: 'Copiado!',
    thanksSharing: 'Obrigado por compartilhar!',
    pleaseSelectCard: 'Selecione pelo menos um cartão primeiro!',
    changeRound: 'Mudança de Rodada',
    start: 'Começar!',
    discussion: 'Discussão',
    greatJob: 'Ótimo trabalho, todos!',
    done: 'Feito!',
    discussionDesc: 'Agora discutam juntos por que vocês fizeram suas escolhas.',
    round1: 'Rodada 1',
    round1Title: 'Ordene os cartões como um grupo',
    round1Desc: `Arraste os cartões para o que você acha que seria a ordem correta para dar passos com um colega. Discuta isso com seu grupo enquanto você colabora!`,
    round2: '2 ª rodada',
    round2Discuss: '2ª Rodada Discuta',
    round2Title: 'Selecione os cartões que você acha mais fáceis',
    round2Desc: 'Escolha as cartas que você acha mais fáceis',
    round3: 'Rodada 3',
    round3Discuss: 'Rodada 3 Discuta',
    round3Title: 'Selecione as cartas que você acha que são as mais difíceis',
    round3Desc: 'Escolha as cartas que você acha que são as mais difíceis',
    round4: 'Rodada 4',
    round4Discuss: 'Rodada 4 Discuta',
    round4Title: 'Selecione os cartões com os quais você se comprometerá a interagir',
    round4Desc: 'Escolha os cartões com os quais você se comprometerá a interagir',
    boardOnly: 'Apenas placa',
    removeUser: 'Remover usuário',
    close: 'Perto',
    blocked: 'Bloqueado',
    inactive: 'Inativo',
    players: 'Jogadoras',
    hostSettings: 'Configurações do servidor',
    shareJoin: 'Junte-se a mim em',
    shareCode: 'Compartilhe este código:',
    share: 'Compartilhar',
    havingFun: 'Está se divertindo com a Caixa de Biscoitos?',
    waitingOn: 'Esperando',
    shareDescription: `Compartilhe este jogo com seus amigos para ajudá-los a ter confiança em compartilhar sua fé com seus colegas!`,
    errorCodeNotValid: 'Desculpe, esse código não é válido.',
    errorCodeNotAllowed: 'Desculpe, você não tem permissão para entrar.',
    errorFillOutBoard: 'Por favor, preencha o quadro antes de continuar.',
  },
  [Translations.es]: {
    biscuitTrail: 'El Rastro de las Galletas',
    bePrepared: 'Estar preparado',
    enterRoomCode: 'Ingrese su código de habitación',
    enterName: '¿Cuál es tu nombre?',
    noCodeHostNow: '¿No tienes un código? ¡Organiza una sala para tus amigos!',
    hostAGame: 'Organizar un juego',
    goBack: 'Regresa',
    roomCode: 'Código de habitación',
    room: 'Habitación',
    code: 'Código',
    name: 'Nombre',
    join: 'Unirse',
    letsGo: '¡Vamonos!',
    youreTheHost: '¡Eres el Anfitrión!',
    startGame: '¡Empezar juego!',
    goToNextRound: 'Ir a la siguiente ronda',
    imDone: '¡He terminado!',
    wereDone: '¡Terminamos!',
    readyToMoveOn: '¿Listo para moverse?',
    waitingOnEveryone: 'Esperando que todos los demás terminen y que el anfitrión siga adelante',
    ready: '¡Listo!',
    discussChoices: 'Discuta las opciones de los demás',
    hasLeft: 'ha dejado',
    hasJoined: 'se ha unido',
    disconnected: 'Desconectado',
    connected: 'Conectado',
    youAreRemoved: 'Te han eliminado',
    blockedJoinedYouAreRemoved: 'No se le permite unirse, ha sido eliminado.',
    copied: 'Copiado!',
    thanksSharing: '¡Gracias por compartir!',
    pleaseSelectCard: '¡Por favor, seleccione primero al menos una tarjeta!',
    changeRound: 'Cambiar ronda',
    start: '¡Comienzo!',
    discussion: 'Discusión',
    greatJob: '¡Buen trabajo a todos!',
    done: '¡Hecho!',
    discussionDesc: 'Ahora discutan juntos por qué tomaron sus decisiones',
    round1: 'ronda 1',
    round1Title: 'Ordene las tarjetas en grupo',
    round1Desc: `Arrastre las tarjetas a lo que crea que sería el orden correcto para tomar medidas con un colega. ¡Discuta esto con su grupo mientras colaboran juntos! `,
    round2: 'ronda 2',
    round2Discuss: 'Discusión de la Ronda 2',
    round2Title: 'Selecciona las cartas que creas que son las más fáciles',
    round2Desc: 'Elige las cartas que creas que son las más fáciles',
    round3: 'Ronda 3',
    round3Discuss: 'Discusión de la Ronda 3',
    round3Title: 'Selecciona las cartas que creas que son las más difíciles',
    round3Desc: 'Elige las cartas que creas que son las más difíciles',
    round4: 'Ronda 4',
    round4Discuss: 'Ronda 4 Discusión',
    round4Title: 'Seleccione las tarjetas con las que se comprometerá a participar',
    round4Desc: 'Elija las cartas con las que se comprometerá a participar',
    boardOnly: 'Solo tablero',
    removeUser: 'Eliminar usuario',
    close: 'Cerca',
    blocked: 'Obstruido',
    inactive: 'Inactivo',
    players: 'Jugadores',
    hostSettings: 'Configuración de host',
    shareJoin: 'Únete a mí en',
    shareCode: 'Comparte este código:',
    share: 'Compartir',
    havingFun: '¿Te diviertes con Rastro de las Galletas?',
    waitingOn: 'Esperando que',
    shareDescription: `¡Comparte este juego con tus amigos para ayudarlos a tener confianza en compartir su fe con sus colegas!`,
    errorCodeNotValid: 'Lo siento, ese código no es válido.',
    errorCodeNotAllowed: 'Lo siento, no puedes unirte.',
    errorFillOutBoard: 'Por favor, complete el tablero antes de continuar.',
  },
  [Translations.zhCN]: {
    biscuitTrail: 'The Biscuit Trail 「奇」 跡',
    bePrepared: '預備',
    enterRoomCode: '輸入您的房間代碼',
    enterName: '你叫什麼名字？',
    noCodeHostNow: '沒有密碼？為您的朋友託管一個房間！',
    hostAGame: '主持遊戲',
    goBack: '回去',
    roomCode: '房間代碼',
    room: '房間',
    code: '碼',
    name: '名稱',
    join: '加入',
    letsGo: '我們走吧！',
    youreTheHost: '您是房東！',
    startGame: '開始遊戲！',
    goToNextRound: '轉到下一輪',
    imDone: '我受夠了！',
    wereDone: '我們做完了！',
    readyToMoveOn: '準備繼續前進嗎？',
    waitingOnEveryone: '等待其他人完成，然後主持人繼續前進。',
    ready: '準備！',
    discussChoices: '討論彼此的選擇。',
    hasLeft: '已經離開了',
    hasJoined: '已經加入',
    disconnected: '斷線',
    connected: '連接的',
    youAreRemoved: '您已被刪除',
    blockedJoinedYouAreRemoved: '您不被允許加入，您已被刪除。',
    copied: '複製！',
    thanksSharing: '感謝分享！',
    pleaseSelectCard: '請至少選擇一張卡！',
    changeRound: '輪迴',
    start: '開始！',
    discussion: '討論區',
    greatJob: '大家好！',
    done: '做完了！',
    discussionDesc: '現在一起討論為什麼做出選擇。',
    round1: '第1輪',
    round1Title: '一起訂購卡',
    round1Desc: `將卡片拖到您認為與同事採取步驟的適當順序中。一起協作時，與小組討論！`,
    round2: '第二回合',
    round2Discuss: '第二輪討論',
    round2Title: '選擇您認為最簡單的卡片',
    round2Desc: '選擇您認為最簡單的卡片',
    round3: '第三回合',
    round3Discuss: '第三回合討論',
    round3Title: '選擇您認為最難的卡片',
    round3Desc: '選擇您認為最難的卡片',
    round4: '第四回合',
    round4Discuss: '第四輪討論',
    round4Title: '選擇您要參與的卡片',
    round4Desc: '選擇您要參與的卡片',
    boardOnly: '僅董事會',
    removeUser: '刪除用戶',
    close: '關',
    blocked: '受阻',
    inactive: '不活躍',
    players: '玩家們',
    hostSettings: '主機設定',
    shareJoin: '和我一起',
    shareCode: '分享此代碼：',
    share: '分享',
    havingFun: '玩餅乾徑嗎？',
    waitingOn: '等待中',
    shareDescription: `與您的朋友分享這個遊戲，以幫助他們變得自信與同事分享信仰！`,
    errorCodeNotValid: '抱歉，該代碼無效。',
    errorCodeNotAllowed: '抱歉，您不能加入。',
    errorFillOutBoard: '請先填寫板，然後再繼續。',
  },
  [Translations.ar]: {
    biscuitTrail: 'البطاقات الفردية',
    bePrepared: 'كونوا ُممستعّدين',
    enterRoomCode: 'أدخل رمز غرفتك',
    enterName: 'ما هو اسمك؟',
    noCodeHostNow: 'ليس لديك رمز؟ استضف غرفة لأصدقائك!',
    hostAGame: 'استضف لعبة',
    goBack: 'عد',
    roomCode: 'كود الغرفة',
    room: 'غرفة',
    code: 'الشفرة',
    name: 'اسم',
    join: 'انضم',
    letsGo: 'لنذهب!',
    youreTheHost: 'أنت المضيف!',
    startGame: 'بدء اللعبة!',
    goToNextRound: 'اذهب إلى الجولة التالية',
    imDone: 'انتهيت!',
    wereDone: 'لقد انتهينا!',
    readyToMoveOn: 'على استعداد للتحرك في؟',
    waitingOnEveryone: 'ينتظر الجميع حتى ينتهي والمضيف يمضي قدمًا.',
    ready: 'جاهز!',
    discussChoices: 'ناقش اختيارات كل منكما.',
    hasLeft: 'غادر',
    hasJoined: 'وقد انضمت',
    disconnected: 'انقطع الاتصال',
    connected: 'متصل',
    youAreRemoved: 'لقد تم إزالتك',
    blockedJoinedYouAreRemoved: 'غير مسموح لك بالانضمام ، لقد تمت إزالتك.',
    copied: 'نسخ!',
    thanksSharing: 'شكرا للمشاركة!',
    pleaseSelectCard: 'الرجاء تحديد بطاقة واحدة على الأقل أولاً!',
    changeRound: 'جولة التغيير',
    start: 'بداية!',
    discussion: 'نقاش',
    greatJob: 'عمل رائع للجميع!',
    done: 'منجز!',
    discussionDesc: 'ناقش الآن معًا سبب اختياراتك.',
    round1: 'الجولة 1',
    round1Title: 'اطلب البطاقات كمجموعة',
    round1Desc: `اسحب البطاقات إلى ما تعتقد أنه الترتيب الصحيح لاتخاذ الخطوات مع زميل. ناقشها مع مجموعتك وأنت تتعاون معًا!`,
    round2: 'الجولة 2',
    round2Discuss: 'الجولة الثانية مناقشة',
    round2Title: 'حدد البطاقات التي تعتقد أنها الأسهل',
    round2Desc: 'اختر البطاقات التي تعتقد أنها الأسهل',
    round3: 'الجولة 3',
    round3Discuss: 'الجولة الثالثة مناقشة',
    round3Title: 'حدد البطاقات التي تعتقد أنها الأصعب',
    round3Desc: 'اختر البطاقات التي تعتقد أنها الأصعب',
    round4: 'الجولة 4',
    round4Discuss: 'الجولة 4 مناقشة',
    round4Title: 'حدد البطاقة (البطاقات) التي ستلتزم بالتعامل معها',
    round4Desc: 'اختر البطاقات التي ستلتزم بالتعامل معها',
    boardOnly: 'المجلس فقط',
    removeUser: 'إزالة المستخدم',
    close: 'أغلق',
    blocked: 'ممنوع',
    inactive: 'غير نشط',
    players: 'لاعبين',
    hostSettings: 'إعدادات المضيف',
    shareJoin: 'انضم إلي في',
    shareCode: 'شارك هذا الكود:',
    share: 'شارك',
    havingFun: 'هل تستمتع مع Biscuit Trail؟',
    waitingOn: 'في انتظار',
    shareDescription: `شارك هذه اللعبة مع أصدقائك لمساعدتهم على أن يصبحوا واثقين من مشاركة إيمانهم مع زملائهم!`,
    errorCodeNotValid: 'عذرا ، هذا الرمز غير صالح.',
    errorCodeNotAllowed: 'عذرا ، لا يسمح لك بالانضمام.',
    errorFillOutBoard: 'يرجى ملء اللوحة قبل المتابعة.',
  },
};
