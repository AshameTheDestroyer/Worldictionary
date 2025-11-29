import { FC } from "react";
import { format } from "date-fns";
import { Link, useLocation } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { CopyableText } from "@/components/copyable-text";
import { EditableAvatar } from "@/components/editable-avatar";
import {
    Role,
    UserWithoutPasswordDTO,
} from "../../../../../src/schemas/UserSchema";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
    CakeIcon,
    MarsIcon,
    StarIcon,
    VenusIcon,
    SettingsIcon,
} from "lucide-react";

export type ProfileHeaderProps = {
    user: UserWithoutPasswordDTO;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({ user }) => {
    const { pathname } = useLocation();

    return (
        <header className="flex gap-8 p-8 place-items-center max-sm:place-items-start flex-wrap">
            <EditableAvatar
                className="size-64 max-sm:size-32 [&_svg]:size-32 max-sm:[&_svg]:size-16 [&_.avatar-letter]:text-9xl max-sm:[&_.avatar-letter]:text-7xl"
                user={user}
            />

            <div className="relative pr-12 flex flex-col gap-6">
                <h2 className="font-bold text-4xl">
                    {user["first-name"]} {user["last-name"]}
                </h2>

                <div>
                    <CopyableText
                        className="text-xl"
                        text={user.username}
                        tooltip="Copy Username"
                        message="Username's been copied."
                    />
                    <CopyableText
                        text={user.email}
                        tooltip="Copy Email"
                        message="Email's been copied."
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    {user.role == Role.admin && (
                        <Badge className="text-md bg-amber-500 text-white font-bold">
                            <StarIcon className="size-4! stroke-3" />
                            Admin
                        </Badge>
                    )}
                    {
                        {
                            male: (
                                <Badge className="text-md bg-blue-500 text-white font-bold">
                                    <MarsIcon className="size-4! stroke-3" />
                                    Male
                                </Badge>
                            ),
                            female: (
                                <Badge className="text-md bg-pink-500 text-white font-bold">
                                    <VenusIcon className="size-4! stroke-3" />
                                    Female
                                </Badge>
                            ),
                        }[user.gender]
                    }
                    {user.birthday != null && (
                        <Badge className="text-md bg-red-500 text-white font-bold">
                            <CakeIcon className="size-4! stroke-3" />
                            {format(user.birthday, "PPP")}
                        </Badge>
                    )}
                </div>

                {!pathname.endsWith("/edit") && (
                    <Tooltip>
                        <TooltipTrigger
                            className="absolute top-0.5 right-0 cursor-pointer p-1.5 -translate-y-1 aspect-square"
                            asChild
                        >
                            <Link
                                to="/profile/$username/edit"
                                params={{ username: user.username.slice(1) }}
                            >
                                <SettingsIcon className="size-9!" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>Edit Profile</TooltipContent>
                    </Tooltip>
                )}
            </div>
        </header>
    );
};
