import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routerUser from "./routes/user.route.js";
import routerAuth from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3001;
app.use("/api/user", routerUser);
app.use("/api/auth", routerAuth);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
