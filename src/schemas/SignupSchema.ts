import z from "zod";
import { UserSchema } from "./UserSchema";

export const SignupSchema = z.intersection(
    UserSchema.pick({
        email: true,
        gender: true,
        birthday: true,
        username: true,
        "last-name": true,
        "first-name": true,
    }),
    z.object({
        password: z
            .string("required")
            .min(8, "minimum")
            .max(20, "maximum")
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
                "pattern"
            ),
    })
);

export type SignupDTO = z.infer<typeof SignupSchema>;
