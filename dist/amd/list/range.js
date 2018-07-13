define(['exports', '../function/curry'], function (exports, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.range = undefined;


    /**
     * Normalizes step for `from` and `to` combination.
     * @function module:list.normalizeStep
     * @param from {Number}
     * @param to {Number}
     * @param [step = 1] {Number}
     * @returns {Number}
     * @private
     */
    const normalizeStep = (from, to, step) => {
        if (from > to) {
            return step > 0 ? -step : step; // make step negative
        }
        return step < 0 ? -1 * step : step; // make step positive
    }; /**
        * @module object
        */
    const

    /**
     * @note normalizes `step` to be of valid
     *  direction (negative if range required is in the negative direction
     *  and positive otherwise).
     * @function module:list.range
     * @param from {Number}
     * @param to {Number}
     * @param [step = 1] {Number}
     * @returns {Array.<Number>}
     */
    range = exports.range = (0, _curry.curry)((from, to, step = 1) => {
        let i = from;
        const out = [];
        step = normalizeStep(from, to, step);
        if (step === 0 || from === to) {
            return [from];
        }
        for (; (to - i) * step >= 0; i += step) {
            out.push(i);
        }
        return out;
    });
});