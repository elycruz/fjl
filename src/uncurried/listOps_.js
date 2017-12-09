/**
 * '_' list operators.
 * @module listOps_
 * @private
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @todo code unperformant shorthand in `listOps`
 * @todo rename monoid functions to normal functions since we are not really defining methods for monoids here.
 */
import {
    concat as listAppend,
    indexOf, slice, includes
}
    from './jsPlatform/list_';

import {apply} from './jsPlatform/function_';
import {negateP, negateF} from './functionOps/negate_';
import {isTruthy, isFalsy} from '../booleanOps';
import {isString, isEmptyList, prop, of, length} from './objectOps_';
import {map} from './listOps/map_';

import {
    sliceFrom, sliceTo, lengths,
    lengthsToSmallest, aggregateArr, aggregatorByType,
    reduceUntil, reduce, reduceRight, lastIndex,
    findIndexWhere, findIndexWhereRight, findIndicesWhere,
    findWhere, copy, genericAscOrdering, _permutationsAlgo
}
    from './listOps/utils_';

// Exported imports
export {map};

// Exported internals
export const

    /**
     * Append two lists, i.e.,
     * ```
     * append([x1, ..., xm], [y1, ..., yn]) // outputs: [x1, ..., xm, y1, ..., yn]
     * append([x1, ..., xm], [y1, ...]) // outputs: [x1, ..., xm, y1, ...]
     * ```
     * If the first list is not finite, the result is the first list.
     * @haskellType `append :: List a => a -> a -> a`
     * @function module:listOps_.append
     * @param xs1 {Array|String|*} - list or list like.
     * @param xs2 {Array|String|*} - list or list like.
     * @returns {Array|String|*} - Same type as list like passed in.
     */
    append = listAppend,

    /**
     * Append two or more lists, i.e., same as `append` but for two ore more lists.
     * @haskellType `appendMany :: List a => a -> [a] -> a
     * @note In `@haskellType` we wrote `[a]` only to keep the haskell type valid though note in javascript
     *  this is actually different since the function converts the zero ore more parameters into an array containing such for us.
     * @function module:listOps_.appendMany
     * @param args ...{Array|String|*} - Lists or lists likes.
     * @returns {Array|String|*} - Same type as first list or list like passed in.
     */
    appendMany = (...args) => {
        if (length(args)) { return apply(listAppend, args); }
        throw new Error('`appendMany` requires at least one arg.');
    },

    /**
     * Returns head of list (first item of list).
     * @haskellType `head :: [a] -> a`
     * @function module:listOps_.head
     * @param x {Array|String}
     * @returns {*} - First item from list
     */
    head = x => x[0],

    /**
     * Returns last item of list.
     * @haskellType `last :: [a] -> a`
     * @function module:listOps_.last
     * @param xs {Array|String}
     * @returns {*}
     */
    last = xs => xs[lastIndex(xs)],

    /**
     * Returns tail part of list (everything after the first item as new list).
     * @haskelType `tail :: [a] -> [a]`
     * @function module:listOps_.tail
     * @param xs {Array}
     * @returns {Array}
     */
    tail = xs => sliceFrom(1, xs),

    /**
     * Returns everything except last item of list as new list.
     * @haskellType `init :: [a] -> [a]`
     * @function module:listOps_.init
     * @param xs {Array|String}
     * @returns {Array|String}
     */
    init = xs => sliceTo(lastIndex(xs), xs),

    /**
     * Returns `head` and `tail` of passed in list/string in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @function module:listOps_.uncons
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    uncons = xs => {
        if (!xs) {
            return;
        }
        if (length(xs) === 0) {
            return undefined;
        }
        return [head(xs), tail(xs)];
    },

    /**
     * Returns `tail` and `head` of passed in list/string in a tuple.
     * @haskellType `unconsr :: [a] -> Maybe ([a], a)`
     * @function module:listOps_.unconsr
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    unconsr = xs => {
        if (!xs) {
            return;
        }
        if (length(xs) === 0) {
            return undefined;
        }
        return [init(xs), last(xs)];
    },
    
    /**
     * Concatenates all the elements of a container of lists.
     * @haskellType `concat :: Foldable t => t [a] -> [a]`
     * @function module:listOps_.concat
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    concat = xs => {
        if (!length(xs)) { return copy(xs); }
        return isString(xs) ? xs : apply(appendMany, xs);
    },

    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:listOps_.concatMap
     * @param fn {Function}
     * @param foldableOfA {Array|String|*}
     * @returns {Array|String|*}
     */
    concatMap = (fn, foldableOfA) => concat(map(fn, foldableOfA)),

    /**
     * Returns a copy of the passed in list reverses.
     * @haskellType `reverse :: [a] -> [a]`
     * @function module:listOps_.reverse
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    reverse = x => {
        const aggregator = aggregatorByType(x);
        return foldr (
            (agg, item, ind) => aggregator(agg, item, ind),
            of(x), x
        );
    },

    /**
     * Takes an element and a list and `intersperses' that element between the elements of the list. For example
     * @function module:listOps_.intersperse
     * @note In our version of the function javascript is loosely typed so, so is our function (to much overhead to make
     *  it typed) so `between` can be any value.
     * @param between {*} - Should be of the same type of elements contained in list.
     * @param arr {Array|String|*} - List.
     * @returns {Array|String|*}
     */
    intersperse = (between, arr) => {
        const limit = length(arr),
            lastInd = limit - 1,
            aggregator = of(arr),
            aggregatorOp = aggregatorByType(arr);
        if (!limit) {
            return aggregator;
        }
        return foldl((agg, item, ind) => {
            return ind === lastInd ?
                aggregatorOp(agg, item) :
                aggregatorOp(
                    aggregatorOp(agg, item),
                    between
                );
        }, aggregator, arr);
    },

    /**
     * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:listOps_.intercalate
     * @param xs {Array|String|*}
     * @param xss {Array|String|*}
     * @returns {Array|String|*}
     */
    intercalate = (xs, xss) => concat(intersperse(xs, xss)),

    /**
     * Transposes rows and columns into lists by index;  E.g.,
     * Haskell example:
     * ```
     *  transpose [[1,2,3],[4,5,6]] == [[1,4],[2,5],[3,6]]
     *
     *  -- Notice the shorter arrays are ignored after their last index is copied over:
     *  transpose [[10,11],[20],[],[30,31,32]] == [[10,20,30],[11,31],[32]]
     * ```
     * @note from columns to rows.
     * @note Empty lists are ignored.
     * @todo upgrade this function to support lists of strings.
     * @haskellType `transpose :: [[a]] -> [[a]]`
     * @function module:listOps_.transpose
     * @param xss {Array}
     * @returns {Array}
     */
    transpose = xss => {
        let numLists = length(xss),
            ind = 0, ind2;
        if (!numLists) {
            return of(xss);
        }
        const listLengths = apply(lengths, xss),
            longestListLen = maximum(listLengths),
            outLists = [];
        for (; ind < longestListLen; ind += 1) {
            const outList = [];
            for (ind2 = 0; ind2 < numLists; ind2 += 1) {
                if (listLengths[ind2] < ind + 1) {
                    continue;
                }
                outList.push(xss[ind2][ind]);
            }
            outLists.push(outList);
        }
        return filter(x => length(x), outLists);
    },

    /**
     * Generates 2^n sub-sequences for passed in sequence (string/list) (`n` is
     * the length of the passed in sequence so: 2^length(xs)).
     * Note: The return value doubles per index/character passed in so use with caution!
     *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
     *  will generate 65536 sub-sequences!  So caution should be taken to not
     *  use this with sequences above a certain length on certain platform (the browser thread in specific).
     * @function module:listOps_.subsequences
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

    /**
     * Returns a list of permutations for passed in list.
     *  Use caution with lists above a length of 15 (will take long due to nature of
     *  algorithm).
     * @function module:listOps.permutations
     * @param xs {Array|String|*} - List.
     * @returns {Array<Array|String|*>} - Array of permutations.
     */
    permutations = xs => {
        const limit = length(xs);
        return !limit ? [xs] :
            _permutationsAlgo(xs, limit, limit);
    },

    /**
     * Reduces a foldable (list etc.) with passed in function.
     * @function module:listOps_.foldl
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array|String|*}
     * @returns {*} - Usually same type as aggregate (`zero`) (depends on `fn`).
     */
    foldl = reduce,

    foldr = reduceRight,

    foldl1 = (op, xs) => {
        const parts = uncons(xs);
        if (!parts) {
            return of(xs);
        }
        return reduce(op, parts[0], parts[1]);
    },

    foldr1 = (op, xs) => {
        const parts = unconsr(xs);
        if (!parts) {
            return of(xs);
        }
        return reduceRight(op, parts[1], parts[0]);
    },

    /**
     * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:listOps_.mapAccumL
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumL = (op, zero, xs) => {
        const list = sliceFrom(0, xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = 0,
            agg = zero,
            mapped = of(xs),
            tuple;
        for (; ind < limit; ind++) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    },

    /**
     * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
     * containing the aggregated value and the result of mapping the passed in function on passed in list.
     * @function module:listOps_.mapAccumR
     * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
     * @param zero {*} - An instance of the passed in list type used to aggregate on.
     * @param xs {Array|String|*} - list type.
     * @return {Array} - [aggregated, list]
     */
    mapAccumR = (op, zero, xs) => {
        const list = sliceFrom(0, xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = limit - 1,
            agg = zero,
            mapped = of(xs),
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    },

    /**
     * Iterate on value (`x`) with `op` up to `limit`.
     * @function module:listOps_.iterate
     * @param limit {Number}
     * @param op {Function} - Operation
     * @param x {*} - Starting point.
     * @returns {*}
     */
    iterate = (limit, op, x) => {
        let ind = 0,
            out = x;
        for (; ind < limit; ind += 1) {
            out = op(out, ind);
        }
        return out;
    },

    /**
     * Repeats `x` `limit` number of times
     * @function module:listOps_.repeat
     * @param limit {Number}
     * @param x {*}
     * @return {Array}
     */
    repeat = (limit, x) =>
        iterate(limit, agg => {
            agg.push(x);
            return agg;
        }, []),

    /**
     * Same as `repeat` due to the nature of javascript (see haskell version for usage).
     * @function module:listOps_.replicate
     * @param limit {Number}
     * @param x {*}
     * @return {Array}
     */
    replicate = repeat,

    /**
     * Replicates a list `limit` number of times and appends the results (concat)
     * @function module:listOps_.cycle
     * @param limit {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    cycle = (limit, xs) => concat(replicate(limit, xs)),

    /**
     * Unfolds a value into a list of somethings.
     * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
     * @function module:listOps_.unfoldr
     * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
     * @param x {*} - Starting parameter to unfold from.
     * @returns {Array} - An array of whatever you return from `op` yielded.
     */
    unfoldr = (op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    },

    /**
     * Finds index in string or list (alias for `findIndex`).
     * @function module:listOps_.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = findIndexWhere,

    /**
     * @function module:listOps_.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndices = findIndicesWhere,

    /**
     * @function module:listOps_.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndex = (x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    },

    /**
     * @function module:listOps_.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndices = (value, xs) => findIndices(x => x === value, xs),

    /**
     * Takes `n` items from start of list to `limit` (exclusive).
     * @function module:listOps_.take
     * @param list {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = (limit, list) => sliceTo(limit, list),

    /**
     * Drops `n` items from start of list to `count` (exclusive).
     * @function module:listOps_.take
     * @param list {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = (count, list) => sliceFrom(count, list),

    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:listOps_.splitAt
     * @param ind {Number} - Index to split at.
     * @param list {Array|String|*} - functor (list or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = (ind, list) => [
        sliceTo(ind, list),
        sliceFrom(ind, list)
    ],

    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:listOps_.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @returns {Array}
     */
    takeWhile = (pred, list) => {
        let zero = of(list);
        const operation = aggregatorByType(list);
        return reduceUntil(
            negateP(pred),  // predicate
            operation,      // operation
            zero,           // aggregator
            list
        );
    },

    /**
     * Returns an list without elements that match predicate.
     * @function module:listOps_.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhere((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            slice(splitPoint, limit, list);
    },

    /**
     * @function module:listOps_.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhereRight((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            sliceTo(splitPoint + 1, list);
    },

    /**
     * Gives a span such that the first list (in returned tuple) is the span of items matching upto `not predicate` and
     * the second list in the tuple is a list of the remaining elements in the given list.
     * **@Note: Not the same as `partition`.  Read descriptions closely!!!
     * @function module:listOps_.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array|String|*} - Predicate<item, index, originalArrayOrString>
     * @returns {Array|String|*} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    span = (pred, list) => {
        const splitPoint = findIndexWhere(negateP(pred), list);
        return splitPoint === -1 ?
            splitAt(0, list) : splitAt(splitPoint, list);
    },

    breakOnList = (pred, list) => {
        const splitPoint = findIndexWhere(pred, list);
        return splitPoint === -1 ?
            splitAt(0, list) : splitAt(splitPoint, list);
    },

    /**
     * @function module:listOps_.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    at = prop,

    /**
     * @function module:listOps_.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    find = findWhere,

    filter = (pred, xs) => {
        let ind = 0,
            limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = of(xs);
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out = aggregator(out, xs[ind]);
            }
        }
        return out;
    },

    /**
     * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
     * do not match the tuple are in second list in the returned tuple.
     *  Essentially `[filter(p, xs), filter(negateP(p), xs)]`.
     * @function module:listOps_.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array|String|*}
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    partition = (pred, list) => {
        if (!length(list)) {
            return [of(list), of(list)];
        }
        return [filter(pred, list), filter(negateP(pred), list)];
    },

    elem = includes,

    notElem = negateF(includes),

    lookup = at,

    isPrefixOf = (xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) {
                return false;
            }
        }
        return true;
    },

    isSuffixOf = (xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind1 = limit1 - 1,
            ind2 = limit2 - 1;
        for (; ind1 >= 0; ind1--) {
            if (xs1[ind1] !== xs2[ind2]) {
                return false;
            }
            ind2 -= 1;
        }
        return true;
    },

    isInfixOf = (xs1, xs2) => {
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
                if (xs2[ind1 + ind] === xs1[ind1]) {
                    foundLen += 1;
                }
                if (foundLen === limit1) {
                    return true;
                }
            }
        }
        return false;
    },

    isSubsequenceOf = (xs1, xs2) => {
        const len = Math.pow(2, length(xs2)),
            lenXs1 = length(xs1);
        let foundLen,
            i;
        for (i = 0; i < len; i += 1) {
            foundLen = 0;
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j) && indexOf(xs2[j], xs1) > -1) {
                    foundLen += 1;
                }
                if (foundLen === lenXs1) {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * The group function takes a list and returns a list of lists such that
     *  the concatenation of the result is equal to the argument. Moreover, each
     *  sublist in the result contains only equal elements. For example,
     * `group "Mississippi" = ["M","i","ss","i","ss","i","pp","i"]`
     * It is a special case of groupBy, which allows the programmer to supply
     *  their own equality test.
     * @haskellType `group :: Eq a => [a] -> [[a]]`
     * @function module:listOps_.group
     * @param xs {Array|String|*}
     * @returns {Array<Array|String|*>|*}
     */
    group = xs => groupBy((a, b) => a === b, xs),

    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:listOps_.groupBy
     * @param equalityOp {Function}
     * @param xs {Array|String|*}
     * @returns {*}
     */
    groupBy = (equalityOp, xs) => {
        const limit = length(xs);
        if (!limit) {
            return sliceFrom(0, xs);
        }
        let ind = 0,
            prevItem,
            item,
            predOp = x => {
                if (equalityOp(x, prevItem)) {
                    ind++;
                }
                if (equalityOp(x, item)) {
                    prevItem = x;
                    return true;
                }
                return false;
            },
            agg = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(takeWhile(predOp, slice(ind, limit, xs)));
        }
        return agg;
    },

    inits = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, sliceTo(ind, xs));
        }
        return agg;
    }, //map(list => init(list), xs),

    tails = xs => {
        let limit = length(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg = aggregateArr(agg, slice(ind, limit, xs));
        }
        return agg;
    }, //map(list => tail(list), xs),

    stripPrefix = (prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(length(prefix), list)[1] :
            sliceFrom(0, list),

    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:listOps_.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = (arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) {
            return of(arr1);
        }
        const [a1, a2] = lengthsToSmallest(arr1, arr2);
        return reduce((agg, item, ind) =>
                aggregateArr(agg, [item, a2[ind]]),
            [], a1);
    },

    /**
     * zipN takes one or more lists and returns a list containing lists of all indices
     * at a given index, index by index.
     * If one input list is short, excess elements of the longer list are discarded.
     * @function module:listOps_.zipN
     * @param lists {Array|String} - One ore more lists of the same type.
     * @returns {Array}
     */
    zipN = (...lists) => {
        const trimmedLists = apply(lengthsToSmallest, filter(length, lists)),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind) =>
                aggregateArr(agg, map(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    },

    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
     * @function module:listOps_.zip3
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip3 = zipN,

    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
     * @function module:listOps_.zip4
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip4 = zipN,

    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
     * @function module:listOps_.zip5
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip5 = zipN,

    /**
     * zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
     * zipWith generalises zip by zipping with the function given as the
     * first argument, instead of a function tupling function (function that returns a tuple). For example,
     * zipWith (+) is applied to two lists to produce the list of corresponding sums.
     * @note `_|_` means bottom or perpetual (@see
     *  - https://wiki.haskell.org/Bottom
     *  - https://stackoverflow.com/questions/19794681/what-does-this-syntax-mean-in-haskell-or
     *  )
     * @example
     * ```
     * zipWith f [] _|_ = []
     * ```
     * @haskellType `zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]`
     * @function module:listOps_.zipWith
     * @param op {Function} - Takes two parts of a tuple and returns a tuple.
     *  E.g., ` op :: a -> b -> (a, b)`
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWith = (op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) {
            return of(xs1);
        }
        const [a1, a2] = lengthsToSmallest(xs1, xs2);
        return reduce((agg, item, ind) =>
                aggregateArr(agg, op(item, a2[ind])),
            [], a1);
    },

    /**
     * Zips all given lists with tupling function. Note: Haskell types do not have
     *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
     *  is left there for general purpose not for exactness as is told by aforementioned.
     * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
     *  of lists to zip.
     * @function module:listOps_.zipWithN
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param lists ...{Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWithN = (op, ...lists) => {
        const trimmedLists = apply(lengthsToSmallest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind) =>
                aggregateArr(agg, apply(op, map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    },

    /**
     * Zips 3 lists with tupling function.
     * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
     * @function module:listOps_.zipWith3
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @param xs3 {Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWith3 = zipWithN,

    /**
     * Zips 4 lists with tupling function.
     * @haskellType `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c]  -> [d] -> [e]`
     * @function module:listOps_.zipWith4
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> d -> (a, b, c, d)`
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @param xs3 {Array|String|*}
     * @param xs4 {Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWith4 = zipWithN,

    /**
     * Zips 5 lists.
     * @haskellType `zipWith5 :: (a -> b -> c -> d -> e -> f) -> [a] -> [b] -> [c]  -> [d] -> [e] -> [f]`
     * @function module:listOps_.zipWith5
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> d -> e -> (a, b, c, d, e)`
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @param xs3 {Array|String|*}
     * @param xs4 {Array|String|*}
     * @param xs5 {Array|String|*}
     * @returns {Array<Array<*,*>>}
     */
    zipWith5 = zipWithN,

    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
     * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
     * @function module:listOps_.unzip
     * @param arr {Array|*}
     * @returns {Array|*}
     */
    unzip = arr =>
        foldl((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr),

    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @sudoHaskellType `unzipN :: [(a, b, ...x)] -> ([a], [b], ...[x])`
     * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
     * @function module:listOps_.unzip
     * @param list {Array|*} - List of tuples (lists).
     * @returns {Array|*}
     */
    unzipN = list => {
        if (!length(list)) {
            return [];
        }
        const lenItem0 = length(list[0]);
        let zero = lenItem0 ?
            unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) :
            [];
        return foldl((agg, item) => {
            agg.forEach((outList, ind) => outList.push(item[ind]));
            return agg;
        }, zero, list);
    },

    any = (p, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) {
            return false;
        }
        for (; ind < limit; ind += 1) {
            if (p(xs[ind])) {
                return true;
            }
        }
        return false;
    },

    all = (p, xs) => {
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
    },

    and = xs => all(isTruthy, xs),

    or = xs => any(isTruthy, xs),

    not = xs => all(isFalsy, xs),

    sum = list => foldl((agg, x) => agg + x, 0, list),

    product = arr => foldl((agg, x) => agg * x, 1, arr),

    maximum = list => maximumBy(genericAscOrdering, list),

    minimum = list => minimumBy(genericAscOrdering, list),

    maximumBy = (ordering, xs) => last(sortBy(ordering, xs)),

    minimumBy = (ordering, xs) => head(sortBy(ordering, xs)),

    scanl = () => null,

    scanl1 = () => null,

    scanr = () => null,

    scanr1 = () => null,

    nub = list => nubBy((a, b) => a === b, list),

    remove = (x, list) => removeBy((a, b) => a === b, x, list),

    sort = xs => sortBy(genericAscOrdering, xs),

    sortOn = (valueFn, xs) =>

        // Un-decorate
        map(decorated => decorated[1],

            // Decorate and sort
            sortBy(
                // Ordering
                (a1, b1) => {
                    let a = a1[0],
                        b = b1[0];
                    if (a > b) {
                        return 1;
                    }
                    else if (a < b) {
                        return -1;
                    }
                    return 0;
                },

                // Decorate
                map(item => [valueFn(item), item], xs)
            )
        ),

    sortBy = (orderingFn, xs) => copy(xs).sort(orderingFn),

    insert = (x, xs) => {
        if (isEmptyList(xs)) {
            return aggregatorByType(xs)(copy(xs), x, 0);
        }
        let out = of(xs),
            foundIndex = findIndex(item => x <= item, xs);
        return foundIndex === -1 ? append(sliceFrom(0, out), x) :
            concat(intersperse([x], splitAt(foundIndex, xs)));
    },

    /**
     * A version of `insert` that allows you to specify the ordering of the inserted
     * item;  Before/at, or after
     * @function module:listOps_.insertBy
     * @haskellType `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
     * @note `Ordering` === // something that is order-able
     * @todo Optimize and work the logic of this function;  Think about the types that will be
     *  operated on by this functions logic.
     * @param orderingFn {Function} - A function that returns `-1`, `0`, or 1`.
     * @param x {*} - Value to insert.
     * @param xs {Array|String|*} - List to insert into (note new list is returned)
     * @returns {Array|String|*} - New list.
     */
    insertBy = (orderingFn, x, xs) => {
        const limit = length(xs),
            aggregator = aggregatorByType(xs),
            out = of(xs);
        if (isEmptyList(xs)) {
            return aggregator(out, x, 0);
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            if (orderingFn(x, xs[ind]) <= 0) {
                const parts = splitAt(ind, xs);
                // Fold parts[0], [x], parts[1] into `out` and `concat`
                return concat(foldl(aggregator, out, [parts[0], [x], parts[1]]));
            }
        }
        return aggregator(copy(xs), x);
    },

    nubBy = (pred, list) => {
        if (isEmptyList(list)) {
            return of(list);
        }
        const limit = length(list);
        let ind = 0,
            currItem,
            out = of(list),
            anyOp = storedItem => pred(currItem, storedItem);
        for (; ind < limit; ind += 1) {
            currItem = list[ind];
            if (any(anyOp, out)) {
                continue;
            }
            out = append(out, currItem);
        }
        return out;
    },

    removeBy = (pred, x, list) => { // @todo optimize this implementation
        const foundIndex = findIndex(item => pred(x, item), list),
            parts = splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
        return append(parts[0], tail(parts[1]));
    },

    removeFirstsBy = (pred, xs1, xs2) =>
        foldl((agg, item) => removeBy(pred, item, agg), xs1, xs2),

    /**
     * Returns the union on elements matching boolean check passed in.
     * @function module:listOps_.unionBy
     * @param pred {Function} - `pred :: a -> a -> Bool`
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    unionBy = (pred, arr1, arr2) => {
        const aggregator = aggregatorByType(arr1);
        return foldl((agg, b) => {
            const alreadyAdded = any(a => pred(a, b), agg);
            return !alreadyAdded ? aggregator(agg, b) : agg;
        }, copy(arr1), arr2);
    },

    /**
     * Creates a union on matching elements from array1.
     * @function module:listOps_.union
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    union = (arr1, arr2) =>
        append(arr1,
            filter(elm => !includes(elm, arr1), arr2)),

    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:listOps_.intersect
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    intersect = (arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            filter(elm => includes(elm, arr2), arr1),

    /**
     * Returns an intersection by predicate.
     * @function module:listOps_.intersectBy
     * @param pred {Function} - `pred :: a -> b -> Bool`
     * @param list1 {Array|String|*}
     * @param list2 {Array|String|*}
     * @return {Array|String|*}
     */
    intersectBy = (pred, list1, list2) => {
        const aggregator = aggregatorByType(list1);
        return foldl((agg, a) =>
                any(b => pred(a, b), list2) ? aggregator(agg, a) : agg
            , [], list1);
    },

    /**
     * Returns the difference of list 1 from list 2.
     * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
     * @function module:listOps_.difference
     * @param array1 {Array|String|*}
     * @param array2 {Array|String|*}
     * @returns {Array|String|*}
     */
    difference = (array1, array2) => { // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return sliceFrom(0, array1);
        }
        else if (!array1 && array2 || (!array1 && !array2)) {
            return [];
        }
        const aggregator = aggregatorByType(array1);
        return reduce((agg, elm) =>
                !includes(elm, array2) ? aggregator(agg, elm) : agg
            , [], array1);
    },

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:listOps_.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    complement = (arr0, ...arrays) =>
        reduce((agg, arr) => append(agg, difference(arr, arr0)), [], arrays);