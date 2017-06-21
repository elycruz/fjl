/**
 * Created by elydelacruz on 2/19/2017.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Monad = require('./Monad');

var _Monad2 = _interopRequireDefault(_Monad);

var _subClass = require('../subClass');

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _errorIfNotTypeFactory = require('../errorIfNotTypeFactory');

var _errorIfNotTypeFactory2 = _interopRequireDefault(_errorIfNotTypeFactory);

var _is = require('../is');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ensureFunction = function ensureFunction(value) {
    return !(0, _is.isFunction)(value) ? function () {
        return value;
    } : value;
},
    errorIfNotType = (0, _errorIfNotTypeFactory2.default)('IO');

function IO(fn) {
    if (!(this instanceof IO)) {
        return IO.of(fn);
    }
    var _value = void 0;
    _Monad2.default.call(this);
    Object.defineProperty(this, 'value', {
        get: function get() {
            return _value;
        },
        set: function set(value) {
            errorIfNotType('value', value, Function);
            _value = value;
        },
        enumerable: true
    });
    this.value = ensureFunction(fn);
}

exports.default = (0, _subClass.subClass)(_Monad2.default, IO, {
    map: function map(fn) {
        return IO.of((0, _compose2.default)(fn, this.value));
    },
    do: function _do() {
        return this.value();
    }
}, {
    of: function of(fn) {
        return new IO(ensureFunction(fn));
    }
});
module.exports = exports['default'];