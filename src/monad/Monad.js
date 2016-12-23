/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Applicative from '../functor/Applicative';
import Chainable from '../functor/Chainable';
import {subClassOfMulti} from '../subClassOf';

export let Monad = subClassOfMulti ([Applicative, Chainable],
    function Monad (value) {
        if (!this) {
            return Monad.of(value);
        }
        Applicative.apply(this);
        Chainable.apply(this);
        this.value = value;
    },
    null,
    {
        of: function (value) {
            return new Monad(value);
        }
    });

export default Monad;
