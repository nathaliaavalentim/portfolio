import { Request, Response } from "express";
import { RemoveFavoriteService } from "../../services/favorites/RemoveFavoriteService";

class RemoveFavoriteController {
  async handle(req: Request, res: Response) {
    const { favoriteId } = req.params;
    const { userId } = req.params;

    const removeFavoriteService = new RemoveFavoriteService();

    try {
      const result = await removeFavoriteService.execute(favoriteId, userId);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { RemoveFavoriteController };
