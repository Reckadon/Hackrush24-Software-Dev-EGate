import express from "express";
import authRouter from "./routes/AuthRouter.js";
import qrRouter from "./routes/QRRouter.js";
import guestRouter from "./routes/GuestRouter.js";
import cors from "cors";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/qrs", qrRouter);
app.use("/guest", guestRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// console.log(await createResidentUser("123", "sd", "sd", "sd", "sd", "sd"));
