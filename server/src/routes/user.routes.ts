import express from "express";

import { verifyJWT } from "../middlewares/verify.middlewares";
import { changeCurrentPassword, deleteProfileInformation, getProfileInformation, updateProfileInformation } from "../controllers/user.controllers";

export const userRoutes = express.Router();


userRoutes.get("/profile", verifyJWT, getProfileInformation)
userRoutes.put("/profile", verifyJWT, updateProfileInformation)
userRoutes.delete("/profile", verifyJWT, deleteProfileInformation)
userRoutes.put("/profile/change-password", verifyJWT, changeCurrentPassword)


