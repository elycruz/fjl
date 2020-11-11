import {vowelsArray, vowelsString} from "../helpers";
import {SliceOf} from "../../packages/platform/slice";
import includes from "../../packages/platform/slice/includes";

describe('#includes', () => {
    (<[[string, SliceOf<string>], boolean][]>[
        [['', vowelsArray],  false],
        [['x', vowelsArray],  false],
        [['y', vowelsString],  false],
        [['z', vowelsString],  false],
    ].concat(
        vowelsArray.map((x, i, xs) => {
            return [[xs.slice(0, i + 1).join(''), vowelsString], true]
        })
    ))
        .forEach(([args, expected]) => {
            it(`includes("${args.join('", "')}") === ${expected}`, () => {
                const result = includes(...args);
                expect(result).toEqual(expected);
            });
        })

});
