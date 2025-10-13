import { FC } from "react";
import {
    Sidebar,
    SidebarGroup,
    SidebarFooter,
    SidebarHeader,
    SidebarContent,
} from "./ui/sidebar";
import { useMyUser } from "./my-user-provider";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { CopyableText } from "./copyable-text";
import { Separator } from "./ui/separator";

export const AppSidebar: FC = () => {
    const { myUser } = useMyUser();

    return (
        <Sidebar className="[&>*]:p-4">
            {myUser != null && (
                <SidebarHeader className="pb-2 flex flex-col gap-4">
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

            {myUser != null && <Separator />}

            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>

            <Separator />

            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
};
