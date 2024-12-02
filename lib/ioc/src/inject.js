import { IoC } from "./ioc.js";

/**
 * provides easy access to the ioc container and
 * resolves the objectType by its name.
 * @template T
 * @param {new () => T} objectType
 * @param {string=} scope - optional parameter to use a different container than the default one.
 * @returns {T}
 */
export function inject(objectType, scope) {
    return IoC.resolve(objectType.name, scope);
}