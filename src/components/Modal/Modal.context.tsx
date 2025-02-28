import { Dispatcher } from "@/lib/types/generics.types";
import { createContext, useContext } from "react";

type ModalContext = {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type ModalContextProviderProps = {
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatcher<boolean>;
  children: React.ReactNode;
};

const ModalContext = createContext({} as ModalContext);

export function ModalContextProvider({
  id,
  isModalOpen,
  setIsModalOpen,
  children,
}: ModalContextProviderProps) {
  return (
    <ModalContext.Provider
      value={{ id, isOpen: isModalOpen, setIsOpen: setIsModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModalContext must be used within a <ModalContextProvider>",
    );
  }

  return context;
};
