import { Request, Response } from "express";
import { FinishTutorialService } from "../../services/tutorial/FinishTutorialService";

class FinishTutorialController{
    async handle(req: Request, res: Response){

        const {tutorial_id} = req.body

        const finishTutorialService = new FinishTutorialService();

        const order = await finishTutorialService.execute({tutorial_id})

        return res.json(order)
    }
}

export {FinishTutorialController}