import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRouter.js";
import financeRoutes from "./routes/financeRouter.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(authRoutes);
server.use(financeRoutes);

server.listen(process.env.PORT, () =>
  console.log(`Server is listen in http://localhost:${process.env.PORT}`)
);
