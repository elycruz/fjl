'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by elyde on 12/6/2016.
 */
var createSymbol = function createSymbol(value) {
    return Symbol ? Symbol(value) : value;
},
    createFjlSymbol = function createFjlSymbol(key) {
    return createSymbol('@@fjl/' + key);
};

exports.default = Object.freeze(['equals', 'concat', 'empty', 'map', 'ap', 'of', 'alt', 'zero', 'reduce', 'traverse', 'chain', 'chainRec', 'extend', 'extract', 'bimap', 'promap', 'placeholder'].reduce(function (agg, key) {
    Object.defineProperty(agg, key, {
        value: createFjlSymbol(key),
        enumerable: true
    });
    return agg;
}, {
    createFjlSymbol: createFjlSymbol,
    createSymbol: createSymbol
}));