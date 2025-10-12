import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FC, Ref, useImperativeHandle, useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { LoginDTO, LoginSchema } from "../../../src/schemas/LoginSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from "./ui/input-group";

export type LoginFormProps = {
    ref?: Ref<UseFormReturn<LoginDTO>>;
};

export const LoginForm: FC<LoginFormProps> = ({ ref }) => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
    });

    useImperativeHandle(ref, () => form);

    return (
        <Form
            id="registration-form"
            className="flex flex-col gap-4"
            SubmitFn={(data) => console.log(data)}
            {...form}
        >
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem aria-required>
                        <FormLabel>
                            Email<span className="text-emerald-500">*</span>
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
                                <span className="text-emerald-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput
                                        type={visibility ? "text" : "password"}
                                        placeholder="P@$$w0rd"
                                        {...field}
                                    />
                                    <InputGroupAddon>
                                        <LockIcon />
                                    </InputGroupAddon>
                                    <InputGroupButton
                                        onClick={(_e) =>
                                            setVisibility((value) => !value)
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
        </Form>
    );
};
