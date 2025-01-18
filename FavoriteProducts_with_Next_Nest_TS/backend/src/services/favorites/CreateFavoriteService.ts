import prismaClient from "../../prisma";

interface FavoriteRequest {
  userId: string;    // ID do usuário
  productId: number; // ID do produto
}

class CreateFavoriteService {
  async execute({ userId, productId }: FavoriteRequest) {
    // Verifica se o produto já está nos favoritos do usuário
    const existingFavorite = await prismaClient.favorite.findFirst({
      where: { userId, productId },
    });

    if (existingFavorite) {
      throw new Error("O produto já está nos favoritos.");
    }

    // Cria o favorito no banco de dados com userId e productId
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
