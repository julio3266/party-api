import { Router } from "express";
import { UserController } from "./Controller/UserController";
import { AuthController } from "./Controller/AuthController";
import { AuthMiddlewares } from "./Middlewares/auth";

export const router = Router();

const usercontroller = new UserController();
const authController = new AuthController();

//USER
router.post("/user/create", usercontroller.create);
router.get("/user/list", AuthMiddlewares, usercontroller.list);
//JWT AUTH
router.post("/auth", authController.auth);
