import ApiError from "../../../errors/ApiError.js";

import bcrypt from 'bcrypt'
import httpStatus from "http-status";
import prisma from "../../../../prisma/index.js";
import axios from "axios";
import { jwtHelpers } from "../../../helpers/jwtHelper.js";
import { sendEmail } from "../../../helpers/sendEmail.js";

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



        const hashedPassword = await bcrypt.hash(userDoc.password, 12);
     
    
        const newUser = await prisma.user.create({
            data: {
            name: `${userDoc?.firstName} ${userDoc?.lastName}`,
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
                contact:userDoc.contact,
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

const loginUser = async userDoc => {
  try { 
    const user = await prisma.user.findUnique({
      where: { email: userDoc.email }
  });

  if (!user) {
  throw new ApiError(httpStatus.NOT_FOUND,"User does not exist");
  }
    
  const passwordsMatch = await bcrypt.compare(
    userDoc.password,
    user.hashedPassword
  );

  if (!passwordsMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

    const getUser = await prisma.user.findUnique(
      {
        where: { email: userDoc.email },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          country: true,
          createdAt: true,
          updatedAt: true,
          role: true,
          reviews: true,
          Order: true,
          address: true,
          contact: true
        },
    }
    
    )

    const token = jwtHelpers.createToken({
     email: user.email,
      role: user.role
    })
    


      return {
        code: httpStatus.OK,
        message: 'User logged in successfully!',
        data: {token:token, user:getUser}
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

const getUserByToken = async (token) => {
  try { 

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const verifiedUser = jwtHelpers.verifyToken(token);
    if (!verifiedUser) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: verifiedUser.email
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        country: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        reviews: true,
        Order: true,
        address: true,
        contact: true
      },
    })

    return {
      code: httpStatus.OK,
      message: 'User logged in successfully!',
      data: currentUser
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

const sendPassResetToken = async (userEmail) => {
  try {

    console.log(userEmail);


    const user = await prisma.user.findUnique({
      where: {
      email: userEmail
      },
      select: {
        id:true
      }
     
    })
    
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }


    if (user) {
    
      const res = await sendEmail({email: userEmail, userId: user.id})
 

      return {
        code: httpStatus.OK,
        message: 'Password reset mail sent successfully!',
        data: res
        }
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

const passwordReset = async (newPass, token) => {

  if (!newPass) {
    throw new ApiError(httpStatus.NO_CONTENT,"New password is required")
  }

  const hashedPassword = await bcrypt.hash(newPass, 12);

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetTokenExpiry: {
        gt: new Date()
      }
    }
  })

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED,"Invalid Token")
  }

  try {
    const res = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpiry: null
      }
    })

    return {
      code: httpStatus.OK,
      message: 'Password reseted successfully!',
      data: res
      }
  }
  catch (err) {
    console.log(err)
  }


}

export const UserService = {
    createUser,loginUser,getUserByToken,sendPassResetToken,passwordReset
}