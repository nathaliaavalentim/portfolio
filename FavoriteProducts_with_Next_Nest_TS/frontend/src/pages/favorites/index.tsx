import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import { Button } from '@mui/material';
import { ProductProps } from '../products';
import { toast } from 'react-toastify';
import { favoritesService } from '../../services/favorite/favoritesService';
import { AuthContext } from '../../contexts/AuthContext';
import Head from 'next/head';
import DeleteIcon from '@mui/icons-material/Delete';

const Favorites = ({ products }: { products: ProductProps[] }) => {
  const { user } = useContext(AuthContext);  // Acessando o user do AuthContext
  const [productList, setProductList] = useState(products || []);
  const [favorites, setFavorites] = useState<ProductProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      fetchFavorites();
    }
  }, [user]);  // Dependência no user

  const fetchFavorites = async () => {
    try {
      const favoritesData = await favoritesService.getFavorites();
      const filteredProducts = productList.filter((product) =>
        favoritesData.some((favorite) => favorite.productId === product.id)
      );
      setFavorites(filteredProducts);
    } catch (error: any) {
      console.error('Erro ao carregar favoritos:', error.message);
      toast.error(error.message);
    }
  };

  const removeFavorite = async (productId: number) => {
    try {
      if (!user?.id) {
        toast.error('Usuário não autenticado.');
        return;
      }

      const favoriteData = await favoritesService.getFavorites();
      const favoriteToRemove = favoriteData.find((fav) => fav.productId === productId);

      if (!favoriteToRemove) {
        toast.error('Favorito não encontrado.');
        return;
      }

      await favoritesService.removeFavorite(favoriteToRemove.id);
      toast.success('Produto removido dos favoritos.');
      fetchFavorites();
    } catch (error: any) {
      console.error('Erro ao remover favorito:', error.message);
      toast.error(error.message || 'Erro ao remover favorito.');
    }
  };

  const clearFavorites = async () => {
    try {
      if (!user?.id) {
        toast.error('Usuário não autenticado.');
        return;
      }

      await favoritesService.clearFavorites();
      toast.success('Todos os favoritos foram removidos.');
      fetchFavorites();
    } catch (error: any) {
      console.error('Erro ao limpar favoritos:', error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Produtos Favoritos</title>
        <meta name="description" content="Gerencie seus produtos favoritos nesta página." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <div className={styles.container}>
        <h1>Produtos Favoritos</h1>
        <div className={styles.actionsContainer}>
        

        </div>
        {favorites.length === 0 ? (
          <p className={styles.emptyMessage}>Você não tem produtos favoritos.</p>
        ) : (
          <section className={styles.favoritesList}>
            {favorites.map((product) => (
              <div key={product.id} className={styles.favoriteItem}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
                  className={styles.productImage}
                />
                <h3>{product.title}</h3>
                <Button
                  variant="outlined"
                  onClick={() => removeFavorite(product.id)}
                  className={styles.removeButton}
                >
                  Remover
                </Button>
              </div>
            ))}
          </section>
        )}
        {favorites.length > 0 && (
  <div className={styles.clearFavoritesContainer}>
    <Button
      variant="contained"
      onClick={clearFavorites}
      className={styles.clearButton}
      startIcon={<DeleteIcon />} 
    >
      Limpar Favoritos
    </Button>
  </div>
)}


      </div>
      
    </>
  );
};

export default Favorites;

export const getServerSideProps = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();

  return {
    props: {
      products: data,
    },
  };
};
