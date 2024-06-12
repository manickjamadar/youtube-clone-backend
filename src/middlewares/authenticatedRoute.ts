import User from "../models/user.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

const authenticatedRoute = asyncHandler(async (req, res, next) => {
	const token =
		req.cookies["accessToken"] ||
		req.headers.authorization?.replace("Bearer ", "");
	if (!token) {
		throw new ApiError({
			statusCode: 401,
			message: "Unauthorized Request",
		});
	}
	const payload = User.verifyAccessToken(token);
	const user = await User.findById(payload.userId);
	if (!user) {
		throw new ApiError({
			statusCode: 404,
			message: "User not found",
		});
	}
	req.user = user;
	next();
});

export default authenticatedRoute;
