import {reduceRight} from '../platform/array';

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the function on the left of itself.
 * @function module:function.compose
 * @type {Function}
 * @param args {...{Function}}
 * @returns {Function}
 */
export const compose = (...args: Function[]): Function =>
        arg0 => reduceRight((value, fn) => fn(value), arg0, args);
