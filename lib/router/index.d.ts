declare module "src/navigate" {
    /**
     * fires navigate event which triggers router to change the visible page
     * @param {string} path
     * @param {any} data
     */
    export function navigate(path: string, data?: any): void;
}
declare module "src/router-link" {
    export class RouterLink extends HTMLElement {
        static get observedAttributes(): string[];
        /**
        * When an element is added to the DOM, the connectedCallback method is triggered.
        * use instead OnInit
        */
        connectedCallback(): void;
        /**
        * is triggered when the element is removed from the DOM
        */
        disconnectedCallback(): void;
        /**
        * is triggered when an 'observedAttribute' is changed
        * define observedAttributes in static member 'observedAttributes'
        * @param {string} name
        * @param {string} oldValue
        * @param {string} newValue
        */
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        #private;
    }
}
declare module "src/router-outlet" {
    /** @typedef {import("../types/navigation-event-details").NavigationEventDetails} NavigationEventDetails */
    /** @typedef {import("../types/route").Route} Route */
    export class RouterOutlet extends HTMLElement {
        static get observedAttributes(): any[];
        set routes(value: Route[]);
        /**
        * When an element is added to the DOM, the connectedCallback method is triggered.
        * use instead OnInit
        */
        connectedCallback(): void;
        /**
        * is triggered when the element is removed from the DOM
        */
        disconnectedCallback(): void;
        /**
        * is triggered when an 'observedAttribute' is changed
        * define observedAttributes in static member 'observedAttributes'
        * @param {string} name
        * @param {string} oldValue
        * @param {string} newValue
        */
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        #private;
    }
    export type NavigationEventDetails = import("./types/navigation-event-details").NavigationEventDetails;
    export type Route = import("./types/route").Route;
}
declare module "index" {
    export * from "src/navigate";
    export function defineElements(): void;
}
