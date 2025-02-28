import { useCallback, useEffect, useRef, useState } from "react";

type FocusTrapProps = {
  children: React.ReactNode;
};

function FocusTrap({ children }: FocusTrapProps) {
  const [previousActiveElement, setPreviousActiveElement] =
    useState<HTMLElement | null>(null);
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);

  const focusWrapperRef = useRef<HTMLDivElement>(null);

  const defineFocusableElements = useCallback(() => {
    if (!focusWrapperRef.current) return;

    const elements = Array.from(
      focusWrapperRef.current.querySelectorAll(
        "button, a, input, textarea, select, details, [tabindex]:not([tabindex='-1'])",
      ),
    ) as HTMLElement[];

    setFocusableElements(elements);

    // focus first element
    const firstElement = elements[0];
    firstElement.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const focusedElement = document.activeElement as HTMLElement;
        const focusedIndex = focusableElements.indexOf(focusedElement);

        // if focused element is last in the list, focus the first element
        if (focusedIndex === focusableElements.length - 1) {
          focusableElements[0].focus();
          event.preventDefault();
        }

        // reversed tabbing
        if (event.shiftKey) {
          // if focused element is first in the list, focus the last element
          if (focusedIndex === 0) {
            focusableElements[focusableElements.length - 1].focus();
            event.preventDefault();
          }
        }
      }
    },
    [focusableElements],
  );

  useEffect(() => {
    setPreviousActiveElement(document.activeElement as HTMLElement);
    defineFocusableElements();

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, []);

  return <div ref={focusWrapperRef}>{children}</div>;
}

export default FocusTrap;
