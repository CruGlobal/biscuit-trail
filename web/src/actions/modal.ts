import { REDUX_ACTIONS } from '../constants';
import { ModalTypes } from 'components/ModalHandler';

export function openModal(modalType: ModalTypes, props: any = {}) {
  return { type: REDUX_ACTIONS.MODAL_OPEN, modalType, props };
}

export function closeModal() {
  document.body.classList.toggle('modal-active', false);
  return { type: REDUX_ACTIONS.MODAL_CLOSE };
}

export function openCardModal(props: any = {}) {
  return { type: REDUX_ACTIONS.CARD_MODAL_OPEN, props };
}

export function closeCardModal() {
  return { type: REDUX_ACTIONS.CARD_MODAL_CLOSE };
}
