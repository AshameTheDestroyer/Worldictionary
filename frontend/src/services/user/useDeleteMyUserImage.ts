import { queryClient } from "@/main";
import { HTTPManager } from "@/managers/HTTPManager";
import { GET_USER_BY_USERNAME_KEY } from "./useGetUserByUsername";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const DELETE_MY_USER_IMAGE_KEY = "DELETE-MY-USER-IMAGE";

export const useDeleteMyUserImage = (options?: Partial<UseMutationOptions>) =>
    useMutation({
        ...options,
        mutationKey: [DELETE_MY_USER_IMAGE_KEY],
        mutationFn: async () =>
            HTTPManager.delete("users/mine/image")
                .then((response) => response.data)
                .then(() => {
                    queryClient.invalidateQueries({
                        queryKey: ["GET-MY-USER"],
                    });
                    queryClient.invalidateQueries({
                        queryKey: [GET_USER_BY_USERNAME_KEY],
                    });
                }),
    });
