import { Request, Response } from "express";
const register = (req: Request, res: Response) => {
	res.json({
		message: "Registering",
	});
};
const login = (req: Request, res: Response) => {
	res.json({
		message: "Logining...",
	});
};

const authController = {
	register,
	login,
};
export default authController;
