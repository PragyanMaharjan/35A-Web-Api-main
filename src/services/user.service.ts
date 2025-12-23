import { createUserDto, CreateUserDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import bcryptjs from "bcryptjs";

let userRepository = new UserRepository();

export class UserService {
    async registerUser(data: createUserDto){
        // Business logic, check duplicate username/email,hash
        const checkEmail = await userRepository.getUserByEmail(data.email);
        if (checkEmail) {
            throw new Error("Email already in use")
        }
        const checkUsername = await userRepository.getUserByUsername(data.username);
        if (checkUsername){
            throw new Error("Username already in use");
        }
        //hash/encrypt password, to not store plain text password - secuirty risk
        const hashedPassword = await bcryptjs.hash(data.password, 10); //10 - complexity
        data.password = hashedPassword; //update the password with hased one
        const newUser = await userRepository.createUser(data);

        return newUser;

    }
}


// What is password hassing
// plain text lai change garere naya text banauni 
