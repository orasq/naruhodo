"use client";

import { FINISHED_BOOK_KEY } from "@/lib/utils/constants";
import { BookInfo } from "@/lib/utils/types";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";

type BookCardProps = {
  bookInfo: BookInfo;
};

const contentWrapperStyles = tv({
  base: "w-full",
  variants: {
    isFinished: {
      true: "opacity-50 grayscale",
    },
  },
});

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
      className="group/card motion-safe:transition-background motion-safe:transition-filter relative block rounded-xl p-2 duration-100 hover:bg-surface-light hover:shadow-sm"
    >
      {/* Book finished icon */}
      {isFinished && (
        <div className="absolute right-5 top-0 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background text-copy/50 group-hover/card:bg-surface-light">
          <IconCircleCheckFilled />
        </div>
      )}

      <div className={contentWrapperStyles({ isFinished })}>
        {/* Image */}
        <div className="relative aspect-[9/13]">
          <Image
            className="rounded-lg object-cover"
            src={`/images/covers/${bookInfo.image}`}
            alt={bookInfo.title}
            fill
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
