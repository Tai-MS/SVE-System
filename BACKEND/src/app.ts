import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import { userRouter } from "#components/User/UserRoutes.js";

const app = express();

dotenv.config();

app.use(cors({ origin: ["http://localhost:5173/", "http://localhost:3000/"] }));

app.use(express.json());

// app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado correctamente en http://localhost:8080/");
});
