import prismaClient from "../../prisma";

class ListFavoritesService {
  async execute(userId: string) {
    // Lista os favoritos do usuário com os detalhes do produto
    const favorites = await prismaClient.favorite.findMany({
      where: { userId },
      
    });

    return favorites;
  }
}

export { ListFavoritesService };
