import React from "react";

export enum LoadingActionStrings {
  USERLOGIN = "USERLOGIN",
  FETCHGROUPS = "FETCH/GROUPS",
  FETCHGROUP = "FETCH/GROUP",
}

type LoadingLevelStrings = keyof typeof LoadingActionStrings;

interface LoadingContextType {
  loading: LoadingLevelStrings[];
  dispatchLoading: (
    loadingString: string,
    callback?: () => Promise<void>
  ) => Promise<void>;
}

export const LoadingContext = React.createContext<LoadingContextType>(
  {} as LoadingContextType
);

const LoadingContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState([] as LoadingLevelStrings[]);

  const dispatchLoading = async (
    loadingString: string,
    callback?: () => Promise<void>
  ) => {
    try {
      setLoading((prev) => [...prev, loadingString as LoadingLevelStrings]);
      if (callback) await callback();
    } catch (error) {
      console.error("Error in dispatchLoading:", error);
    } finally {
      setLoading((prev) =>
        prev.filter((item) => item !== (loadingString as LoadingLevelStrings))
      );
    }
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        dispatchLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
