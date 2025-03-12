'use client'

import { useContext, createContext, ReactNode, useState, useCallback } from "react";

type ColourContextType = {
    colours: string[],
    renderColours: (colours: string[]) => void
}

const ColourContext = createContext<ColourContextType>({} as ColourContextType);

const initialColours: string[] = ['red', 'blue', 'green'];

export const ColourContextProvider = ({children} : {children: ReactNode}) => {
    const [colours, setColours] = useState<string[]>(initialColours);

    const renderColours = useCallback((newColours: string[]) => {
        setColours(newColours);
    }, []);

    return(
        <ColourContext.Provider value={{colours, renderColours}}>
            {children}
        </ColourContext.Provider>
    )
}

export const useColour = () => {
    const context = useContext(ColourContext);
    if (!context) {
        throw new Error('useColour must be used within a ColourContextProvider')
    }
    return context;
}