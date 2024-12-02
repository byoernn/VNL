declare module "src/symbols" {
    export const observer: unique symbol;
    export const primitiveValue: unique symbol;
    export const objectValue: unique symbol;
}
declare module "src/observable" {
    /** @typedef {import("../types/Observable").Observable} Observable */
    /**
     * extends any object to be observable
     * @template T
     * @param {*} target
     * @returns { T & Observable}
     */
    export function observable<T>(target: any): T & Observable;
    export type Observable = import("./types/Observable").Observable;
}
declare module "src/computed" {
    /** @typedef {import("../types/Observable").Observable} Observable */
    /**
     * proxy target value to create an observable signal
     * @param {Function} compute
     * @param  {Array<Observable>} dependencies
     * @returns {Function & Observable}
     */
    export function computed(compute: Function, ...dependencies: Array<Observable>): Function & Observable;
    export type Observable = import("types/Observable").Observable;
}
declare module "src/effect" {
    /** @typedef {import("../types/Observable").Observable} Observable */
    /**
     * The effect function is used to create side effects that are triggered by changes in one or more observables.
     * @param {Function} effectHandler - the effect handler to be executed when dependencies change.
     * @param  {Array<Observable>} dependencies
     */
    export function effect(effectHandler: Function, ...dependencies: Array<Observable>): void;
    export type Observable = import("types/Observable").Observable;
}
declare module "src/signal" {
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
    export function signal<T>(target: T): Signal<T>;
    /**
     * <T>
     */
    export type Signal<T extends string> = import("types/Signal").Signal<T>;
}
declare module "index" {
    export { computed } from "./src/computed.js";
    export { effect } from "./src/effect.js";
    export { observable } from "./src/observable.js";
    export { signal } from "./src/signal.js";
}
