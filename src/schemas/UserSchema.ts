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
    email: z.email("required"),
    image: z.string().optional(),
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

export const PatchableUserSchema = UserSchema.omit({
    role: true,
    email: true,
    password: true,
}).partial();

export const UserWithoutPasswordSchema = UserSchema.omit({ password: true });

export type UserDTO = z.infer<typeof UserSchema>;
export type PatchableUserDTO = z.infer<typeof PatchableUserSchema>;
export type UserWithoutPasswordDTO = z.infer<typeof UserWithoutPasswordSchema>;
