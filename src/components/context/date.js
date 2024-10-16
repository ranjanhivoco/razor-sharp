// contextTwo.js
import React, { createContext, useState } from 'react';

export const ContextDate = createContext();

export const ProviderDate = ({ children }) => {
  const [formatDate, setFormatDate] = useState();

  return (
    <ContextDate.Provider value={{ formatDate, setFormatDate }}>
      {children}
    </ContextDate.Provider>
  );
};
