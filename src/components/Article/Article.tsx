"use client";

import { TextBlock } from "@/components/TextBlock";
import useParseText from "@/hooks/useParseText";
import { KuromojiToken } from "kuromojin";
import { useEffect, useRef, useState } from "react";
import styles from "./Article.module.scss";
import { ArticleHeader } from "../ArticleHeader";
import type { BookInfo } from "../ArticleHeader/ArticleHeader";
import { TextBlockTag } from "../TextBlock/TextBlock";
import initializeBaseText from "@/lib/utils/initializeBaseText";

type ArticleProps = {
  bookInfo: BookInfo;
  articleParagraphs: string[];
};

export type ParagraphObject = {
  baseText: string;
  parsedText: KuromojiToken[];
  htmlTag: TextBlockTag;
  isVisible: boolean;
};

function Article({ bookInfo, articleParagraphs }: ArticleProps) {
  const [paragraphs, setParagraphs] = useState<ParagraphObject[]>(() => {
    return articleParagraphs.map((text) => ({
      baseText: initializeBaseText(text)?.baseText,
      parsedText: [],
      htmlTag: initializeBaseText(text)?.htmlTag,
      isVisible: false,
    }));
  });

  const {
    addToQueue,
    removeFromQueue,
    isInQueue,
    setVisibility,
    updatedParagraphs,
  } = useParseText(paragraphs);

  // Create array of refs with page's paragraphs
  const textBlockRefs = useRef<HTMLParagraphElement[]>([]);
  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (!el || textBlockRefs?.current?.includes(el)) return;

    textBlockRefs?.current?.push(el);
  };

  // Update displayed paragraphs array when parsed text changes
  useEffect(() => {
    setParagraphs(updatedParagraphs);
  }, [updatedParagraphs]);

  /**
   * Add IntersectionObserver to ascertain if a <TextBlock> is visible on the screen or not.
   * When it's visible and doesn't have any parsed text yet --> add text to queue of text to be parsed
   * When it's not visible and has parsed text --> display "baseText" to limit the amount of DOM elements in the page
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        // get entry's index
        const index = textBlockRefs.current.indexOf(
          entry.target as HTMLParagraphElement
        );
        const isSetVisible = paragraphs[index].isVisible;

        // change visibility and remove from queue (if applicable)
        if (!entry.isIntersecting) {
          if (isInQueue(index)) removeFromQueue(index);

          setVisibility(index, false);
          return;
        }

        // add item to queue
        if (!isInQueue(index)) addToQueue(index);
        setVisibility(index, true);
      });
    });

    // observe each <TextBlock>
    textBlockRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      textBlockRefs.current.forEach((ref) => {
        observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <article className={styles.article}>
      {/* Book info */}
      <ArticleHeader bookInfo={bookInfo} />

      {/* Main content */}
      {paragraphs.map((item, index) => (
        <TextBlock
          key={index}
          paragraphRef={addToRefs}
          parsedParagraph={item.parsedText}
          htmlTag={item.htmlTag}
          isVisible={item.isVisible}
        >
          {item.baseText}
        </TextBlock>
      ))}
    </article>
  );
}

export default Article;
