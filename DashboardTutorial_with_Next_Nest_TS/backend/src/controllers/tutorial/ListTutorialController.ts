import { Request, Response } from "express";
import { ListTutorialService } from "../../services/tutorial/ListTutorialService"

class ListTutorialController{
    async handle(req: Request, res: Response){
        const { title, creator, keywords } = req.query;

        const titleStr = (title as string) ?? "";
        const creatorStr = (creator as string) ?? "";
        const keywordsStr = (keywords as string) ?? "";

      
        const listTutorialService = new ListTutorialService();

        const orders = await listTutorialService.execute({
            title: titleStr, 
            creator: creatorStr, 
            keywords: keywordsStr 
        });

        return res.json(orders);
    }    

}

export {ListTutorialController}