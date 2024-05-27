declare global {
	namespace Express {
		export interface Request {
			cloudUrl?: string;
		}
	}
}
export {};
