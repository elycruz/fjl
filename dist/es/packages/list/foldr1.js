import { curry } from "../function/curry";
import { unconsr } from "./unconsr";
import { reduceRight } from "./utils/reduceRight";
export const $foldr1 = (op, xs) => {
    const parts = unconsr(xs);
    return !parts ? [] : reduceRight(op, parts[1], parts[0]);
}, 
/**
 * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting point/value will be pulled
 * out from a copy of the container.
 * @function module:list.foldr1
 * @param op {Function}
 * @param xs {Array}
 * @returns {*} - Whatever type is lastly returned from `op`.
 */
foldr1 = curry($foldr1);
//# sourceMappingURL=foldr1.js.map