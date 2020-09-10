import { Socket } from 'socket.io';
export declare enum Events {
    PERSON_JOINED = "PERSON_JOINED",
    PERSON_LEFT = "PERSON_LEFT",
    PICKUP_CARD = "PICKUP_CARD",
    DROP_CARD = "DROP_CARD",
    UNLOCK_CARD = "UNLOCK_CARD",
    SELECT_COMPLETE_EASY = "SELECT_COMPLETE_EASY",
    SELECT_COMPLETE_HARD = "SELECT_COMPLETE_HARD",
    SELECT_COMPLETE_COMMITTED = "SELECT_COMPLETE_COMMITTED",
    ASK_SYNC_ROOM = "ASK_SYNC_ROOM",
    SYNC_ROOM = "SYNC_ROOM",
    JOIN_GAME_ASK = "JOIN_GAME_ASK",
    JOIN_GAME_RESPONSE = "JOIN_GAME_RESPONSE",
    CHANGE_ROUND = "CHANGE_ROUND",
    HOST_CREATE_ROOM = "HOST_CREATE_ROOM",
    BLOCK_USER = "BLOCK_USER",
    BLOCKED_USER_JOINED = "BLOCKED_USER_JOINED",
    USER_HAS_BEEN_BLOCKED = "USER_HAS_BEEN_BLOCKED"
}
export declare type EventData = {
    [Events.PERSON_JOINED]: {
        code: RoomCode;
        user: User;
    };
    [Events.PERSON_LEFT]: {
        user: User;
    };
    [Events.PICKUP_CARD]: {
        user: User;
        cardId: string;
    };
    [Events.DROP_CARD]: {
        user: User;
        cardId: string;
        boardIndex?: number;
    };
    [Events.UNLOCK_CARD]: {
        user: User;
        cardId: string;
    };
    [Events.CHANGE_ROUND]: {
        user: User;
        round: Rounds;
    };
    [Events.SELECT_COMPLETE_EASY]: {
        user: User;
        selection: CardId[];
    };
    [Events.SELECT_COMPLETE_HARD]: {
        user: User;
        selection: CardId[];
    };
    [Events.SELECT_COMPLETE_COMMITTED]: {
        user: User;
        selection: CardId[];
    };
    [Events.JOIN_GAME_ASK]: {
        user: User;
        code: string;
    };
    [Events.JOIN_GAME_RESPONSE]: {
        isValid: boolean;
        reason: string;
    };
    [Events.SYNC_ROOM]: {
        room: Room;
    };
    [Events.ASK_SYNC_ROOM]: {};
    [Events.HOST_CREATE_ROOM]: {
        user: User;
    };
    [Events.BLOCKED_USER_JOINED]: {};
    [Events.USER_HAS_BEEN_BLOCKED]: {
        user: User;
    };
    [Events.BLOCK_USER]: {
        user: User;
    };
};
export declare type RoomCode = string;
export declare type User = {
    id: string;
    name?: string;
    status?: 'active' | 'inactive' | 'removed';
};
export declare enum Rounds {
    Order = "Order",
    SelectEasy = "SelectEasy",
    DiscussEasy = "DiscussEasy",
    SelectHard = "SelectHard",
    DiscussHard = "DiscussHard",
    SelectCommit = "SelectCommit",
    DiscussCommit = "DiscussCommit",
    BoardOnly = "BoardOnly"
}
export declare type BoardItem = string | null;
export declare type Board = [BoardItem, BoardItem, BoardItem, BoardItem, BoardItem, BoardItem, BoardItem, BoardItem, BoardItem, BoardItem, BoardItem, BoardItem];
export declare type CardId = string;
export declare type CardSelection = CardId[];
export declare type SelectionResults = {
    [key in User['id']]: CardSelection;
};
export interface Room {
    code: string;
    board: Board;
    users: User[];
    round: Rounds;
    hostUserId: User['id'];
    easyResults: SelectionResults;
    hardResults: SelectionResults;
    commitResults: SelectionResults;
    locked: {
        [key in CardId]: User;
    };
}
export declare const BOARD_SIZE = 12;
export declare const DefaultBoard: Board;
export declare const CardIds: string[];
declare function socketHandler(socket: Socket): void;
export default socketHandler;
//# sourceMappingURL=socket.d.ts.map