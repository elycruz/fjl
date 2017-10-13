/**
 * @module objectOps
 */
import {curry, curry2} from './uncurried/functionOps/curry_';

import {
    instanceOf as pureInstanceOf,
    hasOwnProperty as pureHasOwnProperty,
    assign as pureAssign
} from './uncurried/jsPlatform/object_';

import {assignDeep as pureAssignDeep} from './uncurried/objectOps/assignDeep_';

export {length, toString, keys} from './uncurried/jsPlatform/object_';

export const

    instanceOf = curry(pureInstanceOf),

    hasOwnProperty = curry(pureHasOwnProperty),

    assign = curry2(pureAssign),

    assignDeep = curry2(pureAssignDeep);

export * from './uncurried/objectOps/typeOf_';

export * from './objectOps/is';

export * from './uncurried/objectOps/of_';

export * from './objectOps/setTheory';
