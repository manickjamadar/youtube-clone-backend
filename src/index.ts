import dotenv from "dotenv";
dotenv.config();
import ip from "ip";
import env from "./config/env";
import connectDB from "./config/db";
import app from "./app";
import User from "./models/user.model";
import mongoose from "mongoose";
import path from "path";
connectDB().then(() => {
	app.listen(env.PORT, () => {
		console.log(`Server running at ${ip.address()}:${env.PORT}`);
	});
});
