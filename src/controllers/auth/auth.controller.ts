import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { RegisterRequest } from "./types";
const register = asyncHandler(async (req: RegisterRequest, res: Response) => {
	//getting the payload
	let payload = req.body;
	//validating the payload with middleware
	//check whether user is exist or not by username and email
	//get avatar image and cover image and upload to cloudinary and get cloud url
	//create new user
	//save the user
	//return response
	res.json({
		message: "Registering",
		data: payload,
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
