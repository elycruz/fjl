define(['exports', './jsPlatform/list_', './jsPlatform/function_', './functionOps/negate_', '../booleanOps', './objectOps_', './listOps/map_', './listOps/utils_'], function (exports, _list_, _function_, _negate_, _booleanOps, _objectOps_, _map_, _utils_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.complement = exports.difference = exports.intersectBy = exports.intersect = exports.union = exports.unionBy = exports.removeFirstsBy = exports.removeBy = exports.nubBy = exports.insertBy = exports.insert = exports.sortBy = exports.sortOn = exports.sort = exports.remove = exports.nub = exports.scanr1 = exports.scanr = exports.scanl1 = exports.scanl = exports.minimumBy = exports.maximumBy = exports.minimum = exports.maximum = exports.product = exports.sum = exports.not = exports.or = exports.and = exports.all = exports.any = exports.unzipN = exports.unzip = exports.zipWith5 = exports.zipWith4 = exports.zipWith3 = exports.zipWithN = exports.zipWith = exports.zip5 = exports.zip4 = exports.zip3 = exports.zipN = exports.zip = exports.stripPrefix = exports.tails = exports.inits = exports.groupBy = exports.group = exports.isSubsequenceOf = exports.isInfixOf = exports.isSuffixOf = exports.isPrefixOf = exports.lookup = exports.notElem = exports.elem = exports.partition = exports.filter = exports.find = exports.at = exports.breakOnList = exports.span = exports.dropWhileEnd = exports.dropWhile = exports.takeWhile = exports.splitAt = exports.drop = exports.take = exports.elemIndices = exports.elemIndex = exports.findIndices = exports.findIndex = exports.unfoldr = exports.cycle = exports.replicate = exports.repeat = exports.iterate = exports.mapAccumR = exports.mapAccumL = exports.foldr1 = exports.foldl1 = exports.foldr = exports.foldl = exports.permutations = exports.subsequences = exports.transpose = exports.intercalate = exports.intersperse = exports.reverse = exports.concatMap = exports.concat = exports.unconsr = exports.uncons = exports.init = exports.tail = exports.last = exports.head = exports.appendMany = exports.append = exports.map = undefined;
    exports.map = _map_.map;


    // Exported internals
    const

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
    append = exports.append = _list_.concat,


    /**
     * Append two or more lists, i.e., same as `append` but for two ore more lists.
     * @haskellType `appendMany :: List a => a -> [a] -> a
     * @note In `@haskellType` we wrote `[a]` only to keep the haskell type valid though note in javascript
     *  this is actually different since the function converts the zero ore more parameters into an array containing such for us.
     * @function module:listOps_.appendMany
     * @param args ...{Array|String|*} - Lists or lists likes.
     * @returns {Array|String|*} - Same type as first list or list like passed in.
     */
    appendMany = exports.appendMany = (...args) => {
        if ((0, _objectOps_.length)(args)) {
            return (0, _function_.apply)(_list_.concat, args);
        }
        throw new Error('`appendMany` requires at least one arg.');
    },


    /**
     * Returns head of list (first item of list).
     * @haskellType `head :: [a] -> a`
     * @function module:listOps_.head
     * @param x {Array|String}
     * @returns {*} - First item from list
     */
    head = exports.head = x => x[0],


    /**
     * Returns last item of list.
     * @haskellType `last :: [a] -> a`
     * @function module:listOps_.last
     * @param xs {Array|String}
     * @returns {*}
     */
    last = exports.last = xs => xs[(0, _utils_.lastIndex)(xs)],


    /**
     * Returns tail part of list (everything after the first item as new list).
     * @haskelType `tail :: [a] -> [a]`
     * @function module:listOps_.tail
     * @param xs {Array}
     * @returns {Array}
     */
    tail = exports.tail = xs => (0, _utils_.sliceFrom)(1, xs),


    /**
     * Returns everything except last item of list as new list.
     * @haskellType `init :: [a] -> [a]`
     * @function module:listOps_.init
     * @param xs {Array|String}
     * @returns {Array|String}
     */
    init = exports.init = xs => (0, _utils_.sliceTo)((0, _utils_.lastIndex)(xs), xs),


    /**
     * Returns `head` and `tail` of passed in list/string in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @function module:listOps_.uncons
     * @param xs {Array|String}
     * @returns {Array|String|*|undefined}
     */
    uncons = exports.uncons = xs => {
        if (!xs) {
            return;
        }
        if ((0, _objectOps_.length)(xs) === 0) {
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
    unconsr = exports.unconsr = xs => {
        if (!xs) {
            return;
        }
        if ((0, _objectOps_.length)(xs) === 0) {
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
    concat = exports.concat = xs => {
        if (!(0, _objectOps_.length)(xs)) {
            return (0, _utils_.copy)(xs);
        }
        return (0, _objectOps_.isString)(xs) ? xs : (0, _function_.apply)(appendMany, xs);
    },


    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:listOps_.concatMap
     * @param fn {Function}
     * @param foldableOfA {Array|String|*}
     * @returns {Array|String|*}
     */
    concatMap = exports.concatMap = (fn, foldableOfA) => concat((0, _map_.map)(fn, foldableOfA)),


    /**
     * Returns a copy of the passed in list reverses.
     * @haskellType `reverse :: [a] -> [a]`
     * @function module:listOps_.reverse
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    reverse = exports.reverse = x => {
        const aggregator = (0, _utils_.aggregatorByType)(x);
        return foldr((agg, item, ind) => aggregator(agg, item, ind), (0, _objectOps_.of)(x), x);
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
    intersperse = exports.intersperse = (between, arr) => {
        const limit = (0, _objectOps_.length)(arr),
              lastInd = limit - 1,
              aggregator = (0, _objectOps_.of)(arr),
              aggregatorOp = (0, _utils_.aggregatorByType)(arr);
        if (!limit) {
            return aggregator;
        }
        return foldl((agg, item, ind) => {
            return ind === lastInd ? aggregatorOp(agg, item) : aggregatorOp(aggregatorOp(agg, item), between);
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
    intercalate = exports.intercalate = (xs, xss) => concat(intersperse(xs, xss)),


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
    transpose = exports.transpose = xss => {
        let numLists = (0, _objectOps_.length)(xss),
            ind = 0,
            ind2;
        if (!numLists) {
            return (0, _objectOps_.of)(xss);
        }
        const listLengths = (0, _function_.apply)(_utils_.lengths, xss),
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
        return filter(x => (0, _objectOps_.length)(x), outLists);
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
    subsequences = exports.subsequences = xs => {
        const len = Math.pow(2, (0, _objectOps_.length)(xs)),
              out = [];
        for (let i = 0; i < len; i += 1) {
            const entry = [];
            for (let j = 0; j < len; j += 1) {
                if (i & 1 << j) {
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
    permutations = exports.permutations = xs => {
        const limit = (0, _objectOps_.length)(xs);
        return !limit ? [xs] : (0, _utils_._permutationsAlgo)(xs, limit, limit);
    },


    /**
     * Reduces a foldable (list etc.) with passed in function.
     * @function module:listOps_.foldl
     * @param fn {Function}
     * @param zero {*} - Aggregator.
     * @param functor {Array|String|*}
     * @returns {*} - Usually same type as aggregate (`zero`) (depends on `fn`).
     */
    foldl = exports.foldl = _utils_.reduce,
          foldr = exports.foldr = _utils_.reduceRight,
          foldl1 = exports.foldl1 = (op, xs) => {
        const parts = uncons(xs);
        if (!parts) {
            return (0, _objectOps_.of)(xs);
        }
        return (0, _utils_.reduce)(op, parts[0], parts[1]);
    },
          foldr1 = exports.foldr1 = (op, xs) => {
        const parts = unconsr(xs);
        if (!parts) {
            return (0, _objectOps_.of)(xs);
        }
        return (0, _utils_.reduceRight)(op, parts[1], parts[0]);
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
    mapAccumL = exports.mapAccumL = (op, zero, xs) => {
        const list = (0, _utils_.sliceFrom)(0, xs),
              limit = (0, _objectOps_.length)(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = 0,
            agg = zero,
            mapped = (0, _objectOps_.of)(xs),
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
    mapAccumR = exports.mapAccumR = (op, zero, xs) => {
        const list = (0, _utils_.sliceFrom)(0, xs),
              limit = (0, _objectOps_.length)(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = limit - 1,
            agg = zero,
            mapped = (0, _objectOps_.of)(xs),
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
    iterate = exports.iterate = (limit, op, x) => {
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
    repeat = exports.repeat = (limit, x) => iterate(limit, agg => {
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
    replicate = exports.replicate = repeat,


    /**
     * Replicates a list `limit` number of times and appends the results (concat)
     * @function module:listOps_.cycle
     * @param limit {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    cycle = exports.cycle = (limit, xs) => concat(replicate(limit, xs)),


    /**
     * Unfolds a value into a list of somethings.
     * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
     * @function module:listOps_.unfoldr
     * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
     * @param x {*} - Starting parameter to unfold from.
     * @returns {Array} - An array of whatever you return from `op` yielded.
     */
    unfoldr = exports.unfoldr = (op, x) => {
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
    findIndex = exports.findIndex = _utils_.findIndexWhere,


    /**
     * @function module:listOps_.findIndices
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndices = exports.findIndices = _utils_.findIndicesWhere,


    /**
     * @function module:listOps_.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndex = exports.elemIndex = (x, xs) => {
        const foundInd = (0, _list_.indexOf)(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    },


    /**
     * @function module:listOps_.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    elemIndices = exports.elemIndices = (value, xs) => findIndices(x => x === value, xs),


    /**
     * Takes `n` items from start of list to `limit` (exclusive).
     * @function module:listOps_.take
     * @param list {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = exports.take = (limit, list) => (0, _utils_.sliceTo)(limit, list),


    /**
     * Drops `n` items from start of list to `count` (exclusive).
     * @function module:listOps_.take
     * @param list {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = exports.drop = (count, list) => (0, _utils_.sliceFrom)(count, list),


    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:listOps_.splitAt
     * @param ind {Number} - Index to split at.
     * @param list {Array|String|*} - functor (list or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = exports.splitAt = (ind, list) => [(0, _utils_.sliceTo)(ind, list), (0, _utils_.sliceFrom)(ind, list)],


    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:listOps_.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @returns {Array}
     */
    takeWhile = exports.takeWhile = (pred, list) => {
        let zero = (0, _objectOps_.of)(list);
        const operation = (0, _utils_.aggregatorByType)(list);
        return (0, _utils_.reduceUntil)((0, _negate_.negateP)(pred), // predicate
        operation, // operation
        zero, // aggregator
        list);
    },


    /**
     * Returns an list without elements that match predicate.
     * @function module:listOps_.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = exports.dropWhile = (pred, list) => {
        const limit = (0, _objectOps_.length)(list),
              splitPoint = (0, _utils_.findIndexWhere)((item, ind, list2) => !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ? (0, _utils_.sliceTo)(limit, list) : (0, _list_.slice)(splitPoint, limit, list);
    },


    /**
     * @function module:listOps_.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = exports.dropWhileEnd = (pred, list) => {
        const limit = (0, _objectOps_.length)(list),
              splitPoint = (0, _utils_.findIndexWhereRight)((item, ind, list2) => !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ? (0, _utils_.sliceTo)(limit, list) : (0, _utils_.sliceTo)(splitPoint + 1, list);
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
    span = exports.span = (pred, list) => {
        const splitPoint = (0, _utils_.findIndexWhere)((0, _negate_.negateP)(pred), list);
        return splitPoint === -1 ? splitAt(0, list) : splitAt(splitPoint, list);
    },
          breakOnList = exports.breakOnList = (pred, list) => {
        const splitPoint = (0, _utils_.findIndexWhere)(pred, list);
        return splitPoint === -1 ? splitAt(0, list) : splitAt(splitPoint, list);
    },


    /**
     * @function module:listOps_.at
     * @param ind {Number} - Index.
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    at = exports.at = _objectOps_.prop,


    /**
     * @function module:listOps_.find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    find = exports.find = _utils_.findWhere,
          filter = exports.filter = (pred, xs) => {
        let ind = 0,
            limit = (0, _objectOps_.length)(xs),
            aggregator = (0, _utils_.aggregatorByType)(xs),
            out = (0, _objectOps_.of)(xs);
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
    partition = exports.partition = (pred, list) => {
        if (!(0, _objectOps_.length)(list)) {
            return [(0, _objectOps_.of)(list), (0, _objectOps_.of)(list)];
        }
        return [filter(pred, list), filter((0, _negate_.negateP)(pred), list)];
    },
          elem = exports.elem = _list_.includes,
          notElem = exports.notElem = (0, _negate_.negateF)(_list_.includes),
          lookup = exports.lookup = at,
          isPrefixOf = exports.isPrefixOf = (xs1, xs2) => {
        const limit1 = (0, _objectOps_.length)(xs1),
              limit2 = (0, _objectOps_.length)(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || (0, _list_.indexOf)(xs1[0], xs2) === -1) {
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
          isSuffixOf = exports.isSuffixOf = (xs1, xs2) => {
        const limit1 = (0, _objectOps_.length)(xs1),
              limit2 = (0, _objectOps_.length)(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || (0, _list_.indexOf)(xs1[0], xs2) === -1) {
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
          isInfixOf = exports.isInfixOf = (xs1, xs2) => {
        const limit1 = (0, _objectOps_.length)(xs1),
              limit2 = (0, _objectOps_.length)(xs2);
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
          isSubsequenceOf = exports.isSubsequenceOf = (xs1, xs2) => {
        const len = Math.pow(2, (0, _objectOps_.length)(xs2)),
              lenXs1 = (0, _objectOps_.length)(xs1);
        let foundLen, i;
        for (i = 0; i < len; i += 1) {
            foundLen = 0;
            for (let j = 0; j < len; j += 1) {
                if (i & 1 << j && (0, _list_.indexOf)(xs2[j], xs1) > -1) {
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
    group = exports.group = xs => groupBy((a, b) => a === b, xs),


    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:listOps_.groupBy
     * @param equalityOp {Function}
     * @param xs {Array|String|*}
     * @returns {*}
     */
    groupBy = exports.groupBy = (equalityOp, xs) => {
        const limit = (0, _objectOps_.length)(xs);
        if (!limit) {
            return (0, _utils_.sliceFrom)(0, xs);
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
            agg.push(takeWhile(predOp, (0, _list_.slice)(ind, limit, xs)));
        }
        return agg;
    },
          inits = exports.inits = xs => {
        let limit = (0, _objectOps_.length)(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg = (0, _utils_.aggregateArr)(agg, (0, _utils_.sliceTo)(ind, xs));
        }
        return agg;
    },
          //map(list => init(list), xs),

    tails = exports.tails = xs => {
        let limit = (0, _objectOps_.length)(xs),
            ind = 0,
            agg = [];
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg = (0, _utils_.aggregateArr)(agg, (0, _list_.slice)(ind, limit, xs));
        }
        return agg;
    },
          //map(list => tail(list), xs),

    stripPrefix = exports.stripPrefix = (prefix, list) => isPrefixOf(prefix, list) ? splitAt((0, _objectOps_.length)(prefix), list)[1] : (0, _utils_.sliceFrom)(0, list),


    /**
     * zip takes two lists and returns a list of corresponding pairs.
     * If one input list is short, excess elements of the longer list are discarded.
     * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
     * @function module:listOps_.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = exports.zip = (arr1, arr2) => {
        if (!(0, _objectOps_.length)(arr1) || !(0, _objectOps_.length)(arr2)) {
            return (0, _objectOps_.of)(arr1);
        }
        const [a1, a2] = (0, _utils_.lengthsToSmallest)(arr1, arr2);
        return (0, _utils_.reduce)((agg, item, ind) => (0, _utils_.aggregateArr)(agg, [item, a2[ind]]), [], a1);
    },


    /**
     * zipN takes one or more lists and returns a list containing lists of all indices
     * at a given index, index by index.
     * If one input list is short, excess elements of the longer list are discarded.
     * @function module:listOps_.zipN
     * @param lists {Array|String} - One ore more lists of the same type.
     * @returns {Array}
     */
    zipN = exports.zipN = (...lists) => {
        const trimmedLists = (0, _function_.apply)(_utils_.lengthsToSmallest, filter(_objectOps_.length, lists)),
              lenOfTrimmed = (0, _objectOps_.length)(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        } else if (lenOfTrimmed === 1) {
            return (0, _utils_.sliceTo)((0, _objectOps_.length)(trimmedLists[0]), trimmedLists[0]);
        }
        return (0, _utils_.reduce)((agg, item, ind) => (0, _utils_.aggregateArr)(agg, (0, _map_.map)(xs => xs[ind], trimmedLists)), [], trimmedLists[0]);
    },


    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
     * @function module:listOps_.zip3
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip3 = exports.zip3 = zipN,


    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
     * @function module:listOps_.zip4
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip4 = exports.zip4 = zipN,


    /**
     * @haskellType `zip3 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
     * @function module:listOps_.zip5
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @param arr3 {Array}
     * @param arr4 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip5 = exports.zip5 = zipN,


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
    zipWith = exports.zipWith = (op, xs1, xs2) => {
        if (!(0, _objectOps_.length)(xs1) || !(0, _objectOps_.length)(xs2)) {
            return (0, _objectOps_.of)(xs1);
        }
        const [a1, a2] = (0, _utils_.lengthsToSmallest)(xs1, xs2);
        return (0, _utils_.reduce)((agg, item, ind) => (0, _utils_.aggregateArr)(agg, op(item, a2[ind])), [], a1);
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
    zipWithN = exports.zipWithN = (op, ...lists) => {
        const trimmedLists = (0, _function_.apply)(_utils_.lengthsToSmallest, lists),
              lenOfTrimmed = (0, _objectOps_.length)(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        } else if (lenOfTrimmed === 1) {
            return (0, _utils_.sliceTo)((0, _objectOps_.length)(trimmedLists[0]), trimmedLists[0]);
        }
        return (0, _utils_.reduce)((agg, item, ind) => (0, _utils_.aggregateArr)(agg, (0, _function_.apply)(op, (0, _map_.map)(xs => xs[ind], trimmedLists))), [], trimmedLists[0]);
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
    zipWith3 = exports.zipWith3 = zipWithN,


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
    zipWith4 = exports.zipWith4 = zipWithN,


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
    zipWith5 = exports.zipWith5 = zipWithN,


    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
     * @todo Should support other list types (should not have `push` hard coded instead should use `mappend` (if available)).
     * @function module:listOps_.unzip
     * @param arr {Array|*}
     * @returns {Array|*}
     */
    unzip = exports.unzip = arr => foldl((agg, item) => {
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
    unzipN = exports.unzipN = list => {
        if (!(0, _objectOps_.length)(list)) {
            return [];
        }
        const lenItem0 = (0, _objectOps_.length)(list[0]);
        let zero = lenItem0 ? unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) : [];
        return foldl((agg, item) => {
            agg.forEach((outList, ind) => outList.push(item[ind]));
            return agg;
        }, zero, list);
    },
          any = exports.any = (p, xs) => {
        let ind = 0,
            limit = (0, _objectOps_.length)(xs);
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
          all = exports.all = (p, xs) => {
        const limit = (0, _objectOps_.length)(xs);
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
          and = exports.and = xs => all(_booleanOps.isTruthy, xs),
          or = exports.or = xs => any(_booleanOps.isTruthy, xs),
          not = exports.not = xs => all(_booleanOps.isFalsy, xs),
          sum = exports.sum = list => foldl((agg, x) => agg + x, 0, list),
          product = exports.product = arr => foldl((agg, x) => agg * x, 1, arr),
          maximum = exports.maximum = list => maximumBy(_utils_.genericAscOrdering, list),
          minimum = exports.minimum = list => minimumBy(_utils_.genericAscOrdering, list),
          maximumBy = exports.maximumBy = (ordering, xs) => last(sortBy(ordering, xs)),
          minimumBy = exports.minimumBy = (ordering, xs) => head(sortBy(ordering, xs)),
          scanl = exports.scanl = () => null,
          scanl1 = exports.scanl1 = () => null,
          scanr = exports.scanr = () => null,
          scanr1 = exports.scanr1 = () => null,
          nub = exports.nub = list => nubBy((a, b) => a === b, list),
          remove = exports.remove = (x, list) => removeBy((a, b) => a === b, x, list),
          sort = exports.sort = xs => sortBy(_utils_.genericAscOrdering, xs),
          sortOn = exports.sortOn = (valueFn, xs) =>

    // Un-decorate
    (0, _map_.map)(decorated => decorated[1],

    // Decorate and sort
    sortBy(
    // Ordering
    (a1, b1) => {
        let a = a1[0],
            b = b1[0];
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    },

    // Decorate
    (0, _map_.map)(item => [valueFn(item), item], xs))),
          sortBy = exports.sortBy = (orderingFn, xs) => (0, _utils_.copy)(xs).sort(orderingFn),
          insert = exports.insert = (x, xs) => {
        if ((0, _objectOps_.isEmptyList)(xs)) {
            return (0, _utils_.aggregatorByType)(xs)((0, _utils_.copy)(xs), x, 0);
        }
        let out = (0, _objectOps_.of)(xs),
            foundIndex = findIndex(item => x <= item, xs);
        return foundIndex === -1 ? append((0, _utils_.sliceFrom)(0, out), x) : concat(intersperse([x], splitAt(foundIndex, xs)));
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
    insertBy = exports.insertBy = (orderingFn, x, xs) => {
        const limit = (0, _objectOps_.length)(xs),
              aggregator = (0, _utils_.aggregatorByType)(xs),
              out = (0, _objectOps_.of)(xs);
        if ((0, _objectOps_.isEmptyList)(xs)) {
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
        return aggregator((0, _utils_.copy)(xs), x);
    },
          nubBy = exports.nubBy = (pred, list) => {
        if ((0, _objectOps_.isEmptyList)(list)) {
            return (0, _objectOps_.of)(list);
        }
        const limit = (0, _objectOps_.length)(list);
        let ind = 0,
            currItem,
            out = (0, _objectOps_.of)(list),
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
          removeBy = exports.removeBy = (pred, x, list) => {
        // @todo optimize this implementation
        const foundIndex = findIndex(item => pred(x, item), list),
              parts = splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
        return append(parts[0], tail(parts[1]));
    },
          removeFirstsBy = exports.removeFirstsBy = (pred, xs1, xs2) => foldl((agg, item) => removeBy(pred, item, agg), xs1, xs2),


    /**
     * Returns the union on elements matching boolean check passed in.
     * @function module:listOps_.unionBy
     * @param pred {Function} - `pred :: a -> a -> Bool`
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    unionBy = exports.unionBy = (pred, arr1, arr2) => {
        const aggregator = (0, _utils_.aggregatorByType)(arr1);
        return foldl((agg, b) => {
            const alreadyAdded = any(a => pred(a, b), agg);
            return !alreadyAdded ? aggregator(agg, b) : agg;
        }, (0, _utils_.copy)(arr1), arr2);
    },


    /**
     * Creates a union on matching elements from array1.
     * @function module:listOps_.union
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    union = exports.union = (arr1, arr2) => append(arr1, filter(elm => !(0, _list_.includes)(elm, arr1), arr2)),


    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:listOps_.intersect
     * @param arr1 {Array|String|*}
     * @param arr2 {Array|String|*}
     * @returns {Array|String|*}
     */
    intersect = exports.intersect = (arr1, arr2) => !arr1 || !arr2 || !arr1 && !arr2 ? [] : filter(elm => (0, _list_.includes)(elm, arr2), arr1),


    /**
     * Returns an intersection by predicate.
     * @function module:listOps_.intersectBy
     * @param pred {Function} - `pred :: a -> b -> Bool`
     * @param list1 {Array|String|*}
     * @param list2 {Array|String|*}
     * @return {Array|String|*}
     */
    intersectBy = exports.intersectBy = (pred, list1, list2) => {
        const aggregator = (0, _utils_.aggregatorByType)(list1);
        return foldl((agg, a) => any(b => pred(a, b), list2) ? aggregator(agg, a) : agg, [], list1);
    },


    /**
     * Returns the difference of list 1 from list 2.
     * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
     * @function module:listOps_.difference
     * @param array1 {Array|String|*}
     * @param array2 {Array|String|*}
     * @returns {Array|String|*}
     */
    difference = exports.difference = (array1, array2) => {
        // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return (0, _utils_.sliceFrom)(0, array1);
        } else if (!array1 && array2 || !array1 && !array2) {
            return [];
        }
        const aggregator = (0, _utils_.aggregatorByType)(array1);
        return (0, _utils_.reduce)((agg, elm) => !(0, _list_.includes)(elm, array2) ? aggregator(agg, elm) : agg, [], array1);
    },


    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:listOps_.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    complement = exports.complement = (arr0, ...arrays) => (0, _utils_.reduce)((agg, arr) => append(agg, difference(arr, arr0)), [], arrays);
});