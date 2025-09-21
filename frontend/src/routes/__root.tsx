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
            <Outlet />
            <TanStackRouterDevtools />
        </QueryClientProvider>
    );
}
