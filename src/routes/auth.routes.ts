import { Router } from "express";
import authController from "../controllers/auth/auth.controller";
import localFileUpload from "../middlewares/localFileUpload.middleware";
import validatePayload from "../middlewares/validatePayload.middleware";
import { RegisterPayloadSchema } from "../controllers/auth/schema";
import { RegisterRequest } from "../controllers/auth/types";

const authRouter = Router();
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
authRouter.post("/login", authController.login);
export default authRouter;
