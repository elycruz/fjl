define(['exports', './curry'], function (exports, _curry) {
    /**
     * Created by elyde on 12/29/2016.
     */
    /**
     * Created by elyde on 12/10/2016.
     * Set functions for arrects.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.complement = exports.difference = exports.intersect = exports.union = exports.flattenMulti = exports.flatten = exports.reduceRight = exports.reduce = exports.map = exports.filter = exports.join = exports.concat = exports.equals = undefined;
    var equals = exports.equals = (0, _curry.curry2)(function (value1, value2) {
        return value1.equals && value1.equals(value2) || value1 === value2;
    }),
        concat = exports.concat = (0, _curry.curry2)(function (arr0) {
        for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            arrays[_key - 1] = arguments[_key];
        }

        return arr0.concat.apply(arr0, arrays);
    }),
        join = exports.join = (0, _curry.curry2)(function (functor, delimiter) {
        return Array.isArray(functor) ? functor.join(delimiter) : functor.join();
    }),
        filter = exports.filter = (0, _curry.curry2)(function (fn, arr) {
        return arr.filter(fn);
    }),
        map = exports.map = (0, _curry.curry2)(function (fn, functor) {
        return functor.map(fn);
    }),
        reduce = exports.reduce = (0, _curry.curry2)(function (fn, agg, arr) {
        return arr.reduce(fn, agg);
    }),
        reduceRight = exports.reduceRight = (0, _curry.curry2)(function (fn, agg, arr) {
        return arr.reduceRight(fn, agg);
    }),
        flatten = exports.flatten = function flatten(arr) {
        return arr.reduce(function (agg, elm) {
            if (Array.isArray(elm)) {
                return concat(agg, flatten(elm));
            }
            agg.push(elm);
            return agg;
        }, []);
    },
        flattenMulti = exports.flattenMulti = (0, _curry.curry2)(function (arr0) {
        for (var _len2 = arguments.length, arrays = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            arrays[_key2 - 1] = arguments[_key2];
        }

        return reduce(function (agg, arr) {
            return concat(agg, flatten(arr));
        }, flatten(arr0), arrays);
    }),
        union = exports.union = (0, _curry.curry2)(function (arr1, arr2) {
        var whereNotInArray1 = function whereNotInArray1(elm) {
            return arr1.indexOf(elm) === -1;
        };
        return concat(arr1, filter(whereNotInArray1, arr2));
    }),
        intersect = exports.intersect = (0, _curry.curry2)(function (arr1, arr2) {
        return arr2.length === 0 ? [] : filter(function (elm) {
            return arr2.indexOf(elm) > -1;
        }, arr1);
    }),
        difference = exports.difference = (0, _curry.curry2)(function (arr1, arr2) {
        if (arr2.length === 0) {
            return arr1.slice();
        }
        return reduce(function (agg, elm) {
            if (arr2.indexOf(elm) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    }),
        complement = exports.complement = (0, _curry.curry2)(function (arr0) {
        for (var _len3 = arguments.length, arrays = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            arrays[_key3 - 1] = arguments[_key3];
        }

        return reduce(function (agg, arr) {
            return concat(agg, difference(arr, arr0));
        }, [], arrays);
    });

    exports.default = {
        complement: complement,
        difference: difference,
        intersect: intersect,
        union: union,
        concat: concat,
        filter: filter,
        join: join,
        map: map,
        reduce: reduce,
        reduceRight: reduceRight,
        flatten: flatten,
        flattenMulti: flattenMulti
    };
});