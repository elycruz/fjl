import { all } from "./all";
import { isFalsy } from "../boolean";
export const 
/**
 * Returns a boolean indicating whether all items in container are 'falsy' or not.
 * **Note** The haskell type for this function only takes two items, but here
 * we allow the passing of more than one item (may change later to adhere to the haskell type).
 * @function module:list.not
 * @haskellType `not :: Bool -> Bool`
 * @param xs {Array|String}
 * @returns {Boolean}
 */
not = xs => all(isFalsy, xs);
//# sourceMappingURL=not.js.map