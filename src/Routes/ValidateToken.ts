import { NextFunction, Request, Response } from "express";
import { verifyToken } from '../plugin/user.plugin';



const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if (headerToken && headerToken.startsWith('Bearer ')) {
        const bearerToken = headerToken.slice(7);

        try {
            await verifyToken(bearerToken); 
            next();
        } catch (error) {
         res.status(401).json({ message: 'Access Denied: token invalid' });
        }
    } else {
        res.status(401).json({ message: 'Access Denied: no token provided' });
    }
};


export default validateToken;
