import { computed } from "../src/computed";
import { effect } from "../src/effect";
import { signal } from "../src/signal";
import { State } from "../src/state";
/** 
 * @template T
 * @typedef {import("../types/Signal").Signal<T>} Signal<T>
 */

describe("signal state", () => {
    test("select and update state", () => {
        //Arrange
        let myState = new State({ id: 0, displayName: "item" });
        let selectId = myState.select((state) => state.id)
        let wasObserved = -1;
        //Act
        effect(() => {
            wasObserved = selectId();
        }, selectId);
        //Assert
        expect(wasObserved).toBe(0);
        myState.set("id", 1);
        expect(wasObserved).toBe(1);
    });
    test("update signal and computed", () => {
        //Arrange
        let myState = new State({ id: 0, displayName: "item" });
        /** @type {Signal<number>} */
        let idSignal = signal(1);
        let displayNameSignal = computed(() => `item-${idSignal()}`, idSignal);
        //Act
        myState.update("id", idSignal);
        myState.update("displayName", displayNameSignal);
        //Assert
        expect(myState.get("id")).toBe(1);
        expect(myState.get("displayName")).toBe("item-1");
        //Act again
        idSignal(2);
        //Assert
        expect(myState.get("id")).toBe(2);
        expect(myState.get("displayName")).toBe("item-2");
    });
});