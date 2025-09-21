import z from "zod";
import { SignupSchema } from "./SignupSchema";

export const LoginSchema = SignupSchema.pick({
    email: true,
    password: true,
});

export type LoginDTO = z.infer<typeof LoginSchema>;
