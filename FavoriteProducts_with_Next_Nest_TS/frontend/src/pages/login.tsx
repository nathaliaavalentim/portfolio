import React from 'react'; 
import { useContext, FormEvent, useState} from 'react'
import {toast} from 'react-toastify';
import Head from 'next/head'
import styles from '../../styles/home.module.scss';
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { AuthContext } from '../contexts/AuthContext'
import Link from 'next/link';
import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {


  
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

   

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === ''|| password === ''){
      toast.warn("Preencha todos os campos.")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }
    await signIn(data);

    setLoading(false);

  
  }



  return (
    <>
    <Head>
      <title>Faça seu login</title> 
    </Head>
    <div className={styles.containerCenter}>
      

      <div className={styles.login}>
      <h1>Faça o seu Login</h1>
        <form onSubmit={handleLogin}>
          <Input
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            loading={loading}
          >
            Acessar
          </Button>
        </form>

        <Link legacyBehavior href="/signup">
          <a className={styles.text}> Não possui uma conta? Cadastre-se</a>
        </Link>

      </div>
    </div>
    </>
  )
}

//Estrutura de ServerSide
export const getServerSideProps = canSSRGuest(async(context) => {

  return {
    props: {}
  }
})
