import { allBooks } from "content-collections";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-center text-3xl">Book collection</h1>

      {/* Book list */}
      <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-5 xl:gap-3">
        {allBooks.map((book) => (
          <li key={book._meta.path}>
            <Link
              href={`/books/${book._meta.path}`}
              className="motion-safe:transition-background block rounded-xl p-2 duration-100 hover:bg-surface-light hover:shadow-sm"
            >
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
              <div className="px-2 py-4">
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-base font-medium opacity-75">
                  {book.author}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
