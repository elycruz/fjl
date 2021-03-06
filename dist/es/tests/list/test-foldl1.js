import length from "../../packages/platform/object/length";
import { expectEqual } from "../helpers";
import { foldl1 } from "../../packages/list/foldl1";
describe('#foldl1', () => {
    it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', () => {
        const phrase = 'hello world', phraseLen = length(phrase), phraseIndCount = phraseLen - 1, getAppendage = ind => parseInt(ind, 10) < phraseIndCount ? '|' : '', expectedTransform = phrase.split('').map((x, ind) => x + getAppendage(ind));
        expectEqual(foldl1((agg, item, ind) => {
            agg += getAppendage(ind) + item;
            return agg;
        }, phrase), expectedTransform.join(''));
        expectEqual(foldl1((agg, item) => agg + item, [1, 2, 3, 4, 5]), 15);
        expectEqual(foldl1((agg, item) => agg * item, [1, 2, 3, 4, 5]), 120);
        expectEqual(foldl1((agg, item, ind) => {
            agg += getAppendage(ind) + item;
            return agg;
        }, phrase.split('')), expectedTransform.join(''));
    });
    it('should return the zero value when an empty list is passed in', () => {
        expectEqual(foldl1((agg, item) => agg + item, []), []);
    });
});
//# sourceMappingURL=test-foldl1.js.map