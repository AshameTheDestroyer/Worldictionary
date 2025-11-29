import toast from "react-hot-toast";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { useLogin } from "@/services/registration/useLogin";
import { useMyUser } from "../../../contexts/my-user-provider";
import { SpinnerIcon } from "../../../components/ui/spinner-icon";
import { LoginDTO, LoginSchema } from "../../../../../src/schemas/LoginSchema";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
} from "../../../components/ui/form";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from "../../../components/ui/input-group";
import {
    EyeIcon,
    LockIcon,
    MailIcon,
    LogInIcon,
    EyeOffIcon,
} from "lucide-react";

export const LoginForm: FC = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const Navigate = useNavigate();
    const { setToken } = useMyUser();

    const { mutate, isPending } = useLogin({
        onSuccess: (token) => {
            setToken(token);
            toast.success("Successfully logged in!");
            Navigate({ to: "/" });
        },
    });

    function HandleSubmit(data: LoginDTO) {
        mutate(data);
    }

    return (
        <Form
            id="registration-form"
            className="flex flex-col gap-8"
            SubmitFn={HandleSubmit}
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
                    onClick={(_e) => form.reset()}
                >
                    Clear
                </Button>
                <Button
                    type="submit"
                    disabled={isPending}
                    form="registration-form"
                >
                    {isPending ? <SpinnerIcon /> : <LogInIcon />}
                    Login
                </Button>
            </div>
        </Form>
    );
};
