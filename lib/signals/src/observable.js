import { observe, observer } from "./symbols";
/** @typedef {import("../types/Observable").Observable} Observable */

/**
 * extends any object to be observable
 * @template T
 * @param {*} target
 * @returns { T & Observable}
 */
export function observable(target) {
    //extend target to be observable
    target[observer] = [];

    /**
     * observe signal on value changes
     * @param {observer} handler 
     */
    target[observe] = function (handler) {
        this[observer].push(handler);
    };

    return target;
}