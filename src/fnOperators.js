/**
 * Created by u067265 on 5/1/17.
 */

export let

    call = (fn, x, ...args) => fn.call(x, ...args),

    apply = (fn, x, argsArray) => fn.apply(x, argsArray);

export default {
    call,
    apply
};
