import { FC } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { ModeToggle } from "./shared/mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { useMyUser } from "../contexts/my-user-provider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { HistoryBreadcrumb } from "./shared/history-breadcrumb";
import { Link, useLocation } from "@tanstack/react-router";
import { QuickActionsDropdown } from "./quick-actions-dropdown";

import WorldictionaryIcon from "@/assets/icons/worldictionary.svg?react";

export type HeaderProps = {
    id?: string;
    className?: string;
};

export const Header: FC<HeaderProps> = ({ id, className }) => {
    const { pathname } = useLocation();

    const { token } = useMyUser();
    const isMobile = useIsMobile();

    return (
        <header
            id={id}
            className={cn(
                "flex justify-between sticky top-0 z-50 flex-wrap-reverse items-center gap-6 -m-8 mb-8 px-8 pt-8 pb-4 bg-white/60 dark:bg-black/60 backdrop-blur-md dark:border-white/30 border-black/30 border-b",
                className
            )}
        >
            <div className="flex gap-4 place-items-center w-full">
                {isMobile && !pathname.startsWith("/registration") && (
                    <SidebarTrigger />
                )}
                <HistoryBreadcrumb />
            </div>
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
                    ) : (
                        <QuickActionsDropdown />
                    ))}
                <ModeToggle />
            </div>
        </header>
    );
};
