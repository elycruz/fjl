import {group} from "../../packages/list/group";
import {vowelsArray, vowelsString} from "../helpers";
import {SliceOf} from "../../packages/platform/slice";

describe(`#list.group`, () => {
    (<[SliceOf<any>, SliceOf<any>[]][]>[
        [vowelsArray, vowelsArray.map(x => [x])],
        [vowelsString, vowelsArray.map(x => [x])],
        ['Mississippi', [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']]],
        ['Mississippi'.split(''), [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']]]
    ]).forEach(([xs, expected]) => {
        it(`group(${xs}) === ${expected}`, () => {
            expect(group(xs)).toEqual(expected);
        });
    });
});

