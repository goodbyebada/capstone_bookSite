"use client";

import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Data, serverBook } from "@components/model/interfaceModel";
import BookListTamplate from "@components/component/BookListTemplate";
import LoadingComponent from "@components/component/LoadingComponent";
import { serverBookToData } from "@components/model/interfaceModel";
import { Api1Url, useDummy } from "@data/const";
import { dummyData } from "@data/dummyData";

// const dummyApiUrl = `https://bc87b101-4a86-4419-a9e4-2648ec0bde58.mock.pstmn.io/getBookInfo`;
// const apiURL = "https://www.aladin.co.kr/ttb/api";
// const local = `http://localhost:3000/bookList`;

const BookList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [datalist, setData] = useState<Data[]>([]);

  /**
   * 처음 렌더링될때 한번만 API 호출를 호출한다.
   */
  useEffect(() => {
    const params = decodeURI(`${searchParams}`);

    if (useDummy) {
      const bookData = dummyData;
      const convertedDataList: Data[] = serverBookToData(bookData);
      setData(convertedDataList);
      return;
    }

    const finalUrl = `${Api1Url}?${params}`;
    console.log(finalUrl);
    fetch(finalUrl)
      .then((response) => {
        return response.json(); // JSON 데이터를 반환하는 프로미스
      })
      .then((bookData: serverBook[]) => {
        console.log(bookData); // JSON 데이터를 로깅
        const convertedDataList: Data[] = serverBookToData(bookData);
        setData(convertedDataList);
      })
      .catch((error) => {
        console.log("들어오는 데이터 형식 맞지 않음");
        console.log("서버 출력 데이터 수정 필요");
        console.log(error);
      });
  }, []);

  return (
    <div>
      {datalist[0] ? (
        <BookListTamplate dataList={datalist} />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default BookList;
