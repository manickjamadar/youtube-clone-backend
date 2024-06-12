import { IUser } from "../../models/user.model";

declare global {
	namespace Express {
		export interface Request {
			user?: IUser;
		}
	}
}
export {};
