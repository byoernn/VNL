import { observable } from "./observable";
import { computedValue, isDirty, observe, observer } from "./symbols";
/** @typedef {import("../types/Observable").Observable} Observable */
/** 
 * @template TSignal
 * @typedef {import("../types/Signal").ReadableSignal<TSignal>} ReadableSignal<TSignal>
 * */

/**
 * proxy target value to create an observable signal
 * @template T
 * @param {Function} compute
 * @param  {Array<Observable>} dependencies 
 * @returns {ReadableSignal<T>}
 */
export function computed(compute, ...dependencies) {
    /** @type {ReadableSignal<T> & {[computedValue]:any,[isDirty]:boolean}} */
    let target = observable(compute);
    target[isDirty] = true;
    target[computedValue] = null;

    let proxy = new Proxy(target, {
        get: (target, prop) => {
            if (prop == observe) {
                return Reflect.get(target, prop).bind(target);
            }
        },
        set: (target, prop, newValue) => {
            if (prop == isDirty) return Reflect.set(target, prop, newValue);
            return false;
        },
        apply: (target, thisArg, args) => {
            if (target[isDirty]) {
                Reflect.set(target, computedValue, target());
                Reflect.set(target, isDirty, false);
            }
            return Reflect.get(target, computedValue);
        }
    });

    for (const dependecy of dependencies) {
        //recalculate if dependent signal changes
        dependecy.observe(() => {
            proxy[isDirty] = true;
            //notifiy computedValue changed
            for (const handler of target[observer]) {
                handler();
            }
        });
    }

    return proxy;
}