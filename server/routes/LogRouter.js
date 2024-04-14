import express from "express";
import { getAllLogs, getAlerts } from "../utils/LogUtils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ logs: await getAllLogs() });
});

router.get("/alerts", async (req, res) => {
  res.json({ alerts: await getAlerts() });
});

export default router;
