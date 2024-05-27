import mongoose, { Model } from "mongoose";
import isURL from "validator/lib/isURL";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import User from "./user.model";
export interface IRawVideo {
	title: string;
	description?: string;
	duration: number;
	views: number;
	isPublished: boolean;
	videoFile: string;
	thumbnail: string;
	owner: mongoose.Types.ObjectId;
}
export interface VideoModel extends Model<IRawVideo> {}
const videoSchema = new mongoose.Schema<IRawVideo, VideoModel>(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String },
		duration: { type: Number, required: true },
		views: { type: Number, default: 0 },
		isPublished: { type: Boolean, default: false },
		videoFile: {
			type: String,
			required: true,
			validate: [isURL, "Video file is not a valid url"],
		},
		thumbnail: {
			type: String,
			required: true,
			validate: [isURL, "Video Thumbnail is not a valid url"],
		},
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);
videoSchema.plugin(aggregatePaginate);
const Video: VideoModel =
	mongoose.models.Video ||
	mongoose.model<IRawVideo, VideoModel>("Video", videoSchema);
export default Video;
