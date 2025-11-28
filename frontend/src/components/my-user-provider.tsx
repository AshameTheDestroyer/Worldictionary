import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { HTTPManager } from "@/managers/HTTPManager";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    UserWithoutPasswordDTO,
    UserWithoutPasswordSchema,
} from "../../../src/schemas/UserSchema";
import {
    FC,
    useState,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";

export type MyUserStateProps = {
    token?: string;
    myUser?: UserWithoutPasswordDTO;
    Logout: () => void;
    isLoggingOutPending: boolean;
    isGettingMyUserLoading: boolean;
    setToken: (value: string) => void;
};

export const MyUserContext = createContext<MyUserStateProps>(null!);

export const useMyUser = () => useContext(MyUserContext);

export type MyUserProviderProps = PropsWithChildren;

export const MyUserProvider: FC<MyUserProviderProps> = ({ children }) => {
    const [state, setState] = useState<
        Omit<MyUserStateProps, "isLoggingOutPending" | "isGettingMyUserLoading">
    >({
        Logout: () => mutateLogout(),
        token: localStorage.getItem("token")?.toString(),
        setToken: (value: string) =>
            setState((state) => ({
                ...state,
                token: value,
            })),
    });

    const Navigate = useNavigate();

    const { mutate: mutateLogout, isPending: isLoggingOutPending } =
        useMutation({
            mutationKey: ["LOGOUT"],
            mutationFn: () =>
                HTTPManager.post("registration/logout")
                    .then((response) => response.data)
                    .then((_data) => {
                        localStorage.removeItem("token");
                        toast.success("Successfully logged out!");

                        setState((state) => ({
                            ...state,
                            token: undefined,
                            myUser: undefined,
                        }));

                        Navigate({
                            to: "/registration",
                            search: { mode: "login" },
                        });
                    })
                    .catch((error) =>
                        toast.error(
                            error?.response?.data?.message ?? error?.message
                        )
                    ),
        });

    const { isLoading: isGettingMyUserLoading } = useQuery({
        queryKey: ["GET-MY-USER", state.token],
        enabled: state.token != null,
        queryFn: () =>
            HTTPManager.get("users/mine")
                .then((response) => response.data)
                .then(UserWithoutPasswordSchema.parse)
                .then((data) => ({
                    ...data,
                    birthday:
                        data.birthday != null
                            ? new Date(data.birthday)
                            : undefined,
                }))
                .then(
                    (data) => (
                        setState((state) => ({
                            ...state,
                            myUser: data,
                        })),
                        data
                    )
                )
                .catch((error) =>
                    toast.error(
                        error?.response?.data?.message ?? error?.message
                    )
                ),
    });

    return (
        <MyUserContext.Provider
            value={{
                ...state,
                isLoggingOutPending,
                isGettingMyUserLoading,
            }}
        >
            {children}
        </MyUserContext.Provider>
    );
};
