import React, { useState } from 'react';
import ROUND1 from '../../assets/images/round1.png';
import { closeModal } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import RoundModal from 'components/RoundModal';
import { CARDS } from '../../constants';
import { uniqArr } from '../../utils';
import { FilledBoard } from 'utils/types';
import { SelectCard } from 'components/CardComponent';
import { RootState } from 'reducers';
import { getTranslation } from 'utils/translations';

const Round2Discuss = () => {
  const dispatch = useDispatch();
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const board = useSelector(({ game }: RootState) => game.board) as FilledBoard;

  return (
    <RoundModal
      onPress={() => dispatch(closeModal())}
      image={ROUND1}
      header={getTranslation('discussion')}
      title={getTranslation('greatJob')}
      description={getTranslation('discussionDesc')}
      buttonTitle={getTranslation('start')}
    />
  );
};

export default Round2Discuss;
