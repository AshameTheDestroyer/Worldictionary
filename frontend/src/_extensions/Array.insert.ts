declare global {
    interface Array<T> {
        /** Inserts items at a specific index in the array, thus mutating it. */
        insert(index: number, ...items: Array<T>): void;
    }
}

Array.prototype.insert = function <T>(index: number, ...items: Array<T>) {
    const this_ = this as Array<T>;
    this_.splice(index, 0, ...items);
};
