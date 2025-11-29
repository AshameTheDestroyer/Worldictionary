import { HTTPManager } from "@/managers/HTTPManager";
import { LoginDTO } from "../../../../src/schemas/LoginSchema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const LOGIN_KEY = "LOGIN";

export const useLogin = (
    options?: Partial<UseMutationOptions<string, any, LoginDTO>>
) =>
    useMutation({
        ...options,
        mutationKey: ["LOGIN"],
        mutationFn: (data) =>
            HTTPManager.post("registration/login", data)
                .then((response) => response.data.token)
                .then((token) => {
                    localStorage.setItem("token", token);
                    return token;
                }),
    });
