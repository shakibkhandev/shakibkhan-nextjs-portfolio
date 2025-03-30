import express from 'express';
import { authRoutes } from './auth.routes';
import { blogRoutes } from './blog.routes';
import { userRoutes } from './user.routes';


export const routes = express.Router();

routes.use("/auth", authRoutes)
routes.use("/blogs", blogRoutes)
routes.use("/users", userRoutes)
