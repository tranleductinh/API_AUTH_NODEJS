import express from "express";
import { getAllUsers } from "../controllers/auth.controller.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", protect, authorize("admin"), deleteUser);

export default router;
