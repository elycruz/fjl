'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = exports.flip5 = exports.flip4 = exports.flip3 = exports.flipN = undefined;

var _array = require('../jsPlatform/array');

var _function = require('../jsPlatform/function');

var _curry = require('./curry');

var

/**
 * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
 * @function module:function.flipN
 * @param fn {Function}
 * @returns {Function}
 */
flipN = exports.flipN = function flipN(fn) {
  return (0, _curry.curry2)(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _function.apply)(fn, (0, _array.reverse)(args));
  });
},


/**
 * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
 * @function module:function.flip3
 * @param fn {Function} - Function<a, b, c>
 * @returns {Function} - Function<c, b, a>
 */
flip3 = exports.flip3 = function flip3(fn) {
  return (0, _curry.curry)(function (a, b, c) {
    return (0, _function.call)(fn, c, b, a);
  });
},


/**
 * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
 * @function module:function.flip4
 * @param fn {Function} - Function<a, b, c, d>
 * @returns {Function} - Function<d, c, b, a>
 */
flip4 = exports.flip4 = function flip4(fn) {
  return (0, _curry.curry)(function (a, b, c, d) {
    return (0, _function.call)(fn, d, c, b, a);
  });
},


/**
 * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
 * @function module:function.flip5
 * @param fn {Function} - Function<a, b, c, d, e>
 * @returns {Function} - Function<e, d, c, b, a>
 */
flip5 = exports.flip5 = function flip5(fn) {
  return (0, _curry.curry)(function (a, b, c, d, e) {
    return (0, _function.call)(fn, e, d, c, b, a);
  });
},


/**
 * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
 * @function module:function.flip
 * @param fn {Function}
 * @returns {Function}
 */
flip = exports.flip = function flip(fn) {
  return (0, _curry.curry)(function (b, a) {
    return (0, _function.call)(fn, a, b);
  });
};