import { ZodType, ZodTypeDef, z } from "zod";
import { RegisterPayload } from "./types";
export const RegisterPayloadSchema: ZodType<RegisterPayload> = z.object({
	fullName: z
		.string({ required_error: "Full name is required" })
		.trim()
		.min(1, "Full name is required"),
	username: z
		.string({ required_error: "User name is required" })
		.trim()
		.toLowerCase()
		.min(1, "User name is required"),
	email: z
		.string({ required_error: "Email is required" })
		.email("Email is invalid"),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required"),
});
