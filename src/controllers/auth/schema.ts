import { ZodType, ZodTypeDef, z } from "zod";
import { LoginPayload, RegisterPayload } from "./types";
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

export const LoginPayloadSchema: ZodType<LoginPayload> = z
	.object({
		email: z.string().email().optional(),
		username: z
			.string({ required_error: "User name is required" })
			.trim()
			.min(1, "User name is required")
			.optional(),
		password: z
			.string({ required_error: "Password is required" })
			.min(1, "Password is required"),
	})
	.refine(
		data => {
			const hasUsername = Boolean(data.username);
			const hasEmail = Boolean(data.email);
			return hasUsername || hasEmail;
		},
		{ message: "Username or email is required" }
	)
	.refine(
		data => {
			const hasUsername = Boolean(data.username);
			const hasEmail = Boolean(data.email);
			if (hasUsername && hasEmail) {
				return false;
			}
			return true;
		},
		{ message: "Only username or email will be accepted" }
	);
