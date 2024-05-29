export interface ApiErrorOptions {
	statusCode: number;
	message: string;
	messages?: string[];
}
class ApiError extends Error {
	readonly statusCode: number;
	readonly messages: string[];
	constructor(options: ApiErrorOptions) {
		super(options.message);
		this.statusCode = options.statusCode;
		this.messages = options.messages || [];
	}
}

export default ApiError;
