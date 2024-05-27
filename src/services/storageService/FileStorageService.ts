abstract class IFileStorageService {
	abstract upload(path: string): Promise<{ url: string }>;
}
export default IFileStorageService;
