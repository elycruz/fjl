(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../functor/Applicative', '../functor/Chain', '../subClass'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../functor/Applicative'), require('../functor/Chain'), require('../subClass'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.Applicative, global.Chain, global.subClass);
        global.Monad = mod.exports;
    }
})(this, function (module, exports, _Applicative, _Chain, _subClass) {
    /**
     * Created by edlc on 12/9/16.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Applicative2 = _interopRequireDefault(_Applicative);

    var _Chain2 = _interopRequireDefault(_Chain);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function Monad(value) {
        if (!(this instanceof Monad)) {
            return Monad.of(value);
        }
        _Applicative2.default.apply(this);
        _Chain2.default.apply(this);
        this.value = value;
    }

    function isMonad(value) {
        return value instanceof Monad;
    }

    (0, _subClass.subClassMulti)([_Applicative2.default, _Chain2.default], Monad, null, {
        isMonad: isMonad,
        of: function of(value) {
            return new Monad(value);
        },
        unwrapMonad: function unwrapMonad(value) {
            return isMonad(value) ? Monad.unwrapMonad(value.value) : value;
        }
    });

    exports.default = Monad;
    module.exports = exports['default'];
});