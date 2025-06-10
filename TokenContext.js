import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(null);
  const [newDataArray, setNewDataArray] = useState(null);
  return (
    <TokenContext.Provider value={{ token, setToken, newDataArray, setNewDataArray }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
