import z from "zod/v3";
import { cn } from "@/utils/cn";
import { Ref, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { LoginForm } from "@/components/login-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SignupForm, SignupFormDTO } from "@/components/signup-form";
import { LoginDTO as LoginFormDTO } from "../../../src/schemas/LoginSchema";
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
    const formRef = useRef<UseFormReturn<SignupFormDTO | LoginFormDTO>>(null);

    console.log(formRef.current?.getValues("username"));

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
                <CardContent className="flex flex-col gap-8">
                    <main className="flex gap-4 h-full items-stretch">
                        {
                            {
                                login: (
                                    <LoginForm
                                        ref={
                                            formRef as Ref<
                                                UseFormReturn<LoginFormDTO>
                                            >
                                        }
                                    />
                                ),
                                signup: (
                                    <SignupForm
                                        ref={
                                            formRef as Ref<
                                                UseFormReturn<SignupFormDTO>
                                            >
                                        }
                                    />
                                ),
                            }[mode]
                        }
                    </main>
                    <div
                        className={cn(
                            "grid grid-cols-2 gap-4",
                            mode == "signup" && "md:gap-8"
                        )}
                    >
                        <Button
                            type="reset"
                            variant="outline"
                            onClick={() => formRef.current?.reset()}
                        >
                            Clear
                        </Button>
                        <Button type="submit">
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-8">
                    <Separator />
                    {
                        {
                            login: (
                                <div>
                                    <span>Doesn't have an account?</span>{" "}
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
                                <div>
                                    <span>Already have an account?</span>{" "}
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
