/**
 * @memberOf object
 */
import { curry } from '../function/curry';
/**
 * Looks up property and returns it's value; Else `undefined`.
 * Method is null safe (will not throw on `null` or `undefined`).
 * @function module:object.lookup
 * @param key {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
export const lookup = curry((key, obj) => !obj ? undefined : obj[key]);
//# sourceMappingURL=lookup.js.map