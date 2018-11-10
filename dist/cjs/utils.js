"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fPureTakesOneOrMore = exports.fPureTakes5 = exports.fPureTakes4 = exports.fPureTakes3 = exports.fPureTakes2 = exports.fPureTakesOne = void 0;

var _curry = require("./function/curry");

/**
 * @module utils
 */
var
/**
 * Returns a function that takes an argument and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakesOne
 * @param name {String}
 * @returns {Function}
 */
fPureTakesOne = function fPureTakesOne(name) {
  return (0, _curry.curry)(function (arg, f) {
    return f[name](arg);
  });
},

/**
 * Returns a function that takes 2 arguments and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakes2
 * @param name {String}
 * @returns {Function}
 */
fPureTakes2 = function fPureTakes2(name) {
  return (0, _curry.curry)(function (arg1, arg2, f) {
    return f[name](arg1, arg2);
  });
},

/**
 * Returns a function that takes 3 arguments and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakes3
 * @param name {String}
 * @returns {Function}
 */
fPureTakes3 = function fPureTakes3(name) {
  return (0, _curry.curry)(function (arg1, arg2, arg3, f) {
    return f[name](arg1, arg2, arg3);
  });
},

/**
 * Returns a function that takes 4 arguments and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakes4
 * @param name {String}
 * @returns {Function}
 */
fPureTakes4 = function fPureTakes4(name) {
  return (0, _curry.curry)(function (arg1, arg2, arg3, arg4, f) {
    return f[name](arg1, arg2, arg3, arg4);
  });
},

/**
 * Returns a function that takes 5 arguments and an object on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakes5
 * @param name {String}
 * @returns {Function}
 */
fPureTakes5 = function fPureTakes5(name) {
  return (0, _curry.curry)(function (arg1, arg2, arg3, arg4, arg5, f) {
    return f[name](arg1, arg2, arg3, arg4, arg5);
  });
},

/**
 * Returns a function that takes an object and one or more arguments on which to execute 'method name'
 * with said parameters.
 * @function module:utils.fPureTakesOneOrMore
 * @param name {String}
 * @returns {Function}
 */
fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
  return (0, _curry.curry2)(function (f) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return f[name].apply(f, args);
  });
};

exports.fPureTakesOneOrMore = fPureTakesOneOrMore;
exports.fPureTakes5 = fPureTakes5;
exports.fPureTakes4 = fPureTakes4;
exports.fPureTakes3 = fPureTakes3;
exports.fPureTakes2 = fPureTakes2;
exports.fPureTakesOne = fPureTakesOne;