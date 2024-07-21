import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import styles from "./WordTooltip.module.scss";

type WordTooltipProps = {
  linkedTo: RefObject<HTMLSpanElement>;
  setShowTooltip: Dispatch<SetStateAction<boolean>>;
  word: React.ReactNode;
};

function WordTooltip({ linkedTo, setShowTooltip, word }: WordTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!tooltipRef.current?.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={tooltipRef} className={styles.tooltip}>
      {word}
    </div>
  );
}

export default WordTooltip;
