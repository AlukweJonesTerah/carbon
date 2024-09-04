// src/types/express/index.d.ts
import { JwtPayload } from 'jsonwebtoken';
import { BaseUser } from '../../entity/BaseUser';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload | BaseUser;
    }
  }
}
