import { genericAscOrdering } from "../../packages/list/utils/genericAscOrdering";
describe('#list.genericAscOrdering', () => {
    [
        [['a', 'b'], -1],
        [['a', 'a'], 0],
        [['b', 'a'], 1],
        [[0, 1], -1],
        [[1, 0], 1],
        [[1, 1], 0]
    ].forEach(([args, expected]) => {
        it(`genericAscOrdering(${args[0]}, ${args[1]}) === ${expected}`, () => {
            const result = genericAscOrdering(...args);
            expect(result).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-genericAscOrdering.js.map