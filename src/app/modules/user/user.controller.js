
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { UserService } from "./user.service.js";

const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUser(req.body);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})
const loginUser = catchAsync(async (req, res) => {
    const result = await UserService.loginUser(req.body);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})
const getUserByToken = catchAsync(async (req, res) => {

    const result = await UserService.getUserByToken(req.headers.authorization);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})
const sendPassResetToken = catchAsync(async (req, res) => {
    const { email } = req.query;
    console.log(email)

    const result = await UserService.sendPassResetToken(email);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})
const passwordReset = catchAsync(async (req, res) => {
    console.log(req.body)

    const { newPass, token } = req.body;

    const result = await UserService.passwordReset(newPass, token);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})




export const UserController = {
    createUser,loginUser,getUserByToken,sendPassResetToken,passwordReset
}