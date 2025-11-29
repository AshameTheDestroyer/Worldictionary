import { useMyUser } from "@/contexts/my-user-provider";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { myUser, token } = useMyUser();

    if (token == null || myUser == null) {
        return <Navigate to="/registration" search={{ mode: "login" }} />;
    }

    return (
        <Navigate
            to="/profile/$username"
            params={{ username: myUser.username.slice(1) }}
        />
    );
}
