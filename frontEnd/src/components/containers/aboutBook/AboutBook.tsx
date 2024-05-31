"use client";
import {
  BookItem,
  serverBook,
  serverBookToData,
} from "@components/model/interfaceModel";
import { useEffect, useState } from "react";
import DetailContent from "./DetailContent";
import { returnBookList } from "@components/model/interfaceModel";
import { dummyRecommandDataList } from "@data/dummyRecommandData";
import BookBasicInfo from "../book/BookBasicInfo";
import { Api2Url, useDummy } from "@data/const";
import { dummyData } from "@data/dummyData";
import { Data } from "@components/model/interfaceModel";

/**
 *
 * @param param0 SingleBook 정보를 담고 있는 BookItem
 * @returns
 */
export default function AboutBook({
  bookData,
  changeBook,
}: {
  bookData: BookItem;
  changeBook: (bookItem: BookItem) => void;
}) {
  useEffect(() => {
    if (useDummy) {
      const bookData = dummyData;
      const convertedDataList: Data[] = serverBookToData(bookData);
      const bookItemLsit: BookItem[] = returnBookList(convertedDataList);
      setRecommandBookList(bookItemLsit);
      // console.log("새로 호출ㄴ");
    } else {
      let bookId = bookData.id;
      if (bookId === null) {
        bookId = 0;
      }
      fetch(Api2Url + "?" + `id=${bookId}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const serverBookList: serverBook[] = res;
          const dataList = serverBookToData(serverBookList);
          return returnBookList(dataList);
        })
        .then((dataList: BookItem[]) => {
          setRecommandBookList(dataList);
        })
        .catch((e) => {
          console.log("서버에서 내려주는 데이터 형식 확인 필요");
        });
    }
  }, [bookData]);

  // const testDataList = returnBookList(dummyRecommandDataList);
  const [recommandBookList, setRecommandBookList] = useState<BookItem[]>();

  // 현재 dummyData id 없어서 isbn으로 대체해 진행
  const [id, setId] = useState();

  /**
   * 모델 2로 API 호출
   */

  // 책을 선택하면 recommandBookList를 선택하면 setId()
  // 1. title, author, publisher , cover 기본정보 수정
  // recommandBookList에서 id 찾아 기본 Info 구성하면 될 것 같소
  // 2. bookList 설정
  // useEffect로 재호출해 setRecommandBookList 구성

  // Book Id가 바뀔때마다 API 재호출 및 재렌더링
  // 처음 호출 시 bookList로 세팅
  // bookList 중 하나의 책을 선택하면 title, author, publisher 등 전부 다 바뀜
  // AboutBook 컴포넌트 모든 내용 수정

  return (
    // <div className="about_book">
    <div>
      {/*학교 데이터에서 제공되는 정보만 정렬함 */}
      <BookBasicInfo bookData={bookData} />

      {
        /* 책 상세정보  */
        recommandBookList ? (
          <DetailContent
            bookData={bookData}
            recommandBookList={recommandBookList}
            changeBook={changeBook}
          />
        ) : (
          <div>"추천 도서 로딩중입니다"</div>
        )
      }
    </div>
  );
}
