(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/objectOpsUncurried'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/objectOpsUncurried'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectOpsUncurried);
    global.instanceOf = mod.exports;
  }
})(this, function (exports, _objectOpsUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'instanceOf', {
    enumerable: true,
    get: function () {
      return _objectOpsUncurried.instanceOf;
    }
  });
});