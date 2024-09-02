import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/UserService";

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
                res.status(200).send("Login successful");
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
