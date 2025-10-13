import { Handler } from "express";
import { UserModel } from "./user.model";
import Jwt, { JwtPayload } from "jsonwebtoken";
import {
    GetDocuments,
    PostDocument,
    PatchDocument,
    GetDocumentByID,
    DeleteDocumentByID,
    DeleteAllDocuments,
} from "src/utils";

export const GetUsers = GetDocuments(
    UserModel,
    "-password",
    "-_loginToken",
    "-_resetToken",
    "-_resetTokenExpirationDate"
);

export const GetUserByID = GetDocumentByID(
    UserModel,
    "-password",
    "-_loginToken",
    "-_resetToken",
    "-_resetTokenExpirationDate"
);

export const GetMyUser: Handler = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = Jwt.verify(token, process.env["JWT_KEY"]!);

        const _request = request as typeof request & { userID: string };
        const _payload = payload as (JwtPayload | string) & { userID: string };

        _request["userID"] = _payload["userID"];

        const user = await UserModel.findById(_payload["userID"]).select([
            "-password",
            "-_loginToken",
            "-_resetToken",
            "-_resetTokenExpirationDate",
        ]);

        if (user == null) {
            return response.status(404).json({ message: "User isn't found." });
        }

        return response.json(user);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const PostUser = PostDocument(UserModel);

export const PatchUser = PatchDocument(UserModel);

export const PatchMyUser: Handler = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = Jwt.verify(token, process.env["JWT_KEY"]!);

        const _request = request as typeof request & { userID: string };
        const _payload = payload as (JwtPayload | string) & { userID: string };

        _request["userID"] = _payload["userID"];

        const user = await UserModel.findByIdAndUpdate(
            _payload["userID"],
            request.body,
            {
                new: true,
                runValidators: true,
            }
        ).select([
            "-password",
            "-_loginToken",
            "-_resetToken",
            "-_resetTokenExpirationDate",
        ]);

        if (user == null) {
            return response.status(404).json({ message: "User isn't found." });
        }

        return response.json(user);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const DeleteUser = DeleteDocumentByID(UserModel);

export const DeleteAllUsers = DeleteAllDocuments(UserModel);
