import toast from "react-hot-toast";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ScreenSizeProvider } from "./components/screen-size-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./global.css";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
        mutations: {
            onError: (error: any) =>
                toast.error(error?.response?.data?.message ?? error?.message),
        },
    },
});

const router = createRouter({ routeTree });
const ROOT_ELEMENT = document.getElementById("root")!;

if (ROOT_ELEMENT.innerHTML != null) {
    const root = ReactDOM.createRoot(ROOT_ELEMENT);
    root.render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                defaultTheme="system"
                storageKey="worldictionary-theme"
            >
                <ScreenSizeProvider>
                    <RouterProvider router={router} />
                </ScreenSizeProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
