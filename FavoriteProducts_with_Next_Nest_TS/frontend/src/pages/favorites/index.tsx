import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Button } from '@mui/material';
import { ProductProps } from '../products';
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify';

const Favorites = ({ products }: { products: ProductProps[] }) => {
    const [productList, setProductList] = useState(products || []);
    const [favorites, setFavorites] = useState<ProductProps[]>([]);
    const [favoritesData, setFavoritesData] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchFavorites(storedUserId);
        }
    }, []);

    const fetchFavorites = async (userId: string) => {
        try {



            const response = await api.get(`favorites/${userId}`);

            const data = response.data;

            setFavoritesData(data);

            const filterProducts = productList.filter(productL =>
                data.some(product => product.productId === productL.id)
            );

            setFavorites(filterProducts);

        } catch (error) {
            console.error("Erro ao carregar favoritos:", error);
        }
    };






    const saveFavorites = (updatedFavorites: ProductProps[]) => {
        setFavorites(updatedFavorites);
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            localStorage.setItem(`favorites_${storedUserId}`, JSON.stringify(updatedFavorites));
        }
    };

    const removeFavorite = async (id: number) => {

        try {

            const filterFavorite = favoritesData.filter(favorite =>
                favorites.some(product => favorite.productId === id)
            );


            const response = await api.delete(`favorites/${userId}/${filterFavorite[0].id}`);

            toast.success("Removido o produto dos favoritos.")

            fetchFavorites(userId);
        } catch (error) {
            console.error("Erro ao remover produto favorito", error.message || error);
        }

    };

    const clearFavorites = async () => {

        try {


            const response = await api.delete(`favorites/${userId}`);

            toast.success("Removido todos os favoritos.")

            fetchFavorites(userId);
        } catch (error) {
            console.error("Erro ao remover favoritos", error.message || error);
        }

    };

    return (
        <div className={styles.container}>
            <h1>Produtos Favoritos</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => router.push('/products')}
                className={styles.backButton}
            >
                Voltar para Produtos
            </Button>
            {error && <p className={styles.error}>{error}</p>}
            <section className={styles.favoritesList}>
                {favorites.length === 0 ? (
                    <p className={styles.emptyMessage}>Você não tem produtos favoritos.</p>
                ) : (
                    favorites.map((product) => (
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
                                color="secondary"
                                onClick={() => removeFavorite(product.id)}
                                className={styles.removeButton}
                            >
                                Remover
                            </Button>
                        </div>
                    ))
                )}
            </section>
            {favorites.length > 0 && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={clearFavorites}
                    className={styles.clearButton}
                >
                    Limpar Favoritos
                </Button>
            )}
        </div>
    );
};

export default Favorites;

export const getServerSideProps = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    return {
        props: {
            products: data,
        }
    };
};
