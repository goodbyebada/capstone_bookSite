import { Data, serverBook } from "@components/model/interfaceModel";
import { serverBookToData } from "@components/model/interfaceModel";
import { useDummy } from "@data/const";
import { dummyData } from "@data/dummyData";

const callBookListApi = async (
  APiUrl: string,
  params: string
): Promise<Data[]> => {
  //DummyData
  if (useDummy) {
    const bookData = dummyData;
    const convertedDataList: Data[] = serverBookToData(bookData);
    return convertedDataList;
  }

  const finalUrl = `${APiUrl}?${params}`;

  try {
    let response = await fetch(finalUrl);
    if (!response.ok) {
      alert("입력받은 정보는 대출내역이 부족합니다 :(");
      return [];
    }

    let bookData: serverBook[] = await response.json();
    const convertedDataList: Data[] = serverBookToData(bookData);
    return convertedDataList;
  } catch {
    alert("입력받은 정보는 대출내역이 부족합니다 :(");
    return [];
  }
};

export default callBookListApi;
