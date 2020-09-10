import { REDUX_ACTIONS } from '../constants';
import { Dispatch, GetState } from '../utils/types';

export function loginAction(user: any, token: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: REDUX_ACTIONS.LOGIN, user, token });
  };
}

export function logoutAction() {
  return (dispatch: Dispatch) => {
    dispatch({ type: REDUX_ACTIONS.LOGOUT });
  };
}
export function setName(name: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: REDUX_ACTIONS.SET_NAME, name });
  };
}
