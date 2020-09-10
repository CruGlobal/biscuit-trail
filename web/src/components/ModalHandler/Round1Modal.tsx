import React, { useMemo } from 'react';
import RoundModal from '../RoundModal';
import ROUND1 from '../../assets/images/round1.png';
import { closeModal } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getTranslation } from 'utils/translations';

const Round1Modal = () => {
  const me = useSelector(({ auth }: RootState) => auth.user);
  const host = useSelector(({ game }: RootState) => game.users.find((u) => u.id === game.hostUserId));
  const dispatch = useDispatch();
  const roomCode = useSelector(({ auth }: RootState) => auth.room);
  const isHost = useMemo(() => me.id === host?.id, [me, host]);
  return (
    <RoundModal
      onPress={() => dispatch(closeModal())}
      image={ROUND1}
      header={getTranslation('round1')}
      title={`${getTranslation('round1Title')}${isHost ? `\n${getTranslation('shareCode')} ${roomCode}` : ''}`}
      description={getTranslation('round1Desc')}
      buttonTitle={getTranslation('letsGo')}
    />
  );
};

export default Round1Modal;
