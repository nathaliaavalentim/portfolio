import { CreateTutorialService } from "../../backend/src/services/tutorial/CreateTutorialService";
import prismaClient from "../src/prisma";

jest.mock("../src/prisma", () => ({
  tutorial: {
    create: jest.fn()
  }
}));

describe("CreateTutorialService", () => {
  it("create a tutorial", async () => {
    const createTutorialService = new CreateTutorialService();

    //entrada
    const tutorialData = {
      name: "Test Tutorial",
      content: "This is a test content.",
      creator: "Nathalia"
    };

    //retorno do Prisma
    const mockTutorial = {
      id: "1",
      ...tutorialData
    };

    //retorno do Prisma Client
    (prismaClient.tutorial.create as jest.Mock).mockResolvedValue(mockTutorial);

    const result = await createTutorialService.execute(tutorialData);

    //verifica se o método create do Prisma foi chamado com os dados corretos
    expect(prismaClient.tutorial.create).toHaveBeenCalledWith({
      data: tutorialData
    });

    //verifica o resultado 
    expect(result).toEqual(mockTutorial);
  });
});
