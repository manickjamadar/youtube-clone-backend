import mongoose from "mongoose";
import env from "./env";
import Constants from "./constant";

const connectDB = async () => {
	const url = `${env.MONGODB_URI}/${Constants.dbName}`;
	try {
		const { connection } = await mongoose.connect(url);
		console.log("Monogodb Connected at ", connection.host);
	} catch (error) {
		console.log("Mongodb Connection Failed: ", error);
	}
};
export default connectDB;
