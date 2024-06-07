import { Data } from "@components/model/interfaceModel";
import ShowBooks from "@components/containers/book/showBooks";
import { aladinToData } from "@components/model/interfaceModel";
import { AladinBookInfo } from "@components/model/interfaceModel";

/**
 * 서버 컴포넌트에서 showBooks 컴포넌트 사용하기 위해서
 * @param param0
 * @returns
 */
export default function BookListTemplate({ dataList }: { dataList: Data[] }) {
  // let dataListTest = GetAladinData("교통").then((res) => console.log(res[0]));
  // console.log(dataListTest);

  // let serverData = aladinToData(dataListTest);
  return <>{/* <ShowBooks dataList={dataList} /> */}</>;
}
