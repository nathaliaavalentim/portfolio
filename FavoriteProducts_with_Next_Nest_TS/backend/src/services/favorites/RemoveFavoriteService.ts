import prismaClient from "../../prisma";

class RemoveFavoriteService {
  async execute(favoriteId: string, userId: string) {
    // Verifica se o favorito pertence ao usuário
    const favorite = await prismaClient.favorite.findFirst({
      where: { id: favoriteId, userId },
    });

    if (!favorite) {
      throw new Error("Favorito não encontrado ou você não tem permissão para excluí-lo.");
    }

    // Remove o favorito
    await prismaClient.favorite.delete({
      where: { id: favoriteId },
    });

    return { message: "Favorito removido com sucesso." };
  }
}

export { RemoveFavoriteService };
