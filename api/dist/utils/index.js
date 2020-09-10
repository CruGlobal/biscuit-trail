"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNonChars = exports.removeDuplicateSpaces = exports.getRandomFromArr = exports.randomIntFromInterval = exports.calculateAge = exports.removeNull = exports.isString = exports.isObject = exports.isArray = exports.exists = exports.ellipsisUtil = exports.generateId = exports.asyncForEach = exports.customMemoResolver = exports.validateEmail = exports.validateDate = exports.randomStr = exports.randomBetween = exports.formatNumber = exports.uniqArr = exports.sum = exports.delay = exports.isObjectEmpty = exports.isNumber = exports.isFunction = exports.merge = exports.clone = exports.uniqBy = exports.xor = exports.throttle = exports.debounce = exports.range = exports.orderBy = exports.memoize = exports.difference = void 0;
const throttle_1 = __importDefault(require("lodash/throttle"));
exports.throttle = throttle_1.default;
const debounce_1 = __importDefault(require("lodash/debounce"));
exports.debounce = debounce_1.default;
const range_1 = __importDefault(require("lodash/range"));
exports.range = range_1.default;
const orderBy_1 = __importDefault(require("lodash/orderBy"));
exports.orderBy = orderBy_1.default;
const memoize_1 = __importDefault(require("lodash/memoize"));
exports.memoize = memoize_1.default;
const uniqBy_1 = __importDefault(require("lodash/uniqBy"));
exports.uniqBy = uniqBy_1.default;
const xor_1 = __importDefault(require("lodash/xor"));
exports.xor = xor_1.default;
const clone_1 = __importDefault(require("lodash/clone"));
exports.clone = clone_1.default;
const merge_1 = __importDefault(require("lodash/merge"));
exports.merge = merge_1.default;
const difference_1 = __importDefault(require("lodash/difference"));
exports.difference = difference_1.default;
exports.isFunction = (fn) => typeof fn === 'function';
exports.isNumber = (n) => typeof n === 'number';
exports.isObjectEmpty = (o) => Object.entries(o).length === 0 && o.constructor === Object;
exports.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sum = (arr) => arr.reduce((a, b) => a + b, 0);
exports.uniqArr = (arr) => [...new Set(arr)];
exports.formatNumber = (num) => (!Number.isNaN(Number(num)) ? Number(num).toLocaleString() : num);
exports.randomBetween = (a, b) => Math.floor(Math.random() * (b - a)) + a;
exports.randomStr = (len = 5) => Math.random().toString(36).substr(2, len);
function validateDate(dateStr) {
    const regExp = /^(\d\d?)\/(\d\d?)\/(\d{4})$/;
    const matches = dateStr.match(regExp);
    const maxDate = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let isValid = false;
    if (matches) {
        const month = parseInt(matches[1]);
        const date = parseInt(matches[2]);
        const year = parseInt(matches[3]);
        isValid = month <= 12 && month > 0;
        isValid = isValid && date <= maxDate[month] && date > 0;
        const leapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
        isValid = isValid && (month !== 2 || leapYear || date <= 28);
    }
    return isValid;
}
exports.validateDate = validateDate;
function validateEmail(email) {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEX.test(String(email).toLowerCase());
}
exports.validateEmail = validateEmail;
exports.customMemoResolver = (...args) => JSON.stringify(args);
async function asyncForEach(arr, callback) {
    for (let i = 0, l = arr.length; i < l; i++) {
        await callback(arr[i], i, arr);
    }
}
exports.asyncForEach = asyncForEach;
function generateId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
exports.generateId = generateId;
function ellipsisUtil(str, len) {
    let q = str || '';
    q = q.length > len ? q.substr(0, len).trim() + '...' : q;
    return q;
}
exports.ellipsisUtil = ellipsisUtil;
/**
 * Check if a given value exists
 *
 * @export
 * @param {*} val
 * @returns {boolean}
 */
function exists(val) {
    return val !== undefined;
}
exports.exists = exists;
/**
 * Check if a given value is an array
 *
 * @export
 * @param {*} val
 * @returns {val is any[]}
 */
function isArray(val) {
    return Array.isArray(val);
}
exports.isArray = isArray;
/**
 * Check if a given value is an object
 *
 * @export
 * @param {*} val
 * @returns {val is object}
 */
function isObject(val) {
    return typeof val === 'object' && !isArray(val) && val !== null;
}
exports.isObject = isObject;
/**
 * Check if a given value is a string
 *
 * @export
 * @param {*} val
 * @returns {val is string}
 */
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
/**
 * Remove any null values from an object
 *
 * @export
 * @param {({ [key in string | number]: any })} obj
 * @returns {object}
 */
function removeNull(obj) {
    Object.keys(obj).forEach((key) => obj[key] === null && delete obj[key]);
    return obj;
}
exports.removeNull = removeNull;
/**
 * Calculate age in years based on a date of birth
 *
 * @export
 * @param {(number | string | Date)} birthday
 * @returns {number}
 */
function calculateAge(birthday) {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
exports.calculateAge = calculateAge;
/**
 * Get a random number between between min and max inclusive
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomIntFromInterval = randomIntFromInterval;
function getRandomFromArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.getRandomFromArr = getRandomFromArr;
function removeDuplicateSpaces(text) {
    return text.replace(/\s\s+/g, ' ').trim();
}
exports.removeDuplicateSpaces = removeDuplicateSpaces;
function removeNonChars(text) {
    // apostrophe should not be replaced with space
    return text.replace(/[']/g, '').replace(/[^a-z0-9\s]/g, ' ');
}
exports.removeNonChars = removeNonChars;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrREFBdUM7QUFXaUIsbUJBWGpELGtCQUFRLENBV2lEO0FBVmhFLCtEQUF1QztBQVVPLG1CQVZ2QyxrQkFBUSxDQVV1QztBQVR0RCx5REFBaUM7QUFTTSxnQkFUaEMsZUFBSyxDQVNnQztBQVI1Qyw2REFBcUM7QUFRUCxrQkFSdkIsaUJBQU8sQ0FRdUI7QUFQckMsNkRBQXFDO0FBT2hCLGtCQVBkLGlCQUFPLENBT2M7QUFONUIsMkRBQW1DO0FBTW9DLGlCQU5oRSxnQkFBTSxDQU1nRTtBQUw3RSxxREFBNkI7QUFLcUMsY0FMM0QsYUFBRyxDQUsyRDtBQUpyRSx5REFBaUM7QUFJOEMsZ0JBSnhFLGVBQUssQ0FJd0U7QUFIcEYseURBQWlDO0FBR3FELGdCQUgvRSxlQUFLLENBRytFO0FBRjNGLG1FQUEyQztBQUVsQyxxQkFGRixvQkFBVSxDQUVFO0FBRU4sUUFBQSxVQUFVLEdBQUcsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLFVBQVUsQ0FBQztBQUNuRCxRQUFBLFFBQVEsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDO0FBQzdDLFFBQUEsYUFBYSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUM7QUFDdkYsUUFBQSxLQUFLLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUUsUUFBQSxHQUFHLEdBQUcsQ0FB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Q0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFGRCxzREFFQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLEdBQVU7SUFDekMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUZELDRDQUVDO0FBRUQsU0FBZ0IscUJBQXFCLENBQUMsSUFBWTtJQUNoRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVDLENBQUM7QUFGRCxzREFFQztBQUNELFNBQWdCLGNBQWMsQ0FBQyxJQUFZO0lBQ3pDLCtDQUErQztJQUMvQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUhELHdDQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC90aHJvdHRsZSc7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoL2RlYm91bmNlJztcbmltcG9ydCByYW5nZSBmcm9tICdsb2Rhc2gvcmFuZ2UnO1xuaW1wb3J0IG9yZGVyQnkgZnJvbSAnbG9kYXNoL29yZGVyQnknO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoL21lbW9pemUnO1xuaW1wb3J0IHVuaXFCeSBmcm9tICdsb2Rhc2gvdW5pcUJ5JztcbmltcG9ydCB4b3IgZnJvbSAnbG9kYXNoL3hvcic7XG5pbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoL2Nsb25lJztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UnO1xuaW1wb3J0IGRpZmZlcmVuY2UgZnJvbSAnbG9kYXNoL2RpZmZlcmVuY2UnO1xuXG5leHBvcnQgeyBkaWZmZXJlbmNlLCBtZW1vaXplLCBvcmRlckJ5LCByYW5nZSwgZGVib3VuY2UsIHRocm90dGxlLCB4b3IsIHVuaXFCeSwgY2xvbmUsIG1lcmdlIH07XG5cbmV4cG9ydCBjb25zdCBpc0Z1bmN0aW9uID0gKGZuOiBhbnkpID0+IHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJztcbmV4cG9ydCBjb25zdCBpc051bWJlciA9IChuOiBhbnkpID0+IHR5cGVvZiBuID09PSAnbnVtYmVyJztcbmV4cG9ydCBjb25zdCBpc09iamVjdEVtcHR5ID0gKG86IGFueSkgPT4gT2JqZWN0LmVudHJpZXMobykubGVuZ3RoID09PSAwICYmIG8uY29uc3RydWN0b3IgPT09IE9iamVjdDtcbmV4cG9ydCBjb25zdCBkZWxheSA9IChtczogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuZXhwb3J0IGNvbnN0IHN1bSA9IChhcnI6IG51bWJlcltdKSA9PiBhcnIucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG5leHBvcnQgY29uc3QgdW5pcUFyciA9IChhcnI6IGFueVtdKSA9PiBbLi4ubmV3IFNldChhcnIpXTtcbmV4cG9ydCBjb25zdCBmb3JtYXROdW1iZXIgPSAobnVtOiBudW1iZXIpID0+ICghTnVtYmVyLmlzTmFOKE51bWJlcihudW0pKSA/IE51bWJlcihudW0pLnRvTG9jYWxlU3RyaW5nKCkgOiBudW0pO1xuZXhwb3J0IGNvbnN0IHJhbmRvbUJldHdlZW4gPSAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpICsgYTtcbmV4cG9ydCBjb25zdCByYW5kb21TdHIgPSAobGVuOiBudW1iZXIgPSA1KSA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgbGVuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRGF0ZShkYXRlU3RyOiBzdHJpbmcpIHtcbiAgY29uc3QgcmVnRXhwID0gL14oXFxkXFxkPylcXC8oXFxkXFxkPylcXC8oXFxkezR9KSQvO1xuICBjb25zdCBtYXRjaGVzID0gZGF0ZVN0ci5tYXRjaChyZWdFeHApO1xuICBjb25zdCBtYXhEYXRlID0gWzAsIDMxLCAyOSwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xuICBsZXQgaXNWYWxpZCA9IGZhbHNlO1xuXG4gIGlmIChtYXRjaGVzKSB7XG4gICAgY29uc3QgbW9udGggPSBwYXJzZUludChtYXRjaGVzWzFdKTtcbiAgICBjb25zdCBkYXRlID0gcGFyc2VJbnQobWF0Y2hlc1syXSk7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KG1hdGNoZXNbM10pO1xuXG4gICAgaXNWYWxpZCA9IG1vbnRoIDw9IDEyICYmIG1vbnRoID4gMDtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBkYXRlIDw9IG1heERhdGVbbW9udGhdICYmIGRhdGUgPiAwO1xuXG4gICAgY29uc3QgbGVhcFllYXIgPSB5ZWFyICUgNDAwID09PSAwIHx8ICh5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwKTtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiAobW9udGggIT09IDIgfHwgbGVhcFllYXIgfHwgZGF0ZSA8PSAyOCk7XG4gIH1cblxuICByZXR1cm4gaXNWYWxpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWw6IHN0cmluZykge1xuICBjb25zdCBFTUFJTF9SRUdFWCA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gIHJldHVybiBFTUFJTF9SRUdFWC50ZXN0KFN0cmluZyhlbWFpbCkudG9Mb3dlckNhc2UoKSk7XG59XG5cbmV4cG9ydCBjb25zdCBjdXN0b21NZW1vUmVzb2x2ZXIgPSAoLi4uYXJnczogYW55W10pID0+IEpTT04uc3RyaW5naWZ5KGFyZ3MpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXN5bmNGb3JFYWNoPFQ+KGFycjogVFtdLCBjYWxsYmFjazogKGE6IFQsIGk6IG51bWJlciwgYXJyOiBUW10pID0+IFByb21pc2U8YW55Pikge1xuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhd2FpdCBjYWxsYmFjayhhcnJbaV0sIGksIGFycik7XG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUlkKCkge1xuICByZXR1cm4gYCR7RGF0ZS5ub3coKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSl9YDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlbGxpcHNpc1V0aWwoc3RyOiBzdHJpbmcsIGxlbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHEgPSBzdHIgfHwgJyc7XG4gIHEgPSBxLmxlbmd0aCA+IGxlbiA/IHEuc3Vic3RyKDAsIGxlbikudHJpbSgpICsgJy4uLicgOiBxO1xuICByZXR1cm4gcTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIGdpdmVuIHZhbHVlIGV4aXN0c1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXN0cyh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBnaXZlbiB2YWx1ZSBpcyBhbiBhcnJheVxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJucyB7dmFsIGlzIGFueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSh2YWw6IGFueSk6IHZhbCBpcyBhbnlbXSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBnaXZlbiB2YWx1ZSBpcyBhbiBvYmplY3RcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybnMge3ZhbCBpcyBvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWw6IGFueSk6IHZhbCBpcyBvYmplY3Qge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgIWlzQXJyYXkodmFsKSAmJiB2YWwgIT09IG51bGw7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBnaXZlbiB2YWx1ZSBpcyBhIHN0cmluZ1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJucyB7dmFsIGlzIHN0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbDogYW55KTogdmFsIGlzIHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW55IG51bGwgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsoeyBba2V5IGluIHN0cmluZyB8IG51bWJlcl06IGFueSB9KX0gb2JqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTnVsbChvYmo6IHsgW2tleSBpbiBzdHJpbmcgfCBudW1iZXJdOiBhbnkgfSk6IG9iamVjdCB7XG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaCgoa2V5KSA9PiBvYmpba2V5XSA9PT0gbnVsbCAmJiBkZWxldGUgb2JqW2tleV0pO1xuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBhZ2UgaW4geWVhcnMgYmFzZWQgb24gYSBkYXRlIG9mIGJpcnRoXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSl9IGJpcnRoZGF5XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQWdlKGJpcnRoZGF5OiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlKTogbnVtYmVyIHtcbiAgY29uc3QgYWdlRGlmTXMgPSBEYXRlLm5vdygpIC0gbmV3IERhdGUoYmlydGhkYXkpLmdldFRpbWUoKTtcbiAgY29uc3QgYWdlRGF0ZSA9IG5ldyBEYXRlKGFnZURpZk1zKTsgLy8gbWlsaXNlY29uZHMgZnJvbSBlcG9jaFxuICByZXR1cm4gTWF0aC5hYnMoYWdlRGF0ZS5nZXRVVENGdWxsWWVhcigpIC0gMTk3MCk7XG59XG5cbi8qKlxuICogR2V0IGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIGJldHdlZW4gbWluIGFuZCBtYXggaW5jbHVzaXZlXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUludEZyb21JbnRlcnZhbChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbUZyb21BcnIoYXJyOiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlU3BhY2VzKHRleHQ6IHN0cmluZykge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHNcXHMrL2csICcgJykudHJpbSgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vbkNoYXJzKHRleHQ6IHN0cmluZykge1xuICAvLyBhcG9zdHJvcGhlIHNob3VsZCBub3QgYmUgcmVwbGFjZWQgd2l0aCBzcGFjZVxuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bJ10vZywgJycpLnJlcGxhY2UoL1teYS16MC05XFxzXS9nLCAnICcpO1xufVxuIl19