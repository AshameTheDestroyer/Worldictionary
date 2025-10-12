import toast from "react-hot-toast";
import { CopyCheckIcon } from "lucide-react";

export function useClipboard(message: string = "Text's been copied.") {
    function CopyToClipboard(text: string | undefined) {
        if (text == null) {
            return;
        }

        navigator.clipboard.writeText(text);
        toast(message, {
            icon: <CopyCheckIcon />,
        });
    }

    return { CopyToClipboard };
}
