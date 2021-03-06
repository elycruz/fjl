import { toCurried2Method } from "../../utils";
/**
 * Gets the last index of a given item in list-like.
 * @function module:list.lastIndexOf
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - list or list like to look in.
 * @param [fromIndex=0]{number} - Number to search from.  Default `0`.
 * @returns {number} - `-1` if element not found else index at which it is found.
 */
const lastIndexOf = toCurried2Method('lastIndexOf');
export default lastIndexOf;
//# sourceMappingURL=lastIndexOf.js.map