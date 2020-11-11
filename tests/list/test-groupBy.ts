import {groupBy} from "../../packages/list/groupBy";
import {vowelsArray, vowelsString} from "../helpers";
import {SliceOf} from "../../packages/platform/slice";
import {BinaryPred} from "../../packages/types";

describe(`#list.group`, () => {
    const equal = <T>(a: T, b: T): boolean => a === b;
    (<[BinaryPred<any>, SliceOf<any>, SliceOf<any>[]][]>[
        [equal, vowelsArray, vowelsArray.map(x => [x])],
        [equal, vowelsString, vowelsArray.map(x => [x])],
        [equal, 'Mississippi', [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']]],
        [equal, 'Mississippi'.split(''), [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']]]
    ]).forEach(([pred, xs, expected]) => {
        it(`groupBy(${pred}, ${xs}) === ${expected}`, () => {
            expect(groupBy(pred, xs)).toEqual(expected);
        });
    });
});

