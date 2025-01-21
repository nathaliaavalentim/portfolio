import { Request, Response } from "express";
import { RemoveAllFavoritesService } from "../../services/favorites/RemoveAllFavoritesService";

class RemoveAllFavoritesController {
  async handle(req: Request, res: Response) {
    const userId = String(req.user_id);
    const removeAllFavoritesService = new RemoveAllFavoritesService();
    const result = await removeAllFavoritesService.execute(userId);

    

    return res.json({ message: "Todos os favoritos removidos com sucesso", result });
  }
}

export { RemoveAllFavoritesController };
