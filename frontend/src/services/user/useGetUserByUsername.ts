import { useQuery } from "@tanstack/react-query";
import { HTTPManager } from "@/managers/HTTPManager";
import { UserWithoutPasswordSchema } from "../../../../src/schemas/UserSchema";

export const GET_USER_BY_USERNAME_KEY = "GET-USER-BY-USERNAME";

export const useGetUserByUsername = (username: string) =>
    useQuery({
        queryKey: [GET_USER_BY_USERNAME_KEY, username],
        queryFn: () =>
            HTTPManager.get(`/users/${username.replace(/^@/, "")}`)
                .then((response) => response.data)
                .then(UserWithoutPasswordSchema.parse)
                .catch((error) =>
                    error.status == 404 ? null : Promise.reject(error)
                ),
    });
