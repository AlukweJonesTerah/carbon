// middleware/authenticateToken.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const BACKUP_KEY ="d5f595c88760db4946c225fb0e78d718a422ed723108b61c4736c50200149810c29d8acbc3e5010da1694214aaf809b9b726e852d57c003879a8cd6d6e4cd9c9"

const SECRET_KEY = process.env.SECRET_KEY || BACKUP_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY environment variable is not set");
}

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized if no token

    jwt.verify(token, SECRET_KEY as string, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid

        req.user = user; // Assign the user to req.user
        next();
    });
}
