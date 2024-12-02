import { Container } from "./container";
/**
 * singleton IoC class that holds all instances of classes and functions.
 */
export class IoC {
    /** @type {IoC | null} */
    static #INSTANCE = null;
    static get #instance() {
        return this.#INSTANCE ??= new IoC();
    }

    /** @type {Container} */
    #container = new Container();
    /** @type {Map<string, Container>}  */
    #scope = new Map();

    /**
     * adds a new named container for scoped IoC instances.
     * @param {string} scopeName 
     */
    static addScope(scopeName) {
        IoC.#instance.#scope.set(scopeName, new Container());
    }

    /**
     * 
     * @param {string} scopeName 
     * @returns {Container}
     */
    getScope(scopeName) {
        let scope = this.#scope.get(scopeName);
        if (!scope)
            throw new Error(`Scope ${scopeName} not found`);
        return scope;
    }


    /**
     * registers any function to the container.
     * the typeName is used to retrieve the instance later.
     * @param {string} typeName 
     * @param {Function} factory
     * @param {string=} scope - optional parameter to use a different container than the default one.
     */
    static register(typeName, factory, scope) {
        const instance = IoC.#instance;
        if (scope) {
            const scopeContainer = instance.getScope(scope);
            scopeContainer.register(typeName, factory);
        }
        else {
            instance.#container.register(typeName, factory);
        }
    }
    /**
     * registers a singleton type in the container.
     * The typeName is used to retrieve the singleton instance later.
     * @template T
     * @param {string} typeName 
     * @param {new () => T} objectType 
     * @param {string=} scope - optional parameter to use a different container than the default one.
     */
    static registerSingleton(typeName, objectType, scope) {
        const instance = IoC.#instance;
        if (scope) {
            const scopeContainer = instance.getScope(scope);
            scopeContainer.registerSingleton(typeName, objectType);
        }
        else {
            instance.#container.registerSingleton(typeName, objectType);
        }
    }
    /**
     * registers a transient type to the container. 
     * Transient objects are created every time they are resolved.
     * The typeName is used to retrieve the transient instance later.
     * @template T
     * @param {string} typeName 
     * @param {new () => T} objectType 
     * @param {string=} scope - optional parameter to use a different container than the default one.
     */
    static registerTransient(typeName, objectType, scope) {
        const instance = IoC.#instance;
        if (scope) {
            const scopeContainer = instance.getScope(scope);
            scopeContainer.registerTransient(typeName, objectType);
        }
        else {
            instance.#container.registerTransient(typeName, objectType);
        }
    }

    /**
     * resolves an object from the container by type name.
     * @param {string} typeName 
     * @param {string=} scope - optional parameter to use a different container than the default one.
     * @returns 
     */
    static resolve(typeName, scope) {
        const instance = IoC.#instance;
        if (scope) {
            const scopeContainer = instance.getScope(scope);
            return scopeContainer.resolve(typeName);
        }
        else {
            return instance.#container.resolve(typeName);
        }
    }
}