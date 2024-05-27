import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/ApiError";
const register = asyncHandler(async (req: Request, res: Response) => {
	res.json({
		message: "Registering",
	});
});
const login = asyncHandler(async (req: Request, res: Response) => {
	throw new ApiError({ statusCode: 400, message: "No payload available" });
	res.json({
		message: "Logining...",
	});
});

const authController = {
	register,
	login,
};
export default authController;
