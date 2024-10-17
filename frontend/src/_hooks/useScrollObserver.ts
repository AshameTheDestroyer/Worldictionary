import { useEffect, useState } from "react";

export function useScrollObserver<T extends HTMLElement | null | undefined>(
    element: T,
    callback?: (offset: { top: number; left: number }) => void,
) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        if (element == null) {
            return;
        }

        function OnScroll() {
            const top = element!.scrollTop;
            const left = element!.scrollLeft;

            setTop(top);
            setLeft(left);
            callback?.({ top, left });
        }

        OnScroll();

        element.addEventListener("scroll", OnScroll);

        return () => {
            element.removeEventListener("scroll", OnScroll);
        };
    }, [element]);

    return { top, left };
}
