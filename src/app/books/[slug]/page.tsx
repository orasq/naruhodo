import BookPageHeader from "@/components/BookPageHeader/BookPageHeader";
import { BookText } from "@/components/BookText";
import { BookPage } from "@/components/BookPage";
import { allBooks } from "content-collections";
import { notFound } from "next/navigation";
import { BookFontSize } from "@/lib/utils/types";
import { cookies } from "next/headers";
import { BOOK_FONT_SIZE_COOKIE_VALUE } from "@/lib/utils/variants";

type BookProps = {
  params: {
    slug: string;
  };
};

const getBook = async (slug: string) => {
  return allBooks.find((book) => book._meta.path === slug);
};

export async function generateStaticParams() {
  return allBooks.map((book) => ({
    slug: book._meta.path,
  }));
}

async function Book({ params }: BookProps) {
  const book = await getBook(params.slug);

  if (!book) notFound();

  const bookInfo = {
    title: book.title,
    author: book.author,
    image: book.image,
    publishedYear: book.publishedYear,
  };

  const paragraphs = book.content
    .split("\n")
    .filter((paragraph) => paragraph.length > 0);

  const savedFontSize = cookies().get(BOOK_FONT_SIZE_COOKIE_VALUE);
  const initialFontSize = (savedFontSize?.value as BookFontSize) || "sm";

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
