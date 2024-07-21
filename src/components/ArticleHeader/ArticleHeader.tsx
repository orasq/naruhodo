import Image from "next/image";
import styles from "./ArticleHeader.module.scss";

export type BookInfo = {
  title: string;
  author: string;
  image: string;
  publishedYear?: string;
};

type ArticleHeaderProps = {
  bookInfo: BookInfo;
};

function ArticleHeader({
  bookInfo: { title, author, image, publishedYear },
}: ArticleHeaderProps) {
  return (
    <header className={styles["article-header"]}>
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

export default ArticleHeader;
