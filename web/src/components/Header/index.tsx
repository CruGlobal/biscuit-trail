import React, { useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import MoreMenu from 'components/MoreMenu';
import { openModal } from 'actions/modal';
import { getTranslation } from 'utils/translations';
import { useLangChange } from 'utils/hooks';

export default function Header() {
  const round = useSelector(({ game }: RootState) => game.round);
  const me = useSelector(({ auth }: RootState) => auth.user);
  const host = useSelector(({ game }: RootState) => game.users.find((u) => u.id === game.hostUserId));
  const roomCode = useSelector(({ auth }: RootState) => auth.room);
  const dispatch = useDispatch();
  useLangChange();

  const isHost = useMemo(() => me.id === host?.id, [me, host]);

  return (
    <div className="fixed top-0 right-0 m-1 sm:m-4 flex flex-row items-start justify-end">
      <div className="hidden sm:block">
        <Button
          onClick={() => dispatch(openModal('Share'))}
          icon="share-2"
          type="accent"
          text={`${getTranslation('room')}: ${roomCode}`}
          className="mr-1 lg:mr-4 text-xs lg:text-base"
        />
        {isHost && (
          <Button
            onClick={() => dispatch(openModal('HostSettings'))}
            icon="refresh-cw"
            type="secondary"
            className="mr-1 lg:mr-4 text-xs lg:text-base"
            text={getTranslation('changeRound')}
          />
        )}
      </div>
      <MoreMenu isHost={isHost} />
    </div>
  );
}
