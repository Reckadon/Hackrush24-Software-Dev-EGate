import express from "express";
import { getAllLogs, getAlerts } from "../utils/LogUtils.js";
import { getAllQRs } from "../utils/QRUtils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ logs: await getAllLogs() });
});

router.get("/alerts", async (req, res) => {
  res.json({ alerts: await getAlerts() });
});

router.get("/stats", async (req, res) => {
  const qrs = await getAllQRs();
  const stats = {
    inCampus: 0,
    outCampus: 0,
    expired: 0,
  };

  for (const qr of qrs) {
    if (qr.inCampus) {
      stats.inCampus++;
    } else {
      stats.outCampus++;
    }

    if (qr.expiry < new Date().getTime()) {
      stats.expired++;
    }
  }

  res.json({ stats });
});

export default router;
