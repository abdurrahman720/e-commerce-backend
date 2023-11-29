import express  from "express";
import { AdminController } from "./admin.controller.js";

const router = express.Router();

router.post('/add-category', AdminController.addCategory);
router.patch('/edit-category/:id', AdminController.editCategory)

export const AdminRoutes = router;