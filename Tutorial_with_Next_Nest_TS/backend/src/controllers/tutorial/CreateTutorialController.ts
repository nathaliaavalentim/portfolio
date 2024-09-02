import { Request, Response } from "express";
import { CreateTutorialService } from "../../services/tutorial/CreateTutorialService";

class CreateTutorialController{
    async handle(req: Request, res: Response){

        //post e put: req.body
        const { name, content, creator} = req.body;


        const createTutorialService = new CreateTutorialService();

        const tutorial = await createTutorialService.execute({
            name,
            content,
            creator
           
        });
        return res.json(tutorial)

    }
}

export {CreateTutorialController}

