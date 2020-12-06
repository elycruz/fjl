import {curry, CurryOf2} from "../function/curry";
import {length} from "../platform/object";
import {sliceCopy} from "./utils/sliceCopy";
import {SliceOf} from "../platform/slice";
import {BinaryPred} from "../types";

export const

  /**
   * Groups given items by given predicate.
   */
  $groupBy = <T>(equalityOp: BinaryPred<T>, xs: SliceOf<T>): SliceOf<T>[] => {
    // Bail if empty list
    if (!xs) {
      return [];
    }

    const limit = length(xs);

    // Bail if empty list
    if (!limit) {
      return [sliceCopy(xs)];
    }

    // Groupings
    const groups: SliceOf<T>[] = [];

    // Initialize variables for tracking
    let ind = 1,
      prevItem = xs[0] as T,
      group: T[] = [prevItem];

    for (; ind < limit; ind += 1) {
      const x = xs[ind] as T;
      if (equalityOp(x, prevItem)) {
        group.push(x);
        prevItem = x;
        continue;
      }
      groups.push(group);
      prevItem = x;
      group = [x];
    }

    // Push last group
    groups.push(group);

    // If original incoming slice is a string, return a slice of strings.
    if(xs.constructor === String) {
      return groups.map(_xs => (_xs as T[]).join(''));
    }

    return groups;
  },

  /**
   * Curried version of `$groupBy`.
   */
  groupBy = curry($groupBy) as CurryOf2<BinaryPred<any>, SliceOf<any>, SliceOf<any>[]>

;
