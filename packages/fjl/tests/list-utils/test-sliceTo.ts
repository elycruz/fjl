import {alphabetArray, alphabetLen, vowelsArray, vowelsLen} from "../helpers";
import {sliceTo} from "../../src";

describe('#sliceTo', () => {
  it ('should create a slice of an array "from" given index.', () => {
    alphabetArray.forEach((_, ind, list) => {
      const result = sliceTo(alphabetLen - ind, list);

      // Compare slices
      expect(result).toEqual(list.slice(0, alphabetLen - ind)); // deep equal

      // Compare lengths (calculated)
      expect(alphabetLen - ind).toEqual(result.length);
    });
  });
  it ('should be curried', () => {
    vowelsArray
      .map((_, ind) => sliceTo(vowelsLen - ind))
      .forEach((fn, ind) => {
        const result = fn(vowelsArray);

        // Compare slices
        expect(result).toEqual(vowelsArray.slice(0, vowelsLen - ind)); // deep equal

        // Compare lengths (calculated)
        expect(vowelsLen - ind).toEqual(result.length);
      });
  });
  it ('should return an empty slice when given an empty slice', () => {
    expect(sliceTo(99, [])).toEqual([]);
  });
  it ('should throw an error when not receiving a `ListLike` (a sliceable, an array, and/or string).', () => {
    [null, undefined, {}, false, 0].forEach(x => {
      expect(() => sliceTo(99, x)).toThrow(Error);
    });
  });
});
