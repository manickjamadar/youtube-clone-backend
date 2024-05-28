import { NextFunction } from "express";

const asyncHandler = <Req, Res>(
	handler: (req: Req, res: Res, next: NextFunction) => void
) => {
	return async (req: Req, res: Res, next: NextFunction) => {
		try {
			await handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

export default asyncHandler;
