'use client'

import { useContext, createContext, ReactNode, useState, Dispatch, SetStateAction, useMemo } from "react";

// Define interface instead of type for better extensibility
interface ColourContextType {
    colours: string[];
    setColours: Dispatch<SetStateAction<string[]>>;
}

// Provide better initial value
const initialColours: string[] = ['red', 'blue', 'green'];

const ColourContext = createContext<ColourContextType | null>(null);

export const ColourContextProvider = ({ children }: { children: ReactNode }) => {
    const [colours, setColours] = useState<string[]>(initialColours);

    const value = useMemo(()=>({colours, setColours}), [colours])

    return (
        <ColourContext.Provider value={value}>
            {children}
        </ColourContext.Provider>
    );
};

// Custom hook with better error handling
export const useColour = (): ColourContextType => {
    const context = useContext(ColourContext);
    
    if (context === null) {
        throw new Error(
            'useColour must be used within a ColourContextProvider. ' +
            'Please check if the component is wrapped in ColourContextProvider.'
        );
    }
    
    return context;
};

// Optional: Export the context if needed elsewhere
export { ColourContext };