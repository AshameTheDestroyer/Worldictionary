import { FC } from "react";
import { cn } from "@/utils/cn";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { UserDTO } from "../../../src/schemas/UserSchema";
import { CameraIcon, SaveIcon, Trash2Icon } from "lucide-react";
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
    return (
        <Avatar id={id} className={cn("relative size-9", className)}>
            <AvatarFallback className="bg-emerald-500 avatar-letter">
                {user["first-name"][0].toUpperCase()}
            </AvatarFallback>

            <Dialog>
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
                            <AvatarFallback className="bg-emerald-500 text-6xl max-sm:text-9xl">
                                {user["first-name"][0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-4">
                            <DialogDescription>
                                Please upload an image to change your profile
                                picture, or you can just remove it.
                            </DialogDescription>
                            <Input className="cursor-pointer!" type="file" />
                            <DialogFooter className="grid grid-cols-2 max-sm:flex max-sm:flex-col">
                                <Button variant="destructive">
                                    <Trash2Icon />
                                    Remove Picture
                                </Button>
                                <Button type="submit">
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
