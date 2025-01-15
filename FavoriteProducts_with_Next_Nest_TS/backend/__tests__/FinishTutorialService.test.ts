import { FinishTutorialService } from "../../backend/src/services/tutorial/FinishTutorialService";
import prismaClient from "../src/prisma";

// mock do prismaClient
jest.mock("../src/prisma", () => ({
  tutorial: {
    update: jest.fn(),
  },
}));

describe("FinishTutorialService", () => {
  let finishTutorialService: FinishTutorialService;

  beforeEach(() => {
    finishTutorialService = new FinishTutorialService();
  });

  it("finish a tutorial by setting its status to true", async () => {
    // dados de entrada simulados
    const tutorialData = { tutorial_id: "1" };

    // dados simulados de retorno do prisma
    const mockFinishedTutorial = {
      id: "1",
      name: "Sample Tutorial",
      content: "Sample content",
      creator: "Nathalia",
      status: true,
    };

    // simulando o retorno do prismaClient
    (prismaClient.tutorial.update as jest.Mock).mockResolvedValue(mockFinishedTutorial);

    const result = await finishTutorialService.execute(tutorialData);

    // verificando se o método update do prisma foi chamado com os dados corretos
    expect(prismaClient.tutorial.update).toHaveBeenCalledWith({
      where: { id: tutorialData.tutorial_id },
      data: { status: true },
    });

    // verificando se o resultado retornado é o esperado
    expect(result).toEqual(mockFinishedTutorial);
  });
});
