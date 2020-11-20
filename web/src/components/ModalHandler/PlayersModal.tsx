import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import ModalWrapper from './ModalWrapper';
import * as socketEvents from 'actions/socket';
import { closeModal } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import { RootState } from 'reducers';
import UserComponent from 'components/UserComponent';
import { getTranslation } from 'utils/translations';

function Player({ user, canBlock, isMe }: { user: socketEvents.User; canBlock: boolean; isMe: boolean }) {
  function handleRemoveUser() {
    socketEvents.blockUser(user);
  }

  return (
    <div className="flex flex-row py-2 items-center flex-1 justify-between">
      <div className="flex flex-row items-center">
        <UserComponent user={user} size={50} />
        <div className="text-lg font-medium text-darkBlue pl-3">{user.name}</div>
        {user.status === 'removed' && (
          <div className="text-sm font-medium text-grey pl-3">{getTranslation('blocked')}</div>
        )}
        {user.status === 'inactive' && (
          <div className="text-sm font-medium text-grey pl-3">{getTranslation('inactive')}</div>
        )}
        {isMe && <div className="text-sm font-medium text-grey pl-3">(you)</div>}
      </div>
      {canBlock && user.status !== 'removed' && (
        <Button
          icon="user-x"
          className="text-red-500 text-xs lg:text-base ml-1"
          onClick={handleRemoveUser}
          type="transparent"
          text={getTranslation('removeUser')}
        />
      )}
    </div>
  );
}

const PlayersModal = () => {
  const dispatch = useDispatch();
  const currentUsers = useSelector(({ game }: RootState) => game.users);
  const me = useSelector(({ auth }: RootState) => auth.user);
  const host = useSelector(({ game }: RootState) => game.users.find((u) => u.id === game.hostUserId));
  const isHost = useMemo(() => me.id === host?.id, [me, host]);

  return (
    <ModalWrapper>
      <div
        className="w-full bg-gray-500 text-center flex items-center justify-center font-semibold text-white"
        style={{ height: 45 }}
      >
        {getTranslation('players')}
      </div>
      <div className="p-2 sm:p-8">
        <div className="flex flex-col">
          {currentUsers.map((user: socketEvents.User) => (
            <Player key={user.id} user={user} isMe={user.id === me.id} canBlock={isHost && user.id !== host?.id} />
          ))}
        </div>
      </div>
      <div
        className="w-full bg-lightBlue flex items-center justify-center text-white text-lg font-semibold cursor-pointer"
        style={{ height: 60 }}
        onClick={() => dispatch(closeModal())}
      >
        {getTranslation('close')}
      </div>
    </ModalWrapper>
  );
};

export default PlayersModal;
