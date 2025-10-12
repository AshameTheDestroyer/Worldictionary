import {
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = PropsWithChildren<{
    storageKey?: string;
    defaultTheme?: Theme;
}>;

export type ThemeProviderState = {
    theme: Theme;
    isDarkTheme: boolean;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    isDarkTheme:
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : false,
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme == "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        isDarkTheme:
            theme == "dark" ||
            (theme == "system" &&
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches),
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
