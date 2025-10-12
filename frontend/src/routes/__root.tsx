import { Toaster } from "react-hot-toast";
import { Header } from "@/components/header";
import { useTheme } from "@/components/theme-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useScreenSize } from "@/components/screen-size-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    const { isDarkTheme } = useTheme();
    const { isScreenSize } = useScreenSize();

    return (
        <QueryClientProvider client={queryClient}>
            <TanStackRouterDevtools />
            <main className="p-8 min-h-screen flex flex-col bg-gradient-to-b from-white dark:from-black via-emerald-500 from-25% via-90% dark:to-emerald-200 to-emerald-700">
                <Header />
                <Outlet />
            </main>
            <Toaster
                position={
                    isScreenSize["max-sm"] ? "bottom-center" : "bottom-right"
                }
                toastOptions={{
                    duration: 5000,
                    removeDelay: 1000,
                    style: {
                        color: isDarkTheme ? "white" : "black",
                        backgroundColor: isDarkTheme ? "black" : "white",
                    },
                    error: {
                        position: "top-center",
                    },
                    success: {
                        position: "top-center",
                    },
                    loading: {
                        position: "top-center",
                    },
                }}
            />
        </QueryClientProvider>
    );
}
