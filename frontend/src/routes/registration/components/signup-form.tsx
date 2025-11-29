import * as z from "zod";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { DatePicker } from "../../../components/shared/date-picker";
import { useSignup } from "@/services/registration/useSignup";
import { Gender } from "../../../../../src/schemas/UserSchema";
import { SpinnerIcon } from "../../../components/ui/spinner-icon";
import { SignupSchema } from "../../../../../src/schemas/SignupSchema";
import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
} from "../../../components/ui/form";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "../../../components/ui/dropdown-menu";
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    InputGroupInput,
    InputGroupButton,
} from "../../../components/ui/input-group";
import {
    TagIcon,
    EyeIcon,
    LockIcon,
    MailIcon,
    TagsIcon,
    UserIcon,
    EyeOffIcon,
    VenusAndMarsIcon,
    UserRoundPlusIcon,
} from "lucide-react";

export const SignupFormSchema = z
    .intersection(
        SignupSchema,
        z.object({
            "confirm-password": z
                .string("required")
                .min(8, "minimum")
                .max(20, "maximum"),
        })
    )
    .refine((data) => data.password == data["confirm-password"], {
        error: "unmatched",
        path: ["confirm-password"],
    });

export type SignupFormDTO = z.infer<typeof SignupFormSchema>;

export const SignupForm: FC = () => {
    const form = useForm({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            email: "",
            password: "",
            "last-name": "",
            "first-name": "",
            gender: undefined,
            birthday: undefined,
            "confirm-password": "",
        },
    });

    const Navigate = useNavigate();

    const { mutate, isPending } = useSignup({
        onSuccess: () => {
            toast.success("Successfully signed up!");
            Navigate({
                to: "/registration",
                search: { mode: "login" },
            });
        },
    });

    function HandleSubmit(data: SignupFormDTO) {
        mutate(data);
    }

    return (
        <Form
            id="registration-form"
            className="flex flex-col gap-8"
            SubmitFn={HandleSubmit}
            {...form}
        >
            <main className="grid grid-cols-[1fr_auto_1fr] gap-4 max-md:flex flex-1 max-md:flex-col">
                <div className="flex flex-col gap-4 flex-1">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>
                                    Username
                                    <span className="text-emerald-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <InputGroup>
                                        <InputGroupText className="ml-2 -mr-1 translate-y-0.25">
                                            @
                                        </InputGroupText>
                                        <InputGroupInput
                                            type="text"
                                            placeholder="username"
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>
                                    Email
                                    <span className="text-emerald-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <InputGroup>
                                        <InputGroupInput
                                            type="email"
                                            placeholder="example@gmail.com"
                                            {...field}
                                        />
                                        <InputGroupAddon>
                                            <MailIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                            const [visibility, setVisibility] = useState(false);
                            return (
                                <FormItem>
                                    <FormLabel aria-required>
                                        Password
                                        <span className="text-emerald-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupInput
                                                type={
                                                    visibility
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="P@$$w0rd"
                                                {...field}
                                            />
                                            <InputGroupAddon>
                                                <LockIcon />
                                            </InputGroupAddon>
                                            <InputGroupButton
                                                onClick={(_e) =>
                                                    setVisibility(
                                                        (value) => !value
                                                    )
                                                }
                                            >
                                                {visibility ? (
                                                    <EyeOffIcon />
                                                ) : (
                                                    <EyeIcon />
                                                )}
                                            </InputGroupButton>
                                        </InputGroup>
                                    </FormControl>
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="confirm-password"
                        render={({ field }) => {
                            const [visibility, setVisibility] = useState(false);
                            return (
                                <FormItem>
                                    <FormLabel aria-required>
                                        Confirm Password
                                        <span className="text-emerald-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupInput
                                                type={
                                                    visibility
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="C0nf!r^^_P@$$w0rd"
                                                {...field}
                                            />
                                            <InputGroupAddon>
                                                <LockIcon />
                                            </InputGroupAddon>
                                            <InputGroupButton
                                                onClick={(_e) =>
                                                    setVisibility(
                                                        (value) => !value
                                                    )
                                                }
                                            >
                                                {visibility ? (
                                                    <EyeOffIcon />
                                                ) : (
                                                    <EyeIcon />
                                                )}
                                            </InputGroupButton>
                                        </InputGroup>
                                    </FormControl>
                                </FormItem>
                            );
                        }}
                    />
                </div>
                <Separator
                    className="h-full max-md:hidden"
                    orientation="vertical"
                />
                <Separator className="md:hidden" orientation="horizontal" />

                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="first-name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>
                                    First Name
                                    <span className="text-emerald-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <InputGroup>
                                        <InputGroupInput
                                            type="text"
                                            placeholder="Hashem"
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
                                            placeholder="Wannous"
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
                                <FormLabel aria-required>
                                    Gender
                                    <span className="text-emerald-500">*</span>
                                </FormLabel>
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
                                                    : "Select your gender"}
                                            </p>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {Object.values(Gender).map(
                                            (value, i) => (
                                                <DropdownMenuItem
                                                    key={i}
                                                    onClick={() =>
                                                        field.onChange({
                                                            target: { value },
                                                        })
                                                    }
                                                >
                                                    {value
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        value.slice(1)}
                                                </DropdownMenuItem>
                                            )
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </FormItem>
                        )}
                    />
                </div>
            </main>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <Button
                    type="reset"
                    variant="outline"
                    form="registration-form"
                    onClick={(_e) => form.reset()}
                >
                    Clear
                </Button>
                <Button
                    type="submit"
                    disabled={isPending}
                    form="registration-form"
                >
                    {isPending ? <SpinnerIcon /> : <UserRoundPlusIcon />}
                    Signup
                </Button>
            </div>
        </Form>
    );
};
