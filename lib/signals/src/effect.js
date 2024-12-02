
/** @typedef {import("../types/Observable").Observable} Observable */

/**
 * The effect function is used to create side effects that are triggered by changes in one or more observables.
 * @param {Function} effectHandler - the effect handler to be executed when dependencies change.
 * @param  {Array<Observable>} dependencies
 */
export function effect(effectHandler, ...dependencies) {
    //execute the effect handler once initially to set up initial state
    effectHandler();

    //execute the effect handler when any dependency changes
    for (const dependecy of dependencies) {
        dependecy.observe(() => {
            effectHandler();
        });
    }
}