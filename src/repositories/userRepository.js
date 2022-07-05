import connection from "./database.js";

async function sendNewUser(name, email, hashedPassword){
    await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );
}

async function getUserByEmail(email){
    const { rows } = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    );
    
    return rows;
}

export const userRepository = {
    sendNewUser,
    getUserByEmail
}