define(['exports', '../jsPlatform/function_', '../jsPlatform/array_'], function (exports, _function_, _array_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.negateFMany = exports.negateP = exports.negateF5 = exports.negateF4 = exports.negateF3 = exports.negateF = undefined;
  /**
   * @memberOf functionOps_
   */

  const negateF = exports.negateF = fn => (a, b) => !fn(a, b),
        negateF3 = exports.negateF3 = fn => (a, b, c) => !fn(a, b, c),
        negateF4 = exports.negateF4 = fn => (a, b, c, d) => !fn(a, b, c, d),
        negateF5 = exports.negateF5 = fn => (a, b, c, d, e) => !fn(a, b, c, d, e),


  /**
   * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
   * @function module:functionOps_.negateP
   * @param fn {Function}
   * @returns {Function}
   */
  negateP = exports.negateP = negateF3,


  /**
   * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
   * @function module:functionOps_.negateFMany
   * @param fn {Function}
   * @returns {Function}
   */
  negateFMany = exports.negateFMany = fn => (...args) => !(0, _function_.apply)(fn, (0, _array_.reverse)(args));
});