import { observable } from "./observable";
import { objectValue, observe, observer, primitiveValue } from "./symbols";
/** 
 * @template {string} T
 * @typedef {import("../types/Signal").Signal<T>} Signal<T>
 */

/**
 * proxy target value to create an observable signal
 * @template T
 * @param {T} target
 * @returns { Signal<T> }
 */
export function signal(target) {
    //wrap primitive value
    /** @type {any} */
    let value = function () { };
    if (target === Object(target))
        value[objectValue] = target;
    else
        value[primitiveValue] = target
    //make it observable
    value = observable(value);

    // 2. Create a proxy to handle changes
    return new Proxy(value, {
        get: (target, prop) => {
            let newTarget;
            if (prop == observe) {
                return Reflect.get(target, prop).bind(target);
            }
            if (Reflect.has(target, primitiveValue)) {
                newTarget = Reflect.get(target, primitiveValue);
            }
            if (Reflect.has(target, objectValue)) {
                newTarget = Reflect.get(target, objectValue);
            }
            let returnValue = newTarget[prop];
            return (typeof returnValue === 'function') ? returnValue.bind(newTarget) : returnValue;
        },
        set(target, prop, newValue) {
            let newTarget;
            if (Reflect.has(target, primitiveValue)) {
                newTarget = Reflect.get(target, primitiveValue);
            }
            if (Reflect.has(target, objectValue)) {
                newTarget = Reflect.get(target, objectValue);
            }
            let success = Reflect.set(newTarget, prop, newValue);
            if (success) {
                //notifiy value changed
                for (const handler of target[observer]) {
                    handler();
                }
            }
            return success;
        },
        deleteProperty(target, prop) {
            let newTarget;
            if (Reflect.has(target, objectValue)) {
                newTarget = Reflect.get(target, objectValue);
            }
            let success = Reflect.deleteProperty(newTarget, prop);
            if (success) {
                //notifiy value changed
                for (const handler of target[observer]) {
                    handler();
                }
            }
            return success;
        },
        apply: (target, thisArg, args) => {
            if (args.length == 1) {
                //set update target value
                let success = false;
                let newValue = args[0];
                let isObject = (newValue === Object(newValue));
                if (isObject && Reflect.has(target, objectValue)) {
                    const newTarget = Reflect.get(target, objectValue);
                    for (const [key, value] of Object.entries(newValue)) {
                        success = Reflect.set(newTarget, key, value);
                        if (!success) break;
                    }
                } else if (!isObject && Reflect.has(target, primitiveValue)) {
                    success = Reflect.set(target, primitiveValue, newValue);
                }
                if (success) {
                    //notifiy value changed
                    for (const handler of target[observer]) {
                        handler();
                    }
                }
            } else if (args.length == 0) {
                //return value
                if (Reflect.has(target, primitiveValue)) {
                    return Reflect.get(target, primitiveValue);
                }
                if (Reflect.has(target, objectValue)) {
                    return Reflect.get(target, objectValue);
                }
                return target;
            }
        }
    });
}
let a = signal("test");