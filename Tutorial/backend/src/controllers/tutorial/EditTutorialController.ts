import { Request, Response } from "express";
import { EditTutorialService } from "../../services/tutorial/EditTutorialService";

class EditTutorialController {
    async handle(req: Request, res: Response) {
        const { tutorial_id, name, content, creator } = req.body;

        const editTutorialService = new EditTutorialService();

        const order = await editTutorialService.execute({
            tutorial_id,
            name,
            content,
            creator,
        });

        return res.json(order);
    }
}

export { EditTutorialController };
