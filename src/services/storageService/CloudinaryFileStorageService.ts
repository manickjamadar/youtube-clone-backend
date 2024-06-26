import { v2 as cloudinary } from "cloudinary";
import env from "../../config/env";
import IFileStorageService, {
	FileStorageServiceOptions,
} from "./FileStorageService";
import { unlink } from "fs/promises";
import fsPath from "path";
cloudinary.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
});
class CloudinaryFileStorageService implements IFileStorageService {
	async upload(
		path: string,
		options?: FileStorageServiceOptions
	): Promise<{ url: string }> {
		try {
			const result = await cloudinary.uploader.upload(path, {
				resource_type: "auto",
			});
			if (options?.removeFile) {
				await unlink(fsPath.resolve(path));
			}
			return { url: result.url };
		} catch (error) {
			throw error;
		}
	}
}
const cloudinaryFileStorageService = new CloudinaryFileStorageService();
export default cloudinaryFileStorageService;
