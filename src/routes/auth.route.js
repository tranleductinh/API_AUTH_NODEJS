import express from "express";
import {
  getProfileController,
  logout,
  refresh,
  signInController,
  signUpController,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  signUpValidator,
  signInValidator,
} from "../validators/auth.validator.js";

const router = express.Router();
router.post("/sign-up", signUpValidator, signUpController);
router.post("/sign-in", signInValidator, signInController);
router.post("/logout", protect, logout);
router.post("/refresh-token", refresh);
router.get("/me", protect, getProfileController);
export default router;
