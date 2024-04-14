import express from "express";
import { deleteQR, getQR, getUserByQR, isQRValid } from "../utils/QRUtils.js";
import { db } from "../utils/FirebaseUtils.js";
import { addEntry } from "../utils/LogUtils.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world from QR");
});

router.get("/:uuid", async (req, res) => {
  const userid = req.params.uuid;
  try {
    res.json({
      qr: (await getUser(userid)).qr,
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/verify/:qr", async (req, res) => {
  try {
    const isValid = await isQRValid(req.params.qr);
    const user = await getUserByQR(req.params.qr);

    res.json({
      isValid,
      user,
    });

    if (!isValid) return;
    const qr = await getQR(user.uuid);

    await deleteQR(qr.qr);
    qr.inCampus = !qr.inCampus;
    if (qr.inCampus) {
      db.collection("qrs").doc(qr.qr).set(qr);
    }
    if (!qr.inCampus && qr.userType === "resident") {
      db.collection("qrs").doc(qr.qr).set(qr);
    }
    await addEntry(user.uuid, qr.inCampus);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.delete("/:uuid", async (req, res) => {
  const userid = req.params.uuid;
  try {
    const qr = await getQR(userid);
    await deleteQR(qr.qr);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

export default router;
