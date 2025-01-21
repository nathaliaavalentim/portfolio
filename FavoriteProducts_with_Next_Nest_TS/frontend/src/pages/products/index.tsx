import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import Modal from 'react-modal';
import Image from 'next/image';
import { Button } from '@mui/material';
import { ProductProps } from '../products';
import { toast } from 'react-toastify';
import { favoritesService } from '../../services/favorite/favoritesService';
import { AuthContext } from '../../contexts/AuthContext';

const Products = ({ products }: { products: ProductProps[] }) => {
  const { user } = useContext(AuthContext);  //Acessando o user do AuthContext
  const [productList, setProductList] = useState(products || []);
  const [modalItem, setModalItem] = useState<ProductProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<ProductProps[]>([]);
  const [maxFavoritesModalVisible, setMaxFavoritesModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      fetchFavorites();
    }
  }, [user]);  //Dependência no user

  const fetchFavorites = async () => {
    try {
      const data = await favoritesService.getFavorites();
      const filterProducts = productList.filter((product) =>
        data.some((favorite) => favorite.productId === product.id)
      );
      setFavorites(filterProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = async (product: ProductProps) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      alert('Este produto já está nos favoritos.');
      return;
    }

    if (favorites.length >= 5) {
      setMaxFavoritesModalVisible(true);
      return;
    }

    if (!user?.id) {
      toast.error('Usuário não autenticado.');
      return;
    }

    try {
      await favoritesService.addFavorite(product.id);
      toast.success('Adicionado aos favoritos.');
      fetchFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = (id: number) => {
    const product = productList.find((item) => item.id === id);
    setModalItem(product || null);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);
  const closeMaxFavoritesModal = () => setMaxFavoritesModalVisible(false);
  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <article className={styles.listOrders}>
            {productList.map((item) => (
              <section key={item.id} className={styles.card}>
                <button onClick={() => handleModal(item.id)} className={styles.button}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className={styles.productImage}
                  />
                  <h3>{item.title}</h3>
                  <p>Preço: ${item.price}</p>
                </button>
                <div className={styles.favoriteButtonContainer}>
                  <Button
                    variant={isFavorite(item.id) ? 'outlined' : 'contained'}
                    onClick={() => addFavorite(item)}
                    disabled={isFavorite(item.id)}
                    className={styles.favoriteButton}
                  >
                    {isFavorite(item.id) ? 'Adicionado' : 'Adicionar aos Favoritos'}
                  </Button>
                </div>
              </section>
            ))}
          </article>

          {modalVisible && modalItem && (
            <Modal isOpen={modalVisible} onRequestClose={closeModal} className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>{modalItem.title}</h2>
                <Image src={modalItem.image} alt={modalItem.title} width={400} height={400} />
                <p>{modalItem.description}</p>
                <p>
                  <strong>Preço:</strong> ${modalItem.price}
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={closeModal}
                  className={styles.closeButtonStyled}
                >
                  Fechar
                </Button>
              </div>
            </Modal>
          )}

          {maxFavoritesModalVisible && (
            <Modal
              isOpen={maxFavoritesModalVisible}
              onRequestClose={closeMaxFavoritesModal}
              className={styles.maxFavoritesModal}
            >
              <h2>Limite de Favoritos</h2>
              <p>Você só pode adicionar no máximo 5 produtos aos favoritos.</p>
              <Button
                variant="contained"
                color="primary"
                onClick={closeMaxFavoritesModal}
                className={styles.closeButton}
              >
                Fechar
              </Button>
            </Modal>
          )}
        </main>
      </div>
    </>
  );
};

export default Products;

export const getServerSideProps = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();

  return {
    props: {
      products: data,
    },
  };
};
