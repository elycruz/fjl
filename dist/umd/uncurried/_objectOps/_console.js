(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global._console = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var

  /**
   * `Console.log` method.
   * @function module:objectOps.log
   * @params args {...*}
   * @returns {void}
   */
  log = exports.log = console.log.bind(console),


  /**
   * `Console.error` method.
   * @function module:objectOps.error
   * @params args {...*}
   * @returns {void}
   */
  error = exports.error = console.error.bind(console),


  /**
   * Peeks at incoming value(s) and returns the last value.
   * @function module:objectOps.peek
   * @param args {...*}
   * @returns {*} - Last given value (if one or more values) else first value.
   */
  peek = exports.peek = function peek() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return log.apply(undefined, args), args.pop();
  };
});