/**
 * Created by edlc on 12/9/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Monad = undefined;

var _Applicative = require('../functor/Applicative');

var _Applicative2 = _interopRequireDefault(_Applicative);

var _Chain = require('../functor/Chain');

var _Chain2 = _interopRequireDefault(_Chain);

var _subClass = require('../subClass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Monad = exports.Monad = (0, _subClass.subClassMulti)([_Applicative2.default, _Chain2.default], function Monad(value) {
    if (!(this instanceof Monad)) {
        return Monad.of(value);
    }
    _Applicative2.default.apply(this);
    _Chain2.default.apply(this);
    this.value = value;
}, null, {
    of: function of(value) {
        return new Monad(value);
    }
});

exports.default = Monad;