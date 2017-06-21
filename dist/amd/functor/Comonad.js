define(['exports', './Extend', '../subClass'], function (exports, _Extend, _subClass) {
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

    var _Extend2 = _interopRequireDefault(_Extend);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Comonad = (0, _subClass.subClass)(_Extend2.default, function Comonad(value) {
        if (!(this instanceof Comonad)) {
            return new Comonad(value);
        }
        _Extend2.default.call(this, value);
    }, {
        extract: function extract() {
            return this.value;
        }
    });

    exports.default = Comonad;
});