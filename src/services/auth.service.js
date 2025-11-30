import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
export const signUp = async ({ email, name, password }) => {
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const errors = new Error();
      errors.message = "User already exists";
      errors.errorCode = "USER_ALREADY_EXISTS";
      throw errors;
    }
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error();
      error.message = "Email or password is incorrect";
      error.errorCode = "INVALID_CREDENTIALS";
      throw error;
    }
    console.log("user1",user)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const errors = new Error();
      errors.message = "Email or password is incorrect";
      errors.errorCode = "INVALID_CREDENTIALS";
      throw errors;
    }
    console.log("user2",)

    const token = generateToken(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken: token.refreshToken });
    return {
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const refreshTokenProcess = async (refreshTokenFromCookie) => {
  if(!refreshTokenFromCookie) {
    throw new Error("Refresh token not found");
  }
  let decoded;
  try {
    decoded = jwt.verify(refreshTokenFromCookie, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Refresh token is not valid");
  }
  const user = await User.findById(decoded.id).select("+refreshToken");
  console.log("user: ",user)
  if (!user || user.refreshToken !== refreshTokenFromCookie) {
    throw new Error("Refresh token không hợp lệ");
  }
  const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE,
  });
  return {
    accessToken: newAccessToken,
  };
};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
}


