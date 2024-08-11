"use client";

import { useEffect, useState } from "react";
import { BookPageHeader } from "../BookPageHeader";
import { BookInfo } from "../BookPageHeader/BookPageHeader";
import { BookText } from "../BookText";
import { ToolBox } from "../ToolBox";
import styles from "./BookPage.module.scss";
import useToggle from "@/hooks/useToggle";
import { cookies } from "next/headers";
import Cookies from "js-cookie";
import { BOOK_FONT_SIZE_COOKIE_VALUE } from "@/lib/utils/variants";
import { BookFontSize } from "@/lib/utils/types";

type BookPageProps = {
  bookInfo: BookInfo;
  paragraphs: string[];
  initialFontSize: BookFontSize;
};

function BookPage({ bookInfo, paragraphs, initialFontSize }: BookPageProps) {
  const [isBookmarkModeActive, setIsBookmarkModeActive] = useToggle();
  const [fontSize, setFontSize] = useState<BookFontSize>(initialFontSize);

  function toggleFontSize() {
    if (fontSize === "sm") setFontSize("md");
    else if (fontSize === "md") setFontSize("lg");
    else setFontSize("sm");
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", fontSize);

    Cookies.set(BOOK_FONT_SIZE_COOKIE_VALUE, fontSize, { expires: 365 });
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
