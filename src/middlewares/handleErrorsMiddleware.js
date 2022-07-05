export async function handleError(error, req, res, next){
    console.log(error);
    const {type} = error;

    if(type === "unprocessableEntity"){
        res.sendStatus(422);
    } else if(type === "unauthorized"){
        res.sendStatus(401);
    } else if(type === "conflict"){
        res.sendStatus(409);
    }
}