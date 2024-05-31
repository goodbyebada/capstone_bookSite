//  bookList/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Data, serverBook } from "@components/model/interfaceModel";
import LoadingComponent from "@components/component/LoadingComponent";
import { serverBookToData } from "@components/model/interfaceModel";
import { useDummy } from "@data/const";
import { dummyData } from "@data/dummyData";
import BookListTemplate from "@components/component/BookListTemplate";

import { localApiUrl } from "@data/const";
// @data/const 파일에서 한번에 url 수정가능

const requestBaseUrl = localApiUrl;

const BookList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [datalist, setData] = useState<Data[]>([]);
  const [rawData, setRawData] = useState<serverBook[]>([]); // 원본 데이터를 저장할 상태 추가

  /**
   * 처음 렌더링될때 한번만 API 호출를 호출한다.
   */
  // useEffect(() => {
  //   const gender = searchParams.get("gender") || "defaultGender";
  //   const patronType = searchParams.get("patron_type") || "0";  // patron_type 기본값 "0"
  //   const birthdate = searchParams.get("birthdate") || "defaultBirthdate";
  //   const department = searchParams.get("department") || "defaultDepartment";
  //
  //   // 로그를 추가하여 매개변수 값 확인
  //   console.log("gender:", gender);
  //   console.log("patron_type:", patronType);
  //   console.log("birthdate:", birthdate);
  //   console.log("department:", department);
  //
  //   const params = new URLSearchParams({
  //     gender,
  //     patron_type: patronType,
  //     birthdate,
  //     department,
  //   });
  //
  //   if (useDummy) {
  //     const bookData = dummyData;
  //     const convertedDataList: Data[] = serverBookToData(bookData);
  //     setData(convertedDataList);
  //     return;
  //   }
  //
  //   fetch(`${requestBaseUrl}?${params.toString()}`)  // 수정된 부분
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //       })
  //       .then((bookData: serverBook[]) => {
  //         console.log(bookData); // JSON 데이터를 로깅
  //         const convertedDataList: Data[] = serverBookToData(bookData);
  //         setData(convertedDataList);
  //       })
  //       .catch((error) => {
  //         console.log("들어오는 데이터 형식 맞지 않음");
  //         console.log("서버 출력 데이터 수정 필요");
  //         console.log(error);
  //       });
  // }, [searchParams]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const gender = searchParams.get("gender") || "defaultGender";
  //     const patronType = searchParams.get("patron_type") || "0";  // patron_type 기본값 "0"
  //     const birthdate = searchParams.get("birthdate") || "defaultBirthdate";
  //     const department = searchParams.get("department") || "defaultDepartment";
  //
  //     // 로그를 추가하여 매개변수 값 확인
  //     console.log("gender:", gender);
  //     console.log("patron_type:", patronType);
  //     console.log("birthdate:", birthdate);
  //     console.log("department:", department);
  //
  //     const params = new URLSearchParams({
  //       gender,
  //       patron_type: patronType,
  //       birthdate,
  //       department,
  //     });
  //
  //     if (useDummy) {
  //       const bookData = dummyData;
  //       const convertedDataList: Data[] = serverBookToData(bookData);
  //       setData(convertedDataList);
  //       return;
  //     }
  //
  //     try {
  //       const response = await fetch(`${requestBaseUrl}?${params.toString()}`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const bookData: serverBook[] = await response.json();
  //       console.log(bookData); // JSON 데이터를 로깅
  //       const convertedDataList: Data[] = serverBookToData(bookData);
  //       setData(convertedDataList);
  //     } catch (error) {
  //       console.log("들어오는 데이터 형식 맞지 않음");
  //       console.log("서버 출력 데이터 수정 필요");
  //       console.log(error);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);  // 빈 배열을 의존성 배열로 전달하여 한 번만 실행되도록 설정

  useEffect(() => {
    const fetchData = async () => {
      const gender = searchParams.get("gender") || "defaultGender";
      const patronType = searchParams.get("patron_type") || "0"; // patron_type 기본값 "0"
      const birthdate = searchParams.get("birthdate") || "defaultBirthdate";
      const department = searchParams.get("department") || "defaultDepartment";

      // 로그를 추가하여 매개변수 값 확인
      console.log("gender:", gender);
      console.log("patron_type:", patronType);
      console.log("birthdate:", birthdate);
      console.log("department:", department);

      const params = new URLSearchParams({
        gender,
        patron_type: patronType,
        birthdate,
        department,
      });

      if (useDummy) {
        const bookData = dummyData;
        const convertedDataList: Data[] = serverBookToData(bookData);
        setData(convertedDataList);
        return;
      }

      try {
        const response = await fetch(`${requestBaseUrl}?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const bookData: serverBook[] = await response.json();
        console.log("Received bookData:", bookData); // JSON 데이터를 로깅
        const convertedDataList: Data[] = serverBookToData(bookData);
        console.log("Converted Data List:", convertedDataList); // 변환된 데이터 로깅
        setData(convertedDataList);
      } catch (error) {
        console.log("들어오는 데이터 형식 맞지 않음");
        console.log("서버 출력 데이터 수정 필요");
        console.log(error);
      }
    };

    fetchData();
  }, [searchParams]);

  //   return (
  //       <div>
  //         {datalist[0] ? (
  //             <BookListTamplate dataList={datalist} />
  //         ) : (
  //             <LoadingComponent />
  //         )}
  //       </div>
  //   );
  // };

  return (
    <div>
      {rawData.length > 0 ? ( // 데이터를 수신했는지 확인
        <>
          <BookListTemplate dataList={datalist} />
          <pre>{JSON.stringify(rawData, null, 2)}</pre>{" "}
          {/* 원본 데이터를 JSON 형식으로 출력 */}
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default BookList;
