import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import ApiError from "../utils/ApiError";
export interface ValidatePayloadOptions<Schema extends ZodType> {
	schema: Schema;
	errorMessage?: string;
}
const validatePayload =
	<Req extends Request, Res extends Response, Schema extends ZodType>({
		schema,
		errorMessage,
	}: ValidatePayloadOptions<Schema>) =>
	(req: Req, res: Res, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);
		} catch (error) {
			if (error instanceof ZodError) {
				const zodError = error;
				const message = errorMessage || "Payloads are invalid";
				const messages: string[] = zodError.errors.map(error => error.message);
				throw new ApiError({ statusCode: 400, message, messages });
			} else {
				throw new ApiError({
					statusCode: 500,
					message: "Payload validation failed",
				});
			}
		}
	};
export default validatePayload;
