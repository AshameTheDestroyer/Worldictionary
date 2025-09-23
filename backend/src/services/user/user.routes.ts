import { Router } from "express";
import { GetUsers } from "./user.services";

export const USER_ROUTE = "users";
export const UserRouter = Router();

UserRouter.get(
    USER_ROUTE,
    // ValidateAuthenticity,
    // ValidateRateLimit(),
    GetUsers
);
