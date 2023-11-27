import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import prisma from "../../../../prisma/index.js";

const addProduct = async productDoc => {
    try {

        const {name, categoryId, subcategoryId, description, howItWorks,careGuide,deliveryReturns,price,address ,inStock, quantity,unit } = productDoc;


        const newProduct = await prisma.product.create({
            data: {
                name, categoryId, subcategoryId, description, howItWorks,careGuide,deliveryReturns,price:parseFloat(price),address ,inStock, quantity,unit
            }
        })

        return {
            code: httpStatus.OK,
            message: "Product created successfully",
            data: newProduct
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



export const AdminService = {
    addProduct
}