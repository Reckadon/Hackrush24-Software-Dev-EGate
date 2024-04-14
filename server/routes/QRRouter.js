import express from "express";

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
  const qr = req.params.qr;
  try {
    res.json({
      valid: await isQRValid(qr),
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

export default router;
