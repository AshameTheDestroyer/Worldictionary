import { FC } from "react";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/date-picker";
import { SpinnerIcon } from "@/components/ui/spinner-icon";
import { usePatchMyUser } from "@/services/user/usePatchMyUser";
import { TagIcon, TagsIcon, UserIcon, VenusAndMarsIcon } from "lucide-react";
import {
    Gender,
    PatchableUserDTO,
    PatchableUserSchema,
    UserWithoutPasswordDTO,
} from "../../../../../src/schemas/UserSchema";
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
} from "@/components/ui/form";

export type ProfileFormProps = {
    user: UserWithoutPasswordDTO;
};

export const ProfileForm: FC<ProfileFormProps> = ({ user }) => {
    const Navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(PatchableUserSchema),
        defaultValues: {
            gender: undefined,
            birthday: undefined,
            username: undefined,
            "last-name": undefined,
            "first-name": undefined,
        },
    });

    const { mutate, isPending } = usePatchMyUser({
        onSuccess: (updatedUser) => {
            toast.success("Successfully edited profile information!");

            form.reset();

            if (updatedUser.username == user.username) return;
            Navigate({
                to: "/profile/$username/edit",
                params: { username: updatedUser.username.slice(1) },
            });
        },
        onError: (error) =>
            toast.error(error?.response?.data?.message ?? error?.message),
    });

    function HandleSubmit(data: PatchableUserDTO) {
        const user = PatchableUserSchema.parse(
            Object.entries(data).reduce(
                (accumulator, [key, value]) =>
                    value == null
                        ? accumulator
                        : { ...accumulator, [key]: value },
                {}
            )
        );

        mutate(user);
    }

    return (
        <Form
            id="profile-form"
            className="flex flex-col gap-8"
            SubmitFn={HandleSubmit}
            {...form}
        >
            <main className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="first-name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput
                                        type="text"
                                        placeholder={user["first-name"]}
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={(e) =>
                                            field.onChange({
                                                ...e,
                                                target: {
                                                    ...e.target,
                                                    value:
                                                        e.target.value ||
                                                        undefined,
                                                },
                                            })
                                        }
                                    />
                                    <InputGroupAddon>
                                        <TagIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="last-name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput
                                        type="text"
                                        placeholder={user["last-name"]}
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={(e) =>
                                            field.onChange({
                                                ...e,
                                                target: {
                                                    ...e.target,
                                                    value:
                                                        e.target.value ||
                                                        undefined,
                                                },
                                            })
                                        }
                                    />
                                    <InputGroupAddon>
                                        <TagsIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel aria-required>Username</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupText className="ml-2 -mr-1 translate-y-0.25">
                                        @
                                    </InputGroupText>
                                    <InputGroupInput
                                        type="text"
                                        placeholder={user.username.slice(1)}
                                        {...field}
                                        value={
                                            field.value?.startsWith("@")
                                                ? field.value.slice(1)
                                                : field.value || ""
                                        }
                                        onChange={(e) =>
                                            field.onChange({
                                                ...e,
                                                target: {
                                                    ...e.target,
                                                    value:
                                                        e.target.value == ""
                                                            ? undefined
                                                            : "@" +
                                                              e.target.value.replace(
                                                                  /^@+/,
                                                                  ""
                                                              ),
                                                },
                                            })
                                        }
                                    />
                                    <InputGroupAddon>
                                        <UserIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birthday</FormLabel>
                            <div className="[&>*]:w-full">
                                <DatePicker
                                    placeholder={user.birthday}
                                    date={
                                        typeof field.value == "string"
                                            ? new Date(field.value)
                                            : (field.value as Date)
                                    }
                                    setDate={(date) =>
                                        field.onChange({
                                            target: { value: date },
                                        })
                                    }
                                />
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel aria-required>Gender</FormLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className={cn(
                                            "bg-input/30! place-content-start!",
                                            field.value == null &&
                                                "text-muted-foreground!"
                                        )}
                                        variant="outline"
                                    >
                                        <VenusAndMarsIcon />
                                        <p>
                                            {field.value != null
                                                ? field.value
                                                      ?.charAt(0)
                                                      .toUpperCase() +
                                                  field.value?.slice(1)
                                                : user.gender
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  user.gender.slice(1)}
                                        </p>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {Object.values(Gender).map((value, i) => (
                                        <DropdownMenuItem
                                            key={i}
                                            onClick={() =>
                                                field.onChange({
                                                    target: { value },
                                                })
                                            }
                                        >
                                            {value.charAt(0).toUpperCase() +
                                                value.slice(1)}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </FormItem>
                    )}
                />
            </main>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <Button
                    type="reset"
                    variant="outline"
                    form="profile-form"
                    onClick={(_e) => form.reset()}
                >
                    Clear
                </Button>
                <Button
                    type="submit"
                    form="profile-form"
                    disabled={isPending || !form.formState.isDirty}
                >
                    {isPending && <SpinnerIcon />}
                    Update
                </Button>
            </div>
        </Form>
    );
};
