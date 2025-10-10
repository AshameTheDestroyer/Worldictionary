import { Router } from "express";
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
    DeleteUser,
    GetUserByID,
    DeleteAllUsers,
} from "./user.services";

export const USER_ROUTE = "/users";
export const UserRouter = Router();

UserRouter.get(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    GetUsers
);

UserRouter.get(
    `${USER_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    GetUserByID
);

UserRouter.post(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    PostUser
);

UserRouter.patch(
    `${USER_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    PatchUser
);

UserRouter.delete(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    DeleteAllUsers
);

UserRouter.delete(
    `${USER_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateAuthority(Role.admin),
    ValidateRateLimit({ checkRole: true }),
    DeleteUser
);
