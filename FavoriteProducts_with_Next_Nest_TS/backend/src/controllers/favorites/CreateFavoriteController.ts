import { Request, Response } from 'express';
import { CreateFavoriteService } from '../../services/favorites/CreateFavoriteService';

class CreateFavoriteController {
  async handle(req: Request, res: Response) {
    const { userId, productId } = req.body;    

    const createFavoriteService = new CreateFavoriteService();
    
    try {
      const favorite = await createFavoriteService.execute({ userId, productId });
      return res.json(favorite); // Retorna o favorito criado
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateFavoriteController };
