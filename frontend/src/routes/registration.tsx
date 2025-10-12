import z from "zod/v3";
import { LoginForm } from "@/components/login-form";
import { Separator } from "@/components/ui/separator";
import { SignupForm } from "@/components/signup-form";
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
            <Card className="py-12 px-4 gap-8">
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

                <CardFooter className="flex flex-col gap-8">
                    <Separator />
                    {
                        {
                            login: (
                                <div>
                                    <span>Doesn't have an account?</span>{" "}
                                    <Link
                                        className="underline text-emerald-500"
                                        to="/registration"
                                        search={{ mode: "signup" }}
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            ),
                            signup: (
                                <div>
                                    <span>Already have an account?</span>{" "}
                                    <Link
                                        className="underline text-emerald-500"
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
