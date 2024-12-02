import { Observable } from './Observable'
import { ReadableSignal } from './Signal';

declare interface State<T> {
    select<TSelector>(selector: (state: T) => TSelector): Function & Observable;
    update(key: keyof T, updater: ReadableSignal<T[keyof T]>): void;
    get(key: keyof T): any;
    set(key: keyof T, value: object | []): void;
    remove(key: keyof T): void;
}