/**
 * Created by edlc on 12/9/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Functor = require('./Functor');

var _Functor2 = _interopRequireDefault(_Functor);

var _subClass = require('./../subClass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Applicable = (0, _subClass.subClass)(_Functor2.default, function Applicable(value) {
    if (!this) {
        return new Applicable(value);
    }
    _Functor2.default.call(this, value);
}, {
    ap: function ap(functor) {
        return functor.map(this.value);
    }
});

exports.default = Applicable;