(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.version = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
   * Generated Mon May 01 2017 18:17:22 GMT-0400 (EDT) 
   */

  var version = exports.version = '0.9.5';

  exports.default = version;
});