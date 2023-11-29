import express from 'express';
import { UserRoutes } from '../modules/user/user.route.js';
import {AdminRoutes } from '../modules/admin/admin.route.js'
import { ProductRoutes } from '../modules/product/product.route.js';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/product',
        route: ProductRoutes
    }
]

moduleRoutes?.forEach(route => router.use(route.path, route.route))

export default router;