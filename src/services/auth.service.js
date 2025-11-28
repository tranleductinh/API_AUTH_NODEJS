import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

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
        role: user.role
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

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const errors = new Error();
      errors.message = "Email or password is incorrect";
      errors.errorCode = "INVALID_CREDENTIALS";
      throw errors;
    }

    const token = generateToken(user._id);
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

