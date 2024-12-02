/** 
 *  @typedef {import("../types/route").Route} Route 
 *  @type {Array<Route>}
 */
export const routes = [
    {
        path: "/",
        content: () => /*html*/`<h1>Home</h1>`
    },
    {
        path: "/about",
        content: () => /*html*/`<h1>About</h1>`
    },
    {
        path: "/help",
        content: () => /*html*/`<h1>Help</h1>`
    }
];