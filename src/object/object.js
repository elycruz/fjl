
import {curry, curry2} from '../function/curry';
import {assignDeep, hasOwnProperty, keys} from './objectPrelude';
import {reduce} from '../array/arrayPrelude';

export {instanceOf} from './instanceOf';
export {typeOf} from './typeOf';
export {isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isMap, isSet,
    isWeakMap, isWeakSet} from './is';

export const

    union = curry((obj1, obj2) => assignDeep(obj1, obj2)),

    intersect = curry((obj1, obj2) => reduce((agg, key) => {
        if (hasOwnProperty(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1))),

    difference = curry((obj1, obj2) => reduce((agg, key) => {
        if (!hasOwnProperty(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1))),

    complement = curry2((obj0, ...objs) => reduce((agg, obj) =>
        assignDeep(agg, difference(obj, obj0)), {}, objs));
