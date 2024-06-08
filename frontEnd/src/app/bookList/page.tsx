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
import getAladinData from "@components/utils/GetAladinData";
import { useAladin } from "@data/const";
import callBookListApi from "@components/utils/callBookListApi";

const BookList = () => {
  const searchParams = useSearchParams();
  const [datalist, setData] = useState<Data[]>([]);
  const [isData, setIsData] = useState<boolean>(true);

  /**
   * 처음 렌더링될때 한번만 API 호출를 호출한다.
   */
  useEffect(() => {
    const params = decodeURI(`${searchParams}`);
    console.log(params);

    // 임시 알라딘 호출 함수
    if (useAladin) {
      getAladinData("교통").then((covertedList) => {
        setData(covertedList);
      });
      return;
    }

    //도서 호출 함수
    callBookListApi(Api1Url, params).then((covertedList) => {
      setData(covertedList);
    });
  }, []);

  // 데이터의 유무에 따라 로딩컴포넌트를 띄울지, 404 화면을 띄울지 결정ㅎ
  useEffect(() => {
    datalist.length === 0 ? setIsData(false) : setIsData(true);
  }, [datalist]);

  return (
    <div>
      {datalist[0] ? (
        <ShowBooks dataList={datalist} />
      ) : (
        <LoadingComponent isData={isData} />
      )}
    </div>
  );
};

export default BookList;
