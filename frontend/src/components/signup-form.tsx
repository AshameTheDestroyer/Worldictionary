import { FC } from "react";
import { useForm } from "react-hook-form";
import { Separator } from "./ui/separator";
import { DatePicker } from "./date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../../../src/schemas/SignupSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { TagIcon, LockIcon, MailIcon, TagsIcon, UserIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export const SignupForm: FC = () => {
    const form = useForm({
        resolver: zodResolver(SignupSchema),
    });

    return (
        <Form className="flex gap-4 flex-1 max-md:flex-col" {...form}>
            <div className="flex flex-col gap-4 flex-1">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput
                                        type="text"
                                        placeholder="@username"
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
            </div>
        </Form>
    );
};
