import { useEffect, useState } from "react";

export function useResizeObserver<T extends HTMLElement | null | undefined>(
    element: T,
    callback?: (size: { width: number; height: number }) => void,
) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (element == null) {
            return;
        }

        const width = element.getBoundingClientRect().width;
        const height = element.getBoundingClientRect().height;

        callback?.({ width, height });

        const resizeObserver = new ResizeObserver(
            () => (
                setWidth(width),
                setHeight(height),
                callback?.({ width, height })
            ),
        );

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, [element]);

    return { width, height };
}
