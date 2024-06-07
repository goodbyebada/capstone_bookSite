/**
 * key Item
 * value List
 *
 * 이 List는 하나의 객체만 가지고 있다.
 * 이 List.length === 1
 *
 * List는 Data type의 한 객체를 가지고 있다.
 * 즉, Data 접근할거면
 *
 *
 * 서버에 Get 요청시,
 * { "item": []} []
 * 을 가져온다.
 *
 *
 * Ex) [ { "item": []} , { "item": []} , { "item": []} ]
 * 이 list가 서버에서 오는 값이다.
 *
 *
 * { "item": [{ 특징이 담긴 객체 }]} => Data
 * [ { "item": [{}]} , { "item": [{}]} , { "item": [{}]} ] => 최종 api Response
 * Api Response 는 Data[] 형식으로 온다.
 *
 *
 *
 * response는 배열이니까
 * ApiResponse : Data[]
 * ApiResponse[0].item[0] 0번째 책 정보
 * ApiResponse[1].item[0] 1번째 책 정보
 * 무조건 item[0] -> BookItem
 *
 */

/**
 *
 * @param apiResponse Data[] type의 response map으로 줘 하나의 Data
 * @param index index 번째, 순서
 * @returns  한 책의  BookItem
 */
export function returnSingleBookItem(apiResponse: Data[], index: number) {
  const singleBookItem: BookItem = apiResponse[index].item[0];
  return singleBookItem;
}

/**
 *
 * @param apiResponse Data[] type의 response map으로 줘 하나의 Data
 * @returns  item 객체를 담은 리스트  [  {title : "test", author : "seo "}, {item: { title : "hey", ```}}]
 */
export function returnBookList(apiResponse: Data[]) {
  const itemObjList = apiResponse.map((e) => e.item[0]);
  return itemObjList;
}

/**
 *
 * @param obj 객체
 * @returns 빈 객체라면 true
 */
export function isEmptyObj(obj: Object | null) {
  if (obj?.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}

export function serverBookToData(severBookList: serverBook[]): Data[] {
  const datalist: Data[] = severBookList.map((elem) => {
    const bookItem: BookItem = {
      id: elem.id ? elem.id : 0,
      title: elem.title ? elem.title : "",
      author: elem.author ? elem.author : "",
      publisher: elem.publisher ? elem.publisher : "",
      publish_year: elem.publishYear ? parseInt(elem.publishYear) : 0,
      class: elem.classCode ? parseInt(elem.classCode) : 0,
      isbn: elem.isbn ? elem.isbn : "",
      isbn13: elem.isbn13 ? elem.isbn13 : "",
      description: elem.description ? elem.description : "",
      categoryName: elem.categoryName ? elem.categoryName : "",
      subInfo: undefined,
      cover: elem.imgPath ? elem.imgPath : "",
    };

    const result: Data = {
      item: [bookItem],
    };
    return result;
  });

  return datalist;
}

export interface serverBook {
  id: number | null;
  title: string | null;
  author: string | null;
  publisher: string | null;
  publishYear: string | null;
  classCode: string | null;
  isbn: string | null;
  isbn13: string | null;
  description: string | null;
  imgPath: string | null;
  categoryName: string | null;
}

export interface checkformData {
  birthdateCheck: boolean;
  departmentCheck: boolean;
  patronCheck: boolean;
}
export interface inputData {
  gender: string;
  patron_type: number;
  birthdate: number;
  department: string;
}
/**
 * pubdate
 */
export interface BookItem {
  id?: number;
  title: string;
  author: string;
  publisher: string;
  publish_year: number;
  class: number;
  isbn: string;
  isbn13: string;
  description: string;
  categoryName: string;
  subInfo?: {
    subTitle: string;
    originalTitle: string;
    itemPage: number;
  };
  cover: string;

  //백엔드에서 보내는 데이터 확정

  pubDate?: string;
  link?: string;
  mallType?: string;
  categoryId?: number;
  adult?: boolean;
  fixedPrice?: boolean;
  seriesInfo?: any;
  categoryIdList?: {
    categoryId: number;
    categoryName: string;
  }[];
}

export interface Data {
  item: BookItem[];
}

interface SubInfo {
  subTitle: string;
  originalTitle: string;
  itemPage: number;
}

interface Category {
  categoryId: number;
  categoryName: string;
}

export interface reviewType {
  id: string | number;
  starRate: number;
  review: string;
}

export interface navItemType {
  idx: number;
  tagId: string;
  item: string;
  content: string | BookItem[];
  onClickBook: ((bookItem: BookItem) => void) | null;
}

export type loginFormType = {
  id: string | number;
  password: string;
  onSuccess: Function;
  onFail: Function;
};

// 알라딘 aPI 기준
export interface AladinBookInfo {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  mallType: string;
  stockStatus: string;
  mileage: number;
  cover: string;
  categoryId: number;
  categoryName: string;
  publisher: string;
  salesPoint: number;
  adult: boolean;
  fixedPrice: boolean;
  customerReviewRank: number;
  subInfo: Record<string, any>; // 특정 형식을 가지는 서브 정보의 형식이 없으므로 Record<string, any>으로 대체
}

//   알라딘 class 임시로 categoryId로 처리

export function aladinToData(aladinBookList: AladinBookInfo[]): Data[] {
  const datalist: Data[] = aladinBookList.map((elem) => {
    const bookItem: BookItem = {
      // id: 0,
      title: elem.title.split("-")[0] ? elem.title.split("-")[0] : "",
      author: elem.author ? elem.author : "",
      publisher: elem.publisher ? elem.publisher : "",
      publish_year: elem.pubDate ? parseInt(elem.pubDate.split("-")[0]) : 0,
      class: elem.categoryId ? elem.categoryId : 0,
      isbn: elem.isbn ? elem.isbn : "",
      isbn13: elem.isbn13 ? elem.isbn13 : "",
      description: elem.description ? elem.description : "",
      categoryName: elem.categoryName ? elem.categoryName : "",
      subInfo: undefined,
      cover: elem.cover ? elem.cover : "",
    };

    const result: Data = {
      item: [bookItem],
    };
    return result;
  });

  return datalist;
}
