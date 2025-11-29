import { queryClient } from "@/main";
import { HTTPManager } from "@/managers/HTTPManager";
import { GET_USER_BY_USERNAME_KEY } from "./useGetUserByUsername";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
    PatchableUserDTO,
    UserWithoutPasswordDTO,
    UserWithoutPasswordSchema,
} from "../../../../src/schemas/UserSchema";

export const PATCH_MY_USER_KEY = "PATCH-MY-USER";

export const usePatchMyUser = (
    options?: Partial<
        UseMutationOptions<UserWithoutPasswordDTO, any, PatchableUserDTO>
    >
) =>
    useMutation({
        ...options,
        mutationKey: [PATCH_MY_USER_KEY],
        mutationFn: (data) =>
            HTTPManager.patch("users/mine", data)
                .then((response) => response.data)
                .then(UserWithoutPasswordSchema.parse)
                .then((user) => {
                    queryClient.invalidateQueries({
                        queryKey: ["GET-MY-USER"],
                    });
                    queryClient.invalidateQueries({
                        queryKey: [GET_USER_BY_USERNAME_KEY],
                    });

                    return user;
                }),
    });
