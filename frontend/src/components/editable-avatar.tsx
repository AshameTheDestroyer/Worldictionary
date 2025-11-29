import { cn } from "@/utils/cn";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { FC, useRef, useState } from "react";
import { SpinnerIcon } from "./ui/spinner-icon";
import { HTTPManager } from "@/managers/HTTPManager";
import { CameraIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserWithoutPasswordDTO } from "../../../src/schemas/UserSchema";
import { usePatchMyUserImage } from "@/services/user/usePatchMyUserImage";
import { useDeleteMyUserImage } from "@/services/user/useDeleteMyUserImage";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogFooter,
    DialogContent,
    DialogTrigger,
    DialogDescription,
} from "./ui/dialog";

export type EditableAvatarProps = {
    id?: string;
    className?: string;
    nonEditable?: boolean;
    user: UserWithoutPasswordDTO;
};

export const EditableAvatar: FC<EditableAvatarProps> = ({
    id,
    user,
    className,
    nonEditable,
}) => {
    const defaultImageURL =
        user.image != null
            ? `${HTTPManager.defaults.baseURL}files/${user.image}`
            : undefined;

    const defaultFile =
        defaultImageURL != null
            ? new File([defaultImageURL], "avatar")
            : undefined;

    const [file, setFile] = useState(defaultFile);
    const fileURL = file != null ? URL.createObjectURL(file) : defaultImageURL;

    const inputRef = useRef<HTMLInputElement>(null);

    const {
        mutate: patchMyUserImage,
        isPending: isPatchingMyUserImagePending,
    } = usePatchMyUserImage({
        onSuccess: () => {
            HandleReset();
            toast.success("Successfully updated image!");
        },
    });

    const {
        mutate: deleteMyUserImage,
        isPending: isDeletingMyUserImagePending,
    } = useDeleteMyUserImage({
        onSuccess: () => {
            HandleReset();
            toast.success("Successfully deleted image!");
        },
    });

    const isPending =
        isPatchingMyUserImagePending || isDeletingMyUserImagePending;

    function HandleReset() {
        setFile(undefined);
        if (inputRef.current != null) {
            inputRef.current.value = "";
        }
    }

    function HandleUpdateImage() {
        patchMyUserImage(file!);
    }

    function HandleDeleteImage() {
        deleteMyUserImage();
    }

    return (
        <Avatar id={id} className={cn("relative size-9", className)}>
            <AvatarImage
                src={`${HTTPManager.defaults.baseURL}files/${user.image}`}
            />
            <AvatarFallback className="bg-emerald-500 avatar-letter">
                {user["first-name"][0].toUpperCase()}
            </AvatarFallback>

            {!nonEditable && (
                <Dialog onOpenChange={(open) => !open && HandleReset()}>
                    <DialogTrigger className="absolute cursor-pointer place-content-center place-items-center inset-0 size-full group hover:bg-black/30 focus-within:bg-black/30">
                        <CameraIcon className="group-hover:opacity-100 group-focus-within:opacity-100 opacity-0 duration-300 text-white" />
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-start">
                                Change Profile Picture
                            </DialogTitle>
                        </DialogHeader>

                        <main className="flex gap-4 max-sm:flex-col place-content-center place-items-center">
                            <Avatar className="size-32 max-sm:size-48">
                                <AvatarImage src={fileURL} />
                                <AvatarImage src={defaultImageURL} />
                                <AvatarFallback className="bg-emerald-500 text-6xl max-sm:text-9xl">
                                    {user["first-name"][0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-4">
                                <DialogDescription>
                                    Please upload an image to change your
                                    profile picture, or you can just remove it.
                                </DialogDescription>

                                <Input
                                    ref={inputRef}
                                    className="cursor-pointer!"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files?.item(0) ?? undefined
                                        )
                                    }
                                />

                                <DialogFooter className="grid grid-cols-2 max-sm:flex max-sm:flex-col">
                                    <Button
                                        variant="destructive"
                                        onClick={HandleDeleteImage}
                                        disabled={
                                            isPending ||
                                            defaultImageURL == undefined
                                        }
                                    >
                                        {isPending ? (
                                            <SpinnerIcon />
                                        ) : (
                                            <Trash2Icon />
                                        )}
                                        Remove Picture
                                    </Button>
                                    <Button
                                        type="submit"
                                        onClick={HandleUpdateImage}
                                        disabled={
                                            isPending ||
                                            ((user.image != null ||
                                                file == null) &&
                                                (user.image == null ||
                                                    file == null ||
                                                    URL.createObjectURL(file) ==
                                                        user.image))
                                        }
                                    >
                                        {isPending ? (
                                            <SpinnerIcon />
                                        ) : (
                                            <SaveIcon />
                                        )}
                                        Change Picture
                                    </Button>
                                </DialogFooter>
                            </div>
                        </main>
                    </DialogContent>
                </Dialog>
            )}
        </Avatar>
    );
};
