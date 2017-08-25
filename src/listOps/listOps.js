/**
 * Array operators module.
 * @module arrayOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @todo code unperformant shorthand in `listOps`
 */
import {curry, curry2}      from '../functionOps/curry';
import {apply}              from '../functionOps/apply';
import {negateP}            from '../functionOps/functionOps';
import {isTruthy, isFalsy}  from '../booleanOps/is';
import {isString, isArray, isset}  from '../objectOps/is';
import {prop}               from '../objectOps/prop';
import {typeOf}             from '../objectOps/typeOf';
import {of}                 from '../objectOps/of';
import {length, keys as objectKeys, hasOwnProperty} from '../objectOps/objectPrelude';
import {concat as arrayAppend, slice}   from './listOpsPrelude';
// import {log}                            from '../../tests/for-server/helpers';
import {fPureTakesOne}                  from '../utils/utils';

export {length};

const

    ASC = 1,

    DESC = -1,

    sliceToEndFrom = curry((startInd, arr) => slice(startInd, length(arr), arr)),

    sliceFromZero = sliceToEndFrom(0),

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

    aggregateStr = (agg, item) => agg + item,

    aggregateArr = (agg, item) => {
        agg.push(item);
        return agg;
    },

    aggregateObj = (agg, item, ind) => {
        agg[ind] = item;
        return agg;
    },

    aggregatorByType = x => {
        switch (typeOf(x)) {
            case 'String': return aggregateStr;
            case 'Array': return aggregateArr;
            case 'Object':
            default: return aggregateObj;
        }
    },

    reduceUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (limit === 0) { return agg; }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },

    reduceRightUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (limit === 0) { return agg; }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },

    reduce = curry((operation, agg, arr) =>
        reduceUntil(
            () => false,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr)),                  // listOps

    reduceRight = curry((operation, agg, arr) =>
        reduceRightUntil(
            () => false,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr)),                  // listOps

    /**
     * @note Same as a Monoidal `mappend`;  In this case for strings.
     * @param x {String}
     * @param args {String}
     */
    strAppend = (x, ...args) => reduce(aggregateStr, x, args),

    /**
     * Searches list/list-like for given element `x`.
     * @functionOps module:listOps.indexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or listOps like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = fPureTakesOne('indexOf'),

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @functionOps module:listOps.lastIndex
     * @param x {Array|String|*} - listOps like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    /**
     * Finds index in stringOps or listOps.
     * @functionOps module:listOps.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = curry((pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    }),

    /**
     * Finds index in list from right to left.
     * @functionOps module:listOps.findIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = curry((pred, arr) => {
        const limit = length(arr);
        let ind = limit,
            predicateFulfilled = false;
        for (; ind >= 0 && !predicateFulfilled; --ind) {
            predicateFulfilled = pred(arr[ind], ind, arr);
        }
        return ind;
    }),

    /**
     * @functionOps module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    findWhere = curry((pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    });

export const

    /**
     * Append two lists, i.e.,
     * ```
     * append([x1, ..., xm], [y1, ..., yn]) // outputs: [x1, ..., xm, y1, ..., yn]
     * append([x1, ..., xm], [y1, ...]) // outputs: [x1, ..., xm, y1, ...]
     * ```
     * If the first list is not finite, the result is the first list.
     * @haskellType `append :: List a => a -> a -> a`
     * @functionOps module:listOps.append
     * @param xs1 {Array|String|*} - listOps or list like.
     * @param xs2 {Array|String|*} - listOps or list like.
     * @returns {Array|String|*} - Same type as list like passed in.
     */
    append = curry((xs1, xs2) => (isArray(xs1) ? arrayAppend : strAppend)(xs1, xs2)),

    /**
     * Append two or more lists, i.e., same as `append` but for two ore more lists.
     * @haskellType `appendMany :: List a => a -> [a] -> a
     * @note In `@haskellType` we wrote `[a]` only to keep the haskell type valid though note in javascript
     *  this is actually different since the function converts the zero ore more parameters into an array containing such for us.
     * @functionOps module:listOps.appendMany
     * @param xs1 {Array|String|*} - listOps or list like.
     * @param [...args] {Array|String|*} - Lists or lists likes.
     * @returns {Array|String|*} - Same type as first list or list like passed in.
     */
    appendMany = curry2((x, ...args) => (isArray(x) ? arrayAppend : strAppend)(x, ...args)),

    mempty = x => !isset(x) ? [] : of(x),

    mappend = append,

    mappendMany = appendMany,

    /**
     * Returns head of listOps (first item of listOps).
     * @haskellType `head :: [a] -> a`
     * @functionOps module:listOps.head
     * @param x {Array|String}
     * @returns {*} - First item from listOps
     */
    head = x => x[0],

    /**
     * Returns last item of listOps.
     * @haskellType `last :: [a] -> a`
     * @functionOps module:listOps.last
     * @param functor {Array|String}
     * @returns {*}
     */
    last = functor => functor[lastIndex(functor)],

    /**
     * Returns tail part of listOps (everything after the first item as new listOps).
     * @haskelType `tail :: [a] -> [a]`
     * @functionOps module:listOps.tail
     * @param functor {Array}
     * @returns {Array}
     */
    tail = functor => sliceToEndFrom(1, functor),

    /**
     * Returns everything except last item of listOps as new listOps.
     * @haskellType `init :: [a] -> [a]`
     * @functionOps module:listOps.init
     * @param functor {Array|String}
     * @returns {Array|String}
     */
    init = functor => slice(0, lastIndex(functor), functor),

    /**
     * Returns `head` and `tail` of passed in listOps/stringOps in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @functionOps module:listOps.uncons
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    uncons = xs => {
        if (!xs) { return; } //
        const len = length(xs);
        if (len === 0) { return undefined; }
        return [head(xs), tail(xs)];
    },

    unconsr = xs => {
        if (!xs) { return; } //
        const len = length(xs);
        if (len === 0) { return undefined; }
        return [init(xs), last(xs)];
    },

    /**
     * Returns whether a list is empty or not.
     * @note not to be mistaken with module:objectOps.isEmpty;
     *  `objectOps.isEmpty` Checks any passed in type for empty;
     *  `listOps.isEmpty` only checks if length on passed in
     *  value is not truthy.
     *  In typed languages this would be all we
     *  need do due to assuming that only lists make it into our
     *  funciton but in javascript this is loose and in order
     *  to the function to perform well under load and
     *  for it to follow the specification we are not allowed
     *  to type check in it.
     * @note Will keep it like this for now.
     * @function module:listOps.isEmpty
     * @param x {*}
     * @returns {Boolean}
     */
    isEmpty = x => !length(x),

    /**
     * @function module:listOps.map
     * @param fn {Function} - Function to map on functor item(s).
     * @param xs {Array|String|*} - Functor.
     * @returns {Array|String|*} - Functor type that is passed in.
     */
    map = curry ((fn, xs) => {
        let ind = 0,
            limit = length(xs),
            out = mempty(xs),
            aggregate = aggregatorByType(xs);
        for (; ind < limit; ind += 1) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    }),

    concat = foldableOfA => mappendMany(...foldableOfA),

    concatMap = curry((fn, foldableOfA) => concat(map(fn, foldableOfA))),

    reverse = x => {
        const aggregator = aggregatorByType(x);
        return reduceRight(
                (agg, item, ind) => aggregator(agg, item, ind),
                mempty(x), x
            );
    },

    intersperse = curry((between, arr) => {
        const limit = length(arr) - 1,
            aggregator = mempty(arr),
            aggregatorOp = aggregatorByType(arr);
        return reduce((agg, item, ind) => {
            if (ind === limit) {
                return aggregatorOp(agg, item);
            }
            return aggregatorOp(
                aggregatorOp(agg, item),
                between
            );
        }, aggregator, arr);
    }),

    intercalate = curry((xs, xss) => concat(intersperse(xs, xss))),

    transpose = xss => {
        const orderedLengths = getOrderedLengths(DESC, ...xss),
            out = new Array(orderedLengths[0]);
        return reduce((agg, item) =>
            reduce((agg2, element, ind2) => {
                agg2[ind2].push(element);
                return agg2;
            }, agg, item), out.map(() => []), xss);
    },

    /**
     * Generates 2^n sub-sequences for passed in sequence (stringOps/listOps) (`n` is
     * the length of the passed in sequence so: 2^length(xs)).
     * Note: The return value doubles per index/character passed in so use with caution!
     *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
     *  will generate 65536 sub-sequences!  So caution should be taken to not
     *  use this with sequences above a certain length on certain platform (the browser thread in specific).
     * @functionOps module:listOps.subsequences
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

    foldl = reduce,

    foldr = reduceRight,

    foldl1 = curry((op, xs) => {
        const parts = uncons(xs);
        if (!parts) { return of (xs); }
        return reduce (op, parts[0], parts[1]);
    }),

    foldr1 = curry((op, xs) => {
        const parts = unconsr(xs);
        if (!parts) { return of (xs); }
        return reduceRight (op, parts[1], parts[0]);
    }),

    /**
     * Accumulative map functionOps which effectively does a map and reduce (from the left) all in one;  Returns a tuple
     * containing the aggregated value and the mapped result of map the passed in `op` on the passed in
     * list (`xs`).
     * @functionOps module:listOps.mapAccumL
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - listOps type.
     * @return {Array} - [aggregated, listOps]
     */
    mapAccumL = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = 0,
            agg = zero,
            mapped = mempty(xs),
            tuple;
        for (; ind < limit; ind++) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    }),

    /**
     * Accumulative map functionOps which effectively does a map and reduce (from the right) all in one;  Returns a tuple
     * containing the aggregated value and the mapped result of map the passed in `op` on the passed in
     * list (`xs`).
     * @functionOps module:listOps.mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - listOps type.
     * @return {Array} - [aggregated, listOps]
     */
    mapAccumR = curry((op, zero, xs) => {
        const list = sliceToEndFrom(0, xs),
            limit = length(xs);
        if (!limit) { return [zero, list]; }
        let ind = limit - 1,
            agg = zero,
            mapped = mempty(xs),
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    }),

    unfoldr = curry2((op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    }),

    /**
     * Finds index in stringOps or listOps (alias for `findIndex`).
     * @functionOps module:listOps.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = findIndexWhere,

    /**
     * @functionOps module:listOps.findIndicesWhere
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = curry((pred, xs) => {
        const limit = length(xs);
        if (!limit) { return undefined; }
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out;
    }),

    /**
     * @functionOps module:listOps.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {Array|undefined}
     */
    findIndices =  findIndicesWhere,

    /**
     * @functionOps module:listOps.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    elemIndex = curry((x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    }),

    /**
     * @functionOps module:listOps.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    elemIndices = curry((value, xs) => findIndices(x => x === value, xs)),

    /**
     * Takes `n` items from start of listOps to `limit` (exclusive).
     * @functionOps module:listOps.take
     * @param listOps {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = curry((limit, array) => slice(0, limit, array)),

    /**
     * Drops `n` items from start of listOps to `count` (exclusive).
     * @functionOps module:listOps.take
     * @param listOps {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = curry((count, array) => sliceToEndFrom(count, array)),

    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned listOps)).
     * @functionOps module:listOps.splitAt
     * @param ind {Number} - Index to split at.
     * @param functor {Array|String} - functor (listOps or stringOps) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = curry((ind, arr) => [
        slice(0, ind, arr),
        sliceToEndFrom(ind, arr)
    ]),

    /**
     * Gives an listOps with passed elements while predicate was true.
     * @functionOps module:listOps.takeWhile
     * @param pred {Function} - Predicate<*, index, listOps|stringOps>
     * @param arr {Array|String}
     * @returns {Array}
     */
    takeWhile = curry((pred, arr) => {
        let zero =  mempty(arr);
        const operation = aggregatorByType(arr);
        return reduceUntil (
            negateP(pred),  // predicate
            operation,      // operation
            zero,           // aggregator
            arr
        );
    }),

    /**
     * Returns an listOps without elements that match predicate.
     * @functionOps module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, listOps|stringOps>
     * @param arr {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = curry((pred, arr) => {
        const limit = length(arr),
            splitPoint =
                findIndexWhere((item, ind, arr2) =>
                    !pred(arr[ind], ind, arr2), arr);

        return splitPoint === -1 ?
            slice(0, limit, arr) :
            slice(splitPoint, limit, arr);
    }),

    /**
     * @functionOps module:listOps.dropWhile
     * @param pred {Function} - Predicate<*, index, listOps|stringOps>
     * @param arr {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd =curry((pred, arr) => {
        const limit = length(arr),
            splitPoint =
                findIndexWhereRight((item, ind, arr2) =>
                    !pred(arr[ind], ind, arr2), arr);

        return splitPoint === -1 ?
            slice(0, limit, arr) :
            slice(0, splitPoint + 1, arr);
    }),

    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @functionOps module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type listOps or stringOps)).
     */
    span = curry((pred, arr) => {
        const splitPoint = findIndexWhere(negateP(pred), arr);
        return splitPoint === -1 ?
            splitAt(0, arr) : splitAt(splitPoint, arr);
    }),

    breakOnList = curry((pred, arr) => {
        const splitPoint = findIndexWhere(pred, arr);
        return splitPoint === -1 ?
            splitAt(0, arr) : splitAt(splitPoint, arr);
    }),

    /**
     * @functionOps module:listOps.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - listOps or listOps like.
     * @returns {*}
     */
    at = prop,

    /**
     * @functionOps module:listOps.find
     * @param pred {Function}
     * @param xs {Array|String|*} - listOps or list like.
     * @returns {*}
     */
    find = findWhere,

    filter = curry ((pred, xs) => {
        let ind = 0,
            limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = mempty(xs);
        if (!limit) { return out; }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out = aggregator(out, xs[ind]);
            }
        }
        return out;
    }),

    /**
     * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
     * do not match the tuple are in second list in the returned tuple.
     *  Essentially `[filter(p, xs), filter(negateP(p), xs)]`.
     * @functionOps module:listOps.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type listOps or stringOps)).
     */
    partition = curry((pred, arr) => {
        const limit = length(arr),
            receivedString = isString(arr),
            zero = receivedString ? '' : [];
        if (!limit) { return [zero, zero]; }
        return [filter(pred, arr), filter(negateP(pred), arr)];
    }),

    elem = curry((elm, xs) => indexOf(elm, xs) !== -1),

    notElem = curry((elm, xs) => indexOf(elm, xs) === -1),

    lookup = curry((key, xs) => hasOwnProperty(key, xs) ? xs[key] : undefined),

    isPrefixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) { return false; }
        }
        return true;
    }),

    isSuffixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind1 = limit1 - 1,
            ind2 = limit2 - 1;
        for (; ind1 >= 0; ind1--) {
            if (xs1[ind1] !== xs2[ind2]) { return false; }
            ind2 -= 1;
        }
        return true;
    }),

    isInfixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2) {
            return false;
        }
        let ind1,
            foundLen,
            ind = 0;
        for (; ind < limit2; ind += 1) {
            foundLen = 0;
            for (ind1 = 0; ind1 < limit1; ind1 += 1) {
                if (xs2[ind1 + ind] === xs1[ind1]) { foundLen += 1; }
                if (foundLen === limit1) { return true; }
            }
        }
        return false;
    }),

    group = xs => {
        const limit = length(xs);
        if (!limit) { return sliceToEndFrom(0, xs); }
        let ind = 0,
            prevItem,
            item,
            agg = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(
                takeWhile (x => {
                        if (x === prevItem) { ind++; }
                        if (x === item) { prevItem = x; return true; }
                        else { return false; }
                    },
                    slice(ind, limit, xs)
                )
            );
        }
        return agg;
    },

    inits = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) { return []; }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(0, ind, xs));
        }
        return agg;
    }, //map(list => init(list), xs),

    tails = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) { return []; }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(ind, limit, xs));
        }
        // console.log(agg);
        return agg;
    }, //map(list => tail(list), xs),

    stripPrefix = curry((prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(prefix.length, list)[1] :
                sliceToEndFrom(0, list)),

    /**
     * Flattens an listOps.
     * @functionOps module:listOps.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = arr => reduce((agg, elm) => {
        if (isArray(elm)) {
            return mappend(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, [], arr),

    /**
     * Flattens all arrays passed in into one listOps.
     * @functionOps module:listOps.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new listOps.
     * @returns {Array}
     */
    flattenMulti = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => mappend(agg, flatten(arr)), flatten(arr0), arrays)),

    /**
     * zip :: [a] -> [b] -> [(a, b)]
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @functionOps module:listOps.zip
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

    /**
     * zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
     * zipWith generalises zip by zipping with the functionOps given as the
     * first argument, instead of a tupling functionOps. For example,
     * zipWith (+) is applied to two lists to produce the list of corresponding sums.
     * @type {Function}
     */
    zipWith = curry((combinator, xs1, xs2) => []),

    /**
     * unzip :: [(a, b)] -> ([a], [b])
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @param arr
     */
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

    any = curry((p, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return false; }
        for (; ind < limit; ind += 1) {
            if (p(xs[ind])) { return true; }
        }
        return false;
    }),

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

    and = all(isTruthy),

    or = any(isTruthy),

    not = all(isFalsy),

    equal = curry2((arg0, ...args) => all(x => arg0 === x, args)),

    sum = list => reduce((agg, x) => agg + x, 0, list),

    product = arr => reduce((agg, x) => agg * x, 1, arr),

    maximum = arr => apply(Math.max, arr),

    minimum = arr => apply(Math.min, arr),

    /**
     * Creates a arrayUnion on matching elements from array1.
     * @functionOps module:listOps.arrayUnion
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayUnion = curry((arr1, arr2) =>
        mappend(arr1, filter(elm => indexOf(elm, arr1) === -1, arr2))),

    /**
     * Performs an intersection on listOps 1 with  elements from listOps 2.
     * @functionOps module:listOps.arrayIntersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    arrayIntersect = curry((arr1, arr2) => length(arr2) === 0 ? [] :
            filter(elm => indexOf(elm, arr2) > -1, arr1)),

    /**
     * Returns the difference of listOps 1 from listOps 2.
     * @functionOps module:listOps.arrayDifference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    arrayDifference = curry((array1, array2) => { // augment this with max length and min length ordering on op
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
     * Returns the complement of listOps 0 and the reset of the passed in arrays.
     * @functionOps module:listOps.arrayComplement
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    arrayComplement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => mappend(agg, arrayDifference(arr0, arr)), [], arrays));
