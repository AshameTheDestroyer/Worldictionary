import { Page } from "@/components/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
    component: Index,
});

function Index() {
    return <Page className="bg-red-500">Hello "/home"!</Page>;
}
