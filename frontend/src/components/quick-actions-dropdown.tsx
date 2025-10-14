import { FC } from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";
import { Link } from "@tanstack/react-router";
import { useMyUser } from "./my-user-provider";
import { HTTPManager } from "@/managers/HTTPManager";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "./ui/dropdown-menu";

export const QuickActionsDropdown: FC = () => {
    const { myUser, Logout, isLoggingOutPending, isGettingMyUserLoading } =
        useMyUser();

    if (myUser == null || isGettingMyUserLoading) {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <Spinner className="text-emerald-500 size-9 p-1" />
                </TooltipTrigger>
                <TooltipContent>Avatar's loading...</TooltipContent>
            </Tooltip>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="size-9">
                    <AvatarImage
                        src={`${HTTPManager.defaults.baseURL}files/${myUser.image}`}
                    />
                    <AvatarFallback className="bg-emerald-500">
                        {myUser["first-name"][0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link className="w-full place-content-end!" to="/profile">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                    onClick={Logout}
                    disabled={isLoggingOutPending}
                >
                    <Spinner
                        className={cn(
                            "mr-auto",
                            !isLoggingOutPending && "invisible"
                        )}
                        aria-hidden={!isLoggingOutPending}
                    />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
