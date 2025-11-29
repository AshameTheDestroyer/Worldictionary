import { useMyUser } from "@/contexts/my-user-provider";
import { ProfileForm } from "../components/profile-form";
import { useGetUserByUsername } from "@/services/user/useGetUserByUsername";
import { createFileRoute, Navigate, useParams } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/profile/$username/settings")({
    component: RouteComponent,
});

function RouteComponent() {
    const { username } = useParams({ from: "/profile/$username/settings" });
    const { myUser, token } = useMyUser();

    const userQuery = useGetUserByUsername(username);
    const user = userQuery.data!;

    if (myUser == null || token == null) {
        return <Navigate to="/registration" search={{ mode: "login" }} />;
    }

    if (myUser.username != user.username) {
        return (
            <Navigate
                to="/profile/$username/settings"
                params={{ username: myUser.username.slice(1) }}
            />
        );
    }

    return (
        <Card className="py-12 px-4 gap-8 place-self-center min-w-[50vw]">
            <CardHeader>
                <CardTitle className="text-2xl">
                    Edit Profile Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ProfileForm user={user} />
            </CardContent>
        </Card>
    );
}
