/**
 * @module string
 * @description Contains functions for strings.
 */
import { intercalate, map, filter } from '../list';
import { split } from '../platform/string';
import { compose } from '../function/compose';
import { join } from '../platform/array';
import { _errorIfNotType } from '../errorThrowing';
export { split };
export const 
/**
 * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
 * @function module:string.lines
 * @param str {String}
 * @returns {Array}
 */
lines = split(/[\n\r]/gm), 
/**
 * Splits a string on all '\s' and/or all '\t' characters.
 * @function module:string.words
 * @param str{String}
 * @returns {Array}
 */
words = split(/[\s\t]/gm), 
/**
 * Intersperse an array of strings with '\s' and then concats them.
 * @function module:string.unwords
 * @param arr {String}
 * @returns {Array}
 */
unwords = intercalate(' '), 
/**
 * Intersperses a '\n' character into a list of strings and then concats it.
 * @function module:string.unlines
 * @param list {Array|String|*}
 * @returns {Array}
 */
unlines = intercalate('\n'), 
/**
 * Lower cases first character of a non-empty string.
 * @function module:string.lcaseFirst
 * @param xs {String}
 * @returns {index.ts}
 * @throws {Error} - Throws error if receiving anything that is not a string.
 */
lcaseFirst = xs => {
    _errorIfNotType(String, 'lcaseFirst', 'xs', xs);
    return xs[0].toLowerCase() + xs.substring(1);
}, 
/**
 * Upper cases first character of a non-empty string.
 * @function module:string.ucaseFirst
 * @param xs {String}
 * @returns {index.ts}
 * @throws {Error} - Throws error if receiving anything that is not a string.
 */
ucaseFirst = xs => {
    _errorIfNotType(String, 'ucaseFirst', 'xs', xs);
    return xs[0].toUpperCase() + xs.substring(1);
}, 
/**
 * Camel cases (class case) a string.
 * @function module:string.camelCase
 * @param xs {String}
 * @param [pattern=/[^a-z\d/i]/] {RegExp} - Pattern to split on.  Optional.
 * @throws {Error} - Throws error if param `xs` is not a string.
 * @returns {index.ts}
 * @curried
 */
camelCase = (xs, pattern = /[^a-z\d]/i) => compose(join(''), map(str => ucaseFirst(str.toLowerCase())), filter(x => !!x), split(pattern))(_errorIfNotType(String, 'camelCase', 'xs', xs)), 
/**
 * Class cases a string.  Uses pattern /[^a-z\d/i]/ to split on.
 * If you require a different pattern use `string.camelCase(str, pattern)`
 * and then upper case first character (`ucaseFirst`).
 * @function module:string.classCase
 * @param xs {String}
 * @returns {index.ts}
 * @throws {Error} - Throws error if `xs` is not a string (via `camelCase` call).
 */
classCase = compose(ucaseFirst, camelCase);
/**
 * Functional version of `String.prototype.split`.
 * @function module:string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
//# sourceMappingURL=index.js.map