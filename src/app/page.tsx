import { allBooks } from "content-collections";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-center text-3xl">Book collection</h1>

      {/* Book list */}
      <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 xl:grid-cols-6 xl:gap-8">
        {allBooks.map((book) => (
          <li key={book._meta.path}>
            <Link href={`/books/${book._meta.path}`}>
              {/* Image */}
              <div className="relative aspect-[9/13]">
                <Image
                  className="rounded-lg object-cover"
                  src={`/images/covers/${book.image}`}
                  alt={book.title}
                  fill
                />
              </div>

              {/* Title */}
              <h2 className="px-2 py-4 text-center text-base font-medium">
                {book.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
