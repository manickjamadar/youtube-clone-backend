export interface ApiResponseOptions<T> {
	statusCode: number;
	message: string;
	data: T;
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
}
export default ApiResponse;
