import { Request, Response } from "express";
import { DetailsTutorialsService} from "../../services/tutorial/DetailsTutorialsService";

class DetailsTutorialsController{
    async handle(req: Request, res: Response){
        //get com parametros: req.query
        //req.query contém os parâmetros de consulta da solicitação.

        console.log(req.query)

        const tutorial_id = req.query.tutorial_id as string;


        const detailsTutorialsService = new DetailsTutorialsService();

        const tutorials = await detailsTutorialsService.execute({
            tutorial_id
        })


        return res.json(tutorials)
    }

}

export {DetailsTutorialsController}