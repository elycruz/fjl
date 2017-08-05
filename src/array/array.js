/**
 * Array operators module.
 * @module arrayOperators
 * @todo for loops are faster than for loops? https://jsperf.com/fastest-array-loops-in-javascript/24
 */


'use strict';

import {curry, curry2} from '../function/curry';
import {apply} from '../function/apply';
import {isString, isArray} from '../object/is';
import {length, hasOwnProperty} from '../object/objectPrelude';
import {concat as arrayConcat, slice} from './arrayPrelude';
import {negate as negateP} from '../function/function';
import {isTruthy, isFalsy} from '../boolean/is';
import {log} from '../../tests/for-server/helpers';
import {fPureTakesOne} from "../utils/utils";

export const

    indexOf = fPureTakesOne('indexOf'),

    lastIndexOf = fPureTakesOne('lastIndexOf'),

    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    concat = curry2((x, ...args) => (isArray(x) ? arrayConcat : strConcat)(x, ...args)),

    any = curry((p, xs) => reduceUntil(p, (_ => true), false, xs)),

    all = curry((p, xs) => {
        const limit = length(xs);
        let ind = 0;
        if (limit === 0) {
            return false;
        }
        for (; ind < limit; ind++) {
            if (!p(xs[ind], ind, xs)) {
                return false;
            }
        }
        return true;
    }),

    map = curry ((fn, xs) => {
        let ind = -1,
            limit = length(xs),
            out = (xs).constructor();
        while (++ind < limit) {
            out[ind] = fn(xs[ind], ind, xs);
        }
        return out;
    }),

    filter = curry ((pred, xs) => {
        let ind = 0,
            limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = (xs).constructor();
        if (!limit) { return out; }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out = aggregator(out, xs[ind]);
            }
        }
        return out;
    }),

    reduce = curry((operation, agg, arr) =>
        reduceUntil(
            () => false,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr)),                  // array

    /**
     * Returns head of array (first item of array).
     * @function module:arrayOperators.head
     * @param functor {Array|String}
     * @returns {*} - First item from array
     */
    head = functor => functor[0],

    /**
     * Returns tail part of array (everything after the first item as new array).
     * @function module:arrayOperators.tail
     * @param functor {Array}
     * @returns {Array}
     */
    tail = functor => sliceFrom(1, functor),

    /**
     * Returns everything except last item of array as new array.
     * @function module:arrayOperators.init
     * @param functor {Array|String}
     * @returns {Array|String}
     */
    init = functor => slice(0, lastIndex(functor), functor),

    /**
     * Returns last item of array.
     * @function module:arrayOperators.last
     * @param functor {Array|String}
     * @returns {*}
     */
    last = functor => functor[lastIndex(functor)],

    /**
     * Returns `head` and `tail` of passed in array/string in a tuple.
     * @param x {Array|String}
     * @returns {Array|String|Null}
     */
    uncons = x => {
        const len = length(x);
        if (len === 0) {
            return null;
        }
        return [head(x), tail(x)];
    },

    /**
     * Takes `n` items from start of array to `limit` (exclusive).
     * @function module:arrayOperators.take
     * @param array {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = curry((limit, array) => slice(0, limit, array)),

    /**
     * Drops `n` items from start of array to `count` (exclusive).
     * @function module:arrayOperators.take
     * @param array {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = curry((count, array) => sliceFrom(count, array)),

    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned array)).
     * @function module:arrayOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param functor {Array|String} - functor (array or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = curry((ind, arr) => [
        slice(0, ind, arr),
        sliceFrom(ind, arr)
    ]),

    /**
     * Finds index in string or array.
     * @function module:arrayOps.indexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    indexWhere = curry((pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    }),

    /**
     * Finds index in string or array (alias for `findIndex`).
     * @function module:arrayOps.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = indexWhere,

    /**
     * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
     * do not match the tuple are in second list in the returned tuple.
     *  Essentially `[filter(p, xs), filter(negateP(p), xs)]`.
     * @function module:arrayOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type array or string)).
     */
    partition = curry((pred, arr) => {
        const limit = length(arr),
            receivedString = isString(arr),
            zero = receivedString ? '' : [];
        if (!limit) { return [zero, zero]; }
        return [filter(pred, arr), filter(negateP(pred), arr)];
    }),

    /**
     * Gives an array with passed elements while predicate was true.
     * @function module:arrayOps.takeWhile
     * @param pred {Function} - Predicate<*, index, array|string>
     * @param arr {Array|String}
     * @returns {Array}
     */
    takeWhile = curry((pred, arr) => {
        let zero =  (arr).constructor();
        const operation = aggregatorByType(arr);
        return reduceUntil (
            negateP(pred),  // predicate
            operation,      // operation
            zero,           // aggregator
            arr
        );
    }),

    /**
     * Returns an array without elements that match predicate.
     * @function module:arrayOps.dropWhile
     * @param pred {Function} - Predicate<*, index, array|string>
     * @param arr {Array|String}
     * @returns {Array|String}
     */
    dropWhile = curry((pred, arr) => {
        const limit = length(arr),
            splitPoint =
                indexWhere((item, ind, arr2) =>
                    !pred(arr[ind], ind, arr2), arr);

        return splitPoint === -1 ?
            slice(0, limit, arr) :
            slice(splitPoint, limit, arr);
    }),

    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @function module:arrayOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type array or string)).
     */
    span = curry((pred, arr) => {
        const splitPoint = indexWhere(negateP(pred), arr);
        return splitPoint === -1 ?
            splitAt(0, arr) : splitAt(splitPoint, arr);
    }),

    breakOnList = curry((pred, arr) => {
        const result = span(pred, arr);
        return [result[1], result[0]];
    }),

    intersperse = curry((between, arr) => {
        const limit = length(arr) - 1,
            aggregator = (arr).constructor(),
            aggregatorOp = aggregatorByType(arr);
        return reduce((agg, item, ind) => {
            if (ind === limit) {
                return aggregatorOp(agg, item);
            } else {
                return aggregatorOp(
                    aggregatorOp(agg, item),
                    between
                );
            }
        }, aggregator, arr);
    }),

    intercalate = curry((xs, xss) =>
        apply(concat, intersperse(xs, xss))),

    transpose = xss => {
        const orderedLengths = getOrderedLengths(DESC, ...xss),
            out = new Array(orderedLengths[0]);
        return reduce((agg, item) =>
            reduce((agg2, element, ind2) => {
                agg2[ind2].push(element);
                return agg2;
            }, agg, item), out.map(_ => []), xss);
    },

    /**
     * Generates 2^n sub-sequences for passed in sequence (string/array) (`n` is
     * the length of the passed in sequence so: 2^length(xs)).
     * Note: The return value doubles per index/character passed in so use with caution!
     *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
     *  will generate 65536 sub-sequences!  So caution should be taken to not
     *  use this with sequences above a certain length on certain platform (the browser thread in specific).
     * @function subsequences
     * @param xs {Array|String}
     * @returns {Array}
     */
    subsequences = xs => {
        const len = Math.pow(2, length(xs)),
            out = [];
        for (let i = 0; i < len; i += 1) {
            const entry = [];
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j)) {
                    entry.push(xs[j]);
                }
            }
            out.push(entry);
        }
        return out;
    },

    permutations = xs => [xs],

    /**
     * Flattens an array.
     * @function module:arrayOperators.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = arr => reduce((agg, elm) => {
        if (isArray(elm)) {
            return concat(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, [], arr),

    /**
     * Flattens all arrays passed in into one array.
     * @function module:arrayOperators.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new array.
     * @returns {Array}
     */
    flattenMulti = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => concat(agg, flatten(arr)), flatten(arr0), arrays)),

    /**
     * @function module:arrayOperators.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = curry((arr1, arr2) => {
        const {0: a1, 1: a2} = trimLengths(arr1, arr2);
        return reduce((agg, item, ind) => {
                agg.push([item, a2[ind]]);
            return agg;
        }, [], a1);
    }),

    zipN = curry2((...arrs) => {
        const lists = apply(trimLengths, arrs);
        return reduce((agg, arr, ind) => {
            if (!ind) {
                return zip (agg, arr);
            }
            return agg.map (arr2 => {
                arr.forEach (elm => {
                    arr2.push(elm);
                });
                return arr2;
            });
        }, lists.shift(), lists);
    }),

    unzip = arr =>
        reduce((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr),

    unzipN = (...arrs) =>
        reduce((agg, item) => {
            agg.push(unzip(item));
            return agg;
        }, [], arrs),

    and = all(isTruthy),

    or = any(isTruthy),

    not = all(isFalsy),

    equal = curry2((arg0, ...args) => all(x => arg0 === x, args)),

    sum = arr => {
        const parts = uncons(arr);
        return reduce((agg, x) => agg + x, parts[0], parts[1]);
    },

    product = arr => {
        const parts = uncons(arr);
        return reduce((agg, x) => agg * x, parts[0], parts[1]);
    },

    maximum = arr => apply(Math.max, arr),

    minimum = arr => apply(Math.min, arr),

    /**
     * Creates a union on matching elements from array1.
     * @function module:arrayOperators.union
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    union = curry((arr1, arr2) =>
        concat(arr1, filter(elm => indexOf(elm, arr1) === -1, arr2))),

    /**
     * Performs an intersection on array 1 with  elements from array 2.
     * @function module:arrayOperators.intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    intersect = curry((arr1, arr2) => length(arr2) === 0 ? [] :
            filter(elm => indexOf(elm, arr2) > -1, arr1)),

    /**
     * Returns the difference of array 1 from array 2.
     * @function module:arrayOperators.difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    difference = curry((array1, array2) => { // augment this with max length and min length ordering on op
        let [arr1, arr2] = sortDescByLength(array1, array2);
        if (!arr2 || length(arr2) === 0) {
            return slice(0, length(arr1), arr1);
        }
        return reduce((agg, elm) => {
            if (indexOf(elm, arr2) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    }),

    /**
     * Returns the complement of array 0 and the reset of the passed in arrays.
     * @function module:arrayOperators.complement
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    complement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => concat(agg, difference(arr0, arr)), [], arrays));

const

    ASC = 1,

    DESC = -1,

    sliceFrom = curry((startInd, arr) => slice(startInd, length(arr), arr)),

    sliceFromZero = sliceFrom(0),

    onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1,

    getSortByOrder = curry((multiplier, valueFn) => {
        valueFn = valueFn || (v => v);
        const x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = 1 * x,
            ifLessThan = -1 * x;
        return (...values) => values.sort((a1, b1) => {
            let a = valueFn(a1),
                b = valueFn(b1);
            if (a > b) {
                return ifGreaterThan;
            }
            else if (b > a) {
                return ifLessThan;
            }
            return 0;
        });
    }),

    sortDesc = getSortByOrder(DESC),

    sortAsc = getSortByOrder(ASC),

    sortDescByLength = getSortByOrder(DESC, x => length(x)),

    lengths = curry2((...arrs) => length(arrs) ? arrs.map(length) : []),

    getOrderedLengths = curry2((orderDir, ...arrs) => (orderDir ? sortAsc : sortDesc)(lengths(arrs))),

    trimLengths = (...arrays) => {
        const smallLen = getOrderedLengths(ASC, arrays)[0];
        return arrays.map(arr => length(arr) > smallLen ? slice(0, smallLen, arr) : sliceFromZero(arr));
    },

    aggregatorByType = x => isString(x) ? aggregateStr : aggregateArr,

    aggregateStr = (agg, item) => {
        agg += item; return agg;
    },

    aggregateArr = (agg, item) => {
        agg.push(item); return agg;
    },

    strConcat = (x, ...args) => reduce(aggregateStr, x, args),

    reduceUntil = (pred, op, agg, arr) => {
        let result = agg;
        const limit = length(arr);
        if (limit === 0) {
            return agg;
        }
        for (let ind in arr) {
            if (!hasOwnProperty(ind, arr)) { continue; }
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    };
