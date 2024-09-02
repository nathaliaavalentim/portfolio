import request from "supertest";
import express, { Request, Response } from "express";
import { FinishTutorialController } from "../../backend/src/controllers/tutorial/FinishTutorialController";
import { FinishTutorialService } from "../../backend/src/services/tutorial/FinishTutorialService";

jest.mock("../../backend/src/services/tutorial/FinishTutorialService");

const app = express();
app.use(express.json());

//simulando a rota do controller
const finishTutorialController = new FinishTutorialController();
app.post("/tutorials/finish", (req: Request, res: Response) => finishTutorialController.handle(req, res));

describe("FinishTutorialController", () => {
  it("finish a tutorial and return the updated tutorial", async () => {
    // dados de entrada simulados
    const tutorialData = { tutorial_id: "1" };

    //dados simulados de retorno do serviço
    const mockFinishedTutorial = {
      id: "1",
      name: "Sample Tutorial",
      content: "Sample content",
      creator: "Nathalia",
      status: true, //supondo que 'status' seja alterado para finalizado
    };

    //mock da função execute do serviço para retornar os dados simulados
    (FinishTutorialService.prototype.execute as jest.Mock).mockResolvedValue(mockFinishedTutorial);

    //fazendo a requisição para o endpoint
    const response = await request(app).post("/tutorials/finish").send(tutorialData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFinishedTutorial);
    expect(FinishTutorialService.prototype.execute).toHaveBeenCalledWith(tutorialData);
  });
});
