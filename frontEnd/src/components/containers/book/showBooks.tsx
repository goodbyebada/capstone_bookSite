"use client";

import Book from "./book";
import styles from "@styles/book.module.css";
import { useState, useRef, useEffect, use } from "react";
import { BookItem, Data } from "@components/model/interfaceModel";
import { isEmptyObj } from "@components/model/interfaceModel";
import AboutBookTemplate from "@components/component/AboutBookTemplate";
import { returnBookList } from "@components/model/interfaceModel";
/**
 *
 * @param param0
 * @returns BOOKLIST PAGE화면을 보여줍니다.
 */

export default function ShowBooks({ dataList }: { dataList: Data[] }) {
  /**
   * 모달 기능
   */
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const clickBook = (bookItem: BookItem) => {
    if (isEmptyObj(bookItem)) {
      return;
    }
    setSelectedBook(bookItem);
  };

  const closeAboutBook = () => {
    setSelectedBook(null);
  };

  return (
    <>
      {selectedBook ? (
        <AboutBookTemplate
          selectedBook={selectedBook}
          clickEvent={closeAboutBook}
        />
      ) : (
        <div className={styles.book_recommand_list}>
          <h3 className="d-flex p-5 justify-content-center">추천합니다!</h3>
          <div className={styles.show_book_list_container}>
            <div className={styles.show_book_list}>
              {returnBookList(dataList).map((data, idx) => (
                <Book
                  key={idx}
                  bookInfo={data}
                  clickEvent={(bookItem: BookItem) => clickBook(bookItem)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
