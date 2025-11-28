import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
    component: Index,
});

function Index() {
    return <div>Hello "/home"!</div>;
}
