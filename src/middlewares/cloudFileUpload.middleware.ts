import { NextFunction, Request, Response } from "express";
import IFileStorageService from "../services/storageService/fileStorageService";
const cloudfileUpload =
	(fileStorageService: IFileStorageService) =>
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.file) {
			next(new Error("File is not available"));
			return;
		}
		try {
			const result = await fileStorageService.upload(req.file.path);
			req.fileUrl = result.url;
			next();
		} catch (error) {
			next(new Error("Something Went Wrong while uploading file to cloud"));
		}
	};
export default cloudfileUpload;
