(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './jsPlatform/object', './object/prop', './object/typeOf', './object/copy', './object/is', './object/of', './object/searchObj', './object/assignDeep', './object/setTheory', './object/console', './object/errorThrowing', './object/jsonClone', './object/toArray', './object/assocList'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./jsPlatform/object'), require('./object/prop'), require('./object/typeOf'), require('./object/copy'), require('./object/is'), require('./object/of'), require('./object/searchObj'), require('./object/assignDeep'), require('./object/setTheory'), require('./object/console'), require('./object/errorThrowing'), require('./object/jsonClone'), require('./object/toArray'), require('./object/assocList'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object, global.prop, global.typeOf, global.copy, global.is, global.of, global.searchObj, global.assignDeep, global.setTheory, global.console, global.errorThrowing, global.jsonClone, global.toArray, global.assocList);
    global.object = mod.exports;
  }
})(this, function (exports, _object, _prop, _typeOf, _copy, _is, _of, _searchObj, _assignDeep, _setTheory, _console, _errorThrowing, _jsonClone, _toArray, _assocList) {
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
  Object.keys(_prop).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _prop[key];
      }
    });
  });
  Object.keys(_typeOf).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _typeOf[key];
      }
    });
  });
  Object.keys(_copy).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _copy[key];
      }
    });
  });
  Object.keys(_is).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _is[key];
      }
    });
  });
  Object.keys(_of).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _of[key];
      }
    });
  });
  Object.keys(_searchObj).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _searchObj[key];
      }
    });
  });
  Object.keys(_assignDeep).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _assignDeep[key];
      }
    });
  });
  Object.keys(_setTheory).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _setTheory[key];
      }
    });
  });
  Object.keys(_console).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _console[key];
      }
    });
  });
  Object.keys(_errorThrowing).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _errorThrowing[key];
      }
    });
  });
  Object.keys(_jsonClone).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _jsonClone[key];
      }
    });
  });
  Object.keys(_toArray).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _toArray[key];
      }
    });
  });
  Object.keys(_assocList).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _assocList[key];
      }
    });
  });
});