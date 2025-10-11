import { LockIcon, MailIcon } from "lucide-react";
import { FC, Ref, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { LoginDTO, LoginSchema } from "../../../src/schemas/LoginSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export type LoginFormProps = {
    ref?: Ref<UseFormReturn<LoginDTO>>;
};

export const LoginForm: FC<LoginFormProps> = ({ ref }) => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
    });

    useImperativeHandle(ref, () => form);

    return (
        <Form className="flex flex-col gap-4" {...form}>
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
        </Form>
    );
};
