import { alphabetArray, alphabetString, expectEqual, isVowel, nonAlphaNums, nonAlphaNumsArray } from "../helpers";
import { span } from "../../packages/list";
describe('#span', () => {
    it('should give the span of elements matching predicate and elements not matching predicate.', () => {
        [
            [[isVowel, ''], ['', '']],
            [[isVowel, []], [[], []]],
            [[isVowel, nonAlphaNums], ['', nonAlphaNums]],
            [[isVowel, nonAlphaNumsArray], [[], nonAlphaNumsArray]],
            [[x => !isVowel(x), nonAlphaNums], [nonAlphaNums, '']],
            [[x => !isVowel(x), nonAlphaNumsArray], [nonAlphaNumsArray, []]],
            [[isVowel, alphabetString], ['a', alphabetString.slice(1)]],
            [[isVowel, alphabetArray], [['a'], alphabetArray.slice(1)]],
        ].forEach(([args, expected]) => {
            expectEqual(span(...args), expected);
        });
    });
});
//# sourceMappingURL=test-span.js.map