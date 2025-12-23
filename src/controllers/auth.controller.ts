import { error } from "console";
import { CreateUserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import z, { success } from "zod";
import { parse } from "path";

let userService = new UserService();
export class AuthController {
    async register(req: Request, res: Response) {
        try{
            const parsedData = CreateUserDto.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    {sucess: false, errors: z.prettifyError(parsedData.error) }
                ); //z.prettifyError - better error message(zod)
            }
            const newUser = await userService.registerUser(parsedData.data);
            return res.status(201).json(
                {sucess: true, data: newUser, message: "Register Sucess"}
            );
        }catch(error: Error | any){
            return res.status(500).json(
                {success: false, message: error.message || "Internal Server Error"}
            )
        }
    }

}