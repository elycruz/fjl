import {curry, CurryOf2} from "../../function/curry";
import {length} from "../../platform/object";
import {SliceOf, SlicePred} from "../../platform/slice/types";

export const

    /**
     * Finds an item by predicate or returns `undefined`.
     * @function module:listUtils.$findWhere
     * @param pred {SlicePred<any>>}
     * @param xs {SliceOf<any>} - list or list like.
     * @returns {any}
     */
    $findWhere = <T>(pred: SlicePred<T>, xs: T[]): T | undefined => {
        let ind = 0;
        const limit = length(xs);
        if (!limit) {
            return;
        }
        for (; ind < limit; ind++) {
            const elm = xs[ind];
            if (pred(elm, ind, xs)) {
                return elm;
            }
        }
        return undefined;
    },

    /**
     * @function module:listUtils.findWhere
     * @param pred {SlicePred<any>>}
     * @param xs {SliceOf<any>} - list or list like.
     * @returns {any}
     * @curried At upto 2 params.
     */
    findWhere = curry($findWhere) as CurryOf2<SlicePred<any>, SliceOf<any>, any | undefined>

;