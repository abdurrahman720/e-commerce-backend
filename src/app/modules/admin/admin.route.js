import express  from "express";
import { AdminController } from "./admin.controller.js";

const router = express.Router();

router.post('/add-product', AdminController.addProduct)


export const AdminRoutes = router;