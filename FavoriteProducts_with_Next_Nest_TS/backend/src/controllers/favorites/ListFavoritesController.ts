import { Request, Response } from "express";
import { ListFavoritesService } from "../../services/favorites/ListFavoritesService";

class ListFavoritesController {
  async handle(req: Request, res: Response) {
    const userId = String(req.user_id);

    const listFavoritesService = new ListFavoritesService();

    try {
      const favorites = await listFavoritesService.execute(userId);
      return res.json(favorites);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { ListFavoritesController };