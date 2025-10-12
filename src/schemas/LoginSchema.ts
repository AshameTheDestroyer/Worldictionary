import z from "zod";
import { UserSchema } from "./UserSchema";

export const LoginSchema = z.intersection(
    UserSchema.pick({
        email: true,
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

export type LoginDTO = z.infer<typeof LoginSchema>;
