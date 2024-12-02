import { signal } from "./signal";
/** 
 * @template T
 * @typedef {import("../types/Signal").Signal<T>} Signal<T>
 */

/**
 * executes an async function und result will be written into the signal
 * @template T
 * @param {()=>Promise<T>} query 
 * @param {T} defaultValue  
 * @returns {Signal<T>}
 */
export function resource(query, defaultValue) {
    /** @type {Signal<T>} */
    let result = signal(defaultValue);
    (async () => {
        let queryResult = await query();
        result(queryResult);
    })();
    return result;
}