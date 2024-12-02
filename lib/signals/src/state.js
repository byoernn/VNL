import { computed } from "./computed";
import { effect } from "./effect";
import { signal } from "./signal";
/** 
 * @template TSignal
 * @typedef {import("../types/Signal").Signal<TSignal>} Signal<TSignal>
 */
/**
 * @template TRSignal
 * @typedef {import("../types/Signal").ReadableSignal<TRSignal>} ReadableSignal<TRSignal>
 */
/** @typedef {import("../types/Observable").Observable} Observable */
/** 
 * @template TState
 * @typedef {import("../types/State").State<TState>} IState<TState> 
 */

/** 
 * @template {{[name: string]: any}} T
 * @implements {IState<T>}
 */
export class State {
    /** @type {Signal<T>} */
    #state;

    /**
     * @param {T} initialState 
     */
    constructor(initialState) {
        this.#state = signal(initialState)
    }

    /**
     * create a computed to select part of the state
     * @template TSelector
     * @param {(state: T) => TSelector} selector
     * @returns {Function & Observable}
     */
    select(selector) {
        return computed(() => selector(this.#state()), this.#state);
    }

    /**
     * binds an entry of the state to be updated by a signal
     * @param {keyof T} key 
     * @param {ReadableSignal<T[keyof T]>} updater 
     */
    update(key, updater) {
        effect(() => {
            this.#state[key] = /**@type {Signal<T>[keyof T]} */(updater());
        }, updater);
    }

    /**
     * @param {keyof T} key
     */
    get(key) {
        return this.#state[key];
    }

    /**
     * @param {keyof T} key 
     * @param {*} value
     * @returns {void}
     */
    set(key, value) {
        this.#state[key] = value;
    }

    /**
     * @param {keyof T} key
     * @returns {void}
     */
    remove(key) {
        delete this.#state[key];
    }
}