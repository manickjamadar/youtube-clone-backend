import { ZodType, ZodTypeDef, z } from "zod";
import { RegisterPayload } from "./types";
export const RegisterPayloadSchema: ZodType<RegisterPayload> = z.object({
	fullName: z.string().trim().min(1, "Full name is required"),
	username: z.string().trim().toLowerCase().min(1, "User name is required"),
	email: z.string().email("Email is invalid"),
	password: z.string().min(1, "Password is required"),
});
