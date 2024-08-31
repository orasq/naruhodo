"use client";

import { useEffect, useState } from "react";
import { BookPageHeader } from "../BookPageHeader";
import { BookText } from "../BookText";
import { ToolBox } from "../ToolBox";
import useToggle from "@/hooks/useToggle";
import Cookies from "js-cookie";
import { BOOK_FONT_SIZE_COOKIE_VALUE } from "@/lib/utils/constants";
import { BookFontSize, BookInfo } from "@/lib/utils/types";

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
    <article className="relative mx-auto w-full max-w-[var(--text-max-width)] text-book-fs">
      {/* Book info */}
      <BookPageHeader bookInfo={bookInfo} />

      {/* Main text */}
      <BookText
        textParagraphs={paragraphs}
        isBookmarkModeActive={isBookmarkModeActive}
      />

      {/* Toolbox */}
      <div className="pointer-events-none fixed left-1/2 top-0 mx-auto h-full w-full max-w-toolbox-wrapper -translate-x-1/2">
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
