// backend/src/index.ts
import express from "express";
import "reflect-metadata";
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from "./data-source";
import { UserController } from "./controller/UserController"; 
import { authenticateToken } from "./middleware/authenticateToken";
import { KYCController } from "./controller/KYCController";
import { EmissionController } from "./controller/EmissionController"; // Import EmissionController
import dotenv from 'dotenv';
import { checkRole } from "./middleware/RBACMiddleware";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { BaseUser } from "./entity/BaseUser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());

    // Public routes
    app.post("/register", UserController.register);
    app.post("/login", UserController.login);

    // KYC-related routes
    app.post('/kyc', authenticateToken, KYCController.submit);
    app.post("/approve", authenticateToken, checkRole('approveKYC'), KYCController.approveKYC);

    // Emission-related routes
    app.post('/api/emission', authenticateToken, EmissionController.submitEmission);
    app.get('/api/emissions', authenticateToken, EmissionController.getEmissions);
    app.get('/api/emissions/predicted', authenticateToken, EmissionController.getPredictedEmissions);

     // Government route
     app.get('/api/emissions/overall', authenticateToken, checkRole('government'), EmissionController.getOverallReport);
     
    // Protected route example
    app.get('/protected', authenticateToken, (req, res) => {
      const user = req.user as JwtPayload | BaseUser;
      res.json({ message: 'This is a protected route', user });
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });
