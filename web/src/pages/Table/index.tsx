import React, { useEffect, useRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import { DndProvider, useDrop, XYCoord, DropTargetMonitor, DragSourceMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import TABLE from '../../assets/images/tableBg.png';
import { isTouchDevice, checkIsBoardFull, uniqArr, isArray } from '../../utils';
import { Card } from 'utils/types';
import CardComponent, { SelectCard, BasicLargeCard, DiscussCard } from 'components/CardComponent';
import * as socketEvents from 'actions/socket';
import { CARDS, REDUX_ACTIONS } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { openModal } from 'actions/modal';
import Header from 'components/Header';
import { toast } from 'react-toastify';
import { getTranslation } from 'utils/translations';
import { useLangChange } from 'utils/hooks';

function EmptySpot({ spot, onDrop }: { spot: string; onDrop: Function }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (droppedItem) => {
      onDrop(droppedItem);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div className="emptySpot cardSize" ref={drop}>
      <div
        className={classNames(
          'border-4 border-dashed border-darkGrey h-full w-full flex items-center justify-center text-2xl font-semibold text-black',
          { 'bg-lightBlue': isOver },
        )}
      >
        {spot}
      </div>
    </div>
  );
}

function CardHolderTable({
  board,
  onDrop,
  isHost,
  parentRef,
}: {
  board: any;
  onDrop: Function;
  isHost?: boolean;
  parentRef: any;
}) {
  useLangChange();
  const [, drop] = useDrop({
    accept: 'card',

    drop(droppedItem: any, monitor: DropTargetMonitor) {
      const initialSourceOffset = monitor.getInitialSourceClientOffset() as XYCoord;
      const sourceOffset = monitor.getSourceClientOffset() as XYCoord;
      let deltaX;
      let deltaY;
      let newLeft;
      let newTop;
      console.log(parentRef.current.offsetTop, sourceOffset.y);
      if (cardPositions[droppedItem.id].defaultPosition.sourceTopOffset) {
        //@ts-ignore
        deltaY = sourceOffset.y - cardPositions[droppedItem.id].defaultPosition.sourceTopOffset;
        newTop = Math.round(droppedItem.top + deltaY);
      } else {
        deltaY = sourceOffset.y - parentRef.current.offsetTop;
        newTop = Math.round(deltaY);
      }
      if (cardPositions[droppedItem.id].defaultPosition.sourceLeftOffset) {
        //@ts-ignore
        deltaX = sourceOffset.x - cardPositions[droppedItem.id].defaultPosition.sourceLeftOffset;
        newLeft = Math.round(droppedItem.left + deltaX);
      } else {
        deltaX = sourceOffset.x - parentRef.current.offsetLeft;
        newLeft = Math.round(deltaX);
      }

      // let newLeft = Math.round(droppedItem.left + deltaX);
      // let newTop = Math.round(droppedItem.top + deltaY);

      const left =
        newLeft < 0 ? 0 : newLeft > parentRef.current.innerWidth ? parentRef.current.innerWidth - 50 : newLeft;
      const top = newTop < 0 ? 0 : newTop > parentRef.current.innerHeight ? parentRef.current.innerHeight - 50 : newTop;
      let newCardPositions = cardPositions;
      newCardPositions[droppedItem.id].defaultPosition.top = top;
      newCardPositions[droppedItem.id].defaultPosition.sourceTopOffset = sourceOffset.y;
      newCardPositions[droppedItem.id].defaultPosition.sourceLeftOffset = sourceOffset.x;
      newCardPositions[droppedItem.id].defaultPosition.left = left;
      setCardPositions(newCardPositions);
      onDrop(droppedItem);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  const [cardPositions, setCardPositions] = useState(CARDS);
  const [currentMaxZIndex, setCurrentMaxZIndex] = useState(0);
  const [cardZIndexes, setCardZIndexes] = useState(Array.from(new Array(CARDS.length), () => 1));

  return (
    <div
      ref={drop}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Only used for local testing
        // backgroundColor: 'rgba(200, 200, 200, 0.6)',
      }}
    >
      {checkIsBoardFull(board) && isHost && (
        <div className="flex items-center flex-col justify-center h-full text-lg md:text-2xl text-white font-bold text-center">
          {getTranslation('readyToMoveOn')}
          <Button
            type="primary"
            text={getTranslation('goToNextRound')}
            onClick={() => {
              socketEvents.changeRound(socketEvents.Rounds.SelectEasy);
            }}
            className="mt-3"
          />
        </div>
      )}
      {Object.keys(CARDS).map((k: string, index: number) => {
        const card = CARDS[k] as Card;
        if (board.includes(card.id)) {
          return null;
        }
        return (
          <CardComponent
            data={card}
            key={k}
            zIndex={cardZIndexes[index]}
            top={cardPositions[card.id].defaultPosition.top}
            left={cardPositions[card.id].defaultPosition.left}
            onPickupCard={(monitor: DragSourceMonitor) => {
              socketEvents.pickupCard(card.id);
              let newCardZIndexes = cardZIndexes;
              const newMaxIndex = currentMaxZIndex + 1;
              newCardZIndexes[index] = newMaxIndex;
              setCurrentMaxZIndex(newMaxIndex);
              setCardZIndexes(newCardZIndexes);
              const newCardOffset = monitor.getSourceClientOffset() as XYCoord;
              const initialSourceOffset = monitor.getInitialSourceClientOffset() as XYCoord;

              if (
                !cardPositions[card.id].defaultPosition.sourceTopOffset ||
                !cardPositions[card.id].defaultPosition.sourceLeftOffset
              ) {
                let deltaX;
                let deltaY;
                deltaY = newCardOffset.y - initialSourceOffset.y;
                deltaX = newCardOffset.x - initialSourceOffset.x;

                const newLeft = Math.round(card.defaultPosition.left + deltaX);
                const newTop = Math.round(card.defaultPosition.top + deltaY);
                const left = newLeft < 0 ? 0 : newLeft;
                const top = newTop < 0 ? 0 : newTop;
                let newCardPositions = cardPositions;
                newCardPositions[card.id].defaultPosition.top = top;
                newCardPositions[card.id].defaultPosition.sourceTopOffset = newCardOffset.y;
                newCardPositions[card.id].defaultPosition.sourceLeftOffset = newCardOffset.x;
                newCardPositions[card.id].defaultPosition.left = left;
                setCardPositions(newCardPositions);
              }
            }}
            onDropCard={() => socketEvents.unlockCard(card.id)}
          />
        );
      })}
    </div>
  );
}

function RoundOrder() {
  const board = useSelector(({ game }: RootState) => game.board);
  const me = useSelector(({ auth }: RootState) => auth.user);
  const host = useSelector(({ game }: RootState) => game.users.find((u) => u.id === game.hostUserId));
  const isHost = host?.id === me.id;
  const dispatch = useDispatch();
  const isTouch = isTouchDevice();
  const tableRef = useRef(null);

  return (
    <DndProvider backend={isTouch ? TouchBackend : HTML5Backend} options={{ enableMouseEvents: true }}>
      <div className="customContainerHeight pt-4 sm:pt-16">
        <div className="flex flex-col lg:flex-row h-full flex-1">
          <div className="flex flex-row flex-wrap lg:flex-1 justify-center lg:justify-start">
            {board.map((boardItem: socketEvents.BoardItem, index: number) => {
              if (boardItem) {
                const card = CARDS[boardItem];
                return (
                  <CardComponent
                    data={card}
                    key={index}
                    onPickupCard={() => socketEvents.pickupCard(card.id)}
                    onDropCard={() => socketEvents.unlockCard(card.id)}
                  />
                );
              }
              return (
                <EmptySpot
                  spot={`${index + 1}`}
                  key={index}
                  onDrop={({ id: cardId }: { id: Card['id'] }) => {
                    socketEvents.dropCard(cardId, index);
                  }}
                />
              );
            })}
          </div>
          <div className="relative flex-1" ref={tableRef}>
            <CardHolderTable
              parentRef={tableRef}
              isHost={isHost}
              board={board}
              onDrop={({ id: cardId }: { id: Card['id'] }) => {
                socketEvents.dropCard(cardId);
              }}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

function useResults() {
  const round = useSelector(({ game }: RootState) => game.round);
  const easyResults = useSelector(({ game }: RootState) => game.easyResults);
  const hardResults = useSelector(({ game }: RootState) => game.hardResults);
  const commitResults = useSelector(({ game }: RootState) => game.commitResults);

  let results: socketEvents.SelectionResults = {};
  if (round === socketEvents.Rounds.SelectEasy || round === socketEvents.Rounds.DiscussEasy) {
    results = easyResults || {};
  } else if (round === socketEvents.Rounds.SelectHard || round === socketEvents.Rounds.DiscussHard) {
    results = hardResults || {};
  } else if (round === socketEvents.Rounds.SelectCommit || round === socketEvents.Rounds.DiscussCommit) {
    results = commitResults || {};
  }

  return results;
}

function DiscussCards({ showMeOnly }: { showMeOnly?: boolean }) {
  const board = useSelector(({ game }: RootState) => game.board);
  const users = useSelector(({ game }: RootState) => game.users);
  const me = useSelector(({ auth }: RootState) => auth.user);
  const results = useResults();
  return (
    <>
      {board.map((boardItem: socketEvents.BoardItem, index: number) => {
        const card = CARDS[boardItem as string];
        const selectedUsers = Object.keys(results)
          .map((userId) => {
            if (isArray(results[userId]) && results[userId].includes(card.id)) {
              const user = users.find((u) => u.id === userId);
              if (user) {
                return user;
              }
            }
            return undefined;
          })
          .filter((u) => (u && u.id ? (showMeOnly ? u.id === me.id : true) : false)) as socketEvents.User[];

        return <DiscussCard key={index} data={card} users={selectedUsers} />;
      })}
    </>
  );
}

function RoundSelect() {
  const board = useSelector(({ game }: RootState) => game.board);
  const [selection, setSelection] = useState<socketEvents.CardSelection>([]);
  const [isDone, setIsDone] = useState(false);
  const round = useSelector(({ game }: RootState) => game.round);
  const results = useResults();
  const users = useSelector(({ game }: RootState) => game.users);
  const me = useSelector(({ auth }: RootState) => auth.user);

  const { waitingOnUsers, gotResultsUsers, totalActiveCount } = useMemo(() => {
    const activeUsers = users.filter((u) => u.status !== 'removed' && u.status !== 'inactive');
    const gotResultsUsers: socketEvents.User[] = [];
    Object.keys(results).forEach((resultsUserId) => {
      if (resultsUserId) {
        const resultUser = activeUsers.find((u) => u.id === resultsUserId);
        if (resultUser) {
          gotResultsUsers.push(resultUser);
        }
      }
    });
    const waitingOnUsers = activeUsers.filter((u) => !gotResultsUsers.find((gru) => gru.id === u.id));
    return { waitingOnUsers, gotResultsUsers, totalActiveCount: activeUsers.length };
  }, [users, results]);

  const myRemoteCompletedSelection: socketEvents.CardSelection = results[me.id] || [];

  const host = useSelector(({ game }: RootState) => game.users.find((u) => u.id === game.hostUserId));
  const roomCode = useSelector(({ auth }: RootState) => auth.room);
  const dispatch = useDispatch();
  const isHost = host?.id === me.id;

  useEffect(() => {
    setSelection([]);
  }, [round]);

  return (
    <div className="pt-16">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-row flex-wrap flex-1 justify-center">
          {isDone ? (
            <DiscussCards showMeOnly={true} />
          ) : (
            board.map((boardItem: socketEvents.BoardItem, index: number) => {
              const card = CARDS[boardItem as string];
              return (
                <SelectCard
                  data={card}
                  key={index}
                  isSelected={selection.includes(card.id)}
                  onSelect={(bool: boolean) =>
                    bool
                      ? setSelection(uniqArr([...selection, card.id] as string[]))
                      : setSelection(selection.filter((s) => s !== card.id))
                  }
                />
              );
            })
          )}
        </div>
      </div>
      <div className="flex  items-center justify-center mt-3 fixed bottom-0 right-0 left-0">
        {isDone ? (
          <div className="text-lg bg-yellow-500 rounded-lg w-4/5 text-white text-center mb-2 p-4 font-semibold">
            {!isHost
              ? getTranslation('waitingOnEveryone')
              : gotResultsUsers.length === totalActiveCount
              ? getTranslation('ready')
              : waitingOnUsers.length > 0
              ? `${getTranslation('waitingOn')}: ${waitingOnUsers.map((u) => u.name).join(', ')}`
              : ''}
            {isHost && (
              <Button
                type="primary"
                text={getTranslation('goToNextRound')}
                onClick={() => {
                  if (round === socketEvents.Rounds.SelectEasy) {
                    socketEvents.changeRound(socketEvents.Rounds.DiscussEasy);
                  }
                  if (round === socketEvents.Rounds.SelectHard) {
                    socketEvents.changeRound(socketEvents.Rounds.DiscussHard);
                  }
                  if (round === socketEvents.Rounds.SelectCommit) {
                    socketEvents.changeRound(socketEvents.Rounds.DiscussCommit);
                  }
                }}
                className="ml-2"
              />
            )}
          </div>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              if (selection.length === 0) {
                toast.error(getTranslation('pleaseSelectCard'));
                return;
              }
              if (round === socketEvents.Rounds.SelectEasy) {
                socketEvents.selectCompleteEasy(selection);
              } else if (round === socketEvents.Rounds.SelectHard) {
                socketEvents.selectCompleteHard(selection);
              } else if (round === socketEvents.Rounds.SelectCommit) {
                socketEvents.selectCompleteCommitted(selection);
              }
              setIsDone(true);
            }}
            className="mb-2 p-4 text-center justify-center"
            style={{ minWidth: 200, padding: 15 }}
            text={getTranslation('imDone')}
          />
        )}
      </div>
    </div>
  );
}

function RoundDiscuss() {
  const board = useSelector(({ game }: RootState) => game.board);
  const round = useSelector(({ game }: RootState) => game.round);
  const me = useSelector(({ auth }: RootState) => auth.user);
  const host = useSelector(({ game }: RootState) => game.users.find((u) => u.id === game.hostUserId));
  const roomCode = useSelector(({ auth }: RootState) => auth.room);
  const isHost = host?.id === me.id;
  const dispatch = useDispatch();
  useLangChange();
  return (
    <div className="pt-16">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-row flex-wrap flex-1 justify-center">
          <DiscussCards />
        </div>
      </div>
      <div className="flex items-center justify-center mt-3 fixed bottom-0 right-0 left-0">
        <div className="text-lg bg-yellow-500 rounded-lg w-4/5 text-white text-center mb-2 p-4 font-semibold flex-row">
          {getTranslation('discussChoices')}
          {isHost && (
            <Button
              type="primary"
              text={
                round !== socketEvents.Rounds.DiscussCommit
                  ? getTranslation('goToNextRound')
                  : getTranslation('wereDone')
              }
              onClick={() => {
                if (round === socketEvents.Rounds.DiscussEasy) {
                  socketEvents.changeRound(socketEvents.Rounds.SelectHard);
                }
                if (round === socketEvents.Rounds.DiscussHard) {
                  socketEvents.changeRound(socketEvents.Rounds.SelectCommit);
                }
                if (round === socketEvents.Rounds.DiscussCommit) {
                  socketEvents.changeRound(socketEvents.Rounds.BoardOnly);
                }
              }}
              className="ml-2"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function RoundBoardOnly() {
  const board = useSelector(({ game }: RootState) => game.board);
  const round = useSelector(({ game }: RootState) => game.round);
  const me = useSelector(({ auth }: RootState) => auth.user);
  const host = useSelector(({ game }: RootState) => game.users.find((u) => u.id === game.hostUserId));
  const roomCode = useSelector(({ auth }: RootState) => auth.room);
  const dispatch = useDispatch();
  return (
    <div className="pt-16">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-row flex-wrap flex-1 justify-center">
          {board.map((boardItem: socketEvents.BoardItem, index: number) => {
            const card = CARDS[boardItem as string];
            return <BasicLargeCard data={card} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Table({ onLogout }: { onLogout: Function }) {
  const board = useSelector(({ game }: RootState) => game.board);
  const round = useSelector(({ game }: RootState) => game.round);
  const me = useSelector(({ auth }: RootState) => auth.user);
  const host = useSelector(({ game }: RootState) => game.users.find((u) => u.id === game.hostUserId));
  const dispatch = useDispatch();

  useEffect(() => {
    socketEvents.socketGameOn();
    socketEvents.joined();

    socketEvents.socket.on('reconnect', (attemptNumber: number) => {
      socketEvents.joined();
    });

    return () => {
      socketEvents.socketGameOff();
      socketEvents.socket.off('reconnect');
    };
  }, []);

  // TOOD: Remove this from prod
  // useEffect(() => {
  //   if (process.env.NODE_ENV !== 'production') {
  //     const timeout = setTimeout(() => {
  //       if (!checkIsBoardFull(board)) {
  //         dispatch(autoFillBoard());
  //       }
  //     }, 300);
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [board]);

  useEffect(() => {
    // TODO: Wait for initial sync room, show some kind of loading state or something
    if (round === socketEvents.Rounds.Order) {
      dispatch(openModal('Round1'));
    } else if (round === socketEvents.Rounds.SelectEasy) {
      dispatch(openModal('Round2'));
    } else if (round === socketEvents.Rounds.SelectHard) {
      dispatch(openModal('Round3'));
    } else if (round === socketEvents.Rounds.SelectCommit) {
      dispatch(openModal('Round4'));
    } else if (round === socketEvents.Rounds.DiscussEasy) {
      dispatch(openModal('Round2Discuss'));
    } else if (round === socketEvents.Rounds.DiscussHard) {
      dispatch(openModal('Round2Discuss'));
    } else if (round === socketEvents.Rounds.DiscussCommit) {
      dispatch(openModal('Round2Discuss'));
    }
  }, [round]);

  return (
    <div
      className="bg-offWhite p-0 sm:p-4 min-h-screen w-full h-full pb-10"
      style={{ backgroundImage: `url(${TABLE})`, backgroundSize: 'cover' }}
    >
      {round === socketEvents.Rounds.Order && <RoundOrder />}
      {round === socketEvents.Rounds.BoardOnly && <RoundBoardOnly />}
      {[socketEvents.Rounds.SelectEasy, socketEvents.Rounds.SelectCommit, socketEvents.Rounds.SelectHard].includes(
        round,
      ) && <RoundSelect />}
      {[socketEvents.Rounds.DiscussEasy, socketEvents.Rounds.DiscussCommit, socketEvents.Rounds.DiscussHard].includes(
        round,
      ) && <RoundDiscuss />}

      <Header />
    </div>
  );
}

export default Table;
