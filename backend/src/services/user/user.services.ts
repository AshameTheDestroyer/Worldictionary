import { RequestHandler } from "express";
import { UserModel } from "./user.model";

export const GetUsers: RequestHandler = async (request, response) => {
    return UserModel.find();
};
