import { FC } from "react";
import { cn } from "@/utils/cn";
import { CopyIcon } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type CopyableTextProps = {
    id?: string;
    text: string;
    tooltip?: string;
    message?: string;
    className?: string;
};

export const CopyableText: FC<CopyableTextProps> = ({
    id,
    text,
    message,
    className,
    tooltip = "Copy Text",
}) => {
    const { CopyToClipboard } = useClipboard(message);

    return (
        <div id={id} className={cn("flex gap-2", className)}>
            <p>{text}</p>
            <Tooltip>
                <TooltipTrigger
                    className="cursor-pointer p-1.5 -translate-y-1 aspect-square"
                    onClick={(_e) => CopyToClipboard(text)}
                >
                    <CopyIcon className="size-5!" />
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        </div>
    );
};
