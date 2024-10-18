import React from 'react'; 
import { AppProps } from "next/app";
import { FilterProvider } from "../contexts/FilterContext";
import '../../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <FilterProvider>
            <Component {...pageProps} />
        </FilterProvider>
    );
}

export default MyApp;
