import { Router } from "express";
import { Upload } from "src/middlewares/upload";
import { Role } from "../../../../src/schemas/UserSchema";
import {
    ValidateRateLimit,
    ValidateAuthority,
    ValidateAuthenticity,
} from "src/middlewares";
import {
    GetUsers,
    PostUser,
    PatchUser,
    GetMyUser,
    DeleteUser,
    PatchMyUser,
    DeleteAllUsers,
    PatchMyUserImage,
    GetUserByUsername,
    DeleteMyUserImage,
} from "./user.services";

export const USER_ROUTE = "/users";
export const UserRouter = Router();

UserRouter.get(
    `${USER_ROUTE}/mine`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    GetMyUser
);

UserRouter.get(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    GetUsers
);

UserRouter.get(
    `${USER_ROUTE}/:username`,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    GetUserByUsername
);

UserRouter.post(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    PostUser
);

UserRouter.patch(
    `${USER_ROUTE}/mine/image`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    Upload.single("file"),
    PatchMyUserImage
);

UserRouter.patch(
    `${USER_ROUTE}/mine`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    PatchMyUser
);

UserRouter.patch(
    `${USER_ROUTE}/:username`,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    PatchUser
);

UserRouter.delete(
    `${USER_ROUTE}/mine/image`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    DeleteMyUserImage
);

UserRouter.delete(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    DeleteAllUsers
);

UserRouter.delete(
    `${USER_ROUTE}/:username`,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    DeleteUser
);
