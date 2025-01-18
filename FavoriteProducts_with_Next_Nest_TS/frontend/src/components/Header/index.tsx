import  Link  from 'next/link'
import styles from './styles.module.scss'
import {FiLogOut, FiStar} from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import React from 'react';
import router from 'next/router'

export function Header(){

    const {signOut} = useContext(AuthContext);

    return(
        <header className={styles.headerConteiner}>
            <div className={styles.menuNav}>
                <Link href='/products'>
                    
                </Link>

                <nav className={styles.menuNav}>

                <button onClick={() => router.push('/favorites')}>
                <h1>Meus Favoritos</h1><FiStar color='#fff' size={24}/>
          </button>
                    <button onClick={signOut}>
                        <h1>Sair</h1><FiLogOut color='#fff' size={24}/>
                    </button>


                </nav>

            </div>
        </header>
    )
}