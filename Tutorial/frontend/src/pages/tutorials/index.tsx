import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header }  from "../../components/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";
import Modal from 'react-modal';
import { ModalTutorial } from "../../components/ModalTutorial";
import { toast } from "react-toastify";
import router from "next/router";


export type TutorialProps = {
    id: string;
    status: boolean; 
    tutorial_id: string;
    name: string;
    content: string;
    creator: string;
}
export interface HomeProps{
    tutorials: TutorialProps[];
}




export default function Tutorials({tutorials}: HomeProps) {

    const [tutorialList, setTutorialList] = useState(tutorials || [])
    const [modalItem, setModalItem] = useState<TutorialProps[]>();
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCreator, setSearchCreator] = useState('');
    const [searchKeywords, setSearchKeywords] = useState('');
    

    //Fechar o Modal
    function closeModal(){
        setModalVisible(false);
    }


    //Mostrar os detalhes doe um atendimento no Modal
    async function handleModal(id: string){
        const apiClient = new setupAPIClient();
        const response = await apiClient.get('/tutorial/detail?tutorial_id='+id, {
            param:{
                tutorial_id: id
            }
        })



        setModalItem(response.data);
        setModalVisible(true);
        
    }

    // Função de filtro
    async function handleFilterTutorial() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/tutorial', {
                params: {
                    title: searchTitle,
                    creator: searchCreator,
                    keywords: searchKeywords,
                }
            });
            setTutorialList(response.data);


    }



    //Remove o tutorial na tela, atualizando os dados do dashboard:
    async function handleFinishTutorial(id: string){
        const apiClient = setupAPIClient();
        await apiClient.put('/tutorial/delete', {
            tutorial_id: id,
        })
        const response = await apiClient.get('/tutorial');
        setTutorialList(response.data);
        setModalVisible(false);
        toast.success("Removido com sucesso.")
    }

    //Refresh no Dashboard
    async function handleRefreshTutorial(){
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/tutorial')
        setTutorialList(response.data);
        setSearchTitle('');
        setSearchCreator('');
        setSearchKeywords('');

    }



    async function handleNewTutorial(){
        router.push("/new");
    }

    //Vindo do react-modal
    Modal.setAppElement('#__next')

    return (
        <>
            <Head>
                <title>Tutorial</title>
            </Head>

            <div>
                <Header />
                <main className={styles.container}>            

                    <div className={styles.form}>

                    <div className={styles.containerHeader}>
                        <h1>Busca de Tutoriais</h1>
                        </div><br/>
                        <input
                            type="text"
                            placeholder="Buscar por Título"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Buscar por Criador"
                            value={searchCreator}
                            onChange={(e) => setSearchCreator(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Buscar por Palavras-chave"
                            value={searchKeywords}
                            onChange={(e) => setSearchKeywords(e.target.value)}
                            className={styles.input}
                        />
                        
                    </div>
                    <div className={styles.buttoncontainer}>
                        
                    <button onClick={handleFilterTutorial} className={styles.buttonAdd}>Buscar</button>
                    <button onClick={handleRefreshTutorial} className={styles.buttonAdd}>Limpar Filtros</button>
                    

                    </div>
<br/>
                    <div className={styles.containerHeader}>
                        <h1>Lista de Tutoriais</h1>
                        <button onClick={handleRefreshTutorial} className={styles.button}><FiRefreshCcw size={25} color="red" /></button>
                    
                        </div>

                    <article className={styles.listOrders}>
                        {tutorialList.length === 0 && (
                            <span className={styles.emptyList}>Nenhum tutorial encontrado.</span>
                        )}
                        {tutorialList.map(item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={() => handleModal(item.id)} className={styles.button}>
                                   
                                    <span>
                                        <p>Título: {item.name}</p>
                                        <br />                                        
                                        <p>Conteúdo: {item.content}</p>
                                        <br />
                                        <p>Criador: {item.creator}</p>
                                    </span><br/>
                                </button>
                            </section>
                        ))}
                    </article>

                    <div className={styles.buttoncontainer}>
                    <button onClick={handleNewTutorial} type="submit" className={styles.buttonAdd2}>
                        Novo Tutorial
                    </button>
                    </div>
                </main>

                {modalVisible && (
                    <ModalTutorial
                        isOpen={modalVisible}
                        onRequestClose={closeModal}
                        tutorials={modalItem}
                        handleFinishTutorial={handleFinishTutorial}
                    />
                )}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/tutorial');

    return {
        props: {
            tutorials: response.data
        }
    };
});