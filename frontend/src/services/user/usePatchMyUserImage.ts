import { queryClient } from "@/main";
import { HTTPManager } from "@/managers/HTTPManager";
import { GET_USER_BY_USERNAME_KEY } from "./useGetUserByUsername";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const PATCH_MY_USER_IMAGE_KEY = "PATCH-MY-USER-IMAGE";

export const usePatchMyUserImage = (
    options?: Partial<UseMutationOptions<any, any, File>>
) =>
    useMutation({
        ...options,
        mutationKey: [PATCH_MY_USER_IMAGE_KEY],
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.set("file", file, file.name);

            return HTTPManager.patch("users/mine/image", formData, {
                headers: {
                    accept: "application/json",
                    "Accept-Language": "en-US,en;q=0.8",
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => response.data)
                .then(() => {
                    queryClient.invalidateQueries({
                        queryKey: ["GET-MY-USER"],
                    });
                    queryClient.invalidateQueries({
                        queryKey: [GET_USER_BY_USERNAME_KEY],
                    });
                });
        },
    });
