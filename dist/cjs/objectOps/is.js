'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notEmptyAndOfType = exports.isType = exports.isset = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isPromise = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isArray = exports.isCallable = exports.isClass = exports.isFunction = exports.isEmpty = undefined;

var _is_ = require('../uncurried/objectOps/is_');

Object.defineProperty(exports, 'isFunction', {
  enumerable: true,
  get: function get() {
    return _is_.isFunction;
  }
});
Object.defineProperty(exports, 'isClass', {
  enumerable: true,
  get: function get() {
    return _is_.isClass;
  }
});
Object.defineProperty(exports, 'isCallable', {
  enumerable: true,
  get: function get() {
    return _is_.isCallable;
  }
});
Object.defineProperty(exports, 'isArray', {
  enumerable: true,
  get: function get() {
    return _is_.isArray;
  }
});
Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function get() {
    return _is_.isObject;
  }
});
Object.defineProperty(exports, 'isBoolean', {
  enumerable: true,
  get: function get() {
    return _is_.isBoolean;
  }
});
Object.defineProperty(exports, 'isNumber', {
  enumerable: true,
  get: function get() {
    return _is_.isNumber;
  }
});
Object.defineProperty(exports, 'isString', {
  enumerable: true,
  get: function get() {
    return _is_.isString;
  }
});
Object.defineProperty(exports, 'isMap', {
  enumerable: true,
  get: function get() {
    return _is_.isMap;
  }
});
Object.defineProperty(exports, 'isSet', {
  enumerable: true,
  get: function get() {
    return _is_.isSet;
  }
});
Object.defineProperty(exports, 'isWeakMap', {
  enumerable: true,
  get: function get() {
    return _is_.isWeakMap;
  }
});
Object.defineProperty(exports, 'isWeakSet', {
  enumerable: true,
  get: function get() {
    return _is_.isWeakSet;
  }
});
Object.defineProperty(exports, 'isUndefined', {
  enumerable: true,
  get: function get() {
    return _is_.isUndefined;
  }
});
Object.defineProperty(exports, 'isNull', {
  enumerable: true,
  get: function get() {
    return _is_.isNull;
  }
});
Object.defineProperty(exports, 'isSymbol', {
  enumerable: true,
  get: function get() {
    return _is_.isSymbol;
  }
});
Object.defineProperty(exports, 'isPromise', {
  enumerable: true,
  get: function get() {
    return _is_.isPromise;
  }
});
Object.defineProperty(exports, 'isUsableImmutablePrimitive', {
  enumerable: true,
  get: function get() {
    return _is_.isUsableImmutablePrimitive;
  }
});
Object.defineProperty(exports, 'isEmptyList', {
  enumerable: true,
  get: function get() {
    return _is_.isEmptyList;
  }
});
Object.defineProperty(exports, 'isEmptyObject', {
  enumerable: true,
  get: function get() {
    return _is_.isEmptyObject;
  }
});
Object.defineProperty(exports, 'isEmptyCollection', {
  enumerable: true,
  get: function get() {
    return _is_.isEmptyCollection;
  }
});
Object.defineProperty(exports, 'isset', {
  enumerable: true,
  get: function get() {
    return _is_.isset;
  }
});

var _curry_ = require('../uncurried/functionOps/curry_');

/**
 * Created by elyde on 12/18/2016.
 * @memberOf objectOps
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 * @todo Use the ucurried versions of the methods here from the '../uncurried/*' packages.
 */
exports.isEmpty = _is_.isEmpty;
var

/**
 * Returns whether a value is a functionOps or not.
 * @function module:objectOps.isFunction
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Type checker.  Note** The `Type` passed in, if a constructor, should
 * be a named constructor/functionOps-instance;  E.g.,
 * ```
 *  functionOps SomeName () {} // or
 *  var SomeName = functionOps SomeName () {} // or
 *  class SomeName {}
 * ```
 * @function module:objectOps.isType
 * @param Type {Function|String} - Constructor or constructor name
 * @param value {*}
 * @return {Boolean}
 */
isType = exports.isType = (0, _curry_.curry)(_is_.isType),


/**
 * Checks if `value` is an es2015 `class`.
 * @function module:objectOps.isClass
 * @param x {*}
 * @returns {boolean}
 */

/**
 * Returns a booleanOps depicting whether a value is callable or not.
 * @function module:objectOps.isCallable
 * @tentative
 * @private
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is an arrayOps.
 * @function module:objectOps.isArray
 * @param value {*}
 * @returns {boolean}
 */

/**
 * Checks whether value is an object or not.
 * @function module:objectOps.isObject
 * @param value
 * @returns {Boolean}
 */

/**
 * Checks if value is a booleanOps.
 * @function module:objectOps.isBoolean
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is a valid number (also checks if isNaN so that you don't have to).
 * @function module:objectOps.isNumber
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is a stringOps or not.
 * @function module:objectOps.isString
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is of `Map` or not.
 * @function module:objectOps.isMap
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is of `Set` or not.
 * @function module:objectOps.isSet
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is of `WeakMap` or not.
 * @function module:objectOps.isWeakMap
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is of `WeakSet` or not.
 * @function module:objectOps.isWeakSet
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is undefined.
 * @function module:objectOps.isUndefined
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is null.
 * @function module:objectOps.isNull
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is a `Symbol`.
 * @function module:objectOps.isSymbol
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * @tentative
 * @private
 */

/**
 * Checks if given `x` is one of the four
 * "usable" immutable JS primitives; I.e.,
 *  One of [String, Boolean, Number, Symbol]
 * @function module:objectOps.isUsableImmutablePrimitive
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks if !length.
 * @function module:objectOps.isEmptyList
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks if object has own properties/enumerable-props or not.
 * @function module:objectOps.isEmptyObject
 * @param obj {*}
 * @returns {Boolean}
 */

/**
 * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
 * @function module:objectOps_.isEmptyCollection
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks to see if passed in argument is empty.
 * @function module:objectOps.isEmpty
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */

/**
 * Returns true if an element is not empty and is of type.
 * @function module:objectOps.notEmptyAndOfType
 * @tentative
 * @private* @param type {String|Function} - Type to check against (stringOps name or actual constructor).
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
notEmptyAndOfType = exports.notEmptyAndOfType = (0, _curry_.curry)(function (type, value) {
  return !(0, _is_.isEmpty)(value) && isType(type, value);
})

/**
 * Returns whether passed in values is defined and not null.
 * @function module:objectOps.isset
 * @param x {*}
 * @returns {Boolean}
 */
;