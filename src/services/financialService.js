async function sendFinancialEvent(value, type, userId){
    if (!value || !type) {
        throw {
            type: "unprocessableEntity",
            message: "Invalid financial type or value"
        }
    }

    const financialTypes = ["INCOME", "OUTCOME"];
    if (!financialTypes.includes(type)) {
        throw {
            type: "unprocessableEntity",
            message: "Invalid financial type"
        }
    }

    if (value < 0) {
        throw {
            type: "unprocessableEntity",
            message: "Value must be positive"
        }
    }

    await financialRepository.sendNewFinancialEvent(userId, value, type);

}

async function getFinancialEvents(userId){
    const events = await financialRepository.getFinancialEventsByUser(
        userId
    );
}

async function getFinancialEventsSum(userId){
    const events = await financialRepository.getFinancialEventsByUser(
        userId
    );

    const sum = events.reduce(
        (total, event) =>
            event.type === "INCOME"
                ? total + event.value
                : total - event.value,
        0
    );

    return sum;
}

export const finalcialService = {
    sendFinancialEvent,
    getFinancialEvents,
    getFinancialEventsSum
};