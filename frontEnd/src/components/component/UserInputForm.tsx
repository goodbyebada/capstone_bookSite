import React, { useState, useEffect } from "react";
import GenderForm from "@components/containers/formItems/GenderForm";
import PatronTypeSelector from "@components/containers/formItems/EducationSelector";
import BirthdateForm from "@components/containers/formItems/BirthdateForm";
import Department from "@components/containers/formItems/Department";
import { useRouter } from "next/navigation";
import { inputData } from "@components/model/interfaceModel";
import {
  startYear,
  endYear,
} from "@components/containers/formItems/ExtendedDropdown";
import { initYear } from "@data/const";

import ExtendedDropdown from "@components/containers/formItems/ExtendedDropdown";

const INIT_YEAR = parseInt(initYear);
const EMPTY_STRING = "";
const DEFAULT_GENDER = "F";
const DEFAULT_PATORN_ID = 1;

const TEST_BIRTH = parseInt("1990");

/**
 * Test를 위한 Form
 * @returns
 */
function setInputForm(key: keyof typeof testDataObj) {
  enum Department {
    ComputerScience = "컴퓨터학부",
    Business = "경영학부",
  }

  const testDataObj: { [key: string]: inputData } = {
    CSdata: {
      gender: "F",
      patron_type: 1,
      birthdate: TEST_BIRTH,
      department: Department.ComputerScience,
    },

    BSdata: {
      gender: "F",
      patron_type: 1,
      birthdate: TEST_BIRTH,
      department: Department.Business,
    },

    SET: {
      gender: DEFAULT_GENDER,
      patron_type: DEFAULT_PATORN_ID,
      birthdate: INIT_YEAR,
      department: EMPTY_STRING,
    },
  };

  return testDataObj[key];
}

const bookList = "/bookList";
const getBookInfo = "/getBookInfo";
const routeUrl = bookList;

const UserInputForm = () => {
  const [formData, setFormData] = useState<inputData>(
    // setInputForm("CSdata")
    // setInputForm("BSdata")
    setInputForm("SET")
  );

  const router = useRouter();

  /**
   *
   * @param data user 정보  { gender, patron_type, birthdate, department }
   * @returns queryString
   */
  const returnQueryString = (data: inputData) => {
    const { gender, patron_type, birthdate, department } = data;

    const queryString = `gender=${gender}&patron_type=${patron_type}&birthdate=${birthdate}&department=${department}`;
    return queryString;
  };

  //공백임을 체크한다
  const checkSubmitCondition = () => {
    const isFormComplete = Object.values(formData).every(
      (field) => field !== ""
    );
    // ture여야지 조건통과

    // 조건에 맞는지 체크한다.
    const checkAlltheInput = (formData: inputData) => {
      const { gender, patron_type, birthdate, department } = formData;

      return (
        gender !== EMPTY_STRING &&
        startYear <= birthdate &&
        birthdate <= endYear &&
        department !== EMPTY_STRING
      );
    };

    if (isFormComplete && checkAlltheInput(formData)) {
      // 전부 작성했다면 bookList 경로 이동 쿼리문과 함께
      const queryString = returnQueryString(formData);
      router.push(routeUrl + "?" + queryString);
      return;
    }

    console.log(formData);
    // 작성되지 않은 항목이 있을때
    alert("작성되지 않은 항목이 있습니다.");
  };

  const handleInputChange = (fieldName: string, value: string | number) => {
    setFormData((prevData: inputData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="select-template">
      <GenderForm onChange={(value) => handleInputChange("gender", value)} />
      <PatronTypeSelector
        onChange={(value) => handleInputChange("patron_type", value)}
      />

      <ExtendedDropdown
        onChange={(value) => handleInputChange("birthdate", value)}
      />

      <Department
        onChange={(value) => handleInputChange("department", value)}
      />

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          checkSubmitCondition();
          // input란 체크 후 이동
        }}
      >
        제출
      </button>
    </div>
  );
};

export default UserInputForm;
