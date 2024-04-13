import express from "express";
import { createResidentUser, getUser } from "../utils/AuthUtils.js";

const router = express.Router();
const SECURITY_LOGIN = "abc";
const SECURITY_PASSWORD = "123";

router.get("/", (req, res) => {
  res.send("Hello world from auth");
});

router.post("/createResidentUser", async (req, res) => {
  // console.log(req.body);
  const userInfo = req.body.data;
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

router.get("/users/:uuid", async (req, res) => {
  const userid = req.params.uuid;
  try {
    res.json({
      user: await getUser(userid),
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/createGuestUser", async (req, res) => {
  // console.log(req.body);
  const userInfo = req.body.data;
  res.json({
    // user: ,
  });
});

router.post("/securityLogin", (req, res) => {
  // console.log(req.body);
  const userInfo = req.body;
  res.json({
    success: userInfo.login === SECURITY_LOGIN && userInfo.password === SECURITY_PASSWORD,
  });
});

export default router;
