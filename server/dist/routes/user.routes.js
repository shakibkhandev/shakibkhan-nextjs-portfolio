"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verify_middlewares_1 = require("../middlewares/verify.middlewares");
const user_controllers_1 = require("../controllers/user.controllers");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.get("/profile", verify_middlewares_1.verifyJWT, user_controllers_1.getProfileInformation);
exports.userRoutes.put("/profile", verify_middlewares_1.verifyJWT, user_controllers_1.updateProfileInformation);
exports.userRoutes.delete("/profile", verify_middlewares_1.verifyJWT, user_controllers_1.deleteProfileInformation);
exports.userRoutes.put("/profile/change-password", verify_middlewares_1.verifyJWT, user_controllers_1.changeCurrentPassword);
