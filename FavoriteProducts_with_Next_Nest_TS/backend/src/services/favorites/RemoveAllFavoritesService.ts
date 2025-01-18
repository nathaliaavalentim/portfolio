import prismaClient from "../../prisma";

class RemoveAllFavoritesService {
  async execute(userId: string) {
    const deletedFavorites = await prismaClient.favorite.deleteMany({
      where: {
        userId,
      },
    });

    return deletedFavorites;
  }
}

export { RemoveAllFavoritesService };
