import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import {
	LoginRequest,
	LoginResponse,
	LoginResponseData,
	RegisterRequest,
	RegisterRequestFiles,
	RegisterResponse,
	RegisterResponseData,
} from "./types";
import User from "../../models/user.model";
import ApiError from "../../utils/ApiError";
import cloudinaryFileStorageService from "../../services/storageService/CloudinaryFileStorageService";
import ApiResponse from "../../utils/ApiResponse";
const register = asyncHandler(
	async (req: RegisterRequest, res: RegisterResponse) => {
		//validating the payload with middleware
		//getting the payload
		let { email, fullName, password, username } = req.body;
		//check whether user is exist or not by username and email
		const existedUser = await User.findOne({
			$or: [{ username }, { email }],
		});
		if (existedUser) {
			throw new ApiError({ statusCode: 409, message: "User already exists" });
		}
		//get avatar image and cover image
		const files = req.files as RegisterRequestFiles;
		if (!files) {
			throw new ApiError({
				statusCode: 500,
				message: "Files not uploaded properly",
			});
		}
		const avatarLocalPath = files.avatar?.[0]?.path;
		const coverImageLocalPath = files.coverImage?.[0]?.path;
		if (!avatarLocalPath) {
			throw new ApiError({ statusCode: 400, message: "Avatar is required" });
		}
		// upload to cloudinary and get cloud url
		let avatarCloudUrl: string;
		let coverImageCloudUrl: string | undefined;
		try {
			const { url } = await cloudinaryFileStorageService.upload(
				avatarLocalPath,
				{ removeFile: true }
			);
			avatarCloudUrl = url;
			if (coverImageLocalPath) {
				const { url } = await cloudinaryFileStorageService.upload(
					coverImageLocalPath,
					{ removeFile: true }
				);
				coverImageCloudUrl = url;
			}
		} catch (error) {
			console.log(console.log(error));
			throw new ApiError({
				statusCode: 500,
				message: "Uploading images failed",
			});
		}
		//create new user
		const user = await new User({
			email,
			fullName,
			password,
			username,
			avatar: avatarCloudUrl,
			coverImage: coverImageCloudUrl,
		});
		//save the user
		await user.save();
		//return response
		const response = new ApiResponse<RegisterResponseData>({
			statusCode: 201,
			message: "User created successfully",
			data: {
				_id: user._id.toHexString(),
				fullName: user.fullName,
				username: user.username,
				email: user.email,
				avatar: avatarCloudUrl,
				coverImage: coverImageCloudUrl,
			},
		});
		res.status(response.statusCode).json(response.toJson());
	}
);
const login = asyncHandler(async (req: LoginRequest, res: LoginResponse) => {
	// validating the payload with middleware - email and password, Done;
	const payload = req.body;
	// check if user exists by email or username;
	const user = await User.findOne({
		$or: [{ username: payload.username }, { email: payload.email }],
	});
	if (!user) {
		throw new ApiError({ message: "User not found", statusCode: 404 });
	}
	// if exists check password is correct or not
	const isPasswordCorrect = await user.comparePassword(payload.password);
	if (!isPasswordCorrect) {
		throw new ApiError({ message: "Invalid Credentials", statusCode: 410 });
	}
	// generate access token and refresh token
	const accessToken = user.generateAccessToken();
	const refreshToken = user.generateRefreshToken();
	user.refreshToken = refreshToken;
	await user.save();
	// send access token ad refresh token in cookies
	// const cookiesOptions = {
	// 	httpOnl
	// }
	// return user
	const response = new ApiResponse<LoginResponseData>({
		message: "User logged in successfully",
		statusCode: 200,
		data: {
			accessToken,
			refreshToken,
			user,
		},
	});
	res
		.status(response.statusCode)
		.cookie("accessToken", accessToken, { httpOnly: true })
		.cookie("refreshToken", refreshToken, { httpOnly: true })
		.json(response.toJson());
});
const logout = asyncHandler(async (req, res, next) => {});
const authController = {
	register,
	login,
};
export default authController;
