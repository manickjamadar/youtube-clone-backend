import { Request, Response } from "express";
import { IRawUser, IUser } from "../../models/user.model";

export type RegisterPayload = Pick<
	IRawUser,
	"fullName" | "email" | "username" | "password"
>;
export type RegisterResponseBody = Pick<
	IRawUser,
	"fullName" | "email" | "username"
> & { _id: string };
export interface RegisterRequest extends Request<{}, {}, RegisterPayload> {
	// files?: Record<keyof Pick<IRawUser, "avatar">, Express.Multer.File[]> &
	// 	Partial<Record<keyof Pick<IRawUser, "coverImage">, Express.Multer.File[]>>;
}
