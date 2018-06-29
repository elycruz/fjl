"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @module console
 * @description Console exports.
 */
var

/**
 * `Console.log` method.
 * @function module:console.log
 * @params args {...*}
 * @returns {void}
 */
log = exports.log = console.log.bind(console),


/**
 * `Console.error` method.
 * @function module:console.error
 * @params args {...*}
 * @returns {void}
 */
error = exports.error = console.error.bind(console),


/**
 * Peeks (console.log) at incoming value(s) and returns the last value.
 * @function module:console.peek
 * @param args {...*}
 * @returns {*} Last given value (if one or more values) else first value.
 */
peek = exports.peek = function peek() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return log.apply(undefined, args), args.pop();
};