import { ToolBox } from "../ToolBox";
import styles from "./TextPage.module.scss";

function TextPage({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles["text-page"]}>
      {children}

      <div className={styles["toolbox-wrapper"]}>
        <ToolBox />
      </div>
    </div>
  );
}

export default TextPage;
