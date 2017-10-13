'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object_ = require('./jsPlatform/object_');

Object.keys(_object_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _object_[key];
    }
  });
});

var _array_ = require('./jsPlatform/array_');

Object.keys(_array_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _array_[key];
    }
  });
});

var _list_ = require('./jsPlatform/list_');

Object.keys(_list_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _list_[key];
    }
  });
});

var _string_ = require('./jsPlatform/string_');

Object.keys(_string_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _string_[key];
    }
  });
});

var _function_ = require('./jsPlatform/function_');

Object.keys(_function_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _function_[key];
    }
  });
});