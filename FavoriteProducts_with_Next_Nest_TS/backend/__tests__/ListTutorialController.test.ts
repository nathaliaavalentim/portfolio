// __tests__/ListTutorialController.test.ts
import { Request, Response } from "express";
import { ListTutorialController } from "../src/controllers/tutorial/ListTutorialController";
import { ListTutorialService } from "../src/services/tutorial/ListTutorialService";

jest.mock("../src/services/tutorial/ListTutorialService");

describe("ListTutorialController", () => {
    it("return tutorials based on query parameters", async () => {
        //Dados simulados
        const mockTutorials = [
            {
                id: "1",
                name: "Tutorial 1",
                conteudo: "Content 1",
                criador: "Creator 1",
                status: false
            }
        ];

        //config do mock
        (ListTutorialService.prototype.execute as jest.Mock).mockResolvedValue(mockTutorials);

        const req = {
            query: {
                title: "Tutorial 1",
                creator: "Creator 1",
                keywords: "Content 1"
            }
        } as unknown as Request;

        const res = {
            json: jest.fn().mockReturnThis()
        } as unknown as Response;

        const listTutorialController = new ListTutorialController();
        await listTutorialController.handle(req, res);

        expect(res.json).toHaveBeenCalledWith(mockTutorials);
        expect(ListTutorialService.prototype.execute).toHaveBeenCalledWith({
            title: "Tutorial 1",
            creator: "Creator 1",
            keywords: "Content 1"
        });
    });
});
