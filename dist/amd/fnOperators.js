define(['exports', './curry', './is', './typeOf', './objFnOperators', './arrayFnOperators'], function (exports, _curry, _is, _typeOf, _objFnOperators, _arrayFnOperators) {
    /**
     * Created by elyde on 12/11/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.intersect = exports.union = exports.difference = exports.complement = exports.bimap = exports.promap = exports.extract = exports.extend = exports.liftN = exports.flatMap = exports.chain = exports.join = exports.reduceRight = exports.reduce = exports.filter = exports.map = exports.alt = exports.ap = exports.zero = exports.empty = exports.of = exports.concat = exports.equals = exports.length = exports.id = undefined;
    var id = exports.id = function id(value) {
        return value;
    },
        length = exports.length = function length(something) {
        return something.length;
    },
        equals = exports.equals = (0, _curry.curry2)(function (functor1, functor2) {
        return functor1.equals && (0, _is.isFunction)(functor1.equals) ? functor1.equals(functor2) : functor1 === functor2;
    }),
        concat = exports.concat = (0, _curry.curry2)(function (functor1, functor2) {
        return functor1.concat ? functor1.concat(functor2) : functor1 + functor2;
    }),
        of = exports.of = function of(functor) {
        var constructor = functor.constructor,
            retVal = void 0;
        if (constructor.of) {
            retVal = constructor.of();
        } else if (!(0, _is.isConstructablePrimitive)(functor)) {
            retVal = new constructor();
        } else {
            retVal = constructor();
        }
        return retVal;
    },
        empty = exports.empty = function empty(functor) {
        return functor.constructor.empty ? functor.constructor.empty() : of(functor);
    },
        zero = exports.zero = function zero(functor) {
        return functor.constructor.zero ? functor.constructor.zero() : of(functor);
    },
        ap = exports.ap = (0, _curry.curry2)(function (obj1, obj2) {
        return obj1.ap ? obj1.ap(obj2) : obj1(obj2);
    }),
        alt = exports.alt = (0, _curry.curry2)(function (functor1, functor2) {
        return functor1.alt ? functor1.alt(functor2) : functor1 || functor2;
    }),
        map = exports.map = (0, _curry.curry2)(function (fn, functor) {
        return functor.map(fn);
    }),
        filter = exports.filter = (0, _curry.curry2)(function (fn, functor) {
        return functor.filter(fn);
    }),
        reduce = exports.reduce = (0, _curry.curry3)(function (fn, agg, functor) {
        return functor.reduce(fn, agg);
    }),
        reduceRight = exports.reduceRight = (0, _curry.curry3)(function (fn, agg, functor) {
        return functor.reduceRight(fn, agg);
    }),
        join = exports.join = (0, _curry.curry2)(function (functor, delimiter) {
        if (Array.isArray(functor)) {
            return functor.join(delimiter);
        } else if (functor.join) {
            return functor.join();
        } else if (Object.prototype.hasOwnProperty.call(functor, 'value')) {
            return functor.value;
        }
        return of(functor);
    }),
        chain = exports.chain = (0, _curry.curry2)(function (fn, functor) {
        return join(map(fn, functor));
    }),
        flatMap = exports.flatMap = chain,


    // chainRec = () => {},

    // flatMapR = chainRec,

    liftN = exports.liftN = (0, _curry.curry3)(function (fn, functor1) {
        for (var _len = arguments.length, otherFunctors = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            otherFunctors[_key - 2] = arguments[_key];
        }

        return otherFunctors.reduce(function (aggregator, functor) {
            return ap(aggregator, functor);
        }, map(fn, functor1));
    }),
        extend = exports.extend = (0, _curry.curry2)(function (fn, functor) {
        return functor.extend(fn);
    }),
        extract = exports.extract = (0, _curry.curry2)(function (fn, functor) {
        return functor.extract(fn);
    }),
        promap = exports.promap = (0, _curry.curry2)(function (fn1, fn2, functor) {
        return functor.promap(fn1, fn2);
    }),
        bimap = exports.bimap = (0, _curry.curry2)(function (fn1, fn2, functor) {
        return functor.bimap(fn1, fn2);
    }),
        complement = exports.complement = (0, _curry.curry2)(function (functor) {
        for (var _len2 = arguments.length, others = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            others[_key2 - 1] = arguments[_key2];
        }

        switch ((0, _typeOf.typeOf)(functor)) {
            case 'Object':
                return _objFnOperators.complement.apply(undefined, [functor].concat(others));
            case 'Array':
                return _arrayFnOperators.complement.apply(undefined, [functor].concat(others));
            default:
                return _objFnOperators.complement.apply(undefined, [functor].concat(others));
        }
    }),
        difference = exports.difference = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Object':
                return (0, _objFnOperators.difference)(functor1, functor2);
            case 'Array':
                return (0, _arrayFnOperators.difference)(functor1, functor2);
            default:
                return (0, _objFnOperators.difference)(functor1, functor2);
        }
    }),
        union = exports.union = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Object':
                return (0, _objFnOperators.union)(functor1, functor2);
            case 'Array':
                return (0, _arrayFnOperators.union)(functor1, functor2);
            default:
                return (0, _objFnOperators.union)(functor1, functor2);
        }
    }),
        intersect = exports.intersect = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Object':
                return (0, _objFnOperators.intersect)(functor1, functor2);
            case 'Array':
                return (0, _arrayFnOperators.intersect)(functor1, functor2);
            default:
                return (0, _objFnOperators.intersect)(functor1, functor2);
        }
    });

    exports.default = {
        id: id,
        equals: equals,
        concat: concat,
        empty: empty,
        of: of,
        map: map,
        filter: filter,
        reduce: reduce,
        reduceRight: reduceRight,
        ap: ap,
        chain: chain,
        flatMap: flatMap,
        join: join,
        alt: alt,
        zero: zero,
        liftN: liftN,
        bimap: bimap,
        promap: promap
    };
});