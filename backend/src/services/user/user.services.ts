import { UserModel } from "./user.model";
import { GetDocuments } from "src/utils";
import { RequestHandler } from "express";

export const GetUsers: RequestHandler = GetDocuments(
    UserModel,
    "-password",
    "-_loginToken",
    "-_resetToken",
    "-_resetTokenExpirationDate"
);
