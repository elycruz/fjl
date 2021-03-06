import { init } from './init';
import { last } from "./last";
import { length } from '../platform/object';
import { of } from '../object/of';
export const 
/**
 * Returns `tail` and `head` of passed in list/string in a tuple.
 * @haskellType `unconsr :: [a] -> Maybe ([a], a)`
 * @function module:list.unconsr
 * @param xs {Array|String}
 * @returns {Array|String|*|undefined}
 */
unconsr = xs => {
    const len = length(xs), out = of(xs);
    if (!xs || !len) {
        return undefined;
    }
    else if (len === 1) {
        return [out.concat([xs[0]]), of(out)];
    }
    return [init(xs), last(xs)];
};
//# sourceMappingURL=unconsr.js.map