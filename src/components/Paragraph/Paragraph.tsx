"use client";

import { Noto_Sans_JP } from "next/font/google";
import styles from "./Paragraph.module.scss";
import { getTokens } from "@/actions/getTokens";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

type ParagraphProps = {
  text: string;
  children: React.ReactNode;
};

function Paragraph({ text, children }: ParagraphProps) {
  async function handleClick() {
    const tokens = await getTokens(text);

    console.log({ tokens });
  }
  return (
    <>
      <p className={`${notoSansJp.className} ${styles.paragraph}`}>{text}</p>
      <button onClick={handleClick}>click</button>
    </>
  );
}

export default Paragraph;
