import * as z from "zod";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { DatePicker } from "./date-picker";
import { FC, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "../../../src/schemas/UserSchema";
import { useForm, UseFormReturn } from "react-hook-form";
import { SignupSchema } from "../../../src/schemas/SignupSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "./ui/input-group";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "./ui/dropdown-menu";
import {
    TagIcon,
    LockIcon,
    MailIcon,
    TagsIcon,
    UserIcon,
    VenusAndMarsIcon,
} from "lucide-react";

export const SignupFormSchema = z.intersection(
    SignupSchema,
    z.object({ "confirm-password": z.string() })
);

export type SignupFormDTO = z.infer<typeof SignupFormSchema>;

export type SignupFormProps = {
    ref?: React.Ref<UseFormReturn<SignupFormDTO>>;
};

export const SignupForm: FC<SignupFormProps> = ({ ref }) => {
    const form = useForm({
        resolver: zodResolver(SignupFormSchema),
    });

    useImperativeHandle(ref, () => form);

    console.log(form?.getValues("username"));

    return (
        <Form
            className="grid grid-cols-[1fr_auto_1fr] gap-4 max-md:flex flex-1 max-md:flex-col"
            {...form}
        >
            <div className="flex flex-col gap-4 flex-1">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupText className="ml-2 -mr-1 translate-y-0.25">
                                        @
                                    </InputGroupText>
                                    <InputGroupInput
                                        type="text"
                                        placeholder="username"
                                        {...field}
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
                            <FormLabel>Email</FormLabel>
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput
                                        type="password"
                                        placeholder="P@$$w0rd"
                                        {...field}
                                    />
                                    <InputGroupAddon>
                                        <LockIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirm-password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput
                                        type="password"
                                        placeholder="C0nf!r^^_P@$$w0rd"
                                        {...field}
                                    />
                                    <InputGroupAddon>
                                        <LockIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                        </FormItem>
                    )}
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
                            <FormLabel>First Name</FormLabel>
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
                            <DatePicker
                                date={field.value}
                                setDate={(date) =>
                                    field.onChange({
                                        target: { value: date },
                                    })
                                }
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className={cn(
                                            "bg-transparent! place-content-start!",
                                            field.value == null &&
                                                "text-muted-foreground!"
                                        )}
                                        variant="outline"
                                    >
                                        <VenusAndMarsIcon />
                                        <p>
                                            {field.value
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                field.value?.slice(1) ||
                                                "Select your gender"}
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
            </div>
        </Form>
    );
};
