/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @file fjl-curry/src/curry.js
 * @description Different curry implementations for modern javascript currying.
 */

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
const PlaceHolder = function PlaceHolder() {},

    /**
     * Placeholder instance.
     * @type {PlaceHolder}
     */
    placeHolderInstance = new PlaceHolder();

/**
 * Curries a function based on it's defined arity (argument's list expected length).
 * @function curry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {function(...[*]=)}
 */
export function curry (fn, ...argsToCurry) {
    return (...args) => {
        const concatedArgs = argsToCurry.concat(args);
        return concatedArgs.length < fn.length ?
            curry.apply(null, [fn].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Checks to see if value is a `PlaceHolder`.
 * @function isPlaceHolder
 * @param instance {*}
 * @returns {boolean}
 */
function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `array`.
 * @function replacePlaceHolder
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `array` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders (array, args) {
    let out = array.map(element => {
        if (!isPlaceHolder(element)) {
            return element;
        }
        else if (args.length > 0) {
            return args.shift();
        }
        return element;
    });
    return args.length > 0 ? out.concat(args) : out;
}

/**
 * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function pCurry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {function(...[*]=)}
 */
export function pCurry (fn, ...argsToCurry) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(argsToCurry, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = placeHolders.length === 0;
        return canBeCalled ? fn.apply(null, concatedArgs) :
            pCurry.apply(null, [fn].concat(concatedArgs));
    };
}

/**
 * Curries a function up to given arity also enforces arity via placeholder values (`__`).
 * @function pCurryN
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {function(...[*]=)} - Passed in function wrapped in a function for currying.
 */
export function pCurryN (fn, executeArity, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = (concatedArgs.length - placeHolders.length >= executeArity) || !executeArity;
        return !canBeCalled ? pCurryN.apply(null, [fn, executeArity].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Curries a function once with any given args (despite passed in function's actual arity).
 * @function curryOnce
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {function(...[*]=): *}
 */
export function curryOnce (fn, ...argsToCurry) {
    return (...args) => fn.apply(null, argsToCurry.concat(args));
}

/**
 * Curries a function up to a given arity.
 * @function curryN
 * @param fn {Function}
 * @param executeArity {Number}
 * @param curriedArgs {...*}
 * @returns {function(...[*]=)}
 */
export function curryN (fn, executeArity, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = curriedArgs.concat(args),
            canBeCalled = (concatedArgs.length >= executeArity) || !executeArity;
        return !canBeCalled ? curryN.apply(null, [fn, executeArity].concat(concatedArgs)) :
            fn.apply(null, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @type {PlaceHolder}
 */
export let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,

    /**
     * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call function until 2 or more args).
     * @function pCurry2
     * @param fn {Function}
     * @returns {Function}
     */
    pCurry2 = fn => pCurryN(fn, 2),

    /**
     * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call function until 3 or more args).
     * @function pCurry3
     * @param fn {Function}
     * @returns {Function}
     */
    pCurry3 = fn => pCurryN(fn, 3),

    /**
     * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call function until 4 or more args).
     * @function pCurry4
     * @param fn {Function}
     * @returns {Function}
     */
    pCurry4 = fn => pCurryN(fn, 4),

    /**
     * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call function until 5 or more args).
     * @function pCurry5
     * @param fn {Function}
     * @returns {Function}
     */
    pCurry5 = fn => pCurryN(fn, 5),

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = fn => curryN(fn, 2),

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = fn => curryN(fn, 3),

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = fn => curryN(fn, 4),

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = fn => curryN(fn, 5);

export default {
    __,
    curry,
    curryN,
    curry2,
    curry3,
    curry4,
    curry5,
    curryOnce,
    pCurryN,
    pCurry2,
    pCurry3,
    pCurry4,
    pCurry5
};
