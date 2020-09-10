import { REDUX_ACTIONS } from '../constants';
import { ModalTypes } from 'components/ModalHandler';

export interface ModalState {
  props: null | any;
  cardModalProps: null | any;
  modalType: null | ModalTypes;
}
const initialState: ModalState = {
  props: null,
  cardModalProps: null,
  modalType: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case REDUX_ACTIONS.MODAL_OPEN:
      return { ...state, modalType: action.modalType, props: action.props };
    case REDUX_ACTIONS.CARD_MODAL_OPEN:
      return { ...state, cardModalProps: action.props };
    case REDUX_ACTIONS.CARD_MODAL_CLOSE:
      return { ...state, cardModalProps: null };
    case REDUX_ACTIONS.MODAL_CLOSE:
      return { ...state, modalType: null, props: null };
    default:
      return state;
  }
}
