import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMyUser } from "@/contexts/my-user-provider";
import { ProfileForm } from "../components/profile-form";
import { useGetUserByUsername } from "@/services/user/useGetUserByUsername";
import { createFileRoute, Navigate, useParams } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

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

    const tabs = ["personal-information", "preferences"] as const;
    const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>(
        tabs[0]
    );
    const toTitleCase = useCallback(
        (text: string) =>
            text
                .replace(/-/g, " ")
                .replace(/\w*/g, (item) =>
                    item.length > 0 ? item[0].toUpperCase() + item.slice(1) : ""
                ),
        []
    );

    return (
        <Tabs
            className="place-self-center min-w-[50vw] flex flex-col gap-4"
            defaultValue={tabs[0]}
        >
            <TabsList className="flex gap-4">
                {tabs.map((tab, i) => (
                    <TabsTrigger
                        key={i}
                        value={tab}
                        asChild
                        onClick={(_e) => setSelectedTab(tab)}
                    >
                        <Button
                            variant={
                                selectedTab == tab ? "default" : "secondary"
                            }
                        >
                            {toTitleCase(tab)}
                        </Button>
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab, i) => (
                <TabsContent key={i} value={tab}>
                    <Card className="py-12 px-4 gap-8">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Edit {toTitleCase(tab)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                {
                                    "personal-information": (
                                        <ProfileForm user={user} />
                                    ),
                                    preferences: <></>,
                                }[tab]
                            }
                        </CardContent>
                    </Card>
                </TabsContent>
            ))}
        </Tabs>
    );
}
