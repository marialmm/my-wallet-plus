import connection from "./database.js";

async function sendNewFinancialEvent(userId, value, type) {
    await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [userId, value, type]
    );
    return;
}

async function getFinancialEventsByUser(userId) {
    const { rows } = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [userId]
    );

    return rows
}

export const financialRepository = {
    sendNewFinancialEvent,
    getFinancialEventsByUser
};
