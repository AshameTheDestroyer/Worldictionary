import { PlusIcon } from "lucide-react";
import { Page } from "@/components/page";
import { createFileRoute } from "@tanstack/react-router";
import { ActionButton } from "@/components/action-button";

export const Route = createFileRoute("/home")({
    component: Index,
});

function Index() {
    return (
        <Page>
            <ActionButton>
                <PlusIcon className="stroke-3" />
            </ActionButton>
        </Page>
    );
}
