import jwt from "jsonwebtoken";

export function validateToken(req, res, next) {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");

    if (!token) {
        throw {
            type: "unauthorized",
            message: "Invalid token"
        }
    }

    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        throw {
            type: "unauthorized",
            message: "Incorrect token"
        }
    }

    res.locals.user = user;
    next();
}
