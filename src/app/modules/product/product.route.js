import express  from "express";
import { ProductController } from "./product.controller.js";


const router = express.Router();

router.post('/add-product', ProductController.addProduct)
router.patch('/update-product/:id', ProductController.updateProduct)
router.get('/get-products', ProductController.getProducts)
router.get('/get-product/:id', ProductController.getProductbyId)


export const ProductRoutes = router;