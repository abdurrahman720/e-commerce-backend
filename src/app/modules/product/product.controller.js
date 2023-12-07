
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { ProductService } from "./product.service.js";



const addProduct = catchAsync(async (req, res) => {

    const result = await ProductService.addProduct(req.body);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})

const updateProduct = catchAsync(async (req, res) => {

    const id = req.params.id;
    const productDoc = req.body;

    const result = await ProductService.updateProduct(id, productDoc);


    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})


const getProducts = catchAsync(async (req, res) => {

    const result = await ProductService.getProducts(req)

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })
})

const getProductbyId = catchAsync(async (req, res) => {

    const { id } = req.params;
    console.log("id",id)
    const result = await ProductService.getProductbyId(id);

    sendResponse(res, {
        statusCode: result?.code,
        success: result?.success,
        message: result?.message,
       data: result?.data
    })

})




export const ProductController = {
    addProduct,updateProduct,getProducts,getProductbyId
}