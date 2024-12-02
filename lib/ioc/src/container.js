export class Container {
    /** @type {Map<string, function>} */
    #provider = new Map();
    #providedInstances = new Map();

    /**
     * registers any function to the container.
     * the typeName is used to retrieve the instance later.
     * @param {string} typeName 
     * @param {Function} factory
     */
    register(typeName, factory) {
        this.#provider.set(typeName, factory);
    }
    /**
     * registers a singleton type in the container.
     * The typeName is used to retrieve the singleton instance later.
     * @template T
     * @param {string} typeName 
     * @param {new () => T} objectType 
     */
    registerSingleton(typeName, objectType) {
        this.register(typeName, () => {
            if (!this.#providedInstances.has(typeName)) {
                this.#providedInstances.set(typeName, new objectType());
            }
            return this.#providedInstances.get(typeName);
        });
    }
    /**
     * registers a transient type to the container. 
     * Transient objects are created every time they are resolved.
     * The typeName is used to retrieve the transient instance later.
     * @template T
     * @param {string} typeName 
     * @param {new () => T} objectType 
     */
    registerTransient(typeName, objectType) {
        this.register(typeName, () => new objectType());
    }

    /**
     * resolves an object from the container by type name.
     * @param {string} typeName 
     * @returns 
     */
    resolve(typeName) {
        const factory = this.#provider.get(typeName);
        if (!factory)
            throw new Error(`Type ${typeName} is not registered in the container`);
        return factory();
    }

}