import multer from "multer";
import Constants from "../config/constant";
import { randomUUID } from "crypto";
import getFileExtension from "../utils/getFileExtension";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, Constants.tempFilePath);
	},
	filename: function (req, file, cb) {
		cb(null, randomUUID() + "_" + file.originalname);
	},
});

const localFileUpload = multer({ storage: storage });
export default localFileUpload;
