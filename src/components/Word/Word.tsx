type WordProps = { children: React.ReactNode };

import { useRef, useState } from "react";
import { WordTooltip } from "../WordTooltip";
import { createPortal } from "react-dom";

function Word({ children }: WordProps) {
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
        className="hover:shadow-word hover:bg-surface-light relative inline rounded-sm hover:isolate hover:z-20 hover:cursor-pointer"
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
            word={children}
          />,
          document.body,
        )}
    </>
  );
}

export default Word;
