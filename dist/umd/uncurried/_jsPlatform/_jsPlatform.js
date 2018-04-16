(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './_object', './_array', './_list', './_string', './_function'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./_object'), require('./_array'), require('./_list'), require('./_string'), require('./_function'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._object, global._array, global._list, global._string, global._function);
    global._jsPlatform = mod.exports;
  }
})(this, function (exports, _object, _array, _list, _string, _function) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_object).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _object[key];
      }
    });
  });
  Object.keys(_array).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _array[key];
      }
    });
  });
  Object.keys(_list).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _list[key];
      }
    });
  });
  Object.keys(_string).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _string[key];
      }
    });
  });
  Object.keys(_function).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _function[key];
      }
    });
  });
});