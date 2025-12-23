import { z } from "zod"

export const UserSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string(),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    role: z.enum(["admin", "user"]).default("user"),
})

export type UserType = z.infer<typeof UserSchema>