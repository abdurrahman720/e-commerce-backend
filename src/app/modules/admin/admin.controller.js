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

const addFooter = catchAsync(async (req, res) => {
    const result = await AdminService.addFooter(req.body);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})

const editFooter = catchAsync(async (req, res) => {
    const fid = req.params.id;
    const footerDoc = req.body;
    const result = await AdminService.editFooter(fid, footerDoc);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})

const getCategories = catchAsync(async (req, res) => {

    const result = await AdminService.getCategories();
    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})
const getFooter = catchAsync(async (req, res) => {

    const result = await AdminService.getFooter();
    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})

const deleteCategory = catchAsync(async (req, res) => {

    const { id } = req.params;

    const result = await AdminService.deleteCategory(id);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})
const deleteFooter = catchAsync(async (req, res) => {

    const { id } = req.params;

    const result = await AdminService.deleteFooter(id);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})


export const AdminController = {
    addCategory,editCategory,addFooter,editFooter,getCategories,getFooter,deleteCategory,deleteFooter
}