import { FC } from "react";
import { cn } from "@/utils/cn";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";

export type ActionButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

export const ActionButton: FC<ActionButtonProps> = ({
    id,
    children,
    className,
    ...props
}) => {
    return (
        <Button
            id={id}
            className={cn(
                "rounded-full absolute bottom-8 right-8 shadow-2xl aspect-square size-14 [&>svg]:size-6!",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    );
};
