import  Link  from 'next/link'
import styles from './styles.module.scss'
import {FiLogOut} from 'react-icons/fi'
import { useContext } from 'react'
import React from 'react'; 

export function Header() {
    return (
        <header className={styles.headerConteiner}>
            <div className={styles.headerComponent}>
                <div className={styles.menuNav}>           
        
                </div>
                <h1 className={styles.title}>Dashboard de Produtos</h1> 
            </div>
        </header>
    );
}
