import User from "../models/user.model.js";
import { success, error } from "../utils/response.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    success(res, "User created successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    success(res, "Users fetched successfully", users);
  } catch (err) {
    error(res, err.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    success(res, "User fetched successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    success(res, "User updated successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    success(res, "User deleted successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};


