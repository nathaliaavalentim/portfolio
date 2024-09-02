import { EditTutorialService } from "../../backend/src/services/tutorial/EditTutorialService";
import prismaClient from "../src/prisma";

jest.mock("../src/prisma", () => ({
  tutorial: {
    update: jest.fn(),
  },
}));

describe("EditTutorialService", () => {
  let editTutorialService: EditTutorialService;

  beforeEach(() => {
    editTutorialService = new EditTutorialService();
  });

  it("update a tutorial with the provided data", async () => {
    //dados de entrada simulados
    const tutorialData = {
      tutorial_id: "1",
      name: "Updated Tutorial",
      content: "Updated content",
      creator: "Nathalia"
    };

    //dados simulados de retorno do Prisma
    const mockUpdatedTutorial = {
      id: "1",
      ...tutorialData
    };

    //simulando o retorno do Prisma Client
    (prismaClient.tutorial.update as jest.Mock).mockResolvedValue(mockUpdatedTutorial);

    const result = await editTutorialService.execute(tutorialData);

    //verfica se o método update do Prisma foi chamado com os dados corretos
    expect(prismaClient.tutorial.update).toHaveBeenCalledWith({
      where: { id: tutorialData.tutorial_id },
      data: {
        name: tutorialData.name,
        content: tutorialData.content,
        creator: tutorialData.creator
      }
    });

    //verifica se o resultado retornado é o esperado
    expect(result).toEqual(mockUpdatedTutorial);
  });

  it("update a tutorial", async () => {
    //dados de entrada simulados (somente conteúdo)
    const tutorialData = {
      tutorial_id: "1",
      content: "Updated content"
    };

    //Dados simulados de retorno do Prisma
    const mockUpdatedTutorial = {
      id: "1",
      name: "Original Name",
      content: tutorialData.content,
      creator: "Original Creator"
    };

    //retorno do Prisma Client
    (prismaClient.tutorial.update as jest.Mock).mockResolvedValue(mockUpdatedTutorial);

    const result = await editTutorialService.execute(tutorialData);

    //verifica se o método update do Prisma foi chamado com os dados certos
    expect(prismaClient.tutorial.update).toHaveBeenCalledWith({
      where: { id: tutorialData.tutorial_id },
      data: {
        content: tutorialData.content
      }
    });

    //resultado retornado
    expect(result).toEqual(mockUpdatedTutorial);
  });
});
