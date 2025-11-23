import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import userRoutes from "./routes/user.route.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
