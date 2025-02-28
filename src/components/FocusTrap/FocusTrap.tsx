import { useCallback, useEffect, useRef, useState } from "react";

type FocusTrapProps = {
  children: React.ReactNode;
};

function FocusTrap({ children }: FocusTrapProps) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const focusWrapperRef = useRef<HTMLDivElement>(null);

  const defineFocusableElements = useCallback(() => {
    if (!focusWrapperRef.current) return;

    const elements = Array.from(
      focusWrapperRef.current.querySelectorAll(
        "button, a, input, textarea, select, details, [tabindex]:not([tabindex='-1'])",
      ),
    ) as HTMLElement[];

    focusableElementsRef.current = elements;

    // focus first element
    const firstElement = elements[0];
    firstElement.focus();
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Tab") {
      const focusableElements = focusableElementsRef.current;
      const previousFocusedElement = document.activeElement as HTMLElement;
      const focusedIndex = focusableElements.indexOf(previousFocusedElement);

      // if focused element is last in the list, focus the first element
      if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
        focusableElements[0].focus();
        e.preventDefault();
      }

      // if reversed tabbing and focused element is first in the list, focus the last element
      if (e.shiftKey && focusedIndex === 0) {
        focusableElements[focusableElements.length - 1].focus();
        e.preventDefault();
      }
    }
  }, []);

  useEffect(() => {
    // save element that was focused before modal opening
    previousActiveElement.current = document.activeElement as HTMLElement;

    defineFocusableElements();

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      previousActiveElement.current?.focus();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div ref={focusWrapperRef}>{children}</div>;
}

export default FocusTrap;
