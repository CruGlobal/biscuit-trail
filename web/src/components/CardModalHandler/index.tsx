import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import CardModal from './CardModal';

export function ModalHandler() {
  const props = useSelector(({ modal }: RootState) => modal.cardModalProps);

  if (props) {
    return <CardModal {...props} />;
  }
  return null;
}
export default ModalHandler;
