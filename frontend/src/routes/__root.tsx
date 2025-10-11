import { Header } from "@/components/header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <TanStackRouterDevtools />
            <main className="p-8 min-h-screen flex flex-col bg-gradient-to-b from-white dark:from-black via-emerald-500 from-25% via-90% dark:to-emerald-200 to-emerald-700">
                <Header />
                <Outlet />
            </main>
        </QueryClientProvider>
    );
}
