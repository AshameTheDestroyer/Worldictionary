import { Page } from "@/components/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
    component: Index,
});

function Index() {
    return <Page id="home-page">Welcome to "/home"!</Page>;
}
