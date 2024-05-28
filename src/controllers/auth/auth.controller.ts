import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/ApiError";
import { RegisterRequest } from "./types";
const register = asyncHandler(async (req: RegisterRequest, res: Response) => {
	//getting the payload
	//validating the payload
	//check whether user is exist or not by username and email
	//get avatar image and upload to cloudinary and get cloud url
	//create new user
	//save the user
	//return response
	res.json({
		message: "Registering",
		data: req.body,
	});
});
const login = asyncHandler(async (req: Request, res: Response) => {
	res.json({
		message: "Logining...",
	});
});

const authController = {
	register,
	login,
};
export default authController;
