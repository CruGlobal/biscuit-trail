import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import Input from 'components/Input';
import Button from 'components/Button';
import { REDUX_ACTIONS, Configs } from '../../constants';
import * as socketEvents from 'actions/socket';
import LOGO from '../../assets/images/logo.png';
import { Views } from 'App';
import { getTranslation } from 'utils/translations';
import Icon from 'components/Icon';
import { useLangChange } from 'utils/hooks';

function HostNew({ onChangeNav }: { onChangeNav: (type: Views) => any }) {
  const dispatch = useDispatch();
  const authName = useSelector(({ auth }: RootState) => auth.user.name);
  const [name, setName] = useState(authName || '');
  const [code, setCode] = useState('');
  useLangChange();

  const localSyncRoomHandler = useCallback((data: socketEvents.EventData[socketEvents.Events.SYNC_ROOM]) => {
    dispatch({ type: REDUX_ACTIONS.SET_CODE, code: data.room.code });
    socketEvents.syncRoomHandler(data);
    onChangeNav(Views.GAME);
    // console.log('generating code', data);
    // if (data.code) {
    //   setCode(data.code);
    // } else {
    //   // TODO: Show error
    // }
  }, []);

  useEffect(() => {
    socketEvents.socket.on(socketEvents.Events.SYNC_ROOM, localSyncRoomHandler);
    return () => {
      socketEvents.socket.off(socketEvents.Events.SYNC_ROOM);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-500 flex-col">
      <img src={LOGO} alt="The Biscuit Trail" className="pb-4 w-4/5" style={{ maxWidth: 450 }} />
      <div
        className="bg-white text-gray-900 font-bold rounded-lg border shadow-lg p-4 sm:p-10  w-4/5 text-center"
        style={{ maxWidth: 350, maxHeight: 400 }}
      >
        <div className="mb-4">
          <div className="text-lg sm:text-2xl leading-tight sm:leading-snug">{getTranslation('youreTheHost')}</div>
          <Input
            placeholder={getTranslation('name')}
            value={name}
            invertedColors={true}
            onChangeText={setName}
            className="my-2 py-3 mt-4"
          />
          <div>
            <Button
              onClick={() => {
                dispatch({ type: REDUX_ACTIONS.SET_NAME, name });
                // Look up code and validate that it exists
                socketEvents.createRoom();
                // onChangeNav(Views.GAME);
              }}
              disabled={!name}
              type="primary"
              text={getTranslation('startGame')}
              className="w-full my-1 sm:my-4 justify-center"
            />
          </div>
          <a
            className="px-1 py-1 hover:text-gray-500 text-base text-red-500 text-center flex flex-row justify-center items-center cursor-pointer"
            href={Configs.YoutubeUrl}
            target="_blank"
          >
            How to play
            <Icon name="youtube" size={32} className="ml-2" />
          </a>
          <div>
            <Button
              onClick={() => {
                onChangeNav(Views.LOGIN);
              }}
              type="secondary"
              text={getTranslation('goBack')}
              className="w-full my-1 sm:my-4 justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostNew;
