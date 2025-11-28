import { FC } from "react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { SpinnerIcon } from "./ui/spinner-icon";
import { CloudOffIcon, SearchXIcon } from "lucide-react";

export type StateDisplayProps<T> = {
    data?: T;
    isError: boolean;
    isLoading: boolean;
    refetch?: () => void;
    onEmpty?: (() => void) | "redirect";
    messages?: {
        error?: string;
        empty?: string;
        refetch?: string;
        loading?: string;
        emptyAction?: string;
    };
};

export const StateDisplay = <T,>({
    data,
    refetch,
    isError,
    onEmpty,
    messages,
    isLoading,
}: StateDisplayProps<T>): ReturnType<FC> => {
    if (isError) {
        return (
            <div className="flex flex-col gap-4 place-items-center">
                <CloudOffIcon className="size-9 p-1" />
                <p>{messages?.error ?? "Unexpected error occurred!"}</p>
                {refetch != null && (
                    <Button onClick={refetch}>
                        {messages?.refetch ?? "Refetch"}
                    </Button>
                )}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 place-items-center">
                <SpinnerIcon className="size-9 p-1" />
                <p>{messages?.loading ?? "Currently loading data..."}</p>
            </div>
        );
    }

    if (data == null || (Array.isArray(data) && data.length === 0)) {
        return (
            <div className="flex flex-col gap-4 place-items-center">
                <SearchXIcon className="size-9 p-1" />
                <p>{messages?.empty ?? "No data available."}</p>
                {onEmpty == "redirect" ? (
                    <Button asChild>
                        <Link to="/">{messages?.emptyAction ?? "Go Home"}</Link>
                    </Button>
                ) : onEmpty != null ? (
                    <Button onClick={onEmpty}>
                        {messages?.emptyAction ?? "Take Action"}
                    </Button>
                ) : null}
            </div>
        );
    }

    return <></>;
};
