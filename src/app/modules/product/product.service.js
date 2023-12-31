import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import prisma from "../../../../prisma/index.js";

const addProduct = async productDoc => {
    try {

      const { name, categoryId, description, faq, price, address, inStock, quantity, unit, subcategory, images, thumbnail, location } = productDoc;



        const newProduct = await prisma.product.create({
            data: {
                name, categoryId,  description,  faq  ,price:parseFloat(price),address ,inStock, quantity:parseInt(quantity),unit,subcategory,images,thumbnail,location
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

const updateProduct = async (pId,productDoc) => {
    try {
        const { name, categoryId, subcategoryId, description, faq  , price, address, inStock, quantity, unit, location } = productDoc;

        const updatedProduct = await prisma.product.update({
            where: {
                id: pId
            },
            data: {
                name, categoryId, subcategoryId, description,  faq  ,price,address ,inStock, quantity,unit, location
            }
        })

        return {
            code: httpStatus.OK,
            message: "Product updated successfully",
            data: updatedProduct
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

const getProducts = async (req) => {
  try {

    console.log(req.query)

    let whereCondition = {};

    if (req.query) {

      if (req?.query?.searchString) { 

        console.log("Search:",req?.query?.searchString )

        whereCondition = {
          OR:[ { name: {
            contains: req.query.searchString,
            mode: 'insensitive'
          }},
         { description: {
            contains: req.query.searchString,
            mode: 'insensitive'
            }
            },
         { location: {
            contains: req.query.searchString,
            mode: 'insensitive'
            }
            }
          ]
        
        }
      }

      if (req?.query?.categoryId) {
        whereCondition = { ...whereCondition, categoryId: req.query.categoryId };
      }
      
      if (req?.query?.subcategory) {
        whereCondition = { ...whereCondition, subcategory: req.query.subcategory };
      }
      if (req?.query?.subcategory) {
        whereCondition = { ...whereCondition, subcategory: req.query.subcategory };
      }

      if (req?.query?.minPrice) {
        whereCondition = {
          ...whereCondition, price: {
          gt: parseFloat(req.query.minPrice)
        } };
      }
      if (req?.query?.maxPrice) {
        whereCondition = {
          ...whereCondition, price: {
          lt: parseFloat(req.query.maxPrice)
        } };
      }
      
      

    }


    const PAGE_SIZE = 10; // Adjust the page size as needed
    const page = req.query.page || 1;
    const offset = (page - 1) * PAGE_SIZE;
    
    const products = await prisma.product.findMany({
      where: whereCondition,
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: PAGE_SIZE,
    });
    

    return {
      code: httpStatus.OK,
      message: "Product fetched",
      data: products
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

const getProductbyId = async (pId) => {

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: pId
      }
    })
  
    return {
      code: httpStatus.OK,
      message: "Product fetched",
      data: product
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


const deleteProduct = async (pId) => {

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: pId
      }
    })

    return {
      code: httpStatus.OK,
      message: "Product deleted",
      data: deletedProduct
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



export const ProductService = {
    addProduct, updateProduct,getProducts,getProductbyId,deleteProduct
}