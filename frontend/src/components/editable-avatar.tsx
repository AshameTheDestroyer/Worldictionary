import { cn } from "@/utils/cn";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { queryClient } from "@/main";
import { Spinner } from "./ui/spinner";
import { FC, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { HTTPManager } from "@/managers/HTTPManager";
import { UserDTO } from "../../../src/schemas/UserSchema";
import { CameraIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
    user: UserDTO;
    className?: string;
};

export const EditableAvatar: FC<EditableAvatarProps> = ({
    id,
    user,
    className,
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
    } = useMutation({
        mutationKey: ["PATCH-MY-USER-IMAGE"],
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.set("file", file, file.name);

            return HTTPManager.patch("users/mine/image", formData, {
                headers: {
                    accept: "application/json",
                    "Accept-Language": "en-US,en;q=0.8",
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => response.data)
                .then((_data) => {
                    HandleReset();
                    toast.success("Successfully updated image!");
                    queryClient.invalidateQueries({
                        queryKey: ["GET-MY-USER"],
                    });
                })
                .catch((error) =>
                    toast.error(
                        error?.response?.data?.message ?? error?.message
                    )
                );
        },
    });

    const {
        mutate: deleteMyUserImage,
        isPending: isDeletingMyUserImagePending,
    } = useMutation({
        mutationKey: ["DELETE-MY-USER-IMAGE"],
        mutationFn: async () =>
            HTTPManager.delete("users/mine/image")
                .then((response) => response.data)
                .then((_data) => {
                    HandleReset();
                    toast.success("Successfully deleted image!");
                    queryClient.invalidateQueries({
                        queryKey: ["GET-MY-USER"],
                    });
                })
                .catch((error) =>
                    toast.error(
                        error?.response?.data?.message ?? error?.message
                    )
                ),
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

            <Dialog onOpenChange={(open) => !open && HandleReset()}>
                <DialogTrigger className="absolute cursor-pointer place-content-center place-items-center inset-0 size-full group hover:bg-black/30 focus-within:bg-black/30">
                    <CameraIcon className="group-hover:opacity-100 group-focus-within:opacity-100 opacity-0 duration-300" />
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
                                Please upload an image to change your profile
                                picture, or you can just remove it.
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
                                    {isPending ? <Spinner /> : <Trash2Icon />}
                                    Remove Picture
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={HandleUpdateImage}
                                    disabled={
                                        isPending ||
                                        ((user.image != null || file == null) &&
                                            (user.image == null ||
                                                file == null ||
                                                URL.createObjectURL(file) ==
                                                    user.image))
                                    }
                                >
                                    {isPending ? <Spinner /> : <SaveIcon />}
                                    Change Picture
                                </Button>
                            </DialogFooter>
                        </div>
                    </main>
                </DialogContent>
            </Dialog>
        </Avatar>
    );
};
