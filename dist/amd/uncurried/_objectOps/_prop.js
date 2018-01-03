define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @memberOf _objectOps_
   */

  /**
   * Returns property value if found; Else `undefined`.
   * @function module:_objectOps.prop
   * @param name {String} - Key to search on `obj`
   * @param obj {Object} - Object to search `name` on.
   * @returns {*}
   */
  const prop = exports.prop = (name, obj) => obj[name];
});