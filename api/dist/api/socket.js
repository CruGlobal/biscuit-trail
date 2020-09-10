"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardIds = exports.DefaultBoard = exports.BOARD_SIZE = exports.Rounds = exports.Events = void 0;
var Events;
(function (Events) {
    Events["PERSON_JOINED"] = "PERSON_JOINED";
    Events["PERSON_LEFT"] = "PERSON_LEFT";
    Events["PICKUP_CARD"] = "PICKUP_CARD";
    Events["DROP_CARD"] = "DROP_CARD";
    Events["UNLOCK_CARD"] = "UNLOCK_CARD";
    Events["SELECT_COMPLETE_EASY"] = "SELECT_COMPLETE_EASY";
    Events["SELECT_COMPLETE_HARD"] = "SELECT_COMPLETE_HARD";
    Events["SELECT_COMPLETE_COMMITTED"] = "SELECT_COMPLETE_COMMITTED";
    Events["ASK_SYNC_ROOM"] = "ASK_SYNC_ROOM";
    Events["SYNC_ROOM"] = "SYNC_ROOM";
    // In place of API calls
    Events["JOIN_GAME_ASK"] = "JOIN_GAME_ASK";
    Events["JOIN_GAME_RESPONSE"] = "JOIN_GAME_RESPONSE";
    // Host actions, validate they are host
    Events["CHANGE_ROUND"] = "CHANGE_ROUND";
    Events["HOST_CREATE_ROOM"] = "HOST_CREATE_ROOM";
    Events["BLOCK_USER"] = "BLOCK_USER";
    // Someone tried joining, but was already blocked
    Events["BLOCKED_USER_JOINED"] = "BLOCKED_USER_JOINED";
    Events["USER_HAS_BEEN_BLOCKED"] = "USER_HAS_BEEN_BLOCKED";
})(Events = exports.Events || (exports.Events = {}));
var Rounds;
(function (Rounds) {
    Rounds["Order"] = "Order";
    Rounds["SelectEasy"] = "SelectEasy";
    Rounds["DiscussEasy"] = "DiscussEasy";
    Rounds["SelectHard"] = "SelectHard";
    Rounds["DiscussHard"] = "DiscussHard";
    Rounds["SelectCommit"] = "SelectCommit";
    Rounds["DiscussCommit"] = "DiscussCommit";
    Rounds["BoardOnly"] = "BoardOnly";
})(Rounds = exports.Rounds || (exports.Rounds = {}));
exports.BOARD_SIZE = 12;
exports.DefaultBoard = [null, null, null, null, null, null, null, null, null, null, null, null];
exports.CardIds = [
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
const SocketStore = {
    clients: {},
    rooms: {},
    users: {},
    roomCodeToCleanUp: {},
};
function generateNewBoard(board, data) {
    // @ts-ignore
    const newBoard = board.map((b, i) => {
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
function checkIsBoardFull(board) {
    return board.filter((b) => !!b).length === exports.BOARD_SIZE;
}
function autoFillBoard(board) {
    const cardIdsInBoard = board.filter((b) => !!b);
    const cardsIdsNotInBoard = exports.CardIds.filter((k) => !cardIdsInBoard.includes(k));
    const newBoard = board.map((b) => {
        if (b) {
            return b;
        }
        return cardsIdsNotInBoard.pop() || null;
    });
    return newBoard;
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
    Object.keys(SocketStore.roomCodeToCleanUp).forEach((code) => {
        if (SocketStore.roomCodeToCleanUp[code] &&
            new Date().valueOf() - SocketStore.roomCodeToCleanUp[code] > MS_TO_CLEAN_UP) {
            console.log('cleaning up room', code);
            delete SocketStore.rooms[code];
            delete SocketStore.roomCodeToCleanUp[code];
        }
    });
}
function socketHandler(socket) {
    console.log('connected - SocketStore.clients', SocketStore.clients);
    SocketStore.clients[socket.id] = SocketStore.clients[socket.id] || {};
    console.log('JSON.stringify(SocketStore)', JSON.stringify(SocketStore));
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
    function checkUserRejoin(user) {
        var _a;
        if ((_a = getMyClient()) === null || _a === void 0 ? void 0 : _a.userId) {
            return;
        }
        const socketId = Object.keys(SocketStore.clients).find((socketId) => SocketStore.clients[socketId].userId === user.id);
        // Found an existing socket user, duplicate them
        if (socketId && SocketStore.clients[socketId].userId && SocketStore.clients[socketId].code) {
            const socketUser = SocketStore.clients[socketId];
            if (socketUser && socketUser.code && socketUser.userId) {
                const { code, userId } = socketUser;
                SocketStore.clients[socket.id] = { code, userId };
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
                            const sendData = { isValid: !!room };
                            sendToMe(Events.BLOCKED_USER_JOINED, sendData);
                            return;
                        }
                        setRoomUsers(code, room.users.map((u) => (u.id === user.id ? { ...user, status: 'active' } : u)));
                    }
                    else {
                        // New user being added
                        setRoomUsers(code, [...room.users, user]);
                    }
                }
                setMyCode(code);
                setUser(user);
                // Remove the old socket client user
                delete SocketStore.clients[socketId];
            }
        }
    }
    const sendToMe = (event, ...args) => socket.emit(event, ...args);
    const sendToAllButMe = (event, ...args) => {
        const room = getMyRoom();
        socket.to(room.code).emit(event, ...args);
    };
    const syncRoom = (meOnly) => {
        const room = getMyRoom();
        if (!room) {
            console.log('room does not exist');
            return;
        }
        const sendData = { room };
        // Send to me
        socket.emit(Events.SYNC_ROOM, sendData);
        if (!meOnly) {
            // Send to everyone else
            socket.to(room.code).emit(Events.SYNC_ROOM, sendData);
        }
    };
    const getMyClient = () => SocketStore.clients[socket.id];
    const getRoom = (code) => SocketStore.rooms[code] || null;
    const getMyRoom = () => {
        var _a;
        const code = (_a = getMyClient()) === null || _a === void 0 ? void 0 : _a.code;
        if (code && SocketStore.roomCodeToCleanUp[code]) {
            // The room is alive and well again
            console.log('the room is alive again!', code);
            delete SocketStore.roomCodeToCleanUp[code];
        }
        return SocketStore.rooms[code] || null;
    };
    const getMyUser = () => { var _a; return getUser((_a = getMyClient()) === null || _a === void 0 ? void 0 : _a.userId); };
    const setMyUserId = (id) => (SocketStore.clients[socket.id].userId = id);
    const setMyCode = (code) => {
        socket.join(code);
        SocketStore.clients[socket.id].code = code;
    };
    const addLockedCard = (cardId) => {
        const room = getMyRoom();
        if (!room)
            return;
        const me = getMyUser();
        const lockedCardId = Object.keys(room.locked).find((cardId) => room.locked[cardId].id === me.id);
        if (lockedCardId) {
            removeLockedCard(lockedCardId);
        }
        SocketStore.rooms[room.code].locked = { ...SocketStore.rooms[room.code].locked, [cardId]: me };
    };
    const removeLockedCard = (cardId) => {
        const room = getMyRoom();
        if (!room)
            return;
        delete SocketStore.rooms[room.code].locked[cardId];
    };
    const removeAllLocked = () => {
        const room = getMyRoom();
        if (!room)
            return;
        SocketStore.rooms[room.code].locked = {};
    };
    const addSelection = (type, selection) => {
        const room = getMyRoom();
        if (!room)
            return;
        const user = getMyUser();
        if (type === 'easy') {
            SocketStore.rooms[room.code].easyResults = { ...room.easyResults, [user.id]: selection };
        }
        else if (type === 'hard') {
            SocketStore.rooms[room.code].hardResults = { ...room.hardResults, [user.id]: selection };
        }
        else if (type === 'commit') {
            SocketStore.rooms[room.code].commitResults = { ...room.commitResults, [user.id]: selection };
        }
    };
    const setRoom = (room) => (SocketStore.rooms[room.code] = room);
    const setRoomUsers = (code, users) => (SocketStore.rooms[code].users = users);
    const setRoomHost = (code, id) => (SocketStore.rooms[code].hostUserId = id);
    const setRoomBoard = (code, board) => (SocketStore.rooms[code].board = board);
    const setRoomRound = (code, round) => (SocketStore.rooms[code].round = round);
    const setUser = (user) => (SocketStore.users[user.id] = user);
    const getUser = (id) => SocketStore.users[id];
    const isUserHost = () => {
        const me = getMyClient();
        const room = getMyRoom();
        return (room === null || room === void 0 ? void 0 : room.hostUserId) && (me === null || me === void 0 ? void 0 : me.userId) && (room === null || room === void 0 ? void 0 : room.hostUserId) == (me === null || me === void 0 ? void 0 : me.userId);
    };
    socket.on('disconnect', (socketData) => {
        var _a, _b;
        const userId = (_a = getMyClient()) === null || _a === void 0 ? void 0 : _a.userId;
        const code = (_b = getMyClient()) === null || _b === void 0 ? void 0 : _b.code;
        let room = getMyRoom();
        if (userId && code) {
            const user = getMyUser();
            const newUser = { ...user, status: user.status === 'removed' ? 'removed' : 'inactive' };
            if (!!(room === null || room === void 0 ? void 0 : room.users.find((u) => u.id === userId))) {
                // Look up my user id, check if I'm still listed in the room, tell everyone that I left
                sendToAllButMe(Events.PERSON_LEFT, { code, user: newUser });
            }
            const newUsers = room.users.map((u) => (u.id === userId ? newUser : u));
            setRoomUsers(code, newUsers);
            room = getMyRoom();
            // If the host is leaving, either pick a new one or close the room
            if ((room === null || room === void 0 ? void 0 : room.hostUserId) === userId) {
                // If there are no active users, start to close down the room
                if (newUsers.filter((u) => u.status === 'inactive' || u.status === 'removed').length === newUsers.length) {
                    // Don't actually close it down, leave it open for a while
                    // delete SocketStore.rooms[code];
                    console.log('no users any more');
                    SocketStore.roomCodeToCleanUp[room.code] = new Date().valueOf();
                    // TODO: remove any clients with the given room code
                }
                else {
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
    socket.on(Events.PERSON_JOINED, (data) => {
        var _a;
        console.log('event: JOINED', data);
        checkUserRejoin(data.user);
        const user = data.user;
        const code = (_a = data.code) === null || _a === void 0 ? void 0 : _a.toLowerCase();
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
                    const sendData = { isValid: !!room };
                    sendToMe(Events.BLOCKED_USER_JOINED, sendData);
                    return;
                }
                setRoomUsers(code, room.users.map((u) => (u.id === user.id ? { ...user, status: 'active' } : u)));
            }
            else {
                // New user being added
                setRoomUsers(code, [...room.users, user]);
            }
            // Make sure board is filled correctly
            if (room.round !== Rounds.Order && !checkIsBoardFull(room.board)) {
                SocketStore.rooms[room.code].board = autoFillBoard(room.board);
            }
        }
        setMyCode(code);
        setUser(user);
        sendToAllButMe(Events.PERSON_JOINED, { code, user });
        syncRoom();
    });
    socket.on(Events.PERSON_LEFT, (data) => {
        console.log('event: LEFT', data);
        checkUserRejoin(data.user);
        const user = data.user;
        const room = getMyRoom();
        if (!room) {
            console.log('room doesnt exist');
            return;
        }
        if (room) {
            const newUsers = room.users.map((u) => u.id === user.id ? { ...u, status: u.status === 'removed' ? 'removed' : 'inactive' } : u);
            setRoomUsers(room.code, newUsers);
        }
        delete SocketStore.users[user.id];
        syncRoom();
    });
    socket.on(Events.BLOCK_USER, (data) => {
        console.log('event: BLOCK_USER', data);
        checkUserRejoin(data.user);
        const user = data.user;
        const room = getMyRoom();
        if (!room) {
            console.log('room doesnt exist');
            return;
        }
        if (room) {
            const newUsers = room.users.map((u) => (u.id === user.id ? { ...u, status: 'removed' } : u));
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
    socket.on(Events.PICKUP_CARD, (data) => {
        console.log('event: PICKUP_CARD', data);
        checkUserRejoin(data.user);
        addLockedCard(data.cardId);
        syncRoom();
    });
    socket.on(Events.DROP_CARD, (data) => {
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
    socket.on(Events.UNLOCK_CARD, (data) => {
        console.log('event: UNLOCK_CARD', data);
        checkUserRejoin(data.user);
        removeLockedCard(data.cardId);
        syncRoom();
    });
    socket.on(Events.CHANGE_ROUND, (data) => {
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
    socket.on(Events.SELECT_COMPLETE_EASY, (data) => {
        console.log('event: SELECT_COMPLETE_EASY', data);
        checkUserRejoin(data.user);
        addSelection('easy', data.selection);
        syncRoom();
    });
    socket.on(Events.SELECT_COMPLETE_HARD, (data) => {
        console.log('event: SELECT_COMPLETE_HARD', data);
        checkUserRejoin(data.user);
        addSelection('hard', data.selection);
        syncRoom();
    });
    socket.on(Events.SELECT_COMPLETE_COMMITTED, (data) => {
        console.log('event: SELECT_COMPLETE_COMMITTED', data);
        checkUserRejoin(data.user);
        addSelection('commit', data.selection);
        syncRoom();
    });
    socket.on(Events.SYNC_ROOM, (data) => {
        console.log('event: SYNC_ROOM', data);
        syncRoom();
    });
    socket.on(Events.ASK_SYNC_ROOM, (data) => {
        console.log('event: ASK_SYNC_ROOM', data);
        syncRoom(true);
    });
    socket.on(Events.JOIN_GAME_ASK, (data) => {
        var _a;
        console.log('event: JOIN_GAME_ASK', data);
        const room = getRoom((_a = data.code) === null || _a === void 0 ? void 0 : _a.toLowerCase());
        let isValid = !!room;
        let reason = '';
        if (room) {
            if (room.round !== Rounds.Order && !checkIsBoardFull(room.board)) {
                SocketStore.rooms[room.code].board = autoFillBoard(room.board);
            }
            const existingUser = room.users.find((u) => u.id === data.user.id);
            if (existingUser && existingUser.status === 'removed') {
                isValid = false;
                reason = 'Removed';
            }
        }
        // Send to one specific user
        const sendData = { isValid, reason };
        sendToMe(Events.JOIN_GAME_RESPONSE, sendData);
    });
    // Auth events
    socket.on(Events.HOST_CREATE_ROOM, (data) => {
        console.log('event: HOST_CREATE_ROOM', data);
        const user = data.user;
        setMyUserId(user.id);
        setUser(user);
        // Create the room
        const room = {
            code: generateCode(Object.keys(SocketStore.rooms)),
            board: exports.DefaultBoard,
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
exports.default = socketHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXBpL3NvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxJQUFZLE1BMkJYO0FBM0JELFdBQVksTUFBTTtJQUNoQix5Q0FBK0IsQ0FBQTtJQUMvQixxQ0FBMkIsQ0FBQTtJQUUzQixxQ0FBMkIsQ0FBQTtJQUMzQixpQ0FBdUIsQ0FBQTtJQUN2QixxQ0FBMkIsQ0FBQTtJQUUzQix1REFBNkMsQ0FBQTtJQUM3Qyx1REFBNkMsQ0FBQTtJQUM3QyxpRUFBdUQsQ0FBQTtJQUV2RCx5Q0FBK0IsQ0FBQTtJQUMvQixpQ0FBdUIsQ0FBQTtJQUV2Qix3QkFBd0I7SUFDeEIseUNBQStCLENBQUE7SUFDL0IsbURBQXlDLENBQUE7SUFFekMsdUNBQXVDO0lBQ3ZDLHVDQUE2QixDQUFBO0lBQzdCLCtDQUFxQyxDQUFBO0lBQ3JDLG1DQUF5QixDQUFBO0lBRXpCLGlEQUFpRDtJQUNqRCxxREFBMkMsQ0FBQTtJQUMzQyx5REFBK0MsQ0FBQTtBQUNqRCxDQUFDLEVBM0JXLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQTJCakI7QUF5QkQsSUFBWSxNQVNYO0FBVEQsV0FBWSxNQUFNO0lBQ2hCLHlCQUFlLENBQUE7SUFDZixtQ0FBeUIsQ0FBQTtJQUN6QixxQ0FBMkIsQ0FBQTtJQUMzQixtQ0FBeUIsQ0FBQTtJQUN6QixxQ0FBMkIsQ0FBQTtJQUMzQix1Q0FBNkIsQ0FBQTtJQUM3Qix5Q0FBK0IsQ0FBQTtJQUMvQixpQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBVFcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBU2pCO0FBK0JZLFFBQUEsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNoQixRQUFBLFlBQVksR0FBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0YsUUFBQSxPQUFPLEdBQUc7SUFDckIsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0NBQ1IsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUtiO0lBQ0YsT0FBTyxFQUFFLEVBQUU7SUFDWCxLQUFLLEVBQUUsRUFBRTtJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsaUJBQWlCLEVBQUUsRUFBRTtDQUN0QixDQUFDO0FBRUYsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFZLEVBQUUsSUFBa0U7SUFDeEcsYUFBYTtJQUNiLE1BQU0sUUFBUSxHQUFVLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzlELDBDQUEwQztZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdEMsZ0NBQWdDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2QjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFZO0lBQ3BDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxrQkFBVSxDQUFDO0FBQ3hELENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxLQUFZO0lBQ2pDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxNQUFNLGtCQUFrQixHQUFnQixlQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDL0IsSUFBSSxDQUFDLEVBQUU7WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFFBQWlCLENBQUM7QUFDM0IsQ0FBQztBQUNELE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QyxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUM7QUFDaEMsTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFO0lBQzFCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRSxPQUFPLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFDRixTQUFTLFlBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDO0lBQzdDLElBQUksSUFBSSxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0csSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1FBQ2QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1QixzQkFBc0I7UUFDdEIsT0FBTyxZQUFZLENBQUMsU0FBUyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUNELDBDQUEwQztJQUMxQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDL0IsT0FBTyxZQUFZLENBQUMsU0FBUyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sY0FBYyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsYUFBYTtBQUNwRCxTQUFTLGVBQWU7SUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxRCxJQUNFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxFQUMzRTtZQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLE9BQU8sV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsTUFBYztJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVwRSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFFeEUscUJBQXFCO0lBQ3JCLGVBQWUsRUFBRSxDQUFDO0lBRWxCLDJCQUEyQjtJQUMzQixpRUFBaUU7SUFDakUseUdBQXlHO0lBQ3pHLEtBQUs7SUFDTCxvQ0FBb0M7SUFDcEMsb0VBQW9FO0lBQ3BFLHFDQUFxQztJQUNyQyw4RUFBOEU7SUFDOUUsUUFBUTtJQUNSLElBQUk7SUFFSixTQUFTLGVBQWUsQ0FBQyxJQUFVOztRQUNqQyxVQUFJLFdBQVcsRUFBRSwwQ0FBRSxNQUFNLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNwRCxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FDL0QsQ0FBQztRQUNGLGdEQUFnRDtRQUNoRCxJQUFJLFFBQVEsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUMxRixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDdEQsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUM7Z0JBRXBDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO2dCQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsS0FBSyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoRyxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDakMsT0FBTztpQkFDUjtnQkFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLElBQUksRUFBRTtvQkFDUixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzlELElBQUksWUFBWSxFQUFFO3dCQUNoQixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFOzRCQUNyQyxNQUFNLFFBQVEsR0FBMEMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUM1RSxRQUFRLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUMvQyxPQUFPO3lCQUNSO3dCQUNELFlBQVksQ0FDVixJQUFJLEVBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDeEYsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCx1QkFBdUI7d0JBQ3ZCLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDM0M7aUJBQ0Y7Z0JBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWQsb0NBQW9DO2dCQUNwQyxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEM7U0FDRjtJQUNILENBQUM7SUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQXNCLEVBQUUsR0FBRyxJQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekYsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEdBQUcsSUFBVyxFQUFFLEVBQUU7UUFDaEUsTUFBTSxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDekIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBZ0IsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sSUFBSSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkMsT0FBTztTQUNSO1FBQ0QsTUFBTSxRQUFRLEdBQWdDLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdkQsYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsd0JBQXdCO1lBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFjLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3BFLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRTs7UUFDckIsTUFBTSxJQUFJLFNBQUcsV0FBVyxFQUFFLDBDQUFFLElBQUksQ0FBQztRQUNqQyxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0MsbUNBQW1DO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsT0FBTyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUNGLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRSxXQUFDLE9BQUEsT0FBTyxPQUFDLFdBQVcsRUFBRSwwQ0FBRSxNQUFNLENBQUMsQ0FBQSxFQUFBLENBQUM7SUFDdkQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2pGLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBYyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQzdDLENBQUMsQ0FBQztJQUNGLE1BQU0sYUFBYSxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDdkMsTUFBTSxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLElBQUksWUFBWSxFQUFFO1lBQ2hCLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNqRyxDQUFDLENBQUM7SUFDRixNQUFNLGdCQUFnQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDMUMsTUFBTSxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBQ2xCLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQztJQUNGLE1BQU0sZUFBZSxHQUFHLEdBQUcsRUFBRTtRQUMzQixNQUFNLElBQUksR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU87UUFDbEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMzQyxDQUFDLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxDQUFDLElBQWdDLEVBQUUsU0FBbUIsRUFBRSxFQUFFO1FBQzdFLE1BQU0sSUFBSSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTztRQUNsQixNQUFNLElBQUksR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDbkIsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDO1NBQzFGO2FBQU0sSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQzFCLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztTQUMxRjthQUFNLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUM7U0FDOUY7SUFDSCxDQUFDLENBQUM7SUFDRixNQUFNLE9BQU8sR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN0RSxNQUFNLFlBQVksR0FBRyxDQUFDLElBQWMsRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDaEcsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFjLEVBQUUsRUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzlGLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBYyxFQUFFLEtBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztJQUMvRixNQUFNLFlBQVksR0FBRyxDQUFDLElBQWMsRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDaEcsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDcEUsTUFBTSxPQUFPLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEQsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFO1FBQ3RCLE1BQU0sRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsVUFBVSxNQUFJLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxNQUFNLENBQUEsSUFBSSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLE1BQUksRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE1BQU0sQ0FBQSxDQUFDO0lBQzFFLENBQUMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7O1FBQ3JDLE1BQU0sTUFBTSxTQUFHLFdBQVcsRUFBRSwwQ0FBRSxNQUFNLENBQUM7UUFDckMsTUFBTSxJQUFJLFNBQUcsV0FBVyxFQUFFLDBDQUFFLElBQUksQ0FBQztRQUNqQyxJQUFJLElBQUksR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN2QixJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFDekIsTUFBTSxPQUFPLEdBQVMsRUFBRSxHQUFHLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDOUYsSUFBSSxDQUFDLEVBQUMsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFDLEVBQUU7Z0JBQzlDLHVGQUF1RjtnQkFDdkYsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDN0Q7WUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0IsSUFBSSxHQUFHLFNBQVMsRUFBRSxDQUFDO1lBRW5CLGtFQUFrRTtZQUNsRSxJQUFJLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsTUFBSyxNQUFNLEVBQUU7Z0JBQy9CLDZEQUE2RDtnQkFDN0QsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUN4RywwREFBMEQ7b0JBQzFELGtDQUFrQztvQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNqQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2hFLG9EQUFvRDtpQkFDckQ7cUJBQU07b0JBQ0wsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQztvQkFDOUYsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDMUIsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ3RDO29CQUVELHVDQUF1QztvQkFDdkMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQztvQkFDbEcsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUNoQztvQkFFRCxRQUFRLEVBQUUsQ0FBQztpQkFDWjthQUNGO1NBQ0Y7UUFDRCx5Q0FBeUM7UUFFekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekUsQ0FBQyxDQUFDLENBQUM7SUFFSCxxREFBcUQ7SUFDckQscUVBQXFFO0lBRXJFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQXFDLEVBQUUsRUFBRTs7UUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxTQUFHLElBQUksQ0FBQyxJQUFJLDBDQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUQsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7b0JBQ3JDLE1BQU0sUUFBUSxHQUEwQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzVFLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQy9DLE9BQU87aUJBQ1I7Z0JBQ0QsWUFBWSxDQUNWLElBQUksRUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN4RixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsdUJBQXVCO2dCQUN2QixZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDM0M7WUFDRCxzQ0FBc0M7WUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hFLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hFO1NBQ0Y7UUFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2QsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyRCxRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBbUMsRUFBRSxFQUFFO1FBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixNQUFNLElBQUksR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNwQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ25HLENBQUM7WUFDRixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsUUFBUSxFQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQW1DLEVBQUUsRUFBRTtRQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixNQUFNLElBQUksR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUNELHFDQUFxQztRQUVyQyxxQ0FBcUM7UUFDckMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbkMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdkQsUUFBUSxFQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQW1DLEVBQUUsRUFBRTtRQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBaUMsRUFBRSxFQUFFO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsTUFBTSxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNqQyxPQUFPO1NBQ1I7UUFDRCxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLFFBQVEsRUFBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFtQyxFQUFFLEVBQUU7UUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBb0MsRUFBRSxFQUFFO1FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDUjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEYsT0FBTztTQUNSO1FBQ0QsZUFBZSxFQUFFLENBQUM7UUFDbEIsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsRUFBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLElBQTRDLEVBQUUsRUFBRTtRQUN0RixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsUUFBUSxFQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBNEMsRUFBRSxFQUFFO1FBQ3RGLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxJQUFpRCxFQUFFLEVBQUU7UUFDaEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RCxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLFFBQVEsRUFBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFpQyxFQUFFLEVBQUU7UUFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBcUMsRUFBRSxFQUFFO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBcUMsRUFBRSxFQUFFOztRQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFDLE1BQU0sSUFBSSxHQUFHLE9BQU8sT0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBRSxXQUFXLEdBQUcsQ0FBQztRQUMvQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoRSxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRTtZQUNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkUsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3JELE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ2hCLE1BQU0sR0FBRyxTQUFTLENBQUM7YUFDcEI7U0FDRjtRQUVELDRCQUE0QjtRQUM1QixNQUFNLFFBQVEsR0FBeUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDM0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILGNBQWM7SUFDZCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQXdDLEVBQUUsRUFBRTtRQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTdDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFZCxrQkFBa0I7UUFDbEIsTUFBTSxJQUFJLEdBQVM7WUFDakIsSUFBSSxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxLQUFLLEVBQUUsb0JBQVk7WUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQztZQUNiLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2YsYUFBYSxFQUFFLEVBQUU7WUFDakIsTUFBTSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2QsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsUUFBUSxFQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxrQkFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8nO1xuXG5leHBvcnQgZW51bSBFdmVudHMge1xuICBQRVJTT05fSk9JTkVEID0gJ1BFUlNPTl9KT0lORUQnLFxuICBQRVJTT05fTEVGVCA9ICdQRVJTT05fTEVGVCcsXG5cbiAgUElDS1VQX0NBUkQgPSAnUElDS1VQX0NBUkQnLFxuICBEUk9QX0NBUkQgPSAnRFJPUF9DQVJEJyxcbiAgVU5MT0NLX0NBUkQgPSAnVU5MT0NLX0NBUkQnLFxuXG4gIFNFTEVDVF9DT01QTEVURV9FQVNZID0gJ1NFTEVDVF9DT01QTEVURV9FQVNZJyxcbiAgU0VMRUNUX0NPTVBMRVRFX0hBUkQgPSAnU0VMRUNUX0NPTVBMRVRFX0hBUkQnLFxuICBTRUxFQ1RfQ09NUExFVEVfQ09NTUlUVEVEID0gJ1NFTEVDVF9DT01QTEVURV9DT01NSVRURUQnLFxuXG4gIEFTS19TWU5DX1JPT00gPSAnQVNLX1NZTkNfUk9PTScsXG4gIFNZTkNfUk9PTSA9ICdTWU5DX1JPT00nLFxuXG4gIC8vIEluIHBsYWNlIG9mIEFQSSBjYWxsc1xuICBKT0lOX0dBTUVfQVNLID0gJ0pPSU5fR0FNRV9BU0snLFxuICBKT0lOX0dBTUVfUkVTUE9OU0UgPSAnSk9JTl9HQU1FX1JFU1BPTlNFJyxcblxuICAvLyBIb3N0IGFjdGlvbnMsIHZhbGlkYXRlIHRoZXkgYXJlIGhvc3RcbiAgQ0hBTkdFX1JPVU5EID0gJ0NIQU5HRV9ST1VORCcsXG4gIEhPU1RfQ1JFQVRFX1JPT00gPSAnSE9TVF9DUkVBVEVfUk9PTScsIC8vIEF1dG9tYXRpY2FsbHkgY3JlYXRlIHRoZSB3aG9sZSByb29tIG9iamVjdCB3aXRoIGEgdW5pcXVlIGNvZGVcbiAgQkxPQ0tfVVNFUiA9ICdCTE9DS19VU0VSJyxcblxuICAvLyBTb21lb25lIHRyaWVkIGpvaW5pbmcsIGJ1dCB3YXMgYWxyZWFkeSBibG9ja2VkXG4gIEJMT0NLRURfVVNFUl9KT0lORUQgPSAnQkxPQ0tFRF9VU0VSX0pPSU5FRCcsXG4gIFVTRVJfSEFTX0JFRU5fQkxPQ0tFRCA9ICdVU0VSX0hBU19CRUVOX0JMT0NLRUQnLFxufVxuXG5leHBvcnQgdHlwZSBFdmVudERhdGEgPSB7XG4gIFtFdmVudHMuUEVSU09OX0pPSU5FRF06IHsgY29kZTogUm9vbUNvZGU7IHVzZXI6IFVzZXIgfTsgLy8gSW5jb21pbmcsIHRoZW4gc2VuZCB0byBhbGxcbiAgW0V2ZW50cy5QRVJTT05fTEVGVF06IHsgdXNlcjogVXNlciB9OyAvLyBJbmNvbWluZywgdGhlbiBzZW5kIHRvIGFsbFxuICBbRXZlbnRzLlBJQ0tVUF9DQVJEXTogeyB1c2VyOiBVc2VyOyBjYXJkSWQ6IHN0cmluZyB9OyAvLyBJbmNvbWluZyBvbmx5XG4gIFtFdmVudHMuRFJPUF9DQVJEXTogeyB1c2VyOiBVc2VyOyBjYXJkSWQ6IHN0cmluZzsgYm9hcmRJbmRleD86IG51bWJlciB9OyAvLyBJbmNvbWluZyBvbmx5XG4gIFtFdmVudHMuVU5MT0NLX0NBUkRdOiB7IHVzZXI6IFVzZXI7IGNhcmRJZDogc3RyaW5nIH07IC8vIEluY29taW5nIG9ubHlcbiAgW0V2ZW50cy5DSEFOR0VfUk9VTkRdOiB7IHVzZXI6IFVzZXI7IHJvdW5kOiBSb3VuZHMgfTsgLy8gSW5jb21pbmcgb25seVxuICBbRXZlbnRzLlNFTEVDVF9DT01QTEVURV9FQVNZXTogeyB1c2VyOiBVc2VyOyBzZWxlY3Rpb246IENhcmRJZFtdIH07IC8vIEluY29taW5nIG9ubHlcbiAgW0V2ZW50cy5TRUxFQ1RfQ09NUExFVEVfSEFSRF06IHsgdXNlcjogVXNlcjsgc2VsZWN0aW9uOiBDYXJkSWRbXSB9OyAvLyBJbmNvbWluZyBvbmx5XG4gIFtFdmVudHMuU0VMRUNUX0NPTVBMRVRFX0NPTU1JVFRFRF06IHsgdXNlcjogVXNlcjsgc2VsZWN0aW9uOiBDYXJkSWRbXSB9OyAvLyBJbmNvbWluZyBvbmx5XG4gIFtFdmVudHMuSk9JTl9HQU1FX0FTS106IHsgdXNlcjogVXNlcjsgY29kZTogc3RyaW5nIH07XG5cbiAgW0V2ZW50cy5KT0lOX0dBTUVfUkVTUE9OU0VdOiB7IGlzVmFsaWQ6IGJvb2xlYW47IHJlYXNvbjogc3RyaW5nIH07XG4gIFtFdmVudHMuU1lOQ19ST09NXTogeyByb29tOiBSb29tIH07XG4gIFtFdmVudHMuQVNLX1NZTkNfUk9PTV06IHt9O1xuICBbRXZlbnRzLkhPU1RfQ1JFQVRFX1JPT01dOiB7IHVzZXI6IFVzZXIgfTtcbiAgW0V2ZW50cy5CTE9DS0VEX1VTRVJfSk9JTkVEXToge307XG4gIFtFdmVudHMuVVNFUl9IQVNfQkVFTl9CTE9DS0VEXTogeyB1c2VyOiBVc2VyIH07XG4gIFtFdmVudHMuQkxPQ0tfVVNFUl06IHsgdXNlcjogVXNlciB9O1xufTtcblxuZXhwb3J0IHR5cGUgUm9vbUNvZGUgPSBzdHJpbmc7XG5leHBvcnQgdHlwZSBVc2VyID0geyBpZDogc3RyaW5nOyBuYW1lPzogc3RyaW5nOyBzdGF0dXM/OiAnYWN0aXZlJyB8ICdpbmFjdGl2ZScgfCAncmVtb3ZlZCcgfTtcbmV4cG9ydCBlbnVtIFJvdW5kcyB7XG4gIE9yZGVyID0gJ09yZGVyJyxcbiAgU2VsZWN0RWFzeSA9ICdTZWxlY3RFYXN5JyxcbiAgRGlzY3Vzc0Vhc3kgPSAnRGlzY3Vzc0Vhc3knLFxuICBTZWxlY3RIYXJkID0gJ1NlbGVjdEhhcmQnLFxuICBEaXNjdXNzSGFyZCA9ICdEaXNjdXNzSGFyZCcsXG4gIFNlbGVjdENvbW1pdCA9ICdTZWxlY3RDb21taXQnLFxuICBEaXNjdXNzQ29tbWl0ID0gJ0Rpc2N1c3NDb21taXQnLFxuICBCb2FyZE9ubHkgPSAnQm9hcmRPbmx5Jyxcbn1cbmV4cG9ydCB0eXBlIEJvYXJkSXRlbSA9IHN0cmluZyB8IG51bGw7XG5leHBvcnQgdHlwZSBCb2FyZCA9IFtcbiAgQm9hcmRJdGVtLFxuICBCb2FyZEl0ZW0sXG4gIEJvYXJkSXRlbSxcbiAgQm9hcmRJdGVtLFxuICBCb2FyZEl0ZW0sXG4gIEJvYXJkSXRlbSxcbiAgQm9hcmRJdGVtLFxuICBCb2FyZEl0ZW0sXG4gIEJvYXJkSXRlbSxcbiAgQm9hcmRJdGVtLFxuICBCb2FyZEl0ZW0sXG4gIEJvYXJkSXRlbSxcbl07XG5leHBvcnQgdHlwZSBDYXJkSWQgPSBzdHJpbmc7XG5leHBvcnQgdHlwZSBDYXJkU2VsZWN0aW9uID0gQ2FyZElkW107XG5leHBvcnQgdHlwZSBTZWxlY3Rpb25SZXN1bHRzID0geyBba2V5IGluIFVzZXJbJ2lkJ11dOiBDYXJkU2VsZWN0aW9uIH07XG5leHBvcnQgaW50ZXJmYWNlIFJvb20ge1xuICBjb2RlOiBzdHJpbmc7XG4gIGJvYXJkOiBCb2FyZDtcbiAgdXNlcnM6IFVzZXJbXTtcbiAgcm91bmQ6IFJvdW5kcztcbiAgaG9zdFVzZXJJZDogVXNlclsnaWQnXTtcbiAgZWFzeVJlc3VsdHM6IFNlbGVjdGlvblJlc3VsdHM7XG4gIGhhcmRSZXN1bHRzOiBTZWxlY3Rpb25SZXN1bHRzO1xuICBjb21taXRSZXN1bHRzOiBTZWxlY3Rpb25SZXN1bHRzO1xuICBsb2NrZWQ6IHsgW2tleSBpbiBDYXJkSWRdOiBVc2VyIH07XG59XG5cbmV4cG9ydCBjb25zdCBCT0FSRF9TSVpFID0gMTI7XG5leHBvcnQgY29uc3QgRGVmYXVsdEJvYXJkOiBCb2FyZCA9IFtudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsXTtcbmV4cG9ydCBjb25zdCBDYXJkSWRzID0gW1xuICAnY2FyZDEyJyxcbiAgJ2NhcmQxMScsXG4gICdjYXJkMTAnLFxuICAnY2FyZDknLFxuICAnY2FyZDgnLFxuICAnY2FyZDcnLFxuICAnY2FyZDYnLFxuICAnY2FyZDUnLFxuICAnY2FyZDQnLFxuICAnY2FyZDMnLFxuICAnY2FyZDInLFxuICAnY2FyZDEnLFxuXTtcblxuY29uc3QgU29ja2V0U3RvcmU6IHtcbiAgY2xpZW50czogeyBba2V5IGluIHN0cmluZ106IHsgdXNlcklkPzogVXNlclsnaWQnXTsgY29kZT86IFJvb21Db2RlIH0gfTtcbiAgdXNlcnM6IHsgW2tleSBpbiBVc2VyWydpZCddXTogVXNlciB9O1xuICByb29tczogeyBba2V5IGluIFJvb21Db2RlXTogUm9vbSB9O1xuICByb29tQ29kZVRvQ2xlYW5VcDogeyBba2V5IGluIFJvb21Db2RlXTogbnVtYmVyIH07XG59ID0ge1xuICBjbGllbnRzOiB7fSxcbiAgcm9vbXM6IHt9LFxuICB1c2Vyczoge30sXG4gIHJvb21Db2RlVG9DbGVhblVwOiB7fSxcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3Qm9hcmQoYm9hcmQ6IEJvYXJkLCBkYXRhOiB7IGluZGV4PzogbnVtYmVyOyBib2FyZEl0ZW06IEJvYXJkSXRlbTsgcmVtb3Zpbmc/OiBib29sZWFuIH0pIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBuZXdCb2FyZDogQm9hcmQgPSBib2FyZC5tYXAoKGIsIGkpID0+IHtcbiAgICBpZiAoZGF0YS5ib2FyZEl0ZW0gJiYgaSAhPT0gZGF0YS5pbmRleCAmJiBiID09PSBkYXRhLmJvYXJkSXRlbSkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBjYXJkIGZyb20gaXQncyBleGlzdGluZyBzcG90XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKCFkYXRhLnJlbW92aW5nICYmIGkgPT09IGRhdGEuaW5kZXgpIHtcbiAgICAgIC8vIFB1dCB0aGUgY2FyZCBpbiBpdCdzIG5ldyBzcG90XG4gICAgICByZXR1cm4gZGF0YS5ib2FyZEl0ZW07XG4gICAgfVxuICAgIHJldHVybiBiO1xuICB9KTtcbiAgcmV0dXJuIG5ld0JvYXJkO1xufVxuXG5mdW5jdGlvbiBjaGVja0lzQm9hcmRGdWxsKGJvYXJkOiBCb2FyZCkge1xuICByZXR1cm4gYm9hcmQuZmlsdGVyKChiKSA9PiAhIWIpLmxlbmd0aCA9PT0gQk9BUkRfU0laRTtcbn1cblxuZnVuY3Rpb24gYXV0b0ZpbGxCb2FyZChib2FyZDogQm9hcmQpIHtcbiAgY29uc3QgY2FyZElkc0luQm9hcmQgPSBib2FyZC5maWx0ZXIoKGIpID0+ICEhYik7XG4gIGNvbnN0IGNhcmRzSWRzTm90SW5Cb2FyZDogQm9hcmRJdGVtW10gPSBDYXJkSWRzLmZpbHRlcigoaykgPT4gIWNhcmRJZHNJbkJvYXJkLmluY2x1ZGVzKGspKTtcbiAgY29uc3QgbmV3Qm9hcmQgPSBib2FyZC5tYXAoKGIpID0+IHtcbiAgICBpZiAoYikge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICAgIHJldHVybiBjYXJkc0lkc05vdEluQm9hcmQucG9wKCkgfHwgbnVsbDtcbiAgfSk7XG4gIHJldHVybiBuZXdCb2FyZCBhcyBCb2FyZDtcbn1cbmNvbnN0IGlnbm9yZWRDb2RlcyA9IFsnMDY2NicsICc2NjYwJywgJzY2NjYnXTtcbmNvbnN0IHZhbGlkQ2hhcnMgPSBgMDEyMzQ1Njc4OWA7XG5jb25zdCBwaWNrUmFuZG9tQ2hhciA9ICgpID0+IHtcbiAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWxpZENoYXJzLmxlbmd0aCk7XG4gIHJldHVybiB2YWxpZENoYXJzW3JhbmRvbUluZGV4XTtcbn07XG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUocm9vbUNvZGVzID0gW10sIGRlcHRoID0gMCkge1xuICBsZXQgY29kZSA9IFtwaWNrUmFuZG9tQ2hhcigpLCBwaWNrUmFuZG9tQ2hhcigpLCBwaWNrUmFuZG9tQ2hhcigpLCBwaWNrUmFuZG9tQ2hhcigpXS5qb2luKCcnKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoZGVwdGggPiA1MCkge1xuICAgIHJldHVybiBjb2RlO1xuICB9XG4gIGlmIChyb29tQ29kZXMuaW5jbHVkZXMoY29kZSkpIHtcbiAgICAvLyBDb2RlIGFscmVhZHkgZXhpc3RzXG4gICAgcmV0dXJuIGdlbmVyYXRlQ29kZShyb29tQ29kZXMsIGRlcHRoICsgMSk7XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGJhZCB3b3JkcyBhbmQgcmVnZW5lcmF0ZSBjb2RlXG4gIGlmIChpZ25vcmVkQ29kZXMuaW5jbHVkZXMoY29kZSkpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVDb2RlKHJvb21Db2RlcywgZGVwdGggKyAxKTtcbiAgfVxuICByZXR1cm4gY29kZTtcbn1cblxuY29uc3QgTVNfVE9fQ0xFQU5fVVAgPSAzMCAqIDYwICogMTAwMDsgLy8gMzAgbWludXRlc1xuZnVuY3Rpb24gY2xlYW5VcE9sZFJvb21zKCkge1xuICBPYmplY3Qua2V5cyhTb2NrZXRTdG9yZS5yb29tQ29kZVRvQ2xlYW5VcCkuZm9yRWFjaCgoY29kZSkgPT4ge1xuICAgIGlmIChcbiAgICAgIFNvY2tldFN0b3JlLnJvb21Db2RlVG9DbGVhblVwW2NvZGVdICYmXG4gICAgICBuZXcgRGF0ZSgpLnZhbHVlT2YoKSAtIFNvY2tldFN0b3JlLnJvb21Db2RlVG9DbGVhblVwW2NvZGVdID4gTVNfVE9fQ0xFQU5fVVBcbiAgICApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjbGVhbmluZyB1cCByb29tJywgY29kZSk7XG4gICAgICBkZWxldGUgU29ja2V0U3RvcmUucm9vbXNbY29kZV07XG4gICAgICBkZWxldGUgU29ja2V0U3RvcmUucm9vbUNvZGVUb0NsZWFuVXBbY29kZV07XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc29ja2V0SGFuZGxlcihzb2NrZXQ6IFNvY2tldCkge1xuICBjb25zb2xlLmxvZygnY29ubmVjdGVkIC0gU29ja2V0U3RvcmUuY2xpZW50cycsIFNvY2tldFN0b3JlLmNsaWVudHMpO1xuXG4gIFNvY2tldFN0b3JlLmNsaWVudHNbc29ja2V0LmlkXSA9IFNvY2tldFN0b3JlLmNsaWVudHNbc29ja2V0LmlkXSB8fCB7fTtcbiAgY29uc29sZS5sb2coJ0pTT04uc3RyaW5naWZ5KFNvY2tldFN0b3JlKScsIEpTT04uc3RyaW5naWZ5KFNvY2tldFN0b3JlKSk7XG5cbiAgLy8gQ2xlYW4gdXAgb2xkIHJvb21zXG4gIGNsZWFuVXBPbGRSb29tcygpO1xuXG4gIC8vIEF1dG8gZmlsbCBhbnkgYmFkIGJvYXJkc1xuICAvLyBjb25zdCBqb2luZWRFbXB0eUtleXMgPSBPYmplY3Qua2V5cyhTb2NrZXRTdG9yZS5yb29tcykuZmlsdGVyKFxuICAvLyAgIChrKSA9PiBTb2NrZXRTdG9yZS5yb29tc1trXS5yb3VuZCAhPT0gUm91bmRzLk9yZGVyICYmICFjaGVja0lzQm9hcmRGdWxsKFNvY2tldFN0b3JlLnJvb21zW2tdLmJvYXJkKSxcbiAgLy8gKTtcbiAgLy8gaWYgKGpvaW5lZEVtcHR5S2V5cy5sZW5ndGggPiAwKSB7XG4gIC8vICAgY29uc29sZS5sb2coJ2F1dG8gZmlsbGluZyBib2FyZHMnLCBqb2luZWRFbXB0eUtleXMuam9pbignLCAnKSk7XG4gIC8vICAgam9pbmVkRW1wdHlLZXlzLmZvckVhY2goKGspID0+IHtcbiAgLy8gICAgIFNvY2tldFN0b3JlLnJvb21zW2tdLmJvYXJkID0gYXV0b0ZpbGxCb2FyZChTb2NrZXRTdG9yZS5yb29tc1trXS5ib2FyZCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICBmdW5jdGlvbiBjaGVja1VzZXJSZWpvaW4odXNlcjogVXNlcikge1xuICAgIGlmIChnZXRNeUNsaWVudCgpPy51c2VySWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc29ja2V0SWQgPSBPYmplY3Qua2V5cyhTb2NrZXRTdG9yZS5jbGllbnRzKS5maW5kKFxuICAgICAgKHNvY2tldElkKSA9PiBTb2NrZXRTdG9yZS5jbGllbnRzW3NvY2tldElkXS51c2VySWQgPT09IHVzZXIuaWQsXG4gICAgKTtcbiAgICAvLyBGb3VuZCBhbiBleGlzdGluZyBzb2NrZXQgdXNlciwgZHVwbGljYXRlIHRoZW1cbiAgICBpZiAoc29ja2V0SWQgJiYgU29ja2V0U3RvcmUuY2xpZW50c1tzb2NrZXRJZF0udXNlcklkICYmIFNvY2tldFN0b3JlLmNsaWVudHNbc29ja2V0SWRdLmNvZGUpIHtcbiAgICAgIGNvbnN0IHNvY2tldFVzZXIgPSBTb2NrZXRTdG9yZS5jbGllbnRzW3NvY2tldElkXTtcbiAgICAgIGlmIChzb2NrZXRVc2VyICYmIHNvY2tldFVzZXIuY29kZSAmJiBzb2NrZXRVc2VyLnVzZXJJZCkge1xuICAgICAgICBjb25zdCB7IGNvZGUsIHVzZXJJZCB9ID0gc29ja2V0VXNlcjtcblxuICAgICAgICBTb2NrZXRTdG9yZS5jbGllbnRzW3NvY2tldC5pZF0gPSB7IGNvZGUsIHVzZXJJZCB9O1xuICAgICAgICBjb25zdCByb29tID0gZ2V0Um9vbShjb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZCBlcXVhbD8gJywgc29ja2V0SWQgPT09IHNvY2tldC5pZCwgY29kZSwgdXNlcklkLCBTb2NrZXRTdG9yZS5jbGllbnRzW3NvY2tldElkXSk7XG4gICAgICAgIGlmICghcm9vbSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdyb29tIGRvZXNudCBleGlzdCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldE15VXNlcklkKHVzZXIuaWQpO1xuICAgICAgICBpZiAocm9vbSkge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IHJvb20udXNlcnMuZmluZCgodSkgPT4gdS5pZCA9PT0gdXNlci5pZCk7XG4gICAgICAgICAgaWYgKGV4aXN0aW5nVXNlcikge1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nVXNlci5zdGF0dXMgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgICBjb25zdCBzZW5kRGF0YTogRXZlbnREYXRhW0V2ZW50cy5CTE9DS0VEX1VTRVJfSk9JTkVEXSA9IHsgaXNWYWxpZDogISFyb29tIH07XG4gICAgICAgICAgICAgIHNlbmRUb01lKEV2ZW50cy5CTE9DS0VEX1VTRVJfSk9JTkVELCBzZW5kRGF0YSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFJvb21Vc2VycyhcbiAgICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgICAgcm9vbS51c2Vycy5tYXAoKHUpID0+ICh1LmlkID09PSB1c2VyLmlkID8gKHsgLi4udXNlciwgc3RhdHVzOiAnYWN0aXZlJyB9IGFzIFVzZXIpIDogdSkpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTmV3IHVzZXIgYmVpbmcgYWRkZWRcbiAgICAgICAgICAgIHNldFJvb21Vc2Vycyhjb2RlLCBbLi4ucm9vbS51c2VycywgdXNlcl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRNeUNvZGUoY29kZSk7XG4gICAgICAgIHNldFVzZXIodXNlcik7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBvbGQgc29ja2V0IGNsaWVudCB1c2VyXG4gICAgICAgIGRlbGV0ZSBTb2NrZXRTdG9yZS5jbGllbnRzW3NvY2tldElkXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzZW5kVG9NZSA9IChldmVudDogc3RyaW5nIHwgc3ltYm9sLCAuLi5hcmdzOiBhbnlbXSkgPT4gc29ja2V0LmVtaXQoZXZlbnQsIC4uLmFyZ3MpO1xuICBjb25zdCBzZW5kVG9BbGxCdXRNZSA9IChldmVudDogc3RyaW5nIHwgc3ltYm9sLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNvbnN0IHJvb20gPSBnZXRNeVJvb20oKTtcbiAgICBzb2NrZXQudG8ocm9vbS5jb2RlKS5lbWl0KGV2ZW50LCAuLi5hcmdzKTtcbiAgfTtcbiAgY29uc3Qgc3luY1Jvb20gPSAobWVPbmx5PzogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IHJvb20gPSBnZXRNeVJvb20oKTtcbiAgICBpZiAoIXJvb20pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyb29tIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNlbmREYXRhOiBFdmVudERhdGFbRXZlbnRzLlNZTkNfUk9PTV0gPSB7IHJvb20gfTtcbiAgICAvLyBTZW5kIHRvIG1lXG4gICAgc29ja2V0LmVtaXQoRXZlbnRzLlNZTkNfUk9PTSwgc2VuZERhdGEpO1xuICAgIGlmICghbWVPbmx5KSB7XG4gICAgICAvLyBTZW5kIHRvIGV2ZXJ5b25lIGVsc2VcbiAgICAgIHNvY2tldC50byhyb29tLmNvZGUpLmVtaXQoRXZlbnRzLlNZTkNfUk9PTSwgc2VuZERhdGEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRNeUNsaWVudCA9ICgpID0+IFNvY2tldFN0b3JlLmNsaWVudHNbc29ja2V0LmlkXTtcbiAgY29uc3QgZ2V0Um9vbSA9IChjb2RlOiBSb29tQ29kZSkgPT4gU29ja2V0U3RvcmUucm9vbXNbY29kZV0gfHwgbnVsbDtcbiAgY29uc3QgZ2V0TXlSb29tID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvZGUgPSBnZXRNeUNsaWVudCgpPy5jb2RlO1xuICAgIGlmIChjb2RlICYmIFNvY2tldFN0b3JlLnJvb21Db2RlVG9DbGVhblVwW2NvZGVdKSB7XG4gICAgICAvLyBUaGUgcm9vbSBpcyBhbGl2ZSBhbmQgd2VsbCBhZ2FpblxuICAgICAgY29uc29sZS5sb2coJ3RoZSByb29tIGlzIGFsaXZlIGFnYWluIScsIGNvZGUpO1xuICAgICAgZGVsZXRlIFNvY2tldFN0b3JlLnJvb21Db2RlVG9DbGVhblVwW2NvZGVdO1xuICAgIH1cbiAgICByZXR1cm4gU29ja2V0U3RvcmUucm9vbXNbY29kZV0gfHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgZ2V0TXlVc2VyID0gKCkgPT4gZ2V0VXNlcihnZXRNeUNsaWVudCgpPy51c2VySWQpO1xuICBjb25zdCBzZXRNeVVzZXJJZCA9IChpZDogc3RyaW5nKSA9PiAoU29ja2V0U3RvcmUuY2xpZW50c1tzb2NrZXQuaWRdLnVzZXJJZCA9IGlkKTtcbiAgY29uc3Qgc2V0TXlDb2RlID0gKGNvZGU6IFJvb21Db2RlKSA9PiB7XG4gICAgc29ja2V0LmpvaW4oY29kZSk7XG4gICAgU29ja2V0U3RvcmUuY2xpZW50c1tzb2NrZXQuaWRdLmNvZGUgPSBjb2RlO1xuICB9O1xuICBjb25zdCBhZGRMb2NrZWRDYXJkID0gKGNhcmRJZDogQ2FyZElkKSA9PiB7XG4gICAgY29uc3Qgcm9vbSA9IGdldE15Um9vbSgpO1xuICAgIGlmICghcm9vbSkgcmV0dXJuO1xuICAgIGNvbnN0IG1lID0gZ2V0TXlVc2VyKCk7XG4gICAgY29uc3QgbG9ja2VkQ2FyZElkID0gT2JqZWN0LmtleXMocm9vbS5sb2NrZWQpLmZpbmQoKGNhcmRJZCkgPT4gcm9vbS5sb2NrZWRbY2FyZElkXS5pZCA9PT0gbWUuaWQpO1xuICAgIGlmIChsb2NrZWRDYXJkSWQpIHtcbiAgICAgIHJlbW92ZUxvY2tlZENhcmQobG9ja2VkQ2FyZElkKTtcbiAgICB9XG4gICAgU29ja2V0U3RvcmUucm9vbXNbcm9vbS5jb2RlXS5sb2NrZWQgPSB7IC4uLlNvY2tldFN0b3JlLnJvb21zW3Jvb20uY29kZV0ubG9ja2VkLCBbY2FyZElkXTogbWUgfTtcbiAgfTtcbiAgY29uc3QgcmVtb3ZlTG9ja2VkQ2FyZCA9IChjYXJkSWQ6IENhcmRJZCkgPT4ge1xuICAgIGNvbnN0IHJvb20gPSBnZXRNeVJvb20oKTtcbiAgICBpZiAoIXJvb20pIHJldHVybjtcbiAgICBkZWxldGUgU29ja2V0U3RvcmUucm9vbXNbcm9vbS5jb2RlXS5sb2NrZWRbY2FyZElkXTtcbiAgfTtcbiAgY29uc3QgcmVtb3ZlQWxsTG9ja2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHJvb20gPSBnZXRNeVJvb20oKTtcbiAgICBpZiAoIXJvb20pIHJldHVybjtcbiAgICBTb2NrZXRTdG9yZS5yb29tc1tyb29tLmNvZGVdLmxvY2tlZCA9IHt9O1xuICB9O1xuICBjb25zdCBhZGRTZWxlY3Rpb24gPSAodHlwZTogJ2Vhc3knIHwgJ2hhcmQnIHwgJ2NvbW1pdCcsIHNlbGVjdGlvbjogQ2FyZElkW10pID0+IHtcbiAgICBjb25zdCByb29tID0gZ2V0TXlSb29tKCk7XG4gICAgaWYgKCFyb29tKSByZXR1cm47XG4gICAgY29uc3QgdXNlciA9IGdldE15VXNlcigpO1xuICAgIGlmICh0eXBlID09PSAnZWFzeScpIHtcbiAgICAgIFNvY2tldFN0b3JlLnJvb21zW3Jvb20uY29kZV0uZWFzeVJlc3VsdHMgPSB7IC4uLnJvb20uZWFzeVJlc3VsdHMsIFt1c2VyLmlkXTogc2VsZWN0aW9uIH07XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnaGFyZCcpIHtcbiAgICAgIFNvY2tldFN0b3JlLnJvb21zW3Jvb20uY29kZV0uaGFyZFJlc3VsdHMgPSB7IC4uLnJvb20uaGFyZFJlc3VsdHMsIFt1c2VyLmlkXTogc2VsZWN0aW9uIH07XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29tbWl0Jykge1xuICAgICAgU29ja2V0U3RvcmUucm9vbXNbcm9vbS5jb2RlXS5jb21taXRSZXN1bHRzID0geyAuLi5yb29tLmNvbW1pdFJlc3VsdHMsIFt1c2VyLmlkXTogc2VsZWN0aW9uIH07XG4gICAgfVxuICB9O1xuICBjb25zdCBzZXRSb29tID0gKHJvb206IFJvb20pID0+IChTb2NrZXRTdG9yZS5yb29tc1tyb29tLmNvZGVdID0gcm9vbSk7XG4gIGNvbnN0IHNldFJvb21Vc2VycyA9IChjb2RlOiBSb29tQ29kZSwgdXNlcnM6IFVzZXJbXSkgPT4gKFNvY2tldFN0b3JlLnJvb21zW2NvZGVdLnVzZXJzID0gdXNlcnMpO1xuICBjb25zdCBzZXRSb29tSG9zdCA9IChjb2RlOiBSb29tQ29kZSwgaWQ6IHN0cmluZykgPT4gKFNvY2tldFN0b3JlLnJvb21zW2NvZGVdLmhvc3RVc2VySWQgPSBpZCk7XG4gIGNvbnN0IHNldFJvb21Cb2FyZCA9IChjb2RlOiBSb29tQ29kZSwgYm9hcmQ6IEJvYXJkKSA9PiAoU29ja2V0U3RvcmUucm9vbXNbY29kZV0uYm9hcmQgPSBib2FyZCk7XG4gIGNvbnN0IHNldFJvb21Sb3VuZCA9IChjb2RlOiBSb29tQ29kZSwgcm91bmQ6IFJvdW5kcykgPT4gKFNvY2tldFN0b3JlLnJvb21zW2NvZGVdLnJvdW5kID0gcm91bmQpO1xuICBjb25zdCBzZXRVc2VyID0gKHVzZXI6IFVzZXIpID0+IChTb2NrZXRTdG9yZS51c2Vyc1t1c2VyLmlkXSA9IHVzZXIpO1xuICBjb25zdCBnZXRVc2VyID0gKGlkOiBzdHJpbmcpID0+IFNvY2tldFN0b3JlLnVzZXJzW2lkXTtcbiAgY29uc3QgaXNVc2VySG9zdCA9ICgpID0+IHtcbiAgICBjb25zdCBtZSA9IGdldE15Q2xpZW50KCk7XG4gICAgY29uc3Qgcm9vbSA9IGdldE15Um9vbSgpO1xuICAgIHJldHVybiByb29tPy5ob3N0VXNlcklkICYmIG1lPy51c2VySWQgJiYgcm9vbT8uaG9zdFVzZXJJZCA9PSBtZT8udXNlcklkO1xuICB9O1xuXG4gIHNvY2tldC5vbignZGlzY29ubmVjdCcsIChzb2NrZXREYXRhKSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gZ2V0TXlDbGllbnQoKT8udXNlcklkO1xuICAgIGNvbnN0IGNvZGUgPSBnZXRNeUNsaWVudCgpPy5jb2RlO1xuICAgIGxldCByb29tID0gZ2V0TXlSb29tKCk7XG4gICAgaWYgKHVzZXJJZCAmJiBjb2RlKSB7XG4gICAgICBjb25zdCB1c2VyID0gZ2V0TXlVc2VyKCk7XG4gICAgICBjb25zdCBuZXdVc2VyOiBVc2VyID0geyAuLi51c2VyLCBzdGF0dXM6IHVzZXIuc3RhdHVzID09PSAncmVtb3ZlZCcgPyAncmVtb3ZlZCcgOiAnaW5hY3RpdmUnIH07XG4gICAgICBpZiAoISFyb29tPy51c2Vycy5maW5kKCh1KSA9PiB1LmlkID09PSB1c2VySWQpKSB7XG4gICAgICAgIC8vIExvb2sgdXAgbXkgdXNlciBpZCwgY2hlY2sgaWYgSSdtIHN0aWxsIGxpc3RlZCBpbiB0aGUgcm9vbSwgdGVsbCBldmVyeW9uZSB0aGF0IEkgbGVmdFxuICAgICAgICBzZW5kVG9BbGxCdXRNZShFdmVudHMuUEVSU09OX0xFRlQsIHsgY29kZSwgdXNlcjogbmV3VXNlciB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3VXNlcnMgPSByb29tLnVzZXJzLm1hcCgodSkgPT4gKHUuaWQgPT09IHVzZXJJZCA/IG5ld1VzZXIgOiB1KSk7XG4gICAgICBzZXRSb29tVXNlcnMoY29kZSwgbmV3VXNlcnMpO1xuICAgICAgcm9vbSA9IGdldE15Um9vbSgpO1xuXG4gICAgICAvLyBJZiB0aGUgaG9zdCBpcyBsZWF2aW5nLCBlaXRoZXIgcGljayBhIG5ldyBvbmUgb3IgY2xvc2UgdGhlIHJvb21cbiAgICAgIGlmIChyb29tPy5ob3N0VXNlcklkID09PSB1c2VySWQpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGFjdGl2ZSB1c2Vycywgc3RhcnQgdG8gY2xvc2UgZG93biB0aGUgcm9vbVxuICAgICAgICBpZiAobmV3VXNlcnMuZmlsdGVyKCh1KSA9PiB1LnN0YXR1cyA9PT0gJ2luYWN0aXZlJyB8fCB1LnN0YXR1cyA9PT0gJ3JlbW92ZWQnKS5sZW5ndGggPT09IG5ld1VzZXJzLmxlbmd0aCkge1xuICAgICAgICAgIC8vIERvbid0IGFjdHVhbGx5IGNsb3NlIGl0IGRvd24sIGxlYXZlIGl0IG9wZW4gZm9yIGEgd2hpbGVcbiAgICAgICAgICAvLyBkZWxldGUgU29ja2V0U3RvcmUucm9vbXNbY29kZV07XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vIHVzZXJzIGFueSBtb3JlJyk7XG4gICAgICAgICAgU29ja2V0U3RvcmUucm9vbUNvZGVUb0NsZWFuVXBbcm9vbS5jb2RlXSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuICAgICAgICAgIC8vIFRPRE86IHJlbW92ZSBhbnkgY2xpZW50cyB3aXRoIHRoZSBnaXZlbiByb29tIGNvZGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBhY3RpdmVVc2VycyA9IG5ld1VzZXJzLmZpbHRlcigodSkgPT4gdS5zdGF0dXMgIT09ICdpbmFjdGl2ZScgJiYgdS5zdGF0dXMgIT09ICdyZW1vdmVkJyk7XG4gICAgICAgICAgc2V0Um9vbVVzZXJzKGNvZGUsIG5ld1VzZXJzKTtcbiAgICAgICAgICBpZiAoYWN0aXZlVXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2V0Um9vbUhvc3QoY29kZSwgYWN0aXZlVXNlcnNbMF0uaWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFJlbW92ZSBhbnkgb2YgdGhlIHVzZXJzIGxvY2tlZCBjYXJkc1xuICAgICAgICAgIGNvbnN0IGxvY2tlZENhcmRJZCA9IE9iamVjdC5rZXlzKHJvb20ubG9ja2VkKS5maW5kKChjYXJkSWQpID0+IHJvb20ubG9ja2VkW2NhcmRJZF0uaWQgPT09IHVzZXJJZCk7XG4gICAgICAgICAgaWYgKGxvY2tlZENhcmRJZCkge1xuICAgICAgICAgICAgcmVtb3ZlTG9ja2VkQ2FyZChsb2NrZWRDYXJkSWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN5bmNSb29tKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZGVsZXRlIFNvY2tldFN0b3JlLmNsaWVudHNbc29ja2V0LmlkXTtcblxuICAgIGNvbnNvbGUubG9nKCdkaXNjb25uZWN0ZWQgLSBTb2NrZXRTdG9yZS5jbGllbnRzJywgU29ja2V0U3RvcmUuY2xpZW50cyk7XG4gIH0pO1xuXG4gIC8vIFRPRE86IEtlZXAgdHJhY2sgb2YgdGhlIGdhbWUgYm9hcmRzIGZvciBlYWNoIHJvb20uXG4gIC8vIFdoZW4gc29tZW9uZSBuZXcgam9pbnMsIHNlbmQgdGhlbSBhIG5ldyBldmVudCB3aXRoIHRoZSB3aG9sZSBib2FyZFxuXG4gIHNvY2tldC5vbihFdmVudHMuUEVSU09OX0pPSU5FRCwgKGRhdGE6IEV2ZW50RGF0YVtFdmVudHMuUEVSU09OX0pPSU5FRF0pID0+IHtcbiAgICBjb25zb2xlLmxvZygnZXZlbnQ6IEpPSU5FRCcsIGRhdGEpO1xuICAgIGNoZWNrVXNlclJlam9pbihkYXRhLnVzZXIpO1xuXG4gICAgY29uc3QgdXNlciA9IGRhdGEudXNlcjtcbiAgICBjb25zdCBjb2RlID0gZGF0YS5jb2RlPy50b0xvd2VyQ2FzZSgpO1xuICAgIHNldE15VXNlcklkKHVzZXIuaWQpO1xuICAgIGNvbnN0IHJvb20gPSBnZXRSb29tKGNvZGUpO1xuICAgIGlmICghcm9vbSkge1xuICAgICAgY29uc29sZS5sb2coJ3Jvb20gZG9lc250IGV4aXN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChyb29tKSB7XG4gICAgICBjb25zdCBleGlzdGluZ1VzZXIgPSByb29tLnVzZXJzLmZpbmQoKHUpID0+IHUuaWQgPT09IHVzZXIuaWQpO1xuICAgICAgaWYgKGV4aXN0aW5nVXNlcikge1xuICAgICAgICBpZiAoZXhpc3RpbmdVc2VyLnN0YXR1cyA9PT0gJ3JlbW92ZWQnKSB7XG4gICAgICAgICAgY29uc3Qgc2VuZERhdGE6IEV2ZW50RGF0YVtFdmVudHMuQkxPQ0tFRF9VU0VSX0pPSU5FRF0gPSB7IGlzVmFsaWQ6ICEhcm9vbSB9O1xuICAgICAgICAgIHNlbmRUb01lKEV2ZW50cy5CTE9DS0VEX1VTRVJfSk9JTkVELCBzZW5kRGF0YSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldFJvb21Vc2VycyhcbiAgICAgICAgICBjb2RlLFxuICAgICAgICAgIHJvb20udXNlcnMubWFwKCh1KSA9PiAodS5pZCA9PT0gdXNlci5pZCA/ICh7IC4uLnVzZXIsIHN0YXR1czogJ2FjdGl2ZScgfSBhcyBVc2VyKSA6IHUpKSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5ldyB1c2VyIGJlaW5nIGFkZGVkXG4gICAgICAgIHNldFJvb21Vc2Vycyhjb2RlLCBbLi4ucm9vbS51c2VycywgdXNlcl0pO1xuICAgICAgfVxuICAgICAgLy8gTWFrZSBzdXJlIGJvYXJkIGlzIGZpbGxlZCBjb3JyZWN0bHlcbiAgICAgIGlmIChyb29tLnJvdW5kICE9PSBSb3VuZHMuT3JkZXIgJiYgIWNoZWNrSXNCb2FyZEZ1bGwocm9vbS5ib2FyZCkpIHtcbiAgICAgICAgU29ja2V0U3RvcmUucm9vbXNbcm9vbS5jb2RlXS5ib2FyZCA9IGF1dG9GaWxsQm9hcmQocm9vbS5ib2FyZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNldE15Q29kZShjb2RlKTtcbiAgICBzZXRVc2VyKHVzZXIpO1xuICAgIHNlbmRUb0FsbEJ1dE1lKEV2ZW50cy5QRVJTT05fSk9JTkVELCB7IGNvZGUsIHVzZXIgfSk7XG4gICAgc3luY1Jvb20oKTtcbiAgfSk7XG5cbiAgc29ja2V0Lm9uKEV2ZW50cy5QRVJTT05fTEVGVCwgKGRhdGE6IEV2ZW50RGF0YVtFdmVudHMuUEVSU09OX0xFRlRdKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2V2ZW50OiBMRUZUJywgZGF0YSk7XG4gICAgY2hlY2tVc2VyUmVqb2luKGRhdGEudXNlcik7XG4gICAgY29uc3QgdXNlciA9IGRhdGEudXNlcjtcbiAgICBjb25zdCByb29tID0gZ2V0TXlSb29tKCk7XG4gICAgaWYgKCFyb29tKSB7XG4gICAgICBjb25zb2xlLmxvZygncm9vbSBkb2VzbnQgZXhpc3QnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocm9vbSkge1xuICAgICAgY29uc3QgbmV3VXNlcnMgPSByb29tLnVzZXJzLm1hcCgodSkgPT5cbiAgICAgICAgdS5pZCA9PT0gdXNlci5pZCA/ICh7IC4uLnUsIHN0YXR1czogdS5zdGF0dXMgPT09ICdyZW1vdmVkJyA/ICdyZW1vdmVkJyA6ICdpbmFjdGl2ZScgfSBhcyBVc2VyKSA6IHUsXG4gICAgICApO1xuICAgICAgc2V0Um9vbVVzZXJzKHJvb20uY29kZSwgbmV3VXNlcnMpO1xuICAgIH1cbiAgICBkZWxldGUgU29ja2V0U3RvcmUudXNlcnNbdXNlci5pZF07XG4gICAgc3luY1Jvb20oKTtcbiAgfSk7XG5cbiAgc29ja2V0Lm9uKEV2ZW50cy5CTE9DS19VU0VSLCAoZGF0YTogRXZlbnREYXRhW0V2ZW50cy5QRVJTT05fTEVGVF0pID0+IHtcbiAgICBjb25zb2xlLmxvZygnZXZlbnQ6IEJMT0NLX1VTRVInLCBkYXRhKTtcbiAgICBjaGVja1VzZXJSZWpvaW4oZGF0YS51c2VyKTtcbiAgICBjb25zdCB1c2VyID0gZGF0YS51c2VyO1xuICAgIGNvbnN0IHJvb20gPSBnZXRNeVJvb20oKTtcbiAgICBpZiAoIXJvb20pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyb29tIGRvZXNudCBleGlzdCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyb29tKSB7XG4gICAgICBjb25zdCBuZXdVc2VycyA9IHJvb20udXNlcnMubWFwKCh1KSA9PiAodS5pZCA9PT0gdXNlci5pZCA/ICh7IC4uLnUsIHN0YXR1czogJ3JlbW92ZWQnIH0gYXMgVXNlcikgOiB1KSk7XG4gICAgICBzZXRSb29tVXNlcnMocm9vbS5jb2RlLCBuZXdVc2Vycyk7XG4gICAgfVxuICAgIC8vIGRlbGV0ZSBTb2NrZXRTdG9yZS51c2Vyc1t1c2VyLmlkXTtcblxuICAgIC8vIFJlbW92ZSBhbnkgb2YgdGhlIHVzZXJzIHNlbGVjdGlvbnNcbiAgICBkZWxldGUgcm9vbS5lYXN5UmVzdWx0c1t1c2VyLmlkXTtcbiAgICBkZWxldGUgcm9vbS5oYXJkUmVzdWx0c1t1c2VyLmlkXTtcbiAgICBkZWxldGUgcm9vbS5jb21taXRSZXN1bHRzW3VzZXIuaWRdO1xuXG4gICAgc2VuZFRvQWxsQnV0TWUoRXZlbnRzLlVTRVJfSEFTX0JFRU5fQkxPQ0tFRCwgeyB1c2VyIH0pO1xuICAgIHN5bmNSb29tKCk7XG4gIH0pO1xuXG4gIHNvY2tldC5vbihFdmVudHMuUElDS1VQX0NBUkQsIChkYXRhOiBFdmVudERhdGFbRXZlbnRzLlBJQ0tVUF9DQVJEXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdldmVudDogUElDS1VQX0NBUkQnLCBkYXRhKTtcbiAgICBjaGVja1VzZXJSZWpvaW4oZGF0YS51c2VyKTtcbiAgICBhZGRMb2NrZWRDYXJkKGRhdGEuY2FyZElkKTtcbiAgICBzeW5jUm9vbSgpO1xuICB9KTtcblxuICBzb2NrZXQub24oRXZlbnRzLkRST1BfQ0FSRCwgKGRhdGE6IEV2ZW50RGF0YVtFdmVudHMuRFJPUF9DQVJEXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdldmVudDogRFJPUF9DQVJEJywgZGF0YSk7XG4gICAgY2hlY2tVc2VyUmVqb2luKGRhdGEudXNlcik7XG4gICAgcmVtb3ZlTG9ja2VkQ2FyZChkYXRhLmNhcmRJZCk7XG4gICAgY29uc3Qgcm9vbSA9IGdldE15Um9vbSgpO1xuICAgIGlmICghcm9vbSkge1xuICAgICAgY29uc29sZS5sb2coJ3Jvb20gZG9lc250IGV4aXN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5ld0JvYXJkID0gZ2VuZXJhdGVOZXdCb2FyZChyb29tLmJvYXJkLCB7IGluZGV4OiBkYXRhLmJvYXJkSW5kZXgsIGJvYXJkSXRlbTogZGF0YS5jYXJkSWQgfSk7XG4gICAgc2V0Um9vbUJvYXJkKHJvb20uY29kZSwgbmV3Qm9hcmQpO1xuICAgIHN5bmNSb29tKCk7XG4gIH0pO1xuXG4gIHNvY2tldC5vbihFdmVudHMuVU5MT0NLX0NBUkQsIChkYXRhOiBFdmVudERhdGFbRXZlbnRzLlVOTE9DS19DQVJEXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdldmVudDogVU5MT0NLX0NBUkQnLCBkYXRhKTtcbiAgICBjaGVja1VzZXJSZWpvaW4oZGF0YS51c2VyKTtcbiAgICByZW1vdmVMb2NrZWRDYXJkKGRhdGEuY2FyZElkKTtcbiAgICBzeW5jUm9vbSgpO1xuICB9KTtcblxuICBzb2NrZXQub24oRXZlbnRzLkNIQU5HRV9ST1VORCwgKGRhdGE6IEV2ZW50RGF0YVtFdmVudHMuQ0hBTkdFX1JPVU5EXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdldmVudDogQ0hBTkdFX1JPVU5EJywgZGF0YSk7XG4gICAgY2hlY2tVc2VyUmVqb2luKGRhdGEudXNlcik7XG4gICAgY29uc3Qgcm9vbSA9IGdldE15Um9vbSgpO1xuICAgIGlmICghcm9vbSkge1xuICAgICAgY29uc29sZS5sb2coJ3Jvb20gZG9lc250IGV4aXN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ2NoYW5nZSByb3VuZCcpO1xuICAgIGlmICghaXNVc2VySG9zdCgpIHx8ICFjaGVja0lzQm9hcmRGdWxsKHJvb20uYm9hcmQpKSB7XG4gICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHJvdW5kIGluIGhlcmUnLCBpc1VzZXJIb3N0KCksIGNoZWNrSXNCb2FyZEZ1bGwocm9vbS5ib2FyZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW1vdmVBbGxMb2NrZWQoKTtcbiAgICBzZXRSb29tUm91bmQocm9vbS5jb2RlLCBkYXRhLnJvdW5kKTtcbiAgICBzeW5jUm9vbSgpO1xuICB9KTtcblxuICBzb2NrZXQub24oRXZlbnRzLlNFTEVDVF9DT01QTEVURV9FQVNZLCAoZGF0YTogRXZlbnREYXRhW0V2ZW50cy5TRUxFQ1RfQ09NUExFVEVfRUFTWV0pID0+IHtcbiAgICBjb25zb2xlLmxvZygnZXZlbnQ6IFNFTEVDVF9DT01QTEVURV9FQVNZJywgZGF0YSk7XG4gICAgY2hlY2tVc2VyUmVqb2luKGRhdGEudXNlcik7XG4gICAgYWRkU2VsZWN0aW9uKCdlYXN5JywgZGF0YS5zZWxlY3Rpb24pO1xuICAgIHN5bmNSb29tKCk7XG4gIH0pO1xuXG4gIHNvY2tldC5vbihFdmVudHMuU0VMRUNUX0NPTVBMRVRFX0hBUkQsIChkYXRhOiBFdmVudERhdGFbRXZlbnRzLlNFTEVDVF9DT01QTEVURV9IQVJEXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdldmVudDogU0VMRUNUX0NPTVBMRVRFX0hBUkQnLCBkYXRhKTtcbiAgICBjaGVja1VzZXJSZWpvaW4oZGF0YS51c2VyKTtcbiAgICBhZGRTZWxlY3Rpb24oJ2hhcmQnLCBkYXRhLnNlbGVjdGlvbik7XG4gICAgc3luY1Jvb20oKTtcbiAgfSk7XG5cbiAgc29ja2V0Lm9uKEV2ZW50cy5TRUxFQ1RfQ09NUExFVEVfQ09NTUlUVEVELCAoZGF0YTogRXZlbnREYXRhW0V2ZW50cy5TRUxFQ1RfQ09NUExFVEVfQ09NTUlUVEVEXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdldmVudDogU0VMRUNUX0NPTVBMRVRFX0NPTU1JVFRFRCcsIGRhdGEpO1xuICAgIGNoZWNrVXNlclJlam9pbihkYXRhLnVzZXIpO1xuICAgIGFkZFNlbGVjdGlvbignY29tbWl0JywgZGF0YS5zZWxlY3Rpb24pO1xuICAgIHN5bmNSb29tKCk7XG4gIH0pO1xuXG4gIHNvY2tldC5vbihFdmVudHMuU1lOQ19ST09NLCAoZGF0YTogRXZlbnREYXRhW0V2ZW50cy5TWU5DX1JPT01dKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2V2ZW50OiBTWU5DX1JPT00nLCBkYXRhKTtcbiAgICBzeW5jUm9vbSgpO1xuICB9KTtcblxuICBzb2NrZXQub24oRXZlbnRzLkFTS19TWU5DX1JPT00sIChkYXRhOiBFdmVudERhdGFbRXZlbnRzLkFTS19TWU5DX1JPT01dKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2V2ZW50OiBBU0tfU1lOQ19ST09NJywgZGF0YSk7XG4gICAgc3luY1Jvb20odHJ1ZSk7XG4gIH0pO1xuXG4gIHNvY2tldC5vbihFdmVudHMuSk9JTl9HQU1FX0FTSywgKGRhdGE6IEV2ZW50RGF0YVtFdmVudHMuSk9JTl9HQU1FX0FTS10pID0+IHtcbiAgICBjb25zb2xlLmxvZygnZXZlbnQ6IEpPSU5fR0FNRV9BU0snLCBkYXRhKTtcblxuICAgIGNvbnN0IHJvb20gPSBnZXRSb29tKGRhdGEuY29kZT8udG9Mb3dlckNhc2UoKSk7XG4gICAgbGV0IGlzVmFsaWQgPSAhIXJvb207XG4gICAgbGV0IHJlYXNvbiA9ICcnO1xuICAgIGlmIChyb29tKSB7XG4gICAgICBpZiAocm9vbS5yb3VuZCAhPT0gUm91bmRzLk9yZGVyICYmICFjaGVja0lzQm9hcmRGdWxsKHJvb20uYm9hcmQpKSB7XG4gICAgICAgIFNvY2tldFN0b3JlLnJvb21zW3Jvb20uY29kZV0uYm9hcmQgPSBhdXRvRmlsbEJvYXJkKHJvb20uYm9hcmQpO1xuICAgICAgfVxuICAgICAgY29uc3QgZXhpc3RpbmdVc2VyID0gcm9vbS51c2Vycy5maW5kKCh1KSA9PiB1LmlkID09PSBkYXRhLnVzZXIuaWQpO1xuICAgICAgaWYgKGV4aXN0aW5nVXNlciAmJiBleGlzdGluZ1VzZXIuc3RhdHVzID09PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICByZWFzb24gPSAnUmVtb3ZlZCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0byBvbmUgc3BlY2lmaWMgdXNlclxuICAgIGNvbnN0IHNlbmREYXRhOiBFdmVudERhdGFbRXZlbnRzLkpPSU5fR0FNRV9SRVNQT05TRV0gPSB7IGlzVmFsaWQsIHJlYXNvbiB9O1xuICAgIHNlbmRUb01lKEV2ZW50cy5KT0lOX0dBTUVfUkVTUE9OU0UsIHNlbmREYXRhKTtcbiAgfSk7XG5cbiAgLy8gQXV0aCBldmVudHNcbiAgc29ja2V0Lm9uKEV2ZW50cy5IT1NUX0NSRUFURV9ST09NLCAoZGF0YTogRXZlbnREYXRhW0V2ZW50cy5IT1NUX0NSRUFURV9ST09NXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdldmVudDogSE9TVF9DUkVBVEVfUk9PTScsIGRhdGEpO1xuXG4gICAgY29uc3QgdXNlciA9IGRhdGEudXNlcjtcbiAgICBzZXRNeVVzZXJJZCh1c2VyLmlkKTtcbiAgICBzZXRVc2VyKHVzZXIpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSByb29tXG4gICAgY29uc3Qgcm9vbTogUm9vbSA9IHtcbiAgICAgIGNvZGU6IGdlbmVyYXRlQ29kZShPYmplY3Qua2V5cyhTb2NrZXRTdG9yZS5yb29tcykpLFxuICAgICAgYm9hcmQ6IERlZmF1bHRCb2FyZCxcbiAgICAgIHJvdW5kOiBSb3VuZHMuT3JkZXIsXG4gICAgICB1c2VyczogW3VzZXJdLFxuICAgICAgaG9zdFVzZXJJZDogdXNlci5pZCxcbiAgICAgIGVhc3lSZXN1bHRzOiB7fSxcbiAgICAgIGhhcmRSZXN1bHRzOiB7fSxcbiAgICAgIGNvbW1pdFJlc3VsdHM6IHt9LFxuICAgICAgbG9ja2VkOiB7fSxcbiAgICB9O1xuICAgIHNldFJvb20ocm9vbSk7XG4gICAgc2V0TXlDb2RlKHJvb20uY29kZSk7XG4gICAgY29uc29sZS5sb2coJ3Jvb20uY29kZScsIHJvb20uY29kZSk7XG5cbiAgICBzeW5jUm9vbSgpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc29ja2V0SGFuZGxlcjtcbiJdfQ==