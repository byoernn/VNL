import { navigate } from "./navigate.js";

export class RouterLink extends HTMLElement {
    static get observedAttributes() { return ["path"]; }

    /**@type {ShadowRoot} */
    #shadowRoot;

    #styles = /*css*/`
        :host{
            display: inline;
        }
    `;

    #html = /*html*/`
        <slot></slot>
    `;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'closed' });
        let stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(this.#styles);
        this.#shadowRoot.adoptedStyleSheets = [stylesheet];
        this.#shadowRoot.innerHTML = this.#html;
    }

    /**
    * When an element is added to the DOM, the connectedCallback method is triggered.
    * use instead OnInit
    */
    connectedCallback() {
        this.#shadowRoot.addEventListener("click", () => {
            if (this.hasAttribute("path")) {
                let path = this.getAttribute("path");
                if (path) {
                    this.addEventListener("click", () => navigate(path));
                }
            }
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
    attributeChangedCallback(name, oldValue, newValue) {
    }
}