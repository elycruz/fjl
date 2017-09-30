(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './functionOps/apply', './functionOps/call', './functionOps/compose', './functionOps/curry', './functionOps/curry_', './functionOps/flip', './functionOps/id', './functionOps/negate', './functionOps/until'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./functionOps/apply'), require('./functionOps/call'), require('./functionOps/compose'), require('./functionOps/curry'), require('./functionOps/curry_'), require('./functionOps/flip'), require('./functionOps/id'), require('./functionOps/negate'), require('./functionOps/until'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.apply, global.call, global.compose, global.curry, global.curry_, global.flip, global.id, global.negate, global.until);
    global.functionOpsUncurried = mod.exports;
  }
})(this, function (exports, _apply, _call, _compose, _curry, _curry_, _flip, _id, _negate, _until) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_apply).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _apply[key];
      }
    });
  });
  Object.keys(_call).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _call[key];
      }
    });
  });
  Object.keys(_compose).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _compose[key];
      }
    });
  });
  Object.keys(_curry).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _curry[key];
      }
    });
  });
  Object.keys(_curry_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _curry_[key];
      }
    });
  });
  Object.keys(_flip).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _flip[key];
      }
    });
  });
  Object.keys(_id).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _id[key];
      }
    });
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
  Object.keys(_until).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _until[key];
      }
    });
  });
});