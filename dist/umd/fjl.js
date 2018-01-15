(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './objectOps', './booleanOps', './functionOps', './listOps', './stringOps', '../src-generated/version'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./objectOps'), require('./booleanOps'), require('./functionOps'), require('./listOps'), require('./stringOps'), require('../src-generated/version'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectOps, global.booleanOps, global.functionOps, global.listOps, global.stringOps, global.version);
    global.fjl = mod.exports;
  }
})(this, function (exports, _objectOps, _booleanOps, _functionOps, _listOps, _stringOps, _version) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_objectOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _objectOps[key];
      }
    });
  });
  Object.keys(_booleanOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _booleanOps[key];
      }
    });
  });
  Object.keys(_functionOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _functionOps[key];
      }
    });
  });
  Object.keys(_listOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _listOps[key];
      }
    });
  });
  Object.keys(_stringOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _stringOps[key];
      }
    });
  });
  Object.defineProperty(exports, 'version', {
    enumerable: true,
    get: function () {
      return _version.version;
    }
  });
});