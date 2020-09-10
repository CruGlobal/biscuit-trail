import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import ModalWrapper from './ModalWrapper';
import { closeModal } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import Button, { ButtonProps } from 'components/Button';
import { Rounds, changeRound } from 'actions/socket';
import { RootState } from 'reducers';
import { checkIsBoardFull } from 'utils';
import { getTranslation } from 'utils/translations';

interface RoundButtonProps extends ButtonProps {
  roundType: Rounds;
}
function RoundButton({ roundType, ...rest }: RoundButtonProps) {
  const round = useSelector(({ game }: RootState) => game.round);
  return (
    <Button
      {...rest}
      className={classNames('rounded-full mx-2 my-2 px-6 py-2 border border-lightBlue justify-center', {
        'bg-lightBlue text-white': round === roundType,
        'text-lightBlue bg-transparent': round !== roundType,
      })}
    />
  );
}
const HostSettingsModal = () => {
  const dispatch = useDispatch();
  const board = useSelector(({ game }: RootState) => game.board);
  const [errorMessage, setErrorMessage] = useState('');
  const isBoardFull = useMemo(() => checkIsBoardFull(board), [board]);
  const round = useSelector(({ game }: RootState) => game.round);

  function handleChangeRound(newRound: Rounds) {
    if (round === Rounds.Order) {
      // Make sure the board is filled out
      if (!isBoardFull) {
        setErrorMessage(getTranslation('errorFillOutBoard'));
        return;
      }
      // dispatch(autoFillBoard());
    }
    changeRound(newRound);
    dispatch(closeModal());
  }

  return (
    <ModalWrapper>
      <div
        className="w-full bg-gray-500 text-center flex items-center justify-center font-semibold text-white"
        style={{ height: 45 }}
      >
        {getTranslation('hostSettings')}
      </div>
      <div className="p-2 sm:p-8">
        <div className="text-grey">{getTranslation('changeRound')}</div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
          <RoundButton
            onClick={() => handleChangeRound(Rounds.Order)}
            text={getTranslation('round1')}
            roundType={Rounds.Order}
          />
          <RoundButton
            onClick={() => handleChangeRound(Rounds.SelectEasy)}
            text={getTranslation('round2')}
            roundType={Rounds.SelectEasy}
          />
          <RoundButton
            onClick={() => handleChangeRound(Rounds.DiscussEasy)}
            text={getTranslation('round2Discuss')}
            roundType={Rounds.DiscussEasy}
          />
          <RoundButton
            onClick={() => handleChangeRound(Rounds.SelectHard)}
            text={getTranslation('round3')}
            roundType={Rounds.SelectHard}
          />
          <RoundButton
            onClick={() => handleChangeRound(Rounds.DiscussHard)}
            text={getTranslation('round3Discuss')}
            roundType={Rounds.DiscussHard}
          />
          <RoundButton
            onClick={() => handleChangeRound(Rounds.SelectCommit)}
            text={getTranslation('round4')}
            roundType={Rounds.SelectCommit}
          />
          <RoundButton
            onClick={() => handleChangeRound(Rounds.DiscussCommit)}
            text={getTranslation('round4Discuss')}
            roundType={Rounds.DiscussCommit}
          />
          <RoundButton
            onClick={() => handleChangeRound(Rounds.BoardOnly)}
            text={getTranslation('boardOnly')}
            roundType={Rounds.BoardOnly}
          />
        </div>
      </div>
      {errorMessage ? <div className="text-center my-2 text-xs text-red-500">{errorMessage}</div> : null}
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

export default HostSettingsModal;
