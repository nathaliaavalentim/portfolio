import request from "supertest";
import express, { Request, Response } from "express";
import { CreateTutorialController } from "../../backend/src/controllers/tutorial/CreateTutorialController";
import { CreateTutorialService } from "../../backend/src/services/tutorial/CreateTutorialService";

jest.mock("../../backend/src/services/tutorial/CreateTutorialService");

const app = express();
app.use(express.json());

//simulando a rota do controller
const createTutorialController = new CreateTutorialController();
app.post("/tutorials", (req: Request, res: Response) => createTutorialController.handle(req, res));

describe("CreateTutorialController", () => {
  it("create a tutorial and return the created tutorial", async () => {
    //dados de entrada simulados
    const tutorialData = {
      name: "Test Tutorial",
      content: "This is a test content.",
      creator: "Nathalia"
    };

    //smualcao de retorno do serviço
    const mockTutorial = {
      id: "1",
      ...tutorialData
    };

    (CreateTutorialService.prototype.execute as jest.Mock).mockResolvedValue(mockTutorial);

    //requisição para o endpoint
    const response = await request(app).post("/tutorials").send(tutorialData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTutorial);
    expect(CreateTutorialService.prototype.execute).toHaveBeenCalledWith(tutorialData);
  });
});
