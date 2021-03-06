import React from 'react';
import ROUND1 from '../../assets/images/round1.png';
import { closeModal } from 'actions/modal';
import { useDispatch } from 'react-redux';
import RoundModal from 'components/RoundModal';
import { getTranslation } from 'utils/translations';

const Round4Modal = () => {
  const dispatch = useDispatch();
  return (
    <RoundModal
      onPress={() => dispatch(closeModal())}
      image={ROUND1}
      header={getTranslation('round4')}
      title={getTranslation('round4Title')}
      description={getTranslation('round4Desc')}
      buttonTitle={getTranslation('letsGo')}
    />
  );
};

export default Round4Modal;
