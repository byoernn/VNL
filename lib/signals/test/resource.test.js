import { effect } from "../src/effect";
import { resource } from "../src/resource";

describe("async function result delayed into signal", () => {
    test("execute async operation", async () => {
        //Arrange
        /** @type {()=>Promise<string>} */
        let heavyOperation = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("finished")
                }, 1000);
            });
        }
        let myResource = resource(heavyOperation, "");
        let finished = "";
        //Act
        effect(() => {
            finished = myResource();
        }, myResource);
        //Assert
        expect(finished).toBe("");
        //await operation to ensure we waited the same amount of time resource takes to complete
        await heavyOperation();
        expect(finished).toBe("finished");
    });
});