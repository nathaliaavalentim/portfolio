import request from "supertest";
import express, { Request, Response } from "express";
import { EditTutorialController } from "../../backend/src/controllers/tutorial/EditTutorialController";
import { EditTutorialService } from "../../backend/src/services/tutorial/EditTutorialService";

//mock do EditTutorialService
jest.mock("../../backend/src/services/tutorial/EditTutorialService");

const app = express();
app.use(express.json());

//simulando a rota do controller
const editTutorialController = new EditTutorialController();
app.put("/tutorials", (req: Request, res: Response) => editTutorialController.handle(req, res));

describe("EditTutorialController", () => {
  it("edit a tutorial and return the updated tutorial", async () => {
    //Dados de entrada simulados
    const tutorialData = {
      tutorial_id: "1",
      name: "Updated Tutorial",
      content: "Updated content",
      creator: "Nathalia"
    };

    //Dados simulados de retorno do serviço
    const mockUpdatedTutorial = {
      id: "1",
      ...tutorialData
    };

    //mock da função execute do serviço para retornar os dados simulados
    (EditTutorialService.prototype.execute as jest.Mock).mockResolvedValue(mockUpdatedTutorial);

    //fazendo a requisição para o endpoint
    const response = await request(app).put("/tutorials").send(tutorialData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedTutorial);
    expect(EditTutorialService.prototype.execute).toHaveBeenCalledWith(tutorialData);
  });
});
