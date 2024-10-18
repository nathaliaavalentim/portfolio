import React, { useState, useMemo } from 'react';
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import { useFilter } from "../../contexts/FilterContext";
import Image from 'next/image';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';




//Tipos para os produtos
export type ProductProps = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

export interface HomeProps {
    products: ProductProps[];
    categories: string[];
    error?: string;
}

//Componente de produtos
function Products({ products, categories, error }: HomeProps) {
    const [productList, setProductList] = useState(products || []);
    const [modalItem, setModalItem] = useState<ProductProps | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { searchTerm, selectedCategory, priceRange, setSearchTerm, setSelectedCategory, setPriceRange } = useFilter();

    //Fecha o Modal
    function closeModal() {
        setModalVisible(false);
    }

    //Mostra os detalhes do produto no Modal
    async function handleModal(id: number) {
        const product = productList.find(item => item.id === id);
        setModalItem(product || null);
        setModalVisible(true);
    }

    //Usando para lidar com as alterações realizadas no filtro de faixa de preço
    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setPriceRange(prev => ({ ...prev, [name]: value }));
    }

    //Limpa os filtros
    function clearFilters() {
        setSearchTerm('');
        setSelectedCategory('');
        setPriceRange({ min: '', max: '' });
    }


    //Filtro de produtos (com useMemo para memorizar o resultado)
    const filteredProducts = useMemo(() => {
        return productList.filter(item => {
            const matchesName = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
            const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
            const matchesPrice = item.price >= minPrice && item.price <= maxPrice;

            return matchesName && matchesCategory && matchesPrice;
        });
    }, [productList, searchTerm, selectedCategory, priceRange]);


    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Produtos</title>
            </Head>

            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        {error && <p className={styles.errorMessage}>Erro ao carregar produtos: {error}</p>}

                        <input
                            type="text"
                            placeholder="Buscar por nome do produto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={styles.selectCategory}
                        >
                            <option value="">Todas as Categorias</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>

                        <div className={styles.priceRange}>
                            <input
                                type="number"
                                placeholder="Preço mínimo"
                                name="min"
                                value={priceRange.min}
                                onChange={handlePriceChange}
                                className={styles.priceInput}
                                min="0"
                            />
                            <input
                                type="number"
                                placeholder="Preço máximo"
                                name="max"
                                value={priceRange.max}
                                onChange={handlePriceChange}
                                className={styles.priceInput}
                            />
                            <button className={styles.clearButton} onClick={clearFilters}>
                            <RefreshIcon className={styles.refreshIcon} />
                            </button>

                        </div>
                    </div>

                    <article className={styles.listOrders}>
                        {filteredProducts.length === 0 && (
                            <span className={styles.emptyList}>Nenhum produto encontrado.</span>
                        )}
                        {filteredProducts.map(item => (
                            <ProductCard key={item.id} item={item} handleModal={handleModal} />
                        ))}
                    </article>
                </main>

                {modalVisible && modalItem && (
                    <Modal
                        isOpen={modalVisible}
                        onRequestClose={closeModal}
                        className={styles.modal}
                        overlayClassName={styles.overlay}
                    >
                        <h2>{modalItem.title}</h2>
                        <Image
                            src={modalItem.image}
                            alt={modalItem.title}
                            width={400}
                            height={400}
                            className={styles.modalImage}
                            placeholder="blur"
                            blurDataURL="/placeholder-image.png"
                        />
                        <p><strong>Descrição:</strong> {modalItem.description}</p>
                        <p><strong>Preço:</strong> ${modalItem.price}</p>
                        <button onClick={closeModal} className={styles.closeButton}>
                        <CloseIcon className={styles.closeIcon} />
                        </button>

                    </Modal>
                )}
            </div>
        </>
    );
}
//Memoriza o componente de cada card de produto para evitar renderizações desnecessárias
const ProductCard = React.memo(({ item, handleModal }: { item: ProductProps, handleModal: (id: number) => void }) => {
    return (
        <section className={styles.card}>
            <button onClick={() => handleModal(item.id)} className={styles.button}>
                <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className={styles.productImage}
                    placeholder="blur"
                    blurDataURL="/placeholder-image.png"
                />
                <h3>{item.title}</h3>
                <p>Preço: ${item.price}</p>
                <p>Categoria: {item.category}</p>
            </button>
        </section>
    );
});

export default Products;

//Com tratamento de erro
export const getServerSideProps = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();

        const categories = [...new Set(data.map((product: ProductProps) => product.category))];

        return {
            props: {
                products: data,
                categories
            }
        };
    } catch (error: any) {
        console.error("Erro ao buscar produtos:", error.message);
        return {
            props: {
                products: [],
                categories: [],
                error: error.message || "Erro desconhecido"
            }
        };
    }
};
