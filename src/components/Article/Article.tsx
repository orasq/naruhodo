"use client";

import { TextBlock } from "@/components/TextBlock";
import { KuromojiToken } from "kuromojin";
import { useEffect, useRef, useState } from "react";
import styles from "./Article.module.scss";
import { TextBlockTag } from "../TextBlock/TextBlock";
import initializeBaseText from "@/lib/utils/initializeBaseText";
import prefersReducedMotion from "@/lib/utils/prefersReducedMotion";
import { ScrollQueue } from "../ScrollQueue";

type ArticleProps = {
  articleParagraphs: string[];
};

export type ParagraphObject = {
  baseText: string;
  parsedText: KuromojiToken[];
  htmlTag: TextBlockTag;
  isVisible: boolean;
  isBookmarked: boolean;
};

function Article({ articleParagraphs }: ArticleProps) {
  const [paragraphs, setParagraphs] = useState<ParagraphObject[]>(() => {
    return articleParagraphs.map((text) => ({
      baseText: initializeBaseText(text)?.baseText,
      parsedText: [],
      htmlTag: initializeBaseText(text)?.htmlTag,
      isVisible: false,
      isBookmarked: false,
    }));
  });

  // Create array of refs with page's paragraphs
  const textBlockRefs = useRef<HTMLParagraphElement[]>([]);
  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (!el || textBlockRefs?.current?.includes(el)) return;

    textBlockRefs?.current?.push(el);
  };

  const [bookmarked, setBookmarked] = useState<number | null>(null);

  // handle change of bookmarked value
  useEffect(() => {
    const newArray = [...paragraphs].map((paragraph, index) => {
      return { ...paragraph, isBookmarked: index === bookmarked };
    });
    setParagraphs(newArray);
  }, [bookmarked]);

  // check localeStorage bookmarked value and scroll to it
  useEffect(() => {
    const storageBookmarked = localStorage.getItem("bookmarked");

    if (!storageBookmarked) return;

    const bookmarkedId = parseInt(storageBookmarked);
    setBookmarked(bookmarkedId);

    const bookmarkedRef = textBlockRefs.current.find((_, index) => {
      return index === bookmarkedId;
    });

    if (!bookmarkedRef) return;

    bookmarkedRef.scrollIntoView({
      behavior: prefersReducedMotion() ? "instant" : "smooth",
    });
  }, []);

  return (
    <ScrollQueue
      textBlockRefs={textBlockRefs}
      paragraphs={paragraphs}
      setParagraphs={setParagraphs}
    >
      <article id="articleContent" className={styles.article}>
        {paragraphs.map((item, index) => (
          <TextBlock
            key={index}
            blockId={index}
            paragraphRef={addToRefs}
            parsedParagraph={item.parsedText}
            htmlTag={item.htmlTag}
            isVisible={item.isVisible}
            setBookmarked={setBookmarked}
            isBookmarked={item.isBookmarked}
          >
            {item.baseText}
          </TextBlock>
        ))}
      </article>
    </ScrollQueue>
  );
}

export default Article;
