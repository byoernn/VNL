import { computed } from "../src/computed";
import { signal } from "../src/signal";

describe("computed with a single signal", () => {
    test("create", () => {
        let item = signal({ id: 0, displayName: "item" });
        /** @type {any} */
        let helloItem = computed(() => {
            return `Hallo ${item.displayName}`;
        }, item);
        expect(helloItem()).toBe("Hallo item");
    });
    test("recomputation", () => {
        let item = signal({ id: 0, displayName: "item" });

        let helloItem = computed(() => {
            return `Hallo ${item.displayName}`;
        }, item);
        expect(helloItem()).toBe("Hallo item");
        item.displayName = "world";
        expect(helloItem()).toBe("Hallo world");
    });
    test("observer", () => {
        let item = signal({ id: 0, displayName: "item" });
        /** @type {any} */
        let helloItem = computed(() => {
            return `Hallo ${item.displayName}`;
        }, item);
        expect(helloItem()).toBe("Hallo item");

        let wasObserved = false;
        helloItem.observe(() => {
            wasObserved = true;
        });

        item.displayName = "world";
        expect(helloItem()).toBe("Hallo world");
        expect(wasObserved).toBe(true);
    });
})