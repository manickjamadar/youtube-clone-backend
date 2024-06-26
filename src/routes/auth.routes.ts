import { Router } from "express";
import authController from "../controllers/auth/auth.controller";
import localFileUpload from "../middlewares/localFileUpload.middleware";
import validatePayload from "../middlewares/validatePayload.middleware";
import {
	LoginPayloadSchema,
	RegisterPayloadSchema,
} from "../controllers/auth/schema";
import { RegisterRequest } from "../controllers/auth/types";
import authenticatedRoute from "../middlewares/authenticatedRoute";

const authRouter = Router();
//send mail to registered user for veifying email
authRouter.post(
	"/register",
	localFileUpload.fields([
		{ name: "avatar", maxCount: 1 },
		{ name: "coverImage", maxCount: 1 },
	]),
	validatePayload({
		schema: RegisterPayloadSchema,
		errorMessage: "Registering fields are invalid",
	}),
	authController.register
);
authRouter.post(
	"/login",
	validatePayload({
		schema: LoginPayloadSchema,
		errorMessage: "Login fields are invalid",
	}),
	authController.login
);
authRouter.post("/logout", authenticatedRoute, authController.logout);
//authRouter.post("/verify-email")
// authRouter.post("/refresh-token")
// authRouter.post("/auto-login")
// authRouter.post("/forgot-password")
// authRouter.post("/reset-password")
export default authRouter;
