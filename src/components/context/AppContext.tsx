'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context state (customize as needed)
interface AppContextType {
  user: any | null;
  setUser: (user: any | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

// Initialize the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context (for easier consumption in other components)
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
