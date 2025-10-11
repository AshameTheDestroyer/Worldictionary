import z from "zod/v3";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

const RegistrationSearchSchema = z.object({
    mode: z.enum(["signup", "login"]).default("signup"),
});

export const Route = createFileRoute("/registration")({
    component: RouteComponent,
    validateSearch: RegistrationSearchSchema,
});

function RouteComponent() {
    const { mode } = Route.useSearch();

    return (
        <main className="flex-1 flex place-content-center place-items-center">
            <Card className="max-w-[30rem]">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {
                            {
                                login: "Log in",
                                signup: "Create an account",
                            }[mode]
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        {
                            login: <LoginForm />,
                            signup: <SignupForm />,
                        }[mode]
                    }
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <Separator />
                    {
                        {
                            login: (
                                <div className="flex gap-[1ch]">
                                    <p>Doesn't have an account?</p>
                                    <Link
                                        className="underline"
                                        to="/registration"
                                        search={{ mode: "signup" }}
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            ),
                            signup: (
                                <div className="flex gap-[1ch]">
                                    <p>Already have an account?</p>
                                    <Link
                                        className="underline"
                                        to="/registration"
                                        search={{ mode: "login" }}
                                    >
                                        Log in
                                    </Link>
                                </div>
                            ),
                        }[mode]
                    }
                </CardFooter>
            </Card>
        </main>
    );
}
