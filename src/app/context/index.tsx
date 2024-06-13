"use client"
import { createContext, useState } from 'react';

// Create the context
const LoginContext = createContext();

// Create the context provider component
const MyContextProvider = ({ children }) => {
    const [Login, setLogin] = useState(false); // Initial state
    

    // Value to be provided by the context
   
    return (
        <LoginContext.Provider value={{Login, setLogin}}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, MyContextProvider };
