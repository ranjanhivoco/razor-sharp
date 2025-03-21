import { createContext, useState } from "react";

export const BranchIDContext = createContext("");

export const BranchIDProvider = ({ children }) => {
  const [branchID, setBranchID] = useState(2306);
  return (
    <BranchIDContext.Provider value={{ branchID, setBranchID }}>
      {children}
    </BranchIDContext.Provider>
  );
};
