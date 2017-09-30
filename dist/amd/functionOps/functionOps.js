define(['exports', './call', './apply', './compose', './curry', '../uncurried/functionOps/negate', './id', './flip', './until'], function (exports, _call, _apply, _compose, _curry, _negate, _id, _flip, _until) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'call', {
    enumerable: true,
    get: function () {
      return _call.call;
    }
  });
  Object.defineProperty(exports, 'apply', {
    enumerable: true,
    get: function () {
      return _apply.apply;
    }
  });
  Object.defineProperty(exports, 'compose', {
    enumerable: true,
    get: function () {
      return _compose.compose;
    }
  });
  Object.defineProperty(exports, 'curry', {
    enumerable: true,
    get: function () {
      return _curry.curry;
    }
  });
  Object.defineProperty(exports, 'curryN', {
    enumerable: true,
    get: function () {
      return _curry.curryN;
    }
  });
  Object.defineProperty(exports, 'curry2', {
    enumerable: true,
    get: function () {
      return _curry.curry2;
    }
  });
  Object.defineProperty(exports, 'curry3', {
    enumerable: true,
    get: function () {
      return _curry.curry3;
    }
  });
  Object.defineProperty(exports, 'curry4', {
    enumerable: true,
    get: function () {
      return _curry.curry4;
    }
  });
  Object.defineProperty(exports, 'curry5', {
    enumerable: true,
    get: function () {
      return _curry.curry5;
    }
  });
  Object.defineProperty(exports, '__', {
    enumerable: true,
    get: function () {
      return _curry.__;
    }
  });
  Object.defineProperty(exports, 'curry_', {
    enumerable: true,
    get: function () {
      return _curry.curry_;
    }
  });
  Object.defineProperty(exports, 'curryN_', {
    enumerable: true,
    get: function () {
      return _curry.curryN_;
    }
  });
  Object.defineProperty(exports, 'curry2_', {
    enumerable: true,
    get: function () {
      return _curry.curry2_;
    }
  });
  Object.defineProperty(exports, 'curry3_', {
    enumerable: true,
    get: function () {
      return _curry.curry3_;
    }
  });
  Object.defineProperty(exports, 'curry4_', {
    enumerable: true,
    get: function () {
      return _curry.curry4_;
    }
  });
  Object.defineProperty(exports, 'curry5_', {
    enumerable: true,
    get: function () {
      return _curry.curry5_;
    }
  });
  Object.keys(_negate).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _negate[key];
      }
    });
  });
  Object.defineProperty(exports, 'id', {
    enumerable: true,
    get: function () {
      return _id.id;
    }
  });
  Object.defineProperty(exports, 'flip', {
    enumerable: true,
    get: function () {
      return _flip.flip;
    }
  });
  Object.defineProperty(exports, 'flipN', {
    enumerable: true,
    get: function () {
      return _flip.flipN;
    }
  });
  Object.defineProperty(exports, 'until', {
    enumerable: true,
    get: function () {
      return _until.until;
    }
  });
});