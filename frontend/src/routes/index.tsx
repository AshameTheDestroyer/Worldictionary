import { ModeToggle } from "@/components/mode-toggle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="p-8">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Worldictionary</h1>
                <ModeToggle />
            </header>
        </div>
    );
}
