import { userRepository } from "../repositories/userRepository.js";
import { authService } from "../services/authService.js";

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        await authService.signup(name, email, password);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function signin(req, res) {
    try {
        const { email, password } = req.body;

        await authService.signin(email, password);

        res.send({
            token,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const authController = {
    signup,
    signin,
};
