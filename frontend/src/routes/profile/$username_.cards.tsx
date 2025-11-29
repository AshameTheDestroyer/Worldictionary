import { PlusIcon } from "lucide-react";
import { Page } from "@/components/shared/page";
import { useMyUser } from "@/contexts/my-user-provider";
import { ActionButton } from "@/components/shared/action-button";
import { StateDisplay } from "@/components/shared/state-display";
import { useGetUserByUsername } from "@/services/user/useGetUserByUsername";
import { createFileRoute, Navigate, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$username_/cards")({
    component: RouteComponent,
});

function RouteComponent() {
    const { username } = useParams({ from: "/profile/$username_/cards" });
    const { myUser, token } = useMyUser();

    if (myUser == null || token == null) {
        return <Navigate to="/registration" search={{ mode: "login" }} />;
    }

    const userQuery = useGetUserByUsername(username);
    const user = userQuery.data;

    if (user == null) {
        return (
            <Page id="cards-page" className="place-content-center">
                <StateDisplay
                    {...userQuery}
                    onEmpty="redirect"
                    messages={{
                        refetch: "Retry",
                        empty: "User profile not found.",
                        loading: "Loading user profile...",
                        error: "Failed to load user profile.",
                    }}
                />
            </Page>
        );
    }

    return (
        <Page id="cards-page">
            <h1 className="text-2xl font-bold">
                {myUser.username.slice(1) == username
                    ? "My Cards"
                    : `${user["first-name"]}'s Cards`}
            </h1>

            {myUser.username.slice(1) == username && (
                <ActionButton>
                    <PlusIcon />
                </ActionButton>
            )}
        </Page>
    );
}
