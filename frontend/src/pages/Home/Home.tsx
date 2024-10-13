import { FC, useState } from "react";

export const Home: FC = () => {
    const [authenticationState, setAuthenticationState] = useState<
        "signup" | "login"
    >("signup");

    const [signupData, setSignupData] = useState<{
        name: string;
        email: string;
        password: string;
    }>({
        name: "",
        email: "",
        password: "",
    });

    const [loginData, setLoginData] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    function OnFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        fetch(
            `${import.meta.env["VITE_BACKEND_URL"]}/authentication/${authenticationState}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    authenticationState == "signup"
                        ? { ...signupData, role: "admin" }
                        : loginData,
                ),
            },
        )
            .then((response) => response.json())
            .then(console.log)
            .catch(console.error);
    }

    return (
        <form
            className="flex h-screen w-full flex-col place-content-center place-items-center gap-4"
            onSubmit={OnFormSubmit}
        >
            {authenticationState == "signup" ? (
                <>
                    <input
                        className="border-b border-gray-400 px-4 py-2"
                        type="text"
                        value={signupData.name}
                        placeholder="Name"
                        onChange={(e) =>
                            setSignupData((previousValue) => ({
                                ...previousValue,
                                name: e.target.value,
                            }))
                        }
                    />
                    <input
                        className="border-b border-gray-400 px-4 py-2"
                        type="text"
                        value={signupData.email}
                        placeholder="Email"
                        onChange={(e) =>
                            setSignupData((previousValue) => ({
                                ...previousValue,
                                email: e.target.value,
                            }))
                        }
                    />
                    <input
                        className="border-b border-gray-400 px-4 py-2"
                        type="password"
                        value={signupData.password}
                        placeholder="Password"
                        onChange={(e) =>
                            setSignupData((previousValue) => ({
                                ...previousValue,
                                password: e.target.value,
                            }))
                        }
                    />
                    <a
                        className="underline"
                        href="./"
                        onClick={(e) => (
                            e.preventDefault(), setAuthenticationState("login")
                        )}
                    >
                        Login instead.
                    </a>
                </>
            ) : (
                <>
                    <input
                        className="border-b border-gray-400 px-4 py-2"
                        type="text"
                        value={loginData.email}
                        placeholder="Email"
                        onChange={(e) =>
                            setLoginData((previousValue) => ({
                                ...previousValue,
                                email: e.target.value,
                            }))
                        }
                    />
                    <input
                        className="border-b border-gray-400 px-4 py-2"
                        type="password"
                        value={loginData.password}
                        placeholder="Password"
                        onChange={(e) =>
                            setLoginData((previousValue) => ({
                                ...previousValue,
                                password: e.target.value,
                            }))
                        }
                    />
                    <a
                        className="underline"
                        href="./"
                        onClick={(e) => (
                            e.preventDefault(), setAuthenticationState("signup")
                        )}
                    >
                        Signup instead.
                    </a>
                </>
            )}
            <button type="submit">Submit</button>
        </form>
    );
};
