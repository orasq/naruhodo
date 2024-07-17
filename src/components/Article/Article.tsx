"use client";

import { TextBlock } from "@/components/TextBlock";
import useParseText from "@/hooks/useParseText";
import { KuromojiToken } from "kuromojin";
import { useEffect, useRef, useState } from "react";

type ArticleProps = {
  articleParagraphs: string[];
};

export type ParsedParagraph = {
  baseText: string;
  parsedText: KuromojiToken[];
  isVisible: boolean;
};

function Article({ articleParagraphs }: ArticleProps) {
  const [paragraphs, setParagraphs] = useState<ParsedParagraph[]>(() => {
    return articleParagraphs.map((text) => ({
      baseText: text,
      parsedText: [],
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
    console.log({ updatedParagraphs });

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

        // change visibility, then skip
        if (!entry.isIntersecting && isSetVisible) {
          setVisibility(index, false);
          return;
        }

        // remove item from queue
        if (!entry.isIntersecting && !isSetVisible) {
          if (isInQueue(index)) removeFromQueue(index);
          return;
        }

        // add item to queue
        addToQueue(index);
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
    <article>
      {paragraphs.map((item, index) => (
        <TextBlock
          key={index}
          paragraphRef={addToRefs}
          isVisible={item.isVisible}
          parsedParagraph={item.parsedText}
        >
          {item.baseText}
        </TextBlock>
      ))}
    </article>
  );
}

export default Article;
