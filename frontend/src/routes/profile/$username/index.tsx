import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

export const Route = createFileRoute("/profile/$username/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { username } = useParams({ from: "/profile/$username" });

    return (
        <Card className="max-w-[30rem]">
            <CardHeader>
                <CardTitle className="text-2xl">My Cards</CardTitle>
            </CardHeader>
            <CardContent>
                <p>You have 99 saved cards!</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" data-link asChild>
                    <Link to="/profile/$username/cards" params={{ username }}>
                        View Cards
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
