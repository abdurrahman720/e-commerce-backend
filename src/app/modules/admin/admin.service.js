import httpStatus from "http-status";
import prisma from "../../../../prisma/index.js";
import ApiError from "../../../errors/ApiError.js";

const addCategory = async categoryDoc => {
    try {

        const { name, subcategories } = categoryDoc;
        
 
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

const addFooter = async (footerDoc) => {
  try { 
    const { name, footerItems } = footerDoc;

    const footer = await prisma.footer.create({
      data: {
        name: name,
        footerItems: footerItems
      }
    })
      
    return {
      code: httpStatus.OK,
      message: "Footer created successfully",
      data: footer
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


const editFooter = async (fId, footerDoc) => {
  try {

      const { name, footerItems } = footerDoc;
      

      const footer = await prisma.footer.update({
          where: {
              id: fId
          },
          data: {
              name: name,
              footerItems: footerItems
          }
      });
      
      


      return {
          code: httpStatus.OK,
          message: "Footer udpated successfully",
          data: footer
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

const getCategories = async () => {

  try { 

    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    return {
      code: httpStatus.OK,
      message: "Categories fetched successfully",
      data: categories
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
const getFooter = async () => {

  try { 

    const footer = await prisma.footer.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    return {
      code: httpStatus.OK,
      message: "Footer fetched successfully",
      data: footer
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


const deleteCategory = async (cId) => {
  console.log("cid:", cId)

  try {
  
    
    const deletedCategory = await prisma.category.delete({
      where: {
        id: cId,
      },
    });

   

    return {
      code: httpStatus.OK,
      message: "Category deleted",
      data: deletedCategory,
    };
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

const deleteFooter = async (fId) => {

  try {
    const deletedFooter = await prisma.footer.delete({
      where: {
        id: fId
      }
    })

    return {
      code: httpStatus.OK,
      message: "Category deleted",
      data: deletedFooter
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
 addCategory,editCategory,addFooter,editFooter,getCategories,getFooter,deleteCategory,deleteFooter
}