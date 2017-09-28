(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../uncurried/jsPlatform/objectUncurried', '../uncurried/objectOps/typeOf', '../uncurried/objectOps/is', '../uncurried/objectOps/of', '../uncurried/objectOps/setTheoryOps', '../functionOps/curry', '../uncurried/objectOps/assignDeep'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../uncurried/jsPlatform/objectUncurried'), require('../uncurried/objectOps/typeOf'), require('../uncurried/objectOps/is'), require('../uncurried/objectOps/of'), require('../uncurried/objectOps/setTheoryOps'), require('../functionOps/curry'), require('../uncurried/objectOps/assignDeep'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.objectUncurried, global.typeOf, global.is, global.of, global.setTheoryOps, global.curry, global.assignDeep);
        global.objectOps = mod.exports;
    }
})(this, function (exports, _objectUncurried, _typeOf, _is, _of, _setTheoryOps, _curry, _assignDeep) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.keys = exports.toString = exports.length = undefined;
    Object.defineProperty(exports, 'length', {
        enumerable: true,
        get: function () {
            return _objectUncurried.length;
        }
    });
    Object.defineProperty(exports, 'toString', {
        enumerable: true,
        get: function () {
            return _objectUncurried.toString;
        }
    });
    Object.defineProperty(exports, 'keys', {
        enumerable: true,
        get: function () {
            return _objectUncurried.keys;
        }
    });
    Object.keys(_typeOf).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _typeOf[key];
            }
        });
    });
    Object.keys(_is).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _is[key];
            }
        });
    });
    Object.keys(_of).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _of[key];
            }
        });
    });
    Object.keys(_setTheoryOps).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _setTheoryOps[key];
            }
        });
    });
    var instanceOf = exports.instanceOf = (0, _curry.curry)(_objectUncurried.instanceOf),
        hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_objectUncurried.hasOwnProperty),
        assign = exports.assign = (0, _curry.curry2)(_objectUncurried.assign),
        assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep.assignDeep);
});