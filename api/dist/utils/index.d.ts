import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import range from 'lodash/range';
import orderBy from 'lodash/orderBy';
import memoize from 'lodash/memoize';
import uniqBy from 'lodash/uniqBy';
import xor from 'lodash/xor';
import clone from 'lodash/clone';
import merge from 'lodash/merge';
import difference from 'lodash/difference';
export { difference, memoize, orderBy, range, debounce, throttle, xor, uniqBy, clone, merge };
export declare const isFunction: (fn: any) => boolean;
export declare const isNumber: (n: any) => boolean;
export declare const isObjectEmpty: (o: any) => boolean;
export declare const delay: (ms: number) => Promise<unknown>;
export declare const sum: (arr: number[]) => number;
export declare const uniqArr: (arr: any[]) => any[];
export declare const formatNumber: (num: number) => string | number;
export declare const randomBetween: (a: number, b: number) => number;
export declare const randomStr: (len?: number) => string;
export declare function validateDate(dateStr: string): boolean;
export declare function validateEmail(email: string): boolean;
export declare const customMemoResolver: (...args: any[]) => string;
export declare function asyncForEach<T>(arr: T[], callback: (a: T, i: number, arr: T[]) => Promise<any>): Promise<void>;
export declare function generateId(): string;
export declare function ellipsisUtil(str: string, len: number): string;
/**
 * Check if a given value exists
 *
 * @export
 * @param {*} val
 * @returns {boolean}
 */
export declare function exists(val: any): boolean;
/**
 * Check if a given value is an array
 *
 * @export
 * @param {*} val
 * @returns {val is any[]}
 */
export declare function isArray(val: any): val is any[];
/**
 * Check if a given value is an object
 *
 * @export
 * @param {*} val
 * @returns {val is object}
 */
export declare function isObject(val: any): val is object;
/**
 * Check if a given value is a string
 *
 * @export
 * @param {*} val
 * @returns {val is string}
 */
export declare function isString(val: any): val is string;
/**
 * Remove any null values from an object
 *
 * @export
 * @param {({ [key in string | number]: any })} obj
 * @returns {object}
 */
export declare function removeNull(obj: {
    [key in string | number]: any;
}): object;
/**
 * Calculate age in years based on a date of birth
 *
 * @export
 * @param {(number | string | Date)} birthday
 * @returns {number}
 */
export declare function calculateAge(birthday: number | string | Date): number;
/**
 * Get a random number between between min and max inclusive
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export declare function randomIntFromInterval(min: number, max: number): number;
export declare function getRandomFromArr(arr: any[]): any;
export declare function removeDuplicateSpaces(text: string): string;
export declare function removeNonChars(text: string): string;
//# sourceMappingURL=index.d.ts.map