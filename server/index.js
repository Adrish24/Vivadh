import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";

import signup from "./routes/signup.js";
import login from "./routes/login.js";
import postRoutes from "./routes/postRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const port = 5000;

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'multipart/form-data']
}));
app.use(express.json({ limit: "50mb" }));

app.use("/auth", signup);
app.use("/auth", login);
app.use("/upload", uploadRoutes);
app.use("/post", postRoutes);
app.use("/vote", voteRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/comments", commentRoutes);

app.get("/", async (req, res) => {
  res.send("Welcome to vivadh server!");
});

startServer();

async function startServer() {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log("server connected to port  http://localhost:5000");
    });
  } catch (error) {
    console.log(error);
  }
}
