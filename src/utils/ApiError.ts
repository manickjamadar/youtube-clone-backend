export interface ApiErrorOptions {
	statusCode: number;
	message: string;
}
class ApiError extends Error {
	readonly statusCode: number;
	constructor(options: ApiErrorOptions) {
		super(options.message);
		this.statusCode = options.statusCode;
	}
}

export default ApiError;
