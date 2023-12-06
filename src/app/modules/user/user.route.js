import express from 'express';
import { UserController } from './user.controller.js';


const router = express.Router();

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser)
router.get('/userByToken',UserController.getUserByToken)

export const UserRoutes = router;