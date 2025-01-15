import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import Head from 'next/head'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FormEvent, useState, useEffect } from 'react'
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';

export default function TutorialNew() {

    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [creator, setCreator] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (router.query.name) {
          setName(router.query.name as string);
          setContent(router.query.content as string);
          setCreator(router.query.creator as string);
        }
      }, [router.query]);

      async function handleRegister(e: FormEvent) {
        e.preventDefault();
        try {
            const apiClient = setupAPIClient();
    
            if (id) {
                // Editar tutorial existente
                await apiClient.put(`/tutorial/edit`, {
                    tutorial_id: id,
                    name,
                    content,
                    creator
                });
                toast.success("Tutorial atualizado com sucesso.");
            } else {
                // Cadastrar novo tutorial
                await apiClient.post('/tutorial/new', {
                    name,
                    content,
                    creator
                });
                toast.success("Tutorial cadastrado com sucesso.");
            }
        } catch (err) {
            console.error(err); 
            toast.error("Ops! Erro ao salvar.");
        }
    
        setName('');
        setContent('');
        setCreator('');
        router.push("/tutorials");
    }
    

    return (
        <>
            <Head>
                <title>{id ? 'Editar Tutorial' : 'Novo Tutorial'}</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>{id ? 'Editar Tutorial' : 'Novo Tutorial'}</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type='text'
                            placeholder='Título'
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <textarea
                            placeholder='Conteúdo'
                            className={styles.input}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Criador'
                            className={styles.input}
                            value={creator}
                            onChange={(e) => setCreator(e.target.value)}
                        />
                        <button className={styles.buttonAdd} type='submit'>
                            {id ? 'Atualizar' : 'Cadastrar'}
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/tutorial');
    return {
        props: {
            name: response.data
        }
    }
});
