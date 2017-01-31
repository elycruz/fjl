define(['exports', './assign', './compose', './curry', './subClass', './typeOf', './is', './not', './errorIfNotTypeFactory', './functor/Functor', './functor/Bifunctor', './functor/Profunctor', './functor/Apply', './functor/Applicative', './functor/Chain', './functor/Extend', './functor/Comonad', './monad/Monad', './monad/Maybe', './monad/Either', './combinators', './objCombinators', './arrayCombinators', './data/DoublyLinkedList', './data/LinkedList', './generated/version'], function (exports, _assign, _compose, _curry, _subClass, _typeOf, _is, _not, _errorIfNotTypeFactory, _Functor, _Bifunctor, _Profunctor, _Apply, _Applicative, _Chain, _Extend, _Comonad, _Monad, _Maybe, _Either, _combinators, _objCombinators, _arrayCombinators, _DoublyLinkedList, _LinkedList, _version) {
    /**
     * Created by elyde on 12/6/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _compose2 = _interopRequireDefault(_compose);

    var _errorIfNotTypeFactory2 = _interopRequireDefault(_errorIfNotTypeFactory);

    var _Functor2 = _interopRequireDefault(_Functor);

    var _Bifunctor2 = _interopRequireDefault(_Bifunctor);

    var _Profunctor2 = _interopRequireDefault(_Profunctor);

    var _Apply2 = _interopRequireDefault(_Apply);

    var _Applicative2 = _interopRequireDefault(_Applicative);

    var _Chain2 = _interopRequireDefault(_Chain);

    var _Extend2 = _interopRequireDefault(_Extend);

    var _Comonad2 = _interopRequireDefault(_Comonad);

    var _Monad2 = _interopRequireDefault(_Monad);

    var _DoublyLinkedList2 = _interopRequireDefault(_DoublyLinkedList);

    var _LinkedList2 = _interopRequireDefault(_LinkedList);

    var _version2 = _interopRequireDefault(_version);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        assign: _assign.assign,
        assignDeep: _assign.assignDeep,
        compose: _compose2.default,
        __: _curry.__,
        curry: _curry.curry,
        curryN: _curry.curryN,
        curry2: _curry.curry2,
        curry3: _curry.curry3,
        curry4: _curry.curry4,
        curry5: _curry.curry5,
        subClass: _subClass.subClass,
        subClassMulti: _subClass.subClassMulti,
        isset: _is.isset,
        issetAndOfType: _is.issetAndOfType,
        typeOf: _typeOf.typeOf,
        typeOfIs: _typeOf.typeOfIs,
        isNumber: _is.isNumber,
        isFunction: _is.isFunction,
        isArray: _is.isArray,
        isBoolean: _is.isBoolean,
        isObject: _is.isObject,
        isString: _is.isString,
        isMap: _is.isMap,
        isSet: _is.isSet,
        isWeakSet: _is.isWeakSet,
        isWeakMap: _is.isWeakMap,
        isUndefined: _is.isUndefined,
        isNull: _is.isNull,
        isSymbol: _is.isSymbol,
        isEmpty: _is.isEmpty,
        isConstructablePrimitive: _is.isConstructablePrimitive,
        notEmptyAndOfType: _not.notEmptyAndOfType,
        errorIfNotTypeFactory: _errorIfNotTypeFactory2.default,
        complement: _combinators.complement,
        difference: _combinators.difference,
        intersect: _combinators.intersect,
        union: _combinators.union,
        objComplement: _objCombinators.complement,
        objDifference: _objCombinators.difference,
        objIntersect: _objCombinators.intersect,
        objUnion: _objCombinators.union,
        arrayDifference: _arrayCombinators.difference,
        arrayIntersect: _arrayCombinators.intersect,
        arrayComplement: _arrayCombinators.complement,
        arrayUnion: _arrayCombinators.union,
        length: _combinators.length,
        Functor: _Functor2.default,
        Bifunctor: _Bifunctor2.default,
        Profunctor: _Profunctor2.default,
        Apply: _Apply2.default,
        Applicative: _Applicative2.default,
        Chain: _Chain2.default,
        Extend: _Extend2.default,
        Comonad: _Comonad2.default,
        Monad: _Monad2.default,
        Maybe: _Maybe.Maybe,
        Just: _Maybe.Just,
        Nothing: _Maybe.Nothing,
        maybe: _Maybe.maybe,
        Either: _Either.Either,
        Left: _Either.Left,
        Right: _Either.Right,
        either: _Either.either,
        DoublyLinkedList: _DoublyLinkedList2.default,
        LinkedList: _LinkedList2.default,
        version: _version2.default
    };
});