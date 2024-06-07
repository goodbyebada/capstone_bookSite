"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Data, serverBook } from "@components/model/interfaceModel";
import BookListTemplate from "@components/component/BookListTemplate";
import LoadingComponent from "@components/component/LoadingComponent";
import { serverBookToData } from "@components/model/interfaceModel";
import { Api1Url, useDummy } from "@data/const";
import { dummyData } from "@data/dummyData";
import ShowBooks from "@components/containers/book/showBooks";

// const dummyApiUrl = `https://bc87b101-4a86-4419-a9e4-2648ec0bde58.mock.pstmn.io/getBookInfo`;
// const apiURL = "https://www.aladin.co.kr/ttb/api";
// const local = `http://localhost:3000/bookList`;

const BookList = () => {
  const searchParams = useSearchParams();

  const [datalist, setData] = useState<Data[]>([]);
  const [isData, setIsData] = useState<boolean>(true);

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
        if (!response.ok) {
          alert("입력받은 정보는 대출내역이 부족합니다 :(");

          setIsData(false);
          return [];
        }
        const json = response.json();
        alert("입력받은 정보는 대출내역이 부족합니다 :(");
        console.log("api로 들어온 res json으로 변환");
        // console.log(`${json}`);
        setIsData(false);
        return json; // JSON 데이터를 반환하는 프로미스
      })
      .then((bookData: serverBook[]) => {
        console.log(bookData); // JSON 데이터를 로깅
        const convertedDataList: Data[] = serverBookToData(bookData);
        setData(convertedDataList);
      })
      .catch((error) => {
        console.log("인터페이스 변환 실패, json로그와 함께 카톡주세요");
        alert("입력받은 정보는 대출내역이 부족합니다 :(");
        setIsData(false);
        console.log(error);
      });
  }, []);

  return (
    <div>
      {datalist[0] ? (
        // <BookListTemplate dataList={datalist} />
        <ShowBooks dataList={datalist} />
      ) : (
        <LoadingComponent isData={isData} />
      )}
    </div>
  );
};

export default BookList;
