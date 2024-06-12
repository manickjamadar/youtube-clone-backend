import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
export interface ValidatePayloadOptions<Schema extends ZodType> {
	schema: Schema;
	errorMessage?: string;
}
const validatePayload = <
	Req extends Request,
	Res extends Response,
	Schema extends ZodType,
>({
	schema,
	errorMessage,
}: ValidatePayloadOptions<Schema>) =>
	asyncHandler((req: Req, res: Res, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const zodError = error;
				const hasSingleError = zodError.errors.length === 1;
				const message = hasSingleError
					? zodError.errors[0].message
					: errorMessage || "Payloads are invalid";
				const messages: string[] = hasSingleError
					? []
					: zodError.errors.map(error => error.message);
				throw new ApiError({ statusCode: 422, message, messages });
			} else {
				throw new ApiError({
					statusCode: 500,
					message: "Payload validation failed",
				});
			}
		}
	});
export default validatePayload;
