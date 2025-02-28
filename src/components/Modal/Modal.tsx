import { Dispatcher } from "@/lib/types/generics.types";
import { TitleTag } from "@/lib/types/types";
import { useEffect, useId } from "react";
import { ModalContextProvider, useModalContext } from "./Modal.context";
import FocusTrap from "../FocusTrap/FocusTrap";

const LABEL_ID_TEXT = "modal-label-";

/**
 * Modal panel component
 */

type ModalProps = {
  className?: string;
  isOpen: boolean;
  closeModal: Dispatcher<void>;
  children: React.ReactNode;
};

function Modal({ className, isOpen, closeModal, children }: ModalProps) {
  const id = useId();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ModalContextProvider id={id} isModalOpen={isOpen} onClose={closeModal}>
      <FocusTrap>
        <div
          className={`isolate z-10 ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={LABEL_ID_TEXT + id}
          aria-hidden={!isOpen}
        >
          {children}
        </div>
      </FocusTrap>
    </ModalContextProvider>
  );
}

/**
 * Backdrop component
 */

function Backdrop() {
  const { closeModal } = useModalContext();

  return (
    <div
      className={`bg-backdrop fixed inset-0 -z-10 opacity-50 transition-opacity`}
      onClick={() => closeModal()}
    ></div>
  );
}

/**
 * Title component
 */

type PanelTitleProps = {
  as?: TitleTag;
  className?: string;
  children: React.ReactNode;
};

function PanelTitle({ as = "h2", className, children }: PanelTitleProps) {
  const { id } = useModalContext();
  const Tag = as;

  return (
    <Tag id={LABEL_ID_TEXT + id} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Close button component
 */

type CloseButtonProps = {
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

function CloseButton({
  className,
  ariaLabel = "close the modal",
  children,
}: CloseButtonProps) {
  const { closeModal } = useModalContext();

  return (
    <button
      className={className}
      aria-label={ariaLabel}
      onClick={() => closeModal()}
    >
      {children}
    </button>
  );
}

/**
 * Attach child components to the main one
 */

Modal.Backdrop = Backdrop;
Modal.Title = PanelTitle;
Modal.CloseButton = CloseButton;

export default Modal;
