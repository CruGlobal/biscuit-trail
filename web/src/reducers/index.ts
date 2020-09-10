import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import game, { GameState } from './game';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import modal, { ModalState } from './modal';

export const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router', 'game', 'modal'],
};

const rootReducer = () =>
  persistReducer(
    persistConfig,
    combineReducers({
      auth,
      modal,
      game,
    }),
  );

export type RootState = { auth: AuthState; game: GameState; modal: ModalState };
export default rootReducer;
