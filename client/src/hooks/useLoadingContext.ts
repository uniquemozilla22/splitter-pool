import React from "react";
import { LoadingContext } from "../context/loading/loadingcontext";

const useLoadingContext = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "useLoadingContext must be used within a LoadingContextProvider"
    );
  }
  return context;
};

export default useLoadingContext;
