import { HTTPManager } from "@/managers/HTTPManager";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const LOGOUT_KEY = "LOGOUT";

export const useLogout = (options?: Partial<UseMutationOptions>) =>
    useMutation({
        ...options,
        mutationKey: [LOGOUT_KEY],
        mutationFn: () =>
            HTTPManager.post("registration/logout")
                .then((response) => response.data)
                .then(() => {
                    localStorage.removeItem("token");
                }),
    });
