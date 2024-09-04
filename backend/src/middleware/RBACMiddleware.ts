// src//middleware/RBACMiddleware

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload extends jwt.JwtPayload {
    role: string;
}

const roles: { [key: string]: string[] } = {
    admin: ['approveKYC'],
    government: ['approveKYC'],
    user: []
};

export function checkRole(action: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || typeof req.user === 'string') {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userRole = (req.user as UserPayload).role;

        if (roles[userRole] && roles[userRole].includes(action)) {
            next();
        } else {
            res.status(403).json({ error: "Forbidden" });
        }
    };
}
