import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import Image from 'next/image';
import { Button } from '@mui/material';
import { ProductProps } from '../products';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { api } from '../../services/apiClient';

const Products = ({ products }: { products: ProductProps[] }) => {
  const [productList, setProductList] = useState(products || []);
  const [modalItem, setModalItem] = useState<ProductProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<ProductProps[]>([]);
  const [maxFavoritesModalVisible, setMaxFavoritesModalVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setUserId(storedUserId);
      fetchFavorites(storedUserId);
    }
  }, []);

  useEffect(() => {
    const syncFavorites = () => {
      if (userId) {
        fetchFavorites(userId);
      }
    };

    window.addEventListener('storage', syncFavorites);

    return () => {
      window.removeEventListener('storage', syncFavorites);
    };
  }, [userId]);

  const fetchFavorites = async (userId: string) => {
    try {



      const response = await api.get(`favorites/${userId}`);

      const data = response.data;
      const filterProducts = productList.filter(productL =>
        data.some(product => product.productId === productL.id)
      );

      setFavorites(filterProducts);

    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  };


  const addFavorite = async (product: ProductProps) => {
    if (favorites.some(fav => fav.productId === product.id)) {
      alert('Este produto já está nos favoritos.');
      return;
    }

    if (favorites.length >= 5) {
      setMaxFavoritesModalVisible(true);
      return;
    }

    try {


      const response = await api.post('/favorites', {
        userId,
        productId: product.id
      });

      toast.success("Adicionado aos Favoritos.")

      fetchFavorites(userId);
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error.message || error);
    }
  };

  const handleModal = (id: number) => {
    const product = productList.find(item => item.id === id);
    setModalItem(product || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeMaxFavoritesModal = () => {
    setMaxFavoritesModalVisible(false);
  };

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>



          <article className={styles.listOrders}>
            {productList.map(item => (
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
                    variant={isFavorite(item.id) ? "outlined" : "contained"}

                    onClick={() => addFavorite(item)}
                    disabled={isFavorite(item.id)}
                    className={styles.favoriteButton}
                  >
                    {isFavorite(item.id) ? "Adicionado" : "Adicionar aos Favoritos"}
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
                <p><strong>Preço:</strong> ${modalItem.price}</p>
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
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  return {
    props: {
      products: data,
    }
  };
};