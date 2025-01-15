import { ListTutorialService } from "../../backend/src/services/tutorial/ListTutorialService";
import prismaClient from "../src/prisma";

jest.mock("../src/prisma", () => ({
  tutorial: {
    findMany: jest.fn()
  }
}));

describe("ListTutorialService", () => {
  let listTutorialService: ListTutorialService;

  beforeEach(() => {
    listTutorialService = new ListTutorialService();
  });

  it("return all tutorials when no filters are provided", async () => {
    const mockTutorials = [
      { id: "1", name: "Test Tutorial 1", content: "Content 1", creator: "Nathalia" },
      { id: "2", name: "Test Tutorial 2", content: "Content 2", creator: "Philype" }
    ];

    (prismaClient.tutorial.findMany as jest.Mock).mockResolvedValue(mockTutorials);

    const result = await listTutorialService.execute({});

    expect(prismaClient.tutorial.findMany).toHaveBeenCalledWith({
      where: {
        status: false
      }
    });
    expect(result).toEqual(mockTutorials);
  });

  it("filter tutorials by title", async () => {
    const mockTutorials = [
      { id: "1", name: "Test Tutorial 1", content: "Content 1", creator: "Nathalia" }
    ];

    (prismaClient.tutorial.findMany as jest.Mock).mockResolvedValue(mockTutorials);

    const result = await listTutorialService.execute({ title: "Test" });

    expect(prismaClient.tutorial.findMany).toHaveBeenCalledWith({
      where: {
        status: false,
        name: {
          contains: "Test",
          mode: "insensitive"
        }
      }
    });
    expect(result).toEqual(mockTutorials);
  });

  it("filter tutorials by creator", async () => {
    const mockTutorials = [
      { id: "1", name: "Test Tutorial 1", content: "Content 1", creator: "Nathalia" }
    ];

    (prismaClient.tutorial.findMany as jest.Mock).mockResolvedValue(mockTutorials);

    const result = await listTutorialService.execute({ creator: "Nathalia" });

    expect(prismaClient.tutorial.findMany).toHaveBeenCalledWith({
      where: {
        status: false,
        creator: {
          contains: "Nathalia",
          mode: "insensitive"
        }
      }
    });
    expect(result).toEqual(mockTutorials);
  });

  it("filter tutorials by keywords", async () => {
    const mockTutorials = [
      { id: "1", name: "Test Tutorial 1", content: "Content 1", creator: "Nathalia" }
    ];

    (prismaClient.tutorial.findMany as jest.Mock).mockResolvedValue(mockTutorials);

    const result = await listTutorialService.execute({ keywords: "Test Content" });

    expect(prismaClient.tutorial.findMany).toHaveBeenCalledWith({
      where: {
        status: false,
        AND: [
          {
            OR: [
              { name: { contains: "Test", mode: "insensitive" } },
              { content: { contains: "Test", mode: "insensitive" } }
            ]
          },
          {
            OR: [
              { name: { contains: "Content", mode: "insensitive" } },
              { content: { contains: "Content", mode: "insensitive" } }
            ]
          }
        ]
      }
    });
    expect(result).toEqual(mockTutorials);
  });

  it("filter tutorials by title, creator, and keywords", async () => {
    const mockTutorials = [
      { id: "1", name: "Test Tutorial 1", content: "Content 1", creator: "Nathalia" }
    ];

    (prismaClient.tutorial.findMany as jest.Mock).mockResolvedValue(mockTutorials);

    const result = await listTutorialService.execute({ title: "Tutorial", creator: "Nathalia", keywords: "Content 1" });

    expect(prismaClient.tutorial.findMany).toHaveBeenCalledWith({
      where: {
        status: false,
        name: { contains: "Tutorial", mode: "insensitive" },
        creator: { contains: "Nathalia", mode: "insensitive" },
        AND: [
          {
            OR: [
              { name: { contains: "Content", mode: "insensitive" } },
              { content: { contains: "Content", mode: "insensitive" } }
            ]
          },
          {
            OR: [
              { name: { contains: "1", mode: "insensitive" } },
              { content: { contains: "1", mode: "insensitive" } }
            ]
          }
        ]
      }
    });
    expect(result).toEqual(mockTutorials);
  });
});
