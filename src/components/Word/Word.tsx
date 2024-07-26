type WordProps = { children: React.ReactNode };

import { useRef, useState } from "react";
import { WordTooltip } from "../WordTooltip";
import styles from "./Word.module.scss";
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
        className={`${styles.word} ${showTooltip ? styles["is-active"] : ""} ${
          tooltipIsClosing ? styles["is-closing"] : ""
        }`}
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
          document.body
        )}
    </>
  );
}

export default Word;
