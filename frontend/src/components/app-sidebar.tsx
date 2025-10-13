import { FC } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "@tanstack/react-router";
import { useMyUser } from "./my-user-provider";
import { CopyableText } from "./copyable-text";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { HomeIcon, UserRoundIcon } from "lucide-react";
import {
    Sidebar,
    useSidebar,
    SidebarGroup,
    SidebarFooter,
    SidebarHeader,
    SidebarContent,
} from "./ui/sidebar";

export const AppSidebar: FC = () => {
    const { myUser } = useMyUser();

    const { open, isMobile } = useSidebar();

    return (
        <Sidebar
            className="dark:border-white/30 border-black/30"
            collapsible="icon"
        >
            {myUser != null && (open || isMobile) && (
                <SidebarHeader className="flex flex-col gap-4">
                    <div className="flex place-items-center gap-2">
                        <Avatar className="size-10">
                            <AvatarFallback className="bg-emerald-500">
                                {myUser["first-name"][0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1 translate-y-1">
                            <b className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[10rem]">
                                {myUser["first-name"]} {myUser["last-name"]}
                            </b>
                            <CopyableText
                                className="text-xs [&>button>svg]:size-3! [&>button>svg]:stroke-3 gap-0 [&>p]:overflow-hidden [&>p]:whitespace-nowrap [&>p]:text-ellipsis [&>p]:max-w-[8rem]"
                                text={myUser.username}
                                tooltip="Copy Username"
                                message="Username's been copied."
                            />
                        </div>
                    </div>
                    <CopyableText
                        className="text-sm [&>button>svg]:size-4! gap-0 [&>p]:overflow-hidden [&>p]:whitespace-nowrap [&>p]:text-ellipsis"
                        text={myUser.email}
                        tooltip="Copy Email"
                        message="Email's been copied."
                    />
                </SidebarHeader>
            )}

            {myUser != null && (open || isMobile) && <Separator />}

            <SidebarContent
                className={cn(
                    "[&_[data-link]]:place-content-start [&_[data-link]]:-mx-2",
                    !open &&
                        !isMobile &&
                        "[&_[data-link]_p]:hidden [&_[data-link]]:place-content-center [&_[data-link]]:size-8 [&_[data-link]]:mx-0 [&_[data-link]_svg]:size-6!"
                )}
            >
                <SidebarGroup className="space-y-2">
                    <Button data-link asChild variant="ghost">
                        <Link to="/">
                            <HomeIcon />
                            <p>Home</p>
                        </Link>
                    </Button>
                    <Button data-link asChild variant="ghost">
                        <Link to="/profile">
                            <UserRoundIcon />
                            <p>Profile</p>
                        </Link>
                    </Button>
                </SidebarGroup>
            </SidebarContent>

            <Separator />

            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
};
