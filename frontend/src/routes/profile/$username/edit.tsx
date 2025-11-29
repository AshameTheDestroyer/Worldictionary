import { ProfileForm } from "../components/profile-form";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useGetUserByUsername } from "@/services/user/useGetUserByUsername";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/profile/$username/edit")({
    component: RouteComponent,
});

function RouteComponent() {
    const { username } = useParams({ from: "/profile/$username/edit" });

    const userQuery = useGetUserByUsername(username);
    const user = userQuery.data!;

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
