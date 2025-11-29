import { HTTPManager } from "@/managers/HTTPManager";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
    UserWithoutPasswordDTO,
    UserWithoutPasswordSchema,
} from "../../../../src/schemas/UserSchema";

export const GET_MY_USER_KEY = "GET-MY-USER";

export const useGetMyUser = (
    token: string | undefined,
    options?: UseQueryOptions<any, any, UserWithoutPasswordDTO>
) =>
    useQuery({
        ...options,
        queryKey: ["GET-MY-USER", token],
        enabled: token != null,
        queryFn: () =>
            HTTPManager.get("users/mine")
                .then((response) => response.data)
                .then(UserWithoutPasswordSchema.parse),
    });
