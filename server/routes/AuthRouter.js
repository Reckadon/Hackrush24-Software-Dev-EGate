import express from "express";
import { createResidentUser, getUser, createGuestUser, getGuestUser } from "../utils/AuthUtils.js";

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
    const user = await getUser(userid);
    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/guest/:uuid", async (req, res) => {
  const userid = req.params.uuid;
  try {
    const user = await getGuestUser(userid);
    res.json({
      user,
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
    user: await createGuestUser(
      userInfo.uuid,
      userInfo.email,
      userInfo.profile,
      userInfo.name,
      userInfo.userType,
      userInfo.entryTime,
      userInfo.exitTime,
      userInfo.purpose,
      userInfo.residentEmailID
    ),
  });
});

router.post("/securityLogin", (req, res) => {
  // console.log(req.body);
  const userInfo = req.body;
  res.json({
    success: userInfo.login === SECURITY_LOGIN && userInfo.password === SECURITY_PASSWORD,
  });
});

router.get("/guestUsers", async (req, res) => {
  try {
    const users = [];
    const snapshot = await db.collection("guestUsers").get();
    snapshot.forEach(doc => {
      users.push(doc.data());
    });
    res.json({
      users,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

export default router;
