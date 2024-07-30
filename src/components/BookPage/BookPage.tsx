"use client";

import { useEffect, useState } from "react";
import { BookPageHeader } from "../BookPageHeader";
import { BookInfo } from "../BookPageHeader/BookPageHeader";
import { BookText } from "../BookText";
import { ToolBox } from "../ToolBox";
import styles from "./BookPage.module.scss";
import useToggle from "@/hooks/useToggle";

type BookPageProps = {
  bookInfo: BookInfo;
  paragraphs: string[];
};

export type BookFontSize = "sm" | "md" | "lg";

function BookPage({ bookInfo, paragraphs }: BookPageProps) {
  const [isBookmarkModeActive, setIsBookmarkModeActive] = useToggle();
  const [fontSize, setFontSize] = useState<BookFontSize>(() => {
    return (localStorage.getItem("bookFontSize") as BookFontSize) || "sm";
  });

  function toggleFontSize() {
    if (fontSize === "sm") setFontSize("md");
    else if (fontSize === "md") setFontSize("lg");
    else setFontSize("sm");
  }

  useEffect(() => {
    const fontSizeValues = {
      sm: "1rem",
      md: "1.25rem",
      lg: "1.5rem",
    };

    document.documentElement.style.setProperty(
      "--book-font-size",
      fontSizeValues[fontSize]
    );

    localStorage.setItem("bookFontSize", fontSize);
  }, [fontSize]);

  return (
    <article className={styles["book-page"]}>
      {/* Book info */}
      <BookPageHeader bookInfo={bookInfo} />

      {/* Main text */}
      <BookText
        textParagraphs={paragraphs}
        isBookmarkModeActive={isBookmarkModeActive}
      />

      {/* Toolbox */}
      <div className={styles["toolbox-wrapper"]}>
        <ToolBox
          toggleFontSize={toggleFontSize}
          toggleBookmarkMode={setIsBookmarkModeActive}
          isBookmarkModeActive={isBookmarkModeActive}
        />
      </div>
    </article>
  );
}

export default BookPage;
