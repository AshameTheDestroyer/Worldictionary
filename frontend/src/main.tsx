import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const router = createRouter({ routeTree });
const ROOT_ELEMENT = document.getElementById("root")!;

if (ROOT_ELEMENT.innerHTML != null) {
    const root = ReactDOM.createRoot(ROOT_ELEMENT);
    root.render(<RouterProvider router={router} />);
}
