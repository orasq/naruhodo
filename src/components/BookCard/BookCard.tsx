"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FINISHED_BOOK_KEY } from "@/lib/utils/constants";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { contentWrapperStyles } from "./BookCard.styles";
import type { BookInfo } from "@/lib/types/types";

type BookCardProps = {
  bookInfo: BookInfo;
};

function BookCard({ bookInfo }: BookCardProps) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const savedFinishedBook = localStorage.getItem(
      FINISHED_BOOK_KEY(bookInfo._meta?.path as string),
    );

    if (savedFinishedBook) setIsFinished(true);
  }, []);

  return (
    <Link
      href={`/books/${bookInfo._meta?.path}`}
      className="group/card motion-safe:transition-background motion-safe:transition-filter hover:bg-surface-light relative block rounded-xl p-2 duration-100 hover:shadow-xs"
    >
      {/* Book finished icon */}
      {isFinished && (
        <div className="bg-background text-copy/50 group-hover/card:bg-surface-light absolute top-0 right-5 z-10 flex h-6 w-6 items-center justify-center rounded-full">
          <IconCircleCheckFilled />
        </div>
      )}

      <div className={contentWrapperStyles({ isFinished })}>
        {/* Image */}
        <div className="relative aspect-9/13">
          <Image
            className="rounded-lg object-cover"
            src={`/images/covers/${bookInfo.image}`}
            alt={bookInfo.title}
            sizes="(max-width: 639px) 146px, 275px"
            fill
            quality="75"
          />
        </div>

        {/* Text */}
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold">{bookInfo.title}</h2>
          <p className="text-base font-medium opacity-75">{bookInfo.author}</p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
