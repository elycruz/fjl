import { elem } from "../../packages/list/elem";
import includes from "../../packages/platform/slice/includes";
describe('#elem', () => {
    it('same as "#includes" test suite (methods should be equal)', () => {
        expect(includes).toEqual(elem);
    });
});
//# sourceMappingURL=test-elem.js.map