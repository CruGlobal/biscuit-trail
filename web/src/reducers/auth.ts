import { REDUX_ACTIONS } from '../constants';
import { generateId } from '../utils';
import { Room, User } from 'actions/socket';
import { Translations } from '../constants';

export interface AuthState {
  user: User;
  room: string;
  lang: Translations;
  hasUserSetLang: boolean;
}
const initialState: AuthState = {
  user: {
    id: generateId(),
  },
  room: '',
  lang: Translations.en,
  hasUserSetLang: false,
};

export default function (state = initialState, action: any) {
  let newState = state;
  if (!newState.user?.id) {
    newState = { ...newState, user: { ...(newState.user || {}), id: generateId() } };
  }
  if (!newState.lang) {
    newState = { ...newState, lang: Translations.en };
  }
  switch (action.type) {
    case REDUX_ACTIONS.LOGIN:
      return { ...newState, user: action.user };
    case REDUX_ACTIONS.SET_NAME:
      return { ...newState, user: { ...newState.user, name: action.name } };
    case REDUX_ACTIONS.SET_CODE:
      return { ...newState, room: action.room || '' };
    case REDUX_ACTIONS.SET_LANG:
      return { ...newState, lang: action.lang || Translations.en, hasUserSetLang: true };
    case REDUX_ACTIONS.SET_LANG_AUTO:
      return { ...newState, lang: action.lang || Translations.en };
    case REDUX_ACTIONS.UPDATE_ROOM:
      if ((action.room as Room).code !== state.room) {
        return { ...newState, room: action.room.code || '' };
      }
      return state;
    case REDUX_ACTIONS.LOGOUT:
      return { ...initialState, hasUserSetLang: state.hasUserSetLang };
    default:
      if (!state.user?.id || !state.lang) {
        return newState;
      }
      return state;
  }
}
