import { model, Schema } from "mongoose";
import { LooseRecord } from "../../../../src/types";
import {
    Gender,
    Role,
    UserDTO,
    UserSchema,
} from "../../../../src/schemas/UserSchema";

export const UserDBSchema = new Schema(
    {
        birthday: Date,
        "last-name": String,
        role: { type: String, enum: Role },
        gender: { type: String, enum: Gender },
        password: { type: String, required: true },
        "first-name": { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },

        _loginToken: String,
        _resetToken: String,
        _resetTokenExpirationDate: Number,
    } satisfies LooseRecord<keyof UserDTO, any>,
    {
        autoIndex: false,
        timestamps: true,
        versionKey: false,
    }
);

export const UserModel = model("User", UserDBSchema);

UserModel.prependListener("save", (user, next) =>
    UserSchema.parseAsync(user).then(next)
);
