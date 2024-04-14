import express from "express";
import { createResidentUser, getUser } from "../utils/AuthUtils.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world from auth");
});

export default router;
