(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './_jsPlatform/_object', './_objectOps/_prop', './_objectOps/_typeOf', './_objectOps/_is', './_objectOps/_of', './_objectOps/_assignDeep', './_objectOps/_setTheory'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./_jsPlatform/_object'), require('./_objectOps/_prop'), require('./_objectOps/_typeOf'), require('./_objectOps/_is'), require('./_objectOps/_of'), require('./_objectOps/_assignDeep'), require('./_objectOps/_setTheory'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._object, global._prop, global._typeOf, global._is, global._of, global._assignDeep, global._setTheory);
        global._objectOps = mod.exports;
    }
})(this, function (exports, _object, _prop, _typeOf, _is, _of, _assignDeep, _setTheory) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.toArray = exports.fromArrayMap = exports.toArrayMap = undefined;
    Object.keys(_object).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _object[key];
            }
        });
    });
    Object.keys(_prop).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _prop[key];
            }
        });
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
    Object.keys(_assignDeep).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _assignDeep[key];
            }
        });
    });
    Object.keys(_setTheory).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _setTheory[key];
            }
        });
    });

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

    var toArrayMap = exports.toArrayMap = function toArrayMap(obj) {
        return Object.keys(obj).map(function (key) {
            return [key, obj[key]];
        });
    },
        fromArrayMap = exports.fromArrayMap = function fromArrayMap(xs) {
        return xs.reduce(function (agg, _ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            agg[key] = value;
            return agg;
        }, {});
    },
        toArray = exports.toArray = function toArray(x) {
        var out = void 0;
        switch ((0, _typeOf.typeOf)(x)) {
            case 'Null':
            case 'Undefined':
                out = [];
                break;
            case String.name:
            case Array.name:
            case 'WeakMap':
            case 'WeakSet':
            case 'Map':
            case 'Set':
                out = Array.from(x);
                break;
            case Object.name:
            default:
                out = toArrayMap(x);
                break;
        }
        return out;
    };
});