import { format } from "date-fns";
import { Page } from "@/components/page";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SpinnerIcon } from "@/components/ui/spinner-icon";
import { ProfileForm } from "@/components/profile-form";
import { Role } from "../../../../src/schemas/UserSchema";
import { CopyableText } from "@/components/copyable-text";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { StateDisplay } from "@/components/state-display";
import { EditableAvatar } from "@/components/editable-avatar";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useGetUserByUsername } from "@/services/user/useGetUserByUsername";
import { Badge, CakeIcon, MarsIcon, StarIcon, VenusIcon } from "lucide-react";
import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

export const Route = createFileRoute("/profile/$username")({
    component: RouteComponent,
});

function RouteComponent() {
    const { username } = useParams({ from: "/profile/$username" });

    const {
        refetch,
        isError,
        isLoading,
        data: user,
    } = useGetUserByUsername(username);

    if (user == null || isLoading) {
        return (
            <Page id="profile-page" className="place-content-center">
                <StateDisplay
                    data={user}
                    refetch={refetch}
                    isError={isError}
                    isLoading={isLoading}
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
            <header className="flex gap-8 px-8 pt-8 place-items-center max-sm:place-items-start flex-wrap">
                <EditableAvatar
                    className="size-64 max-sm:size-32 [&_svg]:size-32 max-sm:[&_svg]:size-16 [&_.avatar-letter]:text-9xl max-sm:[&_.avatar-letter]:text-7xl"
                    user={user}
                />
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="font-bold text-4xl">
                            {user["first-name"]} {user["last-name"]}
                        </h2>
                        <CopyableText
                            className="text-xl"
                            text={user.username}
                            tooltip="Copy Username"
                            message="Username's been copied."
                        />
                    </div>

                    <CopyableText
                        text={user.email}
                        tooltip="Copy Email"
                        message="Email's been copied."
                    />

                    <div className="flex gap-2 flex-wrap">
                        {user.role == Role.admin && (
                            <Badge className="text-md bg-amber-500 text-white font-bold">
                                <StarIcon className="size-4! stroke-3" />
                                Admin
                            </Badge>
                        )}
                        {
                            {
                                male: (
                                    <Badge className="text-md bg-blue-500 text-white font-bold">
                                        <MarsIcon className="size-4! stroke-3" />
                                        Male
                                    </Badge>
                                ),
                                female: (
                                    <Badge className="text-md bg-pink-500 text-white font-bold">
                                        <VenusIcon className="size-4! stroke-3" />
                                        Female
                                    </Badge>
                                ),
                            }[user.gender]
                        }
                        {user.birthday != null && (
                            <Badge className="text-md bg-red-500 text-white font-bold">
                                <CakeIcon className="size-4! stroke-3" />
                                {format(user.birthday, "PPP")}
                            </Badge>
                        )}
                    </div>
                </div>
            </header>

            <Separator />

            <Card className="max-w-[30rem]">
                <CardTitle className="text-2xl">My Cards</CardTitle>
                <CardContent>
                    <p>You have 99 saved cards!</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" data-link asChild>
                        <Link to="/profile">View Cards</Link>
                    </Button>
                </CardFooter>
            </Card>
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
        </Page>
    );
}
