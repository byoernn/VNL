import { effect } from "../src/effect";
import { signal } from "../src/signal";

describe("computed with a single signal", () => {
    test("recomputation", () => {
        //Arrange
        let item = signal({ id: 0, displayName: "item" });
        let itemId = null;
        //Act
        effect(() => {
            itemId = item.id;
        }, item);
        //Assert
        expect(itemId).toBe(0);
        item.id = 1;
        expect(itemId).toBe(1);
    });
});