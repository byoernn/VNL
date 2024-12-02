import { IoC } from "./ioc.js";

/**
 * provides easy access to the ioc container and
 * registers the objectType by its name.
 * @template T
 * @param {new () => T} objectType
 * @param {{transient?:boolean;scope?:string}=} options - optional parameters for the registration.
 * @returns {new () => T}
 */
export function injectable(objectType, options) {
    if (options?.transient) {
        IoC.registerTransient(objectType.name, objectType, options?.scope);
    } else {
        IoC.registerSingleton(objectType.name, objectType, options?.scope);
    }
    return objectType;
}