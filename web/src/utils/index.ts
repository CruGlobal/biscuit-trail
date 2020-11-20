import { BOARD_SIZE } from '../constants';
import { Board } from 'actions/socket';

export function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

  var mq = function (query: any) {
    return window.matchMedia(query).matches;
  };

  // @ts-ignore
  if ('ontouchstart' in window || ((window as any).DocumentTouch && document instanceof DocumentTouch)) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

export const isFunction = (fn: any) => typeof fn === 'function';
export const isArray = (a: any): a is any[] => Array.isArray(a);
export const isNumber = (n: any) => typeof n === 'number';
export const isObjectEmpty = (o: any) => Object.entries(o).length === 0 && o.constructor === Object;
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
export const uniqArr = (arr: any[]) => [...new Set(arr)];
export const formatNumber = (num: number) => (!Number.isNaN(Number(num)) ? Number(num).toLocaleString() : num);
export const randomBetween = (a: number, b: number) => Math.floor(Math.random() * (b - a)) + a;
export const randomStr = (len: number = 5) => Math.random().toString(36).substr(2, len);

export const generateId = () => randomStr(5);
export function exists(val: any): boolean {
  return val !== undefined;
}
export async function asyncForEach<T>(arr: T[], callback: (a: T, i: number, arr: T[]) => Promise<any>) {
  for (let i = 0, l = arr.length; i < l; i++) {
    await callback(arr[i], i, arr);
  }
}

export function checkIsBoardFull(board: Board) {
  return board.filter((b) => !!b).length === BOARD_SIZE;
}
