(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.Functor = mod.exports;
    }
})(this, function (module, exports) {
    /**
     * Created by edlc on 12/9/16.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function Functor(value) {
        if (!(this instanceof Functor)) {
            return new Functor(value);
        }
        this.value = value;
    }

    Functor.prototype.map = function (fn) {
        return new this.constructor(fn(this.value));
    };

    Object.defineProperty(Functor.prototype, 'constructor', { value: Functor });

    exports.default = Functor;
    module.exports = exports['default'];
});