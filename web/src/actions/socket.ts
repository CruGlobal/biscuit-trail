import io from 'socket.io-client';
import { Card } from '../utils/types';
import { reduxStore } from '../App';
import { REDUX_ACTIONS } from '../constants';
import { toast } from 'react-toastify';
import { getTranslation } from 'utils/translations';

let API = 'http://localhost:8000';
// TODO: Fill out the right url
if (process.env.NODE_ENV === 'production') {
  API = 'https://digital-biscuit-trail-devapi.herokuapp.com';
}
export const socket = io(API);

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

export const DefaultBoard: Board = [null, null, null, null, null, null, null, null, null, null, null, null];

export function socketGameOn() {
  socket.on(Events.PERSON_LEFT, leftHandler);
  socket.on(Events.SYNC_ROOM, syncRoomHandler);
  socket.on(Events.PERSON_JOINED, joinedHandler);
  socket.on(Events.BLOCKED_USER_JOINED, blockedUserJoinedHandler);
  socket.on(Events.USER_HAS_BEEN_BLOCKED, userHasBeenBlockedHandler);
}
export function socketGameOff() {
  socket.off(Events.PERSON_LEFT);
  socket.off(Events.SYNC_ROOM);
  socket.off(Events.PERSON_JOINED);
  socket.off(Events.BLOCKED_USER_JOINED);
  socket.off(Events.USER_HAS_BEEN_BLOCKED);
}

export function leftHandler(data: EventData[Events.PERSON_LEFT]) {
  console.log('left handler', data);
  toast.info(`${data.user.name ? `"${data.user.name}"` : 'Someone'} ${getTranslation('hasLeft')}.`);
}
export function joinedHandler(data: EventData[Events.PERSON_JOINED]) {
  console.log('joined handler', data);
  toast.info(`${data.user.name ? `"${data.user.name}"` : 'Someone'} ${getTranslation('hasJoined')}.`);
}
export function blockedUserJoinedHandler(data: EventData[Events.BLOCKED_USER_JOINED]) {
  console.log('blocked user joined handler', data);
  toast.info(getTranslation('blockedJoinedYouAreRemoved'));
}
export function userHasBeenBlockedHandler(data: EventData[Events.USER_HAS_BEEN_BLOCKED]) {
  console.log('blocked user joined handler', data);
  const me = getUser();
  if (data.user && data.user.id === me.id) {
    toast.info(getTranslation('youAreRemoved'));
    setTimeout(() => window.location.reload(), 2500);
  }
}
export function syncRoomHandler(data: EventData[Events.SYNC_ROOM]) {
  console.log('syncing room handler', data);
  reduxStore.dispatch({ type: REDUX_ACTIONS.UPDATE_ROOM, room: data.room });
}

function getUser() {
  return reduxStore.getState().auth.user;
}
function getRoomCode() {
  return reduxStore.getState().auth.room;
}
export function joinRoomAsk(code: string) {
  console.log('event: JOIN_GAME_ASK');
  const data: EventData[Events.JOIN_GAME_ASK] = { code, user: getUser() };
  socket.emit(Events.JOIN_GAME_ASK, data);
}
export function createRoom() {
  console.log('event: HOST_CREATE_ROOM');
  const data: EventData[Events.HOST_CREATE_ROOM] = { user: getUser() };
  socket.emit(Events.HOST_CREATE_ROOM, data);
}

export function joined() {
  console.log('event: PERSON_JOINED', getUser());
  const data: EventData[Events.PERSON_JOINED] = { user: getUser(), code: getRoomCode() };
  socket.emit(Events.PERSON_JOINED, data);
}

export function left() {
  console.log('event: PERSON_LEFT');
  const data: EventData[Events.PERSON_LEFT] = { user: getUser() };
  socket.emit(Events.PERSON_LEFT, data);
}

export function pickupCard(cardId: Card['id']) {
  console.log('event: PICKUP_CARD');
  const data: EventData[Events.PICKUP_CARD] = { user: getUser(), cardId };
  socket.emit(Events.PICKUP_CARD, data);
}

export function dropCard(cardId: Card['id'], boardIndex?: number) {
  console.log('event: DROP_CARD', cardId, boardIndex);
  const data: EventData[Events.DROP_CARD] = { user: getUser(), cardId, boardIndex };
  socket.emit(Events.DROP_CARD, data);
}
export function unlockCard(cardId: Card['id']) {
  console.log('event: UNLOCK_CARD', cardId);
  const data: EventData[Events.UNLOCK_CARD] = { user: getUser(), cardId };
  socket.emit(Events.UNLOCK_CARD, data);
}

export function changeRound(round: Rounds) {
  console.log('event: CHANGE_ROUND');
  const data: EventData[Events.CHANGE_ROUND] = { user: getUser(), round };
  socket.emit(Events.CHANGE_ROUND, data);
}

export function selectCompleteEasy(selection: CardId[]) {
  console.log('event: SELECT_COMPLETE_EASY');
  const data: EventData[Events.SELECT_COMPLETE_EASY] = { user: getUser(), selection };
  socket.emit(Events.SELECT_COMPLETE_EASY, data);
}
export function selectCompleteHard(selection: CardId[]) {
  console.log('event: SELECT_COMPLETE_HARD');
  const data: EventData[Events.SELECT_COMPLETE_HARD] = { user: getUser(), selection };
  socket.emit(Events.SELECT_COMPLETE_HARD, data);
}
export function selectCompleteCommitted(selection: CardId[]) {
  console.log('event: SELECT_COMPLETE_COMMITTED');
  const data: EventData[Events.SELECT_COMPLETE_COMMITTED] = { user: getUser(), selection };
  socket.emit(Events.SELECT_COMPLETE_COMMITTED, data);
}
export function blockUser(user: User) {
  console.log('event: BLOCK_USER');
  const data: EventData[Events.BLOCK_USER] = { user };
  socket.emit(Events.BLOCK_USER, data);
}
export function askSyncRoom() {
  console.log('event: ASK_SYNC_ROOM');
  const data: EventData[Events.ASK_SYNC_ROOM] = {};
  socket.emit(Events.ASK_SYNC_ROOM, data);
}
