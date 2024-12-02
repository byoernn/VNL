import { Observable } from "./Observable";

declare interface ReadableWriteableSignal<T> extends ReadableSignal<T> {
    (value: Partial<T>): void;
    /** get the current value of this signal */
    (): T;
}
declare interface ReadableSignal<T> extends Observable {
    (): T;
}
export type Signal<T> = ReadableWriteableSignal<T> & T;