type WordProps = { children: React.ReactNode };

import styles from "./Word.module.scss";

function Word({ children }: WordProps) {
  return <span className={styles.word}>{children}</span>;
}

export default Word;
