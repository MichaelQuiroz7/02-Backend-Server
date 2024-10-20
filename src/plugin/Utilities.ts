import { User } from "../Models/User";

export const getSecretKey = (): string => {
    const secretKey = process.env.SECRET_KEY;
    
    if (!secretKey) {
        throw new Error('SECRET_KEY is not available');
    }
    
    return secretKey;
}


export const isEmail = async (sEmail: string) => {
    if (!sEmail) {
        throw new Error('Email is required');
    }
    
    const user = await User.findOne({ where: { sEmail } });
    return user; 
}

