// beckend/src/controller/DIDController.ts

import { Request, Response } from "express";
import { resolveDID, verifyCredential } from "../services/DIDService";

export class DIDController {
    static async resolve(req: Request, res: Response) {
        const { did } = req.body;

        try {
            const didDocument = await resolveDID(did);
            res.status(200).json(didDocument);
        } catch (error) {
            // Ensure error is of type Error to access message safely
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                // Handle unknown error types
                res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    }

    static async verify(req: Request, res: Response) {
        const { credential } = req.body;

        try {
            const isValid = await verifyCredential(credential);
            res.status(200).json({ valid: isValid });
        } catch (error) {
            // Ensure error is of type Error to access message safely
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                // Handle unknown error types
                res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    }
}
