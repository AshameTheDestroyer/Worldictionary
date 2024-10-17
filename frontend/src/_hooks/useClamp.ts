import { useEffect } from "react";

export function useClamp<T extends number | string | Date>(
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>,
    range?: { first: T; last: T },
) {
    useEffect(() => {
        if (range == null) {
            return;
        }

        if (value < range.first) {
            setValue(range.first);
        } else if (value > range.last) {
            setValue(range.last);
        }
    }, [value, range]);
}
