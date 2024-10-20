import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getSecretKey } from './Utilities';

export const newHash = async (sPassword: string) => {
    if (!sPassword) {
        return new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(sPassword, 10);
    return hashedPassword;
}

export const comparePass = async (sPassword: string, hashedPassword: string) => {
    if (!sPassword || !hashedPassword) {
        throw new Error('Password and hashed password are required');
    }
    const isMatch = await bcrypt.compare(sPassword, hashedPassword);
    return isMatch;
};

export const generateToken = async (payload: object) => {
    const secretKey = getSecretKey(); 

    if (!secretKey) {
        throw new Error('SECRET_KEY does not exist');
    }

    try {
        const token = jwt.sign(payload, secretKey);
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
};


export const verifyToken = async (token: string) => {
    if (!token) {
        throw new Error('Token is required');
    }
    const secretKey = getSecretKey(); 
    try {
        const decoded = jwt.verify(token, secretKey); 
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};


