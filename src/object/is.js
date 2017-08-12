/**
 * Created by elyde on 12/18/2016.
 * @module is
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 */
import {curry} from '../function/curry';
import {typeOf} from './typeOf';
import {instanceOf} from './instanceOf';
import {length, keys, hasOwnProperty} from './objectPrelude';

let _String = String.name,
    _Number = Number.name,
    _Object = Object.name,
    _Boolean = Boolean.name,
    _Function = Function.name,
    _Array = Array.name,
    _Map = 'Map',
    _Set = 'Set',
    _WeakMap = 'WeakMap',
    _WeakSet = 'WeakSet',
    _Null = 'Null',
    _Undefined = 'Undefined';

export const

    /**
     * Returns whether a value is a function or not.
     * @function module:is.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    isFunction = instanceOf(Function),

    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/function-instance;  E.g.,
     * ```
     *  function SomeName () {} // or
     *  var SomeName = function SomeName () {} // or
     *  class SomeName {}
     * ```
     * @function module:fjl.isType
     * @param Type {Function|String} - Constructor or constructor name
     * @param value {*}
     * @return {Boolean}
     */
    isType = curry((type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type)),

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:is.isClass
     * @param x {*}
     * @returns {boolean}
     */
    isClass = x => x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10)),

    /**
     * Returns a boolean depicting whether a value is callable or not.
     * @function module:is.isCallable
     * @param x {*}
     * @returns {Boolean}
     */
    isCallable = x => !isClass(x) && isFunction(x),

    /**
     * Checks if value is an array.
     * @function module:is.isArray
     * @param value {*}
     * @returns {boolean}
     */
    isArray = isType(Array),

    /**
     * Checks whether value is an object or not.
     * @function module:is.isObject
     * @param value
     * @returns {Boolean}
     */
    isObject = isType(_Object),

    /**
     * Checks if value is a boolean.
     * @function module:is.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    isBoolean = isType(_Boolean),

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:is.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    isNumber = isType(_Number),

    /**
     * Checks whether value is a string or not.
     * @function module:is.isString
     * @param value {*}
     * @returns {Boolean}
     */
    isString = isType(_String),

    /**
     * Checks whether value is of `Map` or not.
     * @function module:is.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    isMap = isType(_Map),

    /**
     * Checks whether value is of `Set` or not.
     * @function module:is.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    isSet = isType(_Set),

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:is.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakMap = isType(_WeakMap),

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:is.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakSet = isType(_WeakSet),

    /**
     * Checks if value is undefined.
     * @function module:is.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    isUndefined = isType(_Undefined),

    /**
     * Checks if value is null.
     * @function module:is.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    isNull = isType(_Null),

    /**
     * Checks if value is a `Symbol`.
     * @function module:is.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    isSymbol = isType('Symbol'),

    /**
     * Checks if value passed in is a promise.
     * @param x {*}
     * @returns {Boolean}
     */
    isPromise = isType('Promise'),

    /**
     * Checks if !length.
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyList = x => length(x) === 0,

    /**
     * Checks if object has own properties/enumerable-props or not.
     * @param obj {*}
     * @returns {Boolean}
     */
    isEmptyObject = obj => isEmptyList(keys(obj)),

    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyCollection = x => x.size === 0,

    /**
     * Checks to see if passed in argument is empty.
     * @function module:is.empty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    isEmpty = value => {
        let typeOfValue = typeOf(value),
            retVal;

        if (!value) { // '', 0, `null`, `undefined` or `false` then is empty
            retVal = true;
        }
        else if (typeOfValue === _Array || typeOfValue === _Function) {
            retVal = isEmptyList(value);
        }
        else if (typeOfValue === _Number && value !== 0) {
            retVal = false;
        }
        else if (typeOfValue === _Object) {
            retVal = isEmptyObject(value);
        }
        else if (hasOwnProperty('size', value)) {
            retVal = isEmptyCollection(value);
        }
        else {
            retVal = !value;
        }
        return retVal;
    },

    /**
     * Returns true if an element is not empty and is of type.
     * @function module:is.notEmptyAndOfType
     * @param type {String|Function} - Type to check against (string name or actual constructor).
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    notEmptyAndOfType = curry((type, value) => !isEmpty(value) && isType(type, value)),

    /**
     * Returns whether passed in values is defined and not null.
     * @param x {*}
     * @returns {Boolean}
     */
    isset = x => !isNull(x) && !isUndefined(x);
