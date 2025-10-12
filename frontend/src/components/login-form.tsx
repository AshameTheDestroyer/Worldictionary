import { Button } from "./ui/button";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../src/schemas/LoginSchema";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from "./ui/input-group";

export const LoginForm: FC = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
    });

    return (
        <Form
            id="registration-form"
            className="flex flex-col gap-8"
            SubmitFn={(data) => console.log(data)}
            {...form}
        >
            <main className="flex flex-col gap-4">
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
                                            type={
                                                visibility ? "text" : "password"
                                            }
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
            </main>
            <div className="grid grid-cols-2 gap-4">
                <Button
                    type="reset"
                    variant="outline"
                    form="registration-form"
                    onClick={(_e) =>
                        form.reset({
                            email: "",
                            password: "",
                        })
                    }
                >
                    Clear
                </Button>
                <Button type="submit" form="registration-form">
                    Login
                </Button>
            </div>
        </Form>
    );
};
