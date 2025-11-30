import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { error } from "../utils/response.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("token", token);
    if (!token) {
      return error(res, 401, "No token, authorization denied");
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return error(res, 401, "Token is not valid");
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(
        res,
        403,
        "Bạn không có quyền thực hiện hành động này",
        "FOBIDDEN"
      );
    }
    next();
  };
};
