"use client";

import { BookItem } from "@components/model/interfaceModel";
import styles from "@styles/aboutBook.module.css";
import noImage from "@public/images/noImage.png";

export default function BookBasicInfo({ bookData }: { bookData: BookItem }) {
  const { title, author, publisher, cover, publish_year } = bookData;

  const authors = author.split(",");

  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = noImage.src;
  };

  return (
    <div className={styles.top_component}>
      <div id="book_cover" className={styles.book_image}>
        <img src={cover} alt="책 표지" onError={onErrorImg} />
      </div>
      <div className={styles.basic_info_detail}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.author}>
          {" "}
          저자:{" "}
          {authors.length === 0
            ? "저자에 대한 정보가 없습니다."
            : authors.map((elem, idx) => {
                if (authors.length === 1) {
                  return elem;
                }

                if (idx === authors.length - 1) {
                  console.log(idx);
                  return elem;
                }
                const singleAuthor = `${elem} · `;
                return singleAuthor;
              })}
        </h2>
        <h3 className={styles.publisher}>
          {publisher} · {publish_year}
        </h3>
      </div>
    </div>
  );
}
