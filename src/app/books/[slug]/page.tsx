import { Article } from "@/components/Article";
import { ArticleHeader } from "@/components/ArticleHeader";
import { TextPage } from "@/components/TextPage";
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

  return (
    <>
      <TextPage>
        {/* Book info */}
        <ArticleHeader bookInfo={bookInfo} />

        {/* Main content */}
        <Article articleParagraphs={paragraphs} />
      </TextPage>
    </>
  );
}

export default Book;
