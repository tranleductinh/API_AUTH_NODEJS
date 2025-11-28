import express from "express";
import {
  getProfileController,
  signInController,
  signUpController,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  signUpValidator,
  signInValidator,
} from "../validators/auth.validator.js";

const router = express.Router();
router.post("/sign-up", signUpValidator, signUpController);
router.post("/sign-in", signInValidator, signInController);
router.get("/me", protect, getProfileController);
export default router;
