import { createContext, ReactNode, useContext, useState } from "react";
import React from 'react'; 
//Define o tipo para o estado do filtro
type FilterState = {
    searchTerm: string;
    selectedCategory: string;
    priceRange: { min: string; max: string };
    setSearchTerm: (term: string) => void;
    setSelectedCategory: (category: string) => void;
    setPriceRange: (range: { min: string; max: string }) => void;
};

//Cria o contexto
const FilterContext = createContext<FilterState | undefined>(undefined);

//Componente de provedor para envolver a aplicação
export function FilterProvider({ children }: { children: ReactNode }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    return (
        <FilterContext.Provider
            value={{
                searchTerm,
                selectedCategory,
                priceRange,
                setSearchTerm,
                setSelectedCategory,
                setPriceRange,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

//Uso de Hook para utilizar o contexto
export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter deve ser usado dentro de um FilterProvider");
    }
    return context;
}
