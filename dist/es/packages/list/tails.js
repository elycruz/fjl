import { length } from "../platform/object";
import { slice } from "../platform/slice";
/**
 * The inits function returns all initial segments of the argument, shortest first. For example,
 * ```
 * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
 * ```
 * @function module:list.tails
 * @haskellType `tails :: [a] -> [[a]]`
 * @param xs {Array}
 * @returns {Array}
 */
export const tails = xs => {
    let limit = length(xs), ind = 0, agg = [];
    if (!limit) {
        return [];
    }
    for (; ind <= limit; ind += 1) {
        agg.push(slice(ind, limit, xs));
    }
    return agg;
};
//# sourceMappingURL=tails.js.map