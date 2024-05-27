import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Constants from "./config/constant";
import localFileUpload from "./middlewares/localFileUpload.middleware";
import cloudinaryFileStorageService from "./services/storageService/CloudinaryFileStorageService";
import cloudfileUpload from "./middlewares/cloudFileUpload.middleware";
const app = express();
app.use(cors());
app.use(express.static(Constants.staticPath));
app.use(cookieParser());
app.use(express.json({ limit: Constants.jsonLimit }));
app.use(express.urlencoded({ limit: Constants.jsonLimit, extended: true }));
app.get("/test", (req, res) => {
	res.json({
		messsage: "working",
	});
});
app.post(
	"/upload",
	localFileUpload.single("file"),
	cloudfileUpload(cloudinaryFileStorageService),
	async (req, res) => {
		try {
			res.status(200).json({
				url: req.fileUrl,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: "Something went wrong",
			});
		}
	}
);
export default app;
