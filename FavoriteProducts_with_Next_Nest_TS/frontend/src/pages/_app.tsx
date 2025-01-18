import '../../styles/globals.scss'
import React from 'react'; 
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { AuthProvider } from '../contexts/AuthContext'
import { FilterProvider } from '../contexts/FilterContext';


function MyApp({ Component, pageProps }: AppProps) {
  return (
   <AuthProvider>
    <FilterProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
      </FilterProvider>
   </AuthProvider>
  )
}

export default MyApp
