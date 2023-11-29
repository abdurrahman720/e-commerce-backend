import express  from "express";
import { AdminController } from "./admin.controller.js";

const router = express.Router();

router.post('/add-category', AdminController.addCategory);
router.patch('/edit-category/:id', AdminController.editCategory)
router.patch('/edit-footer/:id', AdminController.editFooter)
router.post('/add-footer', AdminController.addFooter)
router.get('/get-categories', AdminController.getCategories)
router.get('/get-footer', AdminController.getFooter)

export const AdminRoutes = router;