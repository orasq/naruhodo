import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { WordTooltip } from "../WordTooltip";
import { wordStyle } from "./Word.styles";
import type { ParsedWordDictionaryEntry } from "@/lib/types/dictionary.types";

type WordProps = {
  dictionaryEntry?: ParsedWordDictionaryEntry;
  children: React.ReactNode;
};

function Word({ dictionaryEntry, children }: WordProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipIsClosing, setTooltipIsClosing] = useState(false);

  function handleClick() {
    setShowTooltip(true);
  }

  return (
    <>
      <span
        ref={wordRef}
        className={wordStyle({
          isActive: showTooltip && !tooltipIsClosing,
          isClosing: tooltipIsClosing,
        })}
        onClick={handleClick}
      >
        {children}
      </span>

      {showTooltip &&
        createPortal(
          <WordTooltip
            linkedTo={wordRef}
            setShowTooltip={setShowTooltip}
            setTooltipIsClosing={setTooltipIsClosing}
            tooltipIsClosing={tooltipIsClosing}
            dictionaryEntry={dictionaryEntry}
          />,
          document.body,
        )}
    </>
  );
}

export default Word;
