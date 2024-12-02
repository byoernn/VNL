/** @typedef {import("../types/navigation-event-details").NavigationEventDetails} NavigationEventDetails */
/** @typedef {import("../types/route").Route} Route */

export class RouterOutlet extends HTMLElement {
    static get observedAttributes() { return []; }

    /** @type {Array<Route>}} */
    #routes = [];
    set routes(/** @type {Array<Route>}} */value) {
        this.#routes = value;
        this.#renderRoute();
    }

    constructor() { super(); }

    #renderRoute() {
        let activeRoute = this.#routes.find((route) => route.path === window.location.pathname);
        if (activeRoute) {
            this.innerHTML = new DOMParser().parseFromString(activeRoute.content(), "text/html").body.innerHTML;
        }
        console.warn("active route not found for", window.location.pathname);
    }

    /**
    * When an element is added to the DOM, the connectedCallback method is triggered.
    * use instead OnInit
    */
    connectedCallback() {
        //browsers back and forth navigation
        window.onpopstate = () => {
            this.#renderRoute();
        }
        //navigation is requested
        window.addEventListener('navigate', (event) => {
            /** @type {NavigationEventDetails} */
            const details = (/**@type {CustomEvent}*/(event).detail)
            history.pushState(details.data, details.path, window.location.origin + details.path);
            this.#renderRoute();
        });
    }

    /**
    * is triggered when the element is removed from the DOM 
    */
    disconnectedCallback() { }

    /**
    * is triggered when an 'observedAttribute' is changed
    * define observedAttributes in static member 'observedAttributes'
    * @param {string} name
    * @param {string} oldValue
    * @param {string} newValue
    */
    attributeChangedCallback(name, oldValue, newValue) { }
}