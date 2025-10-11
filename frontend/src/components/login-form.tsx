import { FC } from "react";
import { useForm } from "react-hook-form";
import { LockIcon, MailIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../src/schemas/LoginSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export const LoginForm: FC = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
    });

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
