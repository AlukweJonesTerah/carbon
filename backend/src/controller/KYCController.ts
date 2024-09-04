// src/controller/KYCController.ts

import { Request, Response } from "express";
import { submitKYC, approveKYC } from "../services/KYCService";

export class KYCController {
    static async submit(req: Request, res: Response) {
        const { userId, documentHash, kycData } = req.body;

        try {
            await submitKYC(userId, documentHash, kycData);
            res.status(201).send("KYC submitted successfully");
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unexpected error occurred" });
            }
        }
    }

    static async approveKYC(req: Request, res: Response) {
        const { userId } = req.params; // assuming userId is passed as a URL parameter
        try {
            await approveKYC(userId);
            res.status(200).send("KYC approved successfully");
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unexpected error occurred" });
            }
        }
    }
}
