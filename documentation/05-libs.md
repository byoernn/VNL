# Vanilla implementations for advanced app development

Free tu fork an use them as local npm packages

## Router

also see lib/router/demo for testet implementation:

```html
<nav>
  <router-link path="/">
    <button type="button">Home</button>
  </router-link>
  <router-link path="/about">
    <button type="button">About</button>
  </router-link>
  <router-link path="/help">
    <button type="button">Help</button>
  </router-link>
</nav>
<main>
  <router-outlet></router-outlet>
</main>
<script type="module">
  import { routes } from "/demo/route-config.js";
  document.addEventListener("DOMContentLoaded", () => {
    let router = document.querySelector("router-outlet");
    router.routes = routes;
  });
</script>
```

#### RouteConfig:

A Route is defined by

1. `path: string` Path of the Route
2. `content: ()=>string` Function to return the html template wich will be shown by router-outlet

route-config example:

```javascript
export const routes = [
  {
    path: "/",
    content: () => /*html*/ `<h1>Home</h1>`,
  },
  {
    path: "/about",
    content: () => /*html*/ `<h1>About</h1>`,
  },
  {
    path: "/help",
    content: () => /*html*/ `<h1>Help</h1>`,
  },
];
```

Use `<router-link path="">` or `navigate(path)` to trigger a navigation event the router-outlet will respond to.

## IOC

also see lib/ioc/test for all testet implementations.

Usage Example:

```javascript
class TestClass {
  name = "test";
}
injectable(TestClass);
...
let instance = inject(TestClass);
```

classes or factories can be registered as Transient or Singleton in an container.

## Signals

also see lib/signals/test for all testet implementations.

Signals Primitives or Complex values:

```javascript
//create primitive value signal
/** @type { Signal<string> }*/
let value = signal("min signal");
//update primitive value signal
value("max");

//create complex object signal
let value = signal({ id: 0, displayName: "item" });
//update object
value({ id: 1 });
//thanks to Proxy we can just assign a new value to trigger an update
value.displayName = "item 1";
//update by delete a property
delete value.displayName;
```

computed:

```javascript
let item = signal({ id: 0, displayName: "item" });
/** @type {ReadableSignal<any>} */
let helloItem = computed(() => {
  return `Hallo ${item.displayName}`;
}, item);
// helloItem => "Hallo item"
item.displayName = "world";
// helloItem => "Hallo world"
```

effect:
Method invoced when observed signal changes

```javascript
let item = signal({ id: 0, displayName: "item" });
let itemId = null;

effect(() => {
  itemId = item.id;
}, item);
//itemId => 0
item.id = 1;
//itemId => 1
```

resource:
use like a signal to await asynchonus tasks.
For example loading data into an State.

```javascript
let heavyOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("finished");
    }, 1000);
  });
};
let myResource = resource(heavyOperation, "");
```

state:
Utility to Select,Set,Get,Update,Delete State with signals

```javascript
let myState = new State({ id: 0, displayName: "item" });
let selectId = myState.select((state) => state.id);
myState.get("id"); // 0

/** @type {Signal<number>} */
let idSignal = signal(1); // this could be a resource
myState.update("id", idSignal);
myState.get("id"); // 1

idSignal(2); //set update to update state
myState.get("id"); // 2
```

[Previous](04-setup-jsproj.md)
