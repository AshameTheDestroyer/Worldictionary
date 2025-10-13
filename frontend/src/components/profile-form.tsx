import z from "zod";
import { FC } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { DatePicker } from "./date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagIcon, TagsIcon, UserIcon, VenusAndMarsIcon } from "lucide-react";
import { Gender, UserDTO, UserSchema } from "../../../src/schemas/UserSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    InputGroupInput,
} from "./ui/input-group";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const ProfileFormSchema = UserSchema.omit({
    role: true,
    email: true,
    password: true,
}).partial();

export type ProfileFormDTO = z.infer<typeof ProfileFormSchema>;

export type ProfileFormProps = {
    user: UserDTO;
};

export const ProfileForm: FC<ProfileFormProps> = ({ user }) => {
    const form = useForm({
        resolver: zodResolver(ProfileFormSchema),
    });

    function HandleSubmit(data: ProfileFormDTO) {}

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
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            field.onChange({
                                                ...e,
                                                target: {
                                                    ...e.target,
                                                    value:
                                                        "@" +
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
                    onClick={(_e) =>
                        form.reset({
                            gender: undefined,
                            birthday: undefined,
                            username: undefined,
                            "last-name": undefined,
                            "first-name": undefined,
                        })
                    }
                >
                    Clear
                </Button>
                <Button
                    type="submit"
                    // disabled={isPending}
                    form="registration-form"
                >
                    {/* {isPending && <Spinner />} */}
                    Update
                </Button>
            </div>
        </Form>
    );
};
