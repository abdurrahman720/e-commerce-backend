import httpStatus from "http-status";
import prisma from "../../../../prisma/index.js";
import ApiError from "../../../errors/ApiError.js";

const addCategory = async categoryDoc => {
    try {

        const { name, subcategories } = categoryDoc;
        
        console.log("Subcategories:", subcategories);
        const category = await prisma.category.create({
            data: {
                name: name,
                subcategories: subcategories
            }
        });
        
        


        return {
            code: httpStatus.OK,
            message: "Category created successfully",
            data: category
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

const editCategory = async (cId, categoryDoc) => {
    try {

        const { name, subcategories } = categoryDoc;
        
        console.log("Subcategories:", subcategories);
        const category = await prisma.category.update({
            where: {
                id: cId
            },
            data: {
                name: name,
                subcategories: subcategories
            }
        });
        
        


        return {
            code: httpStatus.OK,
            message: "Category udpated successfully",
            data: category
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
 addCategory,editCategory
}