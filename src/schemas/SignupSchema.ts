import z from "zod";
import { UserSchema } from "./UserSchema";

export const SignupSchema = UserSchema.pick({
    email: true,
    gender: true,
    birthday: true,
    password: true,
    username: true,
    "last-name": true,
    "first-name": true,
});

export type SignupDTO = z.infer<typeof SignupSchema>;
