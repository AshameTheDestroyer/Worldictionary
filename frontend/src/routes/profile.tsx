import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Role } from "../../../src/schemas/UserSchema";
import { ProfileForm } from "@/components/profile-form";
import { useMyUser } from "@/components/my-user-provider";
import { CopyableText } from "@/components/copyable-text";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/profile")({
    component: RouteComponent,
});

function RouteComponent() {
    const { myUser, token, isGettingMyUserLoading } = useMyUser();

    if (token == null) {
        return <Navigate to="/registration" search={{ mode: "login" }} />;
    }

    if (myUser == null || isGettingMyUserLoading) {
        return (
            <main className="flex-1 flex place-content-center place-items-center">
                <div className="flex flex-col gap-4 place-items-center">
                    <Spinner className="size-9 p-1" />
                    <p>Currently loading profile...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col gap-16 max-sm:gap-8 p-8 max-sm:p-4">
            <header className="flex gap-8 place-items-center max-sm:place-items-start max-sm:flex-wrap">
                <Avatar className="size-64 max-sm:size-16">
                    <AvatarFallback className="bg-emerald-500 text-9xl max-sm:text-4xl">
                        {myUser["first-name"][0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="font-bold text-4xl">
                            {myUser["first-name"]} {myUser["last-name"]}
                        </h2>
                        <CopyableText
                            className="text-xl"
                            text={myUser.username}
                            tooltip="Copy Username"
                            message="Username's been copied."
                        />
                    </div>

                    <CopyableText
                        text={myUser.email}
                        tooltip="Copy Email"
                        message="Email's been copied."
                    />

                    {myUser.role == Role.admin && (
                        <Badge className="text-md bg-amber-500 text-white font-bold">
                            <StarIcon className="size-4! stroke-3" />
                            Admin
                        </Badge>
                    )}
                </div>
            </header>
            <Separator />
            <Card className="py-12 px-4 gap-8 place-self-center min-w-[50vw]">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Edit Profile Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ProfileForm user={myUser} />
                </CardContent>
            </Card>
        </main>
    );
}
