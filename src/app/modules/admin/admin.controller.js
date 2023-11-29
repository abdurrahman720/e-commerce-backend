import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { AdminService } from "./admin.service.js";

const addCategory = catchAsync(async (req, res) => {
    const result = await AdminService.addCategory(req.body);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})


const editCategory = catchAsync(async (req, res) => {
    const id = req.params.id;
    const categoryDoc = req.body;
    const result = await AdminService.editCategory(id, categoryDoc);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})


export const AdminController = {
    addCategory,editCategory
}