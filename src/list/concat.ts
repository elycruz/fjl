import {length} from '../jsPlatform/object';
import {append} from './append';
import {sliceCopy} from './utils';

export const
    /**
     * Concatenates all the elements of a container of lists.
     * @haskellType `concat :: Foldable t => t [a] -> [a]`
     * @function module:list.concat
     * @param xs {Array}
     * @returns {Array}
     */
    concat = xs => {
        let item0;
        switch (length(xs)) {
            case undefined:
            case 0:
                return [];
            case 1:
                item0 = xs[0];
                return item0 && item0.slice ? sliceCopy(item0) : item0;
            case 2:
            default:
                return append(...xs);
        }
    }
;
