import { Socket } from 'socket.io';
import { clientRedis, setRedis } from './redis';

export enum Events {
  PERSON_JOINED = 'PERSON_JOINED',
  PERSON_LEFT = 'PERSON_LEFT',

  PICKUP_CARD = 'PICKUP_CARD',
  DROP_CARD = 'DROP_CARD',
  UNLOCK_CARD = 'UNLOCK_CARD',

  SELECT_COMPLETE_EASY = 'SELECT_COMPLETE_EASY',
  SELECT_COMPLETE_HARD = 'SELECT_COMPLETE_HARD',
  SELECT_COMPLETE_COMMITTED = 'SELECT_COMPLETE_COMMITTED',

  ASK_SYNC_ROOM = 'ASK_SYNC_ROOM',
  SYNC_ROOM = 'SYNC_ROOM',

  // In place of API calls
  JOIN_GAME_ASK = 'JOIN_GAME_ASK',
  JOIN_GAME_RESPONSE = 'JOIN_GAME_RESPONSE',

  // Host actions, validate they are host
  CHANGE_ROUND = 'CHANGE_ROUND',
  HOST_CREATE_ROOM = 'HOST_CREATE_ROOM', // Automatically create the whole room object with a unique code
  BLOCK_USER = 'BLOCK_USER',

  // Someone tried joining, but was already blocked
  BLOCKED_USER_JOINED = 'BLOCKED_USER_JOINED',
  USER_HAS_BEEN_BLOCKED = 'USER_HAS_BEEN_BLOCKED',
}

export type EventData = {
  [Events.PERSON_JOINED]: { code: RoomCode; user: User }; // Incoming, then send to all
  [Events.PERSON_LEFT]: { user: User }; // Incoming, then send to all
  [Events.PICKUP_CARD]: { user: User; cardId: string }; // Incoming only
  [Events.DROP_CARD]: { user: User; cardId: string; boardIndex?: number }; // Incoming only
  [Events.UNLOCK_CARD]: { user: User; cardId: string }; // Incoming only
  [Events.CHANGE_ROUND]: { user: User; round: Rounds }; // Incoming only
  [Events.SELECT_COMPLETE_EASY]: { user: User; selection: CardId[] }; // Incoming only
  [Events.SELECT_COMPLETE_HARD]: { user: User; selection: CardId[] }; // Incoming only
  [Events.SELECT_COMPLETE_COMMITTED]: { user: User; selection: CardId[] }; // Incoming only
  [Events.JOIN_GAME_ASK]: { user: User; code: string };

  [Events.JOIN_GAME_RESPONSE]: { isValid: boolean; reason: string };
  [Events.SYNC_ROOM]: { room: Room };
  [Events.ASK_SYNC_ROOM]: {};
  [Events.HOST_CREATE_ROOM]: { user: User };
  [Events.BLOCKED_USER_JOINED]: {};
  [Events.USER_HAS_BEEN_BLOCKED]: { user: User };
  [Events.BLOCK_USER]: { user: User };
};

export type RoomCode = string;
export type User = { id: string; name?: string; status?: 'active' | 'inactive' | 'removed' };
export enum Rounds {
  Order = 'Order',
  SelectEasy = 'SelectEasy',
  DiscussEasy = 'DiscussEasy',
  SelectHard = 'SelectHard',
  DiscussHard = 'DiscussHard',
  SelectCommit = 'SelectCommit',
  DiscussCommit = 'DiscussCommit',
  BoardOnly = 'BoardOnly',
}
export type BoardItem = string | null;
export type Board = [
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
  BoardItem,
];
export type CardId = string;
export type CardSelection = CardId[];
export type SelectionResults = { [key in User['id']]: CardSelection };
export interface Room {
  code: string;
  board: Board;
  users: User[];
  round: Rounds;
  hostUserId: User['id'];
  easyResults: SelectionResults;
  hardResults: SelectionResults;
  commitResults: SelectionResults;
  locked: { [key in CardId]: User };
}

export const BOARD_SIZE = 12;
export const DefaultBoard: Board = [null, null, null, null, null, null, null, null, null, null, null, null];
export const CardIds = [
  'card12',
  'card11',
  'card10',
  'card9',
  'card8',
  'card7',
  'card6',
  'card5',
  'card4',
  'card3',
  'card2',
  'card1',
];

const SocketStore: {
  clients: { [key in string]: { userId?: User['id']; code?: RoomCode } };
  users: { [key in User['id']]: User };
  rooms: { [key in RoomCode]: Room };
  roomCodeToCleanUp: { [key in RoomCode]: number };
} = {
  clients: {},
  rooms: {},
  users: {},
  roomCodeToCleanUp: {},
};

function generateNewBoard(board: Board, data: { index?: number; boardItem: BoardItem; removing?: boolean }) {
  // @ts-ignore
  const newBoard: Board = board.map((b, i) => {
    if (data.boardItem && i !== data.index && b === data.boardItem) {
      // Remove the card from it's existing spot
      return null;
    }
    if (!data.removing && i === data.index) {
      // Put the card in it's new spot
      return data.boardItem;
    }
    return b;
  });
  return newBoard;
}

function checkIsBoardFull(board: Board) {
  return board.filter((b) => !!b).length === BOARD_SIZE;
}

function autoFillBoard(board: Board) {
  const cardIdsInBoard = board.filter((b) => !!b);
  const cardsIdsNotInBoard: BoardItem[] = CardIds.filter((k) => !cardIdsInBoard.includes(k));
  const newBoard = board.map((b) => {
    if (b) {
      return b;
    }
    return cardsIdsNotInBoard.pop() || null;
  });
  return newBoard as Board;
}
const ignoredCodes = ['0666', '6660', '6666'];
const validChars = `0123456789`;
const pickRandomChar = () => {
  const randomIndex = Math.floor(Math.random() * validChars.length);
  return validChars[randomIndex];
};
function generateCode(roomCodes = [], depth = 0) {
  let code = [pickRandomChar(), pickRandomChar(), pickRandomChar(), pickRandomChar()].join('').toLowerCase();
  if (depth > 50) {
    return code;
  }
  if (roomCodes.includes(code)) {
    // Code already exists
    return generateCode(roomCodes, depth + 1);
  }
  // Check for bad words and regenerate code
  if (ignoredCodes.includes(code)) {
    return generateCode(roomCodes, depth + 1);
  }
  return code;
}

const MS_TO_CLEAN_UP = 30 * 60 * 1000; // 30 minutes
function cleanUpOldRooms() {
  const targetRooms = Object.keys(SocketStore.roomCodeToCleanUp);
  targetRooms.forEach((code, index) => {
    if (
      SocketStore.roomCodeToCleanUp[code] &&
      new Date().valueOf() - SocketStore.roomCodeToCleanUp[code] > MS_TO_CLEAN_UP
    ) {
      console.log('cleaning up room', code);
      delete SocketStore.rooms[code];
      delete SocketStore.roomCodeToCleanUp[code];
    }
    if (index === targetRooms.length - 1) {
      setRedis('SocketStore', SocketStore);
    }
  });
}

function socketHandler(socket: Socket) {
  console.log('connected - SocketStore.clients', SocketStore.clients);

  SocketStore.clients[socket.id] = SocketStore.clients[socket.id] || { userId: null, code: null };
  console.log('JSON.stringify(SocketStore)', JSON.stringify(SocketStore));

  clientRedis.get('SocketStore', (err, reply) => {
    if (err) {
      console.log(err);
    }
    if (reply) {
      const { clients, users, rooms, roomCodeToCleanUp } =  JSON.parse(reply);
      if (clients) { SocketStore.clients = { ...clients }; }
      if (users) { SocketStore.users = { ...users }; }
      if (rooms) { SocketStore.rooms = { ...rooms }; }
      if (roomCodeToCleanUp) { SocketStore.roomCodeToCleanUp = { ...roomCodeToCleanUp }; }
    }
    setRedisSocketStore();
  });
  clientRedis.on('error', (err) => console.log(err));

  // Clean up old rooms
  cleanUpOldRooms();

  // Auto fill any bad boards
  // const joinedEmptyKeys = Object.keys(SocketStore.rooms).filter(
  //   (k) => SocketStore.rooms[k].round !== Rounds.Order && !checkIsBoardFull(SocketStore.rooms[k].board),
  // );
  // if (joinedEmptyKeys.length > 0) {
  //   console.log('auto filling boards', joinedEmptyKeys.join(', '));
  //   joinedEmptyKeys.forEach((k) => {
  //     SocketStore.rooms[k].board = autoFillBoard(SocketStore.rooms[k].board);
  //   });
  // }

  function checkUserRejoin(user: User) {
    if (getMyClient()?.userId) {
      return;
    }
    const socketId = Object.keys(SocketStore.clients).find(
      (socketId) => SocketStore.clients[socketId].userId === user.id,
    );
    // Found an existing socket user, duplicate them
    if (socketId && SocketStore.clients[socketId].userId && SocketStore.clients[socketId].code) {
      const socketUser = SocketStore.clients[socketId];
      if (socketUser && socketUser.code && socketUser.userId) {
        const { code, userId } = socketUser;

        SocketStore.clients[socket.id] = { code, userId };
        setRedisSocketStore();
        const room = getRoom(code);
        console.log('sid equal? ', socketId === socket.id, code, userId, SocketStore.clients[socketId]);
        if (!room) {
          console.log('room doesnt exist');
          return;
        }

        setMyUserId(user.id);
        if (room) {
          const existingUser = room.users.find((u) => u.id === user.id);
          if (existingUser) {
            if (existingUser.status === 'removed') {
              const sendData: EventData[Events.BLOCKED_USER_JOINED] = { isValid: !!room };
              sendToMe(Events.BLOCKED_USER_JOINED, sendData);
              return;
            }
            setRoomUsers(
              code,
              room.users.map((u) => (u.id === user.id ? ({ ...user, status: 'active' } as User) : u)),
            );
          } else {
            // New user being added
            setRoomUsers(code, [...room.users, user]);
          }
        }
        setMyCode(code);
        setUser(user);

        // Remove the old socket client user
        delete SocketStore.clients[socketId];
        setRedisSocketStore();
      }
    }
  }

  const sendToMe = (event: string | symbol, ...args: any[]) => socket.emit(event, ...args);
  const sendToAllButMe = (event: string | symbol, ...args: any[]) => {
    const room = getMyRoom();
    if (room?.code) {
      socket.to(room.code).emit(event, ...args);
    }
  };
  const syncRoom = (meOnly?: boolean) => {
    const room = getMyRoom();
    if (!room) {
      console.log('room does not exist');
      return;
    }
    const sendData: EventData[Events.SYNC_ROOM] = { room };
    // Send to me
    socket.emit(Events.SYNC_ROOM, sendData);
    if (!meOnly) {
      // Send to everyone else
      socket.to(room.code).emit(Events.SYNC_ROOM, sendData);
    }
  };

const setRedisSocketStore = () => setRedis('SocketStore', SocketStore);
  const getMyClient = () => SocketStore.clients[socket.id] || null;
  const getRoom = (code: RoomCode) => SocketStore.rooms[code] || null;
  const getMyRoom = () => {
    const code = getMyClient()?.code;
    if (code && SocketStore.roomCodeToCleanUp[code]) {
      // The room is alive and well again
      console.log('the room is alive again!', code);
      delete SocketStore.roomCodeToCleanUp[code];
      setRedisSocketStore();
    }
    return SocketStore.rooms[code] || null;
  };
  const getMyUser = () => getUser(getMyClient()?.userId);
  const setMyUserId = (id: string) => {
    SocketStore.clients[socket.id].userId = id;
    setRedisSocketStore();
  };
  const setMyCode = (code: RoomCode) => {
    socket.join(code);
    if (SocketStore.clients[socket.id]) {
      SocketStore.clients[socket.id].code = code;
      setRedisSocketStore();
    }
  };
  const addLockedCard = (cardId: CardId) => {
    const room = getMyRoom();
    if (!room) return;
    const me = getMyUser();
    const lockedCardId = Object.keys(room.locked).find((cardId) => room.locked[cardId].id === me.id);
    if (lockedCardId) {
      removeLockedCard(lockedCardId);
    }
    SocketStore.rooms[room.code].locked = { ...SocketStore.rooms[room.code].locked, [cardId]: me };
    setRedisSocketStore();
  };
  const removeLockedCard = (cardId: CardId) => {
    const room = getMyRoom();
    if (!room) return;
    delete SocketStore.rooms[room.code].locked[cardId];
    setRedisSocketStore();
  };
  const removeAllLocked = () => {
    const room = getMyRoom();
    if (!room) return;
    SocketStore.rooms[room.code].locked = {};
    setRedisSocketStore();
  };
  const addSelection = (type: 'easy' | 'hard' | 'commit', selection: CardId[]) => {
    const room = getMyRoom();
    if (!room) return;
    const user = getMyUser();
    if (type === 'easy') {
      SocketStore.rooms[room.code].easyResults = { ...room.easyResults, [user.id]: selection };
      setRedisSocketStore();
    } else if (type === 'hard') {
      SocketStore.rooms[room.code].hardResults = { ...room.hardResults, [user.id]: selection };
      setRedisSocketStore();
    } else if (type === 'commit') {
      SocketStore.rooms[room.code].commitResults = { ...room.commitResults, [user.id]: selection };
      setRedisSocketStore();
    }
  };
  const setRoom = (room: Room) => {
    SocketStore.rooms[room.code] = room;
    setRedisSocketStore();
  };
  const setRoomUsers = (code: RoomCode, users: User[]) => {
    SocketStore.rooms[code].users = users;
    setRedisSocketStore();
  };
  const setRoomHost = (code: RoomCode, id: string) => {
    SocketStore.rooms[code].hostUserId = id;
    setRedisSocketStore();
  };
  const setRoomBoard = (code: RoomCode, board: Board) => {
    SocketStore.rooms[code].board = board;
    setRedisSocketStore();
  };
  const setRoomRound = (code: RoomCode, round: Rounds) => { 
    SocketStore.rooms[code].round = round;
    setRedisSocketStore();
  };
  const setUser = (user: User) => {
    SocketStore.users[user.id] = user;
    setRedisSocketStore();
  };
  const getUser = (id: string) => SocketStore.users[id];
  const isUserHost = () => {
    const me = getMyClient();
    const room = getMyRoom();
    return room?.hostUserId && me?.userId && room?.hostUserId == me?.userId;
  };

  socket.on('disconnect', (socketData) => {
    const userId = getMyClient()?.userId;
    const code = getMyClient()?.code;
    let room = getMyRoom();
    if (userId && code) {
      const user = getMyUser();
      const newUser: User = { ...user, status: user?.status === 'removed' ? 'removed' : 'inactive' };
      if (!!room?.users.find((u) => u.id === userId)) {
        // Look up my user id, check if I'm still listed in the room, tell everyone that I left
        sendToAllButMe(Events.PERSON_LEFT, { code, user: newUser });
      }

      const newUsers = room.users.map((u) => (u.id === userId ? newUser : u));
      setRoomUsers(code, newUsers);
      room = getMyRoom();

      // If the host is leaving, either pick a new one or close the room
      if (room?.hostUserId === userId) {
        // If there are no active users, start to close down the room
        if (newUsers.filter((u) => u.status === 'inactive' || u.status === 'removed').length === newUsers.length) {
          // Don't actually close it down, leave it open for a while
          // delete SocketStore.rooms[code];
          console.log('no users any more');
          SocketStore.roomCodeToCleanUp[room.code] = new Date().valueOf();
          setRedisSocketStore();
          // TODO: remove any clients with the given room code
        } else {
          const activeUsers = newUsers.filter((u) => u.status !== 'inactive' && u.status !== 'removed');
          setRoomUsers(code, newUsers);
          if (activeUsers.length > 0) {
            setRoomHost(code, activeUsers[0].id);
          }

          // Remove any of the users locked cards
          const lockedCardId = Object.keys(room.locked).find((cardId) => room.locked[cardId].id === userId);
          if (lockedCardId) {
            removeLockedCard(lockedCardId);
          }

          syncRoom();
        }
      }
    }
    // delete SocketStore.clients[socket.id];

    console.log('disconnected - SocketStore.clients', SocketStore.clients);
  });

  // TODO: Keep track of the game boards for each room.
  // When someone new joins, send them a new event with the whole board

  socket.on(Events.PERSON_JOINED, (data: EventData[Events.PERSON_JOINED]) => {
    console.log('event: JOINED', data);
    checkUserRejoin(data.user);

    const user = data.user;
    const code = data.code?.toLowerCase();
    setMyUserId(user.id);
    const room = getRoom(code);
    if (!room) {
      console.log('room doesnt exist');
      return;
    }
    if (room) {
      const existingUser = room.users.find((u) => u.id === user.id);
      if (existingUser) {
        if (existingUser.status === 'removed') {
          const sendData: EventData[Events.BLOCKED_USER_JOINED] = { isValid: !!room };
          sendToMe(Events.BLOCKED_USER_JOINED, sendData);
          return;
        }
        setRoomUsers(
          code,
          room.users.map((u) => (u.id === user.id ? ({ ...user, status: 'active' } as User) : u)),
        );
      } else {
        // New user being added
        setRoomUsers(code, [...room.users, user]);
      }
      // Make sure board is filled correctly
      if (room.round !== Rounds.Order && !checkIsBoardFull(room.board)) {
        SocketStore.rooms[room.code].board = autoFillBoard(room.board);
        setRedisSocketStore();
      }
    }
    setMyCode(code);
    setUser(user);
    sendToAllButMe(Events.PERSON_JOINED, { code, user });
    syncRoom();
  });

  socket.on(Events.PERSON_LEFT, (data: EventData[Events.PERSON_LEFT]) => {
    console.log('event: LEFT', data);
    checkUserRejoin(data.user);
    const user = data.user;
    const room = getMyRoom();
    if (!room) {
      console.log('room doesnt exist');
      return;
    }

    if (room) {
      const newUsers = room.users.map((u) =>
        u.id === user.id ? ({ ...u, status: u.status === 'removed' ? 'removed' : 'inactive' } as User) : u,
      );
      setRoomUsers(room.code, newUsers);
    }
    delete SocketStore.users[user.id];
    setRedisSocketStore();
    syncRoom();
  });

  socket.on(Events.BLOCK_USER, (data: EventData[Events.PERSON_LEFT]) => {
    console.log('event: BLOCK_USER', data);
    checkUserRejoin(data.user);
    const user = data.user;
    const room = getMyRoom();
    if (!room) {
      console.log('room doesnt exist');
      return;
    }

    if (room) {
      const newUsers = room.users.map((u) => (u.id === user.id ? ({ ...u, status: 'removed' } as User) : u));
      setRoomUsers(room.code, newUsers);
    }
    // delete SocketStore.users[user.id];

    // Remove any of the users selections
    delete room.easyResults[user.id];
    delete room.hardResults[user.id];
    delete room.commitResults[user.id];

    sendToAllButMe(Events.USER_HAS_BEEN_BLOCKED, { user });
    syncRoom();
  });

  socket.on(Events.PICKUP_CARD, (data: EventData[Events.PICKUP_CARD]) => {
    console.log('event: PICKUP_CARD', data);
    checkUserRejoin(data.user);
    addLockedCard(data.cardId);
    syncRoom();
  });

  socket.on(Events.DROP_CARD, (data: EventData[Events.DROP_CARD]) => {
    console.log('event: DROP_CARD', data);
    checkUserRejoin(data.user);
    removeLockedCard(data.cardId);
    const room = getMyRoom();
    if (!room) {
      console.log('room doesnt exist');
      return;
    }
    const newBoard = generateNewBoard(room.board, { index: data.boardIndex, boardItem: data.cardId });
    setRoomBoard(room.code, newBoard);
    syncRoom();
  });

  socket.on(Events.UNLOCK_CARD, (data: EventData[Events.UNLOCK_CARD]) => {
    console.log('event: UNLOCK_CARD', data);
    checkUserRejoin(data.user);
    removeLockedCard(data.cardId);
    syncRoom();
  });

  socket.on(Events.CHANGE_ROUND, (data: EventData[Events.CHANGE_ROUND]) => {
    console.log('event: CHANGE_ROUND', data);
    checkUserRejoin(data.user);
    const room = getMyRoom();
    if (!room) {
      console.log('room doesnt exist');
      return;
    }

    console.log('change round');
    if (!isUserHost() || !checkIsBoardFull(room.board)) {
      console.log('change round in here', isUserHost(), checkIsBoardFull(room.board));
      return;
    }
    removeAllLocked();
    setRoomRound(room.code, data.round);
    syncRoom();
  });

  socket.on(Events.SELECT_COMPLETE_EASY, (data: EventData[Events.SELECT_COMPLETE_EASY]) => {
    console.log('event: SELECT_COMPLETE_EASY', data);
    checkUserRejoin(data.user);
    addSelection('easy', data.selection);
    syncRoom();
  });

  socket.on(Events.SELECT_COMPLETE_HARD, (data: EventData[Events.SELECT_COMPLETE_HARD]) => {
    console.log('event: SELECT_COMPLETE_HARD', data);
    checkUserRejoin(data.user);
    addSelection('hard', data.selection);
    syncRoom();
  });

  socket.on(Events.SELECT_COMPLETE_COMMITTED, (data: EventData[Events.SELECT_COMPLETE_COMMITTED]) => {
    console.log('event: SELECT_COMPLETE_COMMITTED', data);
    checkUserRejoin(data.user);
    addSelection('commit', data.selection);
    syncRoom();
  });

  socket.on(Events.SYNC_ROOM, (data: EventData[Events.SYNC_ROOM]) => {
    console.log('event: SYNC_ROOM', data);
    syncRoom();
  });

  socket.on(Events.ASK_SYNC_ROOM, (data: EventData[Events.ASK_SYNC_ROOM]) => {
    console.log('event: ASK_SYNC_ROOM', data);
    syncRoom(true);
  });

  socket.on(Events.JOIN_GAME_ASK, (data: EventData[Events.JOIN_GAME_ASK]) => {
    console.log('event: JOIN_GAME_ASK', data);

    const room = getRoom(data.code?.toLowerCase());
    let isValid = !!room;
    let reason = '';
    if (room) {
      if (room.round !== Rounds.Order && !checkIsBoardFull(room.board)) {
        SocketStore.rooms[room.code].board = autoFillBoard(room.board);
        setRedisSocketStore();
      }
      const existingUser = room.users.find((u) => u.id === data.user.id);
      if (existingUser && existingUser.status === 'removed') {
        isValid = false;
        reason = 'Removed';
      }
    }

    // Send to one specific user
    const sendData: EventData[Events.JOIN_GAME_RESPONSE] = { isValid, reason };
    sendToMe(Events.JOIN_GAME_RESPONSE, sendData);
  });

  // Auth events
  socket.on(Events.HOST_CREATE_ROOM, (data: EventData[Events.HOST_CREATE_ROOM]) => {
    console.log('event: HOST_CREATE_ROOM', data);

    const user = data.user;
    setMyUserId(user.id);
    setUser(user);

    // Create the room
    const room: Room = {
      code: generateCode(Object.keys(SocketStore.rooms)),
      board: DefaultBoard,
      round: Rounds.Order,
      users: [user],
      hostUserId: user.id,
      easyResults: {},
      hardResults: {},
      commitResults: {},
      locked: {},
    };
    setRoom(room);
    setMyCode(room.code);
    console.log('room.code', room.code);

    syncRoom();
  });
}

export default socketHandler;
