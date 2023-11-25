import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { UserService } from "./user.service.js";

const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUser(req.body);

    const { code, message } = result;

    sendResponse(res, {
        statusCode: code,
        success: true,
        message,
        data: result
    })
})

export const UserController = {
    createUser
}