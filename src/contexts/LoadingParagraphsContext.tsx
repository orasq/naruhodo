import React, { useState, ReactNode, createContext, useContext } from "react";

export const LoadingParagraphsContext = createContext({
  isLoading: false,
  setIsLoading: (value: boolean) => {},
});

export const LoadingParagraphsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingParagraphsContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingParagraphsContext.Provider>
  );
};
