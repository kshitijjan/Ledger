import { User } from "../models/user.model";
import { AuthPayload } from "../schemas/auth.schema";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (data: AuthPayload) => {
    const existingUser = await User.findOne({email: data.email});

    if(existingUser){
        throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        email: data.email,
        password: hashedPassword
    })

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        {expiresIn: '24h'}
    );

    return {
        user: {id: user._id, email: user.email},
        token
    };
};

export {
    registerUser
}