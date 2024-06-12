export interface ApiResponseOptions<T> {
	statusCode: number;
	message: string;
	data: T;
}
export interface ApiResponseBody<T> {
	success: boolean;
	message: string;
	data: T;
	status: number;
}
class ApiResponse<T> {
	readonly statusCode: number;
	readonly message: string;
	readonly data: T;
	readonly success: boolean;
	constructor(options: ApiResponseOptions<T>) {
		this.statusCode = options.statusCode;
		this.message = options.message;
		this.data = options.data;
		this.success = options.statusCode < 400;
	}
	toJson(): ApiResponseBody<T> {
		return {
			data: this.data,
			message: this.message,
			success: this.success,
			status: this.statusCode,
		};
	}
}
export default ApiResponse;
