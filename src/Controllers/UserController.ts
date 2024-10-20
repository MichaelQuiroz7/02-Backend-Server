import { Request, Response } from 'express';
import { comparePass, generateToken, newHash } from '../plugin/user.plugin';
import { User } from '../Models/User';
import { isEmail } from '../plugin/Utilities';


export const newUser = async (req: Request, res: Response) => {
    const { sNameUser, sLastNameUser, sEmail, sPassword, sAddressUser, sPhoneNumber} = req.body;

    if (!sNameUser || !sPassword || !sEmail || !sPhoneNumber ) {
        return res.status(400).json({
            msg: "Some required fields are missing"
        });
    }

    const user = await isEmail(sEmail);
    if (user) {
        return res.status(400).json({
            msg: "El correo electrónico ya se encuentra registrado"
        })
    }

    try {
        const hashedPassword = await newHash(sPassword);
        await User.create({
            sNameUser,
            sLastNameUser,
            sEmail,
            sPassword: hashedPassword,
            sAddressUser,
            nRoleId :2
        });


        res.json({
            msg: `User ${sNameUser} created successfully`,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error while creating the user'
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { sEmail, sPassword } = req.body;
    const user:any = await isEmail(sEmail);
    // validar Email
    if (!user) {
        return res.status(400).json({
            msg: "The email does not exist"
        });
    }
    try {
        //Validar Contraseña
        const isValidPassword = await comparePass(sPassword, user.sPassword);
        if (!isValidPassword) {
            return res.status(400).json({
                msg: "Invalid password"
            });
        }
        //Generar Token
        const token = await generateToken({
            userName: user.sNameUser,
            userId:user.nIdUser
        });

        res.json(token);
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error logging in, please try again'
        });
    };
}


export const getUser = async (req: Request, res: Response)=>{
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, {
            attributes: ['nIdUser', 'sNameUser', 'sLastNameUser', 'sEmail', 'sPhoneNumber', 'sAddressUser']
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching user data' });
    }
};

// Actualizar los datos del usuario (PUT)
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { sNameUser, sLastNameUser, sEmail, sPhoneNumber, sAddressUser } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await user.update({
            sNameUser,
            sLastNameUser,
            sEmail,
            sPhoneNumber,
            sAddressUser
        });

        res.json({ msg: `User ${sNameUser} updated successfully` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error updating user data' });
    }
};


