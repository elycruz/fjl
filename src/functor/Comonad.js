/**
 * Created by edlc on 12/9/16.
 */
/**
 * Created by edlc on 12/9/16.
 */
/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Applicable from './Applicable';
import {subClassOf} from './../subClassOf';

let Chainable = subClassOf (Applicable,
    function Chainable (value) {
        if (!this) {
            return new Chainable(value);
        }
        Applicable.call(this, value);
    }, {
        join: function () {
            return this.value instanceof this.constructor ?
                this.value : new this.constructor(this.value);
        },

        chain: function (fn) {
            return this.map(fn).join();
        }
    });

export default Chainable;
