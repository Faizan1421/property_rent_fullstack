import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    
    if (!decodedToken) {
      throw new ApiError(401, "Token is Expired, Try to Login First");
    }
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -resetPasswordToken -resetPasswordExpires -passwordResetAttempts -passwordResetLockUntil"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw new ApiError(error.statusCode, error.message);
    }

    throw new ApiError(400, error?.message);
  }
});
