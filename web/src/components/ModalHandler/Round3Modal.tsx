import React from 'react';
import ROUND1 from '../../assets/images/round1.png';
import { closeModal } from 'actions/modal';
import { useDispatch } from 'react-redux';
import RoundModal from 'components/RoundModal';
import { getTranslation } from 'utils/translations';

const Round3Modal = () => {
  const dispatch = useDispatch();
  return (
    <RoundModal
      onPress={() => dispatch(closeModal())}
      image={ROUND1}
      header={getTranslation('round3')}
      title={getTranslation('round3Title')}
      description=""
      buttonTitle={getTranslation('letsGo')}
    />
  );
};

export default Round3Modal;
