import z from "zod";

export enum Gender {
    male = "male",
    female = "female",
}

export const UserSchema = z.object({
    email: z.email("required"),
    birthday: z.date().optional(),
    gender: z.enum(Gender, "required"),
    username: z
        .string("required")
        .min(4, "minimum")
        .max(16, "maximum")
        .regex(/^@[a-zA-Z]+$/, "pattern"),
    "first-name": z
        .string("required")
        .min(2, "minimum")
        .max(20, "maximum")
        .regex(/^\S+$/, "pattern"),
    "last-name": z
        .string()
        .min(2, "minimum")
        .max(20, "maximum")
        .regex(/^\S+$/, "pattern")
        .optional(),
    password: z
        .string("required")
        .min(8, "minimum")
        .max(20, "maximum")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
            "pattern"
        ),
});

export type UserDTO = z.infer<typeof UserSchema>;
