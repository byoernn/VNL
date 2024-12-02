import { signal } from "../src/signal";
import { primitiveValue } from "../src/symbols";
/** @typedef {import("../types/Observable").Observable} Observable */
/** 
 * @template {*} T
 * @typedef {import("../types/Signal").Signal<T>} Signal<T>
 */

describe("Signal Test", () => {
    test("create signal string", () => {
        let value = signal("min signal");
        expect(value.length).toBe(10);
        expect(value()).toBe("min signal")
    });
    test("observer signal string", async () => {
        /** @type { Signal<string> }*/
        let value = signal("min signal");
        let wasObserved = false;
        value.observe(() => {
            wasObserved = true;
        });
        value("max"); //set new primitive value. only works if created with a primitive value

        expect(value.length).toBe(3);
        expect(wasObserved).toBe(true);
        expect(value.toString()).toBe("max")
    });
    test("create signal object", () => {
        let value = signal({ id: 0, displayName: "item" });
        expect(value.id).toBe(0);
        value({ id: 1 });
        expect(value().id).toBe(1)
    });
    test("observe signal object", () => {
        let value = signal({ id: 0, displayName: "item" });

        let wasObserved = false;
        value.observe(() => {
            wasObserved = true;
        });
        value.displayName = "item 1";

        expect(value.id).toBe(0);
        expect(wasObserved).toBe(true);
        expect(value.displayName).toBe("item 1");
    });
    test("delete property from signal object", () => {
        //Arrange
        /** @type {Signal<{id:number, displayName?: string}>} */
        let value = signal({ id: 0, displayName: "item" });
        //Act
        delete value.displayName;
        //Assert
        expect(value.displayName).toBeUndefined();
    });
});