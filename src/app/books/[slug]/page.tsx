import { BookPage } from "@/components/BookPage";
import { allBooks } from "content-collections";
import { notFound } from "next/navigation";
import { BookFontSize } from "@/lib/types/types";
import { cookies } from "next/headers";
import { BOOK_FONT_SIZE_COOKIE_VALUE } from "@/lib/utils/constants";
import { cache } from "react";

type BookProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getBook = cache(async (slug: string) => {
  return allBooks.find((book) => book._meta.path === slug);
});

export async function generateMetadata(props: BookProps) {
  const params = await props.params;
  const book = await getBook(params.slug);

  return {
    title: book?.title,
  };
}

export async function generateStaticParams() {
  return allBooks.map((book) => ({
    slug: book._meta.path,
  }));
}

async function Book(props: BookProps) {
  const params = await props.params;
  const book = await getBook(params.slug);

  if (!book) notFound();

  const bookInfo = {
    title: book.title,
    author: book.author,
    image: book.image,
    publishedYear: book.publishedYear,
    synopsis: book.synopsis,
  };

  const paragraphs = book.content
    .split("\n")
    .filter((paragraph) => paragraph.length > 0);

  const cookieStore = await cookies();

  const savedFontSize = cookieStore.get(BOOK_FONT_SIZE_COOKIE_VALUE);
  const initialFontSize = (savedFontSize?.value as BookFontSize) || "md";

  return (
    <>
      <BookPage
        bookInfo={bookInfo}
        paragraphs={paragraphs}
        initialFontSize={initialFontSize}
      />
    </>
  );
}

export default Book;
