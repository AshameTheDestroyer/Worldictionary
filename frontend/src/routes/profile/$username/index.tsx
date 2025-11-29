import { Button } from "@/components/ui/button";
import { useMyUser } from "@/contexts/my-user-provider";
import { createFileRoute } from "@tanstack/react-router";
import { Link, Navigate, useParams } from "@tanstack/react-router";
import { useGetUserByUsername } from "@/services/user/useGetUserByUsername";
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
    const { myUser, token } = useMyUser();

    const userQuery = useGetUserByUsername(username);
    const user = userQuery.data!;

    if (myUser == null || token == null) {
        return <Navigate to="/registration" search={{ mode: "login" }} />;
    }

    return (
        <Card className="max-w-[30rem]">
            <CardHeader>
                <CardTitle className="text-2xl">
                    {myUser.username.slice(1) == username
                        ? "My Cards"
                        : `${user["first-name"]}'s Cards`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    {myUser.username.slice(1) == username
                        ? "You have 99 saved cards!"
                        : `${user["first-name"]} has 99 saved cards!`}
                </p>
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
