import { BookInfo } from "@/lib/types/types";
import Image from "next/image";

type BookPageHeaderProps = {
  bookInfo: BookInfo;
};

function BookPageHeader({
  bookInfo: { title, author, image, publishedYear, synopsis },
}: BookPageHeaderProps) {
  return (
    <header className="mb-28 flex flex-col items-center gap-8 md:flex-row md:items-start">
      <div className="relative h-72 w-52 shrink-0">
        <Image
          className="rounded-lg object-cover"
          src={`/images/covers/${image}`}
          alt={title}
          fill
          sizes="208px"
          quality="75"
          priority
        />
      </div>

      <div className="max-w-96 py-4 text-center text-base md:max-w-full md:text-left">
        <h1 className="mb-4 text-3xl font-semibold">{title}</h1>

        {author && <p>By {author}</p>}

        {publishedYear && <p>Published in {publishedYear}</p>}

        {synopsis && (
          <p className="relative mt-5 border-t-1 border-dotted border-copy/20 pt-5 text-sm italic">
            {synopsis}
          </p>
        )}
      </div>
    </header>
  );
}

export default BookPageHeader;
