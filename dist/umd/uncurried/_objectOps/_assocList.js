(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './_is', '../_jsPlatform/_object', './_of'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./_is'), require('../_jsPlatform/_object'), require('./_of'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._is, global._object, global._of);
        global._assocList = mod.exports;
    }
})(this, function (exports, _is, _object, _of) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fromArrayMap = exports.toArrayMap = exports._fromAssocListOnKeys = exports._fromAssocListOnKey = exports.fromAssocList = exports._toAssocListOnKeys = exports._toAssocListOnKey = exports.toAssocList = undefined;

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var

    /**
     * Returns an associated list representing incoming value (object, array, etc.).
     * @note Does deep conversion on all values of direct type 'Object' (Pojo's).
     * @note Useful for working with object primitive (json and the like).
     * @note Note only convert objects of the same type of object given (so if object is for example of 'Object' type then
     *  only objects matching that type will be converted (to assoc-lists).
     * @function module:objectOps._toAssocList
     * @param obj {(Object|Array|*)}
     * @returns {Array.<*, *>}
     */
    toAssocList = exports.toAssocList = function toAssocList(obj) {
        return !obj ? [] : Object.keys(obj).map(function (key) {
            return (0, _is._isType)(obj.constructor, obj[key]) ? [key, toAssocList(obj[key])] : [key, obj[key]];
        });
    },


    /**
     * Converts incoming object into an associated lists and all subsequently
     * all objects found at `key`
     * @function module:_objectOps._toAssocListOnKey
     * @param key {*} - Usually a string.
     * @param obj {*} - Object to convert on.
     * @returns {any[]} - Associated list
     */
    _toAssocListOnKey = exports._toAssocListOnKey = function _toAssocListOnKey(key, obj) {
        return _toAssocListOnKeys([key], obj);
    },


    /**
     * Converts incoming object into an associated lists and all subsequent
     * objects values found at key that is one of given `keys`
     * @function module:_objectOps._toAssocListOnKeys
     * @param keys {Array.<*>} - Usually `Array.<String>`.
     * @param obj {*} - Object to convert on.
     * @param [objTypeConstraint=undefined] {*} - Type constraint for key value.
     * @returns {object|*} - Object if no `objTypeConstraint` is passed in. Otherwise object of type `objTypeConstraint`.
     */
    _toAssocListOnKeys = exports._toAssocListOnKeys = function _toAssocListOnKeys(keys, obj, objTypeConstraint) {
        return Object.keys(obj).reduce(function (agg, key) {
            // If not key to operate on (or if constraint and constraint failed) exit
            if (!keys.includes(key) || objTypeConstraint && !(0, _is._isType)(objTypeConstraint, obj[key])) {
                return agg;
            }
            agg[key] = _toAssocListOnKeys(keys, obj[key], objTypeConstraint);
            return agg;
        }, (0, _object._assign)(objTypeConstraint ? new objTypeConstraint() : {}, obj));
    },


    /**
     * From associated list to object.
     * @note Considers array of arrays associated lists.
     * @function module:objectOps.fromAssocList
     * @param xs {Array.<Array>} - Associated list.
     * @returns {Object}
     */
    fromAssocList = exports.fromAssocList = function fromAssocList(xs) {
        return !xs ? {} : xs.reduce(function (agg, _ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            if ((0, _is.isArray)(value) && (0, _is.isArray)(value[0])) {
                agg[key] = fromAssocList(value);
                return agg;
            }
            agg[key] = value;
            return agg;
        }, {});
    },


    /**
     * @note Considers array of arrays associated lists.
     * @function module:objectOps.fromAssocList
     * @param key {String|*}
     * @param xs {Array.<Array>} - Associated list.
     * @returns {*}
     */
    _fromAssocListOnKey = exports._fromAssocListOnKey = function _fromAssocListOnKey(key, xs) {
        return _fromAssocListOnKeys([key], xs);
    },


    /**
     * Converts an associated list into an object and any subsequent key matching `keys`
     * @function module:objectOps.fromAssocListOnKeys
     * @param keys {Array.<String>}
     * @param xs {Array|*} - Associated list.
     * @returns {Object}
     */
    _fromAssocListOnKeys = exports._fromAssocListOnKeys = function _fromAssocListOnKeys(keys, xs) {
        return !xs ? [] : xs.reduce(function (agg, _ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                k = _ref4[0],
                value = _ref4[1];

            if (keys.includes(k) && (0, _is.isArray)(value) && (0, _is.isArray)(value[0])) {
                agg[k] = _fromAssocListOnKeys(keys, value);
                return agg;
            }
            agg[k] = value;
            return agg;
        }, {});
    },


    /**
     * Returns an array map (associated list) representing incoming value (object, array, etc.).
     * @alias `toAssocList`
     * @function module:objectOps.toArrayMap
     * @param obj {(Object|Array|*)}
     * @returns {*}
     */
    toArrayMap = exports.toArrayMap = toAssocList,


    /**
     * Converts an array-map into an object (one level).
     * @alias `fromAssocList`
     * @function module:objectOps.fromArrayMap
     * @param xs {Array|*} - Array-map (associated list).
     * @returns {*}
     */
    fromArrayMap = exports.fromArrayMap = fromAssocList;
});