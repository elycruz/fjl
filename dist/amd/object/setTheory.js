define(['exports', './assignDeep', '../jsPlatform/object', '../list', '../function/curry'], function (exports, _assignDeep, _object, _list, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;
    const objUnion = exports.objUnion = (0, _curry.curry)((obj1, obj2) => (0, _assignDeep.assignDeep)(obj1, obj2)),
          objIntersect = exports.objIntersect = (0, _curry.curry)((obj1, obj2) => (0, _list.foldl)((agg, key) => {
        if ((0, _object.hasOwnProperty)(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, (0, _object.keys)(obj1))),
          objDifference = exports.objDifference = (0, _curry.curry)((obj1, obj2) => (0, _list.foldl)((agg, key) => {
        if (!(0, _object.hasOwnProperty)(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, (0, _object.keys)(obj1))),
          objComplement = exports.objComplement = (obj0, ...objs) => (0, _list.foldl)((agg, obj) => (0, _assignDeep.assignDeep)(agg, objDifference(obj, obj0)), {}, objs);
});