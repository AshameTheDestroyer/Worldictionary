import { HTTPManager } from "@/managers/HTTPManager";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UserWithoutPasswordSchema } from "../../../../src/schemas/UserSchema";

export const GET_USER_BY_USERNAME_KEY = "GET-USER-BY-USERNAME";

export const useGetUserByUsername = (
    username: string,
    options?: Partial<UseQueryOptions>
) =>
    useQuery({
        ...options,
        queryKey: [GET_USER_BY_USERNAME_KEY, username],
        queryFn: () =>
            HTTPManager.get(`/users/${username.replace(/^@/, "")}`)
                .then((response) => response.data)
                .then(UserWithoutPasswordSchema.parse)
                .catch((error) =>
                    error.status == 404 ? null : Promise.reject(error)
                ),
    });
