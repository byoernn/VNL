/**
 * fires navigate event which triggers router to change the visible page
 * @param {string} path 
 * @param {any} data 
 */
export function navigate(path, data = {}) {
    window.dispatchEvent(new CustomEvent("navigate", { detail: { path, data } }));
}