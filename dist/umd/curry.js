(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.curry = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.curry = curry;
    exports.curry__ = curry__;
    exports.curryN__ = curryN__;
    exports.curryOnce = curryOnce;
    exports.curryN = curryN;
    /**
     * @author elydelacruz
     * @created 12/6/2016.
     * @file fjl-curry/src/curry.js
     * @description Different curry implementations for modern javascript currying.
     * @todo Make code here more minimal (reuse small parts here).
     */

    /**
     * PlaceHolder (__) constructor.
     * @constructor PlaceHolder
     * @private
     */
    var PlaceHolder = function PlaceHolder() {},


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
    function curry(fn) {
        for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            argsToCurry[_key - 1] = arguments[_key];
        }

        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var concatedArgs = argsToCurry.concat(args);
            return concatedArgs.length < fn.length ? curry.apply(null, [fn].concat(concatedArgs)) : fn.apply(null, concatedArgs);
        };
    }

    /**
     * Checks to see if value is a `PlaceHolder`.
     * @function isPlaceHolder
     * @param instance {*}
     * @returns {boolean}
     */
    function isPlaceHolder(instance) {
        return instance instanceof PlaceHolder;
    }

    /**
     * Replaces `placeholder` values in `array`.
     * @function replacePlaceHolder
     * @param array {Array} - Array to replace placeholders in.
     * @param args {Array} - Args from to choose from to replace placeholders.
     * @returns {Array|*} - Returns passed in `array` with placeholders replaced by values in `args`.
     */
    function replacePlaceHolders(array, args) {
        var out = array.map(function (element) {
            if (!isPlaceHolder(element)) {
                return element;
            } else if (args.length > 0) {
                return args.shift();
            }
            return element;
        });
        return args.length > 0 ? out.concat(args) : out;
    }

    /**
     * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
     * @function curry__
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {function(...[*]=)}
     */
    function curry__(fn) {
        for (var _len3 = arguments.length, argsToCurry = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            argsToCurry[_key3 - 1] = arguments[_key3];
        }

        return function () {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            var concatedArgs = replacePlaceHolders(argsToCurry, args),
                placeHolders = concatedArgs.filter(isPlaceHolder),
                canBeCalled = placeHolders.length === 0 && concatedArgs.length >= fn.length;
            return canBeCalled ? fn.apply(null, concatedArgs) : curry__.apply(null, [fn].concat(concatedArgs));
        };
    }

    /**
     * Curries a function up to given arity also enforces arity via placeholder values (`__`).
     * @function curryN__
     * @param fn {Function}
     * @param executeArity {Number}
     * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
     * @returns {function(...[*]=)} - Passed in function wrapped in a function for currying.
     */
    function curryN__(fn, executeArity) {
        for (var _len5 = arguments.length, curriedArgs = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
            curriedArgs[_key5 - 2] = arguments[_key5];
        }

        return function () {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            var concatedArgs = replacePlaceHolders(curriedArgs, args),
                placeHolders = concatedArgs.filter(isPlaceHolder),
                canBeCalled = concatedArgs.length - placeHolders.length >= executeArity || !executeArity;
            return !canBeCalled ? curryN__.apply(null, [fn, executeArity].concat(concatedArgs)) : fn.apply(null, concatedArgs);
        };
    }

    /**
     * Curries a function once with any given args (despite passed in function's actual arity).
     * @function curryOnce
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {function(...[*]=): *}
     */
    function curryOnce(fn) {
        for (var _len7 = arguments.length, argsToCurry = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
            argsToCurry[_key7 - 1] = arguments[_key7];
        }

        return function () {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            return fn.apply(null, argsToCurry.concat(args));
        };
    }

    /**
     * Curries a function up to a given arity.
     * @function curryN
     * @param fn {Function}
     * @param executeArity {Number}
     * @param curriedArgs {...*}
     * @returns {function(...[*]=)}
     */
    function curryN(fn, executeArity) {
        for (var _len9 = arguments.length, curriedArgs = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
            curriedArgs[_key9 - 2] = arguments[_key9];
        }

        return function () {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                args[_key10] = arguments[_key10];
            }

            var concatedArgs = curriedArgs.concat(args),
                canBeCalled = concatedArgs.length >= executeArity || !executeArity;
            return !canBeCalled ? curryN.apply(null, [fn, executeArity].concat(concatedArgs)) : fn.apply(null, concatedArgs);
        };
    }

    /**
     * Place holder object (frozen) used by curry.
     * @type {PlaceHolder}
     */
    var __ = exports.__ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,


    /**
     * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call function until 2 or more args).
     * @function curry2_
     * @param fn {Function}
     * @returns {Function}
     */
    curry2_ = exports.curry2_ = function curry2_(fn) {
        return curryN__(fn, 2);
    },


    /**
     * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call function until 3 or more args).
     * @function curry3_
     * @param fn {Function}
     * @returns {Function}
     */
    curry3_ = exports.curry3_ = function curry3_(fn) {
        return curryN__(fn, 3);
    },


    /**
     * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call function until 4 or more args).
     * @function curry4_
     * @param fn {Function}
     * @returns {Function}
     */
    curry4_ = exports.curry4_ = function curry4_(fn) {
        return curryN__(fn, 4);
    },


    /**
     * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call function until 5 or more args).
     * @function curry5_
     * @param fn {Function}
     * @returns {Function}
     */
    curry5_ = exports.curry5_ = function curry5_(fn) {
        return curryN__(fn, 5);
    },


    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = exports.curry2 = function curry2(fn) {
        return curryN(fn, 2);
    },


    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = exports.curry3 = function curry3(fn) {
        return curryN(fn, 3);
    },


    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = exports.curry4 = function curry4(fn) {
        return curryN(fn, 4);
    },


    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = exports.curry5 = function curry5(fn) {
        return curryN(fn, 5);
    };

    exports.default = {
        __: __,
        curry: curry,
        curryN: curryN,
        curry2: curry2,
        curry3: curry3,
        curry4: curry4,
        curry5: curry5,
        curryOnce: curryOnce,
        curry__: curry__,
        curryN__: curryN__,
        curry2_: curry2_,
        curry3_: curry3_,
        curry4_: curry4_,
        curry5_: curry5_
    };
});