
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




export const UserController = {
    createUser,loginUser,getUserByToken
}