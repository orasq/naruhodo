import { Article } from "@/components/Article";
import { allBooks } from "content-collections";
import { notFound } from "next/navigation";

type BookProps = {
  params: {
    slug: string;
  };
};

const getBook = async (slug: string) => {
  return allBooks.find((book) => book._meta.path === slug);
};

async function Book({ params }: BookProps) {
  const book = await getBook(params.slug);

  if (!book) notFound();

  const paragraphs = book.content
    .split("\n")
    .filter((paragraph) => paragraph.length > 0);

  return (
    <>
      <Article articleParagraphs={paragraphs} />
    </>
  );
}

export default Book;
