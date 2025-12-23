import z, { email } from "zod";
import { UserSchema } from "../types/user.types";

export const CreateUserDto = UserSchema.pick(
    {
        username: true,
        email:true,
        password: true,
        firstName: true,
        lastName: true,
    }
) .extend ( // add new attribute to schema
    {
        confirmPassword: z.string().min(6),
    }
).refine(
    (data) => data.password === data.confirmPassword,
    {
        message:"Passwords do not match",
        path: ["confirm password"],
    }
);

export type createUserDto = z.infer<typeof CreateUserDto>;
