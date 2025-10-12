import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { HTTPManager } from "@/managers/HTTPManager";
import { UserDTO } from "../../../src/schemas/UserSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    FC,
    useState,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";

export type MyUserStateProps = {
    token?: string;
    myUser?: UserDTO;
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
        Omit<
            MyUserStateProps,
            "data" | "isLoggingOutPending" | "isGettingMyUserLoading"
        >
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

    const { data: myUser, isLoading: isGettingMyUserLoading } = useQuery({
        queryKey: ["GET-MY-USER"],
        enabled: state.token != null,
        queryFn: () =>
            HTTPManager.get("users/mine")
                .then((response) => response.data)
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
                myUser,
                isLoggingOutPending,
                isGettingMyUserLoading,
            }}
        >
            {children}
        </MyUserContext.Provider>
    );
};
