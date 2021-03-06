import {isFunction} from '../object/is';

export const

    /**
     * If given value is not a function, wraps it an 'identity' function (function that returns given value untouched) else returns given value. (useful in
     * functional composition).
     * @function module:function.toFunction
     * @param x {Function|any}
     * @returns {function(): any}
     */
    toFunction = x => isFunction(x) ? x : () => x;
