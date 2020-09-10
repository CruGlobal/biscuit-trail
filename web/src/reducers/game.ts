import { REDUX_ACTIONS } from '../constants';
import { Room, DefaultBoard, Rounds } from 'actions/socket';

export interface GameState extends Room {}

const initialState: GameState = {
  code: '',
  board: DefaultBoard,
  round: Rounds.Order,
  users: [],
  hostUserId: '',
  easyResults: {},
  hardResults: {},
  commitResults: {},
  locked: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case REDUX_ACTIONS.UPDATE_ROOM:
      return { ...state, ...(action.room as Room) };
    case REDUX_ACTIONS.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
