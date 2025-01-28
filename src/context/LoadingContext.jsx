import { createContext, useContext, useState, useRef } from "react";
import LoadingPage from "../components/LoadingPage";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoadingState] = useState(false);
  const activeRequests = useRef(0);

  const setIsLoading = (state) => {
    if (state) {
      activeRequests.current += 1;
      setIsLoadingState(true);
    } else {
      activeRequests.current -= 1;
      if (activeRequests.current <= 0) {
        setIsLoadingState(false);
        activeRequests.current = 0;
      }
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? <LoadingPage /> : children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
