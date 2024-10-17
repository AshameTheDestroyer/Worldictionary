declare global {
    interface Array<T> {
        /** Inserts items at specific index in the array without mutating it, and returns the new mutated array. */
        withInserted(index: number, ...items: Array<T>): Array<T>;
    }
}

Array.prototype.withInserted = function <T>(index: number, ...items: Array<T>) {
    const this_ = this as Array<T>;
    return this_.toSpliced(index, 0, ...items);
};
