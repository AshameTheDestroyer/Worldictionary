import { AxiosError } from "axios";

export type HTTPError = AxiosError<{
    detail: string;
}>;

export type User = {
    name: string;
    email: string;
    role: "user" | "admin";
};
