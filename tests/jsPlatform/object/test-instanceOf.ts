import {TypeConstructor} from "../../../packages/types";
import {instanceOf} from "../../../packages/platform/object";

describe('#instanceOf', () => {
    it('should have more tests', () => {
        (<[any, TypeConstructor, boolean][]>[
            [() => undefined, Function, true],
            [[], Array, true],
            [{}, Object, true],
            ['', String, false],
            [0, Number, false],
            [true, Boolean, false],
        ])
            .forEach(([x, Type, expected]) => {
                expect(instanceOf(Type, x)).toEqual(expected);
            });
    });
});