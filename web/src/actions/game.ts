import { CARDS } from '../constants';
import { Dispatch, GetState } from '../utils/types';
import { BoardItem, dropCard } from './socket';

export function autoFillBoard() {
  return (dispatch: Dispatch, getState: GetState) => {
    const board = getState().game.board;
    const cardIdsInBoard = board.filter((b) => !!b);
    const cardsIdsNotInBoard: BoardItem[] = Object.keys(CARDS).filter((k) => !cardIdsInBoard.includes(k));
    const newBoard = board.map((b) => {
      if (b) {
        return b;
      }
      return cardsIdsNotInBoard.pop() || null;
    });
    newBoard.forEach((cardId, index) => dropCard(cardId as string, index));
  };
}
