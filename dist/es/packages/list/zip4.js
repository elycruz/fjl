import { curry } from "../function/curry";
import { zipN } from "./zipN";
export const /**
 * @haskellType `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
 * @function module:list.zip4
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @param arr3 {Array}
 * @param arr4 {Array}
 * @returns {Array<Array<*,*>>}
 */ zip4 = curry((arr1, arr2, arr3, arr4) => zipN(arr1, arr2, arr3, arr4));
//# sourceMappingURL=zip4.js.map