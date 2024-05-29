import { NextFunction, Request, Response } from "express";

const asyncHandler = <Req extends Request, Res extends Response>(
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
