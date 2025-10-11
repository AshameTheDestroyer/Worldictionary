import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import "./global.css";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const router = createRouter({ routeTree });
const ROOT_ELEMENT = document.getElementById("root")!;

if (ROOT_ELEMENT.innerHTML != null) {
    const root = ReactDOM.createRoot(ROOT_ELEMENT);
    root.render(
        <ThemeProvider defaultTheme="system" storageKey="worldictionary-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
