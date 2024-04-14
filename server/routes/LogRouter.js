import express from "express";
import { getAllLogs } from "../utils/LogUtils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ logs: await getAllLogs() });
});

export default router;
