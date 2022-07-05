import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signup(name, email, password) {
    if (!name || !email || !password) {
        throw {
            type: "unprocessableEntity",
            message: "Invalid name, email or password",
        };
    }

    const existingUsers = await userRepository.getUserByEmail(email);

    if (existingUsers.length > 0) {
        throw {
            type: "conflict",
            message: "Email already in use",
        };
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    await userRepository.sendNewUser(name, email, hashedPassword);
}

async function signin(email, password){
    if (!email || !password) {
        throw{
            type: "unprocessableEntity",
            message: "Invalid email or password"
        }
    }

    const [user] = await userRepository.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw {
            type: "unauthorized",
            message: "Incorrect email or password"
        }
    }

    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET
    );

    return token;
}

export const authService = {
    signup,
    signin
};
