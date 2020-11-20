import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import Input from 'components/Input';
import Button from 'components/Button';
import { REDUX_ACTIONS } from '../../constants';
import { Views } from 'App';
import LOGO from '../../assets/images/logoWhite.png';
import * as socketEvents from 'actions/socket';
import { getTranslation } from 'utils/translations';
import { useLangChange } from 'utils/hooks';
import { logEvent } from 'utils/analytics';

function UserLogin({ onChangeNav }: { onChangeNav: (type: Views) => any }) {
  const dispatch = useDispatch();
  const authName = useSelector(({ auth }: RootState) => auth.user?.name);
  const authRoomCode = useSelector(({ auth }: RootState) => auth.room);
  const [name, setName] = useState(authName || '');
  const [code, setCode] = useState(authRoomCode || '');
  const [step, setStep] = useState('code');
  const [errorMessage, setErrorMessage] = useState('');
  useLangChange();

  useEffect(() => {
    socketEvents.socket.on(
      socketEvents.Events.JOIN_GAME_RESPONSE,
      (data: socketEvents.EventData[socketEvents.Events.JOIN_GAME_RESPONSE]) => {
        console.log('get initial game data', data);
        if (!data.isValid) {
          let message = getTranslation('errorCodeNotValid');
          if (data.reason && data.reason === 'Removed') {
            message = getTranslation('errorCodeNotAllowed');
          }
          setErrorMessage(message);
          logEvent('Join.Invalid.Code', { code, name });
          return;
        }
        if (step === 'code') {
          dispatch({ type: REDUX_ACTIONS.SET_CODE, room: code });
          setStep('name');
        } else if (step === 'name') {
          onChangeNav(Views.GAME);
        }
      },
    );
    return () => {
      socketEvents.socket.off(socketEvents.Events.JOIN_GAME_RESPONSE);
    };
  }, [step, code]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 flex-col">
      <img src={LOGO} alt="The Biscuit Trail" className="pb-4 w-4/5" style={{ maxWidth: 450 }} />
      <div className="text-white font-bold text-center text-4xl mb-4" style={{ maxWidth: 420 }}>
        {getTranslation('biscuitTrail')}
      </div>

      <div
        className="bg-gray-500 text-white font-bold rounded-lg border shadow-lg p-4 sm:p-10 w-4/5 text-center flex flex-col justify-center"
        style={{ maxWidth: 350, maxHeight: 400 }}
      >
        {step === 'code' ? (
          <>
            <div className="text-xl">{getTranslation('enterRoomCode')}</div>
            <Input
              placeholder={getTranslation('roomCode')}
              value={code}
              inputMode="numeric"
              onChangeText={(t) => {
                setErrorMessage('');
                setCode(t);
              }}
              className="my-2 py-3"
            />
          </>
        ) : step === 'name' ? (
          <>
            <div className="text-xl">{getTranslation('enterName')}</div>
            <Input placeholder={getTranslation('name')} value={name} onChangeText={setName} className="my-2 py-3" />
          </>
        ) : null}
        <div>
          {errorMessage && <div className="text-sm text-red-300 py-2">{errorMessage}</div>}
          <Button
            onClick={async () => {
              if (step === 'code') {
                logEvent('Join.Ask', { code });
                socketEvents.joinRoomAsk(code);
              } else if (step === 'name') {
                dispatch({ type: REDUX_ACTIONS.SET_NAME, name: name.trim() });
                logEvent('Join.Name', { code, name });
                socketEvents.joinRoomAsk(code);
              }
            }}
            type="primary"
            disabled={(!code && step === 'code') || (!name && step === 'name')}
            text={step === 'code' ? getTranslation('join') : getTranslation('letsGo')}
            className="w-full my-4 justify-center"
          />
        </div>
        {step === 'name' && (
          <Button
            onClick={() => {
              setErrorMessage('');
              setStep('code');
            }}
            text={getTranslation('goBack')}
            type="secondary"
            className="w-full justify-center"
          />
        )}
        {step === 'code' && (
          <div className="pt-4">
            <div className="text-sm font-regular pb-2">{getTranslation('noCodeHostNow')}</div>
            <Button
              onClick={() => onChangeNav(Views.HOSTNEW)}
              text={getTranslation('hostAGame')}
              type="accent"
              className="w-full justify-center"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
