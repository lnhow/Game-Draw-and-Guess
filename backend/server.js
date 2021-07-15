/**
 * This file is used to setup server
 */
import express from "express";
import cors from "cors";
import mainRoute from "./routes/index.js";

const app = express();

app.use(cors()); // Allow Cross Origin Resource Sharing
app.use(express.json()); // Accept JSON request

app.use("/", mainRoute);

// Route not exist
app.use("*", (req, res) => {
  res.status(404).json({
    error: "not found",
  });
});

export default app;
