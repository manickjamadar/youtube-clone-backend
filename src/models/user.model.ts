import mongoose, { Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import Constants from "../config/constant";
import isURL from "validator/lib/isURL";
import jwt from "jsonwebtoken";
import env from "../config/env";
export interface UserMethods {
	comparePassword: (plainPassword: string) => Promise<boolean>;
	generateAccessToken: () => string;
	generateRefreshToken: () => string;
}
export interface IRawUser {
	fullName: string;
	username: string;
	email: string;
	password: string;
	avatar: string;
	coverImage?: string;
	refreshToken?: string;
	watchHistory: mongoose.Types.ObjectId[];
}
export interface IUser extends IRawUser, UserMethods {}
export interface UserModel extends Model<IRawUser, {}, UserMethods> {}
const userSchema = new mongoose.Schema<IRawUser, UserModel, UserMethods>(
	{
		fullName: { type: String, required: true, trim: true },
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			validate: [isEmail, "Email is not valid"],
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		avatar: {
			type: String,
			required: true,
			validate: [isURL, "Avatar is not a valid url"],
		},
		coverImage: {
			type: String,
			validate: [isURL, "Cover image is not a valid url"],
		},
		refreshToken: { type: String },
		watchHistory: [
			{ type: mongoose.Schema.Types.ObjectId, ref: Constants.modelNames.video },
		],
	},
	{
		timestamps: true,
	}
);
//hashing password before save
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	try {
		this.password = await bcrypt.hash(this.password, 10);
		next();
	} catch (error) {
		next(error as Error);
	}
});
userSchema.methods.comparePassword = function (plainPassword: string) {
	return bcrypt.compare(plainPassword, this.password);
};
userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{ userId: this._id, email: this.email, fullName: this.fullName },
		env.ACCESS_TOKEN_SECRET,
		{ expiresIn: env.ACCESS_TOKEN_EXPIRY }
	);
};
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign({ userId: this._id }, env.REFRESH_TOKEN_SECRET, {
		expiresIn: env.REFRESH_TOKEN_EXPIRY,
	});
};
const User: UserModel =
	mongoose.models.User ||
	mongoose.model<IRawUser, UserModel>(Constants.modelNames.user, userSchema);

export default User;
