import { Request, Response } from "express";
import { IRawUser, IUser } from "../../models/user.model";
import { ApiResponseBody } from "../../utils/ApiResponse";

export type RegisterPayload = Pick<
	IRawUser,
	"fullName" | "email" | "username" | "password"
>;
export type RegisterResponseData = Pick<
	IRawUser,
	"fullName" | "email" | "username" | "avatar" | "coverImage"
> & { _id: string };
export type RegisterRequestFiles =
	| { avatar?: Express.Multer.File[]; coverImage?: Express.Multer.File[] }
	| undefined;
export interface RegisterRequest extends Request<{}, {}, RegisterPayload> {}
export interface RegisterResponse
	extends Response<ApiResponseBody<RegisterResponseData>> {}

export interface LoginPayload {
	email?: string;
	username?: string;
	password: string;
}
export interface LoginRequest extends Request<{}, {}, LoginPayload> {}
export interface LoginResponseData {
	user: Omit<IRawUser, "password" | "refreshToken" | "watchHistory">;
	accessToken: string;
	refreshToken: string;
}
export interface LoginResponse
	extends Response<ApiResponseBody<LoginResponseData>> {}
