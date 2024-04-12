import express from "express";
import authRouter from "./routes/AuthRouter.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
