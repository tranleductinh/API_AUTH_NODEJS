import User from "../models/user.model.js";
import { success, error } from "../utils/response.js";
import dotenv from "dotenv";
import { signIn, signUp } from "../services/auth.service.js";
import { validationResult } from "express-validator";
dotenv.config();
export const signUpController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((e) => ({
        field: e.param,
        message: e.msg,
      }));
      return error(res, 400, formattedErrors[0].message, null);
    }
    const { name, email, password } = req.body;
    const user = await signUp({
      name: name,
      email: email.trim(),
      password: password.trim(),
    });
    return success(res, user, "User signed up successfully", 201);
  } catch (err) {
    return error(res, 401, err.message, err.errorCode);
  }
};
export const signInController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((e) => ({
        field: e.param,
        message: e.msg,
      }));
      return error(res, 400, formattedErrors[0].message, null);
    }
    const { email, password } = req.body;
    const user = await signIn({ email, password });
    return success(res, user, "User signed in successfully", 200);
  } catch (err) {
    return error(res, 401, err.message);
  }
};

export const getProfileController = async (req, res) => {
  try {
    const user = req.user;
    return success(res, user, "User profile retrieved successfully", 200);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return success(res, users, "Users fetched successfully", 200);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return success(res, user, "User fetched successfully", 200);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, user, "User updated successfully", 201);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return success(res, user, "User deleted successfully", 201);
  } catch (err) {
    return error(res, 500, err.message);
  }
};
