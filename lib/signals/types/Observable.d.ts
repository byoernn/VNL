import { observer } from "../src/symbols";

declare interface Observable {
    [observer]: Array<Function>;
    observe: (handler: Function) => void;
}