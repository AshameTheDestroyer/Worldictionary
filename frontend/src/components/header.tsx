import { FC } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./mode-toggle";
import { useMyUser } from "./my-user-provider";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { HistoryBreadcrumb } from "./history-breadcrumb";
import { Link, useLocation } from "@tanstack/react-router";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "./ui/dropdown-menu";

import WorldictionaryIcon from "@/assets/icons/worldictionary.svg?react";

export type HeaderProps = {
    id?: string;
    className?: string;
};

export const Header: FC<HeaderProps> = ({ id, className }) => {
    const { pathname } = useLocation();

    const {
        token,
        myUser,
        Logout,
        isLoggingOutPending,
        isGettingMyUserLoading,
    } = useMyUser();

    return (
        <header
            id={id}
            className={cn(
                "flex justify-between sticky top-0 z-50 flex-wrap-reverse items-center gap-4 -m-8 mb-8 px-8 pt-8 pb-4 bg-white/60 dark:bg-black/60 backdrop-blur-md dark:border-white/30 border-black/30 border-b",
                className
            )}
        >
            <HistoryBreadcrumb className="w-screen" />
            <Link className="flex gap-2 place-items-center" to="/">
                <WorldictionaryIcon />
                <h1 className="text-3xl font-bold">Worldictionary</h1>
            </Link>
            <div className="flex gap-4 flex-1 place-content-end">
                {!pathname.startsWith("/registration") &&
                    (token == null ? (
                        <div className="flex gap-2">
                            <Link
                                to="/registration"
                                search={{ mode: "signup" }}
                            >
                                <Button variant="secondary">Sign up</Button>
                            </Link>
                            <Link to="/registration" search={{ mode: "login" }}>
                                <Button>Login</Button>
                            </Link>
                        </div>
                    ) : myUser != null && !isGettingMyUserLoading ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="size-9">
                                    <AvatarFallback className="bg-emerald-500">
                                        {myUser["first-name"][0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link
                                        className="w-full place-content-end!"
                                        to="/profile"
                                    >
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
                    ) : (
                        <Tooltip>
                            <TooltipTrigger>
                                <Spinner className="text-emerald-500 size-9 p-1" />
                            </TooltipTrigger>
                            <TooltipContent>Avatar's loading...</TooltipContent>
                        </Tooltip>
                    ))}
                <ModeToggle />
            </div>
        </header>
    );
};
