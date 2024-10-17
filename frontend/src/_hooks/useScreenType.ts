import { useEffect, useState } from "react";

export function useScreenType() {
    const [screenType, setScreenType] = useState({
        isXs: false,
        isSm: false,
        isMd: false,
        isLg: false,
        isXl: false,
        screenWidth: 0,
    });

    useEffect(() => {
        function UpdateScreenType() {
            const width = window?.innerWidth ?? 0;

            setScreenType({
                isXs: width < 640,
                isSm: width >= 576 && width < 768,
                isMd: width >= 768 && width < 1024,
                isLg: width >= 1024 && width < 1280,
                isXl: width >= 1280,
                screenWidth: width,
            });
        }

        UpdateScreenType();
        window?.addEventListener("resize", UpdateScreenType);

        return () => {
            window?.removeEventListener("resize", UpdateScreenType);
        };
    }, []);

    return screenType;
}
