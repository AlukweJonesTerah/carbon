// src/index.ts
import express from "express";
import "reflect-metadata";
import cors from 'cors'
import { AppDataSource } from "./data-source";
import { UserController } from "./controller/UserController"; // Corrected import

const app = express();
app.use(cors())
app.use(express.json());

app.post("/register", UserController.register);
app.post("/login", UserController.login);

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
  })
  .catch((error: unknown) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });
