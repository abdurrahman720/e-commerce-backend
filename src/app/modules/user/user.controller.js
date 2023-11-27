
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

export const UserController = {
    createUser
}