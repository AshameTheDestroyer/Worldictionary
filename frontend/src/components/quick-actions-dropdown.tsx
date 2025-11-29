import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "@tanstack/react-router";
import { SpinnerIcon } from "./ui/spinner-icon";
import { HTTPManager } from "@/managers/HTTPManager";
import { useMyUser } from "../contexts/my-user-provider";
import { LogOutIcon, UserRoundIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "./ui/dropdown-menu";
import {
    Dialog,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogContent,
    DialogDescription,
} from "./ui/dialog";

export const QuickActionsDropdown: FC = () => {
    const { myUser, Logout, isLoggingOutPending, isGettingMyUserLoading } =
        useMyUser();

    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    if (myUser == null || isGettingMyUserLoading) {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <SpinnerIcon className="text-emerald-500 size-9 p-1" />
                </TooltipTrigger>
                <TooltipContent>Avatar's loading...</TooltipContent>
            </Tooltip>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="size-9">
                    <AvatarImage
                        src={`${HTTPManager.defaults.baseURL}files/${myUser.image}`}
                    />
                    <AvatarFallback className="bg-emerald-500">
                        {myUser["first-name"][0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link to="/profile">
                        <UserRoundIcon />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                    className="font-bold"
                    variant="destructive"
                    onClick={(_e) => setIsLogoutDialogOpen(true)}
                >
                    <LogOutIcon />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>

            <Dialog
                open={isLogoutDialogOpen}
                onOpenChange={setIsLogoutDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-start">
                            Logging out
                        </DialogTitle>
                    </DialogHeader>

                    <main>
                        <DialogDescription>
                            Are you sure you want to log out of your account?
                        </DialogDescription>
                    </main>

                    <DialogFooter className="grid grid-cols-2">
                        <Button
                            disabled={isLoggingOutPending}
                            onClick={(_e) => setIsLogoutDialogOpen(false)}
                        >
                            {isLoggingOutPending && <SpinnerIcon />}
                            No, Keep Logged in
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={Logout}
                            disabled={isLoggingOutPending}
                        >
                            {isLoggingOutPending ? (
                                <SpinnerIcon />
                            ) : (
                                <LogOutIcon />
                            )}
                            Yes, Log out
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DropdownMenu>
    );
};
