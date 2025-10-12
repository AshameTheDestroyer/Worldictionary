import { FC } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { ModeToggle } from "./mode-toggle";
import { useMyUser } from "./my-user-provider";
import { HistoryBreadcrumb } from "./history-breadcrumb";
import { Link, useLocation } from "@tanstack/react-router";

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
                    !pathname.startsWith("/registration") && (
                        <div className="flex gap-2">
                            {myUser != null ? (
                                <Button
                                    variant="secondary"
                                    onClick={Logout}
                                    disabled={isLoggingOutPending}
                                >
                                    {isLoggingOutPending && <Spinner />}Log out
                                </Button>
                            ) : (
                                <>
                                    <Link
                                        to="/registration"
                                        search={{ mode: "signup" }}
                                    >
                                        <Button variant="secondary">
                                            Sign up
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/registration"
                                        search={{ mode: "login" }}
                                    >
                                        <Button>Login</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                <ModeToggle />
            </div>
        </header>
    );
};
