import { AladinBookInfo } from "@components/model/interfaceModel";
import BookList from "../bookList/page";
import BookListTemplate from "@components/component/BookListTemplate";
import { aladinToData } from "@components/model/interfaceModel";
import ShowBooks from "@components/containers/book/showBooks";

export default async function AladinBookList() {
  let dataList = await GetAladinData("교통");

  let serverData = aladinToData(dataList);
  //   알라딘 데이터 -> 서버 데이터로 바꾸는 로직

  return (
    <div>
      {/* <BookListTemplate dataList={serverData} /> */}
      <ShowBooks dataList={serverData} />
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
