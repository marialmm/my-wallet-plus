import { financialRepository } from "../repositories/financialRepository";
import { finalcialService } from "../services/financialService";

async function sendFinancialEvent(req, res) {
    try {
        const { value, type } = req.body;
        const { user } = res.locals;

        await finalcialService.sendFinancialEvent(value, type, user.id);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getFinancialEvents(req, res) {
    try {
        const { user } = res.locals;

        await finalcialService.getFinancialEvents(user.id);

        res.send(events);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getFinancialEventsSum(req, res) {
    try {
        const {user} = res.locals;

        const sum = await finalcialService.getFinancialEventsSum(user.id);

        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const financialController = {
    sendFinancialEvent,
    getFinancialEvents,
    getFinancialEventsSum,
};
