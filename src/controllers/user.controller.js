import User from "../models/user.model.js";
import { success, error } from "../utils/response.js";
import dotenv from "dotenv";
dotenv.config();


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
    const findUser = await User.findById(req.params.id);
    if (req.body.password) findUser.password = req.body.password;
    if (req.body.name) findUser.name = req.body.name;
    if (req.body.email) findUser.email = req.body.email;
    if (req.body.role) findUser.role = req.body.role;
    const user = await findUser.save();
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
