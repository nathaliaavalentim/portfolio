import { api } from '../apiClient';


const getFavorites = async () => {
  try {
    const response = await api.get(`favorites`);
    return response.data || [];
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error);
    throw error;
  }
};

const addFavorite = async (productId: number) => {
  try {
    await api.post('/favorites', { productId });
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    throw error;
  }
};

const removeFavorite = async ( favoriteId: number) => {
    try {
      await api.delete(`favorites/${favoriteId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao remover favorito.');
    }
  };

const clearFavorites = async () => {
  try {
    await api.delete(`favorites`);
  } catch (error) {
    console.error('Erro ao limpar favoritos:', error);
    throw error;
  }
};

export const favoritesService = {
  getFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
};
