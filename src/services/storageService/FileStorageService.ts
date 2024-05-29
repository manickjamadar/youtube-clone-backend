export interface FileStorageServiceOptions {
	removeFile?: boolean;
}
abstract class IFileStorageService {
	abstract upload(
		path: string,
		options?: FileStorageServiceOptions
	): Promise<{ url: string }>;
}
export default IFileStorageService;
