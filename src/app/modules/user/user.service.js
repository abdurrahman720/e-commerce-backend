import ApiError from "../../../errors/ApiError.js";
import config from "../../../config/config.js";
import bcrypt from 'bcrypt'
import httpStatus from "http-status";
import prisma from "../../../../prisma/index.js";
import axios from "axios";

const createUser = async userDoc => {

    try {


        const isUserExist = await prisma.user.findUnique({
            where: { email: userDoc.email }
        });
    
        if (isUserExist) {

        throw new ApiError(httpStatus.CONFLICT,"User Already Exists");
        }
        
        const response = await axios.get('http://ip-api.com/json');
        const country = response.data.country;

        console.log("country", country);

        const hashedPassword = await bcrypt.hash(userDoc.password, 12);
        console.log("hashedPassword",hashedPassword)
    
        const newUser = await prisma.user.create({
            data: {
            name: userDoc?.name,
            hashedPassword,
                email: userDoc.email,
                address: userDoc.address
                ? {
                    create: {
                      city: userDoc.address.city,
                      country: userDoc.address.country,
                      line1: userDoc.address.line1,
                      line2: userDoc.address.line2,
                      postalCode: userDoc.address.postalCode,
                      state: userDoc.address.state,
                    },
                  }
                : undefined,
            country
           }
        })
    
    
        return {
            code: httpStatus.OK,
            message: 'User created successfully!',
            data: newUser
            }
    }
    catch (err) {
        console.log(err)


  if (err instanceof ApiError) {
    // If it's an instance of ApiError, send the error response
    return {
      code: err.statusCode,
      message: err.message,
      data: null,
    };
  } else {
    // For other unexpected errors, log the error and send a generic error response
    console.error("Unexpected error:", err);
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      data: null,
    };
  }

    }

}

export const UserService = {
    createUser
}