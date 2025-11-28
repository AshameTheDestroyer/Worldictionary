import { FC } from "react";
import { Button } from "./ui/button";
import { CloudOffIcon } from "lucide-react";
import { SpinnerIcon } from "./ui/spinner-icon";

export type StateDisplayProps<T> = {
    data?: T;
    isError: boolean;
    isLoading: boolean;
    refetch?: () => void;
    messages?: {
        error?: string;
        empty?: string;
        refetch?: string;
        loading?: string;
    };
};

export const StateDisplay = <T,>({
    data,
    refetch,
    isError,
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
                <p>{messages?.empty ?? "No data available."}</p>
            </div>
        );
    }

    return <></>;
};
