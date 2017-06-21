(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../compose', '../is', '../curry', '../subClass', '../typeOf', '../operators', './Monad'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../compose'), require('../is'), require('../curry'), require('../subClass'), require('../typeOf'), require('../operators'), require('./Monad'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.compose, global.is, global.curry, global.subClass, global.typeOf, global.operators, global.Monad);
        global.Maybe = mod.exports;
    }
})(this, function (exports, _compose, _is, _curry, _subClass, _typeOf, _operators, _Monad) {
    /**
     * Created by elyde on 12/10/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Maybe = exports.maybe = exports.Just = exports.Nothing = undefined;

    var _compose2 = _interopRequireDefault(_compose);

    var _Monad2 = _interopRequireDefault(_Monad);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _protected = {
        NothingSingleton: null,
        NothingSingletonCreated: null
    },
        returnThis = function returnThis() {
        return this;
    };

    var Nothing = exports.Nothing = (0, _subClass.subClass)(_Monad2.default, {
        constructor: function Nothing() {
            var NothingSingleton = _protected.NothingSingleton,
                NothingSingletonCreated = _protected.NothingSingletonCreated;

            if (NothingSingleton) {
                return NothingSingleton;
            } else if (!(this instanceof Nothing)) {
                return Nothing.of();
            } else if (!NothingSingletonCreated) {
                _protected.NothingSingletonCreated = true;
                _protected.NothingSingleton = this;
                Object.freeze(_protected);
            }
            if (!this.hasOwnProperty('value')) {
                Object.defineProperty(this, 'value', {
                    value: null
                });
            }
        },
        map: returnThis,
        join: returnThis,
        ap: returnThis,
        chain: returnThis
    }, {
        of: function of() {
            return new Nothing();
        }
    }),
        Just = exports.Just = (0, _subClass.subClass)(_Monad2.default, {
        constructor: function Just(value) {
            if (!(this instanceof Just)) {
                return Just.of(value);
            }
            _Monad2.default.call(this, value);
        },
        map: function map(fn) {
            var constructor = this.constructor;
            return (0, _is.isset)(this.value) ? constructor.of(fn(this.value)) : constructor.counterConstructor.of(this.value);
        }
    }, {
        of: function of(value) {
            return new Just(value);
        },
        counterConstructor: Nothing
    }),


    /**
     * @param replacement {*} - Replacement value to return if functor maps to a functor with an empty
     *  value (a value of undefined | null).
     * @param fn {Function} - Function to map to.
     * @param monad {Function<map {Function}> - Functor
     * @returns {*}
     */
    maybe = exports.maybe = (0, _curry.pureCurry3)(function (replacement, fn, monad) {
        var subject = (0, _typeOf.typeOfIs)(monad, 'Maybe') ? monad.value.map(_operators.id) : monad.map(_operators.id);
        return subject instanceof Nothing ? replacement : subject.chain(fn).value;
    }),
        Maybe = exports.Maybe = (0, _subClass.subClass)(_Monad2.default, {
        constructor: function Maybe(value) {
            if (!(this instanceof Maybe)) {
                return Maybe.of(value);
            }
            _Monad2.default.call(this, Just(value));
        },
        join: function join() {
            return (0, _compose2.default)(Maybe.of, _operators.join, (0, _operators.map)(_operators.id))(this.value);
        },
        map: function map(fn) {
            return (0, _compose2.default)(Maybe.of, fn, (0, _operators.map)(_operators.id))(this.value);
        },
        ap: function ap(functor) {
            return (0, _compose2.default)(Maybe.of, (0, _operators.ap)(_curry.__, functor), (0, _operators.map)(_operators.id))(this.value);
        },
        chain: function chain(fn) {
            return (0, _compose2.default)(Maybe.of, (0, _operators.chain)(fn), (0, _operators.map)(_operators.id))(this.value);
        }
    }, {
        of: function of(value) {
            return new Maybe(value);
        },
        Just: Just,
        Nothing: Nothing,
        maybe: maybe
    });

    exports.default = Maybe;
});