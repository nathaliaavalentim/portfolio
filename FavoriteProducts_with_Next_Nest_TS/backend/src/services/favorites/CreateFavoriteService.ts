import prismaClient from "../../prisma";

interface FavoriteRequest {
  userId: string;   
  productId: number; 
}

class CreateFavoriteService {
  async execute({ userId, productId }: FavoriteRequest) {
    const existingFavorite = await prismaClient.favorite.findFirst({
      where: { userId, productId },
    });

    if (existingFavorite) {
      throw new Error("O produto já está nos favoritos.");
    }

    //Verifica se o usuário ja tem 5 favoritos
    const favoriteCount = await prismaClient.favorite.count({
      where: { userId },
    });
    if (favoriteCount >= 5) {
      throw new Error("Você atingiu o limite de 5 favoritos.");
    }

    //Cria o favorito no banco de dados com userId e productId
    try {
      const favorite = await prismaClient.favorite.create({
        data: {
          userId,    // Apenas o userId
          productId, // Apenas o productId
        },
      });

      return favorite; // Retorna o favorito criado
    } catch (error: any) {
      console.error("Erro ao criar o favorito:", error);
      throw new Error("Erro ao salvar favorito no banco.");
    }
  }
}

export { CreateFavoriteService };
