"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Data, serverBook } from "@components/model/interfaceModel";
import LoadingComponent from "@components/component/LoadingComponent";
import { Api1Url, useDummy } from "@data/const";
import ShowBooks from "@components/containers/book/showBooks";
import { useAladin } from "@data/const";
import getAladinData from "@components/utils/GetAladinData";
import callBookListApi from "@components/utils/callBookListApi";

import { AladinBookInfo } from "@components/model/interfaceModel";
import { aladinToData } from "@components/model/interfaceModel";

// const dummyApiUrl = `https://bc87b101-4a86-4419-a9e4-2648ec0bde58.mock.pstmn.io/getBookInfo`;
// const apiURL = "https://www.aladin.co.kr/ttb/api";
// const local = `http://localhost:3000/bookList`;

export default function BookList() {
  const searchParams = useSearchParams();
  const params = decodeURI(`${searchParams}`);

  // const [datalist, setData] = useState<Data[]>([]);
  // const [isData, setIsData] = useState<boolean>(true);

  let isData = true;
  let datalist: Data[] = [];

  if (useAladin) {
    getAladinData("교통").then((covertedList) => {
      // setData(covertedList);
      datalist = covertedList;
    });
  } else {
    //도서 호출 함수
    callBookListApi(Api1Url, params).then((covertedList) => {
      // setData(covertedList);
      datalist = covertedList;
    });
  }

  datalist.length === 0 ? (isData = false) : (isData = true);

  /**
   * 처음 렌더링될때 한번만 API 호출를 호출한다.
   */
  // useEffect(() => {
  //   // 임시 알라딘 호출 함수
  //   if (useAladin) {
  //     getAladinData("교통").then((covertedList) => {
  //       setData(covertedList);
  //     });
  //     return;
  //   }

  //   //도서 호출 함수
  //   callBookListApi(Api1Url, params).then((covertedList) => {
  //     setData(covertedList);
  //   });
  // }, []);

  // 데이터의 유무에 따라 로딩컴포넌트를 띄울지, 404 화면을 띄울지 결정
  // useEffect(() => {
  //   datalist.length === 0 ? setIsData(false) : setIsData(true);
  // }, [datalist]);

  return (
    <div>
      {datalist[0] ? (
        <ShowBooks dataList={datalist} />
      ) : (
        <LoadingComponent isData={isData} />
      )}
    </div>
  );
}

async function GetAladinData(QueryGenre: string) {
  const apiURL = "https://www.aladin.co.kr/ttb/api/";
  const TTBKey = `ttbds05199k1053001`;

  const restUrl =
    `ItemSearch.aspx?` +
    `ttbkey=${TTBKey}` +
    `&Query=${QueryGenre}` +
    `&QueryType=Title` +
    `&Cover=Big` +
    `&MaxResults=20&Id&output=js&Version=20131101`;

  let dataPromise = await (await fetch(apiURL + restUrl)).json();
  let dataList: AladinBookInfo[] = (await dataPromise).item;

  return dataList;
}
