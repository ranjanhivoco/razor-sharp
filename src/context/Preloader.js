import { createContext, useState, useEffect } from "react";
import { Box } from "../components/elements";
import { Oval } from "react-loader-spinner";

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <LoaderContext.Provider value={{ loading }}>
      {loading ? (
        <Box className="mc-spinner">
          {/* <Image src="images/favicon.ico" aly="logo" /> */}
          <Box className="mc-spinner-group">
            <Oval
              height={80}
              width={80}    
              color="#fed700"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="yellow"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </Box>
        </Box>
      ) : (
        children
      )}
    </LoaderContext.Provider>
  );
};
