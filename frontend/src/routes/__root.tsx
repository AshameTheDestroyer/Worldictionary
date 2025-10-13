import { Toaster } from "react-hot-toast";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { useTheme } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MyUserProvider } from "@/components/my-user-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useScreenSize } from "@/components/screen-size-provider";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    const { isDarkTheme } = useTheme();
    const { isScreenSize } = useScreenSize();

    return (
        <MyUserProvider>
            <SidebarProvider>
                <AppSidebar />

                <main
                    id="page"
                    className="p-8 flex-1 min-h-screen flex flex-col bg-gradient-to-b from-white dark:from-black via-emerald-500 from-25% via-90% dark:to-emerald-200 to-emerald-700"
                >
                    <Header />
                    <Outlet />
                </main>

                <TanStackRouterDevtools />
                <Toaster
                    position={
                        isScreenSize["max-sm"]
                            ? "bottom-center"
                            : "bottom-right"
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
            </SidebarProvider>
        </MyUserProvider>
    );
}
