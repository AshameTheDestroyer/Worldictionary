import z from "zod";

export enum Gender {
    male = "male",
    female = "female",
}

export enum Role {
    user = "user",
    admin = "admin",
}

export const UserSchema = z.object({
    image: z.url().optional(),
    email: z.email("required"),
    role: z.enum(Role, "required"),
    password: z.string("required"),
    gender: z.enum(Gender, "required"),
    birthday: z.coerce.date().optional(),
    username: z
        .string("required")
        .min(4, "minimum")
        .max(20, "maximum")
        .regex(/^@[a-z\d]+$/, "pattern"),
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
});

export type UserDTO = z.infer<typeof UserSchema>;
