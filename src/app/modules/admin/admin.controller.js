
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { AdminService } from "./admin.service.js";


const addProduct = catchAsync(async (req, res) => {
    const result = await AdminService.addProduct(req.body);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})

// const addCategory = catchAsync(async (req, res) => {
//     const result = await 
// })

export const AdminController = {
    addProduct
}