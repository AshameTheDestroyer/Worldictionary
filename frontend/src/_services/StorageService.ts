import { User } from "@/types";

export class StorageService {
    private static get _sessionStorage() {
        return typeof window != "undefined" ? window.sessionStorage : undefined;
    }

    public static GetLocalAccessToken() {
        return this._sessionStorage?.getItem("token") as string | undefined;
    }

    public static SetLocalAccessToken(token: string) {
        this._sessionStorage?.setItem("token", token);
    }

    public static GetUserPersonalInformation() {
        try {
            return JSON.parse(this._sessionStorage?.getItem("user")!) as User;
        } catch {
            return undefined;
        }
    }

    public static SetUserPersonalInformation(user?: User) {
        this._sessionStorage?.setItem("user", JSON.stringify(user));
    }

    public static GetUserID() {
        try {
            return Number(this._sessionStorage?.getItem("userID"));
        } catch {
            return undefined;
        }
    }

    public static SetUserID(userID: number) {
        this._sessionStorage?.setItem("userID", `${userID}`);
    }

    public static GetUserPhone() {
        return this._sessionStorage?.getItem("userPhone") as string | undefined;
    }

    public static SetUserPhone(userPhone: string) {
        this._sessionStorage?.setItem("userPhone", userPhone);
    }

    public static ClearAll() {
        ["token", "user", "userID", "userPhone"].forEach((key) =>
            this._sessionStorage?.removeItem(key),
        );
    }

    public static get isUserLoggedIn() {
        return StorageService.GetLocalAccessToken() != null;
    }
}
