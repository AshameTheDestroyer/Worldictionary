import { Page } from "@/components/page";
import { Separator } from "@/components/ui/separator";
import { StateDisplay } from "@/components/state-display";
import { ProfileHeader } from "../components/profile-header";
import { useGetUserByUsername } from "@/services/user/useGetUserByUsername";
import { Outlet, useParams, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$username")({
    component: RouteComponent,
});

function RouteComponent() {
    const { username } = useParams({ from: "/profile/$username" });

    const userQuery = useGetUserByUsername(username);
    const user = userQuery.data;

    if (user == null) {
        return (
            <Page id="profile-page" className="place-content-center">
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
        <Page id="profile-page">
            <ProfileHeader user={user} />
            <Separator />
            <Outlet />
        </Page>
    );
}
