import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <main className="p-8">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Worldictionary</h1>
                <div className="flex gap-4">
                    <div className="flex gap-2">
                        <Link to="/registration" search={{ mode: "signup" }}>
                            <Button variant="secondary">Sign up</Button>
                        </Link>
                        <Link to="/registration" search={{ mode: "login" }}>
                            <Button>Login</Button>
                        </Link>
                    </div>
                    <ModeToggle />
                </div>
            </header>
        </main>
    );
}
