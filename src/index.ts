import express from "express";
import cors from "cors";

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
