import { RouterLink } from "./src/router-link.js";
import { RouterOutlet } from "./src/router-outlet.js";

export * from "./src/navigate.js"
export let defineElements = () => {
    if (!customElements.get("router-outlet")) customElements.define("router-outlet", RouterOutlet);
    if (!customElements.get("router-link")) customElements.define("router-link", RouterLink);
}