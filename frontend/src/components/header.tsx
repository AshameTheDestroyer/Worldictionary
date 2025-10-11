import { FC } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "@tanstack/react-router";
import { HistoryBreadcrumb } from "./history-breadcrumb";

export type HeaderProps = {
    id?: string;
    className?: string;
};

export const Header: FC<HeaderProps> = ({ id, className }) => {
    return (
        <header
            id={id}
            className={cn(
                "flex justify-between flex-wrap-reverse items-center gap-4 -m-8 mb-auto p-8",
                className
            )}
        >
            <HistoryBreadcrumb className="w-screen " />
            <h1 className="text-3xl font-bold">Worldictionary</h1>
            <div className="flex gap-4 flex-1 place-content-end">
                <div className="flex gap-2">
                    <Link to="/registration" search={{ mode: "signup" }}>
                        <Button variant="secondary">Sign up</Button>
                    </Link>
                    <Link to="/registration" search={{ mode: "login" }}>
                        <Button>Login</Button>
                    </Link>
                </div>
                <ModeToggle />
            </div>
        </header>
    );
};
