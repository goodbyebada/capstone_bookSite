"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Data, serverBook } from "@components/model/interfaceModel";
import LoadingComponent from "@components/component/LoadingComponent";
import ShowBooks from "@components/containers/book/showBooks";
import { aladinToData } from "@components/model/interfaceModel";
import { useAladin } from "@data/const";
import callBookListApi from "@components/utils/callBookListApi";
import { Api1Url } from "@data/const";

function Search() {
  const searchParams = useSearchParams();

  return <input placeholder="Search..." />;
}

export default function BookList() {
  const searchParams = useSearchParams();
  const params = decodeURI(`${searchParams}`);

  const [datalist, setData] = useState<Data[]>([]);
  const [isFetched, setIsFecthed] = useState<boolean>(false);

  /**
   * 처음 렌더링될때 한번만 API 호출를 호출한다.
   */
  useEffect(() => {
    // 임시 알라딘 호출 함수

    if (useAladin) {
      fetch("/api?" + params)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((e) => {
          console.log(e);
          let convertedList = aladinToData(e);
          console.log(convertedList);
          setData(convertedList);
          setIsFecthed(true);
        });

      return;
    }

    //도서 호출 함수
    callBookListApi(Api1Url, params).then((covertedList) => {
      setData(covertedList);
    });
  }, []);

  return (
    <div>
      {datalist.length > 0 ? (
        <ShowBooks dataList={datalist} />
      ) : (
        // 데이터 리스트가 빈 경우 -> 로딩 또는 에러
        <LoadingComponent isFecthed={isFetched} />
      )}
    </div>
  );
}
