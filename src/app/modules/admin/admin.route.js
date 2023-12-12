import express  from "express";
import { AdminController } from "./admin.controller.js";
import auth from "../../middlewares/auth.js"

const router = express.Router();

router.post('/add-category', AdminController.addCategory);
router.patch('/edit-category/:id', AdminController.editCategory)
router.patch('/edit-footer/:id', AdminController.editFooter)
router.post('/add-footer', AdminController.addFooter)
router.get('/get-categories', AdminController.getCategories)
router.get('/get-footer', AdminController.getFooter)
router.delete('/delete-category/:id', AdminController.deleteCategory)
router.delete('/delete-footer/:id', AdminController.deleteFooter)

export const AdminRoutes = router;