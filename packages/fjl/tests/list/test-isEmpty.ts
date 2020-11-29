import {expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";
import {isEmptyList} from "../../src/object/is";

describe('#isEmpty (a.k.a. #`null`)', () => {
    it ('should return a boolean indicating whether given list is empty or not', () => {
        [[vowelsString, false], [vowelsArray, false], ['', true], [[], true]]
            .forEach(([subj, expected]) => {
                expectEqual(isEmptyList(subj), expected);
            });
    });
    it('should throw an error when receiving non list-like (doesn\'t have a `length` prop)', () => {
        [{}, null, undefined, false]
            .forEach(x => expectError((_x => () => isEmptyList(_x))(x)));
        expectError(isEmptyList);
    });
});