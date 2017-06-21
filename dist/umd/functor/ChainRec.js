(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './Chain', '../subClass'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./Chain'), require('../subClass'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.Chain, global.subClass);
        global.ChainRec = mod.exports;
    }
})(this, function (module, exports, _Chain, _subClass) {
    /**
     * Created by elyde on 12/25/2016.
     */
    /**
     * Created by edlc on 12/9/16.
     */
    /**
     * Created by edlc on 12/9/16.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Chain2 = _interopRequireDefault(_Chain);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var ChainRec = (0, _subClass.subClass)(_Chain2.default, function ChainRec(value) {
        if (!(this instanceof ChainRec)) {
            return new ChainRec(value);
        }
        _Chain2.default.call(this, value);
    }, null, {
        // chainRec: (fn, aggregator) => {
        //     return fn(next, done, aggregator);
        // }
    });

    exports.default = ChainRec;
    module.exports = exports['default'];
});