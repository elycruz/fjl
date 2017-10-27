(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.utils_ = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var fPureTakesOne = exports.fPureTakesOne = function fPureTakesOne(name) {
        return function (arg, f) {
            return f[name](arg);
        };
    },
        fPureTakes2 = exports.fPureTakes2 = function fPureTakes2(name) {
        return function (arg1, arg2, f) {
            return f[name](arg1, arg2);
        };
    },
        fPureTakes3 = exports.fPureTakes3 = function fPureTakes3(name) {
        return function (arg1, arg2, arg3, f) {
            return f[name](arg1, arg2, arg3);
        };
    },
        fPureTakes4 = exports.fPureTakes4 = function fPureTakes4(name) {
        return function (arg1, arg2, arg3, arg4, f) {
            return f[name](arg1, arg2, arg3, arg4);
        };
    },
        fPureTakes5 = exports.fPureTakes5 = function fPureTakes5(name) {
        return function (arg1, arg2, arg3, arg4, arg5, f) {
            return f[name](arg1, arg2, arg3, arg4, arg5);
        };
    },
        fPureTakesOneOrMore = exports.fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
        return function (f) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return f[name].apply(f, args);
        };
    };
});