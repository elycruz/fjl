'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelCase = exports.ucaseFirst = exports.lcaseFirst = exports.unlines = exports.unwords = exports.words = exports.lines = undefined;

var _listOps = require('./listOps');

var _string = require('./jsPlatform/string');

var _compose = require('./uncurried/_functionOps/_compose');

var _array = require('./jsPlatform/array');

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
var

/**
 * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
 * @function module:stringOps.lines
 * @param str {String}
 * @returns {Array}
 */
lines = exports.lines = (0, _string.split)(/[\n\r]/gm),


/**
 * Splits a string on all '\s' and/or all '\t' characters.
 * @function module:stringOps.words
 * @param str{String}
 * @returns {Array}
 */
words = exports.words = (0, _string.split)(/[\s\t]/gm),


/**
 * Intersperse an array of strings with '\s' and then concats them.
 * @function module:stringOps.unwords
 * @param arr {String}
 * @returns {Array}
 */
unwords = exports.unwords = (0, _listOps.intercalate)(' '),


/**
 * Intersperses a '\n' character into a list of strings and then concats it.
 * @function module:stringOps.unlines
 * @param list {Array|String|*}
 * @returns {Array}
 */
unlines = exports.unlines = (0, _listOps.intercalate)('\n'),


/**
 * Lower cases first character of a non-empty string.
 * @function module:stringOps.lcaseFirst
 * @param xs {String}
 * @returns {string}
 */
lcaseFirst = exports.lcaseFirst = function lcaseFirst(xs) {
  return xs[0].toLowerCase() + xs.substring(1);
},


/**
 * Upper cases first character of a non-empty string.
 * @function module:stringOps.ucaseFirst
 * @param xs {String}
 * @returns {string}
 */
ucaseFirst = exports.ucaseFirst = function ucaseFirst(xs) {
  return xs[0].toUpperCase() + xs.substring(1);
},


/**
 * Camel cases (class case) a string.
 * @function module:stringOps.camelCase
 * @param xs {String}
 * @param [pattern=/[^a-z\d/i]/] {RegExp} - Pattern to split on.  Optional.
 * @returns {string}
 */
camelCase = exports.camelCase = function camelCase(xs, pattern) {
  return (0, _compose.compose)((0, _array.join)(''), (0, _listOps.map)(function (str) {
    return ucaseFirst(str.toLowerCase());
  }), (0, _listOps.filter)(function (x) {
    return !!x;
  }), (0, _string.split)(pattern || /[^a-z\d]/i))(xs);
};