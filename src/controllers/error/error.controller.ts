import { Request, Response, NextFunction } from "express";
import ApiError from "../../utils/ApiError";
const errorController = {
	notFound: (req: Request, res: Response, next: NextFunction) => {
		next(new ApiError({ statusCode: 404, message: "Api endpoint not found" }));
	},
	handler: (
		err: Error | ApiError,
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		let statusCode = 500;
		let errorMessage = "Something went wrong";
		let errorMessages: string[] = [];
		if (err instanceof ApiError) {
			statusCode = err.statusCode;
			errorMessage = err.message;
			errorMessages = err.messages;
		}
		console.log("Error: ", err);
		res.status(statusCode).json({
			message: errorMessage,
			messages: errorMessages,
			data: undefined,
			success: false,
		});
	},
};
export default errorController;
