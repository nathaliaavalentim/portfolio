import Link from 'next/link';
import styles from './styles.module.scss';
import { FiLogOut, FiStar, FiShoppingCart } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import React from 'react';
import router from 'next/router';

export function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Link href="/products" className={styles.logo}>
          <span className={styles.logoText}>MyStore</span>
        </Link>
      </div>

      <nav className={styles.navigation}>
        <Link href="/products" className={styles.navLink}>
          <FiShoppingCart size={24} />
          <span>Lista de Produtos</span>
        </Link>

        <button onClick={() => router.push('/favorites')} className={styles.navButton}>
          <FiStar size={24} />
          <span>Meus Favoritos</span>
        </button>

        <button onClick={signOut} className={styles.navButton}>
          <FiLogOut size={24} />
          <span>Sair</span>
        </button>
      </nav>
    </header>
  );
}
