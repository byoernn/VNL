import { inject } from "../src/inject.js";
import { injectable } from "../src/injectable.js";
import { IoC } from "../src/ioc.js"
describe("IoC Test", () => {
    test("register", () => {
        //Arrange
        IoC.register("test", () => { return "test" });
        //Act
        const result = IoC.resolve("test");
        //Assert
        expect(result).toBe("test");
    });
    test("throws error resolving unknown type", () => {
        //Arrange
        //Act
        const act = () => {
            IoC.resolve("unknown");
        }
        //Assert
        expect(act).toThrow(Error);
        expect(act).toThrow(`Type unknown is not registered in the container`);
    });
    test("singleton", () => {
        //Arrange
        IoC.registerSingleton("test", class { name = "test" });
        //Act
        const firstResolve = IoC.resolve("test");
        const secondResolve = IoC.resolve("test");
        secondResolve.name = "changed";
        //Assert
        expect(firstResolve.name).toBe(secondResolve.name);
    });
    test("injectable and inject", () => {
        //Arrange
        class TestClass { name = "test" }
        //Act
        let testClass = injectable(TestClass);
        let instance = inject(TestClass);
        //Assert
        expect(instance.name).toBe("test");
    });
});