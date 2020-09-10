import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';

export type Dispatch = ThunkDispatch<any, any, any>;
export type GetState = () => RootState;
export type TextLine = {
  text: string;
  isBold: boolean;
};
export type Card = {
  id: string;
  backgroundColor: string;
  defaultPosition: {
    top: number;
    left: number;
    sourceTopOffset?: number;
    sourceLeftOffset?: number;
  };
};
export type FilledBoard = [
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
  Card['id'],
];
