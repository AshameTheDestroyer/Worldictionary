import { UserModel } from "./user.model";
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

export const PostUser = PostDocument(UserModel);

export const PatchUser = PatchDocument(UserModel);

export const DeleteUser = DeleteDocumentByID(UserModel);

export const DeleteAllUsers = DeleteAllDocuments(UserModel);
