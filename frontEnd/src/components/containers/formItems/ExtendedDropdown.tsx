"use client";

import { useEffect, useState } from "react";
import { checkformData } from "@components/model/interfaceModel";

// 1. 년도 드롭다운 ~ 1950 ~ 2005까지  55년치
// 년도 배열 string 배열로 해서 부모 컴포넌트에서 전달할때 number로 바꾸자
// input 태그 처음 눌렀을시 처음은 모든 항목을 보여준다.
// 그냥 키보드로 쳤을시 배열에 있는 항목과 같음을 체크한다

// 배열에 없는 값을 입력하면 에러 처리한다.
// 빈 값이라면 에러 처리를 한다.

export const startYear = 1950;
export const endYear = 2005;
const yearsArray = Array.from({ length: endYear - startYear + 1 }, (_, index) =>
  (startYear + index).toString()
);

export default function ExtendedDropdown({
  onChange,
  checkComponent,
}: {
  onChange: (value: number) => void;
  checkComponent: checkformData;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [matchedItems, setmatchedItems] = useState<string[]>([]);
  const [check, setCheck] = useState<boolean>(true);
  const [alertSetence, setAlertSentence] = useState("");

  const { birthdateCheck } = checkComponent;

  useEffect(() => {
    setCheck(birthdateCheck);
    console.log("부모컴포넌트에서의 전달값이 변경");
    alertSetence === "" ? setAlertSentence("연도를 다시 확인해주세요!") : "";
  }, [birthdateCheck]);

  const alertChecktoValidValue = () => {
    const input = document.querySelector("input");
    if (!check) {
      input?.classList.add("invalid");
    } else {
      if (input?.classList.contains("invalid"))
        input?.classList.remove("invalid");
    }
  };

  useEffect(alertChecktoValidValue, [check]);

  // 부모컴포넌트에서 전달하는 bool값에 변화가 생길때마다 check값을 바꾸낟.

  /**
   *  부모 컴포넌트( 폼 컴포넌트)에 값을 전달해 객체의 값을 변경한다.
   *
   * @param selecteditem inputvalue,  input값에 렌더링될 값이다.
   */
  const submitValueToParentComponent = (selecteditem: string) => {
    const yearItem = parseInt(selecteditem);
    onChange(yearItem);
  };

  /**엔터시 자동완성되는 함수이다. */
  const autoCompletion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //  하나밖에 없을 시 자동완성
    if (matchedItems.length == 1) {
      let matchedYear = matchedItems[0];
      handleitemClick(matchedYear);
      return;
    }
  };

  //디바운싱
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timer);
      }; //value 변경 시점에 clearTimeout을 해줘야함.
    }, [value]);

    return debouncedValue;
  };

  /**
   * input값이 렌더링될때마다 호출되는 함수이다.
   * 1. 올바른 조건인지 체크해 check의 값을 바꾼다.
   * 2. yearsArray에 있는 값이라면, 검색어 목록에 후보 값을 띄운다.
   * @param e
   * @returns
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // 렌더링 되는 값 변경
    // inputValue 비동기적으로 검사하기 때문에 e.target.value로 진행

    //후보 list 세팅
    const nowYearsArray = yearsArray.filter((year) => year.includes(value));
    setmatchedItems(nowYearsArray);

    // 입력한 값이 후보 list 항목 안에 존재한다면
    if (matchedItems.includes(value)) {
      handleitemClick(value);
    } else {
      setCheck(false);
    }

    submitValueToParentComponent(value);
    // 부모 컴포넌트에서 한번 더 체크하기 위해 값은 변경해야한다.
  };

  /** 후보값들 중 값을 클릭했을때 . */
  const handleitemClick = (item: string) => {
    setInputValue(item);
    // 자동완성
    setCheck(true);
    setmatchedItems([]);
    submitValueToParentComponent(item);
  };

  /**
   * 사용자가 입력하고 있는 값을 체크한다.
   * 만약 옳지 않은 값이라면 check 변수를 통해
   * alertSetence를 공지한다 . */
  const checkRightInputValue = (inputValue: string) => {
    if (yearsArray.includes(inputValue)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  return (
    <div className="item-component">
      {check ? <p></p> : <p className="invalid-notice">{alertSetence}</p>}
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          autoCompletion(e);
        }}
        className="form-floating"
      >
        <input
          type="text"
          className="form-control"
          id="floatingInputValue"
          value={inputValue}
          onChange={handleInputChange}
        />
        <label htmlFor="floatingInputValue">출생연도를 입력해주세요</label>

        {/* 예시항목  list-group-container */}
        <div className={`list-group-container`}>
          <ul className="list-group">
            {matchedItems.map((item, index) => (
              <li
                key={index}
                className={`list-group-item`}
                onClick={() => handleitemClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </form>

      {/* {<div>{alert ? ""}을 다시 확인해주세요 </div>} */}
    </div>
  );
}
