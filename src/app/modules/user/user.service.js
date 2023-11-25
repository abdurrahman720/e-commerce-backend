import ApiError from "../../../errors/ApiError.js";
import { User } from "../../model/user.model.js";   
import config from "../../../config/config.js";
import bcrypt from 'bcrypt'
import httpStatus from "http-status";

const createUser = async user => {
    const isUserExist = await User.findOne({ email: user?.email });

    if (isUserExist) {
       throw new ApiError(httpStatus.CONFLICT, "User already exists")
    }

    const hashedPassword = await bcrypt.hash(user.password,  config.bcrypt_salt_rounds)

        const data = {
            fullname: user.fullname,
            email: user.email,
            hashedPassword
        }
    await User.create(data);
    
    return {
        code: httpStatus.OK,
        message: 'User created successfully!'
        }

}

export const UserService = {
    createUser
}