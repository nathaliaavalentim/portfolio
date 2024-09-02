import  Link  from 'next/link'
import styles from './styles.module.scss'
import {FiLogOut} from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Header(){

    const {signOut} = useContext(AuthContext);

    return(
        <header className={styles.headerConteiner}>
            <div className={styles.menuNav}>
                <Link href='/tutorials'>
                    <h2>Início</h2>
                </Link>

                <nav className={styles.menuNav}>
                    <button onClick={signOut}>
                        <h1>Sair</h1><FiLogOut color='#fff' size={24}/>
                    </button>
                </nav>

            </div>
        </header>
    )
}