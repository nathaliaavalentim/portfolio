import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import React from 'react';
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
  children: ReactNode,
}

export function Button({ loading, children, ...rest }: ButtonProps){
  return(
    <button 
    className={styles.button}
    disabled={loading}
    {...rest}
    >
       {loading ? 'Carregando...' : children}
    </button>
  )
}