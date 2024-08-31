import { BookInfo } from "@/lib/utils/types";
import Image from "next/image";
import Link from "next/link";

type BookCardProps = {
  bookInfo: BookInfo;
};

function BookCard({ bookInfo }: BookCardProps) {
  return (
    <Link
      href={`/books/${bookInfo._meta?.path}`}
      className="motion-safe:transition-background block rounded-xl p-2 duration-100 hover:bg-surface-light hover:shadow-sm"
    >
      {/* Image */}
      <div className="relative aspect-[9/13]">
        <Image
          className="rounded-lg object-cover"
          src={`/images/covers/${bookInfo.image}`}
          alt={bookInfo.title}
          fill
        />
      </div>

      {/* Title */}
      <div className="px-2 py-4">
        <h2 className="text-lg font-semibold">{bookInfo.title}</h2>
        <p className="text-base font-medium opacity-75">{bookInfo.author}</p>
      </div>
    </Link>
  );
}

export default BookCard;
