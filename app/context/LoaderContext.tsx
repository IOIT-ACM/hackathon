"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
    hasLoaded: boolean;
    setHasLoaded: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | null>(null);

interface LoaderProviderProps {
    children: ReactNode;
}

export function LoaderProvider({ children }: LoaderProviderProps) {
    const [hasLoaded, setHasLoaded] = useState(false);

    return (
        <LoaderContext.Provider value={{ hasLoaded, setHasLoaded }}>
            {children}
        </LoaderContext.Provider>
    );
}

export function useLoader(): LoaderContextType {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error("useLoader must be used within a LoaderProvider");
    }
    return context;
}
