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
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "./ui/dropdown-menu";

export type HeaderProps = {
    id?: string;
    className?: string;
};

export const Header: FC<HeaderProps> = ({ id, className }) => {
    const { pathname } = useLocation();

    const { myUser, Logout, isLoggingOutPending, isGettingMyUserLoading } =
        useMyUser();

    return (
        <header
            id={id}
            className={cn(
                "flex justify-between flex-wrap-reverse items-center gap-4 -m-8 mb-0 p-8",
                className
            )}
        >
            <HistoryBreadcrumb className="w-screen" />
            <h1 className="text-3xl font-bold">Worldictionary</h1>
            <div className="flex gap-4 flex-1 place-content-end">
                {!isGettingMyUserLoading &&
                    !pathname.startsWith("/registration") &&
                    (myUser != null ? (
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
                                        to="/"
                                    >
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <Separator />
                                <DropdownMenuItem asChild>
                                    <Button
                                        className="w-full place-content-end!"
                                        variant="ghost"
                                        onClick={Logout}
                                        disabled={isLoggingOutPending}
                                    >
                                        <Spinner
                                            className={cn(
                                                "mr-auto",
                                                !isLoggingOutPending &&
                                                    "invisible"
                                            )}
                                            aria-hidden={!isLoggingOutPending}
                                        />
                                        Log out
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
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
                    ))}
                <ModeToggle />
            </div>
        </header>
    );
};
