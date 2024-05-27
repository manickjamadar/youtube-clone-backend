import { z } from "zod";
const EnvSchema = z.object({
	PORT: z.string().transform(value => {
		const port = parseInt(value, 10);
		if (isNaN(port)) {
			throw new Error("PORT is not a number");
		}
		return port;
	}),
	MONGODB_URI: z.string({ required_error: "Mongodb uri is required" }),
	ACCESS_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_SECRET: z.string(),
	ACCESS_TOKEN_EXPIRY: z.string(),
	REFRESH_TOKEN_EXPIRY: z.string(),
	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
});
export type EnvType = z.infer<typeof EnvSchema>;
const env: EnvType = EnvSchema.parse(process.env);

export default env;
