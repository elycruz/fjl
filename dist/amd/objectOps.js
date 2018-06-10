define(['exports', './uncurried/_objectOps/_objectOps', './uncurried/_jsPlatform/_object', './uncurried/_functionOps/_curry', './uncurried/_objectOps/_assignDeep', './uncurried/_objectOps/_setTheory'], function (exports, _objectOps, _object, _curry, _assignDeep2, _setTheory) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromAssocListOnKeys = exports.fromAssocListOnKey = exports.toAssocListOnKeys = exports.toAssocListOnKey = exports.isType = exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.prop = exports.keys = exports.length = undefined;
  Object.keys(_objectOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _objectOps[key];
      }
    });
  });
  Object.defineProperty(exports, 'length', {
    enumerable: true,
    get: function () {
      return _object.length;
    }
  });
  Object.defineProperty(exports, 'keys', {
    enumerable: true,
    get: function () {
      return _object.keys;
    }
  });
  const

  /**
   * Gives `undefined` or prop value if it is available.
   * @function module:objectOps.prop
   * @param propName {String}
   * @param obj {*} - Object to search.
   * @returns {*|undefined}
   * @curried
   */
  prop = exports.prop = (0, _curry.curry)(_objectOps._prop),


  /**
   * `instanceof` in function form.
   * @function module:objectOps.instanceOf
   * @param instance {*}
   * @param Type {Function}
   * @returns {Boolean}
   * @curried
   */
  instanceOf = exports.instanceOf = (0, _curry.curry)(_object._instanceOf),


  /**
   * `hasOwnProperty` as a method (takes object last).
   * @function module:objectOps.hasOwnProperty
   * @param propName {String}
   * @param obj {*} - Object to search.
   * @returns {Boolean}
   * @curried
   */
  hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_object._hasOwnProperty),


  /**
   * `Object.assign` if it is available else a shim.
   * @function module:objectOps.assign
   * @param [...obj]{Object} - One or more objects to merge onto first object.
   * @returns {Object}
   * @curried - Called after having two or more args
   */
  assign = exports.assign = (0, _curry.curry2)(_object._assign),


  /**
   * Same as `Object.assign` except does a deep merge.
   * @function module:objectOps.assignDeep
   * @param [...obj]{Object} - One or more objects to deep merge onto first object.
   * @returns {Object}
   * @curried - Called after having two or more args
   */
  assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep2._assignDeep),


  /**
   * Cartesian union for objects (operates on two objects).
   * @function module:objectOps.objUnion
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Unified obj.
   * @curried
   */
  objUnion = exports.objUnion = (0, _curry.curry)(_setTheory._objUnion),


  /**
   * Returns the cartesian intersection of two objects.
   * @function module:objectOps.objIntersect
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Intersection of given objects.
   * @curried
   */
  objIntersect = exports.objIntersect = (0, _curry.curry)(_setTheory._objIntersect),


  /**
   * Returns the cartesian difference of two objects.
   * @function module:objectOps.objDifference
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Difference of given objects.
   * @curried
   */
  objDifference = exports.objDifference = (0, _curry.curry)(_setTheory._objDifference),


  /**
   * Returns the cartesian complement of one or more objects on given object.
   * @function module:objectOps.objDifference
   * @param obj {Object}
   * @param [...obj]{Object} - One or more objects to calculate complement from.
   * @returns {Object} - Complement of given objects.
   * @curried
   */
  objComplement = exports.objComplement = (0, _curry.curry2)(_setTheory._objComplement),


  /**
   * Returns a boolean indicating whether a value is of given type or not.
   * @function module:objectOps.isType
   * @param Type {Function|String} - Constructor or constructor name
   * @param value {*}
   * @return {Boolean}
   */
  isType = exports.isType = (0, _curry.curry)(_objectOps._isType),
        toAssocListOnKey = exports.toAssocListOnKey = (0, _curry.curry2)(_objectOps._toAssocListOnKey),


  /**
   * Converts incoming object into an associated lists and all subsequent
   * objects values found at key that is one of given `keys`
   * @function module:objectOps.toAssocListOnKeys
   * @param keys {Array.<*>} - Usually `Array.<String>`.
   * @param obj {*} - Object to convert on.
   * @returns {any[]} - Associated list
   * @curried
   */
  toAssocListOnKeys = exports.toAssocListOnKeys = (0, _curry.curry2)(_objectOps._toAssocListOnKeys),
        fromAssocListOnKey = exports.fromAssocListOnKey = (0, _curry.curry2)(_objectOps._fromAssocListOnKey),
        fromAssocListOnKeys = exports.fromAssocListOnKeys = (0, _curry.curry2)(_objectOps._fromAssocListOnKeys);
});