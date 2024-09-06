type WordProps = { dictionaryEntry?: DBWord; children: React.ReactNode };

import { useRef, useState } from "react";
import { WordTooltip } from "../WordTooltip";
import { createPortal } from "react-dom";
import { tv } from "tailwind-variants";
import { DBWord } from "@/lib/types/types";

const wordStyle = tv({
  base: [
    "relative inline rounded-sm",
    "hover:isolate hover:z-20 hover:cursor-pointer hover:bg-surface-light hover:shadow-word",
  ],
  variants: {
    isActive: {
      true: "isolate z-20 cursor-pointer bg-surface-light shadow-word",
    },
    isClosing: {
      true: "z-20 bg-transparent shadow-none hover:shadow-none",
    },
  },
});

function Word({ dictionaryEntry, children }: WordProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipIsClosing, setTooltipIsClosing] = useState(false);

  function handleClick() {
    setShowTooltip(!showTooltip);
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
