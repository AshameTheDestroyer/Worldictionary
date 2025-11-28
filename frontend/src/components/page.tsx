import { cn } from "@/utils/cn";
import { FC, PropsWithChildren } from "react";

export type PageProps = {
    id?: string;
    className?: string;
    children?: PropsWithChildren["children"];
};

export const Page: FC<PageProps> = ({ id, children, className }) => {
    return (
        <main
            id={id}
            className={cn(
                "flex-1 flex flex-col gap-16 max-sm:gap-8 p-6 max-md:p-4 max-sm:p-2 -m-8",
                className
            )}
        >
            {children}
        </main>
    );
};
