import { HTTPManager } from "@/managers/HTTPManager";
import { SignupDTO } from "../../../../src/schemas/SignupSchema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const SIGNUP_KEY = "SIGNUP";

export const useSignup = (
    options?: Partial<UseMutationOptions<any, any, SignupDTO>>
) =>
    useMutation({
        ...options,
        mutationKey: [SIGNUP_KEY],
        mutationFn: (data) =>
            HTTPManager.post("registration/signup", data).then(
                (response) => response.data
            ),
    });
