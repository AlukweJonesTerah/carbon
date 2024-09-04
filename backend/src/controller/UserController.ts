// backend/src/controller/UserController.ts

import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/UserService";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const BACKUP_KEY ="d5f595c88760db4946c225fb0e78d718a422ed723108b61c4736c50200149810c29d8acbc3e5010da1694214aaf809b9b726e852d57c003879a8cd6d6e4cd9c9"
const SECRET_KEY = process.env.SECRET_KEY || BACKUP_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY environment variable is not set");
}

export class UserController {
    static async register(req: Request, res: Response) {
        const { role, ...userData } = req.body;
        try {
            await registerUser(userData, role);
            res.status(201).send("User registered successfully");
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unexpected error occurred" });
            }
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password, role } = req.body;
        try {
            const user = await loginUser(email, password, role);
            if (user) {
                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );
                res.status(200).json({ message: "Login successful", token });
            } else {
                res.status(401).send("Invalid credentials");
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unexpected error occurred" });
            }
        }
    }
}
