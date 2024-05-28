import { Router } from "express";
import authController from "../controllers/auth/auth.controller";
import localFileUpload from "../middlewares/localFileUpload.middleware";

const authRouter = Router();
authRouter.post(
	"/register",
	localFileUpload.fields([
		{ name: "avatar", maxCount: 1 },
		{ name: "coverImage", maxCount: 1 },
	]),
	authController.register
);
authRouter.post("/login", authController.login);
export default authRouter;
