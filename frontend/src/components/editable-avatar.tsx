import { cn } from "@/utils/cn";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FC, useRef, useState } from "react";
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
    const [file, setFile] = useState<File>();
    const inputRef = useRef<HTMLInputElement>(null);

    function HandleReset() {
        setFile(undefined);
        if (inputRef.current != null) {
            inputRef.current.value = "";
        }
    }

    return (
        <Avatar id={id} className={cn("relative size-9", className)}>
            <AvatarImage src={user.image} />
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
                        <Avatar
                            key={inputRef.current?.value}
                            className="size-32 max-sm:size-48"
                        >
                            {file != null && (
                                <AvatarImage
                                    src={URL.createObjectURL(file) ?? ""}
                                />
                            )}
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
                                    onClick={HandleReset}
                                    disabled={file == null}
                                >
                                    <Trash2Icon />
                                    Remove Picture
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={
                                        (user.image != null || file == null) &&
                                        (user.image == null ||
                                            file == null ||
                                            URL.createObjectURL(file) ==
                                                user.image)
                                    }
                                >
                                    <SaveIcon />
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
