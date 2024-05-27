import { Request, Response, NextFunction } from "express";
import ApiError from "../../utils/ApiError";
const errorController = {
	handler: (
		err: Error | ApiError,
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		let statusCode = 500;
		let errorMessage = "Something went wrong";
		if (err instanceof ApiError) {
			statusCode = err.statusCode;
			errorMessage = err.message;
		}
		console.log("Error: ", err.message);
		res.status(statusCode).json({
			message: errorMessage,
			success: false,
		});
	},
};
export default errorController;
