import express from "express";
import { createResidentUser } from "../utils/AuthUtils.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world from auth");
});

router.post("/createResidentUser", async (req, res) => {
  const userInfo = req.body;
  res.json({
    user: await createResidentUser(
      userInfo.uuid,
      userInfo.email,
      userInfo.profile,
      userInfo.name,
      userInfo.userType,
      userInfo.graduation
    ),
  });
});

export default router;
