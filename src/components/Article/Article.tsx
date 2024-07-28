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
import prefersReducedMotion from "@/lib/utils/prefersReducedMotion";

type ArticleProps = {
  bookInfo: BookInfo;
  articleParagraphs: string[];
};

export type ParagraphObject = {
  baseText: string;
  parsedText: KuromojiToken[];
  htmlTag: TextBlockTag;
  isVisible: boolean;
  isBookmarked: boolean;
};

function Article({ bookInfo, articleParagraphs }: ArticleProps) {
  const [paragraphs, setParagraphs] = useState<ParagraphObject[]>(() => {
    return articleParagraphs.map((text) => ({
      baseText: initializeBaseText(text)?.baseText,
      parsedText: [],
      htmlTag: initializeBaseText(text)?.htmlTag,
      isVisible: false,
      isBookmarked: false,
    }));
  });

  const { addToQueue, removeFromQueue, isInQueue, setVisibility } =
    useParseText(paragraphs, setParagraphs);

  // Create array of refs with page's paragraphs
  const textBlockRefs = useRef<HTMLParagraphElement[]>([]);
  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (!el || textBlockRefs?.current?.includes(el)) return;

    textBlockRefs?.current?.push(el);
  };

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

  /**
   * Bookmarked paragraph
   */
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
    <article id="articleContent" className={styles.article}>
      {/* Book info */}
      <ArticleHeader bookInfo={bookInfo} />

      {/* Main content */}
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
  );
}

export default Article;
