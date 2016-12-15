/**
 * Created by edlc on 12/11/16.
 */
/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {expect} from 'chai';
import {expectFunction, add, multiply, divide} from './../helpers';
import Functor from '../../src/functor/Functor';
import Applicable from '../../src/functor/Applicable';
import Applicative from '../../src/functor/Applicative';

let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
    expectFunctor = value => expectInstanceOf(value, Functor),
    expectApplicable = value => expectInstanceOf(value, Applicable),
    expectApplicative = value => expectInstanceOf(value, Applicative),
    expectValue = (value, expectedValue) => expect(value).to.equal(expectedValue);

describe('Applicative', function () {

    it('should return an new instance when called as a function', function () {
        let result = Applicative();
        expectApplicative(result);
        expectApplicable(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Applicative();
        expectApplicative(result);
        expectApplicable(result);
        expectFunctor(result);
    });

    describe('Statics', function () {
        it('should have a static `of` property that acts as unit.', function () {
            let result = Applicative.of(multiply(4)).ap(Applicative(25));
            expectFunction(Applicative.of);
            expectApplicative(Applicative.of());
            expectApplicable(result);
            expectValue(result.value, 100);
        });
    });

    describe('Interface', function () {
        let instance = Applicative();
        ['map', 'ap'].forEach((key) => {
            it('should method #' + key, function () {
                expectFunction(instance[key]);
            });
        });
        it('should have a non-enumerated `value` property', function () {
            let propsDesc = Object.getOwnPropertyDescriptor(instance, 'value');
            expect(Object.keys(instance).length).to.equal(0);
            expect(propsDesc.enumerable).to.equal(false);
        });
    });

    describe('#map', function () {
        it('should return a new instance of Functor', function () {
            let functor = Applicable(99),
                result = functor.map(num => num * 2);
            expectApplicable(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Applicable(99).map(num => num * 2);
            expectApplicable(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#ap', function () {
        it('should map incoming functor over it\'s value', function () {
            let instance = Applicable(add(1)),
                result = instance.ap(Applicable(99));
            expectFunctor(result);
            expectApplicable(result);
            expect(result.value).to.equal(100);
        });
    });

});