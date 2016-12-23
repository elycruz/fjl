(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Applicable', './../subClassOf'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Applicable'), require('./../subClassOf'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Applicable, global.subClassOf);
        global.Applicative = mod.exports;
    }
})(this, function (exports, _Applicable, _subClassOf) {
    /**
     * Created by edlc on 12/9/16.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Applicable2 = _interopRequireDefault(_Applicable);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Applicative = (0, _subClassOf.subClassOf)(_Applicable2.default, function Applicative(value) {
        if (!this) {
            return Applicative.of(value);
        }
        _Applicable2.default.call(this, value);
    }, null, {
        of: function of(value) {
            return new Applicative(value);
        }
    });

    exports.default = Applicative;
});