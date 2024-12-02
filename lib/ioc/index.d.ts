declare module "src/container" {
    export class Container {
        /**
         * registers any function to the container.
         * the typeName is used to retrieve the instance later.
         * @param {string} typeName
         * @param {Function} factory
         */
        register(typeName: string, factory: Function): void;
        /**
         * registers a singleton type in the container.
         * The typeName is used to retrieve the singleton instance later.
         * @template T
         * @param {string} typeName
         * @param {new () => T} objectType
         */
        registerSingleton<T>(typeName: string, objectType: new () => T): void;
        /**
         * registers a transient type to the container.
         * Transient objects are created every time they are resolved.
         * The typeName is used to retrieve the transient instance later.
         * @template T
         * @param {string} typeName
         * @param {new () => T} objectType
         */
        registerTransient<T>(typeName: string, objectType: new () => T): void;
        /**
         * resolves an object from the container by type name.
         * @param {string} typeName
         * @returns
         */
        resolve(typeName: string): any;
        #private;
    }
}
declare module "src/ioc" {
    /**
     * singleton IoC class that holds all instances of classes and functions.
     */
    export class IoC {
        /** @type {IoC | null} */
        static "__#2@#INSTANCE": IoC | null;
        static get "__#2@#instance"(): IoC;
        /**
         * adds a new named container for scoped IoC instances.
         * @param {string} scopeName
         */
        static addScope(scopeName: string): void;
        /**
         * registers any function to the container.
         * the typeName is used to retrieve the instance later.
         * @param {string} typeName
         * @param {Function} factory
         * @param {string=} scope - optional parameter to use a different container than the default one.
         */
        static register(typeName: string, factory: Function, scope?: string | undefined): void;
        /**
         * registers a singleton type in the container.
         * The typeName is used to retrieve the singleton instance later.
         * @template T
         * @param {string} typeName
         * @param {new () => T} objectType
         * @param {string=} scope - optional parameter to use a different container than the default one.
         */
        static registerSingleton<T>(typeName: string, objectType: new () => T, scope?: string | undefined): void;
        /**
         * registers a transient type to the container.
         * Transient objects are created every time they are resolved.
         * The typeName is used to retrieve the transient instance later.
         * @template T
         * @param {string} typeName
         * @param {new () => T} objectType
         * @param {string=} scope - optional parameter to use a different container than the default one.
         */
        static registerTransient<T>(typeName: string, objectType: new () => T, scope?: string | undefined): void;
        /**
         * resolves an object from the container by type name.
         * @param {string} typeName
         * @param {string=} scope - optional parameter to use a different container than the default one.
         * @returns
         */
        static resolve(typeName: string, scope?: string | undefined): any;
        /**
         *
         * @param {string} scopeName
         * @returns {Container}
         */
        getScope(scopeName: string): Container;
        #private;
    }
    import { Container } from "src/container";
}
declare module "src/inject" {
    /**
     * provides easy access to the ioc container and
     * resolves the objectType by its name.
     * @template T
     * @param {new () => T} objectType
     * @param {string=} scope - optional parameter to use a different container than the default one.
     * @returns {T}
     */
    export function inject<T>(objectType: new () => T, scope?: string | undefined): T;
}
declare module "src/injectable" {
    /**
     * provides easy access to the ioc container and
     * registers the objectType by its name.
     * @template T
     * @param {new () => T} objectType
     * @param {{transient?:boolean;scope?:string}=} options - optional parameters for the registration.
     * @returns {new () => T}
     */
    export function injectable<T>(objectType: new () => T, options?: {
        transient?: boolean;
        scope?: string;
    } | undefined): new () => T;
}
declare module "index" {
    export * from "src/ioc";
    export * from "src/container";
    export * from "src/inject";
    export * from "src/injectable";
}
