import Image from "next/image";
import styles from "./BookPageHeader.module.scss";

export type BookInfo = {
  title: string;
  author: string;
  image: string;
  publishedYear?: string;
};

type BookPageHeaderProps = {
  bookInfo: BookInfo;
};

function BookPageHeader({
  bookInfo: { title, author, image, publishedYear },
}: BookPageHeaderProps) {
  return (
    <header className={styles["book-page-header"]}>
      <Image
        src={`/images/covers/${image}`}
        alt={title}
        width="73"
        height="100"
      />

      <div>
        <h1>{title}</h1>
        {author && <p>Author: {author}</p>}
        {publishedYear && <p>Published in {publishedYear}</p>}
      </div>
    </header>
  );
}

export default BookPageHeader;
