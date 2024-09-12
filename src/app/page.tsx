import { BookCard } from "@/components/BookCard";
import { allBooks } from "content-collections";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Book list */}
      <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-5 xl:gap-3">
        {allBooks.map((book) => (
          <li key={book._meta.path}>
            <BookCard bookInfo={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}
