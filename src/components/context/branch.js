import { createContext, useState } from "react";

export const BranchContext = createContext('');

export const BranchProvider = ({ children }) => {
    const [branchData, setBranchData] = useState([]);
    return (
    <BranchContext.Provider value={{ branchData, setBranchData }}>
      {children}
    </BranchContext.Provider>
  );
};
