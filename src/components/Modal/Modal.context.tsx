import { Dispatcher } from "@/lib/types/generics.types";
import { createContext, useContext } from "react";

type ModalContext = {
  id: string;
  isOpen: boolean;
  closeModal: () => void;
};

type ModalContextProviderProps = {
  id: string;
  isModalOpen: boolean;
  onClose: Dispatcher<void>;
  children: React.ReactNode;
};

const ModalContext = createContext({} as ModalContext);

export function ModalContextProvider({
  id,
  isModalOpen,
  onClose,
  children,
}: ModalContextProviderProps) {
  return (
    <ModalContext.Provider
      value={{ id, isOpen: isModalOpen, closeModal: onClose }}
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
