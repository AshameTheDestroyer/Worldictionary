declare global {
    interface Array<T> {
        /** Reorders two indices in the array without mutating it, and returns the new mutated array. */
        reorder(from: number, to: number): Array<T>;
    }
}

Array.prototype.reorder = function <T>(from: number, to: number) {
    const this_ = this as Array<T>;
    return this_.filter((_, i) => i != from).withInserted(to, this_[from]);
};
