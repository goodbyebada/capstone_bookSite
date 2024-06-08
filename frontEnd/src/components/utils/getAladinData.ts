import { AladinBookInfo } from "@components/model/interfaceModel";
import { aladinToData } from "@components/model/interfaceModel";
import { Data } from "@components/model/interfaceModel";

async function getAladinData(QueryGenre: string): Promise<Data[]> {
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
  let serverData = aladinToData(dataList);

  return serverData;
}

export default getAladinData;
